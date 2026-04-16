import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { playChord, playScale } from "../../audio/audioEngine";
import { FavoriteToggleButton } from "../../components/FavoriteToggleButton";
import { KeyboardPreview } from "../../components/KeyboardPreview";
import { NoteBadgeList } from "../../components/NoteBadgeList";
import { useAppStore } from "../../app/store/useAppStore";
import { buildChordInversions, buildChordAnalysis } from "../../domain/chordAnalyzer";
import { getCompatibleScalesForNoteClasses } from "../../domain/finder";
import { getGrimoireFamilies, GRIMOIRE_LIBRARY, type GrimoireEntry } from "../../domain/grimoire";
import {
  buildChordFromRootAndQuality,
  CHORD_TEMPLATES,
  getNotesFromIntervals,
  getRootFromKey,
} from "../../domain/music";
import { harmonizeScale } from "../../domain/scaleBuilder";

interface ResolvedGrimoireEntry extends GrimoireEntry {
  displayName: string;
  notes: string[];
}

function resolveEntry(entry: GrimoireEntry, root: string): ResolvedGrimoireEntry {
  if (entry.type === "chord") {
    const template = CHORD_TEMPLATES[entry.name as keyof typeof CHORD_TEMPLATES];
    const notes = template
      ? buildChordFromRootAndQuality(`${root}4`, entry.name).notes
      : getNotesFromIntervals(`${root}4`, entry.intervals);
    const displayName = template ? `${root}${template.symbol} (${entry.name})` : `${root} ${entry.name}`;
    return { ...entry, displayName, notes };
  }

  return {
    ...entry,
    displayName: `${root} ${entry.name}`,
    notes: getNotesFromIntervals(`${root}4`, entry.intervals),
  };
}

