import { describe, expect, it } from 'vitest';
import { palate as palateDesign } from '@/data/design';
import type { ClassKey } from '@/ds';
import { dish } from './content/dishes';
import { judge } from './judge';
import type { PalateContext } from './palate';
import type { Level, Plate, PlateItem } from './types';

type Row = [id: string, n: number, cut?: Level, heat?: Level];
const plate = (rows: Row[], flair = 0, mess = 0): Plate => ({
  items: rows.map(([ingredientId, n, cut = 0, heat = 0]): PlateItem => ({ ingredientId, n, cut, heat })),
  flair,
  mess,
});
const HABITS = { chilli: 0, unhinged: 0 };
const ctx = (classKey: ClassKey, more: Partial<PalateContext> = {}): PalateContext => ({
  classKey,
  leftoversHour: false,
  flung: false,
  early: false,
  posted: false,
  palateCount: 0,
  ...more,
});
/** Chicken rice, every required ingredient prepped as it should be: 100, Neat, three stones. */
const PERFECT: Row[] = [
  ['chicken', 1, 1, 1],
  ['rice', 1, 0, 1],
  ['ginger', 1],
  ['chilli-sauce', 1],
  ['cucumber', 1, 1, 0],
  ['dark-soy', 1],
];
const chickenRice = dish('chicken-rice');
/** The perfect plate with one row replaced. */
const swap = (rows: readonly Row[], id: string, row: Row): Row[] => rows.map((r) => (r[0] === id ? row : r));

