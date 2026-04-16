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

const sourcePaths = [
  "/",
  "/app/piano",
  "/app/voicings",
  "/app/metronome",
  "/app/drums",
  "/app/ear",
  "/app/quiz",
  "/app/circle",
  "/app/finder",
  "/app/intervals",
  "/app/calculator",
];

const sourceResults = await Promise.all(
  sourcePaths.map((path) =>
    inspectPage(`${baseUrl}${path}`, () => ({
      title: document.title,
      sourceShell: Boolean(document.querySelector(".source-app-shell")),
      activeFeatureCards: document.querySelectorAll(".feature-card").length,
      activeRoute: window.location.pathname,
      hero: document.querySelector(".page-hero h1")?.textContent ?? "",
    })),
  ),
);

const legacyResult = await inspectPage(
  `${baseUrl}/legacy.html#view=finder&key=C%20Major`,
  () => ({
    title: document.title,
    legacyShell: Boolean(document.querySelector("#app-shell")),
    contentCards: document.querySelectorAll("#content-grid > *").length,
    activeHash: window.location.hash,
    topHeader: document.getElementById("top-header")?.textContent?.toLowerCase() ?? "",
  }),
);

await browser.close();

const results = [...sourceResults, legacyResult];
const unexpectedFailures = results.flatMap((result) => {
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
  }

  if (result === legacyResult) {
    if (!result.diagnostics.legacyShell) validationErrors.push("legacy shell missing");
    if (result.diagnostics.contentCards === 0) validationErrors.push("legacy content grid empty");
    if (!result.diagnostics.topHeader.includes("identifier")) {
      validationErrors.push("legacy deep-link did not land on finder view");
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
