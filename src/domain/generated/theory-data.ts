export const KEY_OPTIONS = [
  "C Major",
  "G Major",
  "D Major",
  "A Major",
  "E Major",
  "B Major",
  "F# Major",
  "C# Major",
  "F Major",
  "Bb Major",
  "Eb Major",
  "Ab Major",
  "Db Major",
  "Gb Major",
  "Cb Major",
  "B# Major",
  "A Minor",
  "E Minor",
  "B Minor",
  "F# Minor",
  "C# Minor",
  "G# Minor",
  "D# Minor",
  "A# Minor",
  "D Minor",
  "G Minor",
  "C Minor",
  "F Minor",
  "Bb Minor",
  "Eb Minor",
  "Ab Minor",
  "Gb Minor",
  "Db Minor"
] as const;

export const INSTRUMENT_CONFIGS = {
  "piano": {
    "type": "piano",
    "name": "Piano"
  },
  "guitar": {
    "type": "fretboard",
    "strings": [
      "E2",
      "A2",
      "D3",
      "G3",
      "B3",
      "E4"
    ],
    "name": "Guitar (Standard)",
    "frets": 24
  },
  "guitar-dropD": {
    "type": "fretboard",
    "strings": [
      "D2",
      "A2",
      "D3",
      "G3",
      "B3",
      "E4"
    ],
    "name": "Guitar (Drop D)",
    "frets": 24
  },
  "guitar-openG": {
    "type": "fretboard",
    "strings": [
      "D2",
      "G2",
      "D3",
      "G3",
      "B3",
      "D4"
    ],
    "name": "Guitar (Open G)",
    "frets": 24
  },
  "guitar-dadgad": {
    "type": "fretboard",
    "strings": [
      "D2",
      "A2",
      "D3",
      "G3",
      "A3",
      "D4"
    ],
    "name": "Guitar (DADGAD)",
    "frets": 24
  },
  "bass4": {
    "type": "fretboard",
    "strings": [
      "E1",
      "A1",
      "D2",
      "G2"
    ],
    "name": "Bass 4-String",
    "frets": 24
  },
  "bass5": {
    "type": "fretboard",
    "strings": [
      "B0",
      "E1",
      "A1",
      "D2",
      "G2"
    ],
    "name": "Bass 5-String",
    "frets": 24
  },
  "bass6": {
    "type": "fretboard",
    "strings": [
      "B0",
      "E1",
      "A1",
      "D2",
      "G2",
      "C3"
    ],
    "name": "Bass 6-String",
    "frets": 24
  },
  "ukulele": {
    "type": "fretboard",
    "strings": [
      "G4",
      "C4",
      "E4",
      "A4"
    ],
    "name": "Ukulele",
    "frets": 24
  },
  "banjo5": {
    "type": "fretboard",
    "strings": [
      "G4",
      "D3",
      "G3",
      "B3",
      "D4"
    ],
    "name": "Banjo 5-String",
    "frets": 24
  },
  "mandolin": {
    "type": "fretboard",
    "strings": [
      "G3",
      "D4",
      "A4",
      "E5"
    ],
    "name": "Mandolin",
    "frets": 24
  },
  "violin": {
    "type": "fretboard",
    "strings": [
      "G3",
      "D4",
      "A4",
      "E5"
    ],
    "name": "Violin",
    "frets": 24,
    "fretless": true
  },
  "viola": {
    "type": "fretboard",
    "strings": [
      "C3",
      "G3",
      "D4",
      "A4"
    ],
    "name": "Viola",
    "frets": 24,
    "fretless": true
  },
  "cello": {
    "type": "fretboard",
    "strings": [
      "C2",
      "G2",
      "D3",
      "A3"
    ],
    "name": "Cello",
    "frets": 24,
    "fretless": true
  },
  "doublebass": {
    "type": "fretboard",
    "strings": [
      "E1",
      "A1",
      "D2",
      "G2"
    ],
    "name": "Double Bass",
    "frets": 24,
    "fretless": true
  },
  "sitar": {
    "type": "fretboard",
    "strings": [
      "C4",
      "C5",
      "G4",
      "C4",
      "G3",
      "C3",
      "F2"
    ],
    "name": "Sitar (Indian)",
    "frets": 24
  },
  "oud": {
    "type": "fretboard",
    "strings": [
      "C2",
      "F2",
      "A2",
      "D3",
      "G3",
      "C4"
    ],
    "name": "Oud (Arabic)",
    "frets": 24,
    "fretless": true
  },
  "koto": {
    "type": "fretboard",
    "strings": [
      "D3",
      "A3",
      "D4",
      "E4",
      "A4",
      "D5",
      "E5",
      "A5",
      "D6",
      "E6",
      "A6",
      "D7",
      "E7"
    ],
    "name": "Koto (Japanese)",
    "frets": 24
  },
  "balalaika": {
    "type": "fretboard",
    "strings": [
      "E4",
      "E4",
      "A4"
    ],
    "name": "Balalaika (Russian)",
    "frets": 24
  }
} as const;

