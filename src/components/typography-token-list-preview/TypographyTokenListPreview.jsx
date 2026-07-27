import { useEffect, useRef, useState } from "react";
import { TokenCopyChip } from "../token-copy-chip/TokenCopyChip.jsx";
import "./TypographyTokenListPreview.css";

const TYPOGRAPHY_SAMPLE_TEXT = "Every component has a purpose.";

const TYPOGRAPHY_HEADING_STYLES = [
  {
    label: "Heading / h1",
    token: "--text-heading-h1",
    level: "h1",
  },
  {
    label: "Heading / h2",
    token: "--text-heading-h2",
    level: "h2",
  },
  {
    label: "Heading / h3",
    token: "--text-heading-h3",
    level: "h3",
  },
];

const TYPOGRAPHY_BODY_STYLES = [
  {
    label: "Body / 18",
    token: "--text-body-18",
    level: "body-18",
  },
  {
    label: "Body / 16",
    token: "--text-body-16",
    level: "body-16",
  },
  {
    label: "Body / 14",
    token: "--text-body-14",
    level: "body-14",
  },
  {
    label: "Body / 12",
    token: "--text-body-12",
    level: "body-12",
  },
];

const TYPOGRAPHY_STYLES = [...TYPOGRAPHY_HEADING_STYLES, ...TYPOGRAPHY_BODY_STYLES];

function typographyWeightLabel(weight) {
  const numericWeight = Number.parseInt(weight, 10);
  if (numericWeight >= 600) return `Semibold / ${numericWeight}`;
  if (numericWeight >= 500) return `Medium / ${numericWeight}`;
  return `Regular / ${numericWeight}`;
}

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

function TypographyTokenCard({ label, token, level }) {
  const sampleRef = useRef(null);
  const [spec, setSpec] = useState(null);

  useEffect(() => {
    const sample = sampleRef.current;
    if (!sample) return;

    const computed = getComputedStyle(sample);
    setSpec({
      weight: typographyWeightLabel(computed.fontWeight),
      size: computed.fontSize,
      letterSpacing: computed.letterSpacing,
    });
  }, [level]);

  return (
    <article className="typography-token-list-preview__card">
      <p className="typography-token-list-preview__label">{label}</p>
      <p
        ref={sampleRef}
        className={`typography-token-list-preview__sample typography-token-list-preview__sample--${level}`}
      >
        {TYPOGRAPHY_SAMPLE_TEXT}
      </p>
      {spec ? (
        <div className="typography-token-list-preview__spec">
          <span>{spec.weight}</span>
          <span className="typography-token-list-preview__spec-divider" aria-hidden="true" />
          <span>{spec.size}</span>
          <span className="typography-token-list-preview__spec-divider" aria-hidden="true" />
          <span>{spec.letterSpacing}</span>
        </div>
      ) : null}
      <TokenCopyChip copyValue={token}>{token}</TokenCopyChip>
    </article>
  );
}

export function TypographyTokenListPreview() {
  const scrollRef = useRef(null);
  const [showChevron, setShowChevron] = useState(false);

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    const updateChevron = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollEl;
      const canScroll = scrollHeight > clientHeight + 1;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 8;
      setShowChevron(canScroll && !atBottom);
    };

    updateChevron();
    scrollEl.addEventListener("scroll", updateChevron, { passive: true });

    const resizeObserver = new ResizeObserver(updateChevron);
    resizeObserver.observe(scrollEl);

    return () => {
      scrollEl.removeEventListener("scroll", updateChevron);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="typography-token-list-preview">
      <div ref={scrollRef} className="typography-token-list-preview__scroll">
        {TYPOGRAPHY_STYLES.map((style) => (
          <TypographyTokenCard key={style.token} {...style} />
        ))}
      </div>
      <div className="typography-token-list-preview__fade" aria-hidden="true" />
      <div
        className={`typography-token-list-preview__chevron${showChevron ? "" : " typography-token-list-preview__chevron--hidden"}`}
        aria-hidden="true"
      >
        <ScrollChevron />
      </div>
    </div>
  );
}
