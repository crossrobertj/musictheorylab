import { useMemo, useState } from "react";
import { playChord } from "../../audio/audioEngine";
import { NoteBadgeList } from "../../components/NoteBadgeList";
import { KeyboardPreview } from "../../components/KeyboardPreview";
import { useAppStore } from "../../app/store/useAppStore";
import { NOTES, getIntervalName, getSemitoneDistance } from "../../domain/music";

export function IntervalsPage() {
  const currentKey = useAppStore((state) => state.currentKey);
  const [noteA, setNoteA] = useState("C");
  const [noteB, setNoteB] = useState("G");
  const [semitoneInput, setSemitoneInput] = useState(7);

  const noteDistance = useMemo(() => getSemitoneDistance(noteA, noteB), [noteA, noteB]);
  const namedInterval = useMemo(() => getIntervalName(noteDistance), [noteDistance]);
  const semitoneIntervalName = useMemo(
    () => getIntervalName(Math.max(0, semitoneInput)),
    [semitoneInput],
  );

  const previewNotes = [`${noteA}4`, `${noteB}4`];

  return (
    <section className="page-section">
      <div className="page-hero">
        <div>
          <span className="eyebrow">Source Feature</span>
          <h1>Interval Calculator</h1>
          <p>
            Interval naming now runs from source-side note math. You can calculate from note names
            or identify an interval directly from its semitone count.
          </p>
        </div>
        <div className="hero-actions">
          <button className="primary-button" onClick={() => playChord(previewNotes, { arpeggio: true })}>
            Play Interval
          </button>
        </div>
      </div>

      <div className="summary-grid">
        <article className="summary-card">
          <span className="summary-label">From Notes</span>
          <h2>
            {noteA} → {noteB}
          </h2>
          <p>{namedInterval}</p>
          <div className="toolbar-cluster">
            <label className="select-field">
              <span>Note A</span>
              <select value={noteA} onChange={(event) => setNoteA(event.target.value)}>
                {NOTES.map((note) => (
                  <option key={`a-${note}`} value={note}>
                    {note}
                  </option>
                ))}
              </select>
            </label>
            <label className="select-field">
              <span>Note B</span>
              <select value={noteB} onChange={(event) => setNoteB(event.target.value)}>
                {NOTES.map((note) => (
                  <option key={`b-${note}`} value={note}>
                    {note}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="info-chip-row">
            <span className="info-chip">{noteDistance} semitones</span>
          </div>
        </article>

        <article className="summary-card">
          <span className="summary-label">From Semitones</span>
          <h2>{Math.max(0, semitoneInput)} semitones</h2>
          <p>{semitoneIntervalName}</p>
          <label className="range-field">
            <span>Semitone value</span>
            <input
              type="range"
              min="0"
              max="24"
              value={semitoneInput}
              onChange={(event) => setSemitoneInput(Number.parseInt(event.target.value, 10))}
            />
            <strong>{semitoneInput}</strong>
          </label>
        </article>

        <article className="summary-card">
          <span className="summary-label">Quick Reference</span>
          <h2>Common intervals</h2>
          <div className="finder-results-list">
            {[0, 3, 4, 5, 7, 10, 12].map((value) => (
              <button
                key={value}
                className="finder-result-card"
                onClick={() => setSemitoneInput(value)}
              >
                <strong>{value} semitones</strong>
                <small>{getIntervalName(value)}</small>
              </button>
            ))}
          </div>
        </article>
      </div>

      <article className="detail-card">
        <div className="detail-header">
          <div>
            <span className="summary-label">Preview</span>
            <h2>{namedInterval}</h2>
            <p>The keyboard preview uses the currently selected notes in the source interval tool.</p>
          </div>
          <NoteBadgeList notes={previewNotes} keySignature={currentKey} />
        </div>
        <KeyboardPreview activeNotes={previewNotes} keySignature={currentKey} />
      </article>
    </section>
  );
}
