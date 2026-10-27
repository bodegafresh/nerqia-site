import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { JSDOM } from "jsdom";
import { Resvg } from "@resvg/resvg-js";
import { networkNodes, networkEdges } from "./geometry.mjs";

const root = fileURLToPath(new URL("../../public/", import.meta.url));
async function files(dir) {
  const result = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const name = path.join(dir, entry.name);
    if (entry.isDirectory()) result.push(...(await files(name)));
    else result.push(name);
  }
  return result;
}
const allowed = new Set(["svg", "g", "path", "circle", "rect"]);
for (const file of (await files(root)).filter((name) =>
  name.endsWith(".svg"),
)) {
  const source = await readFile(file, "utf8");
  const { document } = new JSDOM(source, { contentType: "image/svg+xml" })
    .window;
  const svg = document.documentElement;
  assert.equal(svg.localName, "svg", file);
  const [x, y, w, h] = svg.getAttribute("viewBox").split(" ").map(Number);
  assert(x === 0 && y === 0 && w > 0 && h > 0, `Invalid viewBox: ${file}`);
  assert.equal(Number(svg.getAttribute("width")), w);
  assert.equal(Number(svg.getAttribute("height")), h);
  assert.equal(svg.getAttribute("role"), "img");
  assert(svg.getAttribute("aria-label")?.startsWith("NERQIA"));
  if (/[/\\](logos|symbols)[/\\]/.test(file) || file.endsWith("favicon.svg")) {
    const bounds = new Resvg(source, {
      font: { loadSystemFonts: false },
    }).getBBox();
    assert(
      bounds &&
        bounds.x >= 0 &&
        bounds.y >= 0 &&
        bounds.x + bounds.width <= w &&
        bounds.y + bounds.height <= h,
      `Clipped brand geometry: ${file}`,
    );
  }
  if (file.includes(`${path.sep}logos${path.sep}`)) {
    assert.equal(
      svg.querySelectorAll("rect").length,
      0,
      "Logo backgrounds must be transparent",
    );
    assert.equal(
      svg.querySelectorAll("circle").length,
      15,
      "Logotypes share the 15-node network master",
    );
  }
  if (file.includes("nerqia-compact-") || file.endsWith("favicon.svg"))
    assert.equal(
      svg.querySelectorAll("circle").length,
      4,
      "Compact mark must have four nodes",
    );
  for (const element of document.querySelectorAll("*")) {
    assert(
      allowed.has(element.localName),
      `Unsafe or font-dependent element ${element.localName}: ${file}`,
    );
    for (const attribute of element.attributes) {
      assert(!/^on/i.test(attribute.name), `Event handler in ${file}`);
      assert(
        !["id", "href", "xlink:href", "style"].includes(attribute.name),
        `External dependency or collision in ${file}`,
      );
      assert(
        !/url\(|data:|javascript:|https?:/i.test(attribute.value) ||
          attribute.name === "xmlns",
        `Remote or embedded resource in ${file}`,
      );
    }
  }
}
function pngDimensions(buffer) {
  assert.equal(
    buffer.subarray(0, 8).toString("hex"),
    "89504e470d0a1a0a",
    "PNG signature",
  );
  assert.equal(buffer.toString("ascii", 12, 16), "IHDR");
  assert.equal(
    buffer.toString("ascii", buffer.length - 8, buffer.length - 4),
    "IEND",
  );
  return [buffer.readUInt32BE(16), buffer.readUInt32BE(20)];
}
for (const [name, w, h] of [
  ["favicon-16x16.png", 16, 16],
  ["favicon-32x32.png", 32, 32],
  ["favicon-48x48.png", 48, 48],
  ["apple-touch-icon.png", 180, 180],
  ["android-chrome-192x192.png", 192, 192],
  ["android-chrome-512x512.png", 512, 512],
  ["nerqia-icon-1024.png", 1024, 1024],
  ["og-image.png", 1200, 630],
  ["brand/social/social-banner.png", 1500, 500],
  ["brand/documents/email-signature.png", 488, 164],
])
  assert.deepEqual(
    pngDimensions(await readFile(path.join(root, name))),
    [w, h],
    name,
  );
const ico = await readFile(path.join(root, "favicon.ico"));
assert.equal(ico.readUInt16LE(0), 0);
assert.equal(ico.readUInt16LE(2), 1);
assert.equal(ico.readUInt16LE(4), 3);
let end = 54;
for (const [i, size] of [16, 32, 48].entries()) {
  const entry = 6 + i * 16;
  assert.equal(ico[entry], size);
  assert.equal(ico[entry + 1], size);
  assert.equal(ico.readUInt16LE(entry + 4), 1);
  assert.equal(ico.readUInt16LE(entry + 6), 32);
  const length = ico.readUInt32LE(entry + 8),
    offset = ico.readUInt32LE(entry + 12);
  assert.equal(offset, end, "ICO entries must be contiguous");
  end = offset + length;
  assert(end <= ico.length);
  assert.deepEqual(pngDimensions(ico.subarray(offset, end)), [size, size]);
}
assert.equal(end, ico.length);
// Unique edges and coincident endpoints prevent accidental duplicated connections.
assert.equal(
  new Set(networkEdges.map((e) => [...e].sort().join(""))).size,
  networkEdges.length,
);
for (const [a, b] of networkEdges) {
  assert(networkNodes[a] && networkNodes[b] && a !== b);
}
// Connections may meet at a named node, never at an accidental crossing.
const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
const cross = (a, b) => a[0] * b[1] - a[1] * b[0];
for (let i = 0; i < networkEdges.length; i++) {
  for (let j = i + 1; j < networkEdges.length; j++) {
    const [a, b] = networkEdges[i],
      [c, d] = networkEdges[j];
    if (a === c || a === d || b === c || b === d) continue;
    const p = networkNodes[a],
      q = networkNodes[c];
    const r = sub(networkNodes[b], p),
      s = sub(networkNodes[d], q),
      denominator = cross(r, s);
    if (!denominator) continue;
    const t = cross(sub(q, p), s) / denominator,
      u = cross(sub(q, p), r) / denominator;
    assert(
      !(t > 0 && t < 1 && u > 0 && u < 1),
      `Unconnected crossing: ${a + b}/${c + d}`,
    );
  }
}
console.info(
  "SVG integrity, network topology, PNG dimensions and 16/32/48 ICO frames verified.",
);
