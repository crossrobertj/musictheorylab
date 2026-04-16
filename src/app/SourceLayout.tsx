import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { featureRegistry } from "./featureRegistry";
import { useAppStore } from "./store/useAppStore";
import { INSTRUMENT_CONFIGS, KEY_OPTIONS } from "../domain/generated/theory-data";
import { getRootFromKey } from "../domain/music";
import { stopAllAudio, unlockAudio } from "../audio/audioEngine";

export function SourceLayout() {
  const location = useLocation();
  const currentKey = useAppStore((state) => state.currentKey);
  const currentInstrument = useAppStore((state) => state.currentInstrument);
  const tempo = useAppStore((state) => state.tempo);
  const soundEnabled = useAppStore((state) => state.soundEnabled);
  const setCurrentView = useAppStore((state) => state.setCurrentView);
  const setCurrentKey = useAppStore((state) => state.setCurrentKey);
  const setCurrentInstrument = useAppStore((state) => state.setCurrentInstrument);
  const setTempo = useAppStore((state) => state.setTempo);
  const setSoundEnabled = useAppStore((state) => state.setSoundEnabled);

  const groupedFeatures = useMemo(() => {
    const groups = new Map<string, typeof featureRegistry>();
    featureRegistry.forEach((feature) => {
      const existing = groups.get(feature.section) ?? [];
      existing.push(feature);
      groups.set(feature.section, existing);
    });
    return Array.from(groups.entries());
  }, []);

  useEffect(() => {
    const match = location.pathname.match(/\/app\/([^/]+)/);
    if (match?.[1]) {
      setCurrentView(match[1]);
    }
  }, [location.pathname, setCurrentView]);

  return (
    <div className="source-app-shell" onPointerDownCapture={() => void unlockAudio()}>
      <aside className="source-sidebar">
        <div className="brand-block">
          <span className="brand-kicker">Music Theory Lab</span>
          <h1>Source Rewrite</h1>
          <p>
            Ported features run from extracted source modules. Unported tools open in the standalone
            legacy page until they are replaced.
          </p>
        </div>

        <nav className="sidebar-nav" aria-label="Feature navigation">
          {groupedFeatures.map(([section, features]) => (
            <div className="nav-section" key={section}>
              <span className="nav-section-title">{section}</span>
              {features.map((feature) =>
                feature.kind === "source" ? (
                  <NavLink
                    key={feature.id}
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "is-active" : ""} ${feature.kind === "legacy" ? "is-legacy" : ""}`
                    }
                    to={`/app/${feature.id}`}
                  >
                    <span>{feature.label}</span>
                    <small>{feature.description}</small>
                  </NavLink>
                ) : (
                  <a
                    key={feature.id}
                    className="nav-link is-legacy"
                    href={`/legacy.html#view=${encodeURIComponent(
                      feature.legacyView || feature.id,
                    )}&key=${encodeURIComponent(currentKey)}`}
                  >
                    <span>{feature.label}</span>
                    <small>{feature.description}</small>
                  </a>
                ),
              )}
            </div>
          ))}
        </nav>
      </aside>

      <main className="source-main">
        <header className="source-toolbar">
          <div className="toolbar-intro">
            <span className="eyebrow">Active Key</span>
            <strong>{currentKey}</strong>
            <small>Root {getRootFromKey(currentKey)}</small>
          </div>

          <div className="toolbar-cluster">
            <label className="select-field">
              <span>Key</span>
              <select value={currentKey} onChange={(event) => setCurrentKey(event.target.value)}>
                {KEY_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="select-field">
              <span>Instrument</span>
              <select
                value={currentInstrument}
                onChange={(event) => setCurrentInstrument(event.target.value)}
              >
                {Object.entries(INSTRUMENT_CONFIGS).map(([instrumentId, config]) => (
                  <option key={instrumentId} value={instrumentId}>
                    {config.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="range-field">
              <span>Tempo</span>
              <input
                type="range"
                min="60"
                max="180"
                value={tempo}
                onChange={(event) => setTempo(Number.parseInt(event.target.value, 10))}
              />
              <strong>{tempo} BPM</strong>
            </label>
          </div>

          <div className="toolbar-actions">
            <button
              className={soundEnabled ? "secondary-button" : "secondary-button is-muted"}
              onClick={() => setSoundEnabled(!soundEnabled)}
            >
              {soundEnabled ? "Sound On" : "Sound Off"}
            </button>
            <button className="ghost-button" onClick={() => stopAllAudio()}>
              Stop
            </button>
            <a className="ghost-button" href={`/legacy.html#key=${encodeURIComponent(currentKey)}`}>
              Open Full Legacy App
            </a>
          </div>
        </header>

        <Outlet />
      </main>
    </div>
  );
}
