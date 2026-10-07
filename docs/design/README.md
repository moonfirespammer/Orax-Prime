# Handoff: Table Wars — classes, gems and three games

## Overview
Design handoff for the three OraX games that share one cast: **HMD** (five cooks, one three-minute last stand against a horde of 999), **OXP** (three seats, ten rows, a branching daily gauntlet) and **BaD** (Build-a-Dish, one player, three minutes, no enemy). Nine classes from the identity test, three gems chosen once a day, one clock, one voice (the Bin). Everything in this folder is the v2 design: every open question is closed and every number comes from a stated budget.

## About these files
These are **game-design documents, not UI prototypes.** There are no screens to recreate pixel-for-pixel here; the UI lives in the OraX app and its design system (OraX Design System, Space Grotesk, one purple, gems are the only things that glow). The Markdown files were rendered from the design documents in the OraX design project; the `data/*.json` files are the **source of truth for every number and every card** and are meant to be loaded by the games as they are. When the prose and the JSON disagree, the JSON wins and the prose needs a fix.

The rendered design documents (HTML, printable) remain in the OraX project as `Table Wars Design v2.dc.html` and `Table Wars Compendium v2.dc.html`; ask for a PDF export if a reviewer wants them.

## Files
| File | Read it when | Game |
| --- | --- | --- |
| `00-overview-and-shared.md` | First. The layers (class · gem · picks · roll), the gems and roles, the clock, the day, habits, City Table, gifts, the Bin, harness and build order | All |
| `01-classes.md` | Building any class kit or cut; the stat budget | HMD (OXP cosmetic, BaD palates) |
| `02-combo-engine.md` | Before the augment catalogue: the ruling, keyword engine, five combo kinds, power budget, offer rules | HMD, OXP |
| `10-hmd.md` | The fight, the horde by Course, Champions by slot, Today’s Service, augment windows, tuning targets | HMD |
| `11-hmd-augments.md` | Kits and cuts, House Combos, Pantry, Clicks, Facets, Signatures, Specials, Table combos, Recipes, Menus | HMD |
| `20-oxp.md` | Gem kits, the Daily Gauntlet map, the pool of twenty, abilities, modifiers, relics, the Critic, tuning targets | OXP |
| `21-oxp-augments.md` | Seat augments, seat Clicks, cross-seat Table combos, relics, blessings, Leftover relics, Recipes, Menus | OXP |
| `30-bad.md` | As built, the judge, the class-and-gem ruling, the nine palates | BaD |
| `40-builds-and-tuning.md` | Ten reference builds and the catalogue’s tuning rules | HMD, OXP |
| `data/*.json` | Always. Load them; never copy numbers into code | All |

## The data files
- `data/classes.json` — version, budget {…}, gems (3), classes (9)
- `data/hmd.json` — version, fight {…}, courses (4), hordeBudget {…}, champions {…}, conditions {…}, augments {…}, tuning (10)
- `data/oxp.json` — version, engine, seat {…}, map {…}, augmentLayers (5), ttk {…}, monsters (3), abilities (16), modifiers (16), relics {…}, scoring {…}, critic, tuning (8)
- `data/bad.json` — version, status, asBuilt (6), judge {…}, ruling {…}, palates (9)
- `data/shared.json` — version, clock {…}, leftovers (3), habits (11), cityTable {…}, gifts (4), bin {…}, shareCard, dataFiles (5)
- `data/augments.json` — version, ruling, philosophy (5), keywords (12), comboTypes (5), budget (8), offerRules (8), borrow (7), hmd {…}, oxp {…}, builds (10), tuning (8)

Conventions inside the JSON: tier values are written `Common / Rare / Epic` in one string (parse on `/`); `tags` are the keyword tags the offer weighting and the harness read; `needs` on a combo lists its halves by card name; gem keys are `ruby | sapphire | emerald`; class keys are the nine lowercase names. Nothing in the data is a constant in logic: the build order below starts with loading these files.

