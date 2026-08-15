import { PortfolioImageMockup } from "../portfolio-image-mockup/PortfolioImageMockup.jsx";
import "./PortfolioMockupStage.css";

export function PortfolioMockupStage({
  desktopSrc,
  desktopSrcSet,
  desktopSizes,
  desktopWidth,
  desktopHeight,
  mobileSrc,
  desktopLabel = "Desktop preview",
  mobileLabel = "Mobile preview",
}) {
  return (
    <div
      className="portfolio-mockup-stage"
      style={
        desktopWidth && desktopHeight
          ? { "--mockup-aspect-ratio": `${desktopWidth} / ${desktopHeight}` }
          : undefined
      }
    >
      <PortfolioImageMockup
        className="portfolio-mockup-stage__desktop"
        src={desktopSrc}
        srcSet={desktopSrcSet}
        sizes={desktopSizes}
        width={desktopWidth}
        height={desktopHeight}
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
