import { SportsbookUpcomingLeaguePreview } from "../sportsbook-upcoming-league-preview/SportsbookUpcomingLeaguePreview.jsx";
import "./SportsbookMarketsHeroPreview.css";

const MARKETS_VIDEO_SRC = "/videos/bet-inner-video.mp4";

export function SportsbookMarketsHeroPreview() {
  return (
    <section
      className="sportsbook-markets-hero-preview"
      aria-label="Markets hero background"
    >
      <video
        className="sportsbook-markets-hero-preview__video"
        src={MARKETS_VIDEO_SRC}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden
      />
      <div className="sportsbook-markets-hero-preview__overlay">
        <SportsbookUpcomingLeaguePreview overlay />
      </div>
    </section>
  );
}
