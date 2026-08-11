import { useRef } from "react";
import { Link } from "react-router-dom";
import { ApplicationShellArchitecturePreview } from "../../../components/application-shell-architecture-preview/ApplicationShellArchitecturePreview.jsx";
import { ApplicationShellBlueprintPreview } from "../../../components/application-shell-blueprint-preview/ApplicationShellBlueprintPreview.jsx";
import { ApplicationShellConstraintsPreview } from "../../../components/application-shell-constraints-preview/ApplicationShellConstraintsPreview.jsx";
import { ApplicationShellNavigationPreview } from "../../../components/application-shell-navigation-preview/ApplicationShellNavigationPreview.jsx";
import { CaseStudyFullWidthFrame } from "../../../components/case-study-full-width-frame/CaseStudyFullWidthFrame.jsx";
import { CaseStudyInlineCopy } from "../../../components/case-study-inline-copy/CaseStudyInlineCopy.jsx";
import { CaseStudySplitFrames } from "../../../components/case-study-split-frames/CaseStudySplitFrames.jsx";
import { DesignSystemUsagePreview } from "../../../components/design-system-usage-preview/DesignSystemUsagePreview.jsx";
import { ComponentCard } from "../../../components/component-card/ComponentCard.jsx";
import { ComponentCardMobilePreview } from "../../../components/component-card/ComponentCardMobilePreview.jsx";
import { CaseStudyIntro } from "../../../components/case-study-intro/CaseStudyIntro.jsx";
import { CaseStudyPageHeader, CaseStudyProjectRail } from "../../../components/case-study-page-header/CaseStudyPageHeader.jsx";
import { CaseStudyRevealSection } from "../../../components/case-study-reveal/CaseStudyRevealSection.jsx";
import { FooterLegal } from "../../../components/footer/Footer.jsx";
import { Nav } from "../../../components/nav/Nav.jsx";
import { PageMeta } from "../../../components/page-meta/PageMeta.jsx";
import { PortfolioMockupStage } from "../../../components/portfolio-video-mockup/PortfolioMockupStage.jsx";
import { SectionDivider } from "../../../components/section-divider/SectionDivider.jsx";
import "../../../components/project-container/ProjectContainer.css";
import "../../../styles/case-study-layout.css";
import "../../../pages/home/components/CaseStudySection.css";
import "./ApplicationShellCaseStudyPage.css";

const APPLICATION_SHELL_PAGE_TITLE = "Application Shell";
const APPLICATION_SHELL_META_DESCRIPTION =
  "Building a responsive application shell that unified navigation, reusable layouts, and adaptive interaction patterns across the platform.";
const APPLICATION_SHELL_OG_IMAGE = "/og/application-shell.jpg";

