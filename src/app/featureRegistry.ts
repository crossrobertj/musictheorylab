export interface FeatureDefinition {
  id: string;
  label: string;
  section: string;
  description: string;
  kind: "source" | "legacy";
  legacyView?: string;
}

export const featureRegistry: FeatureDefinition[] = [
  {
    id: "chords",
    label: "Diatonic Chords",
    section: "Harmony & Theory",
    description: "Source rewrite of scale-degree triads and seventh chords.",
    kind: "source",
  },
  {
    id: "allchords",
    label: "All Chord Types",
    section: "Harmony & Theory",
    description: "Source rewrite of the chord formula and interval catalog.",
    kind: "source",
  },
  {
    id: "voicings",
    label: "Chord Voicings",
    section: "Harmony & Theory",
    description: "Source rewrite of inversion, drop, shell, open, and power voicings.",
    kind: "source",
  },
  {
    id: "circle",
    label: "Circle of Fifths",
    section: "Harmony & Theory",
    description: "Source rewrite of key relationships and circle navigation.",
    kind: "source",
  },
  {
    id: "calculator",
    label: "Key Distance",
    section: "Harmony & Theory",
    description: "Source rewrite of key-center distance and shared-note comparison.",
    kind: "source",
  },
  {
    id: "intervals",
    label: "Interval Calculator",
    section: "Harmony & Theory",
    description: "Source rewrite of interval naming and semitone lookup.",
    kind: "source",
  },
  {
    id: "interchange",
    label: "Modal Interchange",
    section: "Harmony & Theory",
    description: "Legacy modal borrowing explorer.",
    kind: "legacy",
    legacyView: "interchange",
  },
  {
    id: "modes",
    label: "Western & Blues",
    section: "Exploration",
    description: "Source rewrite of western, blues, and jazz scale systems.",
    kind: "source",
  },
  {
    id: "world",
    label: "World Scales",
    section: "Exploration",
    description: "Source rewrite of regional and experimental scales.",
    kind: "source",
  },
  {
    id: "progressions",
    label: "Progressions",
    section: "Exploration",
    description: "Source rewrite of the progression library with resolved chords.",
    kind: "source",
  },
  {
    id: "finder",
    label: "Chord/Scale Finder",
    section: "Exploration",
    description: "Source rewrite of note-set identification and scale compatibility.",
    kind: "source",
  },
  {
    id: "genres",
    label: "Genre Explorer",
    section: "Exploration",
    description: "Legacy genre explorer.",
    kind: "legacy",
    legacyView: "genres",
  },
  {
    id: "moods",
    label: "Mood Picker",
    section: "Exploration",
    description: "Legacy mood picker.",
    kind: "legacy",
    legacyView: "moods",
  },
  {
    id: "piano",
    label: "Instrument View",
    section: "Performance",
    description: "Source-side piano and fretboard explorer.",
    kind: "source",
  },
  {
    id: "metronome",
    label: "Metronome",
    section: "Performance",
    description: "Source-side metronome with presets, additive meters, and tap tempo.",
    kind: "source",
  },
  {
    id: "drums",
    label: "Drum Machine",
    section: "Performance",
    description: "Source-side step sequencer with generated genre patterns, swing, and MIDI export.",
    kind: "source",
  },
  {
    id: "ear",
    label: "Ear Trainer",
    section: "Performance",
    description: "Source-side relative pitch drills for notes, intervals, chords, melody, and rhythm.",
    kind: "source",
  },
  {
    id: "quiz",
    label: "Quiz",
    section: "Learning",
    description: "Source-side theory quiz with difficulty tiers, typed answers, and timed mode.",
    kind: "source",
  },
  {
    id: "guide",
    label: "Theory Guide",
    section: "Learning",
    description: "Legacy theory guide.",
    kind: "legacy",
    legacyView: "guide",
  },
  {
    id: "favorites",
    label: "Favorites",
    section: "Learning",
    description: "Legacy favorites view.",
    kind: "legacy",
    legacyView: "favorites",
  },
];

export const sourceFeatureIds = new Set(
  featureRegistry.filter((feature) => feature.kind === "source").map((feature) => feature.id),
);
