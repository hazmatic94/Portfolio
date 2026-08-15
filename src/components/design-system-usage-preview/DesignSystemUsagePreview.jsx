import { useEffect, useRef } from "react";
import {
  CodeAttr,
  CodeComment,
  CodeFn,
  CodeImportName,
  CodeKw,
  CodePunct,
  CodeStr,
  CodeTag,
} from "../component-card/ComponentCardCodeParts.jsx";
import { CodePanelCopyButton } from "../code-panel-copy-button/CodePanelCopyButton.jsx";
import { DesignSystemCodeRevealPanel } from "../design-system-code-reveal-panel/DesignSystemCodeRevealPanel.jsx";
import { PortfolioScrollHint } from "../portfolio-scroll-hint/PortfolioScrollHint.jsx";
import "./DesignSystemUsagePreview.css";

const USAGE_CODE = `import "@joker/design-system/styles.css";
import {
  FullGameShell,
  BettingPanelSurface,
  PlaceBetFooter,
} from "@joker/design-system";

export function GamePage() {
  return (
    <FullGameShell
      defaultValue="hilo"
      game={{ label: "HiLo" }}
      bettingPanel={
        <BettingPanelSurface
          layout="desktop"
          footer={<PlaceBetFooter onPlaceBet={() => {}} />}
        >
          {/* game-specific fields */}
        </BettingPanelSurface>
      }
    >
      {/* game canvas */}
    </FullGameShell>
  );
}`;

const SCROLL_DRIVE_RANGE_PX = 300;

function clamp01(value) {
  return Math.min(1, Math.max(0, value));
}

function useScrollDrivenCodeReveal(driveRootRef, scrollRef) {
  useEffect(() => {
    const root = driveRootRef?.current;
    const scrollEl = scrollRef.current;
    if (!root || !scrollEl) {
      return undefined;
    }

    const sync = () => {
      const rect = root.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const maxScrollTop = Math.max(
        0,
        scrollEl.scrollHeight - scrollEl.clientHeight,
      );

      if (rect.bottom > viewportHeight) {
        scrollEl.scrollTop = 0;
        return;
      }

      const progress = clamp01((viewportHeight - rect.bottom) / SCROLL_DRIVE_RANGE_PX);
      scrollEl.scrollTop = progress * maxScrollTop;
    };

    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    const resizeObserver = new ResizeObserver(sync);
    resizeObserver.observe(root);
    resizeObserver.observe(scrollEl);

    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      resizeObserver.disconnect();
    };
  }, [driveRootRef, scrollRef]);
}

function UsageCode() {
  return (
    <pre className="ds-usage-preview__code">
      <code>
        <CodeKw>import</CodeKw> <CodeStr>"@joker/design-system/styles.css"</CodeStr>;{"\n"}
        <CodeKw>import</CodeKw> <CodePunct>{"{"}</CodePunct>{"\n"}
        {"  "}
        <CodeImportName>FullGameShell</CodeImportName>
        <CodePunct>,</CodePunct>{"\n"}
        {"  "}
        <CodeImportName>BettingPanelSurface</CodeImportName>
        <CodePunct>,</CodePunct>{"\n"}
        {"  "}
        <CodeImportName>PlaceBetFooter</CodeImportName>
        <CodePunct>,</CodePunct>{"\n"}
        <CodePunct>{"}"}</CodePunct> <CodeKw>from</CodeKw> <CodeStr>"@joker/design-system"</CodeStr>;{"\n\n"}
        <CodeKw>export</CodeKw> <CodeKw>function</CodeKw> <CodeFn>GamePage</CodeFn>
        <CodePunct>()</CodePunct> <CodePunct>{"{"}</CodePunct>{"\n"}
        {"  "}
        <CodeKw>return</CodeKw> <CodePunct>{"("}</CodePunct>{"\n"}
        {"    "}
        <CodePunct>{"<"}</CodePunct>
        <CodeTag>FullGameShell</CodeTag>{"\n"}
        {"      "}
        <CodeAttr>defaultValue</CodeAttr>
        <CodePunct>=</CodePunct>
        <CodeStr>"hilo"</CodeStr>{"\n"}
        {"      "}
        <CodeAttr>game</CodeAttr>
        <CodePunct>=</CodePunct>
        <CodePunct>{"{{ "}</CodePunct>
        <CodeAttr>label</CodeAttr>
        <CodePunct>:</CodePunct> <CodeStr>"HiLo"</CodeStr>
        <CodePunct>{" }}"}</CodePunct>{"\n"}
        {"      "}
        <CodeAttr>bettingPanel</CodeAttr>
        <CodePunct>=</CodePunct>
        <CodePunct>{"{"}</CodePunct>{"\n"}
        {"        "}
        <CodePunct>{"<"}</CodePunct>
        <CodeTag>BettingPanelSurface</CodeTag>{"\n"}
        {"          "}
        <CodeAttr>layout</CodeAttr>
        <CodePunct>=</CodePunct>
        <CodeStr>"desktop"</CodeStr>{"\n"}
        {"          "}
        <CodeAttr>footer</CodeAttr>
        <CodePunct>=</CodePunct>
        <CodePunct>{"{<"}</CodePunct>
        <CodeTag>PlaceBetFooter</CodeTag> <CodeAttr>onPlaceBet</CodeAttr>
        <CodePunct>=</CodePunct>
        <CodePunct>{"{() => {}} />"}</CodePunct>
        <CodePunct>{"}"}</CodePunct>{"\n"}
        {"        "}
        <CodePunct>{">"}</CodePunct>{"\n"}
        {"          "}
        <CodeComment>{"{/* game-specific fields */}"}</CodeComment>{"\n"}
        {"        "}
        <CodePunct>{"</"}</CodePunct>
        <CodeTag>BettingPanelSurface</CodeTag>
        <CodePunct>{">"}</CodePunct>{"\n"}
        {"      "}
        <CodePunct>{"}"}</CodePunct>{"\n"}
        {"    "}
        <CodePunct>{">"}</CodePunct>{"\n"}
        {"      "}
        <CodeComment>{"{/* game canvas */}"}</CodeComment>{"\n"}
        {"    "}
        <CodePunct>{"</"}</CodePunct>
        <CodeTag>FullGameShell</CodeTag>
        <CodePunct>{">"}</CodePunct>{"\n"}
        {"  "}
        <CodePunct>);</CodePunct>{"\n"}
        <CodePunct>{"}"}</CodePunct>
      </code>
    </pre>
  );
}

export function DesignSystemUsagePreview({
  scrollDriveRef = null,
  codeReveal = false,
}) {
  const codeScrollRef = useRef(null);
  useScrollDrivenCodeReveal(codeReveal ? null : scrollDriveRef, codeScrollRef);

  const body = (
    <PortfolioScrollHint
      className="ds-usage-preview__hint"
      scrollClassName="ds-usage-preview__scroll"
      scrollRef={codeScrollRef}
    >
      <UsageCode />
    </PortfolioScrollHint>
  );

  return (
    <div className="ds-usage-preview">
      <div className="ds-usage-preview__header">
        <span className="ds-usage-preview__filename">GamePage.tsx</span>
        <CodePanelCopyButton value={USAGE_CODE} copyLabel="Copy GamePage.tsx" />
      </div>
      {codeReveal ? (
        <DesignSystemCodeRevealPanel>{body}</DesignSystemCodeRevealPanel>
      ) : (
        body
      )}
    </div>
  );
}
