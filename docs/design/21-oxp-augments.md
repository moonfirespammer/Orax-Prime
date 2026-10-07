# OXP — abilities, seat augments, relics and combos

> Rendered 7 October 2026 from the OraX design project (Table Wars Design v2 and Compendium v2). The numbers here are copies: the source of truth is `augments.json` → `oxp`, and `classes.json` in `data/`. Change the JSON, not this prose; the prose carries the rules and the intent. The engine in oxp/MECHANICS.md is unchanged; this is the layer on top.

## OXP abilities · three gem kits, ten combo groups

A seat’s gem is its whole kit: the hand of three colours it commits from, the Limit Breaker one token buys, and one passive that deepens when a second or third seat brings the same gem. Class is cosmetic. The engine is unchanged; the catalogue in Part E is what moved.

|  |  |  |  |
| --- | --- | --- | --- |
|  | **Ruby** · **R R G** | **Bloodlust.** The next combo deals ×2. | **Sear.** Every combo leaves a Burn on the monster worth 15% of the damage dealt, paid at the start of the next turn and ignoring Defense. A second Ruby seat makes it 20%, a third 25%. |
|  | **Sapphire** · **B B R** | **Prismatic Shift.** ×1.5, and the seat may recolour the action it committed after seeing the others. | **Ward.** The party starts every encounter with a Ward of 30 over its Nerve; Counter hits the Ward first, and every kill refreshes it. A second Sapphire seat makes it 45, a third 60. |
|  | **Emerald** · **G G B** | **Exploit.** ×1.5, ignores all Defense, and the seat may swap position for the turn. | **Second Helping.** Every kill restores Nerve in full instead of +30 and grants a Grow stack: +2% damage for the rest of the run, max ten. A second Emerald seat makes stacks +3%, a third +4%. |

**The ten combo groups · base damage, mode, armour ignore, team buff**

|  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- |
| **R R R** | 360 | single | AI — | Buff — | Maximum damage. |
| **G G G** | 240 | single | AI 100% | Buff — | Maximum armour pierce. |
| **B B B** | 180 | AOE | AI — | Buff 65% | Maximum buff. |
| **2R + 1G** | 300 | single | AI 50% | Buff — |  |
| **2R + 1B** | 260 | AOE | AI — | Buff 30% |  |
| **2G + 1R** | 260 | single | AI 75% | Buff — |  |
| **2G + 1B** | 200 | AOE | AI 75% | Buff 30% |  |
| **2B + 1R** | 220 | AOE | AI — | Buff 45% |  |
| **2B + 1G** | 180 | AOE | AI 50% | Buff 45% |  |
| **R + G + B** | 240 | AOE | AI 50% | Buff 30% | Trinity: Round Delay, staggers Counter, one-turn buffs. |

## OXP augments and combos

Two layers, one private and one shared. **Seat augments** are yours: at rows 1, 4 and 7 each seat picks one of three, unseen by the others. **Party relics** are the table’s: voted after every fight. Combos cross both: a Click on your own seat, a Table combo between two seats, a Recipe that fuses, a Menu of three relics. Class signatures from v1 (E.7) are gone: class is cosmetic in OXP.

### E.1 Seat augments · general · 24

| Augment | Common / Rare / Epic | Tags |
| --- | --- | --- |
| **Opener** | In seat 1: combos +25 / 45 / 80%. | position |
| **Anchor** | In seat 2: Counter drains you 8 / 14 / 25 less. | position · nerve |
| **Closer** | In seat 3: +12 / 20 / 35 gauge per combo. | position · gauge |
| **Sharpening Stone** | Single-target combos +25 / 45 / 80%. | damage |
| **Big Ladle** | AOE combos +25 / 45 / 80%. | damage |
| **Warm Bread** | +25 / 45 / 80 gauge at every encounter start. | gauge |
| **Mise en Place** | The first combo of each encounter +60 / 100 / 160%. | damage |
| **Cast Iron** | Counter drains you 8 / 14 less. Epic: Counter restores 5 Nerve instead. | nerve |
| **Order Pad** | +15 / 30 / 60 s on the clock. | tempo |
| **Spice Rack** | Weakness pays ×1.5 / 1.75 / 2 when your colour is the majority. | colour |
| **Second Plate** | Buffs from combos you are in last +2 / +3 turns. Epic: breaks too. | tempo |
| **Egg Timer** | Attack timers start +1 / +2. Epic: cap 5. | tempo |
| **Tip Jar** | A kill on turn 1 pays +100 / 200 / 400 points. | score |
| **Steady Hand** | Your Limit Breaker’s multiplier +0.5 / 1 / 2. | damage |
| **Loaded Dice** | Token cap +1 / 2 / 3. | gauge |
| **Wet Towel** | Monsters Enrage at 15 / 5% HP. Epic: never. | control |
| **Whetstone** | Your combos ignore +30 / 50 / 80% Defense. | damage |
| **Pantry Key** | Your offers show 4 / 5 / 6 options and Epic adds a free reroll. | economy |
| **Doggy Bag** | Overkill on a pet spills 100 / 150 / 250% onto the monster. | damage |
| **Bell Jar** | The first Nerve break costs no life. Rare: the first two. Epic: and Nerve refills. | nerve |
| **Momentum** | Each consecutive turn with the same majority colour: +10 / 18 / 30%, to three stacks. | colour |
| **Variety** | A combo whose majority differs from the last: +25 / 45 / 80%. | colour |
| **Quick Fingers** | Commit within 10 s: +15 / 25 / 40%. | tempo |
| **Last Word** | Commit last: +12 / 20 / 35 gauge. | gauge |

