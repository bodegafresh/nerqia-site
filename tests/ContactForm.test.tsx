import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "../src/components/sections/ContactForm";
import { copy } from "../src/content/copy";
import { site, type Locale } from "../src/config/site";
import {
  buildContactDraft,
  validateContact,
  type ContactFields,
} from "../src/lib/contact";

const valid: ContactFields = {
  name: "Ana Pérez",
  email: "ana@example.org",
  need: "automation",
  message: "Quiero consolidar las planillas de mi negocio.",
};
function fill(locale: Locale = "es", values = valid) {
  const labels = copy[locale].contact.form;
  fireEvent.change(screen.getByLabelText(labels.name, { exact: true }), {
    target: { value: values.name },
  });
  fireEvent.change(screen.getByLabelText(labels.email, { exact: true }), {
    target: { value: values.email },
  });
  fireEvent.change(screen.getByLabelText(labels.need, { exact: true }), {
    target: { value: values.need },
  });
  fireEvent.change(screen.getByLabelText(labels.message, { exact: true }), {
    target: { value: values.message },
  });
}

describe("local contact draft", () => {
  it.each(["es", "en"] as const)(
    "validates and previews the entire %s message without sending",
    async (locale) => {
      const user = userEvent.setup();
      const text = copy[locale].contact;
      const transport = vi.spyOn(globalThis, "fetch");
      const storage = vi.spyOn(Storage.prototype, "setItem");
      render(<ContactForm text={text} />);
      fill(locale);
      await user.click(screen.getByRole("button", { name: text.form.prepare }));
      const draft = screen.getByRole("textbox", { name: text.form.preview });
      expect((draft as HTMLTextAreaElement).value).toContain(valid.email);
      expect(draft).toHaveAttribute("readonly");
      const link = screen.getByRole("link", { name: text.form.open });
      const url = new URL(link.getAttribute("href")!);
      expect(url.protocol).toBe("mailto:");
      expect(url.pathname).toBe(site.email);
      expect(url.searchParams.get("body")).toContain(valid.message);
      expect(url.searchParams.get("subject")).toContain(text.subject);
      await waitFor(() =>
        expect(
          screen.getByRole("heading", { name: text.form.preview }),
        ).toHaveFocus(),
      );
      expect(transport).not.toHaveBeenCalled();
      expect(storage).not.toHaveBeenCalled();
    },
  );
  it("announces errors, associates them with fields, and focuses the first invalid field", async () => {
    const user = userEvent.setup();
    const text = copy.es.contact;
    render(<ContactForm text={text} />);
    await user.click(screen.getByRole("button", { name: text.form.prepare }));
    expect(screen.getByRole("alert")).toHaveTextContent(
      text.form.errors.summary,
    );
    const name = screen.getByRole("textbox", { name: text.form.name });
    expect(name).toHaveFocus();
    expect(name).toHaveAttribute("aria-invalid", "true");
    expect(name).toHaveAccessibleDescription(text.form.errors.name);
    expect(
      screen.queryByRole("link", { name: text.form.open }),
    ).not.toBeInTheDocument();
  });
  it("rejects malformed email and a whitespace-only description", async () => {
    const user = userEvent.setup();
    const text = copy.es.contact;
    render(<ContactForm text={text} />);
    fill("es", {
      ...valid,
      email: "no-es-un-correo",
      message: "             ",
    });
    await user.click(screen.getByRole("button", { name: text.form.prepare }));
    expect(screen.getByLabelText(text.form.email)).toHaveAccessibleDescription(
      text.form.errors.email,
    );
    expect(
      screen.getByLabelText(text.form.message),
    ).toHaveAccessibleDescription(text.form.errors.message);
  });
  it("invalidates an old draft as soon as a field is changed", async () => {
    const user = userEvent.setup();
    const text = copy.es.contact;
    render(<ContactForm text={text} />);
    fill();
    await user.click(screen.getByRole("button", { name: text.form.prepare }));
    await user.type(screen.getByLabelText(text.form.name), " López");
    expect(
      screen.queryByRole("textbox", { name: text.form.preview }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: text.form.open }),
    ).not.toBeInTheDocument();
  });
  it("clears personal details and the draft without claiming to recall copied data", async () => {
    const user = userEvent.setup();
    const text = copy.es.contact;
    render(<ContactForm text={text} />);
    fill();
    await user.click(screen.getByRole("button", { name: text.form.prepare }));
    await user.click(screen.getByRole("button", { name: text.form.clear }));
    expect(screen.getByLabelText(text.form.name)).toHaveValue("");
    expect(screen.getByLabelText(text.form.email)).toHaveValue("");
    expect(screen.getByLabelText(text.form.message)).toHaveValue("");
    expect(screen.getByRole("status")).toHaveTextContent(text.form.cleared);
    expect(
      screen.queryByRole("textbox", { name: text.form.preview }),
    ).not.toBeInTheDocument();
    expect(screen.getByLabelText(text.form.name)).toHaveFocus();
  });
  it("copies the prepared message only when explicitly requested", async () => {
    const user = userEvent.setup();
    const write = vi
      .spyOn(navigator.clipboard, "writeText")
      .mockResolvedValue();
    const text = copy.es.contact;
    render(<ContactForm text={text} />);
    fill();
    await user.click(screen.getByRole("button", { name: text.form.prepare }));
    expect(write).not.toHaveBeenCalled();
    await user.click(screen.getByRole("button", { name: text.form.copy }));
    expect(write).toHaveBeenCalledWith(expect.stringContaining(valid.message));
    expect(screen.getByRole("status")).toHaveTextContent(text.form.copied);
  });
  it("selects the preview for manual copying if the clipboard is denied", async () => {
    const user = userEvent.setup();
    vi.spyOn(navigator.clipboard, "writeText").mockRejectedValue(
      new Error("NotAllowedError"),
    );
    const text = copy.en.contact;
    render(<ContactForm text={text} />);
    fill("en");
    await user.click(screen.getByRole("button", { name: text.form.prepare }));
    await user.click(screen.getByRole("button", { name: text.form.copy }));
    const draft = screen.getByRole("textbox", {
      name: text.form.preview,
    }) as HTMLTextAreaElement;
    expect(screen.getByRole("status")).toHaveTextContent(text.form.manual);
    expect(draft).toHaveFocus();
    expect(draft.selectionStart).toBe(0);
    expect(draft.selectionEnd).toBe(draft.value.length);
  });
  it("keeps long drafts available for copying without an unreliable mailto link", async () => {
    const user = userEvent.setup();
    const text = copy.es.contact;
    render(<ContactForm text={text} />);
    fill("es", { ...valid, message: "Información áéíóú ".repeat(50) });
    await user.click(screen.getByRole("button", { name: text.form.prepare }));
    expect(screen.getByText(text.form.longDraft)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: text.form.copy }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: text.form.open }),
    ).not.toBeInTheDocument();
  });
  it("does not allow a native GET submission before JavaScript is ready", () => {
    const html = renderToString(<ContactForm text={copy.es.contact} />);
    const host = document.createElement("div");
    host.innerHTML = html;
    const fields = host.querySelector("fieldset")!;
    expect(fields.disabled).toBe(true);
    expect(fields.querySelector('button[type="submit"]')).not.toBeNull();
    expect(
      [...host.querySelectorAll("input,select,textarea")].every((el) =>
        fields.contains(el),
      ),
    ).toBe(true);
    expect(html).not.toContain(valid.email);
  });
});

