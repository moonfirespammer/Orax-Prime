import type { Room } from '@/app/RoomRow';
import { PEOPLE, type Person } from '@/data/people';

// Today's data of record is the prototype's renderVals (OraX-App.dc.html). Static until phase 4 and 7 wire the
// daily service and the party; copy verbatim.

/** Tonight's four rooms, each with the party state in its caption (PRODUCT_SPEC §5.2). */
export const rooms = (cityName: string): Room[] => [
  {
    key: 'bad',
    icon: 'utensils',
    title: 'Build-A-Dish',
    caption: `Five dishes · one pick · one swap · 128 cooking in ${cityName}`,
    tag: '3 min · solo',
    to: '/play/bad',
  },
  {
    key: 'hmd',
    icon: 'flame',
    title: 'HMD · the last stand',
    caption: 'Bell at 19:30 · 4 of 5 at the table · today’s Service rolled',
    tag: '5 cooks',
    to: '/play/hmd',
  },
  {
    key: 'oxp',
    icon: 'swords',
    title: 'OXP · Table Wars',
    caption: 'Mei and Dev online · Daily Gauntlet · the Blind Judge waits at round 5',
    tag: '3 seats',
    to: '/play/oxp',
  },
  {
    key: 'city',
    icon: 'map-pin',
    title: 'City · venue raid',
    caption: 'VivoCity 350 m · the Health Inspector is there until 21:00',
    tag: 'tonight',
    to: '/today/city',
  },
];

export interface Quest {
  id: string;
  title: string;
  room: string;
  reward: string;
}

/** Five a day; rewards are chips and trims, never a number in a fight. */
export const QUESTS: readonly Quest[] = [
  {
    id: 'q1',
    title: 'Plate every required ingredient',
    room: 'BaD',
    reward: 'Packed Lunch: a four-wide Special offer tonight',
  },
  { id: 'q2', title: 'Take a front slot', room: 'HMD', reward: 'Front-row regular chip' },
  { id: 'q3', title: 'Land a Trinity combo', room: 'OXP', reward: 'Trinity table chip' },
  { id: 'q4', title: 'Check in at a venue', room: 'City', reward: 'A venue patch for your kit' },
  { id: 'q5', title: 'Send a share card to your party', room: 'Party', reward: 'Same table chip' },
];

export interface Match {
  person: Person;
  dist: string;
  sharedLine: string;
  quest: string;
  /** Shared habits are filled chips, the rest subtle; never a percentage (PRODUCT_SPEC §5.2). */
  habits: readonly { label: string; shared: boolean }[];
}

/** Today's match: by shared habits and palate, never a score. */
export const MATCH: Match = {
  person: PEOPLE.nadia,
  dist: '2.1 km',
  sharedLine: '2 habits in common · your palates argue well',
  quest:
    'Cook nasi lemak at the same time tonight. Compare verdicts, then tell each other one thing the Bin got wrong.',
  habits: [
    { label: 'Doubles the chilli', shared: true },
    { label: 'Late shift', shared: true },
    { label: 'Takes the hot node', shared: false },
    { label: 'Off the recipe', shared: false },
  ],
};

export interface DigestItem {
  person: Person;
  text: string;
  meta: string;
}

/** Exactly seven: five party moments, the day's best plate and the day's Place of note (PRODUCT_SPEC §5.6). */
export const digest = (cityName: string): DigestItem[] => [
  {
    person: PEOPLE.mei,
    text: 'Mei plated Nasi lemak · 3 emeralds · “Comforting”',
    meta: '12:40 · Build-A-Dish',
  },
  { person: PEOPLE.dev, text: 'Dev set a Signature Dish: Generous Mutton Soup', meta: '13:02 · You' },
  { person: PEOPLE.aiman, text: 'Aiman took the front slot in a Maxwell cook-off', meta: '14:15 · City' },
  { person: PEOPLE.priya, text: 'Priya’s table cleared the Daily Gauntlet · 3,650 pts', meta: '15:30 · OXP' },
  {
    person: PEOPLE.dev,
    text: 'Dev: “Bell at 19:30? Aiman says he can make VivoCity.”',
    meta: '17:05 · Party thread',
  },
  {
    person: PEOPLE.scout,
    text: 'Place of note · UTown Fine Food at NUS, marked by a Gastronaut · 14 cooking there tonight',
    meta: 'City highlight · one place a day',
  },
  {
    person: PEOPLE.aiman,
    text: `Best plate in ${cityName} today: “Clean Plate of Fish and Chips” by a Purist`,
    meta: 'City highlight · one a day',
  },
];

export interface Bondmate {
  key: 'mei' | 'dev';
  person: Person;
  nick: string;
  since: string;
}

/** Mutual, named, with a since-date (PRODUCT_SPEC §2). */
export const BONDMATES: readonly Bondmate[] = [
  { key: 'mei', person: PEOPLE.mei, nick: 'Chilli', since: 'Bondmates since 12 March · 41 games together' },
  {
    key: 'dev',
    person: PEOPLE.dev,
    nick: 'Front Row',
    since: 'Bondmates since 2 June · anniversary in 3 days',
  },
];

/** Habit chips earned by play, counted (PRODUCT_SPEC §2). */
export const HABITS: readonly string[] = [
  'Doubles the chilli ×4',
  'Front-row regular ×3',
  'Trinity table ×2',
  'Late shift ×1',
];
