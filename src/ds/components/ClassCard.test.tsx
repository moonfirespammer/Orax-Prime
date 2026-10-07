import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ClassCard } from './ClassCard';

describe('ClassCard (design system: the roster card)', () => {
  it('shows the class name in its accent, the role eyebrow, the slot, three sockets and the footer', () => {
    const { container } = render(
      <ClassCard
        classKey="stirrer"
        slot={2}
        gems={[{ gem: 'ruby' }, { gem: 'sapphire', active: true }, { gem: 'emerald' }]}
        footer="B B R · Limit ×1.5 · Shift"
      />,
    );
    expect(screen.getByText('Stirrer')).toHaveStyle({ color: 'var(--class-stirrer)' });
    expect(screen.getByText('Mage')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getAllByRole('img')).toHaveLength(3);
    expect(screen.getByText('B B R · Limit ×1.5 · Shift')).toBeInTheDocument();
    const card = container.firstElementChild as HTMLElement;
    expect(card.style.borderColor).toBe('var(--border)');
    expect(card.style.width).toBe('300px');
    expect(card).not.toHaveAttribute('aria-current');
  });

  it('on its turn takes the active gem fill as its edge, the only coloured card edge', () => {
    const { container } = render(
      <ClassCard
        classKey="taster"
        name="Mei"
        role=""
        figure="t1f"
        current
        width="100%"
        gems={[{ gem: 'emerald', active: true }, { gem: 'ruby' }, { gem: 'sapphire' }]}
      />,
    );
    const card = container.firstElementChild as HTMLElement;
    expect(card.style.borderColor).toBe('var(--gem-emerald-fill)');
    expect(card.style.width).toBe('100%');
    expect(card).toHaveAttribute('aria-current', 'true');
    expect(screen.getByText('Mei')).toBeInTheDocument();
    expect(screen.queryByText('Rogue')).not.toBeInTheDocument();
    expect(screen.queryByText('Taster')).not.toBeInTheDocument();
  });
});
