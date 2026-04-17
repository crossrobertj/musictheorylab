import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useCustomInstrumentStore } from "../app/store/useCustomInstrumentStore";
import { KeyboardPreview } from "./KeyboardPreview";

const audioMocks = vi.hoisted(() => ({
  playNote: vi.fn(),
}));

vi.mock("../audio/audioEngine", () => ({
  playNote: audioMocks.playNote,
}));

describe("KeyboardPreview", () => {
  beforeEach(() => {
    audioMocks.playNote.mockReset();
    useCustomInstrumentStore.setState({ customInstruments: {} });
  });

  it("renders a real piano board and plays notes on click", () => {
    render(<KeyboardPreview activeNotes={["C4", "E4", "G4"]} keySignature="C Major" />);

    expect(document.querySelector(".instrument-board--piano")).toBeTruthy();
    expect(document.querySelectorAll(".piano-key.is-active").length).toBeGreaterThan(0);

    fireEvent.click(screen.getAllByRole("button", { name: "C" })[0]);
    expect(audioMocks.playNote).toHaveBeenCalledWith("C3");
  });

  it("surfaces microtonal notes in the preview", () => {
    render(<KeyboardPreview activeNotes={["C4", "D#4_50", "G4"]} keySignature="C Major" />);

    expect(screen.getByText("Microtonal pitches")).toBeTruthy();
    expect(screen.getByText("D#4 +50c")).toBeTruthy();
    expect(document.querySelectorAll(".piano-key.is-microtonal").length).toBeGreaterThan(0);
  });
});
