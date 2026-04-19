import { InstrumentBoard } from "./InstrumentBoard";
import { formatNote, isMicrotonalNote } from "../domain/music";

interface KeyboardPreviewProps {
  activeNotes: string[];
  keySignature: string;
}

export function KeyboardPreview({ activeNotes, keySignature }: KeyboardPreviewProps) {
  const microtonalNotes = activeNotes.filter((note) => isMicrotonalNote(note));

  return (
    <div className="keyboard-preview">
      {microtonalNotes.length ? (
        <div className="keyboard-preview__microtones">
          <span className="keyboard-preview__microtones-label">Microtonal pitches</span>
          <div className="keyboard-preview__microtones-list">
            {microtonalNotes.map((note) => (
              <span className="keyboard-preview__microtone-chip" key={`${note}-${keySignature}`}>
                {formatNote(note, keySignature)}
              </span>
            ))}
          </div>
        </div>
      ) : null}
      <InstrumentBoard
        instrumentId="piano"
        activeNotes={activeNotes}
        keySignature={keySignature}
      />
    </div>
  );
}
