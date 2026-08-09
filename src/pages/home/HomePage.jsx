import { Footer } from "../../components/footer/Footer.jsx";
import { Hero } from "../../components/hero/Hero.jsx";
import { Nav } from "../../components/nav/Nav.jsx";
import { PageMeta } from "../../components/page-meta/PageMeta.jsx";
import "../../styles/case-study-layout.css";
import { CaseStudySection } from "./components/CaseStudySection.jsx";
import { PhilosophySection } from "./components/PhilosophySection.jsx";
import "./HomePage.css";

const HOME_PAGE_TITLE = "Harry Maher — Senior Product Designer";
const HOME_META_DESCRIPTION =
  "Interactive portfolio showcasing product design, scalable interfaces, design systems, and end-to-end case studies from concept through implementation.";
const HOME_OG_IMAGE = "/og/home.jpg";

export function HomePage() {
  return (
    <main className="home-page">
      <PageMeta
        title={HOME_PAGE_TITLE}
        description={HOME_META_DESCRIPTION}
        canonicalPath="/"
        ogImage={HOME_OG_IMAGE}
      />
      <Nav />
      <Hero />
      <PhilosophySection />
      <CaseStudySection />
      <Footer />
    </main>
  );
}
