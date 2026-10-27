import type { Copy } from "../../content/copy";
import { Icon } from "../ui/Icon";
import { SectionHeading } from "../ui/SectionHeading";

export function Problems({ text }: { text: Copy }) {
  return (
    <section className="problems section" aria-labelledby="problems-title">
      <div className="container">
        <div className="problems-heading">
          <p className="eyebrow">{text.problems.eyebrow}</p>
          <h2 id="problems-title">{text.problems.title}</h2>
        </div>
        <div className="problem-grid">
          {text.problems.items.map((item) => (
            <article className="problem" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.question}</p>
              <a href={`#${item.target}`}>
                {item.capability}
                <Icon name="arrow" width="16" height="16" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Examples({ text }: { text: Copy }) {
  return (
    <section
      id="ejemplos"
      className="examples section"
      aria-labelledby="examples-title"
    >
      <div className="container">
        <div className="section-row">
          <SectionHeading
            id="examples-title"
            eyebrow={text.examples.eyebrow}
            title={text.examples.title}
            accent={text.examples.accent}
          />
          <p className="section-aside">{text.examples.intro}</p>
        </div>
        <div className="example-grid">
          {text.examples.items.map((item) => (
            <article className="example" key={item.title}>
              <Icon name={item.icon} width="28" height="28" />
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
        <a className="examples-cta" href="#contacto">
          {text.examples.cta}
          <Icon name="arrow" width="18" height="18" />
        </a>
      </div>
    </section>
  );
}
