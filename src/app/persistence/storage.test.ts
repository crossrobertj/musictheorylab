import { describe, expect, it } from "vitest";
import {
  clearPersistedState,
  loadVersionedState,
  persistVersionedState,
  type PersistedEnvelope,
} from "./storage";

describe("versioned persistence", () => {
  it("rewrites old raw source payloads into versioned envelopes", () => {
    window.localStorage.setItem("app-state", JSON.stringify({ currentKey: "G Major" }));

    const value = loadVersionedState({
      key: "app-state",
      version: 1,
      defaultValue: { currentKey: "C Major" },
      parse: (raw) => {
        if (!raw || typeof raw !== "object") return null;
        const candidate = raw as { currentKey?: string };
        return { currentKey: candidate.currentKey ?? "C Major" };
      },
    });

    expect(value).toEqual({ currentKey: "G Major" });

    const rewritten = JSON.parse(
      window.localStorage.getItem("app-state") ?? "null",
    ) as PersistedEnvelope<{ currentKey: string }>;
    expect(rewritten).toEqual({
      version: 1,
      data: { currentKey: "G Major" },
    });
  });

  it("migrates legacy keys into the source key", () => {
    window.localStorage.setItem(
      "legacy-favorites",
      JSON.stringify([{ type: "chord", name: "Cmaj7" }]),
    );

    const value = loadVersionedState({
      key: "source-favorites",
      version: 1,
      defaultValue: [] as Array<{ type: string; name: string }>,
      parse: (raw) => (Array.isArray(raw) ? (raw as Array<{ type: string; name: string }>) : null),
      legacySources: [
        {
          key: "legacy-favorites",
          parse: (raw) => (Array.isArray(raw) ? (raw as Array<{ type: string; name: string }>) : null),
        },
      ],
    });

    expect(value).toEqual([{ type: "chord", name: "Cmaj7" }]);

    const migrated = JSON.parse(
      window.localStorage.getItem("source-favorites") ?? "null",
    ) as PersistedEnvelope<Array<{ type: string; name: string }>>;
    expect(migrated.version).toBe(1);
    expect(migrated.data).toEqual([{ type: "chord", name: "Cmaj7" }]);
  });

  it("applies version migrations and clears persisted keys", () => {
    window.localStorage.setItem(
      "migrated-state",
      JSON.stringify({
        version: 1,
        data: { tempo: "132" },
      } satisfies PersistedEnvelope<{ tempo: string }>),
    );

    const value = loadVersionedState({
      key: "migrated-state",
      version: 2,
      defaultValue: { tempo: 120 },
      parse: (raw) => {
        if (!raw || typeof raw !== "object") return null;
        const candidate = raw as { tempo?: number };
        return typeof candidate.tempo === "number" ? { tempo: candidate.tempo } : null;
      },
      migrations: {
        1: (raw) => {
          if (!raw || typeof raw !== "object") return null;
          const candidate = raw as { tempo?: string };
          return { tempo: Number.parseInt(candidate.tempo ?? "0", 10) };
        },
      },
    });

    expect(value).toEqual({ tempo: 132 });

    persistVersionedState("clear-me", 1, { ok: true });
    expect(window.localStorage.getItem("clear-me")).toContain("\"ok\":true");
    clearPersistedState("clear-me");
    expect(window.localStorage.getItem("clear-me")).toBeNull();
  });

  it("falls back to defaults when stored payloads are invalid or unmigratable", () => {
    window.localStorage.setItem("bad-json", "{");
    expect(
      loadVersionedState({
        key: "bad-json",
        version: 1,
        defaultValue: { currentKey: "C Major" },
        parse: () => null,
      }),
    ).toEqual({ currentKey: "C Major" });

    window.localStorage.setItem(
      "future-state",
      JSON.stringify({
        version: 3,
        data: { currentKey: "G Major" },
      }),
    );

    expect(
      loadVersionedState({
        key: "future-state",
        version: 1,
        defaultValue: { currentKey: "C Major" },
        parse: (raw) => (raw && typeof raw === "object" ? (raw as { currentKey: string }) : null),
      }),
    ).toEqual({ currentKey: "C Major" });
  });
});
