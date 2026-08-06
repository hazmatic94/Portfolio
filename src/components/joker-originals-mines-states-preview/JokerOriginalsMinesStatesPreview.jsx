import { useEffect, useRef, useState } from "react";
import { LossTile, SafeTile, WinTile } from "@joker/design-system";
import {
  GAMEPLAY_PREVIEW_INITIAL_DELAY_MS,
  GAMEPLAY_PREVIEW_RESET_FADE_MS,
  GAMEPLAY_PREVIEW_RESET_SNAP_MS,
  GAMEPLAY_PREVIEW_STEP_MS,
  GAMEPLAY_PREVIEW_WIN_HOLD_MS,
} from "../joker-originals-gameplay-preview/gameplayPreviewTiming.js";
import { MinesCoveredTile } from "./MinesCoveredTile.jsx";
import "./JokerOriginalsMinesStatesPreview.css";

export function JokerOriginalsMinesStatesPreview() {
  const [cycleKey, setCycleKey] = useState(0);
  const [firstWinRevealed, setFirstWinRevealed] = useState(false);
  const [safeRevealed, setSafeRevealed] = useState(false);
  const [secondWinRevealed, setSecondWinRevealed] = useState(false);
  const [lossRevealed, setLossRevealed] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const timersRef = useRef([]);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      setFirstWinRevealed(true);
      setSafeRevealed(true);
      setSecondWinRevealed(true);
      setLossRevealed(true);
      setIsResetting(false);
      return;
    }

    setIsResetting(false);
    setFirstWinRevealed(false);
    setSafeRevealed(false);
    setSecondWinRevealed(false);
    setLossRevealed(false);

    const schedule = (callback, delay) => {
      const timerId = window.setTimeout(callback, delay);
      timersRef.current.push(timerId);
    };

    const firstWinAt = GAMEPLAY_PREVIEW_INITIAL_DELAY_MS;
    schedule(() => setFirstWinRevealed(true), firstWinAt);
    schedule(() => setSafeRevealed(true), firstWinAt + GAMEPLAY_PREVIEW_STEP_MS);
    schedule(
      () => setSecondWinRevealed(true),
      firstWinAt + GAMEPLAY_PREVIEW_STEP_MS * 2,
    );
    schedule(
      () => setLossRevealed(true),
      firstWinAt + GAMEPLAY_PREVIEW_STEP_MS * 3,
    );

    const allRevealedAt = firstWinAt + GAMEPLAY_PREVIEW_STEP_MS * 3;
    const resetStartAt = allRevealedAt + GAMEPLAY_PREVIEW_WIN_HOLD_MS;

    schedule(() => setIsResetting(true), resetStartAt);
    schedule(() => {
      setFirstWinRevealed(false);
      setSafeRevealed(false);
      setSecondWinRevealed(false);
      setLossRevealed(false);
      setCycleKey((key) => key + 1);
    }, resetStartAt + GAMEPLAY_PREVIEW_RESET_FADE_MS);
    schedule(
      () => setIsResetting(false),
      resetStartAt + GAMEPLAY_PREVIEW_RESET_FADE_MS + GAMEPLAY_PREVIEW_RESET_SNAP_MS,
    );

    return () => {
      timersRef.current.forEach((timerId) => window.clearTimeout(timerId));
      timersRef.current = [];
    };
  }, [cycleKey]);

  return (
    <div
      className={`joker-originals-mines-states-preview${
        isResetting ? " is-resetting" : ""
      }`}
      aria-label="Mines tile run from the design system"
    >
      <div className="joker-originals-mines-states-preview__stage">
        <MinesCoveredTile revealed={firstWinRevealed}>
          <WinTile
            key={`win-a-${cycleKey}`}
            revealed={firstWinRevealed}
            multiplier="1.25x"
            soundOnReveal={false}
          />
        </MinesCoveredTile>
        <MinesCoveredTile revealed={safeRevealed}>
          <SafeTile
            key={`safe-${cycleKey}`}
            revealed={safeRevealed}
          />
        </MinesCoveredTile>
        <MinesCoveredTile revealed={secondWinRevealed}>
          <WinTile
            key={`win-b-${cycleKey}`}
            revealed={secondWinRevealed}
            multiplier="1.57x"
            soundOnReveal={false}
          />
        </MinesCoveredTile>
        <MinesCoveredTile revealed={lossRevealed}>
          <LossTile
            key={`loss-${cycleKey}`}
            revealed={lossRevealed}
            soundOnReveal={false}
          />
        </MinesCoveredTile>
      </div>
    </div>
  );
}
