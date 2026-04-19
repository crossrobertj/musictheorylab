import { describe, expect, it } from "vitest";
import { getLearningLevel, resolveLearningActionRoute } from "./learning";

describe("learning domain", () => {
  it("derives learning levels from xp", () => {
    expect(getLearningLevel(0)).toBe(1);
    expect(getLearningLevel(499)).toBe(1);
    expect(getLearningLevel(500)).toBe(2);
  });

  it("maps learning actions onto source routes", () => {
    expect(resolveLearningActionRoute("Open Recording Guide")).toBe("/app/recording");
    expect(resolveLearningActionRoute("Ear Trainer: Intervals")).toBe("/app/ear");
    expect(resolveLearningActionRoute("Use Modal Interchange")).toBe("/app/interchange");
    expect(resolveLearningActionRoute("Use Drum Machine")).toBe("/app/drums");
    expect(resolveLearningActionRoute("Set Metronome to 7/8")).toBe("/app/metronome");
    expect(resolveLearningActionRoute("View Diatonic Chords")).toBe("/app/chords");
    expect(resolveLearningActionRoute("Unknown task")).toBeNull();
  });
});
