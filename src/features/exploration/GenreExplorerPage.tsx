import { useEffect, useMemo, useState } from "react";
import { playChord, playProgression, playScale } from "../../audio/audioEngine";
import { KeyboardPreview } from "../../components/KeyboardPreview";
import { NoteBadgeList } from "../../components/NoteBadgeList";
import { useAppStore } from "../../app/store/useAppStore";
import {
  ALL_SCALES,
  CHORD_TEMPLATES,
  GENRE_LIBRARY,
} from "../../domain/generated/theory-data";
import { buildChordFromRootAndQuality, getNotesFromIntervals, getProgressionPreview, getRootFromKey } from "../../domain/music";

type GenreEntry = (typeof GENRE_LIBRARY)[number];
type SubgenreEntry = GenreEntry["subgenres"][number];

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

  if (!activeGenre || !activeSubgenre) {
    return null;
  }

  return (
    <section className="page-section">
      <div className="page-hero">
        <div>
          <span className="eyebrow">Source Feature</span>
          <h1>Genre Explorer</h1>
          <p>
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

      <div className="summary-grid">
        <article className="summary-card">
          <span className="summary-label">Category</span>
          <h2>{activeGenre.genre}</h2>
          <p>{activeGenre.subgenres.length} extracted subgenres in this family.</p>
        </article>
        <article className="summary-card">
          <span className="summary-label">Subgenre</span>
          <h2>{activeSubgenre.name}</h2>
          <p>{activeSubgenre.desc}</p>
        </article>
        <article className="summary-card">
          <span className="summary-label">Current Key</span>
          <h2>{currentKey}</h2>
          <p>All previews resolve against the active key root instead of hard-coded examples.</p>
        </article>
      </div>

      <article className="detail-card">
        <div className="detail-header">
          <div>
            <span className="summary-label">Subgenres</span>
            <h2>{activeGenre.genre}</h2>
            <p>Switch the subgenre to refresh its scale, chord, and progression palette.</p>
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

      <article className="detail-card">
        <div className="detail-header">
          <div>
            <span className="summary-label">Palette</span>
            <h2>{activeSubgenre.name}</h2>
            <p>{activeSubgenre.desc}</p>
          </div>
          {preview ? <NoteBadgeList notes={preview.notes} keySignature={currentKey} /> : null}
        </div>

        <div className="feature-grid genre-palette-grid">
          <article className="feature-card">
            <div className="feature-card-header">
              <div>
                <span className="card-tag">Typical Scales</span>
                <h3>{activeSubgenre.scales.length} options</h3>
              </div>
            </div>
            <div className="toolbar-cluster">
              {activeSubgenre.scales.map((scaleName) => (
                <button
                  key={`${activeSubgenre.name}-scale-${scaleName}`}
                  className="ghost-button"
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

          <article className="feature-card">
            <div className="feature-card-header">
              <div>
                <span className="card-tag">Harmonic Language</span>
                <h3>{activeSubgenre.chords.length} chord colors</h3>
              </div>
            </div>
            <div className="toolbar-cluster">
              {activeSubgenre.chords.map((quality) => (
                <button
                  key={`${activeSubgenre.name}-chord-${quality}`}
                  className="ghost-button"
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

      <div className="feature-grid">
        {activeSubgenre.progressions.map((progression) => {
          const resolved = getProgressionPreview(progression.name, currentKey);
          return (
            <article key={`${activeSubgenre.name}-${progression.name}`} className="feature-card">
              <div className="feature-card-header">
                <div>
                  <span className="card-tag">Progression Blueprint</span>
                  <h3>{progression.name}</h3>
                </div>
                <button
                  className="ghost-button"
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
              <p className="card-copy">{progression.desc}</p>
              <div className="scale-strip">
                {progression.numerals.map((numeral) => (
                  <span key={`${progression.name}-${numeral}`} className="scale-token">
                    {numeral}
                  </span>
                ))}
              </div>
            </article>
          );
        })}
      </div>

      {preview ? (
        <article className="detail-card">
          <div className="detail-header">
            <div>
              <span className="summary-label">Preview</span>
              <h2>{preview.name}</h2>
              <p>{preview.detail}</p>
            </div>
            <div className="info-chip-row">
              <span className="info-chip">{preview.type}</span>
              {preview.numerals ? <span className="info-chip">{preview.numerals.join(" - ")}</span> : null}
            </div>
          </div>
          <NoteBadgeList notes={preview.notes} keySignature={currentKey} />
          <KeyboardPreview activeNotes={preview.notes} keySignature={currentKey} />
        </article>
      ) : null}
    </section>
  );
}
