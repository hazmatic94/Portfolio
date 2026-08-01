import "../portfolio-image-mockup/PortfolioImageMockup.css";
import "./CaseStudyFullWidthFrame.css";

export function CaseStudyFullWidthFrame({ children, className = "" }) {
  return (
    <div
      className={`case-study-full-width-frame${className ? ` ${className}` : ""}`}
    >
      <div className="portfolio-image-mockup case-study-full-width-frame__panel">
        <div className="portfolio-image-mockup__frame">
          <div className="portfolio-image-mockup__media case-study-full-width-frame__media">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
