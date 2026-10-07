# The nine classes, from one budget

> Rendered 7 October 2026 from the OraX design project (Table Wars Design v2 and Compendium v2). The numbers here are copies: the source of truth is `classes.json` in `data/`. Change the JSON, not this prose; the prose carries the rules and the intent. ATK is derived: crowd DPS = ATK × SPD × targets, with crowd DPS fixed by weight (Damage 38, Balanced 34, Support 30, Scaler 30→40). Derive it in code; never hard-code the stat tables.

## The nine classes, from one budget

Each class has one kit: a **Basic** the cook does automatically, a **Passive** , and a **Signature** that fires at 100 Heat. The day’s gem makes a **cut** of that kit toward killing, holding or mending: twenty-seven variants from nine silhouettes and three stones.

### 2.1 The budget

In v1 the classes’ raw damage ranged from 16 to 36 a second. In v2 one rule sets it: **crowd DPS = ATK × SPD × targets** , and the budget fixes crowd DPS by weight. Damage classes get 38, Balanced 34, Support 30, and the Stirrer scales from 30 to 40. ATK is whatever makes the equation true; nobody tunes it by hand. The gem then moves the whole kit: Strikers deal 110%, Menders 95%, Wardens 90%, and the Warden gets the HP and armour back.

| Class | Weight | HP | ATK | SPD | Targets | Crowd DPS | Range | ARM |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Provider** | Balanced | 1300 | 21 | 0.8 | 2 | **33.6** | Melee | 25% |
| **Foodsmith** | Damage | 950 | 26 | 0.8 | 1.8 | **37.4** | Melee | 10% |
| **Spark** | Balanced | 850 | 12 | 1.4 | 2 | **33.6** | Mid | 5% |
| **Gastronaut** | Damage | 750 | 29 | 1.2 | 1.1 | **38.3** | Long | 5% |
| **Taster** | Support | 850 | 30 | 1 | 1 | **30** | Long | 10% |
| **Purist** | Damage | 1100 | 38 | 0.9 | 1.1 | **37.6** | Melee | 20% |
| **Rebel** | Balanced | 1250 | 34 | 1 | 1 | **34** | Melee | 15% |
| **Stirrer** | Scaler | 900 | 12 | 1.3 | 2 | **31 → 41** | Mid | 5% |
| **Host** | Support | 950 | 15 | 1 | 2 | **30** | Mid | 10% |

Targets is the average number of enemies a swing meaningfully hits in a crowd: 2 for a cleave, 1.8 for the Foodsmith’s three cuts and one line crit, 1.1 for a strike that never misses. Heat: +10 per hit landed, +6 per hit taken, +2 a second, plus the gem’s own source; a cook in a crowd casts every seven to nine seconds.

### Provider

_01 · Guardian · Frontline · Balanced weight_

“Everyone eats. Everyone helps.”

The caretaker at the front of the line: broad apron, crossed straps, three keys at the hip. The Provider holds the front and feeds whoever stands beside them. Every part of the kit is about serving; damage, protection and healing all come out of the pot.

**HP** — 1300 · **ATK** — 21 · **SPD** — 0.8 · **Crowd DPS** — 33.6 · **ARM** — 25%

**Weapons.** ♂ serving tongs with a cast-iron pan shield · ♀ two-handed rolling pin **Mirror.** Taster: the Provider cares, the Taster scrutinises.

**Cast cue.** ♂ plants the shield and raises the tongs in a serving salute; three cream dots gather above the pan. ♀ sets the pin upright and traces one warm ring at its barrel.

**Class kit · the same in every cut**

|  |  |  |
| --- | --- | --- |
| **Basic** | **Serve** | A tongs or rolling-pin swing that hits the target and one adjacent enemy. |
| **Passive** | **Ration Ring** | Allies in adjacent slots take 10% less damage. Every 25 kills by the party, the Provider serves a bowl: the most-damaged adjacent ally heals 5%. |
| **Signature** | **Second Helping** | Slams the pot. Every ally heals 15% and every enemy in melee range is knocked back one tile. |

