import { PROGRESSIONS } from "./generated/theory-data";
import { getScaleNotes } from "./music";

export interface SongSection {
  type: string;
  lyrics: string;
}

export interface SongwritingDraft {
  title: string;
  mood: keyof typeof SONGWRITING_MOOD_BANK;
  style: string;
  theme: string;
  rhymeType: string;
  rhymeSchemeTarget: string;
  viewpoint: string;
  hookLine: string;
  objectPrompt: string;
  sections: SongSection[];
  notes: string;
  selectedProgression: string;
}

export interface SongwritingProsody {
  score: number;
  message: string;
  details: string[];
}

export const SONGWRITING_MOOD_BANK = {
  Reflective: {
    verbs: ["drift", "remember", "trace", "hold"],
    images: ["streetlights", "rain on glass", "old letters", "late train"],
    emotion: "introspective",
  },
  Uplifting: {
    verbs: ["rise", "run", "open", "ignite"],
    images: ["sunrise", "open road", "wide sky", "gold horizon"],
    emotion: "hopeful",
  },
  Heartbreak: {
    verbs: ["break", "fade", "leave", "ache"],
    images: ["empty room", "cold hallway", "silent phone", "fading neon"],
    emotion: "vulnerable",
  },
  Aggressive: {
    verbs: ["fight", "push", "burn", "strike"],
    images: ["concrete", "sirens", "sparks", "black smoke"],
    emotion: "defiant",
  },
  Romantic: {
    verbs: ["breathe", "touch", "wait", "lean"],
    images: ["moonlight", "warm skin", "slow dance", "city lights"],
    emotion: "intimate",
  },
} as const;

export const RHYME_TYPE_REFERENCE = [
  { id: "perfect", name: "Perfect" },
  { id: "identical", name: "Identical" },
  { id: "slant", name: "Slant" },
  { id: "assonance", name: "Assonance" },
  { id: "consonance", name: "Consonance" },
  { id: "multisyllabic", name: "Multisyllabic" },
  { id: "internal", name: "Internal" },
  { id: "off", name: "Off Rhyme" },
];

export const SONGWRITING_METHODS = [
  { name: "Object Writing", focus: "Sensory detail", how: "Write for 10 minutes about one concrete object using all five senses." },
  { name: "Prosody Check", focus: "Emotion-form alignment", how: "Match vowel length, rhythm density, and consonant hardness to emotional intent." },
  { name: "Title Ladder", focus: "Hook clarity", how: "Generate 10 titles, then test each as the first and last line of the chorus." },
  { name: "Point-of-View Shift", focus: "Narrative depth", how: "Rewrite one section in 1st, 2nd, and 3rd person." },
  { name: "Section Purpose Map", focus: "Structure", how: "Assign each section one job: setup, escalation, payoff, reflection, or release." },
  { name: "Show-Don't-Tell Rewrite", focus: "Imagery", how: "Replace abstract words with concrete nouns, actions, and sensory cues." },
  { name: "Rhyme Density Control", focus: "Flow", how: "Use stronger rhyme in hooks and looser rhyme in narrative lines." },
  { name: "Stress Grid", focus: "Singability", how: "Place key meaning words on strong beats and filler syllables on weaker ones." },
  { name: "Metaphor Chain", focus: "Uniqueness", how: "Pick one metaphor source and extend it across sections without repeating exact phrasing." },
  { name: "Contrast Pass", focus: "Dynamic shape", how: "Increase contrast each section by changing lyric length and image intensity." },
  { name: "Rewrite Ratio", focus: "Editing discipline", how: "Draft three alternatives for every keeper line." },
  { name: "Phonetic Hook Test", focus: "Memorability", how: "Prefer high-impact consonants and open vowels in hook words." },
];

