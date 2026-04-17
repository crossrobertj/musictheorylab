import { useCallback, useEffect, useMemo, useState } from "react";
import { playChord, playNote, playScale } from "../../audio/audioEngine";
import { useAppStore } from "../../app/store/useAppStore";
import { useShellBridgeStore } from "../../app/store/useShellBridgeStore";
import { useTuningStore } from "../../app/store/useTuningStore";
import {
  ALL_SCALES,
} from "../../domain/generated/theory-data";
import {
  HELMHOLTZ_OCTAVES,
  HISTORICAL_TUNINGS,
  JUST_INTONATION_C_MAJOR,
  JUST_INTONATION_INTERVALS,
  TET_VARIANTS,
  convertHelmholtzNotation,
  getMicrotonalScaleNames,
} from "../../domain/tuning";
import { getNotesFromIntervals, getRootFromKey } from "../../domain/music";

type MicroTab = "maqam" | "historical" | "tet" | "ji" | "helmholtz";

const ROUTE_ID = "microtonal";
const DEFAULT_TAB: MicroTab = "maqam";
const DEFAULT_HELMHOLTZ_INPUT = "c'";
const DEFAULT_SCALE_NAME = getMicrotonalScaleNames()[0] ?? "";
const DEFAULT_C_TRIAD = ["C4", "E4", "G4"];
const DEFAULT_C_SCALE = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"];
const DEFAULT_JI_C_SCALE = JUST_INTONATION_C_MAJOR.map((item) => item.note);

const TAB_LABELS: Record<MicroTab, string> = {
  maqam: "Maqams & Scales",
  historical: "Historical Tunings",
  tet: "TET Variants",
  ji: "Just Intonation",
  helmholtz: "Helmholtz Notation",
};

