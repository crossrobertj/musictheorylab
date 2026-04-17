import { useCallback, useEffect, useMemo, useState } from "react";
import { playScale } from "../../audio/audioEngine";
import { useShellBridgeStore } from "../../app/store/useShellBridgeStore";
import { KEY_OPTIONS } from "../../domain/generated/theory-data";
import { NOTES } from "../../domain/music";
import { analyzeModulation, buildParallelComparison } from "../../domain/modulation";

const DEFAULT_FROM_KEY = "C Major";
const DEFAULT_TO_KEY = "G Major";
const DEFAULT_PARALLEL_ROOT = "C";

export function ModulationLabPage() {
  const updateRoute = useShellBridgeStore((state) => state.updateRoute);
  const [fromKey, setFromKey] = useState(DEFAULT_FROM_KEY);
  const [toKey, setToKey] = useState(DEFAULT_TO_KEY);
  const [parallelRoot, setParallelRoot] = useState(DEFAULT_PARALLEL_ROOT);

  const analysis = useMemo(() => analyzeModulation(fromKey, toKey), [fromKey, toKey]);
  const parallel = useMemo(() => buildParallelComparison(parallelRoot), [parallelRoot]);
  const playableLabel = useMemo(() => {
    const pivotLabel = analysis.pivotChords[0]
      ? `Pivot ${analysis.pivotChords[0].chord}`
      : `${analysis.sharedNotes.length} shared notes`;

    return `${fromKey} → ${toKey} • ${pivotLabel} • Parallel ${parallel.majorKey} / ${parallel.minorKey}`;
  }, [analysis.pivotChords, analysis.sharedNotes.length, fromKey, parallel.majorKey, parallel.minorKey, toKey]);

  const clear = useCallback(() => {
    setFromKey(DEFAULT_FROM_KEY);
    setToKey(DEFAULT_TO_KEY);
    setParallelRoot(DEFAULT_PARALLEL_ROOT);
  }, []);

  useEffect(() => {
    updateRoute("modulate", {
      title: "Modulation Lab",
      subtitle: "Find pivot chords and compare parallel keys.",
      playableLabel,
      playableNoteSet: [],
      playCurrent: null,
      clear,
    });
  }, [clear, playableLabel, updateRoute]);

  return (
    <section className="page-section">
      <div className="legacy-tool-panel">
        <div className="legacy-tool-panel__header">
          <div>
            <span className="eyebrow">Key Modulation</span>
            <h1 className="legacy-tool-panel__title">Modulation Lab</h1>
            <p className="legacy-tool-panel__copy">
              Compare key centers, identify pivot chords, and inspect parallel major and minor
              systems in a denser legacy-style analysis layout.
            </p>
          </div>
        </div>
      </div>

      <div className="legacy-catalog-grid">
        <article className="legacy-catalog-card">
          <span className="summary-label">Key Motion</span>
          <h2>
            {fromKey} → {toKey}
          </h2>
          <p>{analysis.semitoneDistance} semitone steps between roots.</p>
        </article>
        <article className="legacy-catalog-card">
          <span className="summary-label">Shared Notes</span>
          <h2>{analysis.sharedNotes.length}</h2>
          <div className="info-chip-row">
            {analysis.sharedNotes.map((note) => (
              <span key={`${fromKey}-${toKey}-${note}`} className="info-chip">
                {note}
              </span>
            ))}
          </div>
        </article>
        <article className="legacy-catalog-card">
          <span className="summary-label">Pivot Chords</span>
          <h2>{analysis.pivotChords.length}</h2>
          <p>
            {analysis.pivotChords[0]
              ? `${analysis.pivotChords[0].chord} is the first direct overlap.`
              : "No exact diatonic triad overlap."}
          </p>
        </article>
      </div>

      <article className="legacy-tool-panel">
        <div className="legacy-tool-panel__header">
          <div>
            <span className="summary-label">Modulation Finder</span>
            <h2>Find common-tone routes</h2>
          </div>
          <div className="production-selector-grid">
            <label className="select-field">
              <span>From</span>
              <select value={fromKey} onChange={(event) => setFromKey(event.target.value)}>
                {KEY_OPTIONS.map((option) => (
                  <option key={`from-${option}`} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="select-field">
              <span>To</span>
              <select value={toKey} onChange={(event) => setToKey(event.target.value)}>
                {KEY_OPTIONS.map((option) => (
                  <option key={`to-${option}`} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="legacy-catalog-grid">
          <article className="legacy-catalog-card">
            <span className="legacy-catalog-card__eyebrow">Shared Collection</span>
            <h3 className="legacy-catalog-card__title">{analysis.sharedNotes.join(" • ") || "No direct overlap"}</h3>
            <p className="legacy-catalog-card__subtitle">
              This is the raw note-level overlap between the two scales before harmonic function is considered.
            </p>
            <div className="feature-card-footer">
              <button className="ghost-button" onClick={() => playScale(analysis.fromScale)}>
                Play {fromKey}
              </button>
              <button className="ghost-button" onClick={() => playScale(analysis.toScale)}>
                Play {toKey}
              </button>
            </div>
          </article>

          <article className="legacy-catalog-card">
            <span className="legacy-catalog-card__eyebrow">Suggested Path</span>
            <h3 className="legacy-catalog-card__title">
              {analysis.pivotChords[0]
                ? `${analysis.pivotChords[0].chord}: ${analysis.pivotChords[0].fromDegree} → ${analysis.pivotChords[0].toDegree}`
                : `Direct shift from ${fromKey} to ${toKey}`}
            </h3>
            <p className="legacy-catalog-card__subtitle">
              Start on the source tonic, reinterpret the pivot chord in the destination key, then confirm the new tonic.
            </p>
          </article>
        </div>

        <div className="theory-guide-list-block">
          <ul className="theory-guide-list">
            {analysis.pivotChords.length ? (
              analysis.pivotChords.map((pivot) => (
                <li key={`${pivot.chord}-${pivot.fromDegree}-${pivot.toDegree}`}>
                  {pivot.chord}: {pivot.fromDegree} in {fromKey}, {pivot.toDegree} in {toKey}
                </li>
              ))
            ) : (
              <li>No exact diatonic triad pivots were found, so this change will need a more direct or chromatic setup.</li>
            )}
          </ul>
        </div>
      </article>

      <article className="legacy-tool-panel">
        <div className="legacy-tool-panel__header">
          <div>
            <span className="summary-label">Parallel Comparison</span>
            <h2>Major and minor built on the same root</h2>
            <p className="legacy-tool-panel__copy">
              Compare the pitch and chord changes that happen when you keep the tonic but switch mode.
            </p>
          </div>
          <label className="select-field">
            <span>Root</span>
            <select value={parallelRoot} onChange={(event) => setParallelRoot(event.target.value)}>
              {NOTES.map((note) => (
                <option key={note} value={note}>
                  {note}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="legacy-catalog-grid">
          <article className="legacy-catalog-card">
            <span className="legacy-catalog-card__eyebrow">Major</span>
            <h3 className="legacy-catalog-card__title">{parallel.majorKey}</h3>
            <div className="info-chip-row">
              {parallel.majorScale.map((note) => (
                <span key={`${parallel.majorKey}-${note}`} className="info-chip">
                  {note.replace(/[0-9]/g, "")}
                </span>
              ))}
            </div>
            <div className="info-chip-row">
              {parallel.majorChords.map((chord, index) => (
                <span key={`${parallel.majorKey}-${chord}-${index}`} className="info-chip">
                  {chord}
                </span>
              ))}
            </div>
            <div className="feature-card-footer">
              <button className="ghost-button" onClick={() => playScale(parallel.majorScale)}>
                Play Major
              </button>
            </div>
          </article>

          <article className="legacy-catalog-card">
            <span className="legacy-catalog-card__eyebrow">Minor</span>
            <h3 className="legacy-catalog-card__title">{parallel.minorKey}</h3>
            <div className="info-chip-row">
              {parallel.minorScale.map((note) => (
                <span key={`${parallel.minorKey}-${note}`} className="info-chip">
                  {note.replace(/[0-9]/g, "")}
                </span>
              ))}
            </div>
            <div className="info-chip-row">
              {parallel.minorChords.map((chord, index) => (
                <span key={`${parallel.minorKey}-${chord}-${index}`} className="info-chip">
                  {chord}
                </span>
              ))}
            </div>
            <div className="feature-card-footer">
              <button className="ghost-button" onClick={() => playScale(parallel.minorScale)}>
                Play Minor
              </button>
            </div>
          </article>
        </div>
      </article>
    </section>
  );
}
