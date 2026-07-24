import { Button } from "@joker/design-system";
import "./ProjectContainer.css";

export function ProjectContainer({
  title,
  body,
  highlight = null,
  chips = [],
  ctaLabel = "View Project",
  media = null,
  mediaOverlay = null,
}) {
  return (
    <div className="project-container-shell">
      <article className="project-container">
        <div className="project-container__media">
          <div className="project-container__media-clip">{media}</div>
          {mediaOverlay}
        </div>
      </article>

      <div className="project-container__content">
        <div className="case-study-text__copy">
          <h3 className="case-study-text__title">{title}</h3>
          <p className="case-study-text__body">{body}</p>
          {highlight ? (
            <p className="case-study-text__highlight">{highlight}</p>
          ) : null}
        </div>

        <div className="project-container__cta">
          <Button variant="secondary">{ctaLabel}</Button>
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
