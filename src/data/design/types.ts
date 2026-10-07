// The Table Wars v2 design data (docs/design/README.md): six JSON files that are the source of truth for every
// number and every card. These types describe them as shipped; the design test checks keys and counts.
import type { ClassKey, Gem } from '@/ds';

export type GemRole = 'Striker' | 'Warden' | 'Mender';
export type Weight = 'Damage' | 'Balanced' | 'Support' | 'Scaler';
export type Tier = 'Common' | 'Rare' | 'Epic';

/** A card with a name, its text and keyword tags. Tiered values read `Common / Rare / Epic` inside the text. */
export interface Card {
  n: string;
  t: string;
  tags?: string;
}
export interface Named {
  n: string;
  t: string;
}
/** A combo: two halves by card name in `needs`, the combo's name and what switches on. */
export interface Combo {
  needs: string;
  n: string;
  t: string;
}
export interface GemCombo extends Combo {
  gem: Gem | 'any';
}
export interface Menu extends Combo {
  breaks: string;
}

export interface SharedFile {
  version: string;
  clock: { reset: string; prepWindows: string[]; leftoversHour: string; day: { time: string; t: string }[] };
  leftovers: { game: string; t: string }[];
  habits: { g: string; n: string; t: string }[];
  cityTable: { counters: string[]; perks: { n: string; t: string; mark: string }[] };
  gifts: { dir: string; n: string; t: string; why: string }[];
  bin: { register: string; rules: string[]; where: string[]; lines: { m: string; l: string }[] };
  shareCard: string;
  dataFiles: { f: string; t: string }[];
}

export interface GemDesign {
  key: Gem;
  name: string;
  role: GemRole;
  keyword: string;
  job: string;
  keywordDef: string;
  lean: string;
  heat: string;
  oxp: { hand: string; limitName: string; limit: string; passiveName: string; passive: string };
}
export interface KitPart {
  k: 'Basic' | 'Passive' | 'Signature';
  n: string;
  t: string;
}
export interface Cut {
  gem: Gem;
  role: GemRole;
  name: string;
  basic: string;
  passive: string;
  signature: string;
}
export interface ClassDesign {
  key: ClassKey;
  num: string;
  name: string;
  /** The class archetype (Guardian, Finisher, …); the app's role eyebrow is PRODUCT_SPEC's Fighter / Rogue / Mage. */
  role: string;
  station: string;
  range: string;
  weight: Weight;
  hp: number;
  atk: number;
  spd: number;
  targets: number;
  /** The stated crowd DPS; the Stirrer's grows over a fight and is written `31 → 41`. */
  crowdDps: number | string;
  arm: string;
  board: string;
  motto: string;
  mirror: string;
  weaponM: string;
  weaponF: string;
  cue: string;
  desc: string;
  kit: KitPart[];
  cuts: Cut[];
}
export interface ClassesFile {
  version: string;
  budget: {
    rule: string;
    weights: Record<Weight, number | string>;
    hp: Record<string, number | string>;
    gemMods: Record<Gem, Record<string, string>>;
    heatBase: { perHitLanded: number; perHitTaken: number; perSecond: number; signatureAt: number };
  };
  gems: GemDesign[];
  classes: ClassDesign[];
}

export interface AugmentsFile {
  version: string;
  ruling: string;
  philosophy: Named[];
  keywords: { k: string; pushes: string; consumes: string }[];
  comboTypes: { n: string; how: string; power: string; shown: string }[];
  budget: { tier: string; power: string; note: string }[];
  offerRules: Named[];
  borrow: { src: string; idea: string; lands: string }[];
  hmd: {
    houseCombos: { key: ClassKey; cls: string; n: string; needs: string; t: string }[];
    pantry: Card[];
    clicks: Combo[];
    facets: { gem: Gem; label: string; rows: Card[] }[];
    facetClicks: GemCombo[];
    signatures: { key: ClassKey; cls: string; rows: Card[] }[];
    specials: Named[];
    tableCombos: Combo[];
    recipes: Combo[];
    menus: Menu[];
  };
  oxp: {
    combos: { c: string; base: number; mode: string; ai: string; buff: string; note: string }[];
    general: Card[];
    gem: { gem: Gem; label: string; rows: Card[] }[];
    clicks: GemCombo[];
    tableCombos: Combo[];
    relics: { label: string; rows: Card[] }[];
    blessings: Named[];
    leftovers: Named[];
    recipes: Combo[];
    menus: Menu[];
  };
  builds: { game: string; n: string; take: string; why: string; breaks: string }[];
  tuning: Named[];
}

