import type { CSSProperties } from 'react';
import { asset } from '../assets';
import { GEMS } from '../data';
import type { Gem } from '../types';
import styles from './GemSocket.module.css';

export interface GemSocketProps {
  gem: Gem;
  active?: boolean;
  size?: number;
  /** Makes the socket a selectable `aria-pressed` button. */
  onClick?: (() => void) | undefined;
  label?: string | undefined;
  /** Part of a bigger picture (a stones row) that carries the label; this socket is hidden from assistive tech. */
  decorative?: boolean;
}

/**
 * A recessed well holding one gem (design system: GemSocket). The setting follows the cut: Ruby round, Sapphire
 * rounded square, Emerald 45° diamond, so the shape names the gem before the colour does. `active` adds the 3 px
 * gem-fill ring and the glow, the only glow in the system.
 */
export function GemSocket({
  gem,
  active = false,
  size = 72,
  onClick,
  label,
  decorative = false,
}: GemSocketProps) {
  const g = GEMS[gem];
  const stone = Math.round(size * 0.57);
  const diamond = gem === 'emerald';
  const wellSize = diamond ? Math.round(size * 0.79) : size;
  const radius =
    gem === 'ruby'
      ? 'var(--radius-full)'
      : gem === 'sapphire'
        ? 'var(--radius-lg)'
        : `${Math.round(size * 0.14)}px`;
  const wellStyle: CSSProperties = {
    width: wellSize,
    height: wellSize,
    borderRadius: radius,
    boxShadow: active
      ? `var(--shadow-socket), 0 0 0 3px var(--gem-${gem}-fill), var(--glow-${gem})`
      : 'var(--shadow-socket), 0 0 0 3px var(--border)',
    transform: diamond ? 'rotate(45deg)' : undefined,
  };
  const well = (
    <div
      className={styles.well}
      style={wellStyle}
      data-shape={gem === 'ruby' ? 'round' : gem === 'sapphire' ? 'rounded-square' : 'diamond'}
    >
      <img
        src={asset(g.file)}
        alt=""
        draggable={false}
        style={{ width: stone, height: stone, transform: diamond ? 'rotate(-45deg)' : undefined }}
      />
    </div>
  );
  const name = `${g.name} gem`;
  if (onClick) {
    return (
      <button
        type="button"
        className={`${styles.socket} ${styles.interactive}`}
        style={{ width: size, height: size }}
        aria-pressed={active}
        aria-label={label ?? name}
        onClick={onClick}
      >
        {well}
      </button>
    );
  }
  if (decorative) {
    return (
      <div
        className={styles.socket}
        style={{ width: size, height: size }}
        aria-hidden="true"
        data-active={active}
      >
        {well}
      </div>
    );
  }
  return (
    <div
      className={styles.socket}
      style={{ width: size, height: size }}
      role="img"
      aria-label={label ?? (active ? `${name}, active` : name)}
    >
      {well}
    </div>
  );
}
