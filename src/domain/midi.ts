import { getMidiNumber } from "./music";

interface NoteEvent {
  note: string;
  startBeats: number;
  durationBeats: number;
  velocity?: number;
}

function encodeVarLen(value: number) {
  let buffer = value & 0x7f;
  const bytes = [];

  while ((value >>= 7)) {
    buffer <<= 8;
    buffer |= (value & 0x7f) | 0x80;
  }

  while (true) {
    bytes.push(buffer & 0xff);
    if (buffer & 0x80) buffer >>= 8;
    else break;
  }

  return bytes;
}

function buildTrackData(
  events: NoteEvent[],
  bpm = 120,
  ticksPerBeat = 480,
) {
  const midiEvents = events.flatMap((event) => {
    const note = Math.max(0, Math.min(127, Math.round(getMidiNumber(event.note))));
    const velocity = Math.max(1, Math.min(127, Math.round((event.velocity ?? 0.78) * 127)));
    const startTick = Math.round(event.startBeats * ticksPerBeat);
    const endTick = Math.max(startTick + 1, Math.round((event.startBeats + event.durationBeats) * ticksPerBeat));

    return [
      { tick: startTick, bytes: [0x90, note, velocity] },
      { tick: endTick, bytes: [0x80, note, 0] },
    ];
  });

  midiEvents.sort((left, right) => left.tick - right.tick || left.bytes[0] - right.bytes[0]);

  const trackBytes = [];
  const tempoValue = Math.round(60000000 / Math.max(30, bpm));

  trackBytes.push(...encodeVarLen(0), 0xff, 0x51, 0x03);
  trackBytes.push((tempoValue >> 16) & 0xff, (tempoValue >> 8) & 0xff, tempoValue & 0xff);

  let previousTick = 0;
  midiEvents.forEach((event) => {
    const delta = Math.max(0, event.tick - previousTick);
    trackBytes.push(...encodeVarLen(delta), ...event.bytes);
    previousTick = event.tick;
  });

  trackBytes.push(...encodeVarLen(0), 0xff, 0x2f, 0x00);
  return new Uint8Array(trackBytes);
}

export function buildMidiFromNoteEvents(events: NoteEvent[], bpm = 120, ticksPerBeat = 480) {
  const trackData = buildTrackData(events, bpm, ticksPerBeat);
  const header = new Uint8Array([
    0x4d, 0x54, 0x68, 0x64,
    0x00, 0x00, 0x00, 0x06,
    0x00, 0x00,
    0x00, 0x01,
    (ticksPerBeat >> 8) & 0xff, ticksPerBeat & 0xff,
    0x4d, 0x54, 0x72, 0x6b,
    (trackData.length >> 24) & 0xff,
    (trackData.length >> 16) & 0xff,
    (trackData.length >> 8) & 0xff,
    trackData.length & 0xff,
  ]);

  const output = new Uint8Array(header.length + trackData.length);
  output.set(header, 0);
  output.set(trackData, header.length);
  return output;
}

export function buildMidiFromNoteSequence(
  notes: string[],
  bpm = 120,
  stepBeats = 1,
  durationBeats = 0.8,
) {
  return buildMidiFromNoteEvents(
    notes.map((note, index) => ({
      note,
      startBeats: index * stepBeats,
      durationBeats,
    })),
    bpm,
  );
}

export function buildMidiFromChordProgression(
  chords: string[][],
  bpm = 120,
  chordBeats = 4,
  durationBeats = 3.6,
) {
  return buildMidiFromNoteEvents(
    chords.flatMap((chord, chordIndex) =>
      chord.map((note) => ({
        note,
        startBeats: chordIndex * chordBeats,
        durationBeats,
      })),
    ),
    bpm,
  );
}

export function downloadMidiFile(data: Uint8Array, filename: string) {
  const blob = new Blob([new Uint8Array(data)], { type: "audio/midi" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}
