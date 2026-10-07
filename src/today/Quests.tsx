import { QUEST_PICKS, useToday } from '@/store/today';
import t from '@/styles/type.module.css';
import { QUESTS } from './data';
import { QuestRow } from './QuestRow';
import styles from './Quests.module.css';

const COPY = {
  caption:
    'A card of five every day. Pick two; the rest expire at 00:00. Every quest is done by playing, and every reward is a chip or a trim.',
} as const;

/** Today's quests (PRODUCT_SPEC §5.2): five, pick two, done by playing; rewards are chips and trims. */
export function Quests() {
  const picked = useToday((s) => s.picked);
  const done = useToday((s) => s.done);
  const togglePick = useToday((s) => s.togglePick);
  const full = picked.length >= QUEST_PICKS;
  return (
    <main className={styles.screen} data-screen="quests">
      <p className={`${t.caption} ${styles.caption}`}>{COPY.caption}</p>
      {QUESTS.map((q) => (
        <QuestRow
          key={q.id}
          quest={q}
          picked={picked.includes(q.id)}
          done={!!done[q.id]}
          full={full}
          onToggle={() => {
            togglePick(q.id);
          }}
        />
      ))}
    </main>
  );
}
