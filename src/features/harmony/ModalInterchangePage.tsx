import { useCallback, useEffect, useMemo, useState } from "react";
import { playChord, playScale } from "../../audio/audioEngine";
import { KeyboardPreview } from "../../components/KeyboardPreview";
import { NoteBadgeList } from "../../components/NoteBadgeList";
import { useAppStore } from "../../app/store/useAppStore";
import { useShellBridgeStore } from "../../app/store/useShellBridgeStore";
import { getParallelKey } from "../../domain/music";
import { getModalInterchangeRows } from "../../domain/modalInterchange";

export function ModalInterchangePage() {
  const currentKey = useAppStore((state) => state.currentKey);
  const updateRoute = useShellBridgeStore((state) => state.updateRoute);
  const rows = useMemo(() => getModalInterchangeRows(currentKey), [currentKey]);
  const parallelKey = useMemo(() => getParallelKey(currentKey), [currentKey]);
  const [selectedModeIndex, setSelectedModeIndex] = useState(0);
  const [selectedChordIndex, setSelectedChordIndex] = useState(0);

  const selectedMode = rows[selectedModeIndex] ?? rows[0];
  const selectedChord = selectedMode?.chords[selectedChordIndex] ?? selectedMode?.chords[0];
  const playableLabel = useMemo(() => {
    if (!selectedMode) return "Modal interchange";
    if (!selectedChord) return `${selectedMode.name} • No chord selected`;
    return `${selectedMode.name} • ${selectedChord.numeral} on ${selectedChord.root}`;
  }, [selectedChord, selectedMode]);
  const playableNoteSet = selectedChord?.notes ?? [];

  const playCurrent = useCallback(() => {
    if (!selectedChord) return;
    playChord(selectedChord.notes);
  }, [selectedChord]);

  const clear = useCallback(() => {
    setSelectedModeIndex(0);
    setSelectedChordIndex(0);
  }, []);

  useEffect(() => {
    updateRoute("interchange", {
      title: "Modal Interchange",
      subtitle: "Parallel modal borrowing explorer.",
      playableLabel,
      playableNoteSet,
      playCurrent,
      clear,
    });
  }, [clear, playCurrent, playableLabel, playableNoteSet, updateRoute]);

  return (
    <section className="page-section">
      <div className="legacy-tool-panel">
        <div className="legacy-tool-panel__header">
          <div>
            <span className="eyebrow">Borrowed Harmony</span>
            <h1 className="legacy-tool-panel__title">Modal Interchange</h1>
            <p className="legacy-tool-panel__copy">
              Compare the diatonic triads of the current key against its parallel modes, then
              audition borrowed colors without dropping back into the legacy runtime.
            </p>
          </div>
        </div>
      </div>

      <article className="legacy-tool-panel">
        <div className="legacy-tool-panel__header">
          <div>
            <span className="summary-label">Parallel Modes</span>
            <h2>{currentKey}</h2>
            <p className="legacy-tool-panel__copy">
              Ionian is the home row for major keys. Aeolian is the home row for minor keys.
              Parallel contrast: {parallelKey}.
            </p>
          </div>
          <button className="legacy-catalog-card__action" onClick={() => playScale(selectedMode.notes)}>
            Play {selectedMode.name}
          </button>
        </div>
        <div className="harmony-table-scroll">
          <table className="legacy-mode-matrix">
            <thead>
              <tr>
                <th>Mode</th>
                <th>I</th>
                <th>II</th>
                <th>III</th>
                <th>IV</th>
                <th>V</th>
                <th>VI</th>
                <th>VII</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr
                  key={row.name}
                  className={`legacy-mode-matrix__row ${rowIndex === selectedModeIndex ? "is-active" : ""}`}
                >
                  <td>
                    <button
                      className={`legacy-mode-button ${rowIndex === selectedModeIndex ? "is-active" : ""}`}
                      onClick={() => {
                        setSelectedModeIndex(rowIndex);
                        setSelectedChordIndex(0);
                      }}
                    >
                      {row.name}
                    </button>
                  </td>
                  {row.chords.map((chord, chordIndex) => (
                    <td key={`${row.name}-${chord.numeral}`}>
                      <button
                        className="legacy-mode-matrix__cell-button"
                        onClick={() => {
                          setSelectedModeIndex(rowIndex);
                          setSelectedChordIndex(chordIndex);
                          playChord(chord.notes);
                        }}
                      >
                        {chord.numeral}
                        <small>{chord.root}</small>
                      </button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>

      <div className="legacy-lab-grid">
        <article className="legacy-preview-panel">
          <div className="detail-header">
            <div>
              <span className="summary-label">Borrowed Chord</span>
              <h2>
                {selectedMode.name} {selectedChord?.numeral}
              </h2>
              <p className="legacy-tool-panel__copy">
                {selectedChord ? `${selectedChord.numeral} on ${selectedChord.root}` : "Choose a mode and degree."}
              </p>
            </div>
            <button className="primary-button" onClick={playCurrent}>
              Play Selected Chord
            </button>
          </div>
          {selectedChord ? <NoteBadgeList notes={selectedChord.notes} keySignature={currentKey} /> : null}
          {selectedChord ? <KeyboardPreview activeNotes={selectedChord.notes} keySignature={currentKey} /> : null}
        </article>

        <article className="legacy-selection-card">
          <span className="summary-label">Mode Palette</span>
          <h3 className="legacy-selection-card__title">{selectedMode.name}</h3>
          <NoteBadgeList notes={selectedMode.notes} keySignature={currentKey} />
        </article>
      </div>
    </section>
  );
}
