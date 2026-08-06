import { createRoot } from "react-dom/client";
import { installDesignSystemSoundMute } from "./utils/muteDesignSystemSounds.js";
import "@joker/design-system/styles.css";
import "@joker/design-system/styles/globals.css";
import "./styles/motion.css";
import "./styles/cta.css";
import { App } from "./App.jsx";

installDesignSystemSoundMute();

createRoot(document.getElementById("root")).render(<App />);
