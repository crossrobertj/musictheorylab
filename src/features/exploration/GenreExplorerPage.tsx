import { useCallback, useEffect, useMemo, useState } from "react";
import { playChord, playProgression, playScale } from "../../audio/audioEngine";
import { KeyboardPreview } from "../../components/KeyboardPreview";
import { NoteBadgeList } from "../../components/NoteBadgeList";
import { useAppStore } from "../../app/store/useAppStore";
import { useShellBridgeStore } from "../../app/store/useShellBridgeStore";
import {
  ALL_SCALES,
  CHORD_TEMPLATES,
  GENRE_LIBRARY,
} from "../../domain/generated/theory-data";
import { buildChordFromRootAndQuality, getNotesFromIntervals, getProgressionPreview, getRootFromKey } from "../../domain/music";

type GenreEntry = (typeof GENRE_LIBRARY)[number];
type SubgenreEntry = GenreEntry["subgenres"][number];

const ROUTE_ID = "genres";
const DEFAULT_GENRE = GENRE_LIBRARY[0] ?? null;
const DEFAULT_SUBGENRE = DEFAULT_GENRE?.subgenres[0] ?? null;

interface GenrePreview {
  type: "scale" | "chord" | "progression";
  name: string;
  notes: string[];
  numerals?: string[];
  detail: string;
}

const SCALE_ALIASES: Record<string, string> = {
  "Ionian (Major)": "Ionian (Major)",
  "Aeolian (Natural Minor)": "Aeolian (Natural Minor)",
  "Natural Minor": "Aeolian (Natural Minor)",
  Major: "Ionian (Major)",
  Altered: "Altered Scale",
  Blues: "Blues Scale",
  Chromatic: "17-TET Chromatic",
  "Double Harmonic": "Double Harmonic Major",
  "Phrygian Dominant": "Phrygian Dominant",
};

const CHORD_ALIASES: Record<string, string> = {
  power: "5",
};

const HARDCODED_CHORDS: Record<string, number[]> = {
  "5": [0, 7],
  b5: [0, 6],
  min11: [0, 3, 7, 10, 14, 17],
  "min(add b2)": [0, 1, 3, 7],
  "min(maj7)": [0, 3, 7, 11],
  "7alt": [0, 4, 8, 10, 13],
  bII: [0, 4, 7],
  bVI: [0, 4, 7],
  "Fr+6": [0, 4, 6, 10],
};

function resolveScaleNotes(scaleName: string, keySignature: string) {
  const root = getRootFromKey(keySignature);
  const directName =
    scaleName === "Double Harmonic"
      ? keySignature.includes("Minor")
        ? "Double Harmonic Minor"
        : "Double Harmonic Major"
      : scaleName;
  const mappedName = (ALL_SCALES as Record<string, { intervals: readonly number[] }>)[directName]
    ? directName
    : SCALE_ALIASES[scaleName];
  const scale = (ALL_SCALES as Record<string, { intervals: readonly number[] }>)[mappedName];
  if (!scale) return null;
  return {
    name: mappedName,
    notes: getNotesFromIntervals(`${root}4`, [...scale.intervals]),
  };
}

function resolveChordNotes(chordQuality: string, keySignature: string) {
  const root = getRootFromKey(keySignature);
  const mappedQuality = CHORD_ALIASES[chordQuality] || chordQuality;
  const template = (CHORD_TEMPLATES as Record<string, { intervals: readonly number[]; symbol?: string }>)[mappedQuality];

  if (template) {
    return {
      name: `${root} ${template.symbol || mappedQuality}`,
      notes: buildChordFromRootAndQuality(`${root}4`, mappedQuality).notes,
    };
  }

  if (HARDCODED_CHORDS[mappedQuality]) {
    return {
      name: `${root} ${mappedQuality}`,
      notes: getNotesFromIntervals(`${root}4`, HARDCODED_CHORDS[mappedQuality]),
    };
  }

  return null;
}

function buildInitialPreview(subgenre: SubgenreEntry, keySignature: string): GenrePreview | null {
  const firstScale = subgenre.scales[0];
  if (!firstScale) return null;
  const resolved = resolveScaleNotes(firstScale, keySignature);
  if (!resolved) return null;
  return {
    type: "scale",
    name: resolved.name,
    notes: resolved.notes,
    detail: subgenre.desc,
  };
}

