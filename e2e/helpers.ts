import { expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

export type Theme = 'dark' | 'light';
export const THEMES: Theme[] = ['dark', 'light'];

export interface OpenOptions {
  /** Route to open; the app's own entry when absent. */
  path?: string;
  theme?: Theme;
  reducedMotion?: boolean;
}

/** Open the app with dev overrides in the URL (see src/store/shell.ts). */
export async function open(page: Page, opts: OpenOptions = {}): Promise<void> {
  const params = new URLSearchParams();
  if (opts.theme) params.set('theme', opts.theme);
  if (opts.reducedMotion) await page.emulateMedia({ reducedMotion: 'reduce' });
  const query = params.toString();
  await page.goto(`${opts.path ?? '/'}${query ? `?${query}` : ''}`);
  await page.locator('[data-testid="orax-app"]').waitFor();
  await page.evaluate(() => document.fonts.ready);
}

/** PWA.md §8: axe-core with zero violations on every screen. */
export async function expectNoAxeViolations(page: Page, label: string): Promise<void> {
  const results = await new AxeBuilder({ page }).analyze();
  expect(
    results.violations,
    `${label}: ${JSON.stringify(
      results.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })),
      null,
      1,
    )}`,
  ).toEqual([]);
}

/** DESIGN_RULES: every visible button and link is at least 44×44. */
export async function expectHitTargets(page: Page, label: string): Promise<void> {
  const small = await page.evaluate(() =>
    Array.from(document.querySelectorAll<HTMLElement>('button, a'))
      .filter((el) => el.offsetParent !== null)
      .map((el) => {
        const r = el.getBoundingClientRect();
        return {
          text: (el.getAttribute('aria-label') ?? el.textContent).trim().slice(0, 40),
          w: Math.round(r.width),
          h: Math.round(r.height),
        };
      })
      .filter((t) => t.w < 44 || t.h < 44),
  );
  expect(small, `${label}: interactive elements below 44×44`).toEqual([]);
}

/** Visual check: screenshot into e2e/__screenshots__/{name}.png at 390×844 @2x, the viewport or the full page. */
export async function shot(page: Page, name: string, opts: { fullPage?: boolean } = {}): Promise<void> {
  await page.screenshot({
    path: `e2e/__screenshots__/${name}.png`,
    animations: 'disabled',
    fullPage: opts.fullPage ?? false,
  });
}
