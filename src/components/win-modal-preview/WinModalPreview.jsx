import { WinModalCard } from "@joker/design-system";
import "./WinModalPreview.css";

export function WinModalPreview() {
  return (
    <div className="win-modal-preview">
      <WinModalCard
        className="win-modal-preview__card"
        amountWon="+88"
        currency="JKC"
        balance="150,088"
        flyToWallet={false}
        onClose={() => {}}
      />
    </div>
  );
}
