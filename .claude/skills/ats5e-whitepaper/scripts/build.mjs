#!/usr/bin/env node
// Build an ATS5E whitepaper PDF from a content JSON file.
// Usage: node build.mjs <content.json> <out.pdf> [--html <out.html>]
// Assets (fonts, logo, imagery) are read from the ats5e-atlas repo's public/ folder and inlined
// as data URIs so headless Chrome needs no file-access flags.

import { readFileSync, writeFileSync, existsSync, mkdirSync, mkdtempSync } from "node:fs";
import { dirname, join, resolve, extname } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const SKILL_DIR = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const REPO_DIR = resolve(SKILL_DIR, "../../..");
const PUBLIC_DIR = join(REPO_DIR, "public");

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean);

const FIVE_ES = [
  ["Experience", "Human-centred experiences for customers and employees."],
  ["Empowerment", "AI-driven intelligence for smarter decisions at every level."],
  ["Efficiency", "Intelligent automation that removes wasted effort."],
  ["Execution", "Strategy delivered into results customers feel."],
  ["Evolution", "Modernisation without disruption."],
];

const MIME = { ".otf": "font/otf", ".ttf": "font/ttf", ".woff2": "font/woff2", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".svg": "image/svg+xml" };

function dataUri(path) {
  return `data:${MIME[extname(path).toLowerCase()] ?? "application/octet-stream"};base64,${readFileSync(path).toString("base64")}`;
}

function escapeHtml(value = "") {
  return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// Escapes, then applies **bold** and [n] / [n, m] citation markers.
function rich(value = "") {
  return escapeHtml(value)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\[(\d+(?:\s*[,–-]\s*\d+)*)\]/g, (_, refs) => `<sup class="cite">${refs.replace(/\s+/g, "")}</sup>`);
}

function cite(source) {
  return source ? ` <sup class="cite">${escapeHtml(source)}</sup>` : "";
}

// Colours the last word of the title blue, matching the site's headline treatment.
function accentTitle(title) {
  const words = escapeHtml(title).split(" ");
  if (words.length < 2) return words.join(" ");
  const last = words.pop();
  return `${words.join(" ")} <span class="accent">${last}</span>`;
}

function renderBlock(block) {
  switch (block.type) {
    case "p":
      return `<p>${rich(block.text)}</p>`;
    case "h":
      return `<h3 class="sub">${rich(block.text)}</h3>`;
    case "stat":
      return `<div class="stat"><div class="value">${escapeHtml(block.value)}</div><div class="label">${rich(block.label)}${cite(block.source)}</div></div>`;
    case "stats": {
      const items = block.items ?? [];
      return `<div class="stats n${Math.min(Math.max(items.length, 2), 3)}">${items
        .map((item) => `<div class="item"><div class="value">${escapeHtml(item.value)}</div><div class="label">${rich(item.label)}${cite(item.source)}</div></div>`)
        .join("")}</div>`;
    }
    case "quote":
      return `<div class="quote"><p>${rich(block.text)}</p>${block.attribution ? `<div class="by">${escapeHtml(block.attribution)}</div>` : ""}</div>`;
    case "list":
      return `${block.title ? `<div class="list-title">${rich(block.title)}</div>` : ""}<ul class="list">${(block.items ?? []).map((item) => `<li>${rich(item)}</li>`).join("")}</ul>`;
    case "callout": {
      const body = block.items
        ? `<ul class="list">${block.items.map((item) => `<li>${rich(item)}</li>`).join("")}</ul>`
        : `<p>${rich(block.text)}</p>`;
      return `<div class="callout"><div class="title">${escapeHtml(block.title ?? "What leaders should do")}</div>${body}</div>`;
    }
    case "table":
      return `<table class="data"><thead><tr>${(block.columns ?? []).map((c) => `<th>${escapeHtml(c)}</th>`).join("")}</tr></thead><tbody>${(block.rows ?? [])
        .map((row) => `<tr>${row.map((cell) => `<td>${rich(cell)}</td>`).join("")}</tr>`)
        .join("")}</tbody></table>${block.caption ? `<div class="table-caption">${rich(block.caption)}</div>` : ""}`;
    case "pagebreak":
      return `<div class="pagebreak"></div>`;
    default:
      throw new Error(`Unknown block type: ${block.type}`);
  }
}

