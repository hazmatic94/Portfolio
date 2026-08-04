import { useEffect, useRef, useState } from "react";
import "./ApplicationShellBlueprintPreview.css";

const BLUEPRINT_MOBILE_BREAKPOINT = "(max-width: 800px)";

/** Canonical shell dimensions — labels stay fixed while the diagram scales (desktop + mobile). */
const BLUEPRINT_DESKTOP_SPEC = {
  shellWidth: "1200px",
  bodyHeight: "792px",
  railHeight: "52px",
  bettingPanelWidth: "360px",
  gameViewWidth: "874px",
};

const BLUEPRINT_MOBILE_SPEC = {
  gameViewHeight: "70vh",
  railHeight: "52px",
};

function BlueprintWidthAnnotation({ value, className = "", style }) {
  return (
    <div
      className={`application-shell-blueprint-preview__annotation application-shell-blueprint-preview__annotation--width${className ? ` ${className}` : ""}`}
      style={style}
    >
      <span className="application-shell-blueprint-preview__annotation-side">
        <span
          className="application-shell-blueprint-preview__annotation-arrow application-shell-blueprint-preview__annotation-arrow--left"
          aria-hidden="true"
        />
        <span className="application-shell-blueprint-preview__annotation-line application-shell-blueprint-preview__annotation-line--horizontal" />
      </span>
      <span className="application-shell-blueprint-preview__annotation-label">
        {value}
      </span>
      <span className="application-shell-blueprint-preview__annotation-side application-shell-blueprint-preview__annotation-side--end">
        <span className="application-shell-blueprint-preview__annotation-line application-shell-blueprint-preview__annotation-line--horizontal" />
        <span
          className="application-shell-blueprint-preview__annotation-arrow application-shell-blueprint-preview__annotation-arrow--right"
          aria-hidden="true"
        />
      </span>
    </div>
  );
}

function BlueprintHeightAnnotation({
  value,
  className = "",
  style,
  hideArrows = false,
}) {
  return (
    <div
      className={`application-shell-blueprint-preview__annotation application-shell-blueprint-preview__annotation--height${className ? ` ${className}` : ""}`}
      style={style}
    >
      <span className="application-shell-blueprint-preview__annotation-side application-shell-blueprint-preview__annotation-side--vertical">
        {!hideArrows ? (
          <span
            className="application-shell-blueprint-preview__annotation-arrow application-shell-blueprint-preview__annotation-arrow--top"
            aria-hidden="true"
          />
        ) : null}
        <span className="application-shell-blueprint-preview__annotation-line application-shell-blueprint-preview__annotation-line--vertical" />
      </span>
      <span className="application-shell-blueprint-preview__annotation-label">
        {value}
      </span>
      <span className="application-shell-blueprint-preview__annotation-side application-shell-blueprint-preview__annotation-side--vertical application-shell-blueprint-preview__annotation-side--end">
        <span className="application-shell-blueprint-preview__annotation-line application-shell-blueprint-preview__annotation-line--vertical" />
        {!hideArrows ? (
          <span
            className="application-shell-blueprint-preview__annotation-arrow application-shell-blueprint-preview__annotation-arrow--bottom"
            aria-hidden="true"
          />
        ) : null}
      </span>
    </div>
  );
}

