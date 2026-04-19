import { describe, expect, it } from "vitest";
import {
  describeScaleDensity,
  getScaleBuilderNotes,
  getScaleBuilderPlayback,
  harmonizeScale,
  normalizeScaleIntervals,
  toggleScaleInterval,
} from "./scaleBuilder";

describe("scaleBuilder domain", () => {
  it("normalizes and toggles intervals safely", () => {
    expect(normalizeScaleIntervals([11, 0, 2, 2, -1, 12])).toEqual([0, 2, 11]);
    expect(toggleScaleInterval([0, 2, 4], 2)).toEqual([0, 4]);
    expect(toggleScaleInterval([0, 2, 4], 7)).toEqual([0, 2, 4, 7]);
    expect(toggleScaleInterval([0, 2, 4], 0)).toEqual([0, 2, 4]);
  });

  it("builds scale notes, playback notes, and harmonized triads", () => {
    expect(getScaleBuilderNotes("C", [0, 2, 4, 5, 7, 9, 11])).toEqual([
      "C4",
      "D4",
      "E4",
      "F4",
      "G4",
      "A4",
      "B4",
    ]);
    expect(getScaleBuilderPlayback("C", [0, 4, 7])).toEqual(["C4", "E4", "G4", "C5"]);

    const harmonized = harmonizeScale("C", [0, 2, 4, 5, 7, 9, 11]);
    expect(harmonized[0].symbol).toBe("C");
    expect(harmonized[1].symbol).toBe("Dm");
    expect(harmonized[4].symbol).toBe("G");
  });

  it("describes scale density labels", () => {
    expect(describeScaleDensity(3)).toBe("Triadic");
    expect(describeScaleDensity(5)).toBe("Pentatonic");
    expect(describeScaleDensity(9)).toBe("9-note collection");
  });
});
