import {
  buildChordFromRootAndQuality,
  formatNoteClass,
  getNotesFromIntervals,
  normalizeNote,
  transposeNote,
} from "./music";

export interface ScaleBuilderPreset {
  id: string;
  name: string;
  desc: string;
  intervals: number[];
}

export interface HarmonizedScaleChord {
  degree: number;
  root: string;
  quality: string;
  symbol: string;
  notes: string[];
}

export interface CustomScaleDefinition {
  name: string;
  intervals: number[];
  createdAt: string;
}

export const SCALE_BUILDER_PRESETS: ScaleBuilderPreset[] = [
  {
    id: "major",
    name: "Major",
    desc: "Ionian template with bright diatonic gravity.",
    intervals: [0, 2, 4, 5, 7, 9, 11],
  },
  {
    id: "natural-minor",
    name: "Natural Minor",
    desc: "Aeolian baseline for minor harmony and modal writing.",
    intervals: [0, 2, 3, 5, 7, 8, 10],
  },
  {
    id: "lydian",
    name: "Lydian",
    desc: "Raised fourth for a floating, open major color.",
    intervals: [0, 2, 4, 6, 7, 9, 11],
  },
  {
    id: "harmonic-minor",
    name: "Harmonic Minor",
    desc: "Raised seventh for classical pull and exotic dominant tension.",
    intervals: [0, 2, 3, 5, 7, 8, 11],
  },
  {
    id: "bebop-dominant",
    name: "Bebop Dominant",
    desc: "Eight-note dominant scale for strong chord-tone landings.",
    intervals: [0, 2, 4, 5, 7, 9, 10, 11],
  },
  {
    id: "diminished",
    name: "Diminished",
    desc: "Symmetrical diminished collection built in minor thirds.",
    intervals: [0, 3, 6, 9],
  },
  {
    id: "major-triad",
    name: "Major Triad",
    desc: "Minimal three-note chordal collection.",
    intervals: [0, 4, 7],
  },
];

const TRIAD_QUALITY_MAP: Record<string, { label: string; templateQuality: string; symbol: string }> = {
  "0,4,7": { label: "Major", templateQuality: "Major", symbol: "" },
  "0,3,7": { label: "minor", templateQuality: "minor", symbol: "m" },
  "0,3,6": { label: "diminished", templateQuality: "dim", symbol: "dim" },
  "0,4,8": { label: "augmented", templateQuality: "aug", symbol: "aug" },
  "0,2,7": { label: "sus2", templateQuality: "sus2", symbol: "sus2" },
  "0,5,7": { label: "sus4", templateQuality: "sus4", symbol: "sus4" },
};

export function normalizeScaleIntervals(intervals: readonly number[]) {
  return Array.from(new Set(intervals))
    .filter((interval) => interval >= 0 && interval < 12)
    .sort((left, right) => left - right);
}

export function toggleScaleInterval(intervals: readonly number[], interval: number) {
  if (interval === 0) return normalizeScaleIntervals(intervals);
  return intervals.includes(interval)
    ? normalizeScaleIntervals(intervals.filter((value) => value !== interval))
    : normalizeScaleIntervals([...intervals, interval]);
}

export function getScaleBuilderNotes(root: string, intervals: readonly number[]) {
  return getNotesFromIntervals(`${normalizeNote(root)}4`, normalizeScaleIntervals(intervals));
}

export function getScaleBuilderPlayback(root: string, intervals: readonly number[]) {
  return getNotesFromIntervals(`${normalizeNote(root)}4`, [...normalizeScaleIntervals(intervals), 12]);
}

export function getIntervalLabel(root: string, interval: number) {
  return formatNoteClass(transposeNote(`${normalizeNote(root)}4`, interval), `${root} Major`);
}

function identifyTriadQuality(intervals: readonly number[]) {
  const key = normalizeScaleIntervals(intervals).join(",");
  return TRIAD_QUALITY_MAP[key] ?? { label: "cluster", templateQuality: "Major", symbol: "?" };
}

function buildScaleDegreeTriad(scaleNotes: string[], degree: number) {
  if (scaleNotes.length < 3) return null;

  const triad: string[] = [];
  let previousMidi = Number.NEGATIVE_INFINITY;

  for (let step = 0; step < 3; step += 1) {
    const index = (degree + step * 2) % scaleNotes.length;
    let note = scaleNotes[index];
    while (triad.length > 0 && previousMidi >= 0) {
      if (noteToMidi(note) > previousMidi) break;
      note = transposeNote(note, 12);
    }
    triad.push(note);
    previousMidi = noteToMidi(note);
  }

  const root = triad[0].replace(/[0-9]/g, "");
  const intervals = triad.map((note) => ((noteToMidi(note) - noteToMidi(triad[0])) % 12 + 12) % 12);
  const quality = identifyTriadQuality(intervals);

  if (quality.label !== "cluster") {
    const built = buildChordFromRootAndQuality(`${root}4`, quality.templateQuality);
    return {
      degree: degree + 1,
      root,
      quality: quality.label,
      symbol: `${formatNoteClass(root, `${root} Major`)}${quality.symbol}`,
      notes: built.notes,
    } satisfies HarmonizedScaleChord;
  }

  return {
    degree: degree + 1,
    root,
    quality: "cluster",
    symbol: `${formatNoteClass(root, `${root} Major`)} ?`,
    notes: triad,
  } satisfies HarmonizedScaleChord;
}

function noteToMidi(note: string) {
  const match = normalizeNote(note).match(/^([A-G][#b]?)([0-9]+)$/);
  if (!match) return 60;
  const noteClass = match[1];
  const octave = Number.parseInt(match[2], 10);
  const noteClasses = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  const index = noteClasses.indexOf(noteClass);
  if (index < 0) return 60;
  return (octave + 1) * 12 + index;
}

export function harmonizeScale(root: string, intervals: readonly number[]) {
  const normalizedIntervals = normalizeScaleIntervals(intervals);
  const scaleNotes = getNotesFromIntervals(`${normalizeNote(root)}4`, normalizedIntervals);
  return scaleNotes
    .map((_, degree) => buildScaleDegreeTriad(scaleNotes, degree))
    .filter((chord): chord is HarmonizedScaleChord => chord !== null);
}

export function describeScaleDensity(count: number) {
  if (count <= 3) return "Triadic";
  if (count === 4) return "Tetrachord";
  if (count === 5) return "Pentatonic";
  if (count === 6) return "Hexatonic";
  if (count === 7) return "Heptatonic";
  if (count === 8) return "Octatonic";
  return `${count}-note collection`;
}
