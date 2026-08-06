const BOARD_SIZE = 25;

export function formatMinesRevealMultiplier(minesCount) {
  const mines = Number.parseInt(String(minesCount), 10);

  if (!Number.isFinite(mines) || mines < 1 || mines >= BOARD_SIZE) {
    return "1.04x";
  }

  return `${(BOARD_SIZE / (BOARD_SIZE - mines)).toFixed(2)}x`;
}
