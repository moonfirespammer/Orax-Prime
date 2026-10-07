**Compendium · v2 · 7 October 2026**

# Compendium v2: nothing is OP if everything is OP

The complete abilities and augments catalogue for HMD and OXP, rebalanced around one idea: every card swings a fight by itself, and the game is in the combos. Clicks on one cook, Table combos between cooks, Recipes that fuse, Menus of three that change what the fight is, and a House Combo that makes every class OP on its own. The horde is thickened to meet it; the day’s roll, not a nerf, decides which OP is OP today. The rules it sits on are in Design v2; v1 stays alongside.

**The ruling** — Nothing is OP if everything is OP. Every card swings a fight on its own; the game is in the combos. A few classes are OP alone and are meant to be. The day’s roll, never a nerf, is what decides which OP is OP today.

> Rendered 7 October 2026 from the OraX design project (Table Wars Design v2 and Compendium v2). The numbers here are copies: the source of truth is `augments.json` (ruling, philosophy, keywords, comboTypes, budget, offerRules, borrow) in `data/`. Change the JSON, not this prose; the prose carries the rules and the intent. Part A applies to both combat games.

## The engine of combos

### A.1 Five rules

**Everything swings**

Common is a quarter more cook, Rare nearly half, Epic almost double. No augment is a rounding error; the first pick at midnight already changes how the fight looks.

**Combos are the game**

Two cards that click on one cook, two cooks whose kits talk, two held augments that fuse, three pieces that make a Menu. The catalogue is written so that every card has at least two partners and the Prep screen shows them.

**OP alone is allowed**

Every class has a House Combo: two of its own Signatures that turn its kit into a problem by itself. Some are louder than others and that is fine; the table has five seats.

**The horde absorbs it**

Enemy numbers are cut against a table that runs two combos, not against a bare kit. Courses III and IV are thicker than in v1; the fresh midnight table still lands at six hundred because it holds one card and no combo.

**The calendar is the nerf**

Every Menu lists the day that breaks it. Today’s Service and the node modifiers are rolled, never picked, so the strongest build in the kitchen is the strongest build only on the days that let it be.

### A.2 The keyword engine

Every card pushes a keyword or consumes one. A combo is a push meeting a consume. This table is the whole design in one place: if a new card does not sit in a row, it does not belong in the catalogue.

| Keyword | Pushed by | Consumed by |
| --- | --- | --- |
| **Burn** | Ruby cuts, Open Flame, Firecracker, Saucier hits | Flash Point, Char, Fuel, Wildfire, Hot Verdict |
| **Chill · Freeze** | Sapphire cuts, Cold Shoulder, Salt Circle, Steam Wisp | Cold Snap, Frostbite, Thaw, Shatter |
| **Grow** | Emerald cuts, Snack, Ingredients, Green Thumb | Compound, Deep Roots, Old Growth, Greenhouse |
| **Heat** | Heat Lamp, Dinner Bell, Sous Chef, Ember Heart, Photosynthesis | Timer, Pressure Cooker, Clockwork, every Signature |
| **Shield** | Preserve, Spare Plate, Icebox, Glacier, Overflow | Ice Armour, Cold Storage, Table Set |
| **Threat** | Bulwark, Loud Voice, Picket Line, Serving Hatch | Hot Plate, Gatekeeper, Blizzard, The Wall |
| **Crit** | Pinch of Salt, Signature Strike, Chef’s Kiss, Toast | Steady Hands, Char, Butcher’s Block, Knife Work |
| **Execute · overkill** | Chop Chop, The Standard, Clean Sear, Field Notes | Chain Reaction, Cleaver, Avalanche, Precision |
| **Splash · knockback** | Splash Zone, Kick the Table, Second Helping, Big Pot | Powder Keg, Avalanche, Test Kitchen |
| **Ingredient · Leftover** | Forage, Waste Nothing, Snack, Champions | Full Basket, Hoarder, Finders Keepers, Night Market |
| **Mark (Analyse)** | Analyse, Second Opinion, Verdict | Proof, Bad Batch, Precision, Recall Notice |
| **Position** | Front Line, Back Line, Long Arms, Anchor, Change of Seat | Doorman, Sniper’s Nest, Floor Plan, Seating Plan |

### A.3 Five kinds of combo