describe("contact URI format", () => {
  it.each(["ana@example.org?bcc=otro", "ana@-example.org", "ana@example..org"])(
    "rejects invalid email domain syntax: %s",
    (email) => {
      expect(
        validateContact({ ...valid, email }, copy.es.contact.form).email,
      ).toBe(copy.es.contact.form.errors.email);
    },
  );
  it("preserves Unicode, line breaks and reserved characters without adding headers", () => {
    const message =
      "Integración & análisis + datos\n¿Podemos conectar A=B?\nbcc=otro@example.org";
    const draft = buildContactDraft({ ...valid, message }, copy.es.contact);
    expect(draft.href).not.toBeNull();
    const url = new URL(draft.href!);
    expect(url.searchParams.size).toBe(2);
    expect(url.searchParams.has("bcc")).toBe(false);
    expect(url.searchParams.get("body")).toContain(
      message.replace(/\n/g, "\r\n"),
    );
    expect(draft.href).toContain("%0D%0A");
  });
  it("rejects tampered options, invalid lengths and header-like name input", () => {
    for (const values of [
      { ...valid, need: "bcc=attacker" },
      { ...valid, name: "Ana\r\nBcc: a@b.cl" },
      { ...valid, message: " " },
      { ...valid, message: "a".repeat(1001) },
    ]) {
      expect(
        Object.keys(validateContact(values, copy.es.contact.form)).length,
      ).toBeGreaterThan(0);
      expect(() => buildContactDraft(values, copy.es.contact)).toThrow(
        "Invalid contact draft",
      );
    }
  });
});
