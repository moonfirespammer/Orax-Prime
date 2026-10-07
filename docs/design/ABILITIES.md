# OraX · class abilities and augments

Rendered from `src/data/design/*.json` (v2 · 7 October 2026) by `scripts/render-abilities.mjs`. Those files are the source of truth for every number and every card; change them, run `pnpm abilities`, and this page follows. The rules and the intent are in `docs/design/` (start with `README.md` and `00-overview-and-shared.md`).

A player is one class from the identity test, for good, and one gem a day. In HMD the gem makes a **cut** of the class kit; in OXP the gem is the whole kit and the class is cosmetic; in Build-A-Dish the class is a palate the Bin reads and the gem is the colour of your stones.

## 1. The budget

Crowd DPS = ATK × SPD × targets. The budget sets crowd DPS by weight; ATK is derived and never hand-tuned.

| Weight | Crowd DPS |
| --- | --- |
| Damage | 38 |
| Balanced | 34 |
| Support | 30 |
| Scaler | 30 at the bell, 40 at full stacks |

| Gem | HMD lean |
| --- | --- |
| Ruby | atk +10% · arm −10% · threat ×1 · heat +5 per kill |
| Sapphire | hp +25% · arm +15% · atk −10% · threat ×2 · heat +4 per hit taken |
| Emerald | hp +15% · regen +1% per second · atk −5% · healingThreat ×1.5 · heat +4 whenever any ally takes a hit |

Heat: +10 per hit landed, +6 per hit taken, +2 a second; the Signature fires at 100.

## 2. The three gems

| Gem | Role | Keyword | HMD lean | HMD Heat | OXP hand | Limit Breaker | Passive |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **Ruby** | Striker | Burn: 6 damage per second per stack for 4 s, max 3 stacks. Burn ticks ignore ARM. | +10% ATK, −10% ARM. Threat ×1. | +5 Heat per kill on top of the base gains. | **R R G** | **Bloodlust.** The next combo deals ×2. | **Sear.** Every combo leaves a Burn on the monster worth 15% of the damage dealt, paid at the start of the next turn and ignoring Defense. A second Ruby seat makes it 20%, a third 25%. |
| **Sapphire** | Warden | Chill: −20% SPD per stack; 3 stacks = Freeze for 1.5 s. Shields are temporary HP that take damage first. | +25% max HP, +15% ARM, −10% ATK. Threat ×2. | +4 Heat per hit taken on top of the base gains. | **B B R** | **Prismatic Shift.** ×1.5, and the seat may recolour the action it committed after seeing the others. | **Ward.** The party starts every encounter with a Ward of 30 over its Nerve; Counter hits the Ward first, and every kill refreshes it. A second Sapphire seat makes it 45, a third 60. |
| **Emerald** | Mender | Grow: a permanent stack for the rest of the fight (HMD) or the run (OXP). Grow never decays. | +15% max HP, +1% HP regen per second, −5% ATK. Healing generates 1.5× threat. | +4 Heat whenever any ally takes a hit, on top of the base gains. | **G G B** | **Exploit.** ×1.5, ignores all Defense, and the seat may swap position for the turn. | **Second Helping.** Every kill restores Nerve in full instead of +30 and grants a Grow stack: +2% damage for the rest of the run, max ten. A second Emerald seat makes stacks +3%, a third +4%. |

## 3. The nine classes

| Class | Archetype | Station | Weight | HP | ATK | SPD | Targets | Crowd DPS | Range | ARM | Motto |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Provider** | Guardian | Frontline | Balanced | 1300 | 21 | 0.8 | 2 | 33.6 | Melee | 25% | Everyone eats. Everyone helps. |
| **Foodsmith** | Finisher | Knife roll | Damage | 950 | 26 | 0.8 | 1.8 | 37.4 | Melee | 10% | Every plate should carry a signature. |
| **Spark** | Igniter | Pastry bench | Balanced | 850 | 12 | 1.4 | 2 | 33.6 | Mid | 5% | Start the feast. |
| **Gastronaut** | Skirmisher | Noodle stall | Damage | 750 | 29 | 1.2 | 1.1 | 38.3 | Long | 5% | Look where no one else is looking. |
| **Taster** | Analyst | Assay bench | Support | 850 | 30 | 1 | 1 | 30 | Long | 10% | I test first, so others do not have to. |
| **Purist** | Duelist | Trim bench | Damage | 1100 | 38 | 0.9 | 1.1 | 37.6 | Melee | 20% | Keep the craft honest. |
| **Rebel** | Disruptor | Pounding bench | Balanced | 1250 | 34 | 1 | 1 | 34 | Melee | 15% | People before rules. |
| **Stirrer** | Trickster | Street stall | Scaler | 900 | 12 | 1.3 | 2 | 31 → 41 | Mid | 5% | Waste nothing. Miss nothing. |
| **Host** | Coordinator | Oven mouth | Support | 950 | 15 | 1 | 2 | 30 | Mid | 10% | The right seat can change a life. |

ATK is derived in code from crowd DPS = ATK × SPD × targets; the table shows the result.

### 01 · Provider

*Guardian · Frontline · Balanced weight · Melee* · “Everyone eats. Everyone helps.”

The caretaker at the front of the line: broad apron, crossed straps, three keys at the hip. The Provider holds the front and feeds whoever stands beside them. Every part of the kit is about serving; damage, protection and healing all come out of the pot.

**Weapons.** ♂ serving tongs with a cast-iron pan shield · ♀ two-handed rolling pin

**Mirror.** Taster: the Provider cares, the Taster scrutinises.

**Cast cue.** ♂ plants the shield and raises the tongs in a serving salute; three cream dots gather above the pan. ♀ sets the pin upright and traces one warm ring at its barrel.

**Kit · the same in every cut**

| Part | Name | What it does |
| --- | --- | --- |
| Basic | **Serve** | A tongs or rolling-pin swing that hits the target and one adjacent enemy. |
| Passive | **Ration Ring** | Allies in adjacent slots take 10% less damage. Every 25 kills by the party, the Provider serves a bowl: the most-damaged adjacent ally heals 5%. |
| Signature | **Second Helping** | Slams the pot. Every ally heals 15% and every enemy in melee range is knocked back one tile. |

**Three cuts · what the gem changes**

| Gem | Cut | Basic | Passive | Signature |
| --- | --- | --- | --- | --- |
| Ruby · Striker | **Hearthfire** | The swing cleaves every enemy in a short arc and applies Burn ×1. | Ration Ring instead gives adjacent allies +8% ATK; the Provider gains +2% ATK per Burning enemy on the field (max +30%). | Boil Over. 180% to every enemy in melee range, Burn ×2, and the ground burns for 3 s at 8/s. |
| Sapphire · Warden | **Head of the Table** | 2× threat and Chill ×1. | Ration Ring is 15%, and the Provider takes what the allies don’t. | Lock the Doors. A shield of 40% max HP and an ice wall one tile ahead for 3 s; enemies cannot pass it, and melee enemies that touch it are Frozen. |
| Emerald · Mender | **Stewpot** | Every 3rd swing serves a bowl instead: the most-damaged ally heals 8%. | Ration Ring also regenerates adjacent allies 1% per second; every bowl served grants its ally +1% max HP for the fight (Grow). | Second Helping heals 25% and grants every ally +5% max HP for the fight (Grow). |

**House Combo · Soup Kitchen** · Second Serving + Big Pot

Every bowl served also hits every enemy in melee range for 100% and knocks it back a tile.

**Signature augments · HMD · six, offered only to this class**

| Card | Common / Rare / Epic | Tags |
| --- | --- | --- |
| **Bottomless Ladle** | Second Helping reaches every ally at 80 / 100 / 120%. | synergy |
| **Head Chef** | Ration Ring is +25 / 40 / 60% stronger. | defence |
| **Extra Keys** | Every 50 party kills, the whole table gains +40 / 70 / 100 Heat. | heat |
| **Second Serving** | Bowls come every 15 / 10 / 5 kills instead of 25. | sustain |
| **Heavy Apron** | +35 / 55 / 80% ARM; SPD −10%. | defence |
| **Big Pot** | Serve hits 2 / 3 / 5 more enemies. | horde |

**Build-A-Dish palate · Generosity.** In character when: Style Generous, not Unhinged, with every required ingredient present. The Bin adds: “Enough for the table. You cooked for people who are not here yet.” Chip: Feeds the table ×n

### 02 · Foodsmith

*Finisher · Knife roll · Damage weight · Melee* · “Every plate should carry a signature.”

Whites, a standing collar, one knife roll across the back. The Foodsmith does one thing perfectly and then does it again: every fourth cut is the Signature Strike, and the whole kit revolves around landing it in a crowd. Targets 1.8 is the average of three single cuts and one line crit.

**Weapons.** ♂ straight chef’s knife, a body-height long · ♀ two-handled mezzaluna crescent

**Mirror.** Purist: the Foodsmith bursts, the Purist grinds.

**Cast cue.** ♂ presents the knife flat on a palm; a cream plating stroke runs along its edge. ♀ holds the mezzaluna level; a plating arc pulses in its crescent.

**Kit · the same in every cut**

| Part | Name | What it does |
| --- | --- | --- |
| Basic | **Cut** | A knife or mezzaluna stroke. Every 4th is the Signature Strike: a guaranteed crit that hits every enemy in the line of the cut. |
| Passive | **Mise en Place** | Starts the fight at 40 Heat. Every Signature Strike that kills refunds 10 Heat. |
| Signature | **Flourish** | Dashes to the densest cluster and cuts through it for 200% in a line. A killing blow chains the cut to the next enemy, up to five. |

