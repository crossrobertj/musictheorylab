import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { featureRegistry } from "./featureRegistry";
import { useAppStore } from "./store/useAppStore";
import { useCustomInstrumentStore } from "./store/useCustomInstrumentStore";
import { KEY_OPTIONS } from "../domain/generated/theory-data";
import { getInstrumentEntries } from "../domain/instruments";
import { getRootFromKey } from "../domain/music";
import { stopAllAudio, unlockAudio } from "../audio/audioEngine";

export function SourceLayout() {
  const location = useLocation();
  const [navQuery, setNavQuery] = useState("");
  const currentKey = useAppStore((state) => state.currentKey);
  const currentInstrument = useAppStore((state) => state.currentInstrument);
  const customInstruments = useCustomInstrumentStore((state) => state.customInstruments);
  const tempo = useAppStore((state) => state.tempo);
  const soundEnabled = useAppStore((state) => state.soundEnabled);
  const setCurrentView = useAppStore((state) => state.setCurrentView);
  const setCurrentKey = useAppStore((state) => state.setCurrentKey);
  const setCurrentInstrument = useAppStore((state) => state.setCurrentInstrument);
  const setTempo = useAppStore((state) => state.setTempo);
  const setSoundEnabled = useAppStore((state) => state.setSoundEnabled);

  const activeFeature = useMemo(() => {
    const match = location.pathname.match(/\/app\/([^/]+)/);
    if (!match?.[1]) return null;
    return featureRegistry.find((feature) => feature.id === match[1]) ?? null;
  }, [location.pathname]);

  const groupedFeatures = useMemo(() => {
    const normalizedQuery = navQuery.trim().toLowerCase();
    const visibleFeatures = normalizedQuery
      ? featureRegistry.filter((feature) =>
          [feature.label, feature.section, feature.description]
            .join(" ")
            .toLowerCase()
            .includes(normalizedQuery),
        )
      : featureRegistry;
    const groups = new Map<string, typeof featureRegistry>();
    visibleFeatures.forEach((feature) => {
      const existing = groups.get(feature.section) ?? [];
      existing.push(feature);
      groups.set(feature.section, existing);
    });
    return Array.from(groups.entries());
  }, [navQuery]);

  const instrumentEntries = useMemo(
    () => getInstrumentEntries(customInstruments),
    [customInstruments],
  );

  useEffect(() => {
    const match = location.pathname.match(/\/app\/([^/]+)/);
    if (match?.[1]) {
      setCurrentView(match[1]);
    }
  }, [location.pathname, setCurrentView]);

  useEffect(() => {
    document.title = activeFeature
      ? `${activeFeature.label} | Music Theory Lab`
      : "Music Theory Lab";
  }, [activeFeature]);

  return (
    <div className="source-app-shell" onPointerDownCapture={() => void unlockAudio()}>
      <aside className="source-sidebar">
        <div className="brand-block">
          <span className="brand-kicker">Music Theory Lab</span>
          <h1>Creative Theory Workbench</h1>
          <p>
            Explore harmony, instruments, rhythm, and songwriting from one source-side app shell.
            The legacy build remains available only as a reference archive.
          </p>
        </div>

        <label className="search-field sidebar-search-field">
          <span>Find Feature</span>
          <input
            aria-label="Find feature"
            placeholder="Search chords, scales, rhythm..."
            value={navQuery}
            onChange={(event) => setNavQuery(event.target.value)}
          />
        </label>

        <nav className="sidebar-nav" aria-label="Feature navigation">
          {groupedFeatures.length ? (
            groupedFeatures.map(([section, features]) => (
              <div className="nav-section" key={section}>
                <span className="nav-section-title">{section}</span>
                {features.map((feature) =>
                  feature.kind === "source" ? (
                    <NavLink
                      key={feature.id}
                      className={({ isActive }) => `nav-link ${isActive ? "is-active" : ""}`}
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
            ))
          ) : (
            <div className="nav-empty-state">
              <strong>No matching features</strong>
              <small>Try a broader search term like harmony, rhythm, or guide.</small>
            </div>
          )}
        </nav>
      </aside>

      <main className="source-main">
        <header className="source-toolbar">
          <div className="toolbar-intro">
            <span className="eyebrow">{activeFeature?.section ?? "Music Theory Lab"}</span>
            <strong>{activeFeature?.label ?? currentKey}</strong>
            <small>
              Active key {currentKey} • Root {getRootFromKey(currentKey)}
            </small>
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
                {instrumentEntries.map(([instrumentId, config]) => (
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
              Open Legacy Reference
            </a>
          </div>
        </header>

        <Outlet />
      </main>
    </div>
  );
}
