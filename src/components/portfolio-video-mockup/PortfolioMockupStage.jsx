import { PortfolioImageMockup } from "../portfolio-image-mockup/PortfolioImageMockup.jsx";
import "./PortfolioMockupStage.css";

export function PortfolioMockupStage({
  desktopSrc,
  mobileSrc,
  desktopLabel = "Desktop preview",
  mobileLabel = "Mobile preview",
}) {
  return (
    <div className="portfolio-mockup-stage">
      <PortfolioImageMockup
        className="portfolio-mockup-stage__desktop"
        src={desktopSrc}
        alt={desktopLabel}
      />
      {mobileSrc ? (
        <PortfolioImageMockup
          className="portfolio-mockup-stage__mobile"
          src={mobileSrc}
          alt={mobileLabel}
        />
      ) : null}
    </div>
  );
}
