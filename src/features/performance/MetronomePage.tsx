import { useEffect, useMemo, useRef, useState } from "react";
import { playMetronomeClick, stopAllAudio } from "../../audio/audioEngine";
import { useAppStore } from "../../app/store/useAppStore";

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
  const [running, setRunning] = useState(false);
  const [subdivision, setSubdivision] = useState(1);
  const [numerator, setNumerator] = useState(4);
  const [denominator, setDenominator] = useState(4);
  const [accentGroups, setAccentGroups] = useState<number[]>([4]);
  const [tickCount, setTickCount] = useState(0);
  const [customSignature, setCustomSignature] = useState("4/4");
  const [customGroups, setCustomGroups] = useState("4");
  const tapHistoryRef = useRef<number[]>([]);

  const currentSignature = `${numerator}/${denominator}`;
  const accentLabel = accentGroups.join("+");
  const accentStarts = useMemo(() => getAccentStarts(accentGroups), [accentGroups]);
  const activeBeat = Math.floor(tickCount / Math.max(1, subdivision)) % Math.max(1, numerator);
  const activeTickInBeat = tickCount % Math.max(1, subdivision);

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

  function stopMetronome() {
    setRunning(false);
    setTickCount(0);
    stopAllAudio();
  }

  function toggleMetronome() {
    if (running) {
      stopMetronome();
      return;
    }

    setTickCount(0);
    setRunning(true);
  }

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
      <div className="page-hero">
        <div>
          <span className="eyebrow">Source Feature</span>
          <h1>Practice Metronome</h1>
          <p>
            The metronome is now source-side too. It shares the global tempo state, supports simple
            and additive meters, and keeps accent grouping explicit instead of hiding it in the legacy runtime.
          </p>
        </div>
        <div className="hero-actions">
          <button className="primary-button" onClick={toggleMetronome}>
            {running ? "Stop Metronome" : "Start Metronome"}
          </button>
          <button className="ghost-button" onClick={tapTempo}>
            Tap Tempo
          </button>
        </div>
      </div>

      <div className="summary-grid">
        <article className="summary-card">
          <span className="summary-label">Status</span>
          <h2>{running ? "Running" : "Stopped"}</h2>
          <div className="info-chip-row">
            <span className="info-chip">{tempo} BPM</span>
            <span className="info-chip">{currentSignature}</span>
            <span className="info-chip">Grouping {accentLabel}</span>
            <span className="info-chip">{subdivision}x subdivision</span>
          </div>
        </article>

        <article className="summary-card">
          <span className="summary-label">Accent Pattern</span>
          <h2>{accentLabel}</h2>
          <p>Primary accents trigger at the start of each group. Secondary beats land on the remaining beat starts.</p>
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
        </article>

        <article className="summary-card">
          <span className="summary-label">Audio State</span>
          <h2>{soundEnabled ? "Sound On" : "Muted"}</h2>
          <p>The source metronome respects the global sound toggle in the toolbar and still animates visually when muted.</p>
        </article>
      </div>

      <article className="detail-card">
        <div className="detail-header">
          <div>
            <span className="summary-label">Subdivision</span>
            <h2>Choose the click density</h2>
          </div>
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

      <article className="detail-card">
        <div className="detail-header">
          <div>
            <span className="summary-label">Time Signature</span>
            <h2>Preset and custom meters</h2>
          </div>
        </div>
        <div className="metronome-config-grid">
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
        <div className="hero-actions">
          <button className="ghost-button" onClick={applyCustomSignatureValue}>
            Apply Custom Meter
          </button>
        </div>
      </article>

      <article className="detail-card">
        <div className="detail-header">
          <div>
            <span className="summary-label">Practice Presets</span>
            <h2>Common tempo and meter combinations</h2>
          </div>
        </div>
        <div className="preset-grid">
          {METRONOME_PRESETS.map((preset) => {
            const isActive =
              tempo === preset.bpm &&
              subdivision === preset.subdivision &&
              currentSignature === preset.signature &&
              accentLabel === preset.groups.join("+");

            return (
              <button
                key={`${preset.label}-${preset.signature}`}
                className={`feature-card preset-card ${isActive ? "is-selected" : ""}`}
                onClick={() => applyPreset(preset)}
              >
                <div className="feature-card-header">
                  <div>
                    <span className="card-tag">{preset.signature}</span>
                    <h3>{preset.label}</h3>
                  </div>
                  <span className="info-chip">{preset.subdivision}x</span>
                </div>
                <p className="card-copy">{preset.tip}</p>
              </button>
            );
          })}
        </div>
      </article>
    </section>
  );
}
