// Renders docs/design/ABILITIES.md from src/data/design/*.json, the source of truth for every number and card
// (docs/design/README.md). `pnpm abilities` rewrites it; `pnpm check:abilities` fails when it is out of date.
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const read = (f) => JSON.parse(readFileSync(join(root, 'src/data/design', f), 'utf8'));
const classes = read('classes.json');
const augments = read('augments.json');
const hmd = read('hmd.json');
const oxp = read('oxp.json');
const bad = read('bad.json');
const shared = read('shared.json');

const cell = (s) =>
  String(s ?? '')
    .replace(/\|/g, '\\|')
    .replace(/\s*\n\s*/g, ' ');
const table = (head, rows) =>
  [
    `| ${head.map(cell).join(' | ')} |`,
    `| ${head.map(() => '---').join(' | ')} |`,
    ...rows.map((r) => `| ${r.map(cell).join(' | ')} |`),
  ].join('\n');
const cards = (rows, withTags = true) =>
  table(
    withTags ? ['Card', 'Common / Rare / Epic', 'Tags'] : ['Card', 'Effect'],
    rows.map((r) => (withTags ? [`**${r.n}**`, r.t, r.tags ?? ''] : [`**${r.n}**`, r.t])),
  );
const combos = (rows) =>
  table(
    ['Needs', 'Combo', 'What switches on'],
    rows.map((r) => [r.needs, `**${r.n}**`, r.t]),
  );
const menus = (rows) =>
  rows.map((m) => `**${m.n}** · ${m.needs}\n\n${m.t}\n\n*Breaks on.* ${m.breaks}`).join('\n\n');
const gemName = { ruby: 'Ruby', sapphire: 'Sapphire', emerald: 'Emerald' };
const sections = [];
const h = (level, text) => sections.push(`${'#'.repeat(level)} ${text}`);
const p = (text) => sections.push(text);

h(1, 'OraX · class abilities and augments');
p(
  `Rendered from \`src/data/design/*.json\` (${classes.version}) by \`scripts/render-abilities.mjs\`. Those files are the source of truth for every number and every card; change them, run \`pnpm abilities\`, and this page follows. The rules and the intent are in \`docs/design/\` (start with \`README.md\` and \`00-overview-and-shared.md\`).`,
);
p(
  'A player is one class from the identity test, for good, and one gem a day. In HMD the gem makes a **cut** of the class kit; in OXP the gem is the whole kit and the class is cosmetic; in Build-A-Dish the class is a palate the Bin reads and the gem is the colour of your stones.',
);

h(2, '1. The budget');
p(classes.budget.rule);
p(
  table(
    ['Weight', 'Crowd DPS'],
    Object.entries(classes.budget.weights).map(([k, v]) => [k, v]),
  ),
);
p(
  table(
    ['Gem', 'HMD lean'],
    Object.entries(classes.budget.gemMods).map(([k, v]) => [
      gemName[k],
      Object.entries(v)
        .map(([a, b]) => `${a} ${b}`)
        .join(' · '),
    ]),
  ),
);
const hb = classes.budget.heatBase;
p(
  `Heat: +${hb.perHitLanded} per hit landed, +${hb.perHitTaken} per hit taken, +${hb.perSecond} a second; the Signature fires at ${hb.signatureAt}.`,
);

h(2, '2. The three gems');
p(
  table(
    ['Gem', 'Role', 'Keyword', 'HMD lean', 'HMD Heat', 'OXP hand', 'Limit Breaker', 'Passive'],
    classes.gems.map((g) => [
      `**${g.name}**`,
      g.role,
      g.keywordDef,
      g.lean,
      g.heat,
      `**${g.oxp.hand}**`,
      `**${g.oxp.limitName}.** ${g.oxp.limit}`,
      `**${g.oxp.passiveName}.** ${g.oxp.passive}`,
    ]),
  ),
);

h(2, '3. The nine classes');
p(
  table(
    [
      'Class',
      'Archetype',
      'Station',
      'Weight',
      'HP',
      'ATK',
      'SPD',
      'Targets',
      'Crowd DPS',
      'Range',
      'ARM',
      'Motto',
    ],
    classes.classes.map((c) => [
      `**${c.name}**`,
      c.role,
      c.station,
      c.weight,
      c.hp,
      c.atk,
      c.spd,
      c.targets,
      c.crowdDps,
      c.range,
      c.arm,
      c.motto,
    ]),
  ),
);
p('ATK is derived in code from crowd DPS = ATK × SPD × targets; the table shows the result.');

