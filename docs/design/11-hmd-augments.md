# HMD — kits, cuts, House Combos and the augment catalogue

> Rendered 7 October 2026 from the OraX design project (Table Wars Design v2 and Compendium v2). The numbers here are copies: the source of truth is `augments.json` → `hmd`, and `classes.json` in `data/`. Change the JSON, not this prose; the prose carries the rules and the intent. Values read Common / Rare / Epic.

## HMD kits, cuts and House Combos

A class kit is a Basic, a Passive and a Signature that fires at 100 Heat; the day’s gem makes a cut of it. Stats come from the Design v2 budget. New in v2: every class carries a **House Combo** , two of its own Signatures that make it OP on its own. It is printed on the class card so a player knows from day one what their class is reaching for.

**House Combos · OP alone**

|  |  |  |  |
| --- | --- | --- | --- |
| **Provider** | **Soup Kitchen** | Second Serving + Big Pot | Every bowl served also hits every enemy in melee range for 100% and knocks it back a tile. |
| **Foodsmith** | **Knife Work** | Encore + Sharp Plating | Signature Strikes chain like Flourish, up to three enemies, each a crit. |
| **Spark** | **Fireworks Finale** | Party Trick + Crowd Work | Every ally Signature has a 25% chance to fire Start the Feast free. |
| **Gastronaut** | **Harvest Festival** | Sharp Eyes + Full Basket | Champions drop an Ingredient at every 10% of HP lost; Ingredients never miss a cook. |
| **Taster** | **Recall Notice** | Second Opinion + Bad Batch | When any marked enemy dies, every marked enemy takes the burst. |
| **Purist** | **Standard Bearer** | Whetstone + Discipline | While above 90% HP every Exact Cut is true damage, permanently. |
| **Rebel** | **General Strike** | Loud Voice + Union | Every taunt trigger also fires Kick the Table at 50%. |
| **Stirrer** | **Night Market** | Marked Coin + Hoarder | At 20 or more Leftover stacks, Skewer Toss fires every 5 s free. |
| **Host** | **Long Table** | Open Table + Extra Chair | Every heal or shield anywhere at the table is shared with everyone. |

### Provider

_Guardian · Melee · HP 1300 · ATK 21 · SPD 0.8 · ARM 25% · crowd DPS 33.6_

|  |  |  |
| --- | --- | --- |
| **Basic** | **Serve** | A tongs or rolling-pin swing that hits the target and one adjacent enemy. |
| **Passive** | **Ration Ring** | Allies in adjacent slots take 10% less damage. Every 25 kills by the party, the Provider serves a bowl: the most-damaged adjacent ally heals 5%. |
| **Signature** | **Second Helping** | Slams the pot. Every ally heals 15% and every enemy in melee range is knocked back one tile. |

|  |  |  |
| --- | --- | --- |
| **Striker** | **Hearthfire** | **Basic.** The swing cleaves every enemy in a short arc and applies Burn ×1. **Passive.** Ration Ring instead gives adjacent allies +8% ATK; the Provider gains +2% ATK per Burning enemy on the field (max +30%). **Signature.** Boil Over. 180% to every enemy in melee range, Burn ×2, and the ground burns for 3 s at 8/s. |
| **Warden** | **Head of the Table** | **Basic.** 2× threat and Chill ×1. **Passive.** Ration Ring is 15%, and the Provider takes what the allies don’t. **Signature.** Lock the Doors. A shield of 40% max HP and an ice wall one tile ahead for 3 s; enemies cannot pass it, and melee enemies that touch it are Frozen. |
| **Mender** | **Stewpot** | **Basic.** Every 3rd swing serves a bowl instead: the most-damaged ally heals 8%. **Passive.** Ration Ring also regenerates adjacent allies 1% per second; every bowl served grants its ally +1% max HP for the fight (Grow). **Signature.** Second Helping heals 25% and grants every ally +5% max HP for the fight (Grow). |

### Foodsmith

