import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
for (const file of ["dist/index.html", "dist/en/index.html"]) {
  const html = await readFile(file, "utf8");
  assert(!html.includes("<!--app-html-->"), "Missing prerender");
  assert.equal((html.match(/<h1\b/g) || []).length, 1, "One h1 per page");
  assert(html.includes("mailto:nerqiaspa@gmail.com?subject="), "Contact link");
  assert(html.includes('name="description"'), "SEO description");
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  assert.equal(new Set(ids).size, ids.length, "No duplicate IDs");
  for (const [, target] of html.matchAll(/href="#([^"]+)"/g))
    assert(ids.includes(target), `Broken anchor ${target}`);
  for (const [, resource] of html.matchAll(
    /(?:src|href)="([^"#]+\.(?:js|css|svg|png))"/g,
  )) {
    if (/^https?:/.test(resource)) continue;
    const relative = resource.includes("/assets/")
      ? `assets/${resource.split("/assets/")[1]}`
      : resource.split("/").pop();
    await access(`dist/${relative}`);
  }
  assert(
    !/https?:\/\/(USUARIO|USERNAME|example\.com)/.test(html),
    "No placeholder public URLs",
  );
}
await access("dist/og-image.png");
console.info(
  "Production HTML, bilingual SEO, assets, contact links and in-page anchors verified.",
);
