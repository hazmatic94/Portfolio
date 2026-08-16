import { Button } from "@joker/design-system";
import { useNavigate } from "react-router-dom";
import "./CaseStudyIntro.css";

function isExternalHref(href) {
  return /^https?:\/\//i.test(href);
}

export function CaseStudyIntro({
  title,
  body,
  ctaLabel = "View Live Demo",
  ctaHref = null,
  ctaDisabled = false,
  ctaTooltip = null,
}) {
  const navigate = useNavigate();

  const handleCtaClick = () => {
    if (!ctaHref) return;

    if (isExternalHref(ctaHref)) {
      window.open(ctaHref, "_blank", "noopener,noreferrer");
      return;
    }

    navigate(ctaHref);
  };

  return (
    <section className="case-study-intro" aria-label="Case study introduction">
      <div className="case-study-intro__content">
        <h1 className="case-study-intro__title">{title}</h1>
        <p className="case-study-intro__body">{body}</p>
        <div className="case-study-intro__cta">
          <div className="case-study-intro__cta-wrap">
            {ctaTooltip ? (
              <span className="case-study-intro__cta-tooltip" role="tooltip">
                {ctaTooltip}
              </span>
            ) : null}
            <Button
              variant="secondary"
              disabled={ctaDisabled}
              onClick={ctaHref && !ctaDisabled ? handleCtaClick : undefined}
            >
              {ctaLabel}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
