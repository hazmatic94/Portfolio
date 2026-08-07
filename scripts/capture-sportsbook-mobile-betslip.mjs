import { chromium } from "playwright";
import { execFileSync } from "node:child_process";
import { mkdirSync, unlinkSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, "../public/images");
const BASE_URL = process.env.SPORTSBOOK_URL ?? "http://127.0.0.1:5173/";

// Match other home mobile overlays: 390×844 / 1170×2532 (3×).
const VIEWPORT = { width: 390, height: 844 };
const TOP_PADDING_1X = 24;
const SHELL_SELECTOR = "[data-sportsbook-shell]";

async function prepareMobileBetslip(page) {
  const scroller = page.locator(".joker-navigation-mobile-content");
  await scroller.evaluate((element) => {
    element.scrollTop = 780;
  });
  await page.waitForTimeout(600);

  const panels = page.locator("button.joker-odds-panel");
  const panelCount = await panels.count();
  const clickIndexes = [];
  const minY = 60 + TOP_PADDING_1X;

  for (let index = 0; index < panelCount; index += 1) {
    const panel = panels.nth(index);
    const box = await panel.boundingBox();
    if (!box || box.y < minY || box.y + box.height > VIEWPORT.height - 48) continue;

    clickIndexes.push(index);
    if (clickIndexes.length === 4) break;
  }

  if (clickIndexes.length < 4) {
    throw new Error("Could not find four visible odds panels for two matches");
  }

  await panels.nth(clickIndexes[0]).click();
  await page.waitForTimeout(700);
  await panels.nth(clickIndexes[3]).click();
  await page.waitForTimeout(700);

  const expand = page.locator('button[aria-label="Expand selections"]');
  if (await expand.count()) {
    await expand.click();
    await page.waitForTimeout(500);
  }

  for (const input of await page.locator('input[inputmode="decimal"]').all()) {
    await input.fill("30");
  }

  await page.evaluate((topPadding) => {
    const shell = document.querySelector("[data-sportsbook-shell]");
    if (shell instanceof HTMLElement) {
      shell.style.boxSizing = "border-box";
      shell.style.paddingTop = `${topPadding}px`;
      shell.style.background = "#000000";
    }

    const dock = document.querySelector('[aria-label="Bet slip"]');
    if (dock instanceof HTMLElement) {
      dock.style.setProperty("--betslip-dock-bottom", "20px");
      dock.style.setProperty("--betslip-dock-top-clearance", "140px");
    }
  }, TOP_PADDING_1X);

  await page.waitForTimeout(400);
}

function addTopPadding(inputPath, outputPath, topPadding, targetWidth, targetHeight) {
  execFileSync(
    "python3",
    [
      "-c",
      `
from PIL import Image
src = Image.open("${inputPath}").convert("RGB")
tw, th, pad = ${targetWidth}, ${targetHeight}, ${topPadding}
w, h = src.size
crop = src.crop((0, 0, w, max(1, h - pad)))
canvas = Image.new("RGB", (tw, th), (0, 0, 0))
canvas.paste(crop, (0, pad))
canvas.save("${outputPath}")
`,
    ],
    { stdio: "inherit" },
  );
}

mkdirSync(OUT_DIR, { recursive: true });

const browser = await chromium.launch({ headless: true });

for (const deviceScaleFactor of [1, 3]) {
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
    await page.waitForSelector('[data-navigation-mode="mobile"]', { timeout: 15000 });
    await prepareMobileBetslip(page);

    const suffix = deviceScaleFactor === 3 ? "@2x" : "";
    const topPadding = TOP_PADDING_1X * deviceScaleFactor;
    const targetWidth = VIEWPORT.width * deviceScaleFactor;
    const targetHeight = VIEWPORT.height * deviceScaleFactor;
    const tmpPath = path.join(OUT_DIR, `.tmp-sportsbook-mobile-betslip${suffix}.png`);
    const outPath = path.join(OUT_DIR, `sportsbook-mobile-betslip${suffix}.png`);

    await page.locator(SHELL_SELECTOR).first().screenshot({ path: tmpPath, type: "png" });
    addTopPadding(tmpPath, outPath, topPadding, targetWidth, targetHeight);
    unlinkSync(tmpPath);

    console.log(
      `captured sportsbook-mobile-betslip${suffix}: ${outPath} (dpr ${deviceScaleFactor}, top pad ${topPadding}px)`,
    );
  } finally {
    await context.close();
  }
}

await browser.close();
