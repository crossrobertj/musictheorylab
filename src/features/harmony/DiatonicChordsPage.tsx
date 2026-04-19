import { useEffect, useMemo, useState } from "react";
import { playChord } from "../../audio/audioEngine";
import { NoteBadgeList } from "../../components/NoteBadgeList";
import { KeyboardPreview } from "../../components/KeyboardPreview";
import { useAppStore } from "../../app/store/useAppStore";
import { useShellBridgeStore } from "../../app/store/useShellBridgeStore";
import {
  formatNote,
  getDiatonicSevenths,
  getDiatonicTriads,
  getScaleNotes,
} from "../../domain/music";

const NEXT_CHORD_HINTS: Record<string, string[]> = {
  I: ["IV", "V", "vi"],
  ii: ["V", "vii°"],
  iii: ["vi", "IV"],
  IV: ["I", "ii", "V"],
  V: ["I", "vi"],
  vi: ["ii", "IV"],
  "vii°": ["I", "iii"],
  i: ["iv", "V", "VI"],
  "ii°": ["V", "vii°"],
  III: ["VI", "iv"],
  iv: ["i", "V"],
  v: ["i", "VI"],
  VI: ["III", "iv"],
  VII: ["III", "i"],
};

export function DiatonicChordsPage() {
  const currentKey = useAppStore((state) => state.currentKey);
  const [selectedDegree, setSelectedDegree] = useState(0);
  const syncRoute = useShellBridgeStore((state) => state.syncRoute);

  const triads = useMemo(() => getDiatonicTriads(currentKey), [currentKey]);
  const sevenths = useMemo(() => getDiatonicSevenths(currentKey), [currentKey]);
  const scaleNotes = useMemo(() => getScaleNotes(currentKey), [currentKey]);

  const selectedTriad = triads[selectedDegree] ?? triads[0];
  const selectedSeventh = sevenths[selectedDegree] ?? sevenths[0];
  const selectedPlayableChord = selectedTriad ?? triads[0];
  const suggestedMoves = NEXT_CHORD_HINTS[selectedTriad?.roman || "I"] || [];

  useEffect(() => {
    syncRoute("chords", {
      title: "Diatonic Chords",
      subtitle: "Inspect scale-degree triads and sevenths in the active key.",
      playableLabel: selectedPlayableChord
        ? `${selectedPlayableChord.roman} triad • ${selectedPlayableChord.name}`
        : "Diatonic triads",
      playableNoteSet: selectedPlayableChord?.notes ?? [],
      playCurrent: selectedPlayableChord
        ? () => {
            playChord(selectedPlayableChord.notes);
          }
        : null,
      clear: () => {
        setSelectedDegree(0);
      },
    });
  }, [selectedPlayableChord, syncRoute]);

  return (
    <section className="page-section">
      <div className="legacy-tool-panel">
        <div className="legacy-tool-panel__header">
          <div>
            <span className="eyebrow">Harmony Reference</span>
            <h1 className="legacy-tool-panel__title">Diatonic Chords</h1>
            <p className="legacy-tool-panel__copy">
              Inspect the current key&apos;s scale-degree triads and sevenths, with playback tied
              to the selected degree.
            </p>
          </div>
          <div className="hero-actions">
            <button className="primary-button" onClick={() => playChord(selectedTriad.notes)}>
              Play Selected Triad
            </button>
            <button
              className="secondary-button"
              onClick={() => playChord(selectedSeventh.notes, { arpeggio: true })}
            >
              Arpeggiate Seventh
            </button>
          </div>
        </div>

        <div className="legacy-toolbar-row">
          <div className="legacy-toolbar-chip">
            Scale
            <br />
            <strong>{currentKey}</strong>
          </div>
          <div className="legacy-toolbar-chip">
            Degree
            <br />
            <strong>{selectedTriad.roman}</strong>
          </div>
          <div className="legacy-toolbar-chip">
            Triad
            <br />
            <strong>{selectedTriad.name}</strong>
          </div>
          <div className="legacy-toolbar-chip">
            Seventh
            <br />
            <strong>{selectedSeventh.name}</strong>
          </div>
        </div>

        <div className="legacy-token-row">
          {scaleNotes.map((note) => (
            <span key={note} className="legacy-note-token">
              {formatNote(note, currentKey)}
            </span>
          ))}
        </div>
      </div>

      <div className="legacy-lab-grid">
        <div className="legacy-catalog-grid">
          {triads.map((triad, index) => {
            const seventh = sevenths[index];
            return (
              <article
                key={triad.roman}
                className={`legacy-catalog-card ${index === selectedDegree ? "is-selected" : ""}`}
              >
                <div className="legacy-catalog-card__header">
                  <div>
                    <span className="legacy-catalog-card__eyebrow">{triad.roman}</span>
                    <h2 className="legacy-catalog-card__title">{triad.name}</h2>
                    <div className="legacy-catalog-card__subtitle">Triad quality: {triad.quality}</div>
                  </div>
                  <button
                    className="legacy-catalog-card__action"
                    onClick={() => {
                      setSelectedDegree(index);
                      playChord(triad.notes);
                    }}
                  >
                    Play
                  </button>
                </div>

                <div className="legacy-token-row">
                  {triad.notes.map((note) => (
                    <span key={`${triad.roman}-${note}`} className="legacy-note-token">
                      {note.replace(/[0-9]/g, "")}
                    </span>
                  ))}
                </div>

                <div className="feature-card-footer">
                  <div>
                    <span className="summary-label">Seventh</span>
                    <strong>{seventh.name}</strong>
                  </div>
                  <button
                    className="secondary-button"
                    onClick={() => {
                      setSelectedDegree(index);
                      playChord(seventh.notes);
                    }}
                  >
                    Play 7th
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <article className="legacy-preview-panel">
          <div>
            <span className="summary-label">Preview</span>
            <h2>{selectedTriad.name}</h2>
            <p className="legacy-tool-panel__copy">{selectedTriad.roman} tends to move toward:</p>
          </div>

          <div className="legacy-token-row">
            {suggestedMoves.map((item) => (
              <span key={item} className="legacy-note-token">
                {item}
              </span>
            ))}
          </div>

          <div className="legacy-preview-panel__meta">
            <span className="legacy-preview-chip">Triad: {selectedTriad.quality}</span>
            <span className="legacy-preview-chip">7th stack ready</span>
          </div>

          <NoteBadgeList notes={selectedSeventh.notes} keySignature={currentKey} />
          <KeyboardPreview activeNotes={selectedSeventh.notes} keySignature={currentKey} />
        </article>
      </div>
    </section>
  );
}
