export function ComponentCardCode() {
  return (
    <pre className="component-card__code">
      <code>
        <span className="component-card__code-kw">import</span>
        {" "}
        <span className="component-card__code-punct">{"{ "}</span>
        <span className="component-card__code-name">Coin</span>
        <span className="component-card__code-punct">{" }"}</span>
        {" "}
        <span className="component-card__code-kw">from</span>
        {" "}
        <span className="component-card__code-str">"@joker/design-system"</span>
        ;{"  "}
        <span className="component-card__code-kw">export</span>
        {" "}
        <span className="component-card__code-kw">function</span>
        {" "}
        <span className="component-card__code-name">CoinExample</span>
        <span className="component-card__code-punct">()</span>
        {" "}
        <span className="component-card__code-punct">{"{ "}</span>
        <span className="component-card__code-return">return</span>
        {" "}
        <span className="component-card__code-punct">{"<"}</span>
        <span className="component-card__code-name">Coin</span>
        {" "}
        <span className="component-card__code-return">side</span>
        <span className="component-card__code-punct">=</span>
        <span className="component-card__code-str">"heads"</span>
        {" "}
        <span className="component-card__code-return">style</span>
        <span className="component-card__code-punct">=</span>
        <span className="component-card__code-punct">{"{{ "}</span>
        <span className="component-card__code-str">"--coin-size"</span>
        <span className="component-card__code-punct">:</span>
        {" "}
        <span className="component-card__code-str">"256px"</span>
        <span className="component-card__code-punct">{" }}"}</span>
        {" "}
        <span className="component-card__code-punct">/&gt;;</span>
        {" }"}
      </code>
    </pre>
  );
}
