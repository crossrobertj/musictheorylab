import { ALL_SCALES } from "./generated/theory-data";
import { getFrequency, getNoteClass } from "./music";
import { type TuningSystem } from "../app/store/useTuningStore";

export interface HistoricalTuning {
  name: TuningSystem;
  desc: string;
  method: string;
}

export interface TetVariant {
  steps: number;
  name: TuningSystem;
  desc: string;
}

export const HISTORICAL_TUNINGS: HistoricalTuning[] = [
  {
    name: "Pythagorean",
    desc: "Pure fifths with sharp major thirds and strong medieval color.",
    method: "Build the system from stacked 3:2 fifths and reduce back into one octave.",
  },
  {
    name: "Meantone",
    desc: "Tempers fifths to sweeten thirds, giving Renaissance and early Baroque brightness.",
    method: "Quarter-comma meantone narrows fifths so major thirds land near 5:4.",
  },
  {
    name: "Kirnberger",
    desc: "Well temperament with key color preserved but no single catastrophic wolf interval.",
    method: "Spread the tuning impurity across keys so modulation stays usable.",
  },
  {
    name: "Werckmeister",
    desc: "Classic well temperament associated with Bach-era tonal flexibility.",
    method: "Temper selected fifths and leave others pure to balance color and utility.",
  },
  {
    name: "Vallotti",
    desc: "Late common-practice compromise that sits close to equal temperament.",
    method: "Temper six fifths lightly and keep six pure.",
  },
];

export const TET_VARIANTS: TetVariant[] = [
  { steps: 19, name: "19-TET", desc: "Good minor thirds and compact chromatic motion." },
  { steps: 22, name: "22-TET", desc: "Often used as a shruti-friendly compromise system." },
  { steps: 31, name: "31-TET", desc: "Excellent major thirds and rich meantone-like harmony." },
  { steps: 41, name: "41-TET", desc: "Closer to just intonation across several consonant intervals." },
  { steps: 53, name: "53-TET", desc: "Near-perfect Pythagorean fifth lattice." },
  { steps: 72, name: "72-TET", desc: "Sixth-tone resolution with very fine pitch control." },
];

export const JUST_INTONATION_INTERVALS = [
  { interval: "Unison", ratio: "1:1", cents: 0 },
  { interval: "Minor 2nd", ratio: "16:15", cents: 111.73 },
  { interval: "Major 2nd", ratio: "9:8", cents: 203.91 },
  { interval: "Minor 3rd", ratio: "6:5", cents: 315.64 },
  { interval: "Major 3rd", ratio: "5:4", cents: 386.31 },
  { interval: "Perfect 4th", ratio: "4:3", cents: 498.04 },
  { interval: "Tritone", ratio: "7:5", cents: 582.51 },
  { interval: "Perfect 5th", ratio: "3:2", cents: 701.96 },
  { interval: "Minor 6th", ratio: "8:5", cents: 813.69 },
  { interval: "Major 6th", ratio: "5:3", cents: 884.36 },
  { interval: "Minor 7th", ratio: "7:4", cents: 968.83 },
  { interval: "Major 7th", ratio: "15:8", cents: 1088.27 },
  { interval: "Octave", ratio: "2:1", cents: 1200 },
];

export const JUST_INTONATION_C_MAJOR = [
  { note: "C4", ratio: "1:1", cents: 0 },
  { note: "D4", ratio: "9:8", cents: 203.91 },
  { note: "E4", ratio: "5:4", cents: 386.31 },
  { note: "F4", ratio: "4:3", cents: 498.04 },
  { note: "G4", ratio: "3:2", cents: 701.96 },
  { note: "A4", ratio: "5:3", cents: 884.36 },
  { note: "B4", ratio: "15:8", cents: 1088.27 },
  { note: "C5", ratio: "2:1", cents: 1200 },
];

