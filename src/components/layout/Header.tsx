import { useRef } from "react";
import { Brand, Icon } from "../ui/Icon";
import { localeHref, type Locale } from "../../config/site";
import type { Copy } from "../../content/copy";

export function Header({
  text,
  locale,
  showInnovation,
}: {
  text: Copy;
  locale: Locale;
  showInnovation: boolean;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const nav = text.nav.filter(
    (item) => item.id !== "innovacion" || showInnovation,
  );
  const links = nav.map((item) => (
    <a
      key={item.id}
      href={`#${item.id}`}
      onClick={() => dialog.current?.close()}
    >
      {item.label}
    </a>
  ));
  const languages = (
    <div className="languages" aria-label={text.language}>
      <a
        lang="es"
        hrefLang="es-CL"
        href={localeHref("es")}
        aria-current={locale === "es" ? "page" : undefined}
      >
        ES
      </a>
      <span aria-hidden="true">/</span>
      <a
        lang="en"
        hrefLang="en"
        href={localeHref("en")}
        aria-current={locale === "en" ? "page" : undefined}
      >
        EN
      </a>
    </div>
  );
  return (
    <header className="header">
      <div className="container header-inner">
        <a href="#inicio" aria-label="NERQIA" className="brand-link">
          <Brand />
        </a>
        <nav className="desktop-nav" aria-label={text.navLabel}>
          {links}
        </nav>
        <div className="header-actions">
          {languages}
          <a href="#contacto" className="button button-small">
            {text.talk}
            <Icon name="diagonal" />
          </a>
        </div>
        <button
          type="button"
          className="menu-toggle icon-button"
          aria-label={text.openMenu}
          aria-haspopup="dialog"
          aria-controls="mobile-navigation"
          onClick={() => dialog.current?.showModal()}
        >
          <Icon name="menu" />
        </button>
        <dialog
          ref={dialog}
          id="mobile-navigation"
          className="mobile-dialog"
          aria-label={text.navLabel}
          onClick={(event) => {
            if (event.target === event.currentTarget) dialog.current?.close();
          }}
        >
          <div className="mobile-sheet">
            <div className="mobile-sheet-top">
              <Brand />
              <button
                type="button"
                className="icon-button"
                aria-label={text.closeMenu}
                onClick={() => dialog.current?.close()}
              >
                <Icon name="close" />
              </button>
            </div>
            <nav aria-label={text.navLabel}>
              {links}
              <a href="#contacto" onClick={() => dialog.current?.close()}>
                {text.talk}
                <Icon name="diagonal" />
              </a>
            </nav>
            {languages}
          </div>
        </dialog>
      </div>
    </header>
  );
}
