import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { playMetronomeClick, stopAllAudio } from "../../audio/audioEngine";
import { useAppStore } from "../../app/store/useAppStore";
import {
  SYNCOPATION_PATTERNS,
  SLICER_PRESETS,
  TUPLET_PRESETS,
  buildPolyrhythmTimeline,
  createRandomSlicerPattern,
  createRandomSyncopationPattern,
  cycleAccentLevel,
  leastCommonMultiple,
} from "../../domain/rhythm";

type RhythmTab = "polyrhythm" | "syncopation" | "tuplets" | "slicer";

const RHYTHM_TABS: { id: RhythmTab; label: string; copy: string }[] = [
  {
    id: "polyrhythm",
    label: "Polyrhythm",
    copy: "Overlay two pulse counts and hear where they align or pull apart.",
  },
  {
    id: "syncopation",
    label: "Syncopation",
    copy: "Study displaced accents and common off-beat groove shapes.",
  },
  {
    id: "tuplets",
    label: "Tuplets",
    copy: "Feel non-binary subdivisions against a fixed underlying pulse.",
  },
  {
    id: "slicer",
    label: "Beat Slicer",
    copy: "Sketch an accent map and loop it like a rhythmic sequencer.",
  },
];

export function RhythmicLabPage() {
  const tempo = useAppStore((state) => state.tempo);
  const [activeTab, setActiveTab] = useState<RhythmTab>("polyrhythm");
  const [running, setRunning] = useState(false);
  const [cursor, setCursor] = useState(0);

  const [polyA, setPolyA] = useState(3);
  const [polyB, setPolyB] = useState(4);

  const [syncPatternId, setSyncPatternId] = useState(SYNCOPATION_PATTERNS[0].id);
  const [randomSyncPattern, setRandomSyncPattern] = useState<number[]>(() =>
    createRandomSyncopationPattern(),
  );

  const [tupletType, setTupletType] = useState(3);
  const [tupletAgainst, setTupletAgainst] = useState(2);

  const [slicerPattern, setSlicerPattern] = useState<number[]>(() => SLICER_PRESETS[0].pattern);

  const timerRef = useRef<number | null>(null);
  const activeTabRef = useRef<RhythmTab>(activeTab);
  const polyTimelineRef = useRef(buildPolyrhythmTimeline(polyA, polyB));
  const syncPatternRef = useRef(randomSyncPattern);
  const slicerPatternRef = useRef(slicerPattern);
  const tempoRef = useRef(tempo);
  const tupletTypeRef = useRef(tupletType);
  const tupletAgainstRef = useRef(tupletAgainst);

  const polyTimeline = useMemo(() => buildPolyrhythmTimeline(polyA, polyB), [polyA, polyB]);
  const syncPattern = useMemo(() => {
    if (syncPatternId === "random") return randomSyncPattern;
    return (
      SYNCOPATION_PATTERNS.find((pattern) => pattern.id === syncPatternId)?.beats ??
      SYNCOPATION_PATTERNS[0].beats
    );
  }, [randomSyncPattern, syncPatternId]);
  const syncLabel =
    syncPatternId === "random"
      ? "Random Challenge"
      : SYNCOPATION_PATTERNS.find((pattern) => pattern.id === syncPatternId)?.label ??
        SYNCOPATION_PATTERNS[0].label;
  const syncDescription =
    syncPatternId === "random"
      ? "Generated on the fly for ear-and-body timing drills."
      : SYNCOPATION_PATTERNS.find((pattern) => pattern.id === syncPatternId)?.desc ??
        SYNCOPATION_PATTERNS[0].desc;
  const currentTuplet =
    TUPLET_PRESETS.find(
      (preset) => preset.type === tupletType && preset.against === tupletAgainst,
    ) ?? {
      type: tupletType,
      against: tupletAgainst,
      name: `${tupletType}:${tupletAgainst}`,
      desc: "Custom tuplet ratio.",
    };

  useEffect(() => {
    activeTabRef.current = activeTab;
  }, [activeTab]);

  useEffect(() => {
    polyTimelineRef.current = polyTimeline;
  }, [polyTimeline]);

  useEffect(() => {
    syncPatternRef.current = syncPattern;
  }, [syncPattern]);

  useEffect(() => {
    slicerPatternRef.current = slicerPattern;
  }, [slicerPattern]);

  useEffect(() => {
    tempoRef.current = tempo;
  }, [tempo]);

  useEffect(() => {
    tupletTypeRef.current = tupletType;
  }, [tupletType]);

  useEffect(() => {
    tupletAgainstRef.current = tupletAgainst;
  }, [tupletAgainst]);

  useEffect(
    () => () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      stopAllAudio();
    },
    [],
  );

  useEffect(() => {
    if (!running) return;
    resetTransport();
  }, [activeTab, polyA, polyB, syncPatternId, randomSyncPattern, slicerPattern, tupletAgainst, tupletType]);

  function clearTransport() {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = null;
  }

  function stopTransport() {
    clearTransport();
    setRunning(false);
    setCursor(0);
    stopAllAudio();
  }

  function stepTransport(step = 0) {
    const tab = activeTabRef.current;
    setCursor(step);

    if (tab === "polyrhythm") {
      const timeline = polyTimelineRef.current;
      const current = timeline[step % timeline.length];
      if (current.a && current.b) {
        playMetronomeClick("primary");
      } else if (current.a) {
        playMetronomeClick("secondary");
      } else if (current.b) {
        playMetronomeClick("subdivision");
      }

      const total = leastCommonMultiple(polyA, polyB);
      const subdivisionMs = (60000 / Math.max(tempoRef.current, 40)) / total;
      timerRef.current = window.setTimeout(
        () => stepTransport((step + 1) % timeline.length),
        Math.max(24, subdivisionMs),
      );
      return;
    }

    if (tab === "syncopation") {
      const pattern = syncPatternRef.current;
      if (pattern[step]) playMetronomeClick("primary");
      else playMetronomeClick("subdivision");
      timerRef.current = window.setTimeout(
        () => stepTransport((step + 1) % pattern.length),
        Math.max(40, 60000 / Math.max(tempoRef.current, 40) / 2),
      );
      return;
    }

    if (tab === "tuplets") {
      playMetronomeClick(step % tupletTypeRef.current === 0 ? "primary" : "secondary");
      const tupletMs =
        (60000 / Math.max(tempoRef.current, 40)) *
        (tupletAgainstRef.current / tupletTypeRef.current);
      timerRef.current = window.setTimeout(
        () => stepTransport((step + 1) % tupletTypeRef.current),
        Math.max(28, tupletMs),
      );
      return;
    }

    const pattern = slicerPatternRef.current;
    const level = pattern[step];
    if (level >= 0.85) playMetronomeClick("primary");
    else if (level >= 0.45) playMetronomeClick("secondary");
    else if (level > 0) playMetronomeClick("subdivision");
    timerRef.current = window.setTimeout(
      () => stepTransport((step + 1) % pattern.length),
      Math.max(40, 60000 / Math.max(tempoRef.current, 40) / 2),
    );
  }

  function resetTransport() {
    clearTransport();
    setCursor(0);
    if (!running) return;
    stepTransport(0);
  }

  function toggleTransport() {
    if (running) {
      stopTransport();
      return;
    }
    setRunning(true);
    setCursor(0);
    stepTransport(0);
  }

  function applyTupletPreset(type: number, against: number) {
    setTupletType(type);
    setTupletAgainst(against);
  }

  function applySlicerPreset(patternId: string) {
    const preset = SLICER_PRESETS.find((entry) => entry.id === patternId);
    if (!preset) return;
    setSlicerPattern([...preset.pattern]);
  }

  function randomizeSync() {
    setSyncPatternId("random");
    setRandomSyncPattern(createRandomSyncopationPattern());
  }

  function randomizeSlicer() {
    setSlicerPattern(createRandomSlicerPattern());
  }

  function updateSlicerStep(index: number) {
    setSlicerPattern((current) =>
      current.map((value, step) => (step === index ? cycleAccentLevel(value) : value)),
    );
  }

  return (
    <section className="page-section">
      <div className="page-hero">
        <div>
          <span className="eyebrow">Source Feature</span>
          <h1>Rhythmic Lab</h1>
          <p>
            Polyrhythms, syncopation, tuplets, and accent slicing now run source-side instead of
            living only in the legacy runtime.
          </p>
        </div>
        <div className="hero-actions">
          <button className="primary-button" onClick={toggleTransport}>
            {running ? "Stop" : "Play"}
          </button>
          <button className="ghost-button" onClick={stopTransport}>
            Reset
          </button>
        </div>
      </div>

      <div className="summary-grid">
        <article className="summary-card">
          <span className="summary-label">Current Drill</span>
          <h2>{RHYTHM_TABS.find((tab) => tab.id === activeTab)?.label}</h2>
          <p>{RHYTHM_TABS.find((tab) => tab.id === activeTab)?.copy}</p>
        </article>
        <article className="summary-card">
          <span className="summary-label">Tempo</span>
          <h2>{tempo} BPM</h2>
          <p>Uses the shared global tempo from the source app toolbar.</p>
        </article>
        <article className="summary-card">
          <span className="summary-label">Transport</span>
          <h2>{running ? "Running" : "Stopped"}</h2>
          <p>
            {activeTab === "polyrhythm"
              ? `${polyA}:${polyB} ratio`
              : activeTab === "syncopation"
                ? syncLabel
                : activeTab === "tuplets"
                  ? `${tupletType} in the space of ${tupletAgainst}`
                  : `${slicerPattern.filter((value) => value > 0).length} active accents`}
          </p>
        </article>
      </div>

      <article className="detail-card">
        <div className="detail-header">
          <div>
            <span className="summary-label">Modes</span>
            <h2>Select a rhythm drill</h2>
          </div>
        </div>
        <div className="segmented-button-row">
          {RHYTHM_TABS.map((tab) => (
            <button
              key={tab.id}
              className={activeTab === tab.id ? "secondary-button" : "ghost-button"}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </article>

      {activeTab === "polyrhythm" ? (
        <div className="feature-grid">
          <article className="detail-card">
            <div className="detail-header">
              <div>
                <span className="summary-label">Ratio</span>
                <h2>{polyA}:{polyB}</h2>
                <p>{leastCommonMultiple(polyA, polyB)} shared subdivisions per cycle.</p>
              </div>
            </div>
            <div className="metronome-config-grid">
              <label className="range-field">
                <span>Pulse A</span>
                <input
                  type="range"
                  min="1"
                  max="12"
                  value={polyA}
                  onChange={(event) => setPolyA(Number.parseInt(event.target.value, 10))}
                />
              </label>
              <label className="range-field">
                <span>Pulse B</span>
                <input
                  type="range"
                  min="1"
                  max="12"
                  value={polyB}
                  onChange={(event) => setPolyB(Number.parseInt(event.target.value, 10))}
                />
              </label>
            </div>
            <div
              className="rhythm-dual-grid"
              style={{ "--rhythm-columns": polyTimeline.length } as CSSProperties}
            >
              {polyTimeline.map((step, index) => (
                <button
                  key={`poly-a-${index}`}
                  className={`rhythm-step ${step.a ? "is-hit is-primary" : ""} ${cursor === index ? "is-active" : ""}`}
                  onClick={() => setCursor(index)}
                >
                  {step.a ? "A" : "·"}
                </button>
              ))}
              {polyTimeline.map((step, index) => (
                <button
                  key={`poly-b-${index}`}
                  className={`rhythm-step ${step.b ? "is-hit is-secondary" : ""} ${cursor === index ? "is-active" : ""}`}
                  onClick={() => setCursor(index)}
                >
                  {step.b ? "B" : "·"}
                </button>
              ))}
            </div>
          </article>

          <article className="detail-card">
            <div className="detail-header">
              <div>
                <span className="summary-label">Listening</span>
                <h2>What to notice</h2>
              </div>
            </div>
            <div className="theory-guide-list-block">
              <ul className="theory-guide-list">
                <li>Primary clicks mark the alignment points where both pulse cycles meet.</li>
                <li>Try `3:2`, `3:4`, and `5:4` before pushing to denser ratios.</li>
                <li>Keep one pulse in your body and count the other out loud for real retention.</li>
              </ul>
            </div>
          </article>
        </div>
      ) : null}

      {activeTab === "syncopation" ? (
        <div className="feature-grid">
          <article className="detail-card">
            <div className="detail-header">
              <div>
                <span className="summary-label">Pattern</span>
                <h2>{syncLabel}</h2>
                <p>{syncDescription}</p>
              </div>
              <button className="ghost-button" onClick={randomizeSync}>
                Random Challenge
              </button>
            </div>
            <div className="quality-picker-grid">
              {SYNCOPATION_PATTERNS.map((pattern) => (
                <button
                  key={pattern.id}
                  className={syncPatternId === pattern.id ? "secondary-button" : "ghost-button"}
                  onClick={() => setSyncPatternId(pattern.id)}
                >
                  {pattern.label}
                </button>
              ))}
            </div>
            <div className="rhythm-step-grid">
              {syncPattern.map((hit, index) => (
                <div
                  key={`sync-${index}`}
                  className={`rhythm-step ${hit ? "is-hit is-accent" : ""} ${cursor === index ? "is-active" : ""}`}
                >
                  <strong>{index + 1}</strong>
                  <small>{hit ? "hit" : "rest"}</small>
                </div>
              ))}
            </div>
          </article>

          <article className="detail-card">
            <div className="detail-header">
              <div>
                <span className="summary-label">Practice</span>
                <h2>Internalize the displacement</h2>
              </div>
            </div>
            <div className="theory-guide-list-block">
              <ul className="theory-guide-list">
                <li>Clap the pulse first, then add the accents without losing the grid.</li>
                <li>Patterns with empty downbeats feel unstable until you anchor them physically.</li>
                <li>Use the random challenge once the fixed shapes stop feeling difficult.</li>
              </ul>
            </div>
          </article>
        </div>
      ) : null}

      {activeTab === "tuplets" ? (
        <div className="feature-grid">
          <article className="detail-card">
            <div className="detail-header">
              <div>
                <span className="summary-label">Ratio</span>
                <h2>
                  {tupletType}:{tupletAgainst}
                </h2>
                <p>{currentTuplet.desc}</p>
              </div>
            </div>
            <div className="metronome-config-grid">
              <label className="range-field">
                <span>Tuplet Count</span>
                <input
                  type="range"
                  min="3"
                  max="12"
                  value={tupletType}
                  onChange={(event) => setTupletType(Number.parseInt(event.target.value, 10))}
                />
              </label>
              <label className="select-field">
                <span>Against</span>
                <select
                  value={tupletAgainst}
                  onChange={(event) => setTupletAgainst(Number.parseInt(event.target.value, 10))}
                >
                  {[2, 4, 8].map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="quality-picker-grid">
              {TUPLET_PRESETS.map((preset) => (
                <button
                  key={`${preset.type}-${preset.against}`}
                  className={
                    preset.type === tupletType && preset.against === tupletAgainst
                      ? "secondary-button"
                      : "ghost-button"
                  }
                  onClick={() => applyTupletPreset(preset.type, preset.against)}
                >
                  {preset.name}
                </button>
              ))}
            </div>
            <div className="rhythm-step-grid rhythm-step-grid--dense">
              {Array.from({ length: tupletType }, (_, index) => (
                <div
                  key={`tuplet-${index}`}
                  className={`rhythm-step is-hit is-primary ${cursor === index ? "is-active" : ""}`}
                >
                  <strong>{index + 1}</strong>
                  <small>pulse</small>
                </div>
              ))}
            </div>
          </article>

          <article className="detail-card">
            <div className="detail-header">
              <div>
                <span className="summary-label">Timing</span>
                <h2>{currentTuplet.name}</h2>
                <p>
                  Each note lasts{" "}
                  {Math.round(((60000 / Math.max(tempo, 40)) * tupletAgainst) / tupletType)} ms at
                  the current tempo.
                </p>
              </div>
            </div>
            <div className="theory-guide-list-block">
              <ul className="theory-guide-list">
                <li>Count the container pulse first: what note-value space are you dividing?</li>
                <li>Triplets should feel even, not rushed at the end.</li>
                <li>Odd tuplets get easier when you speak them in one breath instead of syllable by syllable.</li>
              </ul>
            </div>
          </article>
        </div>
      ) : null}

      {activeTab === "slicer" ? (
        <div className="feature-grid">
          <article className="detail-card">
            <div className="detail-header">
              <div>
                <span className="summary-label">Accent Map</span>
                <h2>8-step Beat Slicer</h2>
                <p>Click a step to cycle through rest, light, medium, and strong accents.</p>
              </div>
              <button className="ghost-button" onClick={randomizeSlicer}>
                Randomize
              </button>
            </div>
            <div className="quality-picker-grid">
              {SLICER_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  className="ghost-button"
                  onClick={() => applySlicerPreset(preset.id)}
                >
                  {preset.label}
                </button>
              ))}
            </div>
            <div className="rhythm-step-grid">
              {slicerPattern.map((level, index) => (
                <button
                  key={`slice-${index}`}
                  className={`rhythm-step ${level > 0 ? "is-hit" : ""} ${level >= 0.85 ? "is-primary" : level >= 0.45 ? "is-secondary" : ""} ${cursor === index ? "is-active" : ""}`}
                  onClick={() => updateSlicerStep(index)}
                >
                  <strong>{index + 1}</strong>
                  <small>{level === 0 ? "rest" : `${Math.round(level * 100)}%`}</small>
                </button>
              ))}
            </div>
          </article>

          <article className="detail-card">
            <div className="detail-header">
              <div>
                <span className="summary-label">Use</span>
                <h2>Loop and feel the contour</h2>
              </div>
            </div>
            <div className="theory-guide-list-block">
              <ul className="theory-guide-list">
                <li>Strong accents trigger the primary click, medium accents the secondary click.</li>
                <li>Use this to sketch hi-hat emphasis, comping hits, or vocal phrasing stress.</li>
                <li>The useful question is not “is it complex?” but “does the loop breathe correctly?”</li>
              </ul>
            </div>
          </article>
        </div>
      ) : null}
    </section>
  );
}
