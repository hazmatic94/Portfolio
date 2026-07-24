import { ComponentCard } from "../../../components/component-card/ComponentCard.jsx";
import { useInViewOnce } from "../../../hooks/useInViewOnce.js";
import { ComponentCardMobilePreview } from "../../../components/component-card/ComponentCardMobilePreview.jsx";
import { PortfolioMockupStage } from "../../../components/portfolio-video-mockup/PortfolioMockupStage.jsx";
import { ProjectContainer } from "../../../components/project-container/ProjectContainer.jsx";
import { SectionDivider } from "../../../components/section-divider/SectionDivider.jsx";
import "./CaseStudySection.css";

const CASE_STUDIES = [
  {
    number: "01",
    section: "Foundation",
    label: "Design System",
    title: "NPM package consumed across the platform",
    body: "Building a reusable component library, documentation platform and shared architecture that accelerated product development.",
    highlight:
      "Design + engineering shared a single source of truth.",
    chips: [
      "Design Tokens",
      "Npm package",
      "Interactive Docs",
      "Component API",
    ],
    mediaOverlay: (
      <ComponentCard className="project-container__media-overlay" showCode />
    ),
    media: (
      <PortfolioMockupStage
        desktopSrc="/images/design-system-hero.png"
        desktopSrcSet="/images/design-system-hero.png 1366w, /images/design-system-hero@2x.png 2732w"
        desktopSizes="800px"
        desktopWidth={1366}
        desktopHeight={914}
        desktopLabel="Joker design system colours documentation"
      />
    ),
  },
  {
    number: "02",
    section: "Architecture",
    label: "Responsive Shell",
    title: "One responsive shell powering 5 original games",
    body: "Creating a scalable application shell that unified navigation, betting panels, responsive layouts and game experiences.",
    highlight:
      "New games plug into shell layout instead of rebuilding chrome.",
    chips: ["Responsive shell", "Betting Panels", "Layout System"],
    mediaOverlay: (
      <ComponentCard className="project-container__media-overlay">
        <ComponentCardMobilePreview
          src="/images/game-shell-mobile-menu.png"
          srcSet="/images/game-shell-mobile-menu.png 390w, /images/game-shell-mobile-menu@2x.png 1170w"
          alt="Joker Plus mobile navigation menu with Originals expanded"
        />
      </ComponentCard>
    ),
    media: (
      <PortfolioMockupStage
        desktopSrc="/images/game-shell-hero.png"
        desktopSrcSet="/images/game-shell-hero.png 1366w, /images/game-shell-hero@2x.png 2732w"
        desktopSizes="800px"
        desktopWidth={1366}
        desktopHeight={900}
        desktopLabel="Joker Plus responsive game shell with Hilo"
      />
    ),
  },
  {
    number: "03",
    section: "Experience",
    label: "Joker Originals",
    title: "Gameplay primitives for Mines, HiLo, Roulette, Coin Flip + more",
    body: "Crafting original game mechanics, motion systems and reusable gameplay components",
    highlight: "Games feel native to the platform, not bolted on.",
    chips: ["Game Components", "Motion System", "Interaction Design"],
    mediaOverlay: (
      <ComponentCard className="project-container__media-overlay">
        <ComponentCardMobilePreview
          src="/images/joker-originals-mobile-menu.png"
          srcSet="/images/joker-originals-mobile-menu.png 390w, /images/joker-originals-mobile-menu@2x.png 1170w"
          alt="Joker Plus Mines mobile game with gold win tiles"
        />
      </ComponentCard>
    ),
    media: (
      <PortfolioMockupStage
        desktopSrc="/images/joker-originals-hero.png"
        desktopSrcSet="/images/joker-originals-hero.png 1366w, /images/joker-originals-hero@2x.png 2732w"
        desktopSizes="800px"
        desktopWidth={1366}
        desktopHeight={900}
        desktopLabel="Joker Plus Roulette with a three-win streak"
      />
    ),
  },
];

function CaseStudyBlock({
  number,
  section,
  title,
  body,
  highlight = null,
  chips = [],
  media = null,
  mediaOverlay = null,
}) {
  const [ref, inView] = useInViewOnce();

  return (
    <section
      ref={ref}
      className={`case-study-section case-study-block case-study-block--reveal${inView ? " is-in-view" : ""}`}
      aria-label={`${section} case study`}
    >
      <SectionDivider number={number} title={section} />
      <div className="case-study-section__projects">
        <ProjectContainer
          title={title}
          body={body}
          highlight={highlight}
          chips={chips}
          media={media}
          mediaOverlay={mediaOverlay}
        />
      </div>
    </section>
  );
}

export function CaseStudySection() {
  return (
    <>
      {CASE_STUDIES.map((study) => (
        <CaseStudyBlock key={study.number} {...study} />
      ))}
    </>
  );
}