**Three cuts · what the gem changes**

| Gem | Cut | Basic | Passive | Signature |
| --- | --- | --- | --- | --- |
| Ruby · Striker | **Flambé** | Signature Strikes apply Burn ×2. | Each chain kill gives +10% ATK for 3 s, stacking to three. | Flourish leaves a fire trail: enemies crossing it take 60% and Burn ×1. |
| Sapphire · Warden | **Showpiece** | 2× threat. Signature Strikes taunt every enemy they hit for 2 s. | Above 70% HP the Foodsmith has +25% ARM; every crit taken gives +20 Heat. | Showpiece. For 3 s the Foodsmith is the only legal target and takes −50%; when it ends, deals 100% of the damage taken to every attacker. |
| Emerald · Mender | **Consommé** | Each Signature Strike plates a Dish on the most-damaged ally. It bursts when they drop below 50% HP or after 3 s, healing 12% and cleansing one debuff. | Every Dish that bursts makes future Dishes +1% stronger (Grow). | Tasting Menu. A Dish on every ally, then Flourish at 120%. |

**House Combo · Knife Work** · Encore + Sharp Plating

Signature Strikes chain like Flourish, up to three enemies, each a crit.

**Signature augments · HMD · six, offered only to this class**

| Card | Common / Rare / Epic | Tags |
| --- | --- | --- |
| **Encore** | The Signature Strike is every 3rd cut. Rare: and the first cut of the fight. Epic: every 2nd cut. | crit |
| **Sharp Plating** | Crits ×2 / 2.5 / 3.5; non-crits −10%. | crit |
| **Perfect Plate** | Flourish kills refund 60 / 80 / 100 Heat. | heat |
| **Showman** | Each Signature Strike gives adjacent allies +10 / 18 / 30 Heat. | synergy |
| **Dash Chef** | Cuts are dashes and reach the back row. Rare: +25% on a dash. Epic: dash damage splashes. | position |
| **Ego** | +40 / 60 / 90% ATK while you have the most kills at the table; −10% otherwise. | gamble |

**Build-A-Dish palate · The cut.** In character when: Every item that needs cutting is cut or diced, none is dust, and a protein is seared. The Bin adds: “Every cut where it should be. I noticed. I always notice.” Chip: Knife first ×n

### 03 · Spark

*Igniter · Pastry bench · Balanced weight · Mid* · “Start the feast.”

Cropped jacket, two ribbon tails, a bandolier of spice shakers. The Spark gets everyone moving. Whatever the gem, allies beside the Spark are faster; the gem decides what the Spark does while they are.

**Weapons.** ♂ balloon whisk with five wire loops · ♀ linen piping bag, cradled in both hands

**Mirror.** Rebel: the Spark speeds allies, the Rebel disrupts enemies.

**Cast cue.** ♂ holds the whisk upright and turns it; three ochre seasoning dots gather above the balloon. ♀ lifts the nozzle and squeezes a small cream spiral.

**Kit · the same in every cut**

| Part | Name | What it does |
| --- | --- | --- |
| Basic | **Fling** | Spice from the whisk or piping bag at up to two enemies in mid range. |
| Passive | **Ignition** | Adjacent allies gain +10% SPD. Every ally Signature gives the Spark +15 Heat. |
| Signature | **Start the Feast** | The party gains +40% SPD for 4 s and +10 Heat. |

**Three cuts · what the gem changes**

| Gem | Cut | Basic | Passive | Signature |
| --- | --- | --- | --- | --- |
| Ruby · Striker | **Firecracker** | Hits three enemies; Burn ×1 on the primary. | The Spark deals +10% to Burning enemies. | While Start the Feast lasts, the Spark’s flings explode for 60% in a small area. |
| Sapphire · Warden | **Centre Stage** | A tray-bash at mid range, 2× threat, Chill ×1. | While two or more enemies target the Spark it takes −20% and Ignition is +15% instead of +10%. | Spotlight. Every enemy in mid range attacks the Spark for 3 s; the Spark gains a 35% shield and adjacent allies +20 Heat. |
| Emerald · Mender | **Plus One** | Unchanged. | Ignition also regenerates adjacent allies 1.5% per second. A Guest (150 HP, 12 ATK) joins in slot 6 at the bell and gains +5% all stats per 50 party kills (Grow). | Toast. Every ally gains +10 Heat and +25% SPD for 3 s, and heals 3% per hit they land while it lasts. |

**House Combo · Fireworks Finale** · Party Trick + Crowd Work

Every ally Signature has a 25% chance to fire Start the Feast free.

**Signature augments · HMD · six, offered only to this class**

| Card | Common / Rare / Epic | Tags |
| --- | --- | --- |
| **Long Fuse** | Start the Feast lasts +100 / 175 / 300% longer. | tempo |
| **Crowd Work** | Ally Signatures give the Spark +40 / 60 / 90 Heat. | heat |
| **Sparkler** | Fling hits 2 / 3 / 5 more enemies. | horde |
| **Open Invitation** | Ignition reaches every ally at 50 / 75 / 100%. | synergy |
| **Party Trick** | 40 / 60 / 85% chance the Signature fires twice. | gamble |
| **Warm-up Act** | Your first fling every 20 s gives the table +30 / 50 / 80 Heat. | heat |

**Build-A-Dish palate · Heat and speed.** In character when: Chilli portions at two or more, or flair at three or more. The Bin adds: “Fast hands and too much chilli. I would not have it any other way.” Chip: Brings the heat ×n

### 04 · Gastronaut

*Skirmisher · Noodle stall · Damage weight · Long* · “Look where no one else is looking.”

Pack, creel, map tube and a three-tier tiffin. The Gastronaut fights from the back and brings things home: enemy deaths drop Ingredients the party eats for a permanent edge.

**Weapons.** ♂ two bamboo chopsticks carried as walking poles · ♀ spider strainer on a long bamboo handle

**Mirror.** Stirrer: the Gastronaut finds things, the Stirrer takes them.

**Cast cue.** ♂ plants both chopsticks and lifts the head; three path-like cream dots rise between the sticks. ♀ presents the strainer level; three cream dots gather over the bowl.

**Kit · the same in every cut**

| Part | Name | What it does |
| --- | --- | --- |
| Basic | **Jab** | A chopstick jab or strainer scoop at long range; +20% against the farthest enemy. |
| Passive | **Forage** | Enemies killed by anyone drop an Ingredient 10% of the time (Gastronaut kills 25%). The nearest cook eats it: +1% ATK for the fight (Grow), to +30%. Champions shower five. |
| Signature | **Volley** | Three shots at the three farthest enemies, 120% each. |

**Three cuts · what the gem changes**

| Gem | Cut | Basic | Passive | Signature |
| --- | --- | --- | --- | --- |
| Ruby · Striker | **Pepper** | Pierces one enemy behind the target. | An eaten Ingredient Burns ×1 every enemy near where it fell. | Volley applies Burn ×2 and gains one more shot per 250 party kills, up to six. |
| Sapphire · Warden | **Lure** | 2× threat. | Bramble Pack. Melee attackers take 15% of their damage back as thorns; enemies walking toward the Gastronaut are slowed 20%. | Scent Lure. Every enemy on the field must attack the Gastronaut for 3 s along a thorn path that deals 20 per second to anything crossing it. |
| Emerald · Mender | **Herbalist** | Every 3rd shot instead drops a Herb Pouch on the most-damaged ally: a 6% heal and +1% max HP for the fight (Grow). | Ingredients also heal the eater 5%. | Seed Cache. Plants a cache in the back row that grows a stage every 5 s (max 5). At each Course boundary it bursts: every ally heals 4% and gains +2% all stats per stage (Grow). |

**House Combo · Harvest Festival** · Sharp Eyes + Full Basket

Champions drop an Ingredient at every 10% of HP lost; Ingredients never miss a cook.

**Signature augments · HMD · six, offered only to this class**

| Card | Common / Rare / Epic | Tags |
| --- | --- | --- |
| **Full Basket** | Ingredients are worth ×2 / 3 / 5. | grow |
| **Wayfinder** | Volley gains 2 / 3 / 5 shots. | damage |
| **Trail Mix** | Start the fight with 8 / 15 / 25 Ingredients eaten. | grow |
| **Sharp Eyes** | Drop chance ×2 / ×3 / every kill. | ingredient |
| **Share the Find** | Ingredients also feed adjacent allies at full / double / table value. | synergy |
| **Field Notes** | You prioritise enemies below 25% HP and deal +40 / 70 / 120% to them. | execute |

**Build-A-Dish palate · The whole shelf.** In character when: Full coverage, and the optional row used when the dish has one. The Bin adds: “You found everything on the shelf. Even the bread.” Chip: Leaves nothing off ×n

### 05 · Taster

*Analyst · Assay bench · Support weight · Long* · “I test first, so others do not have to.”

One enlarged gauntlet, a diagonal row of vials, a loupe at the brow. The Taster marks what matters. Every cut Analyses the biggest threat in range so the whole party hits it harder; that mark is worth about four points of the budget, which is why the Taster’s own DPS is Support weight.

**Weapons.** ♂ pivot fan of three chef’s spoons · ♀ giant microplane rasp

