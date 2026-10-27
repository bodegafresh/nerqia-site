import { readFile, writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { Resvg } from "@resvg/resvg-js";
import { compact, horizontal, network, svg, vertical } from "./geometry.mjs";
import { readColorTokens } from "./tokens.mjs";

const root = fileURLToPath(new URL("../../", import.meta.url));
const color = await readColorTokens();
const petrol = color("petrol"),
  mint = color("mint"),
  white = color("brand-white");
const navy = color("navy"),
  black = color("black");
const outputs = new Map();
const add = (name, contents) => outputs.set(name, contents);
const png = (source, size) =>
  new Resvg(source, {
    font: { loadSystemFonts: false },
    ...(size ? { fitTo: { mode: "width", value: size } } : {}),
  })
    .render()
    .asPng();

for (const [tone, ink, accent] of [
  ["light", petrol, mint],
  ["dark", white, mint],
  ["black", black, black],
  ["white", white, white],
]) {
  add(
    `brand/logos/nerqia-logo-horizontal-${tone}.svg`,
    svg(488, 164, horizontal(ink, accent)),
  );
  if (tone === "light" || tone === "dark") {
    add(
      `brand/logos/nerqia-logo-vertical-${tone}.svg`,
      svg(240, 224, vertical(ink, accent)),
    );
    add(
      `brand/symbols/nerqia-compact-${tone}.svg`,
      svg(
        80,
        80,
        compact(tone === "dark" ? mint : petrol),
        "NERQIA — compact N",
      ),
    );
  }
  add(
    `brand/symbols/nerqia-network-${tone === "light" ? "corporate" : tone}.svg`,
    svg(144, 144, network(ink, accent), "NERQIA — network N"),
  );
}

const tile = svg(
  80,
  80,
  `<rect width="80" height="80" rx="17" fill="${mint}"/>${compact(petrol)}`,
);
add("favicon.svg", tile);
for (const size of [16, 32, 48])
  add(`favicon-${size}x${size}.png`, png(tile, size));
// ICO contains three independently rendered PNG entries, not one scaled bitmap.
const sizes = [16, 32, 48];
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
const frames = sizes.map((size, i) => {
  const data = outputs.get(`favicon-${size}x${size}.png`);
  const entry = 6 + i * 16;
  header[entry] = size;
  header[entry + 1] = size;
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(data.length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += data.length;
  return data;
});
add("favicon.ico", Buffer.concat([header, ...frames]));
// Full square backgrounds avoid a second set of rounded corners on Apple/Android.
const app = svg(
  80,
  80,
  `<rect width="80" height="80" fill="${mint}"/>${compact(petrol)}`,
);
for (const [name, size] of [
  ["apple-touch-icon.png", 180],
  ["android-chrome-192x192.png", 192],
  ["android-chrome-512x512.png", 512],
  ["nerqia-icon-1024.png", 1024],
])
  add(name, png(app, size));

function social(width, height) {
  return svg(
    width,
    height,
    `<rect width="${width}" height="${height}" fill="${navy}"/><path d="M64 64h72M64 64v56M${width - 64} ${height - 64}h-72M${width - 64} ${height - 64}v-56" fill="none" stroke="${mint}" stroke-width="2"/><g opacity=".11" transform="translate(${width - 300} ${height - 370}) scale(2.6)">${network(mint)}</g><g transform="translate(${(width - 488 * 1.8) / 2} ${(height - 164 * 1.8) / 2}) scale(1.8)">${horizontal(white, mint)}</g>`,
    "NERQIA — Software · Intelligence · Automation",
  );
}
add("brand/social/og-image.svg", social(1200, 630));
add("og-image.png", png(outputs.get("brand/social/og-image.svg")));
add("brand/social/social-banner.svg", social(1500, 500));
add(
  "brand/social/social-banner.png",
  png(outputs.get("brand/social/social-banner.svg")),
);

// Reusable vector bases: intentionally no fictitious personal or contact details.
add(
  "brand/documents/letterhead.svg",
  svg(
    794,
    1123,
    `<rect width="794" height="1123" fill="${white}"/><g transform="translate(48 40) scale(.42)">${horizontal(petrol, mint)}</g><path d="M48 156H746M48 1067H746" stroke="${petrol}" stroke-width="1"/><path d="M48 1067h112" stroke="${mint}" stroke-width="4"/>`,
    "NERQIA — letterhead base",
  ),
);
add(
  "brand/documents/proposal-cover.svg",
  svg(
    794,
    1123,
    `<rect width="794" height="1123" fill="${navy}"/><g transform="translate(64 64) scale(.55)">${horizontal(white, mint)}</g><g opacity=".15" transform="translate(260 590) scale(4)">${network(mint)}</g><path d="M64 400h96" stroke="${mint}" stroke-width="4"/>`,
    "NERQIA — proposal cover base",
  ),
);
add(
  "brand/documents/presentation-background.svg",
  svg(
    1920,
    1080,
    `<rect width="1920" height="1080" fill="${navy}"/><g transform="translate(80 65) scale(.65)">${horizontal(white, mint)}</g><g opacity=".1" transform="translate(1420 630) scale(3)">${network(mint)}</g><path d="M80 1000h160" stroke="${mint}" stroke-width="3"/>`,
    "NERQIA — presentation background",
  ),
);
add(
  "brand/documents/email-signature.svg",
  svg(488, 164, horizontal(petrol, mint), "NERQIA — email signature logo"),
);
add(
  "brand/documents/email-signature.png",
  png(outputs.get("brand/documents/email-signature.svg"), 488),
);
add(
  "brand/documents/network-pattern.svg",
  svg(
    600,
    400,
    `<g opacity=".14" transform="translate(340 110) scale(2)">${network(petrol, mint)}</g>`,
    "NERQIA — decorative network",
  ),
);

const check = process.argv.includes("--check");
for (const [name, data] of outputs) {
  const file = path.join(root, "public", name);
  if (check) {
    const actual = await readFile(file);
    if (!actual.equals(Buffer.from(data)))
      throw new Error(
        `Stale brand asset: ${name}. Run npm run brand:generate.`,
      );
  } else {
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, data);
  }
}
console.info(
  `${outputs.size} brand assets ${check ? "verified against master geometry and CSS tokens" : "generated"}.`,
);
