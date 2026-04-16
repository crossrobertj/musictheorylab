import { useMemo, useState } from "react";
import { playNoteSequence } from "../../audio/audioEngine";
import { useAppStore } from "../../app/store/useAppStore";
import { useCustomInstrumentStore } from "../../app/store/useCustomInstrumentStore";
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
  const [phrase, setPhrase] = useState(() => generateRandomPhrase(currentKey));

  const tabPreview = useMemo(
    () => buildTabPreview(phrase.notes, currentInstrument, customInstruments),
    [customInstruments, currentInstrument, phrase.notes],
  );

  function rerollPhrase() {
    setPhrase(generateRandomPhrase(currentKey));
  }

  function exportPhraseMidi() {
    const midi = buildMidiFromNoteSequence(phrase.notes, tempo, 0.5, 0.45);
    downloadMidiFile(midi, "phrase.mid");
  }

  return (
    <section className="page-section">
      <div className="page-hero">
        <div>
          <span className="eyebrow">Source Feature</span>
          <h1>Phrasing Tool</h1>
          <p>
            Generate melodic fragments from extracted scale data, preview them on the active
            instrument, and export the phrase as a quick MIDI sketch.
          </p>
        </div>
        <div className="hero-actions">
          <button className="primary-button" onClick={rerollPhrase}>
            Random Phrase
          </button>
          <button className="ghost-button" onClick={() => playNoteSequence(phrase.notes, 380, 320)}>
            Play Phrase
          </button>
          <button className="ghost-button" onClick={exportPhraseMidi}>
            Export MIDI
          </button>
        </div>
      </div>

      <div className="summary-grid">
        <article className="summary-card">
          <span className="summary-label">Scale</span>
          <h2>{phrase.scaleName}</h2>
          <p>{phrase.mode}</p>
        </article>
        <article className="summary-card">
          <span className="summary-label">Context Chord</span>
          <h2>{phrase.chord}</h2>
          <p>{phrase.shape}</p>
        </article>
        <article className="summary-card">
          <span className="summary-label">Motif</span>
          <h2>{phrase.motif}</h2>
          <p>{phrase.notes.length} notes in the current take.</p>
        </article>
      </div>

      <article className="detail-card">
        <div className="detail-header">
          <div>
            <span className="summary-label">Generated Melody</span>
            <h2>Phrase Notes</h2>
            <p>Click replay to audition the phrase linearly against the shared app tempo.</p>
          </div>
        </div>
        <NoteBadgeList notes={phrase.notes} keySignature={currentKey} />
        <KeyboardPreview activeNotes={phrase.notes} keySignature={currentKey} />
      </article>

      <article className="detail-card">
        <div className="detail-header">
          <div>
            <span className="summary-label">Instrument Preview</span>
            <h2>{currentInstrument}</h2>
            <p>The phrase also maps to the current source-side board for quick fretboard or piano checking.</p>
          </div>
        </div>
        <InstrumentBoard instrumentId={currentInstrument} activeNotes={phrase.notes} keySignature={currentKey} />
      </article>

      {tabPreview ? (
        <article className="detail-card">
          <div className="detail-header">
            <div>
              <span className="summary-label">Tablature</span>
              <h2>String Mapping</h2>
              <p>The source phrasing page rebuilds the legacy tab sketch directly from the chosen instrument layout.</p>
            </div>
          </div>
          <pre className="tab-preview">{tabPreview}</pre>
        </article>
      ) : null}
    </section>
  );
}
