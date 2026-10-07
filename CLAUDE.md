# CLAUDE.md

OraX-prime is the OraX superapp, built new in this repository from the design handoff in `docs/handoff/`. It is not a migration of an old app; the old repositories are quarries.

## Read before writing code

In this order: `docs/handoff/README.md` (the reading order), `PRODUCT_SPEC.md` (intent, the document of record), `DESIGN_RULES.md` (the binding visual contract), `PWA.md`, `MIGRATION.md` (the pull list with destinations and the order of work with gates; do not re-open its decisions), `SCREEN_MAP.md`, then the prototype `OraX-App.dc.html` (serve it with `pnpm handoff`). When the spec and the prototype disagree: the spec wins on intent and rules, the prototype wins on measurements and copy.

For the games, `docs/design/` is the rules of record: the Table Wars v2 handoff (7 October 2026) as prose, read in the order its `README.md` gives, and `ABILITIES.md`, the class kits and cuts, the gem kits and the augment catalogues rendered from the data. The data is `src/data/design/*.json`, verbatim from the handoff and the source of truth for every number and every card; load it through `src/data/design/index.ts` (`DESIGN`, `classDesign`, `gemDesign`, `cutOf`, `facets`, `signatureAugments`, `gemSeatAugments`, `palate`) and never retype a value. Change the JSON, run `pnpm abilities`, and `ABILITIES.md` follows; `pnpm check` fails while it is stale. Vocabulary: the design's `role` is a class archetype (Guardian, Finisher, Igniter, Skirmisher, Analyst, Duelist, Disruptor, Trickster, Coordinator); the app's role eyebrow stays PRODUCT_SPEC's Fighter / Rogue / Mage from `src/ds/data.ts`.

## Quarries (read-only clones next to this repository)

- `../BaD` on branch `claude/loving-albattani-u4brof`: the toolchain, the Build-A-Dish engine, services, components.
- `../HMD` on branch `claude/zealous-johnson-1lsy0k`: OXP and HMD rules documents and art. Never port its `game.js` files.
- `../OraX` on branch `main`: the Supabase schema and docs.

## Commands

```bash
pnpm dev          # http://localhost:5173 (dev-only ?theme=light)
pnpm handoff      # the prototype on http://127.0.0.1:4174/OraX-App.dc.html
pnpm check        # typecheck, lint, format check, vitest with coverage (≥ 90 % on engines and services)
pnpm abilities    # re-render docs/design/ABILITIES.md from src/data/design/*.json
pnpm check:full   # + build + Playwright with axe at 390×844
```

## How to work

- Follow `MIGRATION.md` §6 in order. Stop at each gate, run the app, and compare with the named board page in `OraX-App-print.dc.html` and the screenshot in `docs/handoff/assets/shots/`. The prototype's measurements are its rendered values: measure them live in Playwright (the prototype draws buttons as divs, so a div's `min-height` is content-box), and treat the handoff JPEGs as references, not pixel truth, since they were captured with classic scrollbars.
- Reuse before writing: check `../BaD/src` for an existing implementation with tests first. The prototype's JavaScript is the reference for shape and copy; BaD's TypeScript is the reference for correctness where both exist.
- The OXP and HMD engines are pure TypeScript reducers under `src/games/*/engine/` with Vitest tests. No DOM in engines.
- All copy comes from the prototype verbatim. Sentence case, no exclamation marks, real `×` and `·`, no emoji.
- Styling: CSS modules on the `src/ds/tokens` variables. No Tailwind, no new colours, no shadows on cards, no gradients.
- State: Zustand slices mirroring the prototype's state. Persist with idb-keyval until Supabase is wired in phase 7.
- Clock: everything daily keys off Singapore wall time and resets at 00:00. One source of truth: `src/services/clock.ts`.
- Keep `pnpm check` green. Playwright + axe on every screen; a screenshot per screen at 390×844 diffed against the handoff shots when a phase closes.

## Hard rules

- Nothing ranks a person by skill. No percentages on matches, no leaderboards of names, no streaks, no follower counts.
- Nodes are places, not walls. Anyone can plan with anyone; a venue table needs a check-in within 400 m, in person.
- Everything social is finite: one match a day, two quests from five, seven digest items, a wall wiped at 00:00, messages that fade in seven days unless kept within 24 hours.
- Do not carry over the TFT-styled Alpha-1 mockup, the partial apps in `../OraX`, or the vanilla `game.js` files. Read them for intent only.
- The user works one step at a time: finish a step, show how to verify it, and wait before starting the next.

## Status

Phase 1 done (skeleton; `src/ds`; the baseline Play screen, now at `/dev/baseline`). Phase 2a done: the shell in `src/app/` (`Shell.tsx` layout route with route handles for chrome, `TabBar.tsx` with the centre Play button, `PlaySheet.tsx`, `Header.tsx` with Back, `Toast.tsx`, `RoomRow.tsx`, `routes.tsx`), the clock singleton and `useNow` in `src/app/clock.ts` (overridable with `?clock=`), stores (`shell` theme and sheet, `toast`, `me`, `today` match and quests), `src/data/people.ts`, `src/today/` (Today in direction 1a and `data.ts`, the prototype's renderVals verbatim), `src/you/You.tsx`. Sub-screens not yet built render `Pending` under their real header. Gate sheets: `docs/gates/phase-2a-shell-{dark,light}.png`; the remaining diffs are icons, board resolution and clock digits.

Phase 2b done: onboarding in `src/onboarding/` (`Invite.tsx`, `Onboarding.tsx`, `data.ts` with the prototype's copy, `QUIZ` and `winnerOf`, `unsorted.ts` with the two banner crops of the Unsorted), `src/store/onboarding.ts` (the test in progress), `src/store/me.ts` persisted through `src/services/storage.ts` (idb-keyval with a localStorage fallback, key `orax:me`, `hydrate` at launch), `src/app/Entry.tsx` (`/` goes to `/invite` on a fresh device and to `/today` once onboarded), `src/services/install.ts` (the install prompt captured at launch, shown after a valid code, a dismissal remembered for the day). `/invite` and `/onboarding` carry no chrome. Gate sheets: `docs/gates/phase-2b-onboarding-{dark,light}.png`; invite, quiz and city match the prototype pixel for pixel, the class reveal differs only in board resolution and the gem screen only at the active ring's edge. The design handoff landed with this step: `docs/design/`, `src/data/design/`, `pnpm abilities`.

Lessons that hold from here: measure the prototype live; a span's `min-height`/`width` is content-box where a button's is border-box; never put `min-width` on a flex-row button (it lets it shrink under its label); `getByText` with the countdown needs a clock a few seconds before the minute; a text `<input>` is content-box by default (the prototype's invite field is 56 px inside its border, 58 px tall). Open design decision: a class name set in its class accent at caption size falls under 4.5:1 in dark for Rebel, Foodsmith, Host and Gastronaut; those spans carry `data-contrast-exception="class-accent"` and axe skips them until the owner decides (lift the accents, or set the name larger). Kuala Lumpur is on the city screen as the prototype lists it and a pick is stored, but the app runs Singapore's clock and venues until KL is unparked (MIGRATION §1).

Next: the Phase 2 pull request against `main` (PR #1 on this branch already carries phases 1 and 2a), then phase 3, Build-A-Dish: port the BaD engine and screens into the shell (MIGRATION §6, gate pages 08–09, the verdict with the palate line from `src/data/design`). Direction 1b/1c of Today stay behind a dev flag and are not built yet.
