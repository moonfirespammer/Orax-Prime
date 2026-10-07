import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Chip } from './Chip';

describe('Chip (design system: labels, not buttons)', () => {
  it('names the gem when a gem chip has no children', () => {
    render(<Chip variant="sapphire" />);
    const chip = screen.getByText('Sapphire');
    expect(chip.tagName).toBe('SPAN');
    expect(chip.className).toContain('gemFilled');
    expect(chip.style.getPropertyValue('--chip-fill')).toBe('var(--gem-sapphire-fill)');
  });

  it('has filled, outline and subtle brand appearances', () => {
    render(
      <>
        <Chip>Tonight</Chip>
        <Chip appearance="outline">Proposed</Chip>
        <Chip appearance="subtle">Singapore</Chip>
        <Chip variant="ruby" appearance="outline">
          Rare here
        </Chip>
      </>,
    );
    expect(screen.getByText('Tonight').className).toContain('filled');
    expect(screen.getByText('Proposed').className).toContain('outline');
    expect(screen.getByText('Singapore').className).toContain('subtle');
    expect(screen.getByText('Rare here').className).toContain('gemOutline');
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
