import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useAppStore } from "../../app/store/useAppStore";
import { useShellBridgeStore } from "../../app/store/useShellBridgeStore";
import { TablatureToolPage } from "./TablatureToolPage";

const audioMocks = vi.hoisted(() => ({
  playNote: vi.fn(),
  stopAllAudio: vi.fn(),
}));

vi.mock("../../audio/audioEngine", () => ({
  playNote: audioMocks.playNote,
  stopAllAudio: audioMocks.stopAllAudio,
}));

vi.mock("../../components/InstrumentBoard", () => ({
  InstrumentBoard: ({
    instrumentId,
    activeNotes,
  }: {
    instrumentId: string;
    activeNotes: string[];
  }) => <div data-testid="instrument-board">{instrumentId}:{activeNotes.join(",")}</div>,
}));

vi.mock("../../components/NoteBadgeList", () => ({
  NoteBadgeList: ({ notes }: { notes: string[] }) => <div data-testid="note-badges">{notes.join(",")}</div>,
}));

describe("TablatureToolPage", () => {
  beforeEach(() => {
    audioMocks.playNote.mockReset();
    audioMocks.stopAllAudio.mockReset();
    useShellBridgeStore.getState().reset();
    useShellBridgeStore.getState().syncRoute("tablature");
    useAppStore.setState({
      currentView: "tablature",
      currentKey: "C Major",
      currentInstrument: "guitar",
      tempo: 120,
      soundEnabled: true,
      theme: "dark",
    });
  });

  it("publishes tablature shell state, plays the current tab, and clears cleanly", async () => {
    render(<TablatureToolPage />);

    await waitFor(() => {
      expect(useShellBridgeStore.getState().routeId).toBe("tablature");
    });

    expect(useShellBridgeStore.getState().title).toBe("Tablature Tool");
    expect(useShellBridgeStore.getState().subtitle).toBe(
      "Source-side fretboard tab builder with playback, export, and MIDI pitch analysis.",
    );
    expect(useShellBridgeStore.getState().playableLabel).toBe("Guitar (Standard) • empty tab");
    expect(useShellBridgeStore.getState().playableNoteSet).toEqual([]);
    expect(useShellBridgeStore.getState().playCurrent).toEqual(expect.any(Function));
    expect(useShellBridgeStore.getState().clear).toEqual(expect.any(Function));

    const quickNotes = within(
      screen.getByRole("heading", { name: "Add pitches without using the fretboard" }).closest("article") as HTMLElement,
    );
    fireEvent.click(quickNotes.getByRole("button", { name: "C" }));

    await waitFor(() => {
      expect(useShellBridgeStore.getState().playableLabel).toContain("Guitar (Standard) • 1 event");
    });
    expect(useShellBridgeStore.getState().playableNoteSet).toEqual(["C4"]);
    expect(screen.getByTestId("instrument-board")).toHaveTextContent("guitar:C4");

    useShellBridgeStore.getState().playCurrent?.();
    await waitFor(() => {
      expect(audioMocks.playNote).toHaveBeenCalledWith("C4", expect.any(Number));
    });
    expect(audioMocks.stopAllAudio).toHaveBeenCalled();

    useShellBridgeStore.getState().clear?.();

    await waitFor(() => {
      expect(useShellBridgeStore.getState().playableLabel).toBe("Guitar (Standard) • empty tab");
    });
    expect(useShellBridgeStore.getState().playableNoteSet).toEqual([]);
    expect(screen.getByTestId("instrument-board")).toHaveTextContent("guitar:");
  });
});
