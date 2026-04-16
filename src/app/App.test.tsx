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

    expect(await screen.findByRole("heading", { name: "Diatonic Chords" })).toBeInTheDocument();
    expect(screen.getByText(/Source Feature/i)).toBeInTheDocument();
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
    expect(screen.getByText(/Return to the source app/i)).toBeInTheDocument();
  });
});
