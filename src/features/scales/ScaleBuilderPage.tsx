import { useMemo, useState } from "react";
import { playChord, playScale } from "../../audio/audioEngine";
import { useCustomScalesStore } from "../../app/store/useCustomScalesStore";
import { KeyboardPreview } from "../../components/KeyboardPreview";
import { NoteBadgeList } from "../../components/NoteBadgeList";
import { ALL_SCALES } from "../../domain/generated/theory-data";
import { NOTES } from "../../domain/music";
import {
  SCALE_BUILDER_PRESETS,
  describeScaleDensity,
  getIntervalLabel,
  getScaleBuilderNotes,
  getScaleBuilderPlayback,
  harmonizeScale,
  normalizeScaleIntervals,
  toggleScaleInterval,
} from "../../domain/scaleBuilder";

const DEFAULT_INTERVALS = SCALE_BUILDER_PRESETS[0].intervals;

export function ScaleBuilderPage() {
  const customScales = useCustomScalesStore((state) => state.customScales);
  const saveScale = useCustomScalesStore((state) => state.saveScale);
  const removeScale = useCustomScalesStore((state) => state.removeScale);
  const [root, setRoot] = useState("C");
  const [scaleName, setScaleName] = useState("Custom Major");
  const [intervals, setIntervals] = useState<number[]>(DEFAULT_INTERVALS);

  const normalizedName = scaleName.trim();
  const notePreview = useMemo(() => getScaleBuilderNotes(root, intervals), [root, intervals]);
  const playbackNotes = useMemo(() => getScaleBuilderPlayback(root, intervals), [root, intervals]);
  const harmonizedChords = useMemo(() => harmonizeScale(root, intervals), [root, intervals]);
  const isBuiltInName = Object.prototype.hasOwnProperty.call(ALL_SCALES, normalizedName);
  const canSave = normalizedName.length > 0 && intervals.length >= 3;

  function applyPreset(nextName: string, nextIntervals: number[]) {
    setScaleName(nextName);
    setIntervals(normalizeScaleIntervals(nextIntervals));
  }

  function handleSave() {
    if (!canSave) return;
    saveScale({ name: normalizedName, intervals });
  }

  return (
    <section className="page-section">
      <div className="page-hero">
        <div>
          <span className="eyebrow">Source Feature</span>
          <h1>Scale Builder</h1>
          <p>
            Build pitch collections semitone by semitone, audition them immediately, and keep your
            own custom scales in source-side storage. The root stays fixed while you shape the color.
          </p>
        </div>
        <div className="hero-actions">
          <button
            className="secondary-button"
            onClick={() => {
              setScaleName("Custom Major");
              setIntervals(DEFAULT_INTERVALS);
            }}
          >
            Reset
          </button>
          <button className="primary-button" onClick={() => playScale(playbackNotes)}>
            Play Scale
          </button>
        </div>
      </div>

      <article className="detail-card">
        <div className="detail-header">
          <div>
            <span className="summary-label">Current Build</span>
            <h2>
              {root} {normalizedName || "Untitled Scale"}
            </h2>
            <p>
              {intervals.length} notes · {describeScaleDensity(intervals.length)}
              {isBuiltInName ? " · name collides with a built-in scale" : ""}
            </p>
          </div>
          <div className="toolbar-cluster">
            <label className="select-field">
              <span>Root</span>
              <select value={root} onChange={(event) => setRoot(event.target.value)}>
                {NOTES.map((note) => (
                  <option key={note} value={note}>
                    {note}
                  </option>
                ))}
              </select>
            </label>
            <label className="search-field scale-builder-name-field">
              <span>Scale Name</span>
              <input
                type="text"
                value={scaleName}
                onChange={(event) => setScaleName(event.target.value)}
                placeholder="Name your collection"
              />
            </label>
          </div>
        </div>

        <div className="detail-meta">
          <span className="info-chip">Intervals: {intervals.join(" • ")}</span>
          <span className="info-chip">Notes: {notePreview.length}</span>
          <span className="info-chip">Saved customs: {customScales.length}</span>
        </div>

        <div className="preset-grid">
          {SCALE_BUILDER_PRESETS.map((preset) => (
            <button
              key={preset.id}
              className="quality-picker-button"
              onClick={() => applyPreset(preset.name, preset.intervals)}
            >
              <strong>{preset.name}</strong>
              <span>{preset.desc}</span>
            </button>
          ))}
        </div>

        <div className="scale-builder-interval-grid">
          {Array.from({ length: 12 }, (_, interval) => {
            const active = intervals.includes(interval);
            const locked = interval === 0;
            return (
              <button
                key={interval}
                className={`note-picker-button scale-builder-interval-button ${active ? "is-active" : ""}`}
                onClick={() => setIntervals((current) => toggleScaleInterval(current, interval))}
                disabled={locked}
              >
                <strong>{getIntervalLabel(root, interval)}</strong>
                <span>
                  {interval === 0 ? "Root" : `${interval} semitone${interval === 1 ? "" : "s"}`}
                </span>
              </button>
            );
          })}
        </div>

        <div className="feature-card-footer">
          <button className="ghost-button" onClick={() => playChord(notePreview)}>
            Play Stack
          </button>
          <button className="secondary-button" onClick={handleSave} disabled={!canSave}>
            Save Scale
          </button>
        </div>

        <NoteBadgeList notes={notePreview} keySignature={`${root} Major`} />
        <KeyboardPreview activeNotes={notePreview} keySignature={`${root} Major`} />
      </article>

      <div className="summary-grid">
        <article className="summary-card">
          <span className="summary-label">Preset Recall</span>
          <h2>{SCALE_BUILDER_PRESETS.length} templates</h2>
          <p>
            Start from major, minor, lydian, bebop, diminished, or bare triadic collections and
            mutate from there.
          </p>
        </article>
        <article className="summary-card">
          <span className="summary-label">Harmonization</span>
          <h2>{harmonizedChords.length} triads</h2>
          <p>
            Rough stacked-thirds harmonization updates live, which makes odd collections easier to
            evaluate quickly.
          </p>
        </article>
        <article className="summary-card">
          <span className="summary-label">Persistence</span>
          <h2>{customScales.length} saved</h2>
          <p>
            Saved custom collections stay in a dedicated source-side key instead of mutating the
            extracted built-in catalog.
          </p>
        </article>
      </div>

      <article className="detail-card">
        <div className="detail-header">
          <div>
            <span className="summary-label">Degree Triads</span>
            <h2>Harmonized from the current collection</h2>
            <p>
              This keeps the legacy builder’s rough harmonization behavior, but makes each degree
              playable and easier to scan.
            </p>
          </div>
        </div>

        <div className="feature-grid">
          {harmonizedChords.map((chord) => (
            <article className="feature-card" key={`${chord.degree}-${chord.symbol}`}>
              <div className="feature-card-header">
                <div>
                  <span className="card-tag">Degree {chord.degree}</span>
                  <h3>{chord.symbol}</h3>
                </div>
                <button className="ghost-button" onClick={() => playChord(chord.notes)}>
                  Play
                </button>
              </div>
              <p className="card-copy">{chord.quality}</p>
              <NoteBadgeList notes={chord.notes} keySignature={`${root} Major`} />
            </article>
          ))}
        </div>
      </article>

      <article className="detail-card">
        <div className="detail-header">
          <div>
            <span className="summary-label">Saved Custom Scales</span>
            <h2>{customScales.length ? "Reusable user collections" : "No saved custom scales yet"}</h2>
            <p>
              Saved entries are local to the source rewrite for now. Loading one replaces the
              current interval set without changing the selected root.
            </p>
          </div>
        </div>

        {customScales.length ? (
          <div className="feature-grid">
            {customScales.map((customScale) => {
              const customNotes = getScaleBuilderNotes(root, customScale.intervals);
              return (
                <article className="feature-card" key={customScale.name}>
                  <div className="feature-card-header">
                    <div>
                      <span className="card-tag">Custom</span>
                      <h3>{customScale.name}</h3>
                    </div>
                    <div className="toolbar-cluster">
                      <button
                        className="ghost-button"
                        onClick={() => {
                          setScaleName(customScale.name);
                          setIntervals(customScale.intervals);
                        }}
                      >
                        Load
                      </button>
                      <button
                        className="secondary-button is-muted"
                        onClick={() => removeScale(customScale.name)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <p className="card-copy">
                    {customScale.intervals.length} notes · {describeScaleDensity(customScale.intervals.length)}
                  </p>
                  <div className="info-chip-row">
                    <span className="info-chip">{customScale.intervals.join(" • ")}</span>
                  </div>
                  <NoteBadgeList notes={customNotes} keySignature={`${root} Major`} />
                </article>
              );
            })}
          </div>
        ) : (
          <p className="card-copy">
            Save a collection from the builder above and it will appear here.
          </p>
        )}
      </article>
    </section>
  );
}