function renderHtml(doc) {
  const fonts = [
    ["September-Medium.otf", 500],
    ["September-Bold.otf", 700],
    ["September-Heavy.otf", 900],
  ]
    .map(([file, weight]) => `@font-face{font-family:"September";src:url(${dataUri(join(PUBLIC_DIR, "fonts", file))});font-weight:${weight};font-style:normal;}`)
    .join("\n");

  const footerTitle = JSON.stringify(`ATS5E Research  |  ${doc.title}`);
  const css = readFileSync(join(SKILL_DIR, "assets", "whitepaper.css"), "utf8").replace('var(--footer-title, "")', footerTitle);
  const logo = dataUri(join(PUBLIC_DIR, "logo.png"));
  const coverPath = join(PUBLIC_DIR, "imagery", doc.coverImage ?? "high-resolution-light-trails.webp");
  const cover = existsSync(coverPath) ? dataUri(coverPath) : "";
  const chapters = doc.chapters ?? [];
  const pad = (n) => String(n).padStart(2, "0");

  const toc = [
    ["Executive summary", "The argument in brief and the key findings"],
    ...chapters.map((c) => [c.title, c.intro ?? ""]),
    doc.recommendations ? [doc.recommendations.title ?? "Recommendations", "A prioritised agenda for leadership teams"] : null,
    ["Sources", "Methodology and references"],
  ].filter(Boolean);

  const horizons = [];
  for (const item of doc.recommendations?.items ?? []) {
    const key = item.horizon ?? "";
    let group = horizons.find((h) => h.key === key);
    if (!group) horizons.push((group = { key, items: [] }));
    group.items.push(item);
  }
  let recCounter = 0;

  return `<!doctype html>
<html lang="en-GB"><head><meta charset="utf-8"><title>${escapeHtml(doc.title)} | ATS5E</title>
<meta name="author" content="${escapeHtml(doc.author ?? "ATS5E Research")}">
<meta name="description" content="${escapeHtml(doc.subtitle ?? "")}">
<style>${fonts}\n${css}</style></head>
<body>

<section class="dark-page cover">
  ${cover ? `<div class="cover-image" style="background-image:url(${cover})"></div>` : ""}
  <div class="cover-shade"></div>
  <div class="cover-inner">
    <img class="cover-logo" src="${logo}" alt="ATS5E">
    <div class="cover-eyebrow">${escapeHtml(doc.eyebrow ?? "Whitepaper")}  ·  ${escapeHtml(doc.date ?? "")}</div>
    <h1 class="cover-title">${accentTitle(doc.title)}</h1>
    ${doc.subtitle ? `<p class="cover-subtitle">${escapeHtml(doc.subtitle)}</p>` : ""}
    <div class="cover-meta"><span><strong>${escapeHtml(doc.author ?? "ATS5E Research")}</strong></span><span>ats5e.com</span></div>
  </div>
</section>

<section class="contents">
  <div class="page-label">Inside this paper</div>
  <h2 class="page-title">Contents</h2>
  <ol class="toc">${toc.map(([name, desc], i) => `<li><span class="num">${pad(i)}</span><span class="name">${escapeHtml(name)}</span><span class="desc">${escapeHtml(desc)}</span></li>`).join("")}</ol>
  <div class="contents-note">Figures in this paper are drawn from regulators, central banks, standard setters and published industry research; each is referenced to the source list at the end. Views and recommendations are those of ATS5E Research.</div>
</section>

<section class="exec">
  <div class="page-label">00 · Executive summary</div>
  <h2 class="page-title">The argument<br>in brief</h2>
  ${(doc.executiveSummary ?? []).map((p) => `<p>${rich(p)}</p>`).join("")}
</section>

${doc.keyFindings?.length ? `<section class="key-findings">
  <div class="page-label">00 · Key findings</div>
  <h2 class="page-title">The numbers<br>that matter</h2>
  <p class="findings-intro">The evidence behind the argument, drawn from regulators, operators and published research. Superscripts refer to the source list.</p>
  <div class="findings">${doc.keyFindings
    .map((f) => `<div class="finding"><div class="value">${escapeHtml(f.value)}</div><div class="label">${rich(f.label)}${cite(f.source)}</div></div>`)
    .join("")}</div>
</section>` : ""}

${chapters
  .map(
    (chapter, i) => `<section class="chapter">
  <div class="chapter-head">
    <div class="chapter-num">${pad(i + 1)}</div>
    <h2 class="chapter-title">${escapeHtml(chapter.title)}</h2>
    ${chapter.intro ? `<p class="chapter-intro">${rich(chapter.intro)}</p>` : ""}
  </div>
  ${(chapter.blocks ?? []).map(renderBlock).join("\n")}
</section>`,
  )
  .join("\n")}

${doc.recommendations ? `<section class="recs">
  <div class="chapter-head">
    <div class="chapter-num">${pad(chapters.length + 1)}</div>
    <h2 class="chapter-title">${escapeHtml(doc.recommendations.title ?? "Recommendations")}</h2>
    ${doc.recommendations.intro ? `<p class="chapter-intro">${rich(doc.recommendations.intro)}</p>` : ""}
  </div>
  ${horizons
    .map(
      (group) => `<div class="horizon">${group.key ? `<div class="horizon-label">${escapeHtml(group.key)}</div>` : ""}${group.items
        .map((item) => `<div class="rec"><div class="n">${pad(++recCounter)}</div><div><div class="t">${rich(item.title)}</div><div class="d">${rich(item.text)}</div></div></div>`)
        .join("")}</div>`,
    )
    .join("")}
</section>` : ""}

<section class="sources">
  <div class="page-label">Methodology & references</div>
  <h2 class="page-title">Sources</h2>
  ${doc.methodology ? `<p class="method">${rich(doc.methodology)}</p>` : ""}
  <ol class="refs">${(doc.sources ?? []).map((s) => `<li><span>${escapeHtml(s.label)}<span class="url">${escapeHtml(s.url ?? "")}</span></span></li>`).join("")}</ol>
</section>

<section class="dark-page back">
  <div class="back-glow"></div>
  <div class="back-inner">
    <img class="cover-logo" src="${logo}" alt="ATS5E">
    <h2 class="back-title">Intelligence.<br><span class="accent">Applied.</span></h2>
    <p class="back-copy">ATS5E partners with banks and financial institutions across the GCC to deliver data, AI, automation and cloud transformation — from strategy to production. Our 5E framework connects every engagement to measurable outcomes.</p>
    <div class="five-e">${FIVE_ES.map(([e, d]) => `<div><div class="e">${e}</div><div class="d">${d}</div></div>`).join("")}</div>
    <p class="disclaimer">This publication is provided by ATS5E for general information only. It does not constitute legal, regulatory, investment or other professional advice and should not be relied upon as such. Regulatory positions summarised here reflect publicly available sources at the date of publication and may have changed. © ${new Date().getFullYear()} ATS5E. All rights reserved.</p>
    <div class="back-contact">
      <div><div class="cta">Talk to our team about this paper.</div><div class="url">ATS5E.COM/CONTACT</div></div>
    </div>
  </div>
</section>

</body></html>`;
}