**Mirror.** Provider: the Taster scrutinises, the Provider cares.

**Cast cue.** ♂ raises the spoon fan to the light; one amber dot pulses above the centre spoon. ♀ holds the microplane vertical and inspects a falling amber shaving.

**Kit · the same in every cut**

| Part | Name | What it does |
| --- | --- | --- |
| Basic | **Sample** | A spoon or microplane throw at long range. |
| Passive | **Analyse** | The highest-HP enemy in range is always Analysed: it takes +20% from the party. When it dies, the mark jumps to the next. |
| Signature | **Verdict** | Every enemy within long range is Analysed for 5 s, and the Taster’s next five samples crit. |

**Three cuts · what the gem changes**

| Gem | Cut | Basic | Passive | Signature |
| --- | --- | --- | --- | --- |
| Ruby · Striker | **Hot Verdict** | Burn ×1. | Burn ticks on Analysed enemies deal double. | While Verdict lasts, every party hit on an Analysed enemy applies Burn ×1. |
| Sapphire · Warden | **Inspector** | 2× threat. | Under Inspection. Enemies attacking the Taster deal −15%; the Taster has +5% ARM per Analysed enemy alive, max +25%. | Inspection. Every enemy in long range must attack the Taster for 3 s and has 0 ARM while doing so. |
| Emerald · Mender | **Antidote** | Poison 3 per second for 3 s; half the poison damage returns as healing to the most-damaged ally. | Quality Control. Allies adjacent to the Taster are immune to Burn and poison; whenever an ally is cleansed by anyone they heal 5%. | Remedy. Every ally is cleansed, heals 10% and is immune to debuffs for 3 s. |

**House Combo · Recall Notice** · Second Opinion + Bad Batch

When any marked enemy dies, every marked enemy takes the burst.

**Signature augments · HMD · six, offered only to this class**

| Card | Common / Rare / Epic | Tags |
| --- | --- | --- |
| **Proof** | Analysed enemies take +50 / 75 / 110% instead of +20%. | mark |
| **Second Opinion** | 3 / 4 / 6 enemies Analysed at once. | mark |
| **Certified** | Allies hitting an Analysed enemy gain +5 / 8 / 13 Heat. | heat |
| **Careful Notes** | Analysed enemies deal −25 / 40 / 60%. | defence |
| **Long Lens** | Verdict covers the whole field and lasts 8 / 12 / 16 s. | mark |
| **Bad Batch** | An Analysed enemy’s debuffs jump to the next mark when it dies and it bursts for 100 / 150 / 250%. | horde |

**Build-A-Dish palate · Balance.** In character when: Sauce portions equal to protein portions; nothing burnt, nothing at dust. The Bin adds: “Balanced. Tested first, plated second. As it should be.” Chip: Tests first ×n

### 06 · Purist

*Duelist · Trim bench · Damage weight · Melee* · “Keep the craft honest.”

An ankle-length wrap with one seam, a sealed case, the tool held away from the body. The Purist refuses: no debuff sticks and no strike misses. Targets 1.1 is the worth of never missing and ignoring a fifth of the armour.

**Weapons.** ♂ long plating tweezers, gripped like a fencing tool · ♀ closed kitchen shears, one long point

**Mirror.** Foodsmith: the Purist grinds, the Foodsmith bursts.

**Cast cue.** ♂ closes the tweezer tips around one floating cream leaf and lifts it. ♀ opens and closes the shears around one floating cream thread.

**Kit · the same in every cut**

| Part | Name | What it does |
| --- | --- | --- |
| Basic | **Exact Cut** | A tweezers or shears thrust that never misses and ignores 20% ARM. |
| Passive | **Uncompromised** | Immune to every debuff: Burn, Chill, poison, stun, knockback and pulls. |
| Signature | **The Standard** | For 4 s every Exact Cut deals true damage and executes enemies below 15% HP. |

**Three cuts · what the gem changes**

| Gem | Cut | Basic | Passive | Signature |
| --- | --- | --- | --- | --- |
| Ruby · Striker | **Clean Sear** | +10% ATK while above 80% HP. | Kills refund 15 Heat. | Clean Sear replaces The Standard: a 300% strike. If it kills, regain 100 Heat and strike the next target, chaining up to three. |
| Sapphire · Warden | **Hold the Line** | 2× threat, Chill ×1. | Standard. −10% damage taken per debuff on the attacker, max −30%. | Hold the Line. For 3 s the Purist is immovable, takes −50%, and every enemy in melee range must attack it. |
| Emerald · Mender | **Preserve** | Every 3rd cut instead Preserves the most-damaged ally: a shield of 8% max HP. | Sealed Case. Purist shields cannot be stripped and last until spent; an ally holding one is immune to Burn. | Tradition. Every ally gains a 15% shield and +2% ARM for the fight (Grow). Nothing is ever healed by this cut; nothing gets through in the first place. |

**House Combo · Standard Bearer** · Whetstone + Discipline

While above 90% HP every Exact Cut is true damage, permanently.

**Signature augments · HMD · six, offered only to this class**

| Card | Common / Rare / Epic | Tags |
| --- | --- | --- |
| **Standard** | +35 / 60 / 100% ATK against enemies with no debuffs. | damage |
| **Discipline** | Signature +60 / 100 / 160% while above 90% HP. | damage |
| **Whetstone** | +1 ATK per 10 / 7 / 4 kills by the Purist. | scaling |
| **Gatekeeper** | Every 8 s, the first enemy to hit you takes 200 / 350 / 600% reflected. | threat |
| **Sealed Case** | Adjacent allies share Uncompromised against one / two / every debuff type, Burn first. | synergy |
| **No Shortcuts** | Signature +50 / 80 / 120% power; it costs 120 Heat. | gamble |

**Build-A-Dish palate · The clean plate.** In character when: Neat, three stones, no extras, no mess left on the pad. The Bin adds: “Clean plate. No extras. You did not enjoy that, and it shows in the best way.” Chip: Clean plater ×n

### 07 · Rebel

*Disruptor · Pounding bench · Balanced weight · Melee* · “People before rules.”

A cropped academy jacket with three patches, a short sash, the communal pot on the hip. The Rebel gets in the way on purpose. Every cut reacts when an ally is in trouble; the gem decides how loud the reaction is.

**Weapons.** ♂ waffle-face tenderising mallet · ♀ stone mortar cradled in one arm, pestle in the other

**Mirror.** Spark: the Rebel disrupts enemies, the Spark speeds allies.

**Cast cue.** ♂ taps the mallet by the communal pot; a cream ring appears above it. ♀ stirs the pestle and lifts a warm ring from the bowl.

**Kit · the same in every cut**

| Part | Name | What it does |
| --- | --- | --- |
| Basic | **Pound** | A mallet or pestle strike. Every 4th knocks the target back one tile. |
| Passive | **People Before Rules** | When an ally drops below 30% HP, enemies attacking them must attack the Rebel for 2 s (once per ally every 20 s). |
| Signature | **Kick the Table** | Every enemy in melee range is knocked back two tiles for 120%. Enemies knocked into others deal 60% to them. |

**Three cuts · what the gem changes**

| Gem | Cut | Basic | Passive | Signature |
| --- | --- | --- | --- | --- |
| Ruby · Striker | **Firebrand** | The 4th strike also applies Burn ×1. | +20% ATK while any ally is below 50% HP. | Kick the Table applies Burn ×2 and gives the Rebel +5% ATK per enemy hit for 5 s. |
| Sapphire · Warden | **Barricade** | 2× threat. | Human Shield. The taunt lasts 3 s and the Rebel has +20% ARM while it holds. | Picket Line. Every enemy within a tile of melee must attack the Rebel for 3 s; when it ends, the Rebel deals 100% of the damage taken to every adjacent enemy. |
| Emerald · Mender | **Communal Pot** | Every 3rd strike instead Takes the Wound: the most-damaged ally heals 10% and the Rebel loses 5%. | Share the Pot. The Rebel regenerates 2% per second while below 50% HP. | Rally. Every ally below 50% heals 15% and gains +15% ATK for 4 s; the Rebel gains +4% max HP per ally rallied (Grow). |

**House Combo · General Strike** · Loud Voice + Union

Every taunt trigger also fires Kick the Table at 50%.

**Signature augments · HMD · six, offered only to this class**

| Card | Common / Rare / Epic | Tags |
| --- | --- | --- |
| **Picket Line** | The taunt lasts +2 / 3 / 5 s. | threat |
| **Solidarity** | Adjacent allies share your ARM. Rare: and 20% of your max HP as a shield at the bell. Epic: 40%. | synergy |
| **Uprising** | Kick the Table gives the table +25 / 40 / 60% ATK for 5 s. | synergy |
| **Loud Voice** | People Before Rules triggers at 50 / 65 / 80% ally HP. | threat |
| **Union** | Every taunt trigger gives the table +10 / 18 / 30 Heat. | heat |
| **Barricade** | Enemies must pass through your tile and are slowed 30 / 50 / 70%. | position |

**Build-A-Dish palate · Off the recipe.** In character when: Exactly one extra, and still two stones or more. The Bin adds: “{Extra} in {dish}, and it held. Do it again and I will pretend not to look.” Chip: Breaks the recipe ×n

### 08 · Stirrer

*Trickster · Street stall · Scaler weight · Mid* · “Waste nothing. Miss nothing.”

