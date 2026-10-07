# OraX-prime handoff

Read in this order.

| File | What it is | Read when |
| --- | --- | --- |
| `PRODUCT_SPEC.md` | The product: principles, identity model, daily clock, every screen and game rule, copy and tone, what is out. | First. This is what you are building. |
| `DESIGN_RULES.md` | The visual contract on one page. | Before any UI. |
| `PWA.md` | Install, offline, data model additions, realtime channels, quality bar. | Before the shell and before phase 7. |
| `MIGRATION.md` | Where to pull from: file-by-file lists from `moonfirespammer/BaD`, `HMD`, `OraX` and the design system, with destinations in the new repo; order of work with gates. | Before each phase. |
| `SCREEN_MAP.md` | 28 screens → prototype template section and logic → board page → screenshot → target file. | While building a screen. |
| `LANDING_PAGE.md` | The new orax.world page: sections, the two-worlds painting and the seam device, the Unsorted, the planned painting redo. | Before touching the website. |
| `WAITLIST_MIGRATION.md` | Grandfathering every email from the old site into founders: export from D1, land in Supabase, the two emails, rollout. | Before the website ships. |
| `OraX-World.dc.html` | The landing page prototype (dark/light, idle/founder/joined states). | Website build. |
| `CLAUDE_CODE_PROMPT.md` | The prompt to paste into Claude Code from an empty clone. | Once, to start. |
| `OraX-App.dc.html` | The clickable prototype (open with its sibling files in this folder). Measurements and copy of record. | Always. |
| `OraX-Baseline.dc.html` | The old apps recreated from source. | Phase 1 gate. |
| `OraX-App-print.dc.html` | 24 board pages (cover, dark, light, baseline). Print to PDF from a browser. | Gates. |
| `assets/shots/` | 65 reference screenshots: `dark-NN.jpg`, `light-NN.jpg` (390×844 @2x, NN per SCREEN_MAP), `base-*.jpg`. | Visual diffs. |
| `_ds/` | The OraX design system: tokens, fonts, components, boards, gems, logos. | Copy into `src/ds`. |
| `github.md` | Repos and branches this package was built from. | Provenance. |

Source repositories: `moonfirespammer/BaD@claude/loving-albattani-u4brof`, `moonfirespammer/HMD@claude/zealous-johnson-1lsy0k`, `moonfirespammer/OraX@main`. Target: `moonfirespammer/OraX-prime`.
