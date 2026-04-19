import { useEffect, useMemo, useState } from "react";
import { playChord, playScale } from "../../audio/audioEngine";
import { useAppStore } from "../../app/store/useAppStore";
import { useShellBridgeStore } from "../../app/store/useShellBridgeStore";
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

const ROUTE_ID = "piano";
const DEFAULT_CUSTOM_NOTES = ["C", "E", "G"];

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
  const updateRoute = useShellBridgeStore((state) => state.updateRoute);
  const [mode, setMode] = useState<InstrumentMode>("scale");
  const [customNotes, setCustomNotes] = useState<string[]>(DEFAULT_CUSTOM_NOTES);

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
  const displayInstrumentId = "piano";
  const displayInstrumentConfig = getInstrumentConfig(displayInstrumentId);
  const tonicTriad = useMemo(() => buildChordFromRootAndQuality(`${root}4`, "Major"), [root]);
  const tonicMinorTriad = useMemo(() => buildChordFromRootAndQuality(`${root}4`, "minor"), [root]);
  const shellTitle = "Piano";
  const shellSubtitle =
    "Audition scales, triads, sevenths, and custom note sets on a playable keyboard.";
  const playableLabel = `${MODE_LABELS[mode]} on ${displayInstrumentConfig.name}`;

  const shellActions = useMemo(
    () => ({
      playCurrent: () => {
        if (mode === "scale") {
          playScale(activeNotes);
          return;
        }

        playChord(activeNotes);
      },
      clear: () => {
        setMode("scale");
        setCustomNotes([...DEFAULT_CUSTOM_NOTES]);
      },
    }),
    [activeNotes, mode],
  );

  useEffect(() => {
    updateRoute(ROUTE_ID, {
      title: shellTitle,
      subtitle: shellSubtitle,
      playableLabel,
      playableNoteSet: activeNotes,
      playCurrent: shellActions.playCurrent,
      clear: shellActions.clear,
    });
  }, [activeNotes, playableLabel, shellActions, shellSubtitle, shellTitle, updateRoute]);

  return (
    <section className="page-section">
      <div className="legacy-tool-panel">
        <div className="legacy-tool-panel__header">
          <div>
            <span className="eyebrow">Instrument View</span>
            <h1 className="legacy-tool-panel__title">Instrument Explorer</h1>
            <p className="legacy-tool-panel__copy">
              Switch between scale, chord, and custom-note views to inspect the current instrument
              board in the active key.
            </p>
          </div>
          <div className="hero-actions">
            <button className="primary-button" onClick={() => shellActions.playCurrent()}>
              Play Active Notes
            </button>
          </div>
        </div>

        <div className="legacy-toolbar-row">
          {(Object.keys(MODE_LABELS) as InstrumentMode[]).map((option) => (
            <button
              key={option}
              className={`legacy-mode-button ${mode === option ? "is-active" : ""}`}
              onClick={() => setMode(option)}
            >
              {MODE_LABELS[option]}
            </button>
          ))}
        </div>

        <div className="legacy-toolbar-row">
          <div className="legacy-toolbar-chip">
            Instrument
            <br />
            <strong>{displayInstrumentConfig.name}</strong>
          </div>
          <div className="legacy-toolbar-chip">
            Key
            <br />
            <strong>{currentKey}</strong>
          </div>
          <div className="legacy-toolbar-chip">
            Active
            <br />
            <strong>{activeNotes.length} notes</strong>
          </div>
        </div>
      </div>

      <div className="legacy-lab-grid">
        <article className="legacy-preview-panel">
          <div className="detail-header">
            <div>
              <span className="summary-label">Board Preview</span>
              <h2>
                {MODE_LABELS[mode]} on {displayInstrumentConfig.name}
              </h2>
              <p className="legacy-tool-panel__copy">
                Click any note on the board to audition it. In custom mode, clicks also toggle note
                membership.
              </p>
            </div>
            <NoteBadgeList notes={activeNotes} keySignature={currentKey} />
          </div>

          <div className="legacy-preview-panel__meta">
            <span className="legacy-preview-chip">{displayInstrumentConfig.name}</span>
            <span className="legacy-preview-chip">{currentKey}</span>
            <span className="legacy-preview-chip">{MODE_LABELS[mode]}</span>
          </div>

          <div className="legacy-token-row">
            <button className="legacy-catalog-card__action" onClick={() => playScale(getScaleNotes(currentKey))}>
              Play Scale
            </button>
            <button className="legacy-catalog-card__action" onClick={() => playChord(tonicTriad.notes)}>
              Major Triad
            </button>
            <button className="legacy-catalog-card__action" onClick={() => playChord(tonicMinorTriad.notes)}>
              Minor Triad
            </button>
          </div>

          <InstrumentBoard
            instrumentId={displayInstrumentId}
            activeNotes={activeNotes}
            keySignature={currentKey}
            onNoteClick={
              mode === "custom"
                ? (note) => setCustomNotes((current) => toggleNote(note.replace(/[0-9]/g, ""), current))
                : undefined
            }
          />
        </article>

        <div className="legacy-selection-strip">
          {mode === "custom" ? (
            <article className="legacy-selection-card">
              <div className="detail-header">
                <div>
                  <span className="summary-label">Custom Notes</span>
                  <h3 className="legacy-selection-card__title">Select note classes</h3>
                  <p className="legacy-tool-panel__copy">
                    Click notes here or directly on the instrument board to build a custom set.
                  </p>
                </div>
                <button className="secondary-button" onClick={() => shellActions.clear()}>
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

          <article className="legacy-selection-card">
            <div>
              <span className="summary-label">Active Set</span>
              <h3 className="legacy-selection-card__title">{MODE_LABELS[mode]}</h3>
              <p className="legacy-tool-panel__copy">
                This route stays pinned to a piano keyboard while still following the current key.
              </p>
            </div>
            <NoteBadgeList notes={activeNotes} keySignature={currentKey} />
          </article>
        </div>
      </div>
    </section>
  );
}