Half-apron over trousers, rolled sleeves, a headband with two tails. The Stirrer profits from the mess: every death on the field is a Leftover, and Leftovers are power. The Stirrer starts under budget and ends over it.

**Weapons.** ♂ deep-bowled ladle staff · ♀ broad wok turner

**Mirror.** Gastronaut: the Stirrer takes things, the Gastronaut finds them.

**Cast cue.** ♂ tips the ladle in a controlled pour; one steam curl rises. ♀ circles the turner once from the wrist; one steam curl follows.

**Kit · the same in every cut**

| Part | Name | What it does |
| --- | --- | --- |
| Basic | **Flick** | A ladle sweep or turner flick at up to two enemies. |
| Passive | **Waste Nothing** | Every death on the field gives a Leftover stack (max 10): +1.5% ATK and +1.5% SPD each. Stacks decay one per 5 s without a kill. |
| Signature | **Skewer Toss** | Skewers at three random enemies for 110% each, plus one skewer per three Leftover stacks. |

**Three cuts · what the gem changes**

| Gem | Cut | Basic | Passive | Signature |
| --- | --- | --- | --- | --- |
| Ruby · Striker | **Skewer** | Burn ×1 on the second target. | Each stack also gives +2% Burn damage. | Skewers apply Burn ×1 and deal +50% to enemies already Burning. |
| Sapphire · Warden | **Stall** | 2× threat, thrown from behind the folding stall. | Folding Stall. Starts with a 20% shield that rebuilds 1% per Leftover stack gained; while it holds, adjacent allies take −10%. | Slip Away. Vanishes for 2 s (every enemy attacking the Stirrer is Frozen), reappears with a 25% shield and throws the Toss. |
| Emerald · Mender | **Leftovers** | 40% of the damage is skimmed off and given as healing to the most-damaged ally. | At every 50-kill milestone every ally heals 1% per Leftover stack. | Leftovers. Consumes all stacks: allies heal 3% per stack and every three stacks spawn a Scrap (60 HP, 8 ATK) that fights until it dies. |

**House Combo · Night Market** · Marked Coin + Hoarder

At 20 or more Leftover stacks, Skewer Toss fires every 5 s free.

**Signature augments · HMD · six, offered only to this class**

| Card | Common / Rare / Epic | Tags |
| --- | --- | --- |
| **Hoarder** | Leftover cap 15 / 20 / 30. | leftover |
| **Double Dip** | Stacks give +3 / 4 / 6% instead of +1.5%. | leftover |
| **Back Alley** | Untargetable for 2 / 3 / 5 s after each Signature. | defence |
| **Wok Hei** | +30 / 50 / 80% SPD; −10% HP. | tempo |
| **Marked Coin** | Leftover stacks never decay. Rare: start with 6. Epic: start with 10. | leftover |
| **Street Stall** | Every 10 of your kills Skewer Toss gains a skewer, up to +5 / 8 / 13. | horde |

**Build-A-Dish palate · Leftovers.** In character when: Plated in Leftovers hour with an item above three portions, or flung something and still scored two stones. The Bin adds: “Ten portions and a fling. Nothing wasted. I respect that more than I should.” Chip: Leftovers regular ×n

### 09 · Host

*Coordinator · Oven mouth · Support weight · Mid* · “The right seat can change a life.”

A tailcoat with two tails, a folded cloth over the forearm, three place cards at the breast. The Host makes the seating plan matter: something good passes between allies who stand together. The gem decides what.

**Weapons.** ♂ round metal turning peel on a long shaft · ♀ broad wooden launch peel

**Mirror.** None. The Host sits in the middle and makes placement matter.

**Cast cue.** Keeps the peel planted and sweeps the cloth-bearing forearm in a gracious invitation; a small warm ring opens before the palm.

**Kit · the same in every cut**

| Part | Name | What it does |
| --- | --- | --- |
| Basic | **Place Card** | A peel thrust or thrown card that hits two enemies. |
| Passive | **Seating Plan** | Allies in adjacent slots share 15% of any healing or shield either receives. |
| Signature | **Change of Seat** | Swaps the most-damaged ally’s slot with the Host’s and shields the ally for 20% max HP. |

**Three cuts · what the gem changes**

| Gem | Cut | Basic | Passive | Signature |
| --- | --- | --- | --- | --- |
| Ruby · Striker | **Toast of the Table** | Unchanged. | Adjacent allies also gain +8% ATK. | Toast. Every ally’s next three attacks crit and Burn ×1, and the Host strikes the target for 200%. |
| Sapphire · Warden | **Doorman** | 2× threat. | The Host takes 30% of the damage dealt to adjacent allies and has +20% ARM. | Guest of Honour. Links to the highest-ATK ally for 5 s: half their damage taken goes to the Host, their attacks crit, and the Host heals 5% per second. |
| Emerald · Mender | **Long Table** | Every 3rd card instead heals the most-damaged ally 6%. | Sharing is 25%, and the Host heals 2% whenever an adjacent ally is healed by anyone. | Long Table. A heal over time on every ally, 3% per second for 4 s; each cast adds +1% per second for the fight (Grow). |

**House Combo · Long Table** · Open Table + Extra Chair

Every heal or shield anywhere at the table is shared with everyone.

**Signature augments · HMD · six, offered only to this class**

| Card | Common / Rare / Epic | Tags |
| --- | --- | --- |
| **Open Table** | Seating Plan shares 50 / 75 / 100%. | synergy |
| **Reserved** | Signature heals and shields +50 / 80 / 120%. | shield |
| **Concierge** | Every ally Signature heals the Host 10 / 18 / 30%. | sustain |
| **Extra Chair** | Seating Plan reaches two slots away. Rare: everyone at half. Epic: everyone. | synergy |
| **Place Cards** | Adjacent allies +12 / 20 / 35% ARM. | defence |
| **Perfect Timing** | Your Signature fires once at the bell. Rare: and at each Champion. Epic: and every 50 kills. | heat |

**Build-A-Dish palate · The shared table.** In character when: Among the first ten in the city to pick the dish, or posted in its thread before plating. The Bin adds: “You set the table early. People came.” Chip: Sets the table ×n

## 4. HMD augments

Nothing is OP if everything is OP. Every card swings a fight on its own; the game is in the combos. A few classes are OP alone and are meant to be. The day’s roll, never a nerf, is what decides which OP is OP today.

| Kind | How it forms | Power | How the player sees it |
| --- | --- | --- | --- |
| **Click** | Two augments held by one cook (or one seat) that are written for each other. Both stay; a named bonus switches on. | About +50% on top of both cards. | The Prep screen chips an offer with “clicks with …” when you hold the other half. |
| **Table combo** | Two cooks whose cuts or augments talk: a class pair, a gem pair, a seat pair. It works for everyone at the table. | About +60% for the cooks in it; some reach the whole table. | Appears in the Special offer (HMD) or on the map card (OXP) when the table has both halves. |
| **Recipe** | Two held Pantry or seat augments fuse at your next window into one card and the slot comes back. | Two Epics in one slot, then a free slot. | The Recipe shows on the Prep screen as soon as one half is held. |
| **Menu** | Three named pieces, from any pools, on one cook or across the table. | Changes what the fight is. Each lists the day that breaks it. | The Menu card appears in the lobby with two of three held; the third is weighted into offers at 50%. |
| **House Combo** | Two Signatures of one class. The class is OP on its own with both. | A Click that only that class can make. | Printed on the class card from day one. |

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

### 4.1 Pantry · general · 36

