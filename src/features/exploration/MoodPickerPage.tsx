import { useMemo, useState } from "react";
import { playChord, playProgression, playScale } from "../../audio/audioEngine";
import { KeyboardPreview } from "../../components/KeyboardPreview";
import { NoteBadgeList } from "../../components/NoteBadgeList";
import { useAppStore } from "../../app/store/useAppStore";
import { ALL_SCALES } from "../../domain/generated/theory-data";
import { MOOD_DEFINITIONS } from "../../domain/moods";
import {
  buildChordFromRootAndQuality,
  getNotesFromIntervals,
  getRootFromKey,
  resolveRomanChord,
} from "../../domain/music";

function resolveMoodScale(scaleName: string, keySignature: string) {
  const root = getRootFromKey(keySignature);
  const scale = (ALL_SCALES as Record<string, { intervals: readonly number[]; region: string; desc: string }>)[scaleName];
  if (!scale) {
    return null;
  }

  return {
    name: scaleName,
    region: scale.region,
    desc: scale.desc,
    notes: getNotesFromIntervals(`${root}4`, [...scale.intervals]),
    degreeCount: scale.intervals.length,
  };
}

function isMinorMoodScale(scaleName: string) {
  return (
    scaleName.includes("Minor") ||
    scaleName.includes("Phrygian") ||
    scaleName.includes("Dorian") ||
    scaleName.includes("Aeolian") ||
    scaleName.includes("Locrian") ||
    scaleName.includes("Hirajoshi") ||
    scaleName.includes("Hijaz") ||
    scaleName.includes("Bhairav")
  );
}

export function MoodPickerPage() {
  const currentKey = useAppStore((state) => state.currentKey);
  const [selectedMoodName, setSelectedMoodName] = useState(MOOD_DEFINITIONS[0]?.name ?? "");
  const selectedMood = useMemo(
    () => MOOD_DEFINITIONS.find((mood) => mood.name === selectedMoodName) ?? MOOD_DEFINITIONS[0],
    [selectedMoodName],
  );

  const scaleData = useMemo(
    () => resolveMoodScale(selectedMood.scale, currentKey),
    [currentKey, selectedMood.scale],
  );

  const progressionChords = useMemo(() => {
    if (!scaleData) return [];
    const root = getRootFromKey(currentKey);
    const parallelKey = `${root} ${isMinorMoodScale(selectedMood.scale) ? "Minor" : "Major"}`;
    return selectedMood.progression
      .split(" - ")
      .map((numeral) => resolveRomanChord(numeral.trim(), parallelKey));
  }, [currentKey, scaleData, selectedMood.progression, selectedMood.scale]);

  const degreeChords = useMemo(() => {
    if (!scaleData) return [];
    const degreeQualities = isMinorMoodScale(selectedMood.scale)
      ? ["minor", "dim", "Major", "minor", "minor", "Major", "Major"]
      : ["Major", "minor", "minor", "Major", "Major", "minor", "dim"];

    return scaleData.notes.slice(0, Math.min(scaleData.degreeCount, 7)).map((note, index) => {
      const root = note.replace(/[0-9]/g, "");
      const quality = degreeQualities[index] || "Major";
      return buildChordFromRootAndQuality(`${root}4`, quality);
    });
  }, [scaleData, selectedMood.scale]);

  if (!selectedMood || !scaleData) {
    return null;
  }

  return (
    <section className="page-section">
      <div className="page-hero">
        <div>
          <span className="eyebrow">Source Feature</span>
          <h1>Mood Picker</h1>
          <p>
            Explore emotional palettes through scale choice, progression shape, and diatonic color.
            The mood recommendations now run from source-side data and theory helpers.
          </p>
        </div>
      </div>

      <div className="summary-grid">
        <article className="summary-card">
          <span className="summary-label">Selected Mood</span>
          <h2>{selectedMood.name}</h2>
          <p>{selectedMood.desc}</p>
        </article>
        <article className="summary-card">
          <span className="summary-label">Suggested Scale</span>
          <h2>{selectedMood.scale}</h2>
          <p>{currentKey} resolves this palette into the active app key.</p>
        </article>
        <article className="summary-card">
          <span className="summary-label">Suggested Progression</span>
          <h2>{selectedMood.progression}</h2>
          <p>Roman numerals are resolved through the same source harmony helpers as the progression tools.</p>
        </article>
      </div>

      <div className="mood-grid">
        {MOOD_DEFINITIONS.map((mood) => (
          <button
            key={mood.name}
            className={`mood-card ${mood.name === selectedMood.name ? "is-active" : ""}`}
            style={{ backgroundImage: mood.color }}
            onClick={() => setSelectedMoodName(mood.name)}
          >
            <span className="card-tag">{mood.scale}</span>
            <strong>{mood.name}</strong>
            <span>{mood.desc}</span>
          </button>
        ))}
      </div>

      <article className="detail-card">
        <div className="detail-header">
          <div>
            <span className="summary-label">Mood Palette</span>
            <h2>
              {getRootFromKey(currentKey)} {selectedMood.scale}
            </h2>
            <p>{scaleData.desc}</p>
          </div>
          <div className="toolbar-cluster">
            <button className="ghost-button" onClick={() => playScale(scaleData.notes)}>
              Play Scale
            </button>
            <button
              className="primary-button"
              onClick={() => playProgression(progressionChords.map((chord) => chord.notes))}
            >
              Play Progression
            </button>
          </div>
        </div>
        <div className="info-chip-row">
          <span className="info-chip">{scaleData.region}</span>
          <span className="info-chip">{selectedMood.progression}</span>
        </div>
        <NoteBadgeList notes={scaleData.notes} keySignature={currentKey} />
        <KeyboardPreview activeNotes={scaleData.notes} keySignature={currentKey} />
      </article>

      <article className="detail-card">
        <div className="detail-header">
          <div>
            <span className="summary-label">Progression Chords</span>
            <h2>{selectedMood.progression}</h2>
            <p>Click any chord to hear the color inside the selected mood palette.</p>
          </div>
        </div>
        <div className="feature-grid">
          {progressionChords.map((chord, index) => (
            <article className="feature-card" key={`${selectedMood.name}-${index}`}>
              <div className="feature-card-header">
                <div>
                  <span className="card-tag">{selectedMood.progression.split(" - ")[index]}</span>
                  <h3>{chord.name}</h3>
                </div>
                <button className="ghost-button" onClick={() => playChord(chord.notes)}>
                  Play
                </button>
              </div>
              <NoteBadgeList notes={chord.notes} keySignature={currentKey} />
            </article>
          ))}
        </div>
      </article>

      <article className="detail-card">
        <div className="detail-header">
          <div>
            <span className="summary-label">Degree Chords</span>
            <h2>{selectedMood.scale}</h2>
            <p>A quick diatonic pass across the chosen mood scale.</p>
          </div>
        </div>
        <div className="feature-grid">
          {degreeChords.map((chord, index) => (
            <article className="feature-card" key={`${selectedMood.scale}-${index}`}>
              <div className="feature-card-header">
                <div>
                  <span className="card-tag">Degree {index + 1}</span>
                  <h3>{chord.name}</h3>
                </div>
                <button className="ghost-button" onClick={() => playChord(chord.notes)}>
                  Play
                </button>
              </div>
              <NoteBadgeList notes={chord.notes} keySignature={currentKey} />
            </article>
          ))}
        </div>
      </article>
    </section>
  );
}
