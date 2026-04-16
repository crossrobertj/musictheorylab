import { useEffect, useMemo, useState } from "react";
import { playNoteSequence, playProgression } from "../../audio/audioEngine";
import { loadVersionedState, persistVersionedState } from "../../app/persistence/storage";
import { useAppStore } from "../../app/store/useAppStore";
import {
  SONGWRITING_METHODS,
  SONGWRITING_MOOD_BANK,
  SONGWRITING_STYLES,
  SONGWRITING_VIEWPOINTS,
  SONG_FORM_TEMPLATES,
  RHYME_TYPE_REFERENCE,
  analyzeSongProgression,
  createDefaultSongwritingDraft,
  detectRhymeScheme,
  generateHookIdeas,
  generateLineStarters,
  generateMelodySketch,
  generateObjectPrompt,
  generateSongProgression,
  generateSongTitleIdeas,
  getEndWordFrequency,
  getLineMetrics,
  getSongProgressionOptions,
  runSongProsodyCheck,
  type SongwritingDraft,
  type SongwritingProsody,
} from "../../domain/songwriting";
import { getProgressionPreview } from "../../domain/music";

const STORAGE_KEY = "music-theory-lab-source-songwriting-v1";
const STORAGE_VERSION = 1;

interface SongwritingState {
  draft: SongwritingDraft;
  activeSectionIndex: number;
  titleIdeas: string[];
  hookIdeas: string[];
  lineStarters: string[];
  prosody: SongwritingProsody | null;
  lastMethod: string | null;
}

const defaultState: SongwritingState = {
  draft: createDefaultSongwritingDraft(),
  activeSectionIndex: 0,
  titleIdeas: [],
  hookIdeas: [],
  lineStarters: [],
  prosody: null,
  lastMethod: null,
};

function parseSongwritingState(value: unknown): SongwritingState | null {
  if (!value || typeof value !== "object") return null;
  const parsed = value as Partial<SongwritingState>;
  return {
    draft: { ...createDefaultSongwritingDraft(), ...parsed.draft },
    activeSectionIndex: parsed.activeSectionIndex ?? 0,
    titleIdeas: Array.isArray(parsed.titleIdeas)
      ? parsed.titleIdeas.filter((item): item is string => typeof item === "string")
      : [],
    hookIdeas: Array.isArray(parsed.hookIdeas)
      ? parsed.hookIdeas.filter((item): item is string => typeof item === "string")
      : [],
    lineStarters: Array.isArray(parsed.lineStarters)
      ? parsed.lineStarters.filter((item): item is string => typeof item === "string")
      : [],
    prosody: parsed.prosody ?? null,
    lastMethod: typeof parsed.lastMethod === "string" ? parsed.lastMethod : null,
  };
}

function loadState(): SongwritingState {
  return loadVersionedState({
    key: STORAGE_KEY,
    version: STORAGE_VERSION,
    defaultValue: defaultState,
    parse: parseSongwritingState,
  });
}