| Card | Common / Rare / Epic | Tags |
| --- | --- | --- |
| **Cast Iron** | +20 / 35 / 55% ARM. | shield |
| **Sharp Knife** | +25 / 45 / 80% ATK. | damage |
| **Quick Hands** | +20 / 35 / 60% SPD. | tempo |
| **Big Appetite** | +30 / 55 / 100% max HP. | sustain |
| **Heat Lamp** | +40 / 70 / 120% Heat gain. | heat |
| **Pinch of Salt** | +20 / 35 / 60% crit chance. | crit |
| **Slow Cooker** | +2 / 3.5 / 6% HP regen per second. | sustain |
| **Thick Skin** | The first 8 / 14 / 25 hits every minute deal 0. | shield |
| **Second Wind** | Survive a killing blow 1 / 2 / 3 times a fight; each time +50% ATK for 8 s. | sustain · damage |
| **Long Arms** | +1 range band. Rare: +2 and +20% beyond melee. Epic: and your attacks hit one more target. | position |
| **Taste for Blood** | +1% ATK per 5 party kills, max +50 / 90 / 150%. | scaling |
| **Leftover Box** | Every 50 kills heal 20 / 35 / 60% of missing HP. | sustain |
| **Oven Mitts** | Immune to Burn. Rare: adjacent allies too. Epic: Burning enemies that hit you take their own Burn ×2. | burn |
| **Scarf** | Immune to Chill. Rare: adjacent allies too. Epic: your attackers are Chilled ×2. | chill |
| **Family Recipe** | +8 / 14 / 25% all stats per ally sharing your class, yourself included. | synergy |
| **Team Player** | +5 / 9 / 15% all stats per distinct class at the table. | synergy |
| **Front Line** | +25 / 45 / 80% ARM in a front slot. | position |
| **Back Line** | +40 / 70 / 120% Heat gain in a back slot. | position · heat |
| **Sturdy Boots** | Immune to knockback and pulls. Rare: +15% ARM. Epic: enemies that try to move you are Frozen 1 s. | chill |
| **Sous Chef** | Your Signature gives adjacent allies +25 / 45 / 80 Heat. | heat · synergy |
| **Mise en Place** | Start at 60 / 100 Heat. Epic: and every Course boundary refills Heat to 100. | heat |
| **Timer** | Your Signature fires at least every 15 / 10 / 6 s, Heat or not. | heat |
| **Tip Jar** | A Champion you damaged scores 15 / 20 / 30 instead of 10. | score |
| **Spare Plate** | Your Signature also shields the nearest ally 15 / 25 / 45% max HP. | shield · synergy |
| **Splash Zone** | 40 / 70 / 120% of your basic damage splashes to one adjacent enemy. Epic: two. | splash |
| **Chop Chop** | Your attacks execute enemies below 15 / 25 / 35% HP; 30 a minute at Common, unlimited at Epic. | execute |
| **Chain Reaction** | 60 / 100 / 150% of overkill carries to the next enemy. | execute · splash |
| **Hot Plate** | Enemies that hit you take 30 / 55 / 100% of the damage back. | threat |
| **Dinner Bell** | Every 50 party kills: +40 / 70 / 100 Heat. | heat |
| **Salt Circle** | Enemies within melee of you move 30 / 50 / 70% slower. | chill |
| **Snack** | Every 25 kills a Snack drops at your feet: +3 / 5 / 8% ATK for the fight (Grow) and a 5% heal. | grow · ingredient |
| **Rush Order** | +50 / 80 / 120% SPD for the first 10 s and for 5 s after each Champion enters. | tempo |
| **Second Course** | When a Champion dies: heal 25 / 40 / 70% and +25% ATK for 15 s. | sustain · damage |
| **Steady Hands** | Crits deal ×2 / 2.5 / 3.5. | crit |
| **Serving Hatch** | While above 50% HP, 25 / 40 / 60% of the damage adjacent allies take comes to you instead. | threat · synergy |
| **Last Orders** | Below 30% HP: +40 / 70 / 120% ATK and Heat gain. | scaling |

### 4.2 Pantry Clicks · 16

| Needs | Combo | What switches on |
| --- | --- | --- |
| Hot Plate + Thick Skin | **Cast-Iron Pan** | Hits that deal 0 still reflect, at double. |
| Splash Zone + Chop Chop | **Cleaver** | Executes splash to adjacent enemies as executes. |
| Chain Reaction + Steady Hands | **Butcher’s Block** | Crit overkill carries at 200%. |
| Heat Lamp + Timer | **Pressure Cooker** | Every forced Signature also refunds 50 Heat. |
| Taste for Blood + Last Orders | **Hungry Ghost** | Last Orders triggers at 50% HP and Taste for Blood never caps. |
| Snack + Leftover Box | **Pantry Raid** | Snacks drop every 10 kills while you are below 50% HP. |
| Sous Chef + Dinner Bell | **Service Bell** | Dinner Bell also fires your Signature at 60%. |
| Family Recipe + Team Player | **House Style** | Both count every ally twice. |
| Front Line + Serving Hatch | **Doorman** | Redirected damage is reduced by your ARM twice. |
| Back Line + Long Arms | **Sniper’s Nest** | +50% to enemies more than two tiles away. |
| Salt Circle + Scarf | **Walk-in Freezer** | Enemies in your Salt Circle gain Chill ×1 every second. |
| Oven Mitts + Hot Plate | **Hot Handle** | Reflected damage is Burn ×2 instead. |
| Second Wind + Second Course | **Comeback** | Once a fight, a Champion death stands a fallen adjacent ally back up at 30%. |
| Quick Hands + Rush Order | **Flash in the Pan** | Rush Order never ends while you have the most kills at the table. |
| Big Appetite + Slow Cooker | **Stockpot** | Regen reads your max HP after Big Appetite and heals adjacent allies 1% a second. |
| Mise en Place + Spare Plate | **Table Set** | At the bell every ally gets your Spare Plate shield. |

### 4.3 Facets · per gem

**Ruby · Striker · Burn**

| Card | Common / Rare / Epic | Tags |
| --- | --- | --- |
| **Long Burn** | Burn lasts 8 / 12 / 20 s. | burn |
| **Flash Point** | Burning enemies take +25 / 45 / 80% from every source. | burn · synergy |
| **Ember Heart** | +2 / 4 / 6 Heat per Burn tick on any enemy. | heat |
| **Overheat** | Below 30% HP: +60 / 100 / 160% ATK. | scaling |
| **Wildfire** | When a Burning enemy dies, its Burn jumps to 2 / 3 / 5 adjacent enemies. | horde |
| **Slow Roast** | Burn stacks to 5 / 7 / 10 instead of 3. | burn |
| **Char** | Enemies at max Burn take your crits at ×2.5 / 3 / 4. | crit |
| **Fuel** | Killing a Burning enemy refunds 10 / 18 / 30 Heat. | heat |
| **Open Flame** | Your Signature applies Burn ×2 / 3 / 5 to everything it touches. | burn |
| **Sear** | Your first hit on any enemy deals +50 / 90 / 150%. | damage |

**Sapphire · Warden · Chill and shields**

| Card | Common / Rare / Epic | Tags |
| --- | --- | --- |
| **Deep Freeze** | Freeze lasts 3 / 4 / 6 s. | chill |
| **Frostbite** | Chilled enemies deal −30 / 50 / 70%. | defence |
| **Ice Armour** | Shields from any source are +60 / 100 / 180% larger. | shield |
| **Cold Snap** | Enemies that break out of Freeze take 200 / 350 / 600%. | damage |
| **Bulwark** | Threat ×3. While three or more enemies target you, −25 / 40 / 60% damage taken. | threat |
| **Glacier** | Every 10 s your shield refreshes by 10 / 17 / 28% max HP. | shield |
| **Cold Shoulder** | Enemies that hit you are Chilled ×1. Rare: ×2. Epic: ×2 and Rooted 1 s. | chill |
| **Anchor** | You cannot be moved. Rare: adjacent allies share it. Epic: and they take −20%. | position |
| **Thaw** | When Freeze ends on an enemy, you heal 5 / 8 / 13%. | sustain |
| **Icebox** | Your Signature also gives every adjacent ally a 25 / 40 / 70% shield. | shield · synergy |

**Emerald · Mender · Grow**

| Card | Common / Rare / Epic | Tags |
| --- | --- | --- |
| **Compound** | Grow stacks are +100 / 175 / 300% stronger. | grow |
| **Deep Roots** | Every Grow stack is also +2 / 3.5 / 6% ARM. | grow · defence |
| **Evergreen** | +2 / 3.5 / 6% HP regen per second. | sustain |
| **Harvest** | Each Champion kill: +12 / 20 / 35% all stats for the fight. | scaling |
| **Overflow** | Healing past full becomes a shield, up to 50 / 80 / 140% max HP. | shield |
| **Green Thumb** | Your heals also grant the target +2 / 4 / 6 Grow stacks of +1% max HP. | grow |
| **Compost** | When an ally falls, every living ally gains +12 / 20 / 35% all stats (Grow). | scaling |
| **Fresh Herbs** | Cleansing a debuff heals 12 / 20 / 35% extra. | sustain |
| **Sprout** | Every 50 kills your Signature fires again at 60 / 80 / 100% power. | heat |
| **Photosynthesis** | +2 / 4 / 6 Heat per second while above 70% HP. | heat |

**Facet Clicks**

| Gem | Needs | Click | What switches on |
| --- | --- | --- | --- |
| Ruby | Long Burn + Slow Roast | **Inferno** | Burn ticks twice a second. |
| Ruby | Wildfire + Flash Point | **Backdraft** | Jumped Burns arrive at max stacks. |
| Ruby | Fuel + Ember Heart | **Furnace** | While ten or more enemies Burn, your Signature fires every 4 s. |
| Sapphire | Deep Freeze + Cold Snap | **Shatter** | Break-outs splash 100% to neighbours and Freeze them 1 s. |
| Sapphire | Ice Armour + Glacier | **Glacier Wall** | Your shield never drops below 20% max HP. |
| Sapphire | Bulwark + Cold Shoulder | **Blizzard** | With six or more attackers on you, every attacker is Frozen. |
| Emerald | Compound + Deep Roots | **Old Growth** | Each Grow stack is also +1% ATK. |
| Emerald | Green Thumb + Overflow | **Greenhouse** | Overflow shields grant Grow stacks when they break. |
| Emerald | Sprout + Photosynthesis | **Perennial** | Sprout fires every 25 kills. |

### 4.4 Specials · fight only · 16

| Card | Effect |
| --- | --- |
| **Flash Fry** | Signatures cost 50 Heat; you take +25% damage. |
| **Family Style** | Your Passive reaches every ally at full strength. |
| **Double Shift** | Your Signature fires twice; Heat gain −30%. |
| **Guest Chef** | A bot cook of a random class and your gem joins in slot 6 at 70% power. |
| **Blue Plate** | Start at 100 Heat and 70% HP. |
| **Big Night** | +50% ATK; every 100 kills you lose 10% max HP. |
| **House Special** | Your class’s six Signatures at Common, this fight only. Your House Combo is on. |
| **Clean Station** | Immune to today’s Tier I and Tier II conditions. |
| **Late Shift** | +4% all stats per 100 party kills, max +40%. |
| **Chef’s Kiss** | Your Signature always crits, at ×1.5 on top. |
| **Sharing Plate** | Every 50 kills the whole table heals 15%. |
| **Last Word** | When you fall, your Signature fires three times at 150%. |
| **Wax Seal** | Choose any Pantry augment at Epic for this fight; you take +15% damage. |
| **Blind Tasting** | Your three offers are hidden. Pick one. It is Epic. |
| **Late Seating** | You enter 10 s after the bell with +60% all stats. |
| **Encore** | At Rise your Signature fires first at 300%. Finished, like the rest; it just looks magnificent. |

