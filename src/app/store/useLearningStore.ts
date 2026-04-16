import { create } from "zustand";
import { getLearningLevel, XP_PER_LEARNING_STEP } from "../../domain/learning";
import { loadVersionedState, persistVersionedState } from "../persistence/storage";

const STORAGE_KEY = "musicTheoryProLearning";
const STORAGE_VERSION = 1;

interface PersistedLearningState {
  completedSteps: string[];
  xp: number;
  level: number;
}

export interface LearningState extends PersistedLearningState {
  completeStep: (stepId: string) => void;
  resetProgress: () => void;
}

const defaultState: PersistedLearningState = {
  completedSteps: [],
  xp: 0,
  level: 1,
};

function normalizeState(value: unknown): PersistedLearningState {
  if (!value || typeof value !== "object") return defaultState;
  const candidate = value as Record<string, unknown>;
  const completedSteps = Array.isArray(candidate.completedSteps)
    ? candidate.completedSteps.filter((step): step is string => typeof step === "string")
    : [];
  const xp = typeof candidate.xp === "number" ? candidate.xp : 0;
  return {
    completedSteps,
    xp,
    level: getLearningLevel(xp),
  };
}

function loadPersistedState(): PersistedLearningState {
  return loadVersionedState({
    key: STORAGE_KEY,
    version: STORAGE_VERSION,
    defaultValue: defaultState,
    parse: (value) => normalizeState(value),
  });
}

function persistState(state: PersistedLearningState) {
  persistVersionedState(STORAGE_KEY, STORAGE_VERSION, state);
}

const initialState = loadPersistedState();

export const useLearningStore = create<LearningState>((set, get) => ({
  ...initialState,
  completeStep: (stepId) => {
    if (get().completedSteps.includes(stepId)) return;
    const nextXp = get().xp + XP_PER_LEARNING_STEP;
    const nextState: PersistedLearningState = {
      completedSteps: [...get().completedSteps, stepId],
      xp: nextXp,
      level: getLearningLevel(nextXp),
    };
    set(nextState);
    persistState(nextState);
  },
  resetProgress: () => {
    set(defaultState);
    persistState(defaultState);
  },
}));
