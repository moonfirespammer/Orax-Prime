import { expect, test, type Page } from '@playwright/test';
import { THEMES, expectHitTargets, expectNoAxeViolations, open, shot } from './helpers';

const CLOCK = '2026-09-23T10:00:00';
const cta = (page: Page) => page.getByRole('button', { name: /^(Pick|Cook|Swap|No swaps)/ });
const card = (page: Page, id: string) => page.getByTestId(`pantry-${id}`).getByRole('button').first();

/** Pick chicken rice on the Board and open its Station. */
async function cook(page: Page) {
  await page.getByRole('button', { name: /^Hainanese chicken rice/ }).click();
  await cta(page).click();
  await expect(cta(page)).toHaveText('Cook chicken rice');
  await cta(page).click();
  await expect(page).toHaveURL(/\/play\/bad\/station$/);
  await expect(page.getByRole('heading', { name: 'Hainanese chicken rice' })).toBeVisible();
}

/** A stroke on the sigil pad, as a mouse would draw it. */
async function stroke(page: Page, points: [number, number][]) {
  const box = await page.getByTestId('sigil-pad').boundingBox();
  if (!box) throw new Error('no pad');
  const [first, ...rest] = points;
  await page.mouse.move(box.x + first[0], box.y + first[1]);
  await page.mouse.down();
  for (const [x, y] of rest) await page.mouse.move(box.x + x, box.y + y, { steps: 3 });
  await page.mouse.up();
}

test.describe('Phase 3b · Build-A-Dish: the Board and the Station', () => {
  for (const theme of THEMES) {
    test(`the Board and the Station render in ${theme}`, async ({ page }) => {
      await open(page, { path: '/play/bad', theme, clock: CLOCK });
      await expect(page.getByRole('heading', { name: 'Today’s dishes' })).toBeVisible();
      await expect(
        page.getByText('One shelf for all of Singapore. One dish a day, swap once.'),
      ).toBeVisible();
      await expect(cta(page)).toBeDisabled();
      await page.getByRole('button', { name: /^Hainanese chicken rice/ }).click();
      await expect(cta(page)).toHaveText('Pick chicken rice for today');
      await cta(page).click();
      await expect(cta(page)).toHaveText('Cook chicken rice');
      await expect(page.getByTestId('toast')).toContainText('Chicken rice. The whole city can see that now.');
      await expect(page.getByText(/^You are in\. \d+ cooking chicken rice right now\.$/)).toBeVisible();
      await expectNoAxeViolations(page, `board ${theme}`);
      await expectHitTargets(page, `board ${theme}`);
      await shot(page, `bad-board-${theme}`);

      await cta(page).click();
      await expect(page).toHaveURL(/\/play\/bad\/station$/);
      await expect(page.getByRole('heading', { name: 'Hainanese chicken rice' })).toBeVisible();
      await expect(page.getByText('Tap the Pantry · stroke the pad')).toBeVisible();
      await card(page, 'chicken').click();
      await page.getByRole('button', { name: 'Cut', exact: true }).click();
      await page.getByRole('button', { name: 'Heat', exact: true }).click();
      await card(page, 'rice').click();
      await card(page, 'rice').click();
      await expect(page.getByTestId('plate-chips')).toContainText('Chicken ×1');
      await expect(page.getByTestId('plate-chips')).toContainText('cut · cooked');
      await expect(page.getByTestId('plate-chips')).toContainText('Rice ×2');
      await expect(page.getByText('Strokes apply to Rice')).toBeVisible();
      await expectNoAxeViolations(page, `station ${theme}`);
      await expectHitTargets(page, `station ${theme}`);
      await shot(page, `bad-station-${theme}`);
    });
  }

  test('a slash on the pad cuts the aimed item, a flick up plates it, and the verdict opens', async ({
    page,
  }) => {
    await open(page, { path: '/play/bad', clock: CLOCK });
    await cook(page);
    await card(page, 'chicken').click();
    await stroke(page, [
      [40, 75],
      [120, 76],
      [200, 75],
      [280, 76],
    ]);
    await expect(page.getByTestId('sigil-word')).toHaveText('CUT');
    await expect(page.getByTestId('plate-chips')).toContainText('cut');
    await stroke(page, [
      [180, 130],
      [180, 100],
      [180, 70],
      [180, 40],
    ]);
    await expect(page).toHaveURL(/\/play\/bad\/verdict$/);
    await expect(page.getByRole('heading', { name: 'The Bin’s verdict' })).toBeVisible();
  });

  test('Plate it from the footer opens the verdict too', async ({ page }) => {
    await open(page, { path: '/play/bad', clock: CLOCK });
    await cook(page);
    await card(page, 'chicken').click();
    await page.getByRole('button', { name: 'Plate it' }).click();
    await expect(page).toHaveURL(/\/play\/bad\/verdict$/);
  });

  test('the Station without a pick returns to the Board; Back from the Station lands on the Board', async ({
    page,
  }) => {
    await open(page, { path: '/play/bad/station', clock: CLOCK });
    await expect(page).toHaveURL(/\/play\/bad$/);
    await cook(page);
    await page.getByRole('button', { name: 'Back' }).click();
    await expect(page).toHaveURL(/\/play\/bad$/);
    await expect(page.getByRole('heading', { name: 'Today’s dishes' })).toBeVisible();
  });

  test('Leftovers hour shows its banner on the Board and lifts the cap on the Station', async ({ page }) => {
    await open(page, { path: '/play/bad', clock: '2026-09-23T21:30:00', leftovers: 'on' });
    await expect(page.getByText('Leftovers hour · until 00:00')).toBeVisible();
    await expect(
      page.getByText('Portion caps are off on anything the city still has plenty of.'),
    ).toBeVisible();
    await cook(page);
    await expect(page.getByText('Leftovers hour · no cap on plentiful stock')).toBeVisible();
  });
});
