import { chromium } from "playwright";
import { execFileSync } from "node:child_process";
import { mkdirSync, unlinkSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, "../public/images");
const BASE_URL = process.env.GAMESHELL_URL ?? "http://127.0.0.1:5173/showroom/gameshell";

// Inner frame lands at 1440×951 here — same aspect ratio as 1366×902 (≈1.514).
// Uniform scale only; no letterbox, no asymmetric stretch.
const VIEWPORT = { width: 1920, height: 1013 };
const TARGET_1X = { width: 1366, height: 902 };
const TARGET_2X = { width: 2732, height: 1804 };
const FRAME_SCALE_1X = TARGET_1X.width / 1440;
const FRAME_SCALE_2X = TARGET_2X.width / 2880;

const GAMES = [
  { key: "mines", path: "/", prepare: prepareMines },
  { key: "hilo", path: "/hilo", prepare: prepareHilo },
  { key: "coin-flip", path: "/coin-flip", prepare: prepareCoinFlip },
  { key: "roulette", path: "/roulette", prepare: prepareRoulette },
];

function uniformScale(inputPath, outputPath, targetWidth, targetHeight, scale) {
  execFileSync(
    "python3",
    [
      "-c",
      `
from PIL import Image
src = Image.open("${inputPath}").convert("RGB")
tw, th, scale = ${targetWidth}, ${targetHeight}, ${scale}
w, h = src.size
nw = max(1, round(w * scale))
nh = max(1, round(h * scale))
resized = src.resize((nw, nh), Image.Resampling.LANCZOS)
left = max(0, (nw - tw) // 2)
top = max(0, (nh - th) // 2)
cropped = resized.crop((left, top, left + tw, top + th))
if cropped.size != (tw, th):
    cropped = cropped.resize((tw, th), Image.Resampling.LANCZOS)
cropped.save("${outputPath}")
`,
    ],
    { stdio: "inherit" },
  );
}

async function waitForGameShell(page) {
  await page
    .waitForSelector(".joker-game-inner-frame", {
      state: "visible",
      timeout: 45000,
    })
    .catch(async () => {
      const title = await page.title();
      const bodyText = await page.locator("body").innerText().catch(() => "");
      throw new Error(`Missing game shell. title="${title}" body="${bodyText.slice(0, 120)}"`);
    });
  await page.waitForTimeout(900);
}

async function fillBetAmount(page, amount = "50") {
  const betInput = page.locator(".joker-bet-field input").first();
  await betInput.click();
  await betInput.fill(amount);
  await page.waitForTimeout(200);
}

async function clickPlaceBet(page) {
  const placeBet = page.locator(".joker-bet-submit").first();
  await placeBet.waitFor({ state: "visible", timeout: 15000 });
  await placeBet.click();
  await page.waitForTimeout(500);
}

async function prepareMines(page) {
  const seeds = [0.11, 0.23, 0.37, 0.42, 0.58, 0.71, 0.86];

  for (const seed of seeds) {
    await page.evaluate((value) => {
      Math.random = () => value;
    }, seed);

    await fillBetAmount(page, "50");
    await clickPlaceBet(page);
    await page.waitForSelector(".joker-mines-grid-cell:not(.is-disabled) .joker-mines-grid-tile", {
      timeout: 15000,
    });

    let revealed = 0;

    for (let index = 0; index < 8; index += 1) {
      const tile = page
        .locator(".joker-mines-grid-cell:not(.is-revealed):not(.is-disabled) .joker-mines-grid-tile")
        .first();

      if (!(await tile.count())) break;

      await tile.click();
      await page.waitForTimeout(450);

      if (await page.locator(".joker-mines-grid.is-round-lost").count()) {
        revealed = 0;
        break;
      }

      revealed = await page.locator(".joker-mines-grid-cell.is-revealed").count();
      if (revealed >= 3) break;
    }

    if (revealed >= 3) {
      await page.waitForTimeout(600);
      return;
    }

    await page.reload({ waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle", { timeout: 45000 }).catch(() => {});
    await waitForGameShell(page);
  }

  throw new Error("Mines prep could not reveal three safe tiles");
}

async function prepareHilo(page) {
  await fillBetAmount(page, "50");
  await page.waitForTimeout(400);
}

async function prepareCoinFlip(page) {
  await page.evaluate(() => {
    Math.random = () => 0.1;
  });

  await fillBetAmount(page, "50");

  const headsOption = page
    .locator("button, [role='button']")
    .filter({ hasText: /^bet heads$/i })
    .first();
  if (await headsOption.count()) {
    await headsOption.click();
  }

  const flipButton = page.locator(".joker-bet-submit").filter({ hasText: /flip coin/i });

  for (let flip = 0; flip < 3; flip += 1) {
    await flipButton.waitFor({ state: "visible", timeout: 15000 });
    await flipButton.click();
    await page.waitForTimeout(3800);
  }

  await page.waitForSelector(".joker-coin-flip-history-track", { timeout: 10000 });
  await page.waitForTimeout(800);
}

async function prepareRoulette(page) {
  await page.evaluate(() => {
    Math.random = () => 0.2;
  });

  await fillBetAmount(page, "50");

  const betRed = page
    .locator("button, [role='button'], label")
    .filter({ hasText: /^bet red$/i })
    .first();
  if (await betRed.count()) {
    await betRed.click();
    await page.waitForTimeout(200);
  }

  await clickPlaceBet(page);
  await page.waitForTimeout(12000);

  const spinAgain = page.locator(".joker-bet-submit").filter({ hasText: /spin wheel/i });
  if (await spinAgain.count()) {
    await spinAgain.click();
    await page.waitForTimeout(12000);
  }

  await page.waitForTimeout(800);
}

async function captureGame(page, game, deviceScaleFactor) {
  const url = `${BASE_URL}${game.path}`;
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle", { timeout: 45000 }).catch(() => {});
  await waitForGameShell(page);

  if (game.prepare) {
    await game.prepare(page);
  }

  const frame = page.locator(".joker-game-inner-frame").first();
  const tmpPath = path.join(OUT_DIR, `.tmp-${game.key}${deviceScaleFactor === 2 ? "@2x" : ""}.png`);
  await frame.screenshot({ path: tmpPath, type: "png" });

  const outPath = path.join(
    OUT_DIR,
    `design-system-adoption-${game.key}${deviceScaleFactor === 2 ? "@2x" : ""}.png`,
  );
  const target = deviceScaleFactor === 2 ? TARGET_2X : TARGET_1X;
  const scale = deviceScaleFactor === 2 ? FRAME_SCALE_2X : FRAME_SCALE_1X;

  uniformScale(tmpPath, outPath, target.width, target.height, scale);
  unlinkSync(tmpPath);

  return outPath;
}

mkdirSync(OUT_DIR, { recursive: true });

const browser = await chromium.launch({ headless: true });

for (const game of GAMES) {
  for (const deviceScaleFactor of [1, 2]) {
    const context = await browser.newContext({
      viewport: VIEWPORT,
      deviceScaleFactor,
      colorScheme: "dark",
    });
    const page = await context.newPage();

    try {
      const outPath = await captureGame(page, game, deviceScaleFactor);
      console.log(`captured ${game.key}${deviceScaleFactor === 2 ? "@2x" : ""}: ${outPath}`);
    } catch (error) {
      console.error(`failed ${game.key}${deviceScaleFactor === 2 ? "@2x" : ""}:`, error.message);
      throw error;
    } finally {
      await context.close();
    }
  }
}

await browser.close();
