import { useState } from "react";
import {
  CompetitionHeader,
  OddsPanel,
  PlusMinusInput,
  TeamInfo,
} from "@joker/design-system";
import { SPORTSBOOK_MARKETS_MATCH } from "../../data/sportsbookMarketsMatch.js";
import {
  BetSlipProvider,
  useOddsPanelBetSlip,
} from "../../packages/sportsbook-bet-slip/index.ts";
import { getCorrectScoreOdds } from "../../utils/correctScoreOdds.js";
import "./SportsbookMarketsSectionPreview.css";

const MARKETS_VIDEO_SRC = "/videos/bet-inner-video.mp4";
const DRAW_LOGO_PLACEHOLDER =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

const CORRECT_SCORE_MIN = 0;
const CORRECT_SCORE_MAX = 20;
const FULL_TIME_MARKET = "Full Time Result";
const CORRECT_SCORE_MARKET = "Correct Score";
const ASIAN_HANDICAP_MARKET = "Asian Handicap";

const ASIAN_HANDICAP_LINES = [
  { homeLine: "-0.5", homeOdds: "1.87", awayLine: "+0.5", awayOdds: "3.21" },
  { homeLine: "-1.0", homeOdds: "2.43", awayLine: "+1.0", awayOdds: "6.43" },
  { homeLine: "-1.5", homeOdds: "1.27", awayLine: "+1.5", awayOdds: "4.01" },
];

