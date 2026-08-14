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
    title: "Design System",
    body: "One design system powering multiple products through shared components, tokens, and patterns.",
    chips: [
      "Design Tokens",
      "Npm package",
      "Component API",
    ],
    href: "/case-studies/design-system",
    mediaOverlay: (
      <ComponentCard className="project-container__media-overlay" showCode />
    ),
    media: (
      <PortfolioMockupStage
        desktopSrc="/images/design-system-hero.png"
        desktopSrcSet="/images/design-system-hero.png 1366w, /images/design-system-hero@2x.png 2732w"
        desktopSizes="(min-width: 1000px) 1000px, 100vw"
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
    title: "Application Shell",
    body: "A responsive foundation designed to streamline product development and accelerate future builds.",
    chips: ["Responsive shell", "Betting Panels", "Layout System"],
    href: "/case-studies/application-shell",
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
        desktopSizes="(min-width: 1000px) 1000px, 100vw"
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
    title: "Original Games",
    body: "Creating the platform’s first suite of original casino games from concept to implementation.",
    chips: ["Game Components", "Motion System", "Interaction Design"],
    href: "/case-studies/joker-originals",
    ctaLabel: "View Live Demo",
    ctaHref: "https://original-games-seven.vercel.app",
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
        desktopSizes="(min-width: 1000px) 1000px, 100vw"
        desktopWidth={1366}
        desktopHeight={900}
        desktopLabel="Joker Plus Roulette with a three-win streak"
      />
    ),
  },
  {
    number: "04",
    section: "Product",
    label: "Sportsbook",
    title: "Sportsbook",
    body: "Building a scalable sportsbook that solved today’s operational needs without limiting tomorrow’s growth.",
    chips: ["Markets", "Betslip", "Matches"],
    href: "/case-studies/sportsbook",
    ctaDisabled: true,
    mediaOverlay: (
      <ComponentCard className="project-container__media-overlay">
        <ComponentCardMobilePreview
          src="/images/sportsbook-mobile-betslip.png"
          srcSet="/images/sportsbook-mobile-betslip.png 390w, /images/sportsbook-mobile-betslip@2x.png 1170w"
          alt="Joker Plus mobile sportsbook with betslip open"
        />
      </ComponentCard>
    ),
    media: (
      <PortfolioMockupStage
        desktopSrc="/images/sportsbook-hero.png"
        desktopSrcSet="/images/sportsbook-hero.png 1366w, /images/sportsbook-hero@2x.png 2732w"
        desktopSizes="(min-width: 1000px) 1000px, 100vw"
        desktopWidth={1366}
        desktopHeight={900}
        desktopLabel="Joker Plus sportsbook with live matches and odds"
      />
    ),
  },
];

function CaseStudyBlock({
  number,
  section,
  title,
  body,
  chips = [],
  href = null,
  ctaLabel = "View Project",
  ctaHref = null,
  ctaDisabled = false,
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
          chips={chips}
          href={href}
          ctaLabel={ctaLabel}
          ctaHref={ctaHref}
          ctaDisabled={ctaDisabled}
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
