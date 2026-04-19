import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import { useAppStore } from "../../app/store/useAppStore";
import { useShellBridgeStore } from "../../app/store/useShellBridgeStore";
import { MetronomePage } from "./MetronomePage";

const audioMocks = vi.hoisted(() => ({
  playMetronomeClick: vi.fn(),
  stopAllAudio: vi.fn(),
}));

vi.mock("../../audio/audioEngine", () => ({
  playMetronomeClick: audioMocks.playMetronomeClick,
  stopAllAudio: audioMocks.stopAllAudio,
}));

describe("MetronomePage", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    audioMocks.playMetronomeClick.mockReset();
    audioMocks.stopAllAudio.mockReset();
    useShellBridgeStore.getState().reset();
    useShellBridgeStore.getState().syncRoute("metronome");
    useAppStore.setState({
      currentView: "metronome",
      currentKey: "C Major",
      currentInstrument: "piano",
      tempo: 120,
      soundEnabled: true,
      theme: "dark",
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("applies presets and custom additive meters", () => {
    render(<MetronomePage />);

    fireEvent.click(screen.getByRole("button", { name: /7\/8 Prog 140/i }));

    expect(screen.getByText("140 BPM")).toBeInTheDocument();
    expect(screen.getAllByText("7/8").length).toBeGreaterThan(0);
    expect(screen.getByText("Grouping 2+2+3")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Custom signature"), {
      target: { value: "13/8" },
    });
    fireEvent.change(screen.getByLabelText("Accent groups"), {
      target: { value: "3+3+2+2+3" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Apply Custom Meter" }));

    expect(screen.getByText("13/8")).toBeInTheDocument();
    expect(screen.getByText("Grouping 3+3+2+2+3")).toBeInTheDocument();
  });

  it("registers shell bridge state and stops cleanly", () => {
    render(<MetronomePage />);

    expect(useShellBridgeStore.getState().routeId).toBe("metronome");
    expect(useShellBridgeStore.getState().title).toBe("Metronome");
    expect(useShellBridgeStore.getState().subtitle).toBe("High-precision practice metronome.");
    expect(useShellBridgeStore.getState().playableLabel).toBe(
      "120 BPM • 4/4 • Quarter notes • accents 4",
    );
    expect(useShellBridgeStore.getState().playCurrent).toEqual(expect.any(Function));
    expect(useShellBridgeStore.getState().clear).toEqual(expect.any(Function));

    act(() => {
      useShellBridgeStore.getState().playCurrent?.();
    });
    expect(screen.getByRole("heading", { name: "Running" })).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1200);
    });

    expect(audioMocks.playMetronomeClick).toHaveBeenCalled();

    act(() => {
      useShellBridgeStore.getState().clear?.();
    });

    expect(screen.getByRole("heading", { name: "Stopped" })).toBeInTheDocument();
    expect(screen.getByText("120 BPM")).toBeInTheDocument();
    expect(useShellBridgeStore.getState().playableLabel).toBe(
      "120 BPM • 4/4 • Quarter notes • accents 4",
    );
    expect(audioMocks.stopAllAudio).toHaveBeenCalled();
  });
});
