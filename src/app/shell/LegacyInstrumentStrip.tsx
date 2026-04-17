import type { InstrumentConfig, InstrumentGroup } from "../../domain/instruments";

function getInstrumentGlyph(instrumentId: string, config: InstrumentConfig) {
  if (config.type === "piano") return "🎹";
  if (instrumentId.startsWith("violin") || instrumentId === "viola" || instrumentId === "cello") {
    return "🎻";
  }
  if (instrumentId.startsWith("bass")) return "🎸";
  return "🎵";
}

interface LegacyInstrumentStripProps {
  currentInstrument: string;
  currentInstrumentConfig: InstrumentConfig;
  instrumentGroups: InstrumentGroup[];
  instrumentPanelCollapsed: boolean;
  degreeMode: boolean;
  labelAll: boolean;
  playableLabel: string;
  clearDisabled: boolean;
  onSelectInstrument: (instrumentId: string) => void;
  onToggleInstrumentPanel: () => void;
  onSetDegreeMode: (enabled: boolean) => void;
  onSetLabelAll: (enabled: boolean) => void;
  onClear: () => void;
}

export function LegacyInstrumentStrip({
  currentInstrument,
  currentInstrumentConfig,
  instrumentGroups,
  instrumentPanelCollapsed,
  degreeMode,
  labelAll,
  playableLabel,
  clearDisabled,
  onSelectInstrument,
  onToggleInstrumentPanel,
  onSetDegreeMode,
  onSetLabelAll,
  onClear,
}: LegacyInstrumentStripProps) {
  return (
    <section aria-label="Instrument Controls" className="legacy-instrument-strip">
      <div className="legacy-instrument-strip__primary">
        <div className="legacy-instrument-strip__identity">
          <span aria-hidden="true" className="legacy-instrument-strip__glyph">
            {getInstrumentGlyph(currentInstrument, currentInstrumentConfig)}
          </span>
          <span className="legacy-instrument-strip__name">{currentInstrumentConfig.name}</span>
          <button
            aria-label={
              instrumentPanelCollapsed ? "Expand Instrument Section" : "Collapse Instrument Section"
            }
            className="legacy-icon-button"
            onClick={onToggleInstrumentPanel}
            title="Toggle Keyboard/Fretboard"
            type="button"
          >
            <i
              aria-hidden="true"
              className={`fas ${instrumentPanelCollapsed ? "fa-chevron-down" : "fa-chevron-up"}`}
            />
          </button>
        </div>

        <div className="legacy-instrument-strip__controls">
          <label className="legacy-header__select legacy-header__select--instrument">
            <span>Instrument</span>
            <select
              aria-label="Instrument"
              onChange={(event) => onSelectInstrument(event.target.value)}
              value={currentInstrument}
            >
              {instrumentGroups.map((group) => (
                <optgroup key={group.label} label={group.label}>
                  {group.entries.map(([instrumentId, config]) => (
                    <option key={instrumentId} value={instrumentId}>
                      {config.name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </label>

          <label className="legacy-toggle-chip">
            <input
              aria-label="Degrees"
              checked={degreeMode}
              onChange={(event) => onSetDegreeMode(event.target.checked)}
              type="checkbox"
            />
            <span>Degrees</span>
          </label>

          <label className="legacy-toggle-chip">
            <input
              aria-label="Label All"
              checked={labelAll}
              onChange={(event) => onSetLabelAll(event.target.checked)}
              type="checkbox"
            />
            <span>Label All</span>
          </label>

          <button
            className="legacy-secondary-button"
            disabled={clearDisabled}
            onClick={onClear}
            type="button"
          >
            <i aria-hidden="true" className="fas fa-eraser" /> Clear
          </button>
        </div>
      </div>

      <div className="legacy-instrument-strip__status">
        <span>{instrumentPanelCollapsed ? "Instrument panel collapsed" : "Instrument panel expanded"}</span>
        {playableLabel ? <strong>{playableLabel}</strong> : <strong>Select notes on a feature page</strong>}
      </div>
    </section>
  );
}
