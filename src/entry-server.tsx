import { renderToString } from "react-dom/server";
import { App } from "./app/App";
import { copy } from "./content/copy";
import { site, localeHref, type Locale } from "./config/site";
const escape = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ]!,
  );
export function renderPage(locale: Locale) {
  const text = copy[locale];
  const absolute = site.publicUrl
    ? `${site.publicUrl}/${locale === "en" ? "en/" : ""}`
    : "";
  const image = site.publicUrl
    ? `${site.publicUrl}/og-image${locale === "en" ? "-en" : ""}.png`
    : "";
  const meta = [
    `<title>${escape(text.seo.title)}</title>`,
    `<meta name="description" content="${escape(text.seo.description)}">`,
    `<meta property="og:title" content="${escape(text.seo.title)}">`,
    `<meta property="og:description" content="${escape(text.seo.description)}">`,
    '<meta property="og:type" content="website">',
    `<meta property="og:site_name" content="${site.name}">`,
    `<meta property="og:locale" content="${locale === "es" ? "es_CL" : "en_US"}">`,
    '<meta name="twitter:card" content="summary_large_image">',
    `<meta name="twitter:title" content="${escape(text.seo.title)}">`,
    `<meta name="twitter:description" content="${escape(text.seo.description)}">`,
  ];
  if (absolute) {
    meta.push(
      `<link rel="canonical" href="${escape(absolute)}">`,
      `<meta property="og:url" content="${escape(absolute)}">`,
      `<meta property="og:image" content="${escape(image)}">`,
      '<meta property="og:image:width" content="1200">',
      '<meta property="og:image:height" content="630">',
      `<meta property="og:image:alt" content="${escape(text.seo.title)}">`,
      `<meta name="twitter:image" content="${escape(image)}">`,
    );
    for (const lang of ["es", "en"] as const)
      meta.push(
        `<link rel="alternate" hreflang="${lang === "es" ? "es-CL" : "en"}" href="${escape(site.publicUrl + localeHref(lang, "/"))}">`,
      );
    meta.push(
      `<link rel="alternate" hreflang="x-default" href="${escape(site.publicUrl + "/")}">`,
    );
  }
  return {
    html: renderToString(<App locale={locale} />),
    head: meta.join("\n    "),
    lang: text.lang,
    publicUrl: site.publicUrl,
    basePath: site.basePath,
  };
}
