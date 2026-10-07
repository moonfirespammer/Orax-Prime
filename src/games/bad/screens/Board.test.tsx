import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterProvider, createMemoryRouter } from 'react-router';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { Toast } from '@/app/Toast';
import { useToast } from '@/store/toast';
import { Board } from './Board';
import { bootRoom, closeRoom } from './test-room';

function mount() {
  const router = createMemoryRouter(
    [
      { path: '/play/bad', element: <Board /> },
      { path: '/play/bad/station', element: <p>Station body</p> },
    ],
    { initialEntries: ['/play/bad'] },
  );
  render(
    <>
      <RouterProvider router={router} />
      <Toast />
    </>,
  );
  return router;
}

describe('the Board (the prototype’s BaD BOARD on BaD’s rules)', () => {
  beforeEach(() => {
    useToast.getState().clear();
  });
  afterEach(() => {
    closeRoom();
  });

  it('walks the CTA through its five states, with the Bin’s remarks, the chip and the you-are-in line', async () => {
    const user = userEvent.setup();
    await bootRoom();
    const router = mount();
    const cta = () => screen.getByRole('button', { name: /^(Pick|Cook|Swap|No swaps)/ });
    expect(cta()).toHaveTextContent('Pick a dish');
    expect(cta()).toBeDisabled();
    await user.click(screen.getByRole('button', { name: /^Hainanese chicken rice/ }));
    expect(cta()).toHaveTextContent('Pick chicken rice for today');
    await user.click(cta());
    expect(cta()).toHaveTextContent('Cook chicken rice');
    expect(screen.getByText('Chicken rice. The whole city can see that now.')).toBeInTheDocument();
    expect(screen.getByText('Cooking today')).toBeInTheDocument();
    expect(screen.getByText(/^You are in\. \d+ cooking chicken rice right now\.$/)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /^Nasi lemak/ }));
    expect(cta()).toHaveTextContent('Swap to nasi lemak · 1 swap left');
    await user.click(cta());
    expect(cta()).toHaveTextContent('Cook nasi lemak');
    expect(screen.getByText('Swapped to nasi lemak. That was your one.')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /^Hainanese chicken rice/ }));
    expect(cta()).toHaveTextContent('No swaps left today');
    expect(cta()).toBeDisabled();
    await user.click(screen.getByRole('button', { name: /^Nasi lemak/ }));
    expect(cta()).toHaveTextContent('Cook nasi lemak');
    await user.click(cta());
    expect(router.state.location.pathname).toBe('/play/bad/station');
  });

  it('shows the caption, the Cursed Plates count, the stock words, the cooks and the Bin’s counter', async () => {
    await bootRoom();
    mount();
    expect(
      screen.getByText('One shelf for all of Singapore. One dish a day, swap once.'),
    ).toBeInTheDocument();
    expect(screen.getByText('Cursed Plates · 0')).toBeInTheDocument();
    expect(screen.queryByText('Leftovers hour · until 00:00')).not.toBeInTheDocument();
    expect(screen.getByText('Sup kambing')).toBeInTheDocument();
    expect(screen.getAllByText(/^(plenty|moderate|running low|all out)$/)).toHaveLength(5);
    expect(screen.getAllByText('cooking')).toHaveLength(5);
    expect(screen.getByText(/^The Bin has eaten [\d,]+ plates in Singapore today\.$/)).toBeInTheDocument();
  });

  it('shows the Leftovers banner during Leftovers hour', async () => {
    await bootRoom('2026-09-23T21:30:00');
    mount();
    expect(screen.getByText('Leftovers hour · until 00:00')).toBeInTheDocument();
    expect(
      screen.getByText('Portion caps are off on anything the city still has plenty of.'),
    ).toBeInTheDocument();
  });
});
