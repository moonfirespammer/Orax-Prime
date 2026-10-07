import { create } from 'zustand';
import type { ClassKey, Gem } from '@/ds';
import type { City } from '@/store/me';
import { QUIZ, winnerOf } from '@/onboarding/data';

/** Steps 0–4 are the five questions; 5 the class reveal; 6 the gem; 7 the city (the prototype's ob.step). */
export type Step = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

interface OnboardingState {
  step: Step;
  votes: Partial<Record<ClassKey, number>>;
  gem: Gem;
  city: City;
  answer: (cls: ClassKey) => void;
  next: () => void;
  retake: () => void;
  pickGem: (gem: Gem) => void;
  pickCity: (city: City) => void;
  reset: () => void;
  winner: () => ClassKey;
}

const initial = { step: 0 as Step, votes: {}, gem: 'sapphire' as Gem, city: 'SG' as City };
const bump = (s: Step): Step => Math.min(7, s + 1) as Step;

/** The identity test in progress (PRODUCT_SPEC §5.1): each answer votes for a class; the winner is revealed. */
export const useOnboarding = create<OnboardingState>((set, get) => ({
  ...initial,
  answer: (cls) => {
    set((s) =>
      s.step < QUIZ.length
        ? { step: bump(s.step), votes: { ...s.votes, [cls]: (s.votes[cls] ?? 0) + 1 } }
        : s,
    );
  },
  next: () => {
    set((s) => ({ step: bump(s.step) }));
  },
  retake: () => {
    set((s) => ({ step: 0, votes: {}, gem: s.gem, city: s.city }));
  },
  pickGem: (gem) => {
    set({ gem });
  },
  pickCity: (city) => {
    set({ city });
  },
  reset: () => {
    set({ ...initial, votes: {} });
  },
  winner: () => winnerOf(get().votes),
}));
