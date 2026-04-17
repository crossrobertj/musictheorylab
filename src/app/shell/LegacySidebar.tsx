import { NavLink } from "react-router-dom";
import type { FeatureDefinition } from "../featureRegistry";

interface LegacySidebarProps {
  sections: Array<{
    label: string;
    features: FeatureDefinition[];
  }>;
}

export function LegacySidebar({ sections }: LegacySidebarProps) {
  return (
    <aside className="legacy-sidebar" aria-label="Main Navigation">
      <div className="legacy-brand">
        <div className="legacy-brand__mark" aria-hidden="true">
          🎹
        </div>
        <div className="legacy-brand__copy">
          <h1>
            Music Theory Lab <span>PRO</span>
          </h1>
          <p>vibecoded by Robert James Cross</p>
        </div>
      </div>

      <nav className="legacy-sidebar__nav">
        {sections.map((section) => (
          <section className="legacy-nav-section" key={section.label}>
            <h2>{section.label}</h2>
            <div className="legacy-nav-section__items">
              {section.features.map((feature) => (
                <NavLink
                  key={feature.id}
                  className={({ isActive }) =>
                    `legacy-nav-item ${isActive ? "is-active" : ""}`
                  }
                  title={feature.navTooltip}
                  to={`/app/${feature.id}`}
                >
                  <i
                    aria-hidden="true"
                    className={`fas ${feature.iconClass} legacy-nav-item__icon legacy-icon-tone--${feature.iconTone}`}
                  />
                  <span className="legacy-nav-item__label">{feature.label}</span>
                </NavLink>
              ))}
            </div>
          </section>
        ))}
      </nav>

      <div className="legacy-sidebar__footer">
        <NavLink className="legacy-help-button" to="/app/guide">
          <i aria-hidden="true" className="fas fa-circle-question" />
          <span>Help &amp; Guide</span>
        </NavLink>
      </div>
    </aside>
  );
}
