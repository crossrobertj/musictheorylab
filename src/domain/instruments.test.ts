import { describe, expect, it } from "vitest";
import {
  getDefaultInstrumentConfigs,
  getInstrumentConfig,
  getInstrumentEntries,
  getGroupedInstrumentEntries,
  mergeInstrumentConfigs,
  slugifyInstrumentId,
} from "./instruments";

describe("instruments domain", () => {
  it("returns default configs and merges custom instruments", () => {
    const defaults = getDefaultInstrumentConfigs();
    expect(defaults.piano).toBeDefined();

    const merged = mergeInstrumentConfigs({
      "custom-lute": {
        type: "fretboard",
        name: "Custom Lute",
        strings: ["G2", "C3", "F3"],
        frets: 9,
      },
    });

    expect(merged["custom-lute"]?.name).toBe("Custom Lute");
    expect(getInstrumentConfig("custom-lute", merged).name).toBe("Custom Lute");
    expect(getInstrumentConfig("missing", merged).name).toBe(defaults.piano.name);
    expect(getInstrumentEntries(merged).some(([id]) => id === "custom-lute")).toBe(true);
    const groupedEntries = getGroupedInstrumentEntries(merged);
    expect(groupedEntries[groupedEntries.length - 1]?.label).toBe("Custom");
  });

  it("slugifies custom instrument ids safely", () => {
    expect(slugifyInstrumentId("  My Lute Deluxe  ")).toBe("custom-my-lute-deluxe");
    expect(slugifyInstrumentId("!!!")).toBe("custom-instrument");
  });
});
