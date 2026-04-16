import { create } from "zustand";

export type AppTheme = "dark" | "light";

const STORAGE_KEY = "music-theory-lab-source-state-v1";

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

function loadPersistedState(): PersistedAppState {
  if (typeof window === "undefined") return defaultState;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    return { ...defaultState, ...(JSON.parse(raw) as Partial<PersistedAppState>) };
  } catch {
    return defaultState;
  }
}

function persistState(state: PersistedAppState) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage failures and keep the app interactive.
  }
}

const initialState = loadPersistedState();

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
