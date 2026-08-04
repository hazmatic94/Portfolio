import { useEffect, useRef, useState } from "react";
import { LossTile, MinesTile, SafeTile, WinTile } from "@joker/design-system";
import "./JokerOriginalsMinesStatesPreview.css";

const INITIAL_DELAY_MS = 480;
const STEP_MS = 1000;
const HOLD_AFTER_SEQUENCE_MS = 3200;
const MINES_PULSE_MS = 280;
const AFTER_MINES_GAP_MS = 240;

export function JokerOriginalsMinesStatesPreview() {
  const [cycleKey, setCycleKey] = useState(0);
  const [minesPulse, setMinesPulse] = useState(false);
  const [winRevealed, setWinRevealed] = useState(false);
  const [safeRevealed, setSafeRevealed] = useState(false);
  const [lossRevealed, setLossRevealed] = useState(false);
  const timersRef = useRef([]);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      setWinRevealed(true);
      setSafeRevealed(true);
      setLossRevealed(true);
      return;
    }

    setMinesPulse(false);
    setWinRevealed(false);
    setSafeRevealed(false);
    setLossRevealed(false);

    const schedule = (callback, delay) => {
      const timerId = window.setTimeout(callback, delay);
      timersRef.current.push(timerId);
    };

    schedule(() => setMinesPulse(true), INITIAL_DELAY_MS);
    schedule(() => setMinesPulse(false), INITIAL_DELAY_MS + MINES_PULSE_MS);

    const winAt = INITIAL_DELAY_MS + MINES_PULSE_MS + AFTER_MINES_GAP_MS;
    schedule(() => setWinRevealed(true), winAt);
    schedule(() => setSafeRevealed(true), winAt + STEP_MS);
    schedule(() => setLossRevealed(true), winAt + STEP_MS * 2);

    const loopAt = winAt + STEP_MS * 2 + 1200 + HOLD_AFTER_SEQUENCE_MS;
    schedule(() => setCycleKey((key) => key + 1), loopAt);

    return () => {
      timersRef.current.forEach((timerId) => window.clearTimeout(timerId));
      timersRef.current = [];
    };
  }, [cycleKey]);

  return (
    <div
      className="joker-originals-mines-states-preview"
      aria-label="Mines tile states from the design system"
    >
      <MinesTile
        key={`mines-${cycleKey}`}
        className={
          minesPulse
            ? "joker-originals-mines-states-preview__mines--pulse"
            : undefined
        }
      />
      <WinTile key={`win-${cycleKey}`} revealed={winRevealed} />
      <SafeTile key={`safe-${cycleKey}`} revealed={safeRevealed} />
      <LossTile key={`loss-${cycleKey}`} revealed={lossRevealed} />
    </div>
  );
}