describe('the class palate (docs/design/30-bad.md §5.3): what the Bin notices, from src/data/design', () => {
  it('fires nothing without a class context, and nothing on a cursed plate', () => {
    expect(judge(chickenRice, plate(PERFECT), HABITS).palate).toBeUndefined();
    // Two extras curse the plate; the Spark would otherwise fire on the chilli.
    const cursed = plate([...PERFECT, ['chilli-padi', 2, 1, 0], ['durian', 1]]);
    const v = judge(chickenRice, cursed, HABITS, ctx('spark'));
    expect(v.cursed).toBe(true);
    expect(v.palate).toBeUndefined();
  });

  it('Provider: Generous with every required ingredient present', () => {
    const generous = plate(swap(swap(PERFECT, 'rice', ['rice', 2, 0, 1]), 'ginger', ['ginger', 2]));
    const v = judge(chickenRice, generous, HABITS, ctx('provider'));
    expect(v.style).toBe('Generous');
    expect(v.palate).toEqual({ line: palateDesign('provider').line, chip: 'Feeds the table ×1' });
    expect(judge(chickenRice, plate(PERFECT), HABITS, ctx('provider')).palate).toBeUndefined();
  });

  it('Foodsmith: every cut in place, none dust, a protein seared', () => {
    const seared: Row[] = [
      ['chicken', 1, 2, 2],
      ['rice', 1, 0, 1],
      ['ginger', 1],
      ['chilli-sauce', 1],
      ['cucumber', 1, 1, 0],
      ['dark-soy', 1],
    ];
    expect(judge(chickenRice, plate(seared), HABITS, ctx('foodsmith')).palate?.chip).toBe('Knife first ×1');
    const dust: Row[] = [
      ['chicken', 1, 3, 2],
      ['rice', 1, 0, 1],
      ['ginger', 1],
      ['chilli-sauce', 1],
      ['cucumber', 1, 1, 0],
      ['dark-soy', 1],
    ];
    expect(judge(chickenRice, plate(dust), HABITS, ctx('foodsmith')).palate).toBeUndefined();
    expect(judge(chickenRice, plate(PERFECT), HABITS, ctx('foodsmith')).palate).toBeUndefined();
  });

  it('Spark: two chilli portions, or flair at three', () => {
    const chilli = plate(swap(PERFECT, 'chilli-sauce', ['chilli-sauce', 2]));
    expect(judge(chickenRice, chilli, HABITS, ctx('spark')).palate?.chip).toBe('Brings the heat ×1');
    expect(judge(chickenRice, plate(PERFECT, 3), HABITS, ctx('spark')).palate?.chip).toBe(
      'Brings the heat ×1',
    );
    expect(judge(chickenRice, plate(PERFECT, 2), HABITS, ctx('spark')).palate).toBeUndefined();
  });

  it('Gastronaut: full coverage, and the optional row used where the dish has one', () => {
    const soup = dish('mutton-soup');
    const withBread: Row[] = [
      ['mutton', 1, 1, 1],
      ['spices', 1, 0, 1],
      ['onion', 1, 1, 1],
      ['coriander', 1, 1, 0],
      ['baguette', 1, 1, 0],
    ];
    expect(judge(soup, plate(withBread), HABITS, ctx('gastronaut')).palate?.line).toBe(
      palateDesign('gastronaut').line,
    );
    expect(judge(soup, plate(withBread.slice(0, 4)), HABITS, ctx('gastronaut')).palate).toBeUndefined();
    expect(judge(chickenRice, plate(PERFECT), HABITS, ctx('gastronaut')).palate?.chip).toBe(
      'Leaves nothing off ×1',
    );
  });

  it('Taster: sauce portions equal protein portions, nothing burnt, nothing at dust', () => {
    const balanced = plate(swap(PERFECT, 'chicken', ['chicken', 3, 1, 1]));
    expect(judge(chickenRice, balanced, HABITS, ctx('taster')).palate?.chip).toBe('Tests first ×1');
    expect(judge(chickenRice, plate(PERFECT), HABITS, ctx('taster')).palate).toBeUndefined();
  });

  it('Purist: Neat, three stones, no extras, no mess on the pad', () => {
    expect(judge(chickenRice, plate(PERFECT), HABITS, ctx('purist')).palate?.chip).toBe('Clean plater ×1');
    expect(judge(chickenRice, plate(PERFECT, 0, 1), HABITS, ctx('purist')).palate).toBeUndefined();
  });

  it('Rebel: exactly one extra and still two stones, the extra named in the line', () => {
    const v = judge(chickenRice, plate([...PERFECT, ['cheddar', 1]]), HABITS, ctx('rebel'));
    expect(v.stones).toBeGreaterThanOrEqual(2);
    expect(v.palate).toEqual({
      line: 'Cheddar in chicken rice, and it held. Do it again and I will pretend not to look.',
      chip: 'Breaks the recipe ×1',
    });
    expect(judge(chickenRice, plate(PERFECT), HABITS, ctx('rebel')).palate).toBeUndefined();
  });

  it('Stirrer: an item above three portions in Leftovers hour, or a fling with two stones', () => {
    const heap = plate(swap(PERFECT, 'rice', ['rice', 4, 0, 1]));
    expect(judge(chickenRice, heap, HABITS, ctx('stirrer', { leftoversHour: true })).palate?.chip).toBe(
      'Leftovers regular ×1',
    );
    expect(judge(chickenRice, heap, HABITS, ctx('stirrer')).palate).toBeUndefined();
    expect(judge(chickenRice, plate(PERFECT), HABITS, ctx('stirrer', { flung: true })).palate?.chip).toBe(
      'Leftovers regular ×1',
    );
  });

  it('Host: among the first ten to pick, or posted in the thread first; the chip counts the month', () => {
    expect(judge(chickenRice, plate(PERFECT), HABITS, ctx('host', { early: true })).palate?.chip).toBe(
      'Sets the table ×1',
    );
    expect(
      judge(chickenRice, plate(PERFECT), HABITS, ctx('host', { posted: true, palateCount: 4 })).palate?.chip,
    ).toBe('Sets the table ×5');
    expect(judge(chickenRice, plate(PERFECT), HABITS, ctx('host')).palate).toBeUndefined();
  });
});
