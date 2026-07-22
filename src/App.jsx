import { Button } from "@joker/design-system";
import "@joker/design-system/styles/button.css";

export function App() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "var(--joker-black-800)",
      }}
    >
      <div style={{ display: "flex", gap: "1rem" }}>
        <Button label="Get in touch" />
        <Button label="View work" variant="secondary" />
      </div>
    </main>
  );
}
