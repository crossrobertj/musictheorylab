import { useEffect, useMemo, useState } from "react";
import { playChord } from "../../audio/audioEngine";
import { useAppStore } from "../../app/store/useAppStore";
import { InstrumentBoard } from "../../components/InstrumentBoard";
import { KeyboardPreview } from "../../components/KeyboardPreview";
import { NoteBadgeList } from "../../components/NoteBadgeList";
import { useCustomInstrumentStore } from "../../app/store/useCustomInstrumentStore";
import { getInstrumentConfig } from "../../domain/instruments";
import {
  CHORD_TEMPLATES,
  formatIntervals,
  getCircleNeighbors,
  getParallelKey,
  getRelativeKey,
  getRootFromKey,
  getSemitoneDistance,
} from "../../domain/music";
import {
  VOICING_QUALITIES,
  VOICING_TYPE_LABELS,
  type VoicingType,
  getVoicingVariations,
} from "../../domain/voicings";

function getRegisterSpans(notes: string[]) {
  const bass = notes[0];
  return notes.map((note) => getSemitoneDistance(bass, note));
}

export function VoicingsPage() {
  const currentKey = useAppStore((state) => state.currentKey);
  const currentInstrument = useAppStore((state) => state.currentInstrument);
  const customInstruments = useCustomInstrumentStore((state) => state.customInstruments);
  const root = getRootFromKey(currentKey);
  const [selectedQuality, setSelectedQuality] =
    useState<(typeof VOICING_QUALITIES)[number]>("maj7");
  const [voicingType, setVoicingType] = useState<VoicingType>("inversions");
  const [selectedVariationIndex, setSelectedVariationIndex] = useState(0);

  const baseChord = useMemo(
    () => getVoicingVariations(`${root}4`, selectedQuality, "inversions")[0]?.notes ?? [],
    [root, selectedQuality],
  );

  const selectedTemplate = CHORD_TEMPLATES[selectedQuality];
  const variations = useMemo(
    () => getVoicingVariations(`${root}4`, selectedQuality, voicingType),
    [root, selectedQuality, voicingType],
  );

  useEffect(() => {
    setSelectedVariationIndex(0);
  }, [currentKey, selectedQuality, voicingType]);

  const selectedVariation = variations[selectedVariationIndex] ?? variations[0];
  const registerSpans = selectedVariation ? getRegisterSpans(selectedVariation.notes) : [];
  const selectedTopNote = selectedVariation
    ? selectedVariation.notes[selectedVariation.notes.length - 1]
    : null;
  const relatedKeys = useMemo(() => {
    const suggestions = [
      `${root} Major`,
      `${root} Minor`,
      getRelativeKey(currentKey),
      getParallelKey(currentKey),
      ...getCircleNeighbors(currentKey),
    ];
    return [...new Set(suggestions)];
  }, [currentKey, root]);
  const currentInstrumentConfig = getInstrumentConfig(currentInstrument, customInstruments);

  return (
    <section className="page-section">
      <div className="page-hero">
        <div>
          <span className="eyebrow">Source Feature</span>
          <h1>Chord Voicings</h1>
          <p>
            The voicing lab now runs from source modules. Swap chord qualities, compare inversion
            families, and audition each spread on the current instrument.
          </p>
        </div>
        <div className="hero-actions">
          <button
            className="primary-button"
            onClick={() => selectedVariation && playChord(selectedVariation.notes)}
          >
            Play Selected
          </button>
          <button
            className="ghost-button"
            onClick={() => selectedVariation && playChord(selectedVariation.notes, { arpeggio: true })}
          >
            Arpeggiate
          </button>
        </div>
      </div>

      <div className="summary-grid">
        <article className="summary-card">
          <span className="summary-label">Base Chord</span>
          <h2>
            {root}
            {selectedTemplate.symbol || " major"}
          </h2>
          <p>{selectedTemplate.desc}</p>
          <div className="info-chip-row">
            <span className="info-chip">Formula: {formatIntervals(selectedTemplate.intervals)}</span>
            <span className="info-chip">Family: {VOICING_TYPE_LABELS[voicingType]}</span>
          </div>
          <NoteBadgeList notes={baseChord} keySignature={currentKey} />
        </article>

        <article className="summary-card">
          <span className="summary-label">Selected Spread</span>
          <h2>{selectedVariation?.label ?? "No voicing"}</h2>
          <p>
            Bass {selectedVariation?.notes[0] ?? "n/a"} to top {selectedTopNote ?? "n/a"}.
          </p>
          <div className="info-chip-row">
            <span className="info-chip">Voicings: {variations.length}</span>
            <span className="info-chip">Register: {registerSpans.join(" • ") || "n/a"}</span>
          </div>
          {selectedVariation ? (
            <NoteBadgeList notes={selectedVariation.notes} keySignature={currentKey} />
          ) : null}
        </article>

        <article className="summary-card">
          <span className="summary-label">Related Keys</span>
          <h2>{currentKey}</h2>
          <p>Keep the voicing shape, then audition nearby harmonic contexts from the same toolbar state.</p>
          <div className="info-chip-row">
            {relatedKeys.map((key) => (
              <span className="info-chip" key={key}>
                {key}
              </span>
            ))}
          </div>
        </article>
      </div>

      <article className="detail-card">
        <div className="detail-header">
          <div>
            <span className="summary-label">Distribution</span>
            <h2>Choose a voicing family</h2>
            <p>The source rewrite mirrors the legacy inversion, drop, shell, open, and power builders.</p>
          </div>
        </div>
        <div className="segmented-button-row">
          {(Object.keys(VOICING_TYPE_LABELS) as VoicingType[]).map((type) => (
            <button
              key={type}
              className={voicingType === type ? "secondary-button" : "ghost-button"}
              onClick={() => setVoicingType(type)}
            >
              {VOICING_TYPE_LABELS[type]}
            </button>
          ))}
        </div>
      </article>

      <article className="detail-card">
        <div className="detail-header">
          <div>
            <span className="summary-label">Chord Quality</span>
            <h2>Switch the source material</h2>
            <p>These are the same practical voicing presets the legacy lab exposed for quick exploration.</p>
          </div>
        </div>
        <div className="quality-picker-grid">
          {VOICING_QUALITIES.map((quality) => (
            <button
              key={quality}
              className={`quality-picker-button ${quality === selectedQuality ? "is-active" : ""}`}
              onClick={() => setSelectedQuality(quality)}
            >
              <strong>{quality}</strong>
              <span>{CHORD_TEMPLATES[quality].symbol || "root"}</span>
            </button>
          ))}
        </div>
      </article>

      <div className="voicing-preview-grid">
        <article className="detail-card">
          <div className="detail-header">
            <div>
              <span className="summary-label">Instrument Preview</span>
              <h2>{selectedVariation?.label ?? "Preview"}</h2>
              <p>The board and keyboard preview follow the selected voicing and the shared app instrument selector.</p>
            </div>
            {selectedVariation ? (
              <button className="ghost-button" onClick={() => playChord(selectedVariation.notes)}>
                Replay
              </button>
            ) : null}
          </div>
          {selectedVariation ? (
            <>
              <NoteBadgeList notes={selectedVariation.notes} keySignature={currentKey} />
              <KeyboardPreview activeNotes={selectedVariation.notes} keySignature={currentKey} />
              <InstrumentBoard
                instrumentId={currentInstrument}
                activeNotes={selectedVariation.notes}
                keySignature={currentKey}
              />
            </>
          ) : null}
        </article>

        <article className="detail-card">
          <div className="detail-header">
            <div>
              <span className="summary-label">Voicing Set</span>
              <h2>{VOICING_TYPE_LABELS[voicingType]}</h2>
              <p>Select a card to inspect and audition that exact spread.</p>
            </div>
          </div>
          <div className="voicing-card-list">
            {variations.map((variation, index) => (
              <button
                key={`${selectedQuality}-${voicingType}-${variation.label}`}
                className={`voicing-card ${selectedVariationIndex === index ? "is-selected" : ""}`}
                onClick={() => {
                  setSelectedVariationIndex(index);
                  playChord(variation.notes);
                }}
              >
                <div className="voicing-card-header">
                  <div>
                    <span className="card-tag">{variation.label}</span>
                    <h3>
                      {root}
                      {selectedTemplate.symbol}
                    </h3>
                  </div>
                  <span className="info-chip">{getRegisterSpans(variation.notes).join(" • ")}</span>
                </div>
                <NoteBadgeList notes={variation.notes} keySignature={currentKey} />
              </button>
            ))}
          </div>
          <p className="supporting-copy">Instrument preview: {currentInstrumentConfig.name}</p>
        </article>
      </div>
    </section>
  );
}
