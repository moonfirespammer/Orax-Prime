import { expect, test } from '@playwright/test';
import { THEMES, expectHitTargets, expectNoAxeViolations, open, shot } from './helpers';

test.describe('Phase 1b · design system and the seven components', () => {
  for (const theme of THEMES) {
    test(`the gallery renders in ${theme} with no axe violations and 44 px targets`, async ({ page }) => {
      await open(page, { path: '/ds', theme });
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
      await expect(page.getByRole('heading', { name: 'Design system' })).toBeVisible();
      for (const name of ['Button', 'Chip', 'Logo', 'Tagline', 'Cover', 'GemSocket', 'ClassCard', 'Icon']) {
        await expect(page.getByRole('region', { name })).toBeVisible();
      }
      await expect(page.getByRole('button', { name: 'Start playing' })).toBeVisible();
      await expect(page.getByRole('img', { name: 'Sapphire gem, active' }).first()).toBeVisible();
      await expectNoAxeViolations(page, `gallery ${theme}`);
      await expectHitTargets(page, `gallery ${theme}`);
      await shot(page, `ds-${theme}`, { fullPage: true });
    });
  }

  test('the app entry lands on the gallery for now', async ({ page }) => {
    await open(page);
    await expect(page).toHaveURL(/\/ds$/);
  });

  test('the Settings button toggles the theme and the choice survives a reload', async ({ page }) => {
    await open(page, { path: '/ds' });
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await page.getByRole('button', { name: 'Settings' }).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await page.reload();
    await page.locator('[data-testid="orax-app"]').waitFor();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await page.getByRole('button', { name: 'Settings' }).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('a tapped gem socket becomes the active one', async ({ page }) => {
    await open(page, { path: '/ds' });
    const ruby = page.getByRole('button', { name: 'Ruby gem' });
    const emerald = page.getByRole('button', { name: 'Emerald gem' });
    await expect(ruby).toHaveAttribute('aria-pressed', 'true');
    await expect(emerald).toHaveAttribute('aria-pressed', 'false');
    await emerald.click();
    await expect(emerald).toHaveAttribute('aria-pressed', 'true');
    await expect(ruby).toHaveAttribute('aria-pressed', 'false');
  });
});
