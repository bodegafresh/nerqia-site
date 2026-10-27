import { useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import type { Copy } from "../../content/copy";
import {
  buildContactDraft,
  emptyContact,
  validateContact,
  type ContactErrors,
  type ContactFields,
} from "../../lib/contact";
import { Icon } from "../ui/Icon";

const subscribe = () => () => {};

export function ContactForm({ text }: { text: Copy["contact"] }) {
  const labels = text.form;
  // Keep the prerendered form inert until its submit handler is attached.
  const interactive = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const [fields, setFields] = useState<ContactFields>(emptyContact);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [draft, setDraft] = useState<ReturnType<
    typeof buildContactDraft
  > | null>(null);
  const [status, setStatus] = useState("");
  const form = useRef<HTMLFormElement>(null);
  const preview = useRef<HTMLTextAreaElement>(null);
  const previewTitle = useRef<HTMLHeadingElement>(null);

  function update(key: keyof ContactFields, value: string) {
    setFields((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) => ({ ...previous, [key]: undefined }));
    setDraft(null);
    setStatus("");
  }
  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateContact(fields, labels);
    setErrors(nextErrors);
    setStatus("");
    if (Object.keys(nextErrors).length) {
      const first = Object.keys(nextErrors)[0];
      form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setDraft(buildContactDraft(fields, text));
    // Wait until React commits the preview; focus the heading without scrolling away from the context.
    requestAnimationFrame(() => previewTitle.current?.focus());
  }
  async function copy() {
    if (!draft) return;
    try {
      if (!navigator.clipboard?.writeText)
        throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(draft.message);
      setStatus(labels.copied);
    } catch {
      setStatus(labels.manual);
      preview.current?.focus();
      preview.current?.select();
    }
  }
  function clear() {
    setFields(emptyContact);
    setErrors({});
    setDraft(null);
    setStatus(labels.cleared);
    form.current?.querySelector<HTMLInputElement>('[name="name"]')?.focus();
  }
  function accessibility(key: keyof ContactFields) {
    return {
      "aria-invalid": errors[key] ? true : undefined,
      "aria-describedby": errors[key] ? `${key}-error` : undefined,
    };
  }
  return (
    <div className="contact-panel">
      <form
        ref={form}
        className="contact-form"
        noValidate
        onSubmit={prepare}
        aria-labelledby="form-title"
        aria-describedby="form-intro form-privacy"
      >
        <h3 id="form-title">{labels.title}</h3>
        <p id="form-intro">{labels.intro}</p>
        <p className="form-required">{labels.required}</p>
        {Object.values(errors).some(Boolean) && (
          <p className="form-errors" role="alert">
            {labels.errors.summary}
          </p>
        )}
        <fieldset disabled={!interactive}>
          <legend className="sr-only">{labels.required}</legend>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="contact-name">{labels.name}</label>
              <input
                id="contact-name"
                name="name"
                autoComplete="name"
                value={fields.name}
                maxLength={80}
                required
                onChange={(event) => update("name", event.target.value)}
                {...accessibility("name")}
              />
              {errors.name && (
                <p id="name-error" className="field-error">
                  {errors.name}
                </p>
              )}
            </div>
            <div className="form-field">
              <label htmlFor="contact-email">{labels.email}</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                value={fields.email}
                maxLength={254}
                required
                onChange={(event) => update("email", event.target.value)}
                {...accessibility("email")}
              />
              {errors.email && (
                <p id="email-error" className="field-error">
                  {errors.email}
                </p>
              )}
            </div>
          </div>
          <div className="form-field">
            <label htmlFor="contact-need">{labels.need}</label>
            <select
              id="contact-need"
              name="need"
              value={fields.need}
              required
              onChange={(event) => update("need", event.target.value)}
              {...accessibility("need")}
            >
              <option value="">{labels.select}</option>
              {labels.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.need && (
              <p id="need-error" className="field-error">
                {errors.need}
              </p>
            )}
          </div>
          <div className="form-field">
            <label htmlFor="contact-message">{labels.message}</label>
            <textarea
              id="contact-message"
              name="message"
              value={fields.message}
              minLength={10}
              maxLength={1000}
              rows={4}
              placeholder={labels.placeholder}
              required
              onChange={(event) => update("message", event.target.value)}
              {...accessibility("message")}
            />
            {errors.message && (
              <p id="message-error" className="field-error">
                {errors.message}
              </p>
            )}
          </div>
          <p className="form-privacy" id="form-privacy">
            {labels.privacy}
          </p>
          <div className="form-actions">
            <button type="submit" className="button">
              {labels.prepare}
              <Icon name="arrow" />
            </button>
            <button type="button" className="text-button" onClick={clear}>
              {labels.clear}
            </button>
          </div>
        </fieldset>
      </form>
      {draft && (
        <div className="contact-preview">
          <h3 ref={previewTitle} tabIndex={-1} id="draft-title">
            {labels.preview}
          </h3>
          <p>{labels.previewHint}</p>
          <label className="sr-only" htmlFor="contact-draft">
            {labels.preview}
          </label>
          <textarea
            ref={preview}
            id="contact-draft"
            readOnly
            value={draft.message.replace(/\r\n/g, "\n")}
            rows={9}
            spellCheck={false}
          />
          {!draft.href && <p className="draft-warning">{labels.longDraft}</p>}
          <div className="draft-actions">
            {draft.href && (
              <a className="button" href={draft.href}>
                {labels.open}
                <Icon name="diagonal" />
              </a>
            )}
            <button
              type="button"
              className="button button-outline"
              onClick={copy}
            >
              {labels.copy}
            </button>
          </div>
        </div>
      )}
      <p className="form-status" role="status">
        {status}
      </p>
    </div>
  );
}
