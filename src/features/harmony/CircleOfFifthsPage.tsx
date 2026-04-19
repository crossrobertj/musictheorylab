import { useCallback, useEffect, useMemo } from "react";
import { playChord, playScale } from "../../audio/audioEngine";
import { useShellBridgeStore } from "../../app/store/useShellBridgeStore";
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

const ROUTE_ID = "circle";
const DEFAULT_CIRCLE_KEY = "C Major";

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
  const updateRoute = useShellBridgeStore((state) => state.updateRoute);

  const currentScale = useMemo(() => getScaleNotes(currentKey), [currentKey]);
  const triads = useMemo(() => getDiatonicTriads(currentKey), [currentKey]);
  const relativeKey = useMemo(() => getRelativeKey(currentKey), [currentKey]);
  const parallelKey = useMemo(() => getParallelKey(currentKey), [currentKey]);
  const neighbors = useMemo(() => getCircleNeighbors(currentKey), [currentKey]);
  const relativeDistance = useMemo(() => calculateKeyDistance(currentKey, relativeKey), [currentKey, relativeKey]);
  const currentInstrumentConfig = getInstrumentConfig(currentInstrument, customInstruments);
  const playableLabel = `${currentKey} scale`;

  const playCurrent = useCallback(() => {
    void playScale(currentScale);
  }, [currentScale]);

  const clear = useCallback(() => {
    setCurrentKey(DEFAULT_CIRCLE_KEY);
  }, [setCurrentKey]);

  useEffect(() => {
    updateRoute(ROUTE_ID, {
      title: "Circle of Fifths",
      subtitle: "Harmonic proximity and key relationships.",
      playableLabel,
      playableNoteSet: currentScale,
      playCurrent,
      clear,
    });
  }, [clear, currentScale, playableLabel, playCurrent, updateRoute]);

  return (
    <section className="page-section">
      <div className="legacy-tool-panel">
        <div className="legacy-tool-panel__header">
          <div>
            <span className="eyebrow">Key Map</span>
            <h1 className="legacy-tool-panel__title">Circle of Fifths</h1>
            <p className="legacy-tool-panel__copy">
              Select major or minor keys from the wheel, inspect their closest relationships, and
              audition the diatonic triads in the current context.
            </p>
          </div>
        </div>
      </div>

      <div className="legacy-map-grid">
        <article className="legacy-map-panel">
          <div className="detail-header">
            <div>
              <span className="summary-label">GPS</span>
              <h2>{currentKey}</h2>
              <p className="legacy-tool-panel__copy">Outer ring is major. Inner ring is minor.</p>
            </div>
            <div className="legacy-preview-panel__meta">
              <span className="legacy-preview-chip">Relative: {relativeKey}</span>
              <span className="legacy-preview-chip">Parallel: {parallelKey}</span>
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

          <div className="legacy-token-row">
            <span className="legacy-note-token">Tonic</span>
            <span className="legacy-note-token">IV / V</span>
            <span className="legacy-note-token">Relative</span>
            <span className="legacy-note-token">Parallel</span>
          </div>
        </article>

        <article className="legacy-connection-panel">
          <div className="detail-header">
            <div>
              <span className="summary-label">Pathways</span>
              <h2>{currentKey}</h2>
              <p className="legacy-tool-panel__copy">{relativeDistance.relationship.desc}</p>
            </div>
            <button className="legacy-catalog-card__action" onClick={playCurrent}>
              Play Scale
            </button>
          </div>

          <div className="legacy-selection-strip">
            <div className="legacy-selection-card">
              <span className="summary-label">Closest Moves</span>
              <div className="legacy-token-row">
                {[currentKey, relativeKey, parallelKey, ...neighbors].map((keyName) => (
                  <button
                    key={`${currentKey}-${keyName}`}
                    className="harmony-chip harmony-chip--scale"
                    onClick={() => setCurrentKey(keyName)}
                    type="button"
                  >
                    {keyName}
                  </button>
                ))}
              </div>
            </div>

            <div className="legacy-selection-card">
              <span className="summary-label">Distance Snapshot</span>
              <h3 className="legacy-selection-card__title">{relativeDistance.relationship.name}</h3>
              <div className="legacy-preview-panel__meta">
                <span className="legacy-preview-chip">Relative key: {relativeKey}</span>
                <span className="legacy-preview-chip">Shared notes: {relativeDistance.sharedNotes.length}</span>
                <span className="legacy-preview-chip">{currentInstrumentConfig.name}</span>
              </div>
              <NoteBadgeList notes={currentScale} keySignature={currentKey} />
            </div>

            <div className="legacy-selection-card">
              <span className="summary-label">Diatonic Triads</span>
              <div className="legacy-token-row">
                {triads.map((chord) => (
                  <button
                    key={`${currentKey}-${chord.roman}`}
                    className="harmony-chip harmony-chip--chord"
                    onClick={() => playChord(chord.notes)}
                    type="button"
                  >
                    {chord.roman} {chord.name.replace(/^.*?\s/, "")}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <InstrumentBoard
            instrumentId={currentInstrument}
            activeNotes={currentScale}
            keySignature={currentKey}
          />
        </article>
      </div>
    </section>
  );
}
