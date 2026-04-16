import { useMemo, useState } from "react";
import { MIXING_GUIDE_LIBRARY } from "../../domain/production";

export function MixingGuidePage() {
  const [familyName, setFamilyName] = useState(MIXING_GUIDE_LIBRARY[0].family);
  const family = useMemo(
    () => MIXING_GUIDE_LIBRARY.find((entry) => entry.family === familyName) ?? MIXING_GUIDE_LIBRARY[0],
    [familyName],
  );
  const [instrumentName, setInstrumentName] = useState(family.instruments[0].name);
  const profile = useMemo(
    () => family.instruments.find((entry) => entry.name === instrumentName) ?? family.instruments[0],
    [family, instrumentName],
  );

  return (
    <section className="page-section">
      <div className="page-hero">
        <div>
          <span className="eyebrow">Source Feature</span>
          <h1>Mixing Guide</h1>
          <p>
            Instrument-focused starting points for EQ, compression, panning, space, and chain
            order, now available without opening legacy reference panels.
          </p>
        </div>
      </div>

      <article className="detail-card">
        <div className="production-selector-grid">
          <label className="select-field">
            <span>Family</span>
            <select
              value={family.family}
              onChange={(event) => {
                const nextFamily = MIXING_GUIDE_LIBRARY.find((entry) => entry.family === event.target.value) ?? MIXING_GUIDE_LIBRARY[0];
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

      <div className="summary-grid">
        <article className="summary-card">
          <span className="summary-label">Profile</span>
          <h2>{profile.name}</h2>
          <p>{profile.role}</p>
        </article>
        <article className="summary-card">
          <span className="summary-label">Frequency Focus</span>
          <h2>{profile.freq}</h2>
          <p>Use this as the first pass when carving space around the arrangement.</p>
        </article>
        <article className="summary-card">
          <span className="summary-label">Chain Template</span>
          <h2>{profile.chain}</h2>
          <p>Start here, then simplify if the source tone already solves the problem.</p>
        </article>
      </div>

      <div className="feature-grid">
        <article className="feature-card">
          <span className="card-tag">EQ Start</span>
          <h3>{profile.eq}</h3>
          <p className="card-copy">Subtractive moves first, then decide whether any additive lift is still necessary.</p>
        </article>
        <article className="feature-card">
          <span className="card-tag">Compression</span>
          <h3>{profile.comp}</h3>
          <p className="card-copy">Treat these settings as a range, not a preset. The source performance still decides the envelope.</p>
        </article>
        <article className="feature-card">
          <span className="card-tag">Panning & Space</span>
          <h3>{profile.pan}</h3>
          <p className="card-copy">{profile.space}</p>
        </article>
      </div>

      <article className="detail-card">
        <div className="detail-header">
          <div>
            <span className="summary-label">Common Pitfalls</span>
            <h2>{profile.name}</h2>
          </div>
        </div>
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
    </section>
  );
}
