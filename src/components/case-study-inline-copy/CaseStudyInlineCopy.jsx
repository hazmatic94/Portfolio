import "./CaseStudyInlineCopy.css";

export function CaseStudyInlineCopy({ title, body }) {
  return (
    <div className="case-study-inline-copy">
      <h2 className="case-study-inline-copy__title">{title}</h2>
      <p className="case-study-inline-copy__body">{body}</p>
    </div>
  );
}
