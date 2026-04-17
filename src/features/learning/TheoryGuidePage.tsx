import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useShellBridgeStore } from "../../app/store/useShellBridgeStore";
import { THEORY_GUIDE_SECTIONS } from "../../domain/guide";

function normalizeSearch(value: string) {
  return value.trim().toLowerCase();
}

export function TheoryGuidePage() {
  const updateRoute = useShellBridgeStore((state) => state.updateRoute);
  const [query, setQuery] = useState("");

  const normalizedQuery = normalizeSearch(query);
  const filteredSections = useMemo(() => {
    if (!normalizedQuery) return THEORY_GUIDE_SECTIONS;

    return THEORY_GUIDE_SECTIONS.filter((section) => {
      const haystack = [
        section.category,
        section.title,
        section.core,
        ...section.points,
        ...section.examples,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [normalizedQuery]);

  const categoryCount = new Set(THEORY_GUIDE_SECTIONS.map((section) => section.category)).size;
  const playableLabel = normalizedQuery
    ? `${filteredSections.length} topics for "${query.trim()}"`
    : `${filteredSections.length} topics shown`;
  const clear = useCallback(() => {
    setQuery("");
  }, []);

  useEffect(() => {
    updateRoute("guide", {
      title: "Theory Guide",
      subtitle: "Searchable reference for harmony, scales, and analysis.",
      playableLabel,
      playableNoteSet: [],
      playCurrent: null,
      clear,
    });
  }, [clear, playableLabel, updateRoute]);

  return (
    <section className="page-section">
      <article className="legacy-tool-panel">
        <div className="legacy-tool-panel__header">
          <div>
            <span className="eyebrow">Theory Reference</span>
            <h1 className="legacy-tool-panel__title">Theory Guide</h1>
            <p className="legacy-tool-panel__copy">
              Searchable fundamentals, harmony, scales, and analysis topics in the older reference
              panel language instead of the generic source summary layout.
            </p>
          </div>
          <div className="legacy-toolbar-row">
            <span className="legacy-toolbar-chip">
              Topics <strong>{THEORY_GUIDE_SECTIONS.length}</strong>
            </span>
            <span className="legacy-toolbar-chip">
              Categories <strong>{categoryCount}</strong>
            </span>
            <span className="legacy-toolbar-chip">
              Visible <strong>{filteredSections.length}</strong>
            </span>
          </div>
        </div>
        <div className="legacy-toolbar-row">
          <Link className="primary-button" to="/app/quiz">
            Open Quiz
          </Link>
          <Link className="ghost-button" to="/app/ear">
            Ear Trainer
          </Link>
          <Link className="ghost-button" to="/app/intervals">
            Interval Tool
          </Link>
        </div>
      </article>

      <article className="legacy-tool-panel">
        <div className="legacy-tool-panel__header">
          <div>
            <span className="summary-label">Search</span>
            <h2>Filter theory topics</h2>
            <p>Search checks titles, core ideas, bullet points, and examples from the full reference set.</p>
          </div>
          <label className="search-field theory-guide-search">
            <span>Topic Filter</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="modulation, pentatonic, cadence..."
            />
          </label>
        </div>
      </article>

      <div className="legacy-catalog-grid theory-guide-grid">
        {filteredSections.map((section, index) => (
          <details
            key={section.id}
            className="legacy-catalog-card theory-guide-card"
            open={normalizedQuery.length > 0 || index < 2}
          >
            <summary className="theory-guide-summary">
              <div>
                <span className="legacy-catalog-card__eyebrow">{section.category}</span>
                <h3 className="legacy-catalog-card__title">{section.title}</h3>
              </div>
            </summary>
            <p className="legacy-catalog-card__subtitle">{section.core}</p>
            <div className="theory-guide-list-block">
              <span className="summary-label">Key Points</span>
              <ul className="theory-guide-list">
                {section.points.map((point) => (
                  <li key={`${section.id}-${point}`}>{point}</li>
                ))}
              </ul>
            </div>
            <div className="theory-guide-example-block">
              <span className="summary-label">Examples</span>
              <ul className="theory-guide-list theory-guide-examples">
                {section.examples.map((example) => (
                  <li key={`${section.id}-${example}`}>{example}</li>
                ))}
              </ul>
            </div>
          </details>
        ))}
      </div>

      {filteredSections.length === 0 ? (
        <article className="legacy-preview-panel">
          <span className="summary-label">No Matches</span>
          <h2>No theory topics matched "{query}"</h2>
          <p>Try a broader term or jump into the quiz and ear trainer from the header actions above.</p>
        </article>
      ) : null}
    </section>
  );
}