_Finisher · Melee · HP 950 · ATK 26 · SPD 0.8 · ARM 10% · crowd DPS 37.4_

|  |  |  |
| --- | --- | --- |
| **Basic** | **Cut** | A knife or mezzaluna stroke. Every 4th is the Signature Strike: a guaranteed crit that hits every enemy in the line of the cut. |
| **Passive** | **Mise en Place** | Starts the fight at 40 Heat. Every Signature Strike that kills refunds 10 Heat. |
| **Signature** | **Flourish** | Dashes to the densest cluster and cuts through it for 200% in a line. A killing blow chains the cut to the next enemy, up to five. |

|  |  |  |
| --- | --- | --- |
| **Striker** | **Flambé** | **Basic.** Signature Strikes apply Burn ×2. **Passive.** Each chain kill gives +10% ATK for 3 s, stacking to three. **Signature.** Flourish leaves a fire trail: enemies crossing it take 60% and Burn ×1. |
| **Warden** | **Showpiece** | **Basic.** 2× threat. Signature Strikes taunt every enemy they hit for 2 s. **Passive.** Above 70% HP the Foodsmith has +25% ARM; every crit taken gives +20 Heat. **Signature.** Showpiece. For 3 s the Foodsmith is the only legal target and takes −50%; when it ends, deals 100% of the damage taken to every attacker. |
| **Mender** | **Consommé** | **Basic.** Each Signature Strike plates a Dish on the most-damaged ally. It bursts when they drop below 50% HP or after 3 s, healing 12% and cleansing one debuff. **Passive.** Every Dish that bursts makes future Dishes +1% stronger (Grow). **Signature.** Tasting Menu. A Dish on every ally, then Flourish at 120%. |

### Spark

_Igniter · Mid · HP 850 · ATK 12 · SPD 1.4 · ARM 5% · crowd DPS 33.6_

|  |  |  |
| --- | --- | --- |
| **Basic** | **Fling** | Spice from the whisk or piping bag at up to two enemies in mid range. |
| **Passive** | **Ignition** | Adjacent allies gain +10% SPD. Every ally Signature gives the Spark +15 Heat. |
| **Signature** | **Start the Feast** | The party gains +40% SPD for 4 s and +10 Heat. |

|  |  |  |
| --- | --- | --- |
| **Striker** | **Firecracker** | **Basic.** Hits three enemies; Burn ×1 on the primary. **Passive.** The Spark deals +10% to Burning enemies. **Signature.** While Start the Feast lasts, the Spark’s flings explode for 60% in a small area. |
| **Warden** | **Centre Stage** | **Basic.** A tray-bash at mid range, 2× threat, Chill ×1. **Passive.** While two or more enemies target the Spark it takes −20% and Ignition is +15% instead of +10%. **Signature.** Spotlight. Every enemy in mid range attacks the Spark for 3 s; the Spark gains a 35% shield and adjacent allies +20 Heat. |
| **Mender** | **Plus One** | **Basic.** Unchanged. **Passive.** Ignition also regenerates adjacent allies 1.5% per second. A Guest (150 HP, 12 ATK) joins in slot 6 at the bell and gains +5% all stats per 50 party kills (Grow). **Signature.** Toast. Every ally gains +10 Heat and +25% SPD for 3 s, and heals 3% per hit they land while it lasts. |

### Gastronaut

_Skirmisher · Long · HP 750 · ATK 29 · SPD 1.2 · ARM 5% · crowd DPS 38.3_

|  |  |  |
| --- | --- | --- |
| **Basic** | **Jab** | A chopstick jab or strainer scoop at long range; +20% against the farthest enemy. |
| **Passive** | **Forage** | Enemies killed by anyone drop an Ingredient 10% of the time (Gastronaut kills 25%). The nearest cook eats it: +1% ATK for the fight (Grow), to +30%. Champions shower five. |
| **Signature** | **Volley** | Three shots at the three farthest enemies, 120% each. |

