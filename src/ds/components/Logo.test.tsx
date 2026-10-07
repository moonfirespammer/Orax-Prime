import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Logo } from './Logo';

describe('Logo (design system: the lock-up as shipped, never reversed)', () => {
  it('auto ground renders the on-dark and the transparent files, the theme shows one', () => {
    render(<Logo />);
    const imgs = screen.getAllByRole('img', { name: 'OraX' });
    expect(imgs).toHaveLength(2);
    expect(imgs[0]).toHaveAttribute('src', expect.stringContaining('orax-logo-on-dark'));
    expect(imgs[1]).toHaveAttribute('src', expect.stringContaining('orax-logo-transparent'));
    expect(imgs[0]).toHaveStyle({ height: '32px' });
  });

  it('a fixed ground renders one file at the given height', () => {
    render(<Logo ground="white" height={48} />);
    const img = screen.getByRole('img', { name: 'OraX' });
    expect(img).toHaveAttribute('src', expect.stringContaining('orax-logo.png'));
    expect(img).toHaveStyle({ height: '48px' });
  });
});
