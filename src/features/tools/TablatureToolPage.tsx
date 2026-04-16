import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import { playNote, stopAllAudio } from "../../audio/audioEngine";
import { useAppStore } from "../../app/store/useAppStore";
import { useCustomInstrumentStore } from "../../app/store/useCustomInstrumentStore";
import { InstrumentBoard } from "../../components/InstrumentBoard";
import { NoteBadgeList } from "../../components/NoteBadgeList";
import { findExactChordMatches, getCompatibleScalesForNoteClasses } from "../../domain/finder";
import { downloadMidiFile } from "../../domain/midi";
import { getInstrumentEntries, getInstrumentConfig } from "../../domain/instruments";
import { NOTES, getNoteClass } from "../../domain/music";
import {
  buildTabMidi,
  findTabPositionForNote,
  isFretboardInstrument,
  midiToNote,
  parseMidiBuffer,
  renderTextTab,
  type TabEvent,
} from "../../domain/tablature";

const NOTE_INPUTS = [
  ["C", "C#"],
  ["D", "D#"],
  ["E"],
  ["F", "F#"],
  ["G", "G#"],
  ["A", "A#"],
  ["B"],
];

function getDefaultTargetInstrument(currentInstrument: string, availableIds: string[]) {
  if (availableIds.includes(currentInstrument)) return currentInstrument;
  if (availableIds.includes("guitar")) return "guitar";
  return availableIds[0] ?? "guitar";
}

