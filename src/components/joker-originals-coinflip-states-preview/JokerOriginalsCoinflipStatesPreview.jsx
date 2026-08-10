import { useEffect, useMemo, useRef, useState } from "react";
import { Coin, CoinProgression } from "@joker/design-system";
import {
  GAMEPLAY_PREVIEW_BETWEEN_STEPS_MS,
  GAMEPLAY_PREVIEW_HOLD_MS,
  GAMEPLAY_PREVIEW_INITIAL_DELAY_MS,
  GAMEPLAY_PREVIEW_STEP_MS,
} from "../joker-originals-gameplay-preview/gameplayPreviewTiming.js";
import {
  GAMEPLAY_PREVIEW_CHIP_SOUND_DELAY_MS,
  playGameplayWinChipSound,
} from "../joker-originals-gameplay-preview/gameplayPreviewSounds.js";
import { useGameplayPreviewMobileCompact } from "../joker-originals-gameplay-preview/useGameplayPreviewMobileCompact.js";
import "./JokerOriginalsCoinflipStatesPreview.css";

const STEPS = [
  { multiplier: "1.25x", side: "heads" },
  { multiplier: "1.57x", side: "tails" },
  { multiplier: "2.00x", side: "heads" },
  { multiplier: "2.50x", side: "heads" },
];

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
  const mobileCompact = useGameplayPreviewMobileCompact();
  const [sequentialIndex, setSequentialIndex] = useState(0);
  const steps = useMemo(
    () => (mobileCompact ? [STEPS[sequentialIndex]] : STEPS),
    [mobileCompact, sequentialIndex],
  );
  const receiverSize = Math.round(88 * 1.55);
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
      setActiveIndex(steps.length - 1);
      setCompletedThrough(steps.length - 1);
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

    steps.forEach((_, index) => {
      schedule(
        () => playGameplayWinChipSound(),
        GAMEPLAY_PREVIEW_INITIAL_DELAY_MS +
          index * GAMEPLAY_PREVIEW_STEP_MS +
          GAMEPLAY_PREVIEW_CHIP_SOUND_DELAY_MS,
      );
    });

    return () => {
      timersRef.current.forEach((timerId) => window.clearTimeout(timerId));
      timersRef.current = [];
    };
  }, [cycleKey, mobileCompact, sequentialIndex, steps.length]);

  useEffect(() => {
    if (lockingIndex == null) return;

    const frame = window.requestAnimationFrame(() => {
      syncRingPhase(rootRef.current, cycleStartedAtRef.current);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [lockingIndex, completedThrough]);

  const handleLockComplete = (index) => {
    const nextIndex = index + 1;
    setCompletedThrough(index);
    setLockingIndex(null);

    if (nextIndex >= steps.length) {
      setActiveIndex(steps.length - 1);
      schedule(() => {
        if (mobileCompact) {
          setSequentialIndex((current) => (current + 1) % STEPS.length);
        }
        setCycleKey((key) => key + 1);
      }, GAMEPLAY_PREVIEW_HOLD_MS);
      return;
    }

    setActiveIndex(nextIndex);
    schedule(
      () => setLockingIndex(nextIndex),
      GAMEPLAY_PREVIEW_BETWEEN_STEPS_MS,
    );
  };

  return (
    <div
      ref={rootRef}
      className={`joker-originals-coinflip-states-preview${mobileCompact ? " joker-originals-coinflip-states-preview--compact" : ""}`}
      aria-label="Coin flip progression from the design system"
    >
      <div className="joker-coin-progression-demo">
        <CoinProgression
          key={mobileCompact ? `${cycleKey}-${sequentialIndex}` : cycleKey}
          steps={steps}
          activeIndex={activeIndex}
          completedThrough={completedThrough}
          lockingIndex={lockingIndex}
          receiverSize={receiverSize}
          gap={GAP_PX}
          onLockComplete={handleLockComplete}
          renderCoin={(index) => <Coin side={steps[index].side} />}
        />
      </div>
    </div>
  );
}