### 4.5 Table combos · 16

| Needs | Combo | What switches on |
| --- | --- | --- |
| Provider + Host | **Family Dinner** | Ration Ring and Seating Plan reach the whole table at full strength. |
| Foodsmith + Purist | **Two Knives** | Flourish chains three more; The Standard executes below 30%. |
| Spark + Rebel | **Powder Keg** | Kick the Table also casts Start the Feast; knocked-back enemies Burn ×3 and explode for 100% on death. |
| Gastronaut + Stirrer | **Finders Keepers** | Every Ingredient is a Leftover stack and every three stacks drop an Ingredient; both caps +10. |
| Taster + Foodsmith | **Precision** | Signature Strikes execute Analysed enemies below 40%. |
| Taster + Provider | **Test Kitchen** | Serve knocks Analysed enemies back and they take +40% for 5 s. |
| Host + Spark | **Open Bar** | During Toast or Start the Feast every ally heals 5% per hit they land. |
| Rebel + Purist | **The Wall** | Both are immovable, attackers are Chilled ×2, and both use the higher ARM. |
| Stirrer + Spark | **Fireworks** | Every 3 Leftover stacks the Spark’s next fling explodes for 200%. |
| Gastronaut + Host | **Picnic** | Every Ingredient heals the whole table 5% and grants Grow +1%. |
| Two Ruby cuts | **Inferno Kitchen** | Burn stacks to 6 and jumps to two adjacent enemies on death. |
| Sapphire + Emerald | **Cold Storage** | Every shield at the table regenerates 4% a second and grants Grow when it breaks. |
| All three gems | **Full Menu** | Every Signature costs 80 Heat and the first each minute is free. |
| Five distinct classes | **Brigade** | Team Player at Epic for everyone. |
| Two of one class | **Twins** | Family Recipe at Rare for both; Signatures within 2 s of each other fire together at +60%. |
| Two Emerald cuts | **Greenhouse** | Grow stacks are worth double for the table. |

### 4.6 Recipes · 12

| Needs | Combo | What switches on |
| --- | --- | --- |
| Sharp Knife + Pinch of Salt | **Chef’s Knife** | +80% ATK, +60% crit, crits ×2.5. |
| Cast Iron + Hot Plate | **Cast-Iron Skin** | +55% ARM and 100% of damage taken returned. |
| Heat Lamp + Mise en Place | **Rolling Boil** | Start at 100 Heat, +120% Heat gain, Course boundaries refill. |
| Slow Cooker + Leftover Box | **Stockpot** | 6% regen a second and every 25 kills heal 40% of missing HP. |
| Family Recipe + Team Player | **House Style** | +15% all stats per ally at the table, any class. |
| Second Wind + Last Orders | **Phoenix** | Survive three killing blows; each time +120% ATK for 10 s. |
| Splash Zone + Chain Reaction | **Avalanche** | 120% splash to two enemies, 150% overkill carry, and both apply to your Signature. |
| Sous Chef + Dinner Bell | **Service Bell** | Your Signature gives the table +80 Heat and fires at every 50 kills. |
| Front Line + Back Line | **Floor Plan** | Both bonuses, in any slot, at Epic. |
| Quick Hands + Rush Order | **Blur** | +120% SPD, always. |
| Big Appetite + Thick Skin | **Iron Stomach** | +100% max HP; the first 25 hits a minute deal 0. |
| Taste for Blood + Snack | **Feast** | +2% ATK per 5 kills, uncapped; a Snack every 10 kills. |

### 4.7 Menus · 8

**The Inferno Menu** · Long Burn + Wildfire + Flash Point

Burn never expires, jumps on every death to every adjacent enemy, and Burning enemies take +100%. The horde is the fuse.

*Breaks on.* Stale halves nothing here, so it is Fridge Open: Chilled cooks tick slower than the fire spreads. And Sommeliers strip Flash Point.

**The Freezer Menu** · Deep Freeze + Cold Snap + Bulwark

Everything that touches you is Frozen; Frozen enemies shatter at 50% HP.

*Breaks on.* Blackout. Melee reaches the back row, attackers spread, and Bulwark holds nothing.

**The Garden Menu** · Compound + Green Thumb + Harvest

Every heal grants its target +1% all stats (Grow), uncapped.

*Breaks on.* Stale. Half the heals, half the garden.

**The Butcher’s Menu** · Chop Chop + Chain Reaction + Steady Hands

Crits execute below 50% and carry 300% of overkill.

*Breaks on.* Heavy Cream. +25% HP moves every threshold, and Health Inspection takes the crits’ edge.

**The Brigade Menu** · Family Dinner + Open Bar + Brigade

Every ally shares every Passive at the table at half strength.

*Breaks on.* Double Booking. Two Champions a milestone is more than shared passives can hold.

**The Clockwork Menu** · Timer + Heat Lamp + Sous Chef

Every Signature at the table fires together every 8 s.

*Breaks on.* Power Cut and Tasting Menu, in either order.

**The Night Market Menu** · Finders Keepers + Marked Coin + Full Basket

Every kill is an Ingredient and a Leftover; nothing decays; Skewer Toss never stops.

*Breaks on.* Sommeliers. Course IV strips a stack with every hit.

**The Critic’s Menu** · Proof + Second Opinion + Precision

Marked enemies take +150% and every execute jumps the mark.

*Breaks on.* The Ghost of the Old Master, and any Champion order that puts the Critic early.

## 5. The HMD fight

| Course | Kills | Pour | Avg HP | Avg ATK |
| --- | --- | --- | --- | --- |
| I · Amuse-bouche | 0–249 | 6/s | 40 | 6 |
| II · Starter | 250–499 | 7/s | 55 | 12 |
| III · Main | 500–749 | 8/s | 95 | 24 |
| IV · Dessert | 750–999 | 9/s | 170 | 36 |

**Course I · Amuse-bouche**

| Unit | HP | ATK | Share | Behaviour |
| --- | --- | --- | --- | --- |
| **Cupcake** | 35 | 6 | 50% | The bulk of the first Course. swarm, melee. |
| **Weevil** | 20 | 4 | 20% | Packs of six; goes for the back row if it can. swarm, melee. |
| **Mould Blob** | 90 | 8 | 10% | Splits into two Spores (15 HP) on death. Spores count as kills. slow, melee. |
| **Salt Sprite** | 45 | 7 | 20% | Thrower; holds position. standard, mid. |

**Course II · Starter**

| Unit | HP | ATK | Share | Behaviour |
| --- | --- | --- | --- | --- |
| **Line Cook** | 55 | 12 | 45% | The rival table’s rank and file. standard, melee. |
| **Saucier** | 45 | 10 | 20% | Hits apply Burn ×1. standard, long. |
| **Pastry Golem** | 120 | 18 | 10% | 20% ARM; a wall that hides the Sauciers. slow, melee. |
| **Dish Pig** | 45 | 11 | 25% | Leaper: lands in the back row and stays there. standard, melee. |

**Course III · Main**

| Unit | HP | ATK | Share | Behaviour |
| --- | --- | --- | --- | --- |
| **Grease Wraith** | 100 | 24 | 35% | Lifesteal 30%; the Course that punishes thin healing. standard, melee. |
| **Cursed Cutlery** | 32 | 14 | 30% | Packs of eight; chip damage adds up. swarm, melee. |
| **Oven Golem** | 320 | 34 | 10% | 30% ARM; hits apply Burn ×1. slow, melee. |
| **Steam Wisp** | 75 | 0 | 25% | No damage; Chills ×1 whoever it hits. standard, long. |

**Course IV · Dessert**

| Unit | HP | ATK | Share | Behaviour |
| --- | --- | --- | --- | --- |
| **Assistant** | 155 | 36 | 40% | Standard melee, in numbers. standard, melee. |
| **Food Photographer** | 120 | 12 | 15% | Marks a cook: every enemy targets them for 4 s. standard, long. |
| **Sommelier** | 210 | 34 | 25% | Each hit strips one buff or shield. standard, mid. |
| **Plate Spinner** | 195 | 31 | 20% | Reflects 10% of melee damage taken. swarm, melee. |

Champions: One Champion every 100 kills. HP is set by the slot, identity by the daily shuffle; the Critic always takes slot 9 at 900 kills.

| Slot | HP |
| --- | --- |
| 100 kills | 500 |
| 200 kills | 625 |
| 300 kills | 750 |
| 400 kills | 875 |
| 500 kills | 1000 |
| 600 kills | 1125 |
| 700 kills | 1250 |
| 800 kills | 1375 |
| 900 kills | 2000 |

| Champion | ARM | Trick |
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

Today’s Service: Three conditions a day, one per tier, rolled at 00:00 and shown on the lobby card. Tier I from the bell, Tier II from 500 kills, Tier III from 750 kills.

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

## 6. OXP abilities and augments

