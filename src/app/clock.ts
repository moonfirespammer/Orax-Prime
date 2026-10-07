import { useEffect, useState } from 'react';
import { clockFromSearch, createClock } from '@/services/clock';

/** One clock for the app: Singapore wall time, with `?clock=` and `?leftovers=` overrides for development and tests. */
export const clock = createClock(
  typeof window === 'undefined' ? {} : clockFromSearch(window.location.search),
);

/** Singapore only at launch; Kuala Lumpur is parked (MIGRATION §1). */
export const CITY_NAME = 'Singapore';

/** The current time from the app clock, refreshed every `intervalMs` (the prototype re-reads every 15 s). */
export function useNow(intervalMs = 15_000): number {
  const [now, setNow] = useState(() => clock.now());
  useEffect(() => {
    const t = setInterval(() => {
      setNow(clock.now());
    }, intervalMs);
    return () => {
      clearInterval(t);
    };
  }, [intervalMs]);
  return now;
}
