import "./SectionDivider.css";

export function SectionDivider({ number, title }) {
  return (
    <div className="section-divider">
      <div className="section-divider__label">
        <span className="section-divider__number">{number}</span>
        <span className="section-divider__pipe" aria-hidden="true">
          |
        </span>
        <span className="section-divider__title">{title}</span>
      </div>
      <span className="section-divider__rule" aria-hidden="true" />
    </div>
  );
}