The colour a seat brings is the colour of its gem. Class is cosmetic: the drawing, the clips, the Limit Breaker cut-in.

| Combo | Base | Mode | Armour ignore | Team buff | Note |
| --- | --- | --- | --- | --- | --- |
| **R R R** | 360 | single | — | — | Maximum damage. |
| **G G G** | 240 | single | 100% | — | Maximum armour pierce. |
| **B B B** | 180 | AOE | — | 65% | Maximum buff. |
| **2R + 1G** | 300 | single | 50% | — |  |
| **2R + 1B** | 260 | AOE | — | 30% |  |
| **2G + 1R** | 260 | single | 75% | — |  |
| **2G + 1B** | 200 | AOE | 75% | 30% |  |
| **2B + 1R** | 220 | AOE | — | 45% |  |
| **2B + 1G** | 180 | AOE | 50% | 45% |  |
| **R + G + B** | 240 | AOE | 50% | 30% | Trinity: Round Delay, staggers Counter, one-turn buffs. |

### 6.1 Seat augments · general · 24

| Card | Common / Rare / Epic | Tags |
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

### 6.2 Seat augments · per gem

**Ruby · Sear and the red hand**

| Card | Common / Rare / Epic | Tags |
| --- | --- | --- |
| **Long Burn** | Sear pays for 2 / 3 / 4 turns. Epic: and stacks. | burn |
| **Flash Point** | A Burning monster takes +25 / 45 / 80%. | burn |
| **Ember Heart** | Every Sear payment adds +10 / 18 / 30 gauge. | gauge |
| **Overheat** | Below 30 Nerve, your combos +60 / 100 / 160%. | gamble |
| **Fury** | Bloodlust is ×2.5 / 3 / 4. | damage |
| **Red Hand** | +25 / 45 / 80% when red is the majority. | colour |
| **Kindling** | R R R combos add Sear ×2 / 3 / 5. | burn |
| **Backdraft** | The next monster starts Burning for 15 / 25 / 40% of its HP. | burn |

**Sapphire · Ward and the blue hand**

| Card | Common / Rare / Epic | Tags |
| --- | --- | --- |
| **Deep Ward** | Ward +25 / 45 / 80. | nerve |
| **Cold Front** | Team buffs from blue-majority combos +25 / 45 / 80%. | colour |
| **Ice Armour** | The Ward refreshes at every turn start. Rare: +15 over cap. Epic: +30. | nerve |
| **Glacier** | Ward left at the end of an encounter converts to gauge ×1.5 / 2 / 3. | gauge |
| **Second Shift** | Prismatic Shift is ×2 / 2.5 / 3.5. | damage |
| **Blue Hand** | +25 / 45 / 80% when blue is the majority. | colour |
| **Frost Wall** | While the Ward holds, buffs last +1 / +2 turns. Epic: breaks too. | tempo |
| **Cold Snap** | When the Ward breaks: attack timer +1 and 150 / 300 / 500 damage. | control |

**Emerald · Grow and the green hand**

| Card | Common / Rare / Epic | Tags |
| --- | --- | --- |
| **Compound** | Grow stacks are +4 / 6 / 9%. | grow |
| **Deep Roots** | Each Grow stack restores 3 / 5 / 8 Nerve a turn. | nerve |
| **Evergreen** | Nerve regenerates 10 / 18 / 30 a turn. | nerve |
| **Harvest** | Boss kills: +12 / 20 / 35% run damage. | grow |
| **Clean Cut** | Exploit is ×2 / 2.5 / 3.5 and the swap costs nothing. | damage |
| **Green Hand** | +25 / 45 / 80% when green is the majority. | colour |
| **Regrowth** | Second Helping also pays +25 / 45 / 80 gauge per kill. | gauge |
| **Overgrowth** | Grow cap 15 / 20 / 30. | grow |

### 6.3 Seat Clicks · 13

| Seat | Needs | Click | What switches on |
| --- | --- | --- | --- |
| Any seat | Opener + Mise en Place | **First Course** | The first combo of every encounter counts as a free Limit Breaker ×1.5. |
| Any seat | Closer + Last Word | **Dessert** | Committing last pays double gauge and refunds 5 Nerve. |
| Any seat | Momentum + Variety | **Rhythm** | Both bonuses apply every turn; you are always either repeating or changing. |
| Any seat | Whetstone + Sharpening Stone | **Boning Knife** | Single-target combos ignore all Defense. |
| Ruby | Kindling + Long Burn | **Inferno** | Sear never expires. |
| Ruby | Fury + Overheat | **Berserk** | Below 30 Nerve, Bloodlust costs no token. |
| Ruby | Flash Point + Backdraft | **Wildfire** | The next monster starts Burning and already takes the Flash Point bonus. |
| Sapphire | Deep Ward + Ice Armour | **Glacier Wall** | The Ward never drops below 30. |
| Sapphire | Second Shift + Cold Front | **Prism** | A recoloured action counts as both colours for buffs. |
| Sapphire | Frost Wall + Cold Snap | **Shatter** | When the Ward breaks the monster’s timer is +2 and it takes 400. |
| Emerald | Compound + Overgrowth | **Old Growth** | Each Grow stack also regenerates 1 Nerve a turn. |
| Emerald | Regrowth + Clean Cut | **Harvest Moon** | An Exploit that kills mints a Limit Token. |
| Emerald | Deep Roots + Evergreen | **Evergreen Table** | Nerve regeneration past 100 becomes Ward. |

### 6.4 Table combos · 8

| Needs | Combo | What switches on |
| --- | --- | --- |
| Opener (seat 1) + Closer (seat 3) | **Bookends** | When seats 1 and 3 commit the same colour the combo counts as pure. |
| Anchor (seat 2) + any Ward | **Keel** | Counter meets the Anchor’s reduction before it touches the Ward. |
| Kindling (Ruby seat) + Harvest (Emerald seat) | **Char Siu** | Sear damage grants Grow stacks. |
| Glacier (Sapphire seat) + Regrowth (Emerald seat) | **Cold Storage** | Leftover Ward becomes Nerve regeneration for the next encounter. |
| Momentum on two seats | **Drumline** | Stacks are shared and cap at five. |
| Red Hand + Blue Hand + Green Hand, one per seat | **Full Menu** | Every Trinity pays all three hand bonuses. |
| Mono table + Family Recipe relic | **House Colours** | The mono bonus is +25% and the deep passive is one step deeper. |
| Trinity table + Trinity Ring relic | **Round Table** | A Round Delay refunds the token spent that turn, once per encounter. |

### 6.5 Party relics · voted

**Common · 16**

| Card | Common / Rare / Epic | Tags |
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

| Card | Common / Rare / Epic | Tags |
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

| Card | Common / Rare / Epic | Tags |
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

| Card | Common / Rare / Epic | Tags |
| --- | --- | --- |
| **Poison Ring** | All combos +50%. Nerve maximum 60. | gamble |
| **Overtime** | The clock is 90 s and every attack timer is one higher. Points −20%. | tempo |
| **All You Can Eat** | Two relics after every fight. Lives reduced to one. | economy |
| **Blind Tasting** | Combos +70%. The combo preview is hidden for the rest of the run. | gamble |
| **Sous Vide** | Monsters never Enrage and Counter is 0. Gauge −40%. | control |
| **Clean Plate** | Kills restore Nerve fully and pay +40 gauge. Tokens cannot be banked past the round they are minted. | nerve |
| **Sommelier’s Cellar** | Limit Breakers cost no token. Each use costs 15 Nerve. | gamble |
| **Cursed Plate** | Combos +80%. Every third combo of an encounter deals 0: the Bin eats it. | gamble |

### 6.6 Course blessings and Leftover relics

| Card | Effect |
| --- | --- |
| **Amuse-bouche** | The first monster of the course has −35% HP. |
| **Sharpened** | +15% damage this course. |
| **Deep Breath** | Nerve maximum 150 this course. |
| **Tasting Notes** | The hot node of every row this course is two reward tiers higher. |
| **Open Kitchen** | Two free rerolls of relic offers this course. |
| **Slow Service** | Attack timers +1 this course; points −10%. |

| Card | Effect |
| --- | --- |
| **Flambé** | Combos +60%. |
| **Ice Bath** | Counter is 0. |
| **Second Helping** | Nerve refills every turn. |
| **Gold Leaf** | Points ×2. |
| **Prism** | Every seat may recolour every turn. |
| **Overclock** | A Limit Token every 40 gauge. |

### 6.7 Recipes · 8

| Needs | Combo | What switches on |
| --- | --- | --- |
| Salt Cellar + Teaspoon | **Pure Kitchen** | Pure-colour combos +50% and +40 gauge. |
| Sharpening Stone + Whetstone | **Boning Knife** | Single-target combos +45% and ignore all Defense. |
| Egg Timer + Order Pad | **Slow Service** | Attack timers cap 5, the clock is 90 s. |
| Cast Iron + Napkin | **Oven Mitts** | Counter drains 14 less per seat and the first three Counters of an encounter are ignored. |
| Loaded Dice + Steady Hand | **High Roller** | Token cap 5 and every Limit Breaker +1. |
| Long Burn + Flash Point | **Inferno** | Sear pays for four turns and a Burning monster takes +80%. |
| Deep Ward + Ice Armour | **Glacier** | Ward 90, refreshed every turn, +30 over cap. |
| Compound + Evergreen | **Greenhouse** | Grow stacks +9% and Nerve regenerates 30 a turn. |

