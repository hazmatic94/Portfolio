import {
  Chip,
  GameCardMini,
  GameCardMiniFace,
  HiLoEllipseButton,
} from "@joker/design-system";
import "./JokerOriginalsHiloStatesPreview.css";

/*
 * Mirrors the HiLo history rail from the game shell build:
 * chip states in play order — start, multiplier, skip, loss —
 * with the prediction connectors between cards.
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
  return (
    <div
      className="joker-originals-hilo-states-preview"
      aria-label="Hilo card history states from the game shell"
    >
      {HISTORY_ENTRIES.map((entry, index) => (
        <div
          key={entry.id}
          className="joker-originals-hilo-states-preview__entry"
          style={{ "--hilo-entry-index": index }}
        >
          <Chip
            className="joker-originals-hilo-states-preview__chip"
            variant={entry.chipVariant}
          >
            {entry.chipLabel}
          </Chip>
          <div className="joker-originals-hilo-states-preview__card-wrap">
            <GameCardMini aria-label={`${entry.rank} of ${entry.suit}`}>
              <GameCardMiniFace
                color={entry.tone}
                rank={entry.rank}
                suit={entry.suit}
              />
            </GameCardMini>
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
      ))}
    </div>
  );
}
