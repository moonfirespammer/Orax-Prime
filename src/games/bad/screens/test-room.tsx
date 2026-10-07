// Test wiring for the Build-A-Dish screens: a memory day at a fixed Singapore time, the store started on it.
import { act } from '@testing-library/react';
import { createClock, type LeftoversOverride } from '@/services/clock';
import { createMemoryStorage } from '@/services/storage';
import { setBadDeps } from '../deps';
import { MockPoolService } from '../services/MockPoolService';
import { ProfileStore } from '../services/profile';
import { useGame, type GameDeps } from '../store';

const sgt = (iso: string): number => Date.parse(`${iso}+08:00`);

export async function bootRoom(
  iso = '2026-09-23T10:00:00',
  leftovers: LeftoversOverride = null,
): Promise<GameDeps> {
  const clock = createClock({ source: () => sgt(iso), leftoversOverride: leftovers });
  const storage = createMemoryStorage();
  const profileStore = new ProfileStore(storage);
  const service = new MockPoolService({ city: 'SG', clock, storage, profile: profileStore });
  const deps: GameDeps = { city: 'SG', service, clock, profileStore };
  setBadDeps(deps);
  await act(() => useGame.getState().init(deps));
  return deps;
}

export function closeRoom(): void {
  useGame.getState().dispose();
  setBadDeps(null);
}
