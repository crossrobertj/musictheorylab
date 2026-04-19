import {
  CHORD_TEMPLATES,
  buildChordFromRootAndQuality,
  formatNoteClass,
  getMidiNumber,
  getNoteClass,
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

export interface HarmonizedScaleRow {
  degree: number;
  numeral: string;
  triad: string;
  seventh: string;
  triadNotes: string[];
  seventhNotes: string[];
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

const ROMAN_NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"] as const;

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

  const root = getNoteClass(triad[0]);
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

function buildScaleDegreeChord(scaleNotes: string[], degree: number, size: 3 | 4) {
  if (scaleNotes.length < size) return [];

  const chord: string[] = [];
  let previousMidi = Number.NEGATIVE_INFINITY;

  for (let step = 0; step < size; step += 1) {
    const index = (degree + step * 2) % scaleNotes.length;
    let note = scaleNotes[index];
    while (chord.length > 0 && previousMidi >= 0) {
      if (noteToMidi(note) > previousMidi) break;
      note = transposeNote(note, 12);
    }
    chord.push(note);
    previousMidi = noteToMidi(note);
  }

  return chord;
}

function identifyChordFromNotes(notes: string[]) {
  if (!notes.length) {
    return {
      quality: "cluster",
      symbol: "?",
    };
  }

  const root = getNoteClass(notes[0]);
  const rootMidi = noteToMidi(notes[0]);
  const targetKey = notes
    .map((note) => ((noteToMidi(note) - rootMidi) % 12 + 12) % 12)
    .join(",");

  for (const [quality, template] of Object.entries(CHORD_TEMPLATES)) {
    if (template.intervals.join(",") === targetKey) {
      return {
        quality,
        symbol: `${formatNoteClass(root, `${root} Major`)}${template.symbol}`,
      };
    }
  }

  const triadMatch = TRIAD_QUALITY_MAP[targetKey];
  if (triadMatch) {
    return {
      quality: triadMatch.label,
      symbol: `${formatNoteClass(root, `${root} Major`)}${triadMatch.symbol}`,
    };
  }

  return {
    quality: "cluster",
    symbol: `${formatNoteClass(root, `${root} Major`)} ?`,
  };
}

function getRomanNumeralForQuality(degree: number, quality: string) {
  const base = ROMAN_NUMERALS[degree] ?? `${degree + 1}`;

  if (quality === "dim" || quality === "dim7") return `${base.toLowerCase()}°`;
  if (quality === "min7b5") return `${base.toLowerCase()}ø`;
  if (quality === "minor" || quality.startsWith("min")) return base.toLowerCase();
  return base;
}

function noteToMidi(note: string) {
  return getMidiNumber(note);
}

export function harmonizeScale(root: string, intervals: readonly number[]) {
  const normalizedIntervals = normalizeScaleIntervals(intervals);
  const scaleNotes = getNotesFromIntervals(`${normalizeNote(root)}4`, normalizedIntervals);
  return scaleNotes
    .map((_, degree) => buildScaleDegreeTriad(scaleNotes, degree))
    .filter((chord): chord is HarmonizedScaleChord => chord !== null);
}

export function harmonizeScaleRows(root: string, intervals: readonly number[]) {
  const normalizedIntervals = normalizeScaleIntervals(intervals);
  const scaleNotes = getNotesFromIntervals(`${normalizeNote(root)}4`, normalizedIntervals);

  return scaleNotes.map((_, degree) => {
    const triadNotes = buildScaleDegreeChord(scaleNotes, degree, 3);
    const seventhNotes = buildScaleDegreeChord(scaleNotes, degree, 4);
    const triad = identifyChordFromNotes(triadNotes);
    const seventh = identifyChordFromNotes(seventhNotes);

    return {
      degree: degree + 1,
      numeral: getRomanNumeralForQuality(degree, triad.quality),
      triad: triad.symbol,
      seventh: seventh.symbol,
      triadNotes,
      seventhNotes,
    } satisfies HarmonizedScaleRow;
  });
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
