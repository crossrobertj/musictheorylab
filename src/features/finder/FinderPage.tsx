import { useEffect, useMemo, useState } from "react";
import { playChord, playScale } from "../../audio/audioEngine";
import { HarmonicMatchesPanel } from "../../components/HarmonyPanels";
import { KeyboardPreview } from "../../components/KeyboardPreview";
import { NoteBadgeList } from "../../components/NoteBadgeList";
import { useAppStore } from "../../app/store/useAppStore";
import { useShellBridgeStore } from "../../app/store/useShellBridgeStore";
import { FinderChordMatch, FinderScaleMatch } from "../../domain/finder";
import { getRootFromKey, NOTES } from "../../domain/music";
import { harmonizeScale } from "../../domain/scaleBuilder";
import { useFinderAnalysis } from "./useFinderAnalysis";

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
  const syncRoute = useShellBridgeStore((state) => state.syncRoute);
  const [selectedNotes, setSelectedNotes] = useState<string[]>(["C", "E", "G"]);

  const { analysis, isLoading, engine, error } = useFinderAnalysis(selectedNotes);
  const { selectedNoteClasses, exactChords, scaleMatches, compatibleScales } = analysis;
  const selectedNotePreviews = useMemo(
    () => selectedNoteClasses.map((noteClass) => `${noteClass}4`),
    [selectedNoteClasses],
  );
  const keyIntervals = useMemo(
    () => (currentKey.includes("Minor") ? [0, 2, 3, 5, 7, 8, 10] : [0, 2, 4, 5, 7, 9, 11]),
    [currentKey],
  );
  const harmonizingChords = useMemo(
    () => harmonizeScale(getRootFromKey(currentKey), keyIntervals),
    [currentKey, keyIntervals],
  );

  useEffect(() => {
    syncRoute("finder", {
      title: "Chord & Scale Finder",
      subtitle: "Select notes to identify matching chords and compatible scales.",
      playableLabel: selectedNoteClasses.length
        ? `Selected notes: ${selectedNoteClasses.join(" • ")}`
        : "No notes selected",
      playableNoteSet: selectedNotePreviews,
      playCurrent: selectedNotePreviews.length ? () => playChord(selectedNotePreviews) : null,
      clear: () => setSelectedNotes([]),
    });
  }, [selectedNoteClasses, selectedNotePreviews, syncRoute]);

  return (
    <section className="page-section">
      <div className="legacy-tool-panel">
        <div className="legacy-tool-panel__header">
          <div>
            <span className="eyebrow">Analysis Tool</span>
            <h1 className="legacy-tool-panel__title">Chord/Scale Finder</h1>
            <p className="legacy-tool-panel__copy">
              Select pitch classes, then inspect exact chord matches, scale candidates, and broader
              compatible collections from the current note set.
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
      </div>

      <article className="legacy-preview-panel">
        <div className="legacy-tool-panel__header">
          <div>
            <span className="summary-label">Selected Notes</span>
            <h2>{selectedNoteClasses.length ? selectedNoteClasses.join(" • ") : "No notes selected"}</h2>
            <p className="legacy-tool-panel__copy">
              Choose at least two notes. Matching is pitch-class based, so octaves are ignored for
              identification.
            </p>
          </div>
          <div className="legacy-preview-panel__meta">
            <span className="legacy-preview-chip">Exact chords: {exactChords.length}</span>
            <span className="legacy-preview-chip">Scale matches: {scaleMatches.length}</span>
            <span className="legacy-preview-chip">Compatible scales: {compatibleScales.length}</span>
            <span className={`legacy-preview-chip ${engine === "worker" ? "" : "is-warn"}`}>
              {isLoading ? "Matching…" : engine === "worker" ? "Worker" : "Main Thread"}
            </span>
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
        {error ? <p className="card-copy">{error}</p> : null}
      </article>

      <div className="legacy-catalog-grid finder-grid">
        <article className="legacy-catalog-card">
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

        <article className="legacy-catalog-card">
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

        <article className="legacy-catalog-card">
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

      {selectedNoteClasses.length ? (
        <HarmonicMatchesPanel
          compatibleScales={compatibleScales}
          description={`Current key context: ${currentKey}`}
          harmonizingChords={harmonizingChords}
          title={selectedNoteClasses.join(" • ")}
        />
      ) : null}
    </section>
  );
}