## Repositories
- **HMD** — `moonfirespammer/HMD` @ `claude/autobattler-game-design-t0o5hg` (arena prototype, docs/). Takes `00`, `01`, `02`, `10`, `11`, `40` and `data/`.
- **OXP** — `moonfirespammer/HMD` @ `claude/zealous-johnson-1lsy0k` (`oxp/` build, `oxp/MECHANICS.md`). Takes `00`, `01`, `02`, `20`, `21`, `40` and `data/`. The engine documented in MECHANICS.md stays as it is; Academy mode is retired.
- **BaD** — `moonfirespammer/BaD` @ `claude/loving-albattani-u4brof` (`docs/BUILD-A-DISH.md`, `src/game/`). Takes `00`, `30` and `data/bad.json`, `data/shared.json`. Design v1 is locked; nothing here changes the judge.

Suggested placement: `docs/design/` in each repo, with `data/` beside the game code so the build loads it.

## Suggested CLAUDE.md lines
```
Design docs live in docs/design/. Read 00-overview-and-shared.md and the files for this game before touching game logic.
data/*.json is the source of truth for every number and every card. Load it at startup; never hard-code a value that exists there.
Stats are derived: crowd DPS = ATK × SPD × targets, fixed by weight (see 01-classes.md). Compute ATK from the budget in code.
Copy rules: sentence case, no exclamation marks, no emoji, the real × and ·, class names as proper nouns, gems as Ruby / Sapphire / Emerald.
Nothing on a player’s body shows skill. Nothing the day rolls (Today’s Service, the map, the Pantry) is ever picked by a player.
```

## Decisions that are closed
1. One clock: 00:00 Singapore and Kuala Lumpur time for all three games; Prep windows 00:00, 06:00, 12:00, 18:00; Leftovers hour 21:00–00:00 widens offers everywhere.
2. HMD is three minutes and ends at 0:00 or when the fifth cook falls. Score is kills before the end; a Champion counts ten; 999 before the end is a Clean Plate at ×1.5. Rise finishes the field and is shown, never scored. Orders change by tap, 15 s cooldown. The horde is 999, fixed, and pours in four Courses of 250.
3. Every stat comes from the budget; Strikers deal 110%, Menders 95%, Wardens 90%.
4. OXP: class is cosmetic; gem is the kit; a duplicate gem deepens the one passive; Enrage is +20% and one step off the attack timer; the Critic opens for both lives and a banked token; two lives; Academy mode retired.
5. BaD stays a blank canvas: the judge and the shelf are identical for everyone; class palates are copy the Bin reads (one non-cursed plate in four fires one); the gem is the colour of your stones.
6. Augments: nothing is OP if everything is OP, and the game is in the combos. Common +25%, Rare +45%, Epic +80%; Clicks, Table combos, Recipes, Menus and House Combos as in 02-combo-engine.md. Courses III and IV are thickened to absorb it.
7. Enemy modifiers are rolled at the reset and fixed all day, in both combat games. Relics are party-wide, voted, run-only.

## Still owned by the balance harness
The Critic’s door rate (about one table in fifty), the City Table marks (weekly median reset), OXP monster HP against the turns-to-kill targets, and the exact Common / Rare / Epic values. Targets and bands are tabled in 10-hmd.md §3.5, 20-oxp.md §4.6 and 40-builds-and-tuning.md.

## Build order
1. Load the six data files as they are; derive ATK in code from the budget rule.
2. HMD headless simulation on the existing arena: the clock, Courses and pour, the surround cap, Champions by slot, Rise; harness report by hour of day.
3. OXP map generator and node cards over the existing engine; relic vote; deepening passives; Enrage’s timer step; the Critic row; seat augments at rows 1, 4 and 7. Remove Academy mode.
4. The daily lock and Prep windows in the app; lobby cards for Today’s Service and the Daily Gauntlet with the Bin’s line.
5. Habit chips to the profile; the City Table card and both perks; the four gifts.
6. The Bin’s line sets, about thirty per moment type per game, seeded from the result; the share card as the family format.
7. Art for the ten new OXP monsters and the Bin on three screens (outside this handoff).

## Not in this folder
The avatar art bibles (Hearthline 2.5D and the Classic-era comparison), the OraX design system and the UI kits. The games read the player’s class, figure and gem from the app profile; nothing here redraws them.
