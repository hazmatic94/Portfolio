import { Link } from "react-router-dom";
import { CaseStudyFullWidthFrame } from "../../../components/case-study-full-width-frame/CaseStudyFullWidthFrame.jsx";
import { CaseStudyInlineCopy } from "../../../components/case-study-inline-copy/CaseStudyInlineCopy.jsx";
import { CaseStudyMediaPlaceholder } from "../../../components/case-study-media-placeholder/CaseStudyMediaPlaceholder.jsx";
import { JokerOriginalsGameplayPreview } from "../../../components/joker-originals-gameplay-preview/JokerOriginalsGameplayPreview.jsx";
import { CaseStudySplitFrames } from "../../../components/case-study-split-frames/CaseStudySplitFrames.jsx";
import { ComponentCard } from "../../../components/component-card/ComponentCard.jsx";
import { ComponentCardMobilePreview } from "../../../components/component-card/ComponentCardMobilePreview.jsx";
import { CaseStudyIntro } from "../../../components/case-study-intro/CaseStudyIntro.jsx";
import { CaseStudyPageHeader, CaseStudyProjectRail } from "../../../components/case-study-page-header/CaseStudyPageHeader.jsx";
import { CaseStudyRevealSection } from "../../../components/case-study-reveal/CaseStudyRevealSection.jsx";
import { FooterLegal } from "../../../components/footer/Footer.jsx";
import { Nav } from "../../../components/nav/Nav.jsx";
import { PortfolioMockupStage } from "../../../components/portfolio-video-mockup/PortfolioMockupStage.jsx";
import { ProductAdoptionGamesGrid } from "../../../components/product-adoption-games-grid/ProductAdoptionGamesGrid.jsx";
import { SectionDivider } from "../../../components/section-divider/SectionDivider.jsx";
import "../../../components/project-container/ProjectContainer.css";
import "../../../styles/case-study-layout.css";
import "../../../pages/home/components/CaseStudySection.css";
import "./JokerOriginalsCaseStudyPage.css";

export function JokerOriginalsCaseStudyPage() {
  return (
    <>
      <Nav />
      <main className="application-shell-case-study joker-originals-case-study">
        <CaseStudyRevealSection
          as="div"
          className="joker-originals-case-study__shell joker-originals-case-study__intro-reveal"
        >
          <div className="joker-originals-case-study__top">
            <CaseStudyPageHeader lead="Case Study" title="Joker Originals" />
          </div>

          <CaseStudyIntro
            title="Joker Originals"
            body="Original games, built end to end — mechanics, motion, and reusable gameplay components on top of the shell."
            ctaLabel="View Live Demo"
            ctaHref="/case-studies/joker-originals"
          />
        </CaseStudyRevealSection>

        <CaseStudyRevealSection
          className="joker-originals-case-study__hero-section"
          ariaLabel="Case study hero"
        >
          <div className="joker-originals-case-study__shell">
            <article className="joker-originals-case-study__hero project-container">
              <Link
                to="/case-studies/joker-originals"
                className="project-container__media project-container__media--linked"
                aria-label="View Joker Originals case study"
              >
                <div className="project-container__media-clip">
                  <PortfolioMockupStage
                    desktopSrc="/images/joker-originals-hero.png"
                    desktopSrcSet="/images/joker-originals-hero.png 1366w, /images/joker-originals-hero@2x.png 2732w"
                    desktopSizes="800px"
                    desktopWidth={1366}
                    desktopHeight={900}
                    desktopLabel="Joker Plus Roulette with a three-win streak"
                  />
                </div>
                <ComponentCard className="project-container__media-overlay">
                  <ComponentCardMobilePreview
                    src="/images/joker-originals-mobile-menu.png"
                    srcSet="/images/joker-originals-mobile-menu.png 390w, /images/joker-originals-mobile-menu@2x.png 1170w"
                    alt="Joker Plus Mines mobile game with gold win tiles"
                  />
                </ComponentCard>
              </Link>
            </article>
          </div>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection
          className="joker-originals-case-study__overview"
          ariaLabel="Collection"
        >
          <SectionDivider number="01" title="Collection" />
          <CaseStudyInlineCopy
            title="Four Original Games"
            body="After establishing the application shell, I designed and built a scalable library of original casino games that could be expanded consistently over time."
          />
          <div className="joker-originals-case-study__section-media">
            <ProductAdoptionGamesGrid />
          </div>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection
          className="joker-originals-case-study__foundations"
          ariaLabel="Gameplay"
        >
          <SectionDivider number="02" title="Gameplay" />
          <CaseStudyInlineCopy
            title="Risk and Reward"
            body="Each game balances player decisions, probability and multipliers to create rewarding moments while maintaining a consistent level of risk."
          />
          <div className="joker-originals-case-study__section-media">
            <JokerOriginalsGameplayPreview />
          </div>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection
          className="joker-originals-case-study__components"
          ariaLabel="Components"
        >
          <SectionDivider number="03" title="Components" />
          <CaseStudyInlineCopy
            title="Gameplay Building Blocks"
            body="Chips, tiles, wheels, and betting controls were composed from the design system and extended where gameplay needed more than a generic pattern."
          />
          <div className="joker-originals-case-study__section-media">
            <CaseStudyFullWidthFrame>
              <CaseStudyMediaPlaceholder label="Gameplay components preview" />
            </CaseStudyFullWidthFrame>
          </div>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection
          className="joker-originals-case-study__architecture"
          ariaLabel="Portfolio"
        >
          <SectionDivider number="04" title="Portfolio" />
          <CaseStudyInlineCopy
            title="Shipped on the Platform"
            body="Each Original shipped inside the same shell and design system — proof that the stack held up across genres, not just a single demo game."
          />
          <div className="joker-originals-case-study__section-media">
            <CaseStudySplitFrames
              left={<CaseStudyMediaPlaceholder label="Shell context" variant="panel" />}
              right={<ProductAdoptionGamesGrid />}
              leftPanelClassName="case-study-split-frames__panel--fixed"
              rightPanelClassName="case-study-split-frames__panel--fill"
            />
          </div>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection
          className="joker-originals-case-study__next-project"
          ariaLabel="Next project"
        >
          <div className="joker-originals-case-study__shell">
            <CaseStudyProjectRail
              lead="01"
              title="Design System"
              href="/case-studies/design-system"
            />
          </div>
          <Link
            to="/case-studies/design-system"
            className="joker-originals-case-study__next-label"
          >
            Next
          </Link>
          <FooterLegal />
        </CaseStudyRevealSection>
      </main>
    </>
  );
}
