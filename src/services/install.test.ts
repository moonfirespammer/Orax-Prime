import { beforeEach, describe, expect, it, vi } from 'vitest';
import { canPromptInstall, captureInstallPrompt, promptInstall, setDeferredPrompt } from './install';

const fakePrompt = (outcome: 'accepted' | 'dismissed') => {
  const e = new Event('beforeinstallprompt') as Event & {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
  };
  e.prompt = vi.fn(() => Promise.resolve());
  e.userChoice = Promise.resolve({ outcome });
  return e;
};

describe('install prompt (PWA.md §4)', () => {
  beforeEach(() => {
    setDeferredPrompt(null);
    localStorage.clear();
  });

  it('is unavailable until the browser offers one', async () => {
    expect(canPromptInstall('2026-09-23')).toBe(false);
    expect(await promptInstall('2026-09-23')).toBe('unavailable');
  });

  it('captures the browser event and shows it once', async () => {
    captureInstallPrompt();
    const e = fakePrompt('accepted');
    const prevent = vi.spyOn(e, 'preventDefault');
    window.dispatchEvent(e);
    expect(prevent).toHaveBeenCalled();
    expect(canPromptInstall('2026-09-23')).toBe(true);
    expect(await promptInstall('2026-09-23')).toBe('accepted');
    expect(e.prompt).toHaveBeenCalledTimes(1);
    expect(canPromptInstall('2026-09-23')).toBe(false);
  });

  it('still prompts when the browser refuses storage; the dismissal then lasts the session', async () => {
    const refuse = () => {
      throw new Error('storage refused');
    };
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(refuse);
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(refuse);
    try {
      setDeferredPrompt(fakePrompt('dismissed'));
      expect(canPromptInstall('2026-09-23')).toBe(true);
      expect(await promptInstall('2026-09-23')).toBe('dismissed');
    } finally {
      vi.restoreAllMocks();
    }
  });

  it('a dismissal is remembered for the day, not the next', async () => {
    setDeferredPrompt(fakePrompt('dismissed'));
    expect(await promptInstall('2026-09-23')).toBe('dismissed');
    setDeferredPrompt(fakePrompt('accepted'));
    expect(canPromptInstall('2026-09-23')).toBe(false);
    expect(canPromptInstall('2026-09-24')).toBe(true);
  });
});
