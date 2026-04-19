export interface DrumTrack {
  id: "kick" | "snare" | "clap" | "chh" | "ohh" | "perc";
  name: string;
  midi: number;
  color: string;
}

export type DrumGrid = Record<DrumTrack["id"], number[]>;

export interface DrumPattern {
  id: string;
  category: string;
  subcategory: string;
  name: string;
  steps: number;
  grid: DrumGrid;
}

export const DRUM_TRACKS: DrumTrack[] = [
  { id: "kick", name: "Kick", midi: 36, color: "#5eead4" },
  { id: "snare", name: "Snare", midi: 38, color: "#67e8f9" },
  { id: "clap", name: "Clap", midi: 39, color: "#a78bfa" },
  { id: "chh", name: "Closed Hat", midi: 42, color: "#fbbf24" },
  { id: "ohh", name: "Open Hat", midi: 46, color: "#f472b6" },
  { id: "perc", name: "Perc", midi: 50, color: "#fb923c" },
];

function seededRand(seed: number) {
  const value = Math.sin(seed * 999.123) * 10000;
  return value - Math.floor(value);
}

export function createEmptyDrumGrid(steps = 16): DrumGrid {
  return {
    kick: Array(steps).fill(0),
    snare: Array(steps).fill(0),
    clap: Array(steps).fill(0),
    chh: Array(steps).fill(0),
    ohh: Array(steps).fill(0),
    perc: Array(steps).fill(0),
  };
}

export function cloneDrumGrid(grid: DrumGrid): DrumGrid {
  return {
    kick: [...grid.kick],
    snare: [...grid.snare],
    clap: [...grid.clap],
    chh: [...grid.chh],
    ohh: [...grid.ohh],
    perc: [...grid.perc],
  };
}

export function resizeDrumGrid(grid: DrumGrid, steps: number): DrumGrid {
  const next = createEmptyDrumGrid(steps);
  DRUM_TRACKS.forEach((track) => {
    const source = grid[track.id] || [];
    for (let index = 0; index < Math.min(source.length, steps); index += 1) {
      next[track.id][index] = source[index];
    }
  });
  return next;
}

export function getStepsForTimeSignature(signature: string) {
  const [rawNumerator, rawDenominator] = signature.split("/");
  const numerator = Number.parseInt(rawNumerator, 10);
  const denominator = Number.parseInt(rawDenominator, 10);
  if (!Number.isFinite(numerator) || !Number.isFinite(denominator)) return 16;
  if (denominator === 4) return numerator * 4;
  if (denominator === 8) return numerator * 2;
  return 16;
}

function buildGeneratedDrumPattern(category: string, style: string, seed: number, steps = 16) {
  const grid = createEmptyDrumGrid(steps);
  const r = (offset: number) => seededRand(seed * 100 + offset);

  for (let step = 0; step < steps; step += 1) {
    if (step === 0 || step === 8) grid.kick[step] = 1;
    if (category === "Hip-Hop" || category === "Trap") {
      if ([0, 6, 10].includes(step) || r(step) > 0.82) grid.kick[step] = 1;
    } else if (category === "House") {
      if ([0, 4, 8, 12].includes(step)) grid.kick[step] = 1;
    } else if (category === "Drum and Bass") {
      if ([0, 7, 10, 14].includes(step) || r(step) > 0.86) grid.kick[step] = 1;
    } else if (r(step) > 0.9) {
      grid.kick[step] = 1;
    }
  }

  for (let step = 0; step < steps; step += 1) {
    const backbeat = step === 4 || step === 12;
    if (backbeat) grid.snare[step] = 1;
    if (style.includes("Shuffle") && (step === 11 || step === 15)) grid.snare[step] = 1;
    if ((category === "Trap" || category === "Hip-Hop") && [10, 12, 15].includes(step) && r(step + 41) > 0.55) {
      grid.snare[step] = 1;
    }
  }

  for (let step = 0; step < steps; step += 1) {
    if (category === "House" || category === "Techno") {
      if (step % 2 === 0) grid.chh[step] = 1;
    } else if (category === "Trap") {
      if (step % 4 === 0 || (step % 2 === 0 && r(step + 66) > 0.4)) grid.chh[step] = 1;
    } else if (step % 2 === 0 || (step % 4 === 3 && r(step + 12) > 0.6)) {
      grid.chh[step] = 1;
    }

    if (grid.chh[step] > 0 && r(step + 77) > 0.86) {
      grid.chh[step] = 0;
    }
  }

  for (let step = 0; step < steps; step += 1) {
    if ((step === 7 || step === 15) && r(step + 21) > 0.5) grid.ohh[step] = 1;
    if ((category === "House" || category === "Trance") && [3, 7, 11, 15].includes(step) && r(step + 81) > 0.68) {
      grid.ohh[step] = 1;
    }
  }

  for (let step = 0; step < steps; step += 1) {
    if ((step === 4 || step === 12) && ["Pop", "EDM", "House", "Hip-Hop"].includes(category) && r(step + 31) > 0.35) {
      grid.clap[step] = 1;
    }
  }

  for (let step = 0; step < steps; step += 1) {
    if ([3, 6, 9, 14].includes(step) && r(step + 90) > 0.55) grid.perc[step] = 1;
    if ((category === "Latin" || category === "Afrobeat") && [2, 5, 8, 11, 14].includes(step) && r(step + 123) > 0.38) {
      grid.perc[step] = 1;
    }
  }

  return grid;
}

