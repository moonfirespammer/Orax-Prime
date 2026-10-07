import { useToast } from '@/store/toast';
import styles from './Toast.module.css';

/**
 * The toast (prototype TOAST): a live region that is always mounted so screen readers announce the swap of text;
 * the card itself mounts only while a line is showing.
 */
export function Toast() {
  const overline = useToast((s) => s.overline);
  const text = useToast((s) => s.text);
  const seq = useToast((s) => s.seq);
  return (
    <div role="status" aria-live="polite" className={styles.region}>
      {text ? (
        <div key={seq} className={styles.card} data-testid="toast">
          <span className={styles.overline}>{overline}</span>
          <p className={styles.body}>{text}</p>
        </div>
      ) : null}
    </div>
  );
}
