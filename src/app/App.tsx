import { useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { useShell } from '@/store/shell';
import styles from './App.module.css';
import { router } from './routes';

/** The OraX app: the theme on <html> (dark first, light a full peer) and the router with the shell inside it. */
export function App() {
  const theme = useShell((s) => s.theme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className={styles.app} data-testid="orax-app">
      <RouterProvider router={router} />
    </div>
  );
}
