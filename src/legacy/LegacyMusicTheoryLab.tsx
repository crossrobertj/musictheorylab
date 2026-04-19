import { useEffect, useRef } from "react";
import { legacyBodyClass, legacyTemplate } from "./generated/legacy-template";
import { initLegacyRuntime } from "./legacyRuntime";
import "./generated/legacy.css";

export function LegacyMusicTheoryLab() {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    document.body.className = legacyBodyClass;
    host.innerHTML = legacyTemplate;
    document.title = "Music Theory Lab";
    initLegacyRuntime();
  }, []);

  return <div ref={hostRef} />;
}
