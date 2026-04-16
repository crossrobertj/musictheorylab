import { useEffect, useMemo, useState } from "react";
import {
  playChord,
  playNote,
  playNoteSequence,
  playRhythmPattern,
} from "../../audio/audioEngine";
import { useAppStore } from "../../app/store/useAppStore";
import {
  CHORD_TEMPLATES,
  NOTES,
  getIntervalName,
  getNotesFromIntervals,
  getScaleNotes,
  transposeNote,
} from "../../domain/music";

type EarChallengeType = "note" | "interval" | "chord" | "melody" | "rhythm";
type EarDifficulty = "easy" | "medium" | "hard";
type IntervalDirection = "ascending" | "descending" | "harmonic";
type ChordPool = "basic" | "seventh" | "all";

interface EarStats {
  total: number;
  correct: number;
  streak: number;
}

type EarPayload =
  | { kind: "note"; notes: string[] }
  | { kind: "interval"; notes: [string, string]; direction: IntervalDirection }
  | { kind: "chord"; notes: string[] }
  | { kind: "melody"; notes: string[] }
  | { kind: "rhythm"; pattern: number[]; mapping: Record<"Pattern A" | "Pattern B", string> };

interface EarChallenge {
  prompt: string;
  answer: string;
  options: string[];
  payload: EarPayload;
}

const TYPE_LABELS: Record<EarChallengeType, string> = {
  note: "Note ID",
  interval: "Interval ID",
  chord: "Chord Quality",
  melody: "Melodic Dictation",
  rhythm: "Rhythm Dictation",
};

const TYPE_TIPS: Record<EarChallengeType, string> = {
  note: "Listen for the pitch class and compare it to an internal home note.",
  interval: "Anchor the sound to familiar references: perfect 5th, tritone, major/minor 3rd.",
  chord: "Major, minor, diminished, and extended colors each have a distinct tension profile.",
  melody: "Track scale-degree movement relative to the current key center instead of isolated notes.",
  rhythm: "Feel the pulse first, then compare the accent placement against the two patterns.",
};

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

