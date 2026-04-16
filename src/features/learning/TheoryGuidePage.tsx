import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { THEORY_GUIDE_SECTIONS } from "../../domain/guide";

function normalizeSearch(value: string) {
  return value.trim().toLowerCase();
}

export function TheoryGuidePage() {
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

  return (
    <section className="page-section">
      <div className="page-hero">
        <div>
          <span className="eyebrow">Source Feature</span>
          <h1>Theory Guide</h1>
          <p>
            The searchable reference is now source-side. It keeps the legacy guide's fundamentals,
            harmony, analysis, and ear-training topics while making them easier to scan and route
            into the rest of the app.
          </p>
        </div>
        <div className="hero-actions">
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
      </div>

      <div className="summary-grid">
        <article className="summary-card">
          <span className="summary-label">Reference</span>
          <h2>{THEORY_GUIDE_SECTIONS.length} Topics</h2>
          <p>Coverage spans notation and acoustics through cadence, substitution, and analysis workflow.</p>
        </article>

        <article className="summary-card">
          <span className="summary-label">Categories</span>
          <h2>{categoryCount} Lenses</h2>
          <p>Foundations, scales, harmony, and analysis are grouped separately so search results stay readable.</p>
        </article>

        <article className="summary-card">
          <span className="summary-label">Filter</span>
          <h2>{filteredSections.length} Visible</h2>
          <p>Try queries like `cadence`, `modulation`, `blues`, `tritone`, or `roman numerals`.</p>
        </article>
      </div>

      <article className="detail-card">
        <div className="detail-header">
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

      <div className="feature-grid theory-guide-grid">
        {filteredSections.map((section, index) => (
          <details
            key={section.id}
            className="feature-card theory-guide-card"
            open={normalizedQuery.length > 0 || index < 2}
          >
            <summary className="theory-guide-summary">
              <div>
                <span className="card-tag">{section.category}</span>
                <h3>{section.title}</h3>
              </div>
            </summary>
            <p className="card-copy">{section.core}</p>
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
        <article className="detail-card">
          <span className="summary-label">No Matches</span>
          <h2>No theory topics matched "{query}"</h2>
          <p>Try a broader term or jump into the quiz and ear trainer from the header actions above.</p>
        </article>
      ) : null}
    </section>
  );
}