**Three cuts · what the gem changes**

|  |  |  |
| --- | --- | --- |
|  | **Hearthfire** **Striker** | **Basic.** The swing cleaves every enemy in a short arc and applies Burn ×1. **Passive.** Ration Ring instead gives adjacent allies +8% ATK; the Provider gains +2% ATK per Burning enemy on the field (max +30%). **Signature.** Boil Over. 180% to every enemy in melee range, Burn ×2, and the ground burns for 3 s at 8/s. |
|  | **Head of the Table** **Warden** | **Basic.** 2× threat and Chill ×1. **Passive.** Ration Ring is 15%, and the Provider takes what the allies don’t. **Signature.** Lock the Doors. A shield of 40% max HP and an ice wall one tile ahead for 3 s; enemies cannot pass it, and melee enemies that touch it are Frozen. |
|  | **Stewpot** **Mender** | **Basic.** Every 3rd swing serves a bowl instead: the most-damaged ally heals 8%. **Passive.** Ration Ring also regenerates adjacent allies 1% per second; every bowl served grants its ally +1% max HP for the fight (Grow). **Signature.** Second Helping heals 25% and grants every ally +5% max HP for the fight (Grow). |

### Foodsmith

_02 · Finisher · Knife roll · Damage weight_

“Every plate should carry a signature.”

Whites, a standing collar, one knife roll across the back. The Foodsmith does one thing perfectly and then does it again: every fourth cut is the Signature Strike, and the whole kit revolves around landing it in a crowd. Targets 1.8 is the average of three single cuts and one line crit.

**HP** — 950 · **ATK** — 26 · **SPD** — 0.8 · **Crowd DPS** — 37.4 · **ARM** — 10%

**Weapons.** ♂ straight chef’s knife, a body-height long · ♀ two-handled mezzaluna crescent **Mirror.** Purist: the Foodsmith bursts, the Purist grinds.

**Cast cue.** ♂ presents the knife flat on a palm; a cream plating stroke runs along its edge. ♀ holds the mezzaluna level; a plating arc pulses in its crescent.

**Class kit · the same in every cut**

|  |  |  |
| --- | --- | --- |
| **Basic** | **Cut** | A knife or mezzaluna stroke. Every 4th is the Signature Strike: a guaranteed crit that hits every enemy in the line of the cut. |
| **Passive** | **Mise en Place** | Starts the fight at 40 Heat. Every Signature Strike that kills refunds 10 Heat. |
| **Signature** | **Flourish** | Dashes to the densest cluster and cuts through it for 200% in a line. A killing blow chains the cut to the next enemy, up to five. |

**Three cuts · what the gem changes**

|  |  |  |
| --- | --- | --- |
|  | **Flambé** **Striker** | **Basic.** Signature Strikes apply Burn ×2. **Passive.** Each chain kill gives +10% ATK for 3 s, stacking to three. **Signature.** Flourish leaves a fire trail: enemies crossing it take 60% and Burn ×1. |
|  | **Showpiece** **Warden** | **Basic.** 2× threat. Signature Strikes taunt every enemy they hit for 2 s. **Passive.** Above 70% HP the Foodsmith has +25% ARM; every crit taken gives +20 Heat. **Signature.** Showpiece. For 3 s the Foodsmith is the only legal target and takes −50%; when it ends, deals 100% of the damage taken to every attacker. |
|  | **Consommé** **Mender** | **Basic.** Each Signature Strike plates a Dish on the most-damaged ally. It bursts when they drop below 50% HP or after 3 s, healing 12% and cleansing one debuff. **Passive.** Every Dish that bursts makes future Dishes +1% stronger (Grow). **Signature.** Tasting Menu. A Dish on every ally, then Flourish at 120%. |

### Spark

_03 · Igniter · Pastry bench · Balanced weight_

“Start the feast.”

Cropped jacket, two ribbon tails, a bandolier of spice shakers. The Spark gets everyone moving. Whatever the gem, allies beside the Spark are faster; the gem decides what the Spark does while they are.

