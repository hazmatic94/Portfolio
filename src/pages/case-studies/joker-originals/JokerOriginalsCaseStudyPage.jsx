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
import { PageMeta } from "../../../components/page-meta/PageMeta.jsx";
import { PortfolioMockupStage } from "../../../components/portfolio-video-mockup/PortfolioMockupStage.jsx";
import { ProductAdoptionGamesGrid } from "../../../components/product-adoption-games-grid/ProductAdoptionGamesGrid.jsx";
import { MinesGameLayoutPreview } from "../../../components/mines-game-layout-preview/MinesGameLayoutPreview.jsx";
import { WinModalPreview } from "../../../components/win-modal-preview/WinModalPreview.jsx";
import { SectionDivider } from "../../../components/section-divider/SectionDivider.jsx";
import "../../../components/project-container/ProjectContainer.css";
import "../../../styles/case-study-layout.css";
import "../../../pages/home/components/CaseStudySection.css";
import "./JokerOriginalsCaseStudyPage.css";

const JOKER_ORIGINALS_PAGE_TITLE = "Joker Originals";
const JOKER_ORIGINALS_META_DESCRIPTION =
  "Original casino games designed and built on a shared platform, combining reusable gameplay systems, motion, and scalable architecture.";
const JOKER_ORIGINALS_OG_IMAGE = "/og/joker-originals.png";

export function JokerOriginalsCaseStudyPage() {
  const motionSystemsBaseId = useId();
  const [motionSystemsTab, setMotionSystemsTab] = useState("mines");
  const [minesCount, setMinesCount] = useState("1");

  return (
    <>
      <PageMeta
        title={JOKER_ORIGINALS_PAGE_TITLE}
        description={JOKER_ORIGINALS_META_DESCRIPTION}
        canonicalPath="/case-studies/joker-originals"
        ogImage={JOKER_ORIGINALS_OG_IMAGE}
      />
      <Nav />
      <main className="joker-originals-case-study">
        <CaseStudyRevealSection
          as="div"
          className="joker-originals-case-study__shell joker-originals-case-study__intro-reveal"
        >
          <div className="joker-originals-case-study__top">
            <CaseStudyPageHeader lead="Case Study" title="Joker Originals" />
          </div>

          <CaseStudyIntro
            title="Original Games"
            body="With the shell already in place, each game became about designing its rules, assets and interactions."
            ctaLabel="View Live Demo"
            ctaHref="https://original-games-seven.vercel.app"
          />
        </CaseStudyRevealSection>

        <CaseStudyRevealSection
          reveal="immediate"
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
          reveal="scroll"
          className="joker-originals-case-study__overview"
          ariaLabel="Collection"
        >
          <SectionDivider number="01" title="Collection" />
          <CaseStudyInlineCopy
            title="Four original games"
            body="Each game explored a different style of play, proving the framework was flexible enough to support new ideas within the constraints already in place."
          />
          <div className="joker-originals-case-study__section-media">
            <ProductAdoptionGamesGrid />
          </div>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection
          reveal="scroll"
          className="joker-originals-case-study__foundations"
          ariaLabel="Gameplay"
        >
          <SectionDivider number="02" title="Gameplay" />
          <CaseStudyInlineCopy
            title="Risk and reward"
            body="Simple mechanics made each game easy to learn, while probability and multipliers created depth through player decisions."
          />
          <div className="joker-originals-case-study__section-media">
            <JokerOriginalsGameplayPreview />
          </div>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection
          reveal="scroll"
          className="joker-originals-case-study__interactions"
          ariaLabel="Interactions"
        >
          <SectionDivider number="03" title="Interactions" />
          <CaseStudyInlineCopy
            title="Interactive Components"
            body="Every game introduced its own components, while shared interaction patterns kept the experience consistent across the platform."
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
          reveal="scroll"
          className="joker-originals-case-study__architecture"
          ariaLabel="Vision"
        >
          <SectionDivider number="04" title="Vision" />
          <CaseStudyInlineCopy
            title="Shared Patterns"
            body="Core gameplay patterns stayed familiar while each game’s mechanics introduced something new."
          />
          <div className="joker-originals-case-study__section-media">
            <div className="joker-originals-vision-layout">
              <div className="joker-originals-vision-layout__desktop-split">
                <CaseStudySplitFrames
                  left={<MinesGameLayoutPreview />}
                  right={<WinModalPreview />}
                  leftPanelClassName="case-study-split-frames__panel--fixed"
                  rightPanelClassName="case-study-split-frames__panel--fill"
                />
              </div>
              <div className="joker-originals-vision-layout__mobile-shell">
                <WinModalPreview />
              </div>
            </div>
          </div>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection
          reveal="scroll"
          className="joker-originals-case-study__next-project"
          ariaLabel="Next project"
        >
          <div className="joker-originals-case-study__shell">
            <CaseStudyProjectRail
              lead="04"
              title="Sportsbook"
              href="/case-studies/sportsbook"
            />
          </div>
          <Link
            to="/case-studies/sportsbook"
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
