import { getContactHref, site } from "../config/site";
import type { Copy } from "../content/copy";
export type ContactFields = {
  name: string;
  email: string;
  need: string;
  message: string;
};
export type ContactErrors = Partial<Record<keyof ContactFields, string>>;
export const emptyContact: ContactFields = {
  name: "",
  email: "",
  need: "",
  message: "",
};
// Conservative interoperability limit, not a standard or a delivery guarantee.
export const maxMailtoLength = 2000;
export function validateContact(
  fields: ContactFields,
  text: Copy["contact"]["form"],
): ContactErrors {
  const errors: ContactErrors = {};
  const name = fields.name.trim(),
    email = fields.email.trim(),
    message = fields.message.trim();
  if (
    !name ||
    name.length > 80 ||
    [...name].some((char) => char.charCodeAt(0) < 32)
  )
    errors.name = text.errors.name;
  if (
    email.length > 254 ||
    !/^[^\s@]+@(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i.test(
      email,
    )
  )
    errors.email = text.errors.email;
  if (!text.options.some((option) => option.value === fields.need))
    errors.need = text.errors.need;
  if (message.length < 10 || message.length > 1000)
    errors.message = text.errors.message;
  return errors;
}
export function buildContactDraft(
  fields: ContactFields,
  text: Copy["contact"],
) {
  const option = text.form.options.find(
    (option) => option.value === fields.need,
  );
  if (Object.keys(validateContact(fields, text.form)).length || !option)
    throw new Error("Invalid contact draft");
  const subject = `${text.subject} · ${option.label}`;
  const lines = [
    `${text.form.name}: ${fields.name.trim()}`,
    `${text.form.email}: ${fields.email.trim()}`,
    `${text.form.need}: ${option.label}`,
    "",
    text.form.message + ":",
    fields.message.trim(),
  ];
  const body = lines.join("\n").replace(/\r\n?|\n/g, "\r\n");
  const href = `${getContactHref(subject)}&body=${encodeURIComponent(body)}`;
  const message = `${text.form.recipient}: ${site.email}\r\n${text.form.subjectLabel}: ${subject}\r\n\r\n${body}`;
  return {
    subject,
    body,
    message,
    href: href.length <= maxMailtoLength ? href : null,
  };
}
