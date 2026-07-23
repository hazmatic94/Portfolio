import "./CaseStudySection.css";

export function CaseStudySection() {
  return (
    <section className="case-study-section" aria-label="Case studies">
      <div className="case-study-section__header">
        <div className="case-study-section__label">
          <span className="case-study-section__number">01</span>
          <span className="case-study-section__divider" aria-hidden="true" />
          <span className="case-study-section__title">Foundation</span>
        </div>
        <span className="case-study-section__rule" aria-hidden="true" />
      </div>
    </section>
  );
}