export const HELMHOLTZ_OCTAVES = [
  { label: "C,,", name: "Sub-contra", scientific: "C1", midi: 24 },
  { label: "C,", name: "Contra", scientific: "C2", midi: 36 },
  { label: "C", name: "Great", scientific: "C3", midi: 48 },
  { label: "c", name: "Small", scientific: "C4", midi: 60 },
  { label: "c'", name: "One-lined", scientific: "C5", midi: 72 },
  { label: "c''", name: "Two-lined", scientific: "C6", midi: 84 },
  { label: "c'''", name: "Three-lined", scientific: "C7", midi: 96 },
];

const HISTORICAL_OFFSETS: Record<Exclude<TuningSystem, "12-TET" | "JI-C" | `${number}-TET`>, Record<string, number>> = {
  Pythagorean: { C: 0, "C#": -8, D: 4, "D#": -8, E: 14, F: -2, "F#": 4, G: -2, "G#": -8, A: 4, "A#": -8, B: 14 },
  Meantone: { C: 0, "C#": -15, D: -2, "D#": -14, E: -14, F: -4, "F#": -12, G: -2, "G#": -14, A: -14, "A#": -4, B: -14 },
  Kirnberger: { C: 0, "C#": -8, D: 2, "D#": -6, E: -4, F: -2, "F#": 2, G: -2, "G#": -6, A: 4, "A#": -6, B: -2 },
  Werckmeister: { C: 0, "C#": -8, D: -2, "D#": -10, E: -10, F: -2, "F#": -4, G: -2, "G#": -10, A: -10, "A#": -2, B: -10 },
  Vallotti: { C: 0, "C#": -6, D: -1, "D#": -8, E: -4, F: -2, "F#": -1, G: -2, "G#": -8, A: -1, "A#": -4, B: -1 },
};

const JUST_INTONATION_OFFSETS: Record<string, number | null> = {
  C: 0,
  "C#": null,
  D: 4,
  "D#": null,
  E: -13.7,
  F: -2,
  "F#": null,
  G: -2,
  "G#": null,
  A: -15.6,
  "A#": null,
  B: -11.7,
};

export function getTuningOffset(noteClass: string, system: TuningSystem) {
  if (system === "12-TET") return 0;
  if (system === "JI-C") return JUST_INTONATION_OFFSETS[noteClass] ?? 0;
  if (system in HISTORICAL_OFFSETS) {
    return HISTORICAL_OFFSETS[system as keyof typeof HISTORICAL_OFFSETS][noteClass] ?? 0;
  }
  if (system.endsWith("-TET")) {
    const steps = Number.parseInt(system, 10);
    if (!Number.isFinite(steps) || steps <= 0) return 0;
    const chromaticIndex = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"].indexOf(noteClass);
    if (chromaticIndex < 0) return 0;
    const targetCents = chromaticIndex * 100;
    const stepSize = 1200 / steps;
    const nearest = Math.round(targetCents / stepSize) * stepSize;
    return nearest - targetCents;
  }
  return 0;
}

export function getTunedFrequency(note: string, system: TuningSystem, basePitch = 440) {
  const noteClass = getNoteClass(note);
  const offset = getTuningOffset(noteClass, system);
  const base = getFrequency(note, basePitch);
  return base * Math.pow(2, offset / 1200);
}

export function getMicrotonalScaleNames() {
  return Object.entries(ALL_SCALES)
    .filter(([, scale]) => ["Arabic", "Experimental", "Indian"].includes(scale.region))
    .map(([name]) => name)
    .sort((left, right) => left.localeCompare(right));
}

export function convertHelmholtzNotation(input: string) {
  const raw = input.trim();
  if (!raw) return null;
  const notePart = raw.replace(/[,']+/g, "");
  if (!/^[A-Ga-g]$/.test(notePart)) return null;
  const normalizedNote = notePart.toUpperCase();
  const commaCount = (raw.match(/,/g) || []).length;
  const apostropheCount = (raw.match(/'/g) || []).length;
  let octave = notePart === notePart.toUpperCase() ? 3 : 4;

  if (commaCount > 0) octave = 3 - commaCount;
  if (apostropheCount > 0) octave = 4 + apostropheCount;

  const scientific = `${normalizedNote}${octave}`;
  const frequency = getFrequency(scientific);
  return { scientific, frequency, midi: Math.round(69 + 12 * Math.log2(frequency / 440)) };
}
