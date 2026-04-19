import { NOTES, getMidiNumber, getNoteClass, getNotesFromIntervals, getScaleNotes, normalizeNote } from "./music";

export interface HarmonicFunctionCell {
  numeral: string;
  func: string;
  tone: "tonic" | "predominant" | "dominant" | "modal";
}

export interface MelodicMinorMode {
  name: string;
  intervals: number[];
  desc: string;
}

export interface UpperStructure {
  name: string;
  triadOffsets: number[];
  tension: string;
  func: string;
}

export const MELODIC_MINOR_MODES: MelodicMinorMode[] = [
  { name: "I: Melodic Minor", intervals: [0, 2, 3, 5, 7, 9, 11], desc: "Jazz minor with raised 6 and 7." },
  { name: "II: Dorian b2", intervals: [0, 1, 3, 5, 7, 9, 10], desc: "Minor quality with a darker second degree." },
  { name: "III: Lydian Augmented", intervals: [0, 2, 4, 6, 8, 9, 11], desc: "Major quality with both #4 and #5 color." },
  { name: "IV: Lydian Dominant", intervals: [0, 2, 4, 6, 7, 9, 10], desc: "Dominant sound with a #11 extension." },
  { name: "V: Mixolydian b6", intervals: [0, 2, 4, 5, 7, 8, 10], desc: "Dominant with altered sixth color." },
  { name: "VI: Locrian #2", intervals: [0, 2, 3, 5, 6, 8, 10], desc: "Half-diminished source with a natural 2." },
  { name: "VII: Super Locrian", intervals: [0, 1, 3, 4, 6, 8, 10], desc: "Altered dominant palette with maximum tension." },
];

export const UPPER_STRUCTURES: UpperStructure[] = [
  { name: "US I: bII major", triadOffsets: [1, 5, 8], tension: "b9, 11, b13", func: "Altered color cluster" },
  { name: "US II: bIII major", triadOffsets: [3, 7, 10], tension: "#9, 13, b7", func: "Augmented dominant pull" },
  { name: "US III: V major", triadOffsets: [4, 8, 11], tension: "3, b13, 7", func: "Lydian-dominant brightness" },
  { name: "US IV: bVI major", triadOffsets: [8, 0, 3], tension: "b13, root, #9", func: "Dark altered dominant" },
  { name: "US V: II minor", triadOffsets: [2, 5, 9], tension: "9, 11, 13", func: "Extended dominant without heavy alteration" },
  { name: "US VI: bVII minor", triadOffsets: [10, 1, 5], tension: "b7, b9, 11", func: "Suspended altered pull" },
];

export function getHarmonicFunctions(isMinor: boolean): HarmonicFunctionCell[] {
  if (isMinor) {
    return [
      { numeral: "i", func: "Tonic", tone: "tonic" },
      { numeral: "ii°", func: "Pre-Dominant", tone: "predominant" },
      { numeral: "bIII", func: "Tonic", tone: "tonic" },
      { numeral: "iv", func: "Subdominant", tone: "predominant" },
      { numeral: "V", func: "Dominant", tone: "dominant" },
      { numeral: "bVI", func: "Modal Color", tone: "modal" },
      { numeral: "bVII", func: "Dominant", tone: "dominant" },
    ];
  }

  return [
    { numeral: "I", func: "Tonic", tone: "tonic" },
    { numeral: "ii", func: "Subdominant", tone: "predominant" },
    { numeral: "iii", func: "Tonic", tone: "tonic" },
    { numeral: "IV", func: "Subdominant", tone: "predominant" },
    { numeral: "V", func: "Dominant", tone: "dominant" },
    { numeral: "vi", func: "Tonic", tone: "tonic" },
    { numeral: "vii°", func: "Dominant", tone: "dominant" },
  ];
}

export function getDegreeTriad(key: string, degree: number) {
  const scale = getScaleNotes(key);
  return [scale[degree % 7], scale[(degree + 2) % 7], scale[(degree + 4) % 7]];
}

function getTriadSuffix(notes: string[]) {
  const rootMidi = Math.round(getMidiNumber(notes[0]));
  const third = ((Math.round(getMidiNumber(notes[1])) - rootMidi) % 12 + 12) % 12;
  const fifth = ((Math.round(getMidiNumber(notes[2])) - rootMidi) % 12 + 12) % 12;

  if (third === 4 && fifth === 7) return "";
  if (third === 3 && fifth === 7) return "m";
  if (third === 3 && fifth === 6) return "°";
  if (third === 4 && fifth === 8) return "+";
  return "";
}

export function buildScaleChords(notes: string[]) {
  return notes.map((note, index) => {
    const triad = [note, notes[(index + 2) % notes.length], notes[(index + 4) % notes.length]];
    return `${getNoteClass(note)}${getTriadSuffix(triad)}`;
  });
}

export function resolveMelodicMinorModes(root: string) {
  const rootNote = normalizeNote(root);
  const parentScale = getNotesFromIntervals(`${rootNote}4`, MELODIC_MINOR_MODES[0].intervals);

  return MELODIC_MINOR_MODES.map((mode, index) => {
    const modeRoot = parentScale[index] ?? `${rootNote}4`;
    const notes = getNotesFromIntervals(modeRoot, mode.intervals);
    return {
      ...mode,
      root: getNoteClass(modeRoot),
      notes,
      chords: buildScaleChords(notes),
    };
  });
}

export function resolveUpperStructures(root: string) {
  const rootIndex = NOTES.indexOf(normalizeNote(root) as (typeof NOTES)[number]);
  return UPPER_STRUCTURES.map((structure) => {
    const notes = structure.triadOffsets.map((offset) => {
      const index = (rootIndex + offset) % 12;
      const octave = 4 + Math.floor((rootIndex + offset) / 12);
      return `${NOTES[index]}${octave}`;
    });
    return {
      ...structure,
      notes,
      dominantShell: [
        `${root}3`,
        `${NOTES[(rootIndex + 4) % 12]}3`,
        `${NOTES[(rootIndex + 7) % 12]}3`,
        `${NOTES[(rootIndex + 10) % 12]}3`,
      ],
    };
  });
}
