import { useCallback, useEffect, useMemo, useState } from "react";
import { playChord, playScale } from "../../audio/audioEngine";
import { useShellBridgeStore } from "../../app/store/useShellBridgeStore";
import { useAppStore } from "../../app/store/useAppStore";
import { InstrumentBoard } from "../../components/InstrumentBoard";
import { NoteBadgeList } from "../../components/NoteBadgeList";
import { NOTES } from "../../domain/music";
import {
  getDegreeTriad,
  getHarmonicFunctions,
  resolveMelodicMinorModes,
  resolveUpperStructures,
} from "../../domain/advancedHarmony";

const FUNCTION_TONE_CLASS: Record<string, string> = {
  tonic: "is-tonic",
  predominant: "is-predominant",
  dominant: "is-dominant",
  modal: "is-modal",
};

const DEFAULT_MELODIC_MINOR_ROOT = "C";
const DEFAULT_UPPER_STRUCTURE_ROOT = "C";

function formatPlayableNotes(notes: string[]) {
  return notes.map((note) => note.replace(/[0-9]/g, "")).join(" • ");
}

export function AdvancedHarmonyPage() {
  const updateRoute = useShellBridgeStore((state) => state.updateRoute);
  const currentKey = useAppStore((state) => state.currentKey);
  const currentInstrument = useAppStore((state) => state.currentInstrument);
  const isMinor = currentKey.includes("Minor");
  const harmonicFunctions = useMemo(() => getHarmonicFunctions(isMinor), [isMinor]);

  const defaultPreviewNotes = useMemo(() => getDegreeTriad(currentKey, 0), [currentKey]);
  const [melodicMinorRoot, setMelodicMinorRoot] = useState(DEFAULT_MELODIC_MINOR_ROOT);
  const [upperStructureRoot, setUpperStructureRoot] = useState(DEFAULT_UPPER_STRUCTURE_ROOT);
  const [previewNotes, setPreviewNotes] = useState<string[]>(() => defaultPreviewNotes);
  const [activeSection, setActiveSection] = useState("Harmonic Function");
  const [previewKind, setPreviewKind] = useState<"chord" | "scale">("chord");

  const melodicMinorModes = useMemo(
    () => resolveMelodicMinorModes(melodicMinorRoot),
    [melodicMinorRoot],
  );
  const upperStructures = useMemo(
    () => resolveUpperStructures(upperStructureRoot),
    [upperStructureRoot],
  );
  const playableLabel = useMemo(
    () => `${activeSection} • ${formatPlayableNotes(previewNotes)}`,
    [activeSection, previewNotes],
  );
  const playCurrent = useCallback(() => {
    if (previewKind === "scale") {
      playScale(previewNotes);
      return;
    }

    playChord(previewNotes);
  }, [previewKind, previewNotes]);
  const clear = useCallback(() => {
    setMelodicMinorRoot(DEFAULT_MELODIC_MINOR_ROOT);
    setUpperStructureRoot(DEFAULT_UPPER_STRUCTURE_ROOT);
    setPreviewNotes(defaultPreviewNotes);
    setActiveSection("Harmonic Function");
    setPreviewKind("chord");
  }, [defaultPreviewNotes]);

  useEffect(() => {
    updateRoute("harmony", {
      title: "Advanced Harmony",
      subtitle: "Melodic minor, upper structures, and harmonic functions.",
      playableLabel,
      playableNoteSet: previewNotes,
      playCurrent,
      clear,
    });
  }, [clear, playCurrent, playableLabel, previewNotes, updateRoute]);

  return (
    <section className="page-section">
      <article className="legacy-tool-panel">
        <div className="legacy-tool-panel__header">
          <div>
            <span className="eyebrow">Harmony Lab</span>
            <h1 className="legacy-tool-panel__title">Advanced Harmony</h1>
            <p className="legacy-tool-panel__copy">
              Harmonic functions, melodic-minor mode families, and upper structures in the older
              panel language instead of the generic source cards.
            </p>
          </div>
          <div className="legacy-toolbar-row">
            <span className="legacy-toolbar-chip">
              Key <strong>{currentKey}</strong>
            </span>
            <span className="legacy-toolbar-chip">
              Preview <strong>{previewKind === "scale" ? "Scale" : "Chord"}</strong>
            </span>
            <span className="legacy-toolbar-chip">
              Board <strong>{currentInstrument}</strong>
            </span>
          </div>
        </div>
        <div className="legacy-toolbar-row">
          <button className="primary-button" onClick={playCurrent}>
            Play Preview
          </button>
          <button className="ghost-button" onClick={clear}>
            Reset
          </button>
        </div>
      </article>

      <div className="legacy-lab-grid">
        <article className="legacy-map-panel">
          <div className="legacy-tool-panel__header">
            <div>
              <span className="summary-label">Harmonic Function</span>
              <h2>{currentKey}</h2>
              <p>Click a function cell to hear the matching degree triad in the active key.</p>
            </div>
          </div>
          <div className="advanced-harmony-grid">
            {harmonicFunctions.map((cell, index) => {
              const triad = getDegreeTriad(currentKey, index);
              return (
                <button
                  key={`${cell.numeral}-${cell.func}`}
                  className={`advanced-harmony-card ${FUNCTION_TONE_CLASS[cell.tone]}`}
                  onClick={() => {
                    setActiveSection(`Harmonic Function • ${cell.numeral}`);
                    setPreviewKind("chord");
                    setPreviewNotes(triad);
                    playChord(triad);
                  }}
                >
                  <strong>{cell.numeral}</strong>
                  <span>{cell.func}</span>
                  <small>{triad.map((note) => note.replace(/[0-9]/g, "")).join(" • ")}</small>
                </button>
              );
            })}
          </div>
          <div className="legacy-preview-panel__meta">
            <span className="legacy-preview-chip">Tonic = stable</span>
            <span className="legacy-preview-chip">Pre-dominant = motion</span>
            <span className="legacy-preview-chip">Dominant = tension</span>
            <span className="legacy-preview-chip">Modal = borrowed color</span>
          </div>
        </article>

        <article className="legacy-preview-panel">
          <div className="legacy-tool-panel__header">
            <div>
              <span className="summary-label">Preview Board</span>
              <h2>{currentInstrument}</h2>
              <p>The shell instrument selector still drives the board below.</p>
            </div>
            <NoteBadgeList notes={previewNotes} keySignature={currentKey} />
          </div>
          <InstrumentBoard
            instrumentId={currentInstrument}
            activeNotes={previewNotes}
            keySignature={currentKey}
          />
        </article>
      </div>

      <article className="legacy-tool-panel">
        <div className="legacy-tool-panel__header">
          <div>
            <span className="summary-label">Melodic Minor</span>
            <h2>Mode families and diatonic triads</h2>
            <p>All seven rotations are rebuilt from the selected melodic-minor parent root.</p>
          </div>
          <label className="select-field">
            <span>Parent Root</span>
            <select value={melodicMinorRoot} onChange={(event) => setMelodicMinorRoot(event.target.value)}>
              {NOTES.map((note) => (
                <option key={note} value={note}>
                  {note} Melodic Minor
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="legacy-catalog-grid">
          {melodicMinorModes.map((mode) => (
            <article key={mode.name} className="legacy-catalog-card">
              <div className="legacy-catalog-card__header">
                <div>
                  <span className="legacy-catalog-card__eyebrow">{mode.root}</span>
                  <h3 className="legacy-catalog-card__title">{mode.name}</h3>
                </div>
                <button
                  className="legacy-catalog-card__action"
                  onClick={() => {
                    setActiveSection(`Melodic Minor • ${mode.name}`);
                    setPreviewKind("scale");
                    setPreviewNotes(mode.notes);
                    playScale(mode.notes);
                  }}
                >
                  Play
                </button>
              </div>
              <p className="legacy-catalog-card__subtitle">{mode.desc}</p>
              <NoteBadgeList notes={mode.notes} keySignature={currentKey} />
              <div className="legacy-preview-panel__meta">
                {mode.chords.map((chord) => (
                  <span key={`${mode.name}-${chord}`} className="legacy-preview-chip">
                    {chord}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </article>

      <article className="legacy-tool-panel">
        <div className="legacy-tool-panel__header">
          <div>
            <span className="summary-label">Upper Structures</span>
            <h2>Triads over dominant shells</h2>
            <p>Use these as quick shorthand for tensions above a dominant chord root.</p>
          </div>
          <label className="select-field">
            <span>Dominant Root</span>
            <select value={upperStructureRoot} onChange={(event) => setUpperStructureRoot(event.target.value)}>
              {NOTES.map((note) => (
                <option key={note} value={note}>
                  {note}7
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="legacy-catalog-grid">
          {upperStructures.map((structure) => (
            <article key={structure.name} className="legacy-catalog-card">
              <div className="legacy-catalog-card__header">
                <div>
                  <span className="legacy-catalog-card__eyebrow">{structure.tension}</span>
                  <h3 className="legacy-catalog-card__title">{structure.name}</h3>
                </div>
                <button
                  className="legacy-catalog-card__action"
                  onClick={() => {
                    setActiveSection(`Upper Structures • ${structure.name}`);
                    setPreviewKind("chord");
                    setPreviewNotes(structure.notes);
                    playChord(structure.notes);
                  }}
                >
                  Play
                </button>
              </div>
              <p className="legacy-catalog-card__subtitle">{structure.func}</p>
              <NoteBadgeList notes={structure.notes} keySignature={currentKey} />
              <div className="legacy-preview-panel__meta">
                <span className="legacy-preview-chip">
                  Over {upperStructureRoot}7
                </span>
                <span className="legacy-preview-chip">
                  Shell {structure.dominantShell.map((note) => note.replace(/[0-9]/g, "")).join(" • ")}
                </span>
              </div>
            </article>
          ))}
        </div>
      </article>
    </section>
  );
}
