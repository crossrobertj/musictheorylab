import fs from "node:fs/promises";
import path from "node:path";

const repoRoot = process.cwd();
const sourcePath = path.join(repoRoot, "MusicTheoryLabORIGIN.html");
const outputDir = path.join(repoRoot, "src", "legacy", "generated");
const domainOutputDir = path.join(repoRoot, "src", "domain", "generated");
const publicDir = path.join(repoRoot, "public");

function mustMatch(input, regex, label) {
  const match = input.match(regex);
  if (!match) {
    throw new Error(`Could not extract ${label} from MusicTheoryLabORIGIN.html`);
  }
  return match;
}

function extractAssignedLiteral(input, constantName) {
  const marker = `const ${constantName} = `;
  const markerIndex = input.indexOf(marker);
  if (markerIndex === -1) {
    throw new Error(`Could not find constant ${constantName}`);
  }

  const start = markerIndex + marker.length;
  const opening = input[start];
  const closing = opening === "{" ? "}" : opening === "[" ? "]" : null;
  if (!closing) {
    throw new Error(`Constant ${constantName} does not start with an object or array`);
  }

  let depth = 0;
  let quote = null;
  let escape = false;
  let lineComment = false;
  let blockComment = false;

  for (let index = start; index < input.length; index += 1) {
    const char = input[index];
    const next = input[index + 1];

    if (lineComment) {
      if (char === "\n") lineComment = false;
      continue;
    }

    if (blockComment) {
      if (char === "*" && next === "/") {
        blockComment = false;
        index += 1;
      }
      continue;
    }

    if (quote) {
      if (escape) {
        escape = false;
        continue;
      }
      if (char === "\\") {
        escape = true;
        continue;
      }
      if (char === quote) {
        quote = null;
      }
      continue;
    }

    if (char === "/" && next === "/") {
      lineComment = true;
      index += 1;
      continue;
    }

    if (char === "/" && next === "*") {
      blockComment = true;
      index += 1;
      continue;
    }

    if (char === "'" || char === '"' || char === "`") {
      quote = char;
      continue;
    }

    if (char === opening) {
      depth += 1;
    } else if (char === closing) {
      depth -= 1;
      if (depth === 0) {
        return input.slice(start, index + 1);
      }
    }
  }

  throw new Error(`Could not extract full literal for ${constantName}`);
}

function evaluateLiteral(literal) {
  return Function(`"use strict"; return (${literal});`)();
}

