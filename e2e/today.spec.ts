import { expect, test } from '@playwright/test';
import { THEMES, expectHitTargets, expectNoAxeViolations, open, shot } from './helpers';

const CLOCK = '2026-09-23T18:47:15';
const TOMORROW = '2026-09-24T09:00:00';
const PALATE =
  'A Rebel’s palate: off the recipe. Yours, the Stirrer: leftovers. The Bin says you would argue well over a plate, and finish it.';

test.describe('Phase 4a · Today’s match, quests and digest', () => {
  for (const theme of THEMES) {
    test(`the match, the quests and the digest render in ${theme}`, async ({ page }) => {
      await open(page, { path: '/today/match', theme, clock: CLOCK });
      await expect(page.getByRole('heading', { name: 'Today’s match' })).toBeVisible();
      await expect(page.getByText('Nadia')).toBeVisible();
      await expect(page.getByText(PALATE)).toBeVisible();
      await expect(page.getByRole('button', { name: 'Connect' })).toBeVisible();
      await expectNoAxeViolations(page, `match ${theme}`);
      await expectHitTargets(page, `match ${theme}`);
      await shot(page, `match-${theme}`);

      await open(page, { path: '/today/quests', theme, clock: CLOCK });
      await expect(page.getByRole('heading', { name: 'Today’s quests' })).toBeVisible();
      await expect(page.getByText(/^A card of five every day\./)).toBeVisible();
      await expectNoAxeViolations(page, `quests ${theme}`);
      await expectHitTargets(page, `quests ${theme}`);
      await shot(page, `quests-${theme}`);

      await open(page, { path: '/today/digest', theme, clock: CLOCK });
      await expect(page.getByRole('heading', { name: 'Today’s digest' })).toBeVisible();
      await expect(page.getByText("That's all for today")).toBeVisible();
      await expectNoAxeViolations(page, `digest ${theme}`);
      await expectHitTargets(page, `digest ${theme}`);
      await shot(page, `digest-${theme}`);
    });
  }

  test('Connect on the match offers the chat; the answer survives a reload and arrives new at 00:00', async ({
    page,
  }) => {
    await open(page, { path: '/today/match', clock: CLOCK });
    await page.getByRole('button', { name: 'Connect' }).click();
    await expect(page.getByTestId('toast')).toContainText(
      'Connected. The quest is the first message in your chat.',
    );
    await expect(page.getByRole('button', { name: 'Open the chat' })).toBeVisible();
    await open(page, { path: '/today/match', clock: CLOCK });
    await expect(page.getByRole('button', { name: 'Open the chat' })).toBeVisible();
    await open(page, { path: '/today/match', clock: TOMORROW });
    await expect(page.getByRole('button', { name: 'Connect' })).toBeVisible();
    await page.getByRole('button', { name: 'Not today' }).click();
    await expect(page.getByText("Not today. Tomorrow's match arrives at 00:00.")).toBeVisible();
  });

  test('two picks on the quests screen are kept across a reload, shown on Today, and let go at 00:00', async ({
    page,
  }) => {
    await open(page, { path: '/today/quests', clock: CLOCK });
    await page.getByRole('button', { name: /^Plate every required ingredient/ }).click();
    await page.getByRole('button', { name: /^Send a share card to your party/ }).click();
    await expect(page.getByText('Expires 00:00')).toHaveCount(3);
    await open(page, { path: '/today/quests', clock: CLOCK });
    await expect(page.getByText('Expires 00:00')).toHaveCount(3);
    await expect(page.getByRole('button', { name: /^Land a Trinity combo/ })).toBeDisabled();
    await open(page, { path: '/today', clock: CLOCK });
    await expect(page.getByText('Pick two · 2 picked')).toBeVisible();
    await open(page, { path: '/today/quests', clock: TOMORROW });
    await expect(page.getByText('Expires 00:00')).toHaveCount(0);
    await expect(page.getByRole('button', { name: /^Land a Trinity combo/ })).toBeEnabled();
  });

  test('the digest ends with Back to Today', async ({ page }) => {
    await open(page, { path: '/today/digest', clock: CLOCK });
    await page.getByRole('button', { name: 'Back to Today' }).click();
    await expect(page).toHaveURL(/\/today(\?.*)?$/);
  });
});
