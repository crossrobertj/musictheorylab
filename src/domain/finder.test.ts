import { describe, expect, it } from "vitest";
import { ALL_SCALES } from "./generated/theory-data";
import { analyzeFinderSelection, findExactChordMatches } from "./finder";
import { getNotesFromIntervals } from "./music";

describe("finder analysis", () => {
  it("finds exact chord matches from pitch classes", () => {
    const matches = findExactChordMatches(["C", "E", "G"]);
    expect(matches.some((match) => match.name === "C")).toBe(true);
  });

  it("builds a combined finder analysis payload", () => {
    const analysis = analyzeFinderSelection(["C4", "D4", "E4", "F4", "G4", "A4", "B4"]);

    expect(analysis.selectedNoteClasses).toEqual(["C", "D", "E", "F", "G", "A", "B"]);
    expect(analysis.scaleMatches.length).toBeGreaterThan(0);
    expect(analysis.compatibleScales.length).toBeGreaterThan(0);
  });

  it("preserves quarter-tone identities in microtonal scale matching", () => {
    const maqamRast = getNotesFromIntervals("C4", ALL_SCALES["Maqam Rast"].intervals);
    const analysis = analyzeFinderSelection(maqamRast);

    expect(analysis.selectedNoteClasses).toContain("D#_50");
    expect(analysis.scaleMatches.some((match) => match.name === "C Maqam Rast")).toBe(true);
    expect(analysis.compatibleScales.some((match) => match.name === "C Maqam Rast")).toBe(true);
    expect(analysis.exactChords).toEqual([]);
  });
});
