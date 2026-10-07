import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  block?: boolean;
  /** Optional 20 px leading icon, decorative. */
  icon?: ReactNode;
  /** Renders a link styled as a button (ignored when disabled). */
  href?: string;
  /**
   * The button just did its thing: it looks disabled and ignores presses, but keeps keyboard focus and
   * announces its new label instead of dropping focus to the page.
   */
  done?: boolean;
}

/**
 * The one action control (design system: Button). primary = brand fill, pressed brand-deep; secondary = raised +
 * border-strong; ghost = brand-text. 44 px minimum, radius-md, body-strong, never pixel type.
 */
export function Button({
  variant = 'primary',
  block = false,
  icon,
  href,
  className,
  children,
  done = false,
  onClick,
  disabled,
  ...rest
}: ButtonProps) {
  const cls = [styles.btn, styles[variant], block ? styles.block : '', className ?? '']
    .filter(Boolean)
    .join(' ');
  const inner = (
    <>
      {icon ? (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <span>{children}</span>
    </>
  );
  if (href !== undefined && !disabled) {
    return (
      <a className={cls} href={href}>
        {inner}
      </a>
    );
  }
  return (
    <button
      type="button"
      className={cls}
      disabled={disabled}
      aria-disabled={done || undefined}
      aria-live={done ? 'polite' : undefined}
      onClick={done ? undefined : onClick}
      {...rest}
    >
      {inner}
    </button>
  );
}
