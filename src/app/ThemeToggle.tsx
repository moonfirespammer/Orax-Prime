import { Icon } from '@/ds';
import { useShell } from '@/store/shell';
import styles from './ThemeToggle.module.css';

/** The prototype's theme switch: the 44 px Settings button in the You header, which toggles dark and light. */
export function ThemeToggle() {
  const toggleTheme = useShell((s) => s.toggleTheme);
  return (
    <button type="button" className={styles.button} aria-label="Settings" onClick={toggleTheme}>
      <Icon name="settings" size={24} />
    </button>
  );
}
