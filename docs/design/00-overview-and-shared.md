**Game design · v2 · 7 October 2026**

# Table Wars v2: three games, one clock, one budget

The second pass over the OraX games. Nine classes, three gems chosen once a day, three rooms of one kitchen: Build-a-Dish alone, HMD with five friends against a horde of 999, OXP with three on a branching map. Every open question from v1 is closed here, every number comes from one stated budget, and the tables render from five data files the build can read as they are. The augment catalogue is the Compendium v2: nothing is OP if everything is OP, and the combos are the game.

**What changed from v1**

1. HMD has a clock. Three minutes; the score is what the table killed before the end; the Service bar is gone and Rise finishes the field for free.
2. Every stat is derived from a budget. Class ATK values changed; crowd DPS is what the harness checks.
3. The horde pours faster in four equal Courses, and the later Courses hit harder. Conditions switch on with the Courses; Champion HP follows the slot.
4. Ingredients are capped, Stirrer stacks trimmed, and the v1 A/B/C debate on class in BaD is collapsed to its ruling.
5. Eleven open questions closed; five JSON files added under data/.

**Decided**

1. One clock: 00:00 city time for all three games; Prep windows 00:00, 06:00, 12:00, 18:00; Leftovers hour 21:00–00:00 widens offers everywhere.
2. HMD ends at 0:00 or when the fifth cook falls. Kills before the end score; a Champion counts ten; 999 before the end is a Clean Plate at ×1.5. Rise is shown, never scored. Orders change by tap, 15 s cooldown. The horde is 999, fixed.
3. Wardens deal 90%, Menders 95%, Strikers 110% of the class base.
4. OXP: Enrage is +20% and one step off the attack timer. The Critic opens for both lives and a banked token. A duplicate gem deepens the one passive. Two lives. Class stays cosmetic; Academy mode is retired.
5. BaD stays a blank canvas; class palates are copy the Bin reads; the gem is the colour of your stones.
6. The Bin speaks on every results screen, lobby card and share card, warm and short. Habits, the City Table with both perks, and the gifts ship at launch.

> Rendered 7 October 2026 from the OraX design project (Table Wars Design v2 and Compendium v2). The numbers here are copies: the source of truth is `shared.json`, `classes.json`, `hmd.json`, `oxp.json`, `bad.json` in `data/`. Change the JSON, not this prose; the prose carries the rules and the intent. This file holds the shared foundation (Part 1), the day the three games share (Part 6) and the harness and build order (Part 7).

## One cast, three games

A player is the same person in all three games. The class comes from the identity test and never changes. The gem is the day’s commitment, made in the app at the reset. Everything else is game-specific and short-lived. Keeping the layers this clean is what lets one set of art and one vocabulary serve a three-minute plate, a three-minute horde and a fifteen-minute gauntlet.

### 1.1 The layers

| Layer | BaD | HMD | OXP |
| --- | --- | --- | --- |
| **Class** | Avatar, ring, colour; the palate the Bin reads. | Body, range, base stats and the kit: Basic, Passive, Signature. | Cosmetic: the drawing, the clips, the Limit cut-in. |
| **Gem** | The colour of your stones. | Your role for the day: the cut of the kit. | Your hand, Limit Breaker and passive. |
| **Your picks** | One dish, one swap. | Four Prep augments through the day, one Special at the bell. | A path, seat augments at rows 1, 4 and 7, relics by vote. |
| **The day’s roll** | Five dishes, one Pantry per city. | Today’s Service, the Champion order. | The Daily Gauntlet map and its node modifiers. |

Nothing rolled is ever picked, and nothing picked ever shows skill on the body: the OraX rule.

### 1.2 Three gems, three roles

**Ruby · Striker** Burn

Kill things, fast. The Striker is the table’s knife.

|  |  |  |  |
| --- | --- | --- | --- |
| **Keyword.** Burn: 6 damage per second per stack for 4 s, max 3 stacks. Burn ticks ignore ARM. | **HMD lean.** +10% ATK, −10% ARM. Threat ×1. | **HMD Heat.** +5 Heat per kill on top of the base gains. | **OXP.** Hand R R G · Bloodlust: The next combo deals ×2. |

**Sapphire · Warden** Chill

Get hit instead of everyone else. The Warden is the table itself.

|  |  |  |  |
| --- | --- | --- | --- |
| **Keyword.** Chill: −20% SPD per stack; 3 stacks = Freeze for 1.5 s. Shields are temporary HP that take damage first. | **HMD lean.** +25% max HP, +15% ARM, −10% ATK. Threat ×2. | **HMD Heat.** +4 Heat per hit taken on top of the base gains. | **OXP.** Hand B B R · Prismatic Shift: ×1.5, and the seat may recolour the action it committed after seeing the others. |

**Emerald · Mender** Grow

Keep the table standing and scale as the fight goes on. The Mender is the pot that never empties.

