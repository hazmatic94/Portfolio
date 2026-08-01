import { CoinFlipPanelPreview } from "../coin-flip-panel-preview/CoinFlipPanelPreview.jsx";
import { DesignSystemHomePreview } from "../design-system-home-preview/DesignSystemHomePreview.jsx";
import "../portfolio-image-mockup/PortfolioImageMockup.css";
import "./CaseStudySplitFrames.css";

function CaseStudyFramePanel({ className = "", children, framed = true }) {
  if (!framed) {
    return (
      <div
        className={`case-study-split-frames__panel case-study-split-frames__panel--bare${className ? ` ${className}` : ""}`}
      >
        {children}
      </div>
    );
  }

  return (
    <div className={`portfolio-image-mockup case-study-split-frames__panel${className ? ` ${className}` : ""}`}>
      <div className="portfolio-image-mockup__frame">
        <div className="portfolio-image-mockup__media case-study-split-frames__media">
          {children}
        </div>
      </div>
    </div>
  );
}

export function CaseStudySplitFrames({
  left = <DesignSystemHomePreview />,
  right = <CoinFlipPanelPreview />,
  leftFramed = true,
  rightFramed = true,
  leftPanelClassName = "case-study-split-frames__panel--fill",
  rightPanelClassName = "case-study-split-frames__panel--fixed",
}) {
  return (
    <div className="case-study-split-frames">
      <CaseStudyFramePanel
        className={leftPanelClassName}
        framed={leftFramed}
      >
        {left}
      </CaseStudyFramePanel>
      <CaseStudyFramePanel
        className={rightPanelClassName}
        framed={rightFramed}
      >
        {right}
      </CaseStudyFramePanel>
    </div>
  );
}
