import { Footer } from "../../components/footer/Footer.jsx";
import { Hero } from "../../components/hero/Hero.jsx";
import { Nav } from "../../components/nav/Nav.jsx";
import "../../styles/case-study-layout.css";
import { CaseStudySection } from "./components/CaseStudySection.jsx";
import { PhilosophySection } from "./components/PhilosophySection.jsx";
import "./HomePage.css";

export function HomePage() {
  return (
    <main className="home-page">
      <Nav />
      <Hero />
      <PhilosophySection />
      <CaseStudySection />
      <Footer />
    </main>
  );
}
