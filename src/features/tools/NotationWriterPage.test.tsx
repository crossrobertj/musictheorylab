import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useAppStore } from "../../app/store/useAppStore";
import { useShellBridgeStore } from "../../app/store/useShellBridgeStore";
import { NotationWriterPage } from "./NotationWriterPage";

const audioMocks = vi.hoisted(() => ({
  playChord: vi.fn(),
  stopAllAudio: vi.fn(),
}));

vi.mock("../../audio/audioEngine", () => ({
  playChord: audioMocks.playChord,
  stopAllAudio: audioMocks.stopAllAudio,
}));

describe("NotationWriterPage", () => {
  beforeEach(() => {
    audioMocks.playChord.mockReset();
    audioMocks.stopAllAudio.mockReset();
    useShellBridgeStore.getState().reset();
    useShellBridgeStore.getState().syncRoute("notation");
    useAppStore.setState({
      currentView: "notation",
      currentKey: "C Major",
      currentInstrument: "piano",
      tempo: 120,
      soundEnabled: true,
      theme: "dark",
    });
  });

  it("publishes notation shell state, plays the staff, and clears the current passage", async () => {
    render(<NotationWriterPage />);

    await act(async () => {
      await Promise.resolve();
    });

    expect(useShellBridgeStore.getState().routeId).toBe("notation");
    expect(useShellBridgeStore.getState().title).toBe("Notation");
    expect(useShellBridgeStore.getState().subtitle).toBe("Standard staff notation writer");
    expect(useShellBridgeStore.getState().playableLabel).toBe("Treble clef • empty staff");
    expect(useShellBridgeStore.getState().playableNoteSet).toEqual([]);
    expect(useShellBridgeStore.getState().playCurrent).toBeNull();
    expect(useShellBridgeStore.getState().clear).toEqual(expect.any(Function));

    fireEvent.click(screen.getByRole("button", { name: "C" }));
    fireEvent.click(screen.getByRole("button", { name: "E" }));

    await act(async () => {
      await Promise.resolve();
    });

    expect(useShellBridgeStore.getState().playableLabel).toBe(
      "Treble clef • 2 beats • 2 pitches",
    );
    expect(useShellBridgeStore.getState().playableNoteSet).toEqual(["C4", "E4"]);
    expect(useShellBridgeStore.getState().playCurrent).toEqual(expect.any(Function));

    vi.useFakeTimers();
    useShellBridgeStore.getState().playCurrent?.();
    expect(audioMocks.stopAllAudio).toHaveBeenCalled();

    vi.runAllTimers();
    vi.useRealTimers();

    expect(audioMocks.playChord).toHaveBeenNthCalledWith(1, ["C4"], { reset: false });
    expect(audioMocks.playChord).toHaveBeenNthCalledWith(2, ["E4"], { reset: false });

    useShellBridgeStore.getState().clear?.();

    await act(async () => {
      await Promise.resolve();
    });

    expect(useShellBridgeStore.getState().playableLabel).toBe("Treble clef • empty staff");
    expect(useShellBridgeStore.getState().playableNoteSet).toEqual([]);
    expect(useShellBridgeStore.getState().playCurrent).toBeNull();
  });
});
