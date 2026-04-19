import { useEffect, useState } from "react";

interface LegacyPlaybackBarProps {
  playableLabel: string;
  canPlayCurrent: boolean;
  metronomeEnabled: boolean;
  arpeggioMode: boolean;
  strumSpeed: number;
  drone: boolean;
  soundEnabled: boolean;
  tempo: number;
  onPlayCurrent: () => void;
  onToggleMetronome: () => void;
  onSetArpeggioMode: (enabled: boolean) => void;
  onSetStrumSpeed: (speed: number) => void;
  onSetDrone: (enabled: boolean) => void;
  onSetSoundEnabled: (enabled: boolean) => void;
  onSetTempo: (tempo: number) => void;
}

export function LegacyPlaybackBar({
  playableLabel,
  canPlayCurrent,
  metronomeEnabled,
  arpeggioMode,
  strumSpeed,
  drone,
  soundEnabled,
  tempo,
  onPlayCurrent,
  onToggleMetronome,
  onSetArpeggioMode,
  onSetStrumSpeed,
  onSetDrone,
  onSetSoundEnabled,
  onSetTempo,
}: LegacyPlaybackBarProps) {
  const [activePulse, setActivePulse] = useState(0);

  useEffect(() => {
    if (!metronomeEnabled) {
      setActivePulse(0);
      return;
    }

    const pulseInterval = window.setInterval(() => {
      setActivePulse((current) => (current + 1) % 4);
    }, Math.max(120, Math.round(60000 / Math.max(tempo, 40))));

    return () => window.clearInterval(pulseInterval);
  }, [metronomeEnabled, tempo]);

  return (
    <section aria-label="Playback Controls" className="legacy-playback-bar">
      <div className="legacy-playback-bar__left">
        <button
          aria-label="Play"
          className="legacy-play-button"
          disabled={!canPlayCurrent}
          onClick={onPlayCurrent}
          title={playableLabel || "No current selection"}
          type="button"
        >
          <i aria-hidden="true" className="fas fa-play" />
        </button>

        <button
          className={`legacy-secondary-button ${metronomeEnabled ? "is-active" : ""}`}
          onClick={onToggleMetronome}
          type="button"
        >
          <i aria-hidden="true" className="fas fa-stopwatch" />
          Metronome: {metronomeEnabled ? "ON" : "OFF"}
        </button>

        <div className="legacy-playback-bar__pulse-strip" title="Current beat in bar">
          {Array.from({ length: 4 }, (_, index) => (
            <div
              className={`pulse-dot ${index === 0 ? "is-accent" : ""} ${
                metronomeEnabled && activePulse === index ? "is-active" : ""
              }`}
              key={index}
            />
          ))}
        </div>

        <label className="legacy-inline-toggle">
          <input
            aria-label="Arpeggio"
            checked={arpeggioMode}
            onChange={(event) => onSetArpeggioMode(event.target.checked)}
            type="checkbox"
          />
          <span>Arpeggio</span>
        </label>

        <label className="legacy-inline-range">
          <span>Strum</span>
          <input
            aria-label="Strum Speed"
            max="400"
            min="20"
            onChange={(event) => onSetStrumSpeed(Number.parseInt(event.target.value, 10))}
            type="range"
            value={strumSpeed}
          />
        </label>

        <button
          className={`legacy-secondary-button ${drone ? "is-active" : ""}`}
          onClick={() => onSetDrone(!drone)}
          type="button"
        >
          Drone: {drone ? "ON" : "OFF"}
        </button>

        <button
          className={`legacy-secondary-button ${soundEnabled ? "is-active" : ""}`}
          onClick={() => onSetSoundEnabled(!soundEnabled)}
          type="button"
        >
          <i aria-hidden="true" className={`fas ${soundEnabled ? "fa-volume-up" : "fa-volume-xmark"}`} />
          Sound: {soundEnabled ? "ON" : "OFF"}
        </button>

        <span className="legacy-playback-bar__selection">{playableLabel || "No current selection"}</span>
      </div>

      <div className="legacy-playback-bar__right">
        <label className="legacy-inline-range legacy-inline-range--tempo">
          <span>Tempo</span>
          <input
            aria-label="Tempo"
            max="200"
            min="60"
            onChange={(event) => onSetTempo(Number.parseInt(event.target.value, 10))}
            type="range"
            value={tempo}
          />
        </label>
        <strong>{tempo}</strong>
        <span>BPM</span>
      </div>
    </section>
  );
}
