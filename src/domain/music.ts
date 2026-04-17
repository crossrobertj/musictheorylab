import {
  ALL_SCALES,
  CHORD_TEMPLATES,
  PROGRESSIONS,
} from "./generated/theory-data";

export { ALL_SCALES, CHORD_TEMPLATES, PROGRESSIONS };

export const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"] as const;

export type NoteName = (typeof NOTES)[number];
export type ScaleMap = typeof ALL_SCALES;
export type ChordTemplateMap = typeof CHORD_TEMPLATES;
export type ChordQuality = keyof ChordTemplateMap;

export interface BuiltChord {
  name: string;
  notes: string[];
  quality: string;
}

export interface DiatonicChord extends BuiltChord {
  degree: number;
  roman: string;
}

const SHARP_KEYS = new Set([
  "G Major",
  "D Major",
  "A Major",
  "E Major",
  "B Major",
  "F# Major",
  "C# Major",
  "E Minor",
  "B Minor",
  "F# Minor",
  "C# Minor",
  "G# Minor",
  "D# Minor",
  "A# Minor",
]);

const TRIAD_ROMAN_MAJOR = ["I", "ii", "iii", "IV", "V", "vi", "vii°"];
const TRIAD_ROMAN_MINOR = ["i", "ii°", "III", "iv", "v", "VI", "VII"];
const SEVENTH_ROMAN_MAJOR = ["Imaj7", "ii7", "iii7", "IVmaj7", "V7", "vi7", "viiø7"];
const SEVENTH_ROMAN_MINOR = ["i7", "iiø7", "IIImaj7", "iv7", "v7", "VImaj7", "VII7"];
const MICROTONAL_INTERVAL_NAMES: Record<number, string> = {
  0.5: "Quarter Tone",
  1.5: "Neutral 2nd",
  2.5: "Three-Quarter Tone 2nd",
  3.5: "Neutral 3rd",
  4.5: "Seven-Quarter Tone 3rd",
  5.5: "Quarter-Tone augmented 4th",
  6.5: "Quarter-Tone diminished 5th",
  7.5: "Neutral 6th",
  8.5: "Neutral 6th / Quarter-tone flat 6",
  9.5: "Neutral 7th",
  10.5: "Neutral 7th / Quarter-tone flat 7",
  11.5: "Quarter-Tone flat Octave",
};
const INTERVAL_NAMES: Record<number, string> = {
  0: "Unison",
  1: "Minor 2nd",
  2: "Major 2nd",
  3: "Minor 3rd",
  4: "Major 3rd",
  5: "Perfect 4th",
  6: "Tritone",
  7: "Perfect 5th",
  8: "Minor 6th",
  9: "Major 6th",
  10: "Minor 7th",
  11: "Major 7th",
  12: "Octave",
};
const KEY_DISTANCE_RELATIONSHIPS: Record<number, { name: string; desc: string }> = {
  0: { name: "Same Root", desc: "These keys share the same root note. If one is major and one is minor, they are parallel keys." },
  1: { name: "Minor 2nd", desc: "Very dissonant interval. These keys share no common notes. Creates maximum tension." },
  2: { name: "Major 2nd", desc: "Whole step apart. Shares one common note. Common in modulations." },
  3: { name: "Minor 3rd", desc: "Relative major/minor relationship if both are major or both minor. Shares 6 notes if same quality." },
  4: { name: "Major 3rd", desc: "Mediant relationship. Shares some common tones. Smooth modulation possible." },
  5: { name: "Perfect 4th", desc: "Subdominant relationship. Very closely related. Shares 6 common notes." },
  6: { name: "Tritone", desc: "Most distant relationship. No common notes. Maximum contrast and tension." },
  7: { name: "Perfect 5th", desc: "Dominant relationship. Most closely related keys. Shares 6 common notes." },
  8: { name: "Minor 6th", desc: "Submediant relationship. Moderately related. Some shared harmonic function." },
  9: { name: "Major 6th", desc: "Relative major/minor if different quality. Smooth relationship with shared tones." },
  10: { name: "Minor 7th", desc: "Subtonic relationship. Few shared notes but interesting color." },
  11: { name: "Major 7th", desc: "Leading tone relationship. Very dissonant. Maximum harmonic tension." },
};
export const CIRCLE_MAJOR_KEYS = ["C", "G", "D", "A", "E", "B", "F#", "Db", "Ab", "Eb", "Bb", "F"] as const;
export const CIRCLE_MINOR_KEYS = ["A", "E", "B", "F#", "C#", "G#", "D#", "Bb", "F", "C", "G", "D"] as const;

