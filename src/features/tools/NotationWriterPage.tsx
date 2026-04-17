import { useEffect, useMemo, useState } from "react";
import { playChord, stopAllAudio } from "../../audio/audioEngine";
import { useAppStore } from "../../app/store/useAppStore";
import { useShellBridgeStore } from "../../app/store/useShellBridgeStore";
import { buildMidiFromNoteEvents, downloadMidiFile } from "../../domain/midi";
import {
  buildPianoRollRows,
  buildStaffChordLayout,
  getLedgerLines,
  type NotationClef,
  type NotationItems,
} from "../../domain/notation";

const NOTE_INPUTS = [
  ["C", "C#"],
  ["D", "D#"],
  ["E"],
  ["F", "F#"],
  ["G", "G#"],
  ["A", "A#"],
  ["B"],
];

function downloadSvgAsPng(svgId: string, filename: string) {
  const svg = document.getElementById(svgId) as SVGSVGElement | null;
  if (!svg) return;

  const serialized = new XMLSerializer().serializeToString(svg);
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const image = new Image();

  image.onload = () => {
    canvas.width = 800;
    canvas.height = 200;
    if (!context) return;
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0);
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = filename;
    link.click();
  };

  image.src =
    "data:image/svg+xml;base64," +
    btoa(
      encodeURIComponent(serialized).replace(/%([0-9A-F]{2})/g, (_, value) =>
        String.fromCharCode(Number.parseInt(value, 16)),
      ),
    );
}