function generateDrumPatternLibrary() {
  const categoryStyles = [
    { category: "Rock", styles: ["Straight", "Shuffle", "Anthem", "Alternative"] },
    { category: "Pop", styles: ["Modern", "Anthem", "Ballad", "Hybrid"] },
    { category: "Hip-Hop", styles: ["Boom Bap", "Lo-Fi", "Sampled", "Modern"] },
    { category: "Trap", styles: ["Dark", "Sparse", "Melodic", "Hybrid"] },
    { category: "R&B", styles: ["Neo Soul", "Slow Jam", "Contemporary", "Alt R&B"] },
    { category: "Funk", styles: ["Pocket", "Syncopated", "Ghost", "Fusion"] },
    { category: "House", styles: ["Classic", "Deep", "Afro", "Tech"] },
    { category: "Techno", styles: ["Driving", "Minimal", "Industrial", "Peak"] },
    { category: "Trance", styles: ["Uplifting", "Progressive", "Psy", "Melodic"] },
    { category: "Drum and Bass", styles: ["Liquid", "Roller", "Neuro", "Jungle"] },
    { category: "Reggae", styles: ["Roots", "Dub", "Rockers", "Dancehall"] },
    { category: "Latin", styles: ["Salsa", "Bossa", "Reggaeton", "Afro-Latin"] },
    { category: "Afrobeat", styles: ["Classic", "Modern", "Amapiano", "Afro-Fusion"] },
  ];

  const patterns: DrumPattern[] = [];
  let idNumber = 1;

  categoryStyles.forEach((entry, categoryIndex) => {
    entry.styles.forEach((style, styleIndex) => {
      for (let variation = 1; variation <= 5; variation += 1) {
        const seed = categoryIndex * 100 + styleIndex * 10 + variation;
        patterns.push({
          id: `DM-${String(idNumber).padStart(3, "0")}`,
          category: entry.category,
          subcategory: style,
          name: `${entry.category} ${style} ${variation}`,
          steps: 16,
          grid: buildGeneratedDrumPattern(entry.category, style, seed, 16),
        });
        idNumber += 1;
      }
    });
  });

  return patterns;
}

export const DRUM_PATTERN_LIBRARY = generateDrumPatternLibrary();

export function cycleStepVelocity(value: number) {
  if (value === 0) return 1;
  if (value > 0.85) return 0.75;
  if (value > 0.65) return 0.5;
  if (value > 0.4) return 0.25;
  return 0;
}

