export function parseStakeAmount(value: string): number {
  const normalized = value.replace(/,/g, '').trim();
  if (!normalized) return 0;
  const amount = Number.parseFloat(normalized);
  return Number.isFinite(amount) && amount >= 0 ? amount : 0;
}

export function formatStakeDisplay(value: string): string {
  return parseStakeAmount(value).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function hasPositiveStake(value: string): boolean {
  return parseStakeAmount(value) > 0;
}

export function allSelectionsHaveStakes(
  selections: readonly { id: string }[],
  legStakes: Record<string, string>,
): boolean {
  return (
    selections.length > 0 &&
    selections.every((selection) => hasPositiveStake(legStakes[selection.id] ?? ''))
  );
}

export function potentialReturns(stake: string, odds: string): string {
  const stakeAmount = parseStakeAmount(stake);
  const oddsValue = Number.parseFloat(odds);
  if (!stakeAmount || !Number.isFinite(oddsValue)) {
    return '0.00';
  }
  return formatMoney(stakeAmount * oddsValue);
}

export function formatMoney(amount: number): string {
  return amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function legStakeValue(
  selectionId: string,
  selectionCount: number,
  stake: string,
  legStakes: Record<string, string>,
): string {
  return selectionCount === 1 ? stake : (legStakes[selectionId] ?? '');
}

export function computeBetSlipTotals(
  selections: readonly { id: string; odds: string }[],
  stake: string,
  legStakes: Record<string, string>,
): { totalStake: string; totalReturn: string } {
  let totalStake = 0;
  let totalReturn = 0;

  for (const selection of selections) {
    const legStake = legStakeValue(selection.id, selections.length, stake, legStakes);
    const stakeAmount = parseStakeAmount(legStake);
    const oddsValue = Number.parseFloat(selection.odds);
    totalStake += stakeAmount;
    if (Number.isFinite(oddsValue)) {
      totalReturn += stakeAmount * oddsValue;
    }
  }

  return {
    totalStake: formatMoney(totalStake),
    totalReturn: formatMoney(totalReturn),
  };
}
