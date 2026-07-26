import { useState } from "react";
import "./TokenCopyChip.css";

const COPY_FEEDBACK_MS = 1400;

async function copyText(value) {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    return false;
  }
}

export function TokenCopyChip({ children, copyValue }) {
  const [copied, setCopied] = useState(false);
  const value = copyValue ?? children;

  async function handleClick(event) {
    event.stopPropagation();

    const didCopy = await copyText(value);
    if (!didCopy) return;

    setCopied(true);
    window.setTimeout(() => setCopied(false), COPY_FEEDBACK_MS);
  }

  return (
    <button
      type="button"
      className={`token-copy-chip token-copy-chip--copy${copied ? " is-copied" : ""}`}
      data-copy-value={value}
      aria-label={copied ? "Copied" : `Copy ${value}`}
      onClick={handleClick}
    >
      {copied ? "Copied" : children}
    </button>
  );
}
