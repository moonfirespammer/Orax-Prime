# OraX-prime · migration document

Target: a brand-new PWA in `moonfirespammer/OraX-prime`. Nothing is moved wholesale. Each old repo and this design project is a quarry; this document says exactly which blocks to cut and where they land.

What the product *is* lives in `PRODUCT_SPEC.md`; the visual contract in `DESIGN_RULES.md`; install, data and realtime in `PWA.md`. This file is only about where code comes from and in what order it is built. `CLAUDE_CODE_PROMPT.md` is the prompt to paste into Claude Code; `SCREEN_MAP.md` lists every screen with its source lines in the prototype.

---

## 0. Sources, with exact locations

| Source | Branch | What it is | Take |
| --- | --- | --- | --- |
| **This design project** (`design_handoff_orax_prime/`) | — | The spec. A working, clickable prototype of the whole superapp plus boards and a PDF. | Everything in it is the acceptance target. The two game engines inside `OraX-App.dc.html` are ported as TypeScript. |
| **moonfirespammer/BaD** | `claude/loving-albattani-u4brof` | Build-A-Dish as a Vite + React 19 + Zustand app on the OraX tokens, with tests. | Toolchain, `src/game/*` (judge, namer, pool, sigils, station, habits), `src/services/*` (clock, storage, profile, sim), `src/store/*`, `src/styles/orax/*`. Its screens are superseded by the prototype. |
| **moonfirespammer/HMD** | `claude/zealous-johnson-1lsy0k` | Two vanilla-JS games: `oxp/` (Table Wars) and `game/` (Arena). Design docs and art pipeline. | Rules and content only: `oxp/MECHANICS.md`, `oxp/README.md`, `docs/01-game-design.md`, `docs/02-roster-45-units.md`, `docs/03-augments-and-mods.md`; the monster art under `oxp/assets/monsters/` and the atlases under `game_assets/`. Do not port `oxp/game.js` or `game/game.js` as-is (141 KB and 94 KB of DOM-bound code); re-implement from the rules, using the prototype's engine as the reference shape. |
| **moonfirespammer/OraX** | `main` | The Alpha-1 product: Supabase schema, docs, a Cloudflare worker, several abandoned sub-apps. | `supabase/migrations/*`, `lib/database.types.ts`, `lib/supabase.ts`, `docs/DATABASE_ARCHITECTURE.md`, `docs/ORAX_MASTER_DOCUMENTATION.md`, `docs/PROFILE_FEATURES.md`, `OXP_Rules.md`. Everything under `client/`, `oxp-game/`, `oxp-codex/`, `randomlycurious/` is reference only. |
| **OraX design system** (`_ds/orax-design-system-…/`, bundled here) | — | Tokens, fonts, the seven components, class boards, gem SVGs, logos. | Copy `tokens/`, `fonts/`, `assets/` verbatim into `src/ds/`. Re-implement the seven components as React from `components/*/*.jsx` + `.d.ts` (they are already React; drop the `component-from-global-scope` wrapper). |

---

## 1. What the new app is (one paragraph)

Today · Play · You. One daily match by shared habits and palate, never a score. A card of five quests, pick two, the rest expire at 00:00 Singapore time. A wardrobe of class kits with the daily gem as trim. Three rooms — OXP Table Wars (3 seats, 27 combos, 10 monsters), HMD the last stand (5 cooks vs 999 in four courses), Build-A-Dish (one daily plate, judged by the Bin) — all matched by who you are. A real map of Singapore where NUS and SMU are nodes inside the city: malls hold raids, canteens and hawker centres hold cook-offs, students mark places that open after three check-ins. Social is a party thread and bondmate chats that fade in seven days, a seven-item digest, and a city wall wiped at midnight. Invite-only.

Decisions already made (do not re-open):
- Nodes are places, not walls. Anyone in Singapore can plan with anyone; only sitting at a venue table needs an in-person check-in.
- One Build-A-Dish shelf for all of Singapore. City Table counters: Singapore · NUS · SMU, counts never names.
- Invite code screen comes before the identity test. Marking a place is nodes-only; a pin opens at three check-ins.
- Home layout is direction **1a** (match first). 1b and 1c stay behind a dev flag.
- Dark theme first, light is a full peer. Singapore only at launch; the KL city is parked.

