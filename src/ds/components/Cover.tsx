import { asset } from '../assets';
import styles from './Cover.module.css';

// Block composition from the shipped Cover: one tall brand slab right, satellites stacking down its left edge, the
// logo's own composition (a heavy X with pixel fragments breaking off it). Tiles sit on a 32 px pitch (space-6)
// with radius-sm corners. Ported from the design system's Cover.jsx; the numbers are the specimen's.
const RECTS: readonly [keyof typeof FILL, number, number, number, number, 0 | 1][] = [
  ['brand', 752, 0, 208, 288, 0],
  ['deep', 624, 128, 128, 160, 0],
  ['ring', 656, 32, 96, 96, 0],
  ['sunken', 480, 224, 160, 64, 0],
  ['deep', 592, 32, 32, 32, 1],
  ['deep', 560, 64, 64, 32, 1],
  ['ring', 528, 96, 32, 32, 1],
  ['deep', 592, 96, 32, 32, 1],
  ['ring', 560, 128, 32, 32, 1],
  ['deep', 496, 160, 64, 32, 1],
  ['ring', 592, 160, 32, 32, 1],
  ['deep', 528, 192, 32, 32, 1],
  ['ring', 496, 64, 32, 32, 1],
  ['ruby', 784, 224, 32, 32, 1],
  ['sapph', 832, 224, 32, 32, 1],
  ['emer', 880, 224, 32, 32, 1],
  ['deep', 816, 96, 32, 32, 1],
  ['deep', 848, 128, 64, 32, 1],
];
const FILL = {
  brand: 'var(--brand)',
  deep: 'var(--brand-deep)',
  ring: 'var(--logo-plate)',
  sunken: 'var(--surface-sunken)',
  ruby: 'var(--gem-ruby-base)',
  sapph: 'var(--gem-sapphire-base)',
  emer: 'var(--gem-emerald-base)',
} as const;

export const COVER_WIDTH = 960;
export const COVER_HEIGHT = 288;

/**
 * The 960 × 288 brand cover (design system: Cover): the block composition, the real logo and the single-line
 * tagline strip, the one approved decorative motif. `scale` shrinks it to fit; the element takes the scaled size.
 */
export function Cover({ theme = 'dark', scale = 1 }: { theme?: 'dark' | 'light'; scale?: number }) {
  const logo =
    theme === 'light' ? 'assets/Logos/orax-logo-transparent.png' : 'assets/Logos/orax-logo-on-dark.png';
  return (
    <div
      className={styles.frame}
      style={{ width: Math.round(COVER_WIDTH * scale), height: Math.round(COVER_HEIGHT * scale) }}
    >
      <div
        className={styles.cover}
        data-theme={theme}
        style={scale === 1 ? undefined : { transform: `scale(${scale})` }}
      >
        <svg
          className={styles.blocks}
          width={COVER_WIDTH}
          height={COVER_HEIGHT}
          viewBox={`0 0 ${COVER_WIDTH} ${COVER_HEIGHT}`}
          aria-hidden="true"
        >
          {RECTS.map(([k, x, y, w, h, tile], i) => (
            <rect key={i} x={x} y={y} width={w} height={h} rx={tile ? 6 : 0} fill={FILL[k]} />
          ))}
        </svg>
        <img className={styles.logo} src={asset(logo)} alt="OraX" />
        <p className={styles.strip}>
          The game is <b>life</b> · Play it <b>together</b>
        </p>
      </div>
    </div>
  );
}
