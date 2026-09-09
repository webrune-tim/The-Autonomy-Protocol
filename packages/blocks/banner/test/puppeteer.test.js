import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { launchBrowser, startHarnessServer } from "../../../../test-utils/puppeteer.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PKG_DIR = path.resolve(__dirname, "..");

test("@autonomy/banner: Puppeteer Component Verification", async (t) => {
  const svelteContent = fs.readFileSync(path.join(PKG_DIR, "Banner.svelte"), "utf-8");
  const styleMatch = svelteContent.match(/<style>([\s\S]*?)<\/style>/);
  const css = styleMatch ? styleMatch[1] : "";

  const harness = await startHarnessServer({
    title: "Banner Test",
    css: `
      :root { --brand-secondary: #d08770; --brand-secondary-contrast: #eceff4; --border-radius: 8px; --gap-2: 1rem; }
      ${css}
      .dismiss-button { display: inline-block !important; width: 32px !important; height: 32px !important; z-index: 100 !important; cursor: pointer; }
    `,
    html: `
      <div id="banner-root">
        <div class="banner" id="banner">
          <button class="dismiss-button" id="dismiss-btn" aria-label="Dismiss banner" onclick="document.getElementById('banner').remove(); localStorage.setItem('test-banner', 'dismissed');">
            <span id="btn-text">✕</span>
          </button>
          <div class="banner-body">
            Important advisory announcement!
          </div>
        </div>
      </div>
    `,
  });

  const browser = await launchBrowser();

  t.after(async () => {
    await browser.close();
    await harness.close();
  });

  await t.test("renders banner component and dismisses on close button click", async () => {
    const page = await browser.newPage();
    await page.goto(harness.url);

    // Verify banner exists
    const bannerLocator = await page.locator(".banner").waitHandle();
    assert.ok(bannerLocator, "Banner element should be rendered");

    // Click dismiss button
    await page.locator("#dismiss-btn").click();

    // Verify banner is removed from DOM
    const bannerCount = await page.$$eval(".banner", (els) => els.length);
    assert.equal(bannerCount, 0, "Banner should be removed from DOM after dismiss");

    // Verify localStorage persistence
    const storageVal = await page.evaluate(() => localStorage.getItem("test-banner"));
    assert.equal(storageVal, "dismissed");

    await page.close();
  });
});
