export function ComponentCardCodeBlock({ children }) {
  return (
    <pre>
      <code>{children}</code>
    </pre>
  );
}

export function CodeKw({ children }) {
  return <span className="syntax-keyword">{children}</span>;
}

export function CodeStr({ children }) {
  return <span className="syntax-string">{children}</span>;
}

export function CodeImportName({ children }) {
  return <span>{children}</span>;
}

export function CodeTag({ children }) {
  return <span className="syntax-tag">{children}</span>;
}

export function CodeAttr({ children }) {
  return <span className="syntax-attribute">{children}</span>;
}

export function CodeFn({ children }) {
  return <span className="syntax-function">{children}</span>;
}

export function CodeProp({ children }) {
  return <span className="syntax-property">{children}</span>;
}

export function CodeComment({ children }) {
  return <span className="syntax-comment">{children}</span>;
}

export function CodePunct({ children }) {
  return <span>{children}</span>;
}

/** @deprecated Use CodeImportName, CodeTag, or CodeAttr */
export function CodeName({ children }) {
  return <span>{children}</span>;
}

/** @deprecated Use CodeAttr */
export function CodeReturn({ children }) {
  return <span className="syntax-attribute">{children}</span>;
}
