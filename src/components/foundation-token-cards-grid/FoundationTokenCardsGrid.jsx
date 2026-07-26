import { useState } from "react";
import "../portfolio-image-mockup/PortfolioImageMockup.css";
import "./FoundationTokenCardsGrid.css";

const COPY_FEEDBACK_MS = 1400;

async function copyText(value) {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    return false;
  }
}

function TokenChip({ children, copyValue }) {
  const [copied, setCopied] = useState(false);
  const value = copyValue ?? children;

  async function handleClick(event) {
    event.stopPropagation();

    const didCopy = await copyText(value);
    if (!didCopy) return;

    setCopied(true);
    window.setTimeout(() => setCopied(false), COPY_FEEDBACK_MS);
  }

  return (
    <button
      type="button"
      className={`foundation-token-cards__chip foundation-token-cards__chip--copy${copied ? " is-copied" : ""}`}
      data-copy-value={value}
      aria-label={copied ? "Copied" : `Copy ${value}`}
      onClick={handleClick}
    >
      {copied ? "Copied" : children}
    </button>
  );
}

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
  return (
    <FoundationTokenCardFrame>
      <article className="color-swatch-card foundation-token-cards__card">
        <div
          className="color-swatch-card__swatch foundation-token-cards__color-swatch"
          style={{ background: "var(--joker-gold-400)" }}
        >
          <span className="base-tag">base</span>
        </div>
        <div className="color-swatch-card__meta">
          <strong className="foundation-token-cards__label">#FFDEA8</strong>
          <TokenChip copyValue="#FFDEA8">--joker-gold-400</TokenChip>
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
          <TokenChip copyValue="--motion-medium">--motion-medium</TokenChip>
        </div>
      </article>
    </FoundationTokenCardFrame>
  );
}

function SpacingTokenCard() {
  return (
    <FoundationTokenCardFrame>
      <article
        className="color-swatch-card spacing-swatch-card foundation-token-cards__card"
        style={{ "--spacing-size": "24px" }}
      >
        <div className="color-swatch-card__swatch spacing-swatch-card__swatch">
          <span className="spacing-swatch-card__bar" aria-hidden="true" />
        </div>
        <div className="color-swatch-card__meta">
          <strong className="foundation-token-cards__label">24px</strong>
          <TokenChip copyValue="24px">--spacing-24</TokenChip>
        </div>
      </article>
    </FoundationTokenCardFrame>
  );
}

function RadiusTokenCard() {
  return (
    <FoundationTokenCardFrame>
      <article
        className="color-swatch-card radius-swatch-card foundation-token-cards__card"
        style={{ "--radius-size": "8px" }}
      >
        <div className="color-swatch-card__swatch radius-swatch-card__swatch">
          <span className="radius-swatch-card__shape" aria-hidden="true">
            <span className="radius-swatch-card__corner radius-swatch-card__corner--tl" />
            <span className="radius-swatch-card__corner radius-swatch-card__corner--tr" />
          </span>
        </div>
        <div className="color-swatch-card__meta">
          <strong className="radius-swatch-card__title">Radius - 8</strong>
          <TokenChip copyValue="8px">--corner-rad-xs</TokenChip>
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
