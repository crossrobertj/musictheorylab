import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import { useAppStore } from "../../app/store/useAppStore";
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

  it("starts ticking and stops cleanly", () => {
    render(<MetronomePage />);

    fireEvent.click(screen.getByRole("button", { name: "Start Metronome" }));
    expect(screen.getByRole("heading", { name: "Running" })).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1200);
    });

    expect(audioMocks.playMetronomeClick).toHaveBeenCalled();

    fireEvent.click(screen.getByRole("button", { name: "Stop Metronome" }));

    expect(screen.getByRole("heading", { name: "Stopped" })).toBeInTheDocument();
    expect(audioMocks.stopAllAudio).toHaveBeenCalled();
  });
});
