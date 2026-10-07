import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterProvider, createMemoryRouter } from 'react-router';
import { beforeEach, describe, expect, it } from 'vitest';
import { useShell } from '@/store/shell';
import { Pending } from './Pending';
import { Shell, header, tabs } from './Shell';
import { tabRootOf } from './Header';

function mount(path: string) {
  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: <Shell />,
        children: [
          { path: 'today', handle: tabs, element: <div>Today body</div> },
          {
            path: 'today/quests',
            handle: header('Today’s quests', 'Pick two', 'resets'),
            element: <Pending />,
          },
          { path: 'you', handle: tabs, element: <div>You body</div> },
          {
            path: 'play/oxp',
            handle: header('OXP · Table Wars', 'Three seats · ten rounds'),
            element: <Pending />,
          },
        ],
      },
    ],
    { initialEntries: [path] },
  );
  render(<RouterProvider router={router} />);
  return router;
}

describe('the shell: tabs, Play sheet, header', () => {
  beforeEach(() => {
    useShell.setState({ sheet: null });
  });

  it('shows the three-tab bar on a tab screen with the current tab marked', async () => {
    const router = mount('/today');
    const nav = screen.getByRole('navigation', { name: 'Main' });
    expect(nav.querySelector('[aria-current="page"]')).toHaveTextContent('Today');
    expect(screen.getByRole('button', { name: 'Play' })).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'You' }));
    expect(router.state.location.pathname).toBe('/you');
    expect(screen.getByText('You body')).toBeInTheDocument();
  });

  it('opens the Play sheet from the centre button and closes it on the scrim', async () => {
    mount('/today');
    await userEvent.click(screen.getByRole('button', { name: 'Play' }));
    const sheet = screen.getByRole('dialog', { name: 'Play' });
    expect(sheet).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^Build-A-Dish/ })).toBeInTheDocument();
    expect(screen.getByText('Matched by who you are, not by skill.')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('a room in the sheet closes it and opens the room under its header', async () => {
    const router = mount('/today');
    await userEvent.click(screen.getByRole('button', { name: 'Play' }));
    await userEvent.click(screen.getByRole('button', { name: /^OXP · Table Wars/ }));
    expect(router.state.location.pathname).toBe('/play/oxp');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'OXP · Table Wars' })).toBeInTheDocument();
    expect(screen.getByText('Three seats · ten rounds')).toBeInTheDocument();
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });

  it('a sub-screen header carries the reset countdown when asked, and Back returns', async () => {
    const router = mount('/today/quests');
    expect(screen.getByRole('heading', { name: 'Today’s quests' })).toBeInTheDocument();
    expect(screen.getByText(/^Resets \d+h \d\dm$/)).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Back' }));
    expect(router.state.location.pathname).toBe('/today');
  });

  it('Back from a deep link lands on the tab root', () => {
    expect(tabRootOf('/you/wardrobe')).toBe('/you');
    expect(tabRootOf('/today/match')).toBe('/today');
    expect(tabRootOf('/play/bad')).toBe('/today');
  });
});
