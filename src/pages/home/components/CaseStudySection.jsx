import { useEffect, useRef, useState } from "react";
import { ProjectContainer } from "../../../components/project-container/ProjectContainer.jsx";
import { SectionDivider } from "../../../components/section-divider/SectionDivider.jsx";
import "./CaseStudySection.css";

const CHIPS = ["Front End", "Product Design", "React Library"];

const CASE_STUDIES = [
  {
    number: "01",
    section: "Foundation",
    label: "Design System",
    title: "Scaling a Casino Platform with a Design System",
    body: "Building a reusable component library, documentation platform and shared architecture that accelerated product development.",
  },
  {
    number: "02",
    section: "Architecture",
    label: "Responsive Shell",
    title: "Designing a Responsive Game Shell",
    body: "Creating a scalable application shell that unified navigation, betting panels, responsive layouts and game experiences.",
  },
  {
    number: "03",
    section: "Experience",
    label: "Joker Originals",
    title: "Designing Native Game Experiences",
    body: "Crafting original game mechanics, motion systems and reusable gameplay components",
  },
];

function useInViewOnce({ threshold = 0.28, rootMargin = "0px 0px -8% 0px" } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || inView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setInView(true);
        observer.disconnect();
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [inView, threshold, rootMargin]);

  return [ref, inView];
}

function CaseStudyBlock({ number, section, label, title, body, isFirst = false }) {
  const [ref, inView] = useInViewOnce();

  return (
    <div
      ref={ref}
      className={`case-study-block case-study-block--reveal${isFirst ? "" : " case-study-section__next"}${inView ? " is-in-view" : ""}`}
    >
      <SectionDivider number={number} title={section} />
      <div className="case-study-section__projects">
        <ProjectContainer
          label={label}
          title={title}
          body={body}
          chips={CHIPS}
        />
      </div>
    </div>
  );
}

export function CaseStudySection() {
  return (
    <section className="case-study-section" aria-label="Case studies">
      {CASE_STUDIES.map((study, index) => (
        <CaseStudyBlock
          key={study.number}
          {...study}
          isFirst={index === 0}
        />
      ))}
    </section>
  );
}
