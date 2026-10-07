# OraX · product specification

This is the product. It is written for an engineer or an agent who has never seen the prototype, and it is the document of record when the prototype and this text disagree about intent (the prototype wins on measurements and copy). Companion files: `MIGRATION.md` (where to pull code from), `CLAUDE_CODE_PROMPT.md` (how to start), `SCREEN_MAP.md` (screen → source → target), `PWA.md` (install, offline, data, realtime), `DESIGN_RULES.md` (the visual contract in one page).

---

## 1. What OraX is

OraX is a phygital social-discovery app for Gen Z in Singapore, launching inside two university nodes (NUS, SMU). It borrows three ideas: a persistent avatar and wardrobe (World of Warcraft), real-world places (Pokémon Go), and matching by personality and life habits rather than skill (Tinder). Three games sit inside it so people meet by playing. Everything is daily, finite and non-predatory: no feed, no streaks, no leaderboards of people, nothing that scrolls forever.

Taglines, always two lines, never reworded: **THE GAME IS LIFE** / **PLAY IT TOGETHER**.

### 1.1 Principles the product is built on
1. **Matched by who you are.** Class and habits, never skill, never a score.
2. **Finite by design.** One match, two quests, seven digest items, a wall that wipes at 00:00, messages that fade.
3. **Real tables.** The payoff of every online loop is people at the same physical table.
4. **Nodes are places, not walls.** NUS and SMU filter the map; anyone in Singapore can plan with anyone. Only sitting at a venue table needs an in-person check-in.
5. **The Bin has a voice.** One judge character narrates verdicts, results and toasts in dry second person. Every string in the app sounds like it.

---

## 2. Identity model

| Concept | Rule |
| --- | --- |
| **Class** | One of nine, assigned by a five-question identity test at onboarding; can be changed, takes effect at the next 00:00. Provider, Foodsmith, Rebel (Fighter); Gastronaut, Taster, Purist (Rogue); Spark, Stirrer, Host (Mage). Each class has a **palate** — a one-line reading the Bin uses (Provider "generosity", Foodsmith "the cut", Spark "heat and speed", Gastronaut "the whole shelf", Taster "balance", Purist "the clean plate", Rebel "off the recipe", Stirrer "leftovers", Host "the shared table"). |
| **Gem** | One a day, locked at 00:00: Ruby (Striker), Sapphire (Warden), Emerald (Mender). The gem is the player's role in OXP and HMD, the trim on their kit, and only the colour of their stones in Build-A-Dish. |
| **Kit** | Four per class: T1 and T2, masculine and feminine figures — the four quadrants of the class board. The gem sets the trim. |
| **Habits** | Short chips earned by play, counted: "Doubles the chilli ×4", "Front-row regular ×3", "Trinity table ×2", "Late shift ×1", "Marked 2 places". Habits drive matching. |
| **Bag** | 30 slots of patches (from venues) and chips (from habits). Nothing is bought. |
| **Signature Dish** | One kept verdict from Build-A-Dish, shown on You and in the digest when set. |
| **Bondmates** | Mutual, named ("Chilli", "Front Row"), with a since-date and anniversaries. They get 1:1 chats and can issue invites. |
| **The Unsorted** | The hooded figure from the orax.world painting: every player before the identity test. Shown on the invite screen and through the five questions, replaced by the class board at the reveal. It is a state, not a tenth class — it has no palate, no gem, no kit. Art note: redraw it in the class-board style (painterly, grey ground, T1 kit silhouette under the hood) so it sits beside the nine. |

---

## 3. The daily clock

Everything keys off Singapore wall time. At **00:00**: new shelf (5 dishes), new match, new quest card (5), new Service conditions, new Place of note, the city wall wipes, the gem locks, class changes apply. **Prep windows** at 00:00, 06:00, 12:00, 18:00 (HMD). **Leftovers hour** from 21:00 (Build-A-Dish portion caps lift on plentiful stock). Bells for venue events are set per venue (city 19:30; campus canteens 12:30 and 18:00).

The header of every daily screen shows `Resets Nh MMm` in pixel-label type.

---

## 4. Navigation

Three tabs with a centre Play button: **Today · [Play] · You**.

- **Today**: the match, the quest card, tonight's four rooms, the digest preview. The City and the Party live here as sub-screens.
- **Play** (centre, 60 px, brand purple): opens a sheet with four rows — Build-A-Dish, HMD, OXP, City — each showing tonight's party state and a tag (3 min · solo / 5 cooks / 3 seats / tonight).
- **You**: profile, bondmates, Signature Dish, habits, Wardrobe, Change class.

Sub-screens push onto a stack over the current tab and show a 56 px header: back, title, caption subtitle, a right-side pixel-label (the reset countdown on daily screens). Game fight screens and onboarding are immersive (no header, no tabs).

Three alternative Today hierarchies were explored; **1a (match first)** ships. 1b (clock first) and 1c (party first) stay behind a developer flag.

---

## 5. Screens

