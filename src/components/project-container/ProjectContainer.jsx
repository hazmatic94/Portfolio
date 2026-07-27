import { Button } from "@joker/design-system";
import { Link, useNavigate } from "react-router-dom";
import "./ProjectContainer.css";

export function ProjectContainer({
  title,
  body,
  chips = [],
  ctaLabel = "View Project",
  href = null,
  media = null,
  mediaOverlay = null,
}) {
  const navigate = useNavigate();
  const MediaTag = href ? Link : "div";
  const mediaProps = href
    ? {
        to: href,
        "aria-label": `View ${title} case study`,
      }
    : {};

  return (
    <div className="project-container-shell">
      <article className="project-container">
        <MediaTag
          className={`project-container__media${href ? " project-container__media--linked" : ""}`}
          {...mediaProps}
        >
          <div className="project-container__media-clip">{media}</div>
          {mediaOverlay}
        </MediaTag>
      </article>

      <div className="project-container__content">
        <div className="case-study-text__copy">
          <h3 className="case-study-text__title">{title}</h3>
          <p className="case-study-text__body">{body}</p>
        </div>

        <div className="project-container__cta">
          <Button
            variant="secondary"
            onClick={href ? () => navigate(href) : undefined}
          >
            {ctaLabel}
          </Button>
        </div>

        {chips.length > 0 ? (
          <div className="case-study-text__chips">
            {chips.map((chip) => (
              <span key={chip} className="case-study-text__chip">
                {chip}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
