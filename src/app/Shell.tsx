import { useEffect } from 'react';
import { Outlet, useMatches } from 'react-router';
import { useToday } from '@/store/today';
import { clock, useNow } from './clock';
import { Header } from './Header';
import { PlaySheet } from './PlaySheet';
import { TabBar } from './TabBar';
import { Toast } from './Toast';
import styles from './Shell.module.css';

/** What chrome a screen gets (PRODUCT_SPEC §4): tabs on Today and You, a header on sub-screens, nothing when immersive. */
export interface ScreenHandle {
  chrome: 'tabs' | 'header' | 'none';
  title?: string;
  subtitle?: string;
  /** The pixel-label on the right of the header: the reset countdown on daily screens. */
  right?: 'resets';
  backIcon?: 'arrow-left' | 'x';
}

export const tabs: ScreenHandle = { chrome: 'tabs' };
export const header = (title: string, subtitle: string, right?: 'resets', backIcon?: 'x'): ScreenHandle => ({
  chrome: 'header',
  title,
  subtitle,
  ...(right ? { right } : {}),
  ...(backIcon ? { backIcon } : {}),
});

const isHandle = (h: unknown): h is ScreenHandle =>
  typeof h === 'object' && h !== null && 'chrome' in h && typeof (h as ScreenHandle).chrome === 'string';

/** Watches the Singapore date: at 00:00 the match, the picks and the done flags start again (PRODUCT_SPEC §5.2). */
function DayWatch() {
  const now = useNow();
  useEffect(() => {
    useToday.getState().ensureDay(clock.city().date);
  }, [now]);
  return null;
}

/** The phone frame: a screen over a pinned tab bar, the Play sheet and the toast above it (MIGRATION §3.2). */
export function Shell() {
  const matches = useMatches();
  const found = [...matches].reverse().find((m) => isHandle(m.handle))?.handle;
  const handle: ScreenHandle = isHandle(found) ? found : { chrome: 'none' };
  return (
    <div className={styles.frame}>
      {handle.chrome === 'header' ? <Header handle={handle} /> : null}
      <Outlet />
      {handle.chrome === 'tabs' ? <TabBar /> : null}
      <PlaySheet />
      <Toast />
      <DayWatch />
    </div>
  );
}