|  |  |  |  |
| --- | --- | --- | --- |
| **Keyword.** Grow: a permanent stack for the rest of the fight (HMD) or the run (OXP). Grow never decays. | **HMD lean.** +15% max HP, +1% HP regen per second, −5% ATK. Healing generates 1.5× threat. | **HMD Heat.** +4 Heat whenever any ally takes a hit, on top of the base gains. | **OXP.** Hand G G B · Exploit: ×1.5, ignores all Defense, and the seat may swap position for the turn. |

### 1.3 One clock

Both cities share a time zone and one day. It turns at midnight, BaD’s locked rule, for all three games at once. The leaderboards are daily, so a day that turned at different hours in different rooms would be three days.

| Time | What happens |
| --- | --- |
| **00:00** | Reset. The app asks for today’s gem. BaD deals five dishes and one Pantry per city; HMD rolls Today’s Service and the Champion order; OXP rolls the Daily Gauntlet map. The first Prep window opens. |
| **06:00** | Second Prep window. Missed windows queue: a cook who opens the app at 20:00 picks four in a row. |
| **12:00** | Third Prep window. |
| **18:00** | Fourth Prep window. From here every HMD cook carries all four permanent augments; the evening is when the horde falls. |
| **21:00** | Leftovers hour. More on the table in every room until midnight. |
| **Any time** | Play. A plate takes three minutes, an HMD fight exactly three, an OXP run about fifteen. Bots fill empty seats with a random class and the day’s average loadout. |

## One day

Three rooms of one kitchen. BaD is the daily ritual: three minutes, alone, no enemy. HMD is the evening spectacle: five friends, one bell, three minutes. OXP is the long table: three friends, fifteen minutes, a map. What ties them is not a shared economy, which would make one room pay for another, but a shared day, a shared identity, a shared voice and a few small gifts that widen a choice and never add a number.

### 6.1 Side by side

|  | BaD | HMD | OXP |
| --- | --- | --- | --- |
| **Players** | 1 | 5 | 3 |
| **A session** | About 3 min | Exactly 3 min | About 15 min |
| **The class** | Avatar, ring, colour; the palate | The kit: Basic, Passive, Signature | The drawing, the clips, the cut-in |
| **The gem** | The colour of your stones | Your role: Striker, Warden, Mender | Your hand, Limit Breaker and passive |
| **Your pick** | One dish, one swap | Four Prep augments, one Special | A path; seat augments; relics by vote |
| **The day’s roll** | Five dishes, one Pantry per city | Today’s Service, the Champion order | The map and its node modifiers |
| **The judge** | The Bin: one to three stones | Kills before the end | Points × reward tier |
| **It ends with** | A name and a verdict, always | Rise, always | A results screen, win or lose |
| **Fail state** | None | None; the table rises | Two lives, then Game Over |
| **The board** | The same-dish wall | Daily Table | Daily Gauntlet |
| **Share card** | Built, 326px | Same format | Same format |

### 6.2 Leftovers hour · 21:00 to midnight

|  |  |
| --- | --- |
| **BaD** | The portion cap lifts on shelves that are still plentiful (built). |
| **HMD** | The Special offer before the bell is four wide instead of three. |
| **OXP** | Every relic offer gains a fourth option, a Leftover relic that melts after a few fights. |

### 6.3 One identity, one set of habits

Name, city, class, figure and today’s gem live on the app profile and every game reads them; a class change in the app takes effect at the next reset. Every game also writes habit chips back to the profile, and the profile is what OraX matches on: who you are and how you play, never how well.

| Game | Chip | Counts when |
| --- | --- | --- |
| BaD | **Doubles the chilli ×n** | Built. Chilli portions at two or more. |
| BaD | **Unhinged plates ×n** | Built. Any item at five portions, or twice the recipe count. |
| BaD | **Feeds the table ×n (and eight more)** | The class palate fired on a non-cursed plate. |
| HMD | **Front-row regular ×n** | Took a front slot. |
| HMD | **Stands by the Mender ×n** | Placed adjacent to an Emerald cut. |
| HMD | **Late shift ×n** | Rang the bell during Leftovers hour. |
| HMD | **Same table ×n** | Fought with the same four friends as the last time. |
| OXP | **Trinity table ×n** | One gem per seat. |
| OXP | **Mono table ×n** | Three seats, one gem. |
| OXP | **Takes the hot node ×n** | Chose the row’s heaviest node. |
| OXP | **Rings the Limit early ×n** | Spent a Limit Token on turn one. |

### 6.4 The City Table

One card per city with three daily counters, plates today, kills today, rows cleared today, and two perks that fire when the city passes a mark. Both ship at launch. The marks start as guesses and reset every Monday to the trailing week’s median, so a perk fires on a good day for that city, not on a number from this document.

**Early leftovers**

When the city passes its plate mark, Leftovers hour opens at 20:00 for everyone in the city.

