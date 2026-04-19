import {
  ALL_SCALES,
  CHORD_TEMPLATES,
  NOTES,
  type ScaleMap,
  getIntervalName,
  getNotesFromIntervals,
} from "./music";

export type QuizDifficulty = "easy" | "medium" | "hard";
export type QuizQuestionType = "multi" | "truefalse" | "input";

export interface QuizQuestion {
  text: string;
  correct: string;
  options: string[];
  difficulty: QuizDifficulty;
  type: QuizQuestionType;
}

function shuffle<T>(items: T[]) {
  const next = [...items];
  for (let index = next.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [next[index], next[swapIndex]] = [next[swapIndex], next[index]];
  }
  return next;
}

function uniqueOptions(options: string[]) {
  const next: string[] = [];
  options.forEach((option) => {
    if (!next.includes(option)) next.push(option);
  });
  while (next.length < 4) {
    const fallback = NOTES[Math.floor(Math.random() * NOTES.length)];
    if (!next.includes(fallback)) next.push(fallback);
  }
  return next.slice(0, 4);
}

function getRandomScale() {
  const note = NOTES[Math.floor(Math.random() * 12)];
  return getNotesFromIntervals(`${note}4`, [0, 2, 4, 5, 7, 9, 11])
    .map((item) => item.replace(/[0-9]/g, ""))
    .join(", ");
}

function getRandomChord() {
  const note = NOTES[Math.floor(Math.random() * 12)];
  return getNotesFromIntervals(`${note}4`, [0, 4, 7])
    .map((item) => item.replace(/[0-9]/g, ""))
    .join(", ");
}

function fifth(note: string) {
  return NOTES[(NOTES.indexOf(note as (typeof NOTES)[number]) + 7) % 12];
}

type ScaleName = keyof ScaleMap;

