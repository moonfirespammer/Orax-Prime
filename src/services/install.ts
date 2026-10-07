// The PWA install prompt (PWA.md §4): captured at launch, shown only on the invite screen after a valid code,
// never again that day if dismissed.

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const DISMISSED_KEY = 'orax.install-dismissed';
let deferred: BeforeInstallPromptEvent | null = null;

/** Call once at launch: keeps the browser's prompt for the invite screen instead of letting it show on its own. */
export function captureInstallPrompt(target: Window = window): void {
  target.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferred = e as BeforeInstallPromptEvent;
  });
}

/** For tests: hand the service a captured event directly. */
export function setDeferredPrompt(e: BeforeInstallPromptEvent | null): void {
  deferred = e;
}

const dismissedOn = (): string | null => {
  try {
    return localStorage.getItem(DISMISSED_KEY);
  } catch {
    return null;
  }
};

/** Whether a prompt is available today (`day` is the Singapore date, `YYYY-MM-DD`). */
export function canPromptInstall(day: string): boolean {
  return deferred !== null && dismissedOn() !== day;
}

/** Shows the browser's install prompt once; a dismissal is remembered for the day. */
export async function promptInstall(day: string): Promise<'accepted' | 'dismissed' | 'unavailable'> {
  const e = deferred;
  if (!e || dismissedOn() === day) return 'unavailable';
  deferred = null;
  await e.prompt();
  const { outcome } = await e.userChoice;
  if (outcome === 'dismissed') {
    try {
      localStorage.setItem(DISMISSED_KEY, day);
    } catch {
      /* storage unavailable: the day's dismissal lasts the session */
    }
  }
  return outcome;
}
