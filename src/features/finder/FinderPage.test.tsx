import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { FinderPage } from "./FinderPage";
import { useShellBridgeStore } from "../../app/store/useShellBridgeStore";

const audioMocks = vi.hoisted(() => ({
  playChord: vi.fn(),
  playScale: vi.fn(),
}));

vi.mock("../../audio/audioEngine", () => ({
  playChord: audioMocks.playChord,
  playScale: audioMocks.playScale,
}));

vi.mock("../../components/KeyboardPreview", () => ({
  KeyboardPreview: () => <div>Keyboard Preview</div>,
}));

vi.mock("../../components/NoteBadgeList", () => ({
  NoteBadgeList: ({ notes }: { notes: string[] }) => <div>{notes.join(", ")}</div>,
}));

vi.mock("../../app/store/useAppStore", () => ({
  useAppStore: (selector: (state: { currentKey: string }) => string) => selector({ currentKey: "C" }),
}));

vi.mock("./useFinderAnalysis", () => ({
  useFinderAnalysis: (selectedNotes: string[]) => {
    const uniqueNotes = Array.from(new Set(selectedNotes));
    const exactMatch =
      uniqueNotes.length === 3 && uniqueNotes.includes("C") && uniqueNotes.includes("E") && uniqueNotes.includes("G");

    return {
      analysis: {
        selectedNoteClasses: uniqueNotes,
        exactChords: exactMatch
          ? [
              {
                name: "C Major",
                quality: "major",
                desc: "Root-position triad",
                notes: ["C4", "E4", "G4"],
              },
            ]
          : [],
        scaleMatches:
          uniqueNotes.length >= 3
            ? [
                {
                  name: "C Major",
                  score: 100,
                  region: "Western",
                  notes: ["C4", "D4", "E4", "F4", "G4", "A4", "B4"],
                },
              ]
            : [],
        compatibleScales:
          uniqueNotes.length >= 2
            ? [
                {
                  name: "C Mixolydian",
                  score: 2,
                  region: "Western",
                  notes: ["C4", "D4", "E4", "F4", "G4", "A4", "Bb4"],
                },
              ]
            : [],
      },
      isLoading: false,
      engine: "worker" as const,
      error: null,
    };
  },
}));

describe("FinderPage", () => {
  beforeEach(() => {
    audioMocks.playChord.mockReset();
    audioMocks.playScale.mockReset();
    useShellBridgeStore.getState().reset();
  });

  it("updates selected note state and clears the current selection", async () => {
    render(<FinderPage />);

    expect(screen.getByRole("heading", { name: /Harmonizing Matches for/i })).toBeInTheDocument();
    expect(screen.getByText("Worker")).toBeInTheDocument();
    expect(screen.getByText("Exact chords: 1")).toBeInTheDocument();
    expect(screen.getByText(/Harmonizing Matches for/i)).toBeInTheDocument();
    expect(screen.getByText(/Current key context:/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(useShellBridgeStore.getState().routeId).toBe("finder");
    });
    expect(useShellBridgeStore.getState().title).toBe("Chord & Scale Finder");
    expect(useShellBridgeStore.getState().subtitle).toBe(
      "Select notes to identify matching chords and compatible scales.",
    );
    expect(useShellBridgeStore.getState().playableLabel).toBe("Selected notes: C • E • G");
    expect(useShellBridgeStore.getState().playableNoteSet).toEqual(["C4", "E4", "G4"]);

    useShellBridgeStore.getState().playCurrent?.();
    expect(audioMocks.playChord).toHaveBeenCalledWith(["C4", "E4", "G4"]);

    fireEvent.click(screen.getByRole("button", { name: "B" }));

    expect(screen.getByRole("heading", { name: /Harmonizing Matches for/i })).toBeInTheDocument();
    expect(screen.getByText("Exact chords: 0")).toBeInTheDocument();
    expect(screen.getByText("Scale matches: 1")).toBeInTheDocument();
    expect(useShellBridgeStore.getState().playableNoteSet).toEqual(["C4", "E4", "G4", "B4"]);

    fireEvent.click(screen.getByRole("button", { name: "Clear" }));

    expect(screen.getByRole("heading", { name: "No notes selected" })).toBeInTheDocument();
    expect(screen.getByText("Compatible scales: 0")).toBeInTheDocument();
    expect(useShellBridgeStore.getState().playableLabel).toBe("No notes selected");
    expect(useShellBridgeStore.getState().playableNoteSet).toEqual([]);
    expect(screen.queryByText("Harmonizing Matches")).not.toBeInTheDocument();

  });
});
