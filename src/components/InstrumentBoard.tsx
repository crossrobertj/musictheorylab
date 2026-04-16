import { playNote } from "../audio/audioEngine";
import { INSTRUMENT_CONFIGS } from "../domain/generated/theory-data";
import { formatNoteClass, getNoteAtFret, getNoteClass } from "../domain/music";

interface InstrumentBoardProps {
  instrumentId: keyof typeof INSTRUMENT_CONFIGS;
  activeNotes: string[];
  keySignature: string;
  onNoteClick?: (note: string) => void;
}

const WHITE_NOTES = ["C", "D", "E", "F", "G", "A", "B"];
const BLACK_NOTES = [
  { note: "C#", offset: 0 },
  { note: "D#", offset: 1 },
  { note: "F#", offset: 3 },
  { note: "G#", offset: 4 },
  { note: "A#", offset: 5 },
];

function buildActiveClassSet(activeNotes: string[]) {
  return new Set(activeNotes.map((note) => getNoteClass(note)));
}

function handlePress(note: string, onNoteClick?: (note: string) => void) {
  playNote(note);
  onNoteClick?.(note);
}

function PianoBoard({ activeNotes, keySignature, onNoteClick }: Omit<InstrumentBoardProps, "instrumentId">) {
  const activeClasses = buildActiveClassSet(activeNotes);
  const octaves = [3, 4, 5];

  return (
    <div className="instrument-board instrument-board--piano">
      <div className="piano-board">
        <div className="piano-white-lane">
          {octaves.flatMap((octave) =>
            WHITE_NOTES.map((note) => {
              const noteName = `${note}${octave}`;
              const isActive = activeClasses.has(note);
              return (
                <button
                  key={noteName}
                  className={`piano-key piano-key--white ${isActive ? "is-active" : ""}`}
                  onClick={() => handlePress(noteName, onNoteClick)}
                >
                  <span>{formatNoteClass(note, keySignature)}</span>
                </button>
              );
            }),
          )}
        </div>
        <div className="piano-black-lane">
          {octaves.flatMap((octave, octaveIndex) =>
            BLACK_NOTES.map((blackNote) => {
              const noteName = `${blackNote.note}${octave}`;
              const isActive = activeClasses.has(blackNote.note);
              return (
                <button
                  key={noteName}
                  className={`piano-key piano-key--black ${isActive ? "is-active" : ""}`}
                  style={{
                    left: `calc(var(--white-key-width) * ${octaveIndex * 7 + blackNote.offset + 0.72})`,
                  }}
                  onClick={() => handlePress(noteName, onNoteClick)}
                >
                  <span>{formatNoteClass(blackNote.note, keySignature)}</span>
                </button>
              );
            }),
          )}
        </div>
      </div>
    </div>
  );
}

function FretboardBoard({
  instrumentId,
  activeNotes,
  keySignature,
  onNoteClick,
}: InstrumentBoardProps) {
  const config = INSTRUMENT_CONFIGS[instrumentId];
  if (config.type !== "fretboard") return null;

  const displayFrets = Math.min(config.frets, 15);
  const activeClasses = buildActiveClassSet(activeNotes);
  const displayStrings = [...config.strings].reverse();

  return (
    <div className="instrument-board instrument-board--fretboard">
      <div className="fretboard-scroll">
        <div className="fretboard-board">
          {displayStrings.map((openNote, rowIndex) => {
            const sourceIndex = config.strings.length - 1 - rowIndex;
            return (
              <div className="fretboard-row" key={`${instrumentId}-${openNote}-${rowIndex}`}>
                <div className="fretboard-open-label">{formatNoteClass(getNoteClass(openNote), keySignature)}</div>
                <div className="fretboard-frets">
                  {Array.from({ length: displayFrets + 1 }, (_, fret) => {
                    const note = getNoteAtFret(openNote, fret);
                    if (!note) return null;
                    const noteClass = getNoteClass(note);
                    const isActive = activeClasses.has(noteClass);
                    return (
                      <button
                        key={`${instrumentId}-${sourceIndex}-${fret}`}
                        className={`fret-cell ${isActive ? "is-active" : ""}`}
                        onClick={() => handlePress(note, onNoteClick)}
                      >
                        <span className="fret-number">{fret}</span>
                        <span className="fret-note">{formatNoteClass(noteClass, keySignature)}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function InstrumentBoard(props: InstrumentBoardProps) {
  const config = INSTRUMENT_CONFIGS[props.instrumentId];

  if (config.type === "piano") {
    return (
      <PianoBoard
        activeNotes={props.activeNotes}
        keySignature={props.keySignature}
        onNoteClick={props.onNoteClick}
      />
    );
  }

  return <FretboardBoard {...props} />;
}
