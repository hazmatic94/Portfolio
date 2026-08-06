import { useId, useState } from "react";
import { Link } from "react-router-dom";
import { CaseStudyInlineCopy } from "../../../components/case-study-inline-copy/CaseStudyInlineCopy.jsx";
import { CaseStudyMediaPlaceholder } from "../../../components/case-study-media-placeholder/CaseStudyMediaPlaceholder.jsx";
import {
  JokerOriginalsGameplayPreview,
  JokerOriginalsGameplayTabBar,
} from "../../../components/joker-originals-gameplay-preview/JokerOriginalsGameplayPreview.jsx";
import { JokerOriginalsMinesInteractivePreview } from "../../../components/joker-originals-mines-interactive-preview/JokerOriginalsMinesInteractivePreview.jsx";
import { JokerOriginalsHiloCardStackPreview } from "../../../components/joker-originals-hilo-card-stack-preview/JokerOriginalsHiloCardStackPreview.jsx";
import { JokerOriginalsCoinflipCoinTossPreview } from "../../../components/joker-originals-coinflip-coin-toss-preview/JokerOriginalsCoinflipCoinTossPreview.jsx";
import { JokerOriginalsRouletteGameSlotPreview } from "../../../components/joker-originals-roulette-game-slot-preview/JokerOriginalsRouletteGameSlotPreview.jsx";
import { CoinFlipPanelPreview } from "../../../components/coin-flip-panel-preview/CoinFlipPanelPreview.jsx";
import { RoulettePanelPreview } from "../../../components/roulette-panel-preview/RoulettePanelPreview.jsx";
import { HiloPanelPreview } from "../../../components/hilo-panel-preview/HiloPanelPreview.jsx";
import { MinesPanelPreview } from "../../../components/mines-panel-preview/MinesPanelPreview.jsx";
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
  const motionSystemsBaseId = useId();
  const [motionSystemsTab, setMotionSystemsTab] = useState("mines");
  const [minesCount, setMinesCount] = useState("1");

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
          className="joker-originals-case-study__interactions"
          ariaLabel="Interactions"
        >
          <SectionDivider number="03" title="Interactions" />
          <CaseStudyInlineCopy
            title="Motion Systems"
            body="Consistent motion and feedback create familiar interactions while giving each game its own distinct personality."
          />
          <div className="joker-originals-case-study__section-media">
            <div className="joker-originals-motion-systems-layout">
              <JokerOriginalsGameplayTabBar
                baseId={motionSystemsBaseId}
                activeKey={motionSystemsTab}
                onChange={setMotionSystemsTab}
                panelId={`${motionSystemsBaseId}-motion-panel`}
                className="joker-originals-motion-systems-layout__tabs"
              />
              <CaseStudySplitFrames
                left={
                  motionSystemsTab === "mines" ? (
                    <MinesPanelPreview
                      minesCount={minesCount}
                      onMinesCountChange={setMinesCount}
                    />
                  ) : motionSystemsTab === "hilo" ? (
                    <HiloPanelPreview />
                  ) : motionSystemsTab === "coin-flip" ? (
                    <CoinFlipPanelPreview />
                  ) : motionSystemsTab === "roulette" ? (
                    <RoulettePanelPreview />
                  ) : (
                    <CaseStudyMediaPlaceholder
                      label="Motion system A"
                      variant="panel"
                    />
                  )
                }
                right={
                  motionSystemsTab === "mines" ? (
                    <JokerOriginalsMinesInteractivePreview minesCount={minesCount} />
                  ) : motionSystemsTab === "hilo" ? (
                    <JokerOriginalsHiloCardStackPreview />
                  ) : motionSystemsTab === "coin-flip" ? (
                    <JokerOriginalsCoinflipCoinTossPreview />
                  ) : motionSystemsTab === "roulette" ? (
                    <JokerOriginalsRouletteGameSlotPreview />
                  ) : (
                    <CaseStudyMediaPlaceholder
                      label="Motion system B"
                      variant="panel"
                    />
                  )
                }
                leftPanelClassName="case-study-split-frames__panel--fixed"
                rightPanelClassName="case-study-split-frames__panel--fill"
              />
            </div>
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