|  |  |  |
| --- | --- | --- |
| **Striker** | **Pepper** | **Basic.** Pierces one enemy behind the target. **Passive.** An eaten Ingredient Burns ×1 every enemy near where it fell. **Signature.** Volley applies Burn ×2 and gains one more shot per 250 party kills, up to six. |
| **Warden** | **Lure** | **Basic.** 2× threat. **Passive.** Bramble Pack. Melee attackers take 15% of their damage back as thorns; enemies walking toward the Gastronaut are slowed 20%. **Signature.** Scent Lure. Every enemy on the field must attack the Gastronaut for 3 s along a thorn path that deals 20 per second to anything crossing it. |
| **Mender** | **Herbalist** | **Basic.** Every 3rd shot instead drops a Herb Pouch on the most-damaged ally: a 6% heal and +1% max HP for the fight (Grow). **Passive.** Ingredients also heal the eater 5%. **Signature.** Seed Cache. Plants a cache in the back row that grows a stage every 5 s (max 5). At each Course boundary it bursts: every ally heals 4% and gains +2% all stats per stage (Grow). |

### Taster

_Analyst · Long · HP 850 · ATK 30 · SPD 1 · ARM 10% · crowd DPS 30_

|  |  |  |
| --- | --- | --- |
| **Basic** | **Sample** | A spoon or microplane throw at long range. |
| **Passive** | **Analyse** | The highest-HP enemy in range is always Analysed: it takes +20% from the party. When it dies, the mark jumps to the next. |
| **Signature** | **Verdict** | Every enemy within long range is Analysed for 5 s, and the Taster’s next five samples crit. |

|  |  |  |
| --- | --- | --- |
| **Striker** | **Hot Verdict** | **Basic.** Burn ×1. **Passive.** Burn ticks on Analysed enemies deal double. **Signature.** While Verdict lasts, every party hit on an Analysed enemy applies Burn ×1. |
| **Warden** | **Inspector** | **Basic.** 2× threat. **Passive.** Under Inspection. Enemies attacking the Taster deal −15%; the Taster has +5% ARM per Analysed enemy alive, max +25%. **Signature.** Inspection. Every enemy in long range must attack the Taster for 3 s and has 0 ARM while doing so. |
| **Mender** | **Antidote** | **Basic.** Poison 3 per second for 3 s; half the poison damage returns as healing to the most-damaged ally. **Passive.** Quality Control. Allies adjacent to the Taster are immune to Burn and poison; whenever an ally is cleansed by anyone they heal 5%. **Signature.** Remedy. Every ally is cleansed, heals 10% and is immune to debuffs for 3 s. |

### Purist

_Duelist · Melee · HP 1100 · ATK 38 · SPD 0.9 · ARM 20% · crowd DPS 37.6_

|  |  |  |
| --- | --- | --- |
| **Basic** | **Exact Cut** | A tweezers or shears thrust that never misses and ignores 20% ARM. |
| **Passive** | **Uncompromised** | Immune to every debuff: Burn, Chill, poison, stun, knockback and pulls. |
| **Signature** | **The Standard** | For 4 s every Exact Cut deals true damage and executes enemies below 15% HP. |

|  |  |  |
| --- | --- | --- |
| **Striker** | **Clean Sear** | **Basic.** +10% ATK while above 80% HP. **Passive.** Kills refund 15 Heat. **Signature.** Clean Sear replaces The Standard: a 300% strike. If it kills, regain 100 Heat and strike the next target, chaining up to three. |
| **Warden** | **Hold the Line** | **Basic.** 2× threat, Chill ×1. **Passive.** Standard. −10% damage taken per debuff on the attacker, max −30%. **Signature.** Hold the Line. For 3 s the Purist is immovable, takes −50%, and every enemy in melee range must attack it. |
| **Mender** | **Preserve** | **Basic.** Every 3rd cut instead Preserves the most-damaged ally: a shield of 8% max HP. **Passive.** Sealed Case. Purist shields cannot be stripped and last until spent; an ally holding one is immune to Burn. **Signature.** Tradition. Every ally gains a 15% shield and +2% ARM for the fight (Grow). Nothing is ever healed by this cut; nothing gets through in the first place. |

