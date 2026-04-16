import { useAppStore } from "../app/store/useAppStore";
import { getFrequency } from "../domain/music";

let audioContext: AudioContext | null = null;
const pendingTimeouts = new Set<number>();
const activeNodes = new Set<AudioScheduledSourceNode>();
let drumNoiseBuffer: AudioBuffer | null = null;

function getAudioContext() {
  const AudioCtor = window.AudioContext || (window as typeof window & {
    webkitAudioContext?: typeof AudioContext;
  }).webkitAudioContext;

  if (!AudioCtor) return null;
  if (!audioContext || audioContext.state === "closed") {
    audioContext = new AudioCtor();
  }

  return audioContext;
}

function schedule(fn: () => void, delay: number) {
  const timeoutId = window.setTimeout(() => {
    pendingTimeouts.delete(timeoutId);
    fn();
  }, delay);
  pendingTimeouts.add(timeoutId);
}

function trackNode(node: AudioScheduledSourceNode) {
  activeNodes.add(node);
  node.onended = () => activeNodes.delete(node);
}

function getWaveType(instrument: string): OscillatorType {
  if (instrument.startsWith("guitar") || instrument.startsWith("bass") || instrument === "ukulele") {
    return "triangle";
  }

  if (["violin", "viola", "cello", "doublebass"].includes(instrument)) {
    return "sawtooth";
  }

  return "sine";
}

export async function unlockAudio() {
  const ctx = getAudioContext();
  if (!ctx) return;

  if (ctx.state !== "running") {
    try {
      await ctx.resume();
    } catch {
      // Ignore resume failures. The next user gesture can try again.
    }
  }
}

export function stopAllAudio() {
  pendingTimeouts.forEach((timeoutId) => window.clearTimeout(timeoutId));
  pendingTimeouts.clear();

  activeNodes.forEach((node) => {
    try {
      node.stop();
    } catch {
      // Ignore already-stopped nodes.
    }
  });
  activeNodes.clear();
}

export function playNote(note: string, duration = 650) {
  const { soundEnabled, currentInstrument } = useAppStore.getState();
  if (!soundEnabled) return;

  const ctx = getAudioContext();
  if (!ctx) return;
  void unlockAudio();
  if (ctx.state !== "running") return;

  const now = ctx.currentTime;
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  oscillator.type = getWaveType(currentInstrument);
  oscillator.frequency.value = getFrequency(note);
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(2600, now);
  filter.frequency.exponentialRampToValueAtTime(480, now + duration / 1000);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.linearRampToValueAtTime(0.22, now + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration / 1000);

  oscillator.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  trackNode(oscillator);
  oscillator.start(now);
  oscillator.stop(now + duration / 1000 + 0.05);
}

export function playChord(notes: string[], options?: { arpeggio?: boolean; reset?: boolean }) {
  const arpeggio = options?.arpeggio ?? false;
  const reset = options?.reset ?? true;

  if (reset) stopAllAudio();

  if (arpeggio) {
    notes.forEach((note, index) => {
      schedule(() => playNote(note, 420), index * 110);
    });
    return;
  }

  notes.forEach((note) => playNote(note, 900));
}

export function playScale(notes: string[], reset = true) {
  const { tempo } = useAppStore.getState();
  if (reset) stopAllAudio();

  const delay = 60000 / Math.max(tempo, 40) / 3.5;
  notes.forEach((note, index) => {
    schedule(() => playNote(note, 320), index * delay);
  });
}

export function playProgression(chords: string[][]) {
  stopAllAudio();
  chords.forEach((chord, index) => {
    schedule(() => playChord(chord, { reset: false }), index * 900);
  });
}

export function playNoteSequence(notes: string[], stepMs = 500, duration = 320, reset = true) {
  if (reset) stopAllAudio();
  notes.forEach((note, index) => {
    schedule(() => playNote(note, duration), index * stepMs);
  });
}

