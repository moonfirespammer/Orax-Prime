import { avatarCrop } from '../data';
import type { ClassKey, Figure } from '../types';
import styles from './Avatar.module.css';

export interface AvatarProps {
  classKey: ClassKey;
  figure?: Figure | undefined;
  size: number;
  /** Class ring width, 2–3 px. Defaults to 3 at 40 px and above, 2 below. */
  ring?: number;
  /** Extra outer ring in the raised surface colour, for stacked avatars. */
  surfaceRing?: number;
  className?: string | undefined;
}

/** A round avatar: one figure's head cropped from the class board, with the class-accent ring. Decorative. */
export function Avatar({ classKey, figure = 't1m', size, ring, surfaceRing = 0, className }: AvatarProps) {
  const r = ring ?? (size >= 40 ? 3 : 2);
  const shadow = `0 0 0 ${r}px var(--class-${classKey})${surfaceRing ? `, 0 0 0 ${r + surfaceRing}px var(--surface-raised)` : ''}`;
  return (
    <span
      aria-hidden="true"
      className={[styles.avatar, className ?? ''].join(' ')}
      style={{ width: size, height: size, boxShadow: shadow, ...avatarCrop(classKey, figure) }}
    />
  );
}
