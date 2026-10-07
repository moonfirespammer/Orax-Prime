import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Tagline } from './Tagline';

describe('Tagline (design system: two lines, accent on the last word)', () => {
  it('renders both lines with LIFE and TOGETHER in brand-text', () => {
    const { container } = render(<Tagline />);
    const lines = container.querySelectorAll('.line');
    expect(Array.from(lines).map((l) => l.textContent)).toEqual(['THE GAME IS LIFE', 'PLAY IT TOGETHER']);
    const accents = container.querySelectorAll('.accent');
    expect(Array.from(accents).map((a) => a.textContent)).toEqual(['LIFE', 'TOGETHER']);
    expect(container.firstElementChild?.className).toContain('lg');
  });

  it('has a medium size and an alignment', () => {
    const { container } = render(<Tagline size="md" align="center" />);
    const p = container.firstElementChild as HTMLElement;
    expect(p.className).toContain('md');
    expect(p.style.textAlign).toBe('center');
  });
});
