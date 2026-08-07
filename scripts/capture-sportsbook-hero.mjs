import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, "../public/images");
const BASE_URL = process.env.SPORTSBOOK_URL ?? "http://127.0.0.1:5173/";

// Match other home heroes: 1366×900 / 2732×1800 with full top rail + side nav.
const VIEWPORT = { width: 1366, height: 900 };
const TARGET_1X = { width: 1366, height: 900 };
const TARGET_2X = { width: 2732, height: 1800 };
const SHELL_SELECTOR = "[data-sportsbook-shell]";

mkdirSync(OUT_DIR, { recursive: true });

const browser = await chromium.launch({ headless: true });

for (const deviceScaleFactor of [1, 2]) {
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor,
    colorScheme: "dark",
  });
  const page = await context.newPage();

  try {
    await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle", { timeout: 45000 }).catch(() => {});
    await page.waitForSelector(SHELL_SELECTOR, { timeout: 45000 });
    await page.waitForTimeout(900);

    const shell = page.locator(SHELL_SELECTOR).first();
    const suffix = deviceScaleFactor === 2 ? "@2x" : "";
    const outPath = path.join(OUT_DIR, `sportsbook-hero${suffix}.png`);

    await shell.screenshot({ path: outPath, type: "png" });

    const size = await page.evaluate((selector) => {
      const node = document.querySelector(selector);
      const rect = node?.getBoundingClientRect();
      return rect ? { width: Math.round(rect.width), height: Math.round(rect.height) } : null;
    }, SHELL_SELECTOR);

    console.log(
      `captured sportsbook-hero${suffix}: ${outPath} (shell ${size?.width}×${size?.height}, dpr ${deviceScaleFactor})`,
    );
  } finally {
    await context.close();
  }
}

await browser.close();
