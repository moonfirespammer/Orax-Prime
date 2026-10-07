import type { CSSProperties } from 'react';
import { asset } from './assets';
import type { ClassKey, Figure, Gem, Role } from './types';

export interface GemInfo {
  name: string;
  /** The gem's role in OXP and HMD (PRODUCT_SPEC §2). */
  role: 'Striker' | 'Warden' | 'Mender';
  cut: string;
  setting: string;
  file: string;
}

/** The three gem variants: cut → setting. The socket outline tells you the gem before the colour does. */
export const GEMS: Readonly<Record<Gem, GemInfo>> = {
  ruby: {
    name: 'Ruby',
    role: 'Striker',
    cut: 'round brilliant',
    setting: 'round',
    file: 'assets/Gems/ruby.svg',
  },
  sapphire: {
    name: 'Sapphire',
    role: 'Warden',
    cut: 'rounded square',
    setting: 'rounded square',
    file: 'assets/Gems/sapphire.svg',
  },
  emerald: {
    name: 'Emerald',
    role: 'Mender',
    cut: 'wide lozenge',
    setting: 'diamond',
    file: 'assets/Gems/emerald.svg',
  },
};

export const GEM_ORDER: readonly Gem[] = ['ruby', 'sapphire', 'emerald'];

export interface ClassInfo {
  name: string;
  role: Role;
  /** The one-line reading the Bin uses for this class (PRODUCT_SPEC §2; strings from the prototype's CL). */
  palate: string;
  /** The 2×2 class board: t1 kit top, t2 kit bottom; masculine left, feminine right. */
  board: string;
}

/** The nine classes in roster order, three per role (PRODUCT_SPEC §2). */
export const CLASSES: Readonly<Record<ClassKey, ClassInfo>> = {
  provider: {
    name: 'Provider',
    role: 'Fighter',
    palate: 'generosity',
    board: 'assets/Classes/01-provider-board.png',
  },
  foodsmith: {
    name: 'Foodsmith',
    role: 'Fighter',
    palate: 'the cut',
    board: 'assets/Classes/02-foodsmith-board.png',
  },
  spark: {
    name: 'Spark',
    role: 'Mage',
    palate: 'heat and speed',
    board: 'assets/Classes/03-spark-board.png',
  },
  gastronaut: {
    name: 'Gastronaut',
    role: 'Rogue',
    palate: 'the whole shelf',
    board: 'assets/Classes/04-gastronaut-board.png',
  },
  taster: { name: 'Taster', role: 'Rogue', palate: 'balance', board: 'assets/Classes/05-taster-board.png' },
  purist: {
    name: 'Purist',
    role: 'Rogue',
    palate: 'the clean plate',
    board: 'assets/Classes/06-purist-board.png',
  },
  rebel: {
    name: 'Rebel',
    role: 'Fighter',
    palate: 'off the recipe',
    board: 'assets/Classes/07-rebel-board.png',
  },
  stirrer: {
    name: 'Stirrer',
    role: 'Mage',
    palate: 'leftovers',
    board: 'assets/Classes/08-stirrer-board.png',
  },
  host: { name: 'Host', role: 'Mage', palate: 'the shared table', board: 'assets/Classes/09-host-board.png' },
};

export const CLASS_ORDER: readonly ClassKey[] = [
  'provider',
  'foodsmith',
  'spark',
  'gastronaut',
  'taster',
  'purist',
  'rebel',
  'stirrer',
  'host',
];

/** Focal points on each figure's head, as fractions of the board, for cropping one figure to an avatar. */
export const FIGURES: Readonly<Record<Figure, { x: number; y: number }>> = {
  t1m: { x: 0.28, y: 0.09 },
  t1f: { x: 0.72, y: 0.09 },
  t2m: { x: 0.28, y: 0.585 },
  t2f: { x: 0.72, y: 0.585 },
};

/** The two taglines: always two lines, never joined, never reworded. */
export const TAGLINE: readonly [string, string] = ['THE GAME IS LIFE', 'PLAY IT TOGETHER'];

/** CSS background props that crop one figure's head and shoulders from a class board at `zoom`× (450 % by default). */
export function avatarCrop(classKey: ClassKey, figure: Figure = 't1m', zoom = 4.5): CSSProperties {
  const f = FIGURES[figure];
  const pos = (v: number): string => `${(((0.5 - v * zoom) / (1 - zoom)) * 100).toFixed(2)}%`;
  return {
    backgroundImage: `url("${asset(CLASSES[classKey].board)}")`,
    backgroundSize: `${zoom * 100}%`,
    backgroundPosition: `${pos(f.x)} ${pos(f.y)}`,
    backgroundRepeat: 'no-repeat',
  };
}
