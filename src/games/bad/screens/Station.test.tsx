import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterProvider, createMemoryRouter } from 'react-router';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { Toast } from '@/app/Toast';
import { useShell } from '@/store/shell';
import { useToast } from '@/store/toast';
import { useGame } from '../store';
import { Station } from './Station';
import { bootRoom, closeRoom } from './test-room';

function mount() {
  const router = createMemoryRouter(
    [
      { path: '/play/bad', element: <p>Board body</p> },
      { path: '/play/bad/station', element: <Station /> },
      { path: '/play/bad/verdict', element: <p>Verdict body</p> },
    ],
    { initialEntries: ['/play/bad/station'] },
  );
  render(
    <>
      <RouterProvider router={router} />
      <Toast />
    </>,
  );
  return router;
}

async function pickChickenRice() {
  useGame.getState().selectDish('chicken-rice');
  await act(() => useGame.getState().pickSelected());
  useToast.getState().clear();
}

const card = (id: string): HTMLElement => {
  const add = within(screen.getByTestId(`pantry-${id}`)).getAllByRole('button')[0];
  if (!add) throw new Error(`no Pantry card for ${id}`);
  return add;
};
const chips = () => screen.getByTestId('plate-chips');

describe('the Station (the prototype’s BaD STATION on BaD’s rules)', () => {
  beforeEach(() => {
    useToast.getState().clear();
  });
  afterEach(() => {
    closeRoom();
    useShell.getState().clearHeader();
  });

  it('without a pick it returns to the Board', async () => {
    await bootRoom();
    const router = mount();
    expect(router.state.location.pathname).toBe('/play/bad');
  });

  it('names the dish in the header, starts empty, and lists the Pantry with its extras', async () => {
    await bootRoom();
    await pickChickenRice();
    mount();
    expect(useShell.getState().header).toEqual({
      title: 'Hainanese chicken rice',
      subtitle: 'Tap the Pantry · stroke the pad',
    });
    expect(screen.getByText('Nothing yet. Tap the Pantry to add a portion.')).toBeInTheDocument();
    expect(screen.getByText('Empty · Flair ×0')).toBeInTheDocument();
    expect(screen.getByText('Pantry · Singapore')).toBeInTheDocument();
    expect(screen.getByText('Cap 3 portions · leftovers hour 21:00')).toBeInTheDocument();
    expect(screen.getByText('Pantry extras')).toBeInTheDocument();
    expect(
      screen.getByText('Shared across all five dishes. Use responsibly, or do not.'),
    ).toBeInTheDocument();
    expect(screen.getAllByText('off-recipe')).toHaveLength(4);
    expect(screen.getByText('Buttons or strokes. Nothing you draw can fail.')).toBeInTheDocument();
    expect(screen.getByText('or flick up on the sigil pad')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Wipe' })).not.toBeInTheDocument();
  });

  it('a tap takes a portion; Cut and Heat prep the aimed item; chips and cards agree', async () => {
    const user = userEvent.setup();
    await bootRoom();
    await pickChickenRice();
    mount();
    await user.click(card('chicken'));
    expect(within(chips()).getByText('Chicken ×1')).toBeInTheDocument();
    expect(screen.getAllByText('raw')).toHaveLength(2);
    expect(screen.getByText('Strokes apply to Chicken')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Cut' }));
    expect(screen.getByTestId('sigil-word')).toHaveTextContent('CUT');
    expect(screen.getAllByText('cut')).toHaveLength(2);
    await user.click(screen.getByRole('button', { name: 'Heat' }));
    expect(screen.getAllByText('cut · cooked')).toHaveLength(2);
    await user.click(card('rice'));
    await user.click(card('rice'));
    expect(within(chips()).getByText('Rice ×2')).toBeInTheDocument();
    expect(within(screen.getByTestId('pantry-rice')).getByText('×2')).toBeInTheDocument();
    expect(screen.getByText('Neat · Flair ×0')).toBeInTheDocument();
    expect(screen.getByText('Strokes apply to Rice')).toBeInTheDocument();
  });

  it('burning adds mess and the Wipe button; a wipe clears it; the Bin remarks on both', async () => {
    const user = userEvent.setup();
    await bootRoom();
    await pickChickenRice();
    mount();
    await user.click(card('chicken'));
    for (let i = 0; i < 3; i++) await user.click(screen.getByRole('button', { name: 'Heat' }));
    expect(screen.getAllByText('burnt')).toHaveLength(2);
    expect(screen.getByText('You burnt the chicken. It did nothing to you.')).toBeInTheDocument();
    expect(screen.getByText('Mess ×1 · sweep to wipe')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Wipe' }));
    expect(screen.queryByText(/^Mess ×/)).not.toBeInTheDocument();
    expect(screen.getByText('Cleaner. Not clean. Cleaner.')).toBeInTheDocument();
  });

  it('Fling removes the aimed item; the minus button returns a portion to the shelf', async () => {
    const user = userEvent.setup();
    await bootRoom();
    await pickChickenRice();
    mount();
    await user.click(card('chicken'));
    await user.click(card('rice'));
    await user.click(within(chips()).getByRole('button', { name: /^Chicken ×/ }));
    expect(screen.getByText('Strokes apply to Chicken')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Fling to the Bin' }));
    expect(within(chips()).queryByText(/^Chicken ×/)).not.toBeInTheDocument();
    expect(screen.getByText('Rude. Delicious, but rude.')).toBeInTheDocument();
    expect(screen.getByText('Tap an item to aim your strokes')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /Remove one portion/ }));
    expect(screen.getByText('Nothing yet. Tap the Pantry to add a portion.')).toBeInTheDocument();
  });

  it('Plate it judges the plate, opens the verdict and hands the header back', async () => {
    const user = userEvent.setup();
    await bootRoom();
    await pickChickenRice();
    const router = mount();
    await user.click(card('chicken'));
    await user.click(screen.getByRole('button', { name: 'Plate it' }));
    expect(router.state.location.pathname).toBe('/play/bad/verdict');
    expect(useGame.getState().verdict?.dishId).toBe('chicken-rice');
    expect(useShell.getState().header).toBeNull();
  });
});
