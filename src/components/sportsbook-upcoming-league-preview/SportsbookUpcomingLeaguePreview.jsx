import {
  CompetitionHeader,
  DateRow,
  OddsPanel,
  OddsRow,
  TeamInfo,
  Time,
} from "@joker/design-system";
import "./SportsbookUpcomingLeaguePreview.css";

const ODDS_LABELS = ["1", "X", "2"];

const UPCOMING_MATCHES = [
  {
    id: "la-liga",
    competition: "Spain La Liga",
    date: "12 June 2026",
    time: "13:00",
    teams: [
      {
        name: "Real Madrid",
        crest: "https://crests.football-data.org/86.png",
        alt: "Real Madrid",
      },
      {
        name: "FC Barcelona",
        crest: "https://crests.football-data.org/81.png",
        alt: "FC Barcelona",
      },
    ],
    odds: [
      { label: "1", odds: "2.55" },
      { label: "X", odds: "3.20" },
      { label: "2", odds: "2.60" },
    ],
  },
  {
    id: "premier-league",
    competition: "English Premier League",
    date: "14 June 2026",
    time: "06:00",
    teams: [
      {
        name: "Liverpool FC",
        crest: "https://crests.football-data.org/64.png",
        alt: "Liverpool FC",
      },
      {
        name: "Arsenal FC",
        crest: "https://crests.football-data.org/57.png",
        alt: "Arsenal FC",
      },
    ],
    odds: [
      { label: "1", odds: "1.87" },
      { label: "X", odds: "2.11" },
      { label: "2", odds: "3.21" },
    ],
  },
  {
    id: "bundesliga",
    competition: "Bundesliga",
    date: "15 June 2026",
    time: "18:30",
    teams: [
      {
        name: "Bayern Munich",
        crest: "https://crests.football-data.org/5.png",
        alt: "Bayern Munich",
      },
      {
        name: "Borussia Dortmund",
        crest: "https://crests.football-data.org/4.png",
        alt: "Borussia Dortmund",
      },
    ],
    odds: [
      { label: "1", odds: "1.72" },
      { label: "X", odds: "3.90" },
      { label: "2", odds: "4.50" },
    ],
  },
];

function UpcomingMatchCard({ match, overlay = false }) {
  return (
    <article className="sportsbook-upcoming-league-preview__card-item">
      <CompetitionHeader>{match.competition}</CompetitionHeader>
      <div className="sportsbook-upcoming-league-preview__card">
        <div className="sportsbook-upcoming-league-preview__date-header">
          <DateRow>{match.date}</DateRow>
          <div className="joker-odds-selection__labels sportsbook-upcoming-league-preview__odds-labels">
            {ODDS_LABELS.map((label) => (
              <OddsRow key={label}>{label}</OddsRow>
            ))}
          </div>
        </div>
        <div className="sportsbook-upcoming-league-preview__match-row">
          <div className="joker-upcoming-matches sportsbook-upcoming-league-preview__match-panel">
            <div className="joker-upcoming-matches__leading sportsbook-upcoming-league-preview__match-leading">
              <div className="joker-upcoming-matches__team-stack">
                <TeamInfo
                  logoSrc={match.teams[0].crest}
                  logoAlt={match.teams[0].alt}
                >
                  {match.teams[0].name}
                </TeamInfo>
                <TeamInfo
                  logoSrc={match.teams[1].crest}
                  logoAlt={match.teams[1].alt}
                >
                  {match.teams[1].name}
                </TeamInfo>
              </div>
              <Time className="sportsbook-upcoming-league-preview__match-time">
                {match.time}
              </Time>
            </div>
          </div>
          <div className="sportsbook-upcoming-league-preview__odds-panel">
            <div className="joker-odds-selection__panels sportsbook-upcoming-league-preview__odds-panels">
              {match.odds.map((option) => (
                <OddsPanel
                  key={option.label}
                  selected={false}
                  className={
                    overlay
                      ? "sportsbook-upcoming-league-preview__odds-cell"
                      : undefined
                  }
                >
                  {option.odds}
                </OddsPanel>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function UpcomingMatchStack({ matches, overlay = false, stackId = "a" }) {
  return (
    <div className="sportsbook-upcoming-league-preview__stack">
      {matches.map((match) => (
        <UpcomingMatchCard
          key={`${stackId}-${match.id}`}
          match={match}
          overlay={overlay}
        />
      ))}
    </div>
  );
}

export function SportsbookUpcomingLeaguePreview({ overlay = false }) {
  const rootClass = [
    "sportsbook-upcoming-league-preview",
    overlay ? "sportsbook-upcoming-league-preview--overlay" : "",
  ]
    .filter(Boolean)
    .join(" ");

  if (overlay) {
    return (
      <div className={rootClass}>
        <div
          className="sportsbook-upcoming-league-preview__viewport"
          aria-hidden="true"
        >
          <div className="sportsbook-upcoming-league-preview__track">
            <UpcomingMatchStack matches={UPCOMING_MATCHES} overlay stackId="a" />
            <UpcomingMatchStack matches={UPCOMING_MATCHES} overlay stackId="b" />
          </div>
        </div>
      </div>
    );
  }

  const match = UPCOMING_MATCHES[0];

  return (
    <div className={rootClass}>
      <div className="sportsbook-upcoming-league-preview__content">
        <UpcomingMatchCard match={match} />
      </div>
      <div className="sportsbook-upcoming-league-preview__fade" aria-hidden="true" />
    </div>
  );
}
