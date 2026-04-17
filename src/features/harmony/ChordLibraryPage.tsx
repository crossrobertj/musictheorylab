import { useCallback, useEffect, useMemo, useState } from "react";
import { playChord } from "../../audio/audioEngine";
import { useShellBridgeStore } from "../../app/store/useShellBridgeStore";
import { FavoriteToggleButton } from "../../components/FavoriteToggleButton";
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
  const updateRoute = useShellBridgeStore((state) => state.updateRoute);
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

  const selectedChord = useMemo(
    () => buildChordFromRootAndQuality(`${root}4`, selectedQuality),
    [root, selectedQuality],
  );
  const selectedTemplate = CHORD_TEMPLATES[selectedQuality];
  const playableLabel = selectedChord.name;

  const playCurrent = useCallback(() => {
    void playChord(selectedChord.notes);
  }, [selectedChord.notes]);

  const clear = useCallback(() => {
    setQuery("");
    setSelectedQuality("Major");
  }, []);

  const selectedFavorite = {
    type: "chord" as const,
    name: selectedChord.name,
    keySignature: currentKey,
    notes: selectedChord.notes,
    route: "/app/allchords",
    desc: selectedTemplate.desc,
    family: selectedQuality,
  };

  useEffect(() => {
    updateRoute("allchords", {
      title: "All Chord Types",
      subtitle: "Chord qualities, formulas, and previews for the active key root.",
      playableLabel,
      playableNoteSet: selectedChord.notes,
      playCurrent,
      clear,
    });
  }, [clear, playableLabel, playCurrent, selectedChord.notes, updateRoute]);

  return (
    <section className="page-section">
      <div className="legacy-tool-panel">
        <div className="legacy-tool-panel__header">
          <div>
            <span className="eyebrow">Chord Catalog</span>
            <h1 className="legacy-tool-panel__title">All Chord Types</h1>
            <p className="legacy-tool-panel__copy">
              The full chord-template catalog runs against the active root and behaves like the old
              browse-and-preview chord wall.
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

        <div className="legacy-toolbar-row">
          <div className="legacy-toolbar-chip">
            Root
            <br />
            <strong>{root}</strong>
          </div>
          <div className="legacy-toolbar-chip">
            Current
            <br />
            <strong>{selectedChord.name}</strong>
          </div>
          <div className="legacy-toolbar-chip">
            Symbol
            <br />
            <strong>{selectedTemplate.symbol || "root"}</strong>
          </div>
        </div>
      </div>

      <article className="legacy-preview-panel">
        <div className="detail-header">
          <div>
            <span className="summary-label">Current Preview</span>
            <h2>{selectedChord.name}</h2>
            <p className="legacy-tool-panel__copy">{selectedTemplate.desc}</p>
          </div>
          <div className="toolbar-cluster">
            <FavoriteToggleButton item={selectedFavorite} />
            <button className="primary-button" onClick={() => playChord(selectedChord.notes)}>
              Play Chord
            </button>
          </div>
        </div>
        <div className="legacy-preview-panel__meta">
          <span className="legacy-preview-chip">Intervals: {formatIntervals(selectedTemplate.intervals)}</span>
          <span className="legacy-preview-chip">Symbol: {selectedTemplate.symbol || "root"}</span>
          <span className="legacy-preview-chip">Root: {root}</span>
        </div>
        <NoteBadgeList notes={selectedChord.notes} keySignature={currentKey} />
        <KeyboardPreview activeNotes={selectedChord.notes} keySignature={currentKey} />
      </article>

      <div className="legacy-catalog-grid">
        {templates.map(([quality, template]) => {
          const typedQuality = quality as keyof typeof CHORD_TEMPLATES;
          const preview = buildChordFromRootAndQuality(`${root}4`, typedQuality);
          const favoriteItem = {
            type: "chord" as const,
            name: preview.name,
            keySignature: currentKey,
            notes: preview.notes,
            route: "/app/allchords",
            desc: template.desc,
            family: quality,
          };
          return (
            <article
              key={quality}
              className={`legacy-catalog-card ${quality === selectedQuality ? "is-selected" : ""}`}
            >
              <div className="legacy-catalog-card__header">
                <div>
                  <span className="legacy-catalog-card__eyebrow">{template.symbol || "triad"}</span>
                  <h2 className="legacy-catalog-card__title">{quality}</h2>
                  <div className="legacy-catalog-card__subtitle">{template.desc}</div>
                </div>
                <div className="toolbar-cluster">
                  <FavoriteToggleButton item={favoriteItem} />
                  <button
                    className="legacy-catalog-card__action"
                    onClick={() => {
                      setSelectedQuality(typedQuality);
                      playChord(preview.notes);
                    }}
                  >
                    Preview
                  </button>
                </div>
              </div>
              <div className="legacy-preview-panel__meta">
                <span className="legacy-preview-chip">{formatIntervals(template.intervals)}</span>
              </div>
              <div className="legacy-token-row">
                {preview.notes.map((note) => (
                  <span key={`${quality}-${note}`} className="legacy-note-token">
                    {note.replace(/[0-9]/g, "")}
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
