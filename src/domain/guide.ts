export interface TheoryGuideSection {
  id: string;
  category: string;
  title: string;
  core: string;
  points: string[];
  examples: string[];
}

export const THEORY_GUIDE_SECTIONS: TheoryGuideSection[] = [
  {
    id: "what-is-theory",
    category: "Foundations",
    title: "01) What Music Theory Is",
    core: "Theory describes musical patterns so you can read, write, analyze, and communicate musical ideas precisely.",
    points: [
      "Prescriptive view: rules of style.",
      "Descriptive view: patterns in real repertoire.",
      "Practical use: composition, arranging, improvisation, ear training.",
    ],
    examples: [
      "A progression labeled ii-V-I tells function before pitch.",
      "Roman numerals let you transpose ideas between keys.",
    ],
  },
  {
    id: "sound-acoustics",
    category: "Foundations",
    title: "02) Sound, Acoustics, and Perception",
    core: "Pitch, loudness, and timbre come from physical vibration and auditory processing.",
    points: [
      "Frequency (Hz) shapes pitch perception.",
      "Amplitude relates to perceived loudness.",
      "Overtones and partials define timbre.",
    ],
    examples: [
      "A4 = 440 Hz in common modern reference.",
      "The same note on flute and guitar differs by overtone profile.",
    ],
  },
  {
    id: "notation-fundamentals",
    category: "Foundations",
    title: "03) Notation Fundamentals",
    core: "Staff notation encodes pitch, rhythm, articulation, and structure.",
    points: [
      "Staff, clefs, noteheads, stems, beams, and rests.",
      "Treble and bass clef reading anchors.",
      "Ledger lines extend range.",
    ],
    examples: [
      "Middle C is between treble and bass staves.",
      "Four quarter notes fill one 4/4 bar.",
    ],
  },
  {
    id: "accidentals-enharmonics",
    category: "Foundations",
    title: "04) Accidentals and Enharmonic Spelling",
    core: "Sharps and flats alter staff pitch by semitone while spelling preserves harmonic logic.",
    points: [
      "Use spelling to reflect function such as leading tone versus passing tone.",
      "Enharmonics sound equal in 12-TET but analyze differently.",
      "Key context determines preferred spelling.",
    ],
    examples: [
      "In E major, use D# instead of Eb.",
      "V/V in C is D major, so F# is functionally clear.",
    ],
  },
  {
    id: "rhythm-meter-pulse",
    category: "Foundations",
    title: "05) Rhythm, Meter, and Pulse",
    core: "Rhythm is duration and placement, while meter organizes recurring strong and weak beat hierarchy.",
    points: [
      "Simple meter divides the beat by 2.",
      "Compound meter divides the beat by 3.",
      "Syncopation shifts accents off expected beats.",
    ],
    examples: [
      "4/4 count: 1 & 2 & 3 & 4 &.",
      "6/8 count: 1 la li 2 la li.",
    ],
  },
  {
    id: "interval-quality",
    category: "Foundations",
    title: "06) Intervals and Interval Quality",
    core: "Intervals measure pitch distance by letter span and semitone content.",
    points: [
      "Perfect class: 1, 4, 5, 8.",
      "Major and minor class: 2, 3, 6, 7.",
      "Augmented and diminished alter the base quality.",
    ],
    examples: [
      "C to E is a major 3rd with 4 semitones.",
      "B to F is a diminished 5th or tritone.",
    ],
  },
  {
    id: "interval-inversion",
    category: "Foundations",
    title: "07) Interval Inversion",
    core: "Inversion flips the lower note up an octave, and interval qualities invert systematically.",
    points: [
      "Interval number pairs sum to 9.",
      "Major inverts to minor.",
      "Perfect stays perfect, while augmented inverts to diminished.",
    ],
    examples: [
      "A major 3rd inverts to a minor 6th.",
      "A perfect 4th inverts to a perfect 5th.",
    ],
  },
  {
    id: "scale-degrees",
    category: "Scales",
    title: "08) Scales and Degree Functions",
    core: "Scales organize pitch classes into functional degree hierarchies.",
    points: [
      "Degrees include tonic, supertonic, mediant, subdominant, dominant, submediant, and leading tone or subtonic.",
      "Degree function drives tendency and resolution.",
      "Scale context informs chord quality.",
    ],
    examples: [
      "In C major, B tends to resolve to C.",
      "In A natural minor, G is the subtonic.",
    ],
  },
  {
    id: "diatonic-chromatic",
    category: "Scales",
    title: "09) Diatonic and Chromatic Collections",
    core: "Diatonic systems use seven-note collections, while chromatic resources draw from all twelve semitones.",
    points: [
      "Diatonic major and minor patterns create key identity.",
      "Chromatic passing tones add tension and color.",
      "Chromaticism can imply temporary tonicization.",
    ],
    examples: [
      "C major: C D E F G A B.",
      "A chromatic line can move G, G#, A over minor harmony.",
    ],
  },
  {
    id: "pentatonic-blues",
    category: "Scales",
    title: "10) Pentatonic and Blues Systems",
    core: "Pentatonic forms simplify melodic choices and are widely used in folk, rock, and jazz.",
    points: [
      "Major pentatonic: 1 2 3 5 6.",
      "Minor pentatonic: 1 b3 4 5 b7.",
      "The blues scale adds a chromatic blue note.",
    ],
    examples: [
      "A minor pentatonic: A C D E G.",
      "C blues: C Eb F Gb G Bb.",
    ],
  },
  {
    id: "church-modes",
    category: "Scales",
    title: "11) Church Modes and Modal Color",
    core: "Modes are scalar rotations with unique characteristic tones and cadential behavior.",
    points: [
      "Ionian, Dorian, Phrygian, Lydian, Mixolydian, Aeolian, and Locrian.",
      "Characteristic tones define color such as the #4 in Lydian.",
      "Modal harmony can avoid strong V-I pull.",
    ],
    examples: [
      "D Dorian: D E F G A B C.",
      "G Mixolydian: G A B C D E F.",
    ],
  },
  {
    id: "triads-sevenths",
    category: "Harmony",
    title: "12) Triads and Seventh Chords",
    core: "Chords are stacked interval structures built from scale degrees.",
    points: [
      "Triads: major, minor, diminished, augmented.",
      "Seventh chords: maj7, 7, m7, m7b5, dim7.",
      "Chord quality comes from internal intervals.",
    ],
    examples: [
      "Cmaj7 = C E G B.",
      "Bm7b5 = B D F A.",
    ],
  },
  {
    id: "symbols-roman-numerals",
    category: "Harmony",
    title: "13) Chord Symbols and Roman Numerals",
    core: "Symbol systems represent sonority with letter names and function with Roman numerals.",
    points: [
      "Uppercase numerals imply major-function tendency.",
      "Lowercase numerals imply minor-function tendency.",
      "Accidentals and extensions show chromatic function.",
    ],
    examples: [
      "I-vi-ii-V in C becomes C-Am-Dm-G.",
      "bVII in C is Bb major.",
    ],
  },
  {
    id: "diatonic-harmony",
    category: "Harmony",
    title: "14) Diatonic Harmony in Major and Minor",
    core: "Diatonic harmony maps stable and unstable areas of a key.",
    points: [
      "Major map: I ii iii IV V vi vii dim.",
      "Natural minor map: i ii dim III iv v VI VII.",
      "Harmonic and melodic minor modify dominant behavior.",
    ],
    examples: [
      "In A minor, E7 introduces G# as a leading tone.",
      "Cadential pull strengthens with the raised seventh.",
    ],
  },
  {
    id: "functional-harmony",
    category: "Harmony",
    title: "15) Functional Harmony and Cadences",
    core: "Functional flow often moves Tonic to Predominant to Dominant and back to Tonic.",
    points: [
      "Authentic cadence: V-I.",
      "Plagal cadence: IV-I.",
      "Deceptive cadence: V-vi or V-VI.",
    ],
    examples: [
      "ii-V-I in Bb: Cm7-F7-Bbmaj7.",
      "A half cadence ends on dominant.",
    ],
  },
  {
    id: "voice-leading",
    category: "Harmony",
    title: "16) Voice Leading and Inversions",
    core: "Effective voice leading minimizes unnecessary motion while preserving function.",
    points: [
      "Retain common tones.",
      "Resolve tendency tones by step when style expects it.",
      "Inversions smooth bass lines and reduce leaps.",
    ],
    examples: [
      "C/E to F keeps upper common tones.",
      "V4/2 often resolves to I6.",
    ],
  },
  {
    id: "non-chord-tones",
    category: "Harmony",
    title: "17) Non-Chord Tones",
    core: "Passing, neighbor, suspension, anticipation, and appoggiatura tones create controlled dissonance.",
    points: [
      "Use preparation, dissonance, and resolution.",
      "Accented dissonance has a stronger expressive effect.",
      "Non-chord-tone density shapes texture and style.",
    ],
    examples: [
      "A 4-3 suspension over dominant.",
      "A passing tone can fill a third by step.",
    ],
  },
  {
    id: "chromatic-borrowing",
    category: "Harmony",
    title: "18) Chromatic Harmony and Borrowing",
    core: "Borrowed and altered chords enrich tonal palette without requiring full modulation.",
    points: [
      "Modal interchange borrows from the parallel mode.",
      "Secondary dominants tonicize local goals.",
      "Diminished passing chords connect diatonic targets.",
    ],
    examples: [
      "In C, iv or Fm comes from the parallel minor.",
      "V/V in C is D7 resolving to G.",
    ],
  },
  {
    id: "substitution",
    category: "Harmony",
    title: "19) Chord Substitution Principles",
    core: "Substitution replaces a chord with functionally similar or voice-leading-equivalent options.",
    points: [
      "Dominant substitutions can use tritone relations.",
      "Relative and mediant substitutions change color while preserving function.",
      "Passing diminished chords work as approach harmony.",
    ],
    examples: [
      "G7 and Db7 form a tritone-sub pair.",
      "I and vi can substitute in many pop contexts.",
    ],
  },
  {
    id: "modulation",
    category: "Analysis",
    title: "20) Modulation and Key Change",
    core: "Modulation shifts tonal center through pivot chords, direct shifts, or common-tone techniques.",
    points: [
      "Pivot-chord modulation is the smoothest route.",
      "Direct modulation is abrupt but effective.",
      "Common-tone modulation uses shared pitch anchors.",
    ],
    examples: [
      "C major can move to G major through D7.",
      "A common tone such as G can bridge C and Eb centers.",
    ],
  },
  {
    id: "form-phrase",
    category: "Analysis",
    title: "21) Form and Phrase Design",
    core: "Form organizes musical time into phrases, periods, and larger sections.",
    points: [
      "Common forms include binary, ternary, and verse-chorus.",
      "Cadences define phrase boundaries.",
      "Motivic repetition and variation create coherence.",
    ],
    examples: [
      "A 4+4 phrase can create an antecedent and consequent period.",
      "AABA is a common jazz song form.",
    ],
  },
  {
    id: "ear-training-strategy",
    category: "Analysis",
    title: "22) Ear Training Strategy",
    core: "Aural skill grows from interval, scale-degree, chord-quality, and rhythm identification.",
    points: [
      "Train ascending and descending interval recognition.",
      "Map sound to function, not only to absolute pitch labels.",
      "Use call-and-response and transcription loops.",
    ],
    examples: [
      "Identify V-I by hearing dominant tension release.",
      "Sing scale degrees over a drone tonic.",
    ],
  },
  {
    id: "genre-harmony",
    category: "Analysis",
    title: "23) Genre Harmony and Style",
    core: "Genres use different harmonic norms, cadence strength, and rhythmic density.",
    points: [
      "Pop leans on loop-based diatonic cycles.",
      "Jazz uses extensions, substitutions, and strong functional pull.",
      "Modal and folk traditions often emphasize drone and mode stability.",
    ],
    examples: [
      "A common pop loop is I-V-vi-IV.",
      "A jazz turnaround often runs iii-vi-ii-V-I.",
    ],
  },
  {
    id: "analysis-workflow",
    category: "Analysis",
    title: "24) Practical Analysis Workflow",
    core: "Analyze from macro to micro: form, key centers, cadence points, then local detail.",
    points: [
      "Determine probable key centers first.",
      "Label phrase shape and cadence points.",
      "Mark Roman numerals, non-chord tones, and voice-leading events.",
    ],
    examples: [
      "Start by finding the strongest V-I events.",
      "Then annotate borrowed chords and secondary functions.",
    ],
  },
];
