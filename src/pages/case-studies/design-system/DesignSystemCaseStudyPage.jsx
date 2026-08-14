import { Link } from "react-router-dom";
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
import { PageMeta } from "../../../components/page-meta/PageMeta.jsx";
import { PortfolioMockupStage } from "../../../components/portfolio-video-mockup/PortfolioMockupStage.jsx";
import { SectionDivider } from "../../../components/section-divider/SectionDivider.jsx";
import "../../../components/project-container/ProjectContainer.css";
import "../../../styles/case-study-layout.css";
import "../../../pages/home/components/CaseStudySection.css";
import "./DesignSystemCaseStudyPage.css";

const DESIGN_SYSTEM_PAGE_TITLE = "Design System";
const DESIGN_SYSTEM_META_DESCRIPTION =
  "Interactive case study exploring the design system that unified Joker's platform, games, and documentation through shared tokens, components, and production code.";
const DESIGN_SYSTEM_OG_IMAGE = "/og/design-system.jpg";

export function DesignSystemCaseStudyPage() {
  return (
    <>
      <PageMeta
        title={DESIGN_SYSTEM_PAGE_TITLE}
        description={DESIGN_SYSTEM_META_DESCRIPTION}
        canonicalPath="/case-studies/design-system"
        ogImage={DESIGN_SYSTEM_OG_IMAGE}
      />
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
            title="Design System"
            body="I built a shared design system that unified Joker's shell, games and documentation around a single source of truth."
            ctaLabel="View Live Demo"
            ctaHref="https://joker-ds.vercel.app"
          />
        </CaseStudyRevealSection>

        <CaseStudyRevealSection
          reveal="immediate"
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
                    desktopSizes="(min-width: 1000px) 1000px, 100vw"
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
          reveal="scroll"
          className="design-system-case-study__overview"
          ariaLabel="Overview"
        >
          <SectionDivider number="01" title="Overview" />
          <CaseStudyInlineCopy
            title="One Foundation"
            body="I invested in the foundations first, creating a consistent system that streamlined every product that followed."
          />
          <div className="design-system-case-study__section-media">
            <CaseStudySplitFrames />
          </div>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection
          reveal="scroll"
          className="design-system-case-study__foundations"
          ariaLabel="Foundations"
        >
          <SectionDivider number="02" title="Foundations" />
          <CaseStudyInlineCopy
            title="A Shared Language"
            body="I defined the foundations upfront, removing guesswork and giving design and code the same shared language."
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
          reveal="scroll"
          className="design-system-case-study__components"
          ariaLabel="Components"
        >
          <SectionDivider number="03" title="Components" />
          <CaseStudyInlineCopy
            title="Building Blocks"
            body="Core controls and game-specific components became reusable building blocks, making new experiences faster to assemble and iterate."
          />
          <div className="design-system-case-study__section-media">
            <ComponentShowcaseGrid />
          </div>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection
          reveal="scroll"
          className="design-system-case-study__developer-experience"
          ariaLabel="Production"
        >
          <SectionDivider number="04" title="Production" />
          <CaseStudyInlineCopy
            title="Import Once"
            body="The system shipped as a single package, making it simple to bring the same components, tokens and styles into each build."
          />
          <div className="design-system-case-study__section-media">
            <CaseStudySplitFrames
              left={<DesignSystemPackageExportsPreview />}
              right={<DesignSystemUsagePreview />}
            />
          </div>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection
          reveal="scroll"
          className="design-system-case-study__product-adoption"
          ariaLabel="Adoption"
        >
          <SectionDivider number="05" title="Adoption" />
          <CaseStudyInlineCopy
            title="System in Action"
            body="Consistency speaks for itself. One place to update, with changes flowing across the entire platform."
          />
          <div className="design-system-case-study__section-media">
            <ProductAdoptionGamesGrid />
          </div>
        </CaseStudyRevealSection>

        <CaseStudyRevealSection
          reveal="scroll"
          className="design-system-case-study__next-project"
          ariaLabel="Next project"
        >
          <div className="design-system-case-study__shell">
            <CaseStudyProjectRail
              lead="02"
              title="Application Shell"
              href="/case-studies/application-shell"
            />
          </div>
          <Link
            to="/case-studies/application-shell"
            className="design-system-case-study__next-label"
          >
            Next
          </Link>
          <FooterLegal />
        </CaseStudyRevealSection>
      </main>
    </>
  );
}
