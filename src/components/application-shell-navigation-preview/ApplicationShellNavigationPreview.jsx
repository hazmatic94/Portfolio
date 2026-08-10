import { useEffect, useRef, useState } from "react";
import { HiLoBettingPanelPreview } from "../hilo-betting-panel-preview/HiLoBettingPanelPreview.jsx";
import "./ApplicationShellNavigationPreview.css";

const PANEL_MIN = 280;
const PANEL_MAX = 360;
const PANEL_DEFAULT = 360;
const MOBILE_BREAKPOINT = "(max-width: 800px)";
const MOBILE_RESIZE_HOLD_MS = 500;
const MOBILE_RESIZE_TRANSITION_MS = 2800;

function formatDimension(value) {
  return `${Math.round(value)}px`;
}

function panelWidthLimits(frameWidth) {
  if (frameWidth == null || frameWidth <= 0) {
    return { min: PANEL_MIN, max: PANEL_MAX };
  }
  const max = Math.min(PANEL_MAX, Math.round(frameWidth));
  const min = Math.min(PANEL_MIN, max);
  return { min, max };
}

function clampPanelWidth(value, limits = panelWidthLimits()) {
  return Math.min(limits.max, Math.max(limits.min, Math.round(value)));
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

function mobilePanelWidthAt(elapsedMs, panelMin, panelMax) {
  const hold = MOBILE_RESIZE_HOLD_MS;
  const transition = MOBILE_RESIZE_TRANSITION_MS;
  const shrinkStart = hold;
  const shrinkEnd = hold + transition;
  const growStart = shrinkEnd + hold;
  const growEnd = growStart + transition;
  const cycle = growEnd;

  const t = elapsedMs % cycle;

  if (t < shrinkStart) {
    return panelMax;
  }
  if (t < shrinkEnd) {
    const progress = easeInOutCubic((t - shrinkStart) / transition);
    return panelMax + progress * (panelMin - panelMax);
  }
  if (t < growStart) {
    return panelMin;
  }
  const progress = easeInOutCubic((t - growStart) / transition);
  return panelMin + progress * (panelMax - panelMin);
}

function PanelResizeTab({
  panelWidth,
  onResizeStart,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
}) {
  return (
    <button
      type="button"
      className="application-shell-navigation-preview__resize-tab"
      aria-label="Resize betting panel"
      aria-valuemin={PANEL_MIN}
      aria-valuemax={PANEL_MAX}
      aria-valuenow={panelWidth}
      onPointerDown={onResizeStart}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
    >
      <svg
        className="application-shell-navigation-preview__resize-tab-icon"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M12.5 15L7.5 10L12.5 5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <svg
        className="application-shell-navigation-preview__resize-tab-icon"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M7.5 15L12.5 10L7.5 5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

function PanelWidthAnnotation({ value, active }) {
  return (
    <div
      className={`application-shell-navigation-preview__width-annotation${active ? " application-shell-navigation-preview__width-annotation--active" : ""}`}
      aria-hidden="true"
    >
      <span className="application-shell-navigation-preview__width-annotation-side">
        <span
          className="application-shell-navigation-preview__width-annotation-arrow application-shell-navigation-preview__width-annotation-arrow--left"
          aria-hidden="true"
        />
        <span className="application-shell-navigation-preview__width-annotation-line" />
      </span>
      <span className="application-shell-navigation-preview__width-annotation-label">
        {value}
      </span>
      <span className="application-shell-navigation-preview__width-annotation-side application-shell-navigation-preview__width-annotation-side--end">
        <span className="application-shell-navigation-preview__width-annotation-line" />
        <span
          className="application-shell-navigation-preview__width-annotation-arrow application-shell-navigation-preview__width-annotation-arrow--right"
          aria-hidden="true"
        />
      </span>
    </div>
  );
}

export function ApplicationShellNavigationPreview() {
  const [panelWidth, setPanelWidth] = useState(PANEL_DEFAULT);
  const [isResizing, setIsResizing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isAutoResizing, setIsAutoResizing] = useState(false);
  const [frameWidth, setFrameWidth] = useState(null);
  const rootRef = useRef(null);
  const dragStateRef = useRef(null);
  const limits = panelWidthLimits(frameWidth);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return undefined;
    }

    const syncWidth = (width) => {
      setFrameWidth(width);
    };

    syncWidth(root.getBoundingClientRect().width);

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) {
        return;
      }
      const width =
        entry.contentBoxSize?.[0]?.inlineSize ?? entry.contentRect.width;
      syncWidth(width);
    });
    observer.observe(root);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_BREAKPOINT);
    const syncMobile = () => setIsMobile(mediaQuery.matches);
    syncMobile();
    mediaQuery.addEventListener("change", syncMobile);
    return () => mediaQuery.removeEventListener("change", syncMobile);
  }, []);

  useEffect(() => {
    if (frameWidth == null) {
      return;
    }
    setPanelWidth((current) => clampPanelWidth(current, limits));
  }, [frameWidth, limits.min, limits.max]);

  useEffect(() => {
    if (!isMobile) {
      setPanelWidth(clampPanelWidth(PANEL_DEFAULT, limits));
      setIsAutoResizing(false);
      return undefined;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) {
      setPanelWidth(clampPanelWidth(PANEL_DEFAULT, limits));
      setIsAutoResizing(false);
      return undefined;
    }

    let frameId = 0;
    const startTime = performance.now();
    setIsAutoResizing(true);

    const tick = (timestamp) => {
      const elapsed = timestamp - startTime;
      const { min, max } = panelWidthLimits(frameWidth);
      setPanelWidth(mobilePanelWidthAt(elapsed, min, max));
      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frameId);
      setIsAutoResizing(false);
    };
  }, [isMobile, frameWidth, limits.min, limits.max]);

  const handleResizeStart = (event) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);

    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startWidth: panelWidth,
    };
    setIsResizing(true);
  };

  const handleResizeMove = (event) => {
    const dragState = dragStateRef.current;
    if (!dragState || dragState.pointerId !== event.pointerId) {
      return;
    }

    const deltaX = event.clientX - dragState.startX;
    setPanelWidth(
      clampPanelWidth(dragState.startWidth + deltaX, panelWidthLimits(frameWidth)),
    );
  };

  const handleResizeEnd = (event) => {
    const dragState = dragStateRef.current;
    if (!dragState || dragState.pointerId !== event.pointerId) {
      return;
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    dragStateRef.current = null;
    setIsResizing(false);
  };

  const widthLabelActive = isResizing || isAutoResizing;

  const displayedPanelWidth = clampPanelWidth(panelWidth, limits);

  return (
    <div
      ref={rootRef}
      className={`application-shell-navigation-preview${isResizing ? " application-shell-navigation-preview--resizing" : ""}${isMobile ? " application-shell-navigation-preview--mobile" : ""}${isAutoResizing ? " application-shell-navigation-preview--auto-resize" : ""}`}
      style={{ "--navigation-betting-panel-width": `${displayedPanelWidth}px` }}
    >
      <div className="application-shell-navigation-preview__betting-column">
        <div className="application-shell-navigation-preview__betting-panel">
          <HiLoBettingPanelPreview disabled />
        </div>
        {!isMobile ? (
          <PanelResizeTab
            panelWidth={displayedPanelWidth}
            onResizeStart={handleResizeStart}
            onPointerMove={handleResizeMove}
            onPointerUp={handleResizeEnd}
            onPointerCancel={handleResizeEnd}
          />
        ) : null}
        <PanelWidthAnnotation
          value={formatDimension(displayedPanelWidth)}
          active={widthLabelActive}
        />
      </div>
    </div>
  );
}
