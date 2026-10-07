import { STATION } from '../screens/copy';
import styles from './PlateChip.module.css';

export interface PlateChipProps {
  name: string;
  n: number;
  prep: string;
  selected: boolean;
  onSelect: () => void;
}

/** A plate item (the prototype's BaD STATION): `{Ingredient} ×n` over the prep caption; tapping aims the strokes at it. */
export function PlateChip({ name, n, prep, selected, onSelect }: PlateChipProps) {
  return (
    <button
      type="button"
      className={`${styles.chip} ${selected ? styles.selected : ''}`}
      aria-pressed={selected}
      onClick={onSelect}
    >
      <span className={styles.label}>{STATION.chip(name, n)}</span>
      <span className={styles.prep}>{prep}</span>
    </button>
  );
}
