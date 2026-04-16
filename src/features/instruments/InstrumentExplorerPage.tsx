import { useMemo, useState } from "react";
import { playChord, playScale } from "../../audio/audioEngine";
import { useAppStore } from "../../app/store/useAppStore";
import { useCustomInstrumentStore } from "../../app/store/useCustomInstrumentStore";
import { InstrumentBoard } from "../../components/InstrumentBoard";
import { NoteBadgeList } from "../../components/NoteBadgeList";
import { getInstrumentConfig } from "../../domain/instruments";
import { NOTES } from "../../domain/music";
import {
  buildChordFromRootAndQuality,
  getDiatonicSevenths,
  getDiatonicTriads,
  getRootFromKey,
  getScaleNotes,
} from "../../domain/music";

type InstrumentMode = "scale" | "triad" | "seventh" | "custom";

const MODE_LABELS: Record<InstrumentMode, string> = {
  scale: "Current Key Scale",
  triad: "Tonic Triad",
  seventh: "Tonic Seventh",
  custom: "Custom Notes",
};

function toggleNote(target: string, current: string[]) {
  return current.includes(target)
    ? current.filter((note) => note !== target)
    : [...current, target];
}

export function InstrumentExplorerPage() {
  const currentKey = useAppStore((state) => state.currentKey);
  const currentInstrument = useAppStore((state) => state.currentInstrument);
  const customInstruments = useCustomInstrumentStore((state) => state.customInstruments);
  const [mode, setMode] = useState<InstrumentMode>("scale");
  const [customNotes, setCustomNotes] = useState<string[]>(["C", "E", "G"]);

  const activeNotes = useMemo(() => {
    if (mode === "custom") {
      return customNotes.map((note) => `${note}4`);
    }

    if (mode === "triad") {
      return getDiatonicTriads(currentKey)[0]?.notes ?? [];
    }

    if (mode === "seventh") {
      return getDiatonicSevenths(currentKey)[0]?.notes ?? [];
    }

    return getScaleNotes(currentKey);
  }, [currentKey, customNotes, mode]);

  const root = getRootFromKey(currentKey);
  const currentInstrumentConfig = getInstrumentConfig(currentInstrument, customInstruments);
  const tonicTriad = useMemo(() => buildChordFromRootAndQuality(`${root}4`, "Major"), [root]);
  const tonicMinorTriad = useMemo(() => buildChordFromRootAndQuality(`${root}4`, "minor"), [root]);

  return (
    <section className="page-section">
      <div className="page-hero">
        <div>
          <span className="eyebrow">Source Feature</span>
          <h1>Instrument Explorer</h1>
          <p>
            Source-side piano and fretboard rendering is now available. This replaces the old static
            preview with an interactive board that responds to the current instrument and key.
          </p>
        </div>
        <div className="hero-actions">
          <button
            className="primary-button"
            onClick={() => (mode === "scale" ? playScale(activeNotes) : playChord(activeNotes))}
          >
            Play Active Notes
          </button>
        </div>
      </div>

      <div className="summary-grid">
        <article className="summary-card">
          <span className="summary-label">Mode</span>
          <h2>{MODE_LABELS[mode]}</h2>
          <div className="toolbar-cluster">
            {(Object.keys(MODE_LABELS) as InstrumentMode[]).map((option) => (
              <button
                key={option}
                className={mode === option ? "secondary-button" : "ghost-button"}
                onClick={() => setMode(option)}
              >
                {MODE_LABELS[option]}
              </button>
            ))}
          </div>
        </article>

        <article className="summary-card">
          <span className="summary-label">Instrument</span>
          <h2>{currentInstrumentConfig.name}</h2>
          <p>The board below follows the app-level instrument selector in the source toolbar.</p>
          <NoteBadgeList notes={activeNotes} keySignature={currentKey} />
        </article>

        <article className="summary-card">
          <span className="summary-label">Quick Auditions</span>
          <h2>{currentKey}</h2>
          <div className="toolbar-cluster">
            <button className="ghost-button" onClick={() => playScale(getScaleNotes(currentKey))}>
              Play Scale
            </button>
            <button className="ghost-button" onClick={() => playChord(tonicTriad.notes)}>
              Major Triad
            </button>
            <button className="ghost-button" onClick={() => playChord(tonicMinorTriad.notes)}>
              Minor Triad
            </button>
          </div>
        </article>
      </div>

      {mode === "custom" ? (
        <article className="detail-card">
          <div className="detail-header">
            <div>
              <span className="summary-label">Custom Notes</span>
              <h2>Select note classes</h2>
              <p>Click notes here or directly on the instrument board to build a custom set.</p>
            </div>
            <button className="secondary-button" onClick={() => setCustomNotes([])}>
              Clear
            </button>
          </div>
          <div className="note-picker-grid">
            {NOTES.map((note) => {
              const active = customNotes.includes(note);
              return (
                <button
                  key={`instrument-custom-${note}`}
                  className={`note-picker-button ${active ? "is-active" : ""}`}
                  onClick={() => setCustomNotes((current) => toggleNote(note, current))}
                >
                  {note}
                </button>
              );
            })}
          </div>
        </article>
      ) : null}

      <article className="detail-card">
        <div className="detail-header">
          <div>
            <span className="summary-label">Interactive Board</span>
            <h2>
              {MODE_LABELS[mode]} on {currentInstrumentConfig.name}
            </h2>
            <p>Click any note on the board to audition it. In custom mode, clicks also toggle note membership.</p>
          </div>
          <NoteBadgeList notes={activeNotes} keySignature={currentKey} />
        </div>
        <InstrumentBoard
          instrumentId={currentInstrument}
          activeNotes={activeNotes}
          keySignature={currentKey}
          onNoteClick={
            mode === "custom"
              ? (note) => setCustomNotes((current) => toggleNote(note.replace(/[0-9]/g, ""), current))
              : undefined
          }
        />
      </article>
    </section>
  );
}
