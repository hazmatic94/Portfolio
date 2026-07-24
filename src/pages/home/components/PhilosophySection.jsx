import "./PhilosophySection.css";

export function PhilosophySection() {
  return (
    <section className="philosophy-section" aria-label="Philosophy">
      <div className="philosophy-section__content">
        <h2 className="philosophy-section__title">
          <span className="philosophy-section__title-lead">I move fast.</span>{" "}
          <span className="philosophy-section__title-rest">
            I&apos;ve spent the last five years helping teams build better products
            through systems thinking, design clarity and scalable foundations
          </span>
        </h2>
        <p className="philosophy-section__body">
          Whether I&apos;m designing interfaces, building design systems or digging
          through the codebase, my focus remains the same: create products that are
          clear, efficient and built to scale.
        </p>
      </div>
    </section>
  );
}
