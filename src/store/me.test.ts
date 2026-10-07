import { beforeEach, describe, expect, it } from 'vitest';
import { createMemoryStorage } from '@/services/storage';
import { DEFAULT_ME, ME_KEY, useMe } from './me';

describe('me store · the player on this device', () => {
  beforeEach(() => {
    useMe.setState({ me: DEFAULT_ME, onboarded: false, ready: false });
  });

  it('starts as the prototype player, not yet onboarded, until storage is read', async () => {
    expect(useMe.getState()).toMatchObject({
      me: { name: 'Wen', classKey: 'stirrer', gem: 'sapphire' },
      onboarded: false,
      ready: false,
    });
    await useMe.getState().hydrate(createMemoryStorage());
    expect(useMe.getState()).toMatchObject({ onboarded: false, ready: true });
  });

  it('reads a saved player back, filling any field a newer app added', async () => {
    const storage = createMemoryStorage({
      [ME_KEY]: { me: { name: 'Wen', classKey: 'rebel', figure: 't2f', gem: 'ruby' }, onboarded: true },
    });
    await useMe.getState().hydrate(storage);
    expect(useMe.getState()).toMatchObject({
      me: { classKey: 'rebel', figure: 't2f', gem: 'ruby', city: 'SG' },
      onboarded: true,
      ready: true,
    });
  });

  it('finishing onboarding writes the player and the flag to storage', async () => {
    const storage = createMemoryStorage();
    await useMe.getState().hydrate(storage);
    useMe.getState().finishOnboarding({ classKey: 'host', gem: 'emerald', city: 'SG' });
    await Promise.resolve();
    expect(useMe.getState()).toMatchObject({ me: { classKey: 'host', gem: 'emerald' }, onboarded: true });
    expect(storage.dump()[ME_KEY]).toMatchObject({
      me: { classKey: 'host', gem: 'emerald' },
      onboarded: true,
    });
    useMe.getState().setMe({ figure: 't1f' });
    await Promise.resolve();
    expect(storage.dump()[ME_KEY]).toMatchObject({ me: { figure: 't1f' }, onboarded: true });
  });
});
