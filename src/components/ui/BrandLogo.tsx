import {
  brandAsset,
  brandAssets,
  type BrandBackground,
  type BrandVariant,
} from "../../config/brand";

export function BrandLogo({
  variant = "horizontal",
  background = "dark",
  width,
  decorative = false,
  className = "",
}: {
  variant?: BrandVariant;
  background?: BrandBackground;
  width?: number;
  decorative?: boolean;
  className?: string;
}) {
  const asset = brandAssets[variant];
  const renderedWidth =
    width ??
    (variant === "horizontal" ? 184 : variant === "vertical" ? 160 : 48);
  return (
    <img
      className={`brand-logo ${className}`.trim()}
      src={brandAsset(variant, background)}
      width={renderedWidth}
      height={(renderedWidth * asset.height) / asset.width}
      alt={decorative ? "" : "NERQIA"}
      aria-hidden={decorative ? true : undefined}
      decoding="async"
      draggable={false}
    />
  );
}
