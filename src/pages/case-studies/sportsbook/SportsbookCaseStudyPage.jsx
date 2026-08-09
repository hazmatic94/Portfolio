import { Link } from "react-router-dom";
import { CaseStudyFullWidthFrame } from "../../../components/case-study-full-width-frame/CaseStudyFullWidthFrame.jsx";
import { SportsbookBetslipSectionPreview } from "../../../components/sportsbook-betslip-section-preview/SportsbookBetslipSectionPreview.jsx";
import { SportsbookLiveGamesPreview } from "../../../components/sportsbook-live-games-preview/SportsbookLiveGamesPreview.jsx";
import { SportsbookMarketsHeroPreview } from "../../../components/sportsbook-markets-hero-preview/SportsbookMarketsHeroPreview.jsx";
import { SportsbookMarketsSectionPreview } from "../../../components/sportsbook-markets-section-preview/SportsbookMarketsSectionPreview.jsx";
import { CaseStudyInlineCopy } from "../../../components/case-study-inline-copy/CaseStudyInlineCopy.jsx";
import { CaseStudyMediaPlaceholder } from "../../../components/case-study-media-placeholder/CaseStudyMediaPlaceholder.jsx";
import { CaseStudySplitFrames } from "../../../components/case-study-split-frames/CaseStudySplitFrames.jsx";
import { ComponentCard } from "../../../components/component-card/ComponentCard.jsx";
import { ComponentCardMobilePreview } from "../../../components/component-card/ComponentCardMobilePreview.jsx";
import { CaseStudyIntro } from "../../../components/case-study-intro/CaseStudyIntro.jsx";
import {
  CaseStudyPageHeader,
  CaseStudyProjectRail,
} from "../../../components/case-study-page-header/CaseStudyPageHeader.jsx";
import { CaseStudyRevealSection } from "../../../components/case-study-reveal/CaseStudyRevealSection.jsx";
import { FooterLegal } from "../../../components/footer/Footer.jsx";
import { Nav } from "../../../components/nav/Nav.jsx";
import { PortfolioMockupStage } from "../../../components/portfolio-video-mockup/PortfolioMockupStage.jsx";
import { SectionDivider } from "../../../components/section-divider/SectionDivider.jsx";
import "../../../components/project-container/ProjectContainer.css";
import "../../../styles/case-study-layout.css";
import "../../../pages/home/components/CaseStudySection.css";
import "./SportsbookCaseStudyPage.css";

const MOBILE_BETSLIP = {
  src: "/images/sportsbook-mobile-betslip.png",
  srcSet:
    "/images/sportsbook-mobile-betslip.png 390w, /images/sportsbook-mobile-betslip@2x.png 1170w",
  alt: "Joker Plus mobile sportsbook with betslip open",
};

export function SportsbookCaseStudyPage() {
  return (
    <>
      <Nav />
      <main className="application-shell-case-study sportsbook-case-study">
        <CaseStudyRevealSection
          as="div"
          className="sportsbook-case-study__shell sportsbook-case-study__intro-reveal"
        >
          <div className="sportsbook-case-study__top">
            <CaseStudyPageHeader lead="Case Study" title="Sportsbook" />
          </div>

          <CaseStudyIntro
            title="Designing a curated sportsbook"
            body="The platform relied on one analyst to curate markets and manage odds, so every interaction needed to support a lean operational model."
            ctaLabel="View Live Demo"
            ctaHref="/case-studies/sportsbook"
          />
        </CaseStudyRevealSection>

        <CaseStudyRevealSection
          className="sportsbook-case-study__hero-section"
          ariaLabel="Case study hero"
        >
          <div className="sportsbook-case-study__shell">
            <article className="sportsbook-case-study__hero project-container">
              <Link
                to="/case-studies/sportsbook"
                className="project-container__media project-container__media--linked"
                aria-label="View Sportsbook case study"
              >
                <div className="project-container__media-clip">
                  <PortfolioMockupStage
                    desktopSrc="/images/sportsbook-hero.png"
                    desktopSrcSet="/images/sportsbook-hero.png 1366w, /images/sportsbook-hero@2x.png 2732w"
                    desktopSizes="800px"
                    desktopWidth={1366}
                    desktopHeight={900}
                    desktopLabel="Joker Plus sportsbook with live matches and odds"
                  />
                </div>
                <ComponentCard className="project-container__media-overlay">
                  <ComponentCardMobilePreview
                    src={MOBILE_BETSLIP.src}
                    srcSet={MOBILE_BETSLIP.srcSet}
                    alt={MOBILE_BETSLIP.alt}
                  />
                </ComponentCard>
              </Link>
            </article>
          </div>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection
          className="sportsbook-case-study__overview"
          ariaLabel="Overview"
        >
          <SectionDivider number="01" title="Overview" />
          <CaseStudyInlineCopy
            title="Curated by design"
            body="I designed a betting experience that balanced user clarity with operational simplicity."
          />
          <div className="sportsbook-case-study__section-media">
            <CaseStudySplitFrames
              left={<SportsbookMarketsHeroPreview />}
              right={<SportsbookLiveGamesPreview />}
              leftPanelClassName="case-study-split-frames__panel--fill"
              rightPanelClassName="case-study-split-frames__panel--fill"
            />
          </div>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection
          className="sportsbook-case-study__foundations"
          ariaLabel="Transaction"
        >
          <SectionDivider number="02" title="Transaction" />
          <CaseStudyInlineCopy
            title="A dynamic betslip"
            body="The betslip grows alongside every selection, providing continuous feedback while keeping stake, odds and potential returns visible throughout the betting journey."
          />
          <div className="sportsbook-case-study__section-media">
            <CaseStudyFullWidthFrame>
              <SportsbookBetslipSectionPreview />
            </CaseStudyFullWidthFrame>
          </div>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection
          className="sportsbook-case-study__interactions"
          ariaLabel="Markets"
        >
          <SectionDivider number="03" title="Markets" />
          <CaseStudyInlineCopy
            title="Flexible Betting"
            body="Multiple betting markets inherit a shared interaction model, allowing users to move between market types without relearning the interface."
          />
          <div className="sportsbook-case-study__section-media">
            <CaseStudyFullWidthFrame>
              <SportsbookMarketsSectionPreview />
            </CaseStudyFullWidthFrame>
          </div>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection
          className="sportsbook-case-study__architecture"
          ariaLabel="Platform"
        >
          <SectionDivider number="04" title="Platform" />
          <CaseStudyInlineCopy
            title="Built on the platform"
            body="Sportsbook extends the same application shell, tokens and interaction patterns as the games — another product surface on one foundation rather than a separate UI stack."
          />
          <div className="sportsbook-case-study__section-media">
            <CaseStudySplitFrames
              left={<CaseStudyMediaPlaceholder label="Shell layout" variant="panel" />}
              right={<CaseStudyMediaPlaceholder label="Market cards" variant="panel" />}
              leftPanelClassName="case-study-split-frames__panel--fixed"
              rightPanelClassName="case-study-split-frames__panel--fill"
            />
          </div>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection
          className="sportsbook-case-study__next-project"
          ariaLabel="Next project"
        >
          <div className="sportsbook-case-study__shell">
            <CaseStudyProjectRail
              lead="01"
              title="Design System"
              href="/case-studies/design-system"
            />
          </div>
          <Link
            to="/case-studies/design-system"
            className="sportsbook-case-study__next-label"
          >
            Next
          </Link>
          <FooterLegal />
        </CaseStudyRevealSection>
      </main>
    </>
  );
}
