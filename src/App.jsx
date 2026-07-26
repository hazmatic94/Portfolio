import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DesignSystemCaseStudyPage } from "./pages/case-studies/design-system/DesignSystemCaseStudyPage.jsx";
import { HomePage } from "./pages/home/HomePage.jsx";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/case-studies/design-system"
          element={<DesignSystemCaseStudyPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}
