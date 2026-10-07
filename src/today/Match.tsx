import { useNavigate } from 'react-router';
import { CITY_NAME } from '@/app/clock';
import { Button, CLASSES, Chip, kitCrop } from '@/ds';
import { useMe } from '@/store/me';
import { useToday } from '@/store/today';
import { say } from '@/store/toast';
import t from '@/styles/type.module.css';
import { MATCH } from './data';
import styles from './Match.module.css';

// Copy of record: the prototype's MATCH section and its render values.
const COPY = {
  overline: 'One match a day',
  matched: 'Matched on habits and palate, never on skill. No score, no percentage.',
  share: 'What you share',
  shareFoot: 'Filled chips are habits you both have. The rest are hers.',
  palates: 'Palates · what the Bin sees',
  palateLine: (theirs: string, theirPalate: string, mine: string, myPalate: string) =>
    `A ${theirs}’s palate: ${theirPalate}. Yours, the ${mine}: ${myPalate}. The Bin says you would argue well over a plate, and finish it.`,
  quest: "Today's quest",
  connect: 'Connect',
  notToday: 'Not today',
  openChat: 'Open the chat',
  declined: "Not today. Tomorrow's match arrives at 00:00.",
  connectedToast: ['Today’s match', 'Connected. The quest is the first message in your chat.'],
} as const;

/** The daily match (PRODUCT_SPEC §5.2): shared habits as filled chips and a palate line, never a score. */
export function Match() {
  const navigate = useNavigate();
  const me = useMe((s) => s.me);
  const matchState = useToday((s) => s.matchState);
  const connect = useToday((s) => s.connect);
  const decline = useToday((s) => s.decline);
  const p = MATCH.person;
  const theirs = CLASSES[p.classKey];
  const mine = CLASSES[me.classKey];
  const onConnect = () => {
    connect();
    say(COPY.connectedToast[0], COPY.connectedToast[1]);
  };
  return (
    <main className={styles.screen} data-screen="match">
      <div className={styles.top}>
        <span className={styles.figure} style={kitCrop(p.classKey, p.figure)} />
        <div className={styles.who}>
          <span className={t.overline}>{COPY.overline}</span>
          <div className={t.headingMd}>{p.name}</div>
          <div className={styles.classLine}>
            <span
              className={styles.className}
              style={{ color: `var(--class-${p.classKey})` }}
              data-contrast-exception="class-accent"
            >
              {theirs.name}
            </span>
            <span className={t.overline}>{theirs.role}</span>
          </div>
          <div className={styles.chips}>
            <Chip variant={p.gem} />
            <Chip appearance="subtle">{MATCH.dist}</Chip>
            <Chip appearance="subtle">{CITY_NAME}</Chip>
          </div>
          <p className={styles.matched}>{COPY.matched}</p>
        </div>
      </div>
      <section className={styles.card} aria-label={COPY.share}>
        <span className={t.overline}>{COPY.share}</span>
        <div className={styles.chips}>
          {MATCH.habits.map((h) => (
            <Chip key={h.label} appearance={h.shared ? 'filled' : 'subtle'}>
              {h.label}
            </Chip>
          ))}
        </div>
        <p className={t.caption}>{COPY.shareFoot}</p>
      </section>
      <section className={`${styles.card} ${styles.palates}`} aria-label={COPY.palates}>
        <span className={t.overline}>{COPY.palates}</span>
        <p className={styles.palateLine}>
          {COPY.palateLine(theirs.name, theirs.palate, mine.name, mine.palate)}
        </p>
      </section>
      <section className={styles.quest} aria-label={COPY.quest}>
        <span className={styles.questLabel}>{COPY.quest}</span>
        <p className={styles.questText}>{MATCH.quest}</p>
      </section>
      <div className={styles.actions}>
        {matchState === 'new' ? (
          <>
            <Button block onClick={onConnect}>
              {COPY.connect}
            </Button>
            <Button variant="ghost" block onClick={decline}>
              {COPY.notToday}
            </Button>
          </>
        ) : matchState === 'connected' ? (
          <Button block onClick={() => void navigate('/today/chat')}>
            {COPY.openChat}
          </Button>
        ) : (
          <p className={styles.declined}>{COPY.declined}</p>
        )}
      </div>
    </main>
  );
}
