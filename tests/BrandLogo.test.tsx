import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { execFileSync } from "node:child_process";
import { BrandLogo } from "../src/components/ui/BrandLogo";
import { brandAsset, brandAssets } from "../src/config/brand";
import { App } from "../src/app/App";

describe("approved NERQIA identity", () => {
  it.each(Object.keys(brandAssets) as (keyof typeof brandAssets)[])(
    "selects the %s artwork with its intrinsic aspect ratio",
    (variant) => {
      const { rerender } = render(
        <BrandLogo variant={variant} background="light" width={100} />,
      );
      const image = screen.getByRole("img", { name: "NERQIA" });
      expect(image).toHaveAttribute("src", brandAsset(variant, "light"));
      expect(image).toHaveAttribute("width", "100");
      expect(Number(image.getAttribute("height"))).toBeCloseTo(
        (100 * brandAssets[variant].height) / brandAssets[variant].width,
      );
      rerender(<BrandLogo variant={variant} background="dark" />);
      expect(image).toHaveAttribute("src", brandAsset(variant, "dark"));
    },
  );
  it("supports decorative instances without repeating the accessible name", () => {
    const { container } = render(
      <>
        <BrandLogo decorative />
        <BrandLogo decorative />
      </>,
    );
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(container.querySelectorAll("[id]")).toHaveLength(0);
    for (const image of container.querySelectorAll("img"))
      expect(image).toHaveAttribute("alt", "");
  });
  it.each(["es", "en"] as const)(
    "keeps named home links in header and footer in %s",
    (locale) => {
      render(<App locale={locale} />);
      for (const landmark of [
        screen.getByRole("banner"),
        screen.getByRole("contentinfo"),
      ]) {
        const link = within(landmark).getByRole("link", {
          name: "NERQIA",
        });
        expect(link).toHaveAttribute("href", "#inicio");
        expect(link).toHaveClass("brand-link");
        expect(link.querySelector("img")).toHaveAttribute(
          "src",
          brandAsset("horizontal", "dark"),
        );
        expect(link.querySelector("img")).toHaveAttribute("alt", "");
      }
    },
  );
  it("keeps brand URLs inside root and GitHub Pages base paths", () => {
    expect(brandAsset("compact", "dark", "/nerqia-site/")).toBe(
      "/nerqia-site/brand/symbols/nerqia-compact-dark.svg",
    );
    expect(brandAsset("horizontal", "light", "/")).toBe(
      "/brand/logos/nerqia-logo-horizontal-light.svg",
    );
  });
  it("ships vector-only SVGs, correctly sized PNGs and a real multi-resolution ICO", () => {
    expect(() =>
      execFileSync(process.execPath, ["scripts/brand/verify.mjs"], {
        stdio: "pipe",
      }),
    ).not.toThrow();
  });
  it("can reproduce every committed asset from the master and CSS tokens", () => {
    expect(() =>
      execFileSync(
        process.execPath,
        ["scripts/brand/generate.mjs", "--check"],
        { stdio: "pipe" },
      ),
    ).not.toThrow();
  });
});