export function MicrotonalLabPage() {
  const currentKey = useAppStore((state) => state.currentKey);
  const { system, basePitch, setSystem, setBasePitch } = useTuningStore();
  const updateRoute = useShellBridgeStore((state) => state.updateRoute);
  const [tab, setTab] = useState<MicroTab>(DEFAULT_TAB);
  const [selectedScaleName, setSelectedScaleName] = useState(DEFAULT_SCALE_NAME);
  const [helmholtzInput, setHelmholtzInput] = useState(DEFAULT_HELMHOLTZ_INPUT);

  const root = getRootFromKey(currentKey);
  const scaleNames = useMemo(() => getMicrotonalScaleNames(), []);
  const selectedScale = selectedScaleName ? ALL_SCALES[selectedScaleName as keyof typeof ALL_SCALES] : null;
  const microNotes = selectedScale ? getNotesFromIntervals(`${root}4`, selectedScale.intervals) : [];
  const helmholtzResult = useMemo(() => convertHelmholtzNotation(helmholtzInput), [helmholtzInput]);

  const shellPreview = useMemo(() => {
    if (tab === "maqam") {
      if (!selectedScale || microNotes.length === 0) {
        return {
          playableLabel: "No microtonal scale selected",
          playableNoteSet: [] as string[],
          playCurrent: null as (() => void) | null,
        };
      }

      return {
        playableLabel: `${selectedScale.region} • ${selectedScaleName}`,
        playableNoteSet: microNotes,
        playCurrent: () => playScale(microNotes),
      };
    }

    if (tab === "historical") {
      return {
        playableLabel: `${system} • C major chord`,
        playableNoteSet: DEFAULT_C_TRIAD,
        playCurrent: () => playChord(DEFAULT_C_TRIAD),
      };
    }

    if (tab === "tet") {
      return {
        playableLabel: `${system} • C major scale`,
        playableNoteSet: DEFAULT_C_SCALE,
        playCurrent: () => playScale(DEFAULT_C_SCALE),
      };
    }

    if (tab === "ji") {
      return {
        playableLabel: "Just intonation • C major scale",
        playableNoteSet: DEFAULT_JI_C_SCALE,
        playCurrent: () => playScale(DEFAULT_JI_C_SCALE),
      };
    }

    if (helmholtzResult) {
      return {
        playableLabel: `Helmholtz • ${helmholtzResult.scientific}`,
        playableNoteSet: [helmholtzResult.scientific],
        playCurrent: () => playNote(helmholtzResult.scientific),
      };
    }

    return {
      playableLabel: "Helmholtz • awaiting valid input",
      playableNoteSet: [] as string[],
      playCurrent: null as (() => void) | null,
    };
  }, [helmholtzResult, microNotes, selectedScale, selectedScaleName, system, tab]);

  const clear = useCallback(() => {
    setTab(DEFAULT_TAB);
    setSelectedScaleName(DEFAULT_SCALE_NAME);
    setHelmholtzInput(DEFAULT_HELMHOLTZ_INPUT);
  }, []);

  useEffect(() => {
    updateRoute(ROUTE_ID, {
      title: "Microtonal Lab",
      subtitle: "Experimental quarter-tone research and tuning references.",
      playableLabel: shellPreview.playableLabel,
      playableNoteSet: shellPreview.playableNoteSet,
      playCurrent: shellPreview.playCurrent,
      clear,
    });
  }, [clear, shellPreview, updateRoute]);

  return (
    <section className="page-section">
      <div className="legacy-tool-panel">
        <div className="legacy-tool-panel__header">
          <div>
            <span className="eyebrow">Tuning Lab</span>
            <h1 className="legacy-tool-panel__title">Tuning & Temperament Lab</h1>
            <p className="legacy-tool-panel__copy">
              Apply historical temperaments and alternate equal divisions globally, inspect just
              intonation references, and test Helmholtz notation without leaving the source app.
            </p>
          </div>
          <div className="toolbar-cluster">
          <label className="range-field">
            <span>Base Pitch</span>
            <input
              type="range"
              min="400"
              max="460"
              value={basePitch}
              onChange={(event) => setBasePitch(Number.parseInt(event.target.value, 10))}
            />
            <strong>{basePitch} Hz</strong>
          </label>
          <div className="info-chip-row">
            <span className="info-chip">Current tuning: {system}</span>
          </div>
          </div>
        </div>
      </div>

      <article className="legacy-tool-panel">
        <div className="segmented-button-row">
          {(Object.keys(TAB_LABELS) as MicroTab[]).map((tabId) => (
            <button
              key={tabId}
              className={tab === tabId ? "secondary-button" : "ghost-button"}
              onClick={() => setTab(tabId)}
            >
              {TAB_LABELS[tabId]}
            </button>
          ))}
        </div>
      </article>

      {tab === "maqam" ? (
        <div className="tuning-layout">
          <article className="legacy-preview-panel">
            <div className="legacy-tool-panel__header">
              <div>
                <span className="summary-label">Microtonal Scale Browser</span>
                <h2>{root} context</h2>
                <p className="legacy-tool-panel__copy">Arabic, Indian, and experimental collections map to the active key root.</p>
              </div>
              <select value={selectedScaleName} onChange={(event) => setSelectedScaleName(event.target.value)}>
                {scaleNames.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            {selectedScale ? (
              <>
                <div className="info-chip-row">
                  <span className="info-chip">{selectedScale.region}</span>
                  <span className="info-chip">{selectedScale.intervals.length} notes</span>
                </div>
                <div className="song-chip-list">
                  {microNotes.map((note) => (
                    <span key={note} className="info-chip">
                      {note}
                    </span>
                  ))}
                </div>
                <div className="toolbar-cluster">
                  <button className="primary-button" onClick={() => playScale(microNotes)}>
                    Play Scale
                  </button>
                </div>
              </>
            ) : null}
          </article>
        </div>
      ) : null}

      {tab === "historical" ? (
        <div className="legacy-catalog-grid">
          {HISTORICAL_TUNINGS.map((tuning) => (
            <article key={tuning.name} className={`legacy-catalog-card ${system === tuning.name ? "is-selected" : ""}`}>
              <div className="legacy-catalog-card__header">
                <div>
                  <span className="legacy-catalog-card__eyebrow">Historical</span>
                  <h3 className="legacy-catalog-card__title">{tuning.name}</h3>
                </div>
                <button className="legacy-catalog-card__action" onClick={() => setSystem(tuning.name)}>
                  Apply
                </button>
              </div>
              <p className="legacy-catalog-card__subtitle">{tuning.desc}</p>
              <p className="supporting-copy">{tuning.method}</p>
              <button className="secondary-button" onClick={() => playChord(["C4", "E4", "G4"])}>
                Hear C Major
              </button>
            </article>
          ))}
        </div>
      ) : null}

      {tab === "tet" ? (
        <div className="legacy-catalog-grid">
          {TET_VARIANTS.map((variant) => (
            <article key={variant.name} className={`legacy-catalog-card ${system === variant.name ? "is-selected" : ""}`}>
              <div className="legacy-catalog-card__header">
                <div>
                  <span className="legacy-catalog-card__eyebrow">{variant.steps} steps</span>
                  <h3 className="legacy-catalog-card__title">{variant.name}</h3>
                </div>
                <button className="legacy-catalog-card__action" onClick={() => setSystem(variant.name)}>
                  Apply
                </button>
              </div>
              <p className="legacy-catalog-card__subtitle">{variant.desc}</p>
              <button className="secondary-button" onClick={() => playScale(["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"])}>
                Hear C Major
              </button>
            </article>
          ))}
        </div>
      ) : null}

      {tab === "ji" ? (
        <div className="tuning-layout">
          <article className="legacy-preview-panel">
            <div className="legacy-tool-panel__header">
              <div>
                <span className="summary-label">Interval Ratios</span>
                <h2>Just Intonation</h2>
                <p className="legacy-tool-panel__copy">Apply the C-based just profile globally or use the table as a reference.</p>
              </div>
              <button className="primary-button" onClick={() => setSystem("JI-C")}>
                Apply JI-C
              </button>
            </div>
            <div className="legacy-catalog-grid">
              {JUST_INTONATION_INTERVALS.map((interval) => (
                <article key={interval.interval} className="legacy-catalog-card">
                  <span className="legacy-catalog-card__eyebrow">{interval.ratio}</span>
                  <h3 className="legacy-catalog-card__title">{interval.interval}</h3>
                  <p className="legacy-catalog-card__subtitle">{interval.cents} cents</p>
                </article>
              ))}
            </div>
          </article>
          <article className="legacy-selection-card">
            <div className="legacy-tool-panel__header">
              <div>
                <span className="summary-label">C Major Example</span>
                <h2>Reference Notes</h2>
              </div>
              <button className="ghost-button" onClick={() => playScale(JUST_INTONATION_C_MAJOR.map((item) => item.note))}>
                Play
              </button>
            </div>
            <div className="song-chip-list">
              {JUST_INTONATION_C_MAJOR.map((item) => (
                <span key={item.note} className="info-chip">
                  {item.note} • {item.ratio}
                </span>
              ))}
            </div>
          </article>
        </div>
      ) : null}

      {tab === "helmholtz" ? (
        <div className="tuning-layout">
          <article className="legacy-preview-panel">
            <div className="legacy-tool-panel__header">
              <div>
                <span className="summary-label">Notation Converter</span>
                <h2>Helmholtz to Scientific Pitch</h2>
                <p className="legacy-tool-panel__copy">Enter values like <code>c</code>, <code>c'</code>, or <code>C,</code>.</p>
              </div>
            </div>
            <div className="toolbar-cluster">
              <input value={helmholtzInput} onChange={(event) => setHelmholtzInput(event.target.value)} />
              <button
                className="secondary-button"
                onClick={() => helmholtzResult && playNote(helmholtzResult.scientific)}
              >
                Play
              </button>
            </div>
            {helmholtzResult ? (
              <div className="song-callout">
                <strong>{helmholtzResult.scientific}</strong>
                <p>{helmholtzResult.frequency.toFixed(2)} Hz • MIDI {helmholtzResult.midi}</p>
              </div>
            ) : (
              <p className="card-copy">Enter a valid Helmholtz symbol to convert it.</p>
            )}
          </article>
          <article className="legacy-selection-card">
            <div className="legacy-tool-panel__header">
              <div>
                <span className="summary-label">Octave Reference</span>
                <h2>Helmholtz Chart</h2>
              </div>
            </div>
            <div className="legacy-catalog-grid">
              {HELMHOLTZ_OCTAVES.map((item) => (
                <article key={item.label} className="legacy-catalog-card">
                  <span className="legacy-catalog-card__eyebrow">{item.label}</span>
                  <h3 className="legacy-catalog-card__title">{item.scientific}</h3>
                  <p className="legacy-catalog-card__subtitle">{item.name}</p>
                </article>
              ))}
            </div>
          </article>
        </div>
      ) : null}
    </section>
  );
}
