import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterProvider, createMemoryRouter } from 'react-router';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { Toast } from '@/app/Toast';
import { DEFAULT_ME, useMe } from '@/store/me';
import { useToast } from '@/store/toast';
import type { Verdict as VerdictData } from '../engine/types';
import { useGame } from '../store';
import { Verdict, chipsOf, poseOf } from './Verdict';
import { bootRoom, closeRoom } from './test-room';

function mount() {
  const router = createMemoryRouter(
    [
      { path: '/play/bad', element: <p>Board body</p> },
      { path: '/play/bad/verdict', element: <Verdict /> },
      { path: '/play/bad/share', element: <p>Share body</p> },
      { path: '/today/wall', element: <p>Wall body</p> },
    ],
    { initialEntries: ['/play/bad/verdict'] },
  );
  render(
    <>
      <RouterProvider router={router} />
      <Toast />
    </>,
  );
  return router;
}

/** Pick chicken rice, take the portions, plate; the Bin's verdict as the store holds it. */
async function plate(ids: string[]): Promise<VerdictData> {
  const g = useGame.getState();
  g.selectDish('chicken-rice');
  await act(() => g.pickSelected());
  for (const id of ids) await act(() => g.tapIngredient(id));
  await act(() => g.plateNow());
  useToast.getState().clear();
  const v = useGame.getState().verdict;
  if (!v) throw new Error('no verdict');
  return v;
}

describe('the verdict (the prototype’s BaD VERDICT on BaD’s judge)', () => {
  beforeEach(() => {
    useMe.setState({ me: DEFAULT_ME, onboarded: true, ready: true });
    useToast.getState().clear();
  });
  afterEach(() => {
    closeRoom();
  });

  it('without a verdict it returns to the Board', async () => {
    await bootRoom();
    const router = mount();
    expect(router.state.location.pathname).toBe('/play/bad');
  });

  it('shows the Bin’s line, the name and label, the stones in the player’s gem and the chips', async () => {
    await bootRoom();
    const v = await plate(['chicken']);
    mount();
    expect(screen.getByText(`The Bin · ${poseOf(v)}`)).toBeInTheDocument();
    expect(screen.getByText('The Bin')).toBeInTheDocument();
    expect(screen.getByText(v.line)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: v.name })).toBeInTheDocument();
    expect(screen.getByText(v.label)).toBeInTheDocument();
    expect(screen.getByText(`${String(v.stones)} of 3 sapphires`)).toBeInTheDocument();
    expect(screen.getByText(v.style)).toBeInTheDocument();
    expect(screen.getByText(v.habit)).toBeInTheDocument();
    expect(screen.queryByText(/^Cursed plate/)).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Set as Signature Dish' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'See who else made chicken rice' })).toBeInTheDocument();
  });

  it('a cursed plate carries the overline, the ruby chip and the disgusted Bin', async () => {
    await bootRoom();
    const v = await plate([]);
    mount();
    expect(v.cursed).toBe(true);
    expect(screen.getByText('The Bin · disgusted')).toBeInTheDocument();
    expect(screen.getByText('You plated air. Bold. Pointless, but bold.')).toBeInTheDocument();
    expect(screen.getByText('Cursed plate · meant to be chicken rice')).toBeInTheDocument();
    expect(screen.getByText('Cursed plate')).toBeInTheDocument();
    expect(screen.getByText('1 of 3 sapphires')).toBeInTheDocument();
  });

  it('Set as Signature Dish keeps the verdict on the player and says so; the label settles', async () => {
    const user = userEvent.setup();
    await bootRoom();
    const v = await plate(['chicken']);
    mount();
    await user.click(screen.getByRole('button', { name: 'Set as Signature Dish' }));
    expect(await screen.findByRole('button', { name: 'Signature Dish set' })).toHaveAttribute(
      'aria-disabled',
      'true',
    );
    expect(
      screen.getByText('Signature Dish set. It sits on your profile until you replace it.'),
    ).toBeInTheDocument();
    expect(useMe.getState().me.signature).toMatchObject({ name: v.name, stones: v.stones });
    expect(useGame.getState().profile?.signature?.name).toBe(v.name);
  });

  it('Share goes to the share card and See who else to the city wall', async () => {
    const user = userEvent.setup();
    await bootRoom();
    await plate(['chicken']);
    const router = mount();
    await user.click(screen.getByRole('button', { name: 'Share to your party' }));
    expect(router.state.location.pathname).toBe('/play/bad/share');
    await act(() => router.navigate('/play/bad/verdict'));
    await user.click(screen.getByRole('button', { name: 'See who else made chicken rice' }));
    expect(router.state.location.pathname).toBe('/today/wall');
  });

  it('chips: style and habit always, then the palate, Leftovers hour and Cursed plate in ruby outline', () => {
    const base: VerdictData = {
      name: 'Chicken rice',
      label: 'Clean plate',
      line: 'Fine.',
      stones: 3,
      score: 100,
      style: 'Neat',
      cursed: false,
      habit: 'Neat plater, apparently',
      leftoversUsed: false,
      summary: '',
      dishId: 'chicken-rice',
      key: 1,
      flags: { chilli: false, rawRice: false },
    };
    expect(chipsOf(base).map((c) => c.label)).toEqual(['Neat', 'Neat plater, apparently']);
    const full = chipsOf({
      ...base,
      palate: { line: 'x', chip: 'Clean plater ×2' },
      leftoversUsed: true,
      cursed: true,
      stones: 1,
    });
    expect(full.map((c) => c.label)).toEqual([
      'Neat',
      'Neat plater, apparently',
      'Clean plater ×2',
      'Leftovers hour',
      'Cursed plate',
    ]);
    expect(full[4]).toMatchObject({ appearance: 'outline', variant: 'ruby' });
    expect(poseOf({ cursed: false, stones: 3 })).toBe('approving');
    expect(poseOf({ cursed: false, stones: 2 })).toBe('judging');
    expect(poseOf({ cursed: false, stones: 1 })).toBe('neutral');
  });
});
