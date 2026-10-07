import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useShell } from '@/store/shell';
import { rooms } from '@/today/data';
import { CITY_NAME, clock, useNow } from './clock';
import { RoomRow, type Room } from './RoomRow';
import styles from './PlaySheet.module.css';

const COPY = {
  close: 'Close',
  title: 'Play',
  caption: 'Matched by who you are, not by skill.',
} as const;

/** The Play sheet (PRODUCT_SPEC §4): four rows, each with tonight's party state and a tag; closes on scrim tap. */
export function PlaySheet() {
  const open = useShell((s) => s.sheet === 'play');
  const closeSheet = useShell((s) => s.closeSheet);
  const navigate = useNavigate();
  const panel = useRef<HTMLDivElement>(null);
  useNow();
  useEffect(() => {
    if (!open) return;
    panel.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSheet();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
    };
  }, [open, closeSheet]);
  if (!open) return null;
  const go = (room: Room) => {
    closeSheet();
    void navigate(room.to);
  };
  return (
    <div className={styles.layer} data-testid="play-sheet">
      <button type="button" aria-label={COPY.close} className={styles.scrim} onClick={closeSheet} />
      <div
        ref={panel}
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="play-sheet-title"
        tabIndex={-1}
      >
        <span className={styles.grabber} />
        <div className={styles.head}>
          <h2 id="play-sheet-title" className={styles.title}>
            {COPY.title}
          </h2>
          <span className={styles.resets}>{clock.resetsLabel()}</span>
        </div>
        {rooms(CITY_NAME).map((r) => (
          <RoomRow key={r.key} room={r} onOpen={go} ground="surface" />
        ))}
        <p className={styles.caption}>{COPY.caption}</p>
      </div>
    </div>
  );
}
