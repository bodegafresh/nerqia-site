import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { App } from "../src/app/App";
import { Footer } from "../src/components/layout/Footer";
import { site } from "../src/config/site";
import { copy } from "../src/content/copy";

describe("corporate social profiles", () => {
  it.each(["es", "en"] as const)(
    "renders the three configured profiles with their own decorative SVG in %s",
    (locale) => {
      render(<Footer text={copy[locale]} showInnovation={false} />);
      const navigation = screen.getByRole("navigation", {
        name: copy[locale].footer.socialNav,
      });
      expect(within(navigation).getAllByRole("link")).toHaveLength(3);
      const paths: string[] = [];
      for (const social of site.socials) {
        const link = within(navigation).getByRole("link", {
          name: copy[locale].footer.socialNames[social.id],
        });
        expect(link).toHaveAttribute("href", social.href);
        expect(link).toHaveAttribute("target", "_blank");
        expect(link.getAttribute("rel")?.split(" ")).toContain("noopener");
        expect(link.getAttribute("rel")?.split(" ")).toContain("noreferrer");
        expect(link).toHaveTextContent(social.label);
        const svg = link.querySelector("svg")!;
        expect(svg.namespaceURI).toBe("http://www.w3.org/2000/svg");
        expect(svg).toHaveAttribute("data-platform", social.id);
        expect(svg).toHaveAttribute("aria-hidden", "true");
        expect(svg).toHaveAttribute("focusable", "false");
        expect(svg).toHaveAttribute("viewBox", "0 0 24 24");
        expect(
          svg.querySelector("script,image,use,foreignObject,text,title,a,[id]"),
        ).toBeNull();
        expect(svg.querySelectorAll("path")).toHaveLength(1);
        paths.push(svg.querySelector("path")!.getAttribute("d")!);
      }
      expect(new Set(paths).size).toBe(3);
      expect(paths.every((path) => path.length > 100)).toBe(true);
      expect(within(navigation).queryByRole("img")).not.toBeInTheDocument();
    },
  );

  it("reads URLs from site.socials and omits the entire social block when empty", () => {
    const configured = site.socials;
    try {
      site.socials = [
        { ...configured[0], href: "https://example.test/corporate-profile" },
      ];
      const { rerender } = render(
        <Footer text={copy.es} showInnovation={false} />,
      );
      const navigation = screen.getByRole("navigation", {
        name: copy.es.footer.socialNav,
      });
      expect(within(navigation).getAllByRole("link")).toHaveLength(1);
      expect(within(navigation).getByRole("link")).toHaveAttribute(
        "href",
        "https://example.test/corporate-profile",
      );
      site.socials = [];
      rerender(<Footer text={copy.es} showInnovation={false} />);
      expect(
        screen.queryByRole("navigation", { name: copy.es.footer.socialNav }),
      ).not.toBeInTheDocument();
      expect(screen.queryByText(copy.es.footer.follow)).not.toBeInTheDocument();
    } finally {
      site.socials = configured;
    }
  });
});

describe("brand story and welcoming contact", () => {
  it.each(["es", "en"] as const)(
    "integrates the narrative and transformations into existing %s sections",
    (locale) => {
      const { container } = render(<App locale={locale} />);
      const text = copy[locale];
      expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
      expect(container.querySelectorAll("main section")).toHaveLength(8);
      const why = container.querySelector('[aria-labelledby="why-title"]')!;
      for (const paragraph of text.why.story)
        expect(within(why as HTMLElement).getByText(paragraph)).toBeVisible();
      expect(screen.getByText(text.contact.orientation)).toBeVisible();
      expect(
        screen.getByRole("link", { name: text.hero.secondary }),
      ).toHaveAttribute("href", "#contacto");
      const examples = container.querySelector("#ejemplos")!;
      const cards = within(examples as HTMLElement).getAllByRole("article");
      expect(cards).toHaveLength(4);
      expect(
        within(examples as HTMLElement).getByText(text.examples.intro),
      ).toBeVisible();
      text.examples.items.forEach((item, index) => {
        const card = within(cards[index]);
        expect(card.getByRole("heading", { name: item.title })).toBeVisible();
        for (const stage of ["before", "solution", "outcome"] as const) {
          expect(
            card.getByText(text.examples.labels[stage], { selector: "dt" }),
          ).toBeVisible();
          expect(card.getByText(item[stage], { selector: "dd" })).toBeVisible();
        }
      });
      for (const product of [
        "Match Alpha",
        "Galactic Explorer",
        "AI Engineering Station",
        "NERQIA Operations",
      ])
        expect(screen.queryByText(product)).not.toBeInTheDocument();
      expect(container.querySelector("#innovacion")).not.toBeInTheDocument();
    },
  );

  it.each(["es", "en"] as const)(
    "prepares an orientation request in %s without transport or storage",
    async (locale) => {
      const user = userEvent.setup();
      const transport = vi.spyOn(globalThis, "fetch");
      const storage = vi.spyOn(Storage.prototype, "setItem");
      render(<App locale={locale} />);
      const form = copy[locale].contact.form;
      for (const [label, value] of [
        [form.name, "Persona QA"],
        [form.email, "qa@example.org"],
        [form.message, "Tengo una idea, pero aún no sé por dónde empezar."],
      ])
        fireEvent.change(screen.getByLabelText(label, { exact: true }), {
          target: { value },
        });
      await user.selectOptions(
        screen.getByLabelText(form.need, { exact: true }),
        "other",
      );
      await user.click(screen.getByRole("button", { name: form.prepare }));
      const preview = screen.getByRole("textbox", {
        name: form.preview,
      }) as HTMLTextAreaElement;
      const orientation = form.options.find(
        (option) => option.value === "other",
      )!;
      expect(preview.value).toContain(orientation.label);
      expect(preview.value).toContain("qa@example.org");
      expect(screen.getByText(form.previewHint)).toBeVisible();
      expect(
        screen.getByRole("link", { name: form.open }).getAttribute("href"),
      ).toMatch(/^mailto:/);
      expect(transport).not.toHaveBeenCalled();
      expect(storage).not.toHaveBeenCalled();
    },
  );
});
