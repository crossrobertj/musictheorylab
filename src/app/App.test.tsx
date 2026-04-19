import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { App } from "./App";

describe("app routing", () => {
  it("renders a lazy-loaded source route", async () => {
    render(
      <MemoryRouter initialEntries={["/app/chords"]}>
        <App />
      </MemoryRouter>,
    );

    expect(
      await screen.findByRole("heading", { name: "Diatonic Chords", level: 1 }),
    ).toBeInTheDocument();
    expect(screen.getByRole("complementary", { name: "Main Navigation" })).toBeInTheDocument();
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Instrument Controls" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Playback Controls" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Stop All" })).toBeInTheDocument();
  });

  it("renders an in-app not-found state for unknown source routes", async () => {
    render(
      <MemoryRouter initialEntries={["/app/does-not-exist"]}>
        <App />
      </MemoryRouter>,
    );

    expect(
      await screen.findByRole("heading", { name: "That feature route does not exist" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("complementary", { name: "Main Navigation" })).toBeInTheDocument();
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByText(/Return to the source app/i)).toBeInTheDocument();
  });
});
