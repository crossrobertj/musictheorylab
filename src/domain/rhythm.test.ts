import { afterEach, describe, expect, it, vi } from "vitest";
import {
  buildPolyrhythmTimeline,
  createRandomSlicerPattern,
  createRandomSyncopationPattern,
  cycleAccentLevel,
  greatestCommonDivisor,
  leastCommonMultiple,
} from "./rhythm";

describe("rhythm domain", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("computes gcd/lcm and polyrhythm timelines", () => {
    expect(greatestCommonDivisor(12, 18)).toBe(6);
    expect(leastCommonMultiple(3, 4)).toBe(12);

    const timeline = buildPolyrhythmTimeline(3, 4);
    expect(timeline).toHaveLength(12);
    expect(timeline[0]).toEqual({ index: 0, a: true, b: true });
    expect(timeline[3].b).toBe(true);
    expect(timeline[4].a).toBe(true);
  });

  it("cycles accent levels through the expected states", () => {
    expect(cycleAccentLevel(0)).toBe(0.35);
    expect(cycleAccentLevel(0.35)).toBe(0.7);
    expect(cycleAccentLevel(0.7)).toBe(1);
    expect(cycleAccentLevel(1)).toBe(0);
  });

  it("guarantees at least one active beat or slice when randomness would otherwise clear all events", () => {
    const values = [
      0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1,
      0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99, 0.99,
    ];
    vi.spyOn(Math, "random").mockImplementation(() => values.shift() ?? 0.99);

    expect(createRandomSyncopationPattern()).toEqual([1, 0, 0, 0, 0, 0, 0, 0]);
    expect(createRandomSlicerPattern()).toEqual([1, 0, 0, 0, 0, 0, 0, 0]);
  });
});