const html = await fs.readFile(sourcePath, "utf8");
const [, bodyAttrs, bodyInner] = mustMatch(
  html,
  /<body([^>]*)>([\s\S]*?)<\/body>/i,
  "body",
);
const bodyClass =
  bodyAttrs.match(/class=(["'])(.*?)\1/i)?.[2].trim() ??
  "bg-zinc-950 text-zinc-200 min-h-screen";

const template = bodyInner
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
  .trim();

const htmlWithoutNoscript = html.replace(/<noscript[\s\S]*?<\/noscript>/gi, "");

const styleBlocks = Array.from(
  htmlWithoutNoscript.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi),
)
  .map((match) => match[1].trim())
  .filter(Boolean);

const normalizedStyleBlocks = styleBlocks
  .map((block) =>
    block
      .replace(/@import\s+url\([^)]*\);\s*/g, "")
      .trim(),
  )
  .filter(Boolean);

const styles = normalizedStyleBlocks.join("\n\n");

const rawScripts = Array.from(
  html.matchAll(/<script\b(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi),
)
  .map((match) => match[1].trim())
  .filter(Boolean)
  .join("\n\n");

const transformedScripts =
  "var __legacyReadyQueue = [];\n" +
  "var __legacyOnReady = function(fn) {\n" +
  "  __legacyReadyQueue.push(fn);\n" +
  "};\n\n" +
  rawScripts
    .replace(
      /document\.addEventListener\((['"])DOMContentLoaded\1,\s*/g,
      "__legacyOnReady(",
    )
    .replace(
      /navigator\.serviceWorker\.register\(swUrl\)/g,
      "window.__legacyRegisterServiceWorker(CACHE_NAME)",
    )
    .replace(
      /mainScroll\.removeEventListener\('scroll', arguments\.callee\);\s*/g,
      "",
    );

const keyOptions = evaluateLiteral(extractAssignedLiteral(html, "KEY_OPTIONS"));
const instrumentConfigs = evaluateLiteral(
  extractAssignedLiteral(html, "INSTRUMENT_CONFIGS"),
);
const allScales = evaluateLiteral(extractAssignedLiteral(html, "ALL_SCALES"));
const chordTemplates = evaluateLiteral(
  extractAssignedLiteral(html, "CHORD_TEMPLATES"),
);
const progressions = evaluateLiteral(extractAssignedLiteral(html, "PROGRESSIONS"));

const legacyHashCaptureScript = `
<script>
window.__legacyInitialHash = window.location.hash;
</script>
`.trim();

const legacyEntrypointScript = `
<script>
function applyInitialLegacyRoute() {
  try {
    var rawHash = window.__legacyInitialHash || window.location.hash || "";
    var params = new URLSearchParams(rawHash.replace(/^#/, ""));
    var initialView = params.get("view");
    var initialKey = params.get("key");
    if (initialKey && typeof window.changeKey === "function") {
      window.changeKey(initialKey);
    }
    if (initialView && typeof window.switchView === "function") {
      window.switchView(initialView);
    }
  } catch (error) {
    console.warn("[Legacy Boot] Could not apply initial route", error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  applyInitialLegacyRoute();
  window.setTimeout(applyInitialLegacyRoute, 0);
  window.setTimeout(applyInitialLegacyRoute, 150);
  window.addEventListener("load", applyInitialLegacyRoute, { once: true });
});
</script>
`.trim();

const legacyHtml = html
  .replace(/mainScroll\.removeEventListener\('scroll', arguments\.callee\);\s*/g, "")
  .replace(/checkOnlineVersion\(currentHash\);\s*/g, "")
  .replace("</head>", `${legacyHashCaptureScript}\n</head>`)
  .replace("</body>", `${legacyEntrypointScript}\n</body>`);

await fs.mkdir(outputDir, { recursive: true });
await fs.mkdir(domainOutputDir, { recursive: true });
await fs.mkdir(publicDir, { recursive: true });
await fs.writeFile(path.join(outputDir, "legacy.css"), `${styles}\n`);
await fs.writeFile(
  path.join(outputDir, "legacy-template.ts"),
  [
    `export const legacyBodyClass = ${JSON.stringify(bodyClass)};`,
    `export const legacyTemplate = ${JSON.stringify(template)};`,
    "",
  ].join("\n"),
);
await fs.writeFile(
  path.join(outputDir, "legacy-scripts.ts"),
  `export const legacyScripts = ${JSON.stringify(transformedScripts)};\n`,
);
await fs.writeFile(
  path.join(domainOutputDir, "theory-data.ts"),
  [
    `export const KEY_OPTIONS = ${JSON.stringify(keyOptions, null, 2)} as const;`,
    `export const INSTRUMENT_CONFIGS = ${JSON.stringify(instrumentConfigs, null, 2)} as const;`,
    `export const ALL_SCALES = ${JSON.stringify(allScales, null, 2)} as const;`,
    `export const CHORD_TEMPLATES = ${JSON.stringify(chordTemplates, null, 2)} as const;`,
    `export const PROGRESSIONS = ${JSON.stringify(progressions, null, 2)} as const;`,
    "",
  ].join("\n\n"),
);
await fs.writeFile(path.join(publicDir, "legacy.html"), legacyHtml);

console.log(
  "Extracted legacy runtime, generated domain data, and public legacy.html",
);
