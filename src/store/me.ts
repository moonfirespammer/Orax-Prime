import { create } from 'zustand';
import type { ClassKey, Figure, Gem } from '@/ds';

export interface Me {
  name: string;
  classKey: ClassKey;
  figure: Figure;
  gem: Gem;
}

interface MeState {
  me: Me;
  setMe: (patch: Partial<Me>) => void;
}

/** The player (PRODUCT_SPEC §2). The prototype's defaults until onboarding writes it in 2b and storage keeps it. */
export const useMe = create<MeState>((set) => ({
  me: { name: 'Wen', classKey: 'stirrer', figure: 't1m', gem: 'sapphire' },
  setMe: (patch) => {
    set((s) => ({ me: { ...s.me, ...patch } }));
  },
}));