**HP** — 850 · **ATK** — 12 · **SPD** — 1.4 · **Crowd DPS** — 33.6 · **ARM** — 5%

**Weapons.** ♂ balloon whisk with five wire loops · ♀ linen piping bag, cradled in both hands **Mirror.** Rebel: the Spark speeds allies, the Rebel disrupts enemies.

**Cast cue.** ♂ holds the whisk upright and turns it; three ochre seasoning dots gather above the balloon. ♀ lifts the nozzle and squeezes a small cream spiral.

**Class kit · the same in every cut**

|  |  |  |
| --- | --- | --- |
| **Basic** | **Fling** | Spice from the whisk or piping bag at up to two enemies in mid range. |
| **Passive** | **Ignition** | Adjacent allies gain +10% SPD. Every ally Signature gives the Spark +15 Heat. |
| **Signature** | **Start the Feast** | The party gains +40% SPD for 4 s and +10 Heat. |

**Three cuts · what the gem changes**

|  |  |  |
| --- | --- | --- |
|  | **Firecracker** **Striker** | **Basic.** Hits three enemies; Burn ×1 on the primary. **Passive.** The Spark deals +10% to Burning enemies. **Signature.** While Start the Feast lasts, the Spark’s flings explode for 60% in a small area. |
|  | **Centre Stage** **Warden** | **Basic.** A tray-bash at mid range, 2× threat, Chill ×1. **Passive.** While two or more enemies target the Spark it takes −20% and Ignition is +15% instead of +10%. **Signature.** Spotlight. Every enemy in mid range attacks the Spark for 3 s; the Spark gains a 35% shield and adjacent allies +20 Heat. |
|  | **Plus One** **Mender** | **Basic.** Unchanged. **Passive.** Ignition also regenerates adjacent allies 1.5% per second. A Guest (150 HP, 12 ATK) joins in slot 6 at the bell and gains +5% all stats per 50 party kills (Grow). **Signature.** Toast. Every ally gains +10 Heat and +25% SPD for 3 s, and heals 3% per hit they land while it lasts. |

### Gastronaut

_04 · Skirmisher · Noodle stall · Damage weight_

“Look where no one else is looking.”

Pack, creel, map tube and a three-tier tiffin. The Gastronaut fights from the back and brings things home: enemy deaths drop Ingredients the party eats for a permanent edge.

**HP** — 750 · **ATK** — 29 · **SPD** — 1.2 · **Crowd DPS** — 38.3 · **ARM** — 5%

**Weapons.** ♂ two bamboo chopsticks carried as walking poles · ♀ spider strainer on a long bamboo handle **Mirror.** Stirrer: the Gastronaut finds things, the Stirrer takes them.

**Cast cue.** ♂ plants both chopsticks and lifts the head; three path-like cream dots rise between the sticks. ♀ presents the strainer level; three cream dots gather over the bowl.

**Class kit · the same in every cut**

|  |  |  |
| --- | --- | --- |
| **Basic** | **Jab** | A chopstick jab or strainer scoop at long range; +20% against the farthest enemy. |
| **Passive** | **Forage** | Enemies killed by anyone drop an Ingredient 10% of the time (Gastronaut kills 25%). The nearest cook eats it: +1% ATK for the fight (Grow), to +30%. Champions shower five. |
| **Signature** | **Volley** | Three shots at the three farthest enemies, 120% each. |

**Three cuts · what the gem changes**

|  |  |  |
| --- | --- | --- |
|  | **Pepper** **Striker** | **Basic.** Pierces one enemy behind the target. **Passive.** An eaten Ingredient Burns ×1 every enemy near where it fell. **Signature.** Volley applies Burn ×2 and gains one more shot per 250 party kills, up to six. |
|  | **Lure** **Warden** | **Basic.** 2× threat. **Passive.** Bramble Pack. Melee attackers take 15% of their damage back as thorns; enemies walking toward the Gastronaut are slowed 20%. **Signature.** Scent Lure. Every enemy on the field must attack the Gastronaut for 3 s along a thorn path that deals 20 per second to anything crossing it. |
|  | **Herbalist** **Mender** | **Basic.** Every 3rd shot instead drops a Herb Pouch on the most-damaged ally: a 6% heal and +1% max HP for the fight (Grow). **Passive.** Ingredients also heal the eater 5%. **Signature.** Seed Cache. Plants a cache in the back row that grows a stage every 5 s (max 5). At each Course boundary it bursts: every ally heals 4% and gains +2% all stats per stage (Grow). |

