import { formatNoteClass, normalizeNote } from "../domain/music";

const WHITE_KEYS = ["C", "D", "E", "F", "G", "A", "B"];
const BLACK_KEYS = [
  { note: "C#", left: 11.5 },
  { note: "D#", left: 25.5 },
  { note: "F#", left: 54.5 },
  { note: "G#", left: 68.5 },
  { note: "A#", left: 82.5 },
];

interface KeyboardPreviewProps {
  activeNotes: string[];
  keySignature: string;
}

export function KeyboardPreview({ activeNotes, keySignature }: KeyboardPreviewProps) {
  const activeClasses = new Set(
    activeNotes.map((note) => normalizeNote(note).replace(/[0-9]/g, "")),
  );

  return (
    <div className="keyboard-preview" aria-hidden="true">
      <div className="keyboard-white-keys">
        {WHITE_KEYS.map((note) => (
          <div
            key={note}
            className={`keyboard-white-key ${activeClasses.has(note) ? "is-active" : ""}`}
          >
            <span>{formatNoteClass(note, keySignature)}</span>
          </div>
        ))}
      </div>
      {BLACK_KEYS.map((blackKey) => (
        <div
          key={blackKey.note}
          className={`keyboard-black-key ${activeClasses.has(blackKey.note) ? "is-active" : ""}`}
          style={{ left: `${blackKey.left}%` }}
        >
          <span>{formatNoteClass(blackKey.note, keySignature)}</span>
        </div>
      ))}
    </div>
  );
}