---

## 2. Repo layout for OraX-prime

```
orax-prime/
  package.json                 ← from BaD/package.json (pnpm, Vite 7, React 19, Zustand, react-router 7, Vitest, Playwright)
  vite.config.ts               ← from BaD/vite.config.ts + vite-plugin-pwa
  public/
    manifest.webmanifest       ← new (see §6)
    icons/                     ← from HMD/game_assets/icon-192.png, icon-512.png, apple-touch-icon.png (regenerate from the logo for maskable)
  src/
    ds/                        ← OraX design system
      tokens/  fonts/  assets/ ← copied verbatim from _ds/orax-design-system-…/
      components/              ← Button, Chip, Logo, Tagline, Cover, GemSocket, ClassCard, Icon — React ports of _ds components/*/*.jsx
    app/                       ← shell
      App.tsx  TabBar.tsx  PlaySheet.tsx  Header.tsx  Toast.tsx  routes.tsx
    today/                     ← Today, Match, Quests, Digest, Clock
    you/                       ← You, Wardrobe, Classes, Bondmates
    party/                     ← Party thread, Chat, ShareCard
    city/                      ← City, Venue, RaidLobby, MarkPlace sheet, map/ (Leaflet)
    games/
      oxp/engine/  oxp/screens/
      hmd/engine/  hmd/screens/
      bad/engine/  bad/screens/   ← bad/engine is BaD/src/game/* almost verbatim
    onboarding/                ← Invite, IdentityTest, GemPick, CityPick
    services/                  ← clock, storage, profile, places, matches, invites, realtime
    store/                     ← zustand slices: shell, me, party, city, oxp, hmd, bad
  supabase/
    migrations/                ← start from OraX/supabase/migrations/*, then add §5
```

---

## 3. Pull list, by destination

### 3.1 `src/ds/` — design system
- Copy: `_ds/orax-design-system-…/tokens/*.css`, `tokens/tokens.json`, `fonts/*.woff2`, `assets/Classes/*.png`, `assets/Gems/*.svg`, `assets/Logos/*.png`, `styles.css`.
- Port to React/TSX: `components/actions/Button.jsx`, `Chip.jsx`; `components/brand/Logo.jsx`, `Tagline.jsx`, `Cover.jsx`; `components/game/GemSocket.jsx`, `ClassCard.jsx`; `components/icons/Icon.jsx`; `components/shared/orax-shared.js` (`avatarCrop`, `CLASSES`, `GEMS`, `FIGURES`). Types are in the matching `.d.ts`.
- BaD already has React versions of most of these at `BaD/src/components/{Button,Chip,Logo,Tagline,GemSocket,ClassCard,Icon,Avatar}.tsx` with CSS modules on the same tokens — prefer those where they exist, diff against the DS `.d.ts` for props.
- Rules that must survive the port: Space Grotesk for everything read, Silkscreen only for taglines and pixel-labels; one purple; the only glow is a gem's; cards are border-separated, never shadowed; 44 px touch targets; sentence case; no emoji.

### 3.2 `src/app/` — shell
Spec: `OraX-App.dc.html` template, sections `TODAY`, `YOU`, `PLAY SHEET`, `TAB BAR`, `TOAST`, `generic sub-screen header`.
- Three tabs, centre Play button (60 px, `--brand`, 6 px `--surface-raised` ring, sits 14 px above the bar).
- Play sheet: four rows (Build-A-Dish, HMD, OXP, City) each with tonight's party state; closes on scrim tap.
- Header for sub-screens: 44 px back target, `heading-sm` title, optional `caption` subtitle, right-side `pixel-label` (the reset countdown on BaD and quest screens).
- Navigation is a stack over a tab (`screen() = stack.at(-1) ?? tab`); replicate with react-router nested routes, keep the stack semantics for Back.
- Starting point in code: `BaD/src/App.tsx`, `BaD/src/components/TabBar.tsx`, `BaD/src/store/shell.ts`, `BaD/src/store/toast.ts`, `BaD/src/components/Toast.tsx`.

