export interface LearningStep {
  id: string;
  name: string;
  task: string;
  action: string;
}

export interface LearningPath {
  id: string;
  name: string;
  desc: string;
  track: string;
  steps: LearningStep[];
}

export const XP_PER_LEARNING_STEP = 100;
export const XP_PER_LEVEL = 500;

export const LEARNING_PATHS: LearningPath[] = [
  {
    id: "absolute-beginner",
    name: "Absolute Beginner",
    desc: "Foundation of music: notes, intervals, and major scales.",
    track: "General",
    steps: [
      { id: "b1", name: "The 12 Notes", task: "Play every note on the piano or fretboard.", action: "Play all chromatic notes" },
      { id: "b2", name: "Major Scale Foundation", task: "Explore the C Major scale.", action: "View C Major in Western Modes" },
      { id: "b3", name: "Basic Intervals", task: "Identify a Major 3rd and Perfect 5th.", action: "Use Interval Calculator" },
      { id: "b4", name: "The White Keys", task: "Play all natural notes (C D E F G A B).", action: "Identify natural notes" },
      { id: "b5", name: "Octave Identification", task: "Find the same note in different octaves.", action: "Play C3 then C4" },
      { id: "b6", name: "Simple Triad", task: "Build a C Major triad (C-E-G).", action: "Play C Major chord" },
      { id: "b7", name: "Minor Sound", task: "Build a C Minor triad (C-Eb-G).", action: "Play C Minor chord" },
      { id: "b8", name: "Key Signatures", task: "Look at G Major (1 sharp).", action: "Change Key to G Major" },
      { id: "b9", name: "Sharp Identification", task: "Find F# on your instrument.", action: "Play F#" },
      { id: "b10", name: "Scale Steps", task: "Identify degrees 1 through 7 of C Major.", action: "Toggle Degree Mode" },
    ],
  },
  {
    id: "blues-mastery",
    name: "Blues Mastery",
    desc: "Learn the shuffle, the blues scale, and the 12-bar progression.",
    track: "Blues",
    steps: [
      { id: "bl1", name: "The Blues Scale", task: "Play the C Blues scale.", action: "Find Blues Scale in Western Modes" },
      { id: "bl2", name: "12-Bar Blues", task: "Play a standard I-IV-V progression.", action: "Play I-IV-I-V progression" },
      { id: "bl3", name: "Dominant 7ths", task: "Explore the sound of Dominant 7th chords.", action: "View '7' chords in All Chord Types" },
      { id: "bl4", name: "Flat 5th", task: "Identify the 'blue note' (b5).", action: "Play C to Gb" },
      { id: "bl5", name: "Shuffle Rhythm", task: "Set the metronome to a swing feel.", action: "Practice with swing" },
      { id: "bl6", name: "Minor Blues", task: "Play a minor blues progression.", action: "Play i-iv-i-V progression" },
      { id: "bl7", name: "Turnarounds", task: "Learn a common blues ending.", action: "Explore Blues Turnarounds" },
      { id: "bl8", name: "Mixolydian Rock", task: "Apply Mixolydian to a blues context.", action: "View Mixolydian in Western Modes" },
      { id: "bl9", name: "Call & Response", task: "Play a simple lick and repeat it.", action: "Ear Trainer: Intervals" },
      { id: "bl10", name: "Blues Inversions", task: "Play a 7th chord in 1st inversion.", action: "Check Chord Inversions" },
    ],
  },
  {
    id: "jazz-essentials",
    name: "Jazz Essentials",
    desc: "Sophisticated harmony: ii-V-I turnarounds and extensions.",
    track: "Jazz",
    steps: [
      { id: "j1", name: "The ii-V-I", task: "Play the most iconic jazz progression.", action: "Play ii-V-I in Progressions" },
      { id: "j2", name: "Dorian Mode", task: "Explore the cool sound of Dorian.", action: "View Dorian in Western Modes" },
      { id: "j3", name: "Chord Extensions", task: "Learn about 9th and 13th chords.", action: "Explore 'maj9' and '13' chords" },
      { id: "j4", name: "Major 7th", task: "Hear the difference between Maj7 and Dominant 7.", action: "Compare Cmaj7 and C7" },
      { id: "j5", name: "Jazz Minor", task: "Explore Melodic Minor.", action: "Find Melodic Minor in Grimoire" },
      { id: "j6", name: "Tritone Sub", task: "Learn about substitution theory.", action: "Find ii-bII-I in Progressions" },
      { id: "j7", name: "Walking Bass", task: "Practice chord tones on every beat.", action: "Use Metronome at 120bpm" },
      { id: "j8", name: "Lead Sheets", task: "Read a simple jazz standard notation.", action: "Open Notation Writer" },
      { id: "j9", name: "Altered Dominants", task: "Hear the tension of a 7b9 chord.", action: "Play 7b9 in All Chords" },
      { id: "j10", name: "Secondary Dominants", task: "Identify non-diatonic jazz moves.", action: "Check Jazz Genres" },
    ],
  },
  {
    id: "classical-foundations",
    name: "Classical Foundations",
    desc: "Counterpoint, functional harmony, and formal structures.",
    track: "Classical",
    steps: [
      { id: "c1", name: "Minor Scales", task: "Explore Natural and Harmonic minor.", action: "View Aeolian in Western Modes" },
      { id: "c2", name: "Circle of Fifths", task: "Understand key relationships.", action: "Interact with the Circle of Fifths" },
      { id: "c3", name: "Notation Literacy", task: "Write a simple melody on the staff.", action: "Use the Notation Writer" },
      { id: "c4", name: "Authentic Cadence", task: "Identify the V-I resolution.", action: "Play V to I chords" },
      { id: "c5", name: "Relative Keys", task: "Find the relative minor of C Major.", action: "Use Key Distance Calculator" },
      { id: "c6", name: "Parallel Keys", task: "Switch from C Major to C Minor.", action: "Compare C Major/Minor" },
      { id: "c7", name: "Diminished 7ths", task: "Hear the most tense classical chord.", action: "Play dim7 chord" },
      { id: "c8", name: "Staff Clefs", task: "Switch between Treble and Bass.", action: "Toggle Clefs in Notation" },
      { id: "c9", name: "Interval Quality", task: "Identify Major vs Minor 6ths.", action: "Ear Trainer: Intervals" },
      { id: "c10", name: "Roman Numerals", task: "Identify diatonic chord functions.", action: "View Diatonic Chords" },
    ],
  },
  {
    id: "rock-metal",
    name: "Rock & Metal Riffs",
    desc: "Power chords, phrygian dominance, and heavy syncopation.",
    track: "Rock",
    steps: [
      { id: "rm1", name: "Power Chords", task: "Play 5th chords (no 3rd).", action: "Identify Root and 5th" },
      { id: "rm2", name: "Phrygian Dark", task: "Explore the metal sound of Phrygian.", action: "View Phrygian in Modes" },
      { id: "rm3", name: "Palm Mute Rhythm", task: "Practice 8th note chugs.", action: "Set Metronome to 140bpm" },
      { id: "rm4", name: "Drop D Tuning", task: "Switch to a lower guitar tuning.", action: "Select Guitar (Drop D)" },
      { id: "rm5", name: "Flat 2nd Resolve", task: "Hear the tension of b2 to 1.", action: "Play Db to C" },
      { id: "rm6", name: "Dorian Metal", task: "Explore the 'cool' rock minor.", action: "View Dorian in Western Modes" },
      { id: "rm7", name: "Double Kick", task: "Set a metal drum pattern.", action: "Explore Metal in Drum Machine" },
      { id: "rm8", name: "Harmonic Minor", task: "The sound of neo-classical metal.", action: "Find Harmonic Minor in Grimoire" },
      { id: "rm9", name: "Odd Time Sigs", task: "Practice in 7/8 or 5/4.", action: "Set Metronome to 7/8" },
      { id: "rm10", name: "Speed Building", task: "Increase tempo incrementally.", action: "Use Tempo Slider" },
    ],
  },
  {
    id: "world-explorer",
    name: "World Music Explorer",
    desc: "Microtones, exotic intervals, and global rhythms.",
    track: "World",
    steps: [
      { id: "we1", name: "Arabic Maqams", task: "Explore quarter-tone systems.", action: "View Maqam Rast in World Scales" },
      { id: "we2", name: "Japanese Koto", task: "Hear the peaceful Hirajoshi scale.", action: "View Hirajoshi in World Scales" },
      { id: "we3", name: "Indian Ragas", task: "Explore the Raga Bhairavi sound.", action: "View Raga Bhairavi in World Scales" },
      { id: "we4", name: "Sitar Tuning", task: "Explore Indian instrument layouts.", action: "Select Sitar (Indian)" },
      { id: "we5", name: "Gamelan Tuning", task: "Explore Pelog and Slendro.", action: "View Pelog in World Scales" },
      { id: "we6", name: "Augmented 2nds", task: "Hear the sound of the desert.", action: "Play Maqam Hijaz" },
      { id: "we7", name: "Global Rhythms", task: "Explore non-Western percussion.", action: "Check Drum Machine Patterns" },
      { id: "we8", name: "Oud Layout", task: "Explore the fretless Arabic oud.", action: "Select Oud (Arabic)" },
      { id: "we9", name: "Pentatonic Global", task: "Compare Chinese and Blues scales.", action: "View Chinese Pentatonic" },
      { id: "we10", name: "Byzantine Sounds", task: "Explore the Double Harmonic scale.", action: "Find Double Harmonic in Modes" },
    ],
  },
  {
    id: "songwriting-lab",
    name: "Songwriting Pro",
    desc: "Hooks, song structures, and lyrical prosody.",
    track: "Writing",
    steps: [
      { id: "sw1", name: "The Hook", task: "Write a short catchy lyric line.", action: "Use Songwriting Lab" },
      { id: "sw2", name: "Emotional Mood", task: "Pick a scale for a specific emotion.", action: "Use Mood Picker" },
      { id: "sw3", name: "Pop Structure", task: "Define Verse, Chorus, Bridge.", action: "Edit Song Sections" },
      { id: "sw4", name: "Hook Variations", task: "Generate alt hooks for your chorus.", action: "Use Hook Forge" },
      { id: "sw5", name: "Borrowed Chords", task: "Borrow from a parallel minor.", action: "Use Modal Interchange" },
      { id: "sw6", name: "Melodic Contour", task: "Analyze your note heights.", action: "Use Notation Writer" },
      { id: "sw7", name: "Chord Flow", task: "Chain 4 chords together.", action: "Use Studio Progression" },
      { id: "sw8", name: "Tempo Mood", task: "Match BPM to your song's energy.", action: "Adjust Metronome" },
      { id: "sw9", name: "Recording Prep", task: "Create a session checklist.", action: "Open Recording Guide" },
      { id: "sw10", name: "Final Draft", task: "Complete a full song layout.", action: "Save Song Draft" },
    ],
  },
  {
    id: "advanced-theory",
    name: "Advanced Modal Theory",
    desc: "Negative harmony, modal interchange, and polytonality.",
    track: "Advanced",
    steps: [
      { id: "at1", name: "Lydian Dominant", task: "Mix Lydian and Mixolydian.", action: "View Lydian Dominant in Grimoire" },
      { id: "at2", name: "Negative Harmony", task: "Invert a chord around C-G axis.", action: "Explore Interval Tool" },
      { id: "at3", name: "Polytonal Sound", task: "Hear C Major over F# Major.", action: "Compare Key Distance" },
      { id: "at4", name: "Super Locrian", task: "Explore the Altered Scale.", action: "Find Altered Scale in Grimoire" },
      { id: "at5", name: "Symmetrical Scales", task: "Explore the Whole Tone scale.", action: "View Whole Tone in Modes" },
      { id: "at6", name: "Half-Whole Dim", task: "Explore jazz-dominant patterns.", action: "Find Half-Whole Dim in Grimoire" },
      { id: "at7", name: "Modal Interchange", task: "Swap a major IV for a minor iv.", action: "Use Modal Interchange" },
      { id: "at8", name: "Non-Diatonic Sub", task: "Find a chord from a different key.", action: "Use Key Distance Calculator" },
      { id: "at9", name: "Extended Arps", task: "Play a 13th chord arpeggio.", action: "Toggle Arpeggio Mode" },
      { id: "at10", name: "Theory Mastery", task: "Answer 10 quiz questions correctly.", action: "Take Music Theory Quiz" },
    ],
  },
  {
    id: "rhythm-groove",
    name: "Rhythm & Groove",
    desc: "Timing, syncopation, and drum programming.",
    track: "Rhythm",
    steps: [
      { id: "rg1", name: "The Grid", task: "Program a basic 4/4 kick pattern.", action: "Use Drum Machine" },
      { id: "rg2", name: "Syncopation", task: "Place a snare on the 'and' of 2.", action: "Edit Drum Grid" },
      { id: "rg3", name: "Swing Feel", task: "Add 20% swing to your loop.", action: "Adjust Swing Slider" },
      { id: "rg4", name: "Polyrhythms", task: "Hear 3 against 4.", action: "Set Metronome Groups" },
      { id: "rg5", name: "Odd Meters", task: "Feel the pulse of 5/8.", action: "Set Metronome Signature" },
      { id: "rg6", name: "BPM Energy", task: "Contrast 60bpm vs 180bpm.", action: "Use Tempo Slider" },
      { id: "rg7", name: "Hi-Hat Fills", task: "Add 16th note rolls.", action: "Edit Drum Machine" },
      { id: "rg8", name: "Ghost Notes", task: "Hear soft snare hits.", action: "Listen to Funk Patterns" },
      { id: "rg9", name: "Drum Mixing", task: "Balance kick and snare levels.", action: "Check Mixing Guide" },
      { id: "rg10", name: "Humanize", task: "Randomize velocities slightly.", action: "Check Advanced Drum Settings" },
    ],
  },
  {
    id: "ear-mastery",
    name: "Ear Mastery",
    desc: "Identify intervals, chords, and scales by ear.",
    track: "Ear",
    steps: [
      { id: "em1", name: "Perfect 5th", task: "Identify the 'Star Wars' interval.", action: "Ear Trainer: Intervals" },
      { id: "em2", name: "Major vs Minor", task: "Hear the happy vs sad triad.", action: "Ear Trainer: Chords" },
      { id: "em3", name: "Tritone Tension", task: "Identify the 'Devil's Interval'.", action: "Ear Trainer: Intervals" },
      { id: "em4", name: "Dominant Pull", task: "Hear the 7th resolving home.", action: "Play G7 to C" },
      { id: "em5", name: "Dorian Color", task: "Identify Dorian by its raised 6th.", action: "Ear Trainer: Scales" },
      { id: "em6", name: "Perfect 4th", task: "Identify the 'Here Comes the Bride' jump.", action: "Ear Trainer: Intervals" },
      { id: "em7", name: "Suspended Chords", task: "Identify sus4 vs sus2.", action: "Play sus4 Chord" },
      { id: "em8", name: "Phrygian Root", task: "Hear the dark half-step resolution.", action: "Play Db to C" },
      { id: "em9", name: "Diminished Color", task: "Identify the tense octatonic sound.", action: "Ear Trainer: Scales" },
      { id: "em10", name: "Perfect Pitch Prep", task: "Identify C4 every time.", action: "Play C4 repeatedly" },
    ],
  },
];

