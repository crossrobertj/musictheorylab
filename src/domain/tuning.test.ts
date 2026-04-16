import { describe, expect, it } from "vitest";
import {
  convertHelmholtzNotation,
  getMicrotonalScaleNames,
  getTunedFrequency,
  getTuningOffset,
} from "./tuning";

describe("tuning domain", () => {
  it("returns offsets for equal, just, historical, and n-tet systems", () => {
    expect(getTuningOffset("C", "12-TET")).toBe(0);
    expect(getTuningOffset("E", "JI-C")).toBeCloseTo(-13.7);
    expect(getTuningOffset("D", "Pythagorean")).toBe(4);
    expect(getTuningOffset("E", "19-TET")).toBeCloseTo(-21.0526315789);
  });

  it("adjusts tuned frequencies according to the selected system", () => {
    const equal = getTunedFrequency("E4", "12-TET");
    const just = getTunedFrequency("E4", "JI-C");
    expect(just).toBeLessThan(equal);
  });

  it("lists microtonal scales and converts Helmholtz notation", () => {
    const names = getMicrotonalScaleNames();
    expect(names.length).toBeGreaterThan(0);
    expect([...names].sort((a, b) => a.localeCompare(b))).toEqual(names);

    expect(convertHelmholtzNotation("c''")).toEqual(
      expect.objectContaining({
        scientific: "C6",
        midi: 84,
      }),
    );
    expect(convertHelmholtzNotation("C,")).toEqual(
      expect.objectContaining({
        scientific: "C2",
        midi: 36,
      }),
    );
    expect(convertHelmholtzNotation("bad")).toBeNull();
  });
});
