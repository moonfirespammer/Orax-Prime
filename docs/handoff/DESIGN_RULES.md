# OraX · design rules (one page)

The binding visual contract. Full guide: `_ds/orax-design-system-*/readme.md`. Tokens: `_ds/…/tokens/*.css`.

**Grounds** `--surface #1f1f22` → `--surface-raised #2a2a2f` (cards) → `--surface-sunken #161618` (wells, sockets, inputs). Dark grey, never black. Light theme is a full peer via `data-theme="light"`.

**Ink** `--ink` copy · `--ink-muted` labels, captions · `--ink-faint` placeholders and disabled only. Text is always full-opacity.

**One purple** `--brand` fill (primary button, centre Play, selected) · `--brand-text` purple as text/icon · `--brand-deep` pressed · `--brand-subtle` tint for selected rows and the Place of note card. Status colours only beside a word or icon.

**Gems** Ruby round socket · Sapphire rounded-square socket · Emerald diamond socket. The shape names the gem before the colour does. The only glow in the system is a gem's (`--glow-*`, with a 3 px `--gem-*-fill` ring). Class accents (`--class-*`) colour the class name and avatar ring only.

**Type** Space Grotesk for everything read: display 700 with negative tracking, body 15/22, body-strong 500 for buttons and tabs, caption 13/18 muted, overline 11/14 700 +0.12em uppercase. Silkscreen only for the two taglines and `pixel-label` micro-labels (LIMIT ×2, RESETS 12H 55M), never below 11 px.

**Shape** radius 6 chips/inputs · 12 buttons/cards · 22 sheets and the Sapphire socket · full for avatars and the Ruby socket. Cards are `--surface-raised` + 1 px `--border`, never a shadow. Dashed `--border-strong` for game modifier footers and quest/reward boxes. The only coloured card edge is a ClassCard on its turn (gem fill).

**Space** 4-based scale. Phone gutter 16, cards 16 padding and 12 apart, sections 24, 44 px minimum touch target, one primary button per screen, CTA pinned above the tab bar.

**Motion** 200 ms, standard ease, colour and shadow only. Nothing bounces, nothing animates on load. Gem glow and pixel counters may animate on game screens.

**Imagery** Class boards (1254² PNG, 2×2 figures: T1 top, T2 bottom, masc left, fem right) are the only illustration; crop a head for avatars (`avatarCrop`), a quadrant for a kit, the whole board on a class page. Gem SVGs as shipped. Monster art from `assets/monsters` (4×5 atlases, frame 0). No photos, no gradients, no patterns, no emoji, Lucide outline icons as the interim set.

**Copy** Sentence case; uppercase only for taglines, role eyebrows, pixel-labels. No exclamation marks. Real `×` and `·`. Buttons are verbs. Cities in full, metres and 24-hour time. The Bin speaks in dry second person.

**Never** rank people by skill, show a percentage match, reverse or recolour the logo, mix radii inside one component, put a shadow on a card, use black.
