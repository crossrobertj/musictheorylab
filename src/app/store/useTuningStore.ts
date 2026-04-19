import { create } from "zustand";
import { loadVersionedState, persistVersionedState } from "../persistence/storage";

export type TuningSystem =
  | "12-TET"
  | "Pythagorean"
  | "Meantone"
  | "Kirnberger"
  | "Werckmeister"
  | "Vallotti"
  | "JI-C"
  | "19-TET"
  | "22-TET"
  | "31-TET"
  | "41-TET"
  | "53-TET"
  | "72-TET";

const STORAGE_KEY = "music-theory-lab-source-tuning-v1";
const STORAGE_VERSION = 1;

interface PersistedTuningState {
  system: TuningSystem;
  basePitch: number;
}

interface TuningState extends PersistedTuningState {
  setSystem: (system: TuningSystem) => void;
  setBasePitch: (basePitch: number) => void;
}

const defaultState: PersistedTuningState = {
  system: "12-TET",
  basePitch: 440,
};

function loadState() {
  return loadVersionedState({
    key: STORAGE_KEY,
    version: STORAGE_VERSION,
    defaultValue: defaultState,
    parse: (value) => {
      if (!value || typeof value !== "object") return null;
      const candidate = value as Partial<PersistedTuningState>;
      return {
        system:
          typeof candidate.system === "string" ? (candidate.system as TuningSystem) : defaultState.system,
        basePitch:
          typeof candidate.basePitch === "number" ? candidate.basePitch : defaultState.basePitch,
      };
    },
  });
}

function persistState(state: PersistedTuningState) {
  persistVersionedState(STORAGE_KEY, STORAGE_VERSION, state);
}

const initialState = loadState();

export const useTuningStore = create<TuningState>((set, get) => ({
  ...initialState,
  setSystem: (system) => {
    set({ system });
    persistState(get());
  },
  setBasePitch: (basePitch) => {
    set({ basePitch });
    persistState(get());
  },
}));
