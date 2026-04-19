import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppStore } from "../../app/store/useAppStore";
import { useCustomInstrumentStore } from "../../app/store/useCustomInstrumentStore";
import { useShellBridgeStore } from "../../app/store/useShellBridgeStore";
import { InstrumentBoard } from "../../components/InstrumentBoard";
import { NoteBadgeList } from "../../components/NoteBadgeList";
import {
  getInstrumentConfig,
  getInstrumentEntries,
  slugifyInstrumentId,
  type InstrumentConfig,
} from "../../domain/instruments";
import { getScaleNotes } from "../../domain/music";

function sanitizeStrings(value: string[]) {
  return value.map((item) => item.trim()).filter(Boolean);
}

const ROUTE_ID = "customtuning";

export function CustomTuningPage() {
  const currentKey = useAppStore((state) => state.currentKey);
  const currentInstrument = useAppStore((state) => state.currentInstrument);
  const setCurrentInstrument = useAppStore((state) => state.setCurrentInstrument);
  const updateRoute = useShellBridgeStore((state) => state.updateRoute);
  const { customInstruments, saveInstrument, removeInstrument } = useCustomInstrumentStore();

  const sourceConfig = getInstrumentConfig(currentInstrument, customInstruments);
  const fallbackStrings =
    sourceConfig.type === "fretboard" ? sourceConfig.strings : ["E2", "A2", "D3", "G3", "B3", "E4"];

  const [name, setName] = useState(`${sourceConfig.name} (Custom)`);
  const [frets, setFrets] = useState(sourceConfig.type === "fretboard" ? sourceConfig.frets ?? 12 : 12);
  const [strings, setStrings] = useState<string[]>([...fallbackStrings]);

  const customEntries = useMemo(
    () => getInstrumentEntries(customInstruments).filter(([id]) => id.startsWith("custom-")),
    [customInstruments],
  );
  const previewScale = useMemo(() => getScaleNotes(currentKey), [currentKey]);
  const draftStrings = useMemo(() => sanitizeStrings(strings), [strings]);
  const draftTuningLabel = draftStrings.length ? draftStrings.join(" • ") : "No open strings";
  const playableLabel = `${name.trim() || "Custom Tuning"} • ${draftTuningLabel} • ${Math.max(5, Math.min(30, frets))} frets`;

  function updateString(index: number, value: string) {
    setStrings((current) => current.map((item, itemIndex) => (itemIndex === index ? value : item)));
  }

  function addString() {
    setStrings((current) => [...current, "E4"]);
  }

  const loadFromCurrent = useCallback(() => {
    const config = getInstrumentConfig(currentInstrument, customInstruments);
    const nextStrings =
      config.type === "fretboard" ? [...config.strings] : ["E2", "A2", "D3", "G3", "B3", "E4"];
    setName(`${config.name} (Custom)`);
    setFrets(config.type === "fretboard" ? config.frets ?? 12 : 12);
    setStrings(nextStrings);
  }, [currentInstrument, customInstruments]);

  const clear = useCallback(() => {
    loadFromCurrent();
  }, [loadFromCurrent]);

  function saveDraft() {
    const nextStrings = draftStrings;
    if (nextStrings.length < 2) return;

    const instrumentId = slugifyInstrumentId(name);
    const config: InstrumentConfig = {
      type: "fretboard",
      name,
      strings: nextStrings,
      frets: Math.max(5, Math.min(30, frets)),
    };

    saveInstrument(instrumentId, config);
    setCurrentInstrument(instrumentId);
  }

  useEffect(() => {
    updateRoute(ROUTE_ID, {
      title: "Custom Tuning",
      subtitle: "Clone the current instrument, edit its tuning, and save reusable fretboard layouts.",
      playableLabel,
      playableNoteSet: previewScale,
      playCurrent: null,
      clear,
    });
  }, [clear, playableLabel, previewScale, updateRoute]);

  return (
    <section className="page-section">
      <div className="legacy-tool-panel">
        <div className="legacy-tool-panel__header">
          <div>
            <span className="eyebrow">Instrument Setup</span>
            <h1 className="legacy-tool-panel__title">Custom Tuning Builder</h1>
            <p className="legacy-tool-panel__copy">
              Save custom fretboard layouts into the source app, switch the global instrument to
              that layout, and use it everywhere the shared instrument board appears.
            </p>
          </div>
          <div className="hero-actions">
          <button className="primary-button" onClick={saveDraft}>
            Save & Switch
          </button>
          <button className="ghost-button" onClick={loadFromCurrent}>
            Clone Current
          </button>
          </div>
        </div>
      </div>

      <div className="tuning-layout">
        <article className="legacy-preview-panel">
          <div className="legacy-tool-panel__header">
            <div>
              <span className="summary-label">Draft</span>
              <h2>{name}</h2>
              <p className="legacy-tool-panel__copy">
                Edit open strings and fret count, then store the layout as a reusable instrument profile.
              </p>
            </div>
          </div>
          <div className="song-grid song-grid--meta">
            <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Custom name" />
            <input
              type="number"
              min="5"
              max="30"
              value={frets}
              onChange={(event) => setFrets(Number.parseInt(event.target.value, 10) || 12)}
              placeholder="Frets"
            />
          </div>
          <div className="custom-string-grid">
            {strings.map((stringValue, index) => (
              <div key={`string-${index}`} className="custom-string-row">
                <input
                  value={stringValue}
                  onChange={(event) => updateString(index, event.target.value)}
                  placeholder={`String ${index + 1}`}
                />
                <button className="ghost-button" onClick={() => setStrings((current) => current.filter((_, itemIndex) => itemIndex !== index))}>
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="toolbar-cluster">
            <button className="ghost-button" onClick={addString}>
              Add String
            </button>
            <span className="info-chip">{draftStrings.length} strings</span>
          </div>
        </article>

        <article className="legacy-selection-card">
          <div className="legacy-tool-panel__header">
            <div>
              <span className="summary-label">Saved Custom Instruments</span>
              <h2>{customEntries.length}</h2>
              <p className="legacy-tool-panel__copy">
                These entries persist in local storage and appear in the global instrument selector.
              </p>
            </div>
          </div>
          <div className="song-list-block">
            {customEntries.map(([id, config]) => (
              <div key={id} className="finder-result-card">
                <strong>{config.name}</strong>
                <small>{config.type === "fretboard" ? `${config.strings.join(" • ")} • ${config.frets} frets` : config.type}</small>
                <div className="toolbar-cluster">
                  <button className="ghost-button" onClick={() => setCurrentInstrument(id)}>
                    Use
                  </button>
                  <button className="ghost-button" onClick={() => removeInstrument(id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {customEntries.length === 0 ? <p className="card-copy">No saved custom instruments yet.</p> : null}
          </div>
        </article>
      </div>

      {currentInstrument.startsWith("custom-") ? (
        <article className="legacy-preview-panel">
          <div className="legacy-tool-panel__header">
            <div>
              <span className="summary-label">Current Preview</span>
              <h2>{getInstrumentConfig(currentInstrument, customInstruments).name}</h2>
              <p className="legacy-tool-panel__copy">The shared instrument board is already using the saved custom layout.</p>
            </div>
            <NoteBadgeList notes={previewScale} keySignature={currentKey} />
          </div>
          <InstrumentBoard instrumentId={currentInstrument} activeNotes={previewScale} keySignature={currentKey} />
        </article>
      ) : null}
    </section>
  );
}
