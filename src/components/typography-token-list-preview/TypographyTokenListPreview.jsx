import { TokenCopyChip } from "../token-copy-chip/TokenCopyChip.jsx";
import "./TypographyTokenListPreview.css";

const TYPOGRAPHY_SAMPLE_TEXT = "Every component has a purpose.";

const TYPOGRAPHY_HEADING_STYLES = [
  {
    label: "Heading / h1",
    token: "--text-heading-h1",
    size: 24,
    weight: 500,
    letterSpacing: "-3%",
  },
  {
    label: "Heading / h2",
    token: "--text-heading-h2",
    size: 32,
    weight: 500,
    letterSpacing: "-3%",
  },
  {
    label: "Heading / h3",
    token: "--text-heading-h3",
    size: 24,
    weight: 500,
    letterSpacing: "-3%",
  },
];

function ScrollChevron() {
  return (
    <svg
      className="typography-token-list-preview__chevron-icon"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TypographyTokenCard({ label, token, size, weight, letterSpacing }) {
  return (
    <article className="typography-token-list-preview__card">
      <p className="typography-token-list-preview__label">{label}</p>
      <p
        className="typography-token-list-preview__sample"
        style={{
          fontSize: `${size}px`,
          fontWeight: weight,
          letterSpacing,
        }}
      >
        {TYPOGRAPHY_SAMPLE_TEXT}
      </p>
      <div className="typography-token-list-preview__spec">
        <span>Medium / {weight}</span>
        <span className="typography-token-list-preview__spec-divider" aria-hidden="true" />
        <span>{size}px</span>
        <span className="typography-token-list-preview__spec-divider" aria-hidden="true" />
        <span>{letterSpacing}</span>
      </div>
      <TokenCopyChip copyValue={token}>{token}</TokenCopyChip>
    </article>
  );
}

export function TypographyTokenListPreview() {
  return (
    <div className="typography-token-list-preview">
      <div className="typography-token-list-preview__scroll">
        {TYPOGRAPHY_HEADING_STYLES.map((style, index) => (
          <div key={style.token} className="typography-token-list-preview__section">
            <TypographyTokenCard {...style} />
            {index < TYPOGRAPHY_HEADING_STYLES.length - 1 ? (
              <hr className="typography-token-list-preview__section-divider" aria-hidden="true" />
            ) : null}
          </div>
        ))}
      </div>
      <div className="typography-token-list-preview__fade" aria-hidden="true" />
      <div className="typography-token-list-preview__chevron" aria-hidden="true">
        <ScrollChevron />
      </div>
    </div>
  );
}