for (const c of classes.classes) {
  h(3, `${c.num} · ${c.name}`);
  p(`*${c.role} · ${c.station} · ${c.weight} weight · ${c.range}* · “${c.motto}”`);
  p(c.desc);
  p(`**Weapons.** ${c.weaponM} · ${c.weaponF}\n\n**Mirror.** ${c.mirror}\n\n**Cast cue.** ${c.cue}`);
  p('**Kit · the same in every cut**');
  p(
    table(
      ['Part', 'Name', 'What it does'],
      c.kit.map((k) => [k.k, `**${k.n}**`, k.t]),
    ),
  );
  p('**Three cuts · what the gem changes**');
  p(
    table(
      ['Gem', 'Cut', 'Basic', 'Passive', 'Signature'],
      c.cuts.map((x) => [`${gemName[x.gem]} · ${x.role}`, `**${x.name}**`, x.basic, x.passive, x.signature]),
    ),
  );
  const house = augments.hmd.houseCombos.find((x) => x.key === c.key);
  p(`**House Combo · ${house.n}** · ${house.needs}\n\n${house.t}`);
  p('**Signature augments · HMD · six, offered only to this class**');
  p(cards(augments.hmd.signatures.find((s) => s.key === c.key).rows));
  const pal = bad.palates.find((x) => x.key === c.key);
  p(
    `**Build-A-Dish palate · ${pal.watch}.** In character when: ${pal.when} The Bin adds: “${pal.line}” Chip: ${pal.chip}`,
  );
}

h(2, '4. HMD augments');
p(augments.ruling);
p(
  table(
    ['Kind', 'How it forms', 'Power', 'How the player sees it'],
    augments.comboTypes.map((t) => [`**${t.n}**`, t.how, t.power, t.shown]),
  ),
);
p(
  table(
    ['Keyword', 'Pushed by', 'Consumed by'],
    augments.keywords.map((k) => [`**${k.k}**`, k.pushes, k.consumes]),
  ),
);
h(3, `4.1 Pantry · general · ${augments.hmd.pantry.length}`);
p(cards(augments.hmd.pantry));
h(3, `4.2 Pantry Clicks · ${augments.hmd.clicks.length}`);
p(combos(augments.hmd.clicks));
h(3, '4.3 Facets · per gem');
for (const f of augments.hmd.facets) {
  p(`**${f.label}**`);
  p(cards(f.rows));
}
p('**Facet Clicks**');
p(
  table(
    ['Gem', 'Needs', 'Click', 'What switches on'],
    augments.hmd.facetClicks.map((x) => [gemName[x.gem] ?? x.gem, x.needs, `**${x.n}**`, x.t]),
  ),
);
h(3, `4.4 Specials · fight only · ${augments.hmd.specials.length}`);
p(cards(augments.hmd.specials, false));
h(3, `4.5 Table combos · ${augments.hmd.tableCombos.length}`);
p(combos(augments.hmd.tableCombos));
h(3, `4.6 Recipes · ${augments.hmd.recipes.length}`);
p(combos(augments.hmd.recipes));
h(3, `4.7 Menus · ${augments.hmd.menus.length}`);
p(menus(augments.hmd.menus));

h(2, '5. The HMD fight');
p(
  table(
    ['Course', 'Kills', 'Pour', 'Avg HP', 'Avg ATK'],
    hmd.courses.map((c) => [`${c.id} · ${c.name}`, c.kills, `${c.pourPerSecond}/s`, c.avgHp, c.avgAtk]),
  ),
);
for (const c of hmd.courses) {
  p(`**Course ${c.id} · ${c.name}**`);
  p(
    table(
      ['Unit', 'HP', 'ATK', 'Share', 'Behaviour'],
      c.units.map((u) => [`**${u.n}**`, u.hp, u.atk, u.share, `${u.note} ${u.speed}, ${u.range}.`]),
    ),
  );
}
p(`Champions: ${hmd.champions.rule}`);
p(
  table(
    ['Slot', 'HP'],
    hmd.champions.hpBySlot.map((v, i) => [`${(i + 1) * 100} kills`, v]),
  ),
);
p(
  table(
    ['Champion', 'ARM', 'Trick'],
    hmd.champions.roster.map((r) => [`**${r.n}**`, r.arm, r.trick]),
  ),
);
p(`Today’s Service: ${hmd.conditions.rule}`);
p(
  table(
    ['Tier', 'Condition', 'Effect'],
    hmd.conditions.list.map((c) => [c.tier, `**${c.n}**`, c.t]),
  ),
);

