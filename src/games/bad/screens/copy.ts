// Copy of record for the Build-A-Dish screens: the prototype's BaD BOARD and BaD STATION sections, verbatim.
// The Bin's own lines, the CTA ladder and the stock words come from the engine (BaD's content).

export const BOARD = {
  caption: (city: string) => `One shelf for all of ${city}. One dish a day, swap once.`,
  cursed: (n: number) => `Cursed Plates · ${n}`,
  leftoversLabel: 'Leftovers hour · until 00:00',
  leftoversCaption: 'Portion caps are off on anything the city still has plenty of.',
  youAreIn: (n: number, dish: string) => `You are in. ${n} cooking ${dish} right now.`,
  cookingToday: 'Cooking today',
  cooking: 'cooking',
  footer: (n: string, city: string) => `The Bin has eaten ${n} plates in ${city} today.`,
} as const;

export const STATION = {
  hint: 'Tap the Pantry · stroke the pad',
  plate: 'Your plate',
  styleLabel: (style: string, flair: number) => `${style} · Flair ×${flair}`,
  empty: 'Nothing yet. Tap the Pantry to add a portion.',
  chip: (name: string, n: number) => `${name} ×${n}`,
  applyTo: (name: string) => `Strokes apply to ${name}`,
  aim: 'Tap an item to aim your strokes',
  fling: 'Fling to the Bin',
  pad: 'Sigil pad',
  mess: (n: number) => `Mess ×${n} · sweep to wipe`,
  padHint: 'Slash to cut · spiral to heat · flick up to plate',
  cut: 'Cut',
  heat: 'Heat',
  wipe: 'Wipe',
  buttonsOrStrokes: 'Buttons or strokes. Nothing you draw can fail.',
  pantry: (city: string) => `Pantry · ${city}`,
  cap: 'Cap 3 portions · leftovers hour 21:00',
  capOff: 'Leftovers hour · no cap on plentiful stock',
  runningLow: 'Running low',
  gone: 'Gone',
  offRecipe: 'off-recipe',
  remove: 'Remove one portion',
  bread: 'Bread · optional',
  extras: 'Pantry extras',
  extrasCaption: 'Shared across all five dishes. Use responsibly, or do not.',
  plateIt: 'Plate it',
  plateHint: 'or flick up on the sigil pad',
} as const;

export const VERDICT = {
  bin: 'The Bin',
  pose: (pose: string) => `The Bin · ${pose}`,
  cursed: (dish: string) => `Cursed plate · meant to be ${dish}`,
  stones: (n: number, gems: string) => `${n} of 3 ${gems}`,
  leftovers: 'Leftovers hour',
  cursedChip: 'Cursed plate',
  share: 'Share to your party',
  setSignature: 'Set as Signature Dish',
  signatureSet: 'Signature Dish set',
  seeOthers: (dish: string) => `See who else made ${dish}`,
  signatureToast: 'Signature Dish set. It sits on your profile until you replace it.',
} as const;
