import { useEffect, useMemo, useState } from "react";
import { loadVersionedState, persistVersionedState } from "../../app/persistence/storage";
import {
  RECORDING_CHECKLIST,
  RECORDING_GENRE_GUIDE,
  getRecordingProgress,
} from "../../domain/production";

type RecordingPhase = keyof typeof RECORDING_CHECKLIST;

const STORAGE_KEY = "music-theory-lab-source-recording-v1";
const STORAGE_VERSION = 1;
const defaultState = { phase: "before" as RecordingPhase, genre: "Pop", done: {} as Record<string, boolean> };

function loadState() {
  return loadVersionedState({
    key: STORAGE_KEY,
    version: STORAGE_VERSION,
    defaultValue: defaultState,
    parse: (value) => {
      if (!value || typeof value !== "object") return null;
      const parsed = value as {
        phase?: RecordingPhase;
        genre?: string;
        done?: Record<string, boolean>;
      };
      return {
        phase: parsed.phase ?? defaultState.phase,
        genre: parsed.genre ?? defaultState.genre,
        done: parsed.done ?? defaultState.done,
      };
    },
  });
}

export function RecordingGuidePage() {
  const initial = useMemo(() => loadState(), []);
  const [phase, setPhase] = useState<RecordingPhase>(initial.phase);
  const [genre, setGenre] = useState(initial.genre);
  const [done, setDone] = useState<Record<string, boolean>>(initial.done);

  useEffect(() => {
    persistVersionedState(STORAGE_KEY, STORAGE_VERSION, { phase, genre, done });
  }, [done, genre, phase]);

  const items = RECORDING_CHECKLIST[phase];
  const genreGuide = useMemo(
    () => RECORDING_GENRE_GUIDE.find((entry) => entry.genre === genre) ?? RECORDING_GENRE_GUIDE[0],
    [genre],
  );
  const phaseProgress = getRecordingProgress(phase, done);
  const beforeProgress = getRecordingProgress("before", done);
  const duringProgress = getRecordingProgress("during", done);
  const afterProgress = getRecordingProgress("after", done);

  function clearCurrentPhase() {
    setDone((current) => {
      const next = { ...current };
      RECORDING_CHECKLIST[phase].forEach((item) => delete next[item.id]);
      return next;
    });
  }

  return (
    <section className="page-section">
      <div className="page-hero">
        <div>
          <span className="eyebrow">Source Feature</span>
          <h1>Recording Workflow</h1>
          <p>
            Session checklist and genre-specific production notes for before, during, and after
            tracking, now carried by the source app.
          </p>
        </div>
        <div className="hero-actions">
          <button className="ghost-button" onClick={clearCurrentPhase}>
            Clear Current Phase
          </button>
        </div>
      </div>

      <div className="summary-grid">
        {([
          ["before", beforeProgress],
          ["during", duringProgress],
          ["after", afterProgress],
        ] as const).map(([id, progress]) => (
          <article key={id} className={`summary-card ${phase === id ? "is-active" : ""}`}>
            <span className="summary-label">{id}</span>
            <h2>{progress.done}/{progress.total}</h2>
            <p>{progress.pct}% complete</p>
            <button className={phase === id ? "secondary-button" : "ghost-button"} onClick={() => setPhase(id)}>
              Open {id}
            </button>
          </article>
        ))}
      </div>

      <div className="tuning-layout">
        <article className="detail-card">
          <div className="detail-header">
            <div>
              <span className="summary-label">Checklist</span>
              <h2>{phase}</h2>
              <p>{phaseProgress.done}/{phaseProgress.total} complete</p>
            </div>
          </div>
          <div className="song-list-block">
            {items.map((item) => (
              <button
                key={item.id}
                className={`recording-checklist-item ${done[item.id] ? "is-done" : ""}`}
                onClick={() => setDone((current) => ({ ...current, [item.id]: !current[item.id] }))}
              >
                <strong>{item.task}</strong>
                <small>{item.tip}</small>
              </button>
            ))}
          </div>
        </article>

        <article className="detail-card">
          <div className="detail-header">
            <div>
              <span className="summary-label">Genre Notes</span>
              <h2>{genreGuide.genre}</h2>
            </div>
            <label className="select-field">
              <span>Genre</span>
              <select value={genreGuide.genre} onChange={(event) => setGenre(event.target.value)}>
                {RECORDING_GENRE_GUIDE.map((entry) => (
                  <option key={entry.genre} value={entry.genre}>
                    {entry.genre}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="song-callout">
            <strong>Before</strong>
            <p>{genreGuide.before}</p>
          </div>
          <div className="song-callout">
            <strong>During</strong>
            <p>{genreGuide.during}</p>
          </div>
          <div className="song-callout">
            <strong>After</strong>
            <p>{genreGuide.after}</p>
          </div>
        </article>
      </div>
    </section>
  );
}
