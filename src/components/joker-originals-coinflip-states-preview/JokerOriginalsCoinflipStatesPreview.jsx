import { useEffect, useRef, useState } from "react";
import { Coin, CoinProgression } from "@joker/design-system";
import {
  GAMEPLAY_PREVIEW_BETWEEN_STEPS_MS,
  GAMEPLAY_PREVIEW_HOLD_MS,
  GAMEPLAY_PREVIEW_INITIAL_DELAY_MS,
} from "../joker-originals-gameplay-preview/gameplayPreviewTiming.js";
import "./JokerOriginalsCoinflipStatesPreview.css";

const STEPS = [
  { multiplier: "1.25x", side: "heads" },
  { multiplier: "1.57x", side: "tails" },
  { multiplier: "2.00x", side: "heads" },
  { multiplier: "2.50x", side: "heads" },
];

/** Default DS receiver is 88px; sized up for the 540px gameplay frame. */
const RECEIVER_SIZE = Math.round(88 * 1.55);
const GAP_PX = 16;
const RING_SWEEP_MS = 5200;
const RING_GLOW_MS = 3400;

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

export function JokerOriginalsCoinflipStatesPreview() {
  const rootRef = useRef(null);
  const cycleStartedAtRef = useRef(null);
  const timersRef = useRef([]);
  const [cycleKey, setCycleKey] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [completedThrough, setCompletedThrough] = useState(-1);
  const [lockingIndex, setLockingIndex] = useState(null);

  const schedule = (callback, delay) => {
    const timerId = window.setTimeout(callback, delay);
    timersRef.current.push(timerId);
    return timerId;
  };

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      setActiveIndex(STEPS.length - 1);
      setCompletedThrough(STEPS.length - 1);
      setLockingIndex(null);
      return;
    }

    setActiveIndex(0);
    setCompletedThrough(-1);
    setLockingIndex(null);
    cycleStartedAtRef.current = null;

    schedule(() => {
      cycleStartedAtRef.current = performance.now();
      setLockingIndex(0);
    }, GAMEPLAY_PREVIEW_INITIAL_DELAY_MS);

    return () => {
      timersRef.current.forEach((timerId) => window.clearTimeout(timerId));
      timersRef.current = [];
    };
  }, [cycleKey]);

  useEffect(() => {
    if (lockingIndex == null) return;

    const frame = window.requestAnimationFrame(() => {
      syncRingPhase(rootRef.current, cycleStartedAtRef.current);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [lockingIndex, completedThrough]);

  return (
    <div
      ref={rootRef}
      className="joker-originals-coinflip-states-preview"
      aria-label="Coin flip progression from the design system"
    >
      <div className="joker-coin-progression-demo">
        <CoinProgression
          steps={STEPS}
          activeIndex={activeIndex}
          completedThrough={completedThrough}
          lockingIndex={lockingIndex}
          receiverSize={RECEIVER_SIZE}
          gap={GAP_PX}
          onLockComplete={(index) => {
            const nextIndex = index + 1;
            setCompletedThrough(index);
            setLockingIndex(null);

            if (nextIndex >= STEPS.length) {
              setActiveIndex(STEPS.length - 1);
              schedule(() => setCycleKey((key) => key + 1), GAMEPLAY_PREVIEW_HOLD_MS);
              return;
            }

            setActiveIndex(nextIndex);
            schedule(
              () => setLockingIndex(nextIndex),
              GAMEPLAY_PREVIEW_BETWEEN_STEPS_MS,
            );
          }}
          renderCoin={(index) => <Coin side={STEPS[index].side} />}
        />
      </div>
    </div>
  );
}
