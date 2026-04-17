import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { playChord, playScale } from "../../audio/audioEngine";
import { FavoriteToggleButton } from "../../components/FavoriteToggleButton";
import {
  ChordInversionsPanel,
  CompatibleScalesPanel,
  HarmonicMatchesPanel,
  ScaleHarmonizationPanel,
} from "../../components/HarmonyPanels";
import { KeyboardPreview } from "../../components/KeyboardPreview";
import { NoteBadgeList } from "../../components/NoteBadgeList";
import { useAppStore } from "../../app/store/useAppStore";
import { useShellBridgeStore } from "../../app/store/useShellBridgeStore";
import { buildChordInversions, buildChordAnalysis } from "../../domain/chordAnalyzer";
import { getCompatibleScalesForNoteClasses } from "../../domain/finder";
import { getGrimoireFamilies, GRIMOIRE_LIBRARY, type GrimoireEntry } from "../../domain/grimoire";
import {
  buildChordFromRootAndQuality,
  CHORD_TEMPLATES,
  getNotesFromIntervals,
  getRootFromKey,
} from "../../domain/music";
import { harmonizeScale, harmonizeScaleRows } from "../../domain/scaleBuilder";

interface ResolvedGrimoireEntry extends GrimoireEntry {
  displayName: string;
  notes: string[];
}

