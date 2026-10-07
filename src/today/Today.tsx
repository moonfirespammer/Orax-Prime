import { useNavigate } from 'react-router';
import { CITY_NAME, clock, useNow } from '@/app/clock';
import { RoomRow, type Room } from '@/app/RoomRow';
import { Avatar, Button, CLASSES, Chip, Icon, Logo, kitCrop } from '@/ds';
import { useToday } from '@/store/today';
import { say } from '@/store/toast';
import type from '@/styles/type.module.css';
import { MATCH, QUESTS, digest, rooms } from './data';
import styles from './Today.module.css';

const COPY = {
  title: 'Today',
  openMatch: "Open today's match",
  matchOverline: "Today's match",
  questOverline: "Today's quest",
  connect: 'Connect',
  notToday: 'Not today',
  openChat: (name: string) => `Open the chat with ${name}`,
  declined: "Not today. Tomorrow's match arrives at 00:00.",
  connectedToast: ['Today’s match', 'Connected. The quest is the first message in your chat.'],
  questsOverline: "Today's quests",
  pickedLabel: (n: number) => `Pick two · ${n} picked`,
  questsFoot: 'The other three expire at 00:00. Rewards are chips and trims, never a number in a fight.',
  stateDone: 'Done',
  statePicked: 'Picked',
  stateExpires: 'Expires 00:00',
  tonight: 'Tonight',
  digestOverline: (n: number) => `Today's digest · ${n}`,
  cityWall: 'City wall',
  readAll: (n: number) => `Read all ${n} · then that's all for today`,
} as const;

/** Today, direction 1a (PRODUCT_SPEC §5.2): the match hero, the quest card, tonight's rooms, the digest preview. */
export function Today() {
  const navigate = useNavigate();
  const now = useNow();
  const matchState = useToday((s) => s.matchState);
  const picked = useToday((s) => s.picked);
  const done = useToday((s) => s.done);
  const connect = useToday((s) => s.connect);
  const decline = useToday((s) => s.decline);
  const togglePick = useToday((s) => s.togglePick);
  const full = picked.length >= 2;
  const m = MATCH.person;
  const mc = CLASSES[m.classKey];
  const items = digest(CITY_NAME);
  const open = (room: Room) => void navigate(room.to);
  const onConnect = () => {
    connect();
    say(COPY.connectedToast[0], COPY.connectedToast[1]);
  };
  return (
    <main className={styles.screen} data-screen="today">
      <header className={styles.header}>
        <h1 className={styles.srOnly}>{COPY.title}</h1>
        <Logo />
        <div className={styles.clock}>
          <span>{clock.resetsLabel()}</span>
          <span className={styles.city}>{CITY_NAME}</span>
        </div>
      </header>

      <section className={styles.matchCard} aria-label={COPY.matchOverline}>
        <div className={styles.matchTop}>
          <button
            type="button"
            aria-label={COPY.openMatch}
            className={styles.figure}
            style={kitCrop(m.classKey, m.figure)}
            onClick={() => void navigate('/today/match')}
          />
          <div className={styles.matchText}>
            <span className={type.overline}>{COPY.matchOverline}</span>
            <div className={type.headingSm}>{m.name}</div>
            <div className={styles.classLine}>
              <span
                className={styles.className}
                style={{ color: `var(--class-${m.classKey})` }}
                data-contrast-exception="class-accent"
              >
                {mc.name}
              </span>
              <span className={type.overline}>{mc.role}</span>
            </div>
            <div className={styles.chips}>
              <Chip variant={m.gem} />
              <Chip appearance="subtle">{MATCH.dist}</Chip>
            </div>
            <p className={styles.shared}>{MATCH.sharedLine}</p>
          </div>
        </div>
        <div className={styles.habits}>
          {MATCH.habits.map((h) => (
            <Chip key={h.label} appearance={h.shared ? 'filled' : 'subtle'}>
              {h.label}
            </Chip>
          ))}
        </div>
        <div className={styles.quest}>
          <span className={styles.questLabel}>{COPY.questOverline}</span>
          <p className={styles.questText}>{MATCH.quest}</p>
        </div>
        <div className={styles.actions}>
          {matchState === 'new' ? (
            <>
              <Button variant="secondary" block onClick={onConnect}>
                {COPY.connect}
              </Button>
              <Button variant="ghost" onClick={decline}>
                {COPY.notToday}
              </Button>
            </>
          ) : matchState === 'connected' ? (
            <Button variant="secondary" block onClick={() => void navigate('/today/chat')}>
              {COPY.openChat(m.name)}
            </Button>
          ) : (
            <p className={type.caption}>{COPY.declined}</p>
          )}
        </div>
      </section>

      <section className={styles.questsCard} aria-label={COPY.questsOverline}>
        <div className={styles.rowHead}>
          <span className={`${type.overline} ${styles.nowrap}`}>{COPY.questsOverline}</span>
          <span className={type.pixelMuted}>{COPY.pickedLabel(picked.length)}</span>
        </div>
        {QUESTS.map((q) => {
          const isPicked = picked.includes(q.id);
          const isDone = !!done[q.id];
          const disabled = !isPicked && full;
          const state = isDone ? COPY.stateDone : isPicked ? COPY.statePicked : full ? COPY.stateExpires : '';
          return (
            <button
              key={q.id}
              type="button"
              aria-pressed={isPicked}
              disabled={disabled}
              className={`${styles.questRow} ${isPicked ? styles.questPicked : ''}`}
              onClick={() => togglePick(q.id)}
            >
              <span className={`${styles.box} ${isPicked ? styles.boxPicked : ''}`}>
                {isPicked ? <Icon name="check" size={14} /> : null}
              </span>
              <span className={styles.questText2}>
                <span className={styles.questTitle}>{q.title}</span>
                <span className={styles.questMeta}>
                  {q.room} · {q.reward}
                </span>
              </span>
              <span className={`${type.pixel} ${styles.questState} ${isDone ? styles.done : ''}`}>
                {state}
              </span>
            </button>
          );
        })}
        <p className={`${type.caption} ${styles.questsFoot}`}>{COPY.questsFoot}</p>
      </section>

      <section className={styles.tonight} aria-label={COPY.tonight}>
        <div className={`${styles.rowHead} ${styles.tonightHead}`}>
          <span className={type.overline}>{COPY.tonight}</span>
          <span className={type.pixelMuted}>{clock.nextPrepLabel()}</span>
        </div>
        {rooms(CITY_NAME).map((r) => (
          <RoomRow key={r.key} room={r} onOpen={open} chevron />
        ))}
      </section>

      <section className={styles.digestCard} aria-label={COPY.digestOverline(items.length)}>
        <div className={styles.rowHead}>
          <span className={type.overline}>{COPY.digestOverline(items.length)}</span>
          <button type="button" className={styles.wallLink} onClick={() => void navigate('/today/wall')}>
            {COPY.cityWall}
          </button>
        </div>
        {items.slice(0, 3).map((d) => (
          <div key={d.text} className={styles.digestItem}>
            <Avatar classKey={d.person.classKey} figure={d.person.figure} size={32} ring={2} />
            <span className={styles.digestText}>
              <span className={styles.digestLine}>{d.text}</span>
              <span className={styles.digestMeta}>{d.meta}</span>
            </span>
          </div>
        ))}
        <Button variant="ghost" block onClick={() => void navigate('/today/digest')}>
          {COPY.readAll(items.length)}
        </Button>
      </section>
      <span hidden>{now}</span>
    </main>
  );
}
