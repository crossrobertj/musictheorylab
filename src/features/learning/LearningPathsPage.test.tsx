import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useLearningStore } from "../../app/store/useLearningStore";
import { useShellBridgeStore } from "../../app/store/useShellBridgeStore";
import { LearningPathsPage } from "./LearningPathsPage";

describe("LearningPathsPage", () => {
  beforeEach(() => {
    useLearningStore.setState({
      completedSteps: [],
      xp: 0,
      level: 1,
    });
    useShellBridgeStore.getState().reset();
    useShellBridgeStore.getState().syncRoute("learning");
  });

  it("updates XP and completion state when a step is completed", async () => {
    render(<LearningPathsPage />);

    await waitFor(() => {
      expect(useShellBridgeStore.getState().routeId).toBe("learning");
    });
    expect(useShellBridgeStore.getState().title).toBe("Learning Paths");
    expect(useShellBridgeStore.getState().subtitle).toBe("Guided theory tracks and XP milestones.");
    expect(useShellBridgeStore.getState().playableLabel).toBe("Lvl 1 • 0 XP • 0/100 steps");
    expect(useShellBridgeStore.getState().playCurrent).toBeNull();
    expect(useShellBridgeStore.getState().clear).toEqual(expect.any(Function));

    const firstStepButton = screen.getAllByRole("button", { name: "+100" })[0];
    fireEvent.click(firstStepButton);

    expect(screen.getByText("100 XP")).toBeInTheDocument();
    expect(screen.getByText("1 / 100")).toBeInTheDocument();
    expect(useShellBridgeStore.getState().playableLabel).toBe("Lvl 1 • 100 XP • 1/100 steps");
    expect(screen.getAllByRole("button", { name: "Done" }).length).toBeGreaterThan(0);
  });

  it("resets learning progress after confirmation", () => {
    useLearningStore.setState({
      completedSteps: ["b1", "b2"],
      xp: 200,
      level: 1,
    });

    const confirmSpy = vi.spyOn(window, "confirm").mockReturnValue(true);

    render(<LearningPathsPage />);
    fireEvent.click(screen.getByRole("button", { name: "Reset Progress" }));

    expect(screen.getByText("0 XP")).toBeInTheDocument();
    expect(screen.getByText("0 / 100")).toBeInTheDocument();
    expect(useShellBridgeStore.getState().clear).toEqual(expect.any(Function));

    confirmSpy.mockRestore();
  });
});
