import { Link } from "react-router-dom";
import { CaseStudyFullWidthFrame } from "../../../components/case-study-full-width-frame/CaseStudyFullWidthFrame.jsx";
import { SportsbookMarketsHeroPreview } from "../../../components/sportsbook-markets-hero-preview/SportsbookMarketsHeroPreview.jsx";
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

function SportsbookMobileBetslipImage() {
  return (
    <img
      className="portfolio-image-mockup__image sportsbook-case-study__betslip-image"
      src={MOBILE_BETSLIP.src}
      srcSet={MOBILE_BETSLIP.srcSet}
      sizes="(min-width: 801px) 360px, 80vw"
      width={390}
      height={844}
      alt={MOBILE_BETSLIP.alt}
      loading="lazy"
      decoding="async"
    />
  );
}

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
            body="Creating a scalable betting platform focused on clarity, structured markets and intuitive bet construction."
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
            title="A different approach"
            body="Built around curated markets, simplifying risk while creating a scalable platform."
          />
          <div className="sportsbook-case-study__section-media">
            <CaseStudySplitFrames
              left={<SportsbookMarketsHeroPreview />}
              right={null}
              leftPanelClassName="case-study-split-frames__panel--fill"
              rightPanelClassName="case-study-split-frames__panel--fill"
            />
          </div>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection
          className="sportsbook-case-study__foundations"
          ariaLabel="Betslip"
        >
          <SectionDivider number="02" title="Betslip" />
          <CaseStudyInlineCopy
            title="Intuitive bet construction"
            body="The betslip keeps selections, stakes and potential returns visible while building a slip — on desktop and mobile — so multi-leg bets stay legible before placement."
          />
          <div className="sportsbook-case-study__section-media">
            <CaseStudySplitFrames
              left={<CaseStudyMediaPlaceholder label="Odds selection" variant="panel" />}
              right={<SportsbookMobileBetslipImage />}
              leftPanelClassName="case-study-split-frames__panel--fixed"
              rightPanelClassName="case-study-split-frames__panel--fill"
            />
          </div>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection
          className="sportsbook-case-study__interactions"
          ariaLabel="Live"
        >
          <SectionDivider number="03" title="Live" />
          <CaseStudyInlineCopy
            title="Live match states"
            body="On-air matches, scorelines and updating odds needed clear hierarchy — live content reads first, with upcoming markets supporting discovery without competing for attention."
          />
          <div className="sportsbook-case-study__section-media">
            <CaseStudyFullWidthFrame>
              <CaseStudyMediaPlaceholder label="Live match module" variant="panel" />
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
