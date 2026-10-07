# orax.world · the landing page

File: `OraX-World.dc.html` (open with its siblings in this folder). States via Tweaks: `theme` dark/light, `state` live/idle/founder/joined. Waitlist back end: `WAITLIST_MIGRATION.md`.

## The idea
The old site's banner — a hooded figure on a lit path walking toward the seam between a castle world and a glowing city — is the product thesis: the game and the life, and you between them. The new page keeps the painting and makes the **seam** its organising device. Everything else from the old site (particles, scanlines, blur, gradient buttons, the strikethrough "Post", the floating desktop/laptop/tablet mockups, logo V4, dead footer links) is dropped: it contradicts the design system, and the painting carries the drama on its own.

## Sections, top to bottom
1. **Header** — Logo, three anchors (Three rooms · Real tables · No doomscrolling), brand pill "Ask for an invite". Wraps under the logo on narrow screens; labels never break.
2. **Hero** — the painting in a 12 px-radius frame with a `--border-strong` edge (the system's way of placing imagery), `background-position 50% 45%` so castle, seam and figure are all in frame. One small plate bottom-left (≤ 30 % of the banner width): overline "Singapore alpha · invite only", headline **"Make plans, not posts."** (kept from the old site). A pixel-label plate top-right reads "Left · the game / Right · the life". The painting is never covered beyond that plate.
3. **Under the banner** — lead paragraph, the caption "The person on the path is you, before the identity test gives you a face", the Tagline; to the right, the email form and the founder note.
4. **Two worlds, one seam** — two columns split by a 2 px `--brand` rule. Left "The game: a class, a gem, three rooms" with OXP, Build-A-Dish and Match screens; right "The life: a match, a venue, a table" with Today, Venue and Raid lobby. Closing line: "The line between the two worlds is a 400 m check-in."
5. **Cover band** — the design system's Cover (the one approved decorative motif), scaled to the viewport.
6. **Identity** — opens with the **castle half** of the painting (left 50 %, `background-size 200% auto; position 0% 40%`), then "Nine classes. One gem a day. No score.", the three active GemSockets, and nine class tiles (head crops from the boards, class accent ring, role eyebrow, motto).
7. **Three rooms** — three cards, each with a phone crop of the fight/station screen, title, tag, one paragraph.
8. **Real tables** — opens with the **city half** of the painting (right 50 %, `position 100% 40%`), "The payoff is a table, not a feed.", three chips (Check in within 400 m · Nodes are places, not walls · Patches, never power), Raid lobby and Mark-this-place screens.
9. **Finite by design** — "No doomscrolling. Ever." with four counts (One match · Two quests · Seven moments · 00:00 wipe) and the Digest screen.
10. **Invite** — a close crop of the figure labelled **"The Unsorted · no class yet"**, "Walk the line.", node chips (NUS · SMU · Elsewhere in SG), and the form with three states: idle, **founder** ("you were here first", code on its way, Founder patch), **joined** ("you are in the queue… a bondmate with a code can move you up; nothing else can").
11. **Footer** — Logo, Tagline, "orax.world · Singapore · 2026". No social links until the accounts exist.

## The Unsorted
The hooded figure is now a named state in the product: every player before the identity test. It appears on the landing page (hero caption, invite crop), on the app's invite screen (96×144 crop above "You were invited.") and as a 40 px round avatar heading each of the five questions; the class reveal replaces it. Spec in `PRODUCT_SPEC.md` §2. **Art to commission**: redraw the figure in the class-board style — painterly, warm, grey ground, a T1 kit silhouette under the hood — at 1254×1254 like the nine boards, so the crops here can be swapped one-for-one. Until then the crops come from `assets/site/orax-banner.webp` (figure centre ≈ 46.5 % × 66 %, head ≈ 46.5 % × 42 %).

## Painting redo (planned)
When the banner is repainted in the new art style, keep: the 3:2 frame, the seam at ~46 % of the width, the figure centred on it at ~40–95 % of the height, a dark band along the bottom quarter (the plate sits there), and the two worlds readable when cropped to their halves (the castle group in the left 50 %, the skyline in the right 50 %). Palette: the class boards' muted warmth rather than neon; the seam may be the one brand purple.
