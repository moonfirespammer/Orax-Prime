# OraX · PWA, data and realtime

How the product in `PRODUCT_SPEC.md` runs as an installable web app. Code locations to pull from are in `MIGRATION.md`.

## 1. Platform
- Vite 7 + React 19 + TypeScript, Zustand for state, react-router 7, CSS modules on the design-system tokens, Vitest + Playwright (+ axe). All inherited from `BaD/package.json`.
- Supabase (Postgres, Auth, Realtime, Storage) — the schema in `OraX/supabase/migrations` is the starting point.
- Mobile-first at 390 px; the phone frame is the unit of design. No horizontal scroll anywhere.

## 2. Manifest
```json
{ "name": "OraX", "short_name": "OraX", "start_url": "/today", "scope": "/", "display": "standalone",
  "background_color": "#1f1f22", "theme_color": "#1f1f22", "orientation": "portrait",
  "icons": [{ "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
            { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" },
            { "src": "/icons/maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }] }
```
Icons are the lock-up on a `#1f1f22` plate (`assets/Logos/orax-logo-on-dark.png`); the logo is never recoloured. Existing rasters to regenerate from: `HMD/game_assets/icon-*.png`.

## 3. Service worker (vite-plugin-pwa, Workbox)
| Content | Strategy |
| --- | --- |
| App shell, `src/ds/fonts`, gem SVGs, class boards, monster art, unit atlases | Precache |
| `/daily` (shelf, quests, service, place of note), matches, places, venues | NetworkFirst, cache key includes the Singapore date |
| OSM tiles | StaleWhileRevalidate, 7-day expiry, 200-entry cap |
| Messages, party, raids | Network only (realtime) |

Offline: Today renders from the cached `/daily`; Build-A-Dish is fully playable offline (the pool is deterministic from the day seed — `BaD/src/game/pool.ts`, `hash.ts`); the plate is queued and submitted on reconnect. OXP and HMD need a connection (party seats); the raid lobby needs one too.

## 4. Install and permissions
- Install prompt (`beforeinstallprompt`) is captured and shown **only** on the invite screen after a valid code; never on launch, never again if dismissed that day.
- Geolocation: requested on the Venue screen when the player taps `Check in`; the 400 m rule is enforced server-side from the submitted coordinates. No background location.
- Notifications: opt-in per bell (a raid or cook-off you joined). Nothing else notifies.

## 5. Data model (additions to the OraX schema)
```
daily(day, city, shelf jsonb, quests jsonb, service jsonb, preps jsonb, place_of_note uuid, best_plate uuid)
matches(day, user_a, user_b, shared_habits text[], quest text, state_a, state_b, chat_id)
quests_picked(day, user_id, quest_id, picked_at, done_at)
places(id, name, node, kind, status, checkins int, by_user, tags text[], line, geog geography, created_at)
checkins(place_id, user_id, day, at)            -- trigger: 3 distinct users → places.status = 'open'
invites(code, issued_by, node, used_by, used_at)
messages(... , expires_at default now()+'7 days', kept_by uuid[])   -- nightly delete where expires_at < now() and kept_by = '{}'
raids(id, place_id, bell_at, special, seats jsonb)                   -- RLS: seat insert requires a checkins row today for that place
plates(day, user_id, dish_id, verdict jsonb, stones int, place_id)   -- the city wall and best_plate read from here
city_table (view): per day × node counts — plates, hordes, gauntlets, raids, places_marked. No user columns.
```
Habits are derived nightly from `plates`, `raids`, `gauntlets` and `checkins` into `profile_habits(user_id, habit, count)`.

## 6. Realtime
- `party:{id}` — thread messages, share cards, keep events.
- `chat:{id}` — 1:1 and match chats.
- `raid:{id}` — lobby seats; the fight is simulated on one authoritative client (the host) with state broadcast at 5 Hz, or on an edge function if cheating matters at launch (it doesn't).
- `oxp:{id}` — commits per seat, resolve on all-committed or the 30 s timer; the engine is deterministic so every client resolves identically from the same commits.
- `place:{id}` — check-in count, open event.

## 7. Clock
One source of truth: `BaD/src/services/clock.ts` — Singapore wall time, `resetsIn()`, `prepWindow()`, `isLeftovers()`. The server stamps `day` from the same zone. The UI never trusts the device zone.

## 8. Quality bar
`pnpm check` green (typecheck, eslint + jsx-a11y, prettier, vitest ≥ 90 % on engines and services), Playwright + axe on every screen at 390×844, a screenshot per screen diffed against `assets/shots/dark-NN.jpg` at phase close. Lighthouse PWA installable, performance ≥ 90 on a mid-range Android.
