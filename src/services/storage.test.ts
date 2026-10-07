import { afterEach, describe, expect, it, vi } from 'vitest';
import { createMemoryStorage, createStorage } from './storage';

describe('storage', () => {
  it('falls back to localStorage when IndexedDB is unavailable (jsdom)', async () => {
    const s = createStorage();
    await s.set('k', { a: 1 });
    expect(await s.get<{ a: number }>('k')).toEqual({ a: 1 });
    expect(localStorage.getItem('k')).toBe('{"a":1}');
    await s.del('k');
    expect(await s.get('k')).toBeUndefined();
    localStorage.setItem('bad-json', '{');
    expect(await s.get('bad-json')).toBeUndefined();
  });
  it('memory storage clones values', async () => {
    const s = createMemoryStorage();
    const v = { n: 1 };
    await s.set('x', v);
    v.n = 2;
    expect(await s.get<{ n: number }>('x')).toEqual({ n: 1 });
    await s.del('x');
    expect(s.dump()).toEqual({});
  });
});

describe('storage · the IndexedDB path', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.doUnmock('idb-keyval');
    vi.resetModules();
    localStorage.clear();
  });

  it('writes through idb-keyval when IndexedDB exists, and falls back to localStorage when it throws', async () => {
    const mem = new Map<string, unknown>();
    let broken = false;
    const guard = (): void => {
      if (broken) throw new Error('IndexedDB refused');
    };
    vi.doMock('idb-keyval', () => ({
      get: (k: string) => {
        guard();
        return Promise.resolve(mem.get(k));
      },
      set: (k: string, v: unknown) => {
        guard();
        mem.set(k, v);
        return Promise.resolve();
      },
      del: (k: string) => {
        guard();
        mem.delete(k);
        return Promise.resolve();
      },
    }));
    vi.stubGlobal('indexedDB', {});
    vi.resetModules();
    const { createStorage: create } = await import('./storage');
    const s = create();
    await s.set('k', { a: 1 });
    expect(mem.get('k')).toEqual({ a: 1 });
    expect(await s.get<{ a: number }>('k')).toEqual({ a: 1 });
    expect(localStorage.getItem('k')).toBeNull();
    await s.del('k');
    expect(mem.has('k')).toBe(false);

    broken = true;
    await s.set('f', 2);
    expect(localStorage.getItem('f')).toBe('2');
    expect(await s.get<number>('f')).toBe(2);
    await s.del('f');
    expect(localStorage.getItem('f')).toBeNull();
  });
});
