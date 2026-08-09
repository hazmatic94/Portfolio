import type { BetSlipSelection } from './types';

export function formatStackedLeg(selection: BetSlipSelection) {
  const { teamName, marketType, selection: pick, odds } = selection;

  let label = pick;
  if (marketType === 'Asian Handicap') {
    label = `handicap ${pick}`;
  }

  return `${teamName} - ${label} @${odds}`;
}