export interface HmdUnit {
  n: string;
  hp: number;
  atk: number;
  share: string;
  speed: string;
  range: string;
  note: string;
}
export interface HmdFile {
  version: string;
  fight: {
    timerSeconds: number;
    horde: number;
    fieldCap: number;
    arena: string;
    formation: { front: number; back: number; frontBonus: string; backRule: string; adjacency: string };
    orders: { options: string[]; changeable: boolean; cooldownSeconds: number; lockedBy: string };
    heat: {
      perHitLanded: number;
      perHitTaken: number;
      perSecond: number;
      signatureAt: number;
      cadenceTarget: string;
    };
    threat: { sapphire: number; emeraldHealing: number; default: number };
    surroundCap: { meleePerCook: number; ranged: string };
    enemyRates: {
      meleeAttacksPerSecond: number;
      rangedAttacksPerSecond: number;
      speedTilesPerSecond: { swarm: number; standard: number; slow: number };
    };
    damage: { formula: string; armour: string; crit: string };
    falls: string;
    end: string;
    rise: string;
    scoring: { score: string; championValue: number; cleanPlate: string; boards: string[] };
    simulation: string;
  };
  courses: {
    id: string;
    name: string;
    kills: string;
    pourPerSecond: number;
    avgHp: number;
    avgAtk: number;
    units: HmdUnit[];
  }[];
  hordeBudget: {
    totalHp: number;
    byCourse: number[];
    pourTimeSeconds: number;
    clearNeeds: string;
    compendiumV2: string;
  };
  champions: {
    rule: string;
    hpBySlot: number[];
    scoreValue: number;
    ingredients: number;
    roster: { n: string; arm: string; trick: string; fixedSlot?: number }[];
  };
  conditions: {
    rule: string;
    triggers: Record<'I' | 'II' | 'III', string>;
    exclusions: string[][];
    list: { tier: 'I' | 'II' | 'III'; n: string; t: string }[];
  };
  augments: {
    prepWindows: string[];
    offer: string;
    special: string;
    pools: Record<string, number>;
    catalogue: string;
    compendiumEdits: string[];
  };
  tuning: { metric: string; target: string; band: string }[];
}

export interface OxpMonster {
  n: string;
  tag: string;
  hp: number;
  def: string;
  ab: string;
  timer: number;
  pts: number;
  wr: string;
  ttk: number;
}
export interface OxpFile {
  version: string;
  engine: string;
  seat: {
    rule: string;
    composition: { mono: string; trinity: string };
    duplicateGems: string;
    lives: number;
  };
  map: {
    rows: number;
    nodesPerRow: string;
    bosses: Record<string, string>;
    secretRow: string;
    vote: string;
    generation: string[];
    rewardTier: string;
    afterEveryFight: string;
  };
  augmentLayers: { n: string; when: string; t: string; ref: string }[];
  ttk: { rule: string; byRow: Record<string, number> };
  monsters: { label: string; rows: OxpMonster[] }[];
  abilities: Named[];
  modifiers: { n: string; w: number; t: string }[];
  relics: { note: string; groups: { label: string; rows: Named[] }[] };
  scoring: { node: string; turnBonus: string; livesLeft: number; boards: string[] };
  critic: string;
  tuning: { metric: string; target: string; band: string }[];
}

export interface Palate {
  key: ClassKey;
  cls: string;
  watch: string;
  when: string;
  line: string;
  chip: string;
}
export interface BadFile {
  version: string;
  status: string;
  asBuilt: Named[];
  judge: { stones: string; cursed: string; terms: Named[] };
  ruling: { class: string; gem: string; fireRate: string };
  palates: Palate[];
}

export interface Design {
  shared: SharedFile;
  classes: ClassesFile;
  augments: AugmentsFile;
  hmd: HmdFile;
  oxp: OxpFile;
  bad: BadFile;
}
