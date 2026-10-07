import { asset } from '../assets';
import styles from './Logo.module.css';

const FILES = {
  dark: 'assets/Logos/orax-logo-on-dark.png',
  light: 'assets/Logos/orax-logo-transparent.png',
  white: 'assets/Logos/orax-logo.png',
} as const;

export type LogoGround = 'auto' | keyof typeof FILES;

/**
 * The OraX lock-up as shipped, never reversed or recoloured (design system: Logo). `auto` swaps the on-dark file
 * and the transparent file with the theme; `white` is the on-white file for print and white plates. Minimum 32.
 */
export function Logo({
  height = 32,
  ground = 'auto',
  alt = 'OraX',
}: {
  height?: number;
  ground?: LogoGround;
  alt?: string;
}) {
  if (ground !== 'auto') {
    return <img className={styles.logo} src={asset(FILES[ground])} alt={alt} style={{ height }} />;
  }
  return (
    <>
      <img className={`${styles.logo} ${styles.dark}`} src={asset(FILES.dark)} alt={alt} style={{ height }} />
      <img
        className={`${styles.logo} ${styles.light}`}
        src={asset(FILES.light)}
        alt={alt}
        style={{ height }}
      />
    </>
  );
}
