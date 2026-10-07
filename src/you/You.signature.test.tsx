import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { afterEach, describe, expect, it } from 'vitest';
import { DEFAULT_ME, useMe } from '@/store/me';
import { You } from './You';

describe('You · the Signature Dish', () => {
  afterEach(() => {
    useMe.setState({ me: DEFAULT_ME });
  });

  it('shows the kept verdict with its label, date and stones in the player’s gem', () => {
    useMe.setState({
      me: {
        ...DEFAULT_ME,
        gem: 'emerald',
        signature: {
          name: 'Seared chicken rice',
          label: 'Academy acceptable',
          line: 'Fine.',
          stones: 2,
          score: 80,
          style: 'Neat',
          cursed: false,
          habit: 'A new habit is forming',
          leftoversUsed: false,
          summary: '',
          dishId: 'chicken-rice',
          key: 1,
          flags: { chilli: false, rawRice: false },
          date: '23 Sep 2026',
        },
      },
    });
    render(
      <MemoryRouter>
        <You />
      </MemoryRouter>,
    );
    expect(screen.getByText('Seared chicken rice')).toBeInTheDocument();
    expect(screen.getByText('Academy acceptable · 23 Sep 2026')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: '2 of 3 emeralds' })).toBeInTheDocument();
    expect(screen.getByText('Dish render')).toBeInTheDocument();
    expect(screen.queryByText('No Signature Dish yet. Cook one and keep it.')).not.toBeInTheDocument();
  });
});