export const ALL_SCALES = {
  "Double Harmonic Minor": {
    "intervals": [
      0,
      1,
      4,
      5,
      7,
      8,
      11
    ],
    "desc": "Hungarian Minor variant",
    "region": "European"
  },
  "Lydian Dominant": {
    "intervals": [
      0,
      2,
      4,
      6,
      7,
      9,
      10
    ],
    "desc": "Lydian with a flat 7",
    "region": "Jazz"
  },
  "Ionian (Major)": {
    "intervals": [
      0,
      2,
      4,
      5,
      7,
      9,
      11
    ],
    "desc": "Bright, happy - foundation of Western music",
    "region": "Western"
  },
  "Dorian": {
    "intervals": [
      0,
      2,
      3,
      5,
      7,
      9,
      10
    ],
    "desc": "Minor with raised 6th - jazzy, sophisticated",
    "region": "Western"
  },
  "Phrygian": {
    "intervals": [
      0,
      1,
      3,
      5,
      7,
      8,
      10
    ],
    "desc": "Spanish/Flamenco sound - dark, exotic",
    "region": "Western"
  },
  "Lydian": {
    "intervals": [
      0,
      2,
      4,
      6,
      7,
      9,
      11
    ],
    "desc": "Dreamy, floating - raised 4th",
    "region": "Western"
  },
  "Mixolydian": {
    "intervals": [
      0,
      2,
      4,
      5,
      7,
      9,
      10
    ],
    "desc": "Bluesy rock - major with flat 7",
    "region": "Western"
  },
  "Aeolian (Natural Minor)": {
    "intervals": [
      0,
      2,
      3,
      5,
      7,
      8,
      10
    ],
    "desc": "Melancholic, emotional - natural minor",
    "region": "Western"
  },
  "Locrian": {
    "intervals": [
      0,
      1,
      3,
      5,
      6,
      8,
      10
    ],
    "desc": "Dark, tense - diminished scale",
    "region": "Western"
  },
  "Harmonic Minor": {
    "intervals": [
      0,
      2,
      3,
      5,
      7,
      8,
      11
    ],
    "desc": "Classical minor with leading tone",
    "region": "Western"
  },
  "Melodic Minor": {
    "intervals": [
      0,
      2,
      3,
      5,
      7,
      9,
      11
    ],
    "desc": "Jazz minor / ascending melodic minor",
    "region": "Western"
  },
  "Harmonic Major": {
    "intervals": [
      0,
      2,
      4,
      5,
      7,
      8,
      11
    ],
    "desc": "Major with flat 6th",
    "region": "Western"
  },
  "Major Pentatonic": {
    "intervals": [
      0,
      2,
      4,
      7,
      9
    ],
    "desc": "Versatile 5-note scale",
    "region": "Western"
  },
  "Minor Pentatonic": {
    "intervals": [
      0,
      3,
      5,
      7,
      10
    ],
    "desc": "Staple of rock/blues soloing",
    "region": "Western"
  },
  "Blues Scale": {
    "intervals": [
      0,
      3,
      5,
      6,
      7,
      10
    ],
    "desc": "Foundation of blues & rock",
    "region": "Blues/Jazz"
  },
  "Minor Blues": {
    "intervals": [
      0,
      3,
      5,
      6,
      7,
      9,
      10
    ],
    "desc": "Minor pentatonic + blues note",
    "region": "Blues/Jazz"
  },
  "Major Blues": {
    "intervals": [
      0,
      2,
      3,
      4,
      7,
      9
    ],
    "desc": "Major pentatonic + flat 3rd",
    "region": "Blues/Jazz"
  },
  "Bebop Dominant": {
    "intervals": [
      0,
      2,
      4,
      5,
      7,
      9,
      10,
      11
    ],
    "desc": "Jazz improv - chromatic passing tone",
    "region": "Blues/Jazz"
  },
  "Bebop Major": {
    "intervals": [
      0,
      2,
      4,
      5,
      7,
      8,
      9,
      11
    ],
    "desc": "Major scale with chromatic note",
    "region": "Blues/Jazz"
  },
  "Altered Scale": {
    "intervals": [
      0,
      1,
      3,
      4,
      6,
      8,
      10
    ],
    "desc": "Super Locrian - jazz dominant",
    "region": "Blues/Jazz"
  },
  "Whole Tone": {
    "intervals": [
      0,
      2,
      4,
      6,
      8,
      10
    ],
    "desc": "Dreamy, ambiguous - all whole steps",
    "region": "Blues/Jazz"
  },
  "Half-Whole Diminished": {
    "intervals": [
      0,
      1,
      3,
      4,
      6,
      7,
      9,
      10
    ],
    "desc": "Octatonic dominant scale",
    "region": "Blues/Jazz"
  },
  "Acoustic (Lydian Dominant)": {
    "intervals": [
      0,
      2,
      4,
      6,
      7,
      9,
      10
    ],
    "desc": "Bright major with flat 7th - jazz standard",
    "region": "Jazz"
  },
  "Mixolydian b6": {
    "intervals": [
      0,
      2,
      4,
      5,
      7,
      8,
      10
    ],
    "desc": "Melodic Minor mode 5",
    "region": "Jazz"
  },
  "Maqam Rast": {
    "intervals": [
      0,
      2,
      3.5,
      5,
      7,
      9,
      10.5
    ],
    "desc": "The king of Maqams - neutral 3rd and 7th",
    "region": "Arabic"
  },
  "Maqam Bayati": {
    "intervals": [
      0,
      1.5,
      3,
      5,
      7,
      8,
      10
    ],
    "desc": "Deeply emotional, starts with a neutral 2nd",
    "region": "Arabic"
  },
  "Maqam Saba": {
    "intervals": [
      0,
      1.5,
      3,
      4,
      6,
      8,
      10
    ],
    "desc": "Very dark and melancholic with a diminished 4th",
    "region": "Arabic"
  },
  "Maqam Segah": {
    "intervals": [
      0,
      1.5,
      3.5,
      5,
      7,
      8.5,
      10.5
    ],
    "desc": "Traditional Maqam starting on E-half-flat",
    "region": "Arabic"
  },
  "Maqam Hijaz Kar": {
    "intervals": [
      0,
      1,
      4,
      5,
      7,
      8,
      11
    ],
    "desc": "Double harmonic major",
    "region": "Arabic"
  },
  "Persian Scale": {
    "intervals": [
      0,
      1,
      4,
      5,
      6,
      8,
      11
    ],
    "desc": "Exotic, mysterious",
    "region": "Middle Eastern"
  },
  "Turkish Makam Hicaz": {
    "intervals": [
      0,
      1,
      4,
      5,
      7,
      8,
      10
    ],
    "desc": "Phrygian Dominant variant",
    "region": "Turkish"
  },
  "Raga Bhairav": {
    "intervals": [
      0,
      1,
      4,
      5,
      7,
      8,
      11
    ],
    "desc": "Devotional morning raga - serious",
    "region": "Indian"
  },
  "Raga Yaman": {
    "intervals": [
      0,
      2,
      4,
      6,
      7,
      9,
      11
    ],
    "desc": "Romantic evening raga - Lydian-like",
    "region": "Indian"
  },
  "Raga Bhairavi": {
    "intervals": [
      0,
      1,
      3,
      5,
      7,
      8,
      10
    ],
    "desc": "Devotional, all times",
    "region": "Indian"
  },
  "Raga Kafi": {
    "intervals": [
      0,
      2,
      3,
      5,
      7,
      9,
      10
    ],
    "desc": "Folk-like, relaxed - Dorian variant",
    "region": "Indian"
  },
  "Indian 22-Shrutis": {
    "intervals": [
      0,
      0.22,
      0.9,
      1.12,
      2.04,
      2.94,
      3.16,
      3.86,
      4.08,
      4.98,
      5.2,
      5.88,
      6.1,
      7.02,
      7.24,
      7.92,
      8.14,
      9.06,
      9.96,
      10.18,
      10.88,
      11.1
    ],
    "desc": "Ancient system of Indian classical music",
    "region": "Indian"
  },
  "Hirajoshi": {
    "intervals": [
      0,
      2,
      3,
      7,
      8
    ],
    "desc": "Traditional koto music - peaceful",
    "region": "Japanese"
  },
  "Yo Scale": {
    "intervals": [
      0,
      2,
      5,
      7,
      9
    ],
    "desc": "Cheerful folk pentatonic",
    "region": "Japanese"
  },
  "In Sen": {
    "intervals": [
      0,
      1,
      5,
      7,
      10
    ],
    "desc": "Mysterious, contemplative",
    "region": "Japanese"
  },
  "Chinese Pentatonic": {
    "intervals": [
      0,
      2,
      4,
      7,
      9
    ],
    "desc": "Traditional 5-note scale",
    "region": "Chinese"
  },
  "Mongolian": {
    "intervals": [
      0,
      2,
      4,
      7,
      9
    ],
    "desc": "Pentatonic with overtone singing",
    "region": "Mongolian"
  },
  "African Pentatonic": {
    "intervals": [
      0,
      2,
      5,
      7,
      10
    ],
    "desc": "Suspended pentatonic",
    "region": "African"
  },
  "Slendro": {
    "intervals": [
      0,
      2,
      5,
      7,
      9
    ],
    "desc": "Balanced gamelan pentatonic",
    "region": "Javanese"
  },
  "Pelog": {
    "intervals": [
      0,
      1,
      3,
      7,
      8
    ],
    "desc": "Gamelan music - mystical",
    "region": "Balinese"
  },
  "Hungarian Gypsy": {
    "intervals": [
      0,
      2,
      3,
      6,
      7,
      8,
      11
    ],
    "desc": "Fiery, passionate - raised 4th",
    "region": "European"
  },
  "Hungarian Minor": {
    "intervals": [
      0,
      2,
      3,
      6,
      7,
      8,
      11
    ],
    "desc": "Dark, dramatic - augmented intervals",
    "region": "European"
  },
  "Double Harmonic Major": {
    "intervals": [
      0,
      1,
      4,
      5,
      7,
      8,
      11
    ],
    "desc": "Byzantine/Egyptian - dual augmented 2nds",
    "region": "European"
  },
  "Dorian #4": {
    "intervals": [
      0,
      2,
      3,
      6,
      7,
      9,
      10
    ],
    "desc": "Ukrainian Dorian / Misheberak",
    "region": "European"
  },
  "Ukrainian Dorian": {
    "intervals": [
      0,
      2,
      3,
      6,
      7,
      9,
      10
    ],
    "desc": "Raised 4th Dorian",
    "region": "Ukrainian"
  },
  "Phrygian Dominant": {
    "intervals": [
      0,
      1,
      4,
      5,
      7,
      8,
      10
    ],
    "desc": "Flamenco, metal - exotic major",
    "region": "European"
  },
  "Spanish 8-Tone": {
    "intervals": [
      0,
      1,
      3,
      4,
      5,
      6,
      8,
      10
    ],
    "desc": "Flamenco with chromatics",
    "region": "Spanish"
  },
  "Jewish (Ahava Rabboh)": {
    "intervals": [
      0,
      1,
      4,
      5,
      7,
      8,
      10
    ],
    "desc": "Traditional Jewish prayer mode",
    "region": "Jewish"
  },
  "Chrom": {
    "intervals": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11
    ],
    "desc": "All 12 tones equally spaced",
    "region": "Experimental"
  },
  "24-TET Quarter Tone": {
    "intervals": [
      0,
      0.5,
      1,
      1.5,
      2,
      2.5,
      3,
      3.5,
      4,
      4.5,
      5,
      5.5,
      6,
      6.5,
      7,
      7.5,
      8,
      8.5,
      9,
      9.5,
      10,
      10.5,
      11,
      11.5
    ],
    "desc": "Full quarter-tone chromatic scale",
    "region": "Experimental"
  },
  "31-TET Chromatic": {
    "intervals": [
      0,
      0.3870967741935484,
      0.7741935483870968,
      1.161290322580645,
      1.5483870967741935,
      1.935483870967742,
      2.32258064516129,
      2.7096774193548385,
      3.096774193548387,
      3.4838709677419355,
      3.870967741935484,
      4.258064516129032,
      4.64516129032258,
      5.032258064516129,
      5.419354838709677,
      5.806451612903226,
      6.193548387096774,
      6.580645161290322,
      6.967741935483871,
      7.354838709677419,
      7.741935483870968,
      8.129032258064516,
      8.516129032258064,
      8.903225806451612,
      9.29032258064516,
      9.67741935483871,
      10.064516129032258,
      10.451612903225806,
      10.838709677419354,
      11.225806451612902,
      11.612903225806452
    ],
    "desc": "Huygens' 31-note equal temperament",
    "region": "Experimental"
  },
  "17-TET Chromatic": {
    "intervals": [
      0,
      0.71,
      1.41,
      2.12,
      2.82,
      3.53,
      4.24,
      4.94,
      5.65,
      6.35,
      7.06,
      7.76,
      8.47,
      9.18,
      9.88,
      10.59,
      11.29
    ],
    "desc": "Arabic-Turkish influenced 17-note division",
    "region": "Experimental"
  },
  "Experimental": {
    "intervals": [
      0,
      1.5,
      3,
      4.5,
      6,
      7.5,
      9,
      10.5
    ],
    "desc": "Non-standard symmetrical system",
    "region": "Experimental"
  },
  "Ionian": {
    "intervals": [
      0,
      2,
      4,
      5,
      7,
      9,
      11
    ],
    "desc": "Standard Major scale",
    "region": "Western"
  },
  "Aeolian": {
    "intervals": [
      0,
      2,
      3,
      5,
      7,
      8,
      10
    ],
    "desc": "Standard Natural Minor scale",
    "region": "Western"
  }
} as const;

