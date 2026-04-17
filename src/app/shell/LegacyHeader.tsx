import { KEY_OPTIONS } from "../../domain/generated/theory-data";
import type { FeatureDefinition } from "../featureRegistry";

interface LegacyHeaderProps {
  title: string;
  subtitle: string;
  currentKey: string;
  xp: number;
  level: number;
  previousFeature: FeatureDefinition | null;
  nextFeature: FeatureDefinition | null;
  onResetProgress: () => void;
  onStopAll: () => void;
  onSurpriseMe: () => void;
  onSelectKey: (key: string) => void;
  onPreviousFeature: () => void;
  onNextFeature: () => void;
}

export function LegacyHeader({
  title,
  subtitle,
  currentKey,
  xp,
  level,
  previousFeature,
  nextFeature,
  onResetProgress,
  onStopAll,
  onSurpriseMe,
  onSelectKey,
  onPreviousFeature,
  onNextFeature,
}: LegacyHeaderProps) {
  return (
    <header className="legacy-header" role="banner">
      <div className="legacy-header__title-group">
        <div>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>

        <div className="legacy-xp-badge">
          <strong>Lvl {level}</strong>
          <span>{xp} XP</span>
          <button
            aria-label="Reset Level and XP"
            className="legacy-icon-button"
            onClick={onResetProgress}
            title="Reset Level and XP"
            type="button"
          >
            <i aria-hidden="true" className="fas fa-rotate-left" />
          </button>
        </div>
      </div>

      <div className="legacy-header__controls">
        <button className="legacy-stop-button" onClick={onStopAll} type="button">
          <i aria-hidden="true" className="fas fa-stop" /> Stop All
        </button>

        <button className="legacy-surprise-button" onClick={onSurpriseMe} type="button">
          <i aria-hidden="true" className="fas fa-wand-magic-sparkles" /> Surprise Me
        </button>

        <label className="legacy-header__select">
          <span>Key:</span>
          <select aria-label="Key" onChange={(event) => onSelectKey(event.target.value)} value={currentKey}>
            {KEY_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <button
          aria-label="Previous feature"
          className="legacy-icon-button"
          disabled={!previousFeature}
          onClick={onPreviousFeature}
          title={previousFeature ? `Previous: ${previousFeature.label}` : "No previous feature"}
          type="button"
        >
          <i aria-hidden="true" className="fas fa-chevron-left" />
        </button>

        <button
          aria-label="Next feature"
          className="legacy-icon-button"
          disabled={!nextFeature}
          onClick={onNextFeature}
          title={nextFeature ? `Next: ${nextFeature.label}` : "No next feature"}
          type="button"
        >
          <i aria-hidden="true" className="fas fa-chevron-right" />
        </button>
      </div>
    </header>
  );
}
