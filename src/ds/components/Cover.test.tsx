import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { COVER_HEIGHT, COVER_WIDTH, Cover } from './Cover';

describe('Cover (design system: the one approved decorative motif)', () => {
  it('draws the block composition, the real logo and the tagline strip', () => {
    const { container } = render(<Cover />);
    expect(container.querySelectorAll('rect')).toHaveLength(18);
    expect(screen.getByRole('img', { name: 'OraX' })).toHaveAttribute(
      'src',
      expect.stringContaining('orax-logo-on-dark'),
    );
    expect(container.querySelector('p')?.textContent).toBe('The game is life · Play it together');
    const frame = container.firstElementChild as HTMLElement;
    expect(frame.style.width).toBe(`${COVER_WIDTH}px`);
    expect(frame.style.height).toBe(`${COVER_HEIGHT}px`);
  });

  it('scales to fit and uses the transparent logo on light', () => {
    const { container } = render(<Cover theme="light" scale={0.5} />);
    const frame = container.firstElementChild as HTMLElement;
    expect(frame.style.width).toBe('480px');
    expect(frame.style.height).toBe('144px');
    expect(container.querySelector('[data-theme="light"]')).toHaveStyle({ transform: 'scale(0.5)' });
    expect(screen.getByRole('img', { name: 'OraX' })).toHaveAttribute(
      'src',
      expect.stringContaining('orax-logo-transparent'),
    );
  });
});
