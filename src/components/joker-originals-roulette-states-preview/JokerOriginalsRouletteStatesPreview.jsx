import { useEffect, useRef, useState } from "react";
import { WinStreakRow } from "@joker/design-system";
import {
  GAMEPLAY_PREVIEW_HOLD_MS,
  GAMEPLAY_PREVIEW_INITIAL_DELAY_MS,
  GAMEPLAY_PREVIEW_PLAYBACK_MS,
  GAMEPLAY_PREVIEW_STEP_MS,
} from "../joker-originals-gameplay-preview/gameplayPreviewTiming.js";
import {
  GAMEPLAY_PREVIEW_CHIP_SOUND_DELAY_MS,
  playGameplayWinChipSound,
} from "../joker-originals-gameplay-preview/gameplayPreviewSounds.js";
import { useGameplayPreviewMobileCompact } from "../joker-originals-gameplay-preview/useGameplayPreviewMobileCompact.js";
import "./JokerOriginalsRouletteStatesPreview.css";

const WINS = [
  { betColor: "red", multiplier: "2.00x" },
  { betColor: "black", multiplier: "4.00x" },
  { betColor: "red", multiplier: "8.00x" },
  { betColor: "green", multiplier: "36.00x" },
];

const GAP_PX = 16;
const RING_SWEEP_MS = 5200;
const RING_GLOW_MS = 3400;

function rowMetrics(wins, mobileCompact) {
  const chipSize = Math.round(88 * 1.55);
  const rowWidth = chipSize * wins.length + GAP_PX * (wins.length - 1);
  const rowHeight = chipSize + 14 + 30;
  return { chipSize, rowWidth, rowHeight };
}

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
  const mobileCompact = useGameplayPreviewMobileCompact();
  const [sequentialIndex, setSequentialIndex] = useState(0);
  const wins = mobileCompact ? [WINS[sequentialIndex]] : WINS;
  const { chipSize, rowWidth, rowHeight } = rowMetrics(wins, mobileCompact);
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
      GAMEPLAY_PREVIEW_STEP_MS * (wins.length - 1) +
      GAMEPLAY_PREVIEW_PLAYBACK_MS +
      GAMEPLAY_PREVIEW_HOLD_MS;

    schedule(() => {
      if (mobileCompact) {
        setSequentialIndex((index) => (index + 1) % WINS.length);
      }
      setCycleKey((key) => key + 1);
    }, loopAt);

    return () => {
      timersRef.current.forEach((timerId) => window.clearTimeout(timerId));
      timersRef.current = [];
    };
  }, [cycleKey, mobileCompact, wins.length]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !rowReady || reducedMotion) return;

    const sync = () => syncRingPhase(root, cycleStartedAtRef.current);
    sync();

    const observer = new MutationObserver(sync);
    observer.observe(root, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [rowReady, cycleKey, reducedMotion]);

  useEffect(() => {
    if (!rowReady || reducedMotion) return;

    const soundTimers = wins.map((_, index) =>
      window.setTimeout(
        () => playGameplayWinChipSound(),
        index * GAMEPLAY_PREVIEW_STEP_MS + GAMEPLAY_PREVIEW_CHIP_SOUND_DELAY_MS,
      ),
    );

    return () => {
      soundTimers.forEach((timerId) => window.clearTimeout(timerId));
    };
  }, [rowReady, cycleKey, reducedMotion, wins]);

  return (
    <div
      ref={rootRef}
      className={`joker-originals-roulette-states-preview${mobileCompact ? " joker-originals-roulette-states-preview--compact" : ""}`}
      aria-label="Roulette win streak from the design system"
    >
      {rowReady ? (
        <WinStreakRow
          key={mobileCompact ? `${cycleKey}-${sequentialIndex}` : cycleKey}
          wins={wins}
          gap={GAP_PX}
          chipSize={chipSize}
          animateOnMount={!reducedMotion}
          staggerMs={GAMEPLAY_PREVIEW_STEP_MS}
          completedThrough={reducedMotion ? wins.length - 1 : undefined}
        />
      ) : (
        <div
          className="joker-originals-roulette-states-preview__spacer"
          style={{
            width: rowWidth,
            height: rowHeight,
            "--win-streak-row-chip-size": `${chipSize}px`,
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
