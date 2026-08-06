import { useEffect, useRef, useState } from "react";
import {
  GameHeaderRail,
  LossTile,
  MinesTile,
  WinTile,
} from "@joker/design-system";
import "./MinesGameLayoutPreview.css";

const COLUMNS = 4;
const ROWS = 5;
const TILE_COUNT = COLUMNS * ROWS;
const MINES_COUNT = 4;
const MINES_RTP = 0.96;
const LOSS_RESET_MS = 1600;
const MINES_GAME = { label: "Mines", icon: "mines" };

function createBoard(minesCount) {
  const indexes = Array.from({ length: TILE_COUNT }, (_, index) => index);
  for (let i = indexes.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
  }

  const mines = new Set(indexes.slice(0, minesCount));
  return Array.from({ length: TILE_COUNT }, (_, index) =>
    mines.has(index) ? "dynamite" : "gold",
  );
}

function calculateMultiplier(revealedSafeCount) {
  if (revealedSafeCount <= 0) {
    return 1;
  }

  const safeTiles = TILE_COUNT - MINES_COUNT;
  const effective = Math.min(revealedSafeCount, safeTiles);
  let fair = 1;

  for (let index = 0; index < effective; index += 1) {
    fair *= (TILE_COUNT - index) / (TILE_COUNT - MINES_COUNT - index);
  }

  return fair * MINES_RTP;
}

function BoardTile({
  content,
  freshReveal,
  gameActive,
  multiplierLabel,
  onClick,
  revealed,
  stackIndex,
  tileId,
}) {
  const [showRevealed, setShowRevealed] = useState(revealed && !freshReveal);

  useEffect(() => {
    if (!revealed) {
      setShowRevealed(false);
      return;
    }

    if (freshReveal) {
      setShowRevealed(false);
      const frameId = window.requestAnimationFrame(() => {
        setShowRevealed(true);
      });
      return () => window.cancelAnimationFrame(frameId);
    }

    setShowRevealed(true);
  }, [freshReveal, revealed]);

  if (!revealed) {
    return (
      <MinesTile
        className="mines-game-layout-preview__tile"
        aria-label={`Reveal tile ${tileId}`}
        onClick={gameActive ? onClick : undefined}
        playClickSound={false}
        role="button"
        selected={gameActive}
        stackIndex={stackIndex}
        tabIndex={gameActive ? 0 : -1}
      />
    );
  }

  if (content === "dynamite") {
    return (
      <LossTile
        className="mines-game-layout-preview__tile"
        aria-label={`Tile ${tileId}: dynamite`}
        defaultRevealed={false}
        revealed={showRevealed}
        soundOnReveal={false}
        stackIndex={stackIndex}
      />
    );
  }

  return (
    <WinTile
      className="mines-game-layout-preview__tile"
      aria-label={`Tile ${tileId}: gold`}
      defaultRevealed={false}
      revealed={showRevealed}
      multiplier={freshReveal ? multiplierLabel : undefined}
      soundOnReveal={false}
      stackIndex={stackIndex}
    />
  );
}

export function MinesGameLayoutPreview() {
  const [board, setBoard] = useState(() => createBoard(MINES_COUNT));
  const [revealedTiles, setRevealedTiles] = useState([]);
  const [freshRevealedTiles, setFreshRevealedTiles] = useState([]);
  const [roundStatus, setRoundStatus] = useState("active");
  const [cycleKey, setCycleKey] = useState(0);
  const resetTimerRef = useRef(0);

  const gameActive = roundStatus === "active";
  const safeReveals = revealedTiles.filter(
    (index) => board[index] !== "dynamite",
  ).length;
  const multiplier = calculateMultiplier(safeReveals);
  const multiplierLabel = `${multiplier.toFixed(2)}x`;

  useEffect(
    () => () => {
      window.clearTimeout(resetTimerRef.current);
    },
    [],
  );

  const resetRound = () => {
    window.clearTimeout(resetTimerRef.current);
    setBoard(createBoard(MINES_COUNT));
    setRevealedTiles([]);
    setFreshRevealedTiles([]);
    setRoundStatus("active");
    setCycleKey((key) => key + 1);
  };

  const handleTileClick = (index) => {
    if (!gameActive || revealedTiles.includes(index)) {
      return;
    }

    const content = board[index];
    const nextRevealed = [...revealedTiles, index];
    setRevealedTiles(nextRevealed);
    setFreshRevealedTiles([index]);

    if (content === "dynamite") {
      setRoundStatus("lost");
      window.clearTimeout(resetTimerRef.current);
      resetTimerRef.current = window.setTimeout(resetRound, LOSS_RESET_MS);
      return;
    }

    const nextSafe = nextRevealed.filter((tile) => board[tile] !== "dynamite")
      .length;
    if (nextSafe >= TILE_COUNT - MINES_COUNT) {
      setRoundStatus("won");
      window.clearTimeout(resetTimerRef.current);
      resetTimerRef.current = window.setTimeout(resetRound, LOSS_RESET_MS);
    }
  };

  return (
    <div
      className={`mines-game-layout-preview${
        roundStatus === "lost" ? " is-round-lost" : ""
      }`}
      aria-label="Interactive Mines mobile game layout"
    >
      <div className="mines-game-layout-preview__content" key={cycleKey}>
        <GameHeaderRail game={MINES_GAME} />
        <div className="mines-game-layout-preview__stage">
          <div
            className="mines-game-layout-preview__grid"
            style={{
              "--mines-grid-columns": COLUMNS,
              "--mines-grid-rows": ROWS,
            }}
          >
            {board.map((content, index) => {
              const revealed = revealedTiles.includes(index);
              const freshReveal = freshRevealedTiles.includes(index);

              return (
                <div
                  key={index}
                  className={`mines-game-layout-preview__cell${
                    revealed ? " is-revealed" : ""
                  }`}
                >
                  <BoardTile
                    content={content}
                    freshReveal={freshReveal}
                    gameActive={gameActive}
                    multiplierLabel={multiplierLabel}
                    onClick={() => handleTileClick(index)}
                    revealed={revealed}
                    stackIndex={TILE_COUNT - index}
                    tileId={index + 1}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="mines-game-layout-preview__fade" aria-hidden="true" />
    </div>
  );
}
