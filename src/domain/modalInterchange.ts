import { formatNote, getNotesFromIntervals, getParallelKey, getRootFromKey } from "./music";

export interface ModalInterchangeMode {
  name: string;
  intervals: number[];
  numerals: string[];
}

export interface ModalInterchangeChord {
  numeral: string;
  root: string;
  notes: string[];
}

export interface ModalInterchangeRow {
  name: string;
  keyName: string;
  isHome: boolean;
  notes: string[];
  chords: ModalInterchangeChord[];
}

export const MODAL_INTERCHANGE_MODES: ModalInterchangeMode[] = [
  { name: "Ionian", intervals: [0, 2, 4, 5, 7, 9, 11], numerals: ["I", "ii", "iii", "IV", "V", "vi", "vii dim"] },
  { name: "Dorian", intervals: [0, 2, 3, 5, 7, 9, 10], numerals: ["i", "ii", "bIII", "IV", "v", "vi dim", "bVII"] },
  { name: "Phrygian", intervals: [0, 1, 3, 5, 7, 8, 10], numerals: ["i", "bII", "bIII", "iv", "v dim", "bVI", "bvii"] },
  { name: "Lydian", intervals: [0, 2, 4, 6, 7, 9, 11], numerals: ["I", "II", "iii", "#iv dim", "V", "vi", "vii"] },
  { name: "Mixolydian", intervals: [0, 2, 4, 5, 7, 9, 10], numerals: ["I", "ii", "iii dim", "IV", "v", "vi", "bVII"] },
  { name: "Aeolian", intervals: [0, 2, 3, 5, 7, 8, 10], numerals: ["i", "ii dim", "bIII", "iv", "v", "bVI", "bVII"] },
  { name: "Locrian", intervals: [0, 1, 3, 5, 6, 8, 10], numerals: ["i dim", "bII", "biii", "iv", "bV", "bVI", "bvii"] },
];

function buildModeChord(root: string, intervals: number[], index: number, keySignature: string) {
  const triadIntervals = [
    intervals[index],
    index + 2 < intervals.length ? intervals[index + 2] : intervals[index + 2 - intervals.length] + 12,
    index + 4 < intervals.length ? intervals[index + 4] : intervals[index + 4 - intervals.length] + 12,
  ];

  return getNotesFromIntervals(`${root}4`, triadIntervals).map((note) => formatNote(note, keySignature));
}

export function getModalInterchangeRows(currentKey: string): ModalInterchangeRow[] {
  const root = getRootFromKey(currentKey);
  const homeMode = currentKey.includes("Major") ? "Ionian" : "Aeolian";
  const parallelKey = getParallelKey(currentKey);

  return MODAL_INTERCHANGE_MODES.map((mode) => {
    const keySignature = mode.name === "Aeolian" ? parallelKey : currentKey;
    const notes = getNotesFromIntervals(`${root}4`, mode.intervals).map((note) =>
      formatNote(note, keySignature),
    );

    return {
      name: mode.name,
      keyName: `${root} ${mode.name}`,
      isHome: mode.name === homeMode,
      notes,
      chords: mode.numerals.map((numeral, index) => ({
        numeral,
        root: notes[index].replace(/[0-9]/g, ""),
        notes: buildModeChord(root, mode.intervals, index, keySignature),
      })),
    };
  });
}