const quizBank: Array<() => QuizQuestion> = [
  () => {
    const note = NOTES[Math.floor(Math.random() * 12)];
    const scale = getNotesFromIntervals(`${note}4`, [0, 2, 4, 5, 7, 9, 11]).map((item) =>
      item.replace(/[0-9]/g, ""),
    );
    return {
      text: `What are the notes in ${note} Major scale?`,
      correct: scale.join(", "),
      options: uniqueOptions([scale.join(", "), getRandomScale(), getRandomScale(), getRandomScale()]),
      difficulty: "easy",
      type: "multi",
    };
  },
  () => {
    const note = NOTES[Math.floor(Math.random() * 12)];
    const chord = getNotesFromIntervals(`${note}4`, [0, 4, 7]).map((item) =>
      item.replace(/[0-9]/g, ""),
    );
    return {
      text: `What notes are in a ${note} Major chord?`,
      correct: chord.join(", "),
      options: uniqueOptions([chord.join(", "), getRandomChord(), getRandomChord(), getRandomChord()]),
      difficulty: "easy",
      type: "multi",
    };
  },
  () => {
    const semitones = Math.floor(Math.random() * 13);
    return {
      text: `Name the interval that spans ${semitones} semitone${semitones === 1 ? "" : "s"}.`,
      correct: getIntervalName(semitones),
      options: uniqueOptions([
        getIntervalName(semitones),
        getIntervalName((semitones + 2) % 12),
        getIntervalName((semitones + 7) % 12),
        getIntervalName((semitones + 10) % 12),
      ]),
      difficulty: "easy",
      type: "multi",
    };
  },
  () => {
    const modes = ["Ionian", "Dorian", "Phrygian", "Lydian", "Mixolydian", "Aeolian", "Locrian"];
    const mode = modes[Math.floor(Math.random() * modes.length)];
    const degree = modes.indexOf(mode) + 1;
    return {
      text: `What scale degree does ${mode} mode start on?`,
      correct: degree.toString(),
      options: uniqueOptions([
        `${degree}`,
        `${((degree + 1) % 7) || 7}`,
        `${((degree + 3) % 7) || 7}`,
        `${((degree + 5) % 7) || 7}`,
      ]),
      difficulty: "medium",
      type: "multi",
    };
  },
  () => {
    const note = NOTES[Math.floor(Math.random() * 12)];
    const relativeMinor = NOTES[(NOTES.indexOf(note as (typeof NOTES)[number]) + 9) % 12];
    return {
      text: `What is the relative minor of ${note} Major?`,
      correct: relativeMinor,
      options: uniqueOptions([
        relativeMinor,
        NOTES[(NOTES.indexOf(note as (typeof NOTES)[number]) + 3) % 12],
        NOTES[(NOTES.indexOf(note as (typeof NOTES)[number]) + 7) % 12],
        NOTES[(NOTES.indexOf(note as (typeof NOTES)[number]) + 5) % 12],
      ]),
      difficulty: "medium",
      type: "multi",
    };
  },
  () => {
    const worldScales = (Object.keys(ALL_SCALES) as ScaleName[]).filter(
      (name) => ALL_SCALES[name].region !== "Western",
    );
    const scale = worldScales[Math.floor(Math.random() * worldScales.length)];
    return {
      text: `What region is ${scale} from?`,
      correct: ALL_SCALES[scale].region,
      options: uniqueOptions([ALL_SCALES[scale].region, "Western", "Blues/Jazz", "European"]),
      difficulty: "hard",
      type: "multi",
    };
  },
  () => {
    const intervalSemitones = Math.floor(Math.random() * 12) + 1;
    return {
      text: `True or False: ${getIntervalName(intervalSemitones)} equals ${intervalSemitones} semitone${intervalSemitones === 1 ? "" : "s"}.`,
      correct: "True",
      options: ["True", "False"],
      difficulty: "medium",
      type: "truefalse",
    };
  },
  () => {
    const note = NOTES[Math.floor(Math.random() * NOTES.length)];
    const quality = Math.random() > 0.5 ? "Major" : "minor";
    const intervals = quality === "Major" ? [0, 4, 7] : [0, 3, 7];
    const chord = getNotesFromIntervals(`${note}4`, intervals).map((item) =>
      item.replace(/[0-9]/g, ""),
    );
    return {
      text: `Type the middle note of ${note} ${quality} triad (${chord.join(", ")}).`,
      correct: chord[1],
      options: [],
      difficulty: "hard",
      type: "input",
    };
  },
  () => {
    const chords = ["maj7", "min7", "7", "min7b5"] as const;
    const quality = chords[Math.floor(Math.random() * chords.length)];
    const formula = CHORD_TEMPLATES[quality].intervals.join("-");
    return {
      text: `What is the semitone formula for a ${quality} chord?`,
      correct: formula,
      options: uniqueOptions([formula, "0-4-7-11", "0-3-7-10", "0-4-7-10", "0-3-6-10"]),
      difficulty: "medium",
      type: "multi",
    };
  },
  () => {
    const note = NOTES[Math.floor(Math.random() * 12)];
    return {
      text: `What is the Perfect 5th of ${note}?`,
      correct: fifth(note),
      options: uniqueOptions([
        fifth(note),
        NOTES[(NOTES.indexOf(note as (typeof NOTES)[number]) + 6) % 12],
        NOTES[(NOTES.indexOf(note as (typeof NOTES)[number]) + 8) % 12],
        NOTES[(NOTES.indexOf(note as (typeof NOTES)[number]) + 5) % 12],
      ]),
      difficulty: "easy",
      type: "multi",
    };
  },
  () => {
    const scaleNames: ScaleName[] = ["Phrygian Dominant", "Lydian", "Mixolydian", "Dorian"];
    const scale = scaleNames[Math.floor(Math.random() * scaleNames.length)];
    const description = ALL_SCALES[scale].desc;
    return {
      text: `Which scale is described as: "${description}"?`,
      correct: scale,
      options: uniqueOptions([scale, ...scaleNames.filter((candidate) => candidate !== scale)]),
      difficulty: "medium",
      type: "multi",
    };
  },
  () => {
    const note = NOTES[Math.floor(Math.random() * 12)];
    const tritone = NOTES[(NOTES.indexOf(note as (typeof NOTES)[number]) + 6) % 12];
    return {
      text: `What note is a Tritone away from ${note}?`,
      correct: tritone,
      options: uniqueOptions([
        tritone,
        fifth(note),
        NOTES[(NOTES.indexOf(note as (typeof NOTES)[number]) + 1) % 12],
        NOTES[(NOTES.indexOf(note as (typeof NOTES)[number]) + 11) % 12],
      ]),
      difficulty: "medium",
      type: "multi",
    };
  },
  () => {
    const enharmonicMap: Record<string, string> = {
      "C#": "Db",
      "D#": "Eb",
      "F#": "Gb",
      "G#": "Ab",
      "A#": "Bb",
    };
    const keys = Object.keys(enharmonicMap);
    const key = keys[Math.floor(Math.random() * keys.length)];
    return {
      text: `What is the common enharmonic equivalent of ${key}?`,
      correct: enharmonicMap[key],
      options: uniqueOptions([enharmonicMap[key], "B#", "Cb", "E#", "Fb"]),
      difficulty: "easy",
      type: "multi",
    };
  },
];

export function generateQuizQuestions(difficulty: QuizDifficulty) {
  const counts: Record<QuizDifficulty, number> = {
    easy: 10,
    medium: 15,
    hard: 20,
  };

  const filtered = quizBank.filter((builder) => {
    const sample = builder();
    if (difficulty === "easy") return sample.difficulty === "easy";
    if (difficulty === "medium") return sample.difficulty === "easy" || sample.difficulty === "medium";
    return true;
  });

  return Array.from({ length: counts[difficulty] }, () => {
    const builder = filtered[Math.floor(Math.random() * filtered.length)];
    return builder();
  });
}

export function getQuizXpPerCorrect(difficulty: QuizDifficulty) {
  return { easy: 10, medium: 20, hard: 50 }[difficulty];
}

export function getShuffledOptions(question: QuizQuestion) {
  return question.options.length ? shuffle(question.options) : [];
}
