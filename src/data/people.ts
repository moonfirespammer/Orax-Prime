import type { ClassKey, Figure, Gem } from '@/ds';

export interface Person {
  name: string;
  classKey: ClassKey;
  figure: Figure;
  gem: Gem;
}

/** The prototype's cast (PEOPLE): the party, the match, the people in the digest and on the wall. */
export const PEOPLE = {
  mei: { name: 'Mei', classKey: 'taster', figure: 't1f', gem: 'emerald' },
  dev: { name: 'Dev', classKey: 'provider', figure: 't2m', gem: 'ruby' },
  aiman: { name: 'Aiman', classKey: 'purist', figure: 't1m', gem: 'ruby' },
  priya: { name: 'Priya', classKey: 'host', figure: 't1f', gem: 'emerald' },
  nadia: { name: 'Nadia', classKey: 'rebel', figure: 't2f', gem: 'ruby' },
  scout: { name: 'A Gastronaut', classKey: 'gastronaut', figure: 't2f', gem: 'emerald' },
} as const satisfies Record<string, Person>;

export type PersonKey = keyof typeof PEOPLE;
