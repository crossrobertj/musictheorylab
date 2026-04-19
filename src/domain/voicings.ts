import {
  CHORD_TEMPLATES,
  buildChordFromRootAndQuality,
  getMidiNumber,
  getSemitoneDistance,
  normalizeNote,
  transposeNote,
} from "./music";

export type VoicingType = "inversions" | "drop2" | "drop3" | "shell" | "open" | "power";

export interface VoicingVariation {
  label: string;
  notes: string[];
}

export const VOICING_TYPE_LABELS: Record<VoicingType, string> = {
  inversions: "Inversions",
  drop2: "Drop 2",
  drop3: "Drop 3",
  shell: "Shell",
  open: "Open",
  power: "Power",
};

export const VOICING_QUALITIES = [
  "Major",
  "minor",
  "7",
  "maj7",
  "min7",
  "dim7",
  "9",
  "maj9",
  "min9",
  "7b9",
  "7#9",
  "11",
  "min11",
  "13",
] as const satisfies readonly string[];

function normalizeVoicingNotes(notes: string[]) {
  return notes
    .map((note) => {
      const normalized = normalizeNote(note);
      return /[0-9]/.test(normalized) ? normalized : `${normalized}4`;
    })
    .sort((left, right) => getMidiNumber(left) - getMidiNumber(right));
}

export function buildOpenVoicing(notes: string[]) {
  if (notes.length < 3) return [...notes];

  const sorted = normalizeVoicingNotes(notes);
  const result = [...sorted];
  result[1] = transposeNote(result[1], 12);
  return normalizeVoicingNotes(result);
}

export function buildPowerVoicing(notes: string[]) {
  const sorted = normalizeVoicingNotes(notes);
  const root = sorted[0];
  const fifth = sorted.find((note) => getSemitoneDistance(root, note) === 7);
  const octave = transposeNote(root, 12);
  const result = [root];

  if (fifth) result.push(fifth);
  result.push(octave);
  return normalizeVoicingNotes(result);
}

export function buildDropVoicing(notes: string[], dropNumber: number) {
  if (notes.length < dropNumber) return [...notes];

  const sorted = normalizeVoicingNotes(notes);
  const result = [...sorted];
  const dropIndex = sorted.length - dropNumber;
  result[dropIndex] = transposeNote(sorted[dropIndex], -12);
  return normalizeVoicingNotes(result);
}

export function buildShellVoicing(notes: string[]) {
  const sorted = normalizeVoicingNotes(notes);
  const root = sorted[0];
  const third = sorted.find((note) => {
    const distance = getSemitoneDistance(root, note);
    return distance === 3 || distance === 4;
  });
  const seventh = sorted.find((note) => {
    const distance = getSemitoneDistance(root, note);
    return distance === 9 || distance === 10 || distance === 11;
  });

  return normalizeVoicingNotes([root, ...(third ? [third] : []), ...(seventh ? [seventh] : [])]);
}

export function buildChordInversions(notes: string[]) {
  if (notes.length < 3) return [];

  const ordered = normalizeVoicingNotes(notes);
  return ordered.map((_, index) => {
    const inversion = [...ordered];
    for (let count = 0; count < index; count += 1) {
      const raised = transposeNote(inversion.shift()!, 12);
      inversion.push(raised);
    }
    return inversion;
  });
}

export function getVoicingVariations(rootWithOctave: string, quality: string, voicingType: VoicingType) {
  const chord =
    quality in CHORD_TEMPLATES
      ? buildChordFromRootAndQuality(rootWithOctave, quality)
      : buildChordFromRootAndQuality(rootWithOctave, "Major");
  const inversions = buildChordInversions(chord.notes);

  switch (voicingType) {
    case "inversions":
      return inversions.map((notes, index) => ({
        label: index === 0 ? "Root Position" : `${index}${index === 1 ? "st" : index === 2 ? "nd" : index === 3 ? "rd" : "th"} Inversion`,
        notes,
      }));
    case "drop2":
      return inversions.map((notes, index) => ({
        label: index === 0 ? "Drop 2 Root" : `Drop 2 ${index}${index === 1 ? "st" : index === 2 ? "nd" : index === 3 ? "rd" : "th"} Inv`,
        notes: buildDropVoicing(notes, 2),
      }));
    case "drop3":
      return inversions.map((notes, index) => ({
        label: index === 0 ? "Drop 3 Root" : `Drop 3 ${index}${index === 1 ? "st" : index === 2 ? "nd" : index === 3 ? "rd" : "th"} Inv`,
        notes: buildDropVoicing(notes, 3),
      }));
    case "shell": {
      const seen = new Set<string>();
      return inversions
        .map((notes) => buildShellVoicing(notes))
        .filter((notes) => {
          const key = normalizeVoicingNotes(notes).join("|");
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        })
        .map((notes, index) => ({
          label: `Shell ${index + 1}`,
          notes,
        }));
    }
    case "open":
      return inversions.map((notes, index) => ({
        label: index === 0 ? "Open Root" : `Open ${index}${index === 1 ? "st" : index === 2 ? "nd" : index === 3 ? "rd" : "th"} Inv`,
        notes: buildOpenVoicing(notes),
      }));
    case "power":
      return [
        {
          label: "Power Stance",
          notes: buildPowerVoicing(chord.notes),
        },
      ];
  }
}
