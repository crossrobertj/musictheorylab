const CACHE_PREFIX = "mtl-runtime";
const SHELL_CACHE = `${CACHE_PREFIX}-shell-v1`;
const STATIC_CACHE = `${CACHE_PREFIX}-static-v1`;
const APP_SHELL_KEY = "/__mtl_app_shell__";
const LEGACY_SHELL_KEY = "/__mtl_legacy_shell__";
const PRECACHE_URLS = ["/", "/index.html", "/legacy.html", "/favicon.svg"];
const ACTIVE_CACHES = new Set([SHELL_CACHE, STATIC_CACHE]);

function isSuccess(response) {
  return response && response.ok;
}

async function precacheShells() {
  const cache = await caches.open(SHELL_CACHE);

  await Promise.allSettled(
    PRECACHE_URLS.map(async (url) => {
      const response = await fetch(new Request(url, { cache: "reload" }));
      if (!isSuccess(response)) return;

      await cache.put(url, response.clone());

      if (url === "/" || url === "/index.html") {
        await cache.put(APP_SHELL_KEY, response.clone());
      }

      if (url === "/legacy.html") {
        await cache.put(LEGACY_SHELL_KEY, response.clone());
      }
    }),
  );
}

async function networkFirstShell(request, fallbackKey) {
  const cache = await caches.open(SHELL_CACHE);

  try {
    const response = await fetch(request);
    if (isSuccess(response)) {
      await cache.put(fallbackKey, response.clone());
    }
    return response;
  } catch (error) {
    const cached =
      (await cache.match(fallbackKey)) ||
      (fallbackKey === APP_SHELL_KEY
        ? (await cache.match("/")) || (await cache.match("/index.html"))
        : await cache.match("/legacy.html"));

    if (cached) return cached;
    throw error;
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cached = await cache.match(request);

  const networkPromise = fetch(request)
    .then(async (response) => {
      if (isSuccess(response)) {
        await cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => undefined);

  if (cached) {
    void networkPromise;
    return cached;
  }

  const networkResponse = await networkPromise;
  return networkResponse || Response.error();
}

self.addEventListener("install", (event) => {
  event.waitUntil(precacheShells());
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((names) =>
        Promise.all(
          names
            .filter((name) => name.startsWith(CACHE_PREFIX) && !ACTIVE_CACHES.has(name))
            .map((name) => caches.delete(name)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  let url;
  try {
    url = new URL(event.request.url);
  } catch {
    return;
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") return;

  if (event.request.mode === "navigate") {
    if (url.pathname === "/legacy.html") {
      event.respondWith(networkFirstShell(event.request, LEGACY_SHELL_KEY));
      return;
    }

    if (url.pathname === "/" || url.pathname === "/index.html" || url.pathname.startsWith("/app/")) {
      event.respondWith(networkFirstShell(event.request, APP_SHELL_KEY));
      return;
    }
  }

  if (url.origin !== self.location.origin) return;
  if (url.pathname === "/app-sw.js" || url.pathname === "/legacy-sw.js") return;

  if (
    url.pathname.startsWith("/assets/") ||
    /\.(?:css|js|svg|png|webp|woff2?)$/i.test(url.pathname)
  ) {
    event.respondWith(staleWhileRevalidate(event.request));
  }
});
