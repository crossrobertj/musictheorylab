import { describe, expect, it } from "vitest";
import { formatNote, getIntervalName, getNotesFromIntervals, getPitchToken, isMicrotonalNote, normalizeNote } from "./music";

describe("music domain helpers", () => {
  it("normalizes enharmonic note names", () => {
    expect(normalizeNote("Bb4")).toBe("A#4");
    expect(normalizeNote("Cb3")).toBe("B3");
  });

  it("builds notes from interval formulas", () => {
    expect(getNotesFromIntervals("C4", [0, 4, 7])).toEqual(["C4", "E4", "G4"]);
    expect(getNotesFromIntervals("D3", [0, 3, 7, 10])).toEqual(["D3", "F3", "A3", "C4"]);
  });

  it("preserves cent offsets for microtonal notes", () => {
    expect(normalizeNote("Db4_50")).toBe("C#4_50");
    expect(getPitchToken("Db4_50")).toBe("C#_50");
    expect(isMicrotonalNote("Db4_50")).toBe(true);
    expect(formatNote("Db4_50", "Ab Major")).toBe("Db4 +50c");
  });

  it("names descending intervals clearly", () => {
    expect(getIntervalName(-7)).toBe("Descending Perfect 5th");
    expect(getIntervalName(6)).toBe("Tritone");
  });
});