### E.2 Seat augments · gem · 8 per gem

- **Ruby · Sear and the red hand**

|  |  |  |
| --- | --- | --- |
| **Long Burn** | Sear pays for 2 / 3 / 4 turns. Epic: and stacks. | burn |
| **Flash Point** | A Burning monster takes +25 / 45 / 80%. | burn |
| **Ember Heart** | Every Sear payment adds +10 / 18 / 30 gauge. | gauge |
| **Overheat** | Below 30 Nerve, your combos +60 / 100 / 160%. | gamble |
| **Fury** | Bloodlust is ×2.5 / 3 / 4. | damage |
| **Red Hand** | +25 / 45 / 80% when red is the majority. | colour |
| **Kindling** | R R R combos add Sear ×2 / 3 / 5. | burn |
| **Backdraft** | The next monster starts Burning for 15 / 25 / 40% of its HP. | burn |

- **Sapphire · Ward and the blue hand**

|  |  |  |
| --- | --- | --- |
| **Deep Ward** | Ward +25 / 45 / 80. | nerve |
| **Cold Front** | Team buffs from blue-majority combos +25 / 45 / 80%. | colour |
| **Ice Armour** | The Ward refreshes at every turn start. Rare: +15 over cap. Epic: +30. | nerve |
| **Glacier** | Ward left at the end of an encounter converts to gauge ×1.5 / 2 / 3. | gauge |
| **Second Shift** | Prismatic Shift is ×2 / 2.5 / 3.5. | damage |
| **Blue Hand** | +25 / 45 / 80% when blue is the majority. | colour |
| **Frost Wall** | While the Ward holds, buffs last +1 / +2 turns. Epic: breaks too. | tempo |
| **Cold Snap** | When the Ward breaks: attack timer +1 and 150 / 300 / 500 damage. | control |

- **Emerald · Grow and the green hand**

|  |  |  |
| --- | --- | --- |
| **Compound** | Grow stacks are +4 / 6 / 9%. | grow |
| **Deep Roots** | Each Grow stack restores 3 / 5 / 8 Nerve a turn. | nerve |
| **Evergreen** | Nerve regenerates 10 / 18 / 30 a turn. | nerve |
| **Harvest** | Boss kills: +12 / 20 / 35% run damage. | grow |
| **Clean Cut** | Exploit is ×2 / 2.5 / 3.5 and the swap costs nothing. | damage |
| **Green Hand** | +25 / 45 / 80% when green is the majority. | colour |
| **Regrowth** | Second Helping also pays +25 / 45 / 80 gauge per kill. | gauge |
| **Overgrowth** | Grow cap 15 / 20 / 30. | grow |

### E.3 Seat Clicks · 13

|  |  |  |  |
| --- | --- | --- | --- |
| **Any seat** | Opener + Mise en Place | **First Course** | The first combo of every encounter counts as a free Limit Breaker ×1.5. |
| **Any seat** | Closer + Last Word | **Dessert** | Committing last pays double gauge and refunds 5 Nerve. |
| **Any seat** | Momentum + Variety | **Rhythm** | Both bonuses apply every turn; you are always either repeating or changing. |
| **Any seat** | Whetstone + Sharpening Stone | **Boning Knife** | Single-target combos ignore all Defense. |
| **Ruby** | Kindling + Long Burn | **Inferno** | Sear never expires. |
| **Ruby** | Fury + Overheat | **Berserk** | Below 30 Nerve, Bloodlust costs no token. |
| **Ruby** | Flash Point + Backdraft | **Wildfire** | The next monster starts Burning and already takes the Flash Point bonus. |
| **Sapphire** | Deep Ward + Ice Armour | **Glacier Wall** | The Ward never drops below 30. |
| **Sapphire** | Second Shift + Cold Front | **Prism** | A recoloured action counts as both colours for buffs. |
| **Sapphire** | Frost Wall + Cold Snap | **Shatter** | When the Ward breaks the monster’s timer is +2 and it takes 400. |
| **Emerald** | Compound + Overgrowth | **Old Growth** | Each Grow stack also regenerates 1 Nerve a turn. |
| **Emerald** | Regrowth + Clean Cut | **Harvest Moon** | An Exploit that kills mints a Limit Token. |
| **Emerald** | Deep Roots + Evergreen | **Evergreen Table** | Nerve regeneration past 100 becomes Ward. |

