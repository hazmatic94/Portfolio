export function getCorrectScoreOdds(homeScore, awayScore) {
  const totalGoals = homeScore + awayScore;
  const goalDiff = Math.abs(homeScore - awayScore);

  if (homeScore === 0 && awayScore === 0) {
    return "11.00";
  }

  let odds = 10 + totalGoals * 4 + goalDiff * 2;

  if (homeScore === awayScore) {
    odds *= 0.82;
  }

  if (totalGoals >= 6) {
    odds *= 1.25;
  }

  return Math.min(999.99, odds).toFixed(2);
}
