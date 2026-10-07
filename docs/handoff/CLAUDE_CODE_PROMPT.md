# Claude Code prompt · OraX-prime

Paste everything below the line into Claude Code, run from an empty clone of `moonfirespammer/OraX-prime`. Keep `design_handoff_orax_prime/` checked into the repo under `docs/handoff/` so later sessions can read it.

---

You are building **OraX-prime**, a brand-new installable web app (PWA) in this empty repository. You are not migrating an old app; you are assembling a new one from four quarries. Read, in this order, before writing any code:

1. `docs/handoff/PRODUCT_SPEC.md` — what the product is: principles, identity model, the daily clock, every screen and game rule, tone. This is the document of record for intent.
2. `docs/handoff/DESIGN_RULES.md` — the visual contract, one page. Binding.
3. `docs/handoff/PWA.md` — install, offline, data model additions, realtime, quality bar.
4. `docs/handoff/MIGRATION.md` — the pull list from the old repos with destinations, and the order of work with gates. Follow it; do not re-open its decisions.
5. `docs/handoff/SCREEN_MAP.md` — every screen with its source section in the prototype and its target file.
6. `docs/handoff/OraX-App.dc.html` — the clickable prototype. Open it in a browser (it needs the `_ds/`, `assets/`, `support.js`, `android-frame.jsx`, `city-map.html` siblings in the same folder). The template between `<x-dc>` and `</x-dc>` is the layout spec; the `class Component` script below it holds the state machines and all copy. Treat its inline styles as the measured spec (padding, radii, type tokens) and its `renderVals()` / `subVals()` / `gameVals()` as the data contracts.
7. `docs/handoff/OraX-Baseline.dc.html` — what exists today in the old repos, recreated. Use it to confirm you have matched the old BaD shell before you go further.
8. `docs/handoff/OraX-App-print.dc.html` — the 24 board pages; every build gate in MIGRATION §6 points at a page number.
9. `docs/handoff/_ds/orax-design-system-*/readme.md` — the full design system guide behind DESIGN_RULES.md.

When PRODUCT_SPEC.md and the prototype disagree: the spec wins on intent and rules, the prototype wins on measurements and copy.

Old repositories to pull from (clone them read-only next to this repo, into `../BaD`, `../HMD`, `../OraX`):
- `moonfirespammer/BaD` branch `claude/loving-albattani-u4brof` — the toolchain and the Build-A-Dish engine. Pull list in MIGRATION §3.9 and §3.1–3.5.
- `moonfirespammer/HMD` branch `claude/zealous-johnson-1lsy0k` — OXP and HMD rules docs and art. Pull list in §3.7–3.8. Do not port its `game.js` files.
- `moonfirespammer/OraX` branch `main` — Supabase schema, docs. Pull list in §4.

## How to work

- Work in the order of MIGRATION §6. Stop at each gate, run the app, and compare against the named board page and the prototype screen (`?screen=` is not available in the prototype; use its Tweaks panel or open the `.dc.html` and set the `screen` prop default). Do not start the next phase until the gate screen matches.
- Reuse before writing: for every component or module, first check `../BaD/src` for an existing React implementation with tests. The prototype's JavaScript is the reference for shape and copy; BaD's TypeScript is the reference for correctness where both exist (judge, namer, sigils, clock, storage).
- The two new engines (OXP, HMD) are ports of the prototype's `oxp*` and `hmd*` methods into pure TypeScript reducers under `src/games/*/engine/`, with Vitest tests that reproduce the numbers in `HMD/oxp/MECHANICS.md`. No DOM in engines.
- All copy comes from the prototype verbatim (it was written to the design system's voice). Where a string must change, keep sentence case, no exclamation marks, real `×` and `·`.
- Styling: CSS modules on the `src/ds/tokens` variables, as BaD does. No Tailwind, no new colours, no shadows on cards, no gradients.
- State: Zustand slices mirroring the prototype's state (`me`, `stack/tab/sheet`, `node/places/checkedIn`, `picked/done`, `thread/chats`, `oxp`, `hmd`, `bad`, `ob`, `invite`). Persist `me`, picks, places and messages with idb-keyval (see `../BaD/src/services/storage.ts`) until Supabase is wired in phase 7.
- Clock: everything daily keys off Singapore wall time (`Asia/Singapore`), resets at 00:00. Use `../BaD/src/services/clock.ts`.
- Accessibility and tests: keep BaD's `pnpm check` green (typecheck, eslint with jsx-a11y, prettier, vitest ≥ 90 % on engines/services, Playwright + axe). Add a Playwright screenshot per screen at 390×844 and diff against `docs/handoff/assets/shots/dark-NN.jpg` when a phase closes.
- PWA: vite-plugin-pwa, manifest and caching rules exactly as MIGRATION §5. Install prompt only on the invite screen.

## Hard rules

- Nothing ranks a person by skill. No percentages on matches, no leaderboards of names, no streaks, no follower counts. City Table shows counts for Singapore · NUS · SMU only.
- Nodes are places, not walls. Anyone can plan with anyone; a venue table needs a check-in within 400 m, in person.
- Everything social is finite: one match a day, two quests from five, seven digest items, a wall wiped at 00:00, messages that fade in seven days unless kept within 24 hours.
- Do not carry over the TFT-styled Alpha-1 mockup, the four partial apps in `../OraX`, or the vanilla `game.js` files. Read them for intent only.

## First commit

Create the repo skeleton from MIGRATION §2, copy `src/ds` from the design system folder in the handoff, port the seven components (prefer BaD's React versions), wire a dark/light toggle, and render the Baseline Play screen from `OraX-Baseline.dc.html` pixel-identical. Open a PR titled "Phase 1 · design system and shell baseline" with a screenshot diff against `docs/handoff/assets/shots/base-play.jpg`. Then continue to phase 2.
