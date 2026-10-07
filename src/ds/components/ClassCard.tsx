import { CLASSES } from '../data';
import type { ClassKey, Figure, Gem } from '../types';
import { Avatar } from './Avatar';
import { GemSocket } from './GemSocket';
import styles from './ClassCard.module.css';

export interface ClassCardGem {
  gem: Gem;
  active?: boolean;
  onClick?: () => void;
}

export interface ClassCardProps {
  classKey: ClassKey;
  /** The player's name; the class name when absent. */
  name?: string;
  /** Overrides the class's role eyebrow; an empty string hides it. */
  role?: string;
  figure?: Figure;
  slot?: number | string;
  gems: readonly ClassCardGem[];
  /** Pixel-label modifier footer in a dashed box, e.g. `R R G · Limit ×2`. */
  footer?: string;
  /** On its turn: the edge takes the active gem's fill, the only coloured card edge in the system. */
  current?: boolean;
  width?: number | string;
}

/**
 * The roster card for one player (design system: ClassCard): avatar with the class ring, name in the class accent,
 * role eyebrow, slot, a triplet of GemSockets and a pixel-label footer.
 */
export function ClassCard({
  classKey,
  name,
  role,
  figure = 't1m',
  slot,
  gems,
  footer,
  current = false,
  width = 300,
}: ClassCardProps) {
  const c = CLASSES[classKey];
  const activeGem = gems.find((g) => g.active)?.gem;
  const edge = current && activeGem ? `var(--gem-${activeGem}-fill)` : 'var(--border)';
  const roleText = role ?? c.role;
  return (
    <div
      className={styles.card}
      style={{ width, borderColor: edge }}
      aria-current={current ? 'true' : undefined}
    >
      <div className={styles.head}>
        <Avatar classKey={classKey} figure={figure} size={44} ring={3} />
        <div className={styles.text}>
          <div className={styles.name} style={{ color: `var(--class-${classKey})` }}>
            {name ?? c.name}
          </div>
          {roleText ? <div className={styles.role}>{roleText}</div> : null}
        </div>
        {slot !== undefined ? <div className={styles.slot}>{slot}</div> : null}
      </div>
      <div className={styles.gems}>
        {gems.slice(0, 3).map((g, i) => (
          <GemSocket key={i} gem={g.gem} active={g.active ?? false} size={64} onClick={g.onClick} />
        ))}
      </div>
      {footer ? <div className={styles.footer}>{footer}</div> : null}
    </div>
  );
}
