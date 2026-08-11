import {
  CompetitionHeader,
  DateRow,
  OddsPanel,
  OddsRow,
  TeamInfo,
  Time,
  ViewMarkets,
} from "@joker/design-system";
import { useOddsPanelBetSlip } from "../../packages/sportsbook-bet-slip/index.ts";

const ODDS_LABELS = ["1", "X", "2"];
const FULL_TIME_MARKET = "Full Time Result";

function fullTimePickForLabel(match, label, odds) {
  const [homeTeam, awayTeam] = match.teams;
  if (label === "1") {
    return {
      pickKey: "home",
      teamName: homeTeam.name,
      marketType: FULL_TIME_MARKET,
      selection: "Win",
      odds,
    };
  }
  if (label === "X") {
    return {
      pickKey: "draw",
      teamName: "Draw",
      marketType: FULL_TIME_MARKET,
      selection: "Draw",
      odds,
    };
  }
  if (label === "2") {
    return {
      pickKey: "away",
      teamName: awayTeam.name,
      marketType: FULL_TIME_MARKET,
      selection: "Win",
      odds,
    };
  }
  return null;
}

function SportsbookBetslipMatchCard({
  match,
  showDateHeader = true,
  showBorder = true,
}) {
  const { pickOdds, isPickSelected } = useOddsPanelBetSlip(match);

  return (
    <article
      className={`sportsbook-betslip-section-preview__match-card${showBorder ? " sportsbook-betslip-section-preview__match-card--bordered" : ""}`}
    >
      {showDateHeader ? (
        <div className="sportsbook-betslip-section-preview__date-header">
          <DateRow>{match.date}</DateRow>
          <div className="joker-odds-selection__labels sportsbook-betslip-section-preview__odds-labels">
            {ODDS_LABELS.map((label) => (
              <OddsRow key={label}>{label}</OddsRow>
            ))}
          </div>
        </div>
      ) : null}
      <div className="sportsbook-betslip-section-preview__match-row">
        <div className="sportsbook-betslip-section-preview__match-panel">
          <div className="sportsbook-betslip-section-preview__match-info">
            <div className="sportsbook-betslip-section-preview__team-stack">
              <TeamInfo logoSrc={match.teams[0].crest} logoAlt={match.teams[0].alt}>
                {match.teams[0].name}
              </TeamInfo>
              <TeamInfo logoSrc={match.teams[1].crest} logoAlt={match.teams[1].alt}>
                {match.teams[1].name}
              </TeamInfo>
            </div>
            <Time className="sportsbook-betslip-section-preview__match-time">
              {match.time}
            </Time>
          </div>
          <div className="sportsbook-betslip-section-preview__match-actions">
            <ViewMarkets />
          </div>
        </div>
        <div className="sportsbook-betslip-section-preview__odds-panel">
          <div className="joker-odds-selection__panels sportsbook-betslip-section-preview__odds-panels">
            {match.odds.map((option) => {
              const pick = fullTimePickForLabel(match, option.label, option.odds);
              return (
                <OddsPanel
                  key={option.label}
                  selected={pick ? isPickSelected(pick.marketType, pick.pickKey) : false}
                  onClick={() => {
                    if (pick) pickOdds(pick);
                  }}
                >
                  {option.odds}
                </OddsPanel>
              );
            })}
          </div>
        </div>
      </div>
    </article>
  );
}

function groupByDate(matches) {
  return matches.reduce((groups, match) => {
    const last = groups[groups.length - 1];
    if (last?.date === match.date) {
      last.matches.push(match);
      return groups;
    }
    groups.push({ date: match.date, matches: [match] });
    return groups;
  }, []);
}

export function SportsbookBetslipUpcomingMatches({ matches }) {
  const dateGroups = groupByDate(matches);

  return (
    <section
      className="sportsbook-betslip-section-preview__markets"
      aria-label="Match odds"
    >
      <div className="sportsbook-betslip-section-preview__competition-block">
        <CompetitionHeader>{matches[0]?.competition}</CompetitionHeader>
        {dateGroups.map((dateGroup) => (
          <div
            key={dateGroup.date}
            className="sportsbook-betslip-section-preview__date-group"
          >
            {dateGroup.matches.map((match, index) => (
              <SportsbookBetslipMatchCard
                key={`${match.time}-${match.teams[0].name}`}
                match={match}
                showDateHeader={index === 0}
                showBorder={index < dateGroup.matches.length - 1}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
