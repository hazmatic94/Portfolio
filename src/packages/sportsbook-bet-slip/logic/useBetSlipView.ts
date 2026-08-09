import type { BetSlipPhase } from './phase';

export type BetSlipView = 'single' | 'stacked' | 'expanded' | 'confirm' | 'placed';

type UseBetSlipViewInput = {
  selectionCount: number;
  phase: BetSlipPhase;
  expanded: boolean;
};

export function useBetSlipView({ selectionCount, phase, expanded }: UseBetSlipViewInput) {
  const isPlaced = phase === 'placed';
  const isConfirm = phase === 'confirm';
  const isStacked = selectionCount > 1;

  const view: BetSlipView = isPlaced
    ? 'placed'
    : isStacked && expanded
      ? 'expanded'
      : isStacked
        ? 'stacked'
        : isConfirm
          ? 'confirm'
          : 'single';

  return {
    view,
    isPlaced,
    isConfirm,
    isStacked,
  };
}