### Rebel

_Disruptor · Melee · HP 1250 · ATK 34 · SPD 1 · ARM 15% · crowd DPS 34_

|  |  |  |
| --- | --- | --- |
| **Basic** | **Pound** | A mallet or pestle strike. Every 4th knocks the target back one tile. |
| **Passive** | **People Before Rules** | When an ally drops below 30% HP, enemies attacking them must attack the Rebel for 2 s (once per ally every 20 s). |
| **Signature** | **Kick the Table** | Every enemy in melee range is knocked back two tiles for 120%. Enemies knocked into others deal 60% to them. |

|  |  |  |
| --- | --- | --- |
| **Striker** | **Firebrand** | **Basic.** The 4th strike also applies Burn ×1. **Passive.** +20% ATK while any ally is below 50% HP. **Signature.** Kick the Table applies Burn ×2 and gives the Rebel +5% ATK per enemy hit for 5 s. |
| **Warden** | **Barricade** | **Basic.** 2× threat. **Passive.** Human Shield. The taunt lasts 3 s and the Rebel has +20% ARM while it holds. **Signature.** Picket Line. Every enemy within a tile of melee must attack the Rebel for 3 s; when it ends, the Rebel deals 100% of the damage taken to every adjacent enemy. |
| **Mender** | **Communal Pot** | **Basic.** Every 3rd strike instead Takes the Wound: the most-damaged ally heals 10% and the Rebel loses 5%. **Passive.** Share the Pot. The Rebel regenerates 2% per second while below 50% HP. **Signature.** Rally. Every ally below 50% heals 15% and gains +15% ATK for 4 s; the Rebel gains +4% max HP per ally rallied (Grow). |

### Stirrer

_Trickster · Mid · HP 900 · ATK 12 · SPD 1.3 · ARM 5% · crowd DPS 31 → 41_

|  |  |  |
| --- | --- | --- |
| **Basic** | **Flick** | A ladle sweep or turner flick at up to two enemies. |
| **Passive** | **Waste Nothing** | Every death on the field gives a Leftover stack (max 10): +1.5% ATK and +1.5% SPD each. Stacks decay one per 5 s without a kill. |
| **Signature** | **Skewer Toss** | Skewers at three random enemies for 110% each, plus one skewer per three Leftover stacks. |

|  |  |  |
| --- | --- | --- |
| **Striker** | **Skewer** | **Basic.** Burn ×1 on the second target. **Passive.** Each stack also gives +2% Burn damage. **Signature.** Skewers apply Burn ×1 and deal +50% to enemies already Burning. |
| **Warden** | **Stall** | **Basic.** 2× threat, thrown from behind the folding stall. **Passive.** Folding Stall. Starts with a 20% shield that rebuilds 1% per Leftover stack gained; while it holds, adjacent allies take −10%. **Signature.** Slip Away. Vanishes for 2 s (every enemy attacking the Stirrer is Frozen), reappears with a 25% shield and throws the Toss. |
| **Mender** | **Leftovers** | **Basic.** 40% of the damage is skimmed off and given as healing to the most-damaged ally. **Passive.** At every 50-kill milestone every ally heals 1% per Leftover stack. **Signature.** Leftovers. Consumes all stacks: allies heal 3% per stack and every three stacks spawn a Scrap (60 HP, 8 ATK) that fights until it dies. |

### Host

_Coordinator · Mid · HP 950 · ATK 15 · SPD 1 · ARM 10% · crowd DPS 30_

|  |  |  |
| --- | --- | --- |
| **Basic** | **Place Card** | A peel thrust or thrown card that hits two enemies. |
| **Passive** | **Seating Plan** | Allies in adjacent slots share 15% of any healing or shield either receives. |
| **Signature** | **Change of Seat** | Swaps the most-damaged ally’s slot with the Host’s and shields the ally for 20% max HP. |

