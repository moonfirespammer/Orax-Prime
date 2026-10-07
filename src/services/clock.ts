// City clock: both cities are UTC+8 (spec §3.1). Dev overrides come from the URL only (kickoff prompt, Stack):
//   ?clock=2026-09-23T21:30   city-local wall time the app should read now (keeps ticking from there)
//   ?leftovers=on|off         force the Leftovers-hour flag

export const CITY_OFFSET_MS = 8 * 36e5;
const DAY_MS = 864e5;
export const LEFTOVERS_START_HOUR = 21;

export interface CityTime {
  /** `YYYY-MM-DD` in city-local time. */
  date: string;
  /** `YYYY-MM` in city-local time. */
  month: string;
  hour: number;
  msSinceMidnight: number;
}

const pad2 = (n: number): string => String(n).padStart(2, '0');

export function cityTime(nowMs: number): CityTime {
  const shifted = new Date(nowMs + CITY_OFFSET_MS);
  const date = `${shifted.getUTCFullYear()}-${pad2(shifted.getUTCMonth() + 1)}-${pad2(shifted.getUTCDate())}`;
  const msSinceMidnight = (((nowMs + CITY_OFFSET_MS) % DAY_MS) + DAY_MS) % DAY_MS;
  return { date, month: date.slice(0, 7), hour: Math.floor(msSinceMidnight / 36e5), msSinceMidnight };
}

/** Countdown to 00:00 city time as `hh:mm:ss` (spec §3.1). */
export function resetIn(nowMs: number): string {
  // At exactly 00:00 the day has just reset: show 00:00:00, never 24:00:00.
  const left = (DAY_MS - cityTime(nowMs).msSinceMidnight) % DAY_MS;
  return `${pad2(Math.floor(left / 36e5))}:${pad2(Math.floor(left / 6e4) % 60)}:${pad2(Math.floor(left / 1e3) % 60)}`;
}

/** `Resets Nh MMm` for the daily header and the Play sheet (the prototype's clock()). At 00:00 it reads 24h 00m. */
export function resetsLabel(nowMs: number): string {
  const left = DAY_MS - cityTime(nowMs).msSinceMidnight;
  return `Resets ${Math.floor(left / 36e5)}h ${pad2(Math.floor((left % 36e5) / 6e4))}m`;
}

/** `HH:MM` in city time, 24-hour. */
export function timeLabel(nowMs: number): string {
  const t = cityTime(nowMs);
  return `${pad2(t.hour)}:${pad2(Math.floor((t.msSinceMidnight % 36e5) / 6e4))}`;
}

/** The next HMD Prep window: 06:00, 12:00, 18:00, then 00:00 (PRODUCT_SPEC §3). */
export function nextPrepLabel(nowMs: number): string {
  const next = [6, 12, 18, 24].find((x) => x > cityTime(nowMs).hour) ?? 24;
  return next === 24 ? 'Prep window 00:00' : `Prep window ${pad2(next)}:00`;
}

/** Share of the city day elapsed, to one decimal, for the 1b clock strip. */
export function dayPct(nowMs: number): number {
  return Math.round((cityTime(nowMs).msSinceMidnight / DAY_MS) * 1000) / 10;
}

/** Epoch ms of the next 00:00 city time. */
export function nextResetAt(nowMs: number): number {
  return nowMs + (DAY_MS - cityTime(nowMs).msSinceMidnight);
}

export function isLeftoversHour(nowMs: number, override: LeftoversOverride = null): boolean {
  if (override === 'on') return true;
  if (override === 'off') return false;
  return cityTime(nowMs).hour >= LEFTOVERS_START_HOUR;
}

/** `d Mon yyyy` in city time (the prototype's only date formatter). */
export function formatDate(nowMs: number): string {
  const d = new Date(nowMs + CITY_OFFSET_MS);
  const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${d.getUTCDate()} ${MON[d.getUTCMonth()] ?? ''} ${d.getUTCFullYear()}`;
}

export type LeftoversOverride = 'on' | 'off' | null;

export interface Clock {
  now(): number;
  leftoversOverride: LeftoversOverride;
  city(): CityTime;
  resetIn(): string;
  resetsLabel(): string;
  timeLabel(): string;
  nextPrepLabel(): string;
  leftovers(): boolean;
}

export interface ClockOptions {
  /** Added to the real time; derived from `?clock=` by `clockFromSearch`. */
  offsetMs?: number;
  leftoversOverride?: LeftoversOverride;
  /** Time source, defaults to Date.now. */
  source?: () => number;
}

export function createClock(opts: ClockOptions = {}): Clock {
  const source = opts.source ?? (() => Date.now());
  const offset = opts.offsetMs ?? 0;
  const override = opts.leftoversOverride ?? null;
  const now = (): number => source() + offset;
  return {
    now,
    leftoversOverride: override,
    city: () => cityTime(now()),
    resetIn: () => resetIn(now()),
    resetsLabel: () => resetsLabel(now()),
    timeLabel: () => timeLabel(now()),
    nextPrepLabel: () => nextPrepLabel(now()),
    leftovers: () => isLeftoversHour(now(), override),
  };
}

/** Parse `?clock=` (city-local wall time) and `?leftovers=` into clock options. Real time when absent. */
export function clockFromSearch(search: string, realNow: number = Date.now()): ClockOptions {
  const params = new URLSearchParams(search);
  const opts: ClockOptions = {};
  const clock = params.get('clock');
  if (clock) {
    const target = Date.parse(/[zZ]|[+-]\d\d:?\d\d$/.test(clock) ? clock : `${clock}+08:00`);
    if (!Number.isNaN(target)) opts.offsetMs = target - realNow;
  }
  const leftovers = params.get('leftovers');
  if (leftovers === 'on' || leftovers === 'off') opts.leftoversOverride = leftovers;
  return opts;
}
