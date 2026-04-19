import { useCallback, useEffect, useMemo, useState } from "react";
import { playNoteSequence } from "../../audio/audioEngine";
import { useAppStore } from "../../app/store/useAppStore";
import { useCustomInstrumentStore } from "../../app/store/useCustomInstrumentStore";
import { useShellBridgeStore } from "../../app/store/useShellBridgeStore";
import { InstrumentBoard } from "../../components/InstrumentBoard";
import { KeyboardPreview } from "../../components/KeyboardPreview";
import { NoteBadgeList } from "../../components/NoteBadgeList";
import { generateRandomPhrase, buildTabPreview } from "../../domain/creative";
import { downloadMidiFile, buildMidiFromNoteSequence } from "../../domain/midi";

export function PhrasingPage() {
  const currentKey = useAppStore((state) => state.currentKey);
  const currentInstrument = useAppStore((state) => state.currentInstrument);
  const tempo = useAppStore((state) => state.tempo);
  const customInstruments = useCustomInstrumentStore((state) => state.customInstruments);
  const updateRoute = useShellBridgeStore((state) => state.updateRoute);
  const [phrase, setPhrase] = useState(() => generateRandomPhrase(currentKey));

  const tabPreview = useMemo(
    () => buildTabPreview(phrase.notes, currentInstrument, customInstruments),
    [customInstruments, currentInstrument, phrase.notes],
  );
  const playableLabel = useMemo(
    () => `${phrase.scaleName} • ${phrase.motif} • ${phrase.notes.length} notes`,
    [phrase.motif, phrase.notes.length, phrase.scaleName],
  );

  const rerollPhrase = useCallback(() => {
    setPhrase(generateRandomPhrase(currentKey));
  }, [currentKey]);

  const playCurrent = useCallback(() => {
    playNoteSequence(phrase.notes, 380, 320);
  }, [phrase.notes]);

  const clear = useCallback(() => {
    setPhrase(generateRandomPhrase(currentKey));
  }, [currentKey]);

  const exportPhraseMidi = useCallback(() => {
    const midi = buildMidiFromNoteSequence(phrase.notes, tempo, 0.5, 0.45);
    downloadMidiFile(midi, "phrase.mid");
  }, [phrase.notes, tempo]);

  useEffect(() => {
    updateRoute("phrasing", {
      title: "Phrasing Tool",
      subtitle: "Generate melodic fragments from the current key and export them as quick MIDI sketches.",
      playableLabel,
      playableNoteSet: phrase.notes,
      playCurrent,
      clear,
    });
  }, [clear, playCurrent, playableLabel, phrase.notes, updateRoute]);

  return (
    <section className="page-section">
      <div className="legacy-tool-panel">
        <div className="legacy-tool-panel__header">
          <div>
            <span className="eyebrow">Phrase Generator</span>
            <h1 className="legacy-tool-panel__title">Phrasing Tool</h1>
            <p className="legacy-tool-panel__copy">
              Generate melodic fragments from extracted scale data, preview them on the active
              instrument, and export the phrase as a quick MIDI sketch.
            </p>
          </div>
          <div className="hero-actions">
          <button className="primary-button" onClick={rerollPhrase}>
            Random Phrase
          </button>
          <button className="ghost-button" onClick={playCurrent}>
            Play Phrase
          </button>
          <button className="ghost-button" onClick={exportPhraseMidi}>
            Export MIDI
          </button>
          </div>
        </div>
      </div>

      <div className="legacy-catalog-grid">
        <article className="legacy-catalog-card">
          <span className="summary-label">Scale</span>
          <h2>{phrase.scaleName}</h2>
          <p>{phrase.mode}</p>
        </article>
        <article className="legacy-catalog-card">
          <span className="summary-label">Context Chord</span>
          <h2>{phrase.chord}</h2>
          <p>{phrase.shape}</p>
        </article>
        <article className="legacy-catalog-card">
          <span className="summary-label">Motif</span>
          <h2>{phrase.motif}</h2>
          <p>{phrase.notes.length} notes in the current take.</p>
        </article>
      </div>

      <article className="legacy-preview-panel">
        <div className="legacy-tool-panel__header">
          <div>
            <span className="summary-label">Generated Melody</span>
            <h2>Phrase Notes</h2>
            <p className="legacy-tool-panel__copy">
              Click replay to audition the phrase linearly against the shared app tempo.
            </p>
          </div>
        </div>
        <NoteBadgeList notes={phrase.notes} keySignature={currentKey} />
        <KeyboardPreview activeNotes={phrase.notes} keySignature={currentKey} />
      </article>

      <article className="legacy-preview-panel">
        <div className="legacy-tool-panel__header">
          <div>
            <span className="summary-label">Instrument Preview</span>
            <h2>{currentInstrument}</h2>
            <p className="legacy-tool-panel__copy">
              The phrase also maps to the current source-side board for quick fretboard or piano checking.
            </p>
          </div>
        </div>
        <InstrumentBoard instrumentId={currentInstrument} activeNotes={phrase.notes} keySignature={currentKey} />
      </article>

      {tabPreview ? (
        <article className="legacy-preview-panel">
          <div className="legacy-tool-panel__header">
            <div>
              <span className="summary-label">Tablature</span>
              <h2>String Mapping</h2>
              <p className="legacy-tool-panel__copy">
                The source phrasing page rebuilds the legacy tab sketch directly from the chosen instrument layout.
              </p>
            </div>
          </div>
          <pre className="tab-preview">{tabPreview}</pre>
        </article>
      ) : null}
    </section>
  );
}