### 5.1 Onboarding
1. **Invite code** — "You were invited." The Unsorted (hooded figure) sits above the headline. A 6–8 character code; OraX is invite-only while Singapore fills in. Codes come from bondmates or from a node. Install prompt appears after the code is accepted.
2. **Identity test** — five questions, four answers each; each answer votes for a class; the Unsorted's small round avatar heads each question; the winner is revealed with its full board and motto.
3. **Gem** — choose today's gem (role explained in one line each).
4. **City** — Singapore (Kuala Lumpur listed, parked). "Start playing."

### 5.2 Today
- **Match card** (hero): the other person's figure (board quadrant), name, class and role, gem chip, distance chip, a shared-habits line, their habit chips with **the shared ones filled and the rest subtle**, today's quest in a dashed box, `Connect` / `Not today`. Connected → "Open the chat with …". Declined → "Tomorrow's match arrives at 00:00."
- **Quests**: five rows, checkbox style, max two picked; state labels Picked / Done / Expires 00:00; the caption "Rewards are chips and trims, never a number in a fight."
- **Tonight**: four room rows (icon, title, caption with live party state, tag, chevron).
- **Digest**: three-item preview + "Read all 7 · then that's all for today".

### 5.3 Match (full)
Figure at 150×200, name, class, chips; a "What you share" card (filled = shared); a "Palates · what the Bin sees" card with a two-palate sentence; the quest in body-lg; Connect / Not today. **No percentage anywhere.**

### 5.4 Quests (full), Wardrobe, Change class
- Quests: the same five with the pick-two rule and expiry copy.
- Wardrobe: large figure (170×220), kit name, "the gem you lock each day sets the trim", four kit tiles, trim socket, bag with count `n of 30`, CTA `Wear this kit` (disabled when already worn).
- Change class: nine tiles (avatar ring in class accent, name, role eyebrow); CTA `Change to X at 00:00`.

