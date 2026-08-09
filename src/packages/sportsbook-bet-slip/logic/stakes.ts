import { legStakeValue } from './payout';

export type StakeState = {
  stake: string;
  legStakes: Record<string, string>;
  selectionCount: number;
};

export type StakeMutators = {
  setStake: (value: string) => void;
  setLegStake: (id: string, value: string) => void;
};

export function getStakeForSelection(selectionId: string, state: StakeState): string {
  return legStakeValue(selectionId, state.selectionCount, state.stake, state.legStakes);
}

export function setStakeForSelection(
  selectionId: string,
  value: string,
  state: StakeState,
  mutators: StakeMutators,
) {
  if (state.selectionCount === 1) {
    mutators.setStake(value);
    return;
  }

  mutators.setLegStake(selectionId, value);
}
