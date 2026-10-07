import { create } from 'zustand';

export type MatchState = 'new' | 'connected' | 'declined';

/** Five quests a day, pick two (PRODUCT_SPEC §5.2). */
export const QUEST_PICKS = 2;

interface TodayState {
  matchState: MatchState;
  picked: string[];
  done: Record<string, boolean>;
  connect: () => void;
  decline: () => void;
  togglePick: (id: string) => void;
  markDone: (id: string) => void;
}

/** Today's finite state: one match to answer, two quests to pick, done flags set by play. Resets at 00:00 (phase 4). */
export const useToday = create<TodayState>((set) => ({
  matchState: 'new',
  picked: [],
  done: {},
  connect: () => {
    set({ matchState: 'connected' });
  },
  decline: () => {
    set({ matchState: 'declined' });
  },
  togglePick: (id) => {
    set((s) => ({
      picked: s.picked.includes(id)
        ? s.picked.filter((x) => x !== id)
        : s.picked.length < QUEST_PICKS
          ? s.picked.concat(id)
          : s.picked,
    }));
  },
  markDone: (id) => {
    set((s) => ({ done: { ...s.done, [id]: true } }));
  },
}));
