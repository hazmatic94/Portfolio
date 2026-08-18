import {
  CompetitionHeader,
  GameHeaderRail,
  GameInner,
  LiveMatchScore,
  StatusChip,
} from "@joker/design-system";
import { SPORTSBOOK_EXPANSION_SPORTS } from "../../data/sportsbookExpansionSports.js";
import { SPORTSBOOK_MOBILE_HOME_LIVE_MATCH } from "../../data/sportsbookMobileHome.js";
import { SportsbookSportIcon } from "../sportsbook-sport-icons/SportsbookSportIcons.jsx";
import "./SportsbookMobileHomePreview.css";

const DEFAULT_GAME = SPORTSBOOK_EXPANSION_SPORTS.soccer.game;
const DEFAULT_HERO_VIDEO_SRC = SPORTSBOOK_EXPANSION_SPORTS.soccer.heroVideoSrc;
const DEFAULT_HERO_TITLE = SPORTSBOOK_EXPANSION_SPORTS.soccer.heroTitle;
const DEFAULT_HERO_BODY = SPORTSBOOK_EXPANSION_SPORTS.soccer.heroBody;
const DEFAULT_AVAILABILITY_COUNT =
  SPORTSBOOK_EXPANSION_SPORTS.soccer.availabilityCount;
const DEFAULT_LIVE_MATCH = SPORTSBOOK_MOBILE_HOME_LIVE_MATCH;
const PORTFOLIO_SPORT_ICONS = new Set(["soccer", "tennis", "ufc", "nrl"]);

function sportsbookMobileGameHeaderRail(game) {
  if (!PORTFOLIO_SPORT_ICONS.has(game?.icon)) {
    return undefined;
  }

  return (
    <GameHeaderRail
      rightLabel="Fair Play"
      gameIcon="__portfolio-sport-icon__"
      game={
        <>
          <span
            className="joker-game-header-game-icon nav-inline-icon-host"
            data-rail-icon-artwork="full-16"
          >
            <SportsbookSportIcon
              sportIcon={game.icon}
              className="nav-inline-icon"
            />
          </span>
          {game.label}
        </>
      }
    />
  );
}

function SportsbookAvailabilityChip({ count, label }) {
  if (typeof count === "number") {
    return <StatusChip matchCount={count} />;
  }

  return (
    <span className="sportsbook-mobile-home-preview__availability-chip">
      <span
        className="sportsbook-mobile-home-preview__availability-chip-dot"
        aria-hidden="true"
      />
      <span className="sportsbook-mobile-home-preview__availability-chip-label">
        {label}
      </span>
    </span>
  );
}

function SportsbookMobileHomeHero({
  heroVideoSrc,
  heroTitle,
  heroBody,
  availabilityCount,
  availabilityLabel,
}) {
  return (
    <section
      className="sportsbook-mobile-home-preview__hero"
      aria-label={heroTitle}
    >
      <video
        key={heroVideoSrc}
        className="sportsbook-mobile-home-preview__hero-video"
        src={heroVideoSrc}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden
      />
      <div className="sportsbook-mobile-home-preview__hero-content">
        <div className="sportsbook-mobile-home-preview__hero-copy">
          <h2 className="sportsbook-mobile-home-preview__hero-title">
            {heroTitle}
          </h2>
          <p className="sportsbook-mobile-home-preview__hero-body">{heroBody}</p>
        </div>
        <SportsbookAvailabilityChip
          count={availabilityCount}
          label={availabilityLabel}
        />
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
  heroVideoSrc = DEFAULT_HERO_VIDEO_SRC,
  heroTitle = DEFAULT_HERO_TITLE,
  heroBody = DEFAULT_HERO_BODY,
  availabilityCount = DEFAULT_AVAILABILITY_COUNT,
  availabilityLabel = null,
}) {
  const gameHeaderRail = sportsbookMobileGameHeaderRail(game);

  return (
    <div className="sportsbook-mobile-home-preview-shell case-study-game-rail-icons">
      <GameInner
        className="sportsbook-mobile-home-preview"
        game={game}
        gameHeaderRail={gameHeaderRail}
        fairPlayLabel="Fair Play"
        bettingPanel={<></>}
        renderMobileBetting={false}
      >
        <div className="sportsbook-mobile-home-preview__page">
          <SportsbookMobileHomeHero
            heroVideoSrc={heroVideoSrc}
            heroTitle={heroTitle}
            heroBody={heroBody}
            availabilityCount={availabilityCount}
            availabilityLabel={availabilityLabel}
          />
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
