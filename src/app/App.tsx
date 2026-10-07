import { useEffect, useMemo } from 'react';
import styles from './App.module.css';

/**
 * The OraX shell. Phase 1a is the frame only: the theme attribute and a root landmark.
 * Tabs, the Play sheet, the header and routes arrive in phase 2 (MIGRATION §3.2).
 * Dev-only URL parameter: ?theme=light (dark is the default; DESIGN_RULES: dark first, light a full peer).
 */
export function App() {
  const params = useMemo(() => new URLSearchParams(window.location.search), []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', params.get('theme') === 'light' ? 'light' : 'dark');
  }, [params]);

  return (
    <main className={styles.app} data-testid="orax-app">
      <h1>OraX</h1>
    </main>
  );
}
