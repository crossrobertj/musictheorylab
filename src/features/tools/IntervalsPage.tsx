import { useCallback, useEffect, useMemo, useState } from "react";
import { playChord } from "../../audio/audioEngine";
import { NoteBadgeList } from "../../components/NoteBadgeList";
import { KeyboardPreview } from "../../components/KeyboardPreview";
import { useAppStore } from "../../app/store/useAppStore";
import { useShellBridgeStore } from "../../app/store/useShellBridgeStore";
import { NOTES, getIntervalName, getSemitoneDistance } from "../../domain/music";

const COMMON_INTERVALS = [0, 1, 2, 3, 4, 5, 7, 9, 10, 12];

export function IntervalsPage() {
  const currentKey = useAppStore((state) => state.currentKey);
  const updateRoute = useShellBridgeStore((state) => state.updateRoute);
  const [noteA, setNoteA] = useState("C");
  const [noteB, setNoteB] = useState("G");
  const [semitoneInput, setSemitoneInput] = useState(7);

  const noteDistance = useMemo(() => getSemitoneDistance(noteA, noteB), [noteA, noteB]);
  const namedInterval = useMemo(() => getIntervalName(noteDistance), [noteDistance]);
  const semitoneIntervalName = useMemo(
    () => getIntervalName(Math.max(0, semitoneInput)),
    [semitoneInput],
  );

  const previewNotes = useMemo(() => [`${noteA}4`, `${noteB}4`], [noteA, noteB]);
  const semitonePreviewNotes = useMemo(() => {
    const rootIndex = NOTES.findIndex((note) => note === noteA);
    const offset = ((Math.max(0, semitoneInput) % 12) + 12) % 12;
    const targetNote = rootIndex >= 0 ? NOTES[(rootIndex + offset) % 12] : noteB;
    return [`${noteA}4`, `${targetNote}4`];
  }, [noteA, noteB, semitoneInput]);
  const playableLabel = `${namedInterval} • ${noteA}4 → ${noteB}4`;

  const playCurrent = useCallback(() => {
    playChord(previewNotes, { arpeggio: true });
  }, [previewNotes]);

  const playSemitoneExample = useCallback(() => {
    playChord(semitonePreviewNotes, { arpeggio: true });
  }, [semitonePreviewNotes]);

  const clear = useCallback(() => {
    setNoteA("C");
    setNoteB("G");
    setSemitoneInput(7);
  }, []);

  useEffect(() => {
    updateRoute("intervals", {
      title: "Interval Calculator",
      subtitle: "Calculate intervals from note pairs or semitone counts.",
      playableLabel,
      playableNoteSet: previewNotes,
      playCurrent,
      clear,
    });
  }, [clear, playableLabel, playCurrent, previewNotes, updateRoute]);

  return (
    <section className="page-section">
      <div className="legacy-tool-panel">
        <div className="legacy-tool-panel__header">
          <div>
            <span className="eyebrow">Interval Tool</span>
            <h1 className="legacy-tool-panel__title">Interval Calculator</h1>
            <p className="legacy-tool-panel__copy">
              Calculate intervals from note pairs or semitone counts and audition the selected
              interval immediately.
            </p>
          </div>
          <div className="hero-actions">
            <button className="primary-button" onClick={playCurrent}>
              Play Interval
            </button>
          </div>
        </div>
        <div className="legacy-toolbar-row">
          <div className="legacy-toolbar-chip">
            Interval Pair
            <br />
            <strong>
              {noteA} to {noteB}
            </strong>
          </div>
          <div className="legacy-toolbar-chip">
            Name
            <br />
            <strong>{namedInterval}</strong>
          </div>
          <div className="legacy-toolbar-chip">
            Distance
            <br />
            <strong>{noteDistance} semitones</strong>
          </div>
        </div>
      </div>

      <div className="legacy-lab-grid interval-tool-layout">
        <article className="legacy-preview-panel">
          <div className="legacy-tool-panel__header">
            <div>
              <span className="summary-label">Note Pair Calculator</span>
              <h2>
                {noteA} to {noteB}
              </h2>
              <p className="legacy-tool-panel__copy">
                Choose two pitch classes to calculate the interval and audition the pair directly.
              </p>
            </div>
            <div className="interval-result-strip">
              <div className="interval-result-pill">
                <span>Name</span>
                <strong>{namedInterval}</strong>
              </div>
              <div className="interval-result-pill">
                <span>Distance</span>
                <strong>{noteDistance} st</strong>
              </div>
            </div>
          </div>

          <div className="interval-pair-fields">
            <label className="select-field">
              <span>Start Note</span>
              <select value={noteA} onChange={(event) => setNoteA(event.target.value)}>
                {NOTES.map((note) => (
                  <option key={`a-${note}`} value={note}>
                    {note}
                  </option>
                ))}
              </select>
            </label>
            <button
              className="ghost-button interval-swap-button"
              onClick={() => {
                setNoteA(noteB);
                setNoteB(noteA);
              }}
            >
              Swap
            </button>
            <label className="select-field">
              <span>Target Note</span>
              <select value={noteB} onChange={(event) => setNoteB(event.target.value)}>
                {NOTES.map((note) => (
                  <option key={`b-${note}`} value={note}>
                    {note}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="legacy-preview-panel__meta">
            <span className="legacy-preview-chip">Pair calculator</span>
            <span className="legacy-preview-chip">{namedInterval}</span>
            <span className="legacy-preview-chip">{noteDistance} semitones</span>
          </div>

          <NoteBadgeList notes={previewNotes} keySignature={currentKey} />
          <KeyboardPreview activeNotes={previewNotes} keySignature={currentKey} />
        </article>

        <div className="interval-side-stack">
          <article className="legacy-selection-card">
            <div className="legacy-tool-panel__header">
              <div>
                <span className="summary-label">Semitone Explorer</span>
                <h3 className="legacy-selection-card__title">{semitoneIntervalName}</h3>
                <p className="legacy-tool-panel__copy">
                  Explore interval names by semitone count, then audition the example from {noteA}.
                </p>
              </div>
              <button className="secondary-button" onClick={playSemitoneExample}>
                Hear Example
              </button>
            </div>

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

            <div className="interval-result-strip">
              <div className="interval-result-pill">
                <span>From</span>
                <strong>{noteA}4</strong>
              </div>
              <div className="interval-result-pill">
                <span>To</span>
                <strong>{semitonePreviewNotes[1]}</strong>
              </div>
            </div>
          </article>

          <article className="legacy-selection-card">
            <div>
              <span className="summary-label">Quick Reference</span>
              <h3 className="legacy-selection-card__title">Common intervals</h3>
              <p className="legacy-tool-panel__copy">
                Jump to the usual landmarks without dragging through the full range.
              </p>
            </div>
            <div className="interval-preset-grid">
              {COMMON_INTERVALS.map((value) => (
                <button
                  key={value}
                  className={`interval-preset-button ${semitoneInput === value ? "is-active" : ""}`}
                  onClick={() => setSemitoneInput(value)}
                >
                  <strong>{value} st</strong>
                  <span>{getIntervalName(value)}</span>
                </button>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
