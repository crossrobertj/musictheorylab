import { useCallback, useEffect, useMemo } from "react";
import { resolveLearningActionRoute, LEARNING_PATHS } from "../../domain/learning";
import { useLearningStore } from "../../app/store/useLearningStore";
import { useShellBridgeStore } from "../../app/store/useShellBridgeStore";

export function LearningPathsPage() {
  const completedSteps = useLearningStore((state) => state.completedSteps);
  const xp = useLearningStore((state) => state.xp);
  const level = useLearningStore((state) => state.level);
  const completeStep = useLearningStore((state) => state.completeStep);
  const resetProgress = useLearningStore((state) => state.resetProgress);
  const updateRoute = useShellBridgeStore((state) => state.updateRoute);

  const totalSteps = useMemo(
    () => LEARNING_PATHS.reduce((sum, path) => sum + path.steps.length, 0),
    [],
  );

  const handleReset = useCallback(() => {
    if (window.confirm("Reset all learning progress and XP?")) {
      resetProgress();
    }
  }, [resetProgress]);

  const playableLabel = `${level > 0 ? `Lvl ${level}` : "Level 0"} • ${xp} XP • ${
    completedSteps.length
  }/${totalSteps} steps`;

  useEffect(() => {
    updateRoute("learning", {
      title: "Learning Paths",
      subtitle: "Guided theory tracks and XP milestones.",
      playableLabel,
      playableNoteSet: [],
      playCurrent: null,
      clear: handleReset,
    });
  }, [handleReset, playableLabel, updateRoute]);

  return (
    <section className="page-section">
      <article className="legacy-tool-panel">
        <div className="legacy-tool-panel__header">
          <div>
            <span className="eyebrow">Guided Study</span>
            <h1 className="legacy-tool-panel__title">Learning Paths</h1>
            <p className="legacy-tool-panel__copy">
              Guided tracks, XP, and levels stay on the legacy progress key, but the page body now
              follows the denser legacy study-board format.
            </p>
          </div>
          <div className="legacy-toolbar-row">
            <span className="legacy-toolbar-chip">
              Level <strong>Lvl {level}</strong>
            </span>
            <span className="legacy-toolbar-chip">
              XP <strong>{xp} XP</strong>
            </span>
            <span className="legacy-toolbar-chip">
              Progress <strong>{completedSteps.length} / {totalSteps}</strong>
            </span>
          </div>
        </div>
        <div className="legacy-toolbar-row">
          <button className="ghost-button" onClick={handleReset}>
            Reset Progress
          </button>
        </div>
      </article>

      <article className="legacy-tool-panel">
        <div className="legacy-tool-panel__header">
          <div>
            <span className="summary-label">Tracks</span>
            <h2>{LEARNING_PATHS.length} guided paths</h2>
            <p>Follow a track in order or use the action links to jump directly into the related tool.</p>
          </div>
        </div>
      </article>

      <div className="legacy-catalog-grid learning-path-grid">
        {LEARNING_PATHS.map((path) => {
          const completedInPath = path.steps.filter((step) => completedSteps.includes(step.id)).length;
          const progressPercent = Math.round((completedInPath / path.steps.length) * 100);

          return (
            <article key={path.id} className="legacy-catalog-card learning-path-card">
              <div className="legacy-catalog-card__header">
                <div>
                  <span className="legacy-catalog-card__eyebrow">{path.track}</span>
                  <h3 className="legacy-catalog-card__title">{path.name}</h3>
                </div>
                <span className="legacy-preview-chip">
                  {completedInPath}/{path.steps.length}
                </span>
              </div>

              <p className="legacy-catalog-card__subtitle">{path.desc}</p>

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
