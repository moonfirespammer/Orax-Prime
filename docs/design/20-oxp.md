# OXP — the gauntlet

> Rendered 7 October 2026 from the OraX design project (Table Wars Design v2 and Compendium v2). The numbers here are copies: the source of truth is `oxp.json` and `classes.json` (gems → oxp kits) in `data/`. Change the JSON, not this prose; the prose carries the rules and the intent.

## OXP — the gauntlet

Three seats, ten rows, one monster a row on a branching daily map. Each seat commits one colour a turn; the three colours in seat order form one of twenty-seven combos, and the colour count decides the maths. The engine in the oxp/ build stays exactly as its mechanics compendium documents it. Academy mode is retired; the Daily Gauntlet is the game. Two lives, for the run.

### 4.1 Your gem is your kit

The colour a seat brings is the colour of its gem; the engine’s Fighter, Rogue and Mage are now the three hands. Your class is what you look like when you strike, and nothing more. Three seats of one gem +8%, one of each +4%. A second or third seat of one gem deepens the one passive a step; copies never stack. A mono table gets the deep passive and the bonus but can never form a Trinity, so it pays Counter in full. That is the trade.

| Gem | Hand | Limit Breaker · 1 token, once a round | Passive · deepens with a second and third seat |
| --- | --- | --- | --- |
|  | **Ruby** · **R R G** | **Bloodlust.** The next combo deals ×2. | **Sear.** Every combo leaves a Burn on the monster worth 15% of the damage dealt, paid at the start of the next turn and ignoring Defense. A second Ruby seat makes it 20%, a third 25%. |
|  | **Sapphire** · **B B R** | **Prismatic Shift.** ×1.5, and the seat may recolour the action it committed after seeing the others. | **Ward.** The party starts every encounter with a Ward of 30 over its Nerve; Counter hits the Ward first, and every kill refreshes it. A second Sapphire seat makes it 45, a third 60. |
|  | **Emerald** · **G G B** | **Exploit.** ×1.5, ignores all Defense, and the seat may swap position for the turn. | **Second Helping.** Every kill restores Nerve in full instead of +30 and grants a Grow stack: +2% damage for the rest of the run, max ten. A second Emerald seat makes stacks +3%, a third +4%. |

**A trinity table · seat order 1 → 2 → 3**

- ClassCard · foodsmith · slot 1 · Striker · gem ruby · R R G · LIMIT ×2
- ClassCard · gastronaut · slot 2 · Mender · gem emerald · G G B · LIMIT ×1.5
- ClassCard · stirrer · slot 3 · Warden · gem sapphire · B B R · LIMIT ×1.5

### 4.2 The Daily Gauntlet map

Rolled once at midnight for everyone. Ten rows; rows 1–4 and 6–9 hold three nodes, rows 5 and 10 hold the two bosses, the same two every day. Every node is a fight. A node card shows the monster, its modifiers as chips, its attack timer, its reward tier and the Bin’s line; the trio votes the next node, majority, tie to seat 1 rotating. The whole map is visible from the lobby, so a table plans its path around its hands before the first commit.

**Generation**
- Each node connects to one or two nodes in the next row; every node is reachable; at least two full paths share no node outside the boss rows.
- Rows 1–4 draw from the Starter pool, rows 6–9 from the Main pool; no monster twice on one map.
- Every row has one safe node (modifier weight ≤ 1) and one hot node (weight ≥ 3).
- Exactly one Elite in rows 2–4 and one in rows 7–9: +30% HP, two modifiers, relic floor Rare.
- **Reward tier and the vote** — Points × (1 + 0.15 × total modifier weight). Relic floor: weight 0–2 Common, 3–4 Rare, 5+ Epic. After every fight the trio votes one relic of three (four in Leftovers hour or after an Elite), Nerve refills, hands refill. A lost life restarts the encounter, not the map.

**Augment layers · the catalogue is Compendium Part E**

