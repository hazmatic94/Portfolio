import { useEffect, useState } from "react";
import { NavLogo } from "./NavLogo.jsx";
import "./Nav.css";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="nav-shell">
      <header className={`nav${scrolled ? " nav--scrolled" : ""}`}>
        <a href="/" className="nav__logo" aria-label="Harry Maher home">
          <NavLogo />
        </a>
        <nav className="nav__links" aria-label="Primary">
          <a
            href="/downloads/Harry_Maher_Product_Designer_CV.pdf"
            download="Harry_Maher_Product_Designer_CV.pdf"
            className="nav__link"
          >
            Cv
          </a>
          <a
            href="https://www.linkedin.com/in/harry-maher-067b73251/"
            className="nav__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ln
          </a>
        </nav>
      </header>
    </div>
  );
}
