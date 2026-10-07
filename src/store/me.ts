import { create } from 'zustand';
import type { ClassKey, Figure, Gem } from '@/ds';
import { createStorage, type Storage } from '@/services/storage';

export type City = 'SG' | 'KL';

export interface Me {
  name: string;
  classKey: ClassKey;
  figure: Figure;
  gem: Gem;
  city: City;
}

export const ME_KEY = 'orax:me';

interface Saved {
  me: Me;
  onboarded: boolean;
}

interface MeState {
  me: Me;
  /** True once the identity test, gem and city have been chosen on this device (PRODUCT_SPEC §5.1). */
  onboarded: boolean;
  /** True once storage has been read; the app entry waits for it. */
  ready: boolean;
  setMe: (patch: Partial<Me>) => void;
  finishOnboarding: (patch: Partial<Me>) => void;
  /** Reads the saved player from storage (idb-keyval, localStorage when IndexedDB is missing). */
  hydrate: (storage?: Storage) => Promise<void>;
}

/** The prototype's player until the identity test has run: Wen, a Stirrer in a T1 masculine kit, Sapphire today. */
export const DEFAULT_ME: Me = {
  name: 'Wen',
  classKey: 'stirrer',
  figure: 't1m',
  gem: 'sapphire',
  city: 'SG',
};

let store: Storage | null = null;
const persist = (saved: Saved): void => {
  store ??= createStorage();
  void store.set(ME_KEY, saved);
};

/** The player (PRODUCT_SPEC §2), kept on the device until Supabase in phase 7 (MIGRATION §2). */
export const useMe = create<MeState>((set, get) => ({
  me: DEFAULT_ME,
  onboarded: false,
  ready: false,
  setMe: (patch) => {
    const me = { ...get().me, ...patch };
    set({ me });
    persist({ me, onboarded: get().onboarded });
  },
  finishOnboarding: (patch) => {
    const me = { ...get().me, ...patch };
    set({ me, onboarded: true });
    persist({ me, onboarded: true });
  },
  hydrate: async (storage) => {
    store = storage ?? createStorage();
    const saved = await store.get<Saved>(ME_KEY);
    if (saved) set({ me: { ...DEFAULT_ME, ...saved.me }, onboarded: saved.onboarded, ready: true });
    else set({ ready: true });
  },
}));