function downloadText(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

export function SongwritingLabPage() {
  const currentKey = useAppStore((state) => state.currentKey);
  const initial = useMemo(() => loadState(), []);
  const [draft, setDraft] = useState(initial.draft);
  const [activeSectionIndex, setActiveSectionIndex] = useState(initial.activeSectionIndex);
  const [titleIdeas, setTitleIdeas] = useState(initial.titleIdeas);
  const [hookIdeas, setHookIdeas] = useState(initial.hookIdeas);
  const [lineStarters, setLineStarters] = useState(initial.lineStarters);
  const [prosody, setProsody] = useState<SongwritingProsody | null>(initial.prosody);
  const [lastMethod, setLastMethod] = useState<string | null>(initial.lastMethod);

  useEffect(() => {
    persistVersionedState(STORAGE_KEY, STORAGE_VERSION, {
      draft,
      activeSectionIndex,
      titleIdeas,
      hookIdeas,
      lineStarters,
      prosody,
      lastMethod,
    });
  }, [activeSectionIndex, draft, hookIdeas, lastMethod, lineStarters, prosody, titleIdeas]);

  const activeSection = draft.sections[activeSectionIndex] ?? draft.sections[0];
  const progressionOptions = useMemo(() => getSongProgressionOptions(draft.style), [draft.style]);
  const selectedProgression =
    progressionOptions.find((progression) => progression.name === draft.selectedProgression) ??
    progressionOptions[0] ??
    null;
  const resolvedProgression = selectedProgression
    ? getProgressionPreview(selectedProgression.name, currentKey)
    : [];
  const rhymeScheme = detectRhymeScheme(activeSection?.lyrics ?? "", draft.rhymeType);
  const lineMetrics = getLineMetrics(activeSection?.lyrics ?? "");
  const endWords = getEndWordFrequency(activeSection?.lyrics ?? "");
  const progressionAnalysis = analyzeSongProgression(draft.style, draft.selectedProgression);
  const moodPalette = SONGWRITING_MOOD_BANK[draft.mood] || SONGWRITING_MOOD_BANK.Reflective;

  function updateDraft<K extends keyof SongwritingDraft>(field: K, value: SongwritingDraft[K]) {
    setDraft((current) => ({ ...current, [field]: value }));
  }

  function updateSectionLyrics(index: number, lyrics: string) {
    setDraft((current) => ({
      ...current,
      sections: current.sections.map((section, sectionIndex) =>
        sectionIndex === index ? { ...section, lyrics } : section,
      ),
    }));
  }

  function insertIntoActiveLyrics(line: string) {
    if (!line) return;
    updateSectionLyrics(
      activeSectionIndex,
      `${activeSection?.lyrics ? `${activeSection.lyrics}\n` : ""}${line}`,
    );
  }

  function applyMethod(name: string) {
    const method = SONGWRITING_METHODS.find((item) => item.name === name);
    if (!method) return;

    setLastMethod(method.name);
    updateDraft("notes", `${draft.notes}${draft.notes ? "\n" : ""}${method.name}: ${method.how}`);

    if (method.name === "Object Writing") {
      updateDraft("objectPrompt", generateObjectPrompt(draft.mood, draft.theme));
      return;
    }
    if (method.name === "Title Ladder") {
      setTitleIdeas(generateSongTitleIdeas(draft));
      return;
    }
    if (method.name === "Prosody Check" || method.name === "Stress Grid") {
      setProsody(runSongProsodyCheck(activeSection?.lyrics ?? ""));
    }
  }

  function addSection(type: string) {
    setDraft((current) => ({
      ...current,
      sections: [...current.sections, { type, lyrics: "" }],
    }));
    setActiveSectionIndex(draft.sections.length);
  }

  function moveSection(index: number, direction: number) {
    const target = index + direction;
    if (target < 0 || target >= draft.sections.length) return;

    setDraft((current) => {
      const next = [...current.sections];
      const [moved] = next.splice(index, 1);
      next.splice(target, 0, moved);
      return { ...current, sections: next };
    });
    setActiveSectionIndex(target);
  }

  function removeSection(index: number) {
    if (draft.sections.length <= 1) return;
    setDraft((current) => ({
      ...current,
      sections: current.sections.filter((_, sectionIndex) => sectionIndex !== index),
    }));
    setActiveSectionIndex((current) => Math.max(0, Math.min(current, draft.sections.length - 2)));
  }

  function applyTemplate(templateName: string) {
    const template = SONG_FORM_TEMPLATES[templateName];
    if (!template) return;
    setDraft((current) => ({
      ...current,
      sections: template.map((type) => ({ type, lyrics: "" })),
    }));
    setActiveSectionIndex(0);
  }

  function exportDraft() {
    const lines = [
      `# ${draft.title}`,
      `Mood: ${draft.mood}`,
      `Style: ${draft.style}`,
      `Viewpoint: ${draft.viewpoint}`,
      `Theme: ${draft.theme || "-"}`,
      `Hook: ${draft.hookLine || "-"}`,
      `Progression: ${draft.selectedProgression}`,
      "",
    ];
    draft.sections.forEach((section) => {
      lines.push(`[${section.type}]`);
      lines.push(section.lyrics || "(empty)");
      lines.push("");
    });
    if (draft.notes) {
      lines.push("[Notes]");
      lines.push(draft.notes);
    }
    downloadText(`${draft.title.replace(/[^a-z0-9]+/gi, "-").toLowerCase() || "song-draft"}.txt`, lines.join("\n"));
  }

  function resetDraft() {
    setDraft(createDefaultSongwritingDraft());
    setActiveSectionIndex(0);
    setTitleIdeas([]);
    setHookIdeas([]);
    setLineStarters([]);
    setProsody(null);
    setLastMethod(null);
  }

  return (
    <section className="page-section">
      <div className="page-hero">
        <div>
          <span className="eyebrow">Source Feature</span>
          <h1>Songwriting Lab</h1>
          <p>
            Draft lyrics, shape form, generate titles and hooks, inspect rhyme and prosody, and
            keep progression ideas inside the source app.
          </p>
        </div>
        <div className="hero-actions">
          <button className="primary-button" onClick={exportDraft}>
            Export Draft
          </button>
          <button className="ghost-button" onClick={resetDraft}>
            Reset Draft
          </button>
        </div>
      </div>

      <article className="detail-card">
        <div className="song-grid song-grid--meta">
          <input value={draft.title} onChange={(event) => updateDraft("title", event.target.value)} placeholder="Song title" />
          <select value={draft.mood} onChange={(event) => updateDraft("mood", event.target.value as SongwritingDraft["mood"])}>
            {Object.keys(SONGWRITING_MOOD_BANK).map((mood) => (
              <option key={mood} value={mood}>
                {mood}
              </option>
            ))}
          </select>
          <select value={draft.style} onChange={(event) => updateDraft("style", event.target.value)}>
            {SONGWRITING_STYLES.map((style) => (
              <option key={style} value={style}>
                {style}
              </option>
            ))}
          </select>
          <select value={draft.viewpoint} onChange={(event) => updateDraft("viewpoint", event.target.value)}>
            {SONGWRITING_VIEWPOINTS.map((viewpoint) => (
              <option key={viewpoint} value={viewpoint}>
                {viewpoint}
              </option>
            ))}
          </select>
          <input value={draft.hookLine} onChange={(event) => updateDraft("hookLine", event.target.value)} placeholder="Hook line" />
          <input value={draft.theme} onChange={(event) => updateDraft("theme", event.target.value)} placeholder="Theme or storyline" />
        </div>
      </article>

      <div className="songwriting-layout">
        <article className="detail-card">
          <div className="detail-header">
            <div>
              <span className="summary-label">Structure</span>
              <h2>{draft.title}</h2>
              <p>Manage section order and load common song forms.</p>
            </div>
            <select defaultValue="" onChange={(event) => applyTemplate(event.target.value)}>
              <option value="" disabled>
                Apply template
              </option>
              {Object.keys(SONG_FORM_TEMPLATES).map((template) => (
                <option key={template} value={template}>
                  {template}
                </option>
              ))}
            </select>
          </div>
          <div className="song-section-list">
            {draft.sections.map((section, index) => (
              <div key={`${section.type}-${index}`} className="song-section-row">
                <button
                  className={index === activeSectionIndex ? "secondary-button" : "ghost-button"}
                  onClick={() => setActiveSectionIndex(index)}
                >
                  {section.type}
                </button>
                <button className="ghost-button" onClick={() => moveSection(index, -1)}>
                  ↑
                </button>
                <button className="ghost-button" onClick={() => moveSection(index, 1)}>
                  ↓
                </button>
                <button className="ghost-button" onClick={() => removeSection(index)}>
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className="toolbar-cluster">
            <button className="ghost-button" onClick={() => addSection("Verse")}>
              + Verse
            </button>
            <button className="ghost-button" onClick={() => addSection("Pre-Chorus")}>
              + Pre
            </button>
            <button className="ghost-button" onClick={() => addSection("Chorus")}>
              + Chorus
            </button>
            <button className="ghost-button" onClick={() => addSection("Bridge")}>
              + Bridge
            </button>
            <button className="ghost-button" onClick={() => addSection("Outro")}>
              + Outro
            </button>
          </div>
          <textarea
            className="song-lyrics-area"
            value={activeSection?.lyrics ?? ""}
            onChange={(event) => updateSectionLyrics(activeSectionIndex, event.target.value)}
            placeholder="Write lyrics for the active section..."
          />
          <textarea
            className="song-notes-area"
            value={draft.notes}
            onChange={(event) => updateDraft("notes", event.target.value)}
            placeholder="Production or arrangement notes..."
          />
        </article>

        <div className="songwriting-sidebar">
          <article className="detail-card">
            <div className="detail-header">
              <div>
                <span className="summary-label">Methods</span>
                <h2>Writing prompts</h2>
              </div>
            </div>
            <div className="song-tool-list">
              {SONGWRITING_METHODS.map((method) => (
                <button
                  key={method.name}
                  className={`song-tool-button ${lastMethod === method.name ? "is-active" : ""}`}
                  onClick={() => applyMethod(method.name)}
                >
                  <strong>{method.name}</strong>
                  <span>{method.focus}</span>
                </button>
              ))}
            </div>
            <div className="song-callout">
              <strong>Object Prompt</strong>
              <p>{draft.objectPrompt || "Run Object Writing to generate a sensory writing prompt."}</p>
            </div>
          </article>

          <article className="detail-card">
            <div className="detail-header">
              <div>
                <span className="summary-label">Hooks & Titles</span>
                <h2>Idea generators</h2>
              </div>
            </div>
            <div className="toolbar-cluster">
              <button className="ghost-button" onClick={() => setTitleIdeas(generateSongTitleIdeas(draft))}>
                Generate Titles
              </button>
              <button className="ghost-button" onClick={() => setHookIdeas(generateHookIdeas(draft))}>
                Generate Hooks
              </button>
              <button className="ghost-button" onClick={() => setLineStarters(generateLineStarters(draft))}>
                Generate Lines
              </button>
            </div>
            <div className="song-chip-list">
              {titleIdeas.map((idea) => (
                <button key={idea} className="scale-token" onClick={() => updateDraft("title", idea)}>
                  {idea}
                </button>
              ))}
            </div>
            <div className="song-list-block">
              {hookIdeas.map((idea) => (
                <button key={idea} className="finder-result-card" onClick={() => updateDraft("hookLine", idea)}>
                  <strong>{idea}</strong>
                  <small>Use as hook</small>
                </button>
              ))}
              {lineStarters.map((idea) => (
                <button key={idea} className="finder-result-card" onClick={() => insertIntoActiveLyrics(idea)}>
                  <strong>{idea}</strong>
                  <small>Insert in lyrics</small>
                </button>
              ))}
            </div>
          </article>

          <article className="detail-card">
            <div className="detail-header">
              <div>
                <span className="summary-label">Prosody & Rhyme</span>
                <h2>Section diagnostics</h2>
              </div>
              <select value={draft.rhymeType} onChange={(event) => updateDraft("rhymeType", event.target.value)}>
                {RHYME_TYPE_REFERENCE.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="toolbar-cluster">
              <button className="ghost-button" onClick={() => setProsody(runSongProsodyCheck(activeSection?.lyrics ?? ""))}>
                Scan Prosody
              </button>
            </div>
            <div className="info-chip-row">
              <span className="info-chip">Scheme {rhymeScheme.scheme || "-"}</span>
              <span className="info-chip">{lineMetrics.length} lines</span>
              <span className="info-chip">{activeSection?.lyrics.length ?? 0} chars</span>
            </div>
            <div className="song-callout">
              <strong>{prosody?.message ?? "No analysis yet"}</strong>
              <p>{prosody ? `${prosody.score}/100` : "Run the scan to score line consistency."}</p>
              {prosody?.details.map((detail) => (
                <small key={detail}>{detail}</small>
              ))}
            </div>
            <div className="song-metrics-list">
              {lineMetrics.map((metric) => (
                <div key={metric.line} className="song-metric-row">
                  <span>L{metric.line}</span>
                  <span>{metric.syllables} syllables</span>
                  <span>{metric.words} words</span>
                  <span>{metric.endWord || "-"}</span>
                </div>
              ))}
            </div>
            <div className="song-chip-list">
              {endWords.map(([word, count]) => (
                <span key={word} className="info-chip">
                  {word} × {count}
                </span>
              ))}
            </div>
          </article>

          <article className="detail-card">
            <div className="detail-header">
              <div>
                <span className="summary-label">Harmony & Melody</span>
                <h2>{draft.style}</h2>
              </div>
            </div>
            <div className="toolbar-cluster">
              <button
                className="ghost-button"
                onClick={() => {
                  const progression = generateSongProgression(draft.style);
                  if (progression) updateDraft("selectedProgression", progression.name);
                }}
              >
                Generate Progression
              </button>
              <button
                className="ghost-button"
                onClick={() => {
                  const sketch = generateMelodySketch(currentKey);
                  updateDraft("notes", `${draft.notes}${draft.notes ? "\n" : ""}--- Melody Sketch ---\n${sketch.text}\n`);
                  playNoteSequence(sketch.melody.map((note) => `${note}4`), 400, 280);
                }}
              >
                Melody Sketch
              </button>
            </div>
            <div className="song-list-block">
              {progressionOptions.map((progression, index) => (
                <button
                  key={`${progression.name}-${index}`}
                  className={`finder-result-card ${draft.selectedProgression === progression.name ? "is-selected" : ""}`}
                  onClick={() => updateDraft("selectedProgression", progression.name)}
                >
                  <strong>{progression.name}</strong>
                  <small>{progression.desc}</small>
                </button>
              ))}
            </div>
            {selectedProgression ? (
              <div className="song-callout">
                <strong>{selectedProgression.name}</strong>
                <p>{selectedProgression.desc}</p>
                <div className="toolbar-cluster">
                  <button
                    className="ghost-button"
                    onClick={() => playProgression(resolvedProgression.map((chord) => chord.notes))}
                  >
                    Play in {currentKey}
                  </button>
                </div>
                <div className="song-chip-list">
                  {resolvedProgression.map((chord) => (
                    <span key={chord.name} className="info-chip">
                      {chord.name}
                    </span>
                  ))}
                </div>
                {progressionAnalysis ? (
                  <div className="song-chip-list">
                    {progressionAnalysis.functions.map((role, index) => (
                      <span key={`${role}-${index}`} className="info-chip">
                        {selectedProgression.numerals[index]}: {role}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}
          </article>

          <article className="detail-card">
            <div className="detail-header">
              <div>
                <span className="summary-label">Mood Palette</span>
                <h2>{draft.mood}</h2>
              </div>
            </div>
            <div className="song-chip-list">
              {moodPalette.verbs.map((verb) => (
                <span key={verb} className="scale-token">
                  {verb}
                </span>
              ))}
            </div>
            <div className="song-chip-list">
              {moodPalette.images.map((image) => (
                <span key={image} className="info-chip">
                  {image}
                </span>
              ))}
            </div>
            <p className="card-copy">Emotion target: {moodPalette.emotion}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
