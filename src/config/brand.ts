import { site } from "./site";

export const brandAssets = {
  horizontal: {
    width: 488,
    height: 164,
    light: "brand/logos/nerqia-logo-horizontal-light.svg",
    dark: "brand/logos/nerqia-logo-horizontal-dark.svg",
  },
  vertical: {
    width: 240,
    height: 224,
    light: "brand/logos/nerqia-logo-vertical-light.svg",
    dark: "brand/logos/nerqia-logo-vertical-dark.svg",
  },
  network: {
    width: 144,
    height: 144,
    light: "brand/symbols/nerqia-network-corporate.svg",
    dark: "brand/symbols/nerqia-network-dark.svg",
  },
  compact: {
    width: 80,
    height: 80,
    light: "brand/symbols/nerqia-compact-light.svg",
    dark: "brand/symbols/nerqia-compact-dark.svg",
  },
} as const;

export type BrandVariant = keyof typeof brandAssets;
export type BrandBackground = "light" | "dark";
export function brandAsset(
  variant: BrandVariant,
  background: BrandBackground,
  base = site.basePath,
) {
  return `${base}${brandAssets[variant][background]}`;
}
