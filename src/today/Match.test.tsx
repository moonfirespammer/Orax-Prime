import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterProvider, createMemoryRouter } from 'react-router';
import { beforeEach, describe, expect, it } from 'vitest';
import { Toast } from '@/app/Toast';
import { DEFAULT_ME, useMe } from '@/store/me';
import { freshDay, useToday } from '@/store/today';
import { useToast } from '@/store/toast';
import { Match } from './Match';

function mount() {
  const router = createMemoryRouter(
    [
      { path: '/today/match', element: <Match /> },
      { path: '/today/chat', element: <p>Chat body</p> },
    ],
    { initialEntries: ['/today/match'] },
  );
  render(
    <>
      <RouterProvider router={router} />
      <Toast />
    </>,
  );
  return router;
}

describe('the daily match (the prototype’s MATCH section)', () => {
  beforeEach(() => {
    useToday.setState({ ...freshDay('2026-09-23'), ready: true });
    useMe.setState({ me: DEFAULT_ME, onboarded: true, ready: true });
    useToast.getState().clear();
  });

  it('shows who, what you share and the palates, never a score', () => {
    mount();
    expect(screen.getByText('One match a day')).toBeInTheDocument();
    expect(screen.getByText('Nadia')).toBeInTheDocument();
    expect(screen.getByText('Rebel')).toBeInTheDocument();
    expect(screen.getByText('Fighter')).toBeInTheDocument();
    for (const chip of ['Ruby', '2.1 km', 'Singapore']) expect(screen.getByText(chip)).toBeInTheDocument();
    expect(
      screen.getByText('Matched on habits and palate, never on skill. No score, no percentage.'),
    ).toBeInTheDocument();
    expect(screen.getByText('What you share')).toBeInTheDocument();
    for (const h of ['Doubles the chilli', 'Late shift', 'Takes the hot node', 'Off the recipe'])
      expect(screen.getByText(h)).toBeInTheDocument();
    expect(screen.getByText('Filled chips are habits you both have. The rest are hers.')).toBeInTheDocument();
    expect(
      screen.getByText(
        'A Rebel’s palate: off the recipe. Yours, the Stirrer: leftovers. The Bin says you would argue well over a plate, and finish it.',
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("Today's quest")).toBeInTheDocument();
    expect(screen.getByText(/^Cook nasi lemak at the same time tonight\./)).toBeInTheDocument();
    expect(screen.queryByText(/%/)).not.toBeInTheDocument();
  });

  it('Connect says so and offers the chat; the chat opens', async () => {
    const user = userEvent.setup();
    const router = mount();
    await user.click(screen.getByRole('button', { name: 'Connect' }));
    expect(screen.getByText('Connected. The quest is the first message in your chat.')).toBeInTheDocument();
    expect(useToday.getState().matchState).toBe('connected');
    await user.click(screen.getByRole('button', { name: 'Open the chat' }));
    expect(router.state.location.pathname).toBe('/today/chat');
  });

  it('Not today closes the match until 00:00', async () => {
    const user = userEvent.setup();
    mount();
    await user.click(screen.getByRole('button', { name: 'Not today' }));
    expect(screen.getByText("Not today. Tomorrow's match arrives at 00:00.")).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Connect' })).not.toBeInTheDocument();
  });
});
