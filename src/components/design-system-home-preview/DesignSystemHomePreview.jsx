import { useEffect, useState } from "react";
import { Button } from "@joker/design-system";
import { useNavigate } from "react-router-dom";
import { useHomeHeroGrid } from "./useHomeHeroGrid.js";
import "./DesignSystemHomePreview.css";

const heroVideoSrc = "/videos/joker-gold-logo.mp4";

const TICKER_ITEMS = [
  "Build Stable",
  "v1.0",
  "Updated Jul 2026",
  "React",
  "TypeScript",
  "Responsive",
  "Production Ready",
];

function TickerSegment({ label }) {
  return (
    <>
      <span className="ds-home-preview__ticker-item">{label}</span>
      <span className="ds-home-preview__ticker-separator" aria-hidden="true">
        |
      </span>
    </>
  );
}

function HomeTicker() {
  const segments = TICKER_ITEMS.map((label) => (
    <TickerSegment key={label} label={label} />
  ));
  const repeatedSegments = (
    <>
      {segments}
      {segments}
      {segments}
      {segments}
    </>
  );

  return (
    <div className="ds-home-preview__ticker" aria-label="Release information">
      <div className="ds-home-preview__ticker-track">
        <div className="ds-home-preview__ticker-group">{repeatedSegments}</div>
        <div className="ds-home-preview__ticker-group" aria-hidden="true">
          {repeatedSegments}
        </div>
      </div>
    </div>
  );
}

export function DesignSystemHomePreview({
  ctaHref = "/case-studies/application-shell",
}) {
  const [heroEl, setHeroEl] = useState(null);
  const navigate = useNavigate();

  useHomeHeroGrid(heroEl, heroVideoSrc);

  return (
    <div className="ds-home-preview">
      <HomeTicker />

      <section
        ref={setHeroEl}
        className="ds-home-preview__hero"
        aria-label="Joker Design System hero"
      >
        <div
          className="ds-home-preview__hero-video-wrap"
          data-home-hero-video-wrap
        >
          <video
            className="ds-home-preview__hero-video"
            data-home-hero-grid-video
            src={heroVideoSrc}
            autoPlay
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
          />
        </div>
        <canvas
          className="ds-home-preview__hero-canvas"
          data-home-hero-grid-canvas
          aria-hidden="true"
        />
      </section>

      <div className="ds-home-preview__body">
        <section className="ds-home-preview__intro" aria-labelledby="ds-home-preview-title">
          <div className="ds-home-preview__intro-copy">
            <div className="ds-home-preview__intro-text">
              <h1 id="ds-home-preview-title" className="ds-home-preview__title">
                Build Once. Reuse Everywhere.
              </h1>
              <p className="ds-home-preview__lede">
                A design system built to create consistent products through reusable
                foundations, components, and game patterns.
              </p>
            </div>
            <div className="ds-home-preview__cta">
              <Button
                variant="secondary"
                onClick={ctaHref ? () => navigate(ctaHref) : undefined}
              >
                Get started
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
