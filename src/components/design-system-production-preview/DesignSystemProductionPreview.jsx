import { CaseStudySplitFrames } from "../case-study-split-frames/CaseStudySplitFrames.jsx";
import { DesignSystemPackageExportsPreview } from "../design-system-exports-preview/DesignSystemPackageExportsPreview.jsx";
import { DesignSystemUsagePreview } from "../design-system-usage-preview/DesignSystemUsagePreview.jsx";

export function DesignSystemProductionPreview() {
  return (
    <CaseStudySplitFrames
      left={<DesignSystemPackageExportsPreview codeReveal />}
      right={<DesignSystemUsagePreview codeReveal />}
    />
  );
}
