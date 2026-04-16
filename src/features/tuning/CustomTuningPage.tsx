import { useMemo, useState } from "react";
import { useAppStore } from "../../app/store/useAppStore";
import { useCustomInstrumentStore } from "../../app/store/useCustomInstrumentStore";
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

export function CustomTuningPage() {
  const currentKey = useAppStore((state) => state.currentKey);
  const currentInstrument = useAppStore((state) => state.currentInstrument);
  const setCurrentInstrument = useAppStore((state) => state.setCurrentInstrument);
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
  const previewScale = getScaleNotes(currentKey);

  function updateString(index: number, value: string) {
    setStrings((current) => current.map((item, itemIndex) => (itemIndex === index ? value : item)));
  }

  function addString() {
    setStrings((current) => [...current, "E4"]);
  }

  function loadFromCurrent() {
    const config = getInstrumentConfig(currentInstrument, customInstruments);
    const nextStrings =
      config.type === "fretboard" ? [...config.strings] : ["E2", "A2", "D3", "G3", "B3", "E4"];
    setName(`${config.name} (Custom)`);
    setFrets(config.type === "fretboard" ? config.frets ?? 12 : 12);
    setStrings(nextStrings);
  }

  function saveDraft() {
    const nextStrings = sanitizeStrings(strings);
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

  return (
    <section className="page-section">
      <div className="page-hero">
        <div>
          <span className="eyebrow">Source Feature</span>
          <h1>Custom Tuning Builder</h1>
          <p>
            Save custom fretboard layouts into the source app, switch the global instrument to that
            layout, and use it everywhere the shared instrument board appears.
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

      <div className="tuning-layout">
        <article className="detail-card">
          <div className="detail-header">
            <div>
              <span className="summary-label">Draft</span>
              <h2>{name}</h2>
              <p>Edit open strings and fret count, then store the layout as a reusable instrument profile.</p>
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
            <span className="info-chip">{sanitizeStrings(strings).length} strings</span>
          </div>
        </article>

        <article className="detail-card">
          <div className="detail-header">
            <div>
              <span className="summary-label">Saved Custom Instruments</span>
              <h2>{customEntries.length}</h2>
              <p>These entries persist in local storage and appear in the global instrument selector.</p>
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
        <article className="detail-card">
          <div className="detail-header">
            <div>
              <span className="summary-label">Current Preview</span>
              <h2>{getInstrumentConfig(currentInstrument, customInstruments).name}</h2>
              <p>The shared instrument board is already using the saved custom layout.</p>
            </div>
            <NoteBadgeList notes={previewScale} keySignature={currentKey} />
          </div>
          <InstrumentBoard instrumentId={currentInstrument} activeNotes={previewScale} keySignature={currentKey} />
        </article>
      ) : null}
    </section>
  );
}
