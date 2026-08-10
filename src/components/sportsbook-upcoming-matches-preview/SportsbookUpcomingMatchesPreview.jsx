import {
  CompetitionHeader,
  DateRow,
  OddsPanel,
  OddsRow,
  TeamInfo,
  Time,
} from "@joker/design-system";
import { SPORTSBOOK_EXPANSION_SPORTS } from "../../data/sportsbookExpansionSports.js";
import "./SportsbookUpcomingMatchesPreview.css";

const DEFAULT_UPCOMING_MATCHES =
  SPORTSBOOK_EXPANSION_SPORTS.soccer.upcomingMatches;

function groupByCompetition(matches) {
  return matches.reduce((groups, match) => {
    const last = groups[groups.length - 1];
    if (last?.competition === match.competition) {
      last.matches.push(match);
      return groups;
    }
    groups.push({ competition: match.competition, matches: [match] });
    return groups;
  }, []);
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

function UpcomingMatchRow({ match, showDateHeader, showBorder }) {
  const oddsColumns = match.odds.length;

  return (
    <div
      className={`sportsbook-upcoming-matches-preview__match-card${
        showBorder ? " sportsbook-upcoming-matches-preview__match-card--bordered" : ""
      }`}
    >
      {showDateHeader ? (
        <div className="sportsbook-upcoming-matches-preview__date-header">
          <DateRow>{match.date}</DateRow>
          <div
            className="joker-odds-selection__labels sportsbook-upcoming-matches-preview__odds-labels"
            style={{ "--odds-columns": oddsColumns }}
          >
            {match.odds.map((option) => (
              <OddsRow key={option.label}>{option.label}</OddsRow>
            ))}
          </div>
        </div>
      ) : null}
      <div className="sportsbook-upcoming-matches-preview__match-row">
        <div className="joker-upcoming-matches sportsbook-upcoming-matches-preview__match-panel">
          <div className="joker-upcoming-matches__leading sportsbook-upcoming-matches-preview__match-leading">
            <div className="joker-upcoming-matches__team-stack">
              <TeamInfo
                logoSrc={match.teams[0].logoSrc}
                logoAlt={match.teams[0].logoAlt}
              >
                {match.teams[0].name}
              </TeamInfo>
              <TeamInfo
                logoSrc={match.teams[1].logoSrc}
                logoAlt={match.teams[1].logoAlt}
              >
                {match.teams[1].name}
              </TeamInfo>
            </div>
            <Time className="sportsbook-upcoming-matches-preview__match-time">
              {match.time}
            </Time>
          </div>
        </div>
        <div className="sportsbook-upcoming-matches-preview__odds-panel">
          <div
            className="joker-odds-selection__panels sportsbook-upcoming-matches-preview__odds-panels"
            style={{ "--odds-columns": oddsColumns }}
          >
            {match.odds.map((option) => (
              <OddsPanel key={option.label} selected={false}>
                {option.odds}
              </OddsPanel>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function UpcomingCompetitionBlock({ competition, dates }) {
  return (
    <section className="sportsbook-upcoming-matches-preview__competition">
      <CompetitionHeader>{competition}</CompetitionHeader>
      {dates.map((dateGroup) => (
        <div
          key={`${competition}-${dateGroup.date}`}
          className="sportsbook-upcoming-matches-preview__date-group"
        >
          {dateGroup.matches.map((match, index) => (
            <UpcomingMatchRow
              key={match.id}
              match={match}
              showDateHeader={index === 0}
              showBorder={index < dateGroup.matches.length - 1}
            />
          ))}
        </div>
      ))}
    </section>
  );
}

export function SportsbookUpcomingMatchesPreview({
  matches = DEFAULT_UPCOMING_MATCHES,
  title = "Upcoming Matches",
}) {
  const groupedByCompetition = groupByCompetition(matches).map((group) => ({
    ...group,
    dates: groupByDate(group.matches),
  }));

  return (
    <div className="sportsbook-upcoming-matches-preview">
      <h3 className="sportsbook-upcoming-matches-preview__title">{title}</h3>
      <div className="sportsbook-upcoming-matches-preview__content">
        {groupedByCompetition.map((group) => (
          <UpcomingCompetitionBlock
            key={group.competition}
            competition={group.competition}
            dates={group.dates}
          />
        ))}
      </div>
      <div
        className="sportsbook-upcoming-matches-preview__fade"
        aria-hidden="true"
      />
    </div>
  );
}
