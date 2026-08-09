import {
  CompetitionHeader,
  GameInner,
  LiveMatchScore,
  StatusChip,
} from "@joker/design-system";
import { SPORTSBOOK_EXPANSION_SPORTS } from "../../data/sportsbookExpansionSports.js";
import { SPORTSBOOK_MOBILE_HOME_LIVE_MATCH } from "../../data/sportsbookMobileHome.js";
import "./SportsbookMobileHomePreview.css";

const HOME_VIDEO_SRC = "/videos/home-video.mp4";
const DEFAULT_GAME = SPORTSBOOK_EXPANSION_SPORTS.soccer.game;
const DEFAULT_LIVE_MATCH = SPORTSBOOK_MOBILE_HOME_LIVE_MATCH;

function SportsbookMobileHomeHero() {
  return (
    <section
      className="sportsbook-mobile-home-preview__hero"
      aria-label="Expert match picks"
    >
      <video
        className="sportsbook-mobile-home-preview__hero-video"
        src={HOME_VIDEO_SRC}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden
      />
      <div className="sportsbook-mobile-home-preview__hero-content">
        <div className="sportsbook-mobile-home-preview__hero-copy">
          <h2 className="sportsbook-mobile-home-preview__hero-title">
            Expert Match Picks
          </h2>
          <p className="sportsbook-mobile-home-preview__hero-body">
            Expert-selected matches from the world&apos;s leading football
            leagues, presented as a curated daily card of games.
          </p>
        </div>
        <StatusChip matchCount={12} />
      </div>
    </section>
  );
}

function SportsbookMobileHomeOnAir({ liveMatch }) {
  return (
    <section
      className="sportsbook-mobile-home-preview__on-air"
      aria-label="On air"
    >
      <h3 className="sportsbook-mobile-home-preview__on-air-title">On Air</h3>
      <div className="sportsbook-mobile-home-preview__on-air-competition">
        <CompetitionHeader>{liveMatch.competition}</CompetitionHeader>
        <span className="sportsbook-mobile-home-preview__live-badge">
          <span
            className="sportsbook-mobile-home-preview__live-badge-dot"
            aria-hidden="true"
          />
          <span className="sportsbook-mobile-home-preview__live-badge-label">
            LIVE
          </span>
        </span>
      </div>
      <LiveMatchScore
        className="sportsbook-mobile-home-preview__live-score"
        minutesPlayed={liveMatch.minutesPlayed}
        teams={liveMatch.teams}
      />
    </section>
  );
}

export function SportsbookMobileHomePreview({
  game = DEFAULT_GAME,
  liveMatch = DEFAULT_LIVE_MATCH,
}) {
  return (
    <div className="sportsbook-mobile-home-preview-shell">
      <GameInner
        className="sportsbook-mobile-home-preview"
        game={game}
        fairPlayLabel="Fair Play"
        bettingPanel={<></>}
        renderMobileBetting={false}
      >
        <div className="sportsbook-mobile-home-preview__page">
          <SportsbookMobileHomeHero />
          <SportsbookMobileHomeOnAir liveMatch={liveMatch} />
        </div>
      </GameInner>
      <div
        className="sportsbook-mobile-home-preview__fade"
        aria-hidden="true"
      />
    </div>
  );
}
