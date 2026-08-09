import { useEffect, useRef, useState } from "react";
import "./PortfolioScrollHint.css";

const SCROLL_STOP_DELAY_MS = 360;
const BOTTOM_THRESHOLD_PX = 24;

function ScrollChevron() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <path
        d="M5 7.5 10 12.5 15 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function useScrollHintVisibility(getMetricsRef, bindScrollTargetRef) {
  const [isVisible, setIsVisible] = useState(false);
  const isScrollingRef = useRef(false);
  const scrollStopTimerRef = useRef(null);

  useEffect(() => {
    const scrollTarget = bindScrollTargetRef.current();
    if (!scrollTarget) {
      return undefined;
    }

    const syncVisibility = () => {
      const { canScroll, atBottom } = getMetricsRef.current();
      setIsVisible(canScroll && !atBottom && !isScrollingRef.current);
    };

    const onScroll = () => {
      isScrollingRef.current = true;
      setIsVisible(false);

      window.clearTimeout(scrollStopTimerRef.current);
      scrollStopTimerRef.current = window.setTimeout(() => {
        isScrollingRef.current = false;
        const { canScroll, atBottom } = getMetricsRef.current();
        setIsVisible(canScroll && !atBottom);
      }, SCROLL_STOP_DELAY_MS);
    };

    syncVisibility();
    scrollTarget.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", syncVisibility);

    const resizeObserver = new ResizeObserver(syncVisibility);
    resizeObserver.observe(
      scrollTarget === window ? document.body : scrollTarget,
    );

    return () => {
      scrollTarget.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", syncVisibility);
      resizeObserver.disconnect();
      window.clearTimeout(scrollStopTimerRef.current);
    };
  }, [bindScrollTargetRef, getMetricsRef]);

  return isVisible;
}

function useElementScrollHint(scrollRef) {
  const getMetricsRef = useRef(() => ({ canScroll: false, atBottom: true }));
  const bindScrollTargetRef = useRef(() => null);

  getMetricsRef.current = () => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) {
      return { canScroll: false, atBottom: true };
    }

    const { scrollTop, scrollHeight, clientHeight } = scrollEl;
    return {
      canScroll: scrollHeight > clientHeight + 1,
      atBottom: scrollTop + clientHeight >= scrollHeight - 8,
    };
  };

  bindScrollTargetRef.current = () => scrollRef.current;

  return useScrollHintVisibility(getMetricsRef, bindScrollTargetRef);
}

export function PortfolioScrollHint({
  children,
  className = "",
  scrollClassName = "",
  fadeClassName = "",
  chevronClassName = "",
  fadeColor = "var(--joker-black-800)",
  insetX,
  style,
}) {
  const scrollRef = useRef(null);
  const isVisible = useElementScrollHint(scrollRef);
  const fadeStyle = {
    "--portfolio-scroll-hint-fade-color": fadeColor,
    ...(insetX != null ? { left: insetX, right: insetX } : null),
  };

  return (
    <div
      className={`portfolio-scroll-hint${className ? ` ${className}` : ""}${isVisible ? "" : " portfolio-scroll-hint--hidden"}`}
      style={style}
    >
      <div
        ref={scrollRef}
        className={`portfolio-scroll-hint__scroll${scrollClassName ? ` ${scrollClassName}` : ""}`}
      >
        {children}
      </div>
      <div
        className={`portfolio-scroll-hint__fade${fadeClassName ? ` ${fadeClassName}` : ""}`}
        style={fadeStyle}
        aria-hidden="true"
      />
      <div
        className={`portfolio-scroll-hint__chevron${chevronClassName ? ` ${chevronClassName}` : ""}`}
        aria-hidden="true"
      >
        <ScrollChevron />
      </div>
    </div>
  );
}

export function PageScrollHint({ fadeColor = "#121212" }) {
  const getMetricsRef = useRef(() => ({ canScroll: false, atBottom: true }));
  const bindScrollTargetRef = useRef(() => window);

  getMetricsRef.current = () => {
    const root = document.documentElement;
    return {
      canScroll: root.scrollHeight > root.clientHeight + 1,
      atBottom:
        window.scrollY + root.clientHeight >= root.scrollHeight - BOTTOM_THRESHOLD_PX,
    };
  };

  const isVisible = useScrollHintVisibility(getMetricsRef, bindScrollTargetRef);

  return (
    <div
      className={`page-scroll-hint${isVisible ? "" : " page-scroll-hint--hidden"}`}
      style={{ "--portfolio-scroll-hint-fade-color": fadeColor }}
      aria-hidden="true"
    >
      <div className="page-scroll-hint__fade" />
      <div className="page-scroll-hint__chevron">
        <ScrollChevron />
      </div>
    </div>
  );
}
