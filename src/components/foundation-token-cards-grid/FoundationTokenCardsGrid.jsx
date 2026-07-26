import { useInViewOnce } from "../../hooks/useInViewOnce.js";
import { TokenCopyChip } from "../token-copy-chip/TokenCopyChip.jsx";
import "../portfolio-image-mockup/PortfolioImageMockup.css";
import "./FoundationTokenCardsGrid.css";

function FoundationTokenCardFrame({ children }) {
  return (
    <div className="portfolio-image-mockup foundation-token-cards__tile">
      <div className="portfolio-image-mockup__frame">
        <div className="portfolio-image-mockup__media foundation-token-cards__tile-media">
          {children}
        </div>
      </div>
    </div>
  );
}

function ColorTokenCard() {
  const [ref, inView] = useInViewOnce({ threshold: 0.45 });

  return (
    <FoundationTokenCardFrame>
      <article
        ref={ref}
        className={`color-swatch-card foundation-token-cards__color-swatch-card foundation-token-cards__card${inView ? " is-in-view" : ""}`}
        style={{ "--foundation-token-cycle": `${FOUNDATION_TOKEN_CYCLE_MS}ms` }}
      >
        <div className="color-swatch-card__swatch foundation-token-cards__color-swatch">
          <span className="foundation-token-cards__color-shimmer" aria-hidden="true" />
          <span className="base-tag">base</span>
        </div>
        <div className="color-swatch-card__meta">
          <strong className="foundation-token-cards__label">#FFDEA8</strong>
          <TokenCopyChip copyValue="#FFDEA8">--joker-gold-400</TokenCopyChip>
        </div>
      </article>
    </FoundationTokenCardFrame>
  );
}

function MotionTokenCard() {
  return (
    <FoundationTokenCardFrame>
      <article className="color-swatch-card motion-swatch-card foundation-token-cards__card">
        <div className="color-swatch-card__swatch motion-swatch-card__swatch">
          <div className="motion-swatch-card__preview">
            <span
              className="motion-duration-preview"
              style={{ "--motion-preview-duration": "240ms" }}
              aria-hidden="true"
            />
          </div>
        </div>
        <div className="color-swatch-card__meta">
          <strong className="motion-swatch-card__title">Medium</strong>
          <TokenCopyChip copyValue="--motion-medium">--motion-medium</TokenCopyChip>
        </div>
      </article>
    </FoundationTokenCardFrame>
  );
}

const FOUNDATION_TOKEN_CYCLE_MS = 5000;
const SPACING_UNIT_COUNT = 24;
const SPACING_UNIT_STAGGER_MS = 72;

function SpacingTokenCard() {
  const [ref, inView] = useInViewOnce({ threshold: 0.45 });

  return (
    <FoundationTokenCardFrame>
      <article
        ref={ref}
        className={`color-swatch-card spacing-swatch-card foundation-token-cards__card${inView ? " is-in-view" : ""}`}
        style={{
          "--spacing-size": "24px",
          "--spacing-unit-stagger": `${SPACING_UNIT_STAGGER_MS}ms`,
          "--foundation-token-cycle": `${FOUNDATION_TOKEN_CYCLE_MS}ms`,
        }}
      >
        <div className="color-swatch-card__swatch spacing-swatch-card__swatch">
          <span className="spacing-swatch-card__units" aria-hidden="true">
            {Array.from({ length: SPACING_UNIT_COUNT }, (_, index) => (
              <span
                key={index}
                className="spacing-swatch-card__unit"
                style={{ "--unit-index": index }}
              />
            ))}
          </span>
        </div>
        <div className="color-swatch-card__meta">
          <strong className="foundation-token-cards__label">24px</strong>
          <TokenCopyChip copyValue="24px">--spacing-24</TokenCopyChip>
        </div>
      </article>
    </FoundationTokenCardFrame>
  );
}

const RADIUS_BRACKET_ARM = 40;
const RADIUS_BRACKET_RADIUS = 8;
const RADIUS_BRACKET_TR_DELAY_MS = 120;

const RADIUS_BRACKET_PATHS = {
  tl: `M${RADIUS_BRACKET_ARM} 0.5 H${RADIUS_BRACKET_RADIUS + 1} A${RADIUS_BRACKET_RADIUS - 0.5} ${RADIUS_BRACKET_RADIUS - 0.5} 0 0 0 0.5 ${RADIUS_BRACKET_RADIUS + 1} V${RADIUS_BRACKET_ARM}`,
  tr: `M0 0.5 H${RADIUS_BRACKET_ARM - RADIUS_BRACKET_RADIUS - 1} A${RADIUS_BRACKET_RADIUS - 0.5} ${RADIUS_BRACKET_RADIUS - 0.5} 0 0 1 ${RADIUS_BRACKET_ARM - 0.5} ${RADIUS_BRACKET_RADIUS + 1} V${RADIUS_BRACKET_ARM}`,
};

function RadiusBracket({ className, path }) {
  return (
    <svg
      className={`radius-swatch-card__bracket ${className}`}
      viewBox={`0 0 ${RADIUS_BRACKET_ARM} ${RADIUS_BRACKET_ARM}`}
      aria-hidden="true"
    >
      <path d={path} pathLength="1" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function RadiusTokenCard() {
  const [ref, inView] = useInViewOnce({ threshold: 0.45 });

  return (
    <FoundationTokenCardFrame>
      <article
        ref={ref}
        className={`color-swatch-card radius-swatch-card foundation-token-cards__card${inView ? " is-in-view" : ""}`}
        style={{
          "--radius-size": "8px",
          "--radius-corner-arm": `${RADIUS_BRACKET_ARM}px`,
          "--radius-bracket-gap": "8px",
          "--radius-bracket-tr-delay": `${RADIUS_BRACKET_TR_DELAY_MS}ms`,
          "--foundation-token-cycle": `${FOUNDATION_TOKEN_CYCLE_MS}ms`,
        }}
      >
        <div className="color-swatch-card__swatch radius-swatch-card__swatch">
          <div className="radius-swatch-card__fit">
            <RadiusBracket
              className="radius-swatch-card__bracket--tl"
              path={RADIUS_BRACKET_PATHS.tl}
            />
            <RadiusBracket
              className="radius-swatch-card__bracket--tr"
              path={RADIUS_BRACKET_PATHS.tr}
            />
            <span className="radius-swatch-card__shape" aria-hidden="true" />
          </div>
        </div>
        <div className="color-swatch-card__meta">
          <strong className="radius-swatch-card__title">Radius - 8</strong>
          <TokenCopyChip copyValue="8px">--corner-rad-xs</TokenCopyChip>
        </div>
      </article>
    </FoundationTokenCardFrame>
  );
}

export function FoundationTokenCardsGrid() {
  return (
    <div className="foundation-token-cards">
      <div className="foundation-token-cards__grid">
        <ColorTokenCard />
        <MotionTokenCard />
        <SpacingTokenCard />
        <RadiusTokenCard />
      </div>
    </div>
  );
}