### Taster

_05 · Analyst · Assay bench · Support weight_

“I test first, so others do not have to.”

One enlarged gauntlet, a diagonal row of vials, a loupe at the brow. The Taster marks what matters. Every cut Analyses the biggest threat in range so the whole party hits it harder; that mark is worth about four points of the budget, which is why the Taster’s own DPS is Support weight.

**HP** — 850 · **ATK** — 30 · **SPD** — 1 · **Crowd DPS** — 30 · **ARM** — 10%

**Weapons.** ♂ pivot fan of three chef’s spoons · ♀ giant microplane rasp **Mirror.** Provider: the Taster scrutinises, the Provider cares.

**Cast cue.** ♂ raises the spoon fan to the light; one amber dot pulses above the centre spoon. ♀ holds the microplane vertical and inspects a falling amber shaving.

**Class kit · the same in every cut**

|  |  |  |
| --- | --- | --- |
| **Basic** | **Sample** | A spoon or microplane throw at long range. |
| **Passive** | **Analyse** | The highest-HP enemy in range is always Analysed: it takes +20% from the party. When it dies, the mark jumps to the next. |
| **Signature** | **Verdict** | Every enemy within long range is Analysed for 5 s, and the Taster’s next five samples crit. |

**Three cuts · what the gem changes**

|  |  |  |
| --- | --- | --- |
|  | **Hot Verdict** **Striker** | **Basic.** Burn ×1. **Passive.** Burn ticks on Analysed enemies deal double. **Signature.** While Verdict lasts, every party hit on an Analysed enemy applies Burn ×1. |
|  | **Inspector** **Warden** | **Basic.** 2× threat. **Passive.** Under Inspection. Enemies attacking the Taster deal −15%; the Taster has +5% ARM per Analysed enemy alive, max +25%. **Signature.** Inspection. Every enemy in long range must attack the Taster for 3 s and has 0 ARM while doing so. |
|  | **Antidote** **Mender** | **Basic.** Poison 3 per second for 3 s; half the poison damage returns as healing to the most-damaged ally. **Passive.** Quality Control. Allies adjacent to the Taster are immune to Burn and poison; whenever an ally is cleansed by anyone they heal 5%. **Signature.** Remedy. Every ally is cleansed, heals 10% and is immune to debuffs for 3 s. |

### Purist

_06 · Duelist · Trim bench · Damage weight_

“Keep the craft honest.”

An ankle-length wrap with one seam, a sealed case, the tool held away from the body. The Purist refuses: no debuff sticks and no strike misses. Targets 1.1 is the worth of never missing and ignoring a fifth of the armour.

**HP** — 1100 · **ATK** — 38 · **SPD** — 0.9 · **Crowd DPS** — 37.6 · **ARM** — 20%

**Weapons.** ♂ long plating tweezers, gripped like a fencing tool · ♀ closed kitchen shears, one long point **Mirror.** Foodsmith: the Purist grinds, the Foodsmith bursts.

**Cast cue.** ♂ closes the tweezer tips around one floating cream leaf and lifts it. ♀ opens and closes the shears around one floating cream thread.

**Class kit · the same in every cut**

|  |  |  |
| --- | --- | --- |
| **Basic** | **Exact Cut** | A tweezers or shears thrust that never misses and ignores 20% ARM. |
| **Passive** | **Uncompromised** | Immune to every debuff: Burn, Chill, poison, stun, knockback and pulls. |
| **Signature** | **The Standard** | For 4 s every Exact Cut deals true damage and executes enemies below 15% HP. |

