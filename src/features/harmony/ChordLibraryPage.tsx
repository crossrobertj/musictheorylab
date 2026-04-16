import { useMemo, useState } from "react";
import { playChord } from "../../audio/audioEngine";
import { NoteBadgeList } from "../../components/NoteBadgeList";
import { KeyboardPreview } from "../../components/KeyboardPreview";
import { useAppStore } from "../../app/store/useAppStore";
import {
  buildChordFromRootAndQuality,
  CHORD_TEMPLATES,
  formatIntervals,
  getRootFromKey,
  sortChordTemplates,
} from "../../domain/music";

export function ChordLibraryPage() {
  const currentKey = useAppStore((state) => state.currentKey);
  const [query, setQuery] = useState("");
  const [selectedQuality, setSelectedQuality] = useState<keyof typeof CHORD_TEMPLATES>("Major");
  const root = getRootFromKey(currentKey);

  const templates = useMemo(() => {
    const normalizedQuery = query.toLowerCase().trim();
    return sortChordTemplates().filter(([quality, template]) => {
      if (!normalizedQuery) return true;
      return (
        quality.toLowerCase().includes(normalizedQuery) ||
        template.desc.toLowerCase().includes(normalizedQuery) ||
        template.symbol.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [query]);

  const selectedChord = buildChordFromRootAndQuality(`${root}4`, selectedQuality);
  const selectedTemplate = CHORD_TEMPLATES[selectedQuality];

  return (
    <section className="page-section">
      <div className="page-hero">
        <div>
          <span className="eyebrow">Source Feature</span>
          <h1>All Chord Types</h1>
          <p>
            The full chord-template catalog now runs from extracted source data. Search, inspect
            formulas, and audition every quality against the active key root.
          </p>
        </div>
        <label className="search-field">
          <span>Filter chord types</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="maj7, sus, altered, power..."
          />
        </label>
      </div>

      <article className="detail-card">
        <div className="detail-header">
          <div>
            <span className="summary-label">Current Preview</span>
            <h2>{selectedChord.name}</h2>
            <p>{selectedTemplate.desc}</p>
          </div>
          <button className="primary-button" onClick={() => playChord(selectedChord.notes)}>
            Play Chord
          </button>
        </div>
        <div className="detail-meta">
          <span className="info-chip">Intervals: {formatIntervals(selectedTemplate.intervals)}</span>
          <span className="info-chip">Symbol: {selectedTemplate.symbol || "root"}</span>
          <span className="info-chip">Root: {root}</span>
        </div>
        <NoteBadgeList notes={selectedChord.notes} keySignature={currentKey} />
        <KeyboardPreview activeNotes={selectedChord.notes} keySignature={currentKey} />
      </article>

      <div className="feature-grid">
        {templates.map(([quality, template]) => {
          const typedQuality = quality as keyof typeof CHORD_TEMPLATES;
          const preview = buildChordFromRootAndQuality(`${root}4`, typedQuality);
          return (
            <article
              key={quality}
              className={`feature-card ${quality === selectedQuality ? "is-selected" : ""}`}
            >
              <div className="feature-card-header">
                <div>
                  <span className="card-tag">{template.symbol || "triad"}</span>
                  <h3>{quality}</h3>
                </div>
                <button
                  className="ghost-button"
                  onClick={() => {
                    setSelectedQuality(typedQuality);
                    playChord(preview.notes);
                  }}
                >
                  Preview
                </button>
              </div>
              <p className="card-copy">{template.desc}</p>
              <div className="info-chip-row">
                <span className="info-chip">{formatIntervals(template.intervals)}</span>
              </div>
              <NoteBadgeList notes={preview.notes} keySignature={currentKey} />
            </article>
          );
        })}
      </div>
    </section>
  );
}
