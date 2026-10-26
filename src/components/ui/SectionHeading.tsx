export function SectionHeading({
  id,
  eyebrow,
  title,
  accent,
  intro,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  accent: string;
  intro?: string;
}) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id}>
        {title} <br />
        <span>{accent}</span>
      </h2>
      {intro && <p className="section-intro">{intro}</p>}
    </div>
  );
}
