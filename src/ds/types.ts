// The identity vocabulary the design system is built on (readme: Gems, Class accents, Imagery).

export type Gem = 'ruby' | 'sapphire' | 'emerald';

export type ClassKey =
  'provider' | 'foodsmith' | 'spark' | 'gastronaut' | 'taster' | 'purist' | 'rebel' | 'stirrer' | 'host';

/** Role eyebrows are uppercase in `overline`; in running copy they are Fighter, Rogue, Mage (PRODUCT_SPEC §2). */
export type Role = 'Fighter' | 'Rogue' | 'Mage';

/** The four quadrants of a class board: t1 kit top, t2 kit bottom; masculine left, feminine right. */
export type Figure = 't1m' | 't1f' | 't2m' | 't2f';
