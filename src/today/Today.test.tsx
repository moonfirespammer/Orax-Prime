import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterProvider, createMemoryRouter } from 'react-router';
import { beforeEach, describe, expect, it } from 'vitest';
import { useToday } from '@/store/today';
import { Today } from './Today';

function mount() {
  const router = createMemoryRouter(
    [
      { path: '/today', element: <Today /> },
      { path: '*', element: <p>elsewhere</p> },
    ],
    {
      initialEntries: ['/today'],
    },
  );
  render(<RouterProvider router={router} />);
  return router;
}

describe('Today · direction 1a', () => {
  beforeEach(() => {
    useToday.setState({ matchState: 'new', picked: [], done: {} });
  });

  it('shows the match with shared habits filled and never a percentage', () => {
    mount();
    expect(screen.getByText('Nadia')).toBeInTheDocument();
    expect(screen.getByText('Rebel')).toBeInTheDocument();
    expect(screen.getByText('2 habits in common · your palates argue well')).toBeInTheDocument();
    expect(screen.getByText('Doubles the chilli').className).toContain('filled');
    expect(screen.getByText('Takes the hot node').className).toContain('subtle');
    expect(document.body.textContent).not.toMatch(/\d+ ?%/);
    expect(screen.getByRole('button', { name: "Open today's match" })).toBeInTheDocument();
  });

  it('answers the match: Connect opens the chat offer, Not today closes it until 00:00', async () => {
    mount();
    await userEvent.click(screen.getByRole('button', { name: 'Not today' }));
    expect(screen.getByText("Not today. Tomorrow's match arrives at 00:00.")).toBeInTheDocument();
    act(() => {
      useToday.setState({ matchState: 'new' });
    });
    await userEvent.click(screen.getByRole('button', { name: 'Connect' }));
    expect(screen.getByRole('button', { name: 'Open the chat with Nadia' })).toBeInTheDocument();
  });

  it('lets two quests be picked; the other three then expire', async () => {
    mount();
    expect(screen.getByText('Pick two · 0 picked')).toBeInTheDocument();
    const rows = screen.getAllByRole('button', { pressed: false }).filter((b) => b.textContent.includes('·'));
    expect(rows).toHaveLength(5);
    await userEvent.click(screen.getByRole('button', { name: /^Plate every required ingredient/ }));
    await userEvent.click(screen.getByRole('button', { name: /^Take a front slot/ }));
    expect(screen.getByText('Pick two · 2 picked')).toBeInTheDocument();
    expect(screen.getAllByText('Picked')).toHaveLength(2);
    expect(screen.getAllByText('Expires 00:00')).toHaveLength(3);
    expect(screen.getByRole('button', { name: /^Land a Trinity combo/ })).toBeDisabled();
  });

  it('lists tonight’s four rooms and three of the seven digest items', () => {
    const router = mount();
    for (const r of ['Build-A-Dish', 'HMD · the last stand', 'OXP · Table Wars', 'City · venue raid'])
      expect(
        screen.getByRole('button', { name: new RegExp(`^${r.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`) }),
      ).toBeInTheDocument();
    expect(screen.getByText("Today's digest · 7")).toBeInTheDocument();
    expect(screen.getByText(/Mei plated Nasi lemak/)).toBeInTheDocument();
    expect(screen.queryByText(/Best plate in Singapore today/)).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: "Read all 7 · then that's all for today" }),
    ).toBeInTheDocument();
    expect(router.state.location.pathname).toBe('/today');
  });
});
