import { useCallback, useEffect, useMemo, useState } from "react";
import { playChord, playProgression } from "../../audio/audioEngine";
import { useAppStore } from "../../app/store/useAppStore";
import { FavoriteToggleButton } from "../../components/FavoriteToggleButton";
import { NoteBadgeList } from "../../components/NoteBadgeList";
import { useShellBridgeStore } from "../../app/store/useShellBridgeStore";
import {
  STUDIO_DEGREE_OPTIONS,
  analyzeStudioProgression,
  randomizeStudioProgression,
} from "../../domain/creative";
import { buildMidiFromChordProgression, downloadMidiFile } from "../../domain/midi";

const DEFAULT_STUDIO_DEGREES = ["I", "V", "vi", "IV"];
const DEFAULT_PENDING_DEGREE = "I";

export function StudioPage() {
  const currentKey = useAppStore((state) => state.currentKey);
  const tempo = useAppStore((state) => state.tempo);
  const updateRoute = useShellBridgeStore((state) => state.updateRoute);
  const [degrees, setDegrees] = useState<string[]>(DEFAULT_STUDIO_DEGREES);
  const [pendingDegree, setPendingDegree] = useState(DEFAULT_PENDING_DEGREE);

  const analysis = useMemo(
    () => analyzeStudioProgression(degrees, currentKey),
    [currentKey, degrees],
  );
  const playableNoteSet = useMemo(
    () => Array.from(new Set(analysis.resolvedChords.flatMap((chord) => chord.notes))),
    [analysis.resolvedChords],
  );
  const playableLabel = useMemo(
    () => `${degrees.join(" • ")} • ${currentKey}`,
    [currentKey, degrees],
  );
  const playCurrent = useCallback(() => {
    playProgression(analysis.resolvedChords.map((chord) => chord.notes));
  }, [analysis.resolvedChords]);
  const clear = useCallback(() => {
    setDegrees(DEFAULT_STUDIO_DEGREES);
    setPendingDegree(DEFAULT_PENDING_DEGREE);
  }, []);

  useEffect(() => {
    updateRoute("studio", {
      title: "Progression Studio",
      subtitle: "Compose Roman-numeral chains and audition them in the active key.",
      playableLabel,
      playableNoteSet,
      playCurrent,
      clear,
    });
  }, [clear, playableLabel, playCurrent, playableNoteSet, updateRoute]);

  const favoriteItem = {
    type: "progression" as const,
    name: `${currentKey} • ${degrees.join("-")}`,
    keySignature: currentKey,
    chords: analysis.resolvedChords.map((chord) => chord.notes),
    numerals: [...degrees],
    route: "/app/studio",
    family: "Studio",
    desc: analysis.matched?.desc,
    style: analysis.matched?.style,
  };

  function addDegree() {
    setDegrees((current) => [...current, pendingDegree]);
  }

  function removeDegree(index: number) {
    setDegrees((current) => {
      const next = current.filter((_, itemIndex) => itemIndex !== index);
      return next.length ? next : ["I"];
    });
  }

  function exportMidi() {
    const midi = buildMidiFromChordProgression(
      analysis.resolvedChords.map((chord) => chord.notes),
      tempo,
      2,
      1.8,
    );
    downloadMidiFile(midi, "studio-progression.mid");
  }

  return (
    <section className="page-section">
      <div className="legacy-tool-panel">
        <div className="legacy-tool-panel__header">
          <div>
            <span className="eyebrow">Composition Tool</span>
            <h1 className="legacy-tool-panel__title">Progression Studio</h1>
            <p className="legacy-tool-panel__copy">
              Build Roman-numeral progressions, hear them in the active key, analyze the harmonic
              function chain, and save useful loops into Favorites.
            </p>
          </div>
          <div className="hero-actions">
          <FavoriteToggleButton item={favoriteItem} />
          <button
            className="primary-button"
            onClick={playCurrent}
          >
            Play Progression
          </button>
          <button className="ghost-button" onClick={exportMidi}>
            Export MIDI
          </button>
          </div>
        </div>
      </div>

      <div className="legacy-catalog-grid">
        <article className="legacy-catalog-card">
          <span className="summary-label">Builder</span>
          <h2>{currentKey}</h2>
          <div className="toolbar-cluster">
            <select value={pendingDegree} onChange={(event) => setPendingDegree(event.target.value)}>
              {STUDIO_DEGREE_OPTIONS.map((degree) => (
                <option key={degree} value={degree}>
                  {degree}
                </option>
              ))}
            </select>
            <button className="secondary-button" onClick={addDegree}>
              Add Degree
            </button>
            <button className="ghost-button" onClick={() => setDegrees(randomizeStudioProgression(currentKey))}>
              Randomize
            </button>
            <button className="ghost-button" onClick={clear}>
              Clear
            </button>
          </div>
        </article>

        <article className="legacy-catalog-card">
          <span className="summary-label">Matched Library Pattern</span>
          <h2>{analysis.matched?.name ?? "Custom Sequence"}</h2>
          <p>{analysis.matched?.desc ?? "This exact Roman string does not currently match a catalog progression."}</p>
        </article>

        <article className="legacy-catalog-card">
          <span className="summary-label">Function Chain</span>
          <h2>{analysis.functions.join(" → ")}</h2>
          <p>Use the sequence below to trim or extend the harmonic rhythm.</p>
        </article>
      </div>

      <article className="legacy-preview-panel">
        <div className="legacy-tool-panel__header">
          <div>
            <span className="summary-label">Roman Sequence</span>
            <h2>{degrees.join(" • ")}</h2>
            <p className="legacy-tool-panel__copy">Click any chip to remove it from the studio chain.</p>
          </div>
        </div>
        <div className="scale-strip">
          {degrees.map((degree, index) => (
            <button key={`${degree}-${index}`} className="scale-token" onClick={() => removeDegree(index)}>
              {degree} ×
            </button>
          ))}
        </div>
      </article>

      <div className="legacy-catalog-grid">
        {analysis.resolvedChords.map((chord, index) => (
          <article className="legacy-catalog-card" key={`${chord.name}-${index}`}>
            <div className="legacy-catalog-card__header">
              <div>
                <span className="legacy-catalog-card__eyebrow">{degrees[index]}</span>
                <h3 className="legacy-catalog-card__title">{chord.name}</h3>
              </div>
              <button className="legacy-catalog-card__action" onClick={() => playChord(chord.notes)}>
                Play
              </button>
            </div>
            <p className="legacy-catalog-card__subtitle">{analysis.functions[index]}</p>
            <NoteBadgeList notes={chord.notes} keySignature={currentKey} />
          </article>
        ))}
      </div>
    </section>
  );
}
