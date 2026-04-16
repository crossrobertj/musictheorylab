import { useMemo, useState } from "react";
import { playChord, playNote, playScale } from "../../audio/audioEngine";
import { useAppStore } from "../../app/store/useAppStore";
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
  const [tab, setTab] = useState<MicroTab>("maqam");
  const [selectedScaleName, setSelectedScaleName] = useState(() => getMicrotonalScaleNames()[0] ?? "");
  const [helmholtzInput, setHelmholtzInput] = useState("c'");

  const root = getRootFromKey(currentKey);
  const scaleNames = useMemo(() => getMicrotonalScaleNames(), []);
  const selectedScale = selectedScaleName ? ALL_SCALES[selectedScaleName as keyof typeof ALL_SCALES] : null;
  const microNotes = selectedScale ? getNotesFromIntervals(`${root}4`, selectedScale.intervals) : [];
  const helmholtzResult = convertHelmholtzNotation(helmholtzInput);

  return (
    <section className="page-section">
      <div className="page-hero">
        <div>
          <span className="eyebrow">Source Feature</span>
          <h1>Tuning & Temperament Lab</h1>
          <p>
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

      <article className="detail-card">
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
          <article className="detail-card">
            <div className="detail-header">
              <div>
                <span className="summary-label">Microtonal Scale Browser</span>
                <h2>{root} context</h2>
                <p>Arabic, Indian, and experimental collections map to the active key root.</p>
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
        <div className="feature-grid">
          {HISTORICAL_TUNINGS.map((tuning) => (
            <article key={tuning.name} className={`feature-card ${system === tuning.name ? "is-selected" : ""}`}>
              <div className="feature-card-header">
                <div>
                  <span className="card-tag">Historical</span>
                  <h3>{tuning.name}</h3>
                </div>
                <button className="ghost-button" onClick={() => setSystem(tuning.name)}>
                  Apply
                </button>
              </div>
              <p className="card-copy">{tuning.desc}</p>
              <p className="supporting-copy">{tuning.method}</p>
              <button className="secondary-button" onClick={() => playChord(["C4", "E4", "G4"])}>
                Hear C Major
              </button>
            </article>
          ))}
        </div>
      ) : null}

      {tab === "tet" ? (
        <div className="feature-grid">
          {TET_VARIANTS.map((variant) => (
            <article key={variant.name} className={`feature-card ${system === variant.name ? "is-selected" : ""}`}>
              <div className="feature-card-header">
                <div>
                  <span className="card-tag">{variant.steps} steps</span>
                  <h3>{variant.name}</h3>
                </div>
                <button className="ghost-button" onClick={() => setSystem(variant.name)}>
                  Apply
                </button>
              </div>
              <p className="card-copy">{variant.desc}</p>
              <button className="secondary-button" onClick={() => playScale(["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"])}>
                Hear C Major
              </button>
            </article>
          ))}
        </div>
      ) : null}

      {tab === "ji" ? (
        <div className="tuning-layout">
          <article className="detail-card">
            <div className="detail-header">
              <div>
                <span className="summary-label">Interval Ratios</span>
                <h2>Just Intonation</h2>
                <p>Apply the C-based just profile globally or use the table as a reference.</p>
              </div>
              <button className="primary-button" onClick={() => setSystem("JI-C")}>
                Apply JI-C
              </button>
            </div>
            <div className="feature-grid">
              {JUST_INTONATION_INTERVALS.map((interval) => (
                <article key={interval.interval} className="feature-card">
                  <span className="card-tag">{interval.ratio}</span>
                  <h3>{interval.interval}</h3>
                  <p className="card-copy">{interval.cents} cents</p>
                </article>
              ))}
            </div>
          </article>
          <article className="detail-card">
            <div className="detail-header">
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
          <article className="detail-card">
            <div className="detail-header">
              <div>
                <span className="summary-label">Notation Converter</span>
                <h2>Helmholtz to Scientific Pitch</h2>
                <p>Enter values like <code>c</code>, <code>c'</code>, or <code>C,</code>.</p>
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
          <article className="detail-card">
            <div className="detail-header">
              <div>
                <span className="summary-label">Octave Reference</span>
                <h2>Helmholtz Chart</h2>
              </div>
            </div>
            <div className="feature-grid">
              {HELMHOLTZ_OCTAVES.map((item) => (
                <article key={item.label} className="feature-card">
                  <span className="card-tag">{item.label}</span>
                  <h3>{item.scientific}</h3>
                  <p className="card-copy">{item.name}</p>
                </article>
              ))}
            </div>
          </article>
        </div>
      ) : null}
    </section>
  );
}
