import { asset } from '../assets';
import { GEMS } from '../data';
import type { Gem } from '../types';
import styles from './StoneRow.module.css';

export interface StoneRowProps {
  gem: Gem;
  /** Stones lit, 0 to 3. */
  stones: number;
  /** The stone's outer size; the gem inside is 60 % of it. */
  size?: number;
  className?: string | undefined;
}

/**
 * Three small stones in a row (the prototype's `stone()` spans): the gem's setting shape with a 2 px ring in the
 * gem fill when lit, the border when not. Reads as one image, `{n} of 3 {gems}`.
 */
export function StoneRow({ gem, stones, size = 20, className }: StoneRowProps) {
  const g = GEMS[gem];
  const diamond = gem === 'emerald';
  const radius = gem === 'ruby' ? 'var(--radius-full)' : gem === 'sapphire' ? '6px' : '3px';
  const inner = Math.round(size * 0.6);
  return (
    <span
      role="img"
      aria-label={`${String(stones)} of 3 ${g.plural}`}
      className={[styles.row, className ?? ''].join(' ')}
    >
      {[1, 2, 3].map((k) => {
        const on = k <= stones;
        return (
          <span
            key={k}
            className={styles.stone}
            style={{
              width: size,
              height: size,
              borderRadius: radius,
              transform: diamond ? 'rotate(45deg)' : undefined,
              boxShadow: `inset 0 3px 8px rgba(0, 0, 0, 0.35), 0 0 0 2px ${on ? `var(--gem-${gem}-fill)` : 'var(--border)'}`,
            }}
          >
            {on ? (
              <span
                className={styles.gem}
                style={{
                  width: inner,
                  height: inner,
                  backgroundImage: `url("${asset(g.file)}")`,
                  transform: diamond ? 'rotate(-45deg)' : undefined,
                }}
              />
            ) : null}
          </span>
        );
      })}
    </span>
  );
}
