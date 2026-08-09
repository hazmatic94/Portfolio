import type { BetSlipMatch } from '../types';

export function formatMatchup(match: BetSlipMatch) {
  return `${match.teams[0].name} v ${match.teams[1].name}`;
}

export function getMatchBetSlipKey(match: BetSlipMatch) {
  const [home, away] = match.teams;
  return `${match.date}::${match.time}::${home.name}::${away.name}`;
}
