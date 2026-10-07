// Every string the Build-A-Dish engine says, ported from BaD (spec section numbers refer to its BUILD-A-DISH.md).
// Screen chrome comes from the OraX prototype's BaD sections instead; strings marked RULING are BaD owner rulings.

export const COPY = {
  board: {
    resets: 'RESETS {countdown}',
    title: "Today's dishes",
    cursedLink: 'Cursed Plates · {n}',
    caption: 'One shelf for all of {city}. One dish a day, swap once.',
    leftoversLabel: 'LEFTOVERS HOUR · UNTIL 00:00',
    leftoversCaption: 'Portion caps are off on anything the city still has plenty of.', // RULING (prototype)
    youAreIn: 'You are in. {n} cooking {dish} right now.',
    cookingToday: 'Cooking today',
    cooking: 'cooking',
    /** RULING (Q5): one stock word per dish instead of counts. */
    stock: { plenty: 'plenty', moderate: 'moderate', low: 'running low', gone: 'all out!' },
    cta: {
      pick: 'Pick a dish',
      pickDish: 'Pick {dish} for today',
      cook: 'Cook {dish}',
      swap: 'Swap to {dish} · 1 swap left',
      noSwaps: 'No swaps left today',
    },
    footer: 'The Bin has eaten {n} plates in {city} today.',
  },
  bin: {
    overline: 'THE BIN',
    picked: '{Dish}. The whole city can see that now.',
    swapped: 'Swapped to {dish}. That was your one.',
    cap: [
      'Three is plenty. Come back at leftovers hour.',
      'The whole city eats from this shelf. Three.',
      'No. Leftovers hour starts at 21:00.',
    ],
    leftovers4: 'Leftovers hour. Go on, then. I am watching.',
    leftovers10: 'Ten portions of {ingredient}. Ten. I am counting.',
    gone: 'Gone. {City} ate it all before you.',
    // Spec §3.4 building remarks.
    noTarget: 'Strokes need a target. Tap something first.',
    dustAlready: 'The {x} is dust. It cannot get smaller.',
    dustNow: 'That is dust now. Congratulations.',
    burntAlready: 'It cannot get more burnt. It is trying.',
    burntNow: 'You burnt the {x}. It did nothing to you.',
    clean: 'Cleaner. Not clean. Cleaner.',
    fling: ['Rude. Delicious, but rude.', 'I was going to eat that anyway.', 'Noted. Everything is noted.'],
  },
  /** Spec §5 Station. */
  station: {
    resets: 'RESETS {countdown}',
    leftoversCaption: 'No cap on anything the city still has plenty of.', // RULING (prototype Station caption)
    plate: 'YOUR PLATE',
    plateLabel: '{STYLE} · FLAIR ×{n}',
    empty: 'Nothing yet. Tap the Pantry to add a portion.',
    chip: '{Ingredient} ×{n}',
    strokesApply: 'Strokes apply to {item}',
    fling: 'Fling to the Bin',
    pad: 'SIGIL PAD',
    mess: 'MESS ×{n} · SWEEP TO WIPE',
    padHint: 'SLASH TO CUT · SPIRAL TO HEAT · FLICK UP TO PLATE',
    cut: 'Cut',
    heat: 'Heat',
    preferButtons: 'Prefer buttons',
    pantry: 'PANTRY · {CITY}',
    cap: 'Cap 3 portions · leftovers hour 21:00',
    capOff: 'Leftovers hour · no cap on plentiful stock',
    runningLow: 'Running low',
    gone: 'Gone',
    badge: '×{n}',
    bread: 'BREAD · OPTIONAL',
    extras: 'PANTRY EXTRAS',
    extrasCaption: 'Shared across all five dishes. Use responsibly, or do not.',
    plateIt: 'Plate it',
    plateHint: 'or flick up on the sigil pad',
  },
  /** Spec §3.4 portion style (live label), prep words and sigil words. */
  style: { empty: 'Empty', neat: 'Neat', generous: 'Generous', unhinged: 'Unhinged' },
  prep: {
    raw: 'raw',
    cut: ['', 'cut', 'diced', 'dust'],
    heat: ['', 'cooked', 'seared', 'burnt'],
  },
  sigils: { cut: 'CUT', heat: 'HEAT', plate: 'PLATE', clean: 'CLEAN' },
  cursed: {
    title: 'Cursed Plates · {n}',
    caption: 'Everything the Bin refused to forget.',
  },
  /** Spec §3.6–3.9: what the judge says. */
  judge: {
    emptyName: 'Empty Plate of unknown origin',
    hint: 'meant to be {dish}',
    air: 'You plated air. Bold. Pointless, but bold.',
    durian: 'Durian. In {dish}. I will be filing a report.',
    portions: '{Eight} portions of {item}. {Eight}. I counted.',
    rawRice: 'The rice is raw. Rice is the easy part.',
    waste: 'Something below said thank you. That is not normal.',
    labels: {
      clean: 'Clean plate',
      academy: 'Academy acceptable',
      saucy: 'Saucy but controlled',
      bold: 'Bold but messy',
      comforting: 'Comforting',
      questions: 'The Bin has questions',
      lost: 'The plate lost the argument',
    },
    habits: {
      chilli: 'You doubled the chilli again · ×{n}',
      rawRice: 'Raw rice. Again.',
      unhinged: 'Unhinged plate ×{n} this month',
      neat: 'Neat plater, apparently',
      sauce: 'Sauce first, as usual',
      new: 'A new habit is forming',
    },
  },
  /** Spec §3.8: number words to twelve, numerals beyond (the prototype's table). Content, not copy. */
  numbers: {
    4: 'Four',
    5: 'Five',
    6: 'Six',
    7: 'Seven',
    8: 'Eight',
    9: 'Nine',
    10: 'Ten',
    11: 'Eleven',
    12: 'Twelve',
  },
  /** Spec §5 Verdict, §3.13. */
  verdict: {
    title: "The Bin's verdict",
    cursedOverline: 'CURSED PLATE · meant to be {dish}',
    stones: '{n} of 3 {gems}',
    leftoversChip: 'Leftovers hour',
    cursedChip: 'Cursed plate',
    share: 'Share to your party',
    setSignature: 'Set as Signature Dish',
    signatureSet: 'Signature Dish set',
    seeOthers: 'See who else made {dish}',
  },
  /** Spec §3.12, §5 Share card. */
  share: {
    title: 'Share card',
    overline: '{CITY} · {date}',
    send: 'Send to your party',
    sent: 'Sent to your party',
    save: 'Save image',
  },
  /** Art placeholder captions naming each slot (kickoff prompt, Assets). RULING (prototype text) */
  art: {
    intro: ['Illustration: the city shelf', 'Illustration: three sigils', 'Illustration: the Bin'],
    bin: 'The Bin, character art',
    dish: 'Dish render',
    render: 'Render',
  },
  /** Spec §3.6 namer parts and §3.8 tier lines (used by the Phase 3 namer, and by the simulated wall today). */
  namer: {
    tones: ['Strange', 'Suspicious', 'Chaotic', 'Questionable', 'Cursed', 'Experimental', 'Unfortunate'],
    bases: ['Plate', 'Bowl', 'Creation', 'Mess', 'Heap', 'Accident'],
    details: [
      'of unknown origin',
      'with too much confidence',
      'gone slightly wrong',
      'that should not exist',
    ],
    prefix: { burnt: 'Burnt ', seared: 'Seared ', generous: 'Generous ' },
    suffix: { drowning: ', drowning in {sauce}', extra: ' with {extra}', missing: ', missing something' },
  },
  lines: {
    3: [
      'Fine. I have eaten worse on purpose.',
      'Acceptable. Do not let it go to your head.',
      'Clean plate. I have nothing to add, which annoys me.',
    ],
    2: [
      'Edible. That is the whole review.',
      'You were close. Closeness is not a flavour.',
      'The rice is doing all the work here.',
    ],
    1: [
      'I am a bin and even I have standards.',
      'This plate lost an argument with itself.',
      'I will eat it. I will not enjoy it. I never do.',
    ],
  },
  /** Screen-reader labels (prototype aria-labels; the spec names none). RULING */
  a11y: {
    back: "Back to today's dishes",
    backToVerdict: 'Back to the verdict',
    remove: 'Remove one portion',
    main: 'Main',
    intro: 'Intro',
    cursed: 'Cursed Plates',
    gem: '{Gem} gem',
    gemActive: '{Gem} gem, active',
    gemPick: '{Gem} {Class}',
    stones: '{n} of 3 {gems}',
  },
  /** Existing OraX chrome reproduced from the prototype (not Build-A-Dish copy). RULING */
} as const;

/** Fill `{name}` placeholders. `{Dish}`/`{City}` are filled as given; callers pass the right case. */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (m, k: string) => {
    const v = values[k];
    return v === undefined ? m : String(v);
  });
}
