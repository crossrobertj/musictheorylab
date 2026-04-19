import { getCompatibleScalesForNoteClasses } from "./finder";
import { CHORD_TEMPLATES, buildChordFromRootAndQuality, getScaleNotes, normalizeNote, transposeNote } from "./music";

const INTERVAL_LABELS: Record<number, string> = {
  0: "Root",
  1: "m2",
  2: "M2",
  3: "m3",
  4: "M3",
  5: "P4",
  6: "d5",
  7: "P5",
  8: "A5",
  9: "M6",
  10: "m7",
  11: "M7",
  13: "b9",
  14: "9",
  15: "#9",
  17: "11",
  18: "#11",
  21: "13",
};

const QUALITY_ALIASES: Record<string, keyof typeof CHORD_TEMPLATES> = {
  "": "Major",
  maj: "Major",
  M: "Major",
  major: "Major",
  m: "minor",
  min: "minor",
  minor: "minor",
  dim: "dim",
  "°": "dim",
  aug: "aug",
  "+": "aug",
  sus2: "sus2",
  sus4: "sus4",
  "5": "5",
  "6": "6",
  m6: "min6",
  min6: "min6",
  "7": "7",
  maj7: "maj7",
  M7: "maj7",
  min7: "min7",
  m7: "min7",
  m7b5: "min7b5",
  min7b5: "min7b5",
  "ø7": "min7b5",
  dim7: "dim7",
  "°7": "dim7",
  "9": "9",
  maj9: "maj9",
  M9: "maj9",
  min9: "min9",
  m9: "min9",
  "11": "11",
  min11: "min11",
  m11: "min11",
  "13": "13",
  maj13: "13",
  M13: "13",
  "7#5": "7alt",
  "7+5": "7alt",
  "7b5": "7alt",
  "7#9": "7#9",
  "7b9": "7b9",
  add9: "add9",
  maj11: "maj11",
  "maj7#11": "maj7#11",
  lydian: "maj7#11",
};

const ROMAN_NUMERALS = ["I", "ii", "iii", "IV", "V", "vi", "vii°"];
const HARMONIC_FUNCTIONS = [
  "Tonic",
  "Supertonic",
  "Mediant",
  "Subdominant",
  "Dominant",
  "Submediant",
  "Leading Tone",
] as const;

export interface ParsedChordSymbol {
  raw: string;
  root: string;
  qualityKey: keyof typeof CHORD_TEMPLATES;
  notes: string[];
  noteClasses: string[];
  intervalLabels: string[];
  fullName: string;
  construction: string;
}

export interface ChordAnalyzerResult extends ParsedChordSymbol {
  inversions: { label: string; notes: string[] }[];
  compatibleScales: ReturnType<typeof getCompatibleScalesForNoteClasses>;
}

export function parseChordSymbol(input: string): ParsedChordSymbol | null {
  const raw = input.trim();
  if (!raw) return null;

  const match = raw.match(/^([A-G][#b]?)(.*)$/);
  if (!match) return null;

  const root = normalizeNote(match[1]);
  const alias = match[2].trim();
  const compactAlias = alias.replace(/\s+/g, "");
  const lowerAlias = compactAlias.toLowerCase();
  const qualityKey =
    QUALITY_ALIASES[alias] ??
    QUALITY_ALIASES[compactAlias] ??
    QUALITY_ALIASES[lowerAlias] ??
    QUALITY_ALIASES[compactAlias.replace(/^M(?=\d)/, "maj")];
  if (!qualityKey) return null;

  const template = CHORD_TEMPLATES[qualityKey];
  const notes = buildChordFromRootAndQuality(`${root}4`, qualityKey).notes;
  const noteClasses = notes.map((note) => normalizeNote(note).replace(/[0-9]/g, ""));
  const intervalLabels = template.intervals.map((interval) => INTERVAL_LABELS[interval] ?? `${interval}st`);

  return {
    raw,
    root,
    qualityKey,
    notes,
    noteClasses,
    intervalLabels,
    fullName: `${root}${template.symbol}`.trim() === root ? `${root} major triad` : `${root}${template.symbol}`,
    construction: `${root} plus ${intervalLabels.join(" • ")}`,
  };
}

export function buildChordAnalysis(input: string): ChordAnalyzerResult | null {
  const parsed = parseChordSymbol(input);
  if (!parsed) return null;

  return {
    ...parsed,
    inversions: buildInversions(parsed.notes),
    compatibleScales: getCompatibleScalesForNoteClasses(parsed.noteClasses, 10),
  };
}

function buildInversions(notes: string[]) {
  return notes.map((_, index) => {
    const inversionNotes = notes.slice(index).map((note, offset) => {
      if (offset === 0) return note;
      return note;
    });
    const wrappedNotes = notes
      .slice(0, index)
      .map((note) => transposeNote(note, 12));
    return {
      label: index === 0 ? "Root Position" : `${index}${ordinalSuffix(index)} Inversion`,
      notes: [...inversionNotes, ...wrappedNotes],
    };
  });
}

export function buildChordInversions(notes: string[]) {
  return buildInversions(notes);
}

function ordinalSuffix(value: number) {
  if (value === 1) return "st";
  if (value === 2) return "nd";
  if (value === 3) return "rd";
  return "th";
}

export function suggestRomanNumeral(root: string, currentKey: string) {
  const scaleRoots = getScaleNotes(currentKey).map((note) => normalizeNote(note).replace(/[0-9]/g, ""));
  const degree = scaleRoots.indexOf(root);
  if (degree < 0) {
    return {
      label: "Foreign to key",
      detail: `${root} is outside ${currentKey}.`,
    };
  }

  return {
    label: ROMAN_NUMERALS[degree],
    detail: `${HARMONIC_FUNCTIONS[degree]} function in ${currentKey}.`,
  };
}
