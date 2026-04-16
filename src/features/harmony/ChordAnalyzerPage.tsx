import { useMemo, useState } from "react";
import { playChord, playScale } from "../../audio/audioEngine";
import { FavoriteToggleButton } from "../../components/FavoriteToggleButton";
import { KeyboardPreview } from "../../components/KeyboardPreview";
import { NoteBadgeList } from "../../components/NoteBadgeList";
import { useAppStore } from "../../app/store/useAppStore";
import { buildChordAnalysis, suggestRomanNumeral } from "../../domain/chordAnalyzer";

export function ChordAnalyzerPage() {
  const currentKey = useAppStore((state) => state.currentKey);
  const [input, setInput] = useState("Cmaj7");
  const [submittedInput, setSubmittedInput] = useState("Cmaj7");

  const analysis = useMemo(() => buildChordAnalysis(submittedInput), [submittedInput]);
  const roman = useMemo(
    () => (analysis ? suggestRomanNumeral(analysis.root, currentKey) : null),
    [analysis, currentKey],
  );

  function handleAnalyze() {
    setSubmittedInput(input.trim());
  }

  return (
    <section className="page-section">
      <div className="page-hero">
        <div>
          <span className="eyebrow">Source Feature</span>
          <h1>Chord Analyzer</h1>
          <p>
            Type a chord symbol and inspect its source-side construction, inversion set, compatible
            scales, and rough Roman-numeral role in the active key.
          </p>
        </div>
        <div className="hero-actions">
          <label className="search-field scale-builder-name-field">
            <span>Chord Symbol</span>
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") handleAnalyze();
              }}
              placeholder="Cmaj7, Dm9, G7#5, Bbdim..."
            />
          </label>
          <button className="primary-button" onClick={handleAnalyze}>
            Analyze
          </button>
        </div>
      </div>

      {!analysis ? (
        <article className="detail-card">
          <span className="summary-label">Invalid Chord</span>
          <h2>Use a root plus a supported quality</h2>
          <p>
            Examples: `Cmaj7`, `Dm7`, `G7#9`, `Bbadd9`, `F#m7b5`, `Asus4`.
          </p>
        </article>
      ) : (
        <>
          <article className="detail-card">
            <div className="detail-header">
              <div>
                <span className="summary-label">Current Analysis</span>
                <h2>{analysis.raw}</h2>
                <p>{analysis.construction}</p>
              </div>
              <div className="toolbar-cluster">
                <FavoriteToggleButton
                  item={{
                    type: "chord",
                    name: analysis.raw,
                    keySignature: currentKey,
                    notes: analysis.notes,
                    route: "/app/chordanalyzer",
                    desc: analysis.construction,
                    family: analysis.qualityKey,
                  }}
                />
                <button className="primary-button" onClick={() => playChord(analysis.notes)}>
                  Play Chord
                </button>
              </div>
            </div>

            <div className="detail-meta">
              <span className="info-chip">Quality: {analysis.qualityKey}</span>
              <span className="info-chip">Notes: {analysis.notes.length}</span>
              <span className="info-chip">Key Context: {currentKey}</span>
            </div>

            <div className="feature-grid">
              {analysis.notes.map((note, index) => (
                <article className="feature-card" key={`${note}-${analysis.intervalLabels[index]}`}>
                  <span className="card-tag">{analysis.intervalLabels[index]}</span>
                  <h3>{analysis.noteClasses[index]}</h3>
                  <p className="card-copy">{note}</p>
                </article>
              ))}
            </div>

            <NoteBadgeList notes={analysis.notes} keySignature={currentKey} />
            <KeyboardPreview activeNotes={analysis.notes} keySignature={currentKey} />
          </article>

          <div className="summary-grid">
            <article className="summary-card">
              <span className="summary-label">Roman Numeral</span>
              <h2>{roman?.label ?? "Unknown"}</h2>
              <p>{roman?.detail ?? "No harmonic role available."}</p>
            </article>
            <article className="summary-card">
              <span className="summary-label">Inversions</span>
              <h2>{analysis.inversions.length}</h2>
              <p>Every inversion is generated from the same source note set and kept playable.</p>
            </article>
            <article className="summary-card">
              <span className="summary-label">Compatible Scales</span>
              <h2>{analysis.compatibleScales.length}</h2>
              <p>
                Scale candidates come from the same source matcher that powers the note-set finder.
              </p>
            </article>
          </div>

          <article className="detail-card">
            <div className="detail-header">
              <div>
                <span className="summary-label">Inversions & Voicings</span>
                <h2>Playable reordered stacks</h2>
                <p>
                  These mirror the legacy analyzer’s quick inversion cards, but stay consistent with
                  the source audio layer.
                </p>
              </div>
            </div>

            <div className="feature-grid">
              {analysis.inversions.map((inversion) => (
                <article className="feature-card" key={inversion.label}>
                  <div className="feature-card-header">
                    <div>
                      <span className="card-tag">Voicing</span>
                      <h3>{inversion.label}</h3>
                    </div>
                    <button className="ghost-button" onClick={() => playChord(inversion.notes)}>
                      Play
                    </button>
                  </div>
                  <NoteBadgeList notes={inversion.notes} keySignature={currentKey} />
                </article>
              ))}
            </div>
          </article>

          <article className="detail-card">
            <div className="detail-header">
              <div>
                <span className="summary-label">Compatible Scales</span>
                <h2>Scale families that contain the chord tones</h2>
                <p>
                  These are ranked source-side matches, useful for improvisation and reharmonization.
                </p>
              </div>
            </div>

            {analysis.compatibleScales.length ? (
              <div className="feature-grid">
                {analysis.compatibleScales.map((scale) => (
                  <article className="feature-card" key={scale.name}>
                    <div className="feature-card-header">
                      <div>
                        <span className="card-tag">{scale.region}</span>
                        <h3>{scale.name}</h3>
                      </div>
                      <button className="ghost-button" onClick={() => playScale(scale.notes)}>
                        Play
                      </button>
                    </div>
                    <p className="card-copy">Extra notes beyond the chord: {scale.score}</p>
                    <NoteBadgeList notes={scale.notes} keySignature={currentKey} />
                  </article>
                ))}
              </div>
            ) : (
              <p className="card-copy">No source-side scale match was found for this symbol yet.</p>
            )}
          </article>
        </>
      )}
    </section>
  );
}
