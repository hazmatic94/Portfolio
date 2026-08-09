export type BetSlipSelection = {
  id: string;
  matchKey: string;
  teamName: string;
  odds: string;
  marketType: string;
  selection: string;
  matchup: string;
};

export function createBetSlipSelectionId(
  matchKey: string,
  marketType: string,
  pickKey: string,
) {
  return `${matchKey}::${marketType}::${pickKey}`;
}
