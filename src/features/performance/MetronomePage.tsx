import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { playMetronomeClick, stopAllAudio } from "../../audio/audioEngine";
import { useAppStore } from "../../app/store/useAppStore";
import { useShellBridgeStore } from "../../app/store/useShellBridgeStore";

interface MetronomePreset {
  label: string;
  bpm: number;
  subdivision: number;
  signature: string;
  groups: number[];
  tip: string;
}

const SIGNATURE_GROUPS = [
  {
    label: "Simple",
    items: [
      { sig: "2/4", groups: [2] },
      { sig: "3/4", groups: [3] },
      { sig: "4/4", groups: [4] },
      { sig: "5/4", groups: [3, 2] },
    ],
  },
  {
    label: "Compound",
    items: [
      { sig: "6/8", groups: [3, 3] },
      { sig: "9/8", groups: [3, 3, 3] },
      { sig: "12/8", groups: [3, 3, 3, 3] },
    ],
  },
  {
    label: "Odd & Additive",
    items: [
      { sig: "7/8", groups: [2, 2, 3] },
      { sig: "11/8", groups: [3, 3, 3, 2] },
      { sig: "13/8", groups: [3, 3, 2, 2, 3] },
    ],
  },
] as const;

const METRONOME_PRESETS: MetronomePreset[] = [
  { label: "Largo 50", bpm: 50, subdivision: 1, signature: "4/4", groups: [4], tip: "Slow control" },
  { label: "Ballad 72", bpm: 72, subdivision: 2, signature: "4/4", groups: [4], tip: "Pop ballad" },
  { label: "Waltz 90", bpm: 90, subdivision: 1, signature: "3/4", groups: [3], tip: "Triple feel" },
  { label: "Hip-Hop 85", bpm: 85, subdivision: 2, signature: "4/4", groups: [4], tip: "Boom bap pocket" },
  { label: "6/8 Jig 108", bpm: 108, subdivision: 2, signature: "6/8", groups: [3, 3], tip: "Compound groove" },
  { label: "Pop 120", bpm: 120, subdivision: 2, signature: "4/4", groups: [4], tip: "Common practice" },
  { label: "House 128", bpm: 128, subdivision: 4, signature: "4/4", groups: [4], tip: "EDM grid" },
  { label: "7/8 Prog 140", bpm: 140, subdivision: 2, signature: "7/8", groups: [2, 2, 3], tip: "Odd-meter pulse" },
  { label: "Punk 180", bpm: 180, subdivision: 4, signature: "4/4", groups: [4], tip: "Fast stamina" },
];

const DEFAULT_TEMPO = 120;
const DEFAULT_SUBDIVISION = 1;
const DEFAULT_NUMERATOR = 4;
const DEFAULT_DENOMINATOR = 4;
const DEFAULT_ACCENT_GROUPS = [4];
const DEFAULT_CUSTOM_SIGNATURE = "4/4";
const DEFAULT_CUSTOM_GROUPS = "4";

function normalizeAccentGroups(numerator: number, groups: number[]) {
  const parsed = groups
    .map((value) => Number.parseInt(String(value), 10))
    .filter((value) => Number.isFinite(value) && value > 0);
  const total = parsed.reduce((sum, value) => sum + value, 0);
  return parsed.length > 0 && total === numerator ? parsed : [numerator];
}

function parseAccentGroupsText(text: string, numerator: number) {
  const groups = text
    .split(/[^0-9]+/)
    .filter(Boolean)
    .map((token) => Number.parseInt(token, 10))
    .filter((value) => Number.isFinite(value) && value > 0);
  return normalizeAccentGroups(numerator, groups);
}

function getAccentStarts(groups: number[]) {
  const starts = new Set([0]);
  let cursor = 0;
  for (const group of groups) {
    starts.add(cursor);
    cursor += group;
  }
  return starts;
}

function signatureValue(numerator: number, denominator: number, groups: number[]) {
  return `${numerator}/${denominator}|${groups.join("+")}`;
}

