import { buildScaleChords } from "./advancedHarmony";
import { NOTES, getNoteClass, getParallelKey, getRelativeKey, getScaleNotes, normalizeNote } from "./music";

const MAJOR_NUMERALS = ["I", "ii", "iii", "IV", "V", "vi", "vii°"];
const MINOR_NUMERALS = ["i", "ii°", "bIII", "iv", "v", "bVI", "bVII"];

export interface PivotChord {
  chord: string;
  fromDegree: string;
  toDegree: string;
}

export interface ModulationAnalysis {
  fromScale: string[];
  toScale: string[];
  sharedNotes: string[];
  semitoneDistance: number;
  pivotChords: PivotChord[];
}

export function analyzeModulation(fromKey: string, toKey: string): ModulationAnalysis {
  const fromRoot = normalizeNote(fromKey.split(" ")[0]);
  const toRoot = normalizeNote(toKey.split(" ")[0]);
  const fromScale = getScaleNotes(fromKey);
  const toScale = getScaleNotes(toKey);
  const fromClasses = fromScale.map((note) => getNoteClass(note));
  const toClasses = toScale.map((note) => getNoteClass(note));
  const sharedNotes = [...new Set(fromClasses.filter((note) => toClasses.includes(note)))];
  const semitoneDistance =
    ((NOTES.indexOf(toRoot as (typeof NOTES)[number]) -
      NOTES.indexOf(fromRoot as (typeof NOTES)[number])) %
      12 +
      12) %
    12;

  const fromChords = buildScaleChords(fromScale);
  const toChords = buildScaleChords(toScale);
  const fromNumerals = fromKey.includes("Minor") ? MINOR_NUMERALS : MAJOR_NUMERALS;
  const toNumerals = toKey.includes("Minor") ? MINOR_NUMERALS : MAJOR_NUMERALS;
  const pivotChords: PivotChord[] = [];

  fromChords.forEach((chord, fromIndex) => {
    toChords.forEach((candidate, toIndex) => {
      if (chord !== candidate) return;
      if (pivotChords.some((item) => item.chord === chord)) return;
      pivotChords.push({
        chord,
        fromDegree: fromNumerals[fromIndex],
        toDegree: toNumerals[toIndex],
      });
    });
  });

  return { fromScale, toScale, sharedNotes, semitoneDistance, pivotChords };
}

export function buildParallelComparison(root: string) {
  const majorKey = `${root} Major`;
  const minorKey = `${root} Minor`;
  const majorScale = getScaleNotes(majorKey);
  const minorScale = getScaleNotes(minorKey);

  return {
    root,
    majorKey,
    minorKey,
    majorScale,
    minorScale,
    majorChords: buildScaleChords(majorScale),
    minorChords: buildScaleChords(minorScale),
    relativeKey: getRelativeKey(majorKey),
    parallelKey: getParallelKey(majorKey),
  };
}
