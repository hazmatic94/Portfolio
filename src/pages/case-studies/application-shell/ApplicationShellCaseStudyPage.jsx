import { Link } from "react-router-dom";
import { ApplicationShellBlueprintPreview } from "../../../components/application-shell-blueprint-preview/ApplicationShellBlueprintPreview.jsx";
import { ApplicationShellConstraintsPreview } from "../../../components/application-shell-constraints-preview/ApplicationShellConstraintsPreview.jsx";
import { ApplicationShellNavigationPreview } from "../../../components/application-shell-navigation-preview/ApplicationShellNavigationPreview.jsx";
import { CaseStudyFullWidthFrame } from "../../../components/case-study-full-width-frame/CaseStudyFullWidthFrame.jsx";
import { CaseStudyInlineCopy } from "../../../components/case-study-inline-copy/CaseStudyInlineCopy.jsx";
import { CaseStudyMediaPlaceholder } from "../../../components/case-study-media-placeholder/CaseStudyMediaPlaceholder.jsx";
import { CaseStudySplitFrames } from "../../../components/case-study-split-frames/CaseStudySplitFrames.jsx";
import { ComponentCard } from "../../../components/component-card/ComponentCard.jsx";
import { ComponentCardMobilePreview } from "../../../components/component-card/ComponentCardMobilePreview.jsx";
import { CaseStudyIntro } from "../../../components/case-study-intro/CaseStudyIntro.jsx";
import { CaseStudyPageHeader, CaseStudyProjectRail } from "../../../components/case-study-page-header/CaseStudyPageHeader.jsx";
import { CaseStudyRevealSection } from "../../../components/case-study-reveal/CaseStudyRevealSection.jsx";
import { FooterLegal } from "../../../components/footer/Footer.jsx";
import { Nav } from "../../../components/nav/Nav.jsx";
import { PortfolioMockupStage } from "../../../components/portfolio-video-mockup/PortfolioMockupStage.jsx";
import { SectionDivider } from "../../../components/section-divider/SectionDivider.jsx";
import "../../../components/project-container/ProjectContainer.css";
import "../../../styles/case-study-layout.css";
import "../../../pages/home/components/CaseStudySection.css";
import "./ApplicationShellCaseStudyPage.css";

export function ApplicationShellCaseStudyPage() {
  return (
    <>
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
            body="A responsive application shell with reusable layouts and shared interaction patterns."
            ctaLabel="View Live Demo"
            ctaHref="/case-studies/application-shell"
          />
        </CaseStudyRevealSection>

        <CaseStudyRevealSection
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
          className="application-shell-case-study__overview"
          ariaLabel="Blueprint"
        >
          <SectionDivider number="01" title="Blueprint" />
          <CaseStudyInlineCopy
            title="The Framework"
            body="I designed a reusable application shell that established shared layouts, and constraints making new games faster to design, test and ship."
          />
          <div className="application-shell-case-study__section-media">
            <CaseStudyFullWidthFrame>
              <ApplicationShellBlueprintPreview />
            </CaseStudyFullWidthFrame>
          </div>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection
          className="application-shell-case-study__foundations"
          ariaLabel="Constraints"
        >
          <SectionDivider number="02" title="Constraints" />
          <CaseStudyInlineCopy
            title="Built Around Gameplay"
            body="Every game inherited the same foundational framework with predefined layout and gameplay constraints."
          />
          <div className="application-shell-case-study__section-media">
            <CaseStudyFullWidthFrame>
              <ApplicationShellConstraintsPreview />
            </CaseStudyFullWidthFrame>
          </div>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection
          className="application-shell-case-study__components"
          ariaLabel="Behaviour"
        >
          <SectionDivider number="03" title="Behaviour" />
          <CaseStudyInlineCopy
            title="Adaptive betting panel"
            body="I designed the betting panel to be responsive with the browser giving the user maximum game view."
          />
          <div className="application-shell-case-study__section-media">
            <CaseStudyFullWidthFrame>
              <ApplicationShellNavigationPreview />
            </CaseStudyFullWidthFrame>
          </div>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection
          className="application-shell-case-study__developer-experience"
          ariaLabel="Responsive behaviour"
        >
          <SectionDivider number="04" title="Responsive Behaviour" />
          <CaseStudyInlineCopy
            title="Designed for real viewport constraints"
            body="I didn't just resize desktop layouts. The shell was tested across breakpoints so menus, panels and game areas stayed usable on mobile without losing core actions."
          />
          <div className="application-shell-case-study__section-media">
            <CaseStudySplitFrames
              left={<CaseStudyMediaPlaceholder label="Responsive left — placeholder" />}
              right={<CaseStudyMediaPlaceholder label="Responsive right — placeholder" />}
            />
          </div>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection
          className="application-shell-case-study__product-adoption"
          ariaLabel="Platform rollout"
        >
          <SectionDivider number="05" title="Platform Rollout" />
          <CaseStudyInlineCopy
            title="Same shell across Originals and core product"
            body="Once the frame landed, new games plugged into the same navigation and panel system. The goal was one shell showing up everywhere, not a layout per release."
          />
          <div className="application-shell-case-study__section-media">
            <CaseStudyMediaPlaceholder label="Platform rollout — placeholder" variant="grid" />
          </div>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection
          className="application-shell-case-study__next-project"
          ariaLabel="Next project"
        >
          <div className="application-shell-case-study__shell">
            <CaseStudyProjectRail lead="03" title="Joker Originals" />
          </div>
          <h2 className="application-shell-case-study__next-label">Next</h2>
          <FooterLegal />
        </CaseStudyRevealSection>
      </main>
    </>
  );
}
