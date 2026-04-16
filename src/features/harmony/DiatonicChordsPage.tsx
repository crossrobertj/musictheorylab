import { useMemo, useState } from "react";
import { playChord } from "../../audio/audioEngine";
import { NoteBadgeList } from "../../components/NoteBadgeList";
import { KeyboardPreview } from "../../components/KeyboardPreview";
import { useAppStore } from "../../app/store/useAppStore";
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

  const triads = useMemo(() => getDiatonicTriads(currentKey), [currentKey]);
  const sevenths = useMemo(() => getDiatonicSevenths(currentKey), [currentKey]);
  const scaleNotes = useMemo(() => getScaleNotes(currentKey), [currentKey]);

  const selectedTriad = triads[selectedDegree] ?? triads[0];
  const selectedSeventh = sevenths[selectedDegree] ?? sevenths[0];
  const suggestedMoves = NEXT_CHORD_HINTS[selectedTriad?.roman || "I"] || [];

  return (
    <section className="page-section">
      <div className="page-hero">
        <div>
          <span className="eyebrow">Source Feature</span>
          <h1>Diatonic Chords</h1>
          <p>
            Real source rewrite of the core harmony view. The current key&apos;s scale, triads,
            and seventh chords are derived from extracted domain data, not the legacy runtime.
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

      <div className="summary-grid">
        <article className="summary-card">
          <span className="summary-label">Scale</span>
          <h2>{currentKey}</h2>
          <div className="scale-strip">
            {scaleNotes.map((note) => (
              <span key={note} className="scale-token">
                {formatNote(note, currentKey)}
              </span>
            ))}
          </div>
        </article>
        <article className="summary-card">
          <span className="summary-label">Selected Degree</span>
          <h2>{selectedTriad.roman}</h2>
          <p>{selectedTriad.name}</p>
          <NoteBadgeList notes={selectedTriad.notes} keySignature={currentKey} />
        </article>
        <article className="summary-card">
          <span className="summary-label">Typical Motion</span>
          <h2>{selectedTriad.roman} tends to move to</h2>
          <div className="scale-strip">
            {suggestedMoves.map((item) => (
              <span key={item} className="scale-token">
                {item}
              </span>
            ))}
          </div>
        </article>
      </div>

      <article className="detail-card">
        <div className="detail-header">
          <div>
            <span className="summary-label">Preview</span>
            <h2>{selectedTriad.name}</h2>
          </div>
          <NoteBadgeList notes={selectedSeventh.notes} keySignature={currentKey} />
        </div>
        <KeyboardPreview activeNotes={selectedSeventh.notes} keySignature={currentKey} />
      </article>

      <div className="feature-grid">
        {triads.map((triad, index) => {
          const seventh = sevenths[index];
          return (
            <article
              key={triad.roman}
              className={`feature-card ${index === selectedDegree ? "is-selected" : ""}`}
            >
              <div className="feature-card-header">
                <div>
                  <span className="card-tag">{triad.roman}</span>
                  <h3>{triad.name}</h3>
                </div>
                <button
                  className="ghost-button"
                  onClick={() => {
                    setSelectedDegree(index);
                    playChord(triad.notes);
                  }}
                >
                  Play
                </button>
              </div>
              <p className="card-copy">Triad quality: {triad.quality}</p>
              <NoteBadgeList notes={triad.notes} keySignature={currentKey} />
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
    </section>
  );
}
