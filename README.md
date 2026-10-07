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

## Status

Phase 1 is complete: the skeleton and toolchain (from BaD), the handoff checked in, the design system in `src/ds` with the seven components, a dark/light theme, a gallery at `/ds`, and the baseline Play screen at `/dev/baseline` (gate sheet in `docs/gates/`). Phase 2a: the shell. Today, the Play sheet and You on three tabs with the centre Play button, the sub-screen header, the toast, and routes with Back; every sub-screen that a later phase fills already has its real header. Next: 2b, onboarding (invite code, identity test, gem, city), then the Phase 2 pull request.
