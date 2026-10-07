# CLAUDE.md

OraX-prime is the OraX superapp, built new in this repository from the design handoff in `docs/handoff/`. It is not a migration of an old app; the old repositories are quarries.

## Read before writing code

In this order: `docs/handoff/README.md` (the reading order), `PRODUCT_SPEC.md` (intent, the document of record), `DESIGN_RULES.md` (the binding visual contract), `PWA.md`, `MIGRATION.md` (the pull list with destinations and the order of work with gates; do not re-open its decisions), `SCREEN_MAP.md`, then the prototype `OraX-App.dc.html` (serve it with `pnpm handoff`). When the spec and the prototype disagree: the spec wins on intent and rules, the prototype wins on measurements and copy.

## Quarries (read-only clones next to this repository)

- `../BaD` on branch `claude/loving-albattani-u4brof`: the toolchain, the Build-A-Dish engine, services, components.
- `../HMD` on branch `claude/zealous-johnson-1lsy0k`: OXP and HMD rules documents and art. Never port its `game.js` files.
- `../OraX` on branch `main`: the Supabase schema and docs.

## Commands

```bash
pnpm dev          # http://localhost:5173 (dev-only ?theme=light)
pnpm handoff      # the prototype on http://127.0.0.1:4174/OraX-App.dc.html
pnpm check        # typecheck, lint, format check, vitest with coverage (≥ 90 % on engines and services)
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

Lessons that hold from here: measure the prototype live; a span's `min-height`/`width` is content-box where a button's is border-box; never put `min-width` on a flex-row button (it lets it shrink under its label); `getByText` with the countdown needs a clock a few seconds before the minute. Open design decision: a class name set in its class accent at caption size falls under 4.5:1 in dark for Rebel, Foodsmith, Host and Gastronaut; those spans carry `data-contrast-exception="class-accent"` and axe skips them until the owner decides (lift the accents, or set the name larger).

Next: 2b, onboarding in `src/onboarding/` (invite code → five-question identity test → class reveal → gem → city, from the prototype's INVITE and ONBOARDING sections and `QUIZ`, `ob()`, the `ob` render values; `me` persisted with idb-keyval, see `../BaD/src/services/storage.ts`; the install prompt captured on the invite screen), then the Phase 2 pull request against `main` once Phase 1 is merged. Direction 1b/1c of Today stay behind a dev flag and are not built yet.
