import { useMemo, useState } from "react";
import { playChord, playScale } from "../../audio/audioEngine";
import { KeyboardPreview } from "../../components/KeyboardPreview";
import { NoteBadgeList } from "../../components/NoteBadgeList";
import { useAppStore } from "../../app/store/useAppStore";
import { getParallelKey } from "../../domain/music";
import { getModalInterchangeRows } from "../../domain/modalInterchange";

export function ModalInterchangePage() {
  const currentKey = useAppStore((state) => state.currentKey);
  const rows = useMemo(() => getModalInterchangeRows(currentKey), [currentKey]);
  const parallelKey = useMemo(() => getParallelKey(currentKey), [currentKey]);
  const [selectedModeIndex, setSelectedModeIndex] = useState(0);
  const [selectedChordIndex, setSelectedChordIndex] = useState(0);

  const selectedMode = rows[selectedModeIndex] ?? rows[0];
  const selectedChord = selectedMode?.chords[selectedChordIndex] ?? selectedMode?.chords[0];

  return (
    <section className="page-section">
      <div className="page-hero">
        <div>
          <span className="eyebrow">Source Feature</span>
          <h1>Modal Interchange</h1>
          <p>
            Compare the diatonic triads of the current key against its parallel modes, then audition
            borrowed colors without dropping back into the legacy runtime.
          </p>
        </div>
      </div>

      <div className="summary-grid">
        <article className="summary-card">
          <span className="summary-label">Current Key</span>
          <h2>{currentKey}</h2>
          <p>Ionian is the home row for major keys. Aeolian is the home row for minor keys.</p>
        </article>
        <article className="summary-card">
          <span className="summary-label">Parallel Contrast</span>
          <h2>{parallelKey}</h2>
          <p>Borrowing works by keeping the same root while switching mode-specific degree colors.</p>
        </article>
        <article className="summary-card">
          <span className="summary-label">Selected Borrow</span>
          <h2>{selectedMode?.name}</h2>
          <p>{selectedChord ? `${selectedChord.numeral} on ${selectedChord.root}` : "Choose a mode and degree."}</p>
        </article>
      </div>

      <article className="detail-card">
        <div className="detail-header">
          <div>
            <span className="summary-label">Modes</span>
            <h2>Parallel palettes</h2>
            <p>Click a mode to swap the available borrowed triads below.</p>
          </div>
          <button className="ghost-button" onClick={() => playScale(selectedMode.notes)}>
            Play {selectedMode.name}
          </button>
        </div>
        <div className="quality-picker-grid">
          {rows.map((row, index) => (
            <button
              key={row.name}
              className={`quality-picker-button ${index === selectedModeIndex ? "is-active" : ""}`}
              onClick={() => {
                setSelectedModeIndex(index);
                setSelectedChordIndex(0);
              }}
            >
              <strong>{row.name}</strong>
              <span>{row.isHome ? "Home mode" : row.keyName}</span>
            </button>
          ))}
        </div>
      </article>

      <article className="detail-card">
        <div className="detail-header">
          <div>
            <span className="summary-label">Borrowed Chords</span>
            <h2>{selectedMode.name}</h2>
            <p>These triads are derived directly from the selected parallel mode.</p>
          </div>
          <NoteBadgeList notes={selectedMode.notes} keySignature={currentKey} />
        </div>
        <div className="feature-grid modal-interchange-grid">
          {selectedMode.chords.map((chord, index) => (
            <article
              key={`${selectedMode.name}-${chord.numeral}`}
              className={`feature-card ${index === selectedChordIndex ? "is-selected" : ""}`}
            >
              <div className="feature-card-header">
                <div>
                  <span className="card-tag">{chord.numeral}</span>
                  <h3>{chord.root}</h3>
                </div>
                <button
                  className="ghost-button"
                  onClick={() => {
                    setSelectedChordIndex(index);
                    playChord(chord.notes);
                  }}
                >
                  Play
                </button>
              </div>
              <NoteBadgeList notes={chord.notes} keySignature={currentKey} />
            </article>
          ))}
        </div>
      </article>

      <article className="detail-card">
        <div className="detail-header">
          <div>
            <span className="summary-label">Preview</span>
            <h2>
              {selectedMode.name} {selectedChord?.numeral}
            </h2>
            <p>Selected borrowed chord against the current key spelling.</p>
          </div>
          <button className="primary-button" onClick={() => selectedChord && playChord(selectedChord.notes)}>
            Play Selected Chord
          </button>
        </div>
        {selectedChord ? <NoteBadgeList notes={selectedChord.notes} keySignature={currentKey} /> : null}
        {selectedChord ? <KeyboardPreview activeNotes={selectedChord.notes} keySignature={currentKey} /> : null}
      </article>
    </section>
  );
}
