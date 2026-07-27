import { useEffect, useRef, useState } from "react";
import { CodePanelCopyButton } from "../code-panel-copy-button/CodePanelCopyButton.jsx";
import "./DesignSystemPackageExportsPreview.css";

const EXPORT_SECTIONS = [
  {
    name: "primitives",
    items: [
      "Button",
      "SkipButton",
      "Input",
      "Select",
      "Tabs",
      "Chip",
      "StatusChip",
      "ScoreChip",
      "Navigation",
      "OtpInput",
      "PlusMinusInput",
      "MultiplierInput",
    ],
  },
  {
    name: "betting",
    items: [
      "BettingPanelSurface",
      "PlaceBetFooter",
      "CashoutFooter",
      "InGameDualActionFooter",
      "MinesPanel",
      "HiLoPanel",
      "CoinFlipPanel",
      "RoulettePanel",
      "FourDPanel",
      "CocoHutPanel",
      "CrashPanel",
    ],
  },
  {
    name: "game chrome",
    items: [
      "GameShell",
      "AppShell",
      "FullGameShell",
      "GameChromeShell",
      "GameHeaderRail",
      "GameFooterRail",
      "Game-specific rails",
    ],
  },
  {
    name: "game pieces",
    items: [
      "GameCard*",
      "HigherCard",
      "LowerCard",
      "WinModalCard",
      "MinesTile",
      "FourDTile",
      "WinTile",
      "LossTile",
      "SafeTile",
      "Coin*",
      "CoinProgression",
      "RouletteWheel",
      "RouletteChip",
      "WinStreakRow",
      "EnterBetPrecursor",
      "SoundHelpers",
    ],
  },
  {
    name: "sportsbook",
    items: [
      "OddsButton",
      "OddsButtonGroup",
      "OddsPanel",
      "OddsRow",
      "MobileOddsGroup",
      "MobileHiLoOddsGroup",
      "MobileRouletteOddsGroup",
      "UpcomingMatches",
      "CompetitionHeader",
      "TeamInfo",
      "ViewMarkets",
    ],
  },
];

function buildExportTreeText() {
  const lines = ["@joker/design-system"];

  EXPORT_SECTIONS.forEach((section, sectionIndex) => {
    const isLastSection = sectionIndex === EXPORT_SECTIONS.length - 1;
    const sectionBranch = isLastSection ? "└── " : "├── ";
    lines.push(`${sectionBranch}${section.name}`);

    section.items.forEach((item, itemIndex) => {
      const isLastItem = itemIndex === section.items.length - 1;
      const itemBranch = isLastItem ? "└── " : "├── ";
      const guide = isLastSection ? "    " : "│   ";
      lines.push(`${guide}${itemBranch}${item}`);
    });

    if (!isLastSection) {
      lines.push("│", "");
    }
  });

  return lines.join("\n");
}

const EXPORT_TREE_TEXT = buildExportTreeText();

function ScrollChevron() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <path
        d="M5 7.5 10 12.5 15 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function ExportTree() {
  return (
    <div className="ds-exports-preview__tree">
      <div className="ds-exports-preview__root">@joker/design-system</div>
      {EXPORT_SECTIONS.map((section, sectionIndex) => {
        const isLastSection = sectionIndex === EXPORT_SECTIONS.length - 1;
        const sectionBranch = isLastSection ? "└── " : "├── ";

        return (
          <div key={section.name} className="ds-exports-preview__section">
            <div className="ds-exports-preview__branch">
              <span className="ds-exports-preview__guide">{sectionBranch}</span>
              <span className="ds-exports-preview__category">{section.name}</span>
            </div>
            {section.items.map((item, itemIndex) => {
              const isLastItem = itemIndex === section.items.length - 1;
              const itemBranch = isLastItem ? "└── " : "├── ";
              const guide = isLastSection ? "    " : "│   ";

              return (
                <div key={item} className="ds-exports-preview__branch ds-exports-preview__branch--item">
                  <span className="ds-exports-preview__guide">
                    {guide}
                    {itemBranch}
                  </span>
                  <span className="ds-exports-preview__item">{item}</span>
                </div>
              );
            })}
            {!isLastSection ? <div className="ds-exports-preview__spacer" aria-hidden="true" /> : null}
          </div>
        );
      })}
    </div>
  );
}

export function DesignSystemPackageExportsPreview() {
  const scrollRef = useRef(null);
  const [showChevron, setShowChevron] = useState(false);

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) {
      return;
    }

    const updateChevron = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollEl;
      const canScroll = scrollHeight > clientHeight + 1;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 8;
      setShowChevron(canScroll && !atBottom);
    };

    updateChevron();
    scrollEl.addEventListener("scroll", updateChevron, { passive: true });

    const resizeObserver = new ResizeObserver(updateChevron);
    resizeObserver.observe(scrollEl);

    return () => {
      scrollEl.removeEventListener("scroll", updateChevron);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="ds-exports-preview">
      <div className="ds-exports-preview__header">
        <span className="ds-exports-preview__filename">dist/index</span>
        <CodePanelCopyButton value={EXPORT_TREE_TEXT} copyLabel="Copy dist/index" />
      </div>
      <div ref={scrollRef} className="ds-exports-preview__scroll">
        <ExportTree />
      </div>
      <div className="ds-exports-preview__fade" aria-hidden="true" />
      <div
        className={`ds-exports-preview__chevron${showChevron ? "" : " ds-exports-preview__chevron--hidden"}`}
        aria-hidden="true"
      >
        <ScrollChevron />
      </div>
    </div>
  );
}