export function ApplicationShellBlueprintPreview() {
  const previewRef = useRef(null);
  const shellRef = useRef(null);
  const bodyRef = useRef(null);
  const [layout, setLayout] = useState({
    shellWidth: 0,
    bodyHeight: 0,
    bodyTop: 0,
    isStacked: false,
  });

  useEffect(() => {
    const preview = previewRef.current;
    const shell = shellRef.current;
    const body = bodyRef.current;

    if (!preview || !shell || !body) {
      return undefined;
    }

    const mediaQuery = window.matchMedia(BLUEPRINT_MOBILE_BREAKPOINT);

    const measure = () => {
      const previewRect = preview.getBoundingClientRect();
      const shellRect = shell.getBoundingClientRect();
      const bodyRect = body.getBoundingClientRect();

      setLayout({
        shellWidth: shellRect.width,
        bodyHeight: bodyRect.height,
        bodyTop: bodyRect.top - previewRect.top,
        isStacked: mediaQuery.matches,
      });
    };

    measure();
    mediaQuery.addEventListener("change", measure);

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(preview);
    resizeObserver.observe(shell);
    resizeObserver.observe(body);

    return () => {
      mediaQuery.removeEventListener("change", measure);
      resizeObserver.disconnect();
    };
  }, []);

  const { shellWidth, bodyHeight, bodyTop, isStacked } = layout;
  const hasDesktopMeasure = shellWidth > 0 && !isStacked;
  const spec = isStacked ? BLUEPRINT_MOBILE_SPEC : BLUEPRINT_DESKTOP_SPEC;

  return (
    <div
      ref={previewRef}
      className={`application-shell-blueprint-preview${isStacked ? " application-shell-blueprint-preview--stacked" : ""}`}
      aria-hidden="true"
    >
      <div className="application-shell-blueprint-preview__figure">
        <div
          ref={shellRef}
          className="application-shell-blueprint-preview__shell"
        >
          <div className="application-shell-blueprint-preview__bar application-shell-blueprint-preview__bar--top application-shell-blueprint-preview__zone">
            <BlueprintHeightAnnotation
              value={spec.railHeight}
              className="application-shell-blueprint-preview__annotation--bar-height"
              hideArrows
            />
            <span className="application-shell-blueprint-preview__zone-label">
              Game Rail
            </span>
          </div>

          <div
            ref={bodyRef}
            className="application-shell-blueprint-preview__body"
          >
            <div className="application-shell-blueprint-preview__panel application-shell-blueprint-preview__panel--sidebar application-shell-blueprint-preview__zone">
              <span className="application-shell-blueprint-preview__zone-label">
                Betting Panel
              </span>
              {isStacked ? null : (
                <BlueprintWidthAnnotation
                  value={BLUEPRINT_DESKTOP_SPEC.bettingPanelWidth}
                  className="application-shell-blueprint-preview__annotation--panel"
                />
              )}
            </div>
            <div className="application-shell-blueprint-preview__panel application-shell-blueprint-preview__panel--main application-shell-blueprint-preview__zone">
              <span className="application-shell-blueprint-preview__zone-label">
                Game View
              </span>
              {isStacked ? (
                <BlueprintHeightAnnotation
                  value={BLUEPRINT_MOBILE_SPEC.gameViewHeight}
                  className="application-shell-blueprint-preview__annotation--panel application-shell-blueprint-preview__annotation--panel-height"
                />
              ) : (
                <BlueprintWidthAnnotation
                  value={BLUEPRINT_DESKTOP_SPEC.gameViewWidth}
                  className="application-shell-blueprint-preview__annotation--panel"
                />
              )}
            </div>
          </div>

          {!isStacked ? (
            <div className="application-shell-blueprint-preview__bar application-shell-blueprint-preview__bar--bottom application-shell-blueprint-preview__zone">
              <BlueprintHeightAnnotation
                value={spec.railHeight}
                className="application-shell-blueprint-preview__annotation--bar-height"
                hideArrows
              />
              <span className="application-shell-blueprint-preview__zone-label">
                Game Footer
              </span>
            </div>
          ) : null}
        </div>
      </div>

      {hasDesktopMeasure ? (
        <>
          <BlueprintWidthAnnotation
            value={BLUEPRINT_DESKTOP_SPEC.shellWidth}
            className="application-shell-blueprint-preview__annotation--top"
            style={{ width: shellWidth }}
          />
          <BlueprintHeightAnnotation
            value={BLUEPRINT_DESKTOP_SPEC.bodyHeight}
            className="application-shell-blueprint-preview__annotation--body-height"
            style={{
              top: bodyTop,
              left: shellWidth,
              height: bodyHeight,
            }}
          />
        </>
      ) : null}
    </div>
  );
}
