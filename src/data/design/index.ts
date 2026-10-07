// The Table Wars v2 design data, loaded as shipped (docs/design/README.md: "load them; never copy numbers into
// code"). The prose lives in docs/design/*.md; docs/design/ABILITIES.md is rendered from these files.
import type { ClassKey, Gem } from '@/ds';
import augmentsJson from './augments.json';
import badJson from './bad.json';
import classesJson from './classes.json';
import hmdJson from './hmd.json';
import oxpJson from './oxp.json';
import sharedJson from './shared.json';
import type {
  AugmentsFile,
  BadFile,
  Card,
  ClassDesign,
  ClassesFile,
  Cut,
  Design,
  GemDesign,
  HmdFile,
  OxpFile,
  Palate,
  SharedFile,
} from './types';

// One cast per file: the JSON is the design's own, and src/data/design/design.test.ts checks its keys and counts.
const file = <T>(json: unknown): T => json as T;

export const DESIGN: Design = {
  shared: file<SharedFile>(sharedJson),
  classes: file<ClassesFile>(classesJson),
  augments: file<AugmentsFile>(augmentsJson),
  hmd: file<HmdFile>(hmdJson),
  oxp: file<OxpFile>(oxpJson),
  bad: file<BadFile>(badJson),
};

export const DESIGN_VERSION = DESIGN.classes.version;

const byKey = <K extends string, T extends { key: K }>(rows: readonly T[], what: string) => {
  const map = new Map(rows.map((r) => [r.key, r] as const));
  return (key: K): T => {
    const row = map.get(key);
    if (!row) throw new Error(`No ${what} for ${key}`);
    return row;
  };
};

/** A class's design row: stats from the budget, the kit, the three cuts, the art notes. */
export const classDesign = byKey<ClassKey, ClassDesign>(DESIGN.classes.classes, 'class');
/** A gem's design row: role, keyword, HMD lean and Heat, the OXP kit. */
export const gemDesign = byKey<Gem, GemDesign>(DESIGN.classes.gems, 'gem');
/** The Bin's palate for a class (BaD): what it watches, when it fires, the line and the chip. */
export const palate = byKey<ClassKey, Palate>(DESIGN.bad.palates, 'palate');

/** The cut of a class's kit for the day's gem: its name and how Basic, Passive and Signature change. */
export function cutOf(classKey: ClassKey, gem: Gem): Cut {
  const cut = classDesign(classKey).cuts.find((c) => c.gem === gem);
  if (!cut) throw new Error(`No ${gem} cut for ${classKey}`);
  return cut;
}

/** The class's House Combo: the two Signature augments that make it OP on its own. */
export function houseCombo(classKey: ClassKey) {
  const combo = DESIGN.augments.hmd.houseCombos.find((h) => h.key === classKey);
  if (!combo) throw new Error(`No House Combo for ${classKey}`);
  return combo;
}

/** The six Signature augments only this class is offered (HMD). */
export function signatureAugments(classKey: ClassKey): Card[] {
  return DESIGN.augments.hmd.signatures.find((s) => s.key === classKey)?.rows ?? [];
}

/** The ten Facets of a gem (HMD). */
export function facets(gem: Gem): Card[] {
  return DESIGN.augments.hmd.facets.find((f) => f.gem === gem)?.rows ?? [];
}

/** The eight seat augments of a gem (OXP). */
export function gemSeatAugments(gem: Gem): Card[] {
  return DESIGN.augments.oxp.gem.find((g) => g.gem === gem)?.rows ?? [];
}

/** Crowd DPS = ATK × SPD × targets: ATK derived from the budget, the rule the files ask code to apply. */
export function deriveAtk(c: Pick<ClassDesign, 'crowdDps' | 'spd' | 'targets'>): number {
  // A growing value (`31 → 41`) derives from its base.
  const dps = typeof c.crowdDps === 'number' ? c.crowdDps : Number(/\d+(?:\.\d+)?/.exec(c.crowdDps)?.[0]);
  return Math.round(dps / (c.spd * c.targets));
}

/** The `Common / Rare / Epic` values written inside a card's text, e.g. `+20 / 35 / 55% ARM.` → ['+20', '35', '55'], the sign kept. */
export function tierValues(text: string): [string, string, string] | null {
  const m = /([+−-]?\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)/.exec(text);
  return m ? [m[1] ?? '', m[2] ?? '', m[3] ?? ''] : null;
}

/** A card's keyword tags, written `burn · synergy`. */
export function tags(card: Card): string[] {
  return (card.tags ?? '')
    .split('·')
    .map((t) => t.trim())
    .filter(Boolean);
}

/** The two halves of a combo, written `Hot Plate + Thick Skin`. */
export function halves(needs: string): string[] {
  return needs.split('+').map((s) => s.replace(/\s*\([^)]*\)/g, '').trim());
}
