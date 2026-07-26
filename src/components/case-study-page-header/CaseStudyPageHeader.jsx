import { Link } from "react-router-dom";
import "./CaseStudyPageHeader.css";

function BackChevron() {
  return (
    <svg
      className="case-study-page-header__chevron"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12.5 15L7.5 10L12.5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CaseStudyPageHeader({
  lead,
  title,
  backHref = "/",
}) {
  return (
    <header className="case-study-page-header">
      <div className="case-study-page-header__side case-study-page-header__side--start">
        <Link to={backHref} className="case-study-page-header__back">
          <BackChevron />
          <span>Back</span>
        </Link>
        <span className="case-study-page-header__rule" aria-hidden="true" />
      </div>

      <p className="case-study-page-header__title">
        <span className="case-study-page-header__lead">{lead}</span>
        <span className="case-study-page-header__pipe" aria-hidden="true" />
        <span className="case-study-page-header__trail">{title}</span>
      </p>

      <span
        className="case-study-page-header__rule case-study-page-header__rule--end"
        aria-hidden="true"
      />
    </header>
  );
}
