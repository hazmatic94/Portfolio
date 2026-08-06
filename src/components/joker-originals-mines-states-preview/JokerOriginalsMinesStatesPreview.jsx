import { useEffect, useRef, useState } from "react";
import { LossTile, SafeTile, WinTile } from "@joker/design-system";
import {
  GAMEPLAY_PREVIEW_HOLD_MS,
  GAMEPLAY_PREVIEW_INITIAL_DELAY_MS,
  GAMEPLAY_PREVIEW_STEP_MS,
} from "../joker-originals-gameplay-preview/gameplayPreviewTiming.js";
import "./JokerOriginalsMinesStatesPreview.css";

export function JokerOriginalsMinesStatesPreview() {
  const [cycleKey, setCycleKey] = useState(0);
  const [firstWinRevealed, setFirstWinRevealed] = useState(false);
  const [safeRevealed, setSafeRevealed] = useState(false);
  const [secondWinRevealed, setSecondWinRevealed] = useState(false);
  const [lossRevealed, setLossRevealed] = useState(false);
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
      return;
    }

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

    const loopAt =
      firstWinAt + GAMEPLAY_PREVIEW_STEP_MS * 3 + GAMEPLAY_PREVIEW_HOLD_MS;
    schedule(() => setCycleKey((key) => key + 1), loopAt);

    return () => {
      timersRef.current.forEach((timerId) => window.clearTimeout(timerId));
      timersRef.current = [];
    };
  }, [cycleKey]);

  return (
    <div
      className="joker-originals-mines-states-preview"
      aria-label="Mines tile run from the design system"
    >
      <WinTile
        key={`win-a-${cycleKey}`}
        revealed={firstWinRevealed}
        multiplier="1.25x"
        soundOnReveal={false}
      />
      <SafeTile
        key={`safe-${cycleKey}`}
        revealed={safeRevealed}
      />
      <WinTile
        key={`win-b-${cycleKey}`}
        revealed={secondWinRevealed}
        multiplier="1.57x"
        soundOnReveal={false}
      />
      <LossTile
        key={`loss-${cycleKey}`}
        revealed={lossRevealed}
        soundOnReveal={false}
      />
    </div>
  );
}
