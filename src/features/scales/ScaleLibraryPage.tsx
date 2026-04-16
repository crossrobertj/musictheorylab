import { useMemo, useState } from "react";
import { playScale } from "../../audio/audioEngine";
import { FavoriteToggleButton } from "../../components/FavoriteToggleButton";
import { NoteBadgeList } from "../../components/NoteBadgeList";
import { KeyboardPreview } from "../../components/KeyboardPreview";
import { useAppStore } from "../../app/store/useAppStore";
import { ALL_SCALES } from "../../domain/generated/theory-data";
import { formatIntervals, getScalePreview, sortScales } from "../../domain/music";

interface ScaleLibraryPageProps {
  variant: "modes" | "world";
}

function createRegionPredicate(variant: "modes" | "world") {
  const westernRegions = new Set(["Western", "Blues/Jazz", "Jazz"]);
  if (variant === "modes") {
    return (region: string) => westernRegions.has(region);
  }
  return (region: string) => !westernRegions.has(region);
}

export function ScaleLibraryPage({ variant }: ScaleLibraryPageProps) {
  const currentKey = useAppStore((state) => state.currentKey);
  const [query, setQuery] = useState("");
  const [selectedScaleName, setSelectedScaleName] = useState<keyof typeof ALL_SCALES>(
    variant === "modes" ? "Ionian (Major)" : "Maqam Rast",
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
  const previewNotes = getScalePreview(selectedScaleName, currentKey);
  const selectedFavorite = {
    type: "scale" as const,
    name: `${currentKey.split(" ")[0]} ${selectedScaleName}`,
    keySignature: currentKey,
    notes: previewNotes,
    route: variant === "modes" ? "/app/modes" : "/app/world",
    desc: selectedScale.desc,
    family: selectedScaleName,
    region: selectedScale.region,
  };

  return (
    <section className="page-section">
      <div className="page-hero">
        <div>
          <span className="eyebrow">Source Feature</span>
          <h1>{variant === "modes" ? "Western & Blues" : "World Scales"}</h1>
          <p>
            Scale definitions are now source data. This view filters the extracted scale catalog
            into a modern, searchable browser with direct audio preview.
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

      <article className="detail-card">
        <div className="detail-header">
          <div>
            <span className="summary-label">Scale Preview</span>
            <h2>
              {currentKey.split(" ")[0]} {selectedScaleName}
            </h2>
            <p>{selectedScale.desc}</p>
          </div>
          <div className="toolbar-cluster">
            <FavoriteToggleButton item={selectedFavorite} />
            <button className="primary-button" onClick={() => playScale(previewNotes)}>
              Play Scale
            </button>
          </div>
        </div>
        <div className="detail-meta">
          <span className="info-chip">Region: {selectedScale.region}</span>
          <span className="info-chip">Intervals: {formatIntervals(selectedScale.intervals)}</span>
        </div>
        <NoteBadgeList notes={previewNotes} keySignature={currentKey} />
        <KeyboardPreview activeNotes={previewNotes} keySignature={currentKey} />
      </article>

      <div className="feature-grid">
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
              className={`feature-card ${scaleName === selectedScaleName ? "is-selected" : ""}`}
            >
              <div className="feature-card-header">
                <div>
                  <span className="card-tag">{scale.region}</span>
                  <h3>{scaleName}</h3>
                </div>
                <div className="toolbar-cluster">
                  <FavoriteToggleButton item={favoriteItem} />
                  <button
                    className="ghost-button"
                    onClick={() => {
                      setSelectedScaleName(typedScaleName);
                      playScale(scaleNotes);
                    }}
                  >
                    Preview
                  </button>
                </div>
              </div>
              <p className="card-copy">{scale.desc}</p>
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
