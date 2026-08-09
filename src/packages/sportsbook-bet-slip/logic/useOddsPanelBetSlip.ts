import { useCallback } from 'react';
import type { BetSlipMatch } from '../types';
import { useBetSlip } from './BetSlipContext';
import { formatMatchup, getMatchBetSlipKey } from './matchup';
import { createBetSlipSelectionId, type BetSlipSelection } from './types';

type OddsPickInput = {
  pickKey: string;
  teamName: string;
  odds: string;
  marketType: string;
  selection: string;
};

export function useOddsPanelBetSlip(match: BetSlipMatch) {
  const { selections, toggleSelection } = useBetSlip();
  const matchup = formatMatchup(match);
  const matchKey = getMatchBetSlipKey(match);

  const pickOdds = useCallback(
    (pick: OddsPickInput) => {
      const next: BetSlipSelection = {
        id: createBetSlipSelectionId(matchKey, pick.marketType, pick.pickKey),
        matchKey,
        teamName: pick.teamName,
        odds: pick.odds,
        marketType: pick.marketType,
        selection: pick.selection,
        matchup,
      };
      toggleSelection(next);
    },
    [matchKey, matchup, toggleSelection],
  );

  const isPickSelected = useCallback(
    (marketType: string, pickKey: string) =>
      selections.some(
        (item) => item.id === createBetSlipSelectionId(matchKey, marketType, pickKey),
      ),
    [matchKey, selections],
  );

  return { pickOdds, isPickSelected };
}