export function playRhythmPattern(
  pattern: number[],
  options?: { note?: string; stepMs?: number; duration?: number; reset?: boolean },
) {
  const note = options?.note ?? "C4";
  const stepMs = options?.stepMs ?? 250;
  const duration = options?.duration ?? 120;
  const reset = options?.reset ?? true;

  if (reset) stopAllAudio();
  pattern.forEach((hit, index) => {
    if (!hit) return;
    schedule(() => playNote(note, duration), index * stepMs);
  });
}

export function playMetronomeClick(kind: "primary" | "secondary" | "subdivision") {
  const { soundEnabled } = useAppStore.getState();
  if (!soundEnabled) return;

  const ctx = getAudioContext();
  if (!ctx) return;
  void unlockAudio();
  if (ctx.state !== "running") return;

  const now = ctx.currentTime;
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  const settings =
    kind === "primary"
      ? { frequency: 1550, duration: 95, peak: 0.18 }
      : kind === "secondary"
        ? { frequency: 1180, duration: 72, peak: 0.13 }
        : { frequency: 900, duration: 45, peak: 0.08 };

  oscillator.type = "square";
  oscillator.frequency.value = settings.frequency;
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(settings.frequency * 1.15, now);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(settings.peak, now + 0.002);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + settings.duration / 1000);

  oscillator.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  trackNode(oscillator);
  oscillator.start(now);
  oscillator.stop(now + settings.duration / 1000 + 0.02);
}

function getDrumNoiseBuffer(ctx: AudioContext) {
  if (drumNoiseBuffer) return drumNoiseBuffer;

  const buffer = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
  const channel = buffer.getChannelData(0);
  for (let index = 0; index < channel.length; index += 1) {
    channel[index] = Math.random() * 2 - 1;
  }

  drumNoiseBuffer = buffer;
  return buffer;
}

export function playDrumHit(
  trackId: "kick" | "snare" | "clap" | "chh" | "ohh" | "perc",
  velocity = 1,
) {
  const { soundEnabled } = useAppStore.getState();
  if (!soundEnabled) return;

  const ctx = getAudioContext();
  if (!ctx) return;
  void unlockAudio();
  if (ctx.state !== "running") return;

  const now = ctx.currentTime;
  const gain = ctx.createGain();
  gain.connect(ctx.destination);

  if (trackId === "kick") {
    const oscillator = ctx.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(150, now);
    oscillator.frequency.exponentialRampToValueAtTime(45, now + 0.12);
    gain.gain.setValueAtTime(0.95 * velocity, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
    oscillator.connect(gain);
    trackNode(oscillator);
    oscillator.start(now);
    oscillator.stop(now + 0.15);
    return;
  }

  const noise = ctx.createBufferSource();
  const filter = ctx.createBiquadFilter();
  noise.buffer = getDrumNoiseBuffer(ctx);
  noise.connect(filter);
  filter.connect(gain);

  if (trackId === "snare") {
    filter.type = "bandpass";
    filter.frequency.value = 1700;
    filter.Q.value = 0.7;
    gain.gain.setValueAtTime(0.65 * velocity, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);
  } else if (trackId === "clap") {
    filter.type = "bandpass";
    filter.frequency.value = 1200;
    filter.Q.value = 0.8;
    gain.gain.setValueAtTime(0.6 * velocity, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
  } else if (trackId === "chh") {
    filter.type = "highpass";
    filter.frequency.value = 5000;
    gain.gain.setValueAtTime(0.22 * velocity, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);
  } else if (trackId === "ohh") {
    filter.type = "highpass";
    filter.frequency.value = 4500;
    gain.gain.setValueAtTime(0.2 * velocity, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
  } else {
    filter.type = "bandpass";
    filter.frequency.value = 900;
    filter.Q.value = 1.2;
    gain.gain.setValueAtTime(0.32 * velocity, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
  }

  trackNode(noise);
  noise.start(now);
  noise.stop(now + (trackId === "ohh" ? 0.22 : 0.12));
}
