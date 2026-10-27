import { useRef } from "react";
import { Icon } from "../ui/Icon";
import { BrandLogo } from "../ui/BrandLogo";
import { site, getContactHref } from "../../config/site";
import type { Copy } from "../../content/copy";
export function Footer({
  text,
  showInnovation,
}: {
  text: Copy;
  showInnovation: boolean;
}) {
  const privacy = useRef<HTMLDialogElement>(null);
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          <div>
            <a href="#inicio" aria-label="NERQIA" className="brand-link">
              <BrandLogo decorative />
            </a>
            <p className="brand-descriptor">{site.descriptor}</p>
            <p className="footer-note">{text.footer.note}</p>
          </div>
          <nav aria-label={text.footerNav}>
            {text.nav
              .filter((item) => showInnovation || item.id !== "innovacion")
              .map((item) => (
                <a key={item.id} href={`#${item.id}`}>
                  {item.label}
                </a>
              ))}
            <a href={getContactHref(text.contactSubject)}>{site.email}</a>
          </nav>
          <a className="back-top" href="#inicio" aria-label={text.footer.top}>
            <Icon name="arrow" />
          </a>
        </div>
        {site.socials.length > 0 && (
          <div className="socials">
            {site.socials.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noreferrer"
              >
                {social.label}
              </a>
            ))}
          </div>
        )}
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} {site.legalName}. {text.footer.rights}
          </p>
          <button
            type="button"
            className="text-button"
            onClick={() => privacy.current?.showModal()}
          >
            {text.footer.privacy}
          </button>
        </div>
        <dialog
          ref={privacy}
          className="privacy-dialog"
          aria-labelledby="privacy-title"
          onClick={(event) => {
            if (event.target === event.currentTarget) privacy.current?.close();
          }}
        >
          <div className="privacy-content">
            <button
              type="button"
              className="icon-button privacy-close"
              aria-label={text.privacy.close}
              onClick={() => privacy.current?.close()}
            >
              <Icon name="close" />
            </button>
            <h2 id="privacy-title">{text.privacy.title}</h2>
            {text.privacy.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <a
              href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement"
              target="_blank"
              rel="noreferrer"
            >
              {text.privacy.hostLink}
              <Icon name="diagonal" width="16" height="16" />
            </a>
            <a href={getContactHref(text.footer.privacy)}>{site.email}</a>
          </div>
        </dialog>
      </div>
    </footer>
  );
}
