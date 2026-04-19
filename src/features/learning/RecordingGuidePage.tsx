import { useCallback, useEffect, useMemo, useState } from "react";
import { loadVersionedState, persistVersionedState } from "../../app/persistence/storage";
import { useShellBridgeStore } from "../../app/store/useShellBridgeStore";
import {
  RECORDING_CHECKLIST,
  RECORDING_GENRE_GUIDE,
  getRecordingProgress,
} from "../../domain/production";

type RecordingPhase = keyof typeof RECORDING_CHECKLIST;

const STORAGE_KEY = "music-theory-lab-source-recording-v1";
const STORAGE_VERSION = 1;
const SHELL_TITLE = "Recording Guide";
const SHELL_SUBTITLE = "Session checklist and genre notes for recording.";
const defaultState = { phase: "before" as RecordingPhase, genre: "Pop", done: {} as Record<string, boolean> };

function formatPhaseLabel(phase: RecordingPhase) {
  return phase.charAt(0).toUpperCase() + phase.slice(1);
}

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
  const syncRoute = useShellBridgeStore((state) => state.syncRoute);
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
  const playableLabel = `${formatPhaseLabel(phase)} • ${genreGuide.genre} • ${phaseProgress.done}/${phaseProgress.total} complete`;
  const beforeProgress = getRecordingProgress("before", done);
  const duringProgress = getRecordingProgress("during", done);
  const afterProgress = getRecordingProgress("after", done);

  const clearCurrentPhase = useCallback(() => {
    setDone((current) => {
      const next = { ...current };
      RECORDING_CHECKLIST[phase].forEach((item) => delete next[item.id]);
      return next;
    });
  }, [phase]);

  useEffect(() => {
    syncRoute("recording", {
      title: SHELL_TITLE,
      subtitle: SHELL_SUBTITLE,
      playableLabel,
      playableNoteSet: [],
      playCurrent: null,
      clear: clearCurrentPhase,
    });
  }, [clearCurrentPhase, playableLabel, syncRoute]);

  return (
    <section className="page-section">
      <article className="legacy-tool-panel">
        <div className="legacy-tool-panel__header">
          <div>
            <span className="eyebrow">Session Checklist</span>
            <h1 className="legacy-tool-panel__title">{SHELL_TITLE}</h1>
            <p className="legacy-tool-panel__copy">
              Session checklist and genre-specific production notes for before, during, and after
              tracking in the older phase-card workflow.
            </p>
          </div>
          <div className="legacy-toolbar-row">
            <span className="legacy-toolbar-chip">
              Phase <strong>{formatPhaseLabel(phase)}</strong>
            </span>
            <span className="legacy-toolbar-chip">
              Genre <strong>{genreGuide.genre}</strong>
            </span>
            <span className="legacy-toolbar-chip">
              Progress <strong>{phaseProgress.done}/{phaseProgress.total}</strong>
            </span>
          </div>
        </div>
        <div className="legacy-toolbar-row">
          <button className="ghost-button" onClick={clearCurrentPhase}>
            Clear Current Phase
          </button>
        </div>
      </article>

      <div className="legacy-catalog-grid">
        {([
          ["before", beforeProgress],
          ["during", duringProgress],
          ["after", afterProgress],
        ] as const).map(([id, progress]) => (
          <article key={id} className={`legacy-catalog-card ${phase === id ? "is-selected" : ""}`}>
            <span className="legacy-catalog-card__eyebrow">{id}</span>
            <h2 className="legacy-catalog-card__title">{progress.done}/{progress.total}</h2>
            <p className="legacy-catalog-card__subtitle">{progress.pct}% complete</p>
            <button className={phase === id ? "secondary-button" : "ghost-button"} onClick={() => setPhase(id)}>
              Open {id}
            </button>
          </article>
        ))}
      </div>

      <div className="legacy-lab-grid">
        <article className="legacy-preview-panel">
          <div className="legacy-tool-panel__header">
            <div>
              <span className="summary-label">Checklist</span>
              <h2>{formatPhaseLabel(phase)}</h2>
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

        <article className="legacy-selection-card">
          <div className="legacy-tool-panel__header">
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
