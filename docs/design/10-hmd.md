# HMD — the last stand, three minutes

> Rendered 7 October 2026 from the OraX design project (Table Wars Design v2 and Compendium v2). The numbers here are copies: the source of truth is `hmd.json` and `classes.json` in `data/`. Change the JSON, not this prose; the prose carries the rules and the intent.

## HMD — three minutes

Five cooks, one bell, three minutes. A horde of 999 pours in from the right and does not stop. Your score is how many you cut down before the end, and the end is either the clock at 0:00 or the fifth cook falling. Then the table rises: everyone stands, five Signatures fire together, and the field is finished. It looks like a victory every time, because it is one; it just is not scored. Clearing all 999 before the end is the Clean Plate, worth half again, and the achievement of the day.

Everything that shapes the fight is decided before the bell: four permanent augments picked through the day, the Special picked as the horde lines up, the formation, the orders. During the fight the only hand on the wheel is an order change by tap, once every fifteen seconds.

### 3.1 The fight

- **Clock and end** — 3:00 on every phone. The fight ends at 0:00 or when the fifth cook falls, whichever comes first. A downed cook stays down until Rise; Guests and Scraps are not cooks.
- **Rise** — At the end every cook rises, five Signatures fire together, and everything on the field and in the queue is finished. The results screen shows these as Finished, in grey, under the score.
- **Score** — Kills before the end. A Champion counts ten. 999 before the end is a Clean Plate: score ×1.5. Daily Table ranks the party’s best of the day; a personal board ranks each cook’s own kills; Free Table runs on a fresh seed and does not rank.
- **Arena and formation** — Side-on, 960×600. Five slots: three front, two back. Front takes +10% ARM and is reached first; the back is reached only by ranged enemies and leapers. Up to 400 enemies stand on the field; the rest queue.
- **Orders** — Nearest, Weakest, Strongest or Protect (stay beside the most-damaged ally). Set before the bell; change by tap with a 15 s cooldown. Silent Service locks them.
- **Threat and the surround cap** — Enemies pick targets by threat: Sapphire ×2, Emerald healing ×1.5, everyone else ×1. At most four melee enemies strike one cook at a time; the rest queue behind. Ranged enemies are limited only by line of sight.

Simulation is fixed-step and seeded; all five phones play the identical battle and only pre-bell choices and order taps travel. Damage is ATK × multiplier, armour a flat percentage, crits ×1.5 at 5%. Enemies swing once a second in melee, 0.7 a second at range.

**A textbook table · one of each role, two Strikers**

**Front**
- ClassCard · provider · slot 1 · Guardian · Warden · gem sapphire · FRONT · PROTECT
- ClassCard · purist · slot 2 · Duelist · Striker · gem ruby · FRONT · NEAREST
- ClassCard · rebel · slot 3 · Disruptor · Mender · gem emerald · FRONT · WEAKEST
**Back**
- ClassCard · taster · slot 4 · Analyst · Striker · gem ruby · BACK · STRONGEST
- ClassCard · host · slot 5 · Coordinator · Mender · gem emerald · BACK · PROTECT

Footers show the slot and the order. This table’s crowd DPS before augments is about 165 a second; with Signatures and the Taster’s mark, about 235. That number is the budget the horde below is cut against.

### 3.2 The horde, cut to the budget

The Unruly Buffet comes in four Courses of 250 kills each, and the Courses are where the day’s difficulty lives. A fresh table at midnight carries one augment and about 190 usable damage a second after overkill and travel; in three minutes that is 34,000 damage, which buys all of Course I, all of Course II and a hundred kills into Course III. A full evening table carries five augments, usually two combos, and about 2× the damage: Course IV. The clear needs 2.6× a fresh table, a Menu online and no one down, which is what makes it rare.

- **Course I** — **Amuse-bouche** · Kills 0–249 · **Pour** — 6/s · **Avg HP** — 40 · **Avg ATK** — 6
- **Course II** — **Starter** · Kills 250–499 · **Pour** — 7/s · **Avg HP** — 55 · **Avg ATK** — 12
- **Course III** — **Main** · Kills 500–749 · **Pour** — 8/s · **Avg HP** — 95 · **Avg ATK** — 24
- **Course IV** — **Dessert** · Kills 750–999 · **Pour** — 9/s · **Avg HP** — 170 · **Avg ATK** — 36

