import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

const audioMocks = vi.hoisted(() => ({
  stopAllAudio: vi.fn(),
  unlockAudio: vi.fn(),
}));

vi.mock("../audio/audioEngine", () => ({
  stopAllAudio: audioMocks.stopAllAudio,
  unlockAudio: audioMocks.unlockAudio,
}));

vi.mock("./featureRegistry", () => ({
  featureRegistry: [
    {
      id: "testsource",
      label: "Test Source",
      section: "Testing",
      description: "Source route",
      kind: "source",
    },
    {
      id: "legacytool",
      label: "Legacy Tool",
      section: "Testing",
      description: "Legacy route",
      kind: "legacy",
      legacyView: "legacy-panel",
    },
  ],
}));

import { SourceLayout } from "./SourceLayout";
import { useAppStore } from "./store/useAppStore";
import { useCustomInstrumentStore } from "./store/useCustomInstrumentStore";

describe("SourceLayout", () => {
  beforeEach(() => {
    audioMocks.stopAllAudio.mockReset();
    audioMocks.unlockAudio.mockReset();
    useAppStore.setState({
      currentView: "chords",
      currentKey: "C Major",
      currentInstrument: "piano",
      tempo: 120,
      soundEnabled: true,
      theme: "dark",
    });
    useCustomInstrumentStore.setState({
      customInstruments: {
        "custom-lute": {
          type: "fretboard",
          name: "Custom Lute",
          strings: ["G2", "C3", "F3"],
          frets: 9,
        },
      },
    });
  });

  it("renders the shell, updates toolbar state, filters navigation, and builds source/legacy navigation", async () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/app/testsource"]}>
        <Routes>
          <Route path="/app/*" element={<SourceLayout />}>
            <Route path="testsource" element={<div>Child Route</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("Child Route")).toBeInTheDocument();
    await waitFor(() => {
      expect(useAppStore.getState().currentView).toBe("testsource");
    });

    fireEvent.pointerDown(container.querySelector(".source-app-shell")!);
    expect(audioMocks.unlockAudio).toHaveBeenCalled();

    fireEvent.change(screen.getByLabelText("Key"), { target: { value: "G Major" } });
    fireEvent.change(screen.getByLabelText("Instrument"), { target: { value: "custom-lute" } });
    fireEvent.change(screen.getByRole("slider"), { target: { value: "140" } });

    expect(useAppStore.getState().currentKey).toBe("G Major");
    expect(useAppStore.getState().currentInstrument).toBe("custom-lute");
    expect(useAppStore.getState().tempo).toBe(140);
    expect(screen.getAllByText("Test Source")).toHaveLength(2);
    expect(screen.getByText("Active key G Major • Root G")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Sound On" }));
    expect(screen.getByRole("button", { name: "Sound Off" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Stop" }));
    expect(audioMocks.stopAllAudio).toHaveBeenCalled();

    fireEvent.change(screen.getByLabelText("Find feature"), { target: { value: "legacy" } });
    expect(screen.queryByRole("link", { name: /test source/i })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /legacy tool/i })).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Find feature"), { target: { value: "zzz" } });
    expect(screen.getByText("No matching features")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Find feature"), { target: { value: "" } });

    expect(screen.getByRole("link", { name: /test source/i })).toHaveAttribute("href", "/app/testsource");
    expect(screen.getByRole("link", { name: /legacy tool/i })).toHaveAttribute(
      "href",
      "/legacy.html#view=legacy-panel&key=G%20Major",
    );
    expect(screen.getByRole("link", { name: "Open Legacy Reference" })).toHaveAttribute(
      "href",
      "/legacy.html#key=G%20Major",
    );
  });
});
