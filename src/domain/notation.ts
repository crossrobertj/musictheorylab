import { getMidiNumber, normalizeNote } from "./music";

export type NotationClef = "treble" | "bass";
export type NotationItems = string[][];

export function getStaffY(note: string, clef: NotationClef) {
  const match = note.match(/^([A-G])([#b]?)([0-9])?$/);
  if (!match) return 90;

  const noteMap: Record<string, number> = { C: 0, D: 1, E: 2, F: 3, G: 4, A: 5, B: 6 };
  const noteClass = noteMap[match[1]];
  const octave = match[3] ? Number.parseInt(match[3], 10) : 4;
  const absoluteSteps = octave * 7 + noteClass;

  return clef === "treble"
    ? 110 - (absoluteSteps - 30) * 10
    : 110 - (absoluteSteps - 18) * 10;
}

export interface StaffChordLayoutItem {
  note: string;
  y: number;
  xOffset: number;
}

export function buildStaffChordLayout(group: string[], clef: NotationClef): StaffChordLayoutItem[] {
  const layout = group
    .map((note, index) => ({
      note,
      y: getStaffY(normalizeNote(note), clef),
      xOffset: index % 2 === 0 ? -5 : 5,
    }))
    .sort((left, right) => left.y - right.y);

  for (let index = 1; index < layout.length; index += 1) {
    if (Math.abs(layout[index].y - layout[index - 1].y) < 10) {
      layout[index].xOffset = 8;
    }
  }

  return layout;
}

export function getLedgerLines(y: number) {
  const lines: number[] = [];
  if (y < 50) {
    for (let value = 50; value >= y; value -= 20) lines.push(value);
  } else if (y > 130) {
    for (let value = 130; value <= y; value += 20) lines.push(value);
  }
  return lines;
}

export function buildPianoRollRows(notationItems: NotationItems) {
  const minMidi = 36;
  const maxMidi = 84;
  const steps = Math.max(16, notationItems.length + 4);
  const rows = notationItems.flatMap((group, step) =>
    group
      .map((note) => ({ midi: getMidiNumber(note), step }))
      .filter((item) => item.midi >= minMidi && item.midi <= maxMidi),
  );

  return { minMidi, maxMidi, steps, rows };
}
