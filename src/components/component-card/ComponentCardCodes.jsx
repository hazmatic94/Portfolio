import {
  CodeAttr,
  CodeImportName,
  CodeKw,
  CodePunct,
  CodeStr,
  CodeTag,
  ComponentCardCodeBlock,
} from "./ComponentCardCodeParts.jsx";

export function ButtonComponentCardCode() {
  return (
    <ComponentCardCodeBlock>
      <CodeKw>import</CodeKw> <CodePunct>{"{ "}</CodePunct>
      <CodeImportName>Button</CodeImportName>
      <CodePunct>{" }"}</CodePunct> <CodeKw>from</CodeKw>{" "}
      <CodeStr>"@joker/design-system"</CodeStr>;{"  "}
      <CodePunct>{"<"}</CodePunct>
      <CodeTag>Button</CodeTag> <CodeAttr>variant</CodeAttr>
      <CodePunct>=</CodePunct>
      <CodeStr>"primary"</CodeStr>
      <CodePunct>{">"}</CodePunct>
      Place Bet
      <CodePunct>{"</"}</CodePunct>
      <CodeTag>Button</CodeTag>
      <CodePunct>{">"}</CodePunct>
    </ComponentCardCodeBlock>
  );
}

export function BetAmountInputComponentCardCode() {
  return (
    <ComponentCardCodeBlock>
      <CodeKw>import</CodeKw> <CodePunct>{"{ "}</CodePunct>
      <CodeImportName>BetAmountInput</CodeImportName>
      <CodePunct>{" }"}</CodePunct> <CodeKw>from</CodeKw>{" "}
      <CodeStr>"@joker/design-system"</CodeStr>;{"  "}
      <CodePunct>{"<"}</CodePunct>
      <CodeTag>BetAmountInput</CodeTag> <CodeAttr>label</CodeAttr>
      <CodePunct>=</CodePunct>
      <CodeStr>"Bet amount"</CodeStr> <CodeAttr>placeholder</CodeAttr>
      <CodePunct>=</CodePunct>
      <CodeStr>"0"</CodeStr> <CodePunct>/&gt;</CodePunct>
    </ComponentCardCodeBlock>
  );
}

export function CoinComponentCardCode() {
  return (
    <ComponentCardCodeBlock>
      <CodeKw>import</CodeKw> <CodePunct>{"{ "}</CodePunct>
      <CodeImportName>Coin</CodeImportName>
      <CodePunct>{" }"}</CodePunct> <CodeKw>from</CodeKw>{" "}
      <CodeStr>"@joker/design-system"</CodeStr>;{"  "}
      <CodePunct>{"<"}</CodePunct>
      <CodeTag>Coin</CodeTag> <CodeAttr>side</CodeAttr>
      <CodePunct>=</CodePunct>
      <CodeStr>"heads"</CodeStr> <CodePunct>/&gt;</CodePunct>
    </ComponentCardCodeBlock>
  );
}

export function WinTileComponentCardCode() {
  return (
    <ComponentCardCodeBlock>
      <CodeKw>import</CodeKw> <CodePunct>{"{ "}</CodePunct>
      <CodeImportName>MinesTile</CodeImportName>
      <CodePunct>{", "}</CodePunct>
      <CodeImportName>WinTile</CodeImportName>
      <CodePunct>{" }"}</CodePunct> <CodeKw>from</CodeKw>{" "}
      <CodeStr>"@joker/design-system"</CodeStr>;{"  "}
      <CodePunct>{"<"}</CodePunct>
      <CodeTag>WinTile</CodeTag> <CodeAttr>multiplier</CodeAttr>
      <CodePunct>=</CodePunct>
      <CodeStr>"1.57x"</CodeStr> <CodePunct>/&gt;</CodePunct>{"  "}
      <CodePunct>{"<"}</CodePunct>
      <CodeTag>MinesTile</CodeTag> <CodeAttr>role</CodeAttr>
      <CodePunct>=</CodePunct>
      <CodeStr>"button"</CodeStr> <CodePunct>/&gt;</CodePunct>
    </ComponentCardCodeBlock>
  );
}
