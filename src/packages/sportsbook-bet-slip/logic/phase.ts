export type BetSlipPhase = 'stakes' | 'confirm' | 'placed';

export type BetSlipPhaseAction = 'continue' | 'back' | 'place' | 'close';

export function applyPhaseAction(
  phase: BetSlipPhase,
  action: BetSlipPhaseAction,
): BetSlipPhase | null {
  switch (phase) {
    case 'stakes':
      return action === 'continue' ? 'confirm' : null;
    case 'confirm':
      if (action === 'back') return 'stakes';
      if (action === 'place') return 'placed';
      return null;
    case 'placed':
      return action === 'close' ? 'stakes' : null;
    default:
      return null;
  }
}
