import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { StoneRow } from './StoneRow';

describe('StoneRow', () => {
  it('reads as one image, lights the stones in the gem fill and keeps the rest in the border', () => {
    const { container } = render(<StoneRow gem="sapphire" stones={2} />);
    expect(screen.getByRole('img', { name: '2 of 3 sapphires' })).toBeInTheDocument();
    const stones = container.querySelectorAll<HTMLElement>('[role="img"] > span');
    expect(stones).toHaveLength(3);
    expect(stones[0]?.style.boxShadow).toContain('var(--gem-sapphire-fill)');
    expect(stones[2]?.style.boxShadow).toContain('var(--border)');
    expect(stones[0]?.querySelector('span')).not.toBeNull();
    expect(stones[2]?.querySelector('span')).toBeNull();
  });

  it('sets the emerald as a diamond and the ruby round', () => {
    const { container } = render(
      <>
        <StoneRow gem="emerald" stones={3} />
        <StoneRow gem="ruby" stones={0} size={24} />
      </>,
    );
    const [emerald, ruby] = container.querySelectorAll<HTMLElement>('[role="img"]');
    expect(emerald?.firstElementChild).toHaveStyle({ transform: 'rotate(45deg)', borderRadius: '3px' });
    expect(ruby?.firstElementChild).toHaveStyle({ borderRadius: 'var(--radius-full)', width: '24px' });
    expect(screen.getByRole('img', { name: '0 of 3 rubies' })).toBeInTheDocument();
  });
});