export function randomizeDrumPattern(steps: number) {
  const grid = createEmptyDrumGrid(steps);
  const randomBool = (chance: number) => Math.random() < chance;

  for (let step = 0; step < steps; step += 1) {
    if (step === 0) grid.kick[step] = 1;
    else if (step === 8 && randomBool(0.8)) grid.kick[step] = 0.9;
    else if ((step === 4 || step === 12) && randomBool(0.2)) grid.kick[step] = 0.7;
    else if (randomBool(0.05)) grid.kick[step] = 0.6;
  }

  for (let step = 0; step < steps; step += 1) {
    if (step === 4 || step === 12) grid.snare[step] = 1;
    else if (step === 14 && randomBool(0.15)) grid.snare[step] = 0.4;
  }

  const hatStyle = Math.floor(Math.random() * 3);
  for (let step = 0; step < steps; step += 1) {
    if (hatStyle === 0) {
      if (step % 2 === 0) grid.chh[step] = step % 4 === 0 ? 0.8 : 0.5;
    } else if (hatStyle === 1) {
      grid.chh[step] = step % 4 === 0 ? 0.7 : step % 2 === 0 ? 0.4 : 0.2;
    } else if (step % 4 === 2) {
      grid.chh[step] = 0.8;
    } else if (randomBool(0.2)) {
      grid.chh[step] = 0.4;
    }
  }

  for (let step = 0; step < steps; step += 1) {
    if (randomBool(0.08)) grid.perc[step] = 0.3 + Math.random() * 0.5;
  }

  return grid;
}

export function humanizeDrumGrid(grid: DrumGrid) {
  const next = cloneDrumGrid(grid);
  DRUM_TRACKS.forEach((track) => {
    next[track.id] = next[track.id].map((velocity) => {
      if (velocity <= 0) return 0;
      return Math.max(0.1, Math.min(1, velocity + (Math.random() - 0.5) * 0.3));
    });
  });
  return next;
}

function encodeVarLen(value: number) {
  let buffer = value & 0x7f;
  const bytes = [];

  while ((value >>= 7)) {
    buffer <<= 8;
    buffer |= (value & 0x7f) | 0x80;
  }

  while (true) {
    bytes.push(buffer & 0xff);
    if (buffer & 0x80) buffer >>= 8;
    else break;
  }

  return bytes;
}

export function buildDrumMidiFromGrid(
  grid: DrumGrid,
  steps = 16,
  bars = 4,
  bpm = 120,
  ticksPerBeat = 480,
) {
  const bytes: number[] = [];
  const pushString = (value: string) => {
    for (let index = 0; index < value.length; index += 1) bytes.push(value.charCodeAt(index));
  };
  const push32 = (value: number) => bytes.push((value >>> 24) & 255, (value >>> 16) & 255, (value >>> 8) & 255, value & 255);
  const push16 = (value: number) => bytes.push((value >>> 8) & 255, value & 255);

  pushString("MThd");
  push32(6);
  push16(0);
  push16(1);
  push16(ticksPerBeat);

  const track: number[] = [];
  const tpush = (...values: number[]) => track.push(...values);
  const mpqn = Math.round(60000000 / Math.max(40, Math.min(240, bpm)));
  tpush(0x00, 0xff, 0x51, 0x03, (mpqn >>> 16) & 255, (mpqn >>> 8) & 255, mpqn & 255);

  const stepTicks = ticksPerBeat / 4;
  const noteLength = Math.round(stepTicks * 0.72);
  const safeBars = Math.max(1, Math.min(16, bars));
  let pendingTicks = 0;

  for (let bar = 0; bar < safeBars; bar += 1) {
    for (let step = 0; step < steps; step += 1) {
      pendingTicks += stepTicks;
      const stepNotes = DRUM_TRACKS.filter((trackDef) => grid[trackDef.id][step] > 0).map((trackDef) => trackDef.midi);
      if (stepNotes.length === 0) continue;

      tpush(...encodeVarLen(pendingTicks), 0x99, stepNotes[0], 0x64);
      for (let noteIndex = 1; noteIndex < stepNotes.length; noteIndex += 1) {
        tpush(0x00, 0x99, stepNotes[noteIndex], 0x64);
      }
      tpush(...encodeVarLen(noteLength), 0x89, stepNotes[0], 0x40);
      for (let noteIndex = 1; noteIndex < stepNotes.length; noteIndex += 1) {
        tpush(0x00, 0x89, stepNotes[noteIndex], 0x40);
      }

      pendingTicks = 0;
    }
  }

  tpush(0x00, 0xff, 0x2f, 0x00);
  pushString("MTrk");
  push32(track.length);
  bytes.push(...track);
  return new Uint8Array(bytes);
}
