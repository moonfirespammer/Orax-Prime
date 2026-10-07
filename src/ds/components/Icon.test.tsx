import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ICON_NAMES, Icon } from './Icon';

describe('Icon (design system: the interim Lucide set)', () => {
  it('is decorative unless labelled, at 1.5 px stroke', () => {
    const { container } = render(<Icon name="settings" size={24} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg).toHaveAttribute('stroke-width', '1.5');
    expect(svg).toHaveAttribute('width', '24');
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('becomes an image when labelled', () => {
    render(<Icon name="map-pin" label="Place" />);
    expect(screen.getByRole('img', { name: 'Place' })).toBeInTheDocument();
  });

  it('covers every name the prototype uses', () => {
    for (const n of [
      'arrow-left',
      'x',
      'settings',
      'chevron-right',
      'flame',
      'swords',
      'utensils',
      'map-pin',
    ])
      expect(ICON_NAMES).toContain(n);
  });
});
