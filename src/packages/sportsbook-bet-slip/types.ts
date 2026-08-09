export type BetSlipMatchTeam = {
  name: string;
  crest?: string;
  alt?: string;
};

export type BetSlipMatch = {
  date: string;
  time: string;
  teams: [BetSlipMatchTeam, BetSlipMatchTeam];
  competition?: string;
  odds?: Array<{ label: string; odds: string }>;
};

export type { BetSlipSelection } from './logic/types';
export { createBetSlipSelectionId } from './logic/types';
