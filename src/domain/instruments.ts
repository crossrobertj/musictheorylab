import { INSTRUMENT_CONFIGS } from "./generated/theory-data";

export interface PianoInstrumentConfig {
  type: "piano";
  name: string;
}

export interface FretboardInstrumentConfig {
  type: "fretboard";
  name: string;
  strings: readonly string[];
  frets: number;
  fretless?: boolean;
}

export type InstrumentConfig = PianoInstrumentConfig | FretboardInstrumentConfig;

export interface InstrumentGroup {
  label: string;
  entries: [string, InstrumentConfig][];
}

export function getDefaultInstrumentConfigs(): Record<string, InstrumentConfig> {
  return INSTRUMENT_CONFIGS as unknown as Record<string, InstrumentConfig>;
}

export function mergeInstrumentConfigs(customInstruments: Record<string, InstrumentConfig>) {
  return {
    ...getDefaultInstrumentConfigs(),
    ...customInstruments,
  };
}

export function getInstrumentConfig(
  instrumentId: string,
  customInstruments: Record<string, InstrumentConfig> = {},
) {
  const merged = mergeInstrumentConfigs(customInstruments);
  return merged[instrumentId] ?? merged.piano;
}

export function getInstrumentEntries(customInstruments: Record<string, InstrumentConfig> = {}) {
  return Object.entries(mergeInstrumentConfigs(customInstruments));
}

export function getGroupedInstrumentEntries(
  customInstruments: Record<string, InstrumentConfig> = {},
): InstrumentGroup[] {
  const groupedEntries = new Map<string, [string, InstrumentConfig][]>();

  getInstrumentEntries(customInstruments).forEach((entry) => {
    const [instrumentId] = entry;
    const groupLabel = instrumentId.startsWith("custom-")
      ? "Custom"
      : instrumentId === "piano"
        ? "Keyboards"
        : instrumentId.startsWith("guitar")
          ? "Guitars"
          : instrumentId.startsWith("bass")
            ? "Bass"
            : ["ukulele", "banjo5", "mandolin"].includes(instrumentId)
              ? "Folk & Acoustic"
              : ["violin", "viola", "cello", "doublebass"].includes(instrumentId)
                ? "Orchestral Strings"
                : "World Instruments";
    const currentGroup = groupedEntries.get(groupLabel) ?? [];
    currentGroup.push(entry);
    groupedEntries.set(groupLabel, currentGroup);
  });

  const groupOrder = [
    "Keyboards",
    "Guitars",
    "Bass",
    "Folk & Acoustic",
    "Orchestral Strings",
    "World Instruments",
    "Custom",
  ];

  return groupOrder
    .map((label) => ({
      label,
      entries: (groupedEntries.get(label) ?? []).slice().sort((left, right) =>
        left[1].name.localeCompare(right[1].name),
      ),
    }))
    .filter((group) => group.entries.length > 0);
}

export function slugifyInstrumentId(label: string) {
  return `custom-${label
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "instrument"}`;
}
