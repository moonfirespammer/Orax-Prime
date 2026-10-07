import { describe, expect, it } from 'vitest';
import { ASSET_PATHS, asset } from './assets';
import { CLASSES, CLASS_ORDER, GEMS, GEM_ORDER, TAGLINE, avatarCrop } from './data';

describe('design-system data', () => {
  it('has nine classes in roster order, three per role (PRODUCT_SPEC §2)', () => {
    expect(CLASS_ORDER).toHaveLength(9);
    const byRole: Record<string, string[]> = { Fighter: [], Rogue: [], Mage: [] };
    for (const k of CLASS_ORDER) byRole[CLASSES[k].role]?.push(CLASSES[k].name);
    expect(byRole).toEqual({
      Fighter: ['Provider', 'Foodsmith', 'Rebel'],
      Rogue: ['Gastronaut', 'Taster', 'Purist'],
      Mage: ['Spark', 'Stirrer', 'Host'],
    });
    expect(GEM_ORDER.map((g) => GEMS[g].role)).toEqual(['Striker', 'Warden', 'Mender']);
  });

  it('resolves every board, gem and logo to a served URL, and nothing else', () => {
    for (const k of CLASS_ORDER) expect(asset(CLASSES[k].board)).toMatch(/Classes\/0\d-[a-z]+-board/);
    for (const g of GEM_ORDER) expect(asset(GEMS[g].file)).toMatch(/Gems\/(ruby|sapphire|emerald)\.svg/);
    expect(asset('assets/Logos/orax-logo-on-dark.png')).toContain('orax-logo-on-dark');
    expect(ASSET_PATHS).toHaveLength(15);
    expect(() => asset('assets/Logos/nope.png')).toThrow('Unknown design-system asset');
  });

  it('crops a figure head with the shared helper formula', () => {
    const c = avatarCrop('provider');
    expect(c.backgroundSize).toBe('450%');
    expect(c.backgroundPosition).toBe('21.71% -2.71%');
    expect(c.backgroundRepeat).toBe('no-repeat');
    expect(c.backgroundImage).toContain('01-provider-board');
    expect(avatarCrop('host', 't2f').backgroundPosition).toBe('78.29% 60.93%');
    expect(avatarCrop('host', 't1f', 2).backgroundPosition).toBe('94.00% -32.00%');
  });

  it('keeps the taglines fixed', () => {
    expect(TAGLINE).toEqual(['THE GAME IS LIFE', 'PLAY IT TOGETHER']);
  });
});
