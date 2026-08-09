import { useEffect, useLayoutEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { ApplicationShellCaseStudyPage } from "./pages/case-studies/application-shell/ApplicationShellCaseStudyPage.jsx";
import { DesignSystemCaseStudyPage } from "./pages/case-studies/design-system/DesignSystemCaseStudyPage.jsx";
import { JokerOriginalsCaseStudyPage } from "./pages/case-studies/joker-originals/JokerOriginalsCaseStudyPage.jsx";
import { SportsbookCaseStudyPage } from "./pages/case-studies/sportsbook/SportsbookCaseStudyPage.jsx";
import { PageScrollHint } from "./components/portfolio-scroll-hint/PortfolioScrollHint.jsx";
import { HomePage } from "./pages/home/HomePage.jsx";
import "./styles/page-transitions.css";

function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    document.documentElement.classList.remove("route-changing");
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return null;
}

function ScrollRestoration() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  return null;
}

function AppRoutes() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <PageScrollHint />
      <div key={location.pathname} className="page-transition">
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/case-studies/design-system"
            element={<DesignSystemCaseStudyPage />}
          />
          <Route
            path="/case-studies/application-shell"
            element={<ApplicationShellCaseStudyPage />}
          />
          <Route
            path="/case-studies/joker-originals"
            element={<JokerOriginalsCaseStudyPage />}
          />
          <Route
            path="/case-studies/sportsbook"
            element={<SportsbookCaseStudyPage />}
          />
        </Routes>
      </div>
    </>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <ScrollRestoration />
      <AppRoutes />
    </BrowserRouter>
  );
}
