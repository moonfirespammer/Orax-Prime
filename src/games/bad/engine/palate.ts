// The class palate (docs/design/30-bad.md §5.3): the judge is the same for everyone; the class changes what the Bin
// notices. Nine checks over facts the judge already has, copy from src/data/design/bad.json, never a cooking power.
import { palate as palateDesign } from '@/data/design';
import type { ClassKey } from '@/ds';
import { fill } from './content/copy';
import type { JudgedItem } from './namer';
import type { PalateNote, Style } from './types';

/** What the judge knows about a plate, as the palate checks read it. */
export interface PalateFacts {
  items: readonly JudgedItem[];
  style: Style;
  stones: 1 | 2 | 3;
  /** Required ingredients present over required ingredients. */
  coverage: number;
  /** The dish has an optional row, and whether any of it is on the plate. */
  hasOptional: boolean;
  optionalUsed: boolean;
  extras: readonly JudgedItem[];
  burnt: number;
  /** Any item cut to dust. */
  dust: boolean;
  /** Chilli-tagged portions. */
  chilliN: number;
  sauceN: number;
  proteinN: number;
  flair: number;
  mess: number;
  dishLower: string;
}

/** The day around the plate, which the judge cannot see on its own. */
export interface PalateContext {
  classKey: ClassKey;
  leftoversHour: boolean;
  /** Something was flung to the Bin since the dish was picked. */
  flung: boolean;
  /** Among the first ten in the city to pick the dish. */
  early: boolean;
  /** Posted in the dish's thread before plating. */
  posted: boolean;
  /** The month's palate counter before this plate; the chip shows counter + 1. */
  palateCount: number;
}

export const EARLY_PICK_RANK = 10;

/** "In character when" (docs/design/30-bad.md §5.3), one check per class. */
export function inCharacter(classKey: ClassKey, f: PalateFacts, c: PalateContext): boolean {
  switch (classKey) {
    case 'provider':
      return f.style === 'Generous' && f.coverage === 1;
    case 'foodsmith':
      return (
        f.items.filter((i) => i.needsCut).every((i) => i.cut === 1 || i.cut === 2) &&
        !f.dust &&
        f.items.some((i) => i.tags.includes('protein') && i.heat === 2)
      );
    case 'spark':
      return f.chilliN >= 2 || f.flair >= 3;
    case 'gastronaut':
      return f.coverage === 1 && (!f.hasOptional || f.optionalUsed);
    case 'taster':
      return f.sauceN === f.proteinN && f.burnt === 0 && !f.dust;
    case 'purist':
      return f.style === 'Neat' && f.stones === 3 && f.extras.length === 0 && f.mess === 0;
    case 'rebel':
      return f.extras.length === 1 && f.stones >= 2;
    case 'stirrer':
      return (c.leftoversHour && f.items.some((i) => i.n > 3)) || (c.flung && f.stones >= 2);
    case 'host':
      return c.early || c.posted;
  }
}

/** The Bin's added line and the class chip, or null when the plate was not in character. Cursed plates earn none. */
export function palateNote(f: PalateFacts, c: PalateContext): PalateNote | null {
  if (!inCharacter(c.classKey, f, c)) return null;
  const p = palateDesign(c.classKey);
  const extra = f.extras[0]?.name ?? 'That';
  return {
    line: fill(p.line, { Extra: extra, dish: f.dishLower }),
    chip: p.chip.replace('×n', `×${String(c.palateCount + 1)}`),
  };
}
