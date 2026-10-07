import { expect, test } from '@playwright/test';
import { THEMES, expectNoAxeViolations, open, shot } from './helpers';

test.describe('Phase 1a · skeleton', () => {
  for (const theme of THEMES) {
    test(`boots in ${theme} with the theme attribute set and no axe violations`, async ({ page }) => {
      await open(page, { theme });
      await expect(page.getByRole('heading', { name: 'OraX' })).toBeVisible();
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
      await expectNoAxeViolations(page, `skeleton ${theme}`);
      await shot(page, `skeleton-${theme}`);
    });
  }
});