function findChrome() {
  const chrome = CHROME_CANDIDATES.find((path) => existsSync(path));
  if (!chrome) throw new Error("Google Chrome not found. Set CHROME_PATH to a Chrome/Chromium binary.");
  return chrome;
}

const [, , inputArg, outputArg, ...rest] = process.argv;
if (!inputArg || !outputArg) {
  console.error("Usage: node build.mjs <content.json> <out.pdf> [--html <out.html>]");
  process.exit(1);
}

const doc = JSON.parse(readFileSync(resolve(inputArg), "utf8"));
const html = renderHtml(doc);
const htmlFlag = rest.indexOf("--html");
const htmlPath = htmlFlag >= 0 ? resolve(rest[htmlFlag + 1]) : join(mkdtempSync(join(tmpdir(), "ats5e-wp-")), `${doc.slug ?? "whitepaper"}.html`);
writeFileSync(htmlPath, html);

const outPath = resolve(outputArg);
mkdirSync(dirname(outPath), { recursive: true });
execFileSync(findChrome(), [
  "--headless=new",
  "--disable-gpu",
  "--no-pdf-header-footer",
  "--virtual-time-budget=15000",
  `--print-to-pdf=${outPath}`,
  `file://${htmlPath}`,
], { stdio: "pipe" });

console.log(`PDF: ${outPath}\nHTML: ${htmlPath}`);
