import puppeteer from "puppeteer-core";

const baseUrl = process.env.SMOKE_URL ?? "http://127.0.0.1:4173";
const executablePath =
  process.env.CHROME_BIN ??
  process.env.PUPPETEER_EXECUTABLE_PATH ??
  "/snap/bin/chromium";

const browser = await puppeteer.launch({
  executablePath,
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu"],
});

async function inspectPage(url, evaluate) {
  const page = await browser.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  const failedRequests = [];
  const badResponses = [];

  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push(message.text());
    }
  });

  page.on("pageerror", (error) => {
    pageErrors.push(error.stack || error.message);
  });

  page.on("requestfailed", (request) => {
    failedRequests.push({
      url: request.url(),
      error: request.failure()?.errorText ?? "unknown",
    });
  });

  page.on("response", (response) => {
    if (response.status() >= 400) {
      badResponses.push({ url: response.url(), status: response.status() });
    }
  });

  await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });
  const diagnostics = await page.evaluate(evaluate);
  await page.close();

  return {
    url,
    diagnostics,
    consoleErrors,
    pageErrors,
    failedRequests,
    badResponses,
  };
}

async function inspectOfflineRecovery(url) {
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });
  await page.evaluate(async () => {
    if (!("serviceWorker" in navigator)) return;
    await Promise.race([
      navigator.serviceWorker.ready.catch(() => null),
      new Promise((resolve) => window.setTimeout(resolve, 2500)),
    ]);
  });

  await page.setOfflineMode(true);
  await page.reload({ waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForSelector(".source-app-shell", { timeout: 5000 });
  await page.waitForSelector(".page-hero h1", { timeout: 5000 });

  const diagnostics = await page.evaluate(() => ({
    activeRoute: window.location.pathname,
    hero: document.querySelector(".page-hero h1")?.textContent ?? "",
    sourceShell: Boolean(document.querySelector(".source-app-shell")),
  }));

  await page.setOfflineMode(false);
  await page.close();
  return { url, diagnostics };
}

const sourcePaths = [
  "/",
  "/app/piano",
  "/app/voicings",
  "/app/interchange",
  "/app/chordanalyzer",
  "/app/harmony",
  "/app/modulate",
  "/app/metronome",
  "/app/drums",
  "/app/rhythmic",
  "/app/ear",
  "/app/quiz",
  "/app/learning",
  "/app/guide",
  "/app/grimoire",
  "/app/favorites",
  "/app/mixing",
  "/app/recording",
  "/app/genres",
  "/app/moods",
  "/app/phrasing",
  "/app/studio",
  "/app/songwriting",
  "/app/scalebuilder",
  "/app/circle",
  "/app/finder",
  "/app/intervals",
  "/app/calculator",
  "/app/notation",
  "/app/tablature",
  "/app/microtonal",
  "/app/customtuning",
];

const sourceResults = await Promise.all(
  sourcePaths.map((path) =>
    inspectPage(`${baseUrl}${path}`, async () => {
      const serviceWorkerScope =
        "serviceWorker" in navigator
          ? await Promise.race([
              navigator.serviceWorker.ready
                .then((registration) => registration?.scope ?? "")
                .catch(() => ""),
              new Promise((resolve) => window.setTimeout(() => resolve(""), 2500)),
            ])
          : "";

      return {
        title: document.title,
        sourceShell: Boolean(document.querySelector(".source-app-shell")),
        activeFeatureCards: document.querySelectorAll(".feature-card").length,
        activeRoute: window.location.pathname,
        hero: document.querySelector(".page-hero h1")?.textContent ?? "",
        learningStepCount: document.querySelectorAll(".learning-step-row").length,
        learningLinkCount: document.querySelectorAll(".learning-step-row .learning-step-link").length,
        finderEngine: Array.from(document.querySelectorAll(".info-chip"))
          .map((element) => element.textContent?.trim() ?? "")
          .find((text) => text === "Worker" || text === "Main Thread" || text === "Matching…")
          ?? "",
        serviceWorkerScope,
      };
    }),
  ),
);

const legacyResult = await inspectPage(
  `${baseUrl}/legacy.html#view=finder&key=C%20Major`,
  async () => {
    const serviceWorkerScope =
      "serviceWorker" in navigator
        ? await Promise.race([
            navigator.serviceWorker.ready
              .then((registration) => registration?.scope ?? "")
              .catch(() => ""),
            new Promise((resolve) => window.setTimeout(() => resolve(""), 2500)),
          ])
        : "";

    return {
      title: document.title,
      legacyShell: Boolean(document.querySelector("#app-shell")),
      contentCards: document.querySelectorAll("#content-grid > *").length,
      activeHash: window.location.hash,
      topHeader: document.getElementById("top-header")?.textContent?.toLowerCase() ?? "",
      serviceWorkerScope,
    };
  },
);

const offlineRecoveryResult = await inspectOfflineRecovery(`${baseUrl}/app/chords`);

await browser.close();

const results = [...sourceResults, legacyResult, offlineRecoveryResult];
const unexpectedFailures = results.flatMap((result) => {
  if (result === offlineRecoveryResult) {
    const validationErrors = [];
    if (!result.diagnostics.sourceShell) validationErrors.push("offline source shell missing");
    if (result.diagnostics.activeRoute !== "/app/chords") {
      validationErrors.push("offline reload route mismatch");
    }
    if (!result.diagnostics.hero) {
      validationErrors.push("offline reload missing hero");
    }

    return validationErrors.map((message) => ({ url: result.url, type: "validation", message }));
  }

  const badResponses = result.badResponses.filter(
    (response) => !response.url.endsWith("/favicon.ico"),
  );
  const validationErrors = [];

  if (sourceResults.includes(result)) {
    if (!result.diagnostics.sourceShell) validationErrors.push("source shell missing");
    if (!result.diagnostics.hero) {
      validationErrors.push("source route missing page hero");
    }
    if (result.diagnostics.activeRoute === "/app/chords" && result.diagnostics.activeFeatureCards === 0) {
      validationErrors.push("source feature grid empty");
    }
    if (result.diagnostics.activeRoute === "/app/chords" && !result.diagnostics.serviceWorkerScope) {
      validationErrors.push("source service worker missing");
    }
    if (result.diagnostics.activeRoute === "/app/finder" && result.diagnostics.finderEngine !== "Worker") {
      validationErrors.push("finder worker did not resolve");
    }
    if (
      result.diagnostics.activeRoute === "/app/learning" &&
      result.diagnostics.learningStepCount !== result.diagnostics.learningLinkCount
    ) {
      validationErrors.push("learning path actions missing resolved links");
    }
  }

  if (result === legacyResult) {
    if (!result.diagnostics.legacyShell) validationErrors.push("legacy shell missing");
    if (result.diagnostics.contentCards === 0) validationErrors.push("legacy content grid empty");
    if (!result.diagnostics.topHeader.includes("identifier")) {
      validationErrors.push("legacy deep-link did not land on finder view");
    }
    if (!result.diagnostics.serviceWorkerScope) {
      validationErrors.push("legacy service worker missing");
    }
  }

  return [
    ...validationErrors.map((message) => ({ url: result.url, type: "validation", message })),
    ...result.consoleErrors.map((message) => ({ url: result.url, type: "console", message })),
    ...result.pageErrors.map((message) => ({ url: result.url, type: "page", message })),
    ...result.failedRequests.map((failure) => ({ url: result.url, type: "request", message: JSON.stringify(failure) })),
    ...badResponses.map((failure) => ({ url: result.url, type: "response", message: JSON.stringify(failure) })),
  ];
});

if (unexpectedFailures.length > 0) {
  console.error(JSON.stringify({ results, unexpectedFailures }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({ results }, null, 2));
