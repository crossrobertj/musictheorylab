import { useMemo, useState } from "react";
import { KEY_OPTIONS } from "../../domain/generated/theory-data";
import { calculateKeyDistance } from "../../domain/music";

export function KeyDistancePage() {
  const [fromKey, setFromKey] = useState("C Major");
  const [toKey, setToKey] = useState("G Major");

  const analysis = useMemo(() => calculateKeyDistance(fromKey, toKey), [fromKey, toKey]);

  return (
    <section className="page-section">
      <div className="page-hero">
        <div>
          <span className="eyebrow">Source Feature</span>
          <h1>Key Distance</h1>
          <p>
            This tool compares key centers using shared source note math and scale overlap. It now
            runs entirely outside the legacy runtime.
          </p>
        </div>
      </div>

      <div className="summary-grid">
        <article className="summary-card">
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

        <article className="summary-card">
          <span className="summary-label">Shortest Distance</span>
          <h2>{analysis.shortestDistance} semitones</h2>
          <p>{analysis.relationship.name}</p>
          <div className="info-chip-row">
            <span className="info-chip">Up: {analysis.upDistance}</span>
            <span className="info-chip">Down: {analysis.downDistance}</span>
            <span className="info-chip">Scale steps: {analysis.steps}</span>
          </div>
        </article>

        <article className="summary-card">
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

      <article className="detail-card">
        <div className="detail-header">
          <div>
            <span className="summary-label">Relationship</span>
            <h2>{analysis.relationship.name}</h2>
            <p>{analysis.relationship.desc}</p>
          </div>
        </div>
      </article>
    </section>
  );
}
