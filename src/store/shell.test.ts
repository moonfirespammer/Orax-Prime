import { beforeEach, describe, expect, it } from 'vitest';
import { storedTheme, themeFromSearch, useShell } from './shell';

describe('shell store · theme', () => {
  beforeEach(() => {
    useShell.setState({ theme: 'dark' });
  });

  it('starts dark and toggles to light and back', () => {
    expect(useShell.getState().theme).toBe('dark');
    useShell.getState().toggleTheme();
    expect(useShell.getState().theme).toBe('light');
    useShell.getState().toggleTheme();
    expect(useShell.getState().theme).toBe('dark');
  });

  it('remembers the choice on this device', () => {
    useShell.getState().setTheme('light');
    expect(localStorage.getItem('orax.theme')).toBe('light');
    expect(storedTheme()).toBe('light');
    localStorage.setItem('orax.theme', 'sepia');
    expect(storedTheme()).toBeNull();
  });

  it('reads ?theme= for development and tests', () => {
    expect(themeFromSearch('?theme=light')).toBe('light');
    expect(themeFromSearch('?theme=dark&x=1')).toBe('dark');
    expect(themeFromSearch('?theme=blue')).toBeNull();
    expect(themeFromSearch('')).toBeNull();
  });
});