function randomFrom<T>(items: readonly T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

function buildEarChallenge(
  type: EarChallengeType,
  difficulty: EarDifficulty,
  currentKey: string,
  intervalDirection: IntervalDirection,
  chordPool: ChordPool,
): EarChallenge {
  const root = randomFrom(NOTES);
  const rootWithOctave = `${root}4`;

  if (type === "note") {
    const notePool = difficulty === "easy" ? ["C", "G", "F", "E", "A"] : [...NOTES];
    const target = randomFrom(notePool);
    return {
      prompt: "Identify this single note.",
      answer: target,
      options: uniqueOptions([target, ...shuffle(notePool).filter((note) => note !== target).slice(0, 3)]),
      payload: { kind: "note", notes: [`${target}4`] },
    };
  }

  if (type === "interval") {
    const pools: Record<EarDifficulty, number[]> = {
      easy: [7, 12, 5],
      medium: [3, 4, 2, 7, 12, 5, 10],
      hard: [1, 6, 8, 9, 11],
    };
    const semitones = randomFrom(pools[difficulty]);
    const top = transposeNote(rootWithOctave, semitones);
    const answer = getIntervalName(semitones);
    return {
      prompt: `Identify this ${intervalDirection} interval.`,
      answer,
      options: uniqueOptions([
        answer,
        getIntervalName(((semitones + 2) % 12) || 12),
        getIntervalName(((semitones + 5) % 12) || 12),
        getIntervalName(((semitones + 7) % 12) || 12),
      ]),
      payload: {
        kind: "interval",
        notes: [rootWithOctave, top],
        direction: intervalDirection,
      },
    };
  }

  if (type === "chord") {
    const pools: Record<ChordPool, string[]> = {
      basic: ["Major", "minor", "dim", "aug"],
      seventh: ["maj7", "min7", "7", "min7b5", "dim7"],
      all: ["maj9", "min9", "9", "13", "7b9"],
    };
    const pool = pools[chordPool].filter((quality) => quality in CHORD_TEMPLATES);
    const quality = randomFrom(pool);
    return {
      prompt: "Identify this chord quality.",
      answer: quality,
      options: uniqueOptions([quality, ...shuffle(pool).filter((value) => value !== quality).slice(0, 3)]),
      payload: {
        kind: "chord",
        notes: getNotesFromIntervals(rootWithOctave, CHORD_TEMPLATES[quality as keyof typeof CHORD_TEMPLATES].intervals),
      },
    };
  }

  if (type === "melody") {
    const length = difficulty === "easy" ? 3 : difficulty === "medium" ? 5 : 7;
    const scale = getScaleNotes(currentKey);
    const melody: string[] = [];
    const degrees: number[] = [];
    for (let index = 0; index < length; index += 1) {
      const degreeIndex = Math.floor(Math.random() * scale.length);
      melody.push(scale[degreeIndex]);
      degrees.push(degreeIndex + 1);
    }
    return {
      prompt: `Type the scale degrees (1-7) for this ${length}-note melody.`,
      answer: degrees.join("-"),
      options: [],
      payload: { kind: "melody", notes: melody },
    };
  }

  const length = difficulty === "easy" ? 4 : difficulty === "medium" ? 8 : 16;
  const pattern = Array.from({ length }, () => (Math.random() > 0.4 ? 1 : 0));
  const alternate = pattern.map((value) => 1 - value);
  const mapping =
    Math.random() > 0.5
      ? { "Pattern A": pattern.join(""), "Pattern B": alternate.join("") }
      : { "Pattern A": alternate.join(""), "Pattern B": pattern.join("") };
  const answer = (Object.keys(mapping) as Array<keyof typeof mapping>).find(
    (label) => mapping[label] === pattern.join(""),
  )!;

  return {
    prompt: "Listen to the rhythm. Is it Pattern A or B?",
    answer,
    options: ["Pattern A", "Pattern B"],
    payload: { kind: "rhythm", pattern, mapping },
  };
}

export function EarTrainerPage() {
  const currentKey = useAppStore((state) => state.currentKey);
  const [type, setType] = useState<EarChallengeType>("note");
  const [difficulty, setDifficulty] = useState<EarDifficulty>("easy");
  const [intervalDirection, setIntervalDirection] = useState<IntervalDirection>("ascending");
  const [chordPool, setChordPool] = useState<ChordPool>("basic");
  const [challenge, setChallenge] = useState<EarChallenge | null>(null);
  const [stats, setStats] = useState<EarStats>({ total: 0, correct: 0, streak: 0 });
  const [feedback, setFeedback] = useState<{ ok: boolean; message: string } | null>(null);
  const [dictationAnswer, setDictationAnswer] = useState("");

  const accuracy = stats.total ? Math.round((stats.correct / stats.total) * 100) : 0;
  const tip = TYPE_TIPS[type];

  function replayCurrentChallenge(target = challenge) {
    if (!target) return;

    const payload = target.payload;
    if (payload.kind === "note") {
      playNote(payload.notes[0], 420);
      return;
    }
    if (payload.kind === "interval") {
      if (payload.direction === "ascending") {
        playNoteSequence(payload.notes, 600, 360);
      } else if (payload.direction === "descending") {
        playNoteSequence([payload.notes[1], payload.notes[0]], 600, 360);
      } else {
        playChord(payload.notes, { reset: true });
      }
      return;
    }
    if (payload.kind === "chord") {
      playChord(payload.notes, { arpeggio: false, reset: true });
      return;
    }
    if (payload.kind === "melody") {
      playNoteSequence(payload.notes, 500, 320);
      return;
    }

    playRhythmPattern(payload.pattern, { note: "C4", stepMs: 250, duration: 120, reset: true });
  }

  function createChallenge() {
    const next = buildEarChallenge(type, difficulty, currentKey, intervalDirection, chordPool);
    setChallenge(next);
    setFeedback(null);
    setDictationAnswer("");
    window.setTimeout(() => replayCurrentChallenge(next), 0);
  }

  useEffect(() => {
    createChallenge();
  }, [type, difficulty, intervalDirection, chordPool, currentKey]);

  function submitAnswer(answer: string) {
    if (!challenge) return;
    const ok = answer.trim().toLowerCase() === challenge.answer.trim().toLowerCase();
    setStats((current) => ({
      total: current.total + 1,
      correct: current.correct + (ok ? 1 : 0),
      streak: ok ? current.streak + 1 : 0,
    }));
    setFeedback({
      ok,
      message: ok ? "Correct." : `Incorrect. The answer was ${challenge.answer}.`,
    });
    if (ok) playNote("C5", 200);
    else playNote("F3", 260);
  }

  const shuffledOptions = useMemo(
    () => (challenge?.options.length ? shuffle(challenge.options) : []),
    [challenge],
  );
  const rhythmMapping =
    challenge?.payload.kind === "rhythm" ? challenge.payload.mapping : null;

  return (
    <section className="page-section">
      <div className="page-hero">
        <div>
          <span className="eyebrow">Source Feature</span>
          <h1>Ear Trainer Lab</h1>
          <p>
            Relative-pitch drills now run from the source app. Note ID, interval ID, chord quality,
            melodic dictation, and rhythm comparison all share the same source-side playback layer.
          </p>
        </div>
        <div className="hero-actions">
          <button className="primary-button" onClick={() => replayCurrentChallenge()}>
            Replay
          </button>
          <button className="ghost-button" onClick={createChallenge}>
            New Drill
          </button>
        </div>
      </div>

      <div className="summary-grid">
        <article className="summary-card">
          <span className="summary-label">Drill</span>
          <h2>{TYPE_LABELS[type]}</h2>
          <p>{challenge?.prompt ?? "Choose a challenge type to begin."}</p>
        </article>

        <article className="summary-card">
          <span className="summary-label">Mastery Stats</span>
          <h2>{accuracy}% accuracy</h2>
          <div className="info-chip-row">
            <span className="info-chip">{stats.total} total</span>
            <span className="info-chip">{stats.correct} correct</span>
            <span className="info-chip">{stats.streak} streak</span>
          </div>
        </article>

        <article className="summary-card">
          <span className="summary-label">Tip</span>
          <h2>{TYPE_LABELS[type]}</h2>
          <p>{tip}</p>
        </article>
      </div>

      <article className="detail-card">
        <div className="detail-header">
          <div>
            <span className="summary-label">Setup</span>
            <h2>Choose the drill shape</h2>
          </div>
        </div>
        <div className="metronome-config-grid">
          <label className="select-field">
            <span>Challenge</span>
            <select value={type} onChange={(event) => setType(event.target.value as EarChallengeType)}>
              {(Object.keys(TYPE_LABELS) as EarChallengeType[]).map((value) => (
                <option key={value} value={value}>
                  {TYPE_LABELS[value]}
                </option>
              ))}
            </select>
          </label>

          <label className="select-field">
            <span>Difficulty</span>
            <select
              value={difficulty}
              onChange={(event) => setDifficulty(event.target.value as EarDifficulty)}
            >
              <option value="easy">Beginner</option>
              <option value="medium">Intermediate</option>
              <option value="hard">Advanced</option>
            </select>
          </label>

          {type === "interval" ? (
            <label className="select-field">
              <span>Direction</span>
              <select
                value={intervalDirection}
                onChange={(event) => setIntervalDirection(event.target.value as IntervalDirection)}
              >
                <option value="ascending">Ascending</option>
                <option value="descending">Descending</option>
                <option value="harmonic">Harmonic</option>
              </select>
            </label>
          ) : null}

          {type === "chord" ? (
            <label className="select-field">
              <span>Complexity</span>
              <select value={chordPool} onChange={(event) => setChordPool(event.target.value as ChordPool)}>
                <option value="basic">Triads Only</option>
                <option value="seventh">7th Chords</option>
                <option value="all">Extended</option>
              </select>
            </label>
          ) : null}
        </div>
      </article>

      <article className="detail-card">
        <div className="detail-header">
          <div>
            <span className="summary-label">Answer</span>
            <h2>{challenge?.prompt ?? "No challenge loaded"}</h2>
          </div>
        </div>

        {type === "melody" ? (
          <div className="ear-dictation-row">
            <input
              className="ear-dictation-input"
              type="text"
              value={dictationAnswer}
              onChange={(event) => setDictationAnswer(event.target.value)}
              placeholder="e.g. 1-3-5"
            />
            <button className="primary-button" onClick={() => submitAnswer(dictationAnswer)}>
              Check
            </button>
          </div>
        ) : (
          <div className="ear-options-grid">
            {shuffledOptions.map((option) => (
              <button
                key={`${challenge?.answer}-${option}`}
                className="finder-result-card"
                onClick={() => submitAnswer(option)}
              >
                <strong>{option}</strong>
              </button>
            ))}
          </div>
        )}

        {rhythmMapping ? (
          <div className="ear-rhythm-grid">
            {(["Pattern A", "Pattern B"] as const).map((label) => (
              <div className="ear-rhythm-row" key={label}>
                <strong>{label}</strong>
                <div className="ear-rhythm-bars">
                  {rhythmMapping[label].split("").map((value: string, index: number) => (
                    <span
                      key={`${label}-${index}`}
                      className={`ear-rhythm-bar ${value === "1" ? "is-hit" : ""}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {feedback ? (
          <div className={`ear-feedback ${feedback.ok ? "is-correct" : "is-wrong"}`}>
            {feedback.message}
          </div>
        ) : null}
      </article>
    </section>
  );
}
