import { useLocation, useNavigate } from 'react-router';
import { Icon } from '@/ds';
import { useShell } from '@/store/shell';
import styles from './TabBar.module.css';

const COPY = { main: 'Main', today: 'Today', play: 'Play', you: 'You' } as const;

/** Three tabs with a centre Play button (PRODUCT_SPEC §4): Today · [Play] · You. The button opens the Play sheet. */
export function TabBar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const openSheet = useShell((s) => s.openSheet);
  const tab = (key: 'today' | 'you', icon: 'sun' | 'user', label: string) => {
    const current = pathname === `/${key}`;
    return (
      <button
        type="button"
        className={`${styles.tab} ${current ? styles.active : ''}`}
        aria-current={current ? 'page' : undefined}
        onClick={() => void navigate(`/${key}`)}
      >
        <Icon name={icon} size={24} />
        <span>{label}</span>
      </button>
    );
  };
  return (
    <nav aria-label={COPY.main} className={styles.nav}>
      {tab('today', 'sun', COPY.today)}
      <div className={styles.centre}>
        <button
          type="button"
          aria-label={COPY.play}
          className={styles.play}
          onClick={() => openSheet('play')}
        >
          <Icon name="play" size={26} />
        </button>
      </div>
      {tab('you', 'user', COPY.you)}
    </nav>
  );
}
