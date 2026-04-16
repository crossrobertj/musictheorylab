import { useMemo, useState } from "react";
import { playChord, playScale } from "../../audio/audioEngine";
import { KeyboardPreview } from "../../components/KeyboardPreview";
import { NoteBadgeList } from "../../components/NoteBadgeList";
import { useAppStore } from "../../app/store/useAppStore";
import {
  FinderChordMatch,
  FinderScaleMatch,
  findExactChordMatches,
  findMatchingScales,
  getCompatibleScalesForNoteClasses,
  getUniqueNoteClasses,
} from "../../domain/finder";
import { NOTES } from "../../domain/music";

function toggleNote(target: string, current: string[]) {
  return current.includes(target)
    ? current.filter((note) => note !== target)
    : [...current, target];
}

function chordKey(match: FinderChordMatch) {
  return `${match.name}-${match.quality}`;
}

function scaleKey(match: FinderScaleMatch) {
  return `${match.name}-${match.score}`;
}

export function FinderPage() {
  const currentKey = useAppStore((state) => state.currentKey);
  const [selectedNotes, setSelectedNotes] = useState<string[]>(["C", "E", "G"]);

  const selectedNoteClasses = useMemo(() => getUniqueNoteClasses(selectedNotes), [selectedNotes]);
  const selectedNotePreviews = useMemo(
    () => selectedNoteClasses.map((noteClass) => `${noteClass}4`),
    [selectedNoteClasses],
  );
  const exactChords = useMemo(
    () => findExactChordMatches(selectedNoteClasses),
    [selectedNoteClasses],
  );
  const scaleMatches = useMemo(
    () => findMatchingScales(selectedNoteClasses).slice(0, 12),
    [selectedNoteClasses],
  );
  const compatibleScales = useMemo(
    () => getCompatibleScalesForNoteClasses(selectedNoteClasses, 10),
    [selectedNoteClasses],
  );

  return (
    <section className="page-section">
      <div className="page-hero">
        <div>
          <span className="eyebrow">Source Feature</span>
          <h1>Chord/Scale Finder</h1>
          <p>
            This finder now runs from source-side matching helpers extracted from the legacy logic.
            Select pitch classes, then inspect exact chord matches, potential scale matches, and
            broader compatible scales.
          </p>
        </div>
        <div className="hero-actions">
          <button className="secondary-button" onClick={() => setSelectedNotes([])}>
            Clear
          </button>
          <button className="primary-button" onClick={() => playChord(selectedNotePreviews)}>
            Play Selection
          </button>
        </div>
      </div>

      <article className="detail-card">
        <div className="detail-header">
          <div>
            <span className="summary-label">Selected Notes</span>
            <h2>{selectedNoteClasses.length ? selectedNoteClasses.join(" • ") : "No notes selected"}</h2>
            <p>
              Choose at least two notes. Matching is pitch-class based, so octaves are ignored for
              identification.
            </p>
          </div>
          <div className="info-chip-row">
            <span className="info-chip">Exact chords: {exactChords.length}</span>
            <span className="info-chip">Scale matches: {scaleMatches.length}</span>
            <span className="info-chip">Compatible scales: {compatibleScales.length}</span>
          </div>
        </div>

        <div className="note-picker-grid">
          {NOTES.map((note) => {
            const active = selectedNoteClasses.includes(note);
            return (
              <button
                key={note}
                className={`note-picker-button ${active ? "is-active" : ""}`}
                onClick={() => setSelectedNotes((current) => toggleNote(note, current))}
              >
                {note}
              </button>
            );
          })}
        </div>

        <NoteBadgeList notes={selectedNotePreviews} keySignature={currentKey} />
        <KeyboardPreview activeNotes={selectedNotePreviews} keySignature={currentKey} />
      </article>

      <div className="summary-grid finder-grid">
        <article className="summary-card">
          <span className="summary-label">Exact Chord Matches</span>
          <h2>{exactChords.length ? `${exactChords.length} matches` : "No exact chord match"}</h2>
          <div className="finder-results-list">
            {exactChords.length ? (
              exactChords.map((match) => (
                <button
                  key={chordKey(match)}
                  className="finder-result-card"
                  onClick={() => playChord(match.notes)}
                >
                  <strong>{match.name}</strong>
                  <small>{match.desc}</small>
                  <NoteBadgeList notes={match.notes} keySignature={currentKey} />
                </button>
              ))
            ) : (
              <p className="card-copy">Try adding or removing a note to form a defined chord quality.</p>
            )}
          </div>
        </article>

        <article className="summary-card">
          <span className="summary-label">Potential Scales</span>
          <h2>{scaleMatches.length ? `${scaleMatches.length} candidates` : "No scale match"}</h2>
          <div className="finder-results-list">
            {scaleMatches.length ? (
              scaleMatches.map((match) => (
                <button
                  key={scaleKey(match)}
                  className="finder-result-card"
                  onClick={() => playScale(match.notes)}
                >
                  <strong>{match.name}</strong>
                  <small>
                    {match.region} · score {match.score}
                  </small>
                  <NoteBadgeList notes={match.notes} keySignature={currentKey} />
                </button>
              ))
            ) : (
              <p className="card-copy">The selected notes do not fully fit any extracted scale definition yet.</p>
            )}
          </div>
        </article>

        <article className="summary-card">
          <span className="summary-label">Compatible Scales</span>
          <h2>{compatibleScales.length ? `${compatibleScales.length} broader fits` : "No compatible scale"}</h2>
          <div className="finder-results-list">
            {compatibleScales.length ? (
              compatibleScales.map((match) => (
                <button
                  key={scaleKey(match)}
                  className="finder-result-card"
                  onClick={() => playScale(match.notes)}
                >
                  <strong>{match.name}</strong>
                  <small>
                    {match.region} · extra notes {match.score}
                  </small>
                  <NoteBadgeList notes={match.notes} keySignature={currentKey} />
                </button>
              ))
            ) : (
              <p className="card-copy">No larger scale families fully contain the current selection.</p>
            )}
          </div>
        </article>
      </div>
    </section>
  );
}
