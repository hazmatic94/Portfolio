const ASIAN_HANDICAP_MARKET = 'Asian Handicap';

export function displayMarketType(marketType: string) {
  if (marketType === ASIAN_HANDICAP_MARKET) {
    return 'Handicap';
  }
  return marketType;
}
