import { beforeEach, describe, expect, it } from "vitest";
import { useAppStore } from "./useAppStore";
import { useCustomInstrumentStore } from "./useCustomInstrumentStore";
import { useCustomScalesStore } from "./useCustomScalesStore";
import { useFavoritesStore } from "./useFavoritesStore";
import { useLearningStore } from "./useLearningStore";
import { useTuningStore } from "./useTuningStore";

describe("zustand stores", () => {
  beforeEach(() => {
    useAppStore.setState({
      currentView: "chords",
      currentKey: "C Major",
      currentInstrument: "piano",
      tempo: 120,
      soundEnabled: true,
      theme: "dark",
    });
    useTuningStore.setState({
      system: "12-TET",
      basePitch: 440,
    });
    useCustomScalesStore.setState({ customScales: [] });
    useCustomInstrumentStore.setState({ customInstruments: {} });
    useFavoritesStore.setState({ favorites: [] });
    useLearningStore.setState({ completedSteps: [], xp: 0, level: 1 });
    localStorage.clear();
  });

  it("updates and persists app and tuning state", () => {
    useAppStore.getState().setTempo(132);
    useAppStore.getState().setSoundEnabled(false);
    useAppStore.getState().setTheme("light");

    expect(useAppStore.getState().tempo).toBe(132);
    expect(useAppStore.getState().soundEnabled).toBe(false);
    expect(useAppStore.getState().theme).toBe("light");
    expect(localStorage.getItem("music-theory-lab-source-state-v1")).toContain("\"tempo\":132");

    useTuningStore.getState().setSystem("19-TET");
    useTuningStore.getState().setBasePitch(432);

    expect(useTuningStore.getState().system).toBe("19-TET");
    expect(useTuningStore.getState().basePitch).toBe(432);
    expect(localStorage.getItem("music-theory-lab-source-tuning-v1")).toContain("\"basePitch\":432");
  });

  it("saves and removes custom scales and custom instruments", () => {
    useCustomScalesStore.getState().saveScale({
      name: " My Scale ",
      intervals: [7, 0, 7, 2, 14],
    });
    useCustomScalesStore.getState().saveScale({
      name: "my scale",
      intervals: [0, 3, 5],
    });

    expect(useCustomScalesStore.getState().customScales).toHaveLength(1);
    expect(useCustomScalesStore.getState().customScales[0].name).toBe("my scale");
    expect(useCustomScalesStore.getState().customScales[0].intervals).toEqual([0, 3, 5]);

    useCustomScalesStore.getState().removeScale("MY SCALE");
    expect(useCustomScalesStore.getState().customScales).toEqual([]);

    useCustomInstrumentStore.getState().saveInstrument("custom-test", {
      type: "fretboard",
      name: "Custom Test",
      strings: ["E2", "A2", "D3"],
      frets: 12,
    });
    expect(useCustomInstrumentStore.getState().customInstruments["custom-test"]?.name).toBe("Custom Test");

    useCustomInstrumentStore.getState().removeInstrument("custom-test");
    expect(useCustomInstrumentStore.getState().customInstruments["custom-test"]).toBeUndefined();
  });

  it("adds, toggles, clears favorites and tracks learning progress without double counting", () => {
    const favorite = { type: "chord" as const, name: "Cmaj7", route: "/app/allchords" };
    useFavoritesStore.getState().addFavorite(favorite);
    expect(useFavoritesStore.getState().isFavorite(favorite)).toBe(true);

    useFavoritesStore.getState().toggleFavorite(favorite);
    expect(useFavoritesStore.getState().isFavorite(favorite)).toBe(false);

    useFavoritesStore.getState().toggleFavorite(favorite);
    useFavoritesStore.getState().clearFavorites();
    expect(useFavoritesStore.getState().favorites).toEqual([]);

    useLearningStore.getState().completeStep("b1");
    useLearningStore.getState().completeStep("b1");
    expect(useLearningStore.getState().xp).toBe(100);
    expect(useLearningStore.getState().completedSteps).toEqual(["b1"]);

    useLearningStore.getState().resetProgress();
    expect(useLearningStore.getState().xp).toBe(0);
    expect(useLearningStore.getState().completedSteps).toEqual([]);
  });
});
