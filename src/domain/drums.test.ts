import { describe, expect, it, vi, afterEach } from "vitest";
import {
  buildDrumMidiFromGrid,
  cloneDrumGrid,
  createEmptyDrumGrid,
  cycleStepVelocity,
  getStepsForTimeSignature,
  humanizeDrumGrid,
  randomizeDrumPattern,
  resizeDrumGrid,
} from "./drums";

describe("drums domain", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("creates, clones, and resizes drum grids", () => {
    const grid = createEmptyDrumGrid(8);
    expect(grid.kick).toHaveLength(8);
    expect(grid.snare.every((value) => value === 0)).toBe(true);

    grid.kick[0] = 1;
    const cloned = cloneDrumGrid(grid);
    expect(cloned).not.toBe(grid);
    expect(cloned.kick[0]).toBe(1);

    const resized = resizeDrumGrid(grid, 4);
    expect(resized.kick).toEqual([1, 0, 0, 0]);
    expect(resized.snare).toHaveLength(4);
  });

  it("maps signatures to step counts and cycles step velocities", () => {
    expect(getStepsForTimeSignature("4/4")).toBe(16);
    expect(getStepsForTimeSignature("7/8")).toBe(14);
    expect(getStepsForTimeSignature("bad")).toBe(16);

    expect(cycleStepVelocity(0)).toBe(1);
    expect(cycleStepVelocity(0.9)).toBe(0.75);
    expect(cycleStepVelocity(0.7)).toBe(0.5);
    expect(cycleStepVelocity(0.5)).toBe(0.25);
    expect(cycleStepVelocity(0.25)).toBe(0);
  });

  it("randomizes and humanizes drum data deterministically when randomness is stubbed", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);

    const randomized = randomizeDrumPattern(16);
    expect(randomized.kick[0]).toBe(1);
    expect(randomized.snare[4]).toBe(1);
    expect(randomized.snare[12]).toBe(1);
    expect(randomized.chh[2]).toBe(0.5);

    const humanized = humanizeDrumGrid({
      ...createEmptyDrumGrid(2),
      kick: [1, 0.5],
      snare: [0, 0],
      clap: [0, 0],
      chh: [0, 0],
      ohh: [0, 0],
      perc: [0, 0],
    });
    expect(humanized.kick[0]).toBeCloseTo(0.85);
    expect(humanized.kick[1]).toBeCloseTo(0.35);
  });

  it("builds a valid midi payload from an active grid", () => {
    const grid = createEmptyDrumGrid(4);
    grid.kick[0] = 1;
    grid.snare[2] = 1;

    const midi = buildDrumMidiFromGrid(grid, 4, 1, 120);
    const asText = String.fromCharCode(...midi.slice(0, 4));

    expect(asText).toBe("MThd");
    expect(Array.from(midi)).toContain(0x99);
    expect(Array.from(midi)).toContain(36);
    expect(Array.from(midi)).toContain(38);
  });
});
