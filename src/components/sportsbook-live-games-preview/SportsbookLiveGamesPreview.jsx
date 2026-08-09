import { CompetitionHeader, LiveMatchScore } from "@joker/design-system";
import "./SportsbookLiveGamesPreview.css";

const LIVE_GAMES = [
  {
    id: "la-liga",
    competition: "Spain La Liga",
    minutesPlayed: 67,
    teams: [
      {
        name: "Real Madrid",
        logoSrc: "https://crests.football-data.org/86.png",
        logoAlt: "Real Madrid",
        score: 1,
      },
      {
        name: "FC Barcelona",
        logoSrc: "https://crests.football-data.org/81.png",
        logoAlt: "FC Barcelona",
        score: 1,
      },
    ],
  },
  {
    id: "premier-league",
    competition: "English Premier League",
    minutesPlayed: 24,
    teams: [
      {
        name: "Liverpool FC",
        logoSrc: "https://crests.football-data.org/64.png",
        logoAlt: "Liverpool FC",
        score: 0,
      },
      {
        name: "Arsenal FC",
        logoSrc: "https://crests.football-data.org/57.png",
        logoAlt: "Arsenal FC",
        score: 2,
      },
    ],
  },
  {
    id: "bundesliga",
    competition: "Bundesliga",
    minutesPlayed: 81,
    teams: [
      {
        name: "Bayern Munich",
        logoSrc: "https://crests.football-data.org/5.png",
        logoAlt: "Bayern Munich",
        score: 2,
      },
      {
        name: "Borussia Dortmund",
        logoSrc: "https://crests.football-data.org/4.png",
        logoAlt: "Borussia Dortmund",
        score: 1,
      },
    ],
  },
];

function LiveGameCard({ game }) {
  return (
    <article className="sportsbook-live-games-preview__card">
      <div className="sportsbook-live-games-preview__card-header">
        <CompetitionHeader>{game.competition}</CompetitionHeader>
        <span className="sportsbook-live-games-preview__live-badge" aria-hidden="true">
          <span className="sportsbook-live-games-preview__live-badge-dot" />
          <span className="sportsbook-live-games-preview__live-badge-label">
            Live
          </span>
        </span>
      </div>
      <LiveMatchScore
        className="sportsbook-live-games-preview__score"
        minutesPlayed={game.minutesPlayed}
        teams={game.teams}
      />
    </article>
  );
}

export function SportsbookLiveGamesPreview() {
  return (
    <div className="sportsbook-live-games-preview">
      <h3 className="sportsbook-live-games-preview__title">On Air Now</h3>
      <div className="sportsbook-live-games-preview__content">
        {LIVE_GAMES.map((game) => (
          <LiveGameCard key={game.id} game={game} />
        ))}
      </div>
      <div className="sportsbook-live-games-preview__fade" aria-hidden="true" />
    </div>
  );
}
