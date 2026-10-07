import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterProvider, createMemoryRouter } from 'react-router';
import { beforeEach, describe, expect, it } from 'vitest';
import { DEFAULT_ME, useMe } from '@/store/me';
import { useOnboarding } from '@/store/onboarding';
import { useToast } from '@/store/toast';
import { Invite } from './Invite';
import { Onboarding } from './Onboarding';

function mount(path: string) {
  const router = createMemoryRouter(
    [
      { path: '/invite', element: <Invite /> },
      { path: '/onboarding', element: <Onboarding /> },
      { path: '/today', element: <p>Today body</p> },
    ],
    { initialEntries: [path] },
  );
  render(<RouterProvider router={router} />);
  return router;
}

describe('onboarding screens', () => {
  beforeEach(() => {
    useOnboarding.getState().reset();
    useMe.setState({ me: DEFAULT_ME, onboarded: false, ready: true });
    act(() => {
      useToast.getState().clear();
    });
  });

  it('the invite screen takes a six-character code before it lets you continue', async () => {
    const router = mount('/invite');
    expect(screen.getByRole('heading', { name: 'You were invited.' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /The Unsorted/ })).toBeInTheDocument();
    const input = screen.getByRole('textbox', { name: 'Invite code' });
    const cta = screen.getByRole('button', { name: 'Continue' });
    expect(cta).toBeDisabled();
    expect(screen.getByText(/Six characters\./)).toBeInTheDocument();
    await userEvent.type(input, 'nus7q');
    expect(input).toHaveValue('NUS7Q');
    expect(cta).toBeDisabled();
    await userEvent.type(input, '2-extra!!');
    expect(input).toHaveValue('NUS7Q2EX');
    expect(screen.getByText('Looks right. Next: a five-question identity test.')).toBeInTheDocument();
    expect(cta).toBeEnabled();
    await userEvent.click(cta);
    expect(router.state.location.pathname).toBe('/onboarding');
  });

  it('five answers reveal the class and its motto; the gem and city follow; Start playing writes the player', async () => {
    const router = mount('/onboarding');
    expect(screen.getByText('Identity test')).toBeInTheDocument();
    expect(screen.getByText('Who you are · 1 of 5')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'orders for the whole table' }));
    await userEvent.click(screen.getByRole('button', { name: 'waste nothing, miss nothing' }));
    await userEvent.click(screen.getByRole('button', { name: 'eat it anyway, all of it' }));
    expect(screen.getByText('Who you are · 4 of 5')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'seat everyone exactly right' }));
    await userEvent.click(screen.getByRole('button', { name: 'neat plater' }));
    expect(screen.getByText('Your class')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Stirrer' })).toBeInTheDocument();
    expect(screen.getByText('Waste nothing. Miss nothing.')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Stirrer class board' })).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Choose your gem' }));
    expect(screen.getByRole('heading', { name: "Choose today's gem" })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sapphire Warden' })).toHaveAttribute('aria-pressed', 'true');
    await userEvent.click(screen.getByRole('button', { name: 'Emerald Mender' }));
    expect(screen.getByText('Emerald · Mender')).toBeInTheDocument();
    expect(screen.getByText(/^The Mender\./)).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Pick your city' }));
    expect(screen.getByRole('heading', { name: 'Where do you play?' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^Singapore/ })).toHaveAttribute('aria-pressed', 'true');
    await userEvent.click(screen.getByRole('button', { name: 'Start playing' }));
    expect(router.state.location.pathname).toBe('/today');
    expect(useMe.getState()).toMatchObject({
      me: { classKey: 'stirrer', gem: 'emerald', city: 'SG' },
      onboarded: true,
    });
    expect(useToast.getState().text).toBe(
      "Welcome, Stirrer. Your first match arrives at 00:00; today's is waiting.",
    );
  });

  it('Retake the test starts the questions again and keeps the gem', async () => {
    mount('/onboarding');
    for (const a of [
      'tastes everything first',
      'keep the craft honest',
      'say so, kindly, with evidence',
      'one thing, done perfectly',
      'feeds the table',
    ])
      await userEvent.click(screen.getByRole('button', { name: a }));
    expect(screen.getByRole('heading', { name: 'Taster' })).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Retake the test' }));
    expect(screen.getByText('Who you are · 1 of 5')).toBeInTheDocument();
    expect(useOnboarding.getState().gem).toBe('sapphire');
  });
});