|  |  |  |  |
| --- | --- | --- | --- |
| **Seat augments** | Rows 1, 4 and 7 | Each seat picks one of three, private to the seat: 24 general, 8 per gem. Two held seat augments fuse into a Recipe at the next row. | Compendium E.1, E.2, E.6 |
| **Party relics** | After every fight | The trio votes one of three. 38 relics plus 8 Boss relics; one rarity each, never tiered. | Compendium E.3 |
| **Course blessings** | Rows 1 and 6 | One of two framing rules for the half of the map ahead. | Compendium E.4 |
| **Leftover relics** | Leftovers hour and after any Elite | A fourth option, stronger than Epic, that melts after a set number of fights. | Compendium E.5 |
| **Class signatures** | Never | Compendium E.7 stays off. Class is cosmetic in OXP. | Compendium E.7 |

### 4.3 The pool of twenty, by turns to kill

Eighteen regular monsters, nine per pool, plus the two fixed bosses and the Critic. OXP’s budget is time, not HP: each row has a target in **turns to kill** at the party’s expected combo damage for that row, rows 1–2 at two turns up to the Colossus at six and the Critic at seven. HP values are the engine’s scale from v1; the harness moves them to hit TTK, never the reverse. Weakness pays ×1.25 to a combo whose majority colour matches, resistance ×0.80; a Trinity has no majority and is never tested.

**Starter pool · rows 1–4**

| Monster | HP | Def | Abilities · pets | TTK | Atk in | Points | Weak · resists |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **Gingerbread Sentry** | 200 | 10% | — | **2** | 3 | 100 | R · — |
| **Meringue Moth** | 150 | 10% | Summon: Cake 1 HP (tutorial) | **2** | 2 | 150 | B · — |
| **Popcorn Swarm** new | 180 | 0% | Summon: 3 × Kernel 30 | **2** | 3 | 150 | R · — |
| **Jam Slime** new | 260 | 0% | Split: at 50% HP spawns Jelly Blob 80 | **3** | 3 | 175 | G · — |
| **Onion Wailer** new | 300 | 10% | Sour | **3** | 3 | 200 | B · R |
| **Boba Blob** new | 320 | 20% | Regen 30 | **3** | 3 | 200 | G · B |
| **Croissant Crab** new | 350 | 30% | Brittle | **3** | 2 | 225 | R · G |
| **Sourdough Ghoul** | 400 | 20% | — | **3** | 3 | 200 | G · R |
| **Roast Drumstick Hound** | 500 | 30% | — | **3** | 3 | 250 | R · B |

**Main pool · rows 6–9**

| Monster | HP | Def | Abilities · pets | TTK | Atk in | Points | Weak · resists |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **Scalding Steam Wraith** | 600 | 40% | Counter 10 | **3** | 3 | 300 | B · G |
| **Cast-Iron Skillet Knight** | 700 | 10% | Counter 10 | **3** | 2 | 350 | G · — |
| **Fondue Hydra** new | 780 | 0% | Summon: 2 × Cheese Head 120 · Glutton | **3** | 3 | 375 | R · B |
| **Sausage-Link Serpent** | 800 | 10% | Counter 10 · Summon: Meatball 100 | **4** | 3 | 400 | B · R |
| **Kimchi Kraken** new | 820 | 20% | Shifting palate · Rot 5 | **4** | 3 | 400 | rotates · — |
| **Pressure-Cooker Golem** new | 850 | 30% | Counter 10 · Vent | **4** | 3 | 425 | G · R |
| **Twin Chili Fangs** | 900 | 10% | Summon: Chili Flake 100 | **4** | 2 | 450 | R · G |
| **Durian Warden** new | 900 | 40% | Shell | **4** | 3 | 450 | B · R |
| **Wagyu Minotaur** new | 1000 | 20% | Enrage · Sticky | **4** | 3 | 475 | G · B |

**Bosses · fixed · and the secret row**

