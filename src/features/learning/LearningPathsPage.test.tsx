import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useLearningStore } from "../../app/store/useLearningStore";
import { LearningPathsPage } from "./LearningPathsPage";

describe("LearningPathsPage", () => {
  beforeEach(() => {
    useLearningStore.setState({
      completedSteps: [],
      xp: 0,
      level: 1,
    });
  });

  it("updates XP and completion state when a step is completed", () => {
    render(<LearningPathsPage />);

    const firstStepButton = screen.getAllByRole("button", { name: "+100" })[0];
    fireEvent.click(firstStepButton);

    expect(screen.getByText("100 XP")).toBeInTheDocument();
    expect(screen.getByText("1 / 100")).toBeInTheDocument();
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

    confirmSpy.mockRestore();
  });
});
