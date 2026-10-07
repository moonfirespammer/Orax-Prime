# OraX-prime

The OraX superapp: an installable web app (PWA) for Singapore, built new in this repository from the design handoff in `docs/handoff/`. It is assembled from four quarries (the old `BaD`, `HMD` and `OraX` repositories and the OraX design system), not migrated from any of them.

## Run

```bash
pnpm install
pnpm dev          # the app on http://localhost:5173
pnpm handoff      # the design prototype on http://127.0.0.1:4174/OraX-App.dc.html
pnpm check        # typecheck, lint (with jsx-a11y), format check, unit tests with coverage
pnpm check:full   # the above, then a production build and Playwright with axe at 390×844
```

## Read first

`docs/handoff/README.md` gives the reading order. `PRODUCT_SPEC.md` is the document of record for intent; the prototype `OraX-App.dc.html` is the record for measurements and copy. `MIGRATION.md` §6 is the order of work, eight phases with a visual gate each.

For the three games, `docs/design/` is the rules of record (the Table Wars v2 handoff) and `docs/design/ABILITIES.md` lists every class kit, cut, gem kit and augment. Both follow the data in `src/data/design/*.json`, which the app loads as it is; `pnpm abilities` re-renders the list.

## Status

Phase 1 is complete: the skeleton and toolchain (from BaD), the handoff checked in, the design system in `src/ds` with the seven components, a dark/light theme, a gallery at `/ds`, and the baseline Play screen at `/dev/baseline` (gate sheet in `docs/gates/`). Phase 2a: the shell. Today, the Play sheet and You on three tabs with the centre Play button, the sub-screen header, the toast, and routes with Back; every sub-screen that a later phase fills already has its real header. Phase 2b: onboarding. The invite code, the five-question identity test with the class reveal, today's gem and the city, with the player kept on the device, the install prompt after a valid code, and the app entry going to the invite on a fresh device and to Today after that. The games' design handoff came in with it (`docs/design/`, `src/data/design/`). Phase 3a: the Build-A-Dish engine, its simulated city and its store, ported from BaD with their tests, plus the class palate from the design data. Phase 3b: the Board (today's five dishes, one pick, one swap) and the Station (the plate, the sigil pad, the city Pantry) under Play → Build-A-Dish. Phase 3c: the Bin's verdict, with the class palate line, the stones in your gem and the Signature Dish kept on your profile. Phase 4a: Today's match, quests and digest screens, with the day's answers and picks kept on the device and let go at 00:00. Next: 4b, the Wardrobe and Change class screens on You.
