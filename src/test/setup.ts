import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";
import { useShellBridgeStore } from "../app/store/useShellBridgeStore";

afterEach(() => {
  cleanup();
  useShellBridgeStore.getState().reset();
  window.localStorage.clear();
});
