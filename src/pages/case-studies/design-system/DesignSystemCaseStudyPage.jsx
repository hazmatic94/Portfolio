import { CaseStudyInlineCopy } from "../../../components/case-study-inline-copy/CaseStudyInlineCopy.jsx";
import { TypographyTokenListPreview } from "../../../components/typography-token-list-preview/TypographyTokenListPreview.jsx";
import { FoundationTokenCardsGrid } from "../../../components/foundation-token-cards-grid/FoundationTokenCardsGrid.jsx";
import { CaseStudySplitFrames } from "../../../components/case-study-split-frames/CaseStudySplitFrames.jsx";
import { ComponentCard } from "../../../components/component-card/ComponentCard.jsx";
import { CaseStudyIntro } from "../../../components/case-study-intro/CaseStudyIntro.jsx";
import { CaseStudyPageHeader } from "../../../components/case-study-page-header/CaseStudyPageHeader.jsx";
import { Nav } from "../../../components/nav/Nav.jsx";
import { PortfolioMockupStage } from "../../../components/portfolio-video-mockup/PortfolioMockupStage.jsx";
import { SectionDivider } from "../../../components/section-divider/SectionDivider.jsx";
import "../../../components/project-container/ProjectContainer.css";
import "./DesignSystemCaseStudyPage.css";

export function DesignSystemCaseStudyPage() {
  return (
    <>
      <Nav />
      <main className="design-system-case-study">
        <div className="design-system-case-study__shell">
          <div className="design-system-case-study__top">
            <CaseStudyPageHeader lead="Case Study" title="Design System" />
          </div>

          <CaseStudyIntro
            title="One package. Every product."
            body="I built a shared design system so Joker's shell, games and docs could ship from one source of truth — not five parallel ones."
            ctaLabel="View Live Demo"
          />
        </div>

        <section
          className="design-system-case-study__hero-section"
          aria-label="Case study hero"
        >
          <div className="design-system-case-study__shell">
            <article className="design-system-case-study__hero project-container">
              <div className="project-container__media">
                <div className="project-container__media-clip">
                  <PortfolioMockupStage
                    desktopSrc="/images/design-system-hero.png"
                    desktopSrcSet="/images/design-system-hero.png 1366w, /images/design-system-hero@2x.png 2732w"
                    desktopSizes="800px"
                    desktopWidth={1366}
                    desktopHeight={914}
                    desktopLabel="Joker design system colours documentation"
                  />
                </div>
                <ComponentCard
                  className="project-container__media-overlay"
                  showCode
                />
              </div>
            </article>
          </div>
        </section>

        <section
          className="design-system-case-study__overview"
          aria-label="Overview"
        >
          <SectionDivider number="01" title="Overview" />
          <CaseStudyInlineCopy
            title="One foundation instead of five"
            body="Before this, each surface reinvented spacing, colour and patterns. I defined the base tokens and structure so every product started from the same floor."
          />
          <CaseStudySplitFrames />
        </section>

        <section
          className="design-system-case-study__foundations"
          aria-label="Foundations"
        >
          <SectionDivider number="02" title="Foundations" />
          <CaseStudyInlineCopy
            title="A shared language for design and engineering"
            body="I set naming, roles and usage rules so a colour or type style meant the same thing in Figma and in code — no translation layer, no drift."
          />
          <CaseStudySplitFrames
            left={<FoundationTokenCardsGrid />}
            leftFramed={false}
            right={<TypographyTokenListPreview />}
          />
        </section>
      </main>
    </>
  );
}