h(2, '6. OXP abilities and augments');
p(oxp.seat.rule);
p(
  table(
    ['Combo', 'Base', 'Mode', 'Armour ignore', 'Team buff', 'Note'],
    augments.oxp.combos.map((c) => [`**${c.c}**`, c.base, c.mode, c.ai, c.buff, c.note]),
  ),
);
h(3, `6.1 Seat augments · general · ${augments.oxp.general.length}`);
p(cards(augments.oxp.general));
h(3, '6.2 Seat augments · per gem');
for (const g of augments.oxp.gem) {
  p(`**${g.label}**`);
  p(cards(g.rows));
}
h(3, `6.3 Seat Clicks · ${augments.oxp.clicks.length}`);
p(
  table(
    ['Seat', 'Needs', 'Click', 'What switches on'],
    augments.oxp.clicks.map((x) => [
      x.gem === 'any' ? 'Any seat' : gemName[x.gem],
      x.needs,
      `**${x.n}**`,
      x.t,
    ]),
  ),
);
h(3, `6.4 Table combos · ${augments.oxp.tableCombos.length}`);
p(combos(augments.oxp.tableCombos));
h(3, '6.5 Party relics · voted');
for (const r of augments.oxp.relics) {
  p(`**${r.label}**`);
  p(cards(r.rows));
}
h(3, '6.6 Course blessings and Leftover relics');
p(cards(augments.oxp.blessings, false));
p(cards(augments.oxp.leftovers, false));
h(3, `6.7 Recipes · ${augments.oxp.recipes.length}`);
p(combos(augments.oxp.recipes));
h(3, `6.8 Menus · ${augments.oxp.menus.length}`);
p(menus(augments.oxp.menus));
h(3, '6.9 Monsters, abilities and node modifiers');
for (const m of oxp.monsters) {
  p(`**${m.label}**`);
  p(
    table(
      ['Monster', 'HP', 'Def', 'Abilities · pets', 'TTK', 'Atk in', 'Points', 'Weak · resists'],
      m.rows.map((r) => [
        `**${r.n}**${r.tag ? ` ${r.tag}` : ''}`,
        r.hp,
        r.def,
        r.ab,
        r.ttk,
        r.timer,
        r.pts,
        r.wr,
      ]),
    ),
  );
}
p(cards(oxp.abilities, false));
p(
  table(
    ['Modifier', 'Weight', 'Effect'],
    oxp.modifiers.map((m) => [`**${m.n}**`, m.w, m.t]),
  ),
);

h(2, '7. Reference builds');
p(
  augments.builds
    .map((b) => `**${b.n}** · *${b.game}*\n\n**Take.** ${b.take}\n\n${b.why}\n\n**Breaks on.** ${b.breaks}`)
    .join('\n\n'),
);

h(2, '8. One day, one voice');
p(
  table(
    ['Game', 'Habit chip', 'Counts when'],
    shared.habits.map((x) => [x.g, `**${x.n}**`, x.t]),
  ),
);
p(
  table(
    ['Direction', 'Gift', 'What it does', 'Why it is safe'],
    shared.gifts.map((g) => [g.dir, `**${g.n}**`, g.t, g.why]),
  ),
);
p(
  table(
    ['Moment', 'The Bin'],
    shared.bin.lines.map((l) => [l.m, l.l]),
  ),
);

const out = sections.join('\n\n') + '\n';
const target = join(root, 'docs/design/ABILITIES.md');
if (process.argv.includes('--check')) {
  let current = '';
  try {
    current = readFileSync(target, 'utf8');
  } catch {
    /* missing counts as stale */
  }
  if (current !== out) {
    console.error('docs/design/ABILITIES.md is out of date: run `pnpm abilities` and commit the result.');
    process.exit(1);
  }
  console.log('docs/design/ABILITIES.md is up to date.');
} else {
  writeFileSync(target, out);
  console.log(`wrote ${target} (${out.length} characters)`);
}