| Kind | How it forms | Power | How the player sees it |
| --- | --- | --- | --- |
| **Click** | Two augments held by one cook (or one seat) that are written for each other. Both stay; a named bonus switches on. | About +50% on top of both cards. | The Prep screen chips an offer with “clicks with …” when you hold the other half. |
| **Table combo** | Two cooks whose cuts or augments talk: a class pair, a gem pair, a seat pair. It works for everyone at the table. | About +60% for the cooks in it; some reach the whole table. | Appears in the Special offer (HMD) or on the map card (OXP) when the table has both halves. |
| **Recipe** | Two held Pantry or seat augments fuse at your next window into one card and the slot comes back. | Two Epics in one slot, then a free slot. | The Recipe shows on the Prep screen as soon as one half is held. |
| **Menu** | Three named pieces, from any pools, on one cook or across the table. | Changes what the fight is. Each lists the day that breaks it. | The Menu card appears in the lobby with two of three held; the third is weighted into offers at 50%. |
| **House Combo** | Two Signatures of one class. The class is OP on its own with both. | A Click that only that class can make. | Printed on the class card from day one. |

### A.4 The power budget

| Tier | Power | Note |
| --- | --- | --- |
| **Common** | +25% of a cook’s output | A fresh midnight cook holds one of these and no combo: the six-hundred target. |
| **Rare** | +45% | Held again, a Common becomes Rare. |
| **Epic** | +80% | The ceiling for a single card except through Recipes. |
| **Click** | +50% on top of both halves | Most five-card evening builds run one or two. |
| **Table combo** | +60% for the cooks in it | One per table is normal; two is a strong evening. |
| **Recipe** | Two Epics and a free slot | Completes on the third or fourth pick. |
| **Menu** | Fight-changing | The clearing table runs one. The day can break it. |
| **Horde** | Courses III and IV +30% HP, +20% ATK over v1 | data/hmd.json carries the new units; the fresh target holds. |

The arithmetic against Design v2’s horde: a fresh midnight cook with one Common lands at six hundred kills; a five-card evening table with two combos doubles its damage and lands at 875; a table with a Menu online, nobody down and the right day reaches 999 about one time in forty.

### A.5 Offer rules

- **Composition** — HMD: one Pantry, one Facet, one Signature per window, always. OXP seats: two general, one gem.
- **Partners pull** — Entries that click with, fuse with or complete a Menu with something you hold are 50% more likely. Held augments reappear at 20% so a card can be tiered.
- **Chef’s choice** — By your fourth window at least one card on offer completes a Click you can make. Nothing else is guaranteed.
- **Tiering** — Taking a held augment again raises it one tier. Epic is the ceiling except through Recipes.
- **Rerolls** — One free reroll a day in HMD; Lucky Spoon adds more. In OXP a reroll costs 15 gauge; Pantry Key widens offers instead.
- **Missed windows** — They queue. A cook who opens the app at 20:00 picks four in a row at the tiers those windows had.
- **Table combos and Menus** — A Table combo takes one slot in the Special offer and is marked with both halves. A Menu card appears in the lobby once two of three are held.
- **Fairness** — Same tier pattern, same pools, same enemy roll for the whole city. The leaderboard compares choices, not luck of the hour.

### A.6 What we borrow

| Source | The idea | Where it lands |
| --- | --- | --- |
| **How Many Dudes** | Personal, family and universal relic pools; relics amplify what a unit already does. | Signatures, Facets and Pantry. The House Combos are the personal pool pushed to its end. |
| **Balatro** | Additive chips, multiplicative mult, and the joy of a chain that reads left to right. | Clicks and Menus are the mult. Cards add; combos multiply; the Prep screen reads like a hand. |
| **Hades** | Duo boons appear only when two gods are already in the run. | Table combos: offered only when the table has the pair, for everyone at it. |
| **Vampire Survivors** | Two held items evolve into one stronger thing and the recipe is shown once you hold half. | Recipes, shown from the first half, slot returned. |
| **Teamfight Tactics** | Augments at fixed stages, a daily tier pattern shared by every player, three-piece traits that go online. | Prep windows and OXP rows 1, 4, 7; the city’s shared pattern; Menus as the three-piece traits. |
| **Slay the Spire 1 and 2** | Boss relics with a price, rarity floors by where you found them, melting relics, act blessings. | Boss relics, node-weight floors, Leftover relics, Course blessings. |
| **Risk of Rain 2** | Stacking the same item is the upgrade path and the enemy curve rises to meet it. | Duplicates tier up; Courses III and IV are cut against a table with combos online. |