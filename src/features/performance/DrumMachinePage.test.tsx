import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useAppStore } from "../../app/store/useAppStore";
import { DrumMachinePage } from "./DrumMachinePage";

const audioMocks = vi.hoisted(() => ({
  playDrumHit: vi.fn(),
  stopAllAudio: vi.fn(),
}));

vi.mock("../../audio/audioEngine", () => ({
  playDrumHit: audioMocks.playDrumHit,
  stopAllAudio: audioMocks.stopAllAudio,
}));

describe("DrumMachinePage", () => {
  beforeEach(() => {
    audioMocks.playDrumHit.mockReset();
    audioMocks.stopAllAudio.mockReset();
    useAppStore.setState({
      currentView: "drums",
      currentKey: "C Major",
      currentInstrument: "piano",
      tempo: 120,
      soundEnabled: true,
      theme: "dark",
    });
  });

  it("filters the library, resizes the grid for odd meters, and toggles humanize state", () => {
    const { container } = render(<DrumMachinePage />);

    fireEvent.change(screen.getByLabelText("Category"), {
      target: { value: "House" },
    });

    expect(screen.getByRole("heading", { name: "20 patterns" })).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Meter"), {
      target: { value: "7/8" },
    });

    expect(screen.getByText("14 steps")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Humanize Off" }));
    expect(screen.getByRole("button", { name: "Humanize On" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Clear" }));

    const firstStep = container.querySelector(".drum-step");
    expect(firstStep).not.toBeNull();
    fireEvent.click(firstStep!);

    expect(audioMocks.playDrumHit).toHaveBeenCalled();
  });
});
