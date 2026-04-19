import { ALL_SCALES, CHORD_TEMPLATES, PROGRESSIONS } from "./generated/theory-data";
import { getInstrumentConfig, type InstrumentConfig } from "./instruments";
import { NOTES, getNoteAtFret, getRootFromKey, resolveRomanChord } from "./music";

export interface PhraseData {
  shape: string;
  motif: string;
  scaleName: string;
  mode: string;
  chord: string;
  notes: string[];
}

const PHRASE_SHAPES = [
  "Ascending",
  "Descending",
  "Arch (Up-Down)",
  "Bowl (Down-Up)",
  "Static/Pedal",
  "Zig-Zag",
  "Leaping",
] as const;

const PHRASE_MOTIFS = [
  "Repeated Note",
  "Neighbor Tone",
  "Scale Walk",
  "Arpeggio Outline",
  "Syncopated Jump",
  "Rhythmic Displacement",
] as const;

const MAJOR_STUDIO_POOL = ["I", "ii", "iii", "IV", "V", "vi", "vii°"];
const MINOR_STUDIO_POOL = ["i", "ii°", "III", "iv", "v", "VI", "VII", "bVII", "V"];

export const STUDIO_DEGREE_OPTIONS = [
  "I", "ii", "iii", "IV", "V", "vi", "vii°",
  "i", "ii°", "III", "iv", "v", "VI", "VII",
  "bVII", "♭VII",
];

export function generateRandomPhrase(currentKey: string): PhraseData {
  const shape = PHRASE_SHAPES[Math.floor(Math.random() * PHRASE_SHAPES.length)];
  const motif = PHRASE_MOTIFS[Math.floor(Math.random() * PHRASE_MOTIFS.length)];
  const scaleNames = Object.keys(ALL_SCALES) as (keyof typeof ALL_SCALES)[];
  const scaleName = scaleNames[Math.floor(Math.random() * scaleNames.length)];
  const scale = ALL_SCALES[scaleName];
  const rootNote = getRootFromKey(currentKey);
  const rootIndex = NOTES.indexOf(rootNote as (typeof NOTES)[number]);
  const scaleNotes = scale.intervals.map((interval: number) => NOTES[(rootIndex + Math.floor(interval)) % 12]);
  const chordQualities = Object.keys(CHORD_TEMPLATES) as (keyof typeof CHORD_TEMPLATES)[];
  const chordQuality = chordQualities[Math.floor(Math.random() * chordQualities.length)];
  const phraseLength = Math.floor(Math.random() * 5) + 4;
  const notes = Array.from({ length: phraseLength }, () => {
    const note = scaleNotes[Math.floor(Math.random() * scaleNotes.length)];
    return `${note}${Math.random() > 0.7 ? 5 : 4}`;
  });

  return {
    shape,
    motif,
    scaleName: `${rootNote} ${scaleName}`,
    mode: scale.region || "Western",
    chord: `${rootNote}${CHORD_TEMPLATES[chordQuality].symbol}`,
    notes,
  };
}

export function buildTabPreview(
  notes: string[],
  instrumentId: string,
  customInstruments: Record<string, InstrumentConfig>,
) {
  const config = getInstrumentConfig(instrumentId, customInstruments);
  if (config.type !== "fretboard") return null;

  return config.strings
    .map((stringNote) => {
      const cells = notes.map((note) => {
        const targetClass = note.replace(/[0-9]/g, "");
        for (let fret = 0; fret <= 24; fret += 1) {
          const pitch = getNoteAtFret(stringNote, fret);
          if (pitch?.replace(/[0-9]/g, "") === targetClass) {
            return `-${String(fret).padEnd(2, "-")}-`;
          }
        }
        return "---";
      });

      return `${stringNote.padEnd(3, " ")}|${cells.join("")}|`;
    })
    .join("\n");
}

export function randomizeStudioProgression(currentKey: string) {
  const pool = currentKey.includes("Minor") ? MINOR_STUDIO_POOL : MAJOR_STUDIO_POOL;
  return Array.from({ length: 4 }, () => pool[Math.floor(Math.random() * pool.length)]);
}

export function analyzeStudioProgression(numerals: string[], currentKey: string) {
  const matched = PROGRESSIONS.find(
    (progression) =>
      progression.numerals.length === numerals.length &&
      progression.numerals.every((numeral, index) => numeral === numerals[index]),
  );

  const functions = numerals.map((numeral) => {
    if (numeral.startsWith("I") || numeral.startsWith("i") || numeral.startsWith("vi")) return "Tonic";
    if (numeral.startsWith("IV") || numeral.startsWith("ii")) return "Subdominant";
    if (numeral.startsWith("V") || numeral.startsWith("vii")) return "Dominant";
    return "Modal/Chromatic";
  });

  return {
    matched,
    resolvedChords: numerals.map((numeral) => resolveRomanChord(numeral, currentKey)),
    functions,
  };
}
