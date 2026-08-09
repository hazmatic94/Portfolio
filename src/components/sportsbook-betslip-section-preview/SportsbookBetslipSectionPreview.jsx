import { SPORTSBOOK_BETSLIP_MATCHES } from "../../data/sportsbookBetslipMatches.js";
import {
  BetSlipDock,
  BetSlipProvider,
  useBetSlip,
} from "../../packages/sportsbook-bet-slip/index.ts";
import { SportsbookBetslipUpcomingMatches } from "./SportsbookBetslipUpcomingMatches.jsx";
import "./SportsbookBetslipSectionPreview.css";

const VISIBLE_BETSLIP_MATCHES = SPORTSBOOK_BETSLIP_MATCHES.slice(0, 4);

function SportsbookBetslipSectionPreviewContent() {
  const { selections, expanded } = useBetSlip();
  const isBetSlipExpanded = expanded && selections.length > 1;

  return (
    <div
      className="sportsbook-betslip-section-preview"
      data-sportsbook-shell
      data-betslip-expanded={isBetSlipExpanded ? "true" : undefined}
    >
      <div className="sportsbook-betslip-section-preview__body">
        <SportsbookBetslipUpcomingMatches matches={VISIBLE_BETSLIP_MATCHES} />
      </div>
      <BetSlipDock placement="embedded" />
      <span className="case-study-text__chip sportsbook-betslip-section-preview__chip">
        Interactive
      </span>
    </div>
  );
}

export function SportsbookBetslipSectionPreview() {
  return (
    <BetSlipProvider>
      <SportsbookBetslipSectionPreviewContent />
    </BetSlipProvider>
  );
}
