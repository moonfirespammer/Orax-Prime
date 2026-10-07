import { useState } from 'react';
import { ClassCard, Icon, Logo } from '@/ds';
import { TabBar, type Tab } from './TabBar';
import styles from './Play.module.css';

// Copy and measurements of record: docs/handoff/OraX-Baseline.dc.html, "Baseline Play" (the old BaD host shell,
// ../BaD/src/screens/Play.tsx, recreated from source). Static by design: it is the phase 1 gate, not a product screen.
const COPY = {
  notifications: 'Notifications',
  venue: 'Tiong Bahru Market',
  venueCaption: 'Singapore · 400 m · tonight 19:30',
  entry: 'Build-A-Dish',
  entryCaption: '128 cooking in Singapore · resets 5h 12m',
  party: 'Your party',
  round: 'ROUND 1 · LIMIT ×2',
  main: 'Main',
} as const;

/** MIGRATION §6 gate 1: the old BaD host shell's Play screen, pixel for pixel, on the ported design system. */
export function BaselinePlay() {
  const [tab, setTab] = useState<Tab>('play');
  return (
    <div className={styles.screen}>
      <main className={styles.scroll} aria-label="Play">
        <header className={styles.header}>
          <Logo height={32} />
          <button type="button" className={styles.iconButton} aria-label={COPY.notifications}>
            <Icon name="bell" size={24} />
          </button>
        </header>
        <section className={styles.section}>
          <div className={styles.row}>
            <span className={styles.brandIcon}>
              <Icon name="map-pin" size={24} />
            </span>
            <div className={styles.rowText}>
              <div className={styles.strong}>{COPY.venue}</div>
              <div className={styles.caption}>{COPY.venueCaption}</div>
            </div>
            <span className={styles.mutedIcon}>
              <Icon name="chevron-right" size={20} />
            </span>
          </div>
        </section>
        <section className={styles.section}>
          <div className={`${styles.row} ${styles.entry}`}>
            <span className={styles.brandIcon}>
              <Icon name="utensils" size={24} />
            </span>
            <div className={styles.rowText}>
              <div className={styles.strong}>{COPY.entry}</div>
              <div className={styles.caption}>{COPY.entryCaption}</div>
            </div>
            <span className={styles.mutedIcon}>
              <Icon name="chevron-right" size={20} />
            </span>
          </div>
        </section>
        <div className={styles.partyHead}>
          <h1 className={styles.h1}>{COPY.party}</h1>
          <span className={`${styles.pixel} ${styles.round}`}>{COPY.round}</span>
        </div>
        <div className={styles.cards}>
          <ClassCard
            classKey="stirrer"
            figure="t1m"
            slot={1}
            current
            width="100%"
            gems={[{ gem: 'sapphire' }, { gem: 'sapphire' }, { gem: 'sapphire', active: true }]}
            footer="Limit ×1.5 · Shift"
          />
          <ClassCard
            classKey="taster"
            figure="t1f"
            slot={2}
            width="100%"
            gems={[{ gem: 'emerald' }, { gem: 'emerald' }, { gem: 'sapphire' }]}
            footer="Limit ×1.5 · Break"
          />
          <ClassCard
            classKey="provider"
            figure="t2m"
            slot={3}
            width="100%"
            gems={[{ gem: 'ruby' }, { gem: 'ruby' }, { gem: 'emerald', active: true }]}
            footer="Limit ×2"
          />
        </div>
      </main>
      <TabBar tab={tab} onTab={setTab} label={COPY.main} />
    </div>
  );
}
