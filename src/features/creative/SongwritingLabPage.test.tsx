import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { SongwritingLabPage } from "./SongwritingLabPage";

const STORAGE_KEY = "music-theory-lab-source-songwriting-v1";
const audioMocks = vi.hoisted(() => ({
  playNoteSequence: vi.fn(),
  playProgression: vi.fn(),
}));

vi.mock("../../audio/audioEngine", () => ({
  playNoteSequence: audioMocks.playNoteSequence,
  playProgression: audioMocks.playProgression,
}));

vi.mock("../../app/store/useAppStore", () => ({
  useAppStore: (selector: (state: { currentKey: string }) => string) => selector({ currentKey: "C" }),
}));

describe("SongwritingLabPage", () => {
  beforeEach(() => {
    localStorage.removeItem(STORAGE_KEY);
    audioMocks.playNoteSequence.mockReset();
    audioMocks.playProgression.mockReset();
  });

  it("persists draft edits and resets back to the default songwriting state", async () => {
    render(<SongwritingLabPage />);

    fireEvent.change(screen.getByDisplayValue("Untitled Song"), {
      target: { value: "Midnight Run" },
    });
    fireEvent.change(screen.getByPlaceholderText("Write lyrics for the active section..."), {
      target: { value: "Neon on the rain\nStatic in the wire" },
    });

    await waitFor(() => {
      const saved = localStorage.getItem(STORAGE_KEY);
      expect(saved).toContain("Midnight Run");
      expect(saved).toContain("Neon on the rain");
    });

    fireEvent.click(screen.getByRole("button", { name: "Reset Draft" }));

    await waitFor(() => {
      expect(screen.getByDisplayValue("Untitled Song")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Verse 1" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Chorus" })).toBeInTheDocument();
    });
  });

  it("applies a form template and runs prosody analysis for the active section", async () => {
    render(<SongwritingLabPage />);

    fireEvent.change(screen.getByDisplayValue("Apply template"), {
      target: { value: "AABA Standard" },
    });

    expect(screen.getByRole("button", { name: "Section A1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Section B" })).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText("Write lyrics for the active section..."), {
      target: { value: "Silver sirens in the dark\nCity shadows spark" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Scan Prosody" }));

    await waitFor(() => {
      expect(screen.getByText("2 lines")).toBeInTheDocument();
      expect(screen.queryByText("No analysis yet")).not.toBeInTheDocument();
    });
  });

  it("runs writing methods and idea generators into the active draft", async () => {
    render(<SongwritingLabPage />);

    fireEvent.change(screen.getByPlaceholderText("Theme or storyline"), {
      target: { value: "city lights" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Object Writing/i }));
    expect(
      (screen.getByPlaceholderText("Production or arrangement notes...") as HTMLTextAreaElement).value,
    ).toContain("Object Writing:");
    expect(screen.queryByText(/Run Object Writing to generate/i)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Generate Titles" }));
    const generatedTitle = await screen.findAllByRole("button", { name: /city lights/i });
    fireEvent.click(generatedTitle[0]);
    expect((screen.getByPlaceholderText("Song title") as HTMLInputElement).value).toMatch(/city lights/i);

    fireEvent.click(screen.getByRole("button", { name: "Generate Hooks" }));
    const hookButton = await screen.findAllByRole("button", { name: /Use as hook/i });
    fireEvent.click(hookButton[0]);
    expect((screen.getByPlaceholderText("Hook line") as HTMLInputElement).value).toMatch(/\S/);

    fireEvent.click(screen.getByRole("button", { name: "Generate Lines" }));
    const lyricsBox = screen.getByPlaceholderText("Write lyrics for the active section...");
    const lineButton = await screen.findAllByRole("button", { name: /Insert in lyrics/i });
    fireEvent.click(lineButton[0]);
    await waitFor(() => {
      expect((lyricsBox as HTMLTextAreaElement).value).toMatch(/\S/);
    });

    fireEvent.click(screen.getByRole("button", { name: /Title Ladder/i }));
    expect(screen.getAllByRole("button", { name: /city lights/i }).length).toBeGreaterThan(0);
  });

  it("manages structure, progression playback, melody sketch, and export", async () => {
    const createObjectURLSpy = vi.spyOn(URL, "createObjectURL").mockReturnValue("blob:test");
    const revokeObjectURLSpy = vi.spyOn(URL, "revokeObjectURL").mockImplementation(() => undefined);
    const clickSpy = vi.fn();
    const originalCreateElement = document.createElement.bind(document);
    const createElementSpy = vi.spyOn(document, "createElement").mockImplementation((tagName) => {
      if (tagName === "a") {
        return {
          href: "",
          download: "",
          click: clickSpy,
        } as unknown as HTMLAnchorElement;
      }
      return originalCreateElement(tagName);
    });

    render(<SongwritingLabPage />);

    fireEvent.click(screen.getByRole("button", { name: "+ Outro" }));
    expect(screen.getAllByRole("button", { name: "Outro" }).length).toBeGreaterThan(0);

    const verseButtonsBefore = screen.getAllByRole("button", { name: /^Verse 1$/ });
    fireEvent.click(verseButtonsBefore[0]);
    const downButtons = screen.getAllByRole("button", { name: "↓" });
    fireEvent.click(downButtons[0]);

    const sectionButtons = screen
      .getAllByRole("button")
      .map((button) => button.textContent)
      .filter((text): text is string => text === "Verse 1" || text === "Chorus");
    expect(sectionButtons.slice(0, 2)).toEqual(["Chorus", "Verse 1"]);

    const verseButtonAfterMove = screen.getAllByRole("button", { name: "Verse 1" })[0];
    const verseRow = verseButtonAfterMove.closest(".song-section-row");
    expect(verseRow).not.toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Chorus" }));
    fireEvent.click(within(verseRow as HTMLElement).getByRole("button", { name: "×" }));
    expect(screen.queryByRole("button", { name: "Verse 1" })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Generate Progression" }));
    fireEvent.click(screen.getByRole("button", { name: /Play in C/i }));
    expect(audioMocks.playProgression).toHaveBeenCalled();

    fireEvent.click(screen.getByRole("button", { name: "Melody Sketch" }));
    expect(audioMocks.playNoteSequence).toHaveBeenCalled();
    expect(
      (screen.getByPlaceholderText("Production or arrangement notes...") as HTMLTextAreaElement).value,
    ).toContain("Melody Sketch");

    fireEvent.click(screen.getByRole("button", { name: "Export Draft" }));
    expect(createObjectURLSpy).toHaveBeenCalled();
    expect(clickSpy).toHaveBeenCalled();
    await waitFor(() => {
      expect(revokeObjectURLSpy).toHaveBeenCalled();
    });

    createElementSpy.mockRestore();
    createObjectURLSpy.mockRestore();
    revokeObjectURLSpy.mockRestore();
  });
});
