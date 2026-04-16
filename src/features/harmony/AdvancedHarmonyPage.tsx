import { useMemo, useState } from "react";
import { playChord, playScale } from "../../audio/audioEngine";
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

export function AdvancedHarmonyPage() {
  const currentKey = useAppStore((state) => state.currentKey);
  const currentInstrument = useAppStore((state) => state.currentInstrument);
  const isMinor = currentKey.includes("Minor");
  const harmonicFunctions = useMemo(() => getHarmonicFunctions(isMinor), [isMinor]);

  const [melodicMinorRoot, setMelodicMinorRoot] = useState("C");
  const [upperStructureRoot, setUpperStructureRoot] = useState("C");
  const [previewNotes, setPreviewNotes] = useState<string[]>(() => getDegreeTriad(currentKey, 0));

  const melodicMinorModes = useMemo(
    () => resolveMelodicMinorModes(melodicMinorRoot),
    [melodicMinorRoot],
  );
  const upperStructures = useMemo(
    () => resolveUpperStructures(upperStructureRoot),
    [upperStructureRoot],
  );

  return (
    <section className="page-section">
      <div className="page-hero">
        <div>
          <span className="eyebrow">Source Feature</span>
          <h1>Advanced Harmony</h1>
          <p>
            Harmonic function, melodic-minor modal harmony, and upper-structure triads now run in
            the source app instead of the legacy panel.
          </p>
        </div>
        <div className="hero-actions">
          <button className="primary-button" onClick={() => playChord(previewNotes)}>
            Play Preview
          </button>
        </div>
      </div>

      <div className="tuning-layout">
        <article className="detail-card">
          <div className="detail-header">
            <div>
              <span className="summary-label">Harmonic Function</span>
              <h2>{currentKey}</h2>
              <p>Click a function cell to audition the corresponding degree triad in the current key.</p>
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
          <div className="info-chip-row">
            <span className="info-chip">Tonic = stable</span>
            <span className="info-chip">Pre-dominant = moving</span>
            <span className="info-chip">Dominant = tension</span>
            <span className="info-chip">Modal = borrowed color</span>
          </div>
        </article>

        <article className="detail-card">
          <div className="detail-header">
            <div>
              <span className="summary-label">Preview Board</span>
              <h2>{currentInstrument}</h2>
              <p>The current instrument selector still drives the board below.</p>
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

      <article className="detail-card">
        <div className="detail-header">
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
        <div className="feature-grid">
          {melodicMinorModes.map((mode) => (
            <article key={mode.name} className="feature-card">
              <div className="feature-card-header">
                <div>
                  <span className="card-tag">{mode.root}</span>
                  <h3>{mode.name}</h3>
                </div>
                <button
                  className="ghost-button"
                  onClick={() => {
                    setPreviewNotes(mode.notes);
                    playScale(mode.notes);
                  }}
                >
                  Play
                </button>
              </div>
              <p className="card-copy">{mode.desc}</p>
              <NoteBadgeList notes={mode.notes} keySignature={currentKey} />
              <div className="info-chip-row">
                {mode.chords.map((chord) => (
                  <span key={`${mode.name}-${chord}`} className="info-chip">
                    {chord}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </article>

      <article className="detail-card">
        <div className="detail-header">
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
        <div className="feature-grid">
          {upperStructures.map((structure) => (
            <article key={structure.name} className="feature-card">
              <div className="feature-card-header">
                <div>
                  <span className="card-tag">{structure.tension}</span>
                  <h3>{structure.name}</h3>
                </div>
                <button
                  className="ghost-button"
                  onClick={() => {
                    setPreviewNotes(structure.notes);
                    playChord(structure.notes);
                  }}
                >
                  Play
                </button>
              </div>
              <p className="card-copy">{structure.func}</p>
              <NoteBadgeList notes={structure.notes} keySignature={currentKey} />
              <div className="info-chip-row">
                <span className="info-chip">
                  Over {upperStructureRoot}7
                </span>
                <span className="info-chip">
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
