import { beforeEach, describe, expect, it } from 'vitest';
import { QUEST_PICKS, useToday } from './today';

describe('today store · one match, two quests', () => {
  beforeEach(() => {
    useToday.setState({ matchState: 'new', picked: [], done: {} });
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
});