export const CHORD_TEMPLATES = {
  "5": {
    "intervals": [
      0,
      7
    ],
    "symbol": "5",
    "desc": "Power chord"
  },
  "6": {
    "intervals": [
      0,
      4,
      7,
      9
    ],
    "symbol": "6",
    "desc": "Vintage jazz"
  },
  "7": {
    "intervals": [
      0,
      4,
      7,
      10
    ],
    "symbol": "7",
    "desc": "Blues, dominant"
  },
  "9": {
    "intervals": [
      0,
      4,
      7,
      10,
      14
    ],
    "symbol": "9",
    "desc": "Jazzy dominant"
  },
  "11": {
    "intervals": [
      0,
      4,
      7,
      10,
      14,
      17
    ],
    "symbol": "11",
    "desc": "Modern dominant"
  },
  "13": {
    "intervals": [
      0,
      4,
      7,
      10,
      14,
      21
    ],
    "symbol": "13",
    "desc": "Extended dominant"
  },
  "Major": {
    "intervals": [
      0,
      4,
      7
    ],
    "symbol": "",
    "desc": "Happy, stable"
  },
  "minor": {
    "intervals": [
      0,
      3,
      7
    ],
    "symbol": "m",
    "desc": "Sad, emotional"
  },
  "dim": {
    "intervals": [
      0,
      3,
      6
    ],
    "symbol": "°",
    "desc": "Tense, unstable"
  },
  "aug": {
    "intervals": [
      0,
      4,
      8
    ],
    "symbol": "+",
    "desc": "Suspended, tense"
  },
  "sus2": {
    "intervals": [
      0,
      2,
      7
    ],
    "symbol": "sus2",
    "desc": "Open, unresolved"
  },
  "maj9": {
    "intervals": [
      0,
      4,
      7,
      11,
      14
    ],
    "symbol": "maj9",
    "desc": "Lush, extended"
  },
  "min9": {
    "intervals": [
      0,
      3,
      7,
      10,
      14
    ],
    "symbol": "m9",
    "desc": "Rich minor"
  },
  "7b9": {
    "intervals": [
      0,
      4,
      7,
      10,
      13
    ],
    "symbol": "7b9",
    "desc": "Altered dominant"
  },
  "7#9": {
    "intervals": [
      0,
      4,
      7,
      10,
      15
    ],
    "symbol": "7#9",
    "desc": "Hendrix chord"
  },
  "maj11": {
    "intervals": [
      0,
      4,
      7,
      11,
      14,
      17
    ],
    "symbol": "maj11",
    "desc": "Bright extended"
  },
  "min11": {
    "intervals": [
      0,
      3,
      7,
      10,
      14,
      17
    ],
    "symbol": "m11",
    "desc": "Modern jazz minor"
  },
  "sus4": {
    "intervals": [
      0,
      5,
      7
    ],
    "symbol": "sus4",
    "desc": "Suspended"
  },
  "maj7": {
    "intervals": [
      0,
      4,
      7,
      11
    ],
    "symbol": "maj7",
    "desc": "Jazzy, sophisticated"
  },
  "min7": {
    "intervals": [
      0,
      3,
      7,
      10
    ],
    "symbol": "m7",
    "desc": "Smooth jazz"
  },
  "min7b5": {
    "intervals": [
      0,
      3,
      6,
      10
    ],
    "symbol": "m7b5",
    "desc": "Half-diminished"
  },
  "dim7": {
    "intervals": [
      0,
      3,
      6,
      9
    ],
    "symbol": "°7",
    "desc": "Fully diminished"
  },
  "add9": {
    "intervals": [
      0,
      4,
      7,
      14
    ],
    "symbol": "add9",
    "desc": "Color tone"
  },
  "min6": {
    "intervals": [
      0,
      3,
      7,
      9
    ],
    "symbol": "m6",
    "desc": "Soft minor"
  },
  "maj7#11": {
    "intervals": [
      0,
      4,
      7,
      11,
      18
    ],
    "symbol": "maj7#11",
    "desc": "Lydian beauty"
  },
  "qrt": {
    "intervals": [
      0,
      5,
      10
    ],
    "symbol": "qrt",
    "desc": "Quartal stack"
  },
  "6/9": {
    "intervals": [
      0,
      4,
      7,
      9,
      14
    ],
    "symbol": "6/9",
    "desc": "Pastoral jazz"
  },
  "9sus4": {
    "intervals": [
      0,
      5,
      7,
      10,
      14
    ],
    "symbol": "9sus4",
    "desc": "Modern jazz sus"
  },
  "bVI": {
    "intervals": [
      0,
      4,
      7
    ],
    "symbol": "bVI",
    "desc": "Flat submediant Major"
  },
  "bII": {
    "intervals": [
      0,
      4,
      7
    ],
    "symbol": "bII",
    "desc": "Neapolitan Major"
  },
  "sus2sus4": {
    "intervals": [
      0,
      2,
      5,
      7
    ],
    "symbol": "sus2/4",
    "desc": "Ambient cluster"
  },
  "mMaj7": {
    "intervals": [
      0,
      3,
      7,
      11
    ],
    "symbol": "mMaj7",
    "desc": "Hitchcock/Spy chord"
  },
  "qnt": {
    "intervals": [
      0,
      7,
      14
    ],
    "symbol": "qnt",
    "desc": "Quintal stack"
  },
  "min(add b2)": {
    "intervals": [
      0,
      1,
      3,
      7
    ],
    "symbol": "m(addb2)",
    "desc": "Dark minor"
  },
  "min(maj7)": {
    "intervals": [
      0,
      3,
      7,
      11
    ],
    "symbol": "m(maj7)",
    "desc": "Hitchcock/Spy chord"
  },
  "7alt": {
    "intervals": [
      0,
      4,
      8,
      10,
      13
    ],
    "symbol": "7alt",
    "desc": "Altered dominant"
  },
  "13sus4": {
    "intervals": [
      0,
      5,
      7,
      10,
      14,
      21
    ],
    "symbol": "13sus4",
    "desc": "Extended sus"
  },
  "b5": {
    "intervals": [
      0,
      6
    ],
    "symbol": "b5",
    "desc": "Diminished fifth"
  }
} as const;

