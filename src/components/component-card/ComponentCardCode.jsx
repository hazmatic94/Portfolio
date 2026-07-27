import {
  CodeAttr,
  CodeFn,
  CodeImportName,
  CodeKw,
  CodeProp,
  CodePunct,
  CodeStr,
  CodeTag,
  ComponentCardCodeBlock,
} from "./ComponentCardCodeParts.jsx";

export function ComponentCardCode() {
  return (
    <ComponentCardCodeBlock>
      <CodeKw>import</CodeKw> <CodePunct>{"{ "}</CodePunct>
      <CodeImportName>Coin</CodeImportName>
      <CodePunct>{" }"}</CodePunct> <CodeKw>from</CodeKw>{" "}
      <CodeStr>"@joker/design-system"</CodeStr>;{"  "}
      <CodeKw>export</CodeKw> <CodeKw>function</CodeKw> <CodeFn>CoinExample</CodeFn>
      <CodePunct>()</CodePunct> <CodePunct>{"{ "}</CodePunct>
      <CodeKw>return</CodeKw> <CodePunct>{"<"}</CodePunct>
      <CodeTag>Coin</CodeTag> <CodeAttr>side</CodeAttr>
      <CodePunct>=</CodePunct>
      <CodeStr>"heads"</CodeStr> <CodeAttr>style</CodeAttr>
      <CodePunct>=</CodePunct>
      <CodePunct>{"{{ "}</CodePunct>
      <CodeProp>--coin-size</CodeProp>
      <CodePunct>:</CodePunct> <CodeStr>"256px"</CodeStr>
      <CodePunct>{" }}"}</CodePunct> <CodePunct>/&gt;;</CodePunct>{" }"}
    </ComponentCardCodeBlock>
  );
}
