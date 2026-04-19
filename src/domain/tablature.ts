import { buildMidiFromNoteEvents } from "./midi";
import { type InstrumentConfig } from "./instruments";
import { NOTES, getMidiNumber, getNoteAtFret, getNoteClass, normalizeNote } from "./music";

export interface TabEvent {
  string: number;
  fret: number;
  note: string;
}

export interface TabPosition {
  string: number;
  fret: number;
  note: string;
}

export interface ParsedMidiNote {
  pitch: number;
  start: number;
  end: number;
  duration: number;
}

export interface ParsedMidiFile {
  notes: ParsedMidiNote[];
  ticksPerBeat: number;
}

export function isFretboardInstrument(config: InstrumentConfig) {
  return config.type === "fretboard";
}

export function findTabPositionForNote(
  note: string,
  config: InstrumentConfig,
): TabPosition | null {
  if (config.type !== "fretboard") return null;

  const match = normalizeNote(note).match(/^([A-G][#b]?)([0-9])?$/);
  if (!match) return null;

  const targetClass = normalizeNote(match[1]);
  const targetOctave = match[2] ? Number.parseInt(match[2], 10) : 4;
  const targetMidi = (targetOctave + 1) * 12 + NOTES.indexOf(targetClass as (typeof NOTES)[number]);

  let best: (TabPosition & { score: number }) | null = null;
  config.strings.forEach((openNote, stringIndex) => {
    const openMidi = Math.round(getMidiNumber(openNote));
    const fret = targetMidi - openMidi;
    if (fret < 0 || fret > config.frets) return;

    const resolvedNote = getNoteAtFret(openNote, fret);
    if (!resolvedNote) return;

    const score = fret + stringIndex * 0.2;
    if (!best || score < best.score) {
      best = { string: stringIndex, fret, score, note: resolvedNote };
    }
  });

  return best;
}

export function renderTextTab(config: InstrumentConfig, events: TabEvent[]) {
  if (config.type !== "fretboard") {
    return "Switch to a fretted instrument to build tablature.";
  }

  if (!events.length) {
    return "Click notes on the board or input panel to add tablature events.";
  }

  return config.strings
    .map((stringNote, stringIndex) => {
      const prefix = `${getNoteClass(stringNote).padEnd(2, " ")}|`;
      const body = events
        .map((event) => (event.string === stringIndex ? `-${String(event.fret).padStart(2, "-")}` : "---"))
        .join("");
      return `${prefix}${body}|`;
    })
    .join("\n");
}

export function buildTabMidi(events: TabEvent[], tempo = 120) {
  return buildMidiFromNoteEvents(
    events.map((event, index) => ({
      note: event.note,
      startBeats: index,
      durationBeats: 0.7,
    })),
    tempo,
  );
}

export function midiToNote(midi: number) {
  const clamped = Math.max(0, Math.min(127, midi));
  const note = NOTES[clamped % 12];
  const octave = Math.floor(clamped / 12) - 1;
  return `${note}${octave}`;
}

export function parseMidiBuffer(buffer: ArrayBuffer): ParsedMidiFile {
  const bytes = new Uint8Array(buffer);
  if (String.fromCharCode(...bytes.slice(0, 4)) !== "MThd") {
    throw new Error("Not a MIDI file");
  }

  const tracks = (bytes[10] << 8) | bytes[11];
  const ticksPerBeat = (bytes[12] << 8) | bytes[13];
  let offset = 14;
  const notes: ParsedMidiNote[] = [];

  function readVarLen() {
    let value = 0;
    while (offset < bytes.length) {
      const byte = bytes[offset++];
      value = (value << 7) | (byte & 0x7f);
      if ((byte & 0x80) === 0) break;
    }
    return value;
  }

  for (let trackIndex = 0; trackIndex < tracks; trackIndex += 1) {
    if (String.fromCharCode(...bytes.slice(offset, offset + 4)) !== "MTrk") break;
    const length =
      (bytes[offset + 4] << 24) |
      (bytes[offset + 5] << 16) |
      (bytes[offset + 6] << 8) |
      bytes[offset + 7];
    offset += 8;
    const end = offset + length;
    let time = 0;
    let running = 0;
    const active = new Map<number, number>();

    while (offset < end) {
      time += readVarLen();
      let status = bytes[offset];
      if (status < 0x80) {
        status = running;
      } else {
        running = status;
        offset += 1;
      }

      if ((status & 0xf0) === 0x90 || (status & 0xf0) === 0x80) {
        const pitch = bytes[offset++];
        const velocity = bytes[offset++];
        const isOn = (status & 0xf0) === 0x90 && velocity > 0;
        if (isOn) {
          active.set(pitch, time);
        } else if (active.has(pitch)) {
          const start = active.get(pitch) ?? time;
          notes.push({ pitch, start, end: time, duration: Math.max(1, time - start) });
          active.delete(pitch);
        }
      } else if (status === 0xff) {
        offset += 1;
        const metaLength = readVarLen();
        offset += metaLength;
      } else if (status === 0xf0 || status === 0xf7) {
        const dataLength = readVarLen();
        offset += dataLength;
      } else {
        const high = status & 0xf0;
        offset += high === 0xc0 || high === 0xd0 ? 1 : 2;
      }
    }

    offset = end;
  }

  return { notes, ticksPerBeat };
}
