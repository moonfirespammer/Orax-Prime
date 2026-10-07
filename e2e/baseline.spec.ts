import { expect, test } from '@playwright/test';
import { mkdirSync, readFileSync } from 'node:fs';
import { expectHitTargets, expectNoAxeViolations, open, shot } from './helpers';

const REFERENCE = 'docs/handoff/assets/shots/base-play.jpg';
const OUT = 'e2e/__screenshots__/compare';

test.describe('Phase 1c · baseline Play screen (MIGRATION §6 gate 1)', () => {
  test('renders the old BaD host shell Play screen at 390×844', async ({ page }) => {
    await open(page, { path: '/dev/baseline', theme: 'dark' });
    await expect(page.getByRole('heading', { name: 'Your party' })).toBeVisible();
    await expect(page.getByText('Tiong Bahru Market')).toBeVisible();
    await expect(page.getByText('Singapore · 400 m · tonight 19:30')).toBeVisible();
    await expect(page.getByText('128 cooking in Singapore · resets 5h 12m')).toBeVisible();
    await expect(page.getByText('ROUND 1 · LIMIT ×2')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Notifications' })).toBeVisible();
    for (const name of ['Stirrer', 'Taster', 'Provider'])
      await expect(page.getByText(name, { exact: true })).toBeVisible();
    await expect(page.locator('[aria-current="true"]')).toHaveCount(1); // only the first card is on its turn
    await expect(page.getByRole('img', { name: 'Sapphire gem, active' })).toHaveCount(1);
    await expect(page.getByRole('img', { name: 'Emerald gem, active' })).toHaveCount(1);
    const nav = page.getByRole('navigation', { name: 'Main' });
    for (const t of ['Play', 'Classes', 'You', 'Dish'])
      await expect(nav.getByRole('button', { name: t })).toBeVisible();
    await expect(nav.getByRole('button', { name: 'Play' })).toHaveAttribute('aria-current', 'page');
    await expectNoAxeViolations(page, 'baseline play');
    await expectHitTargets(page, 'baseline play');
    await shot(page, 'baseline-play-dark');
  });

  test('a tapped tab becomes the current one', async ({ page }) => {
    await open(page, { path: '/dev/baseline', theme: 'dark' });
    const nav = page.getByRole('navigation', { name: 'Main' });
    await nav.getByRole('button', { name: 'You' }).click();
    await expect(nav.getByRole('button', { name: 'You' })).toHaveAttribute('aria-current', 'page');
    await expect(nav.getByRole('button', { name: 'Play' })).not.toHaveAttribute('aria-current', 'page');
  });

  test('writes the gate sheet: the handoff shot beside the app', async ({ page, browser }) => {
    await open(page, { path: '/dev/baseline', theme: 'dark' });
    await page.waitForTimeout(300);
    const app = await page.screenshot({ animations: 'disabled' });
    mkdirSync(OUT, { recursive: true });
    const img = (b: Buffer, type: string) => `data:${type};base64,${b.toString('base64')}`;
    const sheet = await browser.newPage({ viewport: { width: 820, height: 900 }, deviceScaleFactor: 1 });
    await sheet.setContent(
      `<body style="margin:0;background:#888;font:700 13px sans-serif"><div style="display:flex;gap:16px;padding:8px">` +
        `<figure style="margin:0"><figcaption>Handoff · base-play.jpg</figcaption><img src="${img(readFileSync(REFERENCE), 'image/jpeg')}" width="390"></figure>` +
        `<figure style="margin:0"><figcaption>App · /dev/baseline · dark</figcaption><img src="${img(app, 'image/png')}" width="390"></figure></div></body>`,
    );
    await sheet.screenshot({ path: `${OUT}/baseline-play-dark.png`, fullPage: true });
    await sheet.close();
    expect(readFileSync(`${OUT}/baseline-play-dark.png`).length).toBeGreaterThan(10_000);
  });
});
