import { build } from "vite";
import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import path from "node:path";

const template = await readFile("dist/index.html", "utf8");
try {
  await build({
    build: {
      ssr: "src/entry-server.tsx",
      outDir: ".prerender",
      emptyOutDir: true,
      rollupOptions: { output: { entryFileNames: "entry-server.mjs" } },
    },
  });
  const { renderPage } = await import(
    pathToFileURL(path.resolve(".prerender/entry-server.mjs")).href
  );
  for (const locale of ["es", "en"]) {
    const page = renderPage(locale);
    const html = template
      .replace('lang="es-CL"', `lang="${page.lang}"`)
      .replace("<!--head-meta-->", page.head)
      .replace("<!--app-html-->", page.html);
    const directory = locale === "en" ? "dist/en" : "dist";
    await mkdir(directory, { recursive: true });
    await writeFile(`${directory}/index.html`, html);
  }
  const { publicUrl, basePath } = renderPage("es");
  const escapeXml = (text) =>
    text.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  if (publicUrl) {
    await writeFile(
      "dist/sitemap.xml",
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${["/", "/en/"].map((suffix) => `<url><loc>${escapeXml(publicUrl + suffix)}</loc></url>`).join("")}</urlset>\n`,
    );
    await writeFile(
      "dist/robots.txt",
      `User-agent: *\nAllow: /\nSitemap: ${publicUrl}/sitemap.xml\n`,
    );
  } else {
    await writeFile("dist/robots.txt", "User-agent: *\nAllow: /\n");
    console.info(
      "No VITE_SITE_URL: canonical URLs, sitemap and absolute social image URL omitted. Set the real URL for publication.",
    );
  }
  await writeFile("dist/.nojekyll", "");
  await writeFile(
    "dist/404.html",
    `<!doctype html><html lang="es-CL"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta name="robots" content="noindex"><title>404 | NERQIA</title><body style="background:#0b1c26;color:#edf6f1;font-family:system-ui;padding:10vw"><p>NERQIA</p><h1>Página no encontrada / Page not found</h1><p><a style="color:#93f0d2" href="${escapeXml(basePath)}">Volver al inicio / Back to home →</a></p></body></html>`,
  );
} finally {
  await rm(".prerender", { recursive: true, force: true });
}