### 3.3 `src/today/`
Spec: `OraX-App.dc.html` → `renderVals()` (`rooms`, `questsData`, `match`, `digest`, `ord`) and the `TODAY`, `MATCH`, `QUESTS`, `DIGEST` template sections.
- Clock: `clock()` in the prototype — Singapore wall time via `Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Singapore'})`, reset label `Resets Nh MMm`, leftovers from 21:00, Prep windows at 00/06/12/18. BaD has the production version: `BaD/src/services/clock.ts` (+ tests).
- Match: one per day, fields `name, classKey, gem, dist, habits[{label, shared}], quest, state: new|connected|declined`. Compatibility is shown as **filled chips for shared habits** plus a palate line from `CL[classKey].palate`. No percentage anywhere.
- Quests: five per day, max two picked, `done` flags set by play events (`q1` BaD full plate, `q2` HMD front slot, `q3` OXP Trinity, `q4` venue check-in, `q5` share card sent). Rewards are chips and trims only.
- Digest: exactly seven items — five party moments, the day's best plate, the day's Place of note. Ends with "That's all for today".

### 3.4 `src/you/`
Spec: `YOU`, `WARDROBE`, `CLASSES` template sections; `kits`, `bag`, `classTiles`, `habits` in `subVals()`.
- Profile card: 96 px avatar via `avatarCrop`, class name in `--class-*`, role eyebrow, gem Chip, city Chip, habit chips; "gem locks at 00:00".
- Wardrobe: four kits per class (t1/t2 × masc/fem) are the four quadrants of the class board (`background-size:200%`, positions `0% 0% | 100% 0% | 0% 100% | 100% 100%`); the daily gem is the trim; a 30-slot bag of patches and chips, nothing bought.
- Class change takes effect at the next reset. Nine classes, three roles.
- Habits data model and copy: `BaD/src/game/habits.ts`; profile persistence: `BaD/src/services/profile.ts`, `storage.ts` (idb-keyval).

### 3.5 `src/party/`
Spec: `PARTY + THREAD`, `1:1 CHAT`, `SHARE CARD` sections; `msg()`, `send()`, `thread`, `chats` in the prototype.
- Thread + bondmate chats are ephemeral: `expires_at = created_at + 7 days`; `Keep` within 24 h pins a message. The daily match's chat closes at 00:00 unless both keep it.
- Share card: the BaD one is built — `BaD/src/screens/Share.tsx` + `services/shareImage.ts` (html-to-image). Generalise to OXP/HMD results with the `share` shape in `oxpFinish()` / `hmdFinish()`.
- DB spec for bondmates, nicknames, anniversaries, 30-slot inventory, 18 equipment slots: `OraX/docs/ORAX_MASTER_DOCUMENTATION.md` §4, `OraX/docs/PROFILE_FEATURES.md`, `OraX/docs/DATABASE_ARCHITECTURE.md`.

### 3.6 `src/city/`
Spec: `CITY`, `VENUE`, `RAID LOBBY`, `MARK THIS PLACE` sections; `VENUES`, `seedPlaces()`, `allPlaces()`, `syncMap()`, `LOC`, `venue()` in the prototype; `city-map.html` for the Leaflet layer.
- Map: Leaflet 1.9.4 + OpenStreetMap tiles, dark via a CSS filter on the tile pane. Pin grammar: round = raid, rounded-square = cook-off, diamond = place of note, hollow dashed = proposed, ruby glow = rare Champion. Tooltips permanent only inside a node.
- Nodes: `SG | NUS | SMU` chips filter map and list. Seed venues with coordinates are in `VENUES` (coordinates are approximate — verify on the ground). Student-marked places: `{id, name, node, kind, status: proposed|open, checkins, by, tags[], line, ll}`; open at 3 check-ins; marking allowed only when a node is selected.
- Venue rule: check-in needs ≤ 400 m (`inRange`), the prototype lets you through and says so; production enforces it. Everyone in Singapore can plan a venue event; only checked-in players sit at the table.
- Raid lobby: five seats, front three / back two, seated by class; venue raids run the HMD engine with the venue's Champion at 900.

