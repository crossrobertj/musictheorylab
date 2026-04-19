export interface GrimoireEntry {
  family: string;
  type: "scale" | "chord";
  name: string;
  intervals: number[];
}

export const GRIMOIRE_LIBRARY: GrimoireEntry[] = [
  { family: "Major Scale Modes", type: "scale", name: "Ionian (Major)", intervals: [0, 2, 4, 5, 7, 9, 11] },
  { family: "Major Scale Modes", type: "scale", name: "Dorian", intervals: [0, 2, 3, 5, 7, 9, 10] },
  { family: "Major Scale Modes", type: "scale", name: "Phrygian", intervals: [0, 1, 3, 5, 7, 8, 10] },
  { family: "Major Scale Modes", type: "scale", name: "Lydian", intervals: [0, 2, 4, 6, 7, 9, 11] },
  { family: "Major Scale Modes", type: "scale", name: "Mixolydian", intervals: [0, 2, 4, 5, 7, 9, 10] },
  { family: "Major Scale Modes", type: "scale", name: "Aeolian (Natural Minor)", intervals: [0, 2, 3, 5, 7, 8, 10] },
  { family: "Major Scale Modes", type: "scale", name: "Locrian", intervals: [0, 1, 3, 5, 6, 8, 10] },

  { family: "Melodic Minor Modes", type: "scale", name: "Melodic Minor", intervals: [0, 2, 3, 5, 7, 9, 11] },
  { family: "Melodic Minor Modes", type: "scale", name: "Dorian b2", intervals: [0, 1, 3, 5, 7, 9, 10] },
  { family: "Melodic Minor Modes", type: "scale", name: "Lydian Augmented", intervals: [0, 2, 4, 6, 8, 9, 11] },
  { family: "Melodic Minor Modes", type: "scale", name: "Lydian Dominant", intervals: [0, 2, 4, 6, 7, 9, 10] },
  { family: "Melodic Minor Modes", type: "scale", name: "Mixolydian b6", intervals: [0, 2, 4, 5, 7, 8, 10] },
  { family: "Melodic Minor Modes", type: "scale", name: "Locrian #2", intervals: [0, 2, 3, 5, 6, 8, 10] },
  { family: "Melodic Minor Modes", type: "scale", name: "Altered (Super Locrian)", intervals: [0, 1, 3, 4, 6, 8, 10] },

  { family: "Harmonic Minor Modes", type: "scale", name: "Hungarian Minor", intervals: [0, 2, 3, 5, 7, 8, 11] },
  { family: "Harmonic Minor Modes", type: "scale", name: "Locrian #6", intervals: [0, 1, 3, 5, 6, 9, 10] },
  { family: "Harmonic Minor Modes", type: "scale", name: "Ionian #5", intervals: [0, 2, 4, 5, 8, 9, 11] },
  { family: "Harmonic Minor Modes", type: "scale", name: "Dorian #4", intervals: [0, 2, 3, 6, 7, 9, 10] },
  { family: "Harmonic Minor Modes", type: "scale", name: "Phrygian Dominant", intervals: [0, 1, 4, 5, 7, 8, 10] },
  { family: "Harmonic Minor Modes", type: "scale", name: "Lydian #2", intervals: [0, 3, 4, 6, 7, 9, 11] },
  { family: "Harmonic Minor Modes", type: "scale", name: "Ultralocrian", intervals: [0, 1, 3, 4, 6, 8, 10] },

  { family: "Pentatonic Modes", type: "scale", name: "Major Pentatonic", intervals: [0, 2, 4, 7, 9] },
  { family: "Pentatonic Modes", type: "scale", name: "Suspended Pentatonic", intervals: [0, 2, 5, 7, 10] },
  { family: "Pentatonic Modes", type: "scale", name: "Minor b6 Pentatonic", intervals: [0, 3, 5, 8, 10] },
  { family: "Pentatonic Modes", type: "scale", name: "Major b6 Pentatonic", intervals: [0, 2, 4, 7, 8] },
  { family: "Pentatonic Modes", type: "scale", name: "Minor Pentatonic", intervals: [0, 3, 5, 7, 10] },
  { family: "Pentatonic Modes", type: "scale", name: "Blues Scale", intervals: [0, 3, 5, 6, 7, 10] },

  { family: "Symmetrical & Synthetic", type: "scale", name: "Whole Tone", intervals: [0, 2, 4, 6, 8, 10] },
  { family: "Symmetrical & Synthetic", type: "scale", name: "Augmented", intervals: [0, 3, 4, 7, 8, 11] },
  { family: "Symmetrical & Synthetic", type: "scale", name: "Augmented Inverse", intervals: [0, 1, 4, 5, 8, 9] },
  { family: "Symmetrical & Synthetic", type: "scale", name: "Half-Whole Diminished", intervals: [0, 1, 3, 4, 6, 7, 9, 10] },
  { family: "Symmetrical & Synthetic", type: "scale", name: "Whole-Half Diminished", intervals: [0, 2, 3, 5, 6, 8, 9, 11] },

  { family: "Chord Structures", type: "chord", name: "Major", intervals: [0, 4, 7] },
  { family: "Chord Structures", type: "chord", name: "minor", intervals: [0, 3, 7] },
  { family: "Chord Structures", type: "chord", name: "dim", intervals: [0, 3, 6] },
  { family: "Chord Structures", type: "chord", name: "aug", intervals: [0, 4, 8] },
  { family: "Chord Structures", type: "chord", name: "sus2", intervals: [0, 2, 7] },
  { family: "Chord Structures", type: "chord", name: "sus4", intervals: [0, 5, 7] },
  { family: "Chord Structures", type: "chord", name: "maj7", intervals: [0, 4, 7, 11] },
  { family: "Chord Structures", type: "chord", name: "min7", intervals: [0, 3, 7, 10] },
  { family: "Chord Structures", type: "chord", name: "7", intervals: [0, 4, 7, 10] },
  { family: "Chord Structures", type: "chord", name: "min7b5", intervals: [0, 3, 6, 10] },
  { family: "Chord Structures", type: "chord", name: "dim7", intervals: [0, 3, 6, 9] },
  { family: "Chord Structures", type: "chord", name: "maj9", intervals: [0, 4, 7, 11, 14] },
  { family: "Chord Structures", type: "chord", name: "min9", intervals: [0, 3, 7, 10, 14] },
  { family: "Chord Structures", type: "chord", name: "9", intervals: [0, 4, 7, 10, 14] },
  { family: "Chord Structures", type: "chord", name: "13", intervals: [0, 4, 7, 10, 14, 21] },
];

export function getGrimoireFamilies() {
  return [...new Set(GRIMOIRE_LIBRARY.map((entry) => entry.family))];
}
