import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { EarTrainerPage } from "./EarTrainerPage";
import { useShellBridgeStore } from "../../app/store/useShellBridgeStore";

const audioMocks = vi.hoisted(() => ({
  playChord: vi.fn(),
  playNote: vi.fn(),
  playNoteSequence: vi.fn(),
  playRhythmPattern: vi.fn(),
}));

vi.mock("../../audio/audioEngine", () => ({
  playChord: audioMocks.playChord,
  playNote: audioMocks.playNote,
  playNoteSequence: audioMocks.playNoteSequence,
  playRhythmPattern: audioMocks.playRhythmPattern,
}));

vi.mock("../../app/store/useAppStore", () => ({
  useAppStore: (selector: (state: { currentKey: string }) => string) => selector({ currentKey: "C" }),
}));

describe("EarTrainerPage", () => {
  beforeEach(() => {
    useShellBridgeStore.getState().reset();
    audioMocks.playChord.mockReset();
    audioMocks.playNote.mockReset();
    audioMocks.playNoteSequence.mockReset();
    audioMocks.playRhythmPattern.mockReset();
    vi.spyOn(Math, "random").mockReturnValue(0);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("publishes the ear route shell state and keeps replay/clear wired", async () => {
    render(<EarTrainerPage />);

    await waitFor(() => {
      expect(useShellBridgeStore.getState().routeId).toBe("ear");
    });
    await waitFor(() => {
      expect(audioMocks.playNote).toHaveBeenCalled();
    });
    audioMocks.playChord.mockReset();
    audioMocks.playNote.mockReset();
    audioMocks.playNoteSequence.mockReset();
    audioMocks.playRhythmPattern.mockReset();

    expect(useShellBridgeStore.getState().title).toBe("Ear Trainer");
    expect(useShellBridgeStore.getState().subtitle).toBe("Adaptive pitch and interval trainer.");
    expect(useShellBridgeStore.getState().playableLabel).toBe("Note ID • Beginner • C");
    expect(useShellBridgeStore.getState().playableNoteSet).toEqual(["C4"]);

    useShellBridgeStore.getState().playCurrent?.();
    expect(audioMocks.playNote).toHaveBeenCalledWith("C4", 420);

    fireEvent.change(screen.getByRole("combobox", { name: "Challenge" }), {
      target: { value: "interval" },
    });

    await waitFor(() => {
      expect(screen.getByRole("combobox", { name: "Challenge" })).toHaveValue("interval");
    });

    useShellBridgeStore.getState().clear?.();

    await waitFor(() => {
      expect(screen.getByRole("combobox", { name: "Challenge" })).toHaveValue("note");
    });
    expect(useShellBridgeStore.getState().playableLabel).toBe("Note ID • Beginner • C");
    expect(useShellBridgeStore.getState().playableNoteSet).toEqual(["C4"]);
  });
});