|  |  |  |
| --- | --- | --- |
| **Striker** | **Toast of the Table** | **Basic.** Unchanged. **Passive.** Adjacent allies also gain +8% ATK. **Signature.** Toast. Every ally’s next three attacks crit and Burn ×1, and the Host strikes the target for 200%. |
| **Warden** | **Doorman** | **Basic.** 2× threat. **Passive.** The Host takes 30% of the damage dealt to adjacent allies and has +20% ARM. **Signature.** Guest of Honour. Links to the highest-ATK ally for 5 s: half their damage taken goes to the Host, their attacks crit, and the Host heals 5% per second. |
| **Mender** | **Long Table** | **Basic.** Every 3rd card instead heals the most-damaged ally 6%. **Passive.** Sharing is 25%, and the Host heals 2% whenever an adjacent ally is healed by anyone. **Signature.** Long Table. A heal over time on every ally, 3% per second for 4 s; each cast adds +1% per second for the fight (Grow). |

## HMD augments and combos

Four permanent picks a day at the Prep windows, each from an offer of one Pantry, one Facet and one Signature at the window’s tier; one Special before the bell. Values read Common / Rare / Epic. Every card lists its keyword tags; a Click, Recipe or Menu is where two tags meet.

### C.1 Pantry · general · 36

| Augment | Common / Rare / Epic | Tags |
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

### C.2 Pantry Clicks · 16

Hold both on one cook and the Click is on. Both cards stay; nothing fuses.

|  |  |  |
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

### C.3 Facets · gem · 10 per gem, three Clicks each

- **Ruby · Striker · Burn**

|  |  |  |
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

- **Sapphire · Warden · Chill and shields**

|  |  |  |
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

- **Emerald · Mender · Grow**

|  |  |  |
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

|  |  |  |  |
| --- | --- | --- | --- |
| **Ruby** | Long Burn + Slow Roast | **Inferno** | Burn ticks twice a second. |
| **Ruby** | Wildfire + Flash Point | **Backdraft** | Jumped Burns arrive at max stacks. |
| **Ruby** | Fuel + Ember Heart | **Furnace** | While ten or more enemies Burn, your Signature fires every 4 s. |
| **Sapphire** | Deep Freeze + Cold Snap | **Shatter** | Break-outs splash 100% to neighbours and Freeze them 1 s. |
| **Sapphire** | Ice Armour + Glacier | **Glacier Wall** | Your shield never drops below 20% max HP. |
| **Sapphire** | Bulwark + Cold Shoulder | **Blizzard** | With six or more attackers on you, every attacker is Frozen. |
| **Emerald** | Compound + Deep Roots | **Old Growth** | Each Grow stack is also +1% ATK. |
| **Emerald** | Green Thumb + Overflow | **Greenhouse** | Overflow shields grant Grow stacks when they break. |
| **Emerald** | Sprout + Photosynthesis | **Perennial** | Sprout fires every 25 kills. |

### C.4 Signatures · class · 6 per class

Only the matching class is offered them. The two that make the House Combo are the ones a player will see pulled toward each other.

- **Provider**

|  |  |  |
| --- | --- | --- |
| **Bottomless Ladle** | Second Helping reaches every ally at 80 / 100 / 120%. | synergy |
| **Head Chef** | Ration Ring is +25 / 40 / 60% stronger. | defence |
| **Extra Keys** | Every 50 party kills, the whole table gains +40 / 70 / 100 Heat. | heat |
| **Second Serving** | Bowls come every 15 / 10 / 5 kills instead of 25. | sustain |
| **Heavy Apron** | +35 / 55 / 80% ARM; SPD −10%. | defence |
| **Big Pot** | Serve hits 2 / 3 / 5 more enemies. | horde |

- **Foodsmith**