### E.4 Table combos · between seats · 8

|  |  |  |
| --- | --- | --- |
| Opener (seat 1) + Closer (seat 3) | **Bookends** | When seats 1 and 3 commit the same colour the combo counts as pure. |
| Anchor (seat 2) + any Ward | **Keel** | Counter meets the Anchor’s reduction before it touches the Ward. |
| Kindling (Ruby seat) + Harvest (Emerald seat) | **Char Siu** | Sear damage grants Grow stacks. |
| Glacier (Sapphire seat) + Regrowth (Emerald seat) | **Cold Storage** | Leftover Ward becomes Nerve regeneration for the next encounter. |
| Momentum on two seats | **Drumline** | Stacks are shared and cap at five. |
| Red Hand + Blue Hand + Green Hand, one per seat | **Full Menu** | Every Trinity pays all three hand bonuses. |
| Mono table + Family Recipe relic | **House Colours** | The mono bonus is +25% and the deep passive is one step deeper. |
| Trinity table + Trinity Ring relic | **Round Table** | A Round Delay refunds the token spent that turn, once per encounter. |

### E.5 Party relics · voted · 38 plus 8 Boss relics

One rarity each; relics do not tier. The offer’s floor follows the node: weight 0–2 Common, 3–4 Rare, 5+ Epic. Boss relics after rows 5 and 10.

**Common · 16**

|  |  |  |
| --- | --- | --- |
| **Salt Cellar** | Pure-colour combos +25%. | colour |
| **Teaspoon** | Pure-colour combos +20 gauge. | gauge |
| **Sharpening Stone** | Single-target combos +20%. | damage |
| **Big Ladle** | AOE combos +20%. | damage |
| **Warm Bread** | +25 gauge at every encounter start. | gauge |
| **Mise en Place** | The first combo of every encounter +50%. | damage |
| **Tip Jar** | A kill on turn 1 pays +100 points. | score |
| **Cast Iron** | Counter drains 8 less per seat. | nerve |
| **Order Pad** | The turn clock is 45 s. | tempo |
| **Spice Rack** | Weakness pays ×1.5. | colour |
| **Second Plate** | Buffs and breaks from mixed combos last the encounter. | tempo |
| **Wet Towel** | Monsters never Enrage. | control |
| **Egg Timer** | Attack timers start one higher, cap 4. | tempo |
| **Napkin** | The first two Counters of every encounter are ignored. | nerve |
| **Menu Card** | The next two rows’ modifiers are shown with exact numbers. | economy |
| **Coin Purse** | Elite kills pay +200 points. | score |

**Rare · 14**

|  |  |  |
| --- | --- | --- |
| **Trinity Ring** | Trinity combos +60%. | colour |
| **Loaded Dice** | Hold up to four Limit Tokens. | gauge |
| **Family Recipe** | The mono-gem bonus is +25%. | colour |
| **Pantry Key** | Five relics offered after every fight. | economy |
| **Doggy Bag** | Overkill on a pet spills onto the monster at 150%. | damage |
| **Bell Jar** | The first two Nerve breaks of the run cost no life. | nerve |
| **Ember Jar** | Sear at 15% without a Ruby seat; a Ruby seat’s Sear is +10%. | burn |
| **Prism Lens** | Any seat may recolour once per turn. | colour |
| **Whetstone** | Every combo ignores 50% Defense. | damage |
| **Sommelier’s Nose** | Weakness and resist are shown for the whole map. | economy |
| **Copper Pot** | A standing buff never decays below 30%. | tempo |
| **Mirror Plate** | The second-most colour also tests weakness, at ×1.25. | colour |
| **Chef’s Whistle** | A Trinity also clears Rot, Sour and Greedy for the turn. | control |
| **Table Salt** | Every seat’s Limit Breaker +0.5. | damage |

**Epic · 8**

|  |  |  |
| --- | --- | --- |
| **Head Chef’s Hat** | Two Limit Breakers per round. | gauge |
| **Golden Whisk** | Gauge gains +100%. | gauge |
| **Dinner Bell** | Trinity’s Round Delay adds two turns. | tempo |
| **Full Course** | Every kill grants Grow +5% run damage; stacks with Second Helping. | grow |
| **Grease Trap** | Counter is reflected: the monster takes 100 per seat it drains. | nerve |
| **Chef’s Table** | Bosses take +40%. | damage |
| **Tasting Flight** | Every combo counts as pure for the gauge and for Salt Cellar. | gauge |
| **Michelin Star** | Turn-1 kills pay triple points. | score |

