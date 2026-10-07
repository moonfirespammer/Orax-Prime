import { useLocation, useNavigate } from 'react-router';
import { Icon } from '@/ds';
import { useNow, clock } from './clock';
import type { ScreenHandle } from './Shell';
import styles from './Header.module.css';

/** Where Back lands when a sub-screen was opened by a link rather than from inside the app: its tab's root. */
export function tabRootOf(pathname: string): string {
  const first = pathname.split('/')[1];
  return first === 'you' ? '/you' : '/today';
}

/** The generic sub-screen header: 44 px back target, heading-sm title, caption subtitle, a pixel-label on the right. */
export function Header({ handle }: { handle: ScreenHandle }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useNow();
  const back = () => {
    const idx = (window.history.state as { idx?: number } | null)?.idx ?? 0;
    if (idx > 0) void navigate(-1);
    else void navigate(tabRootOf(pathname), { replace: true });
  };
  return (
    <header className={styles.header}>
      <button type="button" aria-label="Back" className={styles.back} onClick={back}>
        <Icon name={handle.backIcon ?? 'arrow-left'} size={24} />
      </button>
      <div className={styles.text}>
        <h1 className={styles.title}>{handle.title}</h1>
        {handle.subtitle ? <p className={styles.subtitle}>{handle.subtitle}</p> : null}
      </div>
      <span className={styles.right}>{handle.right === 'resets' ? clock.resetsLabel() : ''}</span>
    </header>
  );
}
