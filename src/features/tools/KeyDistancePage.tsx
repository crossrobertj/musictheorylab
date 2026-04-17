import { useCallback, useEffect, useMemo, useState } from "react";
import { useShellBridgeStore } from "../../app/store/useShellBridgeStore";
import { KEY_OPTIONS } from "../../domain/generated/theory-data";
import { calculateKeyDistance } from "../../domain/music";

export function KeyDistancePage() {
  const [fromKey, setFromKey] = useState("C Major");
  const [toKey, setToKey] = useState("G Major");
  const updateRoute = useShellBridgeStore((state) => state.updateRoute);

  const analysis = useMemo(() => calculateKeyDistance(fromKey, toKey), [fromKey, toKey]);
  const playableLabel = `${fromKey} → ${toKey}`;

  const clear = useCallback(() => {
    setFromKey("C Major");
    setToKey("G Major");
  }, []);

  useEffect(() => {
    updateRoute("calculator", {
      title: "Key Distance",
      subtitle: "Compare tonal distance between two keys.",
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
            <span className="eyebrow">Theory Calculator</span>
            <h1 className="legacy-tool-panel__title">Key Distance</h1>
            <p className="legacy-tool-panel__copy">
              Compare two key centers, inspect their overlap, and read the tonal relationship in a
              denser legacy-style reference layout.
            </p>
          </div>
        </div>
      </div>

      <div className="legacy-catalog-grid">
        <article className="legacy-catalog-card">
          <span className="summary-label">Compare Keys</span>
          <h2>
            {fromKey} → {toKey}
          </h2>
          <div className="toolbar-cluster">
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
        </article>

        <article className="legacy-catalog-card">
          <span className="summary-label">Shortest Distance</span>
          <h2>{analysis.shortestDistance} semitones</h2>
          <p>{analysis.relationship.name}</p>
          <div className="info-chip-row">
            <span className="info-chip">Up: {analysis.upDistance}</span>
            <span className="info-chip">Down: {analysis.downDistance}</span>
            <span className="info-chip">Scale steps: {analysis.steps}</span>
          </div>
        </article>

        <article className="legacy-catalog-card">
          <span className="summary-label">Shared Notes</span>
          <h2>{analysis.sharedNotes.length}</h2>
          <div className="scale-strip">
            {analysis.sharedNotes.length ? (
              analysis.sharedNotes.map((note) => (
                <span key={`${fromKey}-${toKey}-${note}`} className="scale-token">
                  {note}
                </span>
              ))
            ) : (
              <span className="card-copy">No common scale tones</span>
            )}
          </div>
        </article>
      </div>

      <article className="legacy-preview-panel">
        <div className="legacy-tool-panel__header">
          <div>
            <span className="summary-label">Relationship</span>
            <h2>{analysis.relationship.name}</h2>
            <p className="legacy-tool-panel__copy">{analysis.relationship.desc}</p>
          </div>
        </div>
      </article>
    </section>
  );
}
