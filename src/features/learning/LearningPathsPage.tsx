import { useMemo } from "react";
import { resolveLearningActionRoute, LEARNING_PATHS } from "../../domain/learning";
import { useLearningStore } from "../../app/store/useLearningStore";

export function LearningPathsPage() {
  const completedSteps = useLearningStore((state) => state.completedSteps);
  const xp = useLearningStore((state) => state.xp);
  const level = useLearningStore((state) => state.level);
  const completeStep = useLearningStore((state) => state.completeStep);
  const resetProgress = useLearningStore((state) => state.resetProgress);

  const totalSteps = useMemo(
    () => LEARNING_PATHS.reduce((sum, path) => sum + path.steps.length, 0),
    [],
  );

  function handleReset() {
    if (window.confirm("Reset all learning progress and XP?")) {
      resetProgress();
    }
  }

  return (
    <section className="page-section">
      <div className="page-hero">
        <div>
          <span className="eyebrow">Source Feature</span>
          <h1>Learning Paths</h1>
          <p>
            Guided tracks, XP, and levels are now source-side and stored on the same legacy
            progress key, so existing mastery progress carries forward.
          </p>
        </div>
        <div className="hero-actions">
          <button className="ghost-button" onClick={handleReset}>
            Reset Progress
          </button>
        </div>
      </div>

      <div className="summary-grid">
        <article className="summary-card">
          <span className="summary-label">Level</span>
          <h2>Lvl {level}</h2>
          <p>Each completed step awards 100 XP. Every 500 XP advances one level.</p>
        </article>
        <article className="summary-card">
          <span className="summary-label">Progress</span>
          <h2>{completedSteps.length} / {totalSteps}</h2>
          <p>Total mastery tracks the number of completed steps across every guided path.</p>
        </article>
        <article className="summary-card">
          <span className="summary-label">XP</span>
          <h2>{xp} XP</h2>
          <p>Progress is shared through the legacy learning storage key for backward compatibility.</p>
        </article>
      </div>

      <article className="detail-card">
        <div className="detail-header">
          <div>
            <span className="summary-label">Tracks</span>
            <h2>{LEARNING_PATHS.length} guided paths</h2>
            <p>Follow a track in order or use the action links to jump directly into the related tool.</p>
          </div>
        </div>
      </article>

      <div className="feature-grid learning-path-grid">
        {LEARNING_PATHS.map((path) => {
          const completedInPath = path.steps.filter((step) => completedSteps.includes(step.id)).length;
          const progressPercent = Math.round((completedInPath / path.steps.length) * 100);

          return (
            <article key={path.id} className="feature-card learning-path-card">
              <div className="feature-card-header">
                <div>
                  <span className="card-tag">{path.track}</span>
                  <h3>{path.name}</h3>
                </div>
                <span className="info-chip">
                  {completedInPath}/{path.steps.length}
                </span>
              </div>

              <p className="card-copy">{path.desc}</p>

              <div className="learning-progress-shell">
                <div className="learning-progress-bar" style={{ width: `${progressPercent}%` }} />
              </div>

              <div className="learning-step-list">
                {path.steps.map((step) => {
                  const completed = completedSteps.includes(step.id);
                  const route = resolveLearningActionRoute(step.action);

                  return (
                    <div
                      key={step.id}
                      className={`learning-step-row ${completed ? "is-complete" : ""}`}
                    >
                      <button
                        type="button"
                        className={`learning-step-check ${completed ? "is-complete" : ""}`}
                        onClick={() => completeStep(step.id)}
                        disabled={completed}
                      >
                        {completed ? "Done" : "+100"}
                      </button>
                      <div className="learning-step-copy">
                        <strong>{step.name}</strong>
                        <span>{step.task}</span>
                        <small>{step.action}</small>
                      </div>
                      {route ? (
                        <a className="ghost-button learning-step-link" href={route}>
                          Open
                        </a>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
