import { expect, test } from '@playwright/test';
import { THEMES, expectHitTargets, expectNoAxeViolations, open, shot } from './helpers';

const CLOCK = '2026-09-23T18:47:15';

test.describe('Phase 2b · invite and onboarding', () => {
  test('a fresh device enters at the invite code', async ({ page }) => {
    await open(page, { clock: CLOCK });
    await expect(page).toHaveURL(/\/invite$/);
    await expect(page.getByRole('heading', { name: 'You were invited.' })).toBeVisible();
  });

  for (const theme of THEMES) {
    test(`the invite screen renders in ${theme} with a code typed`, async ({ page }) => {
      await open(page, { path: '/invite', theme, clock: CLOCK });
      await expect(page.getByRole('button', { name: 'Continue' })).toBeDisabled();
      await page.getByRole('textbox', { name: 'Invite code' }).fill('nus7q2');
      await expect(page.getByRole('textbox', { name: 'Invite code' })).toHaveValue('NUS7Q2');
      await expect(page.getByText('Looks right. Next: a five-question identity test.')).toBeVisible();
      await expect(page.getByRole('button', { name: 'Continue' })).toBeEnabled();
      await expectNoAxeViolations(page, `invite ${theme}`);
      await expectHitTargets(page, `invite ${theme}`);
      await shot(page, `invite-${theme}`);
    });

    test(`the identity test renders in ${theme}`, async ({ page }) => {
      await open(page, { path: '/onboarding', theme, clock: CLOCK });
      await expect(page.getByText('Identity test')).toBeVisible();
      await expect(page.getByText('Who you are · 1 of 5')).toBeVisible();
      await expect(
        page.getByRole('heading', { name: 'At a hawker centre with friends, you are the one who…' }),
      ).toBeVisible();
      await expectNoAxeViolations(page, `onboarding ${theme}`);
      await expectHitTargets(page, `onboarding ${theme}`);
      await shot(page, `onboarding-${theme}`);
    });
  }

  test('the whole path: code, five answers, class, gem, city, then Today; the player survives a reload', async ({
    page,
  }) => {
    await open(page, { path: '/invite', clock: CLOCK });
    await page.getByRole('textbox', { name: 'Invite code' }).fill('NUS7Q2');
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page).toHaveURL(/\/onboarding$/);
    for (const a of [
      'orders for the whole table',
      'waste nothing, miss nothing',
      'eat it anyway, all of it',
      'seat everyone exactly right',
      'neat plater',
    ])
      await page.getByRole('button', { name: a }).click();
    await expect(page.getByText('Your class')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Stirrer' })).toBeVisible();
    await expect(page.getByText('Waste nothing. Miss nothing.')).toBeVisible();
    await expectNoAxeViolations(page, 'class reveal');
    await shot(page, 'onboarding-class-dark');
    await page.getByRole('button', { name: 'Choose your gem' }).click();
    await expect(page.getByRole('heading', { name: "Choose today's gem" })).toBeVisible();
    await page.getByRole('button', { name: 'Emerald Mender' }).click();
    await expect(page.getByText('Emerald · Mender')).toBeVisible();
    await expectNoAxeViolations(page, 'gem pick');
    await expectHitTargets(page, 'gem pick');
    await shot(page, 'onboarding-gem-dark');
    await page.getByRole('button', { name: 'Pick your city' }).click();
    await expect(page.getByRole('heading', { name: 'Where do you play?' })).toBeVisible();
    await expectNoAxeViolations(page, 'city pick');
    await shot(page, 'onboarding-city-dark');
    await page.getByRole('button', { name: 'Start playing' }).click();
    await expect(page).toHaveURL(/\/today$/);
    await expect(page.getByTestId('toast')).toContainText(
      "Welcome, Stirrer. Your first match arrives at 00:00; today's is waiting.",
    );
    await page.getByRole('navigation', { name: 'Main' }).getByRole('button', { name: 'You' }).click();
    await expect(page.getByText('Emerald Stirrer · 12 plates this month · gem locks at 00:00')).toBeVisible();
    await page.goto('/');
    await page.locator('[data-testid="orax-app"]').waitFor();
    await expect(page).toHaveURL(/\/today$/);
  });
});
