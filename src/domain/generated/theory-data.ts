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

export const GENRE_LIBRARY = [
  {
    "genre": "Alternative & Indie",
    "icon": "🎸",
    "subgenres": [
      {
        "name": "Art Punk",
        "desc": "Definitive Art Punk styling, characteristic of the Alternative & Indie family.",
        "scales": [
          "Major",
          "Minor Pentatonic",
          "Mixolydian"
        ],
        "chords": [
          "Major",
          "minor",
          "7",
          "power"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Alternative Rock",
        "desc": "Definitive Alternative Rock styling, characteristic of the Alternative & Indie family.",
        "scales": [
          "Dorian",
          "Aeolian",
          "Blues"
        ],
        "chords": [
          "min7",
          "maj7",
          "min9",
          "11"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Britpunk",
        "desc": "Definitive Britpunk styling, characteristic of the Alternative & Indie family.",
        "scales": [
          "Harmonic Minor",
          "Phrygian Dominant",
          "Double Harmonic"
        ],
        "chords": [
          "power",
          "minor",
          "dim",
          "aug"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "College Rock",
        "desc": "Definitive College Rock styling, characteristic of the Alternative & Indie family.",
        "scales": [
          "Lydian",
          "Major Pentatonic",
          "Major"
        ],
        "chords": [
          "maj9",
          "sus2",
          "add9",
          "maj7"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Crossover Thrash",
        "desc": "Definitive Crossover Thrash styling, characteristic of the Alternative & Indie family.",
        "scales": [
          "Locrian",
          "Phrygian",
          "Chromatic"
        ],
        "chords": [
          "7",
          "9",
          "13",
          "7#9"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Crust Punk",
        "desc": "Definitive Crust Punk styling, characteristic of the Alternative & Indie family.",
        "scales": [
          "Melodic Minor",
          "Dorian",
          "Mixolydian"
        ],
        "chords": [
          "minor",
          "Major",
          "sus4",
          "min7"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Emo",
        "desc": "Definitive Emo styling, characteristic of the Alternative & Indie family.",
        "scales": [
          "Whole Tone",
          "Altered",
          "Lydian Dominant"
        ],
        "chords": [
          "min(maj7)",
          "dim7",
          "aug",
          "Fr+6"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Experimental Rock",
        "desc": "Definitive Experimental Rock styling, characteristic of the Alternative & Indie family.",
        "scales": [
          "Blues",
          "Minor Pentatonic",
          "Dorian"
        ],
        "chords": [
          "Major",
          "7",
          "min7",
          "sus4"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Folk Punk",
        "desc": "Definitive Folk Punk styling, characteristic of the Alternative & Indie family.",
        "scales": [
          "Aeolian",
          "Harmonic Minor",
          "Phrygian"
        ],
        "chords": [
          "power",
          "sus2",
          "min9",
          "maj7#11"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Goth Rock",
        "desc": "Definitive Goth Rock styling, characteristic of the Alternative & Indie family.",
        "scales": [
          "Major",
          "Minor Pentatonic",
          "Mixolydian"
        ],
        "chords": [
          "Major",
          "minor",
          "7",
          "power"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Grunge",
        "desc": "Definitive Grunge styling, characteristic of the Alternative & Indie family.",
        "scales": [
          "Dorian",
          "Aeolian",
          "Blues"
        ],
        "chords": [
          "min7",
          "maj7",
          "min9",
          "11"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Hardcore Punk",
        "desc": "Definitive Hardcore Punk styling, characteristic of the Alternative & Indie family.",
        "scales": [
          "Harmonic Minor",
          "Phrygian Dominant",
          "Double Harmonic"
        ],
        "chords": [
          "power",
          "minor",
          "dim",
          "aug"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Indie Rock",
        "desc": "Definitive Indie Rock styling, characteristic of the Alternative & Indie family.",
        "scales": [
          "Lydian",
          "Major Pentatonic",
          "Major"
        ],
        "chords": [
          "maj9",
          "sus2",
          "add9",
          "maj7"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Lo-fi",
        "desc": "Definitive Lo-fi styling, characteristic of the Alternative & Indie family.",
        "scales": [
          "Locrian",
          "Phrygian",
          "Chromatic"
        ],
        "chords": [
          "7",
          "9",
          "13",
          "7#9"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "New Wave",
        "desc": "Definitive New Wave styling, characteristic of the Alternative & Indie family.",
        "scales": [
          "Melodic Minor",
          "Dorian",
          "Mixolydian"
        ],
        "chords": [
          "minor",
          "Major",
          "sus4",
          "min7"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Post-Punk",
        "desc": "Definitive Post-Punk styling, characteristic of the Alternative & Indie family.",
        "scales": [
          "Whole Tone",
          "Altered",
          "Lydian Dominant"
        ],
        "chords": [
          "min(maj7)",
          "dim7",
          "aug",
          "Fr+6"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Post-Rock",
        "desc": "Definitive Post-Rock styling, characteristic of the Alternative & Indie family.",
        "scales": [
          "Blues",
          "Minor Pentatonic",
          "Dorian"
        ],
        "chords": [
          "Major",
          "7",
          "min7",
          "sus4"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Shoegaze",
        "desc": "Definitive Shoegaze styling, characteristic of the Alternative & Indie family.",
        "scales": [
          "Aeolian",
          "Harmonic Minor",
          "Phrygian"
        ],
        "chords": [
          "power",
          "sus2",
          "min9",
          "maj7#11"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Steampunk",
        "desc": "Definitive Steampunk styling, characteristic of the Alternative & Indie family.",
        "scales": [
          "Major",
          "Minor Pentatonic",
          "Mixolydian"
        ],
        "chords": [
          "Major",
          "minor",
          "7",
          "power"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Math Rock",
        "desc": "Definitive Math Rock styling, characteristic of the Alternative & Indie family.",
        "scales": [
          "Dorian",
          "Aeolian",
          "Blues"
        ],
        "chords": [
          "min7",
          "maj7",
          "min9",
          "11"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Space Rock",
        "desc": "Definitive Space Rock styling, characteristic of the Alternative & Indie family.",
        "scales": [
          "Harmonic Minor",
          "Phrygian Dominant",
          "Double Harmonic"
        ],
        "chords": [
          "power",
          "minor",
          "dim",
          "aug"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Noise Rock",
        "desc": "Definitive Noise Rock styling, characteristic of the Alternative & Indie family.",
        "scales": [
          "Lydian",
          "Major Pentatonic",
          "Major"
        ],
        "chords": [
          "maj9",
          "sus2",
          "add9",
          "maj7"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Jangle Pop",
        "desc": "Definitive Jangle Pop styling, characteristic of the Alternative & Indie family.",
        "scales": [
          "Locrian",
          "Phrygian",
          "Chromatic"
        ],
        "chords": [
          "7",
          "9",
          "13",
          "7#9"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Dream Pop",
        "desc": "Definitive Dream Pop styling, characteristic of the Alternative & Indie family.",
        "scales": [
          "Melodic Minor",
          "Dorian",
          "Mixolydian"
        ],
        "chords": [
          "minor",
          "Major",
          "sus4",
          "min7"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Twee Pop",
        "desc": "Definitive Twee Pop styling, characteristic of the Alternative & Indie family.",
        "scales": [
          "Whole Tone",
          "Altered",
          "Lydian Dominant"
        ],
        "chords": [
          "min(maj7)",
          "dim7",
          "aug",
          "Fr+6"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Slowcore",
        "desc": "Definitive Slowcore styling, characteristic of the Alternative & Indie family.",
        "scales": [
          "Blues",
          "Minor Pentatonic",
          "Dorian"
        ],
        "chords": [
          "Major",
          "7",
          "min7",
          "sus4"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Sadcore",
        "desc": "Definitive Sadcore styling, characteristic of the Alternative & Indie family.",
        "scales": [
          "Aeolian",
          "Harmonic Minor",
          "Phrygian"
        ],
        "chords": [
          "power",
          "sus2",
          "min9",
          "maj7#11"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Riot Grrrl",
        "desc": "Definitive Riot Grrrl styling, characteristic of the Alternative & Indie family.",
        "scales": [
          "Major",
          "Minor Pentatonic",
          "Mixolydian"
        ],
        "chords": [
          "Major",
          "minor",
          "7",
          "power"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Post-Hardcore",
        "desc": "Definitive Post-Hardcore styling, characteristic of the Alternative & Indie family.",
        "scales": [
          "Dorian",
          "Aeolian",
          "Blues"
        ],
        "chords": [
          "min7",
          "maj7",
          "min9",
          "11"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Screamo",
        "desc": "Definitive Screamo styling, characteristic of the Alternative & Indie family.",
        "scales": [
          "Harmonic Minor",
          "Phrygian Dominant",
          "Double Harmonic"
        ],
        "chords": [
          "power",
          "minor",
          "dim",
          "aug"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Emoviolence",
        "desc": "Definitive Emoviolence styling, characteristic of the Alternative & Indie family.",
        "scales": [
          "Lydian",
          "Major Pentatonic",
          "Major"
        ],
        "chords": [
          "maj9",
          "sus2",
          "add9",
          "maj7"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Skate Punk",
        "desc": "Definitive Skate Punk styling, characteristic of the Alternative & Indie family.",
        "scales": [
          "Locrian",
          "Phrygian",
          "Chromatic"
        ],
        "chords": [
          "7",
          "9",
          "13",
          "7#9"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Pop Punk",
        "desc": "Definitive Pop Punk styling, characteristic of the Alternative & Indie family.",
        "scales": [
          "Melodic Minor",
          "Dorian",
          "Mixolydian"
        ],
        "chords": [
          "minor",
          "Major",
          "sus4",
          "min7"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Melodic Hardcore",
        "desc": "Definitive Melodic Hardcore styling, characteristic of the Alternative & Indie family.",
        "scales": [
          "Whole Tone",
          "Altered",
          "Lydian Dominant"
        ],
        "chords": [
          "min(maj7)",
          "dim7",
          "aug",
          "Fr+6"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Metalcore",
        "desc": "Definitive Metalcore styling, characteristic of the Alternative & Indie family.",
        "scales": [
          "Blues",
          "Minor Pentatonic",
          "Dorian"
        ],
        "chords": [
          "Major",
          "7",
          "min7",
          "sus4"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Deathcore",
        "desc": "Definitive Deathcore styling, characteristic of the Alternative & Indie family.",
        "scales": [
          "Aeolian",
          "Harmonic Minor",
          "Phrygian"
        ],
        "chords": [
          "power",
          "sus2",
          "min9",
          "maj7#11"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Nintendocore",
        "desc": "Definitive Nintendocore styling, characteristic of the Alternative & Indie family.",
        "scales": [
          "Major",
          "Minor Pentatonic",
          "Mixolydian"
        ],
        "chords": [
          "Major",
          "minor",
          "7",
          "power"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Nerdcore",
        "desc": "Definitive Nerdcore styling, characteristic of the Alternative & Indie family.",
        "scales": [
          "Dorian",
          "Aeolian",
          "Blues"
        ],
        "chords": [
          "min7",
          "maj7",
          "min9",
          "11"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Geek Rock",
        "desc": "Definitive Geek Rock styling, characteristic of the Alternative & Indie family.",
        "scales": [
          "Harmonic Minor",
          "Phrygian Dominant",
          "Double Harmonic"
        ],
        "chords": [
          "power",
          "minor",
          "dim",
          "aug"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Wizard Rock",
        "desc": "Definitive Wizard Rock styling, characteristic of the Alternative & Indie family.",
        "scales": [
          "Lydian",
          "Major Pentatonic",
          "Major"
        ],
        "chords": [
          "maj9",
          "sus2",
          "add9",
          "maj7"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      }
    ]
  },
  {
    "genre": "Blues",
    "icon": "🎹",
    "subgenres": [
      {
        "name": "Acoustic Blues",
        "desc": "Definitive Acoustic Blues styling, characteristic of the Blues family.",
        "scales": [
          "Dorian",
          "Aeolian",
          "Blues"
        ],
        "chords": [
          "min7",
          "maj7",
          "min9",
          "11"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "African Blues",
        "desc": "Definitive African Blues styling, characteristic of the Blues family.",
        "scales": [
          "Harmonic Minor",
          "Phrygian Dominant",
          "Double Harmonic"
        ],
        "chords": [
          "power",
          "minor",
          "dim",
          "aug"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Blues Rock",
        "desc": "Definitive Blues Rock styling, characteristic of the Blues family.",
        "scales": [
          "Lydian",
          "Major Pentatonic",
          "Major"
        ],
        "chords": [
          "maj9",
          "sus2",
          "add9",
          "maj7"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Blues Shouter",
        "desc": "Definitive Blues Shouter styling, characteristic of the Blues family.",
        "scales": [
          "Locrian",
          "Phrygian",
          "Chromatic"
        ],
        "chords": [
          "7",
          "9",
          "13",
          "7#9"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "British Blues",
        "desc": "Definitive British Blues styling, characteristic of the Blues family.",
        "scales": [
          "Melodic Minor",
          "Dorian",
          "Mixolydian"
        ],
        "chords": [
          "minor",
          "Major",
          "sus4",
          "min7"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Canadian Blues",
        "desc": "Definitive Canadian Blues styling, characteristic of the Blues family.",
        "scales": [
          "Whole Tone",
          "Altered",
          "Lydian Dominant"
        ],
        "chords": [
          "min(maj7)",
          "dim7",
          "aug",
          "Fr+6"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Chicago Blues",
        "desc": "Definitive Chicago Blues styling, characteristic of the Blues family.",
        "scales": [
          "Blues",
          "Minor Pentatonic",
          "Dorian"
        ],
        "chords": [
          "Major",
          "7",
          "min7",
          "sus4"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Classic Blues",
        "desc": "Definitive Classic Blues styling, characteristic of the Blues family.",
        "scales": [
          "Aeolian",
          "Harmonic Minor",
          "Phrygian"
        ],
        "chords": [
          "power",
          "sus2",
          "min9",
          "maj7#11"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Contemporary Blues",
        "desc": "Definitive Contemporary Blues styling, characteristic of the Blues family.",
        "scales": [
          "Major",
          "Minor Pentatonic",
          "Mixolydian"
        ],
        "chords": [
          "Major",
          "minor",
          "7",
          "power"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Country Blues",
        "desc": "Definitive Country Blues styling, characteristic of the Blues family.",
        "scales": [
          "Dorian",
          "Aeolian",
          "Blues"
        ],
        "chords": [
          "min7",
          "maj7",
          "min9",
          "11"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Delta Blues",
        "desc": "Definitive Delta Blues styling, characteristic of the Blues family.",
        "scales": [
          "Harmonic Minor",
          "Phrygian Dominant",
          "Double Harmonic"
        ],
        "chords": [
          "power",
          "minor",
          "dim",
          "aug"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Detroit Blues",
        "desc": "Definitive Detroit Blues styling, characteristic of the Blues family.",
        "scales": [
          "Lydian",
          "Major Pentatonic",
          "Major"
        ],
        "chords": [
          "maj9",
          "sus2",
          "add9",
          "maj7"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Doom Blues",
        "desc": "Definitive Doom Blues styling, characteristic of the Blues family.",
        "scales": [
          "Locrian",
          "Phrygian",
          "Chromatic"
        ],
        "chords": [
          "7",
          "9",
          "13",
          "7#9"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Electric Blues",
        "desc": "Definitive Electric Blues styling, characteristic of the Blues family.",
        "scales": [
          "Melodic Minor",
          "Dorian",
          "Mixolydian"
        ],
        "chords": [
          "minor",
          "Major",
          "sus4",
          "min7"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Folk Blues",
        "desc": "Definitive Folk Blues styling, characteristic of the Blues family.",
        "scales": [
          "Whole Tone",
          "Altered",
          "Lydian Dominant"
        ],
        "chords": [
          "min(maj7)",
          "dim7",
          "aug",
          "Fr+6"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Gospel Blues",
        "desc": "Definitive Gospel Blues styling, characteristic of the Blues family.",
        "scales": [
          "Blues",
          "Minor Pentatonic",
          "Dorian"
        ],
        "chords": [
          "Major",
          "7",
          "min7",
          "sus4"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Harmonica Blues",
        "desc": "Definitive Harmonica Blues styling, characteristic of the Blues family.",
        "scales": [
          "Aeolian",
          "Harmonic Minor",
          "Phrygian"
        ],
        "chords": [
          "power",
          "sus2",
          "min9",
          "maj7#11"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Hill Country Blues",
        "desc": "Definitive Hill Country Blues styling, characteristic of the Blues family.",
        "scales": [
          "Major",
          "Minor Pentatonic",
          "Mixolydian"
        ],
        "chords": [
          "Major",
          "minor",
          "7",
          "power"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Hokum Blues",
        "desc": "Definitive Hokum Blues styling, characteristic of the Blues family.",
        "scales": [
          "Dorian",
          "Aeolian",
          "Blues"
        ],
        "chords": [
          "min7",
          "maj7",
          "min9",
          "11"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Jazz Blues",
        "desc": "Definitive Jazz Blues styling, characteristic of the Blues family.",
        "scales": [
          "Harmonic Minor",
          "Phrygian Dominant",
          "Double Harmonic"
        ],
        "chords": [
          "power",
          "minor",
          "dim",
          "aug"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Jump Blues",
        "desc": "Definitive Jump Blues styling, characteristic of the Blues family.",
        "scales": [
          "Lydian",
          "Major Pentatonic",
          "Major"
        ],
        "chords": [
          "maj9",
          "sus2",
          "add9",
          "maj7"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Kansas City Blues",
        "desc": "Definitive Kansas City Blues styling, characteristic of the Blues family.",
        "scales": [
          "Locrian",
          "Phrygian",
          "Chromatic"
        ],
        "chords": [
          "7",
          "9",
          "13",
          "7#9"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Louisiana Blues",
        "desc": "Definitive Louisiana Blues styling, characteristic of the Blues family.",
        "scales": [
          "Melodic Minor",
          "Dorian",
          "Mixolydian"
        ],
        "chords": [
          "minor",
          "Major",
          "sus4",
          "min7"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Memphis Blues",
        "desc": "Definitive Memphis Blues styling, characteristic of the Blues family.",
        "scales": [
          "Whole Tone",
          "Altered",
          "Lydian Dominant"
        ],
        "chords": [
          "min(maj7)",
          "dim7",
          "aug",
          "Fr+6"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Modern Blues",
        "desc": "Definitive Modern Blues styling, characteristic of the Blues family.",
        "scales": [
          "Blues",
          "Minor Pentatonic",
          "Dorian"
        ],
        "chords": [
          "Major",
          "7",
          "min7",
          "sus4"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "New Orleans Blues",
        "desc": "Definitive New Orleans Blues styling, characteristic of the Blues family.",
        "scales": [
          "Aeolian",
          "Harmonic Minor",
          "Phrygian"
        ],
        "chords": [
          "power",
          "sus2",
          "min9",
          "maj7#11"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "NY Blues",
        "desc": "Definitive NY Blues styling, characteristic of the Blues family.",
        "scales": [
          "Major",
          "Minor Pentatonic",
          "Mixolydian"
        ],
        "chords": [
          "Major",
          "minor",
          "7",
          "power"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Piano Blues",
        "desc": "Definitive Piano Blues styling, characteristic of the Blues family.",
        "scales": [
          "Dorian",
          "Aeolian",
          "Blues"
        ],
        "chords": [
          "min7",
          "maj7",
          "min9",
          "11"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Piedmont Blues",
        "desc": "Definitive Piedmont Blues styling, characteristic of the Blues family.",
        "scales": [
          "Harmonic Minor",
          "Phrygian Dominant",
          "Double Harmonic"
        ],
        "chords": [
          "power",
          "minor",
          "dim",
          "aug"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Punk Blues",
        "desc": "Definitive Punk Blues styling, characteristic of the Blues family.",
        "scales": [
          "Lydian",
          "Major Pentatonic",
          "Major"
        ],
        "chords": [
          "maj9",
          "sus2",
          "add9",
          "maj7"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Ragtime Blues",
        "desc": "Definitive Ragtime Blues styling, characteristic of the Blues family.",
        "scales": [
          "Locrian",
          "Phrygian",
          "Chromatic"
        ],
        "chords": [
          "7",
          "9",
          "13",
          "7#9"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Rhythm & Blues",
        "desc": "Definitive Rhythm & Blues styling, characteristic of the Blues family.",
        "scales": [
          "Melodic Minor",
          "Dorian",
          "Mixolydian"
        ],
        "chords": [
          "minor",
          "Major",
          "sus4",
          "min7"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Soul Blues",
        "desc": "Definitive Soul Blues styling, characteristic of the Blues family.",
        "scales": [
          "Whole Tone",
          "Altered",
          "Lydian Dominant"
        ],
        "chords": [
          "min(maj7)",
          "dim7",
          "aug",
          "Fr+6"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "St. Louis Blues",
        "desc": "Definitive St. Louis Blues styling, characteristic of the Blues family.",
        "scales": [
          "Blues",
          "Minor Pentatonic",
          "Dorian"
        ],
        "chords": [
          "Major",
          "7",
          "min7",
          "sus4"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Swamp Blues",
        "desc": "Definitive Swamp Blues styling, characteristic of the Blues family.",
        "scales": [
          "Aeolian",
          "Harmonic Minor",
          "Phrygian"
        ],
        "chords": [
          "power",
          "sus2",
          "min9",
          "maj7#11"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Texas Blues",
        "desc": "Definitive Texas Blues styling, characteristic of the Blues family.",
        "scales": [
          "Major",
          "Minor Pentatonic",
          "Mixolydian"
        ],
        "chords": [
          "Major",
          "minor",
          "7",
          "power"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Urban Blues",
        "desc": "Definitive Urban Blues styling, characteristic of the Blues family.",
        "scales": [
          "Dorian",
          "Aeolian",
          "Blues"
        ],
        "chords": [
          "min7",
          "maj7",
          "min9",
          "11"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "West Coast Blues",
        "desc": "Definitive West Coast Blues styling, characteristic of the Blues family.",
        "scales": [
          "Harmonic Minor",
          "Phrygian Dominant",
          "Double Harmonic"
        ],
        "chords": [
          "power",
          "minor",
          "dim",
          "aug"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Zydeco",
        "desc": "Definitive Zydeco styling, characteristic of the Blues family.",
        "scales": [
          "Lydian",
          "Major Pentatonic",
          "Major"
        ],
        "chords": [
          "maj9",
          "sus2",
          "add9",
          "maj7"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      }
    ]
  },
  {
    "genre": "Classical & Cinematic",
    "icon": "🥁",
    "subgenres": [
      {
        "name": "Avant-Garde",
        "desc": "Definitive Avant-Garde styling, characteristic of the Classical & Cinematic family.",
        "scales": [
          "Harmonic Minor",
          "Phrygian Dominant",
          "Double Harmonic"
        ],
        "chords": [
          "power",
          "minor",
          "dim",
          "aug"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Ballet",
        "desc": "Definitive Ballet styling, characteristic of the Classical & Cinematic family.",
        "scales": [
          "Lydian",
          "Major Pentatonic",
          "Major"
        ],
        "chords": [
          "maj9",
          "sus2",
          "add9",
          "maj7"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Baroque",
        "desc": "Definitive Baroque styling, characteristic of the Classical & Cinematic family.",
        "scales": [
          "Locrian",
          "Phrygian",
          "Chromatic"
        ],
        "chords": [
          "7",
          "9",
          "13",
          "7#9"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Cantata",
        "desc": "Definitive Cantata styling, characteristic of the Classical & Cinematic family.",
        "scales": [
          "Melodic Minor",
          "Dorian",
          "Mixolydian"
        ],
        "chords": [
          "minor",
          "Major",
          "sus4",
          "min7"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Chamber Music",
        "desc": "Definitive Chamber Music styling, characteristic of the Classical & Cinematic family.",
        "scales": [
          "Whole Tone",
          "Altered",
          "Lydian Dominant"
        ],
        "chords": [
          "min(maj7)",
          "dim7",
          "aug",
          "Fr+6"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Chant",
        "desc": "Definitive Chant styling, characteristic of the Classical & Cinematic family.",
        "scales": [
          "Blues",
          "Minor Pentatonic",
          "Dorian"
        ],
        "chords": [
          "Major",
          "7",
          "min7",
          "sus4"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Choral",
        "desc": "Definitive Choral styling, characteristic of the Classical & Cinematic family.",
        "scales": [
          "Aeolian",
          "Harmonic Minor",
          "Phrygian"
        ],
        "chords": [
          "power",
          "sus2",
          "min9",
          "maj7#11"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Classical Crossover",
        "desc": "Definitive Classical Crossover styling, characteristic of the Classical & Cinematic family.",
        "scales": [
          "Major",
          "Minor Pentatonic",
          "Mixolydian"
        ],
        "chords": [
          "Major",
          "minor",
          "7",
          "power"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Concerto",
        "desc": "Definitive Concerto styling, characteristic of the Classical & Cinematic family.",
        "scales": [
          "Dorian",
          "Aeolian",
          "Blues"
        ],
        "chords": [
          "min7",
          "maj7",
          "min9",
          "11"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Contemporary Classical",
        "desc": "Definitive Contemporary Classical styling, characteristic of the Classical & Cinematic family.",
        "scales": [
          "Harmonic Minor",
          "Phrygian Dominant",
          "Double Harmonic"
        ],
        "chords": [
          "power",
          "minor",
          "dim",
          "aug"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Early Music",
        "desc": "Definitive Early Music styling, characteristic of the Classical & Cinematic family.",
        "scales": [
          "Lydian",
          "Major Pentatonic",
          "Major"
        ],
        "chords": [
          "maj9",
          "sus2",
          "add9",
          "maj7"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Expressionist",
        "desc": "Definitive Expressionist styling, characteristic of the Classical & Cinematic family.",
        "scales": [
          "Locrian",
          "Phrygian",
          "Chromatic"
        ],
        "chords": [
          "7",
          "9",
          "13",
          "7#9"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "High Classical",
        "desc": "Definitive High Classical styling, characteristic of the Classical & Cinematic family.",
        "scales": [
          "Melodic Minor",
          "Dorian",
          "Mixolydian"
        ],
        "chords": [
          "minor",
          "Major",
          "sus4",
          "min7"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Impressionist",
        "desc": "Definitive Impressionist styling, characteristic of the Classical & Cinematic family.",
        "scales": [
          "Whole Tone",
          "Altered",
          "Lydian Dominant"
        ],
        "chords": [
          "min(maj7)",
          "dim7",
          "aug",
          "Fr+6"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Mass",
        "desc": "Definitive Mass styling, characteristic of the Classical & Cinematic family.",
        "scales": [
          "Blues",
          "Minor Pentatonic",
          "Dorian"
        ],
        "chords": [
          "Major",
          "7",
          "min7",
          "sus4"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Requiem",
        "desc": "Definitive Requiem styling, characteristic of the Classical & Cinematic family.",
        "scales": [
          "Aeolian",
          "Harmonic Minor",
          "Phrygian"
        ],
        "chords": [
          "power",
          "sus2",
          "min9",
          "maj7#11"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Medieval",
        "desc": "Definitive Medieval styling, characteristic of the Classical & Cinematic family.",
        "scales": [
          "Major",
          "Minor Pentatonic",
          "Mixolydian"
        ],
        "chords": [
          "Major",
          "minor",
          "7",
          "power"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Minimalism",
        "desc": "Definitive Minimalism styling, characteristic of the Classical & Cinematic family.",
        "scales": [
          "Dorian",
          "Aeolian",
          "Blues"
        ],
        "chords": [
          "min7",
          "maj7",
          "min9",
          "11"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Modern Composition",
        "desc": "Definitive Modern Composition styling, characteristic of the Classical & Cinematic family.",
        "scales": [
          "Harmonic Minor",
          "Phrygian Dominant",
          "Double Harmonic"
        ],
        "chords": [
          "power",
          "minor",
          "dim",
          "aug"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Opera",
        "desc": "Definitive Opera styling, characteristic of the Classical & Cinematic family.",
        "scales": [
          "Lydian",
          "Major Pentatonic",
          "Major"
        ],
        "chords": [
          "maj9",
          "sus2",
          "add9",
          "maj7"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Oratorio",
        "desc": "Definitive Oratorio styling, characteristic of the Classical & Cinematic family.",
        "scales": [
          "Locrian",
          "Phrygian",
          "Chromatic"
        ],
        "chords": [
          "7",
          "9",
          "13",
          "7#9"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Orchestral",
        "desc": "Definitive Orchestral styling, characteristic of the Classical & Cinematic family.",
        "scales": [
          "Melodic Minor",
          "Dorian",
          "Mixolydian"
        ],
        "chords": [
          "minor",
          "Major",
          "sus4",
          "min7"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Organum",
        "desc": "Definitive Organum styling, characteristic of the Classical & Cinematic family.",
        "scales": [
          "Whole Tone",
          "Altered",
          "Lydian Dominant"
        ],
        "chords": [
          "min(maj7)",
          "dim7",
          "aug",
          "Fr+6"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Renaissance",
        "desc": "Definitive Renaissance styling, characteristic of the Classical & Cinematic family.",
        "scales": [
          "Blues",
          "Minor Pentatonic",
          "Dorian"
        ],
        "chords": [
          "Major",
          "7",
          "min7",
          "sus4"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Romantic",
        "desc": "Definitive Romantic styling, characteristic of the Classical & Cinematic family.",
        "scales": [
          "Aeolian",
          "Harmonic Minor",
          "Phrygian"
        ],
        "chords": [
          "power",
          "sus2",
          "min9",
          "maj7#11"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Sonata",
        "desc": "Definitive Sonata styling, characteristic of the Classical & Cinematic family.",
        "scales": [
          "Major",
          "Minor Pentatonic",
          "Mixolydian"
        ],
        "chords": [
          "Major",
          "minor",
          "7",
          "power"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Symphonic",
        "desc": "Definitive Symphonic styling, characteristic of the Classical & Cinematic family.",
        "scales": [
          "Dorian",
          "Aeolian",
          "Blues"
        ],
        "chords": [
          "min7",
          "maj7",
          "min9",
          "11"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Symphony",
        "desc": "Definitive Symphony styling, characteristic of the Classical & Cinematic family.",
        "scales": [
          "Harmonic Minor",
          "Phrygian Dominant",
          "Double Harmonic"
        ],
        "chords": [
          "power",
          "minor",
          "dim",
          "aug"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Twelve-tone",
        "desc": "Definitive Twelve-tone styling, characteristic of the Classical & Cinematic family.",
        "scales": [
          "Lydian",
          "Major Pentatonic",
          "Major"
        ],
        "chords": [
          "maj9",
          "sus2",
          "add9",
          "maj7"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Wedding Music",
        "desc": "Definitive Wedding Music styling, characteristic of the Classical & Cinematic family.",
        "scales": [
          "Locrian",
          "Phrygian",
          "Chromatic"
        ],
        "chords": [
          "7",
          "9",
          "13",
          "7#9"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Epic Trailer",
        "desc": "Definitive Epic Trailer styling, characteristic of the Classical & Cinematic family.",
        "scales": [
          "Melodic Minor",
          "Dorian",
          "Mixolydian"
        ],
        "chords": [
          "minor",
          "Major",
          "sus4",
          "min7"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Horror Score",
        "desc": "Definitive Horror Score styling, characteristic of the Classical & Cinematic family.",
        "scales": [
          "Whole Tone",
          "Altered",
          "Lydian Dominant"
        ],
        "chords": [
          "min(maj7)",
          "dim7",
          "aug",
          "Fr+6"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Fantasy Score",
        "desc": "Definitive Fantasy Score styling, characteristic of the Classical & Cinematic family.",
        "scales": [
          "Blues",
          "Minor Pentatonic",
          "Dorian"
        ],
        "chords": [
          "Major",
          "7",
          "min7",
          "sus4"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Sci-Fi Score",
        "desc": "Definitive Sci-Fi Score styling, characteristic of the Classical & Cinematic family.",
        "scales": [
          "Aeolian",
          "Harmonic Minor",
          "Phrygian"
        ],
        "chords": [
          "power",
          "sus2",
          "min9",
          "maj7#11"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Video Game Score",
        "desc": "Definitive Video Game Score styling, characteristic of the Classical & Cinematic family.",
        "scales": [
          "Major",
          "Minor Pentatonic",
          "Mixolydian"
        ],
        "chords": [
          "Major",
          "minor",
          "7",
          "power"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Chiptune Score",
        "desc": "Definitive Chiptune Score styling, characteristic of the Classical & Cinematic family.",
        "scales": [
          "Dorian",
          "Aeolian",
          "Blues"
        ],
        "chords": [
          "min7",
          "maj7",
          "min9",
          "11"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Anime Score",
        "desc": "Definitive Anime Score styling, characteristic of the Classical & Cinematic family.",
        "scales": [
          "Harmonic Minor",
          "Phrygian Dominant",
          "Double Harmonic"
        ],
        "chords": [
          "power",
          "minor",
          "dim",
          "aug"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Film Noir Score",
        "desc": "Definitive Film Noir Score styling, characteristic of the Classical & Cinematic family.",
        "scales": [
          "Lydian",
          "Major Pentatonic",
          "Major"
        ],
        "chords": [
          "maj9",
          "sus2",
          "add9",
          "maj7"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      }
    ]
  },
  {
    "genre": "Country & Folk",
    "icon": "🎷",
    "subgenres": [
      {
        "name": "Alternative Country",
        "desc": "Definitive Alternative Country styling, characteristic of the Country & Folk family.",
        "scales": [
          "Lydian",
          "Major Pentatonic",
          "Major"
        ],
        "chords": [
          "maj9",
          "sus2",
          "add9",
          "maj7"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Americana",
        "desc": "Definitive Americana styling, characteristic of the Country & Folk family.",
        "scales": [
          "Locrian",
          "Phrygian",
          "Chromatic"
        ],
        "chords": [
          "7",
          "9",
          "13",
          "7#9"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Australian Country",
        "desc": "Definitive Australian Country styling, characteristic of the Country & Folk family.",
        "scales": [
          "Melodic Minor",
          "Dorian",
          "Mixolydian"
        ],
        "chords": [
          "minor",
          "Major",
          "sus4",
          "min7"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Bakersfield Sound",
        "desc": "Definitive Bakersfield Sound styling, characteristic of the Country & Folk family.",
        "scales": [
          "Whole Tone",
          "Altered",
          "Lydian Dominant"
        ],
        "chords": [
          "min(maj7)",
          "dim7",
          "aug",
          "Fr+6"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Bluegrass",
        "desc": "Definitive Bluegrass styling, characteristic of the Country & Folk family.",
        "scales": [
          "Blues",
          "Minor Pentatonic",
          "Dorian"
        ],
        "chords": [
          "Major",
          "7",
          "min7",
          "sus4"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Blues Country",
        "desc": "Definitive Blues Country styling, characteristic of the Country & Folk family.",
        "scales": [
          "Aeolian",
          "Harmonic Minor",
          "Phrygian"
        ],
        "chords": [
          "power",
          "sus2",
          "min9",
          "maj7#11"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Cajun",
        "desc": "Definitive Cajun styling, characteristic of the Country & Folk family.",
        "scales": [
          "Major",
          "Minor Pentatonic",
          "Mixolydian"
        ],
        "chords": [
          "Major",
          "minor",
          "7",
          "power"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Christian Country",
        "desc": "Definitive Christian Country styling, characteristic of the Country & Folk family.",
        "scales": [
          "Dorian",
          "Aeolian",
          "Blues"
        ],
        "chords": [
          "min7",
          "maj7",
          "min9",
          "11"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Classic Country",
        "desc": "Definitive Classic Country styling, characteristic of the Country & Folk family.",
        "scales": [
          "Harmonic Minor",
          "Phrygian Dominant",
          "Double Harmonic"
        ],
        "chords": [
          "power",
          "minor",
          "dim",
          "aug"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Close Harmony",
        "desc": "Definitive Close Harmony styling, characteristic of the Country & Folk family.",
        "scales": [
          "Lydian",
          "Major Pentatonic",
          "Major"
        ],
        "chords": [
          "maj9",
          "sus2",
          "add9",
          "maj7"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Contemporary Bluegrass",
        "desc": "Definitive Contemporary Bluegrass styling, characteristic of the Country & Folk family.",
        "scales": [
          "Locrian",
          "Phrygian",
          "Chromatic"
        ],
        "chords": [
          "7",
          "9",
          "13",
          "7#9"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Contemporary Country",
        "desc": "Definitive Contemporary Country styling, characteristic of the Country & Folk family.",
        "scales": [
          "Melodic Minor",
          "Dorian",
          "Mixolydian"
        ],
        "chords": [
          "minor",
          "Major",
          "sus4",
          "min7"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Country Gospel",
        "desc": "Definitive Country Gospel styling, characteristic of the Country & Folk family.",
        "scales": [
          "Whole Tone",
          "Altered",
          "Lydian Dominant"
        ],
        "chords": [
          "min(maj7)",
          "dim7",
          "aug",
          "Fr+6"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Country Pop",
        "desc": "Definitive Country Pop styling, characteristic of the Country & Folk family.",
        "scales": [
          "Blues",
          "Minor Pentatonic",
          "Dorian"
        ],
        "chords": [
          "Major",
          "7",
          "min7",
          "sus4"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Country Rap",
        "desc": "Definitive Country Rap styling, characteristic of the Country & Folk family.",
        "scales": [
          "Aeolian",
          "Harmonic Minor",
          "Phrygian"
        ],
        "chords": [
          "power",
          "sus2",
          "min9",
          "maj7#11"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Country Rock",
        "desc": "Definitive Country Rock styling, characteristic of the Country & Folk family.",
        "scales": [
          "Major",
          "Minor Pentatonic",
          "Mixolydian"
        ],
        "chords": [
          "Major",
          "minor",
          "7",
          "power"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Country Soul",
        "desc": "Definitive Country Soul styling, characteristic of the Country & Folk family.",
        "scales": [
          "Dorian",
          "Aeolian",
          "Blues"
        ],
        "chords": [
          "min7",
          "maj7",
          "min9",
          "11"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Cowboy",
        "desc": "Definitive Cowboy styling, characteristic of the Country & Folk family.",
        "scales": [
          "Harmonic Minor",
          "Phrygian Dominant",
          "Double Harmonic"
        ],
        "chords": [
          "power",
          "minor",
          "dim",
          "aug"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Western",
        "desc": "Definitive Western styling, characteristic of the Country & Folk family.",
        "scales": [
          "Lydian",
          "Major Pentatonic",
          "Major"
        ],
        "chords": [
          "maj9",
          "sus2",
          "add9",
          "maj7"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Cowpunk",
        "desc": "Definitive Cowpunk styling, characteristic of the Country & Folk family.",
        "scales": [
          "Locrian",
          "Phrygian",
          "Chromatic"
        ],
        "chords": [
          "7",
          "9",
          "13",
          "7#9"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Dansband",
        "desc": "Definitive Dansband styling, characteristic of the Country & Folk family.",
        "scales": [
          "Melodic Minor",
          "Dorian",
          "Mixolydian"
        ],
        "chords": [
          "minor",
          "Major",
          "sus4",
          "min7"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Honky Tonk",
        "desc": "Definitive Honky Tonk styling, characteristic of the Country & Folk family.",
        "scales": [
          "Whole Tone",
          "Altered",
          "Lydian Dominant"
        ],
        "chords": [
          "min(maj7)",
          "dim7",
          "aug",
          "Fr+6"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Franco-Country",
        "desc": "Definitive Franco-Country styling, characteristic of the Country & Folk family.",
        "scales": [
          "Blues",
          "Minor Pentatonic",
          "Dorian"
        ],
        "chords": [
          "Major",
          "7",
          "min7",
          "sus4"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Gulf and Western",
        "desc": "Definitive Gulf and Western styling, characteristic of the Country & Folk family.",
        "scales": [
          "Aeolian",
          "Harmonic Minor",
          "Phrygian"
        ],
        "chords": [
          "power",
          "sus2",
          "min9",
          "maj7#11"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Hellbilly",
        "desc": "Definitive Hellbilly styling, characteristic of the Country & Folk family.",
        "scales": [
          "Major",
          "Minor Pentatonic",
          "Mixolydian"
        ],
        "chords": [
          "Major",
          "minor",
          "7",
          "power"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Instrumental Country",
        "desc": "Definitive Instrumental Country styling, characteristic of the Country & Folk family.",
        "scales": [
          "Dorian",
          "Aeolian",
          "Blues"
        ],
        "chords": [
          "min7",
          "maj7",
          "min9",
          "11"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Lubbock Sound",
        "desc": "Definitive Lubbock Sound styling, characteristic of the Country & Folk family.",
        "scales": [
          "Harmonic Minor",
          "Phrygian Dominant",
          "Double Harmonic"
        ],
        "chords": [
          "power",
          "minor",
          "dim",
          "aug"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Nashville Sound",
        "desc": "Definitive Nashville Sound styling, characteristic of the Country & Folk family.",
        "scales": [
          "Lydian",
          "Major Pentatonic",
          "Major"
        ],
        "chords": [
          "maj9",
          "sus2",
          "add9",
          "maj7"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Neotraditional Country",
        "desc": "Definitive Neotraditional Country styling, characteristic of the Country & Folk family.",
        "scales": [
          "Locrian",
          "Phrygian",
          "Chromatic"
        ],
        "chords": [
          "7",
          "9",
          "13",
          "7#9"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Outlaw Country",
        "desc": "Definitive Outlaw Country styling, characteristic of the Country & Folk family.",
        "scales": [
          "Melodic Minor",
          "Dorian",
          "Mixolydian"
        ],
        "chords": [
          "minor",
          "Major",
          "sus4",
          "min7"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Progressive Country",
        "desc": "Definitive Progressive Country styling, characteristic of the Country & Folk family.",
        "scales": [
          "Whole Tone",
          "Altered",
          "Lydian Dominant"
        ],
        "chords": [
          "min(maj7)",
          "dim7",
          "aug",
          "Fr+6"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Psychobilly",
        "desc": "Definitive Psychobilly styling, characteristic of the Country & Folk family.",
        "scales": [
          "Blues",
          "Minor Pentatonic",
          "Dorian"
        ],
        "chords": [
          "Major",
          "7",
          "min7",
          "sus4"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Punkabilly",
        "desc": "Definitive Punkabilly styling, characteristic of the Country & Folk family.",
        "scales": [
          "Aeolian",
          "Harmonic Minor",
          "Phrygian"
        ],
        "chords": [
          "power",
          "sus2",
          "min9",
          "maj7#11"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Red Dirt",
        "desc": "Definitive Red Dirt styling, characteristic of the Country & Folk family.",
        "scales": [
          "Major",
          "Minor Pentatonic",
          "Mixolydian"
        ],
        "chords": [
          "Major",
          "minor",
          "7",
          "power"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Sertanejo",
        "desc": "Definitive Sertanejo styling, characteristic of the Country & Folk family.",
        "scales": [
          "Dorian",
          "Aeolian",
          "Blues"
        ],
        "chords": [
          "min7",
          "maj7",
          "min9",
          "11"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Texas Country",
        "desc": "Definitive Texas Country styling, characteristic of the Country & Folk family.",
        "scales": [
          "Harmonic Minor",
          "Phrygian Dominant",
          "Double Harmonic"
        ],
        "chords": [
          "power",
          "minor",
          "dim",
          "aug"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Traditional Bluegrass",
        "desc": "Definitive Traditional Bluegrass styling, characteristic of the Country & Folk family.",
        "scales": [
          "Lydian",
          "Major Pentatonic",
          "Major"
        ],
        "chords": [
          "maj9",
          "sus2",
          "add9",
          "maj7"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Traditional Country",
        "desc": "Definitive Traditional Country styling, characteristic of the Country & Folk family.",
        "scales": [
          "Locrian",
          "Phrygian",
          "Chromatic"
        ],
        "chords": [
          "7",
          "9",
          "13",
          "7#9"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Truck-Driving Country",
        "desc": "Definitive Truck-Driving Country styling, characteristic of the Country & Folk family.",
        "scales": [
          "Melodic Minor",
          "Dorian",
          "Mixolydian"
        ],
        "chords": [
          "minor",
          "Major",
          "sus4",
          "min7"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Urban Cowboy",
        "desc": "Definitive Urban Cowboy styling, characteristic of the Country & Folk family.",
        "scales": [
          "Whole Tone",
          "Altered",
          "Lydian Dominant"
        ],
        "chords": [
          "min(maj7)",
          "dim7",
          "aug",
          "Fr+6"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Western Swing",
        "desc": "Definitive Western Swing styling, characteristic of the Country & Folk family.",
        "scales": [
          "Blues",
          "Minor Pentatonic",
          "Dorian"
        ],
        "chords": [
          "Major",
          "7",
          "min7",
          "sus4"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Zydeco",
        "desc": "Definitive Zydeco styling, characteristic of the Country & Folk family.",
        "scales": [
          "Aeolian",
          "Harmonic Minor",
          "Phrygian"
        ],
        "chords": [
          "power",
          "sus2",
          "min9",
          "maj7#11"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Anti-Folk",
        "desc": "Definitive Anti-Folk styling, characteristic of the Country & Folk family.",
        "scales": [
          "Major",
          "Minor Pentatonic",
          "Mixolydian"
        ],
        "chords": [
          "Major",
          "minor",
          "7",
          "power"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Celtic Folk",
        "desc": "Definitive Celtic Folk styling, characteristic of the Country & Folk family.",
        "scales": [
          "Dorian",
          "Aeolian",
          "Blues"
        ],
        "chords": [
          "min7",
          "maj7",
          "min9",
          "11"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Freak Folk",
        "desc": "Definitive Freak Folk styling, characteristic of the Country & Folk family.",
        "scales": [
          "Harmonic Minor",
          "Phrygian Dominant",
          "Double Harmonic"
        ],
        "chords": [
          "power",
          "minor",
          "dim",
          "aug"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Indie Folk",
        "desc": "Definitive Indie Folk styling, characteristic of the Country & Folk family.",
        "scales": [
          "Lydian",
          "Major Pentatonic",
          "Major"
        ],
        "chords": [
          "maj9",
          "sus2",
          "add9",
          "maj7"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Progressive Folk",
        "desc": "Definitive Progressive Folk styling, characteristic of the Country & Folk family.",
        "scales": [
          "Locrian",
          "Phrygian",
          "Chromatic"
        ],
        "chords": [
          "7",
          "9",
          "13",
          "7#9"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      }
    ]
  },
  {
    "genre": "Electronic & Dance",
    "icon": "🎺",
    "subgenres": [
      {
        "name": "Ambient",
        "desc": "Definitive Ambient styling, characteristic of the Electronic & Dance family.",
        "scales": [
          "Locrian",
          "Phrygian",
          "Chromatic"
        ],
        "chords": [
          "7",
          "9",
          "13",
          "7#9"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Breakbeat",
        "desc": "Definitive Breakbeat styling, characteristic of the Electronic & Dance family.",
        "scales": [
          "Melodic Minor",
          "Dorian",
          "Mixolydian"
        ],
        "chords": [
          "minor",
          "Major",
          "sus4",
          "min7"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Breakcore",
        "desc": "Definitive Breakcore styling, characteristic of the Electronic & Dance family.",
        "scales": [
          "Whole Tone",
          "Altered",
          "Lydian Dominant"
        ],
        "chords": [
          "min(maj7)",
          "dim7",
          "aug",
          "Fr+6"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Brostep",
        "desc": "Definitive Brostep styling, characteristic of the Electronic & Dance family.",
        "scales": [
          "Blues",
          "Minor Pentatonic",
          "Dorian"
        ],
        "chords": [
          "Major",
          "7",
          "min7",
          "sus4"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Chillstep",
        "desc": "Definitive Chillstep styling, characteristic of the Electronic & Dance family.",
        "scales": [
          "Aeolian",
          "Harmonic Minor",
          "Phrygian"
        ],
        "chords": [
          "power",
          "sus2",
          "min9",
          "maj7#11"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Deep House",
        "desc": "Definitive Deep House styling, characteristic of the Electronic & Dance family.",
        "scales": [
          "Major",
          "Minor Pentatonic",
          "Mixolydian"
        ],
        "chords": [
          "Major",
          "minor",
          "7",
          "power"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Dubstep",
        "desc": "Definitive Dubstep styling, characteristic of the Electronic & Dance family.",
        "scales": [
          "Dorian",
          "Aeolian",
          "Blues"
        ],
        "chords": [
          "min7",
          "maj7",
          "min9",
          "11"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Electro House",
        "desc": "Definitive Electro House styling, characteristic of the Electronic & Dance family.",
        "scales": [
          "Harmonic Minor",
          "Phrygian Dominant",
          "Double Harmonic"
        ],
        "chords": [
          "power",
          "minor",
          "dim",
          "aug"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Electroswing",
        "desc": "Definitive Electroswing styling, characteristic of the Electronic & Dance family.",
        "scales": [
          "Lydian",
          "Major Pentatonic",
          "Major"
        ],
        "chords": [
          "maj9",
          "sus2",
          "add9",
          "maj7"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Future Garage",
        "desc": "Definitive Future Garage styling, characteristic of the Electronic & Dance family.",
        "scales": [
          "Locrian",
          "Phrygian",
          "Chromatic"
        ],
        "chords": [
          "7",
          "9",
          "13",
          "7#9"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Glitch Hop",
        "desc": "Definitive Glitch Hop styling, characteristic of the Electronic & Dance family.",
        "scales": [
          "Melodic Minor",
          "Dorian",
          "Mixolydian"
        ],
        "chords": [
          "minor",
          "Major",
          "sus4",
          "min7"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Grime",
        "desc": "Definitive Grime styling, characteristic of the Electronic & Dance family.",
        "scales": [
          "Whole Tone",
          "Altered",
          "Lydian Dominant"
        ],
        "chords": [
          "min(maj7)",
          "dim7",
          "aug",
          "Fr+6"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Hardcore",
        "desc": "Definitive Hardcore styling, characteristic of the Electronic & Dance family.",
        "scales": [
          "Blues",
          "Minor Pentatonic",
          "Dorian"
        ],
        "chords": [
          "Major",
          "7",
          "min7",
          "sus4"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Hardstyle",
        "desc": "Definitive Hardstyle styling, characteristic of the Electronic & Dance family.",
        "scales": [
          "Aeolian",
          "Harmonic Minor",
          "Phrygian"
        ],
        "chords": [
          "power",
          "sus2",
          "min9",
          "maj7#11"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "House",
        "desc": "Definitive House styling, characteristic of the Electronic & Dance family.",
        "scales": [
          "Major",
          "Minor Pentatonic",
          "Mixolydian"
        ],
        "chords": [
          "Major",
          "minor",
          "7",
          "power"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Acid House",
        "desc": "Definitive Acid House styling, characteristic of the Electronic & Dance family.",
        "scales": [
          "Dorian",
          "Aeolian",
          "Blues"
        ],
        "chords": [
          "min7",
          "maj7",
          "min9",
          "11"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Chicago House",
        "desc": "Definitive Chicago House styling, characteristic of the Electronic & Dance family.",
        "scales": [
          "Harmonic Minor",
          "Phrygian Dominant",
          "Double Harmonic"
        ],
        "chords": [
          "power",
          "minor",
          "dim",
          "aug"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Tropical House",
        "desc": "Definitive Tropical House styling, characteristic of the Electronic & Dance family.",
        "scales": [
          "Lydian",
          "Major Pentatonic",
          "Major"
        ],
        "chords": [
          "maj9",
          "sus2",
          "add9",
          "maj7"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Jungle",
        "desc": "Definitive Jungle styling, characteristic of the Electronic & Dance family.",
        "scales": [
          "Locrian",
          "Phrygian",
          "Chromatic"
        ],
        "chords": [
          "7",
          "9",
          "13",
          "7#9"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Drum & Bass",
        "desc": "Definitive Drum & Bass styling, characteristic of the Electronic & Dance family.",
        "scales": [
          "Melodic Minor",
          "Dorian",
          "Mixolydian"
        ],
        "chords": [
          "minor",
          "Major",
          "sus4",
          "min7"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Liquid Dub",
        "desc": "Definitive Liquid Dub styling, characteristic of the Electronic & Dance family.",
        "scales": [
          "Whole Tone",
          "Altered",
          "Lydian Dominant"
        ],
        "chords": [
          "min(maj7)",
          "dim7",
          "aug",
          "Fr+6"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Speedcore",
        "desc": "Definitive Speedcore styling, characteristic of the Electronic & Dance family.",
        "scales": [
          "Blues",
          "Minor Pentatonic",
          "Dorian"
        ],
        "chords": [
          "Major",
          "7",
          "min7",
          "sus4"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Techno",
        "desc": "Definitive Techno styling, characteristic of the Electronic & Dance family.",
        "scales": [
          "Aeolian",
          "Harmonic Minor",
          "Phrygian"
        ],
        "chords": [
          "power",
          "sus2",
          "min9",
          "maj7#11"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Acid Techno",
        "desc": "Definitive Acid Techno styling, characteristic of the Electronic & Dance family.",
        "scales": [
          "Major",
          "Minor Pentatonic",
          "Mixolydian"
        ],
        "chords": [
          "Major",
          "minor",
          "7",
          "power"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Detroit Techno",
        "desc": "Definitive Detroit Techno styling, characteristic of the Electronic & Dance family.",
        "scales": [
          "Dorian",
          "Aeolian",
          "Blues"
        ],
        "chords": [
          "min7",
          "maj7",
          "min9",
          "11"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Minimal Techno",
        "desc": "Definitive Minimal Techno styling, characteristic of the Electronic & Dance family.",
        "scales": [
          "Harmonic Minor",
          "Phrygian Dominant",
          "Double Harmonic"
        ],
        "chords": [
          "power",
          "minor",
          "dim",
          "aug"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Trance",
        "desc": "Definitive Trance styling, characteristic of the Electronic & Dance family.",
        "scales": [
          "Lydian",
          "Major Pentatonic",
          "Major"
        ],
        "chords": [
          "maj9",
          "sus2",
          "add9",
          "maj7"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Goa Trance",
        "desc": "Definitive Goa Trance styling, characteristic of the Electronic & Dance family.",
        "scales": [
          "Locrian",
          "Phrygian",
          "Chromatic"
        ],
        "chords": [
          "7",
          "9",
          "13",
          "7#9"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Psy-Trance",
        "desc": "Definitive Psy-Trance styling, characteristic of the Electronic & Dance family.",
        "scales": [
          "Melodic Minor",
          "Dorian",
          "Mixolydian"
        ],
        "chords": [
          "minor",
          "Major",
          "sus4",
          "min7"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Trap",
        "desc": "Definitive Trap styling, characteristic of the Electronic & Dance family.",
        "scales": [
          "Whole Tone",
          "Altered",
          "Lydian Dominant"
        ],
        "chords": [
          "min(maj7)",
          "dim7",
          "aug",
          "Fr+6"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "8bit",
        "desc": "Definitive 8bit styling, characteristic of the Electronic & Dance family.",
        "scales": [
          "Blues",
          "Minor Pentatonic",
          "Dorian"
        ],
        "chords": [
          "Major",
          "7",
          "min7",
          "sus4"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Chiptune",
        "desc": "Definitive Chiptune styling, characteristic of the Electronic & Dance family.",
        "scales": [
          "Aeolian",
          "Harmonic Minor",
          "Phrygian"
        ],
        "chords": [
          "power",
          "sus2",
          "min9",
          "maj7#11"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Chillwave",
        "desc": "Definitive Chillwave styling, characteristic of the Electronic & Dance family.",
        "scales": [
          "Major",
          "Minor Pentatonic",
          "Mixolydian"
        ],
        "chords": [
          "Major",
          "minor",
          "7",
          "power"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Downtempo",
        "desc": "Definitive Downtempo styling, characteristic of the Electronic & Dance family.",
        "scales": [
          "Dorian",
          "Aeolian",
          "Blues"
        ],
        "chords": [
          "min7",
          "maj7",
          "min9",
          "11"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Trip Hop",
        "desc": "Definitive Trip Hop styling, characteristic of the Electronic & Dance family.",
        "scales": [
          "Harmonic Minor",
          "Phrygian Dominant",
          "Double Harmonic"
        ],
        "chords": [
          "power",
          "minor",
          "dim",
          "aug"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Vaporwave",
        "desc": "Definitive Vaporwave styling, characteristic of the Electronic & Dance family.",
        "scales": [
          "Lydian",
          "Major Pentatonic",
          "Major"
        ],
        "chords": [
          "maj9",
          "sus2",
          "add9",
          "maj7"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Synthwave",
        "desc": "Definitive Synthwave styling, characteristic of the Electronic & Dance family.",
        "scales": [
          "Locrian",
          "Phrygian",
          "Chromatic"
        ],
        "chords": [
          "7",
          "9",
          "13",
          "7#9"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Retrowave",
        "desc": "Definitive Retrowave styling, characteristic of the Electronic & Dance family.",
        "scales": [
          "Melodic Minor",
          "Dorian",
          "Mixolydian"
        ],
        "chords": [
          "minor",
          "Major",
          "sus4",
          "min7"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Outrun",
        "desc": "Definitive Outrun styling, characteristic of the Electronic & Dance family.",
        "scales": [
          "Whole Tone",
          "Altered",
          "Lydian Dominant"
        ],
        "chords": [
          "min(maj7)",
          "dim7",
          "aug",
          "Fr+6"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Cyberpunk",
        "desc": "Definitive Cyberpunk styling, characteristic of the Electronic & Dance family.",
        "scales": [
          "Blues",
          "Minor Pentatonic",
          "Dorian"
        ],
        "chords": [
          "Major",
          "7",
          "min7",
          "sus4"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Industrial",
        "desc": "Definitive Industrial styling, characteristic of the Electronic & Dance family.",
        "scales": [
          "Aeolian",
          "Harmonic Minor",
          "Phrygian"
        ],
        "chords": [
          "power",
          "sus2",
          "min9",
          "maj7#11"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "EBM",
        "desc": "Definitive EBM styling, characteristic of the Electronic & Dance family.",
        "scales": [
          "Major",
          "Minor Pentatonic",
          "Mixolydian"
        ],
        "chords": [
          "Major",
          "minor",
          "7",
          "power"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Darkwave",
        "desc": "Definitive Darkwave styling, characteristic of the Electronic & Dance family.",
        "scales": [
          "Dorian",
          "Aeolian",
          "Blues"
        ],
        "chords": [
          "min7",
          "maj7",
          "min9",
          "11"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Witch House",
        "desc": "Definitive Witch House styling, characteristic of the Electronic & Dance family.",
        "scales": [
          "Harmonic Minor",
          "Phrygian Dominant",
          "Double Harmonic"
        ],
        "chords": [
          "power",
          "minor",
          "dim",
          "aug"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Future Bass",
        "desc": "Definitive Future Bass styling, characteristic of the Electronic & Dance family.",
        "scales": [
          "Lydian",
          "Major Pentatonic",
          "Major"
        ],
        "chords": [
          "maj9",
          "sus2",
          "add9",
          "maj7"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Kawaii Future Bass",
        "desc": "Definitive Kawaii Future Bass styling, characteristic of the Electronic & Dance family.",
        "scales": [
          "Locrian",
          "Phrygian",
          "Chromatic"
        ],
        "chords": [
          "7",
          "9",
          "13",
          "7#9"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Hardwave",
        "desc": "Definitive Hardwave styling, characteristic of the Electronic & Dance family.",
        "scales": [
          "Melodic Minor",
          "Dorian",
          "Mixolydian"
        ],
        "chords": [
          "minor",
          "Major",
          "sus4",
          "min7"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Complextro",
        "desc": "Definitive Complextro styling, characteristic of the Electronic & Dance family.",
        "scales": [
          "Whole Tone",
          "Altered",
          "Lydian Dominant"
        ],
        "chords": [
          "min(maj7)",
          "dim7",
          "aug",
          "Fr+6"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      }
    ]
  },
  {
    "genre": "Hip-Hop & Rap",
    "icon": "🎻",
    "subgenres": [
      {
        "name": "Alternative Rap",
        "desc": "Definitive Alternative Rap styling, characteristic of the Hip-Hop & Rap family.",
        "scales": [
          "Melodic Minor",
          "Dorian",
          "Mixolydian"
        ],
        "chords": [
          "minor",
          "Major",
          "sus4",
          "min7"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Avant-Garde Rap",
        "desc": "Definitive Avant-Garde Rap styling, characteristic of the Hip-Hop & Rap family.",
        "scales": [
          "Whole Tone",
          "Altered",
          "Lydian Dominant"
        ],
        "chords": [
          "min(maj7)",
          "dim7",
          "aug",
          "Fr+6"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Bounce",
        "desc": "Definitive Bounce styling, characteristic of the Hip-Hop & Rap family.",
        "scales": [
          "Blues",
          "Minor Pentatonic",
          "Dorian"
        ],
        "chords": [
          "Major",
          "7",
          "min7",
          "sus4"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Chap Hop",
        "desc": "Definitive Chap Hop styling, characteristic of the Hip-Hop & Rap family.",
        "scales": [
          "Aeolian",
          "Harmonic Minor",
          "Phrygian"
        ],
        "chords": [
          "power",
          "sus2",
          "min9",
          "maj7#11"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Christian Hip Hop",
        "desc": "Definitive Christian Hip Hop styling, characteristic of the Hip-Hop & Rap family.",
        "scales": [
          "Major",
          "Minor Pentatonic",
          "Mixolydian"
        ],
        "chords": [
          "Major",
          "minor",
          "7",
          "power"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Conscious Hip Hop",
        "desc": "Definitive Conscious Hip Hop styling, characteristic of the Hip-Hop & Rap family.",
        "scales": [
          "Dorian",
          "Aeolian",
          "Blues"
        ],
        "chords": [
          "min7",
          "maj7",
          "min9",
          "11"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Country-Rap",
        "desc": "Definitive Country-Rap styling, characteristic of the Hip-Hop & Rap family.",
        "scales": [
          "Harmonic Minor",
          "Phrygian Dominant",
          "Double Harmonic"
        ],
        "chords": [
          "power",
          "minor",
          "dim",
          "aug"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Crunk",
        "desc": "Definitive Crunk styling, characteristic of the Hip-Hop & Rap family.",
        "scales": [
          "Lydian",
          "Major Pentatonic",
          "Major"
        ],
        "chords": [
          "maj9",
          "sus2",
          "add9",
          "maj7"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Crunkcore",
        "desc": "Definitive Crunkcore styling, characteristic of the Hip-Hop & Rap family.",
        "scales": [
          "Locrian",
          "Phrygian",
          "Chromatic"
        ],
        "chords": [
          "7",
          "9",
          "13",
          "7#9"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Cumbia Rap",
        "desc": "Definitive Cumbia Rap styling, characteristic of the Hip-Hop & Rap family.",
        "scales": [
          "Melodic Minor",
          "Dorian",
          "Mixolydian"
        ],
        "chords": [
          "minor",
          "Major",
          "sus4",
          "min7"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Dirty South",
        "desc": "Definitive Dirty South styling, characteristic of the Hip-Hop & Rap family.",
        "scales": [
          "Whole Tone",
          "Altered",
          "Lydian Dominant"
        ],
        "chords": [
          "min(maj7)",
          "dim7",
          "aug",
          "Fr+6"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "East Coast",
        "desc": "Definitive East Coast styling, characteristic of the Hip-Hop & Rap family.",
        "scales": [
          "Blues",
          "Minor Pentatonic",
          "Dorian"
        ],
        "chords": [
          "Major",
          "7",
          "min7",
          "sus4"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Freestyle",
        "desc": "Definitive Freestyle styling, characteristic of the Hip-Hop & Rap family.",
        "scales": [
          "Aeolian",
          "Harmonic Minor",
          "Phrygian"
        ],
        "chords": [
          "power",
          "sus2",
          "min9",
          "maj7#11"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "G-Funk",
        "desc": "Definitive G-Funk styling, characteristic of the Hip-Hop & Rap family.",
        "scales": [
          "Major",
          "Minor Pentatonic",
          "Mixolydian"
        ],
        "chords": [
          "Major",
          "minor",
          "7",
          "power"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Gangsta Rap",
        "desc": "Definitive Gangsta Rap styling, characteristic of the Hip-Hop & Rap family.",
        "scales": [
          "Dorian",
          "Aeolian",
          "Blues"
        ],
        "chords": [
          "min7",
          "maj7",
          "min9",
          "11"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Golden Age",
        "desc": "Definitive Golden Age styling, characteristic of the Hip-Hop & Rap family.",
        "scales": [
          "Harmonic Minor",
          "Phrygian Dominant",
          "Double Harmonic"
        ],
        "chords": [
          "power",
          "minor",
          "dim",
          "aug"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Grime",
        "desc": "Definitive Grime styling, characteristic of the Hip-Hop & Rap family.",
        "scales": [
          "Lydian",
          "Major Pentatonic",
          "Major"
        ],
        "chords": [
          "maj9",
          "sus2",
          "add9",
          "maj7"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Hardcore Rap",
        "desc": "Definitive Hardcore Rap styling, characteristic of the Hip-Hop & Rap family.",
        "scales": [
          "Locrian",
          "Phrygian",
          "Chromatic"
        ],
        "chords": [
          "7",
          "9",
          "13",
          "7#9"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Hip Pop",
        "desc": "Definitive Hip Pop styling, characteristic of the Hip-Hop & Rap family.",
        "scales": [
          "Melodic Minor",
          "Dorian",
          "Mixolydian"
        ],
        "chords": [
          "minor",
          "Major",
          "sus4",
          "min7"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Horrorcore",
        "desc": "Definitive Horrorcore styling, characteristic of the Hip-Hop & Rap family.",
        "scales": [
          "Whole Tone",
          "Altered",
          "Lydian Dominant"
        ],
        "chords": [
          "min(maj7)",
          "dim7",
          "aug",
          "Fr+6"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Hyphy",
        "desc": "Definitive Hyphy styling, characteristic of the Hip-Hop & Rap family.",
        "scales": [
          "Blues",
          "Minor Pentatonic",
          "Dorian"
        ],
        "chords": [
          "Major",
          "7",
          "min7",
          "sus4"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Industrial Rap",
        "desc": "Definitive Industrial Rap styling, characteristic of the Hip-Hop & Rap family.",
        "scales": [
          "Aeolian",
          "Harmonic Minor",
          "Phrygian"
        ],
        "chords": [
          "power",
          "sus2",
          "min9",
          "maj7#11"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Instrumental Hip Hop",
        "desc": "Definitive Instrumental Hip Hop styling, characteristic of the Hip-Hop & Rap family.",
        "scales": [
          "Major",
          "Minor Pentatonic",
          "Mixolydian"
        ],
        "chords": [
          "Major",
          "minor",
          "7",
          "power"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Jazz Rap",
        "desc": "Definitive Jazz Rap styling, characteristic of the Hip-Hop & Rap family.",
        "scales": [
          "Dorian",
          "Aeolian",
          "Blues"
        ],
        "chords": [
          "min7",
          "maj7",
          "min9",
          "11"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Latin Rap",
        "desc": "Definitive Latin Rap styling, characteristic of the Hip-Hop & Rap family.",
        "scales": [
          "Harmonic Minor",
          "Phrygian Dominant",
          "Double Harmonic"
        ],
        "chords": [
          "power",
          "minor",
          "dim",
          "aug"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Lofi Hip Hop",
        "desc": "Definitive Lofi Hip Hop styling, characteristic of the Hip-Hop & Rap family.",
        "scales": [
          "Lydian",
          "Major Pentatonic",
          "Major"
        ],
        "chords": [
          "maj9",
          "sus2",
          "add9",
          "maj7"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Low Bap",
        "desc": "Definitive Low Bap styling, characteristic of the Hip-Hop & Rap family.",
        "scales": [
          "Locrian",
          "Phrygian",
          "Chromatic"
        ],
        "chords": [
          "7",
          "9",
          "13",
          "7#9"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Lyrical",
        "desc": "Definitive Lyrical styling, characteristic of the Hip-Hop & Rap family.",
        "scales": [
          "Melodic Minor",
          "Dorian",
          "Mixolydian"
        ],
        "chords": [
          "minor",
          "Major",
          "sus4",
          "min7"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Merenrap",
        "desc": "Definitive Merenrap styling, characteristic of the Hip-Hop & Rap family.",
        "scales": [
          "Whole Tone",
          "Altered",
          "Lydian Dominant"
        ],
        "chords": [
          "min(maj7)",
          "dim7",
          "aug",
          "Fr+6"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Midwest Rap",
        "desc": "Definitive Midwest Rap styling, characteristic of the Hip-Hop & Rap family.",
        "scales": [
          "Blues",
          "Minor Pentatonic",
          "Dorian"
        ],
        "chords": [
          "Major",
          "7",
          "min7",
          "sus4"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Nerdcore",
        "desc": "Definitive Nerdcore styling, characteristic of the Hip-Hop & Rap family.",
        "scales": [
          "Aeolian",
          "Harmonic Minor",
          "Phrygian"
        ],
        "chords": [
          "power",
          "sus2",
          "min9",
          "maj7#11"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "New Jack Swing",
        "desc": "Definitive New Jack Swing styling, characteristic of the Hip-Hop & Rap family.",
        "scales": [
          "Major",
          "Minor Pentatonic",
          "Mixolydian"
        ],
        "chords": [
          "Major",
          "minor",
          "7",
          "power"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "New School",
        "desc": "Definitive New School styling, characteristic of the Hip-Hop & Rap family.",
        "scales": [
          "Dorian",
          "Aeolian",
          "Blues"
        ],
        "chords": [
          "min7",
          "maj7",
          "min9",
          "11"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Old School",
        "desc": "Definitive Old School styling, characteristic of the Hip-Hop & Rap family.",
        "scales": [
          "Harmonic Minor",
          "Phrygian Dominant",
          "Double Harmonic"
        ],
        "chords": [
          "power",
          "minor",
          "dim",
          "aug"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Trap",
        "desc": "Definitive Trap styling, characteristic of the Hip-Hop & Rap family.",
        "scales": [
          "Lydian",
          "Major Pentatonic",
          "Major"
        ],
        "chords": [
          "maj9",
          "sus2",
          "add9",
          "maj7"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Turntablism",
        "desc": "Definitive Turntablism styling, characteristic of the Hip-Hop & Rap family.",
        "scales": [
          "Locrian",
          "Phrygian",
          "Chromatic"
        ],
        "chords": [
          "7",
          "9",
          "13",
          "7#9"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Underground",
        "desc": "Definitive Underground styling, characteristic of the Hip-Hop & Rap family.",
        "scales": [
          "Melodic Minor",
          "Dorian",
          "Mixolydian"
        ],
        "chords": [
          "minor",
          "Major",
          "sus4",
          "min7"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "West Coast",
        "desc": "Definitive West Coast styling, characteristic of the Hip-Hop & Rap family.",
        "scales": [
          "Whole Tone",
          "Altered",
          "Lydian Dominant"
        ],
        "chords": [
          "min(maj7)",
          "dim7",
          "aug",
          "Fr+6"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Drill",
        "desc": "Definitive Drill styling, characteristic of the Hip-Hop & Rap family.",
        "scales": [
          "Blues",
          "Minor Pentatonic",
          "Dorian"
        ],
        "chords": [
          "Major",
          "7",
          "min7",
          "sus4"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "UK Drill",
        "desc": "Definitive UK Drill styling, characteristic of the Hip-Hop & Rap family.",
        "scales": [
          "Aeolian",
          "Harmonic Minor",
          "Phrygian"
        ],
        "chords": [
          "power",
          "sus2",
          "min9",
          "maj7#11"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Chicago Drill",
        "desc": "Definitive Chicago Drill styling, characteristic of the Hip-Hop & Rap family.",
        "scales": [
          "Major",
          "Minor Pentatonic",
          "Mixolydian"
        ],
        "chords": [
          "Major",
          "minor",
          "7",
          "power"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Cloud Rap",
        "desc": "Definitive Cloud Rap styling, characteristic of the Hip-Hop & Rap family.",
        "scales": [
          "Dorian",
          "Aeolian",
          "Blues"
        ],
        "chords": [
          "min7",
          "maj7",
          "min9",
          "11"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Mumble Rap",
        "desc": "Definitive Mumble Rap styling, characteristic of the Hip-Hop & Rap family.",
        "scales": [
          "Harmonic Minor",
          "Phrygian Dominant",
          "Double Harmonic"
        ],
        "chords": [
          "power",
          "minor",
          "dim",
          "aug"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Emo Rap",
        "desc": "Definitive Emo Rap styling, characteristic of the Hip-Hop & Rap family.",
        "scales": [
          "Lydian",
          "Major Pentatonic",
          "Major"
        ],
        "chords": [
          "maj9",
          "sus2",
          "add9",
          "maj7"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Soundcloud Rap",
        "desc": "Definitive Soundcloud Rap styling, characteristic of the Hip-Hop & Rap family.",
        "scales": [
          "Locrian",
          "Phrygian",
          "Chromatic"
        ],
        "chords": [
          "7",
          "9",
          "13",
          "7#9"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      }
    ]
  },
  {
    "genre": "Jazz",
    "icon": "🎤",
    "subgenres": [
      {
        "name": "Acid Jazz",
        "desc": "Definitive Acid Jazz styling, characteristic of the Jazz family.",
        "scales": [
          "Whole Tone",
          "Altered",
          "Lydian Dominant"
        ],
        "chords": [
          "min(maj7)",
          "dim7",
          "aug",
          "Fr+6"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Afro-Cuban Jazz",
        "desc": "Definitive Afro-Cuban Jazz styling, characteristic of the Jazz family.",
        "scales": [
          "Blues",
          "Minor Pentatonic",
          "Dorian"
        ],
        "chords": [
          "Major",
          "7",
          "min7",
          "sus4"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Avant-Garde Jazz",
        "desc": "Definitive Avant-Garde Jazz styling, characteristic of the Jazz family.",
        "scales": [
          "Aeolian",
          "Harmonic Minor",
          "Phrygian"
        ],
        "chords": [
          "power",
          "sus2",
          "min9",
          "maj7#11"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Bebop",
        "desc": "Definitive Bebop styling, characteristic of the Jazz family.",
        "scales": [
          "Major",
          "Minor Pentatonic",
          "Mixolydian"
        ],
        "chords": [
          "Major",
          "minor",
          "7",
          "power"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Big Band",
        "desc": "Definitive Big Band styling, characteristic of the Jazz family.",
        "scales": [
          "Dorian",
          "Aeolian",
          "Blues"
        ],
        "chords": [
          "min7",
          "maj7",
          "min9",
          "11"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Blue Note",
        "desc": "Definitive Blue Note styling, characteristic of the Jazz family.",
        "scales": [
          "Harmonic Minor",
          "Phrygian Dominant",
          "Double Harmonic"
        ],
        "chords": [
          "power",
          "minor",
          "dim",
          "aug"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Bossa Nova",
        "desc": "Definitive Bossa Nova styling, characteristic of the Jazz family.",
        "scales": [
          "Lydian",
          "Major Pentatonic",
          "Major"
        ],
        "chords": [
          "maj9",
          "sus2",
          "add9",
          "maj7"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Cape Jazz",
        "desc": "Definitive Cape Jazz styling, characteristic of the Jazz family.",
        "scales": [
          "Locrian",
          "Phrygian",
          "Chromatic"
        ],
        "chords": [
          "7",
          "9",
          "13",
          "7#9"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Chamber Jazz",
        "desc": "Definitive Chamber Jazz styling, characteristic of the Jazz family.",
        "scales": [
          "Melodic Minor",
          "Dorian",
          "Mixolydian"
        ],
        "chords": [
          "minor",
          "Major",
          "sus4",
          "min7"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Contemporary Jazz",
        "desc": "Definitive Contemporary Jazz styling, characteristic of the Jazz family.",
        "scales": [
          "Whole Tone",
          "Altered",
          "Lydian Dominant"
        ],
        "chords": [
          "min(maj7)",
          "dim7",
          "aug",
          "Fr+6"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Cool Jazz",
        "desc": "Definitive Cool Jazz styling, characteristic of the Jazz family.",
        "scales": [
          "Blues",
          "Minor Pentatonic",
          "Dorian"
        ],
        "chords": [
          "Major",
          "7",
          "min7",
          "sus4"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Crossover Jazz",
        "desc": "Definitive Crossover Jazz styling, characteristic of the Jazz family.",
        "scales": [
          "Aeolian",
          "Harmonic Minor",
          "Phrygian"
        ],
        "chords": [
          "power",
          "sus2",
          "min9",
          "maj7#11"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Dark Jazz",
        "desc": "Definitive Dark Jazz styling, characteristic of the Jazz family.",
        "scales": [
          "Major",
          "Minor Pentatonic",
          "Mixolydian"
        ],
        "chords": [
          "Major",
          "minor",
          "7",
          "power"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Dixieland",
        "desc": "Definitive Dixieland styling, characteristic of the Jazz family.",
        "scales": [
          "Dorian",
          "Aeolian",
          "Blues"
        ],
        "chords": [
          "min7",
          "maj7",
          "min9",
          "11"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Early Jazz",
        "desc": "Definitive Early Jazz styling, characteristic of the Jazz family.",
        "scales": [
          "Harmonic Minor",
          "Phrygian Dominant",
          "Double Harmonic"
        ],
        "chords": [
          "power",
          "minor",
          "dim",
          "aug"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Electro Swing",
        "desc": "Definitive Electro Swing styling, characteristic of the Jazz family.",
        "scales": [
          "Lydian",
          "Major Pentatonic",
          "Major"
        ],
        "chords": [
          "maj9",
          "sus2",
          "add9",
          "maj7"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Ethio-jazz",
        "desc": "Definitive Ethio-jazz styling, characteristic of the Jazz family.",
        "scales": [
          "Locrian",
          "Phrygian",
          "Chromatic"
        ],
        "chords": [
          "7",
          "9",
          "13",
          "7#9"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Ethno-Jazz",
        "desc": "Definitive Ethno-Jazz styling, characteristic of the Jazz family.",
        "scales": [
          "Melodic Minor",
          "Dorian",
          "Mixolydian"
        ],
        "chords": [
          "minor",
          "Major",
          "sus4",
          "min7"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "European Free Jazz",
        "desc": "Definitive European Free Jazz styling, characteristic of the Jazz family.",
        "scales": [
          "Whole Tone",
          "Altered",
          "Lydian Dominant"
        ],
        "chords": [
          "min(maj7)",
          "dim7",
          "aug",
          "Fr+6"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Free Funk",
        "desc": "Definitive Free Funk styling, characteristic of the Jazz family.",
        "scales": [
          "Blues",
          "Minor Pentatonic",
          "Dorian"
        ],
        "chords": [
          "Major",
          "7",
          "min7",
          "sus4"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Free Jazz",
        "desc": "Definitive Free Jazz styling, characteristic of the Jazz family.",
        "scales": [
          "Aeolian",
          "Harmonic Minor",
          "Phrygian"
        ],
        "chords": [
          "power",
          "sus2",
          "min9",
          "maj7#11"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Fusion",
        "desc": "Definitive Fusion styling, characteristic of the Jazz family.",
        "scales": [
          "Major",
          "Minor Pentatonic",
          "Mixolydian"
        ],
        "chords": [
          "Major",
          "minor",
          "7",
          "power"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Gypsy Jazz",
        "desc": "Definitive Gypsy Jazz styling, characteristic of the Jazz family.",
        "scales": [
          "Dorian",
          "Aeolian",
          "Blues"
        ],
        "chords": [
          "min7",
          "maj7",
          "min9",
          "11"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Hard Bop",
        "desc": "Definitive Hard Bop styling, characteristic of the Jazz family.",
        "scales": [
          "Harmonic Minor",
          "Phrygian Dominant",
          "Double Harmonic"
        ],
        "chords": [
          "power",
          "minor",
          "dim",
          "aug"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Indo Jazz",
        "desc": "Definitive Indo Jazz styling, characteristic of the Jazz family.",
        "scales": [
          "Lydian",
          "Major Pentatonic",
          "Major"
        ],
        "chords": [
          "maj9",
          "sus2",
          "add9",
          "maj7"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Jazz Blues",
        "desc": "Definitive Jazz Blues styling, characteristic of the Jazz family.",
        "scales": [
          "Locrian",
          "Phrygian",
          "Chromatic"
        ],
        "chords": [
          "7",
          "9",
          "13",
          "7#9"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Jazz-Funk",
        "desc": "Definitive Jazz-Funk styling, characteristic of the Jazz family.",
        "scales": [
          "Melodic Minor",
          "Dorian",
          "Mixolydian"
        ],
        "chords": [
          "minor",
          "Major",
          "sus4",
          "min7"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Jazz Rap",
        "desc": "Definitive Jazz Rap styling, characteristic of the Jazz family.",
        "scales": [
          "Whole Tone",
          "Altered",
          "Lydian Dominant"
        ],
        "chords": [
          "min(maj7)",
          "dim7",
          "aug",
          "Fr+6"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Jazz Rock",
        "desc": "Definitive Jazz Rock styling, characteristic of the Jazz family.",
        "scales": [
          "Blues",
          "Minor Pentatonic",
          "Dorian"
        ],
        "chords": [
          "Major",
          "7",
          "min7",
          "sus4"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Kansas City Jazz",
        "desc": "Definitive Kansas City Jazz styling, characteristic of the Jazz family.",
        "scales": [
          "Aeolian",
          "Harmonic Minor",
          "Phrygian"
        ],
        "chords": [
          "power",
          "sus2",
          "min9",
          "maj7#11"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Latin Jazz",
        "desc": "Definitive Latin Jazz styling, characteristic of the Jazz family.",
        "scales": [
          "Major",
          "Minor Pentatonic",
          "Mixolydian"
        ],
        "chords": [
          "Major",
          "minor",
          "7",
          "power"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "M-Base",
        "desc": "Definitive M-Base styling, characteristic of the Jazz family.",
        "scales": [
          "Dorian",
          "Aeolian",
          "Blues"
        ],
        "chords": [
          "min7",
          "maj7",
          "min9",
          "11"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Mainstream Jazz",
        "desc": "Definitive Mainstream Jazz styling, characteristic of the Jazz family.",
        "scales": [
          "Harmonic Minor",
          "Phrygian Dominant",
          "Double Harmonic"
        ],
        "chords": [
          "power",
          "minor",
          "dim",
          "aug"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Modal Jazz",
        "desc": "Definitive Modal Jazz styling, characteristic of the Jazz family.",
        "scales": [
          "Lydian",
          "Major Pentatonic",
          "Major"
        ],
        "chords": [
          "maj9",
          "sus2",
          "add9",
          "maj7"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Neo-Bop",
        "desc": "Definitive Neo-Bop styling, characteristic of the Jazz family.",
        "scales": [
          "Locrian",
          "Phrygian",
          "Chromatic"
        ],
        "chords": [
          "7",
          "9",
          "13",
          "7#9"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Neo-Swing",
        "desc": "Definitive Neo-Swing styling, characteristic of the Jazz family.",
        "scales": [
          "Melodic Minor",
          "Dorian",
          "Mixolydian"
        ],
        "chords": [
          "minor",
          "Major",
          "sus4",
          "min7"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Nu Jazz",
        "desc": "Definitive Nu Jazz styling, characteristic of the Jazz family.",
        "scales": [
          "Whole Tone",
          "Altered",
          "Lydian Dominant"
        ],
        "chords": [
          "min(maj7)",
          "dim7",
          "aug",
          "Fr+6"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Orchestral Jazz",
        "desc": "Definitive Orchestral Jazz styling, characteristic of the Jazz family.",
        "scales": [
          "Blues",
          "Minor Pentatonic",
          "Dorian"
        ],
        "chords": [
          "Major",
          "7",
          "min7",
          "sus4"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Post-Bop",
        "desc": "Definitive Post-Bop styling, characteristic of the Jazz family.",
        "scales": [
          "Aeolian",
          "Harmonic Minor",
          "Phrygian"
        ],
        "chords": [
          "power",
          "sus2",
          "min9",
          "maj7#11"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Punk Jazz",
        "desc": "Definitive Punk Jazz styling, characteristic of the Jazz family.",
        "scales": [
          "Major",
          "Minor Pentatonic",
          "Mixolydian"
        ],
        "chords": [
          "Major",
          "minor",
          "7",
          "power"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Ragtime",
        "desc": "Definitive Ragtime styling, characteristic of the Jazz family.",
        "scales": [
          "Dorian",
          "Aeolian",
          "Blues"
        ],
        "chords": [
          "min7",
          "maj7",
          "min9",
          "11"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Ska Jazz",
        "desc": "Definitive Ska Jazz styling, characteristic of the Jazz family.",
        "scales": [
          "Harmonic Minor",
          "Phrygian Dominant",
          "Double Harmonic"
        ],
        "chords": [
          "power",
          "minor",
          "dim",
          "aug"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Smooth Jazz",
        "desc": "Definitive Smooth Jazz styling, characteristic of the Jazz family.",
        "scales": [
          "Lydian",
          "Major Pentatonic",
          "Major"
        ],
        "chords": [
          "maj9",
          "sus2",
          "add9",
          "maj7"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Soul Jazz",
        "desc": "Definitive Soul Jazz styling, characteristic of the Jazz family.",
        "scales": [
          "Locrian",
          "Phrygian",
          "Chromatic"
        ],
        "chords": [
          "7",
          "9",
          "13",
          "7#9"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Swing",
        "desc": "Definitive Swing styling, characteristic of the Jazz family.",
        "scales": [
          "Melodic Minor",
          "Dorian",
          "Mixolydian"
        ],
        "chords": [
          "minor",
          "Major",
          "sus4",
          "min7"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Straight-Ahead Jazz",
        "desc": "Definitive Straight-Ahead Jazz styling, characteristic of the Jazz family.",
        "scales": [
          "Whole Tone",
          "Altered",
          "Lydian Dominant"
        ],
        "chords": [
          "min(maj7)",
          "dim7",
          "aug",
          "Fr+6"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Third Stream",
        "desc": "Definitive Third Stream styling, characteristic of the Jazz family.",
        "scales": [
          "Blues",
          "Minor Pentatonic",
          "Dorian"
        ],
        "chords": [
          "Major",
          "7",
          "min7",
          "sus4"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "West Coast Jazz",
        "desc": "Definitive West Coast Jazz styling, characteristic of the Jazz family.",
        "scales": [
          "Aeolian",
          "Harmonic Minor",
          "Phrygian"
        ],
        "chords": [
          "power",
          "sus2",
          "min9",
          "maj7#11"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      }
    ]
  },
  {
    "genre": "Latin & Caribbean",
    "icon": "🎛️",
    "subgenres": [
      {
        "name": "Alternativo",
        "desc": "Definitive Alternativo styling, characteristic of the Latin & Caribbean family.",
        "scales": [
          "Blues",
          "Minor Pentatonic",
          "Dorian"
        ],
        "chords": [
          "Major",
          "7",
          "min7",
          "sus4"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Rock Latino",
        "desc": "Definitive Rock Latino styling, characteristic of the Latin & Caribbean family.",
        "scales": [
          "Aeolian",
          "Harmonic Minor",
          "Phrygian"
        ],
        "chords": [
          "power",
          "sus2",
          "min9",
          "maj7#11"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Argentine Tango",
        "desc": "Definitive Argentine Tango styling, characteristic of the Latin & Caribbean family.",
        "scales": [
          "Major",
          "Minor Pentatonic",
          "Mixolydian"
        ],
        "chords": [
          "Major",
          "minor",
          "7",
          "power"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Bachata",
        "desc": "Definitive Bachata styling, characteristic of the Latin & Caribbean family.",
        "scales": [
          "Dorian",
          "Aeolian",
          "Blues"
        ],
        "chords": [
          "min7",
          "maj7",
          "min9",
          "11"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Baladas y Boleros",
        "desc": "Definitive Baladas y Boleros styling, characteristic of the Latin & Caribbean family.",
        "scales": [
          "Harmonic Minor",
          "Phrygian Dominant",
          "Double Harmonic"
        ],
        "chords": [
          "power",
          "minor",
          "dim",
          "aug"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Bossa Nova",
        "desc": "Definitive Bossa Nova styling, characteristic of the Latin & Caribbean family.",
        "scales": [
          "Lydian",
          "Major Pentatonic",
          "Major"
        ],
        "chords": [
          "maj9",
          "sus2",
          "add9",
          "maj7"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Brazilian Rock",
        "desc": "Definitive Brazilian Rock styling, characteristic of the Latin & Caribbean family.",
        "scales": [
          "Locrian",
          "Phrygian",
          "Chromatic"
        ],
        "chords": [
          "7",
          "9",
          "13",
          "7#9"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Choro",
        "desc": "Definitive Choro styling, characteristic of the Latin & Caribbean family.",
        "scales": [
          "Melodic Minor",
          "Dorian",
          "Mixolydian"
        ],
        "chords": [
          "minor",
          "Major",
          "sus4",
          "min7"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Forró",
        "desc": "Definitive Forró styling, characteristic of the Latin & Caribbean family.",
        "scales": [
          "Whole Tone",
          "Altered",
          "Lydian Dominant"
        ],
        "chords": [
          "min(maj7)",
          "dim7",
          "aug",
          "Fr+6"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Funk Carioca",
        "desc": "Definitive Funk Carioca styling, characteristic of the Latin & Caribbean family.",
        "scales": [
          "Blues",
          "Minor Pentatonic",
          "Dorian"
        ],
        "chords": [
          "Major",
          "7",
          "min7",
          "sus4"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Samba",
        "desc": "Definitive Samba styling, characteristic of the Latin & Caribbean family.",
        "scales": [
          "Aeolian",
          "Harmonic Minor",
          "Phrygian"
        ],
        "chords": [
          "power",
          "sus2",
          "min9",
          "maj7#11"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Tropicalia",
        "desc": "Definitive Tropicalia styling, characteristic of the Latin & Caribbean family.",
        "scales": [
          "Major",
          "Minor Pentatonic",
          "Mixolydian"
        ],
        "chords": [
          "Major",
          "minor",
          "7",
          "power"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Cumbia",
        "desc": "Definitive Cumbia styling, characteristic of the Latin & Caribbean family.",
        "scales": [
          "Dorian",
          "Aeolian",
          "Blues"
        ],
        "chords": [
          "min7",
          "maj7",
          "min9",
          "11"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Flamenco",
        "desc": "Definitive Flamenco styling, characteristic of the Latin & Caribbean family.",
        "scales": [
          "Harmonic Minor",
          "Phrygian Dominant",
          "Double Harmonic"
        ],
        "chords": [
          "power",
          "minor",
          "dim",
          "aug"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Huayno",
        "desc": "Definitive Huayno styling, characteristic of the Latin & Caribbean family.",
        "scales": [
          "Lydian",
          "Major Pentatonic",
          "Major"
        ],
        "chords": [
          "maj9",
          "sus2",
          "add9",
          "maj7"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Joropo",
        "desc": "Definitive Joropo styling, characteristic of the Latin & Caribbean family.",
        "scales": [
          "Locrian",
          "Phrygian",
          "Chromatic"
        ],
        "chords": [
          "7",
          "9",
          "13",
          "7#9"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Mambo",
        "desc": "Definitive Mambo styling, characteristic of the Latin & Caribbean family.",
        "scales": [
          "Melodic Minor",
          "Dorian",
          "Mixolydian"
        ],
        "chords": [
          "minor",
          "Major",
          "sus4",
          "min7"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Mariachi",
        "desc": "Definitive Mariachi styling, characteristic of the Latin & Caribbean family.",
        "scales": [
          "Whole Tone",
          "Altered",
          "Lydian Dominant"
        ],
        "chords": [
          "min(maj7)",
          "dim7",
          "aug",
          "Fr+6"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Merengue",
        "desc": "Definitive Merengue styling, characteristic of the Latin & Caribbean family.",
        "scales": [
          "Blues",
          "Minor Pentatonic",
          "Dorian"
        ],
        "chords": [
          "Major",
          "7",
          "min7",
          "sus4"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Nuevo Flamenco",
        "desc": "Definitive Nuevo Flamenco styling, characteristic of the Latin & Caribbean family.",
        "scales": [
          "Aeolian",
          "Harmonic Minor",
          "Phrygian"
        ],
        "chords": [
          "power",
          "sus2",
          "min9",
          "maj7#11"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Pop Latino",
        "desc": "Definitive Pop Latino styling, characteristic of the Latin & Caribbean family.",
        "scales": [
          "Major",
          "Minor Pentatonic",
          "Mixolydian"
        ],
        "chords": [
          "Major",
          "minor",
          "7",
          "power"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Ranchera",
        "desc": "Definitive Ranchera styling, characteristic of the Latin & Caribbean family.",
        "scales": [
          "Dorian",
          "Aeolian",
          "Blues"
        ],
        "chords": [
          "min7",
          "maj7",
          "min9",
          "11"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Reggaeton",
        "desc": "Definitive Reggaeton styling, characteristic of the Latin & Caribbean family.",
        "scales": [
          "Harmonic Minor",
          "Phrygian Dominant",
          "Double Harmonic"
        ],
        "chords": [
          "power",
          "minor",
          "dim",
          "aug"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Regional Mexicano",
        "desc": "Definitive Regional Mexicano styling, characteristic of the Latin & Caribbean family.",
        "scales": [
          "Lydian",
          "Major Pentatonic",
          "Major"
        ],
        "chords": [
          "maj9",
          "sus2",
          "add9",
          "maj7"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Salsa",
        "desc": "Definitive Salsa styling, characteristic of the Latin & Caribbean family.",
        "scales": [
          "Locrian",
          "Phrygian",
          "Chromatic"
        ],
        "chords": [
          "7",
          "9",
          "13",
          "7#9"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Soca",
        "desc": "Definitive Soca styling, characteristic of the Latin & Caribbean family.",
        "scales": [
          "Melodic Minor",
          "Dorian",
          "Mixolydian"
        ],
        "chords": [
          "minor",
          "Major",
          "sus4",
          "min7"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Son",
        "desc": "Definitive Son styling, characteristic of the Latin & Caribbean family.",
        "scales": [
          "Whole Tone",
          "Altered",
          "Lydian Dominant"
        ],
        "chords": [
          "min(maj7)",
          "dim7",
          "aug",
          "Fr+6"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Tejano",
        "desc": "Definitive Tejano styling, characteristic of the Latin & Caribbean family.",
        "scales": [
          "Blues",
          "Minor Pentatonic",
          "Dorian"
        ],
        "chords": [
          "Major",
          "7",
          "min7",
          "sus4"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Timba",
        "desc": "Definitive Timba styling, characteristic of the Latin & Caribbean family.",
        "scales": [
          "Aeolian",
          "Harmonic Minor",
          "Phrygian"
        ],
        "chords": [
          "power",
          "sus2",
          "min9",
          "maj7#11"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Zouk",
        "desc": "Definitive Zouk styling, characteristic of the Latin & Caribbean family.",
        "scales": [
          "Major",
          "Minor Pentatonic",
          "Mixolydian"
        ],
        "chords": [
          "Major",
          "minor",
          "7",
          "power"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Reggae",
        "desc": "Definitive Reggae styling, characteristic of the Latin & Caribbean family.",
        "scales": [
          "Dorian",
          "Aeolian",
          "Blues"
        ],
        "chords": [
          "min7",
          "maj7",
          "min9",
          "11"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Roots Reggae",
        "desc": "Definitive Roots Reggae styling, characteristic of the Latin & Caribbean family.",
        "scales": [
          "Harmonic Minor",
          "Phrygian Dominant",
          "Double Harmonic"
        ],
        "chords": [
          "power",
          "minor",
          "dim",
          "aug"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Dub",
        "desc": "Definitive Dub styling, characteristic of the Latin & Caribbean family.",
        "scales": [
          "Lydian",
          "Major Pentatonic",
          "Major"
        ],
        "chords": [
          "maj9",
          "sus2",
          "add9",
          "maj7"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Dancehall",
        "desc": "Definitive Dancehall styling, characteristic of the Latin & Caribbean family.",
        "scales": [
          "Locrian",
          "Phrygian",
          "Chromatic"
        ],
        "chords": [
          "7",
          "9",
          "13",
          "7#9"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Ska",
        "desc": "Definitive Ska styling, characteristic of the Latin & Caribbean family.",
        "scales": [
          "Melodic Minor",
          "Dorian",
          "Mixolydian"
        ],
        "chords": [
          "minor",
          "Major",
          "sus4",
          "min7"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Rocksteady",
        "desc": "Definitive Rocksteady styling, characteristic of the Latin & Caribbean family.",
        "scales": [
          "Whole Tone",
          "Altered",
          "Lydian Dominant"
        ],
        "chords": [
          "min(maj7)",
          "dim7",
          "aug",
          "Fr+6"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Mento",
        "desc": "Definitive Mento styling, characteristic of the Latin & Caribbean family.",
        "scales": [
          "Blues",
          "Minor Pentatonic",
          "Dorian"
        ],
        "chords": [
          "Major",
          "7",
          "min7",
          "sus4"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Calypso",
        "desc": "Definitive Calypso styling, characteristic of the Latin & Caribbean family.",
        "scales": [
          "Aeolian",
          "Harmonic Minor",
          "Phrygian"
        ],
        "chords": [
          "power",
          "sus2",
          "min9",
          "maj7#11"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Mambo",
        "desc": "Definitive Mambo styling, characteristic of the Latin & Caribbean family.",
        "scales": [
          "Major",
          "Minor Pentatonic",
          "Mixolydian"
        ],
        "chords": [
          "Major",
          "minor",
          "7",
          "power"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Chutney",
        "desc": "Definitive Chutney styling, characteristic of the Latin & Caribbean family.",
        "scales": [
          "Dorian",
          "Aeolian",
          "Blues"
        ],
        "chords": [
          "min7",
          "maj7",
          "min9",
          "11"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      }
    ]
  },
  {
    "genre": "Metal",
    "icon": "💿",
    "subgenres": [
      {
        "name": "Heavy Metal",
        "desc": "Definitive Heavy Metal styling, characteristic of the Metal family.",
        "scales": [
          "Aeolian",
          "Harmonic Minor",
          "Phrygian"
        ],
        "chords": [
          "power",
          "sus2",
          "min9",
          "maj7#11"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Speed Metal",
        "desc": "Definitive Speed Metal styling, characteristic of the Metal family.",
        "scales": [
          "Major",
          "Minor Pentatonic",
          "Mixolydian"
        ],
        "chords": [
          "Major",
          "minor",
          "7",
          "power"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Thrash Metal",
        "desc": "Definitive Thrash Metal styling, characteristic of the Metal family.",
        "scales": [
          "Dorian",
          "Aeolian",
          "Blues"
        ],
        "chords": [
          "min7",
          "maj7",
          "min9",
          "11"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Power Metal",
        "desc": "Definitive Power Metal styling, characteristic of the Metal family.",
        "scales": [
          "Harmonic Minor",
          "Phrygian Dominant",
          "Double Harmonic"
        ],
        "chords": [
          "power",
          "minor",
          "dim",
          "aug"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Death Metal",
        "desc": "Definitive Death Metal styling, characteristic of the Metal family.",
        "scales": [
          "Lydian",
          "Major Pentatonic",
          "Major"
        ],
        "chords": [
          "maj9",
          "sus2",
          "add9",
          "maj7"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Black Metal",
        "desc": "Definitive Black Metal styling, characteristic of the Metal family.",
        "scales": [
          "Locrian",
          "Phrygian",
          "Chromatic"
        ],
        "chords": [
          "7",
          "9",
          "13",
          "7#9"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Pagan Metal",
        "desc": "Definitive Pagan Metal styling, characteristic of the Metal family.",
        "scales": [
          "Melodic Minor",
          "Dorian",
          "Mixolydian"
        ],
        "chords": [
          "minor",
          "Major",
          "sus4",
          "min7"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Viking Metal",
        "desc": "Definitive Viking Metal styling, characteristic of the Metal family.",
        "scales": [
          "Whole Tone",
          "Altered",
          "Lydian Dominant"
        ],
        "chords": [
          "min(maj7)",
          "dim7",
          "aug",
          "Fr+6"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Folk Metal",
        "desc": "Definitive Folk Metal styling, characteristic of the Metal family.",
        "scales": [
          "Blues",
          "Minor Pentatonic",
          "Dorian"
        ],
        "chords": [
          "Major",
          "7",
          "min7",
          "sus4"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Symphonic Metal",
        "desc": "Definitive Symphonic Metal styling, characteristic of the Metal family.",
        "scales": [
          "Aeolian",
          "Harmonic Minor",
          "Phrygian"
        ],
        "chords": [
          "power",
          "sus2",
          "min9",
          "maj7#11"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Gothic Metal",
        "desc": "Definitive Gothic Metal styling, characteristic of the Metal family.",
        "scales": [
          "Major",
          "Minor Pentatonic",
          "Mixolydian"
        ],
        "chords": [
          "Major",
          "minor",
          "7",
          "power"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Glam Metal",
        "desc": "Definitive Glam Metal styling, characteristic of the Metal family.",
        "scales": [
          "Dorian",
          "Aeolian",
          "Blues"
        ],
        "chords": [
          "min7",
          "maj7",
          "min9",
          "11"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Hair Metal",
        "desc": "Definitive Hair Metal styling, characteristic of the Metal family.",
        "scales": [
          "Harmonic Minor",
          "Phrygian Dominant",
          "Double Harmonic"
        ],
        "chords": [
          "power",
          "minor",
          "dim",
          "aug"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Doom Metal",
        "desc": "Definitive Doom Metal styling, characteristic of the Metal family.",
        "scales": [
          "Lydian",
          "Major Pentatonic",
          "Major"
        ],
        "chords": [
          "maj9",
          "sus2",
          "add9",
          "maj7"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Groove Metal",
        "desc": "Definitive Groove Metal styling, characteristic of the Metal family.",
        "scales": [
          "Locrian",
          "Phrygian",
          "Chromatic"
        ],
        "chords": [
          "7",
          "9",
          "13",
          "7#9"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Industrial Metal",
        "desc": "Definitive Industrial Metal styling, characteristic of the Metal family.",
        "scales": [
          "Melodic Minor",
          "Dorian",
          "Mixolydian"
        ],
        "chords": [
          "minor",
          "Major",
          "sus4",
          "min7"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Modern Metal",
        "desc": "Definitive Modern Metal styling, characteristic of the Metal family.",
        "scales": [
          "Whole Tone",
          "Altered",
          "Lydian Dominant"
        ],
        "chords": [
          "min(maj7)",
          "dim7",
          "aug",
          "Fr+6"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Neoclassical Metal",
        "desc": "Definitive Neoclassical Metal styling, characteristic of the Metal family.",
        "scales": [
          "Blues",
          "Minor Pentatonic",
          "Dorian"
        ],
        "chords": [
          "Major",
          "7",
          "min7",
          "sus4"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "NWOBHM",
        "desc": "Definitive NWOBHM styling, characteristic of the Metal family.",
        "scales": [
          "Aeolian",
          "Harmonic Minor",
          "Phrygian"
        ],
        "chords": [
          "power",
          "sus2",
          "min9",
          "maj7#11"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Post Metal",
        "desc": "Definitive Post Metal styling, characteristic of the Metal family.",
        "scales": [
          "Major",
          "Minor Pentatonic",
          "Mixolydian"
        ],
        "chords": [
          "Major",
          "minor",
          "7",
          "power"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Progressive Metal",
        "desc": "Definitive Progressive Metal styling, characteristic of the Metal family.",
        "scales": [
          "Dorian",
          "Aeolian",
          "Blues"
        ],
        "chords": [
          "min7",
          "maj7",
          "min9",
          "11"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Avantgarde Metal",
        "desc": "Definitive Avantgarde Metal styling, characteristic of the Metal family.",
        "scales": [
          "Harmonic Minor",
          "Phrygian Dominant",
          "Double Harmonic"
        ],
        "chords": [
          "power",
          "minor",
          "dim",
          "aug"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Sludge Metal",
        "desc": "Definitive Sludge Metal styling, characteristic of the Metal family.",
        "scales": [
          "Lydian",
          "Major Pentatonic",
          "Major"
        ],
        "chords": [
          "maj9",
          "sus2",
          "add9",
          "maj7"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Djent",
        "desc": "Definitive Djent styling, characteristic of the Metal family.",
        "scales": [
          "Locrian",
          "Phrygian",
          "Chromatic"
        ],
        "chords": [
          "7",
          "9",
          "13",
          "7#9"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Drone Metal",
        "desc": "Definitive Drone Metal styling, characteristic of the Metal family.",
        "scales": [
          "Melodic Minor",
          "Dorian",
          "Mixolydian"
        ],
        "chords": [
          "minor",
          "Major",
          "sus4",
          "min7"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Kawaii Metal",
        "desc": "Definitive Kawaii Metal styling, characteristic of the Metal family.",
        "scales": [
          "Whole Tone",
          "Altered",
          "Lydian Dominant"
        ],
        "chords": [
          "min(maj7)",
          "dim7",
          "aug",
          "Fr+6"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Pirate Metal",
        "desc": "Definitive Pirate Metal styling, characteristic of the Metal family.",
        "scales": [
          "Blues",
          "Minor Pentatonic",
          "Dorian"
        ],
        "chords": [
          "Major",
          "7",
          "min7",
          "sus4"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Nu Metal",
        "desc": "Definitive Nu Metal styling, characteristic of the Metal family.",
        "scales": [
          "Aeolian",
          "Harmonic Minor",
          "Phrygian"
        ],
        "chords": [
          "power",
          "sus2",
          "min9",
          "maj7#11"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Neue Deutsche Härte",
        "desc": "Definitive Neue Deutsche Härte styling, characteristic of the Metal family.",
        "scales": [
          "Major",
          "Minor Pentatonic",
          "Mixolydian"
        ],
        "chords": [
          "Major",
          "minor",
          "7",
          "power"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Math Metal",
        "desc": "Definitive Math Metal styling, characteristic of the Metal family.",
        "scales": [
          "Dorian",
          "Aeolian",
          "Blues"
        ],
        "chords": [
          "min7",
          "maj7",
          "min9",
          "11"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Crossover Thrash",
        "desc": "Definitive Crossover Thrash styling, characteristic of the Metal family.",
        "scales": [
          "Harmonic Minor",
          "Phrygian Dominant",
          "Double Harmonic"
        ],
        "chords": [
          "power",
          "minor",
          "dim",
          "aug"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Grindcore",
        "desc": "Definitive Grindcore styling, characteristic of the Metal family.",
        "scales": [
          "Lydian",
          "Major Pentatonic",
          "Major"
        ],
        "chords": [
          "maj9",
          "sus2",
          "add9",
          "maj7"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Metalcore",
        "desc": "Definitive Metalcore styling, characteristic of the Metal family.",
        "scales": [
          "Locrian",
          "Phrygian",
          "Chromatic"
        ],
        "chords": [
          "7",
          "9",
          "13",
          "7#9"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Deathcore",
        "desc": "Definitive Deathcore styling, characteristic of the Metal family.",
        "scales": [
          "Melodic Minor",
          "Dorian",
          "Mixolydian"
        ],
        "chords": [
          "minor",
          "Major",
          "sus4",
          "min7"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Post Hardcore",
        "desc": "Definitive Post Hardcore styling, characteristic of the Metal family.",
        "scales": [
          "Whole Tone",
          "Altered",
          "Lydian Dominant"
        ],
        "chords": [
          "min(maj7)",
          "dim7",
          "aug",
          "Fr+6"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Mathcore",
        "desc": "Definitive Mathcore styling, characteristic of the Metal family.",
        "scales": [
          "Blues",
          "Minor Pentatonic",
          "Dorian"
        ],
        "chords": [
          "Major",
          "7",
          "min7",
          "sus4"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Slam Death Metal",
        "desc": "Definitive Slam Death Metal styling, characteristic of the Metal family.",
        "scales": [
          "Aeolian",
          "Harmonic Minor",
          "Phrygian"
        ],
        "chords": [
          "power",
          "sus2",
          "min9",
          "maj7#11"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Brutal Death Metal",
        "desc": "Definitive Brutal Death Metal styling, characteristic of the Metal family.",
        "scales": [
          "Major",
          "Minor Pentatonic",
          "Mixolydian"
        ],
        "chords": [
          "Major",
          "minor",
          "7",
          "power"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Melodic Death Metal",
        "desc": "Definitive Melodic Death Metal styling, characteristic of the Metal family.",
        "scales": [
          "Dorian",
          "Aeolian",
          "Blues"
        ],
        "chords": [
          "min7",
          "maj7",
          "min9",
          "11"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Atmospheric Black Metal",
        "desc": "Definitive Atmospheric Black Metal styling, characteristic of the Metal family.",
        "scales": [
          "Harmonic Minor",
          "Phrygian Dominant",
          "Double Harmonic"
        ],
        "chords": [
          "power",
          "minor",
          "dim",
          "aug"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      }
    ]
  },
  {
    "genre": "Pop",
    "icon": "📻",
    "subgenres": [
      {
        "name": "Adult Contemporary",
        "desc": "Definitive Adult Contemporary styling, characteristic of the Pop family.",
        "scales": [
          "Major",
          "Minor Pentatonic",
          "Mixolydian"
        ],
        "chords": [
          "Major",
          "minor",
          "7",
          "power"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Arab Pop",
        "desc": "Definitive Arab Pop styling, characteristic of the Pop family.",
        "scales": [
          "Dorian",
          "Aeolian",
          "Blues"
        ],
        "chords": [
          "min7",
          "maj7",
          "min9",
          "11"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Baroque Pop",
        "desc": "Definitive Baroque Pop styling, characteristic of the Pop family.",
        "scales": [
          "Harmonic Minor",
          "Phrygian Dominant",
          "Double Harmonic"
        ],
        "chords": [
          "power",
          "minor",
          "dim",
          "aug"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Britpop",
        "desc": "Definitive Britpop styling, characteristic of the Pop family.",
        "scales": [
          "Lydian",
          "Major Pentatonic",
          "Major"
        ],
        "chords": [
          "maj9",
          "sus2",
          "add9",
          "maj7"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Bubblegum Pop",
        "desc": "Definitive Bubblegum Pop styling, characteristic of the Pop family.",
        "scales": [
          "Locrian",
          "Phrygian",
          "Chromatic"
        ],
        "chords": [
          "7",
          "9",
          "13",
          "7#9"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Chamber Pop",
        "desc": "Definitive Chamber Pop styling, characteristic of the Pop family.",
        "scales": [
          "Melodic Minor",
          "Dorian",
          "Mixolydian"
        ],
        "chords": [
          "minor",
          "Major",
          "sus4",
          "min7"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Chanson",
        "desc": "Definitive Chanson styling, characteristic of the Pop family.",
        "scales": [
          "Whole Tone",
          "Altered",
          "Lydian Dominant"
        ],
        "chords": [
          "min(maj7)",
          "dim7",
          "aug",
          "Fr+6"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Christian Pop",
        "desc": "Definitive Christian Pop styling, characteristic of the Pop family.",
        "scales": [
          "Blues",
          "Minor Pentatonic",
          "Dorian"
        ],
        "chords": [
          "Major",
          "7",
          "min7",
          "sus4"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Dance Pop",
        "desc": "Definitive Dance Pop styling, characteristic of the Pop family.",
        "scales": [
          "Aeolian",
          "Harmonic Minor",
          "Phrygian"
        ],
        "chords": [
          "power",
          "sus2",
          "min9",
          "maj7#11"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Dream Pop",
        "desc": "Definitive Dream Pop styling, characteristic of the Pop family.",
        "scales": [
          "Major",
          "Minor Pentatonic",
          "Mixolydian"
        ],
        "chords": [
          "Major",
          "minor",
          "7",
          "power"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Electro Pop",
        "desc": "Definitive Electro Pop styling, characteristic of the Pop family.",
        "scales": [
          "Dorian",
          "Aeolian",
          "Blues"
        ],
        "chords": [
          "min7",
          "maj7",
          "min9",
          "11"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Euro Pop",
        "desc": "Definitive Euro Pop styling, characteristic of the Pop family.",
        "scales": [
          "Harmonic Minor",
          "Phrygian Dominant",
          "Double Harmonic"
        ],
        "chords": [
          "power",
          "minor",
          "dim",
          "aug"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "French Pop",
        "desc": "Definitive French Pop styling, characteristic of the Pop family.",
        "scales": [
          "Lydian",
          "Major Pentatonic",
          "Major"
        ],
        "chords": [
          "maj9",
          "sus2",
          "add9",
          "maj7"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Hyperpop",
        "desc": "Definitive Hyperpop styling, characteristic of the Pop family.",
        "scales": [
          "Locrian",
          "Phrygian",
          "Chromatic"
        ],
        "chords": [
          "7",
          "9",
          "13",
          "7#9"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Indie Pop",
        "desc": "Definitive Indie Pop styling, characteristic of the Pop family.",
        "scales": [
          "Melodic Minor",
          "Dorian",
          "Mixolydian"
        ],
        "chords": [
          "minor",
          "Major",
          "sus4",
          "min7"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Iranian Pop",
        "desc": "Definitive Iranian Pop styling, characteristic of the Pop family.",
        "scales": [
          "Whole Tone",
          "Altered",
          "Lydian Dominant"
        ],
        "chords": [
          "min(maj7)",
          "dim7",
          "aug",
          "Fr+6"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "J-Pop",
        "desc": "Definitive J-Pop styling, characteristic of the Pop family.",
        "scales": [
          "Blues",
          "Minor Pentatonic",
          "Dorian"
        ],
        "chords": [
          "Major",
          "7",
          "min7",
          "sus4"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Jangle Pop",
        "desc": "Definitive Jangle Pop styling, characteristic of the Pop family.",
        "scales": [
          "Aeolian",
          "Harmonic Minor",
          "Phrygian"
        ],
        "chords": [
          "power",
          "sus2",
          "min9",
          "maj7#11"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "K-Pop",
        "desc": "Definitive K-Pop styling, characteristic of the Pop family.",
        "scales": [
          "Major",
          "Minor Pentatonic",
          "Mixolydian"
        ],
        "chords": [
          "Major",
          "minor",
          "7",
          "power"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Latin Pop",
        "desc": "Definitive Latin Pop styling, characteristic of the Pop family.",
        "scales": [
          "Dorian",
          "Aeolian",
          "Blues"
        ],
        "chords": [
          "min7",
          "maj7",
          "min9",
          "11"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Mexican Pop",
        "desc": "Definitive Mexican Pop styling, characteristic of the Pop family.",
        "scales": [
          "Harmonic Minor",
          "Phrygian Dominant",
          "Double Harmonic"
        ],
        "chords": [
          "power",
          "minor",
          "dim",
          "aug"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Operatic Pop",
        "desc": "Definitive Operatic Pop styling, characteristic of the Pop family.",
        "scales": [
          "Lydian",
          "Major Pentatonic",
          "Major"
        ],
        "chords": [
          "maj9",
          "sus2",
          "add9",
          "maj7"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Pop Rap",
        "desc": "Definitive Pop Rap styling, characteristic of the Pop family.",
        "scales": [
          "Locrian",
          "Phrygian",
          "Chromatic"
        ],
        "chords": [
          "7",
          "9",
          "13",
          "7#9"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Pop Rock",
        "desc": "Definitive Pop Rock styling, characteristic of the Pop family.",
        "scales": [
          "Melodic Minor",
          "Dorian",
          "Mixolydian"
        ],
        "chords": [
          "minor",
          "Major",
          "sus4",
          "min7"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Pop Punk",
        "desc": "Definitive Pop Punk styling, characteristic of the Pop family.",
        "scales": [
          "Whole Tone",
          "Altered",
          "Lydian Dominant"
        ],
        "chords": [
          "min(maj7)",
          "dim7",
          "aug",
          "Fr+6"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Power Pop",
        "desc": "Definitive Power Pop styling, characteristic of the Pop family.",
        "scales": [
          "Blues",
          "Minor Pentatonic",
          "Dorian"
        ],
        "chords": [
          "Major",
          "7",
          "min7",
          "sus4"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Psychedelic Pop",
        "desc": "Definitive Psychedelic Pop styling, characteristic of the Pop family.",
        "scales": [
          "Aeolian",
          "Harmonic Minor",
          "Phrygian"
        ],
        "chords": [
          "power",
          "sus2",
          "min9",
          "maj7#11"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Schlager",
        "desc": "Definitive Schlager styling, characteristic of the Pop family.",
        "scales": [
          "Major",
          "Minor Pentatonic",
          "Mixolydian"
        ],
        "chords": [
          "Major",
          "minor",
          "7",
          "power"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Soft Rock",
        "desc": "Definitive Soft Rock styling, characteristic of the Pop family.",
        "scales": [
          "Dorian",
          "Aeolian",
          "Blues"
        ],
        "chords": [
          "min7",
          "maj7",
          "min9",
          "11"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Sophisti-Pop",
        "desc": "Definitive Sophisti-Pop styling, characteristic of the Pop family.",
        "scales": [
          "Harmonic Minor",
          "Phrygian Dominant",
          "Double Harmonic"
        ],
        "chords": [
          "power",
          "minor",
          "dim",
          "aug"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Space Age Pop",
        "desc": "Definitive Space Age Pop styling, characteristic of the Pop family.",
        "scales": [
          "Lydian",
          "Major Pentatonic",
          "Major"
        ],
        "chords": [
          "maj9",
          "sus2",
          "add9",
          "maj7"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Sunshine Pop",
        "desc": "Definitive Sunshine Pop styling, characteristic of the Pop family.",
        "scales": [
          "Locrian",
          "Phrygian",
          "Chromatic"
        ],
        "chords": [
          "7",
          "9",
          "13",
          "7#9"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Surf Pop",
        "desc": "Definitive Surf Pop styling, characteristic of the Pop family.",
        "scales": [
          "Melodic Minor",
          "Dorian",
          "Mixolydian"
        ],
        "chords": [
          "minor",
          "Major",
          "sus4",
          "min7"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Synthpop",
        "desc": "Definitive Synthpop styling, characteristic of the Pop family.",
        "scales": [
          "Whole Tone",
          "Altered",
          "Lydian Dominant"
        ],
        "chords": [
          "min(maj7)",
          "dim7",
          "aug",
          "Fr+6"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Teen Pop",
        "desc": "Definitive Teen Pop styling, characteristic of the Pop family.",
        "scales": [
          "Blues",
          "Minor Pentatonic",
          "Dorian"
        ],
        "chords": [
          "Major",
          "7",
          "min7",
          "sus4"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Traditional Pop",
        "desc": "Definitive Traditional Pop styling, characteristic of the Pop family.",
        "scales": [
          "Aeolian",
          "Harmonic Minor",
          "Phrygian"
        ],
        "chords": [
          "power",
          "sus2",
          "min9",
          "maj7#11"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Turkish Pop",
        "desc": "Definitive Turkish Pop styling, characteristic of the Pop family.",
        "scales": [
          "Major",
          "Minor Pentatonic",
          "Mixolydian"
        ],
        "chords": [
          "Major",
          "minor",
          "7",
          "power"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Vispop",
        "desc": "Definitive Vispop styling, characteristic of the Pop family.",
        "scales": [
          "Dorian",
          "Aeolian",
          "Blues"
        ],
        "chords": [
          "min7",
          "maj7",
          "min9",
          "11"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Wonky Pop",
        "desc": "Definitive Wonky Pop styling, characteristic of the Pop family.",
        "scales": [
          "Harmonic Minor",
          "Phrygian Dominant",
          "Double Harmonic"
        ],
        "chords": [
          "power",
          "minor",
          "dim",
          "aug"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "C-Pop",
        "desc": "Definitive C-Pop styling, characteristic of the Pop family.",
        "scales": [
          "Lydian",
          "Major Pentatonic",
          "Major"
        ],
        "chords": [
          "maj9",
          "sus2",
          "add9",
          "maj7"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Mandopop",
        "desc": "Definitive Mandopop styling, characteristic of the Pop family.",
        "scales": [
          "Locrian",
          "Phrygian",
          "Chromatic"
        ],
        "chords": [
          "7",
          "9",
          "13",
          "7#9"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Cantopop",
        "desc": "Definitive Cantopop styling, characteristic of the Pop family.",
        "scales": [
          "Melodic Minor",
          "Dorian",
          "Mixolydian"
        ],
        "chords": [
          "minor",
          "Major",
          "sus4",
          "min7"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "City Pop",
        "desc": "Definitive City Pop styling, characteristic of the Pop family.",
        "scales": [
          "Whole Tone",
          "Altered",
          "Lydian Dominant"
        ],
        "chords": [
          "min(maj7)",
          "dim7",
          "aug",
          "Fr+6"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      }
    ]
  },
  {
    "genre": "R&B & Soul",
    "icon": "🎧",
    "subgenres": [
      {
        "name": "Beach Music",
        "desc": "Definitive Beach Music styling, characteristic of the R&B & Soul family.",
        "scales": [
          "Dorian",
          "Aeolian",
          "Blues"
        ],
        "chords": [
          "min7",
          "maj7",
          "min9",
          "11"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Contemporary R&B",
        "desc": "Definitive Contemporary R&B styling, characteristic of the R&B & Soul family.",
        "scales": [
          "Harmonic Minor",
          "Phrygian Dominant",
          "Double Harmonic"
        ],
        "chords": [
          "power",
          "minor",
          "dim",
          "aug"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Disco",
        "desc": "Definitive Disco styling, characteristic of the R&B & Soul family.",
        "scales": [
          "Lydian",
          "Major Pentatonic",
          "Major"
        ],
        "chords": [
          "maj9",
          "sus2",
          "add9",
          "maj7"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Doo Wop",
        "desc": "Definitive Doo Wop styling, characteristic of the R&B & Soul family.",
        "scales": [
          "Locrian",
          "Phrygian",
          "Chromatic"
        ],
        "chords": [
          "7",
          "9",
          "13",
          "7#9"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Funk",
        "desc": "Definitive Funk styling, characteristic of the R&B & Soul family.",
        "scales": [
          "Melodic Minor",
          "Dorian",
          "Mixolydian"
        ],
        "chords": [
          "minor",
          "Major",
          "sus4",
          "min7"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Modern Soul",
        "desc": "Definitive Modern Soul styling, characteristic of the R&B & Soul family.",
        "scales": [
          "Whole Tone",
          "Altered",
          "Lydian Dominant"
        ],
        "chords": [
          "min(maj7)",
          "dim7",
          "aug",
          "Fr+6"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Motown",
        "desc": "Definitive Motown styling, characteristic of the R&B & Soul family.",
        "scales": [
          "Blues",
          "Minor Pentatonic",
          "Dorian"
        ],
        "chords": [
          "Major",
          "7",
          "min7",
          "sus4"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Neo-Soul",
        "desc": "Definitive Neo-Soul styling, characteristic of the R&B & Soul family.",
        "scales": [
          "Aeolian",
          "Harmonic Minor",
          "Phrygian"
        ],
        "chords": [
          "power",
          "sus2",
          "min9",
          "maj7#11"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Northern Soul",
        "desc": "Definitive Northern Soul styling, characteristic of the R&B & Soul family.",
        "scales": [
          "Major",
          "Minor Pentatonic",
          "Mixolydian"
        ],
        "chords": [
          "Major",
          "minor",
          "7",
          "power"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Psychedelic Soul",
        "desc": "Definitive Psychedelic Soul styling, characteristic of the R&B & Soul family.",
        "scales": [
          "Dorian",
          "Aeolian",
          "Blues"
        ],
        "chords": [
          "min7",
          "maj7",
          "min9",
          "11"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Quiet Storm",
        "desc": "Definitive Quiet Storm styling, characteristic of the R&B & Soul family.",
        "scales": [
          "Harmonic Minor",
          "Phrygian Dominant",
          "Double Harmonic"
        ],
        "chords": [
          "power",
          "minor",
          "dim",
          "aug"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Soul",
        "desc": "Definitive Soul styling, characteristic of the R&B & Soul family.",
        "scales": [
          "Lydian",
          "Major Pentatonic",
          "Major"
        ],
        "chords": [
          "maj9",
          "sus2",
          "add9",
          "maj7"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Soul Blues",
        "desc": "Definitive Soul Blues styling, characteristic of the R&B & Soul family.",
        "scales": [
          "Locrian",
          "Phrygian",
          "Chromatic"
        ],
        "chords": [
          "7",
          "9",
          "13",
          "7#9"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Southern Soul",
        "desc": "Definitive Southern Soul styling, characteristic of the R&B & Soul family.",
        "scales": [
          "Melodic Minor",
          "Dorian",
          "Mixolydian"
        ],
        "chords": [
          "minor",
          "Major",
          "sus4",
          "min7"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Blue-Eyed Soul",
        "desc": "Definitive Blue-Eyed Soul styling, characteristic of the R&B & Soul family.",
        "scales": [
          "Whole Tone",
          "Altered",
          "Lydian Dominant"
        ],
        "chords": [
          "min(maj7)",
          "dim7",
          "aug",
          "Fr+6"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Brown-Eyed Soul",
        "desc": "Definitive Brown-Eyed Soul styling, characteristic of the R&B & Soul family.",
        "scales": [
          "Blues",
          "Minor Pentatonic",
          "Dorian"
        ],
        "chords": [
          "Major",
          "7",
          "min7",
          "sus4"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Hip Hop Soul",
        "desc": "Definitive Hip Hop Soul styling, characteristic of the R&B & Soul family.",
        "scales": [
          "Aeolian",
          "Harmonic Minor",
          "Phrygian"
        ],
        "chords": [
          "power",
          "sus2",
          "min9",
          "maj7#11"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "P-Funk",
        "desc": "Definitive P-Funk styling, characteristic of the R&B & Soul family.",
        "scales": [
          "Major",
          "Minor Pentatonic",
          "Mixolydian"
        ],
        "chords": [
          "Major",
          "minor",
          "7",
          "power"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "G-Funk",
        "desc": "Definitive G-Funk styling, characteristic of the R&B & Soul family.",
        "scales": [
          "Dorian",
          "Aeolian",
          "Blues"
        ],
        "chords": [
          "min7",
          "maj7",
          "min9",
          "11"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Boogie",
        "desc": "Definitive Boogie styling, characteristic of the R&B & Soul family.",
        "scales": [
          "Harmonic Minor",
          "Phrygian Dominant",
          "Double Harmonic"
        ],
        "chords": [
          "power",
          "minor",
          "dim",
          "aug"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Post-Disco",
        "desc": "Definitive Post-Disco styling, characteristic of the R&B & Soul family.",
        "scales": [
          "Lydian",
          "Major Pentatonic",
          "Major"
        ],
        "chords": [
          "maj9",
          "sus2",
          "add9",
          "maj7"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "New Jack Swing",
        "desc": "Definitive New Jack Swing styling, characteristic of the R&B & Soul family.",
        "scales": [
          "Locrian",
          "Phrygian",
          "Chromatic"
        ],
        "chords": [
          "7",
          "9",
          "13",
          "7#9"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      }
    ]
  },
  {
    "genre": "Rock",
    "icon": "🎶",
    "subgenres": [
      {
        "name": "Acid Rock",
        "desc": "Definitive Acid Rock styling, characteristic of the Rock family.",
        "scales": [
          "Harmonic Minor",
          "Phrygian Dominant",
          "Double Harmonic"
        ],
        "chords": [
          "power",
          "minor",
          "dim",
          "aug"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Adult-Oriented Rock",
        "desc": "Definitive Adult-Oriented Rock styling, characteristic of the Rock family.",
        "scales": [
          "Lydian",
          "Major Pentatonic",
          "Major"
        ],
        "chords": [
          "maj9",
          "sus2",
          "add9",
          "maj7"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Alternative Rock",
        "desc": "Definitive Alternative Rock styling, characteristic of the Rock family.",
        "scales": [
          "Locrian",
          "Phrygian",
          "Chromatic"
        ],
        "chords": [
          "7",
          "9",
          "13",
          "7#9"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Arena Rock",
        "desc": "Definitive Arena Rock styling, characteristic of the Rock family.",
        "scales": [
          "Melodic Minor",
          "Dorian",
          "Mixolydian"
        ],
        "chords": [
          "minor",
          "Major",
          "sus4",
          "min7"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Art Rock",
        "desc": "Definitive Art Rock styling, characteristic of the Rock family.",
        "scales": [
          "Whole Tone",
          "Altered",
          "Lydian Dominant"
        ],
        "chords": [
          "min(maj7)",
          "dim7",
          "aug",
          "Fr+6"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Blues-Rock",
        "desc": "Definitive Blues-Rock styling, characteristic of the Rock family.",
        "scales": [
          "Blues",
          "Minor Pentatonic",
          "Dorian"
        ],
        "chords": [
          "Major",
          "7",
          "min7",
          "sus4"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "British Invasion",
        "desc": "Definitive British Invasion styling, characteristic of the Rock family.",
        "scales": [
          "Aeolian",
          "Harmonic Minor",
          "Phrygian"
        ],
        "chords": [
          "power",
          "sus2",
          "min9",
          "maj7#11"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Cock Rock",
        "desc": "Definitive Cock Rock styling, characteristic of the Rock family.",
        "scales": [
          "Major",
          "Minor Pentatonic",
          "Mixolydian"
        ],
        "chords": [
          "Major",
          "minor",
          "7",
          "power"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Glam Rock",
        "desc": "Definitive Glam Rock styling, characteristic of the Rock family.",
        "scales": [
          "Dorian",
          "Aeolian",
          "Blues"
        ],
        "chords": [
          "min7",
          "maj7",
          "min9",
          "11"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Hard Rock",
        "desc": "Definitive Hard Rock styling, characteristic of the Rock family.",
        "scales": [
          "Harmonic Minor",
          "Phrygian Dominant",
          "Double Harmonic"
        ],
        "chords": [
          "power",
          "minor",
          "dim",
          "aug"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Heartland Rock",
        "desc": "Definitive Heartland Rock styling, characteristic of the Rock family.",
        "scales": [
          "Lydian",
          "Major Pentatonic",
          "Major"
        ],
        "chords": [
          "maj9",
          "sus2",
          "add9",
          "maj7"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Jam Bands",
        "desc": "Definitive Jam Bands styling, characteristic of the Rock family.",
        "scales": [
          "Locrian",
          "Phrygian",
          "Chromatic"
        ],
        "chords": [
          "7",
          "9",
          "13",
          "7#9"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Post-Punk",
        "desc": "Definitive Post-Punk styling, characteristic of the Rock family.",
        "scales": [
          "Melodic Minor",
          "Dorian",
          "Mixolydian"
        ],
        "chords": [
          "minor",
          "Major",
          "sus4",
          "min7"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Post-Rock",
        "desc": "Definitive Post-Rock styling, characteristic of the Rock family.",
        "scales": [
          "Whole Tone",
          "Altered",
          "Lydian Dominant"
        ],
        "chords": [
          "min(maj7)",
          "dim7",
          "aug",
          "Fr+6"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Prog-Rock",
        "desc": "Definitive Prog-Rock styling, characteristic of the Rock family.",
        "scales": [
          "Blues",
          "Minor Pentatonic",
          "Dorian"
        ],
        "chords": [
          "Major",
          "7",
          "min7",
          "sus4"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Psychedelic Rock",
        "desc": "Definitive Psychedelic Rock styling, characteristic of the Rock family.",
        "scales": [
          "Aeolian",
          "Harmonic Minor",
          "Phrygian"
        ],
        "chords": [
          "power",
          "sus2",
          "min9",
          "maj7#11"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Rock & Roll",
        "desc": "Definitive Rock & Roll styling, characteristic of the Rock family.",
        "scales": [
          "Major",
          "Minor Pentatonic",
          "Mixolydian"
        ],
        "chords": [
          "Major",
          "minor",
          "7",
          "power"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Rockabilly",
        "desc": "Definitive Rockabilly styling, characteristic of the Rock family.",
        "scales": [
          "Dorian",
          "Aeolian",
          "Blues"
        ],
        "chords": [
          "min7",
          "maj7",
          "min9",
          "11"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Roots Rock",
        "desc": "Definitive Roots Rock styling, characteristic of the Rock family.",
        "scales": [
          "Harmonic Minor",
          "Phrygian Dominant",
          "Double Harmonic"
        ],
        "chords": [
          "power",
          "minor",
          "dim",
          "aug"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Singer/Songwriter",
        "desc": "Definitive Singer/Songwriter styling, characteristic of the Rock family.",
        "scales": [
          "Lydian",
          "Major Pentatonic",
          "Major"
        ],
        "chords": [
          "maj9",
          "sus2",
          "add9",
          "maj7"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Southern Rock",
        "desc": "Definitive Southern Rock styling, characteristic of the Rock family.",
        "scales": [
          "Locrian",
          "Phrygian",
          "Chromatic"
        ],
        "chords": [
          "7",
          "9",
          "13",
          "7#9"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Stoner Rock",
        "desc": "Definitive Stoner Rock styling, characteristic of the Rock family.",
        "scales": [
          "Melodic Minor",
          "Dorian",
          "Mixolydian"
        ],
        "chords": [
          "minor",
          "Major",
          "sus4",
          "min7"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Surf Rock",
        "desc": "Definitive Surf Rock styling, characteristic of the Rock family.",
        "scales": [
          "Whole Tone",
          "Altered",
          "Lydian Dominant"
        ],
        "chords": [
          "min(maj7)",
          "dim7",
          "aug",
          "Fr+6"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Yacht Rock",
        "desc": "Definitive Yacht Rock styling, characteristic of the Rock family.",
        "scales": [
          "Blues",
          "Minor Pentatonic",
          "Dorian"
        ],
        "chords": [
          "Major",
          "7",
          "min7",
          "sus4"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Soft Rock",
        "desc": "Definitive Soft Rock styling, characteristic of the Rock family.",
        "scales": [
          "Aeolian",
          "Harmonic Minor",
          "Phrygian"
        ],
        "chords": [
          "power",
          "sus2",
          "min9",
          "maj7#11"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Pop Rock",
        "desc": "Definitive Pop Rock styling, characteristic of the Rock family.",
        "scales": [
          "Major",
          "Minor Pentatonic",
          "Mixolydian"
        ],
        "chords": [
          "Major",
          "minor",
          "7",
          "power"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Folk Rock",
        "desc": "Definitive Folk Rock styling, characteristic of the Rock family.",
        "scales": [
          "Dorian",
          "Aeolian",
          "Blues"
        ],
        "chords": [
          "min7",
          "maj7",
          "min9",
          "11"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Country Rock",
        "desc": "Definitive Country Rock styling, characteristic of the Rock family.",
        "scales": [
          "Harmonic Minor",
          "Phrygian Dominant",
          "Double Harmonic"
        ],
        "chords": [
          "power",
          "minor",
          "dim",
          "aug"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Jazz Rock",
        "desc": "Definitive Jazz Rock styling, characteristic of the Rock family.",
        "scales": [
          "Lydian",
          "Major Pentatonic",
          "Major"
        ],
        "chords": [
          "maj9",
          "sus2",
          "add9",
          "maj7"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Electronic Rock",
        "desc": "Definitive Electronic Rock styling, characteristic of the Rock family.",
        "scales": [
          "Locrian",
          "Phrygian",
          "Chromatic"
        ],
        "chords": [
          "7",
          "9",
          "13",
          "7#9"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Dance-Rock",
        "desc": "Definitive Dance-Rock styling, characteristic of the Rock family.",
        "scales": [
          "Melodic Minor",
          "Dorian",
          "Mixolydian"
        ],
        "chords": [
          "minor",
          "Major",
          "sus4",
          "min7"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Krautrock",
        "desc": "Definitive Krautrock styling, characteristic of the Rock family.",
        "scales": [
          "Whole Tone",
          "Altered",
          "Lydian Dominant"
        ],
        "chords": [
          "min(maj7)",
          "dim7",
          "aug",
          "Fr+6"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Space Rock",
        "desc": "Definitive Space Rock styling, characteristic of the Rock family.",
        "scales": [
          "Blues",
          "Minor Pentatonic",
          "Dorian"
        ],
        "chords": [
          "Major",
          "7",
          "min7",
          "sus4"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Garage Rock",
        "desc": "Definitive Garage Rock styling, characteristic of the Rock family.",
        "scales": [
          "Aeolian",
          "Harmonic Minor",
          "Phrygian"
        ],
        "chords": [
          "power",
          "sus2",
          "min9",
          "maj7#11"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      }
    ]
  },
  {
    "genre": "World & Ethnic",
    "icon": "🌍",
    "subgenres": [
      {
        "name": "Afro-Beat",
        "desc": "Definitive Afro-Beat styling, characteristic of the World & Ethnic family.",
        "scales": [
          "Lydian",
          "Major Pentatonic",
          "Major"
        ],
        "chords": [
          "maj9",
          "sus2",
          "add9",
          "maj7"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Afro-Pop",
        "desc": "Definitive Afro-Pop styling, characteristic of the World & Ethnic family.",
        "scales": [
          "Locrian",
          "Phrygian",
          "Chromatic"
        ],
        "chords": [
          "7",
          "9",
          "13",
          "7#9"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Highlife",
        "desc": "Definitive Highlife styling, characteristic of the World & Ethnic family.",
        "scales": [
          "Melodic Minor",
          "Dorian",
          "Mixolydian"
        ],
        "chords": [
          "minor",
          "Major",
          "sus4",
          "min7"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Jùjú",
        "desc": "Definitive Jùjú styling, characteristic of the World & Ethnic family.",
        "scales": [
          "Whole Tone",
          "Altered",
          "Lydian Dominant"
        ],
        "chords": [
          "min(maj7)",
          "dim7",
          "aug",
          "Fr+6"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Kwaito",
        "desc": "Definitive Kwaito styling, characteristic of the World & Ethnic family.",
        "scales": [
          "Blues",
          "Minor Pentatonic",
          "Dorian"
        ],
        "chords": [
          "Major",
          "7",
          "min7",
          "sus4"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Soukous",
        "desc": "Definitive Soukous styling, characteristic of the World & Ethnic family.",
        "scales": [
          "Aeolian",
          "Harmonic Minor",
          "Phrygian"
        ],
        "chords": [
          "power",
          "sus2",
          "min9",
          "maj7#11"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Taarab",
        "desc": "Definitive Taarab styling, characteristic of the World & Ethnic family.",
        "scales": [
          "Major",
          "Minor Pentatonic",
          "Mixolydian"
        ],
        "chords": [
          "Major",
          "minor",
          "7",
          "power"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Enka",
        "desc": "Definitive Enka styling, characteristic of the World & Ethnic family.",
        "scales": [
          "Dorian",
          "Aeolian",
          "Blues"
        ],
        "chords": [
          "min7",
          "maj7",
          "min9",
          "11"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Kayōkyoku",
        "desc": "Definitive Kayōkyoku styling, characteristic of the World & Ethnic family.",
        "scales": [
          "Harmonic Minor",
          "Phrygian Dominant",
          "Double Harmonic"
        ],
        "chords": [
          "power",
          "minor",
          "dim",
          "aug"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Dangdut",
        "desc": "Definitive Dangdut styling, characteristic of the World & Ethnic family.",
        "scales": [
          "Lydian",
          "Major Pentatonic",
          "Major"
        ],
        "chords": [
          "maj9",
          "sus2",
          "add9",
          "maj7"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Gamelan",
        "desc": "Definitive Gamelan styling, characteristic of the World & Ethnic family.",
        "scales": [
          "Locrian",
          "Phrygian",
          "Chromatic"
        ],
        "chords": [
          "7",
          "9",
          "13",
          "7#9"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Carnatic",
        "desc": "Definitive Carnatic styling, characteristic of the World & Ethnic family.",
        "scales": [
          "Melodic Minor",
          "Dorian",
          "Mixolydian"
        ],
        "chords": [
          "minor",
          "Major",
          "sus4",
          "min7"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Hindustani",
        "desc": "Definitive Hindustani styling, characteristic of the World & Ethnic family.",
        "scales": [
          "Whole Tone",
          "Altered",
          "Lydian Dominant"
        ],
        "chords": [
          "min(maj7)",
          "dim7",
          "aug",
          "Fr+6"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Bhangra",
        "desc": "Definitive Bhangra styling, characteristic of the World & Ethnic family.",
        "scales": [
          "Blues",
          "Minor Pentatonic",
          "Dorian"
        ],
        "chords": [
          "Major",
          "7",
          "min7",
          "sus4"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Qawwali",
        "desc": "Definitive Qawwali styling, characteristic of the World & Ethnic family.",
        "scales": [
          "Aeolian",
          "Harmonic Minor",
          "Phrygian"
        ],
        "chords": [
          "power",
          "sus2",
          "min9",
          "maj7#11"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Celtic",
        "desc": "Definitive Celtic styling, characteristic of the World & Ethnic family.",
        "scales": [
          "Major",
          "Minor Pentatonic",
          "Mixolydian"
        ],
        "chords": [
          "Major",
          "minor",
          "7",
          "power"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Flamenco",
        "desc": "Definitive Flamenco styling, characteristic of the World & Ethnic family.",
        "scales": [
          "Dorian",
          "Aeolian",
          "Blues"
        ],
        "chords": [
          "min7",
          "maj7",
          "min9",
          "11"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Fado",
        "desc": "Definitive Fado styling, characteristic of the World & Ethnic family.",
        "scales": [
          "Harmonic Minor",
          "Phrygian Dominant",
          "Double Harmonic"
        ],
        "chords": [
          "power",
          "minor",
          "dim",
          "aug"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Klezmer",
        "desc": "Definitive Klezmer styling, characteristic of the World & Ethnic family.",
        "scales": [
          "Lydian",
          "Major Pentatonic",
          "Major"
        ],
        "chords": [
          "maj9",
          "sus2",
          "add9",
          "maj7"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Polka",
        "desc": "Definitive Polka styling, characteristic of the World & Ethnic family.",
        "scales": [
          "Locrian",
          "Phrygian",
          "Chromatic"
        ],
        "chords": [
          "7",
          "9",
          "13",
          "7#9"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Piphat",
        "desc": "Definitive Piphat styling, characteristic of the World & Ethnic family.",
        "scales": [
          "Melodic Minor",
          "Dorian",
          "Mixolydian"
        ],
        "chords": [
          "minor",
          "Major",
          "sus4",
          "min7"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Mbalax",
        "desc": "Definitive Mbalax styling, characteristic of the World & Ethnic family.",
        "scales": [
          "Whole Tone",
          "Altered",
          "Lydian Dominant"
        ],
        "chords": [
          "min(maj7)",
          "dim7",
          "aug",
          "Fr+6"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Mbaqanga",
        "desc": "Definitive Mbaqanga styling, characteristic of the World & Ethnic family.",
        "scales": [
          "Blues",
          "Minor Pentatonic",
          "Dorian"
        ],
        "chords": [
          "Major",
          "7",
          "min7",
          "sus4"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Raï",
        "desc": "Definitive Raï styling, characteristic of the World & Ethnic family.",
        "scales": [
          "Aeolian",
          "Harmonic Minor",
          "Phrygian"
        ],
        "chords": [
          "power",
          "sus2",
          "min9",
          "maj7#11"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Sega",
        "desc": "Definitive Sega styling, characteristic of the World & Ethnic family.",
        "scales": [
          "Major",
          "Minor Pentatonic",
          "Mixolydian"
        ],
        "chords": [
          "Major",
          "minor",
          "7",
          "power"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Taarab",
        "desc": "Definitive Taarab styling, characteristic of the World & Ethnic family.",
        "scales": [
          "Dorian",
          "Aeolian",
          "Blues"
        ],
        "chords": [
          "min7",
          "maj7",
          "min9",
          "11"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Zouglou",
        "desc": "Definitive Zouglou styling, characteristic of the World & Ethnic family.",
        "scales": [
          "Harmonic Minor",
          "Phrygian Dominant",
          "Double Harmonic"
        ],
        "chords": [
          "power",
          "minor",
          "dim",
          "aug"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Genge",
        "desc": "Definitive Genge styling, characteristic of the World & Ethnic family.",
        "scales": [
          "Lydian",
          "Major Pentatonic",
          "Major"
        ],
        "chords": [
          "maj9",
          "sus2",
          "add9",
          "maj7"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Benga",
        "desc": "Definitive Benga styling, characteristic of the World & Ethnic family.",
        "scales": [
          "Locrian",
          "Phrygian",
          "Chromatic"
        ],
        "chords": [
          "7",
          "9",
          "13",
          "7#9"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Bongo Flava",
        "desc": "Definitive Bongo Flava styling, characteristic of the World & Ethnic family.",
        "scales": [
          "Melodic Minor",
          "Dorian",
          "Mixolydian"
        ],
        "chords": [
          "minor",
          "Major",
          "sus4",
          "min7"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Gnawa",
        "desc": "Definitive Gnawa styling, characteristic of the World & Ethnic family.",
        "scales": [
          "Whole Tone",
          "Altered",
          "Lydian Dominant"
        ],
        "chords": [
          "min(maj7)",
          "dim7",
          "aug",
          "Fr+6"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Marrabenta",
        "desc": "Definitive Marrabenta styling, characteristic of the World & Ethnic family.",
        "scales": [
          "Blues",
          "Minor Pentatonic",
          "Dorian"
        ],
        "chords": [
          "Major",
          "7",
          "min7",
          "sus4"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Kizomba",
        "desc": "Definitive Kizomba styling, characteristic of the World & Ethnic family.",
        "scales": [
          "Aeolian",
          "Harmonic Minor",
          "Phrygian"
        ],
        "chords": [
          "power",
          "sus2",
          "min9",
          "maj7#11"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Kuduro",
        "desc": "Definitive Kuduro styling, characteristic of the World & Ethnic family.",
        "scales": [
          "Major",
          "Minor Pentatonic",
          "Mixolydian"
        ],
        "chords": [
          "Major",
          "minor",
          "7",
          "power"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      },
      {
        "name": "Makossa",
        "desc": "Definitive Makossa styling, characteristic of the World & Ethnic family.",
        "scales": [
          "Dorian",
          "Aeolian",
          "Blues"
        ],
        "chords": [
          "min7",
          "maj7",
          "min9",
          "11"
        ],
        "progressions": [
          {
            "name": "i-bII",
            "numerals": [
              "i",
              "♭II"
            ],
            "desc": "Dark Phrygian"
          },
          {
            "name": "i-bV",
            "numerals": [
              "i",
              "♭V"
            ],
            "desc": "Tritone Tension"
          },
          {
            "name": "i-iv-V",
            "numerals": [
              "i",
              "iv",
              "V"
            ],
            "desc": "Harmonic Minor Resolution"
          }
        ]
      },
      {
        "name": "Maloya",
        "desc": "Definitive Maloya styling, characteristic of the World & Ethnic family.",
        "scales": [
          "Harmonic Minor",
          "Phrygian Dominant",
          "Double Harmonic"
        ],
        "chords": [
          "power",
          "minor",
          "dim",
          "aug"
        ],
        "progressions": [
          {
            "name": "Imaj7-IVmaj7",
            "numerals": [
              "Imaj7",
              "IVmaj7"
            ],
            "desc": "Dreamy Float"
          },
          {
            "name": "I-iii-IV-V",
            "numerals": [
              "I",
              "iii",
              "IV",
              "V"
            ],
            "desc": "Lush Ballad"
          },
          {
            "name": "I-Iaug-vi-I7",
            "numerals": [
              "I",
              "Iaug",
              "vi",
              "I7"
            ],
            "desc": "Chromatic Walkup"
          }
        ]
      },
      {
        "name": "Palm-Wine",
        "desc": "Definitive Palm-Wine styling, characteristic of the World & Ethnic family.",
        "scales": [
          "Lydian",
          "Major Pentatonic",
          "Major"
        ],
        "chords": [
          "maj9",
          "sus2",
          "add9",
          "maj7"
        ],
        "progressions": [
          {
            "name": "I-IV-V",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "Classic Foundation"
          },
          {
            "name": "vi-IV-I-V",
            "numerals": [
              "vi",
              "IV",
              "I",
              "V"
            ],
            "desc": "Modern Anthem"
          },
          {
            "name": "I-V-vi-IV",
            "numerals": [
              "I",
              "V",
              "vi",
              "IV"
            ],
            "desc": "The 4-Chord Hit"
          }
        ]
      },
      {
        "name": "Sawt",
        "desc": "Definitive Sawt styling, characteristic of the World & Ethnic family.",
        "scales": [
          "Locrian",
          "Phrygian",
          "Chromatic"
        ],
        "chords": [
          "7",
          "9",
          "13",
          "7#9"
        ],
        "progressions": [
          {
            "name": "ii-V-I",
            "numerals": [
              "ii",
              "V",
              "I"
            ],
            "desc": "Jazz Standard"
          },
          {
            "name": "Imaj7-vi7-ii7-V7",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Turnaround"
          },
          {
            "name": "I-vi-ii-V",
            "numerals": [
              "I",
              "vi",
              "ii",
              "V"
            ],
            "desc": "Rhythm Changes"
          }
        ]
      },
      {
        "name": "Fijiri",
        "desc": "Definitive Fijiri styling, characteristic of the World & Ethnic family.",
        "scales": [
          "Melodic Minor",
          "Dorian",
          "Mixolydian"
        ],
        "chords": [
          "minor",
          "Major",
          "sus4",
          "min7"
        ],
        "progressions": [
          {
            "name": "i-bVI-bVII",
            "numerals": [
              "i",
              "♭VI",
              "♭VII"
            ],
            "desc": "Epic Minor Descent"
          },
          {
            "name": "i-bIII-IV",
            "numerals": [
              "i",
              "♭III",
              "IV"
            ],
            "desc": "Heavy Riffing"
          },
          {
            "name": "i-VII-VI-V",
            "numerals": [
              "i",
              "VII",
              "VI",
              "V"
            ],
            "desc": "Andalusian / Doom Walk"
          }
        ]
      },
      {
        "name": "Khaliji",
        "desc": "Definitive Khaliji styling, characteristic of the World & Ethnic family.",
        "scales": [
          "Whole Tone",
          "Altered",
          "Lydian Dominant"
        ],
        "chords": [
          "min(maj7)",
          "dim7",
          "aug",
          "Fr+6"
        ],
        "progressions": [
          {
            "name": "I-bVII-IV",
            "numerals": [
              "I",
              "♭VII",
              "IV"
            ],
            "desc": "Mixolydian Shift"
          },
          {
            "name": "I7-IV7-V7",
            "numerals": [
              "I",
              "IV",
              "V"
            ],
            "desc": "12-Bar Groove"
          },
          {
            "name": "I-bIII-IV",
            "numerals": [
              "I",
              "♭III",
              "IV"
            ],
            "desc": "Blues Rock Core"
          }
        ]
      }
    ]
  }
] as const;

