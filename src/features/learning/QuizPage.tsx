import { useCallback, useEffect, useMemo, useState } from "react";
import { playNote } from "../../audio/audioEngine";
import { useShellBridgeStore } from "../../app/store/useShellBridgeStore";
import {
  generateQuizQuestions,
  getQuizXpPerCorrect,
  getShuffledOptions,
  type QuizDifficulty,
  type QuizQuestion,
} from "../../domain/quiz";

interface QuizResult {
  score: number;
  xpEarned: number;
  percentage: number;
  answered: number;
  timed: boolean;
  difficulty: QuizDifficulty;
}

function normalizeAnswer(value: string) {
  return value.trim().toLowerCase();
}

function buildResult(
  score: number,
  xpEarned: number,
  questions: QuizQuestion[],
  timed: boolean,
  difficulty: QuizDifficulty,
  answered: number,
): QuizResult {
  const percentage = timed ? 100 : Math.round((score / Math.max(1, questions.length)) * 100);
  return {
    score,
    xpEarned,
    percentage,
    answered,
    timed,
    difficulty,
  };
}

export function QuizPage() {
  const syncRoute = useShellBridgeStore((state) => state.syncRoute);
  const [difficulty, setDifficulty] = useState<QuizDifficulty>("easy");
  const [timedMode, setTimedMode] = useState(false);
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [feedback, setFeedback] = useState<{ ok: boolean; message: string } | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [inputAnswer, setInputAnswer] = useState("");
  const [result, setResult] = useState<QuizResult | null>(null);

  const activeQuestion = questions[currentQuestion];
  const shuffledOptions = useMemo(
    () => (activeQuestion ? getShuffledOptions(activeQuestion) : []),
    [activeQuestion],
  );
  const clearQuiz = useCallback(() => {
    setDifficulty("easy");
    setTimedMode(false);
    setStarted(false);
    setQuestions([]);
    setCurrentQuestion(0);
    setScore(0);
    setXpEarned(0);
    setFeedback(null);
    setTimeLeft(60);
    setElapsedSeconds(0);
    setInputAnswer("");
    setResult(null);
  }, []);

  const shellState = useMemo(() => {
    const title = "Music Theory Quiz";
    const subtitle = "Mixed theory questions with typed answers and a 60-second mode.";
    const difficultyLabel = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);

    if (result) {
      return {
        title,
        subtitle,
        playableLabel: `Result | ${result.percentage}% | ${difficultyLabel}`,
        playableNoteSet: [],
        playCurrent: null,
        clear: clearQuiz,
      };
    }

    if (started && activeQuestion) {
      const questionLabel = timedMode
        ? `Question ${currentQuestion + 1}+`
        : `Question ${currentQuestion + 1} of ${questions.length}`;

      return {
        title,
        subtitle,
        playableLabel: `${timedMode ? "Timed" : "In progress"} | ${difficultyLabel} | ${questionLabel}`,
        playableNoteSet: [],
        playCurrent: null,
        clear: clearQuiz,
      };
    }

    return {
      title,
      subtitle,
      playableLabel: `Setup | ${difficultyLabel} | ${timedMode ? "Timed" : "Untimed"}`,
      playableNoteSet: [],
      playCurrent: null,
      clear: clearQuiz,
    };
  }, [
    activeQuestion,
    clearQuiz,
    currentQuestion,
    difficulty,
    questions.length,
    result,
    started,
    timedMode,
  ]);

  useEffect(() => {
    syncRoute("quiz", shellState);
  }, [shellState, syncRoute]);

  useEffect(() => {
    if (!started || result) return undefined;

    const timerId = window.setInterval(() => {
      if (timedMode) {
        setTimeLeft((current) => {
          if (current <= 1) {
            window.clearInterval(timerId);
            setResult(buildResult(score, xpEarned, questions, true, difficulty, currentQuestion));
            return 0;
          }
          return current - 1;
        });
      } else {
        setElapsedSeconds((current) => current + 1);
      }
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [started, timedMode, result, score, xpEarned, questions, difficulty, currentQuestion]);

  function startQuiz(nextDifficulty: QuizDifficulty) {
    setDifficulty(nextDifficulty);
    setQuestions(generateQuizQuestions(nextDifficulty));
    setCurrentQuestion(0);
    setScore(0);
    setXpEarned(0);
    setFeedback(null);
    setInputAnswer("");
    setTimeLeft(60);
    setElapsedSeconds(0);
    setResult(null);
    setStarted(true);
  }

  function finishQuiz(finalScore = score, finalXp = xpEarned, answered = currentQuestion) {
    setStarted(false);
    setResult(buildResult(finalScore, finalXp, questions, timedMode, difficulty, answered));
  }

  function advanceToNextQuestion() {
    setFeedback(null);
    setInputAnswer("");
    setCurrentQuestion((current) => {
      const nextIndex = current + 1;
      if (timedMode) {
        if (nextIndex >= questions.length) {
          setQuestions((currentQuestions) => [
            ...currentQuestions,
            ...generateQuizQuestions(difficulty),
          ]);
        }
        return nextIndex;
      }

      if (nextIndex >= questions.length) {
        window.setTimeout(() => finishQuiz(), 0);
        return current;
      }

      return nextIndex;
    });
  }

  function answerQuestion(answer: string) {
    if (!activeQuestion) return;

    const correct = normalizeAnswer(answer) === normalizeAnswer(activeQuestion.correct);
    const nextScore = correct ? score + 1 : score;
    const gainedXp = correct ? getQuizXpPerCorrect(difficulty) : 0;
    const nextXp = xpEarned + gainedXp;

    if (correct) {
      setScore(nextScore);
      setXpEarned(nextXp);
      playNote("C4", 200);
      setFeedback({ ok: true, message: "Correct." });
    } else {
      playNote("F3", 400);
      setFeedback({ ok: false, message: `Incorrect. Correct answer: ${activeQuestion.correct}` });
    }

    window.setTimeout(() => {
      if (!timedMode && currentQuestion + 1 >= questions.length) {
        finishQuiz(nextScore, nextXp, currentQuestion + 1);
      } else {
        advanceToNextQuestion();
      }
    }, 550);
  }

  function skipQuestion() {
    if (!activeQuestion) return;
    if (!timedMode && currentQuestion + 1 >= questions.length) {
      finishQuiz(score, xpEarned, currentQuestion + 1);
      return;
    }
    advanceToNextQuestion();
  }

  const progressWidth = questions.length
    ? `${Math.min(100, (currentQuestion / questions.length) * 100)}%`
    : "0%";

  return (
    <section className="page-section">
      <div className="legacy-tool-panel">
        <div className="legacy-tool-panel__header">
          <div>
            <span className="eyebrow">Training Drill</span>
            <h1 className="legacy-tool-panel__title">Music Theory Quiz</h1>
            <p className="legacy-tool-panel__copy">
              Mixed theory questions with difficulty tiers, typed answers, and a 60-second timed
              mode in the restored denser training layout.
            </p>
          </div>
        </div>
      </div>

      {!started && !result ? (
        <article className="legacy-preview-panel">
          <div className="quiz-start-grid">
            <div className="quiz-start-intro">
              <h2>Test your music theory knowledge</h2>
              <p>Answer questions about scales, chords, intervals, modes, and enharmonic spelling.</p>
            </div>
            <div className="legacy-catalog-grid">
              {([
                ["easy", "Easy", "10 Questions • +10 XP/ea"],
                ["medium", "Medium", "15 Questions • +20 XP/ea"],
                ["hard", "Hard", "20 Questions • +50 XP/ea"],
              ] as const).map(([value, label, subcopy]) => (
                <button
                  key={value}
                  className="legacy-catalog-card quiz-launch-card"
                  onClick={() => startQuiz(value)}
                >
                  <div className="legacy-catalog-card__header">
                    <div>
                      <span className="legacy-catalog-card__eyebrow">{label}</span>
                      <h3 className="legacy-catalog-card__title">{label}</h3>
                    </div>
                  </div>
                  <p className="legacy-catalog-card__subtitle">{subcopy}</p>
                </button>
              ))}
            </div>
            <label className="quiz-timed-toggle">
              <input
                type="checkbox"
                checked={timedMode}
                onChange={(event) => setTimedMode(event.target.checked)}
              />
              <span>Timed mode: 60 seconds to answer as many as possible.</span>
            </label>
          </div>
        </article>
      ) : null}

      {started && activeQuestion ? (
        <article className="legacy-preview-panel">
          <div className="legacy-tool-panel__header">
            <div>
              <span className="summary-label">
                Question {currentQuestion + 1} of {timedMode ? "∞" : questions.length}
              </span>
              <h2>{activeQuestion.text}</h2>
            </div>
            <div className="info-chip-row">
              <span className="info-chip">Score {score}/{currentQuestion}</span>
              <span className="info-chip">
                Time {timedMode ? `${timeLeft}s` : `${elapsedSeconds}s`}
              </span>
            </div>
          </div>

          <div className="quiz-progress-shell">
            <div className="quiz-progress-bar" style={{ width: progressWidth }} />
          </div>

          {activeQuestion.type === "input" ? (
            <div className="ear-dictation-row">
              <input
                className="ear-dictation-input"
                type="text"
                value={inputAnswer}
                onChange={(event) => setInputAnswer(event.target.value)}
                placeholder="Type your answer"
              />
              <button className="primary-button" onClick={() => answerQuestion(inputAnswer)}>
                Submit
              </button>
            </div>
          ) : (
            <div className="ear-options-grid">
              {shuffledOptions.map((option) => (
                <button
                  key={`${activeQuestion.text}-${option}`}
                  className="finder-result-card"
                  onClick={() => answerQuestion(option)}
                >
                  <strong>{option}</strong>
                </button>
              ))}
            </div>
          )}

          {feedback ? (
            <div className={`ear-feedback ${feedback.ok ? "is-correct" : "is-wrong"}`}>
              {feedback.message}
            </div>
          ) : null}

          <div className="hero-actions">
            <button className="ghost-button" onClick={skipQuestion}>
              Skip Question
            </button>
            <button className="ghost-button" onClick={() => finishQuiz()}>
              End Quiz
            </button>
          </div>
        </article>
      ) : null}

      {result ? (
        <article className="legacy-preview-panel quiz-results-card">
          <span className="summary-label">Results</span>
          <h2>
            {result.timed
              ? "Time's Up"
              : result.percentage >= 90
                ? "Perfect"
                : result.percentage >= 70
                  ? "Excellent"
                  : result.percentage >= 50
                    ? "Good effort"
                    : "Keep practicing"}
          </h2>
          <p>
            {result.timed
              ? `Answered ${result.score} correctly in 60 seconds.`
              : `Score: ${result.percentage}% on ${result.difficulty} difficulty.`}
          </p>
          <div className="info-chip-row">
            <span className="info-chip">{result.score} correct</span>
            <span className="info-chip">{result.xpEarned} XP earned</span>
            <span className="info-chip">{result.answered} answered</span>
          </div>
          <div className="hero-actions">
            <button className="primary-button" onClick={() => startQuiz(difficulty)}>
              Try Again
            </button>
          </div>
        </article>
      ) : null}
    </section>
  );
}
