import { TAGLINE } from '../data';
import styles from './Tagline.module.css';

/**
 * The two-line brand lock-up in Silkscreen (design system: Tagline): THE GAME IS LIFE over PLAY IT TOGETHER,
 * never joined, never reworded; the last word of each line in brand-text. `lg` for a hero, `md` for a card or footer.
 */
export function Tagline({
  size = 'lg',
  align = 'left',
}: {
  size?: 'lg' | 'md';
  align?: 'left' | 'center' | 'right';
}) {
  return (
    <p className={`${styles.tagline} ${styles[size]}`} style={{ textAlign: align }}>
      {TAGLINE.map((line) => {
        const cut = line.lastIndexOf(' ') + 1;
        return (
          <span key={line} className={styles.line}>
            {line.slice(0, cut)}
            <span className={styles.accent}>{line.slice(cut)}</span>
          </span>
        );
      })}
    </p>
  );
}
