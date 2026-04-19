import { useCallback, useEffect, useMemo, useState } from "react";
import { useShellBridgeStore } from "../../app/store/useShellBridgeStore";
import { MIXING_GUIDE_LIBRARY } from "../../domain/production";

const DEFAULT_FAMILY = MIXING_GUIDE_LIBRARY[0];
const DEFAULT_INSTRUMENT = DEFAULT_FAMILY.instruments[0];
const MIXING_TITLE = "Mixing Guide";
const MIXING_SUBTITLE = "Legacy mixing starting points for common instrument families.";

export function MixingGuidePage() {
  const updateRoute = useShellBridgeStore((state) => state.updateRoute);
  const [familyName, setFamilyName] = useState(DEFAULT_FAMILY.family);
  const family = useMemo(
    () => MIXING_GUIDE_LIBRARY.find((entry) => entry.family === familyName) ?? MIXING_GUIDE_LIBRARY[0],
    [familyName],
  );
  const [instrumentName, setInstrumentName] = useState(DEFAULT_INSTRUMENT.name);
  const profile = useMemo(
    () => family.instruments.find((entry) => entry.name === instrumentName) ?? family.instruments[0],
    [family, instrumentName],
  );
  const playableLabel = `${family.family} • ${profile.name} • ${profile.role}`;
  const clear = useCallback(() => {
    setFamilyName(DEFAULT_FAMILY.family);
    setInstrumentName(DEFAULT_INSTRUMENT.name);
  }, []);

  useEffect(() => {
    updateRoute("mixing", {
      title: MIXING_TITLE,
      subtitle: MIXING_SUBTITLE,
      playableLabel,
      playableNoteSet: [],
      playCurrent: null,
      clear,
    });
  }, [clear, playableLabel, updateRoute]);

  return (
    <section className="page-section">
      <article className="legacy-tool-panel">
        <div className="legacy-tool-panel__header">
          <div>
            <span className="eyebrow">Studio Reference</span>
            <h1 className="legacy-tool-panel__title">Mixing Guide</h1>
            <p className="legacy-tool-panel__copy">
              Instrument-focused starting points for EQ, compression, panning, space, and chain
              order in the denser legacy reference format.
            </p>
          </div>
          <div className="legacy-toolbar-row">
            <span className="legacy-toolbar-chip">
              Family <strong>{family.family}</strong>
            </span>
            <span className="legacy-toolbar-chip">
              Profile <strong>{profile.name}</strong>
            </span>
          </div>
        </div>
        <div className="production-selector-grid">
          <label className="select-field">
            <span>Family</span>
            <select
              value={family.family}
              onChange={(event) => {
                const nextFamily =
                  MIXING_GUIDE_LIBRARY.find((entry) => entry.family === event.target.value) ??
                  MIXING_GUIDE_LIBRARY[0];
                setFamilyName(nextFamily.family);
                setInstrumentName(nextFamily.instruments[0].name);
              }}
            >
              {MIXING_GUIDE_LIBRARY.map((entry) => (
                <option key={entry.family} value={entry.family}>
                  {entry.family}
                </option>
              ))}
            </select>
          </label>
          <label className="select-field">
            <span>Instrument</span>
            <select value={profile.name} onChange={(event) => setInstrumentName(event.target.value)}>
              {family.instruments.map((entry) => (
                <option key={entry.name} value={entry.name}>
                  {entry.name}
                </option>
              ))}
            </select>
          </label>
        </div>
      </article>

      <div className="legacy-lab-grid">
        <article className="legacy-preview-panel">
          <div className="legacy-tool-panel__header">
            <div>
              <span className="summary-label">Profile</span>
              <h2>{profile.name}</h2>
              <p>{profile.role}</p>
            </div>
          </div>
          <div className="legacy-preview-panel__meta">
            <span className="legacy-preview-chip">{profile.freq}</span>
            <span className="legacy-preview-chip">{profile.chain}</span>
          </div>
        </article>

        <article className="legacy-selection-card">
          <span className="summary-label">Common Pitfalls</span>
          <h2>{profile.name}</h2>
          <div className="theory-guide-list-block">
            <ul className="theory-guide-list">
              {profile.pitfalls
                .split(". ")
                .filter(Boolean)
                .map((pitfall) => (
                  <li key={pitfall}>{pitfall.replace(/\.$/, "")}</li>
                ))}
            </ul>
          </div>
        </article>
      </div>

      <div className="legacy-catalog-grid">
        <article className="legacy-catalog-card">
          <span className="legacy-catalog-card__eyebrow">EQ Start</span>
          <h3 className="legacy-catalog-card__title">{profile.eq}</h3>
          <p className="legacy-catalog-card__subtitle">
            Subtractive moves first, then decide whether any additive lift is still necessary.
          </p>
        </article>
        <article className="legacy-catalog-card">
          <span className="legacy-catalog-card__eyebrow">Compression</span>
          <h3 className="legacy-catalog-card__title">{profile.comp}</h3>
          <p className="legacy-catalog-card__subtitle">
            Treat these settings as a range, not a preset. The source performance still decides the envelope.
          </p>
        </article>
        <article className="legacy-catalog-card">
          <span className="legacy-catalog-card__eyebrow">Panning & Space</span>
          <h3 className="legacy-catalog-card__title">{profile.pan}</h3>
          <p className="legacy-catalog-card__subtitle">{profile.space}</p>
        </article>
      </div>

      <article className="legacy-tool-panel">
        <div className="legacy-tool-panel__header">
          <div>
            <span className="summary-label">Chain Template</span>
            <h2>{profile.chain}</h2>
            <p>Start here, then simplify if the source tone already solves the problem.</p>
          </div>
        </div>
        <div className="legacy-preview-panel__meta">
          <span className="legacy-preview-chip">Frequency Focus {profile.freq}</span>
          <span className="legacy-preview-chip">Profile {profile.name}</span>
        </div>
      </article>
    </section>
  );
}