**Boss relics · after rows 5 and 10 · 8**

|  |  |  |
| --- | --- | --- |
| **Poison Ring** | All combos +50%. Nerve maximum 60. | gamble |
| **Overtime** | The clock is 90 s and every attack timer is one higher. Points −20%. | tempo |
| **All You Can Eat** | Two relics after every fight. Lives reduced to one. | economy |
| **Blind Tasting** | Combos +70%. The combo preview is hidden for the rest of the run. | gamble |
| **Sous Vide** | Monsters never Enrage and Counter is 0. Gauge −40%. | control |
| **Clean Plate** | Kills restore Nerve fully and pay +40 gauge. Tokens cannot be banked past the round they are minted. | nerve |
| **Sommelier’s Cellar** | Limit Breakers cost no token. Each use costs 15 Nerve. | gamble |
| **Cursed Plate** | Combos +80%. Every third combo of an encounter deals 0: the Bin eats it. | gamble |

### E.6 Course blessings and Leftover relics

**Blessings · rows 1 and 6 · choose one of two**

|  |  |
| --- | --- |
| **Amuse-bouche** | The first monster of the course has −35% HP. |
| **Sharpened** | +15% damage this course. |
| **Deep Breath** | Nerve maximum 150 this course. |
| **Tasting Notes** | The hot node of every row this course is two reward tiers higher. |
| **Open Kitchen** | Two free rerolls of relic offers this course. |
| **Slow Service** | Attack timers +1 this course; points −10%. |

**Leftover relics · they melt after three fights**

|  |  |
| --- | --- |
| **Flambé** | Combos +60%. |
| **Ice Bath** | Counter is 0. |
| **Second Helping** | Nerve refills every turn. |
| **Gold Leaf** | Points ×2. |
| **Prism** | Every seat may recolour every turn. |
| **Overclock** | A Limit Token every 40 gauge. |

### E.7 Recipes · 8

Two held seat augments fuse at your next row and the slot is offered again. Two held party relics fuse at the next vote.

|  |  |  |
| --- | --- | --- |
| Salt Cellar + Teaspoon | **Pure Kitchen** | Pure-colour combos +50% and +40 gauge. |
| Sharpening Stone + Whetstone | **Boning Knife** | Single-target combos +45% and ignore all Defense. |
| Egg Timer + Order Pad | **Slow Service** | Attack timers cap 5, the clock is 90 s. |
| Cast Iron + Napkin | **Oven Mitts** | Counter drains 14 less per seat and the first three Counters of an encounter are ignored. |
| Loaded Dice + Steady Hand | **High Roller** | Token cap 5 and every Limit Breaker +1. |
| Long Burn + Flash Point | **Inferno** | Sear pays for four turns and a Burning monster takes +80%. |
| Deep Ward + Ice Armour | **Glacier** | Ward 90, refreshed every turn, +30 over cap. |
| Compound + Evergreen | **Greenhouse** | Grow stacks +9% and Nerve regenerates 30 a turn. |

### E.8 Menus · three relics · 6

**The Trinity Menu** Trinity Ring + Dinner Bell + Chef’s Whistle

Every Trinity mints 10 gauge, the monster skips its Counter, and the buffs last the encounter.

**Breaks on.** Shell and Sticky nodes, and a Blind Tasting row where the table cannot see its own Trinity.

**The Pure Kitchen Menu** Salt Cellar + Teaspoon + Tasting Flight

Pure combos ×1.5 and a Limit Token every second turn.

**Breaks on.** Ashen, Frosted or Bitter against the table’s colour. The map always offers a way round; the Menu asks you to take it.

**The Ward Menu** Napkin + Cast Iron + Grease Trap

Counter heals the party and the monster pays for every seat it tries to drain.

**Breaks on.** Rot and Greedy, which never go through Counter.

**The Burn Menu** Ember Jar + Long Burn + Flash Point

Sear is permanent and doubled; Burning monsters take +80%.

**Breaks on.** Regenerating and Glutton outrun a fire that cannot stack faster.

**The Tempo Menu** Egg Timer + Order Pad + Second Plate

No monster attacks before turn four, and the buffs you build are still there when it does.

**Breaks on.** Hasty and Short Fuse, and the Colossus’s Enrage step.

**The Score Menu** Tip Jar + Michelin Star + Coin Purse

Turn-1 kills pay ×3; Elites pay double on top.

**Breaks on.** Thick-skinned and Hardened, which make turn-1 kills a dream.