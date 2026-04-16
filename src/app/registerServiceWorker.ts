export async function registerSourceServiceWorker() {
  if (!import.meta.env.PROD) return;
  if (!("serviceWorker" in navigator)) return;
  if (window.location.protocol === "file:") return;

  try {
    await navigator.serviceWorker.register("/app-sw.js");
  } catch (error) {
    console.warn(
      "[SW] Source app registration failed:",
      error instanceof Error ? error.message : error,
    );
  }
}
