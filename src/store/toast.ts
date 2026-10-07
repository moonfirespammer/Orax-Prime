import { create } from 'zustand';

/** The prototype's say(): one toast at a time, gone after 3.2 s. */
export const TOAST_MS = 3200;

interface ToastState {
  overline: string;
  text: string | null;
  seq: number;
  say: (overline: string, text: string) => void;
  clear: () => void;
}

let timer: ReturnType<typeof setTimeout> | null = null;

/** The Bin's voice in the corner: an overline naming the source and one dry line. A new line replaces the current one. */
export const useToast = create<ToastState>((set) => ({
  overline: 'OraX',
  text: null,
  seq: 0,
  say: (overline, text) => {
    if (timer) clearTimeout(timer);
    set((s) => ({ overline, text, seq: s.seq + 1 }));
    timer = setTimeout(() => {
      timer = null;
      set({ text: null });
    }, TOAST_MS);
  },
  clear: () => {
    if (timer) clearTimeout(timer);
    timer = null;
    set({ text: null });
  },
}));

export const say = (overline: string, text: string): void => {
  useToast.getState().say(overline, text);
};
