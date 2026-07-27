import { useEffect, useRef, useState } from "react";
import "./CodePanelCopyButton.css";

const COPY_FEEDBACK_MS = 1400;

async function copyText(value) {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    try {
      const textarea = document.createElement("textarea");
      textarea.value = value;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      const copied = document.execCommand("copy");
      document.body.removeChild(textarea);
      return copied;
    } catch {
      return false;
    }
  }
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="9" y="9" width="11" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path
        d="M7 15H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v1"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}

export function CodePanelCopyButton({ value, copyLabel }) {
  const [copied, setCopied] = useState(false);
  const resetTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) {
        window.clearTimeout(resetTimeoutRef.current);
      }
    };
  }, []);

  async function handleCopy(event) {
    event.stopPropagation();

    const didCopy = await copyText(value);
    if (!didCopy) {
      return;
    }

    setCopied(true);
    if (resetTimeoutRef.current) {
      window.clearTimeout(resetTimeoutRef.current);
    }
    resetTimeoutRef.current = window.setTimeout(() => setCopied(false), COPY_FEEDBACK_MS);
  }

  return (
    <button
      type="button"
      className={`code-action-button code-panel-copy-button${copied ? " is-copied" : ""}`}
      aria-label={copied ? "Copied" : copyLabel}
      onClick={handleCopy}
    >
      {copied ? (
        <span className="code-panel-copy-button__label">Copied</span>
      ) : (
        <span className="copy-icon" aria-hidden="true">
          <CopyIcon />
        </span>
      )}
    </button>
  );
}
