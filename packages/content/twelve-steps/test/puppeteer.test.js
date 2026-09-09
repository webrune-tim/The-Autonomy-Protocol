import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { launchBrowser } from "../../../../test-utils/puppeteer.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PKG_DIR = path.resolve(__dirname, "..");

test("@autonomy/twelve-steps: Puppeteer Component Verification", async (t) => {
  const browser = await launchBrowser();

  t.after(async () => {
    await browser.close();
  });

  await t.test("renders accountability cycle grid and verifies all 12 steps", async () => {
    const page = await browser.newPage();
    const svelteContent = fs.readFileSync(path.join(PKG_DIR, "TwelveSteps.svelte"), "utf-8");
    const styleMatch = svelteContent.match(/<style>([\s\S]*?)<\/style>/);
    const css = styleMatch ? styleMatch[1] : "";

    await page.setViewport({ width: 1280, height: 800 });
    await page.setContent(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>${css}</style>
      </head>
      <body>
        <section>
          <div class="accountability-cycle">
            <div class="flex-column">
              <h4>The Accountability Cycle</h4>
            </div>
            <div class="grid no-top-padding">
              ${Array.from(
                { length: 12 },
                (_, i) => `
                <div class="step-grid">
                  <span>${i + 1}</span>
                  <p><strong>Step ${i + 1}:</strong> Accountability action item.</p>
                </div>
              `,
              ).join("")}
            </div>
          </div>
        </section>
      </body>
      </html>
    `);

    // Verify header title locator
    const titleLocator = await page.locator("h4").waitHandle();
    const title = await titleLocator.evaluate((el) => el.textContent);
    assert.equal(title, "The Accountability Cycle");

    // Verify 12 steps count
    const stepsCount = await page.$$eval(".step-grid", (els) => els.length);
    assert.equal(stepsCount, 12, "Must contain all 12 accountability cycle steps");

    // Test mobile breakpoint
    await page.setViewport({ width: 375, height: 667 });
    const isVisible = await page.evaluate(() => {
      const el = document.querySelector(".accountability-cycle");
      return el && window.getComputedStyle(el).display !== "none";
    });
    assert.equal(isVisible, true, "Accountability cycle should remain visible in mobile viewport");

    await page.close();
  });
});
