import { describe, expect, it } from 'vitest';
import { CLASSES, CLASS_ORDER, GEM_ORDER } from '@/ds';
import {
  DESIGN,
  DESIGN_VERSION,
  classDesign,
  cutOf,
  deriveAtk,
  facets,
  gemDesign,
  gemSeatAugments,
  halves,
  houseCombo,
  palate,
  signatureAugments,
  tags,
  tierValues,
} from './index';

const names = (rows: readonly { n: string }[]) => rows.map((r) => r.n);

describe('Table Wars v2 design data (docs/design)', () => {
  it('is one version across the six files', () => {
    expect(DESIGN_VERSION).toBe('v2 · 7 October 2026');
    for (const f of [DESIGN.shared, DESIGN.augments, DESIGN.hmd, DESIGN.oxp, DESIGN.bad])
      expect(f.version).toBe(DESIGN_VERSION);
  });

  it('has the nine classes in roster order, each with a three-part kit and a cut per gem', () => {
    expect(DESIGN.classes.classes.map((c) => c.key)).toEqual(CLASS_ORDER);
    for (const c of DESIGN.classes.classes) {
      expect(c.name).toBe(CLASSES[c.key].name);
      expect(c.kit.map((k) => k.k)).toEqual(['Basic', 'Passive', 'Signature']);
      expect(c.cuts.map((x) => x.gem)).toEqual(GEM_ORDER);
      expect(c.cuts.map((x) => x.role)).toEqual(['Striker', 'Warden', 'Mender']);
      expect(c.board).toBe(`${c.num}-${c.key}-board.png`);
    }
    expect(cutOf('provider', 'ruby').name).toBe('Hearthfire');
    expect(cutOf('host', 'emerald').name).toBe('Long Table');
  });

  it('derives ATK from the budget: crowd DPS = ATK × SPD × targets', () => {
    for (const c of DESIGN.classes.classes) expect(deriveAtk(c)).toBe(c.atk);
    expect(DESIGN.classes.budget.weights).toMatchObject({ Damage: 38, Balanced: 34, Support: 30 });
  });

  it('has the three gems with their roles and OXP kits', () => {
    expect(DESIGN.classes.gems.map((g) => g.key)).toEqual(GEM_ORDER);
    expect(gemDesign('ruby')).toMatchObject({
      role: 'Striker',
      keyword: 'Burn',
      oxp: { hand: 'R R G', limitName: 'Bloodlust' },
    });
    expect(gemDesign('sapphire')).toMatchObject({
      role: 'Warden',
      oxp: { hand: 'B B R', limitName: 'Prismatic Shift' },
    });
    expect(gemDesign('emerald')).toMatchObject({
      role: 'Mender',
      oxp: { hand: 'G G B', limitName: 'Exploit' },
    });
  });

  it('agrees with the app: palates and mottos match the prototype strings in src/ds', () => {
    for (const k of CLASS_ORDER) {
      expect(palate(k).watch.toLowerCase()).toBe(CLASSES[k].palate);
      expect(palate(k).cls).toBe(CLASSES[k].name);
    }
    expect(classDesign('stirrer').motto).toBe('Waste nothing. Miss nothing.');
  });

  it('carries the HMD catalogue at the counts the compendium states', () => {
    const h = DESIGN.augments.hmd;
    expect(h.pantry).toHaveLength(36);
    expect(h.clicks).toHaveLength(16);
    expect(h.facets.map((f) => f.gem)).toEqual(GEM_ORDER);
    for (const g of GEM_ORDER) expect(facets(g)).toHaveLength(10);
    expect(h.facetClicks).toHaveLength(9);
    expect(h.signatures.map((s) => s.key)).toEqual(CLASS_ORDER);
    for (const k of CLASS_ORDER) expect(signatureAugments(k)).toHaveLength(6);
    expect(h.specials).toHaveLength(16);
    expect(h.tableCombos).toHaveLength(16);
    expect(h.recipes).toHaveLength(12);
    expect(h.menus).toHaveLength(8);
    expect(h.houseCombos.map((x) => x.key)).toEqual(CLASS_ORDER);
    expect(DESIGN.hmd.augments.pools).toMatchObject({
      pantry: 36,
      facetsPerGem: 10,
      signaturesPerClass: 6,
      specials: 16,
      recipes: 12,
    });
  });

  it('names every combo half after a card that exists', () => {
    const h = DESIGN.augments.hmd;
    const pantry = new Set(names(h.pantry));
    for (const c of [...h.clicks, ...h.recipes])
      for (const half of halves(c.needs)) expect(pantry, `${c.n}: ${half}`).toContain(half);
    for (const c of h.facetClicks) {
      if (c.gem === 'any') continue;
      const pool = new Set(names(facets(c.gem)));
      for (const half of halves(c.needs)) expect(pool, `${c.n}: ${half}`).toContain(half);
    }
    for (const k of CLASS_ORDER) {
      const pool = new Set(names(signatureAugments(k)));
      for (const half of halves(houseCombo(k).needs))
        expect(pool, `${k} House Combo: ${half}`).toContain(half);
    }
    const o = DESIGN.augments.oxp;
    const seatCards = new Set([...names(o.general), ...GEM_ORDER.flatMap((g) => names(gemSeatAugments(g)))]);
    for (const c of o.clicks)
      for (const half of halves(c.needs)) expect(seatCards, `${c.n}: ${half}`).toContain(half);
  });

  it('carries the OXP catalogue at the counts the compendium states', () => {
    const o = DESIGN.augments.oxp;
    expect(o.combos).toHaveLength(10);
    expect(o.combos.find((c) => c.c === 'R R R')?.base).toBe(360);
    expect(o.general).toHaveLength(24);
    for (const g of GEM_ORDER) expect(gemSeatAugments(g)).toHaveLength(8);
    expect(o.clicks).toHaveLength(13);
    expect(o.tableCombos).toHaveLength(8);
    expect(o.relics.map((r) => r.rows.length)).toEqual([16, 14, 8, 8]);
    expect(o.blessings).toHaveLength(6);
    expect(o.leftovers).toHaveLength(6);
    expect(o.recipes).toHaveLength(8);
    expect(o.menus).toHaveLength(6);
    expect(DESIGN.oxp.monsters.map((m) => m.rows.length)).toEqual([9, 9, 3]);
    expect(DESIGN.oxp.modifiers).toHaveLength(16);
    expect(DESIGN.oxp.abilities).toHaveLength(16);
    expect(DESIGN.oxp.seat.lives).toBe(2);
  });

  it('carries the HMD fight: four courses of four units, nine champions by slot, eighteen conditions', () => {
    expect(DESIGN.hmd.fight).toMatchObject({ timerSeconds: 180, horde: 999, fieldCap: 400 });
    expect(DESIGN.hmd.courses.map((c) => c.units.length)).toEqual([4, 4, 4, 4]);
    expect(DESIGN.hmd.hordeBudget.byCourse.reduce((a, b) => a + b, 0)).toBe(DESIGN.hmd.hordeBudget.totalHp);
    expect(DESIGN.hmd.champions.hpBySlot).toHaveLength(9);
    expect(DESIGN.hmd.champions.roster).toHaveLength(9);
    expect(DESIGN.hmd.conditions.list).toHaveLength(18);
    expect(DESIGN.hmd.conditions.list.filter((c) => c.tier === 'I')).toHaveLength(6);
  });

  it('reads tiered values and tags off a card', () => {
    expect(tierValues('+20 / 35 / 55% ARM.')).toEqual(['+20', '35', '55']);
    expect(tierValues('Burn lasts 8 / 12 / 20 s.')).toEqual(['8', '12', '20']);
    expect(tierValues('Immune to Burn. Rare: adjacent allies too.')).toBeNull();
    expect(tags({ n: 'x', t: '', tags: 'heat · synergy' })).toEqual(['heat', 'synergy']);
    expect(tags({ n: 'x', t: '' })).toEqual([]);
    expect(halves('Opener (seat 1) + Closer (seat 3)')).toEqual(['Opener', 'Closer']);
  });

  it('shares one clock and one voice with the app', () => {
    expect(DESIGN.shared.clock.prepWindows).toEqual(['00:00', '06:00', '12:00', '18:00']);
    expect(DESIGN.shared.habits).toHaveLength(11);
    expect(DESIGN.shared.gifts).toHaveLength(4);
    expect(DESIGN.bad.palates.map((p) => p.key)).toEqual(CLASS_ORDER);
    expect(DESIGN.augments.builds).toHaveLength(10);
  });
});
