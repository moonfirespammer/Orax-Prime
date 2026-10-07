import { useId, useRef, type MouseEvent } from 'react';
import { Icon } from '@/ds';
import { stockState } from '../engine/pool';
import { STATION } from '../screens/copy';
import styles from './PantryCard.module.css';

export interface PantryCardProps {
  ingredientId: string;
  name: string;
  /** Units left on the city shelf. */
  units: number;
  /** Portions of this ingredient on the player's plate. */
  n: number;
  /** Prep caption for this ingredient on the plate (`raw` when held and untouched; `off-recipe` on an extra). */
  prep: string;
  selected: boolean;
  /** A Pantry extra: the smaller card of the four-column row, no stock line. */
  extra?: boolean;
  onAdd: () => void;
  onRemove: () => void;
}

/**
 * One Pantry card (the prototype's BaD STATION; BaD's PantryCard for the behaviour): name, prep caption, the
 * state line (`Running low` in warning, `Gone`), a 44 px minus target with a 28 px box when the player holds
 * portions, and a `×n` badge. A Gone card stays tappable so the Bin can say so, and is marked aria-disabled.
 */
export function PantryCard({
  ingredientId,
  name,
  units,
  n,
  prep,
  selected,
  extra = false,
  onAdd,
  onRemove,
}: PantryCardProps) {
  const st = stockState(units, ingredientId);
  const gone = st === 'gone';
  const cls = [
    styles.card,
    extra ? styles.extra : '',
    gone ? styles.gone : '',
    selected ? styles.selected : '',
  ]
    .filter(Boolean)
    .join(' ');
  const state = st === 'low' ? STATION.runningLow : gone ? STATION.gone : '';
  const add = useRef<HTMLButtonElement>(null);
  const nameId = useId();
  const minusId = useId();
  const remove = (e: MouseEvent<HTMLButtonElement>): void => {
    // The last portion unmounts the minus button: keep a keyboard user's place on this card (detail 0 = key press).
    if (n === 1 && e.detail === 0) add.current?.focus();
    onRemove();
  };
  return (
    <div className={cls} data-testid={`pantry-${ingredientId}`} data-state={st}>
      {/* One control carries name, count, prep and state, so a Gone card reads "Cucumber, Gone" and, being an
          inactive control (aria-disabled), keeps the prototype's faint ink. */}
      <button
        ref={add}
        type="button"
        className={styles.add}
        onClick={onAdd}
        aria-disabled={gone || undefined}
      >
        <span className={styles.name} id={nameId}>
          {name}
        </span>{' '}
        {n > 0 ? <span className={styles.badge}>×{n}</span> : null}{' '}
        {prep ? <span className={styles.prep}>{prep}</span> : null}{' '}
        {extra ? null : (
          <span
            className={`${styles.state} ${st === 'low' ? styles.low : ''} ${n > 0 ? styles.roomForMinus : ''}`}
          >
            {state}
          </span>
        )}
      </button>
      {n > 0 ? (
        <button
          type="button"
          id={minusId}
          className={styles.minus}
          aria-label={STATION.remove}
          aria-labelledby={`${minusId} ${nameId}`}
          onClick={remove}
        >
          <span className={styles.minusBox}>
            <Icon name="minus" size={16} />
          </span>
        </button>
      ) : null}
    </div>
  );
}
