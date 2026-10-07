import { useNavigate } from 'react-router';
import { CITY_NAME } from '@/app/clock';
import { ThemeToggle } from '@/app/ThemeToggle';
import { Avatar, Button, CLASSES, Chip, GEMS, Icon } from '@/ds';
import { useMe } from '@/store/me';
import type from '@/styles/type.module.css';
import { BONDMATES, HABITS } from '@/today/data';
import styles from './You.module.css';

const COPY = {
  title: 'You',
  hawker: 'Hawker regular',
  caption: (gem: string, cls: string, n: number) =>
    `${gem} ${cls} · ${n} plates this month · gem locks at 00:00`,
  bondmates: 'Bondmates',
  signature: 'Signature Dish',
  noSignature: 'No Signature Dish yet. Cook one and keep it.',
  todaysDishes: "Today's dishes",
  habits: 'Your habits · all three rooms',
  wardrobe: 'Wardrobe',
  changeClass: 'Change class',
} as const;

/** You (PRODUCT_SPEC §4): profile, bondmates, Signature Dish, habits, Wardrobe and Change class. */
export function You() {
  const navigate = useNavigate();
  const me = useMe((s) => s.me);
  const c = CLASSES[me.classKey];
  return (
    <main className={styles.screen} data-screen="you">
      <header className={styles.header}>
        <h1 className={type.headingMd}>{COPY.title}</h1>
        <ThemeToggle className={styles.settings} />
      </header>
      <section className={styles.profile}>
        <Avatar classKey={me.classKey} figure={me.figure} size={96} ring={3} className={styles.avatar} />
        <div className={styles.identity}>
          <div className={type.headingSm}>{me.name}</div>
          <div className={styles.classLine}>
            <span
              className={styles.className}
              style={{ color: `var(--class-${me.classKey})` }}
              data-contrast-exception="class-accent"
            >
              {c.name}
            </span>
            <span className={type.overline}>{c.role}</span>
          </div>
        </div>
        <div className={styles.chips}>
          <Chip variant={me.gem} />
          <Chip appearance="subtle">{CITY_NAME}</Chip>
          <Chip appearance="subtle">{COPY.hawker}</Chip>
        </div>
        <p className={styles.profileCaption}>{COPY.caption(GEMS[me.gem].name, c.name, 12)}</p>
      </section>

      <section className={styles.group} aria-label={COPY.bondmates}>
        <span className={type.overline}>{COPY.bondmates}</span>
        {BONDMATES.map((b) => (
          <button
            key={b.key}
            type="button"
            className={styles.bondmate}
            onClick={() => void navigate('/today/chat')}
          >
            <Avatar classKey={b.person.classKey} figure={b.person.figure} size={40} ring={3} />
            <span className={styles.bondText}>
              <span className={styles.bondName}>
                {b.person.name} · “{b.nick}”
              </span>
              <span className={styles.bondSince}>{b.since}</span>
            </span>
            <span className={styles.bondIcon}>
              <Icon name="message-circle" size={20} />
            </span>
          </button>
        ))}
      </section>

      <section className={styles.group} aria-label={COPY.signature}>
        <span className={type.overline}>{COPY.signature}</span>
        <div className={styles.noSignature}>
          <span className={type.caption}>{COPY.noSignature}</span>
          <Button variant="ghost" onClick={() => void navigate('/play/bad')}>
            {COPY.todaysDishes}
          </Button>
        </div>
      </section>

      <section className={styles.group} aria-label={COPY.habits}>
        <span className={type.overline}>{COPY.habits}</span>
        <div className={styles.habitChips}>
          {HABITS.map((h) => (
            <Chip key={h} appearance="subtle">
              {h}
            </Chip>
          ))}
        </div>
      </section>

      <div className={styles.actions}>
        <Button variant="secondary" block onClick={() => void navigate('/you/wardrobe')}>
          {COPY.wardrobe}
        </Button>
        <Button variant="ghost" block onClick={() => void navigate('/you/classes')}>
          {COPY.changeClass}
        </Button>
      </div>
    </main>
  );
}