export function TablatureToolPage() {
  const currentKey = useAppStore((state) => state.currentKey);
  const currentInstrument = useAppStore((state) => state.currentInstrument);
  const tempo = useAppStore((state) => state.tempo);
  const customInstruments = useCustomInstrumentStore((state) => state.customInstruments);
  const [octave, setOctave] = useState("4");
  const [tabEvents, setTabEvents] = useState<TabEvent[]>([]);
  const [midiAnalysis, setMidiAnalysis] = useState<string>("Upload a MIDI file to inspect pitch range, chord hints, and scale candidates.");

  const fretboardEntries = useMemo(
    () =>
      getInstrumentEntries(customInstruments).filter(([, config]) =>
        isFretboardInstrument(config),
      ),
    [customInstruments],
  );

  const [targetInstrument, setTargetInstrument] = useState(() =>
    getDefaultTargetInstrument(
      currentInstrument,
      fretboardEntries.map(([id]) => id),
    ),
  );

  useEffect(() => {
    const availableIds = fretboardEntries.map(([id]) => id);
    const nextDefault = getDefaultTargetInstrument(currentInstrument, availableIds);
    if (!availableIds.includes(targetInstrument) && nextDefault) {
      setTargetInstrument(nextDefault);
    }
  }, [currentInstrument, fretboardEntries, targetInstrument]);

  const instrumentConfig = getInstrumentConfig(targetInstrument, customInstruments);
  const fretboardConfig = instrumentConfig.type === "fretboard" ? instrumentConfig : null;
  const activeNotes = tabEvents.map((event) => event.note);
  const renderedTab = useMemo(() => renderTextTab(instrumentConfig, tabEvents), [instrumentConfig, tabEvents]);
  const noteClasses = useMemo(
    () => [...new Set(tabEvents.map((event) => getNoteClass(event.note)))],
    [tabEvents],
  );

  function addNote(note: string) {
    if (!fretboardConfig) return;
    const mapped = findTabPositionForNote(`${note}${octave}`, fretboardConfig);
    if (!mapped) return;
    setTabEvents((current) => [
      ...current,
      { string: mapped.string, fret: mapped.fret, note: mapped.note },
    ]);
  }

  function addBoardNote(note: string) {
    if (!fretboardConfig) return;
    const mapped = findTabPositionForNote(note, fretboardConfig);
    if (!mapped) return;
    setTabEvents((current) => [
      ...current,
      { string: mapped.string, fret: mapped.fret, note: mapped.note },
    ]);
  }

  function clearTab() {
    setTabEvents([]);
  }

  function removeLast() {
    setTabEvents((current) => current.slice(0, -1));
  }

  function playTab() {
    stopAllAudio();
    tabEvents.forEach((event, index) => {
      window.setTimeout(() => {
        playNote(event.note, Math.max(180, (60000 / Math.max(tempo, 40)) * 0.85));
      }, index * (60000 / Math.max(tempo, 40)));
    });
  }

  async function handleMidiUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const buffer = await file.arrayBuffer();
      const parsed = parseMidiBuffer(buffer);
      if (!parsed.notes.length) {
        setMidiAnalysis("No playable note events were detected in that MIDI file.");
        return;
      }

      const pitches = parsed.notes.map((note) => note.pitch);
      const noteClasses = [...new Set(pitches.map((pitch) => NOTES[pitch % 12]))];
      const lowest = Math.min(...pitches);
      const highest = Math.max(...pitches);
      const averageDuration = Math.round(
        parsed.notes.reduce((sum, note) => sum + note.duration, 0) / parsed.notes.length,
      );
      const chordHints = findExactChordMatches(noteClasses).map((match) => match.name).slice(0, 8);
      const scaleHints = getCompatibleScalesForNoteClasses(noteClasses, 8).map((match) => match.name);

      setMidiAnalysis(
        [
          `${file.name}`,
          `Events: ${parsed.notes.length}`,
          `Range: ${midiToNote(lowest)} - ${midiToNote(highest)}`,
          `Pitch Classes: ${noteClasses.join(", ")}`,
          `Avg Duration: ${averageDuration} ticks`,
          `Chord Hints: ${chordHints.length ? chordHints.join(", ") : "No exact template match"}`,
          `Scale Hints: ${scaleHints.length ? scaleHints.join(", ") : "No close scale match"}`,
        ].join("\n"),
      );
    } catch (error) {
      setMidiAnalysis(
        `MIDI parse failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    } finally {
      event.target.value = "";
    }
  }

  return (
    <section className="page-section">
      <div className="page-hero">
        <div>
          <span className="eyebrow">Source Feature</span>
          <h1>Tablature Tool</h1>
          <p>
            Build text tablature directly in the source app, map pitches to the nearest playable
            fret positions, audition the line, and inspect imported MIDI pitch content.
          </p>
        </div>
        <div className="hero-actions">
          <button className="primary-button" onClick={playTab}>
            Play Tab
          </button>
          <button
            className="ghost-button"
            onClick={() => downloadMidiFile(buildTabMidi(tabEvents, tempo), "tablature-export.mid")}
          >
            Export MIDI
          </button>
        </div>
      </div>

      <div className="summary-grid">
        <article className="summary-card">
          <span className="summary-label">Target Instrument</span>
          <h2>{instrumentConfig.name}</h2>
          <p>Only fretboard-capable instruments appear here, including saved custom ones.</p>
        </article>
        <article className="summary-card">
          <span className="summary-label">Tab Events</span>
          <h2>{tabEvents.length}</h2>
          <p>{tabEvents.length ? `Last note ${tabEvents[tabEvents.length - 1].note}` : "Start adding notes from the board or input buttons."}</p>
          {noteClasses.length ? <NoteBadgeList notes={noteClasses.map((note) => `${note}4`)} keySignature={currentKey} /> : null}
        </article>
        <article className="summary-card">
          <span className="summary-label">Actions</span>
          <h2>{tempo} BPM</h2>
          <div className="toolbar-cluster">
            <button className="ghost-button" onClick={removeLast}>
              Remove Last
            </button>
            <button className="ghost-button" onClick={clearTab}>
              Clear Tab
            </button>
          </div>
        </article>
      </div>

      <article className="detail-card">
        <div className="detail-header">
          <div>
            <span className="summary-label">Input</span>
            <h2>Map notes to playable fret positions</h2>
            <p>Click the fretboard directly or use the note buttons below to add the nearest valid tab event.</p>
          </div>
          <div className="production-selector-grid">
            <label className="select-field">
              <span>Instrument</span>
              <select value={targetInstrument} onChange={(event) => setTargetInstrument(event.target.value)}>
                {fretboardEntries.map(([id, config]) => (
                  <option key={id} value={id}>
                    {config.name}
                  </option>
                ))}
              </select>
            </label>
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
          </div>
        </div>
        <InstrumentBoard
          instrumentId={targetInstrument}
          activeNotes={activeNotes}
          keySignature={currentKey}
          onNoteClick={addBoardNote}
        />
      </article>

      <article className="detail-card">
        <div className="detail-header">
          <div>
            <span className="summary-label">Quick Notes</span>
            <h2>Add pitches without using the fretboard</h2>
          </div>
        </div>
        <div className="notation-note-grid">
          {NOTE_INPUTS.map((group) => (
            <div key={group.join("-")} className="toolbar-cluster">
              {group.map((note) => (
                <button
                  key={note}
                  className={note.includes("#") ? "ghost-button" : "secondary-button"}
                  onClick={() => addNote(note)}
                >
                  {note}
                </button>
              ))}
            </div>
          ))}
        </div>
      </article>

      <div className="tuning-layout">
        <article className="detail-card">
          <div className="detail-header">
            <div>
              <span className="summary-label">Tab Output</span>
              <h2>Rendered tablature</h2>
            </div>
          </div>
          <pre className="tab-preview">{renderedTab}</pre>
        </article>

        <article className="detail-card">
          <div className="detail-header">
            <div>
              <span className="summary-label">MIDI Import</span>
              <h2>Pitch analysis</h2>
            </div>
            <label className="ghost-button">
              <input
                type="file"
                accept=".mid,.midi,audio/midi,audio/x-midi"
                className="visually-hidden"
                onChange={handleMidiUpload}
              />
              Upload MIDI
            </label>
          </div>
          <pre className="tab-preview tab-preview--analysis">{midiAnalysis}</pre>
        </article>
      </div>
    </section>
  );
}
