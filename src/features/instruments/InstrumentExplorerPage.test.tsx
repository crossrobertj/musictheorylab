import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useAppStore } from "../../app/store/useAppStore";
import { useShellBridgeStore } from "../../app/store/useShellBridgeStore";
import { InstrumentExplorerPage } from "./InstrumentExplorerPage";

vi.mock("../../audio/audioEngine", () => ({
  playChord: vi.fn(),
  playScale: vi.fn(),
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

describe("InstrumentExplorerPage", () => {
  beforeEach(() => {
    useShellBridgeStore.getState().reset();
    useShellBridgeStore.getState().syncRoute("piano");
    useAppStore.setState({
      currentView: "piano",
      currentKey: "C Major",
      currentInstrument: "guitar",
      tempo: 120,
      soundEnabled: true,
      theme: "dark",
    });
  });

  it("pins the piano route to a keyboard even when the global shell instrument is not piano", async () => {
    render(<InstrumentExplorerPage />);

    await waitFor(() => {
      expect(useShellBridgeStore.getState().routeId).toBe("piano");
    });

    expect(useShellBridgeStore.getState().title).toBe("Piano");
    expect(useShellBridgeStore.getState().subtitle).toBe(
      "Audition scales, triads, sevenths, and custom note sets on a playable keyboard.",
    );
    expect(useShellBridgeStore.getState().playableLabel).toContain("on Piano");

    expect(screen.getByTestId("instrument-board")).toHaveTextContent("piano:");
    expect(screen.getByText("Current Key Scale on Piano")).toBeInTheDocument();
  });
});
