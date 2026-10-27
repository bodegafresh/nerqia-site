import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { App } from "../src/app/App";
import { copy } from "../src/content/copy";
import {
  currentLocale,
  getContactHref,
  localeHref,
  site,
  visibleProducts,
} from "../src/config/site";

describe("NERQIA institutional site", () => {
  it.each(["es", "en"] as const)(
    "renders complete, navigable %s content",
    (locale) => {
      const { container } = render(<App locale={locale} />);
      const text = copy[locale];
      expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
      expect(
        screen.getByRole("heading", {
          name: `${text.hero.first} ${text.hero.second} ${text.hero.accent}`,
        }),
      ).toBeVisible();
      for (const service of text.services.items)
        expect(
          screen.getByRole("heading", { name: service.title }),
        ).toBeVisible();
      for (const item of text.process.items)
        expect(screen.getByRole("heading", { name: item.title })).toBeVisible();
      for (const example of text.examples.items)
        expect(
          screen.getByRole("heading", { name: example.title }),
        ).toBeVisible();
      for (const problem of text.problems.items)
        expect(
          screen.getByRole("heading", { name: problem.title }),
        ).toBeVisible();
      expect(screen.queryByText("Match Alpha")).not.toBeInTheDocument();
      expect(screen.queryByText("Galactic Explorer")).not.toBeInTheDocument();
      for (const anchor of container.querySelectorAll<HTMLAnchorElement>(
        'a[href^="#"]',
      )) {
        expect(
          container.querySelector(anchor.getAttribute("href")!),
        ).not.toBeNull();
      }
      expect(
        screen.getByRole("form", { name: text.contact.form.title }),
      ).toBeInTheDocument();
      const contact = container.querySelector<HTMLAnchorElement>(
        "#contacto .contact-email",
      )!;
      expect(contact.href).toBe(getContactHref(text.contactSubject));
    },
  );
  it("uses real localized URLs in the language selector", () => {
    render(<App locale="es" />);
    const header = screen.getByRole("banner");
    expect(within(header).getByRole("link", { name: "EN" })).toHaveAttribute(
      "href",
      "/en/",
    );
    expect(within(header).getByRole("link", { name: "ES" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });
  it("serves full English content and labels when English is selected", () => {
    render(<App locale="en" />);
    expect(
      screen.getByRole("link", { name: "Skip to content" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Open menu" }),
    ).toBeInTheDocument();
    expect(screen.queryByText("Conversemos")).not.toBeInTheDocument();
    expect(
      screen.getByRole("banner").querySelector('a[lang="en"]'),
    ).toHaveAttribute("aria-current", "page");
  });
  it("removes hidden products and associated navigation", () => {
    const { container } = render(<App locale="es" />);
    expect(visibleProducts()).toEqual([]);
    expect(screen.queryByText("Match Alpha")).not.toBeInTheDocument();
    expect(container.querySelector("#innovacion")).not.toBeInTheDocument();
    expect(
      container.querySelector('a[href="#innovacion"]'),
    ).not.toBeInTheDocument();
  });
  it.each(["es", "en"] as const)(
    "can show both retained products in %s when approved",
    (locale) => {
      const { container } = render(
        <App locale={locale} products={["match-alpha", "galactic-explorer"]} />,
      );
      expect(
        screen.getByRole("heading", { name: "Match Alpha" }),
      ).toBeVisible();
      expect(
        screen.getByRole("heading", { name: "Galactic Explorer" }),
      ).toBeVisible();
      expect(container.querySelector('a[href="#innovacion"]')).not.toBeNull();
    },
  );
  it("supports publishing only one configured product", () => {
    render(<App locale="es" products={["match-alpha"]} />);
    expect(screen.getByText("Match Alpha")).toBeInTheDocument();
    expect(screen.queryByText("Galactic Explorer")).not.toBeInTheDocument();
  });
  it("opens and closes the mobile menu through labelled controls", async () => {
    const user = userEvent.setup();
    render(<App locale="es" />);
    await user.click(screen.getByRole("button", { name: "Abrir menú" }));
    const dialog = screen.getByRole("dialog", { name: "Navegación principal" });
    expect(dialog).toHaveAttribute("open");
    await user.click(within(dialog).getByRole("link", { name: "Soluciones" }));
    expect(dialog).not.toHaveAttribute("open");
    await user.click(screen.getByRole("button", { name: "Abrir menú" }));
    await user.click(screen.getByRole("button", { name: "Cerrar menú" }));
    expect(dialog).not.toHaveAttribute("open");
  });
  it("provides privacy information in each language", async () => {
    const user = userEvent.setup();
    render(<App locale="en" />);
    await user.click(screen.getByRole("button", { name: "Privacy" }));
    const dialog = screen.getByRole("dialog", {
      name: "Your privacy, simply put.",
    });
    expect(dialog).toHaveAttribute("open");
    expect(
      within(dialog).getByRole("link", { name: "GitHub Privacy Statement" }),
    ).toHaveAttribute(
      "href",
      expect.stringContaining("github-general-privacy-statement"),
    );
    await user.click(
      screen.getByRole("button", { name: "Close privacy information" }),
    );
    expect(dialog).not.toHaveAttribute("open");
  });
});

describe("deployment and contact configuration", () => {
  it("supports project and root Pages routes in both languages", () => {
    expect(localeHref("es", "/nerqia/")).toBe("/nerqia/");
    expect(localeHref("en", "/nerqia/")).toBe("/nerqia/en/");
    expect(localeHref("en", "/")).toBe("/en/");
    expect(currentLocale("/nerqia/en/")).toBe("en");
    expect(currentLocale("/nerqia/")).toBe("es");
  });
  it("encodes the contact subject without introducing query parameters", () => {
    const url = new URL(
      getContactHref("Proyecto & automatización / información"),
    );
    expect(url.pathname).toBe(site.email);
    expect(url.searchParams.size).toBe(1);
    expect(url.searchParams.get("subject")).toBe(
      "Proyecto & automatización / información",
    );
  });
  it("respects the products section switch and visibility list", () => {
    expect(
      visibleProducts({ enabled: false, visible: ["match-alpha"] }),
    ).toEqual([]);
    expect(
      visibleProducts({ enabled: true, visible: ["galactic-explorer"] }),
    ).toEqual(["galactic-explorer"]);
  });
});
