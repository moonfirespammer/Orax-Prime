# BaD — Build-a-Dish

> Rendered 7 October 2026 from the OraX design project (Table Wars Design v2 and Compendium v2). The numbers here are copies: the source of truth is `bad.json` and `shared.json` in `data/`. Change the JSON, not this prose; the prose carries the rules and the intent. Design v1 is locked and the Board, Station and Verdict are built; this records the as-built rules and the v2 decisions around them.

## BaD — Build-a-Dish

Build-a-Dish is the table everyone sits at. One player, three minutes, no enemy and no fail state. You pick one of your city’s five dishes for the day, pull portions from a shared Pantry, cut and heat and plate with sigils, and the Bin names and rates what you made in one to three stones of your gem. Design v1 is locked and the Board, Station and Verdict are built; this part records what is built and what v2 decides around it.

### 5.1 As built

- **Day and city** — Resets at 00:00 city time. Singapore and Kuala Lumpur each get five dishes and one Pantry. Leftovers hour, 21:00 to midnight, lifts the portion cap on shelves that are still plentiful. A dish’s main ingredient never runs out.
- **Picking** — One dish a day, one swap. The pick is public: the card shows who is cooking it, three avatars and a count, and your own avatar joins them. Swapping returns your portions to the shelf.
- **Pantry** — Four to six required ingredients per dish; mutton soup has an optional bread row. Four extras shared across every dish and always off-recipe: chilli padi, durian, cheddar, ice cream. A tap takes one portion. Cap 3. Running low at 25, Gone at 0.
- **Building** — Free order. Cut 0–3 (cut, diced, dust) and heat 0–3 (cooked, seared, burnt) per item. Sigils on a pad: a slash cuts, a spiral heats, a flick up plates, a sweep wipes mess. A fast stroke is +1 flair. Burning adds mess; anything can be flung to the Bin.
- **Judging** — A hidden score from 0 to 100 becomes one to three stones in your gem. A plate is cursed when it is empty, scores under 35, or carries two extras or two burnt items. Names are seeded from the plate, so the same plate is always called the same thing.
- **After the verdict** — The Bin’s line, a label, a habit chip. The same-dish wall, sorted by stones with your row pinned in its tier; the same-dish thread, today only. A Cursed Plates gallery, a Signature Dish on your profile, a 326px share card.

### 5.2 The judge

One pure function, the same for every class and every gem. It starts at 100 for a plate with every required ingredient present and takes away for what is wrong. Stones: three at 75, two at 45, otherwise one. Cursed when the plate is empty, scores under 35, or carries two extras or two burnt items.

| Term | Effect |
| --- | --- |
| **Coverage** | −50 × the share of required ingredients missing. Six of six starts at 100; three of six at 75. |
| **Needs cutting, left whole** | −8 per recipe item. |
| **Needs heat, left raw** | −10 per recipe item. Raw rice is remembered and gets its own line. |
| **Heated when it should not be** | −4 per recipe item. |
| **Cut to dust** | −6 per recipe item. |
| **Burnt** | −15 per item, on or off the recipe. Two burnt items curse the plate. |
| **Pantry extra** | −20 each. Two extras curse the plate. |
| **Excess portions** | −3 per portion over the recipe count, to −30. |
| **One item at five or more** | −10. |
| **Flair** | +2 per fast stroke, to +10. |

### 5.3 The class cooks the same; the Bin knows who you are

**Decided** — Blank canvas. The judge and the shelf are identical for everyone, so a Provider’s three stones and a Purist’s three stones mean the same thing on the wall. The class changes what the Bin notices: one palate per class, one pattern in facts the judge already computes. Plate in character and the Bin adds a line to its verdict, the plate earns a class chip, and the wall can be filtered to your class. Copy, not code: nine checks over facts the judge already has. Never a cooking power; the identity test promised that class is who you are, not what you are good at. Target: one non-cursed plate in four fires its palate.

| Class | Watches | In character when | The Bin adds | Habit chip |
| --- | --- | --- | --- | --- |
| **Provider** | **Generosity** | Style Generous, not Unhinged, with every required ingredient present. | Enough for the table. You cooked for people who are not here yet. | Feeds the table ×n |
| **Foodsmith** | **The cut** | Every item that needs cutting is cut or diced, none is dust, and a protein is seared. | Every cut where it should be. I noticed. I always notice. | Knife first ×n |
| **Spark** | **Heat and speed** | Chilli portions at two or more, or flair at three or more. | Fast hands and too much chilli. I would not have it any other way. | Brings the heat ×n |
| **Gastronaut** | **The whole shelf** | Full coverage, and the optional row used when the dish has one. | You found everything on the shelf. Even the bread. | Leaves nothing off ×n |
| **Taster** | **Balance** | Sauce portions equal to protein portions; nothing burnt, nothing at dust. | Balanced. Tested first, plated second. As it should be. | Tests first ×n |
| **Purist** | **The clean plate** | Neat, three stones, no extras, no mess left on the pad. | Clean plate. No extras. You did not enjoy that, and it shows in the best way. | Clean plater ×n |
| **Rebel** | **Off the recipe** | Exactly one extra, and still two stones or more. | {Extra} in {dish}, and it held. Do it again and I will pretend not to look. | Breaks the recipe ×n |
| **Stirrer** | **Leftovers** | Plated in Leftovers hour with an item above three portions, or flung something and still scored two stones. | Ten portions and a fling. Nothing wasted. I respect that more than I should. | Leftovers regular ×n |
| **Host** | **The shared table** | Among the first ten in the city to pick the dish, or posted in its thread before plating. | You set the table early. People came. | Sets the table ×n |

**The gem.** The colour of your stones, the ring on your wall row, the chip on your share card. It never touches the judge. In the combat games the gem is the day’s role; here it is how your day is shown.