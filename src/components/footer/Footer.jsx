import { Button } from "@joker/design-system";
import { useInViewOnce } from "../../hooks/useInViewOnce.js";
import "./Footer.css";

export function FooterLegal({ className = "" }) {
  return (
    <p className={`site-footer__legal${className ? ` ${className}` : ""}`}>
      © 2026 Harry Maher. All rights reserved.
    </p>
  );
}

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
          <h2 className="site-footer__title">Interested in Working Together?</h2>
          <p className="site-footer__body">
            If you like my work and think I could help with your next project, feel
            free to get in touch.
          </p>
        </div>

        <div className="site-footer__cta">
          <Button variant="secondary">Get in Touch</Button>
        </div>

        <div className="site-footer__logo">
          <video
            className="site-footer__logo-video"
            src="/hmLogoV2.mp4"
            autoPlay
            loop
            muted
            playsInline
            aria-label="Harry Maher logo"
          />
        </div>
      </footer>

      <FooterLegal />
    </div>
  );
}
