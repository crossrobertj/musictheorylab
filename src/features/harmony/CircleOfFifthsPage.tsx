import { useMemo } from "react";
import { playChord } from "../../audio/audioEngine";
import { InstrumentBoard } from "../../components/InstrumentBoard";
import { NoteBadgeList } from "../../components/NoteBadgeList";
import { useAppStore } from "../../app/store/useAppStore";
import { useCustomInstrumentStore } from "../../app/store/useCustomInstrumentStore";
import { getInstrumentConfig } from "../../domain/instruments";
import {
  CIRCLE_MAJOR_KEYS,
  CIRCLE_MINOR_KEYS,
  calculateKeyDistance,
  getCircleNeighbors,
  getDiatonicTriads,
  getParallelKey,
  getRelativeKey,
  getScaleNotes,
} from "../../domain/music";

const RING_POSITIONS = [
  { x: 50, y: 4 },
  { x: 73, y: 10 },
  { x: 88, y: 26 },
  { x: 94, y: 50 },
  { x: 88, y: 74 },
  { x: 73, y: 90 },
  { x: 50, y: 96 },
  { x: 27, y: 90 },
  { x: 12, y: 74 },
  { x: 6, y: 50 },
  { x: 12, y: 26 },
  { x: 27, y: 10 },
];

interface CircleNodeProps {
  label: string;
  active: boolean;
  onClick: () => void;
  x: number;
  y: number;
  kind: "major" | "minor";
}

function CircleNode({ label, active, onClick, x, y, kind }: CircleNodeProps) {
  return (
    <button
      className={`circle-node circle-node--${kind} ${active ? "is-active" : ""}`}
      style={{ left: `${x}%`, top: `${y}%` }}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export function CircleOfFifthsPage() {
  const currentKey = useAppStore((state) => state.currentKey);
  const currentInstrument = useAppStore((state) => state.currentInstrument);
  const customInstruments = useCustomInstrumentStore((state) => state.customInstruments);
  const setCurrentKey = useAppStore((state) => state.setCurrentKey);

  const currentScale = useMemo(() => getScaleNotes(currentKey), [currentKey]);
  const triads = useMemo(() => getDiatonicTriads(currentKey), [currentKey]);
  const relativeKey = useMemo(() => getRelativeKey(currentKey), [currentKey]);
  const parallelKey = useMemo(() => getParallelKey(currentKey), [currentKey]);
  const neighbors = useMemo(() => getCircleNeighbors(currentKey), [currentKey]);
  const relativeDistance = useMemo(() => calculateKeyDistance(currentKey, relativeKey), [currentKey, relativeKey]);
  const currentInstrumentConfig = getInstrumentConfig(currentInstrument, customInstruments);

  return (
    <section className="page-section">
      <div className="page-hero">
        <div>
          <span className="eyebrow">Source Feature</span>
          <h1>Circle of Fifths</h1>
          <p>
            The circle route is now source-side. Select major or minor keys from the wheel, inspect
            their closest relationships, and audition the diatonic triads without leaving the React app.
          </p>
        </div>
      </div>

      <div className="summary-grid">
        <article className="summary-card">
          <span className="summary-label">Current Key</span>
          <h2>{currentKey}</h2>
          <NoteBadgeList notes={currentScale} keySignature={currentKey} />
        </article>

        <article className="summary-card">
          <span className="summary-label">Related Keys</span>
          <h2>Closest moves</h2>
          <div className="finder-results-list">
            {[currentKey, relativeKey, parallelKey, ...neighbors].map((keyName) => (
              <button
                key={`${currentKey}-${keyName}`}
                className="finder-result-card"
                onClick={() => setCurrentKey(keyName)}
              >
                <strong>{keyName}</strong>
                <small>
                  {keyName === currentKey
                    ? "Tonic"
                    : keyName === relativeKey
                      ? "Relative"
                      : keyName === parallelKey
                        ? "Parallel"
                        : "Neighboring fifth"}
                </small>
              </button>
            ))}
          </div>
        </article>

        <article className="summary-card">
          <span className="summary-label">Distance Snapshot</span>
          <h2>{relativeDistance.relationship.name}</h2>
          <p>{relativeDistance.relationship.desc}</p>
          <div className="info-chip-row">
            <span className="info-chip">Relative key: {relativeKey}</span>
            <span className="info-chip">Shared notes: {relativeDistance.sharedNotes.length}</span>
          </div>
        </article>
      </div>

      <article className="detail-card">
        <div className="detail-header">
          <div>
            <span className="summary-label">Interactive Wheel</span>
            <h2>{currentKey}</h2>
            <p>Outer ring is major, inner ring is minor. Clicking any node updates the source app key.</p>
          </div>
        </div>
        <div className="circle-wheel">
          <div className="circle-wheel-ring circle-wheel-ring--outer" />
          <div className="circle-wheel-ring circle-wheel-ring--inner" />

          {CIRCLE_MAJOR_KEYS.map((root, index) => (
            <CircleNode
              key={`major-${root}`}
              label={root}
              kind="major"
              active={currentKey === `${root} Major`}
              x={RING_POSITIONS[index].x}
              y={RING_POSITIONS[index].y}
              onClick={() => setCurrentKey(`${root} Major`)}
            />
          ))}

          {CIRCLE_MINOR_KEYS.map((root, index) => (
            <CircleNode
              key={`minor-${root}`}
              label={root}
              kind="minor"
              active={currentKey === `${root} Minor`}
              x={50 + (RING_POSITIONS[index].x - 50) * 0.68}
              y={50 + (RING_POSITIONS[index].y - 50) * 0.68}
              onClick={() => setCurrentKey(`${root} Minor`)}
            />
          ))}
        </div>
      </article>

      <article className="detail-card">
        <div className="detail-header">
          <div>
            <span className="summary-label">Diatonic Triads</span>
            <h2>{currentKey}</h2>
            <p>Click any triad to hear it and see it on the current source-side instrument board.</p>
          </div>
        </div>
        <div className="feature-grid">
          {triads.map((chord) => (
            <article className="feature-card" key={`${currentKey}-${chord.roman}`}>
              <div className="feature-card-header">
                <div>
                  <span className="card-tag">{chord.roman}</span>
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
            <span className="summary-label">Instrument Context</span>
            <h2>{currentInstrumentConfig.name}</h2>
            <p>The instrument layer now works with circle-of-fifths selections too.</p>
          </div>
          <NoteBadgeList notes={currentScale} keySignature={currentKey} />
        </div>
        <InstrumentBoard
          instrumentId={currentInstrument}
          activeNotes={currentScale}
          keySignature={currentKey}
        />
      </article>
    </section>
  );
}
