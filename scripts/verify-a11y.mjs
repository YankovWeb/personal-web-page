import { chromium } from "playwright";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

const results = [];

function record(name, pass, detail) {
  results.push({ name, pass, detail });
}

try {
  await page.goto(BASE, { waitUntil: "networkidle", timeout: 30000 });

  const openBtn = page.getByRole("button", {
    name: /open accessibility options/i,
  });
  await openBtn.waitFor({ timeout: 10000 });
  record("Widget button visible", true, "Found accessibility toggle");

  await openBtn.click();
  await page.getByRole("dialog", { name: /accessibility/i }).waitFor();
  record("Panel opens", true, "Dialog visible");

  const html = page.locator("html");

  const beforeFont = await html.evaluate((el) => ({
    fontSize: el.style.fontSize,
    fontScale: el.dataset.a11yFontScale,
  }));

  await page.getByRole("button", { name: /increase text size/i }).click();
  await page.waitForTimeout(200);

  const afterFont = await html.evaluate((el) => ({
    fontSize: el.style.fontSize,
    fontScale: el.dataset.a11yFontScale,
  }));

  record(
    "Text size increase",
    afterFont.fontScale === "110" && afterFont.fontSize === "110%",
    JSON.stringify({ before: beforeFont, after: afterFont }),
  );

  const contrastToggle = page.getByRole("checkbox", { name: /high contrast/i });
  await contrastToggle.check();
  await page.waitForTimeout(200);

  const contrast = await html.evaluate((el) => el.dataset.a11yContrast);
  record("High contrast", contrast === "high", `data-a11y-contrast=${contrast}`);

  await page.getByRole("checkbox", { name: /grayscale/i }).check();
  await page.waitForTimeout(200);
  const grayscale = await html.evaluate((el) => el.dataset.a11yGrayscale);
  record("Grayscale", grayscale === "true", `data-a11y-grayscale=${grayscale}`);

  await page.getByRole("checkbox", { name: /highlight links/i }).check();
  const highlight = await html.evaluate((el) => el.dataset.a11yHighlightLinks);
  record(
    "Highlight links",
    highlight === "true",
    `data-a11y-highlight-links=${highlight}`,
  );

  await page.getByRole("checkbox", { name: /readable font/i }).check();
  const readable = await html.evaluate((el) => el.dataset.a11yReadableFont);
  record(
    "Readable font",
    readable === "true",
    `data-a11y-readable-font=${readable}`,
  );

  await page.getByRole("checkbox", { name: /reduce motion/i }).check();
  const motion = await html.evaluate((el) => el.dataset.a11yReduceMotion);
  record(
    "Reduce motion",
    motion === "true",
    `data-a11y-reduce-motion=${motion}`,
  );

  const storage = await page.evaluate(() =>
    localStorage.getItem("portfolio-a11y-settings-v1"),
  );
  record(
    "localStorage persists",
    Boolean(storage && storage.includes('"fontScale":110')),
    storage ?? "null",
  );

  await page.getByRole("button", { name: /reset all/i }).click();
  await page.waitForTimeout(200);

  const afterReset = await html.evaluate((el) => ({
    fontScale: el.dataset.a11yFontScale,
    contrast: el.dataset.a11yContrast,
  }));
  record(
    "Reset all",
    afterReset.fontScale === "100" && afterReset.contrast === "off",
    JSON.stringify(afterReset),
  );
} catch (error) {
  record("Test run", false, error instanceof Error ? error.message : String(error));
}

await browser.close();

const failed = results.filter((r) => !r.pass);
console.log("\n=== Accessibility verification ===\n");
for (const r of results) {
  console.log(`${r.pass ? "PASS" : "FAIL"}  ${r.name}`);
  console.log(`      ${r.detail}\n`);
}
console.log(
  failed.length === 0
    ? "VERIFIED: All checks passed."
    : `NOT VERIFIED: ${failed.length} check(s) failed.`,
);
process.exit(failed.length === 0 ? 0 : 1);
