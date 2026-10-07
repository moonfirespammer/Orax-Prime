import { create } from 'zustand';
import { createStorage, type Storage } from '@/services/storage';

export type MatchState = 'new' | 'connected' | 'declined';

/** Five quests a day, pick two (PRODUCT_SPEC §5.2). */
export const QUEST_PICKS = 2;
export const TODAY_KEY = 'orax:today';

/** Today's finite state, kept on the device for one city day: a new date starts fresh (PRODUCT_SPEC §5.2). */
export interface DayRecord {
  /** The Singapore date, `YYYY-MM-DD`. */
  date: string;
  matchState: MatchState;
  picked: string[];
  done: Record<string, boolean>;
}

interface TodayState extends DayRecord {
  /** True once storage has been read for today. */
  ready: boolean;
  /** Reads today's record from storage; yesterday's is let go. */
  hydrate: (date: string, storage?: Storage) => Promise<void>;
  /** At 00:00 the day changes: the match, the picks and the done flags start again. */
  ensureDay: (date: string) => void;
  connect: () => void;
  decline: () => void;
  togglePick: (id: string) => void;
  markDone: (id: string) => void;
}

export const freshDay = (date: string): DayRecord => ({ date, matchState: 'new', picked: [], done: {} });

let store: Storage | null = null;
const record = (s: DayRecord): DayRecord => ({
  date: s.date,
  matchState: s.matchState,
  picked: s.picked,
  done: s.done,
});
const persist = (s: DayRecord): void => {
  store ??= createStorage();
  void store.set(TODAY_KEY, record(s));
};

/** Today's finite state: one match to answer, two quests to pick, done flags set by play. Resets at 00:00. */
export const useToday = create<TodayState>((set, get) => ({
  ...freshDay(''),
  ready: false,
  hydrate: async (date, storage) => {
    store = storage ?? createStorage();
    const saved = await store.get<DayRecord>(TODAY_KEY);
    const today = saved?.date === date ? record(saved) : freshDay(date);
    set({ ...today, ready: true });
    if (today !== saved) persist(today);
  },
  ensureDay: (date) => {
    // Before storage has been read there is nothing to let go of yet.
    if (!get().ready || get().date === date) return;
    const today = freshDay(date);
    set(today);
    persist(today);
  },
  connect: () => {
    set({ matchState: 'connected' });
    persist(get());
  },
  decline: () => {
    set({ matchState: 'declined' });
    persist(get());
  },
  togglePick: (id) => {
    set((s) => ({
      picked: s.picked.includes(id)
        ? s.picked.filter((x) => x !== id)
        : s.picked.length < QUEST_PICKS
          ? s.picked.concat(id)
          : s.picked,
    }));
    persist(get());
  },
  markDone: (id) => {
    set((s) => ({ done: { ...s.done, [id]: true } }));
    persist(get());
  },
}));