Launch guess 1,500 plates Singapore · 1,200 Kuala Lumpur; reset to the trailing-week median every Monday.

**Open kitchen**

When the city passes its kill mark, the next Prep window’s offer is four wide for everyone in the city.

Launch guess 60,000 kills Singapore · 50,000 Kuala Lumpur; same weekly reset.

### 6.5 The gifts

| Direction | Gift | What it does | Why it is safe |
| --- | --- | --- | --- |
| BaD → HMD | **Packed Lunch** | Plated today: the Special offer before the bell is four wide. | Widens a choice; adds no stat. |
| BaD → OXP | **House Pantry** | Plated today: the run’s first relic offer is four wide. | Widens a choice; adds no stat. |
| HMD or OXP → BaD | **Second Sitting** | Fought today: one more dish swap. | More room to express; the judge is untouched. |
| HMD ↔ OXP | **Same table** | A party that plays both combat games together on one day earns the Same table chip. | A chip, nothing else. |

### 6.6 One voice · the Bin

BaD already has the best character in the kitchen. In v2 the Bin reads every results screen, every lobby card and every share card headline, in one register: warm, still short. It likes you and will not say so directly.

**Rules**
- Sentence case, full stops, no exclamation marks, no emoji. Fourteen words or fewer a line.
- About the plate, the fight or the run; never about the player’s rank or skill.
- One line per moment. The Bin never praises a cursed plate or an empty table.
- Numbers are written as the player would say them: 612, not six hundred and twelve.
- About thirty lines per game per moment type; seeded from the result so the same result gets the same line.
**Where it speaks**
- BaD verdict
- HMD lobby card (Today’s Service)
- HMD results
- OXP map card
- OXP results
- Every share card headline

| Moment | The Bin |
| --- | --- |
| HMD · lobby | Sticky floor tonight and the knives are sharp. Bring a Warden. |
| HMD · Clean Plate | All 999 before the bell. The floor is a disgrace and I would not change it. |
| HMD · a long stand | 612 before the fall. The rest were finished for you. I counted every one. |
| HMD · an early fall | 206. The horde barely noticed. Come back after the six o’clock pick. |
| OXP · map | Three roads. The middle one is hot and pays for it. |
| OXP · a clear | Ten courses. The Colossus is toffee now. Sit down, you have earned the chair. |
| OXP · Game Over | Row nine. The Colossus called you bland. It is wrong, but it is big. |
| OXP · the Critic | The Critic came and you did not embarrass me. That is the whole review. |
| Any · share card | The Bin’s line is the headline of every card, in all three rooms. |

**One share card.** BaD’s 326px card for all three games: logo and pixel label, city and date, the dish or fight or run, the Bin’s line, the result in your gem (three stones; kills before the end; rows cleared), avatar and class, the two-line tagline.

## Harness, data and build order

Every number in this document lives in one of five JSON files and nowhere in logic; this page renders from them, so a change to a file is a change to the design. The harness plays a thousand seeded fights with random tables and reports against the targets in 3.5 and 4.6, by class × gem and by hour of day for HMD, by hand composition and path for OXP. Augments, relics and modifiers carry tags (burn, chill, grow, heat, threat, economy, colour, gamble) so offers can be weighted and an over-performing tag can be seen.

| File | Holds |
| --- | --- |
| **data/classes.json** | Budget rule, gem modifiers, Heat base, the three gems with their OXP kits, nine classes with derived stats, kits and cuts. |
| **data/hmd.json** | Fight constants, Courses and units with mix shares, horde budget, Champions by slot, conditions with triggers and exclusions, augment pool counts, tuning targets. |
| **data/oxp.json** | Seat rules, map generation, augment layers, TTK targets, the pool of twenty plus the Critic, abilities, modifiers, relics, scoring, tuning targets. |
| **data/bad.json** | As built, the judge, the class and gem ruling, nine palates. |
| **data/shared.json** | The clock, Leftovers hour, habits, City Table, gifts, the Bin, the share card, this list. |

### Still owned by the harness

The Critic’s door rate, the City Table marks, monster HP against TTK, and the exact Common / Rare / Epic values in the Compendium. Nothing else is open.

### Build order

1. Load the five data files into the HMD and OXP builds as they are; derive ATK in code from the budget rule so the files stay the truth.
2. HMD headless simulation on the existing arena: the clock, Courses and pour, the surround cap, Champions by slot, Rise; harness report by hour of day.
3. OXP map generator and node cards over the existing engine; the relic vote; deepening passives; Enrage’s timer step; the Critic row. Remove Academy mode.
4. The daily lock and Prep windows in the app; lobby cards for Today’s Service and the Daily Gauntlet with the Bin’s line.
5. Habit chips to the profile; the City Table card and both perks; the four gifts.
6. The Bin’s line sets: about thirty per moment type per game, seeded from the result; the share card as the family format.
7. Compendium edits for the retired Service bar; art for the ten new monsters and the Bin on three screens.