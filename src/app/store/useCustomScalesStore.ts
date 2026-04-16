import { create } from "zustand";
import { CustomScaleDefinition, normalizeScaleIntervals } from "../../domain/scaleBuilder";
import { loadVersionedState, persistVersionedState } from "../persistence/storage";

const STORAGE_KEY = "music-theory-lab-source-custom-scales-v1";
const STORAGE_VERSION = 1;

function parseCustomScales(value: unknown): CustomScaleDefinition[] | null {
  if (!Array.isArray(value)) return null;
  return value.flatMap((item) => {
      if (!item || typeof item !== "object") return [];
      const candidate = item as Partial<CustomScaleDefinition>;
      if (typeof candidate.name !== "string" || !Array.isArray(candidate.intervals)) return [];
      return [{
        name: candidate.name,
        intervals: normalizeScaleIntervals(
          candidate.intervals.filter((interval): interval is number => typeof interval === "number"),
        ),
        createdAt:
          typeof candidate.createdAt === "string" ? candidate.createdAt : new Date().toISOString(),
      } satisfies CustomScaleDefinition];
    });
}

function loadCustomScales() {
  return loadVersionedState({
    key: STORAGE_KEY,
    version: STORAGE_VERSION,
    defaultValue: [] as CustomScaleDefinition[],
    parse: parseCustomScales,
  });
}

function persistCustomScales(scales: CustomScaleDefinition[]) {
  persistVersionedState(STORAGE_KEY, STORAGE_VERSION, scales);
}

interface CustomScalesState {
  customScales: CustomScaleDefinition[];
  saveScale: (scale: Pick<CustomScaleDefinition, "name" | "intervals">) => void;
  removeScale: (name: string) => void;
}

const initialCustomScales = loadCustomScales();

export const useCustomScalesStore = create<CustomScalesState>((set, get) => ({
  customScales: initialCustomScales,
  saveScale: (scale) => {
    const nextScale: CustomScaleDefinition = {
      name: scale.name.trim(),
      intervals: normalizeScaleIntervals(scale.intervals),
      createdAt: new Date().toISOString(),
    };
    const next = [
      nextScale,
      ...get().customScales.filter(
        (candidate) => candidate.name.toLowerCase() !== nextScale.name.toLowerCase(),
      ),
    ];
    set({ customScales: next });
    persistCustomScales(next);
  },
  removeScale: (name) => {
    const next = get().customScales.filter(
      (candidate) => candidate.name.toLowerCase() !== name.toLowerCase(),
    );
    set({ customScales: next });
    persistCustomScales(next);
  },
}));
