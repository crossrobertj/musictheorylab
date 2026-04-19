import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { useEffect } from "react";
import { MemoryRouter, Route, Routes, useParams } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { SourceLayout } from "./SourceLayout";
import { useAppStore } from "./store/useAppStore";
import { useCustomInstrumentStore } from "./store/useCustomInstrumentStore";
import { useLearningStore } from "./store/useLearningStore";
import { useShellBridgeStore } from "./store/useShellBridgeStore";

const audioMocks = vi.hoisted(() => ({
  stopAllAudio: vi.fn(),
  unlockAudio: vi.fn(),
}));

const bridgeMocks = vi.hoisted(() => ({
  clear: vi.fn(),
  playCurrent: vi.fn(),
}));

vi.mock("../audio/audioEngine", () => ({
  playChord: vi.fn(),
  stopAllAudio: audioMocks.stopAllAudio,
  unlockAudio: audioMocks.unlockAudio,
}));

function BridgeRoute() {
  useEffect(() => {
    useShellBridgeStore.getState().updateRoute("chords", {
      title: "Bridge Title",
      subtitle: "Bridge Subtitle",
      playableLabel: "Bridge Selection",
      playableNoteSet: ["C4", "E4", "G4"],
      playCurrent: bridgeMocks.playCurrent,
      clear: bridgeMocks.clear,
    });
  }, []);

  return <div>Chord Route</div>;
}

function GenericFeatureRoute() {
  const { featureId } = useParams();
  return <div>{featureId} Route</div>;
}

describe("SourceLayout", () => {
  beforeEach(() => {
    audioMocks.stopAllAudio.mockReset();
    audioMocks.unlockAudio.mockReset();
    bridgeMocks.clear.mockReset();
    bridgeMocks.playCurrent.mockReset();
    localStorage.clear();

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
    useLearningStore.setState({
      completedSteps: ["b1", "b2"],
      xp: 1200,
      level: 3,
    });
    useShellBridgeStore.getState().reset();
  });

  it("renders the legacy shell and wires the shell contract to app, learning, and bridge state", async () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/app/chords"]}>
        <Routes>
          <Route path="/app/*" element={<SourceLayout />}>
            <Route element={<BridgeRoute />} path="chords" />
            <Route element={<GenericFeatureRoute />} path=":featureId" />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("Chord Route")).toBeInTheDocument();
    const navigation = screen.getByRole("complementary", { name: "Main Navigation" });
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Instrument Controls" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Playback Controls" })).toBeInTheDocument();
    expect(
      within(navigation)
        .getAllByRole("heading", { level: 2 })
        .map((heading) => heading.textContent),
    ).toEqual([
      "Harmony & Theory",
      "Exploration",
      "Creative Lab",
      "Performance",
      "Reference & Learning",
    ]);
    expect(within(navigation).getByRole("link", { name: "Diatonic Chords" })).toHaveAttribute(
      "title",
      "Diatonic triads and seventh chords",
    );
    expect(
      within(navigation)
        .getByRole("link", { name: "Diatonic Chords" })
        .querySelector(".fa-music"),
    ).toBeTruthy();
    expect(screen.getByRole("link", { name: /help & guide/i })).toHaveAttribute("href", "/app/guide");

    await waitFor(() => {
      expect(useAppStore.getState().currentView).toBe("chords");
    });
    await waitFor(() => {
      expect(screen.getByText("Bridge Title")).toBeInTheDocument();
    });

    expect(screen.getByText("Bridge Subtitle")).toBeInTheDocument();
    expect(screen.getByText("Lvl 3")).toBeInTheDocument();
    expect(screen.getByText("1200 XP")).toBeInTheDocument();

    fireEvent.pointerDown(container.querySelector(".legacy-shell")!);
    expect(audioMocks.unlockAudio).toHaveBeenCalled();

    fireEvent.change(screen.getByLabelText("Key"), { target: { value: "G Major" } });
    fireEvent.change(screen.getByLabelText("Instrument"), { target: { value: "custom-lute" } });
    fireEvent.change(screen.getByLabelText("Tempo"), { target: { value: "140" } });
    fireEvent.change(screen.getByLabelText("Strum Speed"), { target: { value: "180" } });

    expect(useAppStore.getState().currentKey).toBe("G Major");
    expect(useAppStore.getState().currentInstrument).toBe("custom-lute");
    expect(useAppStore.getState().tempo).toBe(140);
    expect(useShellBridgeStore.getState().strumSpeed).toBe(180);

    fireEvent.click(screen.getByRole("button", { name: "Sound: ON" }));
    expect(screen.getByRole("button", { name: "Sound: OFF" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Metronome: OFF" }));
    expect(screen.getByRole("button", { name: "Metronome: ON" })).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText("Arpeggio"));
    fireEvent.click(screen.getByRole("button", { name: "Drone: OFF" }));
    expect(useShellBridgeStore.getState().arpeggioMode).toBe(true);
    expect(useShellBridgeStore.getState().drone).toBe(true);

    fireEvent.click(screen.getByRole("button", { name: "Stop All" }));
    expect(audioMocks.stopAllAudio).toHaveBeenCalled();
    expect(useShellBridgeStore.getState().drone).toBe(false);
    expect(screen.getByRole("button", { name: "Metronome: OFF" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Play" }));
    expect(bridgeMocks.playCurrent).toHaveBeenCalled();

    fireEvent.click(screen.getByRole("button", { name: /clear/i }));
    expect(bridgeMocks.clear).toHaveBeenCalled();

    fireEvent.click(screen.getByLabelText("Degrees"));
    fireEvent.click(screen.getByLabelText("Label All"));
    fireEvent.click(screen.getByRole("button", { name: "Collapse Instrument Section" }));

    expect(useShellBridgeStore.getState().degreeMode).toBe(true);
    expect(useShellBridgeStore.getState().labelAll).toBe(true);
    expect(useShellBridgeStore.getState().instrumentPanelCollapsed).toBe(true);
    expect(container.querySelector(".legacy-main-scroll--instrument-collapsed")).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "Reset Level and XP" }));
    expect(useLearningStore.getState().xp).toBe(0);
    expect(useLearningStore.getState().level).toBe(1);

    fireEvent.click(screen.getByRole("button", { name: "Next feature" }));
    await waitFor(() => {
      expect(screen.getByText("allchords Route")).toBeInTheDocument();
      expect(useAppStore.getState().currentView).toBe("allchords");
    });

    const randomSpy = vi.spyOn(Math, "random");
    randomSpy.mockReturnValueOnce(0.99).mockReturnValueOnce(0.99);

    fireEvent.click(screen.getByRole("button", { name: "Surprise Me" }));

    await waitFor(() => {
      expect(useAppStore.getState().currentView).not.toBe("allchords");
      expect(useAppStore.getState().currentKey).not.toBe("G Major");
    });

    randomSpy.mockRestore();
  });
});
