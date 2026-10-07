# Screen map · where each screen lives

All sources are in `OraX-App.dc.html` unless stated. "Template section" is the HTML comment marker inside `<x-dc>`; "logic" names the methods in `class Component`. Board pages refer to `OraX-App-print.dc.html` (dark 02–10, light 11–19). Screenshot files are `assets/shots/{dark|light}-NN.jpg` at 780×1688 (390×844 @2x).

| # | Screen | Template section | Logic (data + handlers) | Board page | Shot NN | New repo home |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Today (1a, default) | `TODAY` | `renderVals()`: `rooms`, `match`, `quests`, `digestPreview`, `ord`, `clock()` | 02 | 01 | `src/today/Today.tsx` |
| 2 | Play sheet | `PLAY SHEET` | `rooms`, `openSheet/closeSheet` | 02 | 02 | `src/app/PlaySheet.tsx` |
| 3 | You | `YOU` | `me`, `bondmates`, `signature`, `habits`, `toggleTheme` | 02 | 03 | `src/you/You.tsx` |
| 4 | Today 1b (clock first) | `TODAY` + `showClock` | `ord` for `1b`, `dayPct`, `nowLine` | 03 | 04 | behind dev flag |
| 5 | Today 1c (party first) | `TODAY` + `showPartyHero` | `partyCards`, `matchCompact`, `questsCompact` | 03 | 05 | behind dev flag |
| 6 | Daily match | `MATCH` | `match`, `palateLine`, `connectMatch/declineMatch/openMatchChat` | 03 | 06 | `src/today/Match.tsx` |
| 7 | Quests | `QUESTS` | `questsData`, `quests[].toggle`, `done` | 04 | 07 | `src/today/Quests.tsx` |
| 8 | Wardrobe | `WARDROBE` | `kits`, `wearKit`, `bag`, `full()` | 04 | 08 | `src/you/Wardrobe.tsx` |
| 9 | Change class | `CLASSES` | `classTiles`, `changeClass`, `CL` | 04 | 09 | `src/you/Classes.tsx` |
| 10 | Party thread | `PARTY + THREAD` | `threadItems`, `msg()`, `send('thread')`, `partyNodesLine` | 05 | 10 | `src/party/Party.tsx` |
| 11 | 1:1 chat | `1:1 CHAT` | `chatItems`, `chatPerson`, `send(chatWith)`, keep/fade | 05 | 11 | `src/party/Chat.tsx` |
| 12 | Digest | `DIGEST` | `digest` (7 items) | 05 | 12 | `src/today/Digest.tsx` |
| 13 | City wall | `CITY WALL` | `wallItems`, `cityTable` | 06 | 13 | `src/city/Wall.tsx` |
| 14 | Share card | `SHARE CARD` | `share`, `sendShare` (sets `done.q5`, appends to thread) | 06 | 14 | `src/party/ShareCard.tsx` |
| 15 | Venue | `VENUE` | `venue()`, `allPlaces()`, `checkIn`, `venue.enter` | 07 | 15 | `src/city/Venue.tsx` |
| 16 | Raid lobby | `RAID LOBBY` | `hmdSlots`, `bellIn`, `goHmdLobby` | 08 | 16 | `src/city/RaidLobby.tsx` |
| 17 | Mark this place (sheet) | `MARK THIS PLACE` | `scout*`, `dropPin`, `seedPlaces()` | 07 | 17 | `src/city/MarkPlace.tsx` |
| 18 | OXP party screen | `OXP LOBBY` | `oxpSeatCards`, `oxpCompLine`, `gauntletRows`, `startOxp` | 08 | 18 | `src/games/oxp/screens/Lobby.tsx` |
| 19 | OXP combat | `OXP FIGHT` | `COMBOS`, `MONSTERS`, `RELICS`, `oxpReady`, `oxpCommit`, `oxpLimit`, `oxpPickRelic` | 09 | 19 | `src/games/oxp/screens/Fight.tsx` + `engine/` |
| 20 | HMD table (lobby) | `HMD LOBBY` | `hmdConds`, `preps`, `specials`, `startHmd` | 08 | 20 | `src/games/hmd/screens/Lobby.tsx` |
| 21 | HMD fight | `HMD FIGHT` | `hmdTick`, `hmdSignature`, `hmdSpecialFire`, `CHAMPIONS` | 09 | 21 | `src/games/hmd/screens/Fight.tsx` + `engine/` |
| 22 | BaD board | `BaD BOARD` | `DISHES`, `bad.dishes`, `badCta` | 10 | 22 | `src/games/bad/screens/Board.tsx` (port of `BaD/src/screens/Board.tsx`) |
| 23 | BaD station | `BaD STATION` | `badAdd/badRemove/badStroke/padUp`, `ING`, `NEEDS`, `STOCK` | 09 | 23 | `src/games/bad/screens/Station.tsx` (port of `BaD/src/screens/Station.tsx`) |
| 24 | Invite code | `INVITE` | `inviteCode`, `inviteGo` | 06 | 24 | `src/onboarding/Invite.tsx` |
| 25 | Identity test → class → gem → city | `ONBOARDING` | `QUIZ`, `ob()`, `obNext/obRetake/obFinish` | 10 | 25 | `src/onboarding/*` |
| 26 | City map | `CITY` + `city-map.html` | `VENUES`, `LOC`, `syncMap()`, `nodeChips`, `placeOfNote` | 07 (live embed) | — | `src/city/City.tsx` + `map/` |
| 27 | Results (OXP / HMD) | `RESULTS` | `oxpFinish()`, `hmdFinish()` → `res` | — | — | `src/games/shared/Results.tsx` |
| 28 | BaD verdict | `BaD VERDICT` | `badPlate()` → `verdict`, `badSetSignature`, `badShare` | — | — | `src/games/bad/screens/Verdict.tsx` (port of `BaD/src/screens/Verdict.tsx`, add palate line) |

Baseline (what exists today), `OraX-Baseline.dc.html`, pages 20–24, shots `base-*.jpg`:

| Shot | Screen | Original source |
| --- | --- | --- |
| base-play, base-classes, base-you, base-board | BaD host shell | `BaD/src/screens/{Play,Classes,You,Board}.tsx` |
| base-station, base-verdict, base-share, base-intro | BaD dish flow | `BaD/src/screens/{Station,Verdict,Share,Intro}.tsx` |
| base-oxp-combat, base-oxp-party | OXP Table Wars | `HMD/oxp/index.html`, `oxp/style.css` |
| base-hmd-fight, base-hmd-end | HMD Arena | `HMD/game/index.html`, `game/style.css` |
| base-alpha, base-alpha-profile, base-alpha-lfg | Alpha-1 mockup (reference only) | `OraX/design-mockup-modern.html` |

Prototype props (Tweaks): `screen` (any id above), `homeDirection` (1a/1b/1c), `frame` (Android bezel), `theme` (dark/light), `live` (false disables the clock and sims — used by the boards).
