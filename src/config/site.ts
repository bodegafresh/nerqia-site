export type Locale = "es" | "en";
export type ProductId = "match-alpha" | "galactic-explorer";
export type SocialPlatform = "instagram" | "facebook" | "tiktok";

export const site = {
  name: "NERQIA",
  legalName: "NERQIA SpA",
  descriptor: "Software · Intelligence · Automation",
  email: "contacto@nerqiaspa.com",
  publicUrl: import.meta.env.VITE_SITE_URL?.replace(/\/+$/, "") || "",
  basePath: import.meta.env.BASE_URL || "/",
  // Corporate profiles: keep URLs centralized here.
  socials: [
    {
      id: "tiktok",
      label: "TikTok",
      href: "https://www.tiktok.com/@nerqiaspa",
    },
    {
      id: "instagram",
      label: "Instagram",
      href: "https://www.instagram.com/nerqiaspa/",
    },
    {
      id: "facebook",
      label: "Facebook",
      href: "https://www.facebook.com/people/Nerqia/61596034349355/",
    },
  ] as { id: SocialPlatform; label: string; href: string }[],
  products: {
    enabled: true,
    // Individual opt-in: add an approved product ID to publish it.
    visible: [] as ProductId[],
  },
};

export function localeHref(locale: Locale, base = site.basePath) {
  return `${base}${locale === "en" ? "en/" : ""}`;
}
export function getContactHref(subject: string) {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;
}
export function visibleProducts(config = site.products): ProductId[] {
  return config.enabled ? config.visible : [];
}
export function currentLocale(pathname: string): Locale {
  return /\/en\/?$/.test(pathname) ? "en" : "es";
}