### 6.8 Menus · 6

**The Trinity Menu** · Trinity Ring + Dinner Bell + Chef’s Whistle

Every Trinity mints 10 gauge, the monster skips its Counter, and the buffs last the encounter.

*Breaks on.* Shell and Sticky nodes, and a Blind Tasting row where the table cannot see its own Trinity.

**The Pure Kitchen Menu** · Salt Cellar + Teaspoon + Tasting Flight

Pure combos ×1.5 and a Limit Token every second turn.

*Breaks on.* Ashen, Frosted or Bitter against the table’s colour. The map always offers a way round; the Menu asks you to take it.

**The Ward Menu** · Napkin + Cast Iron + Grease Trap

Counter heals the party and the monster pays for every seat it tries to drain.

*Breaks on.* Rot and Greedy, which never go through Counter.

**The Burn Menu** · Ember Jar + Long Burn + Flash Point

Sear is permanent and doubled; Burning monsters take +80%.

*Breaks on.* Regenerating and Glutton outrun a fire that cannot stack faster.

**The Tempo Menu** · Egg Timer + Order Pad + Second Plate

No monster attacks before turn four, and the buffs you build are still there when it does.

*Breaks on.* Hasty and Short Fuse, and the Colossus’s Enrage step.

**The Score Menu** · Tip Jar + Michelin Star + Coin Purse

Turn-1 kills pay ×3; Elites pay double on top.

*Breaks on.* Thick-skinned and Hardened, which make turn-1 kills a dream.

### 6.9 Monsters, abilities and node modifiers

**Starter pool · rows 1–4**

| Monster | HP | Def | Abilities · pets | TTK | Atk in | Points | Weak · resists |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **Gingerbread Sentry** | 200 | 10% | — | 2 | 3 | 100 | R · — |
| **Meringue Moth** | 150 | 10% | Summon: Cake 1 HP (tutorial) | 2 | 2 | 150 | B · — |
| **Popcorn Swarm** new | 180 | 0% | Summon: 3 × Kernel 30 | 2 | 3 | 150 | R · — |
| **Jam Slime** new | 260 | 0% | Split: at 50% HP spawns Jelly Blob 80 | 3 | 3 | 175 | G · — |
| **Onion Wailer** new | 300 | 10% | Sour | 3 | 3 | 200 | B · R |
| **Boba Blob** new | 320 | 20% | Regen 30 | 3 | 3 | 200 | G · B |
| **Croissant Crab** new | 350 | 30% | Brittle | 3 | 2 | 225 | R · G |
| **Sourdough Ghoul** | 400 | 20% | — | 3 | 3 | 200 | G · R |
| **Roast Drumstick Hound** | 500 | 30% | — | 3 | 3 | 250 | R · B |

**Main pool · rows 6–9**

| Monster | HP | Def | Abilities · pets | TTK | Atk in | Points | Weak · resists |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **Scalding Steam Wraith** | 600 | 40% | Counter 10 | 3 | 3 | 300 | B · G |
| **Cast-Iron Skillet Knight** | 700 | 10% | Counter 10 | 3 | 2 | 350 | G · — |
| **Fondue Hydra** new | 780 | 0% | Summon: 2 × Cheese Head 120 · Glutton | 3 | 3 | 375 | R · B |
| **Sausage-Link Serpent** | 800 | 10% | Counter 10 · Summon: Meatball 100 | 4 | 3 | 400 | B · R |
| **Kimchi Kraken** new | 820 | 20% | Shifting palate · Rot 5 | 4 | 3 | 400 | rotates · — |
| **Pressure-Cooker Golem** new | 850 | 30% | Counter 10 · Vent | 4 | 3 | 425 | G · R |
| **Twin Chili Fangs** | 900 | 10% | Summon: Chili Flake 100 | 4 | 2 | 450 | R · G |
| **Durian Warden** new | 900 | 40% | Shell | 4 | 3 | 450 | B · R |
| **Wagyu Minotaur** new | 1000 | 20% | Enrage · Sticky | 4 | 3 | 475 | G · B |

**Bosses · fixed · and the secret row**

| Monster | HP | Def | Abilities · pets | TTK | Atk in | Points | Weak · resists |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **The Blind Judge of the Palate** row 5 | 950 | 50% | Summon: Salt Block Guardian 100 · Enrage | 5 | 3 | 500 | G · B |
| **The Burnt Caramel Colossus** row 10 | 1250 | 60% | Counter 10 · Summon: 2 × Toffee Golem 300 · Enrage | 6 | 3 | 600 | — · — |
| **The Critic** secret · row 11 | 1500 | 30% | Counter 10 · Summon: Assistant 200 · Mood | 7 | 3 | 1200 | least-used · most-used |

| Card | Effect |
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

## 7. Reference builds

**The wildfire kitchen** · *HMD · Ruby Provider or Spark*

**Take.** Long Burn, Wildfire, Flash Point for the Inferno Menu; Slow Roast for the Inferno Click; Special Open Flame.

Burn becomes the horde’s own weapon: every death lights its neighbours at max stacks, and the cleave keeps the fire moving. The 999 that clears at 22:00 most often looks like this.

**Breaks on.** Fridge Open, Sommeliers.

**The wall** · *HMD · Sapphire Rebel + Purist*

**Take.** Bulwark, Anchor, Cold Shoulder for Blizzard; Cast Iron + Hot Plate fusing to Cast-Iron Skin; Table combo The Wall.

Two immovable fronts that Freeze everything that touches them, with thorns doing the killing. Slow honest kills and a table that reaches Course IV with nobody down.

**Breaks on.** Blackout, Fire Alarm.

**The slow cooker** · *HMD · Emerald Host + Gastronaut*

**Take.** Compound, Green Thumb, Harvest for the Garden Menu; Share the Find, Full Basket; Table combo Picnic.

Nothing happens for two hundred kills, then every Ingredient is a heal and every heal is a permanent stat. The table that is stronger at 2:30 than it was at the bell.

**Breaks on.** Stale.

**Precision** · *HMD · Ruby Foodsmith + Taster*

**Take.** Encore + Sharp Plating for Knife Work; Proof, Second Opinion, Table combo Precision for the Critic’s Menu.

Marked enemies take +150% and every chained crit executes and jumps the mark. The Taster points, the Foodsmith finishes; Champions last four seconds.

**Breaks on.** The Ghost of the Old Master, Double Booking.

**The butcher** · *HMD · any class, Pantry only*

**Take.** Chop Chop, Chain Reaction, Steady Hands for the Butcher’s Menu; Splash Zone for Cleaver; Pinch of Salt.

The build for a cook who never saw a good Facet: crits execute half the field and carry three times over. Proof that the universal pool is a build on its own.

**Breaks on.** Heavy Cream, Health Inspection.

**Mono red** · *OXP · three Ruby seats*

**Take.** Red Hand, Kindling, Fury on the seats; Kindling + Long Burn for Inferno on seat 1; Salt Cellar, Family Recipe for House Colours; Poison Ring after the Judge.

R R R every turn at +25% mono, Sear permanent, no Trinity so Counter is paid in full: Anchor and Cast Iron on seat 2 keep the Nerve alive. Routes around Ashen.

**Breaks on.** Ashen nodes, Regenerating.

**Trinity tempo** · *OXP · one of each gem*

**Take.** Opener, Closer for Bookends; Trinity Ring, Dinner Bell, Chef’s Whistle for the Trinity Menu; Round Table.

Every Trinity buys two turns, skips Counter, refunds its token and keeps its buffs. The table that never sees the Colossus attack.

**Breaks on.** Shell, Sticky, Blind Tasting.

**The ward** · *OXP · two Sapphire, one Emerald*

**Take.** Deep Ward + Ice Armour for Glacier Wall; Frost Wall; Regrowth on the Emerald for Cold Storage; Sous Vide after the Judge.

Counter never reaches Nerve, blue buffs run long, and the Emerald’s kills refill everything. Scores on lives kept.

**Breaks on.** Rot, Greedy.

**The scorekeeper** · *OXP · any table*

**Take.** Tip Jar, Michelin Star, Coin Purse for the Score Menu; Mise en Place + Opener for First Course on seat 1; Quick Fingers.

The run that aims at the board, not the Colossus: every Starter monster dies on turn one for triple points, and the Elites are taken on purpose.

**Breaks on.** Thick-skinned, Hardened.

**Char siu** · *OXP · two Emerald, one Ruby*

**Take.** Kindling on the Ruby, Harvest on an Emerald for Char Siu; Compound + Overgrowth for Old Growth; Full Course.

Every Sear tick is a Grow stack and every stack regenerates Nerve. Weak in row one, absurd by row eight.

**Breaks on.** Glutton, a short map.

## 8. One day, one voice

| Game | Habit chip | Counts when |
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

| Direction | Gift | What it does | Why it is safe |
| --- | --- | --- | --- |
| BaD → HMD | **Packed Lunch** | Plated today: the Special offer before the bell is four wide. | Widens a choice; adds no stat. |
| BaD → OXP | **House Pantry** | Plated today: the run’s first relic offer is four wide. | Widens a choice; adds no stat. |
| HMD or OXP → BaD | **Second Sitting** | Fought today: one more dish swap. | More room to express; the judge is untouched. |
| HMD ↔ OXP | **Same table** | A party that plays both combat games together on one day earns the Same table chip. | A chip, nothing else. |

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
