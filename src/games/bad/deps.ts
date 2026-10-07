import { useEffect } from 'react';
import { clock } from '@/app/clock';
import { createStorage } from '@/services/storage';
import { useMe } from '@/store/me';
import { MockPoolService } from './services/MockPoolService';
import { ProfileStore } from './services/profile';
import { useGame, type GameDeps } from './store';

let deps: GameDeps | null = null;

/** The room's wiring, built once: the app clock, device storage, the player's profile and the in-browser pool. */
export function badDeps(): GameDeps {
  if (deps) return deps;
  const storage = createStorage();
  const profileStore = new ProfileStore(storage);
  const city = useMe.getState().me.city;
  deps = {
    city,
    clock,
    profileStore,
    service: new MockPoolService({ city, clock, storage, profile: profileStore }),
  };
  return deps;
}

/** For tests: wire the room to these deps, or to none. */
export function setBadDeps(d: GameDeps | null): void {
  deps = d;
}

/** Starts the game store the first time a Build-A-Dish screen mounts; true once the day is loaded. */
export function useBadGame(): boolean {
  const ready = useGame((g) => g.ready);
  useEffect(() => {
    if (useGame.getState().ready) return;
    void useGame.getState().init(badDeps());
  }, []);
  return ready;
}
