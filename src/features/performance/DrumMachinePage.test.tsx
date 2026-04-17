import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useAppStore } from "../../app/store/useAppStore";
import { useShellBridgeStore } from "../../app/store/useShellBridgeStore";
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
    useShellBridgeStore.getState().reset();
    useShellBridgeStore.getState().syncRoute("drums");
    useAppStore.setState({
      currentView: "drums",
      currentKey: "C Major",
      currentInstrument: "piano",
      tempo: 120,
      soundEnabled: true,
      theme: "dark",
    });
  });

  it("filters the library, resizes the grid for odd meters, toggles humanize state, and updates the shell bridge", async () => {
    const { container } = render(<DrumMachinePage />);

    await waitFor(() => {
      expect(useShellBridgeStore.getState().routeId).toBe("drums");
      expect(useShellBridgeStore.getState().title).toBe("Drum Machine");
      expect(useShellBridgeStore.getState().subtitle).toContain("16-step sequencing");
      expect(useShellBridgeStore.getState().playableLabel).toContain("DM-001");
    });

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

    expect(useShellBridgeStore.getState().playableLabel).toBe("Empty drum grid");

    const firstStep = container.querySelector(".drum-step");
    expect(firstStep).not.toBeNull();
    fireEvent.click(firstStep!);

    expect(audioMocks.playDrumHit).toHaveBeenCalled();
  });
});
