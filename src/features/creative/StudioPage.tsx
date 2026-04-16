import { useMemo, useState } from "react";
import { playChord, playProgression } from "../../audio/audioEngine";
import { useAppStore } from "../../app/store/useAppStore";
import { FavoriteToggleButton } from "../../components/FavoriteToggleButton";
import { NoteBadgeList } from "../../components/NoteBadgeList";
import {
  STUDIO_DEGREE_OPTIONS,
  analyzeStudioProgression,
  randomizeStudioProgression,
} from "../../domain/creative";
import { buildMidiFromChordProgression, downloadMidiFile } from "../../domain/midi";

export function StudioPage() {
  const currentKey = useAppStore((state) => state.currentKey);
  const tempo = useAppStore((state) => state.tempo);
  const [degrees, setDegrees] = useState<string[]>(["I", "V", "vi", "IV"]);
  const [pendingDegree, setPendingDegree] = useState("I");

  const analysis = useMemo(
    () => analyzeStudioProgression(degrees, currentKey),
    [currentKey, degrees],
  );

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
      <div className="page-hero">
        <div>
          <span className="eyebrow">Source Feature</span>
          <h1>Progression Studio</h1>
          <p>
            Build Roman-numeral progressions, hear them in the active key, analyze the harmonic
            function chain, and save useful loops into Favorites.
          </p>
        </div>
        <div className="hero-actions">
          <FavoriteToggleButton item={favoriteItem} />
          <button
            className="primary-button"
            onClick={() => playProgression(analysis.resolvedChords.map((chord) => chord.notes))}
          >
            Play Progression
          </button>
          <button className="ghost-button" onClick={exportMidi}>
            Export MIDI
          </button>
        </div>
      </div>

      <div className="summary-grid">
        <article className="summary-card">
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
            <button className="ghost-button" onClick={() => setDegrees(["I"])}>
              Clear
            </button>
          </div>
        </article>

        <article className="summary-card">
          <span className="summary-label">Matched Library Pattern</span>
          <h2>{analysis.matched?.name ?? "Custom Sequence"}</h2>
          <p>{analysis.matched?.desc ?? "This exact Roman string does not currently match a catalog progression."}</p>
        </article>

        <article className="summary-card">
          <span className="summary-label">Function Chain</span>
          <h2>{analysis.functions.join(" → ")}</h2>
          <p>Use the sequence below to trim or extend the harmonic rhythm.</p>
        </article>
      </div>

      <article className="detail-card">
        <div className="detail-header">
          <div>
            <span className="summary-label">Roman Sequence</span>
            <h2>{degrees.join(" • ")}</h2>
            <p>Click any chip to remove it from the studio chain.</p>
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

      <div className="feature-grid">
        {analysis.resolvedChords.map((chord, index) => (
          <article className="feature-card" key={`${chord.name}-${index}`}>
            <div className="feature-card-header">
              <div>
                <span className="card-tag">{degrees[index]}</span>
                <h3>{chord.name}</h3>
              </div>
              <button className="ghost-button" onClick={() => playChord(chord.notes)}>
                Play
              </button>
            </div>
            <p className="card-copy">{analysis.functions[index]}</p>
            <NoteBadgeList notes={chord.notes} keySignature={currentKey} />
          </article>
        ))}
      </div>
    </section>
  );
}
