import { describe, expect, it } from "vitest";
import { analyzeFinderSelection, findExactChordMatches } from "./finder";

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
});
