import { useCallback, useEffect, useMemo, useState } from "react";
import { playProgression } from "../../audio/audioEngine";
import { FavoriteToggleButton } from "../../components/FavoriteToggleButton";
import { HarmonicMatchesPanel, ScaleHarmonizationPanel } from "../../components/HarmonyPanels";
import { NoteBadgeList } from "../../components/NoteBadgeList";
import { useAppStore } from "../../app/store/useAppStore";
import { useShellBridgeStore } from "../../app/store/useShellBridgeStore";
import { getCompatibleScalesForNoteClasses } from "../../domain/finder";
import { PROGRESSIONS } from "../../domain/generated/theory-data";
import { getProgressionPreview, getRootFromKey, getScaleNotes } from "../../domain/music";
import { harmonizeScale, harmonizeScaleRows } from "../../domain/scaleBuilder";

export function ProgressionsPage() {
  const currentKey = useAppStore((state) => state.currentKey);
  const updateRoute = useShellBridgeStore((state) => state.updateRoute);
  const [query, setQuery] = useState("");
  const [styleFilter, setStyleFilter] = useState("All");
  const [selectedProgressionName, setSelectedProgressionName] = useState("I-V-vi-IV");

  const styles = useMemo(
    () => ["All", ...new Set(PROGRESSIONS.map((progression) => progression.style))],
    [],
  );

  const filteredProgressions = useMemo(() => {
    const normalizedQuery = query.toLowerCase().trim();
    return PROGRESSIONS.filter((progression) => {
      if (styleFilter !== "All" && progression.style !== styleFilter) return false;
      if (!normalizedQuery) return true;
      return (
        progression.name.toLowerCase().includes(normalizedQuery) ||
        progression.desc.toLowerCase().includes(normalizedQuery) ||
        progression.style.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [query, styleFilter]);

  const selectedProgression = useMemo(
    () =>
      PROGRESSIONS.find((progression) => progression.name === selectedProgressionName) ||
      PROGRESSIONS[0],
    [selectedProgressionName],
  );
  const resolvedChords = useMemo(
    () => getProgressionPreview(selectedProgression.name, currentKey),
    [currentKey, selectedProgression.name],
  );
  const resolvedProgressionNotes = useMemo(
    () => Array.from(new Set(resolvedChords.flatMap((chord) => chord.notes))),
    [resolvedChords],
  );
  const keyIntervals = useMemo(
    () => (currentKey.includes("Minor") ? [0, 2, 3, 5, 7, 8, 10] : [0, 2, 4, 5, 7, 9, 11]),
    [currentKey],
  );
  const harmonizedChords = useMemo(
    () => harmonizeScale(getRootFromKey(currentKey), keyIntervals),
    [currentKey, keyIntervals],
  );
  const harmonizationRows = useMemo(
    () => harmonizeScaleRows(getRootFromKey(currentKey), keyIntervals),
    [currentKey, keyIntervals],
  );
  const currentScaleNotes = useMemo(() => getScaleNotes(currentKey), [currentKey]);
  const compatibleScales = useMemo(
    () =>
      getCompatibleScalesForNoteClasses(
        resolvedProgressionNotes,
        8,
      ),
    [resolvedProgressionNotes],
  );
  const playCurrent = useCallback(() => {
    playProgression(resolvedChords.map((chord) => chord.notes));
  }, [resolvedChords]);
  const clear = useCallback(() => {
    setQuery("");
    setStyleFilter("All");
    setSelectedProgressionName("I-V-vi-IV");
  }, []);

  useEffect(() => {
    updateRoute("progressions", {
      title: "Progressions",
      subtitle: "Browse common harmonic blueprints in the active key.",
      playableLabel: `${selectedProgression.name} • ${selectedProgression.style}`,
      playableNoteSet: resolvedProgressionNotes,
      playCurrent,
      clear,
    });
  }, [
    clear,
    playCurrent,
    resolvedProgressionNotes,
    selectedProgression.name,
    selectedProgression.style,
    updateRoute,
  ]);

  const selectedFavorite = {
    type: "progression" as const,
    name: selectedProgression.name,
    keySignature: currentKey,
    chords: resolvedChords.map((chord) => chord.notes),
    numerals: [...selectedProgression.numerals],
    route: "/app/progressions",
    desc: selectedProgression.desc,
    style: selectedProgression.style,
  };

  return (
    <section className="page-section">
      <div className="legacy-tool-panel">
        <div className="legacy-tool-panel__header">
          <div>
            <span className="eyebrow">Harmony Library</span>
            <h1 className="legacy-tool-panel__title">Progressions</h1>
            <p className="legacy-tool-panel__copy">
              Browse common harmonic blueprints, resolve them in the active key, and audition the
              progression from the library wall.
            </p>
          </div>
          <div className="toolbar-cluster">
            <label className="search-field">
              <span>Search progressions</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="ii-V-I, andalusian, pop..."
              />
            </label>
            <label className="select-field">
              <span>Style</span>
              <select value={styleFilter} onChange={(event) => setStyleFilter(event.target.value)}>
                {styles.map((style) => (
                  <option key={style} value={style}>
                    {style}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>

      <article className="legacy-preview-panel">
        <div className="legacy-tool-panel__header">
          <div>
            <span className="summary-label">Resolved in {currentKey}</span>
            <h2>{selectedProgression.name}</h2>
            <p className="legacy-tool-panel__copy">{selectedProgression.desc}</p>
          </div>
          <div className="toolbar-cluster">
            <FavoriteToggleButton item={selectedFavorite} />
            <button
              className="primary-button"
              onClick={() => playProgression(resolvedChords.map((chord) => chord.notes))}
            >
              Play Progression
            </button>
          </div>
        </div>
        <div className="progression-strip">
          {selectedProgression.numerals.map((numeral, index) => (
            <div className="progression-step" key={`${numeral}-${index}`}>
              <span className="card-tag">{numeral}</span>
              <strong>{resolvedChords[index]?.name ?? numeral}</strong>
              <NoteBadgeList notes={resolvedChords[index]?.notes ?? []} keySignature={currentKey} />
            </div>
          ))}
        </div>
      </article>

      <ScaleHarmonizationPanel
        description={`${selectedProgression.name} • ${selectedProgression.style}`}
        rows={harmonizationRows}
        scaleNotes={currentScaleNotes}
        title={currentKey}
      />

      <HarmonicMatchesPanel
        compatibleScales={compatibleScales}
        description={`Matches derived from ${selectedProgression.name}`}
        harmonizingChords={harmonizedChords}
        title={`${currentKey} • ${selectedProgression.name}`}
      />

      <div className="legacy-catalog-grid">
        {filteredProgressions.map((progression) => {
          const resolved = getProgressionPreview(progression.name, currentKey);
          const favoriteItem = {
            type: "progression" as const,
            name: progression.name,
            keySignature: currentKey,
            chords: resolved.map((chord) => chord.notes),
            numerals: [...progression.numerals],
            route: "/app/progressions",
            desc: progression.desc,
            style: progression.style,
          };

          return (
            <article
              key={progression.name}
              className={`legacy-catalog-card ${
                progression.name === selectedProgressionName ? "is-selected" : ""
              }`}
            >
              <div className="legacy-catalog-card__header">
                <div>
                  <span className="legacy-catalog-card__eyebrow">{progression.style}</span>
                  <h3 className="legacy-catalog-card__title">{progression.name}</h3>
                </div>
                <div className="toolbar-cluster">
                  <FavoriteToggleButton item={favoriteItem} />
                  <button
                    className="legacy-catalog-card__action"
                    onClick={() => {
                      setSelectedProgressionName(progression.name);
                      playProgression(resolved.map((chord) => chord.notes));
                    }}
                  >
                    Preview
                  </button>
                </div>
              </div>
              <p className="legacy-catalog-card__subtitle">{progression.desc}</p>
              <div className="scale-strip">
                {progression.numerals.map((numeral) => (
                  <span key={`${progression.name}-${numeral}`} className="scale-token">
                    {numeral}
                  </span>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
