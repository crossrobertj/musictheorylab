export interface SyncopationPattern {
  id: string;
  label: string;
  beats: number[];
  desc: string;
}

export interface TupletPreset {
  type: number;
  against: number;
  name: string;
  desc: string;
}

export interface SlicerPreset {
  id: string;
  label: string;
  pattern: number[];
  desc: string;
}

export const SYNCOPATION_PATTERNS: SyncopationPattern[] = [
  {
    id: "basic",
    label: "Basic Backbeat",
    beats: [0, 0, 1, 0, 0, 0, 1, 0],
    desc: "Accents the classic backbeat on 2 and 4.",
  },
  {
    id: "offbeat",
    label: "Off-beat Upbeats",
    beats: [0, 1, 0, 1, 0, 1, 0, 1],
    desc: "Every hit lands on the off-beat.",
  },
  {
    id: "tresillo",
    label: "Tresillo",
    beats: [1, 0, 0, 1, 0, 0, 1, 0],
    desc: "3-3-2 phrasing found across Afro-Cuban and pop grooves.",
  },
  {
    id: "habanera",
    label: "Habanera",
    beats: [1, 0, 0, 1, 0, 1, 0, 0],
    desc: "Dotted rhythm with a late push into beat four.",
  },
  {
    id: "bossa",
    label: "Bossa",
    beats: [0, 1, 0, 0, 0, 1, 0, 0],
    desc: "Sparse off-beat lift with space around the vocal.",
  },
  {
    id: "funk",
    label: "Funk Displacement",
    beats: [1, 0, 0, 0, 0, 1, 0, 0],
    desc: "Downbeat plus a displaced accent later in the bar.",
  },
];

export const TUPLET_PRESETS: TupletPreset[] = [
  {
    type: 3,
    against: 2,
    name: "Triplet",
    desc: "Three evenly spaced notes in the time of two.",
  },
  {
    type: 5,
    against: 4,
    name: "Quintuplet",
    desc: "Five notes against a quarter-note subdivision grid.",
  },
  {
    type: 6,
    against: 4,
    name: "Sextuplet",
    desc: "Double-time triplet feel that still resolves cleanly.",
  },
  {
    type: 7,
    against: 4,
    name: "Septuplet",
    desc: "Seven evenly spaced notes over four pulses.",
  },
  {
    type: 9,
    against: 8,
    name: "Nonuplet",
    desc: "Dense phrasing across an eight-note span.",
  },
];

export const SLICER_PRESETS: SlicerPreset[] = [
  {
    id: "straight",
    label: "Straight 8ths",
    pattern: [1, 0.5, 1, 0.5, 1, 0.5, 1, 0.5],
    desc: "Alternating strong and weak eighth-note pulse.",
  },
  {
    id: "swing",
    label: "Swing Push",
    pattern: [1, 0, 0.65, 0.15, 1, 0, 0.65, 0.15],
    desc: "Heavy downbeats with trailing pickup accents.",
  },
  {
    id: "tresillo",
    label: "Tresillo Slice",
    pattern: [1, 0, 0, 0.85, 0, 0, 0.7, 0],
    desc: "Three-anchor accent map on an eight-step grid.",
  },
  {
    id: "stutter",
    label: "Stutter",
    pattern: [1, 0.8, 0.2, 0.8, 1, 0.8, 0.2, 0.8],
    desc: "Machine-gun accent repeats with periodic resets.",
  },
];

export function greatestCommonDivisor(left: number, right: number) {
  let a = Math.abs(left);
  let b = Math.abs(right);
  while (b !== 0) {
    const next = a % b;
    a = b;
    b = next;
  }
  return a || 1;
}

export function leastCommonMultiple(left: number, right: number) {
  return Math.abs(left * right) / greatestCommonDivisor(left, right);
}

export function buildPolyrhythmTimeline(a: number, b: number) {
  const totalSteps = leastCommonMultiple(a, b);
  const aInterval = Math.max(1, totalSteps / Math.max(1, a));
  const bInterval = Math.max(1, totalSteps / Math.max(1, b));

  return Array.from({ length: totalSteps }, (_, index) => ({
    index,
    a: index % aInterval === 0,
    b: index % bInterval === 0,
  }));
}

export function cycleAccentLevel(value: number) {
  if (value <= 0) return 0.35;
  if (value < 0.5) return 0.7;
  if (value < 0.85) return 1;
  return 0;
}

export function createRandomSyncopationPattern() {
  const beats = Array.from({ length: 8 }, () => (Math.random() > 0.55 ? 1 : 0));
  if (!beats.some(Boolean)) beats[0] = 1;
  return beats;
}

export function createRandomSlicerPattern() {
  const pattern = Array.from({ length: 8 }, () => {
    if (Math.random() > 0.55) return 0;
    return Math.round((0.25 + Math.random() * 0.75) * 100) / 100;
  });
  if (!pattern.some((value) => value > 0)) pattern[0] = 1;
  return pattern;
}
