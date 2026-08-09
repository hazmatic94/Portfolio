import { useEffect, useRef, useState } from "react";
import "./PortfolioScrollHint.css";

const SCROLL_STOP_DELAY_MS = 360;
const BOTTOM_THRESHOLD_PX = 24;
const SCROLL_EDGE_THRESHOLD_PX = 1;

function useNestedScrollChaining(scrollRef) {
  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) {
      return undefined;
    }

    const getEdges = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollEl;
      return {
        atTop: scrollTop <= SCROLL_EDGE_THRESHOLD_PX,
        atBottom:
          scrollTop + clientHeight >= scrollHeight - SCROLL_EDGE_THRESHOLD_PX,
      };
    };

    const onWheel = (event) => {
      const { atTop, atBottom } = getEdges();
      const scrollingUp = event.deltaY < 0;
      const scrollingDown = event.deltaY > 0;

      if ((scrollingUp && atTop) || (scrollingDown && atBottom)) {
        event.preventDefault();
        window.scrollBy({
          top: event.deltaY,
          left: event.deltaX,
          behavior: "auto",
        });
      }
    };

    let lastTouchY = 0;

    const onTouchStart = (event) => {
      lastTouchY = event.touches[0].clientY;
    };

    const onTouchMove = (event) => {
      const touchY = event.touches[0].clientY;
      const deltaY = lastTouchY - touchY;
      lastTouchY = touchY;

      if (deltaY === 0) {
        return;
      }

      const { atTop, atBottom } = getEdges();
      const scrollingDown = deltaY > 0;
      const scrollingUp = deltaY < 0;

      if ((scrollingDown && atBottom) || (scrollingUp && atTop)) {
        window.scrollBy({ top: deltaY, left: 0, behavior: "auto" });
      }
    };

    scrollEl.addEventListener("wheel", onWheel, { passive: false });
    scrollEl.addEventListener("touchstart", onTouchStart, { passive: true });
    scrollEl.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      scrollEl.removeEventListener("wheel", onWheel);
      scrollEl.removeEventListener("touchstart", onTouchStart);
      scrollEl.removeEventListener("touchmove", onTouchMove);
    };
  }, [scrollRef]);
}

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
  useNestedScrollChaining(scrollRef);
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
