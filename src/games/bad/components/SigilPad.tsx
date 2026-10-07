import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { MIN_SEGMENT, classify, strokePath, type Sigil, type StrokePoint } from '../engine/sigils';
import { STATION } from '../screens/copy';
import styles from './SigilPad.module.css';

export const FLASH_MS = 700;
export const TRAIL_FADE_MS = 450;

export interface SigilPadProps {
  mess: number;
  /** Word to flash centred on the pad; a new `seq` restarts the flash. */
  flash: { word: string; seq: number } | null;
  onSigil: (sigil: Sigil) => void;
}

/** One splat per mess point, placed as the prototype places them: the same pad after a reload. */
export const splatAt = (i: number) => ({
  left: 15 + ((i * 37) % 60),
  top: 25 + ((i * 23) % 45),
  width: 26 + (i % 3) * 8,
  height: 18 + (i % 2) * 8,
});

/**
 * The sigil pad (the prototype's BaD STATION pad; BaD's SigilPad for the gesture handling): full width, 150 px,
 * pointer strokes classified on release by the engine, never failing. The trail fades over 450 ms and the
 * recognised word shows for 700 ms.
 */
export function SigilPad({ mess, flash, onSigil }: SigilPadProps) {
  const pts = useRef<StrokePoint[]>([]);
  const padW = useRef(0);
  const drawing = useRef(false);
  const [trail, setTrail] = useState('');
  const [fading, setFading] = useState(false);
  // A flash already present when the pad mounts is old news (coming back from the Board): don't replay it.
  const [expired, setExpired] = useState(() => flash?.seq ?? 0);
  const fadeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const word = flash && flash.seq !== expired ? flash : null;

  useEffect(() => {
    if (!flash) return;
    const t = setTimeout(() => {
      setExpired(flash.seq);
    }, FLASH_MS);
    return () => {
      clearTimeout(t);
    };
  }, [flash]);
  useEffect(
    () => () => {
      if (fadeTimer.current) clearTimeout(fadeTimer.current);
    },
    [],
  );

  const point = (e: PointerEvent<HTMLDivElement>): StrokePoint => {
    const r = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top, t: e.timeStamp };
  };
  // One finger draws: a second finger (a pinch, a resting thumb) is not the primary pointer and is ignored.
  const down = (e: PointerEvent<HTMLDivElement>): void => {
    if (!e.isPrimary) return;
    drawing.current = true;
    padW.current = e.currentTarget.getBoundingClientRect().width;
    pts.current = [point(e)];
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* no capture (synthetic events) */
    }
    if (fadeTimer.current) clearTimeout(fadeTimer.current);
    setFading(false);
    setTrail(strokePath(pts.current));
  };
  const move = (e: PointerEvent<HTMLDivElement>): void => {
    if (!drawing.current || !e.isPrimary) return;
    const p = point(e);
    const last = pts.current[pts.current.length - 1];
    // A step under 2 px (a high-rate touchscreen sampling a slow finger) folds into the next one, so a slow
    // spiral keeps its turning. The classifier itself is untouched.
    if (last && Math.hypot(p.x - last.x, p.y - last.y) < MIN_SEGMENT) return;
    pts.current.push(p);
    setTrail(strokePath(pts.current));
  };
  const up = (e: PointerEvent<HTMLDivElement>): void => {
    if (!drawing.current || !e.isPrimary) return;
    drawing.current = false;
    // Width as the stroke began; 358 (the pad at 390 px) if the pad was not laid out, as the prototype.
    const sigil = classify(pts.current, padW.current || 358, mess);
    setFading(true);
    fadeTimer.current = setTimeout(() => {
      setTrail('');
    }, TRAIL_FADE_MS + 50);
    if (sigil) onSigil(sigil);
  };

  return (
    <div
      className={styles.pad}
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={up}
      data-testid="sigil-pad"
    >
      <span className={`${styles.label} ${styles.topLeft}`}>{STATION.pad}</span>
      {mess > 0 ? <span className={`${styles.label} ${styles.topRight}`}>{STATION.mess(mess)}</span> : null}
      {Array.from({ length: mess }, (_, i) => {
        const s = splatAt(i);
        return (
          <span
            key={i}
            className={styles.splat}
            data-testid="splat"
            style={{ left: `${String(s.left)}%`, top: `${String(s.top)}%`, width: s.width, height: s.height }}
          />
        );
      })}
      {/* Always mounted, so screen readers announce each flashed word (it is the only feedback for a good stroke). */}
      <div className={styles.word} aria-live="polite">
        {word ? (
          <span key={word.seq} className={styles.wordIn} data-testid="sigil-word">
            {word.word}
          </span>
        ) : null}
      </div>
      <svg className={styles.trail} aria-hidden="true">
        <path d={trail} className={fading ? styles.fading : undefined} />
      </svg>
      <span className={`${styles.label} ${styles.bottom}`}>{STATION.padHint}</span>
    </div>
  );
}
