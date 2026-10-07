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

export type Sheet = 'play' | null;

export interface HeaderText {
  title: string;
  subtitle: string;
}

interface ShellState {
  /** Dark first; light is a full peer (DESIGN_RULES). Applied to <html data-theme> by the App. */
  theme: Theme;
  /** A screen whose header reads from data (the Station names its dish) sets this while it is mounted. */
  header: HeaderText | null;
  setHeader: (header: HeaderText) => void;
  clearHeader: () => void;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  /** The sheet over the current screen: the Play sheet from the centre tab button (MIGRATION §3.2). */
  sheet: Sheet;
  openSheet: (sheet: Exclude<Sheet, null>) => void;
  closeSheet: () => void;
}

/**
 * The shell slice (MIGRATION §2): the theme and the sheet. Tabs and the sub-screen stack are the router's
 * (`/today`, `/you`, sub-screens beneath them), so a tap on Back is a step back in history.
 */
export const useShell = create<ShellState>((set, get) => ({
  theme: initialTheme(),
  header: null,
  setHeader: (header) => {
    set({ header });
  },
  clearHeader: () => {
    set({ header: null });
  },
  sheet: null,
  openSheet: (sheet) => {
    set({ sheet });
  },
  closeSheet: () => {
    set({ sheet: null });
  },
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
