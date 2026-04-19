import { useCallback, useEffect, useMemo, useState } from "react";
import { playChord, playProgression, playScale } from "../../audio/audioEngine";
import { KeyboardPreview } from "../../components/KeyboardPreview";
import { NoteBadgeList } from "../../components/NoteBadgeList";
import { useAppStore } from "../../app/store/useAppStore";
import { useShellBridgeStore } from "../../app/store/useShellBridgeStore";
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
  const updateRoute = useShellBridgeStore((state) => state.updateRoute);
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

  const playCurrent = useCallback(() => {
    if (!scaleData) return;
    playScale(scaleData.notes);
  }, [scaleData]);

  const clear = useCallback(() => {
    setSelectedMoodName(MOOD_DEFINITIONS[0]?.name ?? "");
  }, []);

  const playableLabel = selectedMood && scaleData ? `${selectedMood.name} • ${selectedMood.scale}` : "";

  useEffect(() => {
    if (!selectedMood || !scaleData) return;

    updateRoute("moods", {
      title: "Mood Picker",
      subtitle: "Find harmony through emotion.",
      playableLabel,
      playableNoteSet: scaleData.notes,
      playCurrent,
      clear,
    });
  }, [clear, playCurrent, playableLabel, scaleData, selectedMood, updateRoute]);

  if (!selectedMood || !scaleData) {
    return null;
  }

  return (
    <section className="page-section">
      <div className="legacy-tool-panel">
        <div className="legacy-tool-panel__header">
          <div>
            <span className="eyebrow">Creative Guide</span>
            <h1 className="legacy-tool-panel__title">Mood Picker</h1>
            <p className="legacy-tool-panel__copy">
              Explore emotional palettes through scale choice, progression shape, and diatonic
              color.
            </p>
          </div>
        </div>
        <div className="legacy-toolbar-row">
          <div className="legacy-toolbar-chip">
            Mood
            <br />
            <strong>{selectedMood.name}</strong>
          </div>
          <div className="legacy-toolbar-chip">
            Scale
            <br />
            <strong>{selectedMood.scale}</strong>
          </div>
          <div className="legacy-toolbar-chip">
            Progression
            <br />
            <strong>{selectedMood.progression}</strong>
          </div>
        </div>
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

      <article className="legacy-preview-panel">
        <div className="detail-header">
          <div>
            <span className="summary-label">Mood Palette</span>
            <h2>
              {getRootFromKey(currentKey)} {selectedMood.scale}
            </h2>
            <p className="legacy-tool-panel__copy">{scaleData.desc}</p>
          </div>
          <div className="toolbar-cluster">
            <button className="ghost-button" onClick={playCurrent}>
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
        <div className="legacy-preview-panel__meta">
          <span className="legacy-preview-chip">{scaleData.region}</span>
          <span className="legacy-preview-chip">{selectedMood.progression}</span>
        </div>
        <NoteBadgeList notes={scaleData.notes} keySignature={currentKey} />
        <KeyboardPreview activeNotes={scaleData.notes} keySignature={currentKey} />
      </article>

      <article className="legacy-tool-panel">
        <div className="detail-header">
          <div>
            <span className="summary-label">Progression Chords</span>
            <h2>{selectedMood.progression}</h2>
            <p className="legacy-tool-panel__copy">Click any chord to hear the color inside the selected mood palette.</p>
          </div>
        </div>
        <div className="legacy-catalog-grid">
          {progressionChords.map((chord, index) => (
            <article className="legacy-catalog-card" key={`${selectedMood.name}-${index}`}>
              <div className="legacy-catalog-card__header">
                <div>
                  <span className="legacy-catalog-card__eyebrow">{selectedMood.progression.split(" - ")[index]}</span>
                  <h2 className="legacy-catalog-card__title">{chord.name}</h2>
                </div>
                <button className="legacy-catalog-card__action" onClick={() => playChord(chord.notes)}>
                  Play
                </button>
              </div>
              <div className="legacy-token-row">
                {chord.notes.map((note) => (
                  <span key={`${chord.name}-${note}`} className="legacy-note-token">
                    {note.replace(/[0-9]/g, "")}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </article>

      <article className="legacy-tool-panel">
        <div className="detail-header">
          <div>
            <span className="summary-label">Degree Chords</span>
            <h2>{selectedMood.scale}</h2>
            <p className="legacy-tool-panel__copy">A quick diatonic pass across the chosen mood scale.</p>
          </div>
        </div>
        <div className="legacy-catalog-grid">
          {degreeChords.map((chord, index) => (
            <article className="legacy-catalog-card" key={`${selectedMood.scale}-${index}`}>
              <div className="legacy-catalog-card__header">
                <div>
                  <span className="legacy-catalog-card__eyebrow">Degree {index + 1}</span>
                  <h2 className="legacy-catalog-card__title">{chord.name}</h2>
                </div>
                <button className="legacy-catalog-card__action" onClick={() => playChord(chord.notes)}>
                  Play
                </button>
              </div>
              <div className="legacy-token-row">
                {chord.notes.map((note) => (
                  <span key={`${chord.name}-${note}`} className="legacy-note-token">
                    {note.replace(/[0-9]/g, "")}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </article>
    </section>
  );
}
