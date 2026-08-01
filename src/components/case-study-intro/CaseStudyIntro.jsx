import { Button } from "@joker/design-system";
import { useNavigate } from "react-router-dom";
import "./CaseStudyIntro.css";

export function CaseStudyIntro({
  title,
  body,
  ctaLabel = "View Live Demo",
  ctaHref = null,
}) {
  const navigate = useNavigate();

  return (
    <section className="case-study-intro" aria-label="Case study introduction">
      <div className="case-study-intro__content">
        <h1 className="case-study-intro__title">{title}</h1>
        <p className="case-study-intro__body">{body}</p>
        <div className="case-study-intro__cta">
          <Button
            variant="secondary"
            onClick={ctaHref ? () => navigate(ctaHref) : undefined}
          >
            {ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
