import "./CaseStudyMediaPlaceholder.css";

export function CaseStudyMediaPlaceholder({ label, variant = "panel" }) {
  return (
    <div
      className={`case-study-media-placeholder case-study-media-placeholder--${variant}`}
      aria-hidden="true"
    >
      {label ? (
        <span className="case-study-media-placeholder__label">{label}</span>
      ) : null}
    </div>
  );
}
