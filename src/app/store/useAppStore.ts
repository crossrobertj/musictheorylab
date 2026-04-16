import { create } from "zustand";
import { loadVersionedState, persistVersionedState } from "../persistence/storage";

export type AppTheme = "dark" | "light";

const STORAGE_KEY = "music-theory-lab-source-state-v1";
const STORAGE_VERSION = 1;

interface PersistedAppState {
  currentView: string;
  currentKey: string;
  currentInstrument: string;
  tempo: number;
  soundEnabled: boolean;
  theme: AppTheme;
}

export interface AppState extends PersistedAppState {
  setCurrentView: (view: string) => void;
  setCurrentKey: (key: string) => void;
  setCurrentInstrument: (instrument: string) => void;
  setTempo: (tempo: number) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setTheme: (theme: AppTheme) => void;
}

const defaultState: PersistedAppState = {
  currentView: "chords",
  currentKey: "C Major",
  currentInstrument: "piano",
  tempo: 120,
  soundEnabled: true,
  theme: "dark",
};

function parsePersistedAppState(value: unknown): PersistedAppState | null {
  if (!value || typeof value !== "object") return null;
  const candidate = value as Partial<PersistedAppState>;

  return {
    currentView:
      typeof candidate.currentView === "string" ? candidate.currentView : defaultState.currentView,
    currentKey:
      typeof candidate.currentKey === "string" ? candidate.currentKey : defaultState.currentKey,
    currentInstrument:
      typeof candidate.currentInstrument === "string"
        ? candidate.currentInstrument
        : defaultState.currentInstrument,
    tempo: typeof candidate.tempo === "number" ? candidate.tempo : defaultState.tempo,
    soundEnabled:
      typeof candidate.soundEnabled === "boolean"
        ? candidate.soundEnabled
        : defaultState.soundEnabled,
    theme: candidate.theme === "light" || candidate.theme === "dark" ? candidate.theme : defaultState.theme,
  };
}

function persistState(state: PersistedAppState) {
  persistVersionedState(STORAGE_KEY, STORAGE_VERSION, state);
}

const initialState = loadVersionedState({
  key: STORAGE_KEY,
  version: STORAGE_VERSION,
  defaultValue: defaultState,
  parse: parsePersistedAppState,
});

export const useAppStore = create<AppState>((set, get) => ({
  ...initialState,
  setCurrentView: (currentView) => {
    set({ currentView });
    persistState(get());
  },
  setCurrentKey: (currentKey) => {
    set({ currentKey });
    persistState(get());
  },
  setCurrentInstrument: (currentInstrument) => {
    set({ currentInstrument });
    persistState(get());
  },
  setTempo: (tempo) => {
    set({ tempo });
    persistState(get());
  },
  setSoundEnabled: (soundEnabled) => {
    set({ soundEnabled });
    persistState(get());
  },
  setTheme: (theme) => {
    set({ theme });
    persistState(get());
  },
}));
