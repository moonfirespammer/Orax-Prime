import { beforeEach, describe, expect, it } from 'vitest';
import { createMemoryStorage } from '@/services/storage';
import { DEFAULT_ME, useMe } from '@/store/me';
import { PROFILE_KEY, ProfileStore, freshSlice } from './profile';

describe('ProfileStore · BaD’s profile over the OraX player', () => {
  beforeEach(() => {
    useMe.setState({ me: DEFAULT_ME, onboarded: true, ready: true });
  });

  it('reads the identity from the me store and starts the game slice with zero counters, persisted', async () => {
    const storage = createMemoryStorage();
    const store = new ProfileStore(storage);
    const p = await store.load('2026-09');
    expect(p).toMatchObject({
      name: 'Wen',
      city: 'SG',
      classKey: 'stirrer',
      gem: 'sapphire',
      figure: 't1m',
      introSeen: false,
      preferButtons: false,
      cursedPlates: [],
    });
    expect(p.habits).toEqual({ chilli: 0, rawRice: 0, unhinged: 0, plates: 0, palate: 0, month: '2026-09' });
    expect(p.id).not.toBe('');
    expect(storage.dump()[PROFILE_KEY]).toMatchObject({ id: p.id, habits: p.habits });
    expect(() => new ProfileStore(storage).get()).toThrow();
  });

  it('splits an update: identity to the me store, the rest to storage; listeners hear both', async () => {
    const storage = createMemoryStorage();
    const store = new ProfileStore(storage);
    await store.load('2026-09');
    const seen: string[] = [];
    const off = store.subscribe((p) => seen.push(`${p.gem}:${String(p.introSeen)}`));
    await store.update({ introSeen: true });
    await store.update({ gem: 'emerald' });
    expect(useMe.getState().me.gem).toBe('emerald');
    expect(storage.dump()[PROFILE_KEY]).toMatchObject({ introSeen: true });
    expect(storage.dump()[PROFILE_KEY]).not.toHaveProperty('gem');
    useMe.getState().setMe({ classKey: 'host' });
    expect(store.get().classKey).toBe('host');
    off();
    await store.update({ preferButtons: true });
    expect(seen).toEqual(['sapphire:true', 'emerald:true', 'emerald:true']);
    const again = new ProfileStore(storage);
    const p = await again.load('2026-09');
    expect(p.introSeen).toBe(true);
    expect(p.preferButtons).toBe(true);
    expect(p.id).toBe(store.get().id);
  });

  it('rolls the monthly counters over and fills fields a newer app added', async () => {
    const slice = freshSlice('2026-08');
    // A record saved before the palate counter existed.
    const oldHabits = { chilli: 2, rawRice: 1, unhinged: 2, plates: 14, month: '2026-08' };
    const storage = createMemoryStorage({ [PROFILE_KEY]: { ...slice, habits: oldHabits } });
    const store = new ProfileStore(storage);
    const p = await store.load('2026-09');
    expect(p.habits).toEqual({ chilli: 0, rawRice: 0, unhinged: 0, plates: 0, palate: 0, month: '2026-09' });
    const same = new ProfileStore(createMemoryStorage({ [PROFILE_KEY]: { ...slice, habits: oldHabits } }));
    expect((await same.load('2026-08')).habits).toEqual({ ...oldHabits, palate: 0 });
  });
});
