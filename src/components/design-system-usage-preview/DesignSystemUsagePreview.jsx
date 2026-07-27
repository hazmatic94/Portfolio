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

export function DesignSystemUsagePreview() {
  return (
    <div className="ds-usage-preview">
      <div className="ds-usage-preview__header">
        <span className="ds-usage-preview__filename">GamePage.tsx</span>
        <CodePanelCopyButton value={USAGE_CODE} copyLabel="Copy GamePage.tsx" />
      </div>
      <div className="ds-usage-preview__scroll">
        <UsageCode />
      </div>
    </div>
  );
}
