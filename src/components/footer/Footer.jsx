import { Button } from "@joker/design-system";
import { useInViewOnce } from "../../hooks/useInViewOnce.js";
import "./Footer.css";

export function Footer() {
  const [ref, inView] = useInViewOnce({ threshold: 0.35 });

  return (
    <div
      ref={ref}
      className={`site-footer-group site-footer-group--reveal${inView ? " is-in-view" : ""}`}
    >
      <footer className="site-footer" aria-label="Footer">
        <div className="site-footer__status-row">
          <span className="site-footer__rule" aria-hidden="true" />
          <span className="site-footer__status">
            <span className="site-footer__status-dot" aria-hidden="true" />
            Available for Work
          </span>
          <span className="site-footer__rule" aria-hidden="true" />
        </div>

        <div className="site-footer__copy">
          <h2 className="site-footer__title">Exploring new opportunities.</h2>
          <p className="site-footer__body">
            I&apos;m looking to join teams building thoughtful digital products
            through strong design systems, interaction design and modern frontend
            workflows.
          </p>
        </div>

        <div className="site-footer__cta">
          <Button variant="secondary">Get in Touch</Button>
        </div>

        <div className="site-footer__logo">
          <video
            className="site-footer__logo-video"
            src="/hmLogoV1.mp4"
            autoPlay
            loop
            muted
            playsInline
            aria-label="Harry Maher logo"
          />
        </div>
      </footer>

      <p className="site-footer__legal">
        © 2026 Harry Maher. All rights reserved.
      </p>
    </div>
  );
}
