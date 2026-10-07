import styles from './Pending.module.css';

/** A sub-screen whose body a later phase fills (MIGRATION §6). The header above it is already the real one. */
export function Pending() {
  return <main className={styles.body} />;
}
