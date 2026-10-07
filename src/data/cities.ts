/** The two cities the games know (MIGRATION §1): Singapore live, Kuala Lumpur parked (owner's decision, 7 October 2026). */
export type City = 'SG' | 'KL';

export const CITY_NAME: Readonly<Record<City, string>> = { SG: 'Singapore', KL: 'Kuala Lumpur' };
export const CITY_TZ: Readonly<Record<City, string>> = { SG: 'Asia/Singapore', KL: 'Asia/Kuala_Lumpur' };
