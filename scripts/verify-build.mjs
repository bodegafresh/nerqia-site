import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { JSDOM } from "jsdom";
import { loadEnv } from "vite";

const env = loadEnv("production", process.cwd(), "VITE_");
const publicUrl = env.VITE_SITE_URL?.replace(/\/+$/, "") || "";
const base =
  env.VITE_BASE_PATH ||
  (publicUrl ? `${new URL(publicUrl).pathname.replace(/\/$/, "")}/` : "/");
const titles = [];
for (const [locale, file] of [
  ["es", "dist/index.html"],
  ["en", "dist/en/index.html"],
]) {
  const html = await readFile(file, "utf8");
  const { document } = new JSDOM(html).window;
  assert(!html.includes("<!--app-html-->"), "Missing prerender");
  assert.equal(document.querySelectorAll("h1").length, 1, "One h1 per page");
  assert.equal(document.documentElement.lang, locale === "es" ? "es-CL" : "en");
  assert.equal(
    document.querySelectorAll("title").length,
    1,
    "Unique title element",
  );
  titles.push(document.title);
  for (const selector of [
    'meta[name="description"]',
    'meta[property="og:title"]',
    'meta[property="og:description"]',
    'meta[name="twitter:card"]',
  ]) {
    assert(
      document.querySelector(selector)?.content,
      `Missing metadata ${selector}`,
    );
  }
  const ids = [...document.querySelectorAll("[id]")].map((node) => node.id);
  assert.equal(new Set(ids).size, ids.length, "No duplicate IDs");
  for (const link of document.querySelectorAll('a[href^="#"]'))
    assert(
      document.getElementById(link.hash.slice(1)),
      `Broken anchor ${link.hash}`,
    );
  for (const label of document.querySelectorAll("label[for]"))
    assert(document.getElementById(label.htmlFor), "Label with no control");
  const form = document.querySelector("form");
  assert(form, "Contact form missing");
  assert(
    form.querySelector("fieldset")?.disabled,
    "Prerendered form must not submit personal data before hydration",
  );
  assert(!form.hasAttribute("action"), "No external form endpoint");
  assert(document.querySelector('a[href^="mailto:"]'), "Direct email fallback");
  for (const lang of ["es", "en"])
    assert.equal(
      document.querySelector(`header a[lang="${lang}"]`)?.getAttribute("href"),
      base + (lang === "en" ? "en/" : ""),
    );
  for (const node of document.querySelectorAll(
    'script[src],link[rel="stylesheet"],link[rel="icon"]',
  )) {
    const resource = node.getAttribute("src") || node.getAttribute("href");
    assert(
      resource.startsWith(base),
      `Resource outside configured base: ${resource}`,
    );
    await access(`dist/${resource.slice(base.length)}`);
  }
  if (publicUrl) {
    const canonical = publicUrl + (locale === "en" ? "/en/" : "/");
    assert.equal(
      document.querySelector('link[rel="canonical"]')?.href,
      canonical,
    );
    assert.equal(
      document.querySelector('meta[property="og:url"]')?.content,
      canonical,
    );
    const image = `${publicUrl}/og-image${locale === "en" ? "-en" : ""}.png`;
    assert.equal(
      document.querySelector('meta[property="og:image"]')?.content,
      image,
    );
    assert.equal(
      document.querySelector('meta[name="twitter:image"]')?.content,
      image,
    );
    for (const [language, suffix] of [
      ["es-CL", "/"],
      ["en", "/en/"],
      ["x-default", "/"],
    ])
      assert.equal(
        document.querySelector(`link[hreflang="${language}"]`)?.href,
        publicUrl + suffix,
      );
  } else assert.equal(document.querySelector('link[rel="canonical"]'), null);
}
assert.equal(new Set(titles).size, 2, "Localized titles must be distinct");
for (const image of ["og-image.png", "og-image-en.png"])
  await access(`dist/${image}`);
const robots = await readFile("dist/robots.txt", "utf8");
if (publicUrl) {
  const { document } = new JSDOM(await readFile("dist/sitemap.xml", "utf8"), {
    contentType: "text/xml",
  }).window;
  assert.deepEqual(
    [...document.querySelectorAll("loc")].map((node) => node.textContent),
    [publicUrl + "/", publicUrl + "/en/"],
  );
  assert(robots.includes(`Sitemap: ${publicUrl}/sitemap.xml`));
} else {
  assert(!robots.includes("Sitemap:"));
  await assert.rejects(access("dist/sitemap.xml"));
}
console.info(
  "Production HTML, bilingual metadata, base paths, sitemap, form fallback and internal links verified.",
);
