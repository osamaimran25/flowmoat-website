#!/usr/bin/env node
/**
 * Static SEO audit over the built site.
 *
 * Usage: node scripts/seo-audit.mjs dist
 *
 * Exits 1 if any ERROR is found. WARNs are reported but do not fail the build,
 * so the gate stays useful instead of becoming something people learn to skip.
 */
import { readFile, readdir } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import * as cheerio from "cheerio";

const ROOT = process.argv[2] ?? "dist";

// Google truncates past roughly these widths. Pixel width is the real limit,
// character count is the practical proxy.
const TITLE_MAX = 60;
const TITLE_MIN = 15;
const DESC_MAX = 158;
const DESC_MIN = 70;

const errors = [];
const warnings = [];

const err = (page, msg) => errors.push({ page, msg });
const warn = (page, msg) => warnings.push({ page, msg });

/** Recursively collect every .html file under dir. */
async function htmlFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await htmlFiles(full)));
    else if (entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

/** dist/services/index.html -> /services/  ·  dist/404.html -> /404.html */
function toUrlPath(file) {
  const rel = relative(ROOT, file).split(sep).join("/");
  if (rel === "index.html") return "/";
  if (rel.endsWith("/index.html")) return `/${rel.slice(0, -"index.html".length)}`;
  return `/${rel}`;
}

const files = await htmlFiles(ROOT);
if (files.length === 0) {
  console.error(`No HTML found in ${ROOT}/ — did you run the build first?`);
  process.exit(1);
}

const pages = new Map(); // url path -> parsed page facts
const titles = new Map(); // title -> [paths]
const descriptions = new Map(); // description -> [paths]

for (const file of files) {
  const url = toUrlPath(file);
  const $ = cheerio.load(await readFile(file, "utf8"));

  // Astro emits meta-refresh stubs for `redirects`. They are not pages anyone
  // should land on, so they are exempt from every rule below.
  if ($('head meta[http-equiv="refresh"]').length) continue;

  const title = $("head title").text().trim();
  const description = $('head meta[name="description"]').attr("content")?.trim() ?? "";
  const canonical = $('head link[rel="canonical"]').attr("href")?.trim() ?? "";
  const robots = $('head meta[name="robots"]').attr("content") ?? "";
  const noindex = /noindex/i.test(robots);

  // --- title
  if (!title) err(url, "missing <title>");
  else if (title.length > TITLE_MAX) err(url, `title ${title.length} chars (max ${TITLE_MAX})`);
  else if (title.length < TITLE_MIN) warn(url, `title only ${title.length} chars`);

  // --- description
  if (!description) err(url, "missing meta description");
  else if (description.length > DESC_MAX)
    err(url, `description ${description.length} chars (max ${DESC_MAX})`);
  else if (description.length < DESC_MIN)
    warn(url, `description only ${description.length} chars (aim ${DESC_MIN}+)`);

  // --- canonical
  if (!canonical) err(url, "missing canonical");
  else if (!canonical.startsWith("http")) err(url, `canonical not absolute: ${canonical}`);
  else if (!noindex) {
    const path = new URL(canonical).pathname;
    if (path !== url) err(url, `canonical points elsewhere: ${path}`);
  }

  // --- headings
  const h1s = $("main h1");
  if (h1s.length === 0) err(url, "no <h1>");
  else if (h1s.length > 1) err(url, `${h1s.length} <h1> tags (expected 1)`);

  // --- Open Graph / Twitter
  for (const prop of ["og:title", "og:description", "og:image", "og:url", "og:type"]) {
    if (!$(`head meta[property="${prop}"]`).attr("content")) err(url, `missing ${prop}`);
  }
  if (!$('head meta[name="twitter:card"]').attr("content")) err(url, "missing twitter:card");

  const ogTitle = $('head meta[property="og:title"]').attr("content")?.trim();
  if (ogTitle && title && ogTitle !== title) warn(url, "og:title differs from <title>");

  const ogType = $('head meta[property="og:type"]').attr("content");
  if (url.startsWith("/blog/") && url !== "/blog/" && ogType !== "article")
    err(url, `blog post has og:type="${ogType}" (expected "article")`);

  // --- images
  $("img").each((_, el) => {
    const $el = $(el);
    const src = $el.attr("src") ?? "(inline)";
    if ($el.attr("alt") === undefined) err(url, `img missing alt: ${src}`);
    if (!$el.attr("width") || !$el.attr("height"))
      warn(url, `img missing width/height (layout shift): ${src}`);
    if (!$el.attr("loading")) warn(url, `img missing loading attr: ${src}`);
  });

  // --- structured data must parse
  let schemaTypes = [];
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const json = JSON.parse($(el).text());
      const nodes = json["@graph"] ?? [json];
      schemaTypes.push(...nodes.map((n) => n["@type"]).filter(Boolean));
    } catch {
      err(url, "JSON-LD does not parse");
    }
  });
  if (schemaTypes.length === 0) err(url, "no structured data");

  // --- lang
  if (!$("html").attr("lang")) err(url, "<html> missing lang");

  // --- internal links, for the orphan check below
  const links = new Set();
  $("a[href]").each((_, el) => {
    const href = $(el).attr("href");
    if (!href || !href.startsWith("/") || href.startsWith("//")) return;
    links.add(href.split("#")[0].split("?")[0]);
    if (!$(el).text().trim() && !$(el).find("img[alt]").length && !$(el).attr("aria-label"))
      warn(url, `link with no accessible text: ${href}`);
  });

  pages.set(url, { title, description, noindex, links, schemaTypes });

  if (!noindex) {
    if (title) (titles.get(title) ?? titles.set(title, []).get(title)).push(url);
    if (description)
      (descriptions.get(description) ?? descriptions.set(description, []).get(description)).push(url);
  }
}

