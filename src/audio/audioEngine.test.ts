import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mockState = vi.hoisted(() => ({
  app: {
    soundEnabled: true,
    currentInstrument: "piano",
    tempo: 120,
  },
  tuning: {
    system: "12-TET",
    basePitch: 440,
  },
  tunedFrequency: vi.fn(() => 440),
}));

vi.mock("../app/store/useAppStore", () => ({
  useAppStore: {
    getState: () => mockState.app,
  },
}));

vi.mock("../app/store/useTuningStore", () => ({
  useTuningStore: {
    getState: () => mockState.tuning,
  },
}));

vi.mock("../domain/tuning", () => ({
  getTunedFrequency: mockState.tunedFrequency,
}));

class MockParam {
  value = 0;
  setValueAtTime = vi.fn((value: number) => {
    this.value = value;
  });
  linearRampToValueAtTime = vi.fn((value: number) => {
    this.value = value;
  });
  exponentialRampToValueAtTime = vi.fn((value: number) => {
    this.value = value;
  });
}

class MockNode {
  onended: (() => void) | null = null;
  connections: unknown[] = [];
  connect(target: unknown) {
    this.connections.push(target);
    return target;
  }
}

class MockSourceNode extends MockNode {
  started: number[] = [];
  stopped: number[] = [];
  throwOnStop = false;

  start(when = 0) {
    this.started.push(when);
  }

  stop(when = 0) {
    if (this.throwOnStop) throw new Error("stop failed");
    this.stopped.push(when);
    this.onended?.();
  }
}

class MockOscillatorNode extends MockSourceNode {
  type: OscillatorType = "sine";
  frequency = new MockParam();
}

class MockBufferSourceNode extends MockSourceNode {
  buffer: MockAudioBuffer | null = null;
}

class MockGainNode extends MockNode {
  gain = new MockParam();
}

class MockBiquadFilterNode extends MockNode {
  type: BiquadFilterType = "lowpass";
  frequency = new MockParam();
  Q = new MockParam();
}

class MockAudioBuffer {
  channel: Float32Array;

  constructor(length: number) {
    this.channel = new Float32Array(length);
  }

  getChannelData() {
    return this.channel;
  }
}

class MockAudioContext {
  state: AudioContextState;
  currentTime = 1;
  sampleRate = 8;
  destination = {};
  oscillators: MockOscillatorNode[] = [];
  gains: MockGainNode[] = [];
  filters: MockBiquadFilterNode[] = [];
  buffers: MockAudioBuffer[] = [];
  bufferSources: MockBufferSourceNode[] = [];
  resume = vi.fn(async () => undefined);

  constructor(state: AudioContextState = "running") {
    this.state = state;
  }

  createOscillator() {
    const node = new MockOscillatorNode();
    this.oscillators.push(node);
    return node as unknown as OscillatorNode;
  }

  createGain() {
    const node = new MockGainNode();
    this.gains.push(node);
    return node as unknown as GainNode;
  }

  createBiquadFilter() {
    const node = new MockBiquadFilterNode();
    this.filters.push(node);
    return node as unknown as BiquadFilterNode;
  }

  createBuffer(_channels: number, length: number) {
    const buffer = new MockAudioBuffer(length);
    this.buffers.push(buffer);
    return buffer as unknown as AudioBuffer;
  }

  createBufferSource() {
    const node = new MockBufferSourceNode();
    this.bufferSources.push(node);
    return node as unknown as AudioBufferSourceNode;
  }
}

function installAudioContext(context: MockAudioContext, mode: "standard" | "webkit" = "standard") {
  function AudioCtor() {
    return context as unknown as object;
  }
  if (mode === "standard") {
    Object.defineProperty(window, "AudioContext", {
      configurable: true,
      value: AudioCtor,
    });
    Object.defineProperty(window, "webkitAudioContext", {
      configurable: true,
      value: undefined,
    });
  } else {
    Object.defineProperty(window, "AudioContext", {
      configurable: true,
      value: undefined,
    });
    Object.defineProperty(window, "webkitAudioContext", {
      configurable: true,
      value: AudioCtor,
    });
  }
}

async function loadAudioEngine() {
  vi.resetModules();
  return import("./audioEngine");
}

