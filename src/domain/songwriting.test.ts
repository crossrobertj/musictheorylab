import { afterEach, describe, expect, it, vi } from "vitest";
import {
  analyzeSongProgression,
  countSyllables,
  createDefaultSongwritingDraft,
  detectRhymeScheme,
  generateMelodySketch,
  generateObjectPrompt,
  generateSongProgression,
  generateSongTitleIdeas,
  getEndWordFrequency,
  getLineMetrics,
  getSongProgressionOptions,
  runSongProsodyCheck,
} from "./songwriting";

describe("songwriting domain", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("counts syllables and derives rhyme/line metrics", () => {
    expect(countSyllables("hello world")).toBeGreaterThan(2);

    const text = ["I chase the light", "You hold the night", "We cross the sun"].join("\n");
    expect(detectRhymeScheme(text).scheme).toBe("AAB");
    expect(getEndWordFrequency(text)).toEqual([
      ["light", 1],
      ["night", 1],
      ["sun", 1],
    ]);
    expect(getLineMetrics(text)[0]).toEqual({
      line: 1,
      syllables: countSyllables("I chase the light"),
      words: 4,
      endWord: "light",
    });
  });

  it("generates deterministic prompts and ideas when randomness is stubbed", () => {
    const draft = {
      ...createDefaultSongwritingDraft(),
      theme: "midnight",
    };

    vi.spyOn(Math, "random").mockReturnValue(0);
    expect(generateObjectPrompt("Reflective", "midnight")).toContain("midnight");

    vi.restoreAllMocks();
    const ideas = generateSongTitleIdeas(draft);
    expect(ideas).toHaveLength(10);
    expect(new Set(ideas).size).toBe(10);

    vi.spyOn(Math, "random").mockReturnValue(0);
    const melody = generateMelodySketch("C Major");
    expect(melody.melody).toEqual(["C", "C", "C", "C", "C", "C", "C", "C"]);
    expect(melody.degrees).toEqual([1, 1, 1, 1, 1, 1, 1, 1]);
  });

  it("scores prosody and progression helpers", () => {
    expect(runSongProsodyCheck("")).toEqual({
      score: 0,
      message: "Add lyric lines to analyze stress and line balance.",
      details: [],
    });

    const balanced = runSongProsodyCheck("Open the window tonight\nFollow the city lights");
    expect(balanced.score).toBeGreaterThan(0);
    expect(balanced.details.length).toBeGreaterThan(0);

    const options = getSongProgressionOptions("Pop");
    expect(options.length).toBeGreaterThan(0);
    expect(options.length).toBeLessThanOrEqual(12);

    const picked = generateSongProgression("Pop");
    expect(picked).not.toBeNull();

    const analyzed = analyzeSongProgression("Pop", "I-V-vi-IV");
    expect(analyzed?.functions[0]).toBe("Tonic");
    expect(analyzed?.functions.length).toBe(analyzed?.numerals.length);
  });
});
