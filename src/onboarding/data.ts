import type { ClassKey, Gem } from '@/ds';
import type { City } from '@/store/me';

// Copy of record: the prototype's INVITE and ONBOARDING sections, QUIZ and the ob render values.

export const INVITE = {
  eyebrow: 'Alpha · Singapore',
  unsorted: 'The Unsorted: a hooded figure before the identity test',
  unsortedLabel: 'The Unsorted · no class yet',
  title: 'You were invited.',
  lead: 'OraX is invite-only while Singapore fills in. Codes come from a bondmate, or from a node like NUS or SMU.',
  placeholder: 'Invite code',
  hintShort: 'Six characters. Yours is on the card, or in the message from whoever invited you.',
  hintReady: 'Looks right. Next: a five-question identity test.',
  cta: 'Continue',
} as const;

/** Six to eight characters, uppercase letters and digits (PRODUCT_SPEC §5.1). */
export const INVITE_MIN = 6;
export const INVITE_MAX = 8;
export const cleanInviteCode = (raw: string): string =>
  raw
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .slice(0, INVITE_MAX);

export interface Question {
  q: string;
  answers: readonly { text: string; cls: ClassKey }[];
}

/** Five questions, four answers each; every answer votes for a class. */
export const QUIZ: readonly Question[] = [
  {
    q: 'At a hawker centre with friends, you are the one who…',
    answers: [
      { text: 'orders for the whole table', cls: 'provider' },
      { text: 'knows the stall no one else does', cls: 'gastronaut' },
      { text: 'tastes everything first', cls: 'taster' },
      { text: 'keeps the queue moving', cls: 'host' },
    ],
  },
  {
    q: 'Your kitchen rule',
    answers: [
      { text: 'every plate should carry a signature', cls: 'foodsmith' },
      { text: 'keep the craft honest', cls: 'purist' },
      { text: 'people before rules', cls: 'rebel' },
      { text: 'waste nothing, miss nothing', cls: 'stirrer' },
    ],
  },
  {
    q: 'A friend’s plate is a mess. You…',
    answers: [
      { text: 'fix it quietly and say nothing', cls: 'provider' },
      { text: 'say so, kindly, with evidence', cls: 'taster' },
      { text: 'add chilli and call it art', cls: 'spark' },
      { text: 'eat it anyway, all of it', cls: 'stirrer' },
    ],
  },
  {
    q: 'Tonight’s plan',
    answers: [
      { text: 'start the feast, get everyone moving', cls: 'spark' },
      { text: 'seat everyone exactly right', cls: 'host' },
      { text: 'the long way round to the good stall', cls: 'gastronaut' },
      { text: 'one thing, done perfectly', cls: 'foodsmith' },
    ],
  },
  {
    q: 'Your habit',
    answers: [
      { text: 'doubles the chilli', cls: 'spark' },
      { text: 'neat plater', cls: 'purist' },
      { text: 'off the recipe, on purpose', cls: 'rebel' },
      { text: 'feeds the table', cls: 'provider' },
    ],
  },
];

/** The class with the most votes; a tie goes to the one voted for first, as in the prototype. Stirrer when nobody voted. */
export function winnerOf(votes: Partial<Record<ClassKey, number>>): ClassKey {
  const keys = Object.keys(votes) as ClassKey[];
  return keys.sort((a, b) => (votes[b] ?? 0) - (votes[a] ?? 0))[0] ?? 'stirrer';
}

export const GEM_TEXT: Readonly<Record<Gem, string>> = {
  ruby: 'The Striker. Kill things, fast. In OXP your hand is R R G and your Limit Breaker is Bloodlust ×2.',
  sapphire: 'The Warden. Get hit instead of everyone else. Hand B B R, Limit Breaker Prismatic Shift ×1.5.',
  emerald:
    'The Mender. Keep the table standing and grow as the fight goes on. Hand G G B, Limit Breaker Exploit ×1.5.',
};

export const CITIES: readonly { key: City; name: string; sub: string }[] = [
  { key: 'SG', name: 'Singapore', sub: 'UTC+8 · five dishes · five venues' },
  { key: 'KL', name: 'Kuala Lumpur', sub: 'UTC+8 · five dishes · five venues' },
];

export const ONBOARDING = {
  stepLabels: { quiz: 'Identity test', result: 'Your class', gem: 'Your gem', city: 'Your city' },
  unsortedSmall: 'The Unsorted, still hooded',
  who: (n: number) => `Who you are · ${n} of 5`,
  youAre: 'You are a',
  board: (cls: string) => `${cls} class board`,
  chooseGem: 'Choose your gem',
  retake: 'Retake the test',
  gemTitle: "Choose today's gem",
  gemLead:
    'One a day, locked at 00:00. Ruby strikes, Sapphire holds, Emerald mends. In Build-A-Dish it is only the colour of your stones.',
  pickCity: 'Pick your city',
  cityTitle: 'Where do you play?',
  cityLead: 'Your city sets the shelf, the clock and the venues. Everything resets at 00:00 city time.',
  start: 'Start playing',
  welcome: (cls: string) => `Welcome, ${cls}. Your first match arrives at 00:00; today's is waiting.`,
} as const;