const ENHARMONIC_MAP: Record<string, string> = {
  Db: "C#",
  Eb: "D#",
  Gb: "F#",
  Ab: "G#",
  Bb: "A#",
  "E#": "F",
  "B#": "C",
  Cb: "B",
  Fb: "E",
};

interface ParsedNote {
  noteClass: string;
  octave?: string;
  cents: number;
}

function parseNote(note: string): ParsedNote | null {
  const trimmed = note.trim();
  if (!trimmed) return null;

  let target = trimmed;
  let cents = 0;

  if (target.includes("_")) {
    const [base, centsPart] = target.split("_");
    target = base;
    const parsedCents = Number.parseFloat(centsPart);
    if (Number.isFinite(parsedCents)) cents = parsedCents;
  } else if (target.endsWith("^")) {
    target = target.slice(0, -1);
    cents = 50;
  } else if (target.endsWith("d")) {
    target = target.slice(0, -1);
    cents = -50;
  }

  const match = target.match(/^([A-G][#b]?)([0-9]+)?$/);
  if (!match) return null;

  return {
    noteClass: match[1],
    octave: match[2],
    cents,
  };
}

function formatCentsSuffix(cents: number) {
  if (!cents) return "";
  return cents > 0 ? ` +${cents}c` : ` ${cents}c`;
}

export function normalizeNote(note: string) {
  const parsed = parseNote(note);
  if (!parsed) return note;

  const normalizedClass = ENHARMONIC_MAP[parsed.noteClass] || parsed.noteClass;
  const centsSuffix = parsed.cents ? `_${Math.round(parsed.cents * 100) / 100}` : "";
  return `${normalizedClass}${parsed.octave || ""}${centsSuffix}`;
}

export function getRootFromKey(key: string) {
  return key.replace(" Major", "").replace(" Minor", "");
}

export function usesFlats(key: string) {
  return (
    !SHARP_KEYS.has(key) &&
    (key.includes("b") ||
      key.includes("F Major") ||
      key.includes("D Minor") ||
      key.includes("G Minor") ||
      key.includes("C Minor") ||
      key.includes("F Minor"))
  );
}

export function formatNoteClass(note: string, key: string) {
  const parsed = parseNote(normalizeNote(note));
  if (!parsed) return note;
  const noteClass = parsed.noteClass;
  if (!usesFlats(key)) return noteClass;

  const flatMap: Record<string, string> = {
    "C#": "Db",
    "D#": "Eb",
    "F#": "Gb",
    "G#": "Ab",
    "A#": "Bb",
  };

  return flatMap[noteClass] || noteClass;
}

export function formatNote(note: string, key: string) {
  const parsed = parseNote(normalizeNote(note));
  if (!parsed) return note;
  return `${formatNoteClass(parsed.noteClass, key)}${parsed.octave || ""}${formatCentsSuffix(parsed.cents)}`;
}

export function getNoteClass(note: string) {
  const parsed = parseNote(normalizeNote(note));
  return parsed ? parsed.noteClass : normalizeNote(note).replace(/[0-9]/g, "");
}

export function getPitchToken(note: string) {
  const parsed = parseNote(normalizeNote(note));
  if (!parsed) return normalizeNote(note).replace(/[0-9]/g, "");
  return `${parsed.noteClass}${parsed.cents ? `_${Math.round(parsed.cents * 100) / 100}` : ""}`;
}

export function isMicrotonalNote(note: string) {
  const parsed = parseNote(normalizeNote(note));
  return Boolean(parsed?.cents);
}

export function transposeNote(note: string, semitones: number) {
  const match = note.match(/^([A-G][#b]?)([0-9])?$/);
  const base = match ? normalizeNote(match[1]) : normalizeNote(note);
  const octave = match?.[2] ? Number.parseInt(match[2], 10) : 4;
  const noteIndex = NOTES.indexOf(base as NoteName);
  const totalSemitones = noteIndex + semitones;
  const wrappedIndex = ((totalSemitones % 12) + 12) % 12;
  const octaveOffset = Math.floor(totalSemitones / 12);
  return `${NOTES[wrappedIndex]}${octave + octaveOffset}`;
}

export function getNotesFromIntervals(rootWithOctave: string, intervals: readonly number[]) {
  let rootName = rootWithOctave;
  let startOctave = 4;

  const match = rootWithOctave.match(/^([A-G][#b]?)([0-9])?$/);
  if (match) {
    rootName = normalizeNote(match[1]);
    if (match[2]) startOctave = Number.parseInt(match[2], 10);
  }

  const rootIndex = NOTES.indexOf(rootName as NoteName);
  return intervals.map((interval) => {
    const wholeSemitones = Math.floor(interval);
    const fraction = interval % 1;
    const totalSemitones = rootIndex + wholeSemitones;
    const noteIndex = ((totalSemitones % 12) + 12) % 12;
    const octaveOffset = Math.floor(totalSemitones / 12);
    const note = `${NOTES[noteIndex]}${startOctave + octaveOffset}`;

    if (fraction === 0) return note;
    const cents = Math.round(fraction * 100 * 100) / 100;
    return `${note}_${cents}`;
  });
}

export function getScaleNotes(key: string) {
  const intervals = key.includes("Minor")
    ? [0, 2, 3, 5, 7, 8, 10]
    : [0, 2, 4, 5, 7, 9, 11];

  return getNotesFromIntervals(`${getRootFromKey(key)}4`, intervals).map((note) =>
    formatNote(note, key),
  );
}

export function getMidiNumber(noteString: string) {
  let cents = 0;
  let target = noteString;

  if (target.includes("_")) {
    const [base, centsPart] = target.split("_");
    target = base;
    cents = Number.parseFloat(centsPart);
  } else if (target.endsWith("^")) {
    target = target.slice(0, -1);
    cents = 50;
  } else if (target.endsWith("d")) {
    target = target.slice(0, -1);
    cents = -50;
  }

  const match = target.match(/^([A-G][#b]?)([0-9])?$/);
  if (!match) return 69;

  const normalized = normalizeNote(match[1]);
  const octave = match[2] ? Number.parseInt(match[2], 10) : 4;
  const noteIndex = NOTES.indexOf(normalized as NoteName);
  return (octave + 1) * 12 + noteIndex + cents / 100;
}

export function getNoteAtFret(openNote: string, fret: number) {
  const match = openNote.match(/^([A-G][#b]?)([0-9])$/);
  if (!match) return null;

  const openIndex = NOTES.indexOf(normalizeNote(match[1]) as NoteName);
  const openOctave = Number.parseInt(match[2], 10);
  const totalSemitones = openIndex + fret;
  return `${NOTES[totalSemitones % 12]}${openOctave + Math.floor(totalSemitones / 12)}`;
}

export function getFrequency(noteString: string, basePitch = 440) {
  const midi = getMidiNumber(noteString);
  return basePitch * Math.pow(2, (midi - 69) / 12);
}

export function getSemitoneDistance(noteA: string, noteB: string) {
  const left = getMidiNumber(noteA);
  const right = getMidiNumber(noteB);
  return Math.round((right - left) * 100) / 100;
}

export function getIntervalName(semitones: number) {
  const absolute = Math.abs(semitones);
  const reduced = ((absolute % 12) + 12) % 12;
  const baseName =
    INTERVAL_NAMES[absolute] ||
    INTERVAL_NAMES[reduced] ||
    MICROTONAL_INTERVAL_NAMES[reduced] ||
    `${absolute} semitones`;
  return semitones < 0 ? `Descending ${baseName}` : baseName;
}

function raiseToAtLeast(note: string, minimumMidi: number) {
  let candidate = normalizeNote(note);
  while (getMidiNumber(candidate) <= minimumMidi) {
    candidate = transposeNote(candidate, 12);
  }
  return candidate;
}

function getChordNameFromRootAndQuality(root: string, quality: string) {
  if (quality === "Major" || quality === "minor" || quality === "dim") {
    return `${root} ${quality}`;
  }

  const template = CHORD_TEMPLATES[quality as ChordQuality];
  if (!template) return `${root} ${quality}`;
  return `${root}${template.symbol}`;
}

function intervalsFromChord(notes: string[]) {
  const rootMidi = getMidiNumber(notes[0]);
  return notes.map((note) => Math.round((getMidiNumber(note) - rootMidi) * 100) / 100);
}

function matchTemplateByIntervals(notes: string[]) {
  const target = intervalsFromChord(notes);
  const targetKey = target.join(",");

  for (const [quality, template] of Object.entries(CHORD_TEMPLATES)) {
    if (template.intervals.join(",") === targetKey) {
      return quality;
    }
  }

  if (target.length === 3) {
    const [, third, fifth] = target;
    if (third === 4 && fifth === 7) return "Major";
    if (third === 3 && fifth === 7) return "minor";
    if (third === 3 && fifth === 6) return "dim";
    if (third === 4 && fifth === 8) return "aug";
    if (third === 2 && fifth === 7) return "sus2";
    if (third === 5 && fifth === 7) return "sus4";
  }

  return "Major";
}

function buildDiatonicChord(key: string, degree: number, size: 3 | 4): BuiltChord {
  const scale = getScaleNotes(key).map((note) => normalizeNote(note));
  const notes: string[] = [];
  let previousMidi = Number.NEGATIVE_INFINITY;

  for (let step = 0; step < size; step += 1) {
    const scaleIndex = (degree + step * 2) % scale.length;
    const candidate = raiseToAtLeast(scale[scaleIndex], previousMidi);
    notes.push(candidate);
    previousMidi = getMidiNumber(candidate);
  }

  const root = formatNoteClass(notes[0], key);
  const quality = matchTemplateByIntervals(notes);
  return {
    name: getChordNameFromRootAndQuality(root, quality),
    notes,
    quality,
  };
}

export function buildChordFromRootAndQuality(rootWithOctave: string, quality: string): BuiltChord {
  const rootClass = normalizeNote(rootWithOctave).replace(/[0-9]/g, "");
  const template = CHORD_TEMPLATES[quality as ChordQuality] || CHORD_TEMPLATES.Major;
  return {
    name: getChordNameFromRootAndQuality(rootClass, quality),
    notes: getNotesFromIntervals(rootWithOctave, template.intervals),
    quality,
  };
}

export function getDiatonicTriads(key: string): DiatonicChord[] {
  const romanNumerals = key.includes("Minor") ? TRIAD_ROMAN_MINOR : TRIAD_ROMAN_MAJOR;
  return romanNumerals.map((roman, degree) => ({
    degree,
    roman,
    ...buildDiatonicChord(key, degree, 3),
  }));
}

export function getDiatonicSevenths(key: string): DiatonicChord[] {
  const romanNumerals = key.includes("Minor") ? SEVENTH_ROMAN_MINOR : SEVENTH_ROMAN_MAJOR;
  return romanNumerals.map((roman, degree) => ({
    degree,
    roman,
    ...buildDiatonicChord(key, degree, 4),
  }));
}

export function getScalePreview(scaleName: keyof typeof ALL_SCALES, key: string) {
  const root = getRootFromKey(key);
  const scale = ALL_SCALES[scaleName];
  return getNotesFromIntervals(`${root}4`, scale.intervals);
}

export function getChordPreview(root: string, quality: string) {
  return buildChordFromRootAndQuality(`${root}4`, quality).notes;
}

function parseRomanNumeralDetailed(numeral: string) {
  const source = numeral.replace(/♭/g, "b").replace(/♯/g, "#").replace(/\s+/g, "");
  const accidentalMatch = source.match(/^([b#]*)/);
  const accidentalPrefix = accidentalMatch ? accidentalMatch[1] : "";
  const accidental = accidentalPrefix
    .split("")
    .reduce((total, token) => total + (token === "#" ? 1 : -1), 0);
  const withoutAccidental = source.slice(accidentalPrefix.length);
  const romanMatch = withoutAccidental.match(/^(VII|VI|IV|V|III|II|I|vii|vi|iv|v|iii|ii|i)/);
  if (!romanMatch) return null;

  const roman = romanMatch[1];
  const suffix = withoutAccidental.slice(roman.length);
  const degreeMap = { I: 0, II: 1, III: 2, IV: 3, V: 4, VI: 5, VII: 6 };
  const degree = degreeMap[roman.toUpperCase() as keyof typeof degreeMap];
  const isLower = roman === roman.toLowerCase();
  let quality = isLower ? "minor" : "Major";

  if (suffix.includes("°") || suffix.includes("dim") || suffix.includes("o")) quality = "dim";
  if (suffix.includes("+") || suffix.includes("aug")) quality = "aug";
  if (suffix.includes("sus2")) quality = "sus2";
  if (suffix.includes("sus4")) quality = "sus4";
  if (suffix.includes("m7b5") || suffix.includes("ø")) quality = "min7b5";
  if (suffix.includes("dim7")) quality = "dim7";
  if (suffix.includes("maj9")) quality = "maj9";
  else if (suffix.includes("maj7")) quality = "maj7";
  else if (suffix.includes("13")) quality = "13";
  else if (suffix.includes("7b9")) quality = "7b9";
  else if (suffix.includes("9")) quality = isLower ? "min9" : "9";
  else if (suffix.includes("7")) {
    if (quality === "dim") quality = "dim7";
    else quality = isLower ? "min7" : "7";
  }

  return { degree, accidental, quality };
}

export function resolveRomanChord(numeral: string, key: string) {
  const parsed = parseRomanNumeralDetailed(numeral);
  if (!parsed) return buildDiatonicChord(key, 0, 3);

  const scale = getScaleNotes(key).map((note) => normalizeNote(note));
  const baseRoot = scale[parsed.degree] || scale[0];
  const transposedRoot = parsed.accidental ? transposeNote(baseRoot, parsed.accidental) : baseRoot;
  return buildChordFromRootAndQuality(transposedRoot, parsed.quality);
}

export function getProgressionPreview(progressionName: string, key: string) {
  const progression = PROGRESSIONS.find((entry) => entry.name === progressionName);
  if (!progression) return [];
  return progression.numerals.map((numeral) => resolveRomanChord(numeral, key));
}

export function formatIntervals(intervals: readonly number[]) {
  return intervals.join(" • ");
}

export function sortChordTemplates() {
  return Object.entries(CHORD_TEMPLATES).sort((left, right) => {
    const intervalCount = left[1].intervals.length - right[1].intervals.length;
    if (intervalCount !== 0) return intervalCount;
    return left[0].localeCompare(right[0]);
  });
}

export function sortScales() {
  return Object.entries(ALL_SCALES).sort((left, right) => left[0].localeCompare(right[0]));
}

export function calculateKeyDistance(keyA: string, keyB: string) {
  const rootA = getRootFromKey(keyA);
  const rootB = getRootFromKey(keyB);
  const indexA = NOTES.indexOf(normalizeNote(rootA) as NoteName);
  const indexB = NOTES.indexOf(normalizeNote(rootB) as NoteName);
  const upDistance = (indexB - indexA + 12) % 12;
  const downDistance = (indexA - indexB + 12) % 12;
  const shortestDistance = Math.min(upDistance, downDistance);
  const steps = Math.round(shortestDistance / 2);
  const relationship = KEY_DISTANCE_RELATIONSHIPS[shortestDistance];
  const scaleA = getScaleNotes(keyA);
  const scaleB = getScaleNotes(keyB);
  const sharedNotes = scaleA.filter((note) => scaleB.includes(note));

  return {
    shortestDistance,
    upDistance,
    downDistance,
    steps,
    relationship,
    sharedNotes,
  };
}

export function getRelativeKey(key: string) {
  const [, quality] = key.split(" ");
  const notes = getScaleNotes(key);
  if (quality === "Major") {
    return `${notes[5].replace(/[0-9]/g, "")} Minor`;
  }
  return `${notes[2].replace(/[0-9]/g, "")} Major`;
}

export function getParallelKey(key: string) {
  const [root, quality] = key.split(" ");
  return `${root}${quality === "Major" ? " Minor" : " Major"}`;
}

export function getCircleNeighbors(key: string) {
  const [root, quality] = key.split(" ");
  const ring = quality === "Major" ? CIRCLE_MAJOR_KEYS : CIRCLE_MINOR_KEYS;
  const index = ring.findIndex((candidate) => candidate === root);
  if (index === -1) {
    return [];
  }

  return [
    `${ring[(index + 11) % 12]} ${quality}`,
    `${ring[(index + 1) % 12]} ${quality}`,
  ];
}
