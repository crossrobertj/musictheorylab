import { describe, expect, it } from "vitest";
import { getIntervalName, getNotesFromIntervals, normalizeNote } from "./music";

describe("music domain helpers", () => {
  it("normalizes enharmonic note names", () => {
    expect(normalizeNote("Bb4")).toBe("A#4");
    expect(normalizeNote("Cb3")).toBe("B3");
  });

  it("builds notes from interval formulas", () => {
    expect(getNotesFromIntervals("C4", [0, 4, 7])).toEqual(["C4", "E4", "G4"]);
    expect(getNotesFromIntervals("D3", [0, 3, 7, 10])).toEqual(["D3", "F3", "A3", "C4"]);
  });

  it("names descending intervals clearly", () => {
    expect(getIntervalName(-7)).toBe("Descending Perfect 5th");
    expect(getIntervalName(6)).toBe("Tritone");
  });
});
