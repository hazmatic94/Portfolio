import { useEffect, useRef, useState } from "react";
import { MinesTile, WinTile } from "@joker/design-system";
import { formatMinesRevealMultiplier } from "./minesRevealMultiplier.js";
import "./JokerOriginalsMinesInteractivePreview.css";

const COVER_FLIP_DELAY_MS = 120;
const WIN_EXPOSE_MS = 2000;
const RESET_BLUR_MS = 220;
const RESET_SNAP_MS = 80;

export function JokerOriginalsMinesInteractivePreview({ minesCount = "1" }) {
  const [coverFlipped, setCoverFlipped] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [cycleKey, setCycleKey] = useState(0);
  const timersRef = useRef([]);

  const multiplier = formatMinesRevealMultiplier(minesCount);

  const clearTimers = () => {
    timersRef.current.forEach((timerId) => window.clearTimeout(timerId));
    timersRef.current = [];
  };

  const schedule = (callback, delay) => {
    const timerId = window.setTimeout(callback, delay);
    timersRef.current.push(timerId);
  };

  const resetToIdle = () => {
    clearTimers();
    setCoverFlipped(false);
    setRevealed(false);
    setIsResetting(false);
    setCycleKey((key) => key + 1);
  };

  useEffect(() => () => clearTimers(), []);

  useEffect(() => {
    resetToIdle();
  }, [minesCount]);

  const startResetSequence = () => {
    setIsResetting(true);

    schedule(() => {
      setRevealed(false);
      setCoverFlipped(false);
      setCycleKey((key) => key + 1);
    }, RESET_BLUR_MS);

    schedule(() => {
      setIsResetting(false);
    }, RESET_BLUR_MS + RESET_SNAP_MS);
  };

  const revealGold = () => {
    if (coverFlipped || revealed || isResetting) {
      return;
    }

    clearTimers();
    setCoverFlipped(true);

    schedule(() => {
      setRevealed(true);
      schedule(startResetSequence, WIN_EXPOSE_MS);
    }, COVER_FLIP_DELAY_MS);
  };

  return (
    <div
      className={`joker-originals-mines-interactive-preview${
        isResetting ? " is-resetting" : ""
      }${coverFlipped || revealed ? " is-active" : ""}`}
      aria-label="Interactive mines tile preview"
    >
      <div className="joker-originals-mines-interactive-preview__stage">
        <div className="mines-gold-flip-demo joker-originals-mines-interactive-preview__flip">
          <div className="mines-gold-flip-demo__stack joker-originals-mines-interactive-preview__stack">
            <WinTile
              key={cycleKey}
              className="mines-gold-flip-demo__win joker-originals-mines-interactive-preview__win"
              revealed={revealed}
              multiplier={multiplier}
              soundOnReveal={false}
            />
            <MinesTile
              className={`mines-gold-flip-demo__cover joker-originals-mines-interactive-preview__cover${
                coverFlipped ? " is-flipped" : ""
              }`}
              selected={!coverFlipped}
              playClickSound={false}
              role={coverFlipped ? undefined : "button"}
              tabIndex={coverFlipped ? -1 : 0}
              aria-hidden={coverFlipped || undefined}
              aria-label={coverFlipped ? undefined : "Reveal mine tile"}
              onClick={coverFlipped ? undefined : revealGold}
              onKeyDown={(event) => {
                if (coverFlipped || isResetting || (event.key !== "Enter" && event.key !== " ")) {
                  return;
                }

                event.preventDefault();
                revealGold();
              }}
            />
          </div>
        </div>
      </div>
      <span className="case-study-text__chip joker-originals-mines-interactive-preview__chip">
        Interactive
      </span>
    </div>
  );
}
