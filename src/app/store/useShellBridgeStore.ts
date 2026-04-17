import { create } from "zustand";

export interface ShellBridgeRouteState {
  title: string;
  subtitle: string;
  playableLabel: string;
  playableNoteSet: string[];
  playCurrent: (() => void) | null;
  clear: (() => void) | null;
}

export interface ShellBridgeState extends ShellBridgeRouteState {
  routeId: string | null;
  instrumentPanelCollapsed: boolean;
  degreeMode: boolean;
  labelAll: boolean;
  arpeggioMode: boolean;
  strumSpeed: number;
  drone: boolean;
  syncRoute: (routeId: string, defaults?: Partial<ShellBridgeRouteState>) => void;
  updateRoute: (routeId: string, patch: Partial<ShellBridgeRouteState>) => void;
  setInstrumentPanelCollapsed: (collapsed: boolean) => void;
  setDegreeMode: (enabled: boolean) => void;
  setLabelAll: (enabled: boolean) => void;
  setArpeggioMode: (enabled: boolean) => void;
  setStrumSpeed: (speed: number) => void;
  setDrone: (enabled: boolean) => void;
  reset: () => void;
}

const defaultRouteState: ShellBridgeRouteState = {
  title: "",
  subtitle: "",
  playableLabel: "",
  playableNoteSet: [],
  playCurrent: null,
  clear: null,
};

function sanitizeRoutePatch(
  patch: Partial<ShellBridgeRouteState> | undefined,
): Partial<ShellBridgeRouteState> {
  if (!patch) return {};
  const hasPlayCurrent = Object.prototype.hasOwnProperty.call(patch, "playCurrent");
  const hasClear = Object.prototype.hasOwnProperty.call(patch, "clear");

  return {
    title: typeof patch.title === "string" ? patch.title : undefined,
    subtitle: typeof patch.subtitle === "string" ? patch.subtitle : undefined,
    playableLabel: typeof patch.playableLabel === "string" ? patch.playableLabel : undefined,
    playableNoteSet: Array.isArray(patch.playableNoteSet)
      ? patch.playableNoteSet.filter((note): note is string => typeof note === "string")
      : undefined,
    playCurrent: hasPlayCurrent
      ? typeof patch.playCurrent === "function"
        ? patch.playCurrent
        : null
      : undefined,
    clear: hasClear
      ? typeof patch.clear === "function"
        ? patch.clear
        : null
      : undefined,
  };
}

const defaultState = {
  routeId: null,
  ...defaultRouteState,
  instrumentPanelCollapsed: false,
  degreeMode: false,
  labelAll: false,
  arpeggioMode: false,
  strumSpeed: 120,
  drone: false,
};

export const useShellBridgeStore = create<ShellBridgeState>((set, get) => ({
  ...defaultState,
  syncRoute: (routeId, defaults) => {
    const patch = sanitizeRoutePatch(defaults);
    set({
      routeId,
      title: patch.title ?? "",
      subtitle: patch.subtitle ?? "",
      playableLabel: patch.playableLabel ?? "",
      playableNoteSet: patch.playableNoteSet ?? [],
      playCurrent: patch.playCurrent ?? null,
      clear: patch.clear ?? null,
    });
  },
  updateRoute: (routeId, patch) => {
    if (get().routeId !== routeId) return;
    const nextPatch = sanitizeRoutePatch(patch);
    const currentState = get();

    const hasChanges = Object.entries(nextPatch).some(([key, value]) => {
      const currentValue = currentState[key as keyof ShellBridgeState];
      if (Array.isArray(value) && Array.isArray(currentValue)) {
        return (
          value.length !== currentValue.length ||
          value.some((entry, index) => entry !== currentValue[index])
        );
      }

      return currentValue !== value;
    });

    if (!hasChanges) return;
    set(nextPatch);
  },
  setInstrumentPanelCollapsed: (instrumentPanelCollapsed) => set({ instrumentPanelCollapsed }),
  setDegreeMode: (degreeMode) => set({ degreeMode }),
  setLabelAll: (labelAll) => set({ labelAll }),
  setArpeggioMode: (arpeggioMode) => set({ arpeggioMode }),
  setStrumSpeed: (strumSpeed) => set({ strumSpeed }),
  setDrone: (drone) => set({ drone }),
  reset: () => set(defaultState),
}));
