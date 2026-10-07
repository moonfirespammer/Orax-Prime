import { create } from 'zustand';

export type Theme = 'dark' | 'light';

const THEME_KEY = 'orax.theme';
const isTheme = (v: unknown): v is Theme => v === 'dark' || v === 'light';

/** The theme named in the URL, for development and tests only: `?theme=light`. */
export function themeFromSearch(search: string): Theme | null {
  const v = new URLSearchParams(search).get('theme');
  return isTheme(v) ? v : null;
}

/** The theme the player chose last on this device. */
export function storedTheme(): Theme | null {
  try {
    const v = localStorage.getItem(THEME_KEY);
    return isTheme(v) ? v : null;
  } catch {
    return null;
  }
}

function initialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  return themeFromSearch(window.location.search) ?? storedTheme() ?? 'dark';
}

interface ShellState {
  /** Dark first; light is a full peer (DESIGN_RULES). Applied to <html data-theme> by the App. */
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

/** The shell slice (MIGRATION §2). Phase 1b holds the theme; tabs, the stack and the sheet arrive in phase 2. */
export const useShell = create<ShellState>((set, get) => ({
  theme: initialTheme(),
  setTheme: (theme) => {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // Storage unavailable: the choice lasts the session.
    }
    set({ theme });
  },
  toggleTheme: () => {
    get().setTheme(get().theme === 'dark' ? 'light' : 'dark');
  },
}));
