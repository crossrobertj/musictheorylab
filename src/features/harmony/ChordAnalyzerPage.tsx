import { useCallback, useEffect, useMemo, useState } from "react";
import { playChord } from "../../audio/audioEngine";
import { useShellBridgeStore } from "../../app/store/useShellBridgeStore";
import { FavoriteToggleButton } from "../../components/FavoriteToggleButton";
import { ChordInversionsPanel, CompatibleScalesPanel } from "../../components/HarmonyPanels";
import { KeyboardPreview } from "../../components/KeyboardPreview";
import { NoteBadgeList } from "../../components/NoteBadgeList";
import { useAppStore } from "../../app/store/useAppStore";
import { buildChordAnalysis, suggestRomanNumeral } from "../../domain/chordAnalyzer";

export function ChordAnalyzerPage() {
  const updateRoute = useShellBridgeStore((state) => state.updateRoute);
  const currentKey = useAppStore((state) => state.currentKey);
  const [input, setInput] = useState("Cmaj7");
  const [submittedInput, setSubmittedInput] = useState("Cmaj7");

  const analysis = useMemo(() => buildChordAnalysis(submittedInput), [submittedInput]);
  const roman = useMemo(
    () => (analysis ? suggestRomanNumeral(analysis.root, currentKey) : null),
    [analysis, currentKey],
  );
  const playableLabel = analysis
    ? `${analysis.raw} • ${analysis.notes.length} notes`
    : `Invalid chord: ${submittedInput || "—"}`;
  const playableNoteSet = analysis?.notes ?? [];

  const handleAnalyze = useCallback(() => {
    setSubmittedInput(input.trim());
  }, [input]);

  const playCurrent = useCallback(() => {
    if (!analysis) return;
    void playChord(analysis.notes);
  }, [analysis]);

  const clear = useCallback(() => {
    setInput("Cmaj7");
    setSubmittedInput("Cmaj7");
  }, []);

  const shellPlayCurrent = analysis ? playCurrent : null;

  useEffect(() => {
    updateRoute("chordanalyzer", {
      title: "Chord Analyzer",
      subtitle: "Chord symbol analysis, inversions, and scale fits.",
      playableLabel,
      playableNoteSet,
      playCurrent: shellPlayCurrent,
      clear,
    });
  }, [clear, playableLabel, playableNoteSet, shellPlayCurrent, updateRoute]);

  return (
    <section className="page-section">
      <div className="legacy-tool-panel">
        <div className="legacy-tool-panel__header">
          <div>
            <span className="eyebrow">Analysis Tool</span>
            <h1 className="legacy-tool-panel__title">Chord Analyzer</h1>
            <p className="legacy-tool-panel__copy">
              Type a chord symbol and inspect its construction, inversion set, compatible scales,
              and rough Roman-numeral role in the active key.
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
      </div>

      {!analysis ? (
        <article className="legacy-preview-panel">
          <span className="summary-label">Invalid Chord</span>
          <h2>Use a root plus a supported quality</h2>
          <p className="legacy-tool-panel__copy">
            Examples: `Cmaj7`, `Dm7`, `G7#9`, `Bbadd9`, `F#m7b5`, `Asus4`.
          </p>
        </article>
      ) : (
        <>
          <article className="legacy-preview-panel">
            <div className="legacy-tool-panel__header">
              <div>
                <span className="summary-label">Current Analysis</span>
                <h2>{analysis.raw}</h2>
                <p className="legacy-tool-panel__copy">{analysis.construction}</p>
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
                <button className="primary-button" onClick={playCurrent}>
                  Play Chord
                </button>
              </div>
            </div>

            <div className="legacy-preview-panel__meta">
              <span className="legacy-preview-chip">Quality: {analysis.qualityKey}</span>
              <span className="legacy-preview-chip">Notes: {analysis.notes.length}</span>
              <span className="legacy-preview-chip">Key Context: {currentKey}</span>
            </div>

            <div className="legacy-catalog-grid">
              {analysis.notes.map((note, index) => (
                <article className="legacy-catalog-card" key={`${note}-${analysis.intervalLabels[index]}`}>
                  <span className="legacy-catalog-card__eyebrow">{analysis.intervalLabels[index]}</span>
                  <h3 className="legacy-catalog-card__title">{analysis.noteClasses[index]}</h3>
                  <p className="legacy-catalog-card__subtitle">{note}</p>
                </article>
              ))}
            </div>

            <NoteBadgeList notes={analysis.notes} keySignature={currentKey} />
            <KeyboardPreview activeNotes={analysis.notes} keySignature={currentKey} />
          </article>

          <div className="legacy-catalog-grid">
            <article className="legacy-catalog-card">
              <span className="summary-label">Roman Numeral</span>
              <h2>{roman?.label ?? "Unknown"}</h2>
              <p>{roman?.detail ?? "No harmonic role available."}</p>
            </article>
            <article className="legacy-catalog-card">
              <span className="summary-label">Inversions</span>
              <h2>{analysis.inversions.length}</h2>
              <p>Every inversion is generated from the same source note set and kept playable.</p>
            </article>
            <article className="legacy-catalog-card">
              <span className="summary-label">Compatible Scales</span>
              <h2>{analysis.compatibleScales.length}</h2>
              <p>
                Scale candidates come from the same source matcher that powers the note-set finder.
              </p>
            </article>
          </div>

          <ChordInversionsPanel
            description="Legacy-style inversion chooser for the analyzed chord."
            inversions={analysis.inversions}
            title={analysis.raw}
          />

          <CompatibleScalesPanel
            compatibleScales={analysis.compatibleScales}
            description="Scale families that contain the chord tones."
            title={analysis.raw}
          />
        </>
      )}
    </section>
  );
}
