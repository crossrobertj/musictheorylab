import { describe, expect, it } from "vitest";
import {
  buildChordAnalysis,
  buildChordInversions,
  parseChordSymbol,
  suggestRomanNumeral,
} from "./chordAnalyzer";

describe("chordAnalyzer domain", () => {
  it("parses chord symbols and exposes interval labels", () => {
    const parsed = parseChordSymbol("Cm7");
    expect(parsed).not.toBeNull();
    expect(parsed?.root).toBe("C");
    expect(parsed?.qualityKey).toBe("min7");
    expect(parsed?.intervalLabels).toEqual(["Root", "m3", "P5", "m7"]);
  });

  it("builds chord analysis with inversions and compatible scales", () => {
    const analysis = buildChordAnalysis("G7");
    expect(analysis).not.toBeNull();
    expect(analysis?.inversions[0].label).toBe("Root Position");
    expect(analysis?.inversions[1].label).toBe("1st Inversion");
    expect(analysis?.compatibleScales.length).toBeGreaterThan(0);

    const inversions = buildChordInversions(["C4", "E4", "G4"]);
    expect(inversions[2].notes).toEqual(["G4", "C5", "E5"]);
  });

  it("suggests roman numerals or foreign-key feedback", () => {
    expect(suggestRomanNumeral("G", "C Major")).toEqual({
      label: "V",
      detail: "Dominant function in C Major.",
    });
    expect(suggestRomanNumeral("F#", "C Major")).toEqual({
      label: "Foreign to key",
      detail: "F# is outside C Major.",
    });
  });
});