### 3.7 `src/games/oxp/`
Rules of record: `HMD/oxp/MECHANICS.md`, `HMD/oxp/README.md`, `OraX/OXP_Rules.md`. Reference engine (already a pure state machine, ~120 lines): `OraX-App.dc.html` → `COMBOS`, `MONSTERS`, `RELICS`, `oxpMonster()`, `oxpInit()`, `handOf()`, `oxpCommit()`, `oxpAI()`, `oxpClockTick()`, `oxpLimit()`, `oxpReady()`, `oxpPickRelic()`, `oxpFinish()`.
- Port as `engine/{combos.ts, monsters.ts, relics.ts, reducer.ts}` with the same names; `oxpReady` becomes `resolveTurn(state): state`. Keep the maths: comp ×1.08 mono / ×1.04 trinity, weakness ×1.25 (×1.35 with Spice Rack), resist ×0.75, Shell halves single-target, Counter drains 3×(counter−CastIron) Nerve unless stunned or Trinity, gauge +60/35/10 by turn, tokens cap 2 (3 with Loaded Dice), 30 s turn timer auto-commits.
- Screen spec: `OXP LOBBY`, `OXP FIGHT`, `RESULTS` sections. Monster art: `HMD/oxp/assets/monsters/*.webp` (5 of 10 drawn; the atlas is 4×5 frames, show frame 0).

### 3.8 `src/games/hmd/`
Rules of record: `HMD/docs/01-game-design.md`, `02-roster-45-units.md`, `03-augments-and-mods.md`, `HMD/game/README.md`. Reference sim: prototype `SPECIALS`, `CHAMPIONS`, `hmdInit()`, `hmdTick()` (200 ms tick, four courses at 200/450/750 kills, Champions every 100, Service conditions at 200/500/800, Heat to 100 fires a Signature), `hmdSignature()`, `hmdSpecialFire()`, `hmdFinish()`.
- Prep windows: four permanent picks a day at 00/06/12/18. Special: one per fight, a fourth option unlocks with a full BaD plate ("Packed Lunch").
- Screen spec: `HMD LOBBY`, `HMD FIGHT`, `RESULTS` sections. Unit atlases: `HMD/game_assets/{provider,purist,spark,cake}-atlas.{png,json}`.

### 3.9 `src/games/bad/`
This is the one near-verbatim port. Engine: `BaD/src/game/{judge,namer,pool,sigils,station,habits,hash,types}.ts` with their tests; services `BaD/src/services/{MockPoolService,PoolService,sim,clock}.ts`; store `BaD/src/store/game.ts`. Content: `BaD/src/game/content/*` (copy, dishes, identity).
- The prototype's `badPlate()` is a simplified judge; BaD's `judge.ts` + `namer.ts` are the real ones. Keep BaD's. The prototype adds a **palate line per class** (`palLines` in `badPlate()`) — add that to the verdict.
- Screens: use the prototype's `BaD BOARD`, `BaD STATION`, `BaD VERDICT` sections (they are the BaD screens restyled into the new shell); the sigil pad gesture recogniser is `BaD/src/components/SigilPad.tsx` + `game/sigils.ts` (tested) — the prototype's `padUp()` is a sketch of the same.

### 3.10 `src/onboarding/`
Spec: `INVITE`, `ONBOARDING` sections; `QUIZ`, `ob()` in the prototype. Invite code (6–8 chars) → five-question identity test (each answer votes for a class) → class reveal with the full board → gem pick (Ruby Striker / Sapphire Warden / Emerald Mender) → city. Install prompt (`beforeinstallprompt`) is shown on the invite screen after the code is accepted.

---

## 4. Data model (Supabase)