| Course | Unit | HP | ATK | Share | Behaviour |
| --- | --- | --- | --- | --- | --- |
| I · Amuse-bouche | **Cupcake** | 35 | 6 | 50% | The bulk of the first Course. swarm, melee. |
| I · Amuse-bouche | **Weevil** | 20 | 4 | 20% | Packs of six; goes for the back row if it can. swarm, melee. |
| I · Amuse-bouche | **Mould Blob** | 90 | 8 | 10% | Splits into two Spores (15 HP) on death. Spores count as kills. slow, melee. |
| I · Amuse-bouche | **Salt Sprite** | 45 | 7 | 20% | Thrower; holds position. standard, mid. |

| Course | Unit | HP | ATK | Share | Behaviour |
| --- | --- | --- | --- | --- | --- |
| II · Starter | **Line Cook** | 55 | 12 | 45% | The rival table’s rank and file. standard, melee. |
| II · Starter | **Saucier** | 45 | 10 | 20% | Hits apply Burn ×1. standard, long. |
| II · Starter | **Pastry Golem** | 120 | 18 | 10% | 20% ARM; a wall that hides the Sauciers. slow, melee. |
| II · Starter | **Dish Pig** | 45 | 11 | 25% | Leaper: lands in the back row and stays there. standard, melee. |

| Course | Unit | HP | ATK | Share | Behaviour |
| --- | --- | --- | --- | --- | --- |
| III · Main | **Grease Wraith** | 100 | 24 | 35% | Lifesteal 30%; the Course that punishes thin healing. standard, melee. |
| III · Main | **Cursed Cutlery** | 32 | 14 | 30% | Packs of eight; chip damage adds up. swarm, melee. |
| III · Main | **Oven Golem** | 320 | 34 | 10% | 30% ARM; hits apply Burn ×1. slow, melee. |
| III · Main | **Steam Wisp** | 75 | 0 | 25% | No damage; Chills ×1 whoever it hits. standard, long. |

| Course | Unit | HP | ATK | Share | Behaviour |
| --- | --- | --- | --- | --- | --- |
| IV · Dessert | **Assistant** | 155 | 36 | 40% | Standard melee, in numbers. standard, melee. |
| IV · Dessert | **Food Photographer** | 120 | 12 | 15% | Marks a cook: every enemy targets them for 4 s. standard, long. |
| IV · Dessert | **Sommelier** | 210 | 34 | 25% | Each hit strips one buff or shield. standard, mid. |
| IV · Dessert | **Plate Spinner** | 195 | 31 | 20% | Reflects 10% of melee damage taken. swarm, melee. |

Shares are the mix within the Course and are set so each Course’s weighted HP lands on its average. The whole horde is 90,000 HP (10,000 · 13,750 · 23,750 · 42,500), thickened in Courses III and IV so the Compendium v2 catalogue has something to be OP against, and is fully poured by 2:16, so a clear is kill-limited, never pour-limited. The next Course starts pouring at its kill milestone; a stalled table stays in its Course with the field full.

**Champions · one every 100 kills · HP by slot, identity shuffled daily, the Critic always at 900**

- **100 kills** — 500
- **200 kills** — 625
- **300 kills** — 750
- **400 kills** — 875
- **500 kills** — 1000
- **600 kills** — 1125
- **700 kills** — 1250
- **800 kills** — 1375
- **900 kills** — 2000

|  |  |  |
| --- | --- | --- |
| **Giant Weevil** | 10% | Charges the nearest cook and knocks it back a tile. |
| **The Dishwasher** | 20% | Pulls a back-row cook one tile forward every 8 s. |
| **Pastry Titan** | 30% | Slow and huge; every hit on it splashes 20% to adjacent cooks. |
| **Soup Kraken** | 10% | Three tentacles (a quarter of its HP each) count as separate kills; the body is untargetable until they are gone. |
| **Grease Elemental** | 10% | Lifesteal aura: enemies within a tile heal 20% of their damage. |
| **Cutlery Hydra** | 20% | Spawns two Cursed Cutlery every time it takes a crit. |
| **Ghost of the Old Master** | 0% | Untargetable for 2 s every 10 s; hits Chill ×1. |
| **The Health Inspector** | 20% | Issues a citation: one random augment on one cook switches off for 10 s. |
| **The Critic** | 40% | One of three moods. Bitter: hits strip Heat. Sour: heals the horde 5% on entry. Sweet: takes −30% until every other enemy on the field is dead. |

