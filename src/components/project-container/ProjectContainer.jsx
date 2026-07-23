import { Button } from "@joker/design-system";
import originalsIcon from "@joker/design-system/assets/joker-originals-icon.svg";
import "./ProjectContainer.css";

export function ProjectContainer({
  brand = "Joker Plus",
  label,
  title,
  body,
  chips = [],
  ctaLabel = "View Project",
}) {
  return (
    <div className="project-container-shell">
      <article className="project-container">
        <header className="project-container__top-rail">
          <div className="project-container__text-wrapper">
            <img
              className="project-container__icon"
              src={originalsIcon}
              alt=""
              aria-hidden="true"
            />
            <span className="project-container__brand">{brand}</span>
          </div>
          <span className="project-container__label">{label}</span>
        </header>

        <div className="project-container__bottom" />
      </article>

      <div className="project-container__content">
        <div className="case-study-text">
          <div className="case-study-text__copy">
            <h3 className="case-study-text__title">{title}</h3>
            <p className="case-study-text__body">{body}</p>
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

        <Button variant="secondary">{ctaLabel}</Button>
      </div>
    </div>
  );
}
