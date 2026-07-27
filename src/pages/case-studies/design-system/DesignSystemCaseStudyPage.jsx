import { DesignSystemPackageExportsPreview } from "../../../components/design-system-exports-preview/DesignSystemPackageExportsPreview.jsx";
import { DesignSystemUsagePreview } from "../../../components/design-system-usage-preview/DesignSystemUsagePreview.jsx";
import { CaseStudyInlineCopy } from "../../../components/case-study-inline-copy/CaseStudyInlineCopy.jsx";
import { TypographyTokenListPreview } from "../../../components/typography-token-list-preview/TypographyTokenListPreview.jsx";
import { ComponentShowcaseGrid } from "../../../components/component-showcase-grid/ComponentShowcaseGrid.jsx";
import { ProductAdoptionGamesGrid } from "../../../components/product-adoption-games-grid/ProductAdoptionGamesGrid.jsx";
import { FoundationTokenCardsGrid } from "../../../components/foundation-token-cards-grid/FoundationTokenCardsGrid.jsx";
import { CaseStudySplitFrames } from "../../../components/case-study-split-frames/CaseStudySplitFrames.jsx";
import { ComponentCard } from "../../../components/component-card/ComponentCard.jsx";
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
import "./DesignSystemCaseStudyPage.css";

export function DesignSystemCaseStudyPage() {
  return (
    <>
      <Nav />
      <main className="design-system-case-study">
        <CaseStudyRevealSection
          as="div"
          className="design-system-case-study__shell design-system-case-study__intro-reveal"
        >
          <div className="design-system-case-study__top">
            <CaseStudyPageHeader lead="Case Study" title="Design System" />
          </div>

          <CaseStudyIntro
            title="One package. Every product."
            body="I built a shared design system so Joker's shell, games and docs could ship from one source of truth, rather than five parallel ones."
            ctaLabel="View Live Demo"
          />
        </CaseStudyRevealSection>

        <CaseStudyRevealSection
          className="design-system-case-study__hero-section"
          ariaLabel="Case study hero"
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
        </CaseStudyRevealSection>

        <CaseStudyRevealSection
          className="design-system-case-study__overview"
          ariaLabel="Overview"
        >
          <SectionDivider number="01" title="Overview" />
          <CaseStudyInlineCopy
            title="One foundation instead of five"
            body="Before this, each surface reinvented spacing, colour and patterns. I defined the base tokens and structure so every product started from the same floor."
          />
          <div className="design-system-case-study__section-media">
            <CaseStudySplitFrames />
          </div>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection
          className="design-system-case-study__foundations"
          ariaLabel="Foundations"
        >
          <SectionDivider number="02" title="Foundations" />
          <CaseStudyInlineCopy
            title="A shared language for design and engineering"
            body="I set naming, roles and usage rules so a colour or type style meant the same thing in Figma and in code, with no translation layer and no drift."
          />
          <div className="design-system-case-study__section-media">
            <CaseStudySplitFrames
              left={<FoundationTokenCardsGrid />}
              leftFramed={false}
              right={<TypographyTokenListPreview />}
            />
          </div>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection
          className="design-system-case-study__components"
          ariaLabel="Components"
        >
          <SectionDivider number="03" title="Components" />
          <CaseStudyInlineCopy
            title="Primitives first, products second"
            body="I designed the core set of buttons, inputs, status and motion pieces as a real API, not a dump of screens. Games and shell compose from those, they don't fork them."
          />
          <div className="design-system-case-study__section-media">
            <ComponentShowcaseGrid />
          </div>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection
          className="design-system-case-study__developer-experience"
          ariaLabel="Built for production"
        >
          <SectionDivider number="04" title="Built for production" />
          <CaseStudyInlineCopy
            title="From design decisions to production code"
            body="I didn't just define the system, I built Originals with it. Every game was a stress test for the components, tokens and patterns. When something broke in real use, it went back into the package."
          />
          <div className="design-system-case-study__section-media">
            <CaseStudySplitFrames
              left={<DesignSystemPackageExportsPreview />}
              right={<DesignSystemUsagePreview />}
            />
          </div>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection
          className="design-system-case-study__product-adoption"
          ariaLabel="Product adoption"
        >
          <SectionDivider number="05" title="Product Adoption" />
          <CaseStudyInlineCopy
            title="Same system across the platform"
            body="Once the package landed, Originals, shell and docs all pulled from it. That's the point, one system showing up in real products rather than a library that lives in Figma."
          />
          <div className="design-system-case-study__section-media">
            <ProductAdoptionGamesGrid />
          </div>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection
          className="design-system-case-study__next-project"
          ariaLabel="Next project"
        >
          <div className="design-system-case-study__shell">
            <CaseStudyProjectRail lead="02" title="Application Shell" />
          </div>
          <h2 className="design-system-case-study__next-label">Next</h2>
          <FooterLegal />
        </CaseStudyRevealSection>
      </main>
    </>
  );
}