export function GenreExplorerPage() {
  const currentKey = useAppStore((state) => state.currentKey);
  const updateRoute = useShellBridgeStore((state) => state.updateRoute);
  const [genreName, setGenreName] = useState<string>(GENRE_LIBRARY[0]?.genre ?? "");
  const activeGenre = useMemo(
    () => GENRE_LIBRARY.find((genre) => genre.genre === genreName) ?? GENRE_LIBRARY[0],
    [genreName],
  );
  const [subgenreName, setSubgenreName] = useState<string>(activeGenre?.subgenres[0]?.name ?? "");
  const activeSubgenre = useMemo(
    () =>
      activeGenre?.subgenres.find((subgenre) => subgenre.name === subgenreName) ??
      activeGenre?.subgenres[0],
    [activeGenre, subgenreName],
  );
  const [preview, setPreview] = useState<GenrePreview | null>(null);
  const initialPreview = useMemo(
    () => (activeSubgenre ? buildInitialPreview(activeSubgenre, currentKey) : null),
    [activeSubgenre, currentKey],
  );

  useEffect(() => {
    if (!activeGenre) return;
    if (!activeGenre.subgenres.some((subgenre) => subgenre.name === subgenreName)) {
      setSubgenreName(activeGenre.subgenres[0]?.name ?? "");
    }
  }, [activeGenre, subgenreName]);

  useEffect(() => {
    if (!activeSubgenre) return;
    setPreview(buildInitialPreview(activeSubgenre, currentKey));
  }, [activeSubgenre, currentKey]);

  const playableLabel = preview
    ? `${preview.type[0].toUpperCase()}${preview.type.slice(1)} • ${preview.name} • ${activeSubgenre?.name ?? ""}`
    : `${activeGenre?.genre ?? "Genre Explorer"} • ${activeSubgenre?.name ?? ""}`;
  const playableNoteSet = useMemo(() => {
    if (!preview) return initialPreview?.notes ?? [];
    if (preview.type !== "progression") return preview.notes;

    const progression = activeSubgenre?.progressions.find((entry) => entry.name === preview.name);
    if (!progression) return preview.notes;

    return Array.from(
      new Set(
        getProgressionPreview(progression.name, currentKey).flatMap((chord) => chord.notes),
      ),
    );
  }, [activeSubgenre, currentKey, initialPreview?.notes, preview]);

  const playCurrent = useCallback(() => {
    if (!preview) {
      if (initialPreview?.notes.length) {
        playScale(initialPreview.notes);
      }
      return;
    }

    if (preview.type === "scale") {
      playScale(preview.notes);
      return;
    }

    if (preview.type === "chord") {
      playChord(preview.notes);
      return;
    }

    playProgression(getProgressionPreview(preview.name, currentKey).map((chord) => chord.notes));
  }, [currentKey, initialPreview?.notes, preview]);

  const clear = useCallback(() => {
    if (DEFAULT_GENRE) {
      setGenreName(DEFAULT_GENRE.genre);
    }
    if (DEFAULT_SUBGENRE) {
      setSubgenreName(DEFAULT_SUBGENRE.name);
      setPreview(buildInitialPreview(DEFAULT_SUBGENRE, currentKey));
    } else {
      setPreview(null);
    }
  }, [currentKey]);

  useEffect(() => {
    updateRoute(ROUTE_ID, {
      title: "Genre Explorer",
      subtitle: "The DNA of global musical genres.",
      playableLabel,
      playableNoteSet,
      playCurrent,
      clear,
    });
  }, [clear, playCurrent, playableLabel, playableNoteSet, updateRoute]);

  if (!activeGenre || !activeSubgenre) {
    return null;
  }

  return (
    <section className="page-section">
      <div className="legacy-tool-panel">
        <div className="legacy-tool-panel__header">
          <div>
            <span className="eyebrow">Style Explorer</span>
            <h1 className="legacy-tool-panel__title">Genre Explorer</h1>
            <p className="legacy-tool-panel__copy">
              Browse the extracted genre DNA library as real source data. Each subgenre surfaces
              typical scales, harmonic language, and progression blueprints in the current key.
            </p>
          </div>
          <label className="select-field">
            <span>Main Category</span>
            <select value={genreName} onChange={(event) => setGenreName(event.target.value)}>
              {GENRE_LIBRARY.map((genre) => (
                <option key={genre.genre} value={genre.genre}>
                  {genre.icon} {genre.genre}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="legacy-toolbar-row">
          <div className="legacy-toolbar-chip">
            Category
            <br />
            <strong>{activeGenre.genre}</strong>
          </div>
          <div className="legacy-toolbar-chip">
            Subgenre
            <br />
            <strong>{activeSubgenre.name}</strong>
          </div>
          <div className="legacy-toolbar-chip">
            Key
            <br />
            <strong>{currentKey}</strong>
          </div>
        </div>
      </div>

      <article className="legacy-tool-panel">
        <div className="detail-header">
          <div>
            <span className="summary-label">Subgenres</span>
            <h2>{activeGenre.genre}</h2>
            <p className="legacy-tool-panel__copy">Switch the subgenre to refresh its scale, chord, and progression palette.</p>
          </div>
        </div>
        <div className="genre-subgenre-strip">
          {activeGenre.subgenres.map((subgenre) => (
            <button
              key={subgenre.name}
              className={`quality-picker-button genre-chip ${
                subgenre.name === activeSubgenre.name ? "is-active" : ""
              }`}
              onClick={() => setSubgenreName(subgenre.name)}
            >
              <strong>{subgenre.name}</strong>
              <span>{subgenre.scales.length} scales</span>
            </button>
          ))}
        </div>
      </article>

      <article className="legacy-tool-panel">
        <div className="detail-header">
          <div>
            <span className="summary-label">Palette</span>
            <h2>{activeSubgenre.name}</h2>
            <p className="legacy-tool-panel__copy">{activeSubgenre.desc}</p>
          </div>
          {preview ? <NoteBadgeList notes={preview.notes} keySignature={currentKey} /> : null}
        </div>

        <div className="legacy-catalog-grid genre-palette-grid">
          <article className="legacy-catalog-card">
            <div className="legacy-catalog-card__header">
              <div>
                <span className="legacy-catalog-card__eyebrow">Typical Scales</span>
                <h2 className="legacy-catalog-card__title">{activeSubgenre.scales.length} options</h2>
              </div>
            </div>
            <div className="toolbar-cluster">
              {activeSubgenre.scales.map((scaleName) => (
                <button
                  key={`${activeSubgenre.name}-scale-${scaleName}`}
                  className="legacy-catalog-card__action"
                  onClick={() => {
                    const resolved = resolveScaleNotes(scaleName, currentKey);
                    if (!resolved) return;
                    setPreview({
                      type: "scale",
                      name: resolved.name,
                      notes: resolved.notes,
                      detail: scaleName,
                    });
                    playScale(resolved.notes);
                  }}
                >
                  {scaleName}
                </button>
              ))}
            </div>
          </article>

          <article className="legacy-catalog-card">
            <div className="legacy-catalog-card__header">
              <div>
                <span className="legacy-catalog-card__eyebrow">Harmonic Language</span>
                <h2 className="legacy-catalog-card__title">{activeSubgenre.chords.length} chord colors</h2>
              </div>
            </div>
            <div className="toolbar-cluster">
              {activeSubgenre.chords.map((quality) => (
                <button
                  key={`${activeSubgenre.name}-chord-${quality}`}
                  className="legacy-catalog-card__action"
                  onClick={() => {
                    const resolved = resolveChordNotes(quality, currentKey);
                    if (!resolved) return;
                    setPreview({
                      type: "chord",
                      name: resolved.name,
                      notes: resolved.notes,
                      detail: quality,
                    });
                    playChord(resolved.notes);
                  }}
                >
                  {quality}
                </button>
              ))}
            </div>
          </article>
        </div>
      </article>

      <div className="legacy-catalog-grid">
        {activeSubgenre.progressions.map((progression) => {
          const resolved = getProgressionPreview(progression.name, currentKey);
          return (
            <article key={`${activeSubgenre.name}-${progression.name}`} className="legacy-catalog-card">
              <div className="legacy-catalog-card__header">
                <div>
                  <span className="legacy-catalog-card__eyebrow">Progression Blueprint</span>
                  <h2 className="legacy-catalog-card__title">{progression.name}</h2>
                  <div className="legacy-catalog-card__subtitle">{progression.desc}</div>
                </div>
                <button
                  className="legacy-catalog-card__action"
                  onClick={() => {
                    setPreview({
                      type: "progression",
                      name: progression.name,
                      notes: resolved[0]?.notes ?? [],
                      numerals: [...progression.numerals],
                      detail: progression.desc,
                    });
                    playProgression(resolved.map((chord) => chord.notes));
                  }}
                >
                  Play
                </button>
              </div>
              <div className="legacy-token-row">
                {progression.numerals.map((numeral) => (
                  <span key={`${progression.name}-${numeral}`} className="legacy-note-token">
                    {numeral}
                  </span>
                ))}
              </div>
            </article>
          );
        })}
      </div>

      {preview ? (
        <article className="legacy-preview-panel">
          <div className="detail-header">
            <div>
              <span className="summary-label">Preview</span>
              <h2>{preview.name}</h2>
              <p className="legacy-tool-panel__copy">{preview.detail}</p>
            </div>
            <div className="legacy-preview-panel__meta">
              <span className="legacy-preview-chip">{preview.type}</span>
              {preview.numerals ? <span className="legacy-preview-chip">{preview.numerals.join(" - ")}</span> : null}
            </div>
          </div>
          <NoteBadgeList notes={preview.notes} keySignature={currentKey} />
          <KeyboardPreview activeNotes={preview.notes} keySignature={currentKey} />
        </article>
      ) : null}
    </section>
  );
}
