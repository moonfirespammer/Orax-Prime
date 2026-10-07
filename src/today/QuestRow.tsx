import { Icon } from '@/ds';
import t from '@/styles/type.module.css';
import type { Quest } from './data';
import styles from './QuestRow.module.css';

export const QUEST_STATE = { done: 'Done', picked: 'Picked', expires: 'Expires 00:00' } as const;

/** The row's state word: Done by play, Picked, or Expires 00:00 once two are picked. */
export const questState = (picked: boolean, done: boolean, full: boolean): string =>
  done ? QUEST_STATE.done : picked ? QUEST_STATE.picked : full ? QUEST_STATE.expires : '';

export interface QuestRowProps {
  quest: Quest;
  picked: boolean;
  done: boolean;
  /** Two are picked: the others are let go at 00:00 and cannot be picked. */
  full: boolean;
  /** The prototype rounds the rows by 12 px on the Quests screen and by 6 px inside Today's card. */
  radius?: 'md' | 'sm';
  onToggle: () => void;
}

/** One quest (the prototype's QUESTS rows): a 22 px box, the title over room and reward, the state word. */
export function QuestRow({ quest: q, picked, done, full, radius = 'md', onToggle }: QuestRowProps) {
  const disabled = !picked && full;
  return (
    <button
      type="button"
      aria-pressed={picked}
      disabled={disabled}
      className={`${styles.row} ${radius === 'sm' ? styles.rowSm : ''} ${picked ? styles.picked : ''}`}
      onClick={onToggle}
    >
      <span className={`${styles.box} ${picked ? styles.boxPicked : ''}`}>
        {picked ? <Icon name="check" size={14} /> : null}
      </span>
      <span className={styles.text}>
        <span className={styles.title}>{q.title}</span>
        <span className={styles.meta}>
          {q.room} · {q.reward}
        </span>
      </span>
      <span className={`${t.pixel} ${styles.state} ${done ? styles.done : ''}`}>
        {questState(picked, done, full)}
      </span>
    </button>
  );
}
