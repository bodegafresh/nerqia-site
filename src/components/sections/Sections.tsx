import { site, getContactHref, type ProductId } from "../../config/site";
import type { Copy } from "../../content/copy";
import { Icon } from "../ui/Icon";
import { Network } from "../ui/Network";
import { SectionHeading } from "../ui/SectionHeading";

export function Hero({ text }: { text: Copy }) {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="container hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="eyebrow-line" />
              {text.hero.eyebrow}
            </p>
            <h1 id="hero-title">
              {text.hero.first} <br />
              {text.hero.second} <br />
              <span>{text.hero.accent}</span>
            </h1>
            <p className="hero-description">{text.hero.description}</p>
            <div className="hero-actions">
              <a href="#soluciones" className="button">
                {text.hero.primary}
                <Icon name="diagonal" />
              </a>
              <a href="#contacto" className="hero-secondary">
                {text.hero.secondary}
                <Icon name="arrow" width="19" />
              </a>
            </div>
            <p className="hero-foot">
              <span />
              {text.hero.foot}
            </p>
          </div>
          <Network labels={text.hero.graphic} foot={text.hero.graphicFoot} />
        </div>
      </section>
      <div className="value-strip">
        <div className="container">
          {text.strip.map((line) => (
            <p key={line}>
              <Icon name="check" width="17" height="17" />
              {line}
            </p>
          ))}
        </div>
      </div>
    </>
  );
}
export function Services({ text }: { text: Copy }) {
  return (
    <section
      id="soluciones"
      className="section services"
      aria-labelledby="services-title"
    >
      <div className="container">
        <div className="section-row">
          <SectionHeading
            id="services-title"
            eyebrow={text.services.eyebrow}
            title={text.services.title}
            accent={text.services.accent}
          />
          <p className="section-aside">{text.services.intro}</p>
        </div>
        <div className="service-grid">
          {text.services.items.map((item, i) => (
            <article className="service" key={item.title}>
              <div className="service-top">
                <Icon name={item.icon} width="34" height="34" />
                <span>{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p className="service-examples">{item.examples}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
export function Audience({ text }: { text: Copy }) {
  return (
    <section className="section audience" aria-labelledby="audience-title">
      <div className="container">
        <SectionHeading id="audience-title" {...text.audience} />
        <div className="audience-grid">
          {text.audience.items.map((item) => (
            <article className="audience-card" key={item.number}>
              <span className="number">/{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <ul>
                {item.examples.map((example) => (
                  <li key={example}>
                    <Icon name="check" width="17" height="17" />
                    {example}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
export function Process({ text }: { text: Copy }) {
  return (
    <section
      id="enfoque"
      className="section process"
      aria-labelledby="process-title"
    >
      <div className="container process-layout">
        <div>
          <SectionHeading id="process-title" {...text.process} />
          <div className="process-motif" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
        <ol className="process-list">
          {text.process.items.map((item, i) => (
            <li key={item.title}>
              <span className="process-number">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
function ProductVisual({ id }: { id: ProductId }) {
  return (
    <div className={`product-visual ${id}`} aria-hidden="true">
      {id === "match-alpha" ? (
        <svg viewBox="0 0 500 230" fill="none">
          <g stroke="currentColor" opacity=".3">
            <path d="M65 40h370v160H65zM250 40v160M65 80h64v80H65m370-80h-64v80h64" />
            <circle cx="250" cy="120" r="40" />
            <circle cx="250" cy="120" r="3" />
          </g>
          <path
            d="m63 170 71-30 54 13 71-62 58 26 61-60 59 10"
            stroke="var(--mint)"
            strokeWidth="2"
          />
          <g fill="var(--mint)">
            <circle cx="134" cy="140" r="4" />
            <circle cx="259" cy="91" r="4" />
            <circle cx="378" cy="57" r="4" />
          </g>
        </svg>
      ) : (
        <svg viewBox="0 0 500 230" fill="none">
          <g stroke="currentColor" opacity=".35">
            <ellipse
              cx="260"
              cy="120"
              rx="180"
              ry="62"
              transform="rotate(-20 260 120)"
            />
            <ellipse
              cx="260"
              cy="120"
              rx="125"
              ry="95"
              transform="rotate(20 260 120)"
            />
            <circle cx="260" cy="120" r="52" />
          </g>
          <circle cx="260" cy="120" r="29" fill="#9caff4" opacity=".6" />
          <circle cx="414" cy="60" r="6" fill="#b2c4ff" />
          <circle cx="152" cy="171" r="4" fill="#b2c4ff" />
          <g fill="#b2c4ff">
            <circle cx="86" cy="58" r="2" />
            <circle cx="361" cy="185" r="2" />
            <circle cx="194" cy="35" r="2" />
          </g>
          <path d="M335 32v12m-6-6h12" stroke="#b2c4ff" />
        </svg>
      )}
    </div>
  );
}
export function Innovation({
  text,
  products,
}: {
  text: Copy;
  products: ProductId[];
}) {
  if (!products.length) return null;
  return (
    <section
      id="innovacion"
      className="section innovation"
      aria-labelledby="innovation-title"
    >
      <div className="container">
        <SectionHeading id="innovation-title" {...text.innovation} />
        <div className="product-grid">
          {products.map((id) => {
            const product = text.innovation.products[id];
            return (
              <article className="product-card" key={id}>
                <ProductVisual id={id} />
                <div className="product-content">
                  <div className="product-meta">
                    <span>{product.category}</span>
                    <span className="status">
                      <span className="status-dot" />
                      {text.innovation.status}
                    </span>
                  </div>
                  <h3>{product.title}</h3>
                  <p>{product.description}</p>
                  <p className="product-note">{product.note}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export function Why({ text }: { text: Copy }) {
  return (
    <section className="section why" aria-labelledby="why-title">
      <div className="container why-layout">
        <SectionHeading id="why-title" {...text.why} />
        <div className="why-grid">
          {text.why.items.map((item) => (
            <article key={item.title}>
              <span className="small-line" />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
export function Contact({ text }: { text: Copy }) {
  return (
    <section
      id="contacto"
      className="contact section"
      aria-labelledby="contact-title"
    >
      <div className="container contact-inner">
        <div className="contact-orbit" aria-hidden="true" />
        <div className="contact-copy">
          <p className="eyebrow">{text.contact.eyebrow}</p>
          <h2 id="contact-title">
            {text.contact.title} <br />
            <span>{text.contact.accent}</span>
          </h2>
          <p>{text.contact.description}</p>
          <a className="button" href={getContactHref(text.contact.subject)}>
            {text.contact.action}
            <Icon name="diagonal" />
          </a>
          <p className="contact-hint">{text.contact.hint}</p>
          <a
            href={getContactHref(text.contactSubject)}
            className="contact-email"
          >
            {site.email}
            <Icon name="arrow" width="18" />
          </a>
        </div>
      </div>
    </section>
  );
}
