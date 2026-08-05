import { useEffect, useRef, useState } from "react";
import { WinStreakRow } from "@joker/design-system";
import {
  GAMEPLAY_PREVIEW_HOLD_MS,
  GAMEPLAY_PREVIEW_INITIAL_DELAY_MS,
  GAMEPLAY_PREVIEW_PLAYBACK_MS,
  GAMEPLAY_PREVIEW_STEP_MS,
} from "../joker-originals-gameplay-preview/gameplayPreviewTiming.js";
import "./JokerOriginalsRouletteStatesPreview.css";

const WINS = [
  { betColor: "red", multiplier: "2.00x" },
  { betColor: "black", multiplier: "4.00x" },
  { betColor: "red", multiplier: "8.00x" },
  { betColor: "green", multiplier: "36.00x" },
];

/** Match coinflip gameplay preview sizing. */
const CHIP_SIZE = Math.round(88 * 1.55);
const GAP_PX = 16;
const RING_SWEEP_MS = 5200;
const RING_GLOW_MS = 3400;
const ROW_WIDTH = CHIP_SIZE * WINS.length + GAP_PX * (WINS.length - 1);
const ROW_HEIGHT = CHIP_SIZE + 14 + 30;

function syncRingPhase(root, cycleStartedAt) {
  if (!root || cycleStartedAt == null) return;

  const elapsed = performance.now() - cycleStartedAt;

  root
    .querySelectorAll(".joker-roulette-win-chip__active-sweep")
    .forEach((el) => {
      if (el.dataset.ringSynced === "1") return;
      el.style.animationDelay = `${-(elapsed % RING_SWEEP_MS)}ms`;
      el.dataset.ringSynced = "1";
    });

  root
    .querySelectorAll(".joker-roulette-win-chip__active-glow")
    .forEach((el) => {
      if (el.dataset.ringSynced === "1") return;
      el.style.animationDelay = `${-(elapsed % RING_GLOW_MS)}ms`;
      el.dataset.ringSynced = "1";
    });
}

export function JokerOriginalsRouletteStatesPreview() {
  const rootRef = useRef(null);
  const cycleStartedAtRef = useRef(null);
  const timersRef = useRef([]);
  const [cycleKey, setCycleKey] = useState(0);
  const [rowReady, setRowReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    setReducedMotion(prefersReduced);

    const schedule = (callback, delay) => {
      const timerId = window.setTimeout(callback, delay);
      timersRef.current.push(timerId);
    };

    setRowReady(false);
    cycleStartedAtRef.current = null;

    if (prefersReduced) {
      setRowReady(true);
      return;
    }

    schedule(() => {
      cycleStartedAtRef.current = performance.now();
      setRowReady(true);
    }, GAMEPLAY_PREVIEW_INITIAL_DELAY_MS);

    const loopAt =
      GAMEPLAY_PREVIEW_INITIAL_DELAY_MS +
      GAMEPLAY_PREVIEW_STEP_MS * (WINS.length - 1) +
      GAMEPLAY_PREVIEW_PLAYBACK_MS +
      GAMEPLAY_PREVIEW_HOLD_MS;

    schedule(() => setCycleKey((key) => key + 1), loopAt);

    return () => {
      timersRef.current.forEach((timerId) => window.clearTimeout(timerId));
      timersRef.current = [];
    };
  }, [cycleKey]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !rowReady || reducedMotion) return;

    const sync = () => syncRingPhase(root, cycleStartedAtRef.current);
    sync();

    const observer = new MutationObserver(sync);
    observer.observe(root, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [rowReady, cycleKey, reducedMotion]);

  return (
    <div
      ref={rootRef}
      className="joker-originals-roulette-states-preview"
      aria-label="Roulette win streak from the design system"
    >
      {rowReady ? (
        <WinStreakRow
          key={cycleKey}
          wins={WINS}
          gap={GAP_PX}
          chipSize={CHIP_SIZE}
          animateOnMount={!reducedMotion}
          staggerMs={GAMEPLAY_PREVIEW_STEP_MS}
          completedThrough={reducedMotion ? WINS.length - 1 : undefined}
        />
      ) : (
        <div
          className="joker-originals-roulette-states-preview__spacer"
          style={{ width: ROW_WIDTH, height: ROW_HEIGHT }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
