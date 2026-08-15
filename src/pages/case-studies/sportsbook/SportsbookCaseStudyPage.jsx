import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CaseStudyFullWidthFrame } from "../../../components/case-study-full-width-frame/CaseStudyFullWidthFrame.jsx";
import { SportsbookBetslipSectionPreview } from "../../../components/sportsbook-betslip-section-preview/SportsbookBetslipSectionPreview.jsx";
import { SportsbookLiveGamesPreview } from "../../../components/sportsbook-live-games-preview/SportsbookLiveGamesPreview.jsx";
import { SportsbookMarketsHeroPreview } from "../../../components/sportsbook-markets-hero-preview/SportsbookMarketsHeroPreview.jsx";
import { SportsbookMarketsSectionPreview } from "../../../components/sportsbook-markets-section-preview/SportsbookMarketsSectionPreview.jsx";
import { SportsbookExpansionPreview } from "../../../components/sportsbook-expansion-preview/SportsbookExpansionPreview.jsx";
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
import { PageMeta } from "../../../components/page-meta/PageMeta.jsx";
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

const SPORTSBOOK_PAGE_TITLE = "Sportsbook";
const SPORTSBOOK_META_DESCRIPTION =
  "Curated sportsbook case study exploring operational simplicity, scalable event architecture, and intuitive bet construction.";
const SPORTSBOOK_OG_IMAGE = "/og/sportsbook.png";

function useBetslipPanelHeight() {
  const foundationsMediaRef = useRef(null);
  const [panelHeight, setPanelHeight] = useState(null);

  useEffect(() => {
    const media = foundationsMediaRef.current;
    if (!media) return undefined;

    const frame = media.querySelector(".case-study-full-width-frame");
    const target = frame ?? media;

    const sync = () => {
      const next = Math.ceil(target.getBoundingClientRect().height);
      setPanelHeight((current) => (current === next ? current : next));
    };

    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(target);
    window.addEventListener("resize", sync);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", sync);
    };
  }, []);

  return { foundationsMediaRef, panelHeight };
}

export function SportsbookCaseStudyPage() {
  const { foundationsMediaRef, panelHeight } = useBetslipPanelHeight();
  const caseStudyStyle =
    panelHeight == null
      ? undefined
      : {
          "--sportsbook-interactive-panel-height": `${panelHeight}px`,
        };

  return (
    <>
      <PageMeta
        title={SPORTSBOOK_PAGE_TITLE}
        description={SPORTSBOOK_META_DESCRIPTION}
        canonicalPath="/case-studies/sportsbook"
        ogImage={SPORTSBOOK_OG_IMAGE}
      />
      <Nav />
      <main
        className="sportsbook-case-study"
        style={caseStudyStyle}
      >
        <CaseStudyRevealSection
          as="div"
          className="sportsbook-case-study__shell sportsbook-case-study__intro-reveal"
        >
          <div className="sportsbook-case-study__top">
            <CaseStudyPageHeader lead="Case Study" title="Sportsbook" />
          </div>

          <CaseStudyIntro
            title="Sportsbook"
            body="The platform relied on one analyst to curate markets and manage odds, so every interaction needed to support a lean operational model."
            ctaLabel="View Live Demo"
            ctaDisabled
          />
        </CaseStudyRevealSection>

        <CaseStudyRevealSection
          reveal="immediate"
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
                    desktopSizes="(min-width: 1000px) 1000px, 100vw"
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
          reveal="scroll"
          className="sportsbook-case-study__overview"
          ariaLabel="Overview"
        >
          <SectionDivider number="01" title="Overview" />
          <CaseStudyInlineCopy
            title="Curated by Design"
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
          reveal="scroll"
          className="sportsbook-case-study__foundations"
          ariaLabel="Transaction"
        >
          <SectionDivider number="02" title="Transaction" />
          <CaseStudyInlineCopy
            title="A Dynamic Betslip"
            body="The betslip grows alongside every selection, providing continuous feedback while keeping stake, odds and potential returns visible throughout the betting journey."
          />
          <div
            ref={foundationsMediaRef}
            className="sportsbook-case-study__section-media"
          >
            <CaseStudyFullWidthFrame>
              <SportsbookBetslipSectionPreview />
            </CaseStudyFullWidthFrame>
          </div>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection
          reveal="scroll"
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
          reveal="scroll"
          className="sportsbook-case-study__architecture"
          ariaLabel="Expansion"
        >
          <SectionDivider number="04" title="Expansion" />
          <CaseStudyInlineCopy
            title="Scalable by Design"
            body="A shared event model allows new sports to inherit the same interaction patterns while adapting markets and event data."
          />
          <div className="sportsbook-case-study__section-media">
            <SportsbookExpansionPreview />
          </div>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection
          reveal="scroll"
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
