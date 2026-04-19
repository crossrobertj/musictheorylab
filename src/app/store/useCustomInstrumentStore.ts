import { create } from "zustand";
import { type InstrumentConfig } from "../../domain/instruments";
import { loadVersionedState, persistVersionedState } from "../persistence/storage";

const STORAGE_KEY = "music-theory-lab-source-custom-instruments-v1";
const STORAGE_VERSION = 1;

interface CustomInstrumentRecord {
  id: string;
  config: InstrumentConfig;
}

interface CustomInstrumentState {
  customInstruments: Record<string, InstrumentConfig>;
  saveInstrument: (id: string, config: InstrumentConfig) => void;
  removeInstrument: (id: string) => void;
}

function parseCustomInstruments(value: unknown): Record<string, InstrumentConfig> | null {
  if (!Array.isArray(value)) return null;
  return value.reduce<Record<string, InstrumentConfig>>((acc, item) => {
      if (!item || typeof item !== "object") return acc;
      const candidate = item as Partial<CustomInstrumentRecord>;
      if (typeof candidate.id !== "string" || !candidate.config || typeof candidate.config !== "object") {
        return acc;
      }
      acc[candidate.id] = candidate.config as InstrumentConfig;
      return acc;
    }, {});
}

function loadCustomInstruments() {
  return loadVersionedState({
    key: STORAGE_KEY,
    version: STORAGE_VERSION,
    defaultValue: {} as Record<string, InstrumentConfig>,
    parse: parseCustomInstruments,
  });
}

function persistCustomInstruments(customInstruments: Record<string, InstrumentConfig>) {
  const payload = Object.entries(customInstruments).map(([id, config]) => ({ id, config }));
  persistVersionedState(STORAGE_KEY, STORAGE_VERSION, payload);
}

const initialCustomInstruments = loadCustomInstruments();

export const useCustomInstrumentStore = create<CustomInstrumentState>((set, get) => ({
  customInstruments: initialCustomInstruments,
  saveInstrument: (id, config) => {
    const next = { ...get().customInstruments, [id]: config };
    set({ customInstruments: next });
    persistCustomInstruments(next);
  },
  removeInstrument: (id) => {
    const next = { ...get().customInstruments };
    delete next[id];
    set({ customInstruments: next });
    persistCustomInstruments(next);
  },
}));