export function getLearningLevel(xp: number) {
  return Math.floor(xp / XP_PER_LEVEL) + 1;
}

export function resolveLearningActionRoute(action: string) {
  const normalized = action.toLowerCase();
  const includesAny = (...terms: string[]) => terms.some((term) => normalized.includes(term));

  if (includesAny("recording guide")) return "/app/recording";
  if (includesAny("mixing guide")) return "/app/mixing";
  if (includesAny("ear trainer")) return "/app/ear";
  if (includesAny("quiz")) return "/app/quiz";
  if (includesAny("modal interchange")) return "/app/interchange";
  if (includesAny("mood picker")) return "/app/moods";
  if (includesAny("genre", "jazz genres")) return "/app/genres";
  if (includesAny("studio progression")) return "/app/studio";
  if (includesAny("songwriting", "song sections", "hook forge", "save song draft")) {
    return "/app/songwriting";
  }
  if (includesAny("phrasing", "arpeggio mode")) return "/app/phrasing";
  if (includesAny("scale builder")) return "/app/scalebuilder";
  if (
    includesAny(
      "grimoire",
      "melodic minor",
      "harmonic minor",
      "lydian dominant",
      "altered scale",
      "half-whole dim",
    )
  ) {
    return "/app/grimoire";
  }
  if (
    includesAny(
      "world scales",
      "maqam",
      "hirajoshi",
      "raga",
      "pelog",
      "chinese pentatonic",
      "indian",
      "arabic",
      "oud",
    )
  ) {
    return "/app/world";
  }
  if (
    includesAny(
      "western modes",
      " in modes",
      "blues scale",
      "whole tone",
      "double harmonic",
      "phrygian",
      "mixolydian",
      "aeolian",
      "dorian",
    )
  ) {
    return "/app/modes";
  }
  if (includesAny("interval calculator", "interval tool", "interval")) return "/app/intervals";
  if (includesAny("key distance", "key calculator")) return "/app/calculator";
  if (includesAny("circle of fifths", "change key to")) return "/app/circle";
  if (
    includesAny(
      "drum machine",
      "drum grid",
      "drum mixing",
      "drum machine patterns",
      "drum patterns",
      "advanced drum settings",
      "funk patterns",
      "double kick",
      "drum",
    )
  ) {
    return "/app/drums";
  }
  if (
    includesAny(
      "metronome",
      "tempo",
      "swing",
      "bpm",
      "7/8",
      "5/4",
      "signature",
      "groups",
    )
  ) {
    return "/app/metronome";
  }
  if (
    includesAny(
      "ii-v-i",
      "i-iv-i-v",
      "v to i",
      "g7 to c",
      "turnaround",
      "progression",
      "chord flow",
      "compare c major/minor",
    )
  ) {
    return "/app/progressions";
  }
  if (includesAny("chord inversions", "inversion")) return "/app/voicings";
  if (
    includesAny(
      "all chords",
      "all chord",
      "maj9",
      "13' chords",
      " 13",
      "dominant 7",
      "7b9",
      "dim7 chord",
      "sus4 chord",
      "cmaj7 and c7",
      "c major chord",
      "c minor chord",
      "root and 5th",
    )
  ) {
    return "/app/allchords";
  }
  if (includesAny("diatonic chords", "degree mode")) return "/app/chords";
  if (includesAny("notation", "notation writer", "clefs", "staff")) return "/app/notation";
  if (includesAny("custom tuning", "drop d")) return "/app/customtuning";
  if (includesAny("microton")) return "/app/microtonal";
  if (
    includesAny(
      "chromatic notes",
      "natural notes",
      "play c3 then c4",
      "play f#",
      "play c4 repeatedly",
      "select guitar",
      "select sitar",
      "select oud",
      "play maqam hijaz",
      "play c to gb",
      "play db to c",
      "identify root and 5th",
      "play all ",
      "compare ",
    )
  ) {
    return "/app/piano";
  }
  return null;
}
