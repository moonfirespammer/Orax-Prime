import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './Button';
import { Icon } from './Icon';

describe('Button (design system: the one action control)', () => {
  it('is a type=button with a variant class and an optional decorative icon', async () => {
    const onClick = vi.fn();
    const { container } = render(
      <Button variant="secondary" icon={<Icon name="utensils" />} onClick={onClick}>
        Cook chicken rice
      </Button>,
    );
    const btn = screen.getByRole('button', { name: 'Cook chicken rice' });
    expect(btn).toHaveAttribute('type', 'button');
    expect(btn.className).toContain('secondary');
    expect(container.querySelector('[aria-hidden="true"] svg')).toBeInTheDocument();
    await userEvent.click(btn);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('done keeps focus and the label but ignores presses', async () => {
    const onClick = vi.fn();
    render(
      <Button done onClick={onClick}>
        Picked
      </Button>,
    );
    const btn = screen.getByRole('button', { name: 'Picked' });
    expect(btn).toHaveAttribute('aria-disabled', 'true');
    expect(btn).not.toBeDisabled();
    await userEvent.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('renders a link with href, unless disabled', () => {
    const { rerender } = render(<Button href="/today">Back to Today</Button>);
    expect(screen.getByRole('link', { name: 'Back to Today' })).toHaveAttribute('href', '/today');
    rerender(
      <Button href="/today" disabled>
        Back to Today
      </Button>,
    );
    expect(screen.getByRole('button', { name: 'Back to Today' })).toBeDisabled();
  });

  it('block fills the row', () => {
    render(<Button block>Check in</Button>);
    expect(screen.getByRole('button', { name: 'Check in' }).className).toContain('block');
  });
});
