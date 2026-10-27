// Hand-reconstructed from the approved NERQIA board: Horizontal B / Vertical C.
// These coordinates are the only source of symbol and wordmark geometry.
export const networkNodes = {
  a: [12, 12],
  b: [44, 12],
  c: [100, 12],
  d: [132, 12],
  e: [12, 38],
  f: [70, 44],
  g: [44, 66],
  h: [132, 62],
  i: [100, 80],
  j: [12, 104],
  k: [70, 100],
  l: [132, 112],
  m: [12, 132],
  n: [44, 132],
  o: [100, 132],
};
export const networkEdges = [
  "ab",
  "ae",
  "ej",
  "jm",
  "mn",
  "bg",
  "gn",
  "cd",
  "ci",
  "dh",
  "hl",
  "io",
  "ol",
  "eb",
  "bf",
  "fg",
  "gj",
  "gi",
  "fi",
  "di",
  "hi",
  "il",
  "jn",
  "gk",
  "ki",
  "ko",
];

export function network(ink, accent = ink) {
  return `<g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="3.2">${networkEdges.map(([a, b]) => `<path stroke="${a + b === "gk" ? accent : ink}" d="M${networkNodes[a].join(" ")} ${networkNodes[b].join(" ")}"/>`).join("")}</g><g>${Object.entries(
    networkNodes,
  )
    .map(
      ([id, [x, y]]) =>
        `<circle cx="${x}" cy="${y}" r="${["f", "h", "k"].includes(id) ? 5.8 : 6.5}" fill="${["f", "h", "k"].includes(id) ? accent : ink}"/>`,
    )
    .join("")}</g>`;
}

// Four principal nodes, two uprights and two parallel, open N diagonals.
// No reduced version of the complex network is used for favicons.
export function compact(ink) {
  return `<g stroke="${ink}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M18 62V18L53 45M28 37 62 62V18"/></g><g fill="${ink}">${[
    [18, 18],
    [62, 18],
    [18, 62],
    [62, 62],
  ]
    .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6.5"/>`)
    .join("")}</g>`;
}

// Original geometric lettering, drawn as outlines; no font files or font lookup.
// Cap height 60; the Q tail extends to 66. Optical spacing is explicit.
export function wordmark(ink) {
  const glyphs = [
    [0, "M0 60V0h12l27 38V0h12v60H39L12 22v38Z"],
    [62, "M0 0h43v11H12v13h28v11H12v14h32v11H0Z"],
    [
      116,
      "M0 60V0h27c15 0 24 8 24 21 0 9-4 15-12 18l14 21H39L27 42H12v18ZM12 11v20h14c8 0 12-3 12-10s-4-10-12-10Z",
    ],
    [
      179,
      "M31-1C12-1 0 12 0 30s12 31 31 31c7 0 13-2 18-5l10 10 8-8-10-9c3-5 5-12 5-19C62 12 50-1 31-1ZM31 11c12 0 19 8 19 19 0 4-1 7-2 10l-7-7-8 8 7 7c-3 1-6 2-9 2-12 0-19-9-19-20s7-19 19-19Z",
    ],
    [254, "M0 0h12v60H0Z"],
    [275, "M0 60 25 0h13l25 60H50l-5-13H18l-5 13ZM22 36h19l-9-24Z"],
  ];
  return `<g fill="${ink}" fill-rule="evenodd" aria-label="NERQIA">${glyphs.map(([x, d]) => `<path transform="translate(${x} 0)" d="${d}"/>`).join("")}</g>`;
}

export function svg(width, height, content, label = "NERQIA") {
  // No IDs: safe to inline or repeat, including the accessible label.
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${label}">${content}</svg>\n`;
}

export function horizontal(ink, accent) {
  return `<g transform="translate(6 10)">${network(ink, accent)}</g><g transform="translate(174 52) scale(.9)">${wordmark(ink)}</g>`;
}

export function vertical(ink, accent) {
  return `<g transform="translate(48 6)">${network(ink, accent)}</g><g transform="translate(18 168) scale(.6)">${wordmark(ink)}</g>`;
}