|  |  |  |
| --- | --- | --- |
| **Encore** | The Signature Strike is every 3rd cut. Rare: and the first cut of the fight. Epic: every 2nd cut. | crit |
| **Sharp Plating** | Crits ×2 / 2.5 / 3.5; non-crits −10%. | crit |
| **Perfect Plate** | Flourish kills refund 60 / 80 / 100 Heat. | heat |
| **Showman** | Each Signature Strike gives adjacent allies +10 / 18 / 30 Heat. | synergy |
| **Dash Chef** | Cuts are dashes and reach the back row. Rare: +25% on a dash. Epic: dash damage splashes. | position |
| **Ego** | +40 / 60 / 90% ATK while you have the most kills at the table; −10% otherwise. | gamble |

- **Spark**

|  |  |  |
| --- | --- | --- |
| **Long Fuse** | Start the Feast lasts +100 / 175 / 300% longer. | tempo |
| **Crowd Work** | Ally Signatures give the Spark +40 / 60 / 90 Heat. | heat |
| **Sparkler** | Fling hits 2 / 3 / 5 more enemies. | horde |
| **Open Invitation** | Ignition reaches every ally at 50 / 75 / 100%. | synergy |
| **Party Trick** | 40 / 60 / 85% chance the Signature fires twice. | gamble |
| **Warm-up Act** | Your first fling every 20 s gives the table +30 / 50 / 80 Heat. | heat |

- **Gastronaut**

|  |  |  |
| --- | --- | --- |
| **Full Basket** | Ingredients are worth ×2 / 3 / 5. | grow |
| **Wayfinder** | Volley gains 2 / 3 / 5 shots. | damage |
| **Trail Mix** | Start the fight with 8 / 15 / 25 Ingredients eaten. | grow |
| **Sharp Eyes** | Drop chance ×2 / ×3 / every kill. | ingredient |
| **Share the Find** | Ingredients also feed adjacent allies at full / double / table value. | synergy |
| **Field Notes** | You prioritise enemies below 25% HP and deal +40 / 70 / 120% to them. | execute |

- **Taster**

|  |  |  |
| --- | --- | --- |
| **Proof** | Analysed enemies take +50 / 75 / 110% instead of +20%. | mark |
| **Second Opinion** | 3 / 4 / 6 enemies Analysed at once. | mark |
| **Certified** | Allies hitting an Analysed enemy gain +5 / 8 / 13 Heat. | heat |
| **Careful Notes** | Analysed enemies deal −25 / 40 / 60%. | defence |
| **Long Lens** | Verdict covers the whole field and lasts 8 / 12 / 16 s. | mark |
| **Bad Batch** | An Analysed enemy’s debuffs jump to the next mark when it dies and it bursts for 100 / 150 / 250%. | horde |

- **Purist**

|  |  |  |
| --- | --- | --- |
| **Standard** | +35 / 60 / 100% ATK against enemies with no debuffs. | damage |
| **Discipline** | Signature +60 / 100 / 160% while above 90% HP. | damage |
| **Whetstone** | +1 ATK per 10 / 7 / 4 kills by the Purist. | scaling |
| **Gatekeeper** | Every 8 s, the first enemy to hit you takes 200 / 350 / 600% reflected. | threat |
| **Sealed Case** | Adjacent allies share Uncompromised against one / two / every debuff type, Burn first. | synergy |
| **No Shortcuts** | Signature +50 / 80 / 120% power; it costs 120 Heat. | gamble |

- **Rebel**

|  |  |  |
| --- | --- | --- |
| **Picket Line** | The taunt lasts +2 / 3 / 5 s. | threat |
| **Solidarity** | Adjacent allies share your ARM. Rare: and 20% of your max HP as a shield at the bell. Epic: 40%. | synergy |
| **Uprising** | Kick the Table gives the table +25 / 40 / 60% ATK for 5 s. | synergy |
| **Loud Voice** | People Before Rules triggers at 50 / 65 / 80% ally HP. | threat |
| **Union** | Every taunt trigger gives the table +10 / 18 / 30 Heat. | heat |
| **Barricade** | Enemies must pass through your tile and are slowed 30 / 50 / 70%. | position |

