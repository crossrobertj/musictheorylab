import { playChord, playScale } from "../audio/audioEngine";
import type { FinderScaleMatch } from "../domain/finder";
import type { HarmonizedScaleChord, HarmonizedScaleRow } from "../domain/scaleBuilder";

interface ScaleHarmonizationPanelProps {
  title: string;
  description: string;
  rows: HarmonizedScaleRow[];
  scaleNotes: string[];
}

export function ScaleHarmonizationPanel({
  title,
  description,
  rows,
  scaleNotes,
}: ScaleHarmonizationPanelProps) {
  return (
    <article className="detail-card harmony-panel-card">
      <div className="harmony-panel__header">
        <div>
          <h3 className="harmony-panel__title">
            Scale Harmonization: <span>{title}</span>
          </h3>
          <p className="harmony-panel__copy">{description}</p>
        </div>
        <button className="legacy-secondary-button" onClick={() => playScale(scaleNotes)} type="button">
          Play Scale
        </button>
      </div>

      <div className="harmony-table-scroll">
        <table className="harmony-table">
          <thead>
            <tr>
              <th>Degree</th>
              <th>Roman</th>
              <th>Triad</th>
              <th>7th Chord</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={`${title}-${row.degree}-${row.triad}`}>
                <td>{row.degree}</td>
                <td className="harmony-table__roman">{row.numeral}</td>
                <td>
                  <button className="harmony-cell-button harmony-cell-button--chord" onClick={() => playChord(row.triadNotes)} type="button">
                    {row.triad}
                  </button>
                </td>
                <td>
                  <button className="harmony-cell-button harmony-cell-button--seventh" onClick={() => playChord(row.seventhNotes)} type="button">
                    {row.seventh}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}

interface HarmonicMatchesPanelProps {
  title: string;
  description: string;
  harmonizingChords: HarmonizedScaleChord[];
  compatibleScales: FinderScaleMatch[];
}

export function HarmonicMatchesPanel({
  title,
  description,
  harmonizingChords,
  compatibleScales,
}: HarmonicMatchesPanelProps) {
  return (
    <article className="detail-card harmony-panel-card">
      <div className="harmony-panel__matches-header">
        <h3 className="harmony-panel__title">
          Harmonizing Matches for <span>{title}</span>
        </h3>
        <p className="harmony-panel__copy">{description}</p>
      </div>

      <div className="harmony-match-grid">
        <section className="harmony-match-panel">
          <h4 className="harmony-match-panel__title harmony-match-panel__title--chord">Harmonizing Chords</h4>
          <div className="harmony-chip-list">
            {harmonizingChords.length ? (
              harmonizingChords.map((chord) => (
                <button
                  key={`${title}-chord-${chord.degree}-${chord.symbol}`}
                  className="harmony-chip harmony-chip--chord"
                  onClick={() => playChord(chord.notes)}
                  type="button"
                >
                  {chord.symbol}
                </button>
              ))
            ) : (
              <span className="harmony-empty-text">No chord matches found.</span>
            )}
          </div>
        </section>

        <section className="harmony-match-panel">
          <h4 className="harmony-match-panel__title harmony-match-panel__title--scale">Compatible Scales</h4>
          <div className="harmony-chip-list">
            {compatibleScales.length ? (
              compatibleScales.map((scale) => (
                <button
                  key={`${title}-scale-${scale.name}`}
                  className="harmony-chip harmony-chip--scale"
                  onClick={() => playScale(scale.notes)}
                  type="button"
                  title={`${scale.region} · extra notes ${scale.score}`}
                >
                  {scale.name}
                </button>
              ))
            ) : (
              <span className="harmony-empty-text">No scale matches found.</span>
            )}
          </div>
        </section>
      </div>
    </article>
  );
}

interface ChordInversionsPanelProps {
  title: string;
  description: string;
  inversions: { label: string; notes: string[] }[];
}

export function ChordInversionsPanel({
  title,
  description,
  inversions,
}: ChordInversionsPanelProps) {
  return (
    <article className="detail-card harmony-panel-card">
      <div className="harmony-panel__matches-header">
        <h3 className="harmony-panel__title">
          Chord Inversions: <span>{title}</span>
        </h3>
        <p className="harmony-panel__copy">{description}</p>
      </div>

      <div className="inversion-grid">
        {inversions.map((inversion) => (
          <button
            key={`${title}-${inversion.label}`}
            className="inversion-card"
            onClick={() => playChord(inversion.notes)}
            type="button"
          >
            <span className="inversion-card__label">{inversion.label}</span>
            <strong className="inversion-card__notes">
              {inversion.notes.map((note) => note.replace(/[0-9]/g, "")).join(" - ")}
            </strong>
          </button>
        ))}
      </div>
    </article>
  );
}

interface CompatibleScalesPanelProps {
  title: string;
  description: string;
  compatibleScales: FinderScaleMatch[];
}

export function CompatibleScalesPanel({
  title,
  description,
  compatibleScales,
}: CompatibleScalesPanelProps) {
  return (
    <article className="detail-card harmony-panel-card">
      <div className="harmony-panel__matches-header">
        <h3 className="harmony-panel__title">
          Compatible Scales: <span>{title}</span>
        </h3>
        <p className="harmony-panel__copy">{description}</p>
      </div>

      <div className="harmony-chip-list">
        {compatibleScales.length ? (
          compatibleScales.map((scale) => (
            <button
              key={`${title}-${scale.name}`}
              className="harmony-chip harmony-chip--scale"
              onClick={() => playScale(scale.notes)}
              title={`${scale.region} · extra notes ${scale.score}`}
              type="button"
            >
              {scale.name}
            </button>
          ))
        ) : (
          <span className="harmony-empty-text">No scale matches found.</span>
        )}
      </div>
    </article>
  );
}
