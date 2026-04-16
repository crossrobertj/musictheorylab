import { legacyScripts } from "./generated/legacy-scripts";

let initialized = false;

export function initLegacyRuntime() {
  if (initialized) return;
  initialized = true;
  const runtimeWindow = window as Window &
    typeof globalThis & {
      __legacyReadyQueue?: Array<() => void>;
      __legacyRegisterServiceWorker?: (cacheName: string) => Promise<unknown>;
    };

  runtimeWindow.__legacyRegisterServiceWorker = (_cacheName: string) => {
    if (!("serviceWorker" in navigator)) {
      return Promise.reject(new Error("Service workers are not supported"));
    }

    const swUrl = "/app-sw.js";
    return navigator.serviceWorker.register(swUrl);
  };

  (0, eval)(legacyScripts);
  const readyQueue = runtimeWindow.__legacyReadyQueue;
  if (!readyQueue?.length) return;

  while (readyQueue.length > 0) {
    const callback = readyQueue.shift();
    callback?.();
  }
}