| Monster | HP | Def | Abilities · pets | TTK | Atk in | Points | Weak · resists |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **The Blind Judge of the Palate** row 5 | 950 | 50% | Summon: Salt Block Guardian 100 · Enrage | **5** | 3 | 500 | G · B |
| **The Burnt Caramel Colossus** row 10 | 1250 | 60% | Counter 10 · Summon: 2 × Toffee Golem 300 · Enrage | **6** | 3 | 600 | — · — |
| **The Critic** secret · row 11 | 1500 | 30% | Counter 10 · Summon: Assistant 200 · Mood | **7** | 3 | 1200 | least-used · most-used |

**Abilities**

|  |  |
| --- | --- |
| **Defense** | Reduces damage by its percentage unless armour is ignored. |
| **Counter N** | Each striking seat drains N Nerve every turn the monster is attacked; a Trinity’s Round Delay staggers it for the turn. |
| **Summon** | Pets spawn at the start of the encounter. Single-target combos hit pets first; AOE hits everything. |
| **Enrage** | At or below 30% HP: +20% damage and the attack timer drops one step at once (min 1). Decided in v2. |
| **Regen N** | Heals N at the end of every turn it survives. |
| **Split** | At 50% HP, spawns the named pet once. |
| **Sour** | Gauge gains are halved while it lives. |
| **Brittle** | Defense drops 10% every time it is hit, to a floor of 0. |
| **Glutton** | Below 50% HP it eats a living pet to heal 150. |
| **Shifting palate** | Weakness rotates R → G → B at the end of every turn. |
| **Rot N** | The party loses N Nerve at the end of every turn it survives. |
| **Vent** | Every second turn its Counter is 20 instead of 10. |
| **Shell** | Single-target combos deal −50%. |
| **Sticky** | The party’s buffs and armour breaks last one turn. |
| **Mood** | Bitter: Counter 20. Sour: gauge halved. Sweet: Regen 60. Rolled when the Critic appears. |
| **Weakness · resist** | ×1.25 to a combo whose majority colour matches the weakness, ×0.80 against the resist; a Trinity has no majority and is never tested. |

### 4.4 Node modifiers

Rolled onto nodes at midnight and fixed. Each has a weight, and the weight sets the node’s reward tier. The colour modifiers, Ashen, Frosted, Bitter and Shifting, are what make paths matter: a mono-Ruby table routes around Ashen the way a Spire deck routes around an elite it cannot beat, and the map guarantees it always can.

| Modifier | Weight | Effect |
| --- | --- | --- |
| **Hardened** | 1 | Defense +15%. |
| **Thick-skinned** | 1 | HP +25%. |
| **Crowded** | 1 | One more pet, 100 HP. |
| **Shifting** | 1 | Weakness rotates each turn. |
| **Hasty** | 2 | Attack timer −1, min 2. |
| **Spiteful** | 2 | Counter +5; Counter 5 if it had none. |
| **Sour** | 2 | Gauge gains −50%. |
| **Sticky** | 2 | Buffs and breaks last one turn. |
| **Ashen** | 2 | Also resists Ruby. |
| **Frosted** | 2 | Also resists Sapphire. |
| **Bitter** | 2 | Also resists Emerald. |
| **Short Fuse** | 2 | Enrages at 50% HP. |
| **Regenerating** | 2 | Regen 40. |
| **Silent Service** | 2 | The turn clock is 15 s. |
| **Blind Tasting** | 3 | The combo preview line is hidden; the table commits blind. |
| **Greedy** | 3 | Steals 10 gauge every turn it survives. |

### 4.5 Relics · party-wide, voted, run-only

Relics are the table’s build. Three at a time after every fight with a rarity floor set by the node just cleared; one rarity each, never tiered. The brief for every relic: change what a good turn looks like, not just the numbers, and let at least one card in every offer talk to a colour, a hand or a passive. Boss relics are the strongest things in the game and every one costs something.

**Common**

