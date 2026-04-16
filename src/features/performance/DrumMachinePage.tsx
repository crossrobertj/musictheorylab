import { useEffect, useMemo, useRef, useState } from "react";
import { playDrumHit, stopAllAudio } from "../../audio/audioEngine";
import { useAppStore } from "../../app/store/useAppStore";
import {
  DRUM_PATTERN_LIBRARY,
  DRUM_TRACKS,
  buildDrumMidiFromGrid,
  cloneDrumGrid,
  createEmptyDrumGrid,
  cycleStepVelocity,
  getStepsForTimeSignature,
  humanizeDrumGrid,
  randomizeDrumPattern,
  resizeDrumGrid,
  type DrumGrid,
} from "../../domain/drums";

function downloadMidi(data: Uint8Array, filename: string) {
  const payload = new Uint8Array(data);
  const blob = new Blob([payload.buffer], { type: "audio/midi" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

export function DrumMachinePage() {
  const tempo = useAppStore((state) => state.tempo);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedPatternId, setSelectedPatternId] = useState("DM-001");
  const [timeSignature, setTimeSignature] = useState("4/4");
  const [steps, setSteps] = useState(16);
  const [swing, setSwing] = useState(0);
  const [humanizeEnabled, setHumanizeEnabled] = useState(false);
  const [loopBars, setLoopBars] = useState(4);
  const [running, setRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [grid, setGrid] = useState<DrumGrid>(() => cloneDrumGrid(DRUM_PATTERN_LIBRARY[0].grid));

  const gridRef = useRef(grid);
  const swingRef = useRef(swing);
  const humanizeRef = useRef(humanizeEnabled);
  const tempoRef = useRef(tempo);
  const stepsRef = useRef(steps);
  const stepCursorRef = useRef(0);
  const runningRef = useRef(running);
  const loopHandleRef = useRef<number | null>(null);

  const categories = useMemo(
    () => ["All", ...new Set(DRUM_PATTERN_LIBRARY.map((pattern) => pattern.category))],
    [],
  );

  const filteredPatterns = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    const matches = DRUM_PATTERN_LIBRARY.filter((pattern) => {
      if (category !== "All" && pattern.category !== category) return false;
      if (!normalizedSearch) return true;
      return `${pattern.id} ${pattern.name} ${pattern.category} ${pattern.subcategory}`
        .toLowerCase()
        .includes(normalizedSearch);
    });
    return matches.length > 0 ? matches : DRUM_PATTERN_LIBRARY;
  }, [category, search]);

  const selectedPattern =
    DRUM_PATTERN_LIBRARY.find((pattern) => pattern.id === selectedPatternId) ?? DRUM_PATTERN_LIBRARY[0];
  const stepsPerBeat = timeSignature.endsWith("/8") ? 2 : 4;

  useEffect(() => {
    gridRef.current = grid;
  }, [grid]);

  useEffect(() => {
    swingRef.current = swing;
  }, [swing]);

  useEffect(() => {
    humanizeRef.current = humanizeEnabled;
  }, [humanizeEnabled]);

  useEffect(() => {
    tempoRef.current = tempo;
  }, [tempo]);

  useEffect(() => {
    stepsRef.current = steps;
  }, [steps]);

  useEffect(() => {
    runningRef.current = running;
  }, [running]);

  useEffect(() => {
    if (!filteredPatterns.some((pattern) => pattern.id === selectedPatternId)) {
      const nextPattern = filteredPatterns[0];
      stopLoop();
      setSelectedPatternId(nextPattern.id);
      setGrid(cloneDrumGrid(nextPattern.grid));
      setSteps(nextPattern.steps);
      setTimeSignature(nextPattern.steps === 16 ? "4/4" : timeSignature);
    }
  }, [filteredPatterns, selectedPatternId, timeSignature]);

  useEffect(
    () => () => {
      if (loopHandleRef.current) window.clearTimeout(loopHandleRef.current);
      stopAllAudio();
    },
    [],
  );

  function stopLoop() {
    if (loopHandleRef.current) window.clearTimeout(loopHandleRef.current);
    loopHandleRef.current = null;
    runningRef.current = false;
    setRunning(false);
    stepCursorRef.current = 0;
    setCurrentStep(0);
    stopAllAudio();
  }

  function playStep(step: number) {
    DRUM_TRACKS.forEach((track) => {
      const value = gridRef.current[track.id][step] || 0;
      if (value <= 0) return;

      let velocity = value;
      if (humanizeRef.current) {
        velocity *= 0.4 + Math.random() * 0.6;
      }

      playDrumHit(track.id, velocity);
    });
  }

  function scheduleNextStep() {
    if (!runningRef.current) return;

    const step = stepCursorRef.current;
    playStep(step);
    setCurrentStep(step);
    stepCursorRef.current = (step + 1) % stepsRef.current;

    const base = 60000 / Math.max(tempoRef.current, 40) / 4;
    const swingFactor = Math.max(0, Math.min(0.45, (swingRef.current / 100) * 0.5));
    const duration = base * (step % 2 === 0 ? 1 - swingFactor : 1 + swingFactor);
    loopHandleRef.current = window.setTimeout(scheduleNextStep, Math.max(10, duration));
  }

  function startLoop() {
    if (runningRef.current) return;
    stepCursorRef.current = 0;
    runningRef.current = true;
    setRunning(true);
    scheduleNextStep();
  }

  function toggleLoop() {
    if (runningRef.current) stopLoop();
    else startLoop();
  }

  function loadPattern(patternId: string) {
    const pattern = DRUM_PATTERN_LIBRARY.find((entry) => entry.id === patternId);
    if (!pattern) return;
    stopLoop();
    setSelectedPatternId(pattern.id);
    setGrid(cloneDrumGrid(pattern.grid));
    setSteps(pattern.steps);
    setTimeSignature(pattern.steps === 16 ? "4/4" : timeSignature);
  }

  function updateSignature(signature: string) {
    const nextSteps = getStepsForTimeSignature(signature);
    setTimeSignature(signature);
    setSteps(nextSteps);
    setGrid((current) => resizeDrumGrid(current, nextSteps));
    setCurrentStep(0);
    stepCursorRef.current = 0;
  }

  function toggleStep(trackId: keyof DrumGrid, step: number) {
    setGrid((current) => {
      const next = cloneDrumGrid(current);
      const velocity = next[trackId][step] || 0;
      const nextVelocity = cycleStepVelocity(velocity);
      next[trackId][step] = nextVelocity;
      if (nextVelocity > 0) playDrumHit(trackId, nextVelocity);
      return next;
    });
  }

  function clearPattern() {
    setGrid(createEmptyDrumGrid(steps));
  }

  function randomizePattern() {
    setGrid(randomizeDrumPattern(steps));
  }

  function humanizeGrid() {
    setGrid((current) => humanizeDrumGrid(current));
  }

  function exportMidi() {
    const bytes = buildDrumMidiFromGrid(grid, steps, loopBars, tempo);
    downloadMidi(bytes, `drum-machine-${selectedPatternId}.mid`);
  }

  return (
    <section className="page-section">
      <div className="page-hero">
        <div>
          <span className="eyebrow">Source Feature</span>
          <h1>Drum Machine</h1>
          <p>
            The sequencer is now source-side. Genre patterns, step editing, swing, humanize, and
            MIDI export all run without booting the legacy runtime.
          </p>
        </div>
        <div className="hero-actions">
          <button className="primary-button" onClick={toggleLoop}>
            {running ? "Stop" : "Play"}
          </button>
          <button className="ghost-button" onClick={exportMidi}>
            Export MIDI
          </button>
        </div>
      </div>

      <div className="summary-grid">
        <article className="summary-card">
          <span className="summary-label">Pattern</span>
          <h2>{selectedPattern.name}</h2>
          <p>
            {selectedPattern.id} • {selectedPattern.category} / {selectedPattern.subcategory}
          </p>
          <div className="info-chip-row">
            <span className="info-chip">{timeSignature}</span>
            <span className="info-chip">{steps} steps</span>
            <span className="info-chip">{tempo} BPM</span>
          </div>
        </article>

        <article className="summary-card">
          <span className="summary-label">Playback</span>
          <h2>{running ? "Running" : "Stopped"}</h2>
          <div className="info-chip-row">
            <span className="info-chip">Swing {swing}%</span>
            <span className="info-chip">{humanizeEnabled ? "Humanize On" : "Humanize Off"}</span>
            <span className="info-chip">Export {loopBars} bars</span>
          </div>
        </article>

        <article className="summary-card">
          <span className="summary-label">Library</span>
          <h2>{filteredPatterns.length} patterns</h2>
          <p>Filter by category or search by id/style, then load a preset into the editable grid below.</p>
        </article>
      </div>

      <article className="detail-card">
        <div className="detail-header">
          <div>
            <span className="summary-label">Pattern Browser</span>
            <h2>Load and shape a groove</h2>
          </div>
        </div>
        <div className="metronome-config-grid">
          <label className="select-field">
            <span>Category</span>
            <select value={category} onChange={(event) => setCategory(event.target.value)}>
              {categories.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>

          <label className="search-field">
            <span>Search</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="DM-001, House, Boom Bap..."
            />
          </label>

          <label className="select-field">
            <span>Pattern</span>
            <select value={selectedPatternId} onChange={(event) => loadPattern(event.target.value)}>
              {filteredPatterns.map((pattern) => (
                <option key={pattern.id} value={pattern.id}>
                  {pattern.id} • {pattern.category} / {pattern.subcategory} • {pattern.name}
                </option>
              ))}
            </select>
          </label>
        </div>
      </article>

      <article className="detail-card">
        <div className="detail-header">
          <div>
            <span className="summary-label">Transport</span>
            <h2>Meter, swing, and variation</h2>
          </div>
        </div>
        <div className="metronome-config-grid">
          <label className="select-field">
            <span>Meter</span>
            <select value={timeSignature} onChange={(event) => updateSignature(event.target.value)}>
              {["2/4", "3/4", "4/4", "5/4", "6/4", "7/4", "3/8", "5/8", "6/8", "7/8", "9/8", "11/8", "12/8", "13/8", "15/8"].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>

          <label className="range-field">
            <span>Swing</span>
            <input
              type="range"
              min="0"
              max="70"
              value={swing}
              onChange={(event) => setSwing(Number.parseInt(event.target.value, 10))}
            />
            <strong>{swing}%</strong>
          </label>

          <label className="range-field">
            <span>Export Bars</span>
            <input
              type="range"
              min="1"
              max="16"
              value={loopBars}
              onChange={(event) => setLoopBars(Number.parseInt(event.target.value, 10))}
            />
            <strong>{loopBars}</strong>
          </label>
        </div>
        <div className="hero-actions">
          <button
            className={humanizeEnabled ? "secondary-button" : "ghost-button"}
            onClick={() => setHumanizeEnabled((current) => !current)}
          >
            {humanizeEnabled ? "Humanize On" : "Humanize Off"}
          </button>
          <button className="ghost-button" onClick={humanizeGrid}>
            Humanize Grid
          </button>
          <button className="ghost-button" onClick={randomizePattern}>
            Experimental Random
          </button>
          <button className="ghost-button" onClick={clearPattern}>
            Clear
          </button>
        </div>
      </article>

      <article className="detail-card">
        <div className="detail-header">
          <div>
            <span className="summary-label">Step Grid</span>
            <h2>Editable sequencer</h2>
            <p>Track labels audition the sound. Step buttons cycle through velocity levels.</p>
          </div>
        </div>
        <div className="drum-grid-shell">
          <div className="drum-grid">
            {DRUM_TRACKS.map((track) => (
              <div
                className="drum-row"
                key={track.id}
                style={{
                  gridTemplateColumns: `112px repeat(${steps}, minmax(42px, 1fr))`,
                }}
              >
                <button
                  className="drum-track-button"
                  onClick={() => playDrumHit(track.id, 1)}
                  style={{ ["--track-color" as string]: track.color }}
                >
                  {track.name}
                </button>
                {Array.from({ length: steps }, (_, step) => {
                  const velocity = grid[track.id][step] || 0;
                  const active = velocity > 0;
                  const isCurrent = running && currentStep === step;
                  const isDownbeat = step % stepsPerBeat === 0;
                  return (
                    <button
                      key={`${track.id}-${step}`}
                      className={`drum-step ${active ? "is-active" : ""} ${isCurrent ? "is-current" : ""} ${isDownbeat ? "is-downbeat" : ""}`}
                      onClick={() => toggleStep(track.id, step)}
                      style={{ ["--track-color" as string]: track.color }}
                    >
                      <span
                        className="drum-step-meter"
                        style={{ height: `${Math.round(velocity * 100)}%`, opacity: active ? 1 : 0 }}
                      />
                      <span className="drum-step-label">{step + 1}</span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </article>
    </section>
  );
}
