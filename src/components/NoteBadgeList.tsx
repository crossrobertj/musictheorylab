import { formatNote } from "../domain/music";

interface NoteBadgeListProps {
  notes: string[];
  keySignature: string;
}

export function NoteBadgeList({ notes, keySignature }: NoteBadgeListProps) {
  return (
    <div className="note-badge-list">
      {notes.map((note) => (
        <span className="note-badge" key={`${note}-${keySignature}`}>
          {formatNote(note, keySignature)}
        </span>
      ))}
    </div>
  );
}