|  |  |
| --- | --- |
| **Salt Cellar** | Pure-colour combos deal +10%. |
| **Sharpening Stone** | Single-target combos deal +8%. |
| **Big Ladle** | AOE combos deal +8%. |
| **Warm Bread** | Start every encounter with +10 gauge. |
| **Mise en Place** | The first combo of every encounter deals +20%. |
| **Tip Jar** | A kill on turn 1 pays +50 points. |
| **Cast Iron** | Counter drains 5 less per seat. |
| **Order Pad** | The turn clock is 40 s. |
| **Spice Rack** | Weakness pays ×1.35 instead of ×1.25. |
| **Second Plate** | Buffs and breaks from mixed combos last three turns. |
| **Wet Towel** | Monsters never Enrage. |
| **Egg Timer** | Attack timers start one higher, cap 3. |

**Rare**

|  |  |
| --- | --- |
| **Trinity Ring** | Trinity combos deal +30%. |
| **Loaded Dice** | Hold up to three Limit Tokens. |
| **Family Recipe** | The mono-gem bonus is +15% instead of +8%. |
| **Pantry Key** | Four relics offered after every fight instead of three. |
| **Doggy Bag** | Overkill on a pet spills onto the monster. |
| **Bell Jar** | The first Nerve break of the run costs no life. |
| **Ember Jar** | Sear at 10% even without a Ruby seat; a Ruby seat’s Sear is +5%. |
| **Prism Lens** | Any seat may recolour once per encounter. |
| **Whetstone** | Every combo ignores +25% Defense. |
| **Sommelier’s Nose** | Weakness and resist are shown for the next two rows of the map before you choose. |

**Epic**

|  |  |
| --- | --- |
| **Head Chef’s Hat** | Two Limit Breakers per round instead of one. |
| **Golden Whisk** | Gauge gains +50%. |
| **Dinner Bell** | Trinity’s Round Delay adds two turns instead of one. |
| **Full Course** | Every kill grants Grow +3% run damage; stacks with Second Helping. |
| **Grease Trap** | Counter damage is reflected: the monster takes 50 for every seat it drains. |
| **Chef’s Table** | Bosses take +20%. |

**Boss relics · after rows 5 and 10 · power with a price**

|  |  |
| --- | --- |
| **Poison Ring** | All combos +25%. Nerve maximum is 70. |
| **Overtime** | The turn clock is 60 s and every attack timer is one higher. Points −20%. |
| **All You Can Eat** | Two relics after every fight. Lives are reduced to one. |
| **Blind Tasting** | Combos deal +35%. The combo preview is hidden for the rest of the run. |
| **Sous Vide** | Monsters never Enrage and Counter is halved. Gauge gains −30%. |
| **Clean Plate** | Kills restore Nerve fully and pay +20 gauge. Limit Tokens cannot be banked past the round they are minted. |

### 4.6 Score, the Critic, and the harness

**Score.** Each monster pays its points × the node’s reward tier, +50% if it died on turn 1 and +25% on turn 2. Lives left at the end pay 200 each. The Daily Gauntlet board ranks tables by score; Free Table runs on a fresh seed and does not rank.

**The Critic.** A table that clears row 10 with both lives and at least one Limit Token banked sees an eleventh row: the Critic, alone. It resists the colour the table committed most that run and is weak to the colour it committed least, so the fight asks the table to play against its own habit. Points doubled, drops nothing. It exists so a perfect run has somewhere to go, and the harness keeps its door at about one table in fifty.

| Metric | Target | Band |
| --- | --- | --- |
| Full clear, both bosses down | **1 in 6** | 1 in 5–8 |
| Median run ends at | **row 8–9** | — |
| Runs ending before row 5 | **<10%** | — |
| Tables that see the Critic | **1 in 50** | 1 in 40–60 |
| TTK against the row target | **0** | ±1 turn |
| Nerve lost per fight · Starter / Main / boss | **≤20 / ≤35 / ≤45** | — |
| Relic take-rate per offer slot | **33%** | 15–45% |
| Hot node chosen | **40% of rows** | 30–50% |

One in six clears, with a median run ending at row eight or nine, is the Spire’s own shape: most runs end late enough to have been a run. Fewer than one in ten should end before the first boss; if more do, the Starter pool is too hard, not the players.