export function MetronomePage() {
  const tempo = useAppStore((state) => state.tempo);
  const setTempo = useAppStore((state) => state.setTempo);
  const soundEnabled = useAppStore((state) => state.soundEnabled);
  const updateRoute = useShellBridgeStore((state) => state.updateRoute);
  const [running, setRunning] = useState(false);
  const [subdivision, setSubdivision] = useState(DEFAULT_SUBDIVISION);
  const [numerator, setNumerator] = useState(DEFAULT_NUMERATOR);
  const [denominator, setDenominator] = useState(DEFAULT_DENOMINATOR);
  const [accentGroups, setAccentGroups] = useState<number[]>([...DEFAULT_ACCENT_GROUPS]);
  const [tickCount, setTickCount] = useState(0);
  const [customSignature, setCustomSignature] = useState(DEFAULT_CUSTOM_SIGNATURE);
  const [customGroups, setCustomGroups] = useState(DEFAULT_CUSTOM_GROUPS);
  const tapHistoryRef = useRef<number[]>([]);

  const currentSignature = `${numerator}/${denominator}`;
  const accentLabel = accentGroups.join("+");
  const accentStarts = useMemo(() => getAccentStarts(accentGroups), [accentGroups]);
  const activeBeat = Math.floor(tickCount / Math.max(1, subdivision)) % Math.max(1, numerator);
  const activeTickInBeat = tickCount % Math.max(1, subdivision);
  const subdivisionLabel = useMemo(() => {
    if (subdivision === 1) return "Quarter notes";
    if (subdivision === 2) return "Eighth notes";
    if (subdivision === 4) return "Sixteenth notes";
    return `${subdivision}x subdivision`;
  }, [subdivision]);
  const playableLabel = `${tempo} BPM • ${currentSignature} • ${subdivisionLabel} • accents ${accentLabel}`;

  useEffect(() => {
    setCustomSignature(currentSignature);
    setCustomGroups(accentLabel);
  }, [accentLabel, currentSignature]);

  useEffect(() => {
    if (!running) return undefined;

    const beatMs = (60000 / Math.max(tempo, 40)) * (4 / Math.max(1, denominator));
    const intervalMs = Math.max(20, Math.floor(beatMs / Math.max(1, subdivision)));

    const tick = () => {
      setTickCount((current) => {
        const beatIndex = Math.floor(current / Math.max(1, subdivision)) % Math.max(1, numerator);
        const tickInBeat = current % Math.max(1, subdivision);
        const isBeatStart = tickInBeat === 0;

        playMetronomeClick(
          isBeatStart
            ? accentStarts.has(beatIndex)
              ? "primary"
              : "secondary"
            : "subdivision",
        );

        return current + 1;
      });
    };

    tick();
    const timerId = window.setInterval(tick, intervalMs);
    return () => window.clearInterval(timerId);
  }, [accentStarts, denominator, numerator, running, subdivision, tempo]);

  useEffect(
    () => () => {
      stopAllAudio();
    },
    [],
  );

  const stopMetronome = useCallback(() => {
    setRunning(false);
    setTickCount(0);
    stopAllAudio();
  }, []);

  const toggleMetronome = useCallback(() => {
    if (running) {
      stopMetronome();
      return;
    }

    setTickCount(0);
    setRunning(true);
  }, [running, stopMetronome]);

  const clearMetronome = useCallback(() => {
    stopMetronome();
    setTempo(DEFAULT_TEMPO);
    setSubdivision(DEFAULT_SUBDIVISION);
    setNumerator(DEFAULT_NUMERATOR);
    setDenominator(DEFAULT_DENOMINATOR);
    setAccentGroups([...DEFAULT_ACCENT_GROUPS]);
    setCustomSignature(DEFAULT_CUSTOM_SIGNATURE);
    setCustomGroups(DEFAULT_CUSTOM_GROUPS);
    tapHistoryRef.current = [];
  }, [setTempo, stopMetronome]);

  useEffect(() => {
    updateRoute("metronome", {
      title: "Metronome",
      subtitle: "High-precision practice metronome.",
      playableLabel,
      playableNoteSet: [],
      playCurrent: toggleMetronome,
      clear: clearMetronome,
    });
  }, [clearMetronome, playableLabel, toggleMetronome, updateRoute]);

  function applySignature(n: number, d: number, groups: number[]) {
    const safeNumerator = Math.max(1, Math.min(32, n));
    const safeDenominator = [1, 2, 4, 8, 16, 32].includes(d) ? d : 4;
    setNumerator(safeNumerator);
    setDenominator(safeDenominator);
    setAccentGroups(normalizeAccentGroups(safeNumerator, groups));
    setTickCount(0);
  }

  function applyPreset(preset: MetronomePreset) {
    setTempo(preset.bpm);
    setSubdivision(preset.subdivision);
    const [rawNumerator, rawDenominator] = preset.signature.split("/");
    applySignature(
      Number.parseInt(rawNumerator, 10),
      Number.parseInt(rawDenominator, 10),
      preset.groups,
    );
  }

  function applySignatureSelection(value: string) {
    const [signature, groupsText] = value.split("|");
    if (!signature || !signature.includes("/")) return;
    const [rawNumerator, rawDenominator] = signature.split("/");
    const nextNumerator = Number.parseInt(rawNumerator, 10);
    const nextDenominator = Number.parseInt(rawDenominator, 10);
    applySignature(nextNumerator, nextDenominator, parseAccentGroupsText(groupsText, nextNumerator));
  }

  function applyCustomSignatureValue() {
    if (!/^\d+\s*\/\s*\d+$/.test(customSignature.trim())) return;
    const [rawNumerator, rawDenominator] = customSignature.split("/");
    const nextNumerator = Number.parseInt(rawNumerator, 10);
    const nextDenominator = Number.parseInt(rawDenominator, 10);
    applySignature(nextNumerator, nextDenominator, parseAccentGroupsText(customGroups, nextNumerator));
  }

  function tapTempo() {
    const now = Date.now();
    tapHistoryRef.current = [...tapHistoryRef.current, now].filter((stamp) => now - stamp <= 6000);
    if (tapHistoryRef.current.length < 2) return;

    const intervals = tapHistoryRef.current.slice(1).map((stamp, index) => stamp - tapHistoryRef.current[index]);
    const average = intervals.reduce((sum, value) => sum + value, 0) / intervals.length;
    setTempo(Math.max(40, Math.min(240, Math.round(60000 / average))));
  }

  return (
    <section className="page-section">
      <article className="legacy-tool-panel">
        <div className="legacy-tool-panel__header">
          <div>
            <span className="eyebrow">Practice Tool</span>
            <h1 className="legacy-tool-panel__title">Practice Metronome</h1>
            <p className="legacy-tool-panel__copy">
              Global tempo in the shell, dense meter controls in the page body, and the same
              start-stop plus preset flow the older tool used.
            </p>
          </div>
          <div className="legacy-toolbar-row">
            <span className="legacy-toolbar-chip">
              Status <strong>{running ? "Running" : "Stopped"}</strong>
            </span>
            <span className="legacy-toolbar-chip">
              Meter <strong>{currentSignature} meter</strong>
            </span>
            <span className="legacy-toolbar-chip">
              Grouping <strong>accent {accentLabel}</strong>
            </span>
            <span className="legacy-toolbar-chip">
              Audio <strong>{soundEnabled ? "On" : "Muted"}</strong>
            </span>
          </div>
        </div>
        <div className="legacy-toolbar-row">
          <button className="primary-button" onClick={toggleMetronome}>
            {running ? "Stop Metronome" : "Start Metronome"}
          </button>
          <button className="ghost-button" onClick={tapTempo}>
            Tap Tempo
          </button>
        </div>
      </article>

      <div className="legacy-lab-grid">
        <article className="legacy-preview-panel">
          <div className="legacy-tool-panel__header">
            <div>
              <span className="summary-label">Status</span>
              <h2>{running ? "Running" : "Stopped"}</h2>
              <p>Primary accents fire at each group boundary while subdivisions stay visible below.</p>
            </div>
          </div>
          <div
            className="pulse-strip"
            aria-hidden="true"
            style={{ ["--pulse-count" as string]: numerator }}
          >
            {Array.from({ length: numerator }, (_, index) => {
              const classes = [
                "pulse-dot",
                accentStarts.has(index) ? "is-accent" : "",
                activeBeat === index && activeTickInBeat === 0 ? "is-active" : "",
              ]
                .filter(Boolean)
                .join(" ");
              return <span className={classes} key={`${currentSignature}-${index}`} />;
            })}
          </div>
          <div className="legacy-preview-panel__meta">
            <span className="legacy-preview-chip">{tempo} BPM</span>
            <span className="legacy-preview-chip">{currentSignature}</span>
            <span className="legacy-preview-chip">Grouping {accentLabel}</span>
            <span className="legacy-preview-chip">{subdivisionLabel}</span>
          </div>
          <div className="legacy-toolbar-row">
            <span className="summary-label">Subdivision</span>
          </div>
          <div className="segmented-button-row">
          {[1, 2, 4].map((value) => (
            <button
              key={`subdivision-${value}`}
              className={subdivision === value ? "secondary-button" : "ghost-button"}
              onClick={() => {
                setSubdivision(value);
                setTickCount(0);
              }}
            >
              {value === 1 ? "Quarter Notes" : value === 2 ? "Eighth Notes" : "Sixteenth Notes"}
            </button>
          ))}
          </div>
        </article>

        <div className="legacy-selection-strip">
          <article className="legacy-selection-card">
            <span className="summary-label">Time Signature</span>
            <div className="metronome-config-grid legacy-form-grid">
              <label className="select-field">
                <span>Signature presets</span>
                <select
                  value={signatureValue(numerator, denominator, accentGroups)}
                  onChange={(event) => applySignatureSelection(event.target.value)}
                >
                  {SIGNATURE_GROUPS.map((group) => (
                    <optgroup key={group.label} label={group.label}>
                      {group.items.map((item) => (
                        <option
                          key={`${group.label}-${item.sig}-${item.groups.join("+")}`}
                          value={`${item.sig}|${item.groups.join("+")}`}
                        >
                          {item.sig} ({item.groups.join("+")})
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </label>

              <label className="search-field">
                <span>Custom signature</span>
                <input
                  type="text"
                  value={customSignature}
                  onChange={(event) => setCustomSignature(event.target.value)}
                  placeholder="13/8"
                />
              </label>

              <label className="search-field">
                <span>Accent groups</span>
                <input
                  type="text"
                  value={customGroups}
                  onChange={(event) => setCustomGroups(event.target.value)}
                  placeholder="3+3+2+2+3"
                />
              </label>
            </div>
            <div className="legacy-toolbar-row">
              <button className="ghost-button" onClick={applyCustomSignatureValue}>
                Apply Custom Meter
              </button>
            </div>
          </article>

          <article className="legacy-selection-card">
            <span className="summary-label">Current Readout</span>
            <div className="legacy-toolbar-row">
              <span className="legacy-preview-chip">Tempo {tempo}</span>
              <span className="legacy-preview-chip">Meter {currentSignature}</span>
              <span className="legacy-preview-chip">Grouping accent {accentLabel}</span>
              <span className="legacy-preview-chip">{subdivision}x density</span>
            </div>
            <p className="legacy-catalog-card__subtitle">
              The source metronome still obeys the global sound toggle in the shell while keeping
              the visual pulse active.
            </p>
          </article>
        </div>
      </div>

      <article className="legacy-tool-panel">
        <div className="legacy-tool-panel__header">
          <div>
            <span className="summary-label">Practice Presets</span>
            <h2>Common tempo and meter combinations</h2>
          </div>
        </div>
        <div className="legacy-catalog-grid">
          {METRONOME_PRESETS.map((preset) => {
            const isActive =
              tempo === preset.bpm &&
              subdivision === preset.subdivision &&
              currentSignature === preset.signature &&
              accentLabel === preset.groups.join("+");

            return (
              <button
                key={`${preset.label}-${preset.signature}`}
                className={`legacy-catalog-card preset-card ${isActive ? "is-selected" : ""}`}
                onClick={() => applyPreset(preset)}
              >
                <div className="legacy-catalog-card__header">
                  <div>
                    <span className="legacy-catalog-card__eyebrow">{preset.signature}</span>
                    <h3 className="legacy-catalog-card__title">{preset.label}</h3>
                  </div>
                  <span className="legacy-preview-chip">{preset.subdivision}x</span>
                </div>
                <p className="legacy-catalog-card__subtitle">{preset.tip}</p>
              </button>
            );
          })}
        </div>
      </article>
    </section>
  );
}
