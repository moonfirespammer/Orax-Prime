import { beforeEach, describe, expect, it } from 'vitest';
import { createMemoryStorage } from '@/services/storage';
import { QUEST_PICKS, TODAY_KEY, freshDay, useToday } from './today';

describe('today store · one match, two quests, one city day', () => {
  beforeEach(() => {
    useToday.setState({ ...freshDay('2026-09-23'), ready: true });
  });

  it('answers the match once: connected or declined', () => {
    useToday.getState().connect();
    expect(useToday.getState().matchState).toBe('connected');
    useToday.setState({ matchState: 'new' });
    useToday.getState().decline();
    expect(useToday.getState().matchState).toBe('declined');
  });

  it('picks at most two quests and lets a pick go', () => {
    const t = useToday.getState();
    t.togglePick('q1');
    t.togglePick('q2');
    t.togglePick('q3');
    expect(useToday.getState().picked).toEqual(['q1', 'q2']);
    expect(QUEST_PICKS).toBe(2);
    useToday.getState().togglePick('q1');
    expect(useToday.getState().picked).toEqual(['q2']);
    useToday.getState().togglePick('q3');
    expect(useToday.getState().picked).toEqual(['q2', 'q3']);
  });

  it('marks a quest done by play', () => {
    useToday.getState().markDone('q4');
    expect(useToday.getState().done).toEqual({ q4: true });
  });

  it('reads today’s record back from storage, and starts fresh on a new date', async () => {
    const storage = createMemoryStorage({
      [TODAY_KEY]: { date: '2026-09-23', matchState: 'connected', picked: ['q1', 'q5'], done: { q1: true } },
    });
    useToday.setState({ ...freshDay(''), ready: false });
    await useToday.getState().hydrate('2026-09-23', storage);
    expect(useToday.getState()).toMatchObject({
      date: '2026-09-23',
      matchState: 'connected',
      picked: ['q1', 'q5'],
      done: { q1: true },
      ready: true,
    });
    useToday.setState({ ...freshDay(''), ready: false });
    await useToday.getState().hydrate('2026-09-24', storage);
    expect(useToday.getState()).toMatchObject({
      date: '2026-09-24',
      matchState: 'new',
      picked: [],
      done: {},
    });
    expect(storage.dump()[TODAY_KEY]).toEqual(freshDay('2026-09-24'));
  });

  it('every answer, pick and done flag is written to storage for the day', async () => {
    const storage = createMemoryStorage();
    useToday.setState({ ...freshDay(''), ready: false });
    await useToday.getState().hydrate('2026-09-23', storage);
    useToday.getState().connect();
    useToday.getState().togglePick('q2');
    useToday.getState().markDone('q2');
    await Promise.resolve();
    expect(storage.dump()[TODAY_KEY]).toEqual({
      date: '2026-09-23',
      matchState: 'connected',
      picked: ['q2'],
      done: { q2: true },
    });
  });

  it('at 00:00 the day starts again, but never before storage has been read', async () => {
    const storage = createMemoryStorage();
    useToday.setState({ ...freshDay(''), ready: false });
    useToday.getState().ensureDay('2026-09-23');
    expect(useToday.getState().date).toBe('');
    await useToday.getState().hydrate('2026-09-23', storage);
    useToday.getState().connect();
    useToday.getState().togglePick('q1');
    useToday.getState().ensureDay('2026-09-23');
    expect(useToday.getState()).toMatchObject({ matchState: 'connected', picked: ['q1'] });
    useToday.getState().ensureDay('2026-09-24');
    expect(useToday.getState()).toMatchObject({
      date: '2026-09-24',
      matchState: 'new',
      picked: [],
      done: {},
    });
    await Promise.resolve();
    expect(storage.dump()[TODAY_KEY]).toEqual(freshDay('2026-09-24'));
  });
});