export function NotationWriterPage() {
  const tempo = useAppStore((state) => state.tempo);
  const updateRoute = useShellBridgeStore((state) => state.updateRoute);
  const [clef, setClef] = useState<NotationClef>("treble");
  const [octave, setOctave] = useState("4");
  const [chordMode, setChordMode] = useState(false);
  const [showPianoRoll, setShowPianoRoll] = useState(false);
  const [notationItems, setNotationItems] = useState<NotationItems>([]);

  const pianoRoll = useMemo(() => buildPianoRollRows(notationItems), [notationItems]);
  const playableNoteSet = useMemo(
    () => [...new Set(notationItems.flat())],
    [notationItems],
  );
  const playableLabel = useMemo(() => {
    const clefLabel = clef === "treble" ? "Treble clef" : "Bass clef";
    if (notationItems.length === 0) {
      return `${clefLabel} • empty staff`;
    }

    const beatLabel = notationItems.length === 1 ? "beat" : "beats";
    const pitchLabel = playableNoteSet.length === 1 ? "pitch" : "pitches";
    return `${clefLabel} • ${notationItems.length} ${beatLabel} • ${playableNoteSet.length} ${pitchLabel}`;
  }, [clef, notationItems.length, playableNoteSet.length]);

  function addNote(baseNote: string) {
    const note = `${baseNote}${octave}`;
    setNotationItems((current) => {
      if (chordMode && current.length > 0) {
        return current.map((group, index) =>
          index === current.length - 1 ? [...group, note] : group,
        );
      }
      return [...current, [note]];
    });
  }

  function removeGroup(index: number) {
    setNotationItems((current) => current.filter((_, itemIndex) => itemIndex !== index));
  }

  function playNotation() {
    stopAllAudio();
    notationItems.forEach((group, index) => {
      window.setTimeout(() => playChord(group, { reset: false }), index * (60000 / tempo));
    });
  }

  function clearStaff() {
    stopAllAudio();
    setNotationItems([]);
  }

  useEffect(() => {
    updateRoute("notation", {
      title: "Notation",
      subtitle: "Standard staff notation writer",
      playableLabel,
      playableNoteSet,
      playCurrent: notationItems.length > 0 ? playNotation : null,
      clear: clearStaff,
    });
  }, [notationItems, playableLabel, playableNoteSet, updateRoute, tempo]);

  function exportMidi() {
    const midi = buildMidiFromNoteEvents(
      notationItems.flatMap((group, index) =>
        group.map((note) => ({
          note,
          startBeats: index,
          durationBeats: 0.75,
        })),
      ),
      tempo,
    );
    downloadMidiFile(midi, "notation-export.mid");
  }

  return (
    <section className="page-section">
      <article className="legacy-tool-panel">
        <div className="legacy-tool-panel__header">
          <div>
            <span className="eyebrow">Performance Tool</span>
            <h1 className="legacy-tool-panel__title">Notation Writer</h1>
            <p className="legacy-tool-panel__copy">
              Staff entry, clef switching, chord stacking, image export, and MIDI export in the
              same compact reference-editor shape as the older tool.
            </p>
          </div>
          <div className="legacy-toolbar-row">
            <span className="legacy-toolbar-chip">
              Clef <strong>{clef === "treble" ? "Treble" : "Bass"}</strong>
            </span>
            <span className="legacy-toolbar-chip">
              Octave <strong>{octave}</strong>
            </span>
            <span className="legacy-toolbar-chip">
              Items <strong>{notationItems.length}</strong>
            </span>
          </div>
        </div>
        <div className="legacy-toolbar-row">
          <button className="primary-button" onClick={playNotation}>
            Play Staff
          </button>
          <button className="ghost-button" onClick={() => downloadSvgAsPng("staff-svg", "musictheory-notation.png")}>
            Save Image
          </button>
          <button className="ghost-button" onClick={exportMidi}>
            Export MIDI
          </button>
        </div>
      </article>

      <div className="legacy-lab-grid">
      <article className="legacy-preview-panel">
        <div className="notation-toolbar">
          <div className="toolbar-cluster">
            <button className={clef === "treble" ? "secondary-button" : "ghost-button"} onClick={() => setClef("treble")}>
              Treble
            </button>
            <button className={clef === "bass" ? "secondary-button" : "ghost-button"} onClick={() => setClef("bass")}>
              Bass
            </button>
          </div>
          <label className="select-field">
            <span>Octave Input</span>
            <select value={octave} onChange={(event) => setOctave(event.target.value)}>
              {["2", "3", "4", "5", "6"].map((value) => (
                <option key={value} value={value}>
                  Octave {value}
                </option>
              ))}
            </select>
          </label>
          <label className="checkbox-field">
            <input type="checkbox" checked={chordMode} onChange={(event) => setChordMode(event.target.checked)} />
            <span>Chord Input Mode</span>
          </label>
          <button className="ghost-button" onClick={clearStaff}>
            Clear Staff
          </button>
          <button className="ghost-button" onClick={() => setShowPianoRoll((current) => !current)}>
            {showPianoRoll ? "Hide Piano Roll" : "Piano Roll"}
          </button>
        </div>

        <div className="notation-staff-shell">
          <svg id="staff-svg" viewBox="0 0 800 200" className="notation-staff-svg">
            {Array.from({ length: 5 }, (_, index) => (
              <line
                key={`line-${index}`}
                x1="50"
                x2="750"
                y1={50 + index * 20}
                y2={50 + index * 20}
                stroke="#52525b"
                strokeWidth="2"
              />
            ))}
            <text
              x="20"
              y={clef === "treble" ? 90 : 70}
              fontSize="48"
              fill="#0e7490"
              fontFamily="serif"
            >
              {clef === "treble" ? "𝄞" : "𝄢"}
            </text>
            {notationItems.map((group, index) => {
              const x = 96 + index * Math.max(42, Math.min(90, (740 - 96) / Math.max(1, notationItems.length)));
              const layout = buildStaffChordLayout(group, clef);
              const highestY = Math.min(...layout.map((item) => item.y));
              const lowestY = Math.max(...layout.map((item) => item.y));

              return (
                <g key={`group-${index}`} className="staff-note-group" onClick={() => removeGroup(index)}>
                  {layout.flatMap((item) =>
                    getLedgerLines(item.y).map((y, ledgerIndex) => (
                      <line
                        key={`${item.note}-${ledgerIndex}-${y}`}
                        x1={x + item.xOffset - 12}
                        x2={x + item.xOffset + 12}
                        y1={y}
                        y2={y}
                        stroke="#71717a"
                        strokeWidth="2"
                      />
                    )),
                  )}
                  {layout.map((item) => (
                    <g key={`${item.note}-${item.y}`}>
                      {item.note.includes("#") || item.note.includes("b") ? (
                        <text
                          x={x + item.xOffset - 18}
                          y={item.y + 5}
                          fontSize="20"
                          fill="#0e7490"
                          fontFamily="serif"
                        >
                          {item.note.includes("#") ? "♯" : "♭"}
                        </text>
                      ) : null}
                      <ellipse
                        cx={x + item.xOffset}
                        cy={item.y}
                        rx="8.8"
                        ry="6.8"
                        fill="#0e7490"
                        transform={`rotate(-18 ${x + item.xOffset} ${item.y})`}
                      />
                    </g>
                  ))}
                  <line
                    x1={x + 8}
                    x2={x + 8}
                    y1={lowestY}
                    y2={highestY - 34}
                    stroke="#0e7490"
                    strokeWidth="2.2"
                  />
                </g>
              );
            })}
          </svg>
        </div>
      </article>

      <div className="legacy-selection-strip">
      <article className="legacy-selection-card">
        <div className="legacy-tool-panel__header">
          <div>
            <span className="summary-label">Note Input</span>
            <h2>Add notes to the staff</h2>
            <p>Click any pitch to add it at the selected octave. In chord mode, new notes stack on the current beat.</p>
          </div>
        </div>
        <div className="notation-note-grid">
          {NOTE_INPUTS.map((group) => (
            <div key={group.join("-")} className="toolbar-cluster">
              {group.map((note) => (
                <button key={note} className={note.includes("#") ? "ghost-button" : "secondary-button"} onClick={() => addNote(note)}>
                  {note}
                </button>
              ))}
            </div>
          ))}
        </div>
      </article>

      {showPianoRoll ? (
        <article className="legacy-selection-card">
          <div className="legacy-tool-panel__header">
            <div>
              <span className="summary-label">Piano Roll</span>
              <h2>Grid Preview</h2>
            </div>
          </div>
          <div className="piano-roll-grid" style={{ gridTemplateColumns: `repeat(${pianoRoll.steps}, minmax(36px, 1fr))` }}>
            {Array.from({ length: pianoRoll.maxMidi - pianoRoll.minMidi + 1 }, (_, rowIndex) => {
              const midi = pianoRoll.maxMidi - rowIndex;
              return Array.from({ length: pianoRoll.steps }, (_, stepIndex) => {
                const active = pianoRoll.rows.some((row) => row.midi === midi && row.step === stepIndex);
                return (
                  <div
                    key={`${midi}-${stepIndex}`}
                    className={`piano-roll-cell ${active ? "is-active" : ""}`}
                  />
                );
              });
            })}
          </div>
        </article>
      ) : null}
      </div>
      </div>
    </section>
  );
}
