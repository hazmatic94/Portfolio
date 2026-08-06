import { useEffect, useState } from "react";
import { MinesTile } from "@joker/design-system";
import "./MinesCoveredTile.css";

const COVER_FLIP_DELAY_MS = 120;

export function MinesCoveredTile({ revealed, className = "", children }) {
  const [coverFlipped, setCoverFlipped] = useState(revealed);

  useEffect(() => {
    if (!revealed) {
      setCoverFlipped(false);
      return;
    }

    const timerId = window.setTimeout(() => {
      setCoverFlipped(true);
    }, COVER_FLIP_DELAY_MS);

    return () => window.clearTimeout(timerId);
  }, [revealed]);

  return (
    <div
      className={`mines-covered-tile${coverFlipped || revealed ? " is-active" : ""}${
        className ? ` ${className}` : ""
      }`}
    >
      <div className="mines-covered-tile__stack">
        <div className="mines-covered-tile__content">{children}</div>
        <MinesTile
          className={`mines-covered-tile__cover${coverFlipped ? " is-flipped" : ""}`}
          selected={!coverFlipped}
          playClickSound={false}
          aria-hidden
        />
      </div>
    </div>
  );
}
