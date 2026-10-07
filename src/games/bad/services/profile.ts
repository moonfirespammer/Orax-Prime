import type { Storage } from '@/services/storage';
import { useMe, type Me } from '@/store/me';
import type { Habits, Profile, SavedVerdict } from '@/games/bad/engine/types';

export const PROFILE_KEY = 'bad:profile';

/** The game's own slice of the player, persisted beside the identity the me store owns. */
export interface GameSlice {
  id: string;
  introSeen: boolean;
  preferButtons: boolean;
  signature?: SavedVerdict;
  cursedPlates: SavedVerdict[];
  habits: Habits;
}

const IDENTITY: readonly (keyof Me)[] = ['name', 'city', 'classKey', 'gem', 'figure'];

const newId = (): string =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `p-${Date.now().toString(36)}`;

export const freshHabits = (month: string): Habits => ({
  chilli: 0,
  rawRice: 0,
  unhinged: 0,
  plates: 0,
  palate: 0,
  month,
});

/** A fresh slice: a new id, every counter at zero. */
export function freshSlice(month: string): GameSlice {
  return {
    id: newId(),
    introSeen: false,
    preferButtons: false,
    cursedPlates: [],
    habits: freshHabits(month),
  };
}

/**
 * BaD's ProfileStore over the OraX player: name, class, gem, figure and city are read from and written to the me
 * store (one identity for the whole app); introSeen, preferButtons, signature, cursedPlates and habits live under
 * `bad:profile`. `load(month)` resets the month-scoped counters when the month has changed.
 */
export class ProfileStore {
  private slice: GameSlice | null = null;
  private readonly listeners = new Set<(p: Profile) => void>();
  private offMe: (() => void) | null = null;

  constructor(private readonly storage: Storage) {}

  async load(month: string): Promise<Profile> {
    const saved = await this.storage.get<Partial<GameSlice>>(PROFILE_KEY);
    const fresh = freshSlice(month);
    let slice: GameSlice = saved
      ? { ...fresh, ...saved, habits: { ...fresh.habits, ...saved.habits } }
      : fresh;
    if (slice.habits.month !== month) slice = { ...slice, habits: freshHabits(month) };
    this.slice = slice;
    if (!saved || slice !== saved) await this.storage.set(PROFILE_KEY, slice);
    return this.get();
  }

  get(): Profile {
    if (!this.slice) throw new Error('ProfileStore.load() first');
    const me = useMe.getState().me;
    return {
      id: this.slice.id,
      name: me.name,
      city: me.city,
      classKey: me.classKey,
      gem: me.gem,
      figure: me.figure,
      introSeen: this.slice.introSeen,
      preferButtons: this.slice.preferButtons,
      ...(this.slice.signature ? { signature: this.slice.signature } : {}),
      cursedPlates: this.slice.cursedPlates,
      habits: this.slice.habits,
    };
  }

  async update(patch: Partial<Profile>): Promise<Profile> {
    const slice = this.slice;
    if (!slice) throw new Error('ProfileStore.load() first');
    const identity: Partial<Me> = {};
    const rest: Partial<GameSlice> = {};
    for (const [k, v] of Object.entries(patch)) {
      if ((IDENTITY as readonly string[]).includes(k)) Object.assign(identity, { [k]: v });
      else Object.assign(rest, { [k]: v });
    }
    if (Object.keys(rest).length) {
      this.slice = { ...slice, ...rest };
      await this.storage.set(PROFILE_KEY, this.slice);
    }
    // An identity change reaches the listeners through the me store's own subscription, once.
    if (Object.keys(identity).length) useMe.getState().setMe(identity);
    else for (const l of this.listeners) l(this.get());
    return this.get();
  }

  subscribe(listener: (p: Profile) => void): () => void {
    this.listeners.add(listener);
    // A change of class, gem or name elsewhere in the app reaches the game too.
    this.offMe ??= useMe.subscribe((s, prev) => {
      if (s.me !== prev.me && this.slice) for (const l of this.listeners) l(this.get());
    });
    return () => {
      this.listeners.delete(listener);
      if (this.listeners.size === 0) {
        this.offMe?.();
        this.offMe = null;
      }
    };
  }
}
