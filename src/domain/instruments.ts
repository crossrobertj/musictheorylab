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

export function slugifyInstrumentId(label: string) {
  return `custom-${label
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "instrument"}`;
}