Start from `OraX/supabase/migrations/*` and `OraX/lib/database.types.ts` (users, profiles, bondmates, chat, inventory already exist). Add:

- `places` (id, name, node, kind, status, checkins, by_user, tags[], line, geog, created_at) and `checkins` (place_id, user_id, day) — a trigger flips `status` to `open` at 3 distinct users.
- `invites` (code, issued_by, node, used_by, used_at).
- `daily` (day, city): shelf (5 dish ids), quests (5), service conditions, prep options, place_of_note, best_plate.
- `matches` (day, a, b, shared_habits[], quest, state).
- `quests_picked` (day, user, quest_id, done_at).
- `messages`: add `expires_at` default now()+7d and `kept_by[]`; a nightly job deletes expired, unkept rows.
- `parties`, `raids` (venue_id, bell_at, seats[5]) with RLS: insert into `raid_seats` only if a `checkins` row exists for that user and place today.
- `city_table` is a view: counts per node per day, no user columns.

Realtime channels: `party:{id}` (thread), `chat:{id}`, `raid:{id}` (lobby + fight ticks from one authoritative client or an edge function), `place:{id}` (check-in count).

---

## 5. PWA specifics

- `manifest.webmanifest`: `name: "OraX"`, `short_name: "OraX"`, `display: standalone`, `background_color: "#1f1f22"`, `theme_color: "#1f1f22"`, `start_url: "/today"`, maskable icons from `assets/Logos/orax-logo-on-dark.png` on a `#1f1f22` plate.
- Service worker (vite-plugin-pwa, Workbox): precache the shell, `src/ds/fonts`, class boards, gem SVGs, monster art; `NetworkFirst` for `/daily`, matches, places; `StaleWhileRevalidate` for OSM tiles with a 7-day cap. Cache keys include the Singapore date so 00:00 invalidates.
- Reference workers: `HMD/game/sw.js`, `HMD/oxp/sw.js` (simple precache lists — superseded by Workbox but show what was cached).
- Geolocation only on the Venue screen, on tap. No background location.
- Install prompt on the invite screen; never on launch.

---

## 6. Order of work

1. Repo + toolchain from BaD, `src/ds` copied, seven components ported, light/dark switch. **Gate: the Baseline Play screen renders pixel-identical to `OraX-Baseline.dc.html`.**
2. Shell: tabs, Play sheet, header, toast, routes; invite + onboarding. **Gate: boards pages 02, 05 (invite), 10.**
3. Build-A-Dish: port BaD engine + screens into the shell. **Gate: pages 08–09, verdict with palate line.**
4. Today: clock, match, quests, digest; You: wardrobe, classes, bondmates. **Gate: pages 02–04.**
5. City: map, nodes, venues, scouting, check-in rule. **Gate: pages 06–07.**
6. OXP engine + screens; HMD engine + screens; raid lobby wiring. **Gate: pages 07–08, results and share.**
7. Party thread, chats, keep/fade, realtime; City wall; invites issued by bondmates.
8. PWA polish: manifest, SW, install prompt, offline shell; Playwright + axe on every screen (BaD has the harness: `BaD/playwright.config.ts`, `@axe-core/playwright`).

Page numbers refer to `OraX-App-print.dc.html` (24 pages: cover, 9 dark boards, 9 light boards, 5 baseline pages).

---

## 7. What not to carry over

- Anything TFT-styled from `OraX/design-mockup-*.html` (gold/fuchsia, inner borders, LVL 50, win rates). It contradicts principle 5 of the design system.
- `OraX/client/`, `oxp-game/`, `oxp-codex/`, `randomlycurious/`: four partial apps on different stacks. Read for intent only.
- `HMD/oxp/game.js` and `HMD/game/game.js` as code. Re-implement from the rules; the prototype engines are the bridge.
- Emoji glyphs used as icons in the old HUDs (🔊, ⋮). Use the DS `Icon`.
- Percent compatibility, follower counts, streaks, leaderboards of people. None exist in the spec; do not add them.