describe("audioEngine", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockState.app.soundEnabled = true;
    mockState.app.currentInstrument = "piano";
    mockState.app.tempo = 120;
    mockState.tuning.system = "12-TET";
    mockState.tuning.basePitch = 440;
    mockState.tunedFrequency.mockReset();
    mockState.tunedFrequency.mockReturnValue(440);
    Object.defineProperty(window, "AudioContext", {
      configurable: true,
      value: undefined,
    });
    Object.defineProperty(window, "webkitAudioContext", {
      configurable: true,
      value: undefined,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("unlocks audio with standard and webkit contexts and tolerates resume failure", async () => {
    const noContextEngine = await loadAudioEngine();
    await expect(noContextEngine.unlockAudio()).resolves.toBeUndefined();

    const suspendedContext = new MockAudioContext("suspended");
    suspendedContext.resume.mockRejectedValueOnce(new Error("resume failed"));
    installAudioContext(suspendedContext, "webkit");

    const engine = await loadAudioEngine();
    await expect(engine.unlockAudio()).resolves.toBeUndefined();
    expect(suspendedContext.resume).toHaveBeenCalled();
  });

  it("plays notes with instrument-specific oscillator shapes and tuned frequencies", async () => {
    const context = new MockAudioContext("running");
    installAudioContext(context);
    const engine = await loadAudioEngine();

    mockState.app.currentInstrument = "guitar";
    engine.playNote("A4", 500);
    expect(context.oscillators[0]?.type).toBe("triangle");

    mockState.app.currentInstrument = "violin";
    engine.playNote("A4", 500);
    expect(context.oscillators[1]?.type).toBe("sawtooth");

    mockState.app.currentInstrument = "piano";
    engine.playNote("A4", 500);
    expect(context.oscillators[2]?.type).toBe("sine");
    expect(mockState.tunedFrequency).toHaveBeenCalledWith("A4", "12-TET", 440);
    expect(context.filters[0]?.type).toBe("lowpass");
  });

  it("does nothing when sound is disabled or the context is not running", async () => {
    const context = new MockAudioContext("suspended");
    installAudioContext(context);
    const engine = await loadAudioEngine();

    mockState.app.soundEnabled = false;
    engine.playNote("C4");
    engine.playMetronomeClick("primary");
    engine.playDrumHit("kick");
    expect(context.oscillators).toHaveLength(0);
    expect(context.bufferSources).toHaveLength(0);

    mockState.app.soundEnabled = true;
    engine.playNote("C4");
    engine.playMetronomeClick("secondary");
    engine.playDrumHit("snare");
    expect(context.oscillators).toHaveLength(0);
    expect(context.bufferSources).toHaveLength(0);
  });

  it("schedules note groups, sequences, rhythms, and clears pending work on stop", async () => {
    const context = new MockAudioContext("running");
    installAudioContext(context);
    const engine = await loadAudioEngine();

    engine.playChord(["C4", "E4"], { arpeggio: true });
    vi.runOnlyPendingTimers();
    expect(context.oscillators.length).toBeGreaterThanOrEqual(2);

    context.oscillators.length = 0;
    engine.playScale(["C4", "D4"], true);
    vi.runOnlyPendingTimers();
    expect(context.oscillators.length).toBe(2);

    context.oscillators.length = 0;
    engine.playNoteSequence(["C4", "E4"], 100, 50, true);
    vi.runOnlyPendingTimers();
    expect(context.oscillators.length).toBe(2);

    context.oscillators.length = 0;
    engine.playRhythmPattern([1, 0, 1], { note: "G4", stepMs: 100, duration: 80, reset: true });
    vi.runOnlyPendingTimers();
    expect(context.oscillators.length).toBe(2);

    context.oscillators.length = 0;
    engine.playChord(["C4", "E4"], { arpeggio: true, reset: false });
    engine.stopAllAudio();
    vi.runOnlyPendingTimers();
    expect(context.oscillators.length).toBe(0);
  });

  it("plays metronome clicks and drum hits across instrument branches", async () => {
    const context = new MockAudioContext("running");
    installAudioContext(context);
    const engine = await loadAudioEngine();

    engine.playMetronomeClick("primary");
    engine.playMetronomeClick("secondary");
    engine.playMetronomeClick("subdivision");
    expect(context.oscillators[0]?.type).toBe("square");
    expect(context.oscillators[0]?.frequency.value).toBe(1550);
    expect(context.oscillators[1]?.frequency.value).toBe(1180);
    expect(context.oscillators[2]?.frequency.value).toBe(900);

    engine.playDrumHit("kick", 0.5);
    engine.playDrumHit("snare", 0.5);
    engine.playDrumHit("clap", 0.5);
    engine.playDrumHit("chh", 0.5);
    engine.playDrumHit("ohh", 0.5);
    engine.playDrumHit("perc", 0.5);

    const filterTail = context.filters.slice(-5);
    expect(context.bufferSources).toHaveLength(5);
    expect(filterTail[0]?.type).toBe("bandpass");
    expect(filterTail[1]?.type).toBe("bandpass");
    expect(filterTail[2]?.type).toBe("highpass");
    expect(filterTail[3]?.type).toBe("highpass");
    expect(filterTail[4]?.type).toBe("bandpass");
    expect(context.bufferSources[0]?.buffer).toBe(context.bufferSources[1]?.buffer);
  });

  it("stops active nodes even if one throws during stop", async () => {
    const context = new MockAudioContext("running");
    installAudioContext(context);
    const engine = await loadAudioEngine();

    engine.playNote("C4");
    expect(context.oscillators).toHaveLength(1);
    context.oscillators[0]!.throwOnStop = true;

    expect(() => engine.stopAllAudio()).not.toThrow();
  });
});