export const SONG_FORM_TEMPLATES: Record<string, string[]> = {
  "Pop Standard": ["Intro", "Verse 1", "Chorus", "Verse 2", "Chorus", "Bridge", "Chorus", "Outro"],
  "Radio Pop": ["Intro", "Verse 1", "Pre-Chorus", "Chorus", "Verse 2", "Pre-Chorus", "Chorus", "Outro"],
  "Pop Ballad": ["Intro", "Verse 1", "Verse 2", "Chorus", "Bridge", "Chorus", "Outro"],
  "AABA Standard": ["Section A1", "Section A2", "Section B", "Section A3"],
  "Singer-Songwriter": ["Verse 1", "Verse 2", "Chorus", "Verse 3", "Chorus", "Outro"],
  "Country Standard": ["Intro", "Verse 1", "Chorus", "Verse 2", "Chorus", "Bridge", "Chorus"],
  "Hip-Hop Standard": ["Intro", "Verse 1", "Hook", "Verse 2", "Hook", "Verse 3", "Hook", "Outro"],
  "R&B / Soul": ["Intro", "Verse 1", "Pre-Chorus", "Chorus", "Verse 2", "Pre-Chorus", "Chorus", "Bridge", "Outro"],
  "EDM Build": ["Intro", "Break", "Build", "Drop 1", "Breakdown", "Build", "Drop 2", "Outro"],
  "Jazz Head": ["Intro", "Head", "Solo", "Head Out", "Ending"],
  "Folk Ballad": ["Verse 1", "Verse 2", "Refrain", "Verse 3", "Refrain", "Outro"],
  "Main Title": ["Intro", "Theme", "Development", "Climax", "Resolution", "Fade"],
  "Trailer Structure": ["Act I", "The Turn", "Act II", "Act III", "Final Button"],
  "Video Game Loop": ["Intro", "Loop A", "Variation", "Loop B", "Loop Point"],
  "Reggaeton": ["Intro", "Verse 1", "Chorus", "Verse 2", "Chorus", "Bridge", "Outro"],
  "K-Pop": ["Intro", "Verse 1", "Pre-Chorus", "Chorus", "Verse 2", "Rap", "Bridge", "Chorus", "Outro"],
};

export const SONGWRITING_STYLES = [
  "Pop",
  "Rock",
  "Hip-Hop",
  "R&B",
  "Country",
  "Latin",
  "Electronic",
  "Jazz",
  "Cinematic",
];

export const SONGWRITING_VIEWPOINTS = [
  "1st Person",
  "2nd Person",
  "3rd Person",
  "Omniscient",
  "Character Voice",
];

export function createDefaultSongwritingDraft(): SongwritingDraft {
  return {
    title: "Untitled Song",
    mood: "Reflective",
    style: "Pop",
    theme: "",
    rhymeType: "perfect",
    rhymeSchemeTarget: "ABAB",
    viewpoint: "1st Person",
    hookLine: "",
    objectPrompt: "",
    sections: [
      { type: "Verse 1", lyrics: "" },
      { type: "Chorus", lyrics: "" },
      { type: "Verse 2", lyrics: "" },
      { type: "Bridge", lyrics: "" },
    ],
    notes: "",
    selectedProgression: "I-V-vi-IV",
  };
}