export function ApplicationShellCaseStudyPage() {
  const structureMediaRef = useRef(null);

  return (
    <>
      <PageMeta
        title={APPLICATION_SHELL_PAGE_TITLE}
        description={APPLICATION_SHELL_META_DESCRIPTION}
        canonicalPath="/case-studies/application-shell"
        ogImage={APPLICATION_SHELL_OG_IMAGE}
      />
      <Nav />
      <main className="application-shell-case-study">
        <CaseStudyRevealSection
          as="div"
          className="application-shell-case-study__shell application-shell-case-study__intro-reveal"
        >
          <div className="application-shell-case-study__top">
            <CaseStudyPageHeader lead="Case Study" title="Application Shell" />
          </div>

          <CaseStudyIntro
            title="Application Shell"
            body="Building the shell upfront meant every new game started from the same structure, keeping implementation fast and consistent."
            ctaLabel="View Live Demo"
            ctaHref="/case-studies/application-shell"
          />
        </CaseStudyRevealSection>

        <CaseStudyRevealSection
          reveal="immediate"
          className="application-shell-case-study__hero-section"
          ariaLabel="Case study hero"
        >
          <div className="application-shell-case-study__shell">
            <article className="application-shell-case-study__hero project-container">
              <Link
                to="/case-studies/application-shell"
                className="project-container__media project-container__media--linked"
                aria-label="View Application Shell case study"
              >
                <div className="project-container__media-clip">
                  <PortfolioMockupStage
                    desktopSrc="/images/game-shell-hero.png"
                    desktopSrcSet="/images/game-shell-hero.png 1366w, /images/game-shell-hero@2x.png 2732w"
                    desktopSizes="800px"
                    desktopWidth={1366}
                    desktopHeight={900}
                    desktopLabel="Joker Plus responsive game shell with Hilo"
                  />
                </div>
                <ComponentCard className="project-container__media-overlay">
                  <ComponentCardMobilePreview
                    src="/images/game-shell-mobile-menu.png"
                    srcSet="/images/game-shell-mobile-menu.png 390w, /images/game-shell-mobile-menu@2x.png 1170w"
                    alt="Joker Plus mobile navigation menu with Originals expanded"
                  />
                </ComponentCard>
              </Link>
            </article>
          </div>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection
          reveal="scroll"
          className="application-shell-case-study__overview"
          ariaLabel="Blueprint"
        >
          <SectionDivider number="01" title="Blueprint" />
          <CaseStudyInlineCopy
            title="The framework"
            body="Each game plugged into the same layout, navigation and interaction patterns, keeping the experience familiar across the platform."
          />
          <div className="application-shell-case-study__section-media">
            <CaseStudyFullWidthFrame>
              <ApplicationShellBlueprintPreview />
            </CaseStudyFullWidthFrame>
          </div>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection
          reveal="scroll"
          className="application-shell-case-study__foundations"
          ariaLabel="Constraints"
        >
          <SectionDivider number="02" title="Constraints" />
          <CaseStudyInlineCopy
            title="Built around gameplay"
            body="By defining the shared patterns first, I could spend my time designing the parts that made each game unique."
          />
          <div className="application-shell-case-study__section-media">
            <CaseStudyFullWidthFrame>
              <ApplicationShellConstraintsPreview />
            </CaseStudyFullWidthFrame>
          </div>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection
          reveal="scroll"
          className="application-shell-case-study__components"
          ariaLabel="Behaviour"
        >
          <SectionDivider number="03" title="Behaviour" />
          <CaseStudyInlineCopy
            title="Adaptive betting panel"
            body="Rather than resizing the game, the interface adapted around it to maximise playable space."
          />
          <div className="application-shell-case-study__section-media">
            <CaseStudyFullWidthFrame>
              <ApplicationShellNavigationPreview />
            </CaseStudyFullWidthFrame>
          </div>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection
          reveal="scroll"
          className="application-shell-case-study__architecture"
          ariaLabel="Structure"
        >
          <SectionDivider number="04" title="Structure" />
          <CaseStudyInlineCopy
            title="Prebuilt Shell"
            body="The application shell was packaged into reusable components, letting me import the platform structure instead of rebuilding it for every game."
          />
          <div
            ref={structureMediaRef}
            className="application-shell-case-study__section-media application-shell-case-study__structure-media"
          >
            <CaseStudySplitFrames
              left={
                <DesignSystemUsagePreview scrollDriveRef={structureMediaRef} />
              }
              right={<ApplicationShellArchitecturePreview />}
              leftPanelClassName="case-study-split-frames__panel--fixed"
              rightPanelClassName="case-study-split-frames__panel--fill"
            />
          </div>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection
          reveal="scroll"
          className="application-shell-case-study__next-project"
          ariaLabel="Next project"
        >
          <div className="application-shell-case-study__shell">
            <CaseStudyProjectRail
              lead="03"
              title="Joker Originals"
              href="/case-studies/joker-originals"
            />
          </div>
          <Link
            to="/case-studies/joker-originals"
            className="application-shell-case-study__next-label"
          >
            Next
          </Link>
          <FooterLegal />
        </CaseStudyRevealSection>
      </main>
    </>
  );
}
