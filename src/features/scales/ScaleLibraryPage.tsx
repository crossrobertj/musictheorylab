import { useCallback, useEffect, useMemo, useState } from "react";
import { playScale } from "../../audio/audioEngine";
import { FavoriteToggleButton } from "../../components/FavoriteToggleButton";
import { HarmonicMatchesPanel, ScaleHarmonizationPanel } from "../../components/HarmonyPanels";
import { NoteBadgeList } from "../../components/NoteBadgeList";
import { KeyboardPreview } from "../../components/KeyboardPreview";
import { useShellBridgeStore } from "../../app/store/useShellBridgeStore";
import { useAppStore } from "../../app/store/useAppStore";
import { getCompatibleScalesForNoteClasses } from "../../domain/finder";
import { ALL_SCALES } from "../../domain/generated/theory-data";
import { formatIntervals, getRootFromKey, getScalePreview, sortScales } from "../../domain/music";
import { harmonizeScale, harmonizeScaleRows } from "../../domain/scaleBuilder";

interface ScaleLibraryPageProps {
  variant: "modes" | "world";
}

const SCALE_LIBRARY_VARIANTS = {
  modes: {
    title: "Western & Blues",
    subtitle: "Western modes, blues colors, and closely related scale systems.",
    defaultScaleName: "Ionian (Major)" as keyof typeof ALL_SCALES,
  },
  world: {
    title: "World Scales",
    subtitle: "Global and regional scale systems from the legacy reference catalog.",
    defaultScaleName: "Maqam Rast" as keyof typeof ALL_SCALES,
  },
} as const;

function createRegionPredicate(variant: "modes" | "world") {
  const westernRegions = new Set(["Western", "Blues/Jazz", "Jazz"]);
  if (variant === "modes") {
    return (region: string) => westernRegions.has(region);
  }
  return (region: string) => !westernRegions.has(region);
}

