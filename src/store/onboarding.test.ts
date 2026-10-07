import { beforeEach, describe, expect, it } from 'vitest';
import { classDesign } from '@/data/design';
import { CLASS_ORDER } from '@/ds';
import { CITIES, QUIZ, cleanInviteCode, winnerOf } from '@/onboarding/data';
import { useOnboarding } from './onboarding';

describe('onboarding · the identity test', () => {
  beforeEach(() => {
    useOnboarding.getState().reset();
  });

  it('cleans an invite code to six to eight uppercase letters and digits', () => {
    expect(cleanInviteCode('nus7q2')).toBe('NUS7Q2');
    expect(cleanInviteCode(' nus-7q2 ')).toBe('NUS7Q2');
    expect(cleanInviteCode('abcdefghijk')).toBe('ABCDEFGH');
  });

  it('asks five questions of four answers, every answer a vote for one of the nine classes', () => {
    expect(QUIZ).toHaveLength(5);
    for (const q of QUIZ) {
      expect(q.answers).toHaveLength(4);
      for (const a of q.answers) expect(CLASS_ORDER).toContain(a.cls);
    }
  });

  it('counts votes, reveals the winner, and breaks a tie by the first class voted for', () => {
    const t = useOnboarding.getState();
    t.answer('provider');
    t.answer('stirrer');
    t.answer('stirrer');
    t.answer('host');
    t.answer('purist');
    expect(useOnboarding.getState().step).toBe(5);
    expect(useOnboarding.getState().winner()).toBe('stirrer');
    expect(winnerOf({ spark: 2, stirrer: 2 })).toBe('spark');
    expect(winnerOf({ stirrer: 2, spark: 2 })).toBe('stirrer');
    expect(winnerOf({})).toBe('stirrer');
  });

  it('offers Singapore alone on the city screen', () => {
    expect(CITIES.map((c) => c.key)).toEqual(['SG']);
  });

  it('moves on to the gem and the city, keeps both across a retake', () => {
    const t = useOnboarding.getState();
    for (let i = 0; i < 5; i++) t.answer('rebel');
    t.pickGem('emerald');
    t.next();
    expect(useOnboarding.getState().step).toBe(6);
    t.next();
    t.pickCity('SG');
    expect(useOnboarding.getState()).toMatchObject({ step: 7, gem: 'emerald', city: 'SG' });
    t.retake();
    expect(useOnboarding.getState()).toMatchObject({ step: 0, votes: {}, gem: 'emerald', city: 'SG' });
  });

  it('reveals the class with the motto the design data carries, the prototype’s own', () => {
    const mottos: Record<string, string> = {
      provider: 'Everyone eats. Everyone helps.',
      foodsmith: 'Every plate should carry a signature.',
      spark: 'Start the feast.',
      gastronaut: 'Look where no one else is looking.',
      taster: 'I test first, so others do not have to.',
      purist: 'Keep the craft honest.',
      rebel: 'People before rules.',
      stirrer: 'Waste nothing. Miss nothing.',
      host: 'The right seat can change a life.',
    };
    for (const k of CLASS_ORDER) expect(classDesign(k).motto).toBe(mottos[k]);
  });
});
