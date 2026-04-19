import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { playDrumHit, stopAllAudio } from "../../audio/audioEngine";
import { useShellBridgeStore } from "../../app/store/useShellBridgeStore";
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
  const updateRoute = useShellBridgeStore((state) => state.updateRoute);
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
  const selectedPatternSummary = `${selectedPattern.id} • ${selectedPattern.category} / ${selectedPattern.subcategory} • ${selectedPattern.name}`;
  const playableLabel = useMemo(() => {
    const hasActiveSteps = Object.values(grid).some((track) => track.some((velocity) => velocity > 0));
    return hasActiveSteps ? selectedPatternSummary : "Empty drum grid";
  }, [grid, selectedPatternSummary]);

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

  const stopLoop = useCallback(() => {
    if (loopHandleRef.current) window.clearTimeout(loopHandleRef.current);
    loopHandleRef.current = null;
    runningRef.current = false;
    setRunning(false);
    stepCursorRef.current = 0;
    setCurrentStep(0);
    stopAllAudio();
  }, []);

  const playStep = useCallback((step: number) => {
    DRUM_TRACKS.forEach((track) => {
      const value = gridRef.current[track.id][step] || 0;
      if (value <= 0) return;

      let velocity = value;
      if (humanizeRef.current) {
        velocity *= 0.4 + Math.random() * 0.6;
      }

      playDrumHit(track.id, velocity);
    });
  }, []);

  const scheduleNextStep = useCallback(() => {
    if (!runningRef.current) return;

    const step = stepCursorRef.current;
    playStep(step);
    setCurrentStep(step);
    stepCursorRef.current = (step + 1) % stepsRef.current;

    const base = 60000 / Math.max(tempoRef.current, 40) / 4;
    const swingFactor = Math.max(0, Math.min(0.45, (swingRef.current / 100) * 0.5));
    const duration = base * (step % 2 === 0 ? 1 - swingFactor : 1 + swingFactor);
    loopHandleRef.current = window.setTimeout(scheduleNextStep, Math.max(10, duration));
  }, [playStep]);

  const startLoop = useCallback(() => {
    if (runningRef.current) return;
    stepCursorRef.current = 0;
    runningRef.current = true;
    setRunning(true);
    scheduleNextStep();
  }, [scheduleNextStep]);

  const toggleLoop = useCallback(() => {
    if (runningRef.current) stopLoop();
    else startLoop();
  }, [startLoop, stopLoop]);

  const playCurrent = useCallback(() => {
    toggleLoop();
  }, [toggleLoop]);

  const clearPattern = useCallback(() => {
    stopLoop();
    setGrid(createEmptyDrumGrid(stepsRef.current));
  }, [stopLoop]);

  useEffect(() => {
    if (!filteredPatterns.some((pattern) => pattern.id === selectedPatternId)) {
      const nextPattern = filteredPatterns[0];
      stopLoop();
      setSelectedPatternId(nextPattern.id);
      setGrid(cloneDrumGrid(nextPattern.grid));
      setSteps(nextPattern.steps);
      setTimeSignature(nextPattern.steps === 16 ? "4/4" : timeSignature);
    }
  }, [filteredPatterns, selectedPatternId, stopLoop, timeSignature]);

  useEffect(() => {
    updateRoute("drums", {
      title: "Drum Machine",
      subtitle: "260 labeled patterns categorized by style with editable 16-step sequencing and loop playback.",
      playableLabel,
      playableNoteSet: [],
      playCurrent,
      clear: clearPattern,
    });
  }, [clearPattern, playCurrent, playableLabel, updateRoute]);

  useEffect(
    () => () => {
      if (loopHandleRef.current) window.clearTimeout(loopHandleRef.current);
      stopAllAudio();
    },
    [],
  );

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
      <article className="legacy-tool-panel">
        <div className="legacy-tool-panel__header">
          <div>
            <span className="eyebrow">Rhythm Sequencer</span>
            <h1 className="legacy-tool-panel__title">Drum Machine</h1>
            <p className="legacy-tool-panel__copy">
              Pattern browser on top, transport row under it, then the editable grid. This puts the
              drum page back into the older single-surface sequencer layout.
            </p>
          </div>
          <div className="legacy-toolbar-row">
            <span className="legacy-toolbar-chip">
              Pattern <strong>{selectedPattern.id}</strong>
            </span>
            <span className="legacy-toolbar-chip">
              Meter <strong>{timeSignature}</strong>
            </span>
            <span className="legacy-toolbar-chip">
              Tempo <strong>{tempo} BPM</strong>
            </span>
          </div>
        </div>
        <div className="metronome-config-grid legacy-form-grid">
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
        <div className="legacy-toolbar-row">
          <button className="primary-button" onClick={toggleLoop}>
            {running ? "Stop" : "Play"}
          </button>
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
          <button className="ghost-button" onClick={exportMidi}>
            Export MIDI
          </button>
        </div>
      </article>

      <div className="legacy-lab-grid">
        <article className="legacy-preview-panel">
          <div className="legacy-tool-panel__header">
            <div>
              <span className="summary-label">Selected Pattern</span>
              <h2>{selectedPattern.name}</h2>
              <p>
                {selectedPattern.id} • {selectedPattern.category} / {selectedPattern.subcategory}
              </p>
            </div>
          </div>
          <div className="legacy-preview-panel__meta">
            <span className="legacy-preview-chip">{timeSignature}</span>
            <span className="legacy-preview-chip">{steps} steps</span>
            <span className="legacy-preview-chip">Swing {swing}%</span>
            <span className="legacy-preview-chip">{running ? "Running" : "Stopped"}</span>
            <span className="legacy-preview-chip">Export {loopBars} bars</span>
          </div>
          <p className="legacy-catalog-card__subtitle">{selectedPatternSummary}</p>
        </article>

        <div className="legacy-selection-strip">
          <article className="legacy-selection-card">
            <span className="summary-label">Transport</span>
            <div className="metronome-config-grid legacy-form-grid">
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

              <label className="legacy-slider-card">
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

              <label className="legacy-slider-card">
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
          </article>

          <article className="legacy-selection-card">
            <span className="summary-label">Library</span>
            <h2>{filteredPatterns.length} patterns</h2>
            <div className="legacy-preview-panel__meta">
              <span className="legacy-preview-chip">{filteredPatterns.length} patterns</span>
              <span className="legacy-preview-chip">{humanizeEnabled ? "Humanize On" : "Humanize Off"}</span>
            </div>
            <p className="legacy-catalog-card__subtitle">
              Filter by category or search by id and style, then load a preset into the grid below.
            </p>
          </article>
        </div>
      </div>

      <article className="legacy-tool-panel">
        <div className="legacy-tool-panel__header">
          <div>
            <span className="summary-label">Step Grid</span>
            <h2>Editable Sequencer</h2>
            <p>Track labels audition each sound. Step buttons cycle through velocity levels.</p>
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
