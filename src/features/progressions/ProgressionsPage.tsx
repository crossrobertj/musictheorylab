import { useMemo, useState } from "react";
import { playProgression } from "../../audio/audioEngine";
import { NoteBadgeList } from "../../components/NoteBadgeList";
import { useAppStore } from "../../app/store/useAppStore";
import { PROGRESSIONS } from "../../domain/generated/theory-data";
import { getProgressionPreview } from "../../domain/music";

export function ProgressionsPage() {
  const currentKey = useAppStore((state) => state.currentKey);
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

  const resolvedChords = getProgressionPreview(selectedProgressionName, currentKey);
  const selectedProgression =
    PROGRESSIONS.find((progression) => progression.name === selectedProgressionName) ||
    PROGRESSIONS[0];

  return (
    <section className="page-section">
      <div className="page-hero">
        <div>
          <span className="eyebrow">Source Feature</span>
          <h1>Progressions</h1>
          <p>
            Progression definitions now resolve through shared theory helpers. The source view shows
            numerals, resolved chords, and direct playback in the active key.
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

      <article className="detail-card">
        <div className="detail-header">
          <div>
            <span className="summary-label">Resolved in {currentKey}</span>
            <h2>{selectedProgression.name}</h2>
            <p>{selectedProgression.desc}</p>
          </div>
          <button
            className="primary-button"
            onClick={() => playProgression(resolvedChords.map((chord) => chord.notes))}
          >
            Play Progression
          </button>
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

      <div className="feature-grid">
        {filteredProgressions.map((progression) => (
          <article
            key={progression.name}
            className={`feature-card ${
              progression.name === selectedProgressionName ? "is-selected" : ""
            }`}
          >
            <div className="feature-card-header">
              <div>
                <span className="card-tag">{progression.style}</span>
                <h3>{progression.name}</h3>
              </div>
              <button
                className="ghost-button"
                onClick={() => {
                  setSelectedProgressionName(progression.name);
                  playProgression(
                    getProgressionPreview(progression.name, currentKey).map((chord) => chord.notes),
                  );
                }}
              >
                Preview
              </button>
            </div>
            <p className="card-copy">{progression.desc}</p>
            <div className="scale-strip">
              {progression.numerals.map((numeral) => (
                <span key={`${progression.name}-${numeral}`} className="scale-token">
                  {numeral}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