// --- duplicates across the site
for (const [title, urls] of titles)
  if (urls.length > 1) err(urls.join(", "), `duplicate title: "${title}"`);
for (const [desc, urls] of descriptions)
  if (urls.length > 1) err(urls.join(", "), `duplicate description: "${desc.slice(0, 50)}…"`);

// --- broken internal links + orphans
const linkedTo = new Set();
for (const [from, page] of pages) {
  for (const href of page.links) {
    linkedTo.add(href);
    // Only flag links that look like site pages we should have built.
    if (!pages.has(href) && !href.includes(".")) err(from, `broken internal link: ${href}`);
  }
}
for (const [url, page] of pages) {
  if (url === "/" || page.noindex) continue;
  if (!linkedTo.has(url)) warn(url, "orphan page — nothing links to it");
}

// --- sitemap cross-check
try {
  const xml = await readFile(join(ROOT, "sitemap.xml"), "utf8");
  const locs = new Set([...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => new URL(m[1]).pathname));
  for (const [url, page] of pages) {
    if (page.noindex) {
      if (locs.has(url)) err(url, "noindex page listed in sitemap");
    } else if (!locs.has(url)) {
      err(url, "indexable page missing from sitemap");
    }
  }
  for (const loc of locs) if (!pages.has(loc)) err(loc, "sitemap lists a page that was not built");
} catch {
  err("/sitemap.xml", "sitemap.xml not found");
}

// --- report
const fmt = (list) => list.map(({ page, msg }) => `  ${page.padEnd(46)} ${msg}`).join("\n");

console.log(`\nSEO audit — ${pages.size} pages in ${ROOT}/\n`);
if (warnings.length) console.log(`WARNINGS (${warnings.length})\n${fmt(warnings)}\n`);
if (errors.length) console.log(`ERRORS (${errors.length})\n${fmt(errors)}\n`);

if (errors.length) {
  console.log(`FAIL — ${errors.length} error(s), ${warnings.length} warning(s)\n`);
  process.exit(1);
}
console.log(`PASS — 0 errors, ${warnings.length} warning(s)\n`);
