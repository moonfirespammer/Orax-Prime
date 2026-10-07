import { useState } from 'react';
import { ThemeToggle } from '@/app/ThemeToggle';
import {
  Avatar,
  Button,
  CLASS_ORDER,
  COVER_WIDTH,
  Chip,
  ClassCard,
  Cover,
  GEM_ORDER,
  GemSocket,
  ICON_NAMES,
  Icon,
  Logo,
  Tagline,
  type Gem,
} from '@/ds';
import { useShell } from '@/store/shell';
import styles from './Gallery.module.css';

/** The phone column: 390 px less the two 16 px gutters. */
const COLUMN = 390 - 32;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className={styles.section} aria-label={title}>
      <h2 className={styles.title}>{title}</h2>
      {children}
    </section>
  );
}

/** Development page (/ds): the seven design-system components on the tokens, in the current theme. */
export function Gallery() {
  const theme = useShell((s) => s.theme);
  const [picked, setPicked] = useState<Gem>('ruby');
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Logo />
        <ThemeToggle />
      </header>
      <div>
        <h1 className={styles.h1}>Design system</h1>
        <p className={styles.lead}>The seven components on the tokens, in the current theme.</p>
      </div>

      <Section title="Button">
        <div className={styles.row}>
          <Button>Start playing</Button>
          <Button variant="secondary">Not now</Button>
          <Button variant="ghost">Change class</Button>
        </div>
        <div className={styles.row}>
          <Button disabled>Locked</Button>
          <Button icon={<Icon name="utensils" />}>Cook chicken rice</Button>
        </div>
        <Button block>Check in</Button>
      </Section>

      <Section title="Chip">
        <div className={styles.row}>
          <Chip>Tonight</Chip>
          <Chip appearance="outline">Proposed</Chip>
          <Chip appearance="subtle">Singapore</Chip>
          <Chip appearance="subtle">Hawker regular</Chip>
        </div>
        <div className={styles.row}>
          {GEM_ORDER.map((g) => (
            <Chip key={g} variant={g} />
          ))}
          {GEM_ORDER.map((g) => (
            <Chip key={g} variant={g} appearance="outline" />
          ))}
        </div>
      </Section>

      <Section title="Logo">
        <div className={styles.row}>
          <Logo />
          <Logo height={48} />
        </div>
      </Section>

      <Section title="Tagline">
        <Tagline />
        <Tagline size="md" />
      </Section>

      <Section title="Cover">
        <Cover theme={theme} scale={COLUMN / COVER_WIDTH} />
      </Section>

      <Section title="GemSocket">
        <div className={styles.row}>
          {GEM_ORDER.map((g) => (
            <GemSocket key={g} gem={g} size={64} />
          ))}
          {GEM_ORDER.map((g) => (
            <GemSocket key={g} gem={g} size={64} active />
          ))}
        </div>
        <div className={styles.row}>
          {GEM_ORDER.map((g) => (
            <GemSocket key={g} gem={g} size={72} active={picked === g} onClick={() => setPicked(g)} />
          ))}
        </div>
      </Section>

      <Section title="ClassCard">
        <ClassCard
          classKey="stirrer"
          name="You"
          slot={1}
          current
          width="100%"
          gems={[{ gem: 'sapphire', active: true }, { gem: 'ruby' }, { gem: 'emerald' }]}
          footer="B B R · Limit ×1.5 · Shift"
        />
        <ClassCard
          classKey="taster"
          name="Mei"
          figure="t1f"
          slot={2}
          width="100%"
          gems={[{ gem: 'emerald', active: true }, { gem: 'ruby' }, { gem: 'sapphire' }]}
          footer="G G B · Limit ×1.5 · Break"
        />
        <ClassCard
          classKey="provider"
          name="Dev"
          figure="t2m"
          slot={3}
          width="100%"
          gems={[{ gem: 'ruby', active: true }, { gem: 'sapphire' }, { gem: 'emerald' }]}
          footer="R R G · Limit ×2"
        />
      </Section>

      <Section title="Icon">
        <div className={styles.icons}>
          {ICON_NAMES.map((name) => (
            <figure key={name} className={styles.icon}>
              <Icon name={name} size={24} />
              <figcaption>{name}</figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <Section title="Avatar">
        <div className={styles.row}>
          {CLASS_ORDER.map((k) => (
            <Avatar key={k} classKey={k} size={44} />
          ))}
        </div>
        <div className={styles.row}>
          <Avatar classKey="stirrer" size={96} />
          <Avatar classKey="stirrer" figure="t1f" size={96} />
          <Avatar classKey="stirrer" figure="t2m" size={96} />
        </div>
      </Section>
    </main>
  );
}
