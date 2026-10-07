import { expect, test } from '@playwright/test';
import { THEMES, expectHitTargets, expectNoAxeViolations, open, shot } from './helpers';

// 18:47:15 Singapore: "Resets 5h 12m" for the next 45 s, the next Prep window is 00:00.
const CLOCK = '2026-09-23T18:47:15';

test.describe('Phase 2a · the shell: Today, the Play sheet, You', () => {
  for (const theme of THEMES) {
    test(`Today renders direction 1a in ${theme}`, async ({ page }) => {
      await open(page, { path: '/today', theme, clock: CLOCK });
      await expect(page.getByText('Resets 5h 12m')).toBeVisible();
      await expect(page.getByText('Singapore', { exact: true })).toBeVisible();
      await expect(page.getByText('Nadia')).toBeVisible();
      await expect(page.getByText('2 habits in common · your palates argue well')).toBeVisible();
      await expect(page.getByRole('button', { name: 'Connect' })).toBeVisible();
      await expect(page.getByText('Pick two · 0 picked')).toBeVisible();
      await expect(page.getByText('Prep window 00:00')).toBeVisible();
      await expect(page.getByRole('button', { name: /^Build-A-Dish/ })).toBeVisible();
      await expect(
        page.getByRole('navigation', { name: 'Main' }).getByRole('button', { name: 'Today' }),
      ).toHaveAttribute('aria-current', 'page');
      await expectNoAxeViolations(page, `today ${theme}`);
      await expectHitTargets(page, `today ${theme}`);
      await shot(page, `today-${theme}`);
    });

    test(`the Play sheet opens over Today in ${theme}`, async ({ page }) => {
      await open(page, { path: '/today', theme, clock: CLOCK });
      await page.getByRole('button', { name: 'Play' }).click();
      const sheet = page.getByRole('dialog', { name: 'Play' });
      await expect(sheet).toBeVisible();
      await expect(sheet).toBeFocused();
      await expect(sheet.getByText('Resets 5h 12m')).toBeVisible();
      for (const r of ['Build-A-Dish', 'HMD · the last stand', 'OXP · Table Wars', 'City · venue raid'])
        await expect(
          sheet.getByRole('button', { name: new RegExp(`^${r.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`) }),
        ).toBeVisible();
      await expect(sheet.getByText('Matched by who you are, not by skill.')).toBeVisible();
      await expectNoAxeViolations(page, `play sheet ${theme}`);
      await shot(page, `play-sheet-${theme}`);
      await page.getByRole('button', { name: 'Close' }).click({ position: { x: 195, y: 40 } });
      await expect(page.getByRole('dialog')).toHaveCount(0);
    });

    test(`You renders in ${theme}`, async ({ page }) => {
      await open(page, { path: '/you', theme, clock: CLOCK });
      await expect(page.getByRole('heading', { name: 'You' })).toBeVisible();
      await expect(page.getByText('Wen')).toBeVisible();
      await expect(
        page.getByText('Sapphire Stirrer · 12 plates this month · gem locks at 00:00'),
      ).toBeVisible();
      await expect(page.getByRole('button', { name: /^Mei · “Chilli”/ })).toBeVisible();
      await expect(page.getByText('No Signature Dish yet. Cook one and keep it.')).toBeVisible();
      await expect(page.getByRole('button', { name: 'Wardrobe' })).toBeVisible();
      await expect(
        page.getByRole('navigation', { name: 'Main' }).getByRole('button', { name: 'You' }),
      ).toHaveAttribute('aria-current', 'page');
      await expectNoAxeViolations(page, `you ${theme}`);
      await expectHitTargets(page, `you ${theme}`);
      await shot(page, `you-${theme}`);
    });
  }

  test('the app entry is Today once a player has been saved on this device', async ({ page }) => {
    await open(page, { path: '/today', clock: CLOCK });
    // The saved player as src/store/me.ts writes it, in idb-keyval's default store.
    await page.evaluate(
      (saved) =>
        new Promise<void>((resolve, reject) => {
          const req = indexedDB.open('keyval-store', 1);
          req.onupgradeneeded = () => req.result.createObjectStore('keyval');
          req.onerror = () => {
            reject(new Error('could not open keyval-store'));
          };
          req.onsuccess = () => {
            const tx = req.result.transaction('keyval', 'readwrite');
            tx.objectStore('keyval').put(saved, 'orax:me');
            tx.oncomplete = () => {
              resolve();
            };
            tx.onerror = () => {
              reject(new Error('could not write orax:me'));
            };
          };
        }),
      {
        me: { name: 'Wen', classKey: 'stirrer', figure: 't1m', gem: 'sapphire', city: 'SG' },
        onboarded: true,
      },
    );
    await page.goto('/');
    await page.locator('[data-testid="orax-app"]').waitFor();
    await expect(page).toHaveURL(/\/today$/);
  });

  test('picking two quests expires the other three; a pick can be let go', async ({ page }) => {
    await open(page, { path: '/today', clock: CLOCK });
    await page.getByRole('button', { name: /^Plate every required ingredient/ }).click();
    await page.getByRole('button', { name: /^Take a front slot/ }).click();
    await expect(page.getByText('Pick two · 2 picked')).toBeVisible();
    await expect(page.getByText('Expires 00:00')).toHaveCount(3);
    await expect(page.getByRole('button', { name: /^Land a Trinity combo/ })).toBeDisabled();
    await page.getByRole('button', { name: /^Take a front slot/ }).click();
    await expect(page.getByText('Pick two · 1 picked')).toBeVisible();
    await expect(page.getByRole('button', { name: /^Land a Trinity combo/ })).toBeEnabled();
  });

  test('Connect answers the match with a toast and offers the chat; Not today closes it', async ({
    page,
  }) => {
    await open(page, { path: '/today', clock: CLOCK });
    await page.getByRole('button', { name: 'Connect' }).click();
    await expect(page.getByTestId('toast')).toContainText(
      'Connected. The quest is the first message in your chat.',
    );
    await expect(page.getByRole('button', { name: 'Open the chat with Nadia' })).toBeVisible();
    await expect(page.getByTestId('toast')).toBeHidden({ timeout: 5000 });
    await page.reload();
    await page.locator('[data-testid="orax-app"]').waitFor();
    await page.getByRole('button', { name: 'Not today' }).click();
    await expect(page.getByText("Not today. Tomorrow's match arrives at 00:00.")).toBeVisible();
  });

  test('a room opens under its header, Back returns, and the tabs switch screens', async ({ page }) => {
    await open(page, { path: '/today', clock: CLOCK });
    await page.getByRole('button', { name: 'Play' }).click();
    await page
      .getByRole('dialog')
      .getByRole('button', { name: /^Build-A-Dish/ })
      .click();
    await expect(page).toHaveURL(/\/play\/bad$/);
    await expect(page.getByRole('heading', { name: 'Today’s dishes' })).toBeVisible();
    await expect(page.getByText('One dish a day · swap once')).toBeVisible();
    await expect(page.getByText('Resets 5h 12m')).toBeVisible();
    await expect(page.getByRole('navigation')).toHaveCount(0);
    await page.getByRole('button', { name: 'Back' }).click();
    await expect(page).toHaveURL(/\/today(\?.*)?$/);
    await page.getByRole('navigation', { name: 'Main' }).getByRole('button', { name: 'You' }).click();
    await expect(page).toHaveURL(/\/you$/);
    await page.getByRole('button', { name: 'Change class' }).click();
    await expect(page.getByRole('heading', { name: 'Change class' })).toBeVisible();
    await page.getByRole('button', { name: 'Back' }).click();
    await expect(page).toHaveURL(/\/you$/);
  });

  test('Back from a deep-linked sub-screen lands on its tab', async ({ page }) => {
    await open(page, { path: '/you/wardrobe', clock: CLOCK });
    await expect(page.getByRole('heading', { name: 'Wardrobe' })).toBeVisible();
    await page.getByRole('button', { name: 'Back' }).click();
    await expect(page).toHaveURL(/\/you$/);
  });
});