function normalizeWord(word: string) {
  return word.toLowerCase().replace(/[^a-z']/g, "").replace(/^'+|'+$/g, "");
}

function countWordSyllables(word: string) {
  const normalized = normalizeWord(word);
  if (!normalized) return 0;
  const clean = normalized.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "").replace(/^y/, "");
  const matches = clean.match(/[aeiouy]{1,2}/g);
  return Math.max(1, matches ? matches.length : 1);
}

export function countSyllables(text: string) {
  const words = text.toLowerCase().match(/[a-z']+/g) || [];
  return words.reduce((sum, word) => sum + countWordSyllables(word), 0);
}

function getVowelTail(word: string) {
  const normalized = normalizeWord(word);
  const match = normalized.match(/[aeiouy]+[^aeiouy]*$/);
  return match ? match[0] : normalized;
}

function getConsonantTail(word: string) {
  const normalized = normalizeWord(word);
  const match = normalized.match(/[^aeiouy]+$/);
  return match ? match[0] : "";
}

function getVowelPattern(word: string) {
  return (normalizeWord(word).match(/[aeiouy]+/g) || []).join("-");
}

function getMultiSyllableTail(word: string) {
  const normalized = normalizeWord(word);
  const vowels = [...normalized.matchAll(/[aeiouy]+/g)];
  if (!vowels.length) return normalized;
  if (vowels.length === 1) return getVowelTail(normalized);
  const start = vowels[Math.max(0, vowels.length - 2)].index ?? 0;
  return normalized.slice(start);
}

function levenshtein(left: string, right: string) {
  const matrix = Array.from({ length: left.length + 1 }, (_, row) =>
    Array.from({ length: right.length + 1 }, (_, col) => (row === 0 ? col : col === 0 ? row : 0)),
  );

  for (let row = 1; row <= left.length; row += 1) {
    for (let col = 1; col <= right.length; col += 1) {
      const cost = left[row - 1] === right[col - 1] ? 0 : 1;
      matrix[row][col] = Math.min(
        matrix[row - 1][col] + 1,
        matrix[row][col - 1] + 1,
        matrix[row - 1][col - 1] + cost,
      );
    }
  }

  return matrix[left.length][right.length];
}

function rhymeTypeAlias(type: string) {
  const alias: Record<string, string> = {
    internal: "assonance",
    end: "perfect",
    head: "consonance",
    mosaic: "multisyllabic",
    broken: "slant",
    holorhyme: "multisyllabic",
    forced: "slant",
    wrenched: "slant",
    off: "slant",
  };

  return alias[type] || type;
}

function getLineEndingWords(text: string) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const words = line.match(/[A-Za-z']+/g) || [];
      return normalizeWord(words[words.length - 1] || "");
    })
    .filter(Boolean);
}

export function detectRhymeScheme(text: string, type = "perfect") {
  const endings = getLineEndingWords(text);
  if (!endings.length) return { scheme: "", lines: [] as { line: number; word: string; label: string }[] };

  const labels: string[] = [];
  const keys: string[] = [];
  const normalizedType = rhymeTypeAlias(type);
  const letterCode = 65;

  endings.forEach((word) => {
    const key = normalizedType === "multisyllabic" ? getMultiSyllableTail(word) : getVowelTail(word);
    let matchIndex = keys.findIndex((candidate) => {
      if (normalizedType === "slant") return levenshtein(candidate, key) <= 1;
      if (normalizedType === "assonance") {
        return getVowelPattern(candidate) === getVowelPattern(key) || getVowelTail(candidate) === getVowelTail(key);
      }
      if (normalizedType === "consonance") return getConsonantTail(candidate) === getConsonantTail(key);
      return candidate === key;
    });

    if (matchIndex === -1) {
      keys.push(key);
      matchIndex = keys.length - 1;
    }

    labels.push(String.fromCharCode(letterCode + matchIndex));
  });

  return {
    scheme: labels.join(""),
    lines: endings.map((word, index) => ({
      line: index + 1,
      word,
      label: labels[index],
    })),
  };
}

export function getEndWordFrequency(text: string) {
  const counts = new Map<string, number>();
  getLineEndingWords(text).forEach((word) => counts.set(word, (counts.get(word) || 0) + 1));
  return [...counts.entries()].sort((left, right) => right[1] - left[1]).slice(0, 8);
}

export function getLineMetrics(text: string) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      const words = line.match(/[A-Za-z']+/g) || [];
      const endWord = normalizeWord(words[words.length - 1] || "");
      return {
        line: index + 1,
        syllables: countSyllables(line),
        words: words.length,
        endWord,
      };
    });
}

function pickRandom<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

export function generateObjectPrompt(mood: keyof typeof SONGWRITING_MOOD_BANK, theme: string) {
  const objects = ["rear-view mirror", "hotel hallway", "streetlamp", "old jacket", "coffee cup", "subway platform", "cracked phone screen", "back seat"];
  const senses = ["sound", "smell", "texture", "temperature", "color", "motion"];
  const times = ["at 2AM", "during rain", "just before sunrise", "after an argument", "before a goodbye", "in summer heat"];

  return `Write for 10 minutes about "${pickRandom(objects)}" ${pickRandom(times)}. Focus on ${pickRandom(
    senses,
  )}, then connect it to ${theme || SONGWRITING_MOOD_BANK[mood].emotion} in one closing line.`;
}

export function generateSongTitleIdeas(draft: SongwritingDraft) {
  const theme = (draft.theme || "the moment").trim();
  const bank = SONGWRITING_MOOD_BANK[draft.mood] || SONGWRITING_MOOD_BANK.Reflective;
  const ideas = new Set<string>();
  const templates = [
    (verb: string, _image: string) => `${verb.charAt(0).toUpperCase() + verb.slice(1)} ${theme}`.slice(0, 36),
    (_verb: string, image: string) => `${theme} in ${image}`,
    (verb: string, image: string) => `${verb.charAt(0).toUpperCase() + verb.slice(1)} the ${image}`.slice(0, 36),
    (_verb: string, image: string) => `${image} for ${theme}`.slice(0, 36),
  ];

  let attempts = 0;
  while (ideas.size < 10 && attempts < 64) {
    const verb = pickRandom([...bank.verbs]);
    const image = pickRandom([...bank.images]);
    const template = templates[attempts % templates.length];
    ideas.add(template(verb, image));
    attempts += 1;
  }

  return [...ideas].slice(0, 10);
}

export function generateHookIdeas(draft: SongwritingDraft) {
  const theme = (draft.theme || "this story").trim();
  const hookSeed = draft.hookLine.trim();
  const bank = SONGWRITING_MOOD_BANK[draft.mood] || SONGWRITING_MOOD_BANK.Reflective;
  const templates = [
    () => `I ${pickRandom([...bank.verbs])} through ${pickRandom([...bank.images])}, still chasing ${theme}`,
    () => `${theme} ${pickRandom([...bank.verbs])}s in the ${pickRandom([...bank.images])}`,
    () => `If ${theme} is a ${pickRandom([...bank.images])}, I'm the one who ${pickRandom([...bank.verbs])}`,
    () => `${pickRandom([...bank.images])} nights, ${theme} fights, and I keep ${pickRandom([...bank.verbs])}ing`,
    () => `We ${pickRandom([...bank.verbs])} like ${pickRandom([...bank.images])} under ${bank.emotion} skies`,
    () => `${pickRandom([...bank.verbs])} me back to ${theme} in the ${pickRandom([...bank.images])}`,
  ];

  if (hookSeed) {
    templates.push(
      () => `${hookSeed} — ${pickRandom([...bank.verbs])} through ${pickRandom([...bank.images])}`,
      () => `${hookSeed} (still ${pickRandom([...bank.verbs])}ing ${theme})`,
    );
  }

  const ideas = new Set<string>();
  while (ideas.size < 8) ideas.add(templates[Math.floor(Math.random() * templates.length)]());
  return [...ideas];
}

export function generateLineStarters(draft: SongwritingDraft) {
  const theme = (draft.theme || "this story").trim();
  const bank = SONGWRITING_MOOD_BANK[draft.mood] || SONGWRITING_MOOD_BANK.Reflective;
  const starters = [
    () => `In the ${pickRandom([...bank.images])}, I ${pickRandom([...bank.verbs])} ${theme}`,
    () => `We ${pickRandom([...bank.verbs])} past the ${pickRandom([...bank.images])}`,
    () => `${theme} tastes like ${pickRandom([...bank.images])}`,
    () => `I keep ${pickRandom([...bank.verbs])}ing when the ${pickRandom([...bank.images])} fades`,
    () => `Under ${bank.emotion} lights, we ${pickRandom([...bank.verbs])}`,
    () => `The ${pickRandom([...bank.images])} knows how ${theme} feels`,
  ];

  const ideas = new Set<string>();
  while (ideas.size < 6) ideas.add(starters[Math.floor(Math.random() * starters.length)]());
  return [...ideas];
}

export function runSongProsodyCheck(text: string): SongwritingProsody {
  const metrics = getLineMetrics(text);
  if (!metrics.length) {
    return {
      score: 0,
      message: "Add lyric lines to analyze stress and line balance.",
      details: [],
    };
  }

  const syllables = metrics.map((metric) => metric.syllables);
  const average = syllables.reduce((sum, value) => sum + value, 0) / syllables.length;
  const variance =
    syllables.reduce((sum, value) => sum + Math.pow(value - average, 2), 0) / syllables.length;
  const spreadPenalty = Math.min(30, variance * 2.8);
  const shortPenalty = syllables.some((value) => value < 4) ? 10 : 0;
  const score = Math.max(0, Math.round(100 - spreadPenalty - shortPenalty));
  const details = [];

  if (average > 14) details.push("Average line length is high; tighten phrases for singability.");
  if (average < 6) details.push("Lines are very short; consider adding connective detail.");
  if (variance > 8) details.push("Large syllable variance. Match line lengths for stronger flow.");
  if (!details.length) details.push("Line lengths are balanced. Good rhythmic consistency.");

  return {
    score,
    message: score >= 80 ? "Strong prosodic consistency." : "Prosody can be improved.",
    details,
  };
}

export function getSongProgressionOptions(style: string) {
  const styleMap: Record<string, string[]> = {
    Pop: ["Pop", "Ballad", "Indie"],
    Rock: ["Rock", "Indie", "Metal"],
    "Hip-Hop": ["Hip-Hop", "Trap", "R&B"],
    "R&B": ["R&B", "Soul", "Gospel"],
    Country: ["Country", "Folk"],
    Latin: ["Latin", "World", "Flamenco"],
    Electronic: ["Electronic", "Cinematic"],
    Jazz: ["Jazz", "Jazz Fusion", "Fusion"],
    Cinematic: ["Cinematic", "Ballad", "Classical"],
  };

  const targets = styleMap[style] || [style];
  return PROGRESSIONS.filter((progression) => targets.includes(progression.style)).slice(0, 12);
}

export function generateSongProgression(style: string) {
  const options = getSongProgressionOptions(style);
  return options[Math.floor(Math.random() * options.length)] ?? null;
}

export function analyzeSongProgression(style: string, selectedProgression: string) {
  const found = getSongProgressionOptions(style).find((progression) => progression.name === selectedProgression);
  if (!found) return null;

  return {
    ...found,
    functions: found.numerals.map((numeral) => {
      if (numeral.startsWith("I") || numeral.startsWith("i") || numeral.startsWith("vi")) return "Tonic";
      if (numeral.startsWith("IV") || numeral.startsWith("ii")) return "Subdominant";
      if (numeral.startsWith("V") || numeral.startsWith("vii")) return "Dominant";
      return "Modal/Chromatic";
    }),
  };
}

export function generateMelodySketch(currentKey: string) {
  const scale = getScaleNotes(currentKey);
  const melody: string[] = [];
  const degrees: number[] = [];

  for (let index = 0; index < 8; index += 1) {
    const degreeIndex = Math.floor(Math.random() * scale.length);
    melody.push(scale[degreeIndex].replace(/[0-9]/g, ""));
    degrees.push(degreeIndex + 1);
  }

  return {
    melody,
    degrees,
    text: `Melody Sketch (${currentKey}): ${melody.join(" - ")} (Degrees: ${degrees.join("-")})`,
  };
}