const ROUTE_ID = "grimoire";
const DEFAULT_QUERY = "";
const DEFAULT_FAMILY = "all";
const DEFAULT_SELECTED_NAME = GRIMOIRE_LIBRARY[0]?.name ?? "";

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
  const updateRoute = useShellBridgeStore((state) => state.updateRoute);
  const root = getRootFromKey(currentKey);
  const [query, setQuery] = useState(DEFAULT_QUERY);
  const [family, setFamily] = useState(DEFAULT_FAMILY);
  const [selectedName, setSelectedName] = useState(DEFAULT_SELECTED_NAME);

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
  const playableLabel = selectedEntry
    ? `${selectedEntry.displayName} • ${selectedEntry.type}`
    : "No grimoire entry selected";
  const playableNoteSet = selectedEntry?.notes ?? [];

  useEffect(() => {
    if (filteredEntries.length === 0) return;
    if (!filteredEntries.some((entry) => entry.name === selectedName)) {
      setSelectedName(filteredEntries[0].name);
    }
  }, [filteredEntries, selectedName]);

  const playCurrent = useCallback(() => {
    if (!selectedEntry) return;
    if (selectedEntry.type === "scale") {
      playScale(selectedEntry.notes);
      return;
    }

    playChord(selectedEntry.notes);
  }, [selectedEntry]);

  const clear = useCallback(() => {
    setQuery(DEFAULT_QUERY);
    setFamily(DEFAULT_FAMILY);
    setSelectedName(DEFAULT_SELECTED_NAME);
  }, []);

  useEffect(() => {
    updateRoute(ROUTE_ID, {
      title: "Grimoire",
      subtitle: "Legacy scale, mode, and chord reference catalog.",
      playableLabel,
      playableNoteSet,
      playCurrent,
      clear,
    });
  }, [clear, playableLabel, playableNoteSet, playCurrent, updateRoute]);

  const harmonizedScale = useMemo(
    () =>
      selectedEntry?.type === "scale"
        ? harmonizeScale(root, selectedEntry.intervals)
        : [],
    [root, selectedEntry],
  );
  const harmonizedRows = useMemo(
    () =>
      selectedEntry?.type === "scale"
        ? harmonizeScaleRows(root, selectedEntry.intervals)
        : [],
    [root, selectedEntry],
  );
  const compatibleScales = useMemo(
    () =>
      selectedEntry?.type === "chord"
        ? getCompatibleScalesForNoteClasses(
            selectedEntry.notes,
            8,
          )
        : [],
    [selectedEntry],
  );
  const scaleCompatibleScales = useMemo(
    () =>
      selectedEntry?.type === "scale"
        ? getCompatibleScalesForNoteClasses(
            selectedEntry.notes,
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
      <div className="legacy-tool-panel">
        <div className="legacy-tool-panel__header">
          <div>
            <span className="eyebrow">Reference Library</span>
            <h1 className="legacy-tool-panel__title">Grimoire</h1>
            <p className="legacy-tool-panel__copy">
              Advanced scale, mode, and chord references resolved against the active key root, with
              live preview and analysis panels in the restored catalog layout.
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
      </div>

      <div className="legacy-catalog-grid">
        <article className="legacy-catalog-card">
          <span className="summary-label">Catalog</span>
          <h2>{GRIMOIRE_LIBRARY.length} entries</h2>
          <p>Curated modes, synthetic scales, pentatonics, and chord structures from the legacy reference.</p>
        </article>
        <article className="legacy-catalog-card">
          <span className="summary-label">Families</span>
          <h2>{getGrimoireFamilies().length}</h2>
          <p>Use family filtering to focus on modal systems, synthetic collections, or chord structures.</p>
        </article>
        <article className="legacy-catalog-card">
          <span className="summary-label">Current Root</span>
          <h2>{root}</h2>
          <p>The entire catalog is remapped to the active key root rather than hard-coded to C.</p>
        </article>
      </div>

      <article className="legacy-tool-panel">
        <div className="legacy-tool-panel__header">
          <div>
            <span className="summary-label">Search & Filter</span>
            <h2>Reference browser</h2>
            <p className="legacy-tool-panel__copy">
              Search by name and narrow by family. Selecting a card updates the analysis panel below.
            </p>
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
        <article className="legacy-preview-panel">
          <div className="legacy-tool-panel__header">
            <div>
              <span className="summary-label">{selectedEntry.family}</span>
              <h2>{selectedEntry.displayName}</h2>
              <p className="legacy-tool-panel__copy">
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
              <button className="primary-button" onClick={playCurrent}>
                Play
              </button>
            </div>
          </div>

          <div className="legacy-preview-panel__meta">
            <span className="legacy-preview-chip">{selectedEntry.type}</span>
            <span className="legacy-preview-chip">Formula: {selectedEntry.intervals.join(" • ")}</span>
            <span className="legacy-preview-chip">{selectedEntry.notes.length} notes</span>
          </div>

          <NoteBadgeList notes={selectedEntry.notes} keySignature={currentKey} />
          <KeyboardPreview activeNotes={selectedEntry.notes} keySignature={currentKey} />
        </article>
      ) : null}

      {filteredEntries.length ? (
        <div className="legacy-catalog-grid">
          {filteredEntries.map((entry) => (
            <article
              key={`${entry.family}-${entry.name}`}
              className={`legacy-catalog-card ${selectedEntry?.name === entry.name ? "is-selected" : ""}`}
            >
              <div className="legacy-catalog-card__header">
                <div>
                  <span className="legacy-catalog-card__eyebrow">{entry.family}</span>
                  <h3 className="legacy-catalog-card__title">{entry.displayName}</h3>
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
                  <button className="legacy-catalog-card__action" onClick={() => setSelectedName(entry.name)}>
                    Analyze
                  </button>
                </div>
              </div>
              <p className="legacy-catalog-card__subtitle">
                {entry.type} · intervals {entry.intervals.join(" • ")}
              </p>
              <NoteBadgeList notes={entry.notes} keySignature={currentKey} />
            </article>
          ))}
        </div>
      ) : (
        <article className="legacy-preview-panel">
          <span className="summary-label">No Matches</span>
          <h2>No grimoire entries matched the current filter</h2>
          <p className="legacy-tool-panel__copy">
            Try a broader search term or reset the family filter to bring the full catalog back.
          </p>
        </article>
      )}

      {selectedEntry?.type === "scale" ? (
        <>
          <ScaleHarmonizationPanel
            description="Grimoire catalog scale analysis."
            rows={harmonizedRows}
            scaleNotes={selectedEntry.notes}
            title={selectedEntry.displayName}
          />
          <HarmonicMatchesPanel
            compatibleScales={scaleCompatibleScales}
            description={`Matches derived from ${selectedEntry.displayName}`}
            harmonizingChords={harmonizedScale}
            title={selectedEntry.displayName}
          />
        </>
      ) : null}

      {selectedEntry?.type === "chord" ? (
        <>
          <ChordInversionsPanel
            description="Legacy-style inversion chooser for the selected grimoire chord."
            inversions={chordInversions}
            title={selectedEntry.displayName}
          />
          <CompatibleScalesPanel
            compatibleScales={compatibleScales}
            description="Collections containing the selected chord tones."
            title={selectedEntry.displayName}
          />
        </>
      ) : null}
    </section>
  );
}