function SportsbookMarketsHero({ match }) {
  const [homeTeam, awayTeam] = match.teams;

  return (
    <section
      className="sportsbook-markets-section-preview__hero"
      aria-label="Match header"
    >
      <video
        className="sportsbook-markets-section-preview__hero-video"
        src={MARKETS_VIDEO_SRC}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden
      />
      <div className="sportsbook-markets-section-preview__hero-content">
        <div className="sportsbook-markets-section-preview__hero-header">
          <h2 className="sportsbook-markets-section-preview__competition">
            {match.competition}
          </h2>
          <p className="sportsbook-markets-section-preview__schedule">
            <span className="sportsbook-markets-section-preview__date">
              {match.date}
            </span>
            <span className="sportsbook-markets-section-preview__time">
              {match.time}
            </span>
          </p>
        </div>
        <div className="sportsbook-markets-section-preview__matchup">
          <div className="sportsbook-markets-section-preview__team">
            <img
              className="sportsbook-markets-section-preview__crest"
              src={homeTeam.crest}
              alt={homeTeam.alt}
              width={64}
              height={64}
            />
            <span className="sportsbook-markets-section-preview__team-name">
              {homeTeam.name}
            </span>
          </div>
          <span
            className="sportsbook-markets-section-preview__versus"
            aria-hidden="true"
          >
            VS
          </span>
          <div className="sportsbook-markets-section-preview__team">
            <img
              className="sportsbook-markets-section-preview__crest"
              src={awayTeam.crest}
              alt={awayTeam.alt}
              width={64}
              height={64}
            />
            <span className="sportsbook-markets-section-preview__team-name">
              {awayTeam.name}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function SportsbookMarketsList({ match }) {
  const [homeTeam, awayTeam] = match.teams;
  const [homeOdds, drawOdds, awayOdds] = match.odds;
  const [homeScore, setHomeScore] = useState(1);
  const [awayScore, setAwayScore] = useState(0);
  const correctScoreOdds = getCorrectScoreOdds(homeScore, awayScore);
  const correctScoreSelection = `${homeScore} - ${awayScore}`;
  const { pickOdds, isPickSelected } = useOddsPanelBetSlip(match);

  return (
    <section
      className="sportsbook-markets-section-preview__markets"
      aria-label="Markets"
    >
      <div className="sportsbook-markets-section-preview__market">
        <CompetitionHeader className="sportsbook-markets-section-preview__market-header">
          Full Time Result
        </CompetitionHeader>
        <div className="joker-odds-selection__panels sportsbook-markets-section-preview__panels">
          <OddsPanel
            logoSrc={homeTeam.crest}
            logoAlt={homeTeam.alt}
            teamName={homeTeam.name}
            selected={isPickSelected(FULL_TIME_MARKET, "home")}
            onClick={() =>
              pickOdds({
                pickKey: "home",
                teamName: homeTeam.name,
                odds: homeOdds.odds,
                marketType: FULL_TIME_MARKET,
                selection: "Win",
              })
            }
          >
            {homeOdds.odds}
          </OddsPanel>
          <OddsPanel
            className="sportsbook-markets-section-preview__draw-panel"
            logoSrc={DRAW_LOGO_PLACEHOLDER}
            logoAlt=""
            teamName="Draw"
            selected={isPickSelected(FULL_TIME_MARKET, "draw")}
            onClick={() =>
              pickOdds({
                pickKey: "draw",
                teamName: "Draw",
                odds: drawOdds.odds,
                marketType: FULL_TIME_MARKET,
                selection: "Draw",
              })
            }
          >
            {drawOdds.odds}
          </OddsPanel>
          <OddsPanel
            logoSrc={awayTeam.crest}
            logoAlt={awayTeam.alt}
            teamName={awayTeam.name}
            selected={isPickSelected(FULL_TIME_MARKET, "away")}
            onClick={() =>
              pickOdds({
                pickKey: "away",
                teamName: awayTeam.name,
                odds: awayOdds.odds,
                marketType: FULL_TIME_MARKET,
                selection: "Win",
              })
            }
          >
            {awayOdds.odds}
          </OddsPanel>
        </div>
      </div>

      <div className="sportsbook-markets-section-preview__market">
        <CompetitionHeader className="sportsbook-markets-section-preview__market-header">
          Correct Score
        </CompetitionHeader>
        <div className="sportsbook-markets-section-preview__correct-score-row">
          <div className="sportsbook-markets-section-preview__correct-score-cell">
            <TeamInfo logoSrc={homeTeam.crest} logoAlt={homeTeam.alt}>
              {homeTeam.name}
            </TeamInfo>
            <PlusMinusInput
              value={homeScore}
              min={CORRECT_SCORE_MIN}
              max={CORRECT_SCORE_MAX}
              minusLabel={`Decrease ${homeTeam.name} score`}
              plusLabel={`Increase ${homeTeam.name} score`}
              onMinusClick={() =>
                setHomeScore((current) => Math.max(CORRECT_SCORE_MIN, current - 1))
              }
              onPlusClick={() =>
                setHomeScore((current) => Math.min(CORRECT_SCORE_MAX, current + 1))
              }
            />
          </div>
          <div className="sportsbook-markets-section-preview__correct-score-cell">
            <TeamInfo logoSrc={awayTeam.crest} logoAlt={awayTeam.alt}>
              {awayTeam.name}
            </TeamInfo>
            <PlusMinusInput
              value={awayScore}
              min={CORRECT_SCORE_MIN}
              max={CORRECT_SCORE_MAX}
              minusLabel={`Decrease ${awayTeam.name} score`}
              plusLabel={`Increase ${awayTeam.name} score`}
              onMinusClick={() =>
                setAwayScore((current) => Math.max(CORRECT_SCORE_MIN, current - 1))
              }
              onPlusClick={() =>
                setAwayScore((current) => Math.min(CORRECT_SCORE_MAX, current + 1))
              }
            />
          </div>
          <OddsPanel
            className="sportsbook-markets-section-preview__correct-score-odds"
            selected={isPickSelected(CORRECT_SCORE_MARKET, correctScoreSelection)}
            onClick={() =>
              pickOdds({
                pickKey: correctScoreSelection,
                teamName: homeTeam.name,
                odds: correctScoreOdds,
                marketType: CORRECT_SCORE_MARKET,
                selection: correctScoreSelection,
              })
            }
          >
            {correctScoreOdds}
          </OddsPanel>
        </div>
      </div>

      <div className="sportsbook-markets-section-preview__market">
        <CompetitionHeader className="sportsbook-markets-section-preview__market-header">
          Asian Handicap
        </CompetitionHeader>
        <div className="sportsbook-markets-section-preview__asian-handicap-grid">
          {ASIAN_HANDICAP_LINES.flatMap((row) => [
            <OddsPanel
              key={`${row.homeLine}-home`}
              logoSrc={homeTeam.crest}
              logoAlt={homeTeam.alt}
              teamName={homeTeam.name}
              line={row.homeLine}
              selected={isPickSelected(ASIAN_HANDICAP_MARKET, row.homeLine)}
              onClick={() =>
                pickOdds({
                  pickKey: row.homeLine,
                  teamName: homeTeam.name,
                  odds: row.homeOdds,
                  marketType: ASIAN_HANDICAP_MARKET,
                  selection: row.homeLine,
                })
              }
            >
              {row.homeOdds}
            </OddsPanel>,
            <OddsPanel
              key={`${row.awayLine}-away`}
              logoSrc={awayTeam.crest}
              logoAlt={awayTeam.alt}
              teamName={awayTeam.name}
              line={row.awayLine}
              selected={isPickSelected(ASIAN_HANDICAP_MARKET, row.awayLine)}
              onClick={() =>
                pickOdds({
                  pickKey: row.awayLine,
                  teamName: awayTeam.name,
                  odds: row.awayOdds,
                  marketType: ASIAN_HANDICAP_MARKET,
                  selection: row.awayLine,
                })
              }
            >
              {row.awayOdds}
            </OddsPanel>,
          ])}
        </div>
      </div>
    </section>
  );
}

function SportsbookMarketsSectionPreviewContent() {
  return (
    <div className="sportsbook-markets-section-preview">
      <div className="sportsbook-markets-section-preview__scroll">
        <SportsbookMarketsHero match={SPORTSBOOK_MARKETS_MATCH} />
        <SportsbookMarketsList match={SPORTSBOOK_MARKETS_MATCH} />
      </div>
      <span className="case-study-text__chip sportsbook-markets-section-preview__chip">
        Interactive
      </span>
    </div>
  );
}

export function SportsbookMarketsSectionPreview() {
  return (
    <BetSlipProvider>
      <SportsbookMarketsSectionPreviewContent />
    </BetSlipProvider>
  );
}