A Champion scores ten and showers five Ingredients. The column is ARM. Setting HP by slot rather than identity keeps the daily shuffle fair: whichever Champion arrives at 800 kills is a 1,375-HP problem.

### 3.3 Today’s Service

At midnight the kitchen rolls three conditions, one per tier, and shows them on the lobby card all day with the Bin’s line under them. Nobody picks them. Tier I is on from the bell, Tier II switches on at 500 kills with Course III, Tier III at 750 with Course IV; so a fresh table meets two of the three and the evening table meets them all. Pairs that would make a clear impossible are never rolled together: Stale with Grease Fire, Closing Time with Rush Hour or Late Delivery, Double Booking with Tasting Menu.

| Tier | Condition | Effect |
| --- | --- | --- |
| I | **Rush Hour** | Pour rate +50%; enemies −20% HP. |
| I | **Fridge Open** | Everything on the field is Chilled ×1, cooks included. |
| I | **Leftover Night** | Fifty extra Cupcakes queue up; each scores 2. |
| I | **Sticky Floor** | Everyone moves 15% slower. |
| I | **Heavy Cream** | Enemies +25% HP, −10% SPD. |
| I | **Late Delivery** | Every Course pours one a second faster. |
| II | **Grease Fire** | The floor burns everyone 1% per second, both sides. |
| II | **Spice Storm** | All damage +30%, both sides. |
| II | **Blackout** | The back row is targetable by melee. |
| II | **Power Cut** | No Heat from time. |
| II | **Sharp Knives** | Enemies +20% ATK. |
| II | **Tasting Menu** | Signatures cost 70 Heat; every cast brings the next Champion 5 kills early. |
| III | **Stale** | Healing is halved. |
| III | **Silent Service** | Orders lock at the bell. |
| III | **Double Booking** | Two Champions per milestone. |
| III | **Health Inspection** | Cooks below 50% HP deal −10%. |
| III | **Fire Alarm** | At 1:00 and 2:00 every unit on the field is knocked back a tile. |
| III | **Closing Time** | Course IV pours at 12 a second. |

### 3.4 Augments · four permanent, one Special

Each Prep window offers three cards: a **Pantry** stat anyone can take, a **Facet** of your gem and a **Signature** of your class. Take one; it locks for the day. A held augment can be offered again and tiers up, Common to Rare to Epic at about ×1.7 a tier, and held augments are weighted to reappear so a build can be pushed rather than sprayed. Before the bell, one **Special** of three for the fight only, four in Leftovers hour. A cook at midnight carries one augment into the fight; at 18:00, five.

**Pantry** — 36 · **Facets · per gem** — 10 · **Signatures · per class** — 6 · **Specials** — 16 · **Pairings** — 16 · **Recipes** — 12

The full catalogue, with Common / Rare / Epic values, Pairings and Recipes, is Compendium v2 Part C, which also carries the Clicks, House Combos and Menus the budget above assumes.

### 3.5 What the harness must see

Your targets, adjusted where fun argued with them. A clear at one in fifty would be seen on a city’s wall only some nights; one in forty, with a band down to fifty, means a Clean Plate appears most evenings in both cities and stays a story when it does. Half the full-loadout tables losing a cook keeps Rise meaningful without making it the usual ending. The fresh target of six hundred puts every midnight table into Course III, where it meets the day’s second condition and learns what the evening is for.

| Metric | Target | Band |
| --- | --- | --- |
| Fresh table kills (one augment, first fight) | **600** | 550–650 |
| Full-loadout median kills (five augments) | **875** | 850–900 |
| Clean Plate rate, full loadout | **1 in 40** | 1 in 30–50 |
| Time of a clear | **2:50** | 2:40–3:00 |
| Course reached by a fresh table | **III** | by 1:30–1:50 |
| Full-loadout fights with a cook down before the end | **50%** | 40–60% |
| Full-loadout fights with three or more down | **<10%** | — |
| Signature cadence | **8 s** | 7–9 s |
| Class × gem kill share against the median | **0** | ±15% |
| Augment take-rate when offered | **40%** | 25–55%; flag above 60% |