export function ScaleLibraryPage({ variant }: ScaleLibraryPageProps) {
  const currentKey = useAppStore((state) => state.currentKey);
  const updateRoute = useShellBridgeStore((state) => state.updateRoute);
  const routeConfig = SCALE_LIBRARY_VARIANTS[variant];
  const [query, setQuery] = useState("");
  const [selectedScaleName, setSelectedScaleName] = useState<keyof typeof ALL_SCALES>(
    routeConfig.defaultScaleName,
  );

  const scales = useMemo(() => {
    const matchesVariant = createRegionPredicate(variant);
    const normalizedQuery = query.toLowerCase().trim();

    return sortScales().filter(([scaleName, scale]) => {
      if (!matchesVariant(scale.region)) return false;
      if (!normalizedQuery) return true;
      return (
        scaleName.toLowerCase().includes(normalizedQuery) ||
        scale.region.toLowerCase().includes(normalizedQuery) ||
        scale.desc.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [query, variant]);

  const selectedScale = ALL_SCALES[selectedScaleName];
  const previewNotes = useMemo(
    () => getScalePreview(selectedScaleName, currentKey),
    [currentKey, selectedScaleName],
  );
  const root = getRootFromKey(currentKey);
  const harmonizedChords = useMemo(
    () => harmonizeScale(root, selectedScale.intervals),
    [root, selectedScale.intervals],
  );
  const harmonizationRows = useMemo(
    () => harmonizeScaleRows(root, selectedScale.intervals),
    [root, selectedScale.intervals],
  );
  const compatibleScales = useMemo(
    () =>
      getCompatibleScalesForNoteClasses(
        previewNotes,
        8,
      ),
    [previewNotes],
  );
  const selectedPreviewLabel = `${root} ${selectedScaleName}`;
  const playableLabel = `${selectedPreviewLabel} • ${selectedScale.region}`;
  const playableNoteSet = previewNotes;
  const playCurrent = useCallback(() => {
    playScale(previewNotes);
  }, [previewNotes]);
  const clear = useCallback(() => {
    setQuery("");
    setSelectedScaleName(routeConfig.defaultScaleName);
  }, [routeConfig.defaultScaleName]);

  useEffect(() => {
    updateRoute(variant, {
      title: routeConfig.title,
      subtitle: routeConfig.subtitle,
      playableLabel,
      playableNoteSet,
      playCurrent,
      clear,
    });
  }, [
    clear,
    playableLabel,
    playableNoteSet,
    playCurrent,
    routeConfig.subtitle,
    routeConfig.title,
    updateRoute,
    variant,
  ]);

  const selectedFavorite = {
    type: "scale" as const,
    name: selectedPreviewLabel,
    keySignature: currentKey,
    notes: previewNotes,
    route: variant === "modes" ? "/app/modes" : "/app/world",
    desc: selectedScale.desc,
    family: selectedScaleName,
    region: selectedScale.region,
  };

  return (
    <section className="page-section">
      <div className="legacy-tool-panel">
        <div className="legacy-tool-panel__header">
          <div>
            <span className="eyebrow">Scale Library</span>
            <h1 className="legacy-tool-panel__title">{routeConfig.title}</h1>
            <p className="legacy-tool-panel__copy">
              Browse the extracted scale catalog in the active key and audition each collection
              without leaving the library.
            </p>
          </div>
          <label className="search-field">
            <span>Filter scales</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={variant === "modes" ? "dorian, bebop, lydian..." : "maqam, raga, japanese..."}
            />
          </label>
        </div>
      </div>

      <article className="legacy-preview-panel">
        <div className="legacy-tool-panel__header">
          <div>
            <span className="summary-label">Scale Preview</span>
            <h2>{selectedPreviewLabel}</h2>
            <p className="legacy-tool-panel__copy">{selectedScale.desc}</p>
          </div>
          <div className="toolbar-cluster">
            <FavoriteToggleButton item={selectedFavorite} />
            <button className="primary-button" onClick={playCurrent}>
              Play Scale
            </button>
          </div>
        </div>
        <div className="legacy-preview-panel__meta">
          <span className="legacy-preview-chip">Region: {selectedScale.region}</span>
          <span className="legacy-preview-chip">Intervals: {formatIntervals(selectedScale.intervals)}</span>
        </div>
        <NoteBadgeList notes={previewNotes} keySignature={currentKey} />
        <KeyboardPreview activeNotes={previewNotes} keySignature={currentKey} />
      </article>

      <ScaleHarmonizationPanel
        description={`${selectedScale.desc} • ${selectedScale.region}`}
        rows={harmonizationRows}
        scaleNotes={previewNotes}
        title={selectedPreviewLabel}
      />

      <HarmonicMatchesPanel
        compatibleScales={compatibleScales}
        description={`Matches derived from ${selectedPreviewLabel}`}
        harmonizingChords={harmonizedChords}
        title={selectedPreviewLabel}
      />

      <div className="legacy-catalog-grid">
        {scales.map(([scaleName, scale]) => {
          const typedScaleName = scaleName as keyof typeof ALL_SCALES;
          const scaleNotes = getScalePreview(typedScaleName, currentKey);
          const favoriteItem = {
            type: "scale" as const,
            name: `${currentKey.split(" ")[0]} ${scaleName}`,
            keySignature: currentKey,
            notes: scaleNotes,
            route: variant === "modes" ? "/app/modes" : "/app/world",
            desc: scale.desc,
            family: scaleName,
            region: scale.region,
          };
          return (
            <article
              key={scaleName}
              className={`legacy-catalog-card ${scaleName === selectedScaleName ? "is-selected" : ""}`}
            >
              <div className="legacy-catalog-card__header">
                <div>
                  <span className="legacy-catalog-card__eyebrow">{scale.region}</span>
                  <h3 className="legacy-catalog-card__title">{scaleName}</h3>
                </div>
                <div className="toolbar-cluster">
                  <FavoriteToggleButton item={favoriteItem} />
                  <button
                    className="legacy-catalog-card__action"
                    onClick={() => {
                      setSelectedScaleName(typedScaleName);
                      playScale(scaleNotes);
                    }}
                  >
                    Preview
                  </button>
                </div>
              </div>
              <p className="legacy-catalog-card__subtitle">{scale.desc}</p>
              <div className="info-chip-row">
                <span className="info-chip">{formatIntervals(scale.intervals)}</span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