- **Stirrer**

|  |  |  |
| --- | --- | --- |
| **Hoarder** | Leftover cap 15 / 20 / 30. | leftover |
| **Double Dip** | Stacks give +3 / 4 / 6% instead of +1.5%. | leftover |
| **Back Alley** | Untargetable for 2 / 3 / 5 s after each Signature. | defence |
| **Wok Hei** | +30 / 50 / 80% SPD; −10% HP. | tempo |
| **Marked Coin** | Leftover stacks never decay. Rare: start with 6. Epic: start with 10. | leftover |
| **Street Stall** | Every 10 of your kills Skewer Toss gains a skewer, up to +5 / 8 / 13. | horde |

- **Host**

|  |  |  |
| --- | --- | --- |
| **Open Table** | Seating Plan shares 50 / 75 / 100%. | synergy |
| **Reserved** | Signature heals and shields +50 / 80 / 120%. | shield |
| **Concierge** | Every ally Signature heals the Host 10 / 18 / 30%. | sustain |
| **Extra Chair** | Seating Plan reaches two slots away. Rare: everyone at half. Epic: everyone. | synergy |
| **Place Cards** | Adjacent allies +12 / 20 / 35% ARM. | defence |
| **Perfect Timing** | Your Signature fires once at the bell. Rare: and at each Champion. Epic: and every 50 kills. | heat |

### C.5 Specials · fight only · 16

Picked before the bell, one of three (four in Leftovers hour). Gone at Rise.

|  |  |
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

### C.6 Table combos · two at the table · 16

Offered in the Special slot only when the table has both halves, and on for the whole table.

|  |  |  |
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

### C.7 Recipes · two Pantry cards become one · 12

Hold both at any tier and at your next window they fuse into the Recipe above Epic and the slot is offered again.

|  |  |  |
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

### C.8 Menus · three pieces · 8

A Menu is the catalogue’s ceiling: three named pieces from any pools, on one cook or across the table. Each changes what the fight is, and each lists the day that breaks it. The Menu card appears in the lobby once two of three are held, and the third is pulled into offers at 50%.

**The Inferno Menu** Long Burn + Wildfire + Flash Point

Burn never expires, jumps on every death to every adjacent enemy, and Burning enemies take +100%. The horde is the fuse.

**Breaks on.** Stale halves nothing here, so it is Fridge Open: Chilled cooks tick slower than the fire spreads. And Sommeliers strip Flash Point.

**The Freezer Menu** Deep Freeze + Cold Snap + Bulwark

Everything that touches you is Frozen; Frozen enemies shatter at 50% HP.

**Breaks on.** Blackout. Melee reaches the back row, attackers spread, and Bulwark holds nothing.

**The Garden Menu** Compound + Green Thumb + Harvest

Every heal grants its target +1% all stats (Grow), uncapped.

**Breaks on.** Stale. Half the heals, half the garden.

**The Butcher’s Menu** Chop Chop + Chain Reaction + Steady Hands

Crits execute below 50% and carry 300% of overkill.

**Breaks on.** Heavy Cream. +25% HP moves every threshold, and Health Inspection takes the crits’ edge.

**The Brigade Menu** Family Dinner + Open Bar + Brigade

Every ally shares every Passive at the table at half strength.

**Breaks on.** Double Booking. Two Champions a milestone is more than shared passives can hold.

**The Clockwork Menu** Timer + Heat Lamp + Sous Chef

Every Signature at the table fires together every 8 s.

**Breaks on.** Power Cut and Tasting Menu, in either order.

**The Night Market Menu** Finders Keepers + Marked Coin + Full Basket

Every kill is an Ingredient and a Leftover; nothing decays; Skewer Toss never stops.

**Breaks on.** Sommeliers. Course IV strips a stack with every hit.

**The Critic’s Menu** Proof + Second Opinion + Precision

Marked enemies take +150% and every execute jumps the mark.

**Breaks on.** The Ghost of the Old Master, and any Champion order that puts the Critic early.