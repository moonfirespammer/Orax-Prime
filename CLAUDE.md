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

- Follow `MIGRATION.md` §6 in order. Stop at each gate, run the app, and compare with the named board page in `OraX-App-print.dc.html` and the screenshot in `docs/handoff/assets/shots/`.
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

Phase 1 is split into three steps. 1a done: skeleton, toolchain from BaD, the handoff under `docs/handoff/`, `src/services/clock.ts`. 1b done: `src/ds` (tokens and `styles.css` copied verbatim and kept byte-identical, fonts, assets with the 1254 px boards from `../BaD/public/orax/assets/Classes`, the seven components plus Avatar under `src/ds/components`, data and `avatarCrop` in `src/ds/data.ts`, `asset()` in `src/ds/assets.ts`), the theme in `src/store/shell.ts` applied by `src/app/App.tsx`, the prototype's Settings button as `src/app/ThemeToggle.tsx`, and the development gallery `src/dev/Gallery.tsx` at `/ds`. Next: 1c, the baseline Play screen pixel-identical to `docs/handoff/assets/shots/base-play.jpg` (recreate it from `OraX-Baseline.dc.html`, screens from `../BaD/src/screens/Play.tsx`), then the Phase 1 pull request against `main`.
