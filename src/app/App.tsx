import { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router';
import { Gallery } from '@/dev/Gallery';
import { BaselinePlay } from '@/dev/baseline/Play';
import { useShell } from '@/store/shell';
import styles from './App.module.css';

const router = createBrowserRouter([
  // Phase 1 gate: the old BaD host shell's Play screen. Phase 2 puts the real shell and /today here.
  { path: '/', element: <BaselinePlay /> },
  { path: '/ds', element: <Gallery /> },
]);

/**
 * The OraX shell. Phase 1: the theme on <html> (dark first, light a full peer) and the routes.
 * Tabs, the Play sheet, the header and the real screens arrive in phase 2 (MIGRATION §3.2).
 */
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
