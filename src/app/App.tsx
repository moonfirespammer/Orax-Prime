import { useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { captureInstallPrompt } from '@/services/install';
import { useMe } from '@/store/me';
import { useShell } from '@/store/shell';
import { useToday } from '@/store/today';
import styles from './App.module.css';
import { clock } from './clock';
import { router } from './routes';

/** The OraX app: the theme on <html> (dark first, light a full peer) and the router with the shell inside it. */
export function App() {
  const theme = useShell((s) => s.theme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    captureInstallPrompt();
    void useMe.getState().hydrate();
    void useToday.getState().hydrate(clock.city().date);
  }, []);

  return (
    <div className={styles.app} data-testid="orax-app">
      <RouterProvider router={router} />
    </div>
  );
}
