import { afterEach, describe, expect, it, vi } from "vitest";
import { registerSourceServiceWorker } from "./registerServiceWorker";

describe("registerSourceServiceWorker", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("registers the unified service worker in production", async () => {
    vi.stubEnv("PROD", true);
    const register = vi.fn().mockResolvedValue(undefined);

    Object.defineProperty(window.navigator, "serviceWorker", {
      configurable: true,
      value: { register },
    });

    await registerSourceServiceWorker();

    expect(register).toHaveBeenCalledWith("/app-sw.js");
  });

  it("skips registration outside production mode", async () => {
    vi.stubEnv("PROD", false);
    const register = vi.fn().mockResolvedValue(undefined);

    Object.defineProperty(window.navigator, "serviceWorker", {
      configurable: true,
      value: { register },
    });

    await registerSourceServiceWorker();

    expect(register).not.toHaveBeenCalled();
  });

  it("skips registration when service workers are unavailable", async () => {
    vi.stubEnv("PROD", true);

    Object.defineProperty(window.navigator, "serviceWorker", {
      configurable: true,
      value: undefined,
    });

    await expect(registerSourceServiceWorker()).resolves.toBeUndefined();
  });

  it("warns instead of throwing when registration fails", async () => {
    vi.stubEnv("PROD", true);
    const register = vi.fn().mockRejectedValue(new Error("boom"));
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => undefined);

    Object.defineProperty(window.navigator, "serviceWorker", {
      configurable: true,
      value: { register },
    });

    await registerSourceServiceWorker();

    expect(warnSpy).toHaveBeenCalled();
    expect(register).toHaveBeenCalledWith("/app-sw.js");
  });
});
