import { Hero } from "../../components/hero/Hero.jsx";
import { Nav } from "../../components/nav/Nav.jsx";
import { CaseStudySection } from "./components/CaseStudySection.jsx";
import { PhilosophySection } from "./components/PhilosophySection.jsx";
import "./HomePage.css";

export function HomePage() {
  return (
    <>
      <Nav />
      <Hero />
      <PhilosophySection />
      <CaseStudySection />
      <main className="home-page__scroll" />
    </>
  );
}
