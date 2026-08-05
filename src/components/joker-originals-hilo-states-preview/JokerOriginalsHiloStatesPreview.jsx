import { useEffect, useRef, useState } from "react";
import {
  Chip,
  GameCardMini,
  GameCardMiniFace,
  HiLoEllipseButton,
} from "@joker/design-system";
import {
  GAMEPLAY_PREVIEW_BETWEEN_STEPS_MS,
  GAMEPLAY_PREVIEW_HOLD_MS,
  GAMEPLAY_PREVIEW_INITIAL_DELAY_MS,
  GAMEPLAY_PREVIEW_PLAYBACK_MS,
} from "../joker-originals-gameplay-preview/gameplayPreviewTiming.js";
import "./JokerOriginalsHiloStatesPreview.css";

/*
 * Mirrors the HiLo history rail from the game shell build:
 * chip states in play order — start, multiplier, skip, loss —
 * with the prediction connectors between cards.
 *
 * Playback matches CoinProgression / RouletteWinChip:
 * card scale-in → chip lift → connector enter → next card.
 */
const HISTORY_ENTRIES = [
  {
    id: "start",
    chipVariant: "start",
    chipLabel: undefined,
    rank: "7",
    suit: "hearts",
    tone: "red",
    connector: "higher",
  },
  {
    id: "multiplier",
    chipVariant: "win",
    chipLabel: "1.31x",
    rank: "10",
    suit: "spades",
    tone: "black",
    connector: "skip",
  },
  {
    id: "skip",
    chipVariant: "skip",
    chipLabel: undefined,
    rank: "4",
    suit: "diamonds",
    tone: "red",
    connector: "lower",
  },
  {
    id: "loss",
    chipVariant: "loss",
    chipLabel: "0.00x",
    rank: "K",
    suit: "clubs",
    tone: "black",
    connector: null,
  },
];

export function JokerOriginalsHiloStatesPreview() {
  const timersRef = useRef([]);
  const [cycleKey, setCycleKey] = useState(0);
  const [completedThrough, setCompletedThrough] = useState(-1);
  const [playingIndex, setPlayingIndex] = useState(null);

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
      setCompletedThrough(HISTORY_ENTRIES.length - 1);
      setPlayingIndex(null);
      return;
    }

    setCompletedThrough(-1);
    setPlayingIndex(null);

    schedule(() => setPlayingIndex(0), GAMEPLAY_PREVIEW_INITIAL_DELAY_MS);

    return () => {
      timersRef.current.forEach((timerId) => window.clearTimeout(timerId));
      timersRef.current = [];
    };
  }, [cycleKey]);

  useEffect(() => {
    if (playingIndex == null) return;

    const completeTimer = window.setTimeout(() => {
      const nextIndex = playingIndex + 1;
      setCompletedThrough(playingIndex);
      setPlayingIndex(null);

      if (nextIndex >= HISTORY_ENTRIES.length) {
        schedule(() => setCycleKey((key) => key + 1), GAMEPLAY_PREVIEW_HOLD_MS);
        return;
      }

      schedule(() => setPlayingIndex(nextIndex), GAMEPLAY_PREVIEW_BETWEEN_STEPS_MS);
    }, GAMEPLAY_PREVIEW_PLAYBACK_MS);

    timersRef.current.push(completeTimer);
    return () => window.clearTimeout(completeTimer);
  }, [playingIndex]);

  return (
    <div
      className="joker-originals-hilo-states-preview"
      aria-label="Hilo card history states from the game shell"
    >
      {HISTORY_ENTRIES.map((entry, index) => {
        const isPlaying = playingIndex === index;
        const isSettled = index <= completedThrough && !isPlaying;
        const show = isPlaying || index <= completedThrough;

        return (
          <div
            key={entry.id}
            className="joker-originals-hilo-states-preview__slot"
            style={{ "--hilo-entry-index": index }}
          >
            {show ? (
              <div
                key={`${entry.id}-${cycleKey}`}
                className={[
                  "joker-originals-hilo-states-preview__entry",
                  isPlaying ? "is-playing" : "",
                  isSettled ? "is-settled" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-hidden={!show}
              >
                <Chip
                  className="joker-originals-hilo-states-preview__chip"
                  variant={entry.chipVariant}
                >
                  {entry.chipLabel}
                </Chip>
                <div className="joker-originals-hilo-states-preview__card-wrap">
                  <div className="joker-originals-hilo-states-preview__card-stage">
                    <GameCardMini aria-label={`${entry.rank} of ${entry.suit}`}>
                      <GameCardMiniFace
                        color={entry.tone}
                        rank={entry.rank}
                        suit={entry.suit}
                      />
                    </GameCardMini>
                  </div>
                  {entry.connector ? (
                    <HiLoEllipseButton
                      aria-hidden="true"
                      className="joker-originals-hilo-states-preview__connector"
                      disabled
                      tabIndex={-1}
                      type="button"
                      variant={entry.connector}
                    />
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