### 5.5 Party, chat, share
- **Party**: three ClassCards in a horizontal row (the current player's edge in their gem colour), a nodes line ("Mei is at SMU, Dev at NUS… Nodes are places, not walls"), the thread (share cards and messages, each with `Keep`), a composer.
- **Chat (1:1)**: bondmate header with nickname and since-date; the match's chat shows the quest pinned at the top and closes at 00:00 unless both keep it.
- **Ephemerality**: messages expire 7 days after sending; `Keep` within 24 hours holds one.
- **Share card**: 326 px card — logo, source label, city · date, headline (the verdict name or result), the Bin's line, stones or two stats, the sender's avatar/class/gem, the tagline. CTAs `Send to your party` (completes quest q5) and `Back to Today`. The only artefact that leaves the app.

### 5.6 Digest and City wall
- **Digest**: exactly seven — five party moments, the day's best plate in the city, the day's Place of note. Ends with a dashed card: "THAT'S ALL FOR TODAY. Nothing more arrives until 00:00. Go and cook something."
- **City wall**: the City Table (rows Plates eaten, Hordes finished, Gauntlets cleared, Raids held, Places marked × columns Singapore, NUS, SMU — "Counts, never names"), then every plate and run today, newest first, "gone at 00:00".

### 5.7 City
- **Node chips**: Singapore · NUS · SMU filter the map and the list. (Prototype simulates location at the node centre.)
- **Map**: Leaflet + OpenStreetMap, dark via tile filter. Pin grammar: **round** raid, **rounded square** cook-off, **diamond** place of note, **hollow dashed** proposed, ruby glow for a rare Champion. Tooltips permanent only inside a node.
- **Place of note** card (brand-subtle tint): one student-marked place promoted per day.
- **Venue list**: pin, name, caption (distance · bell · who's there), tag (HMD / BaD / Note / Proposed / Rare here) and node label.
- **Mark this place** (secondary button, enabled only in a node): sheet with name, purpose (Cook-off · Raid floor · Landmark, each with its pin shape), what's here (Seats · Power · Late-night · Halal), one line. "No photos, no reviews, no votes. Presence is the vote." Drop the pin → proposed, opens at three check-ins by distinct others.
- Seeded venues: Singapore — VivoCity (rare Champion: the Health Inspector), Tiong Bahru Market, Maxwell Food Centre. NUS — The Deck, Frontier, Techno Edge, UTown Fine Food, PGP canteen, Central Library (note), Clementi Mall (raid), West Coast Plaza (raid). SMU — Koufu at SoE, The Connexion, Kopitiam basement, Li Ka Shing Library (note), Campus Green (note), Plaza Singapura, Bugis Junction, Raffles City (raids). Coordinates in the prototype are approximate.

### 5.8 Venue and raid lobby
- **Venue**: kind, node and distance chips (+ Rare, + Proposed); an event card (raid: "The Health Inspector is in the building" / "A horde of 999 in the atrium"; cook-off: "<dish>, judged together") with checked-in avatars and the bell; for a rare raid, the Champion card; the reward in a dashed box; the rule line "Anyone in Singapore can plan this with you… Sitting at the table needs a check-in here, in person."; `Check in` with the range line (`250 m away · in range` in success green, or `… · check-in needs 400 m`). After check-in: `Join the raid table` / `Cook <dish> here`; for proposed places the check-in counts toward opening.
- **Raid lobby**: "Five at the table · <venue>", bell countdown, five seats (front three, back two) with name, class, gem role, slot, class cut; `Set up the table` → HMD lobby with the venue tag.

### 5.9 OXP · Table Wars (3 players, 10 rounds)
- **Lobby**: three seat ClassCards (gem hand in the footer: `R R G · Limit ×2`), a composition line (Trinity ×1.04 / Mono ×1.08 / Mixed), the Daily Gauntlet roster of ten monsters with modifiers, `Tutorial`, `Fight`.
- **Fight**: HUD (round, turn, lives, points, abandon); monster plate with name, attack timer, HP bar with ghost bar, defence, weakness/resist, abilities; field chips (Buff, Armour break, Primed); Nerve bar; the committed sequence with the combo name and its base/effects; three seats, each with a 3-gem hand (only your seat is interactive; the others auto-commit after 700 ms), a Limit Breaker button (needs a token); gauge with two token slots; `Ready · 30` with a 30-second auto-commit; a combo history sheet; a relic vote sheet after each kill (three offers).
- **Rules**: 27 combos named by seat order (`RRR Crimson Triad 360` … `BBB Sanctuary Chorus 130`) with effects S stun, B buff +30%, A AOE, K armour break, P primed +10%; weakness ×1.25, resist ×0.75; Shell halves single-target; Counter drains Nerve unless stunned or Trinity; gauge +60/35/10 by kill turn (+15 Trinity, +10 pure); tokens cap 2; Limit Breakers Bloodlust ×2 (Ruby), Prismatic Shift ×1.5 (Sapphire), Exploit ×1.5 + armour ignore (Emerald); two lives; relics are party-wide for the run.
- **Results**: "Ten courses" or "Game over", the Bin's line, six stats, habit chips, `Share to your party`.

### 5.10 HMD · the last stand (5 players, 1 round vs 999)
- **Lobby**: today's Service conditions (Rush Hour at 200, Grease Fire at 500, Stale at 800), Prep windows (four permanent daily picks at 00/06/12/18), a Special for this fight only (Flash Fry, Blue Plate, Late Shift; Sharing Plate unlocks with a full Build-A-Dish plate — "Packed Lunch"), the table (front three, back two), `Ring the bell`.
- **Fight**: HUD (horde count, time, Service, pause), four course markers (Amuse-bouche, Starter, Main, Dessert at 200/450/750), the big "still standing" counter, condition chips, Champion banners every 100 kills (Giant Weevil … The Critic; the Health Inspector is venue-rare), five cooks with HP and Heat bars, Basic (auto) · Signature (fires at 100 Heat; 60 on Flash Fry) · Special (once).
- **Results**: "All 999" or "Held to N", the Bin's line, time/horde/signatures/champions/service/special, per-cook HP and damage rows, chips, share.

### 5.11 Build-A-Dish (solo, daily)
- **Board**: "One shelf for all of Singapore. One dish a day, swap once." Five dishes with stock (plenty / moderate / running low), who's cooking (avatars + count), `Cursed Plates · 2`, CTA `Pick <dish> for today` → `Cook <dish>`; one swap.
- **Station**: your plate (portion chips with cut/heat state, strokes apply to the selected item, `Fling to the Bin`), the **sigil pad** (slash to cut, spiral to heat, flick up to plate, sweep to wipe mess; buttons as a fallback — "Nothing you draw can fail"), the Pantry (required ingredients, cap 3 portions until leftovers hour, stock states incl. Gone), optional bread for mutton soup, Pantry extras (chilli padi, durian, cheddar, ice cream — "Use responsibly, or do not"), `Plate it`.
- **Verdict**: the Bin (character art placeholder, pose by outcome), its line, the generated dish name ("Seared Chicken Rice with too much confidence"), a label (Clean plate / Academy acceptable / Comforting / Saucy but controlled / Bold but messy / Cursed), 1–3 stones in your gem, chips (style: Neat/Generous/Unhinged; habit; **palate line and chip when your class's palate shows in the plate**; Leftovers hour; venue). CTAs `Share to your party`, `Set as Signature Dish`, `See who else made …`.
- Cook-offs at hawker centres and canteens use the same station with the venue's dish; the plate counts as your daily plate.

---

## 6. Copy and tone

Direct, warm, second person; the Bin is dry. Sentence case everywhere except taglines, role eyebrows and pixel-labels. No exclamation marks, no emoji. `×` and `·` are the real characters. Buttons are verbs ("Check in", "Drop the pin", "Ring the bell"). Numbers: "400 m", "19:30", "Singapore". All strings in the prototype are final unless this document says otherwise.

---

## 7. What is explicitly out

Compatibility percentages, win rates, levels, ranked ladders, follower counts, streaks, infinite feeds, photos of food or people, paid cosmetics, background location, push that isn't a bell you opted into.