**Three cuts · what the gem changes**

|  |  |  |
| --- | --- | --- |
|  | **Clean Sear** **Striker** | **Basic.** +10% ATK while above 80% HP. **Passive.** Kills refund 15 Heat. **Signature.** Clean Sear replaces The Standard: a 300% strike. If it kills, regain 100 Heat and strike the next target, chaining up to three. |
|  | **Hold the Line** **Warden** | **Basic.** 2× threat, Chill ×1. **Passive.** Standard. −10% damage taken per debuff on the attacker, max −30%. **Signature.** Hold the Line. For 3 s the Purist is immovable, takes −50%, and every enemy in melee range must attack it. |
|  | **Preserve** **Mender** | **Basic.** Every 3rd cut instead Preserves the most-damaged ally: a shield of 8% max HP. **Passive.** Sealed Case. Purist shields cannot be stripped and last until spent; an ally holding one is immune to Burn. **Signature.** Tradition. Every ally gains a 15% shield and +2% ARM for the fight (Grow). Nothing is ever healed by this cut; nothing gets through in the first place. |

### Rebel

_07 · Disruptor · Pounding bench · Balanced weight_

“People before rules.”

A cropped academy jacket with three patches, a short sash, the communal pot on the hip. The Rebel gets in the way on purpose. Every cut reacts when an ally is in trouble; the gem decides how loud the reaction is.

**HP** — 1250 · **ATK** — 34 · **SPD** — 1 · **Crowd DPS** — 34 · **ARM** — 15%

**Weapons.** ♂ waffle-face tenderising mallet · ♀ stone mortar cradled in one arm, pestle in the other **Mirror.** Spark: the Rebel disrupts enemies, the Spark speeds allies.

**Cast cue.** ♂ taps the mallet by the communal pot; a cream ring appears above it. ♀ stirs the pestle and lifts a warm ring from the bowl.

**Class kit · the same in every cut**

|  |  |  |
| --- | --- | --- |
| **Basic** | **Pound** | A mallet or pestle strike. Every 4th knocks the target back one tile. |
| **Passive** | **People Before Rules** | When an ally drops below 30% HP, enemies attacking them must attack the Rebel for 2 s (once per ally every 20 s). |
| **Signature** | **Kick the Table** | Every enemy in melee range is knocked back two tiles for 120%. Enemies knocked into others deal 60% to them. |

**Three cuts · what the gem changes**

|  |  |  |
| --- | --- | --- |
|  | **Firebrand** **Striker** | **Basic.** The 4th strike also applies Burn ×1. **Passive.** +20% ATK while any ally is below 50% HP. **Signature.** Kick the Table applies Burn ×2 and gives the Rebel +5% ATK per enemy hit for 5 s. |
|  | **Barricade** **Warden** | **Basic.** 2× threat. **Passive.** Human Shield. The taunt lasts 3 s and the Rebel has +20% ARM while it holds. **Signature.** Picket Line. Every enemy within a tile of melee must attack the Rebel for 3 s; when it ends, the Rebel deals 100% of the damage taken to every adjacent enemy. |
|  | **Communal Pot** **Mender** | **Basic.** Every 3rd strike instead Takes the Wound: the most-damaged ally heals 10% and the Rebel loses 5%. **Passive.** Share the Pot. The Rebel regenerates 2% per second while below 50% HP. **Signature.** Rally. Every ally below 50% heals 15% and gains +15% ATK for 4 s; the Rebel gains +4% max HP per ally rallied (Grow). |

### Stirrer

_08 · Trickster · Street stall · Scaler weight_

“Waste nothing. Miss nothing.”

Half-apron over trousers, rolled sleeves, a headband with two tails. The Stirrer profits from the mess: every death on the field is a Leftover, and Leftovers are power. The Stirrer starts under budget and ends over it.

**HP** — 900 · **ATK** — 12 · **SPD** — 1.3 · **Crowd DPS** — 31 → 41 · **ARM** — 5%

