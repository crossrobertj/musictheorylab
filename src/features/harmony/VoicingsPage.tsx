import { useCallback, useEffect, useMemo, useState } from "react";
import { playChord } from "../../audio/audioEngine";
import { useAppStore } from "../../app/store/useAppStore";
import { useShellBridgeStore } from "../../app/store/useShellBridgeStore";
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
  const syncRoute = useShellBridgeStore((state) => state.syncRoute);
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
  const playableLabel = useMemo(() => {
    const chordLabel = selectedTemplate.symbol ? `${root}${selectedTemplate.symbol}` : `${root} major`;
    const variationLabel = selectedVariation?.label ?? "No voicing selected";

    return `${chordLabel} • ${VOICING_TYPE_LABELS[voicingType]} • ${variationLabel}`;
  }, [root, selectedTemplate.symbol, selectedVariation?.label, voicingType]);
  const playableNoteSet = selectedVariation?.notes ?? [];
  const playCurrent = useCallback(() => {
    if (!selectedVariation) return;
    playChord(selectedVariation.notes);
  }, [selectedVariation]);
  const clear = useCallback(() => {
    setSelectedQuality("maj7");
    setVoicingType("inversions");
    setSelectedVariationIndex(0);
  }, []);
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

  useEffect(() => {
    syncRoute("voicings", {
      title: "Chord Voicings",
      subtitle: "Advanced drop and shell voicings for the active key.",
      playableLabel,
      playableNoteSet,
      playCurrent,
      clear,
    });
  }, [clear, playCurrent, playableLabel, playableNoteSet, syncRoute]);

  return (
    <section className="page-section">
      <div className="legacy-tool-panel">
        <div className="legacy-tool-panel__header">
          <div>
            <span className="eyebrow">Voicing Lab</span>
            <h1 className="legacy-tool-panel__title">Chord Voicings</h1>
            <p className="legacy-tool-panel__copy">
              Swap chord qualities, compare inversion families, and audition each spread on the
              current instrument.
            </p>
          </div>
          <div className="hero-actions">
            <button className="primary-button" onClick={playCurrent}>
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

        <div className="legacy-toolbar-row">
          {(Object.keys(VOICING_TYPE_LABELS) as VoicingType[]).map((type) => (
            <button
              key={type}
              className={`legacy-mode-button ${voicingType === type ? "is-active" : ""}`}
              onClick={() => setVoicingType(type)}
            >
              {VOICING_TYPE_LABELS[type]}
            </button>
          ))}
        </div>

        <div className="legacy-toolbar-row">
          {VOICING_QUALITIES.map((quality) => (
            <button
              key={quality}
              className={`legacy-mode-button ${selectedQuality === quality ? "is-active" : ""}`}
              onClick={() => setSelectedQuality(quality)}
            >
              {quality}
            </button>
          ))}
        </div>
      </div>
      <div className="legacy-lab-grid">
        <article className="legacy-preview-panel">
          <div className="detail-header">
            <div>
              <span className="summary-label">Instrument Preview</span>
              <h2>{selectedVariation?.label ?? "Preview"}</h2>
              <p className="legacy-tool-panel__copy">
                {root}
                {selectedTemplate.symbol || " major"} on {currentInstrumentConfig.name}
              </p>
            </div>
            {selectedVariation ? (
              <button className="legacy-catalog-card__action" onClick={playCurrent}>
                Replay
              </button>
            ) : null}
          </div>
          <div className="legacy-preview-panel__meta">
            <span className="legacy-preview-chip">Formula: {formatIntervals(selectedTemplate.intervals)}</span>
            <span className="legacy-preview-chip">Family: {VOICING_TYPE_LABELS[voicingType]}</span>
            <span className="legacy-preview-chip">Voicings: {variations.length}</span>
            <span className="legacy-preview-chip">Register: {registerSpans.join(" • ") || "n/a"}</span>
          </div>
          <div className="legacy-token-row">
            {relatedKeys.map((key) => (
              <span className="legacy-note-token" key={key}>
                {key}
              </span>
            ))}
          </div>
          {selectedVariation ? (
            <>
              <NoteBadgeList notes={baseChord} keySignature={currentKey} />
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

        <article className="legacy-preview-panel">
          <div className="detail-header">
            <div>
              <span className="summary-label">Voicing Set</span>
              <h2>{VOICING_TYPE_LABELS[voicingType]}</h2>
              <p className="legacy-tool-panel__copy">
                Select a card to inspect and audition that exact spread.
              </p>
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
