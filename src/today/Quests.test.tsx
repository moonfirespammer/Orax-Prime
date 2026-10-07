import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { freshDay, useToday } from '@/store/today';
import { Quests } from './Quests';

describe('today’s quests (the prototype’s QUESTS section)', () => {
  beforeEach(() => {
    useToday.setState({ ...freshDay('2026-09-23'), ready: true });
  });

  it('lists five, lets two be picked, and lets the other three expire', async () => {
    const user = userEvent.setup();
    render(<Quests />);
    expect(
      screen.getByText(
        'A card of five every day. Pick two; the rest expire at 00:00. Every quest is done by playing, and every reward is a chip or a trim.',
      ),
    ).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(5);
    expect(screen.getByText('BaD · Packed Lunch: a four-wide Special offer tonight')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /^Plate every required ingredient/ }));
    await user.click(screen.getByRole('button', { name: /^Take a front slot/ }));
    expect(screen.getAllByText('Picked')).toHaveLength(2);
    expect(screen.getAllByText('Expires 00:00')).toHaveLength(3);
    expect(screen.getByRole('button', { name: /^Land a Trinity combo/ })).toBeDisabled();
    expect(screen.getByRole('button', { name: /^Take a front slot/ })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    await user.click(screen.getByRole('button', { name: /^Take a front slot/ }));
    expect(screen.queryByText('Expires 00:00')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^Land a Trinity combo/ })).toBeEnabled();
  });

  it('a quest done by play says Done', () => {
    useToday.setState({ picked: ['q1'], done: { q1: true } });
    render(<Quests />);
    expect(screen.getByText('Done')).toBeInTheDocument();
    expect(screen.queryByText('Picked')).not.toBeInTheDocument();
  });
});