export function GrimoirePage() {
  const currentKey = useAppStore((state) => state.currentKey);
  const root = getRootFromKey(currentKey);
  const [query, setQuery] = useState("");
  const [family, setFamily] = useState("all");
  const [selectedName, setSelectedName] = useState(GRIMOIRE_LIBRARY[0]?.name ?? "");

  const resolvedEntries = useMemo(
    () => GRIMOIRE_LIBRARY.map((entry) => resolveEntry(entry, root)),
    [root],
  );
  const filteredEntries = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return resolvedEntries.filter((entry) => {
      const matchesFamily = family === "all" || entry.family === family;
      if (!matchesFamily) return false;
      if (!normalizedQuery) return true;
      return [entry.displayName, entry.family, entry.type, entry.name]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery);
    });
  }, [family, query, resolvedEntries]);
  const selectedEntry =
    filteredEntries.find((entry) => entry.name === selectedName) ??
    resolvedEntries.find((entry) => entry.name === selectedName) ??
    filteredEntries[0] ??
    resolvedEntries[0];

  useEffect(() => {
    if (filteredEntries.length === 0) return;
    if (!filteredEntries.some((entry) => entry.name === selectedName)) {
      setSelectedName(filteredEntries[0].name);
    }
  }, [filteredEntries, selectedName]);

  const harmonizedScale = useMemo(
    () =>
      selectedEntry?.type === "scale"
        ? harmonizeScale(root, selectedEntry.intervals)
        : [],
    [root, selectedEntry],
  );
  const compatibleScales = useMemo(
    () =>
      selectedEntry?.type === "chord"
        ? getCompatibleScalesForNoteClasses(
            selectedEntry.notes.map((note) => note.replace(/[0-9]/g, "")),
            8,
          )
        : [],
    [selectedEntry],
  );
  const chordAnalysis = useMemo(
    () =>
      selectedEntry?.type === "chord"
        ? buildChordAnalysis(
            `${root}${CHORD_TEMPLATES[selectedEntry.name as keyof typeof CHORD_TEMPLATES]?.symbol ?? ""}`,
          )
        : null,
    [root, selectedEntry],
  );
  const chordInversions = useMemo(
    () => (selectedEntry?.type === "chord" ? buildChordInversions(selectedEntry.notes) : []),
    [selectedEntry],
  );

  return (
    <section className="page-section">
      <div className="page-hero">
        <div>
          <span className="eyebrow">Source Feature</span>
          <h1>Grimoire</h1>
          <p>
            Advanced scale, mode, and chord references are now source-side. The catalog resolves
            against the active key root and lets you preview, favorite, and inspect each entry
            without leaving the app shell.
          </p>
        </div>
        <div className="hero-actions">
          <Link className="ghost-button" to="/app/modes">
            Scale Library
          </Link>
          <Link className="ghost-button" to="/app/chordanalyzer">
            Chord Analyzer
          </Link>
          <Link className="primary-button" to="/app/scalebuilder">
            Scale Builder
          </Link>
        </div>
      </div>

      <div className="summary-grid">
        <article className="summary-card">
          <span className="summary-label">Catalog</span>
          <h2>{GRIMOIRE_LIBRARY.length} entries</h2>
          <p>Curated modes, synthetic scales, pentatonics, and chord structures from the legacy reference.</p>
        </article>
        <article className="summary-card">
          <span className="summary-label">Families</span>
          <h2>{getGrimoireFamilies().length}</h2>
          <p>Use family filtering to focus on modal systems, synthetic collections, or chord structures.</p>
        </article>
        <article className="summary-card">
          <span className="summary-label">Current Root</span>
          <h2>{root}</h2>
          <p>The entire catalog is remapped to the active key root rather than hard-coded to C.</p>
        </article>
      </div>

      <article className="detail-card">
        <div className="detail-header">
          <div>
            <span className="summary-label">Search & Filter</span>
            <h2>Reference browser</h2>
            <p>Search by name and narrow by family. Selecting a card updates the analysis panel below.</p>
          </div>
          <div className="toolbar-cluster">
            <label className="search-field">
              <span>Search</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="lydian, altered, dim7..."
              />
            </label>
            <label className="select-field">
              <span>Family</span>
              <select value={family} onChange={(event) => setFamily(event.target.value)}>
                <option value="all">All Families</option>
                {getGrimoireFamilies().map((familyName) => (
                  <option key={familyName} value={familyName}>
                    {familyName}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </article>

      {selectedEntry ? (
        <article className="detail-card">
          <div className="detail-header">
            <div>
              <span className="summary-label">{selectedEntry.family}</span>
              <h2>{selectedEntry.displayName}</h2>
              <p>
                {selectedEntry.type === "scale"
                  ? "Advanced scale reference with live harmonization preview."
                  : chordAnalysis?.construction ?? "Chord structure reference with inversion preview."}
              </p>
            </div>
            <div className="toolbar-cluster">
              <FavoriteToggleButton
                item={{
                  type: selectedEntry.type,
                  name: selectedEntry.displayName,
                  keySignature: currentKey,
                  notes: selectedEntry.notes,
                  route: "/app/grimoire",
                  family: selectedEntry.family,
                  desc: selectedEntry.family,
                }}
              />
              <button
                className="primary-button"
                onClick={() =>
                  selectedEntry.type === "scale"
                    ? playScale(selectedEntry.notes)
                    : playChord(selectedEntry.notes)
                }
              >
                Play
              </button>
            </div>
          </div>

          <div className="detail-meta">
            <span className="info-chip">{selectedEntry.type}</span>
            <span className="info-chip">Formula: {selectedEntry.intervals.join(" • ")}</span>
            <span className="info-chip">{selectedEntry.notes.length} notes</span>
          </div>

          <NoteBadgeList notes={selectedEntry.notes} keySignature={currentKey} />
          <KeyboardPreview activeNotes={selectedEntry.notes} keySignature={currentKey} />
        </article>
      ) : null}

      {filteredEntries.length ? (
        <div className="feature-grid">
          {filteredEntries.map((entry) => (
            <article
              key={`${entry.family}-${entry.name}`}
              className={`feature-card ${selectedEntry?.name === entry.name ? "is-selected" : ""}`}
            >
              <div className="feature-card-header">
                <div>
                  <span className="card-tag">{entry.family}</span>
                  <h3>{entry.displayName}</h3>
                </div>
                <div className="toolbar-cluster">
                  <FavoriteToggleButton
                    item={{
                      type: entry.type,
                      name: entry.displayName,
                      keySignature: currentKey,
                      notes: entry.notes,
                      route: "/app/grimoire",
                      family: entry.family,
                      desc: entry.family,
                    }}
                  />
                  <button className="ghost-button" onClick={() => setSelectedName(entry.name)}>
                    Analyze
                  </button>
                </div>
              </div>
              <p className="card-copy">
                {entry.type} · intervals {entry.intervals.join(" • ")}
              </p>
              <NoteBadgeList notes={entry.notes} keySignature={currentKey} />
            </article>
          ))}
        </div>
      ) : (
        <article className="detail-card">
          <span className="summary-label">No Matches</span>
          <h2>No grimoire entries matched the current filter</h2>
          <p>Try a broader search term or reset the family filter to bring the full catalog back.</p>
        </article>
      )}

      {selectedEntry?.type === "scale" ? (
        <article className="detail-card">
          <div className="detail-header">
            <div>
              <span className="summary-label">Scale Harmonization</span>
              <h2>Stacked thirds inside the collection</h2>
              <p>This replaces the legacy scale-analysis jump with an inline source preview.</p>
            </div>
          </div>
          <div className="feature-grid">
            {harmonizedScale.map((chord) => (
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
                <NoteBadgeList notes={chord.notes} keySignature={currentKey} />
              </article>
            ))}
          </div>
        </article>
      ) : null}

      {selectedEntry?.type === "chord" ? (
        <>
          <article className="detail-card">
            <div className="detail-header">
              <div>
                <span className="summary-label">Inversions</span>
                <h2>Reordered voicings</h2>
                <p>The old inversion popup is now an inline source-side panel.</p>
              </div>
            </div>
            <div className="feature-grid">
              {chordInversions.map((inversion) => (
                <article className="feature-card" key={inversion.label}>
                  <div className="feature-card-header">
                    <div>
                      <span className="card-tag">Voicing</span>
                      <h3>{inversion.label}</h3>
                    </div>
                    <button className="ghost-button" onClick={() => playChord(inversion.notes)}>
                      Play
                    </button>
                  </div>
                  <NoteBadgeList notes={inversion.notes} keySignature={currentKey} />
                </article>
              ))}
            </div>
          </article>

          <article className="detail-card">
            <div className="detail-header">
              <div>
                <span className="summary-label">Compatible Scales</span>
                <h2>Collections containing these chord tones</h2>
                <p>This uses the same source matcher that powers the finder and chord analyzer.</p>
              </div>
            </div>
            <div className="feature-grid">
              {compatibleScales.map((scale) => (
                <article className="feature-card" key={scale.name}>
                  <div className="feature-card-header">
                    <div>
                      <span className="card-tag">{scale.region}</span>
                      <h3>{scale.name}</h3>
                    </div>
                    <button className="ghost-button" onClick={() => playScale(scale.notes)}>
                      Play
                    </button>
                  </div>
                  <p className="card-copy">Extra notes beyond chord tones: {scale.score}</p>
                  <NoteBadgeList notes={scale.notes} keySignature={currentKey} />
                </article>
              ))}
            </div>
          </article>
        </>
      ) : null}
    </section>
  );
}