export const PROGRESSIONS = [
  {
    "name": "I-V-vi-IV",
    "numerals": [
      "I",
      "V",
      "vi",
      "IV"
    ],
    "desc": "Pop anthem (Let It Be, With Or Without You)",
    "style": "Pop"
  },
  {
    "name": "vi-IV-I-V",
    "numerals": [
      "vi",
      "IV",
      "I",
      "V"
    ],
    "desc": "Sad progression (Someone Like You)",
    "style": "Pop"
  },
  {
    "name": "I-vi-IV-V",
    "numerals": [
      "I",
      "vi",
      "IV",
      "V"
    ],
    "desc": "50s doo-wop (Stand By Me, Blue Moon)",
    "style": "Pop"
  },
  {
    "name": "I-IV-vi-V",
    "numerals": [
      "I",
      "IV",
      "vi",
      "V"
    ],
    "desc": "Alternative pop structure",
    "style": "Pop"
  },
  {
    "name": "IV-I-V-vi",
    "numerals": [
      "IV",
      "I",
      "V",
      "vi"
    ],
    "desc": "Uplifting pop",
    "style": "Pop"
  },
  {
    "name": "vi-V-IV-V",
    "numerals": [
      "vi",
      "V",
      "IV",
      "V"
    ],
    "desc": "Emotional build",
    "style": "Pop"
  },
  {
    "name": "I-iii-vi-IV",
    "numerals": [
      "I",
      "iii",
      "vi",
      "IV"
    ],
    "desc": "Smooth soul progression",
    "style": "Pop"
  },
  {
    "name": "I-IV-V",
    "numerals": [
      "I",
      "IV",
      "V"
    ],
    "desc": "Rock foundation (Twist and Shout, La Bamba)",
    "style": "Rock"
  },
  {
    "name": "I-bVII-IV",
    "numerals": [
      "I",
      "♭VII",
      "IV"
    ],
    "desc": "Modal rock (Sweet Child O Mine)",
    "style": "Rock"
  },
  {
    "name": "I-bVII-bVI-bVII",
    "numerals": [
      "I",
      "♭VII",
      "♭VI",
      "♭VII"
    ],
    "desc": "Hard rock descent",
    "style": "Rock"
  },
  {
    "name": "i-bVI-bVII",
    "numerals": [
      "i",
      "♭VI",
      "♭VII"
    ],
    "desc": "Minor rock power",
    "style": "Rock"
  },
  {
    "name": "I-V-IV",
    "numerals": [
      "I",
      "V",
      "IV"
    ],
    "desc": "Simple rock (Louie Louie)",
    "style": "Rock"
  },
  {
    "name": "I-bIII-IV",
    "numerals": [
      "I",
      "♭III",
      "IV"
    ],
    "desc": "Alternative rock",
    "style": "Rock"
  },
  {
    "name": "vi-bVII-I",
    "numerals": [
      "vi",
      "♭VII",
      "I"
    ],
    "desc": "Minor to major lift",
    "style": "Rock"
  },
  {
    "name": "ii-V-I",
    "numerals": [
      "ii",
      "V",
      "I"
    ],
    "desc": "Jazz turnaround - most important in jazz",
    "style": "Jazz"
  },
  {
    "name": "iii-vi-ii-V-I",
    "numerals": [
      "iii",
      "vi",
      "ii",
      "V",
      "I"
    ],
    "desc": "Extended jazz turnaround",
    "style": "Jazz"
  },
  {
    "name": "I-vi-ii-V",
    "numerals": [
      "I",
      "vi",
      "ii",
      "V"
    ],
    "desc": "Jazz standard (Rhythm changes)",
    "style": "Jazz"
  },
  {
    "name": "ii-V-I-VI",
    "numerals": [
      "ii",
      "V",
      "I",
      "VI"
    ],
    "desc": "Jazz with chromatic descent",
    "style": "Jazz"
  },
  {
    "name": "iii-VI-ii-V",
    "numerals": [
      "iii",
      "VI",
      "ii",
      "V"
    ],
    "desc": "Backdoor progression",
    "style": "Jazz"
  },
  {
    "name": "I-IV-iii-vi",
    "numerals": [
      "I",
      "IV",
      "iii",
      "vi"
    ],
    "desc": "Sophisticated descent",
    "style": "Jazz"
  },
  {
    "name": "vi-ii-V-I",
    "numerals": [
      "vi",
      "ii",
      "V",
      "I"
    ],
    "desc": "Minor approach to turnaround",
    "style": "Jazz"
  },
  {
    "name": "I-#Idim-ii-V",
    "numerals": [
      "I",
      "#I°",
      "ii",
      "V"
    ],
    "desc": "Chromatic passing diminished",
    "style": "Jazz"
  },
  {
    "name": "I-IV-I-V",
    "numerals": [
      "I",
      "IV",
      "I",
      "V"
    ],
    "desc": "Blues 12-bar foundation",
    "style": "Blues"
  },
  {
    "name": "i-iv-i-V",
    "numerals": [
      "i",
      "iv",
      "i",
      "V"
    ],
    "desc": "Minor blues structure",
    "style": "Blues"
  },
  {
    "name": "I7-IV7-I7-V7",
    "numerals": [
      "I7",
      "IV7",
      "I7",
      "V7"
    ],
    "desc": "Dominant 7th blues",
    "style": "Blues"
  },
  {
    "name": "I-#IV°-ii-V",
    "numerals": [
      "I",
      "#IV°",
      "ii",
      "V"
    ],
    "desc": "Blues with passing chord",
    "style": "Blues"
  },
  {
    "name": "I-IV-I-V-I",
    "numerals": [
      "I",
      "IV",
      "I",
      "V",
      "I"
    ],
    "desc": "Perfect authentic cadence",
    "style": "Classical"
  },
  {
    "name": "I-V-vi-iii-IV-I-IV-V",
    "numerals": [
      "I",
      "V",
      "vi",
      "iii",
      "IV",
      "I",
      "IV",
      "V"
    ],
    "desc": "Canon in D (Pachelbel)",
    "style": "Classical"
  },
  {
    "name": "i-iv-VII-III",
    "numerals": [
      "i",
      "iv",
      "VII",
      "III"
    ],
    "desc": "Lament bass pattern",
    "style": "Classical"
  },
  {
    "name": "I-V-vi-IV-V",
    "numerals": [
      "I",
      "V",
      "vi",
      "IV",
      "V"
    ],
    "desc": "Deceptive resolution",
    "style": "Classical"
  },
  {
    "name": "IV-V-I",
    "numerals": [
      "IV",
      "V",
      "I"
    ],
    "desc": "Predominant to authentic cadence",
    "style": "Classical"
  },
  {
    "name": "i-bVII-bVI-V",
    "numerals": [
      "i",
      "♭VII",
      "♭VI",
      "V"
    ],
    "desc": "Andalusian cadence (Flamenco)",
    "style": "Flamenco"
  },
  {
    "name": "i-VI-III-VII",
    "numerals": [
      "i",
      "VI",
      "III",
      "VII"
    ],
    "desc": "Extended Andalusian",
    "style": "Flamenco"
  },
  {
    "name": "i-bII-i",
    "numerals": [
      "i",
      "♭II",
      "i"
    ],
    "desc": "Phrygian resolution",
    "style": "Flamenco"
  },
  {
    "name": "I-IV-I-V-IV",
    "numerals": [
      "I",
      "IV",
      "I",
      "V",
      "IV"
    ],
    "desc": "Gospel walk",
    "style": "Gospel"
  },
  {
    "name": "I-iii-IV-iv",
    "numerals": [
      "I",
      "iii",
      "IV",
      "iv"
    ],
    "desc": "Minor IV soul move",
    "style": "Soul"
  },
  {
    "name": "IV-iv-I",
    "numerals": [
      "IV",
      "iv",
      "I"
    ],
    "desc": "Major-minor shift",
    "style": "Soul"
  },
  {
    "name": "I-II-iii-IV",
    "numerals": [
      "I",
      "II",
      "iii",
      "IV"
    ],
    "desc": "Gospel chromatic rise",
    "style": "Gospel"
  },
  {
    "name": "I-V-IV-I",
    "numerals": [
      "I",
      "V",
      "IV",
      "I"
    ],
    "desc": "Country standard",
    "style": "Country"
  },
  {
    "name": "I-IV-I-IV-V",
    "numerals": [
      "I",
      "IV",
      "I",
      "IV",
      "V"
    ],
    "desc": "Folk progression",
    "style": "Folk"
  },
  {
    "name": "I-V-I-IV",
    "numerals": [
      "I",
      "V",
      "I",
      "IV"
    ],
    "desc": "Bluegrass pattern",
    "style": "Country"
  },
  {
    "name": "ii-V-iii-vi",
    "numerals": [
      "ii",
      "V",
      "iii",
      "vi"
    ],
    "desc": "R&B descent",
    "style": "R&B"
  },
  {
    "name": "i-iv-v",
    "numerals": [
      "i",
      "iv",
      "v"
    ],
    "desc": "Funky minor groove",
    "style": "Funk"
  },
  {
    "name": "I-iii-IV-V",
    "numerals": [
      "I",
      "iii",
      "IV",
      "V"
    ],
    "desc": "Smooth R&B",
    "style": "R&B"
  },
  {
    "name": "vi-V-IV-V",
    "numerals": [
      "vi",
      "V",
      "IV",
      "V"
    ],
    "desc": "EDM emotional build",
    "style": "Electronic"
  },
  {
    "name": "I-bVII-bVI-V",
    "numerals": [
      "I",
      "♭VII",
      "♭VI",
      "V"
    ],
    "desc": "Descending electronic",
    "style": "Electronic"
  },
  {
    "name": "i-v-bVII-IV",
    "numerals": [
      "i",
      "v",
      "♭VII",
      "IV"
    ],
    "desc": "Dark electronic",
    "style": "Electronic"
  },
  {
    "name": "ii-V-iii-vi",
    "numerals": [
      "ii",
      "V",
      "iii",
      "vi"
    ],
    "desc": "Bossa nova standard",
    "style": "Latin"
  },
  {
    "name": "I-vi-ii-V-I",
    "numerals": [
      "I",
      "vi",
      "ii",
      "V",
      "I"
    ],
    "desc": "Samba progression",
    "style": "Latin"
  },
  {
    "name": "i-VII-VI-V",
    "numerals": [
      "i",
      "VII",
      "VI",
      "V"
    ],
    "desc": "Minor Latin descent",
    "style": "Latin"
  },
  {
    "name": "i-bVI-bVII-i",
    "numerals": [
      "i",
      "♭VI",
      "♭VII",
      "i"
    ],
    "desc": "Metal power progression",
    "style": "Metal"
  },
  {
    "name": "i-bVII-bVI-v",
    "numerals": [
      "i",
      "♭VII",
      "♭VI",
      "v"
    ],
    "desc": "Dorian metal",
    "style": "Metal"
  },
  {
    "name": "i-iv-v-bVII",
    "numerals": [
      "i",
      "iv",
      "v",
      "♭VII"
    ],
    "desc": "Dark metal sequence",
    "style": "Metal"
  },
  {
    "name": "IV-I-V-vi",
    "numerals": [
      "IV",
      "I",
      "V",
      "vi"
    ],
    "desc": "Indie rock anthem",
    "style": "Indie"
  },
  {
    "name": "vi-IV-V-I",
    "numerals": [
      "vi",
      "IV",
      "V",
      "I"
    ],
    "desc": "Alternative resolution",
    "style": "Indie"
  },
  {
    "name": "I-V-IV-iii",
    "numerals": [
      "I",
      "V",
      "IV",
      "iii"
    ],
    "desc": "Indie descent",
    "style": "Indie"
  },
  {
    "name": "i-bVII-bVI",
    "numerals": [
      "i",
      "♭VII",
      "♭VI"
    ],
    "desc": "Aeolian modal",
    "style": "Modal"
  },
  {
    "name": "I-II-I",
    "numerals": [
      "I",
      "II",
      "I"
    ],
    "desc": "Lydian brightness",
    "style": "Modal"
  },
  {
    "name": "I-bVII-I",
    "numerals": [
      "I",
      "♭VII",
      "I"
    ],
    "desc": "Mixolydian rock",
    "style": "Modal"
  },
  {
    "name": "i-ii-i",
    "numerals": [
      "i",
      "ii",
      "i"
    ],
    "desc": "Dorian modal",
    "style": "Modal"
  },
  {
    "name": "I-bII-IV-bVII",
    "numerals": [
      "I",
      "♭II",
      "IV",
      "♭VII"
    ],
    "desc": "Chromatic exploration",
    "style": "Experimental"
  },
  {
    "name": "ii-bII-I",
    "numerals": [
      "ii",
      "♭II",
      "I"
    ],
    "desc": "Tritone substitution approach",
    "style": "Jazz Fusion"
  },
  {
    "name": "I-#IV-V-I",
    "numerals": [
      "I",
      "#IV",
      "V",
      "I"
    ],
    "desc": "Lydian dominant",
    "style": "Fusion"
  },
  {
    "name": "vi-IV-I-V",
    "numerals": [
      "vi",
      "IV",
      "I",
      "V"
    ],
    "desc": "Emotional ballad (Adele, Coldplay)",
    "style": "Ballad"
  },
  {
    "name": "i-bVI-III-bVII",
    "numerals": [
      "i",
      "♭VI",
      "III",
      "♭VII"
    ],
    "desc": "Epic minor ballad",
    "style": "Ballad"
  },
  {
    "name": "I-iii-vi-V",
    "numerals": [
      "I",
      "iii",
      "vi",
      "V"
    ],
    "desc": "Tender ballad",
    "style": "Ballad"
  },
  {
    "name": "i-bVII-bVI",
    "numerals": [
      "i",
      "♭VII",
      "♭VI"
    ],
    "desc": "Dark trap progression",
    "style": "Hip-Hop"
  },
  {
    "name": "i-v-i-IV",
    "numerals": [
      "i",
      "v",
      "i",
      "IV"
    ],
    "desc": "Minor hip-hop loop",
    "style": "Hip-Hop"
  },
  {
    "name": "i-bII-bVII-i",
    "numerals": [
      "i",
      "♭II",
      "♭VII",
      "i"
    ],
    "desc": "Middle Eastern feel",
    "style": "World"
  },
  {
    "name": "I-bII-I-V",
    "numerals": [
      "I",
      "♭II",
      "I",
      "V"
    ],
    "desc": "Exotic modal shift",
    "style": "World"
  },
  {
    "name": "vi-IV-I-V",
    "numerals": [
      "vi",
      "IV",
      "I",
      "V"
    ],
    "desc": "Epic trailer music",
    "style": "Cinematic"
  },
  {
    "name": "i-bVI-bVII-i",
    "numerals": [
      "i",
      "♭VI",
      "♭VII",
      "i"
    ],
    "desc": "Dark cinematic",
    "style": "Cinematic"
  },
  {
    "name": "I-V-vi-IV-V",
    "numerals": [
      "I",
      "V",
      "vi",
      "IV",
      "V"
    ],
    "desc": "Heroic resolution",
    "style": "Cinematic"
  }
] as const;

