# Builds and tuning rules for the catalogue

> Rendered 7 October 2026 from the OraX design project (Table Wars Design v2 and Compendium v2). The numbers here are copies: the source of truth is `augments.json` → `builds`, `tuning` in `data/`. Change the JSON, not this prose; the prose carries the rules and the intent.

## Builds and tuning

Ten builds the catalogue is written to allow, each with the combo chain it runs on and the day that breaks it. None is the answer; all of them are the point.

### The wildfire kitchen

_HMD · Ruby Provider or Spark_

**Take.** Long Burn, Wildfire, Flash Point for the Inferno Menu; Slow Roast for the Inferno Click; Special Open Flame.

Burn becomes the horde’s own weapon: every death lights its neighbours at max stacks, and the cleave keeps the fire moving. The 999 that clears at 22:00 most often looks like this.

**Breaks on.** Fridge Open, Sommeliers.

### The wall

_HMD · Sapphire Rebel + Purist_

**Take.** Bulwark, Anchor, Cold Shoulder for Blizzard; Cast Iron + Hot Plate fusing to Cast-Iron Skin; Table combo The Wall.

Two immovable fronts that Freeze everything that touches them, with thorns doing the killing. Slow honest kills and a table that reaches Course IV with nobody down.

**Breaks on.** Blackout, Fire Alarm.

### The slow cooker

_HMD · Emerald Host + Gastronaut_

**Take.** Compound, Green Thumb, Harvest for the Garden Menu; Share the Find, Full Basket; Table combo Picnic.

Nothing happens for two hundred kills, then every Ingredient is a heal and every heal is a permanent stat. The table that is stronger at 2:30 than it was at the bell.

**Breaks on.** Stale.

### Precision

_HMD · Ruby Foodsmith + Taster_

**Take.** Encore + Sharp Plating for Knife Work; Proof, Second Opinion, Table combo Precision for the Critic’s Menu.

Marked enemies take +150% and every chained crit executes and jumps the mark. The Taster points, the Foodsmith finishes; Champions last four seconds.

**Breaks on.** The Ghost of the Old Master, Double Booking.

### The butcher

_HMD · any class, Pantry only_

**Take.** Chop Chop, Chain Reaction, Steady Hands for the Butcher’s Menu; Splash Zone for Cleaver; Pinch of Salt.

The build for a cook who never saw a good Facet: crits execute half the field and carry three times over. Proof that the universal pool is a build on its own.

**Breaks on.** Heavy Cream, Health Inspection.

### Mono red

_OXP · three Ruby seats_

**Take.** Red Hand, Kindling, Fury on the seats; Kindling + Long Burn for Inferno on seat 1; Salt Cellar, Family Recipe for House Colours; Poison Ring after the Judge.

R R R every turn at +25% mono, Sear permanent, no Trinity so Counter is paid in full: Anchor and Cast Iron on seat 2 keep the Nerve alive. Routes around Ashen.

**Breaks on.** Ashen nodes, Regenerating.

### Trinity tempo

_OXP · one of each gem_

**Take.** Opener, Closer for Bookends; Trinity Ring, Dinner Bell, Chef’s Whistle for the Trinity Menu; Round Table.

Every Trinity buys two turns, skips Counter, refunds its token and keeps its buffs. The table that never sees the Colossus attack.

**Breaks on.** Shell, Sticky, Blind Tasting.

### The ward

_OXP · two Sapphire, one Emerald_

**Take.** Deep Ward + Ice Armour for Glacier Wall; Frost Wall; Regrowth on the Emerald for Cold Storage; Sous Vide after the Judge.

Counter never reaches Nerve, blue buffs run long, and the Emerald’s kills refill everything. Scores on lives kept.

**Breaks on.** Rot, Greedy.

### The scorekeeper

_OXP · any table_

**Take.** Tip Jar, Michelin Star, Coin Purse for the Score Menu; Mise en Place + Opener for First Course on seat 1; Quick Fingers.

The run that aims at the board, not the Colossus: every Starter monster dies on turn one for triple points, and the Elites are taken on purpose.

**Breaks on.** Thick-skinned, Hardened.

### Char siu

_OXP · two Emerald, one Ruby_

**Take.** Kindling on the Ruby, Harvest on an Emerald for Char Siu; Compound + Overgrowth for Old Growth; Full Course.

Every Sear tick is a Grow stack and every stack regenerates Nerve. Weak in row one, absurd by row eight.

**Breaks on.** Glutton, a short map.

### Tuning rules for the catalogue

- **Everything swings** — Common ≈ +25% of a cook’s output, Rare +45%, Epic +80%. A Click adds about half again on top of both halves; a Table combo about +60% for the cooks in it; a Recipe is two Epics and a free slot; a Menu changes the fight.
- **Combos are telegraphed** — Partners pull at 50%; by the fourth window at least one card completes a Click you can make; Menus show at two of three.
- **The horde absorbs it** — Courses III and IV carry +30% HP and +20% ATK over v1 in data/hmd.json; OXP monster HP follows the TTK targets, so OXP absorbs the catalogue automatically. The fresh midnight target stays six hundred.
- **The calendar is the nerf** — Every Menu lists the day that breaks it. The harness checks that every augment is top-quartile on some daily roll and bottom-quartile on another; a card that is never bottom-quartile is the one to look at.
- **No combos is a bug** — Any five-augment build with no Click, Table combo or Recipe is flagged; fewer than 5% of evening builds should land there.
- **Take-rate bands** — 15–60% when offered. Flag above 75% or below 8%. Wide on purpose: a card people love is not a problem.
- **One number each** — An augment still changes one thing so a hand reads cleanly; the multiplication lives in the combos, where it is named.
- **Voice** — Sentence case, full stops, the real × and ·, no exclamation marks, and every name is something you could find in a kitchen.

**Kept in sync** — data/hmd.json now carries Courses III and IV at +30% HP and +20% ATK (average HP 95 and 170, ATK 24 and 36; horde total 90,000); Design v2’s horde paragraph and Decided list read the new numbers. The retired Service bar is gone from every card: Tip Jar scores Champions, Street Stall adds skewers, Last Word fires the Signature three times. OXP needs no data change: monster HP follows the TTK targets, so the harness absorbs the catalogue there on its own.