**Weapons.** ♂ deep-bowled ladle staff · ♀ broad wok turner **Mirror.** Gastronaut: the Stirrer takes things, the Gastronaut finds them.

**Cast cue.** ♂ tips the ladle in a controlled pour; one steam curl rises. ♀ circles the turner once from the wrist; one steam curl follows.

**Class kit · the same in every cut**

|  |  |  |
| --- | --- | --- |
| **Basic** | **Flick** | A ladle sweep or turner flick at up to two enemies. |
| **Passive** | **Waste Nothing** | Every death on the field gives a Leftover stack (max 10): +1.5% ATK and +1.5% SPD each. Stacks decay one per 5 s without a kill. |
| **Signature** | **Skewer Toss** | Skewers at three random enemies for 110% each, plus one skewer per three Leftover stacks. |

**Three cuts · what the gem changes**

|  |  |  |
| --- | --- | --- |
|  | **Skewer** **Striker** | **Basic.** Burn ×1 on the second target. **Passive.** Each stack also gives +2% Burn damage. **Signature.** Skewers apply Burn ×1 and deal +50% to enemies already Burning. |
|  | **Stall** **Warden** | **Basic.** 2× threat, thrown from behind the folding stall. **Passive.** Folding Stall. Starts with a 20% shield that rebuilds 1% per Leftover stack gained; while it holds, adjacent allies take −10%. **Signature.** Slip Away. Vanishes for 2 s (every enemy attacking the Stirrer is Frozen), reappears with a 25% shield and throws the Toss. |
|  | **Leftovers** **Mender** | **Basic.** 40% of the damage is skimmed off and given as healing to the most-damaged ally. **Passive.** At every 50-kill milestone every ally heals 1% per Leftover stack. **Signature.** Leftovers. Consumes all stacks: allies heal 3% per stack and every three stacks spawn a Scrap (60 HP, 8 ATK) that fights until it dies. |

### Host

_09 · Coordinator · Oven mouth · Support weight_

“The right seat can change a life.”

A tailcoat with two tails, a folded cloth over the forearm, three place cards at the breast. The Host makes the seating plan matter: something good passes between allies who stand together. The gem decides what.

**HP** — 950 · **ATK** — 15 · **SPD** — 1 · **Crowd DPS** — 30 · **ARM** — 10%

**Weapons.** ♂ round metal turning peel on a long shaft · ♀ broad wooden launch peel **Mirror.** None. The Host sits in the middle and makes placement matter.

**Cast cue.** Keeps the peel planted and sweeps the cloth-bearing forearm in a gracious invitation; a small warm ring opens before the palm.

**Class kit · the same in every cut**

|  |  |  |
| --- | --- | --- |
| **Basic** | **Place Card** | A peel thrust or thrown card that hits two enemies. |
| **Passive** | **Seating Plan** | Allies in adjacent slots share 15% of any healing or shield either receives. |
| **Signature** | **Change of Seat** | Swaps the most-damaged ally’s slot with the Host’s and shields the ally for 20% max HP. |

**Three cuts · what the gem changes**

|  |  |  |
| --- | --- | --- |
|  | **Toast of the Table** **Striker** | **Basic.** Unchanged. **Passive.** Adjacent allies also gain +8% ATK. **Signature.** Toast. Every ally’s next three attacks crit and Burn ×1, and the Host strikes the target for 200%. |
|  | **Doorman** **Warden** | **Basic.** 2× threat. **Passive.** The Host takes 30% of the damage dealt to adjacent allies and has +20% ARM. **Signature.** Guest of Honour. Links to the highest-ATK ally for 5 s: half their damage taken goes to the Host, their attacks crit, and the Host heals 5% per second. |
|  | **Long Table** **Mender** | **Basic.** Every 3rd card instead heals the most-damaged ally 6%. **Passive.** Sharing is 25%, and the Host heals 2% whenever an adjacent ally is healed by anyone. **Signature.** Long Table. A heal over time on every ally, 3% per second for 4 s; each cast adds +1% per second for the fight (Grow). |