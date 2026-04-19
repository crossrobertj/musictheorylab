import { useCallback, useEffect, useMemo, useState } from "react";
import { playChord, playScale } from "../../audio/audioEngine";
import { useShellBridgeStore } from "../../app/store/useShellBridgeStore";
import { ScaleHarmonizationPanel } from "../../components/HarmonyPanels";
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
  harmonizeScaleRows,
  normalizeScaleIntervals,
  toggleScaleInterval,
} from "../../domain/scaleBuilder";

const DEFAULT_INTERVALS = SCALE_BUILDER_PRESETS[0].intervals;
const ROUTE_ID = "scalebuilder";
const DEFAULT_ROOT = "C";
const DEFAULT_NAME = "Custom Major";

export function ScaleBuilderPage() {
  const customScales = useCustomScalesStore((state) => state.customScales);
  const saveScale = useCustomScalesStore((state) => state.saveScale);
  const removeScale = useCustomScalesStore((state) => state.removeScale);
  const updateRoute = useShellBridgeStore((state) => state.updateRoute);
  const [root, setRoot] = useState(DEFAULT_ROOT);
  const [scaleName, setScaleName] = useState(DEFAULT_NAME);
  const [intervals, setIntervals] = useState<number[]>(DEFAULT_INTERVALS);

  const normalizedName = scaleName.trim();
  const notePreview = useMemo(() => getScaleBuilderNotes(root, intervals), [root, intervals]);
  const playbackNotes = useMemo(() => getScaleBuilderPlayback(root, intervals), [root, intervals]);
  const harmonizedChords = useMemo(() => harmonizeScale(root, intervals), [root, intervals]);
  const harmonizationRows = useMemo(() => harmonizeScaleRows(root, intervals), [root, intervals]);
  const isBuiltInName = Object.prototype.hasOwnProperty.call(ALL_SCALES, normalizedName);
  const canSave = normalizedName.length > 0 && intervals.length >= 3;
  const currentBuildLabel = `${root} ${normalizedName || "Untitled Scale"}`;
  const playableLabel = `${currentBuildLabel} • ${intervals.length}-note build`;

  const playCurrent = useCallback(() => {
    playScale(playbackNotes);
  }, [playbackNotes]);

  const clear = useCallback(() => {
    setRoot(DEFAULT_ROOT);
    setScaleName(DEFAULT_NAME);
    setIntervals(DEFAULT_INTERVALS);
  }, []);

  useEffect(() => {
    updateRoute(ROUTE_ID, {
      title: "Scale Builder",
      subtitle: "Build, audition, and save custom scales.",
      playableLabel,
      playableNoteSet: playbackNotes,
      playCurrent,
      clear,
    });
  }, [clear, playCurrent, playableLabel, playbackNotes, updateRoute]);

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
      <div className="legacy-tool-panel">
        <div className="legacy-tool-panel__header">
          <div>
            <span className="eyebrow">Scale Workshop</span>
            <h1 className="legacy-tool-panel__title">Scale Builder</h1>
            <p className="legacy-tool-panel__copy">
              Build pitch collections semitone by semitone, audition them immediately, and keep
              your own custom scales in source-side storage.
            </p>
          </div>
          <div className="hero-actions">
          <button className="secondary-button" onClick={clear}>
            Reset
          </button>
          <button className="primary-button" onClick={playCurrent}>
            Play Scale
          </button>
          </div>
        </div>
      </div>

      <article className="legacy-preview-panel">
        <div className="legacy-tool-panel__header">
          <div>
            <span className="summary-label">Current Build</span>
            <h2>{currentBuildLabel}</h2>
            <p className="legacy-tool-panel__copy">
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

        <div className="legacy-preview-panel__meta">
          <span className="legacy-preview-chip">Intervals: {intervals.join(" • ")}</span>
          <span className="legacy-preview-chip">Notes: {notePreview.length}</span>
          <span className="legacy-preview-chip">Saved customs: {customScales.length}</span>
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

      <div className="legacy-catalog-grid">
        <article className="legacy-catalog-card">
          <span className="summary-label">Preset Recall</span>
          <h2>{SCALE_BUILDER_PRESETS.length} templates</h2>
          <p>
            Start from major, minor, lydian, bebop, diminished, or bare triadic collections and
            mutate from there.
          </p>
        </article>
        <article className="legacy-catalog-card">
          <span className="summary-label">Harmonization</span>
          <h2>{harmonizedChords.length} triads</h2>
          <p>
            Rough stacked-thirds harmonization updates live, which makes odd collections easier to
            evaluate quickly.
          </p>
        </article>
        <article className="legacy-catalog-card">
          <span className="summary-label">Persistence</span>
          <h2>{customScales.length} saved</h2>
          <p>
            Saved custom collections stay in a dedicated source-side key instead of mutating the
            extracted built-in catalog.
          </p>
        </article>
      </div>

      <ScaleHarmonizationPanel
        description="Inline legacy-style harmonization table for the current custom collection."
        rows={harmonizationRows}
        scaleNotes={playbackNotes}
        title={currentBuildLabel}
      />

      <article className="legacy-tool-panel">
        <div className="legacy-tool-panel__header">
          <div>
            <span className="summary-label">Saved Custom Scales</span>
            <h2>{customScales.length ? "Reusable user collections" : "No saved custom scales yet"}</h2>
            <p className="legacy-tool-panel__copy">
              Saved entries are local to the source rewrite for now. Loading one replaces the
              current interval set without changing the selected root.
            </p>
          </div>
        </div>

        {customScales.length ? (
          <div className="legacy-catalog-grid">
            {customScales.map((customScale) => {
              const customNotes = getScaleBuilderNotes(root, customScale.intervals);
              return (
                <article className="legacy-catalog-card" key={customScale.name}>
                  <div className="legacy-catalog-card__header">
                    <div>
                      <span className="legacy-catalog-card__eyebrow">Custom</span>
                      <h3 className="legacy-catalog-card__title">{customScale.name}</h3>
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
                  <p className="legacy-catalog-card__subtitle">
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
