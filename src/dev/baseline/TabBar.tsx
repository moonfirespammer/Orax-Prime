import { Icon, type IconName } from '@/ds';
import styles from './TabBar.module.css';

export type Tab = 'play' | 'classes' | 'you' | 'dish';

const TABS: { key: Tab; label: string; icon: IconName }[] = [
  { key: 'play', label: 'Play', icon: 'sparkles' },
  { key: 'classes', label: 'Classes', icon: 'shirt' },
  { key: 'you', label: 'You', icon: 'user' },
  { key: 'dish', label: 'Dish', icon: 'utensils' },
];

/**
 * The old BaD host shell's four tabs (../BaD/src/components/TabBar.tsx): min-height 56, icon 24 over a caption,
 * the active one in brand-text at weight 500. Phase 2 replaces it with Today · Play · You.
 */
export function TabBar({ tab, onTab, label }: { tab: Tab; onTab: (t: Tab) => void; label: string }) {
  return (
    <nav aria-label={label} className={styles.nav}>
      {TABS.map((t) => {
        const active = t.key === tab;
        return (
          <button
            key={t.key}
            type="button"
            className={`${styles.tab} ${active ? styles.active : ''}`}
            aria-current={active ? 'page' : undefined}
            onClick={() => onTab(t.key)}
          >
            <Icon name={t.icon} size={24} />
            <span>{t.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
