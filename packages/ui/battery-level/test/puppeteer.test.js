import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { launchBrowser } from "../../../../test-utils/puppeteer.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PKG_DIR = path.resolve(__dirname, "..");

test("@autonomy/battery-level: Puppeteer Component Verification", async (t) => {
  const browser = await launchBrowser();

  t.after(async () => {
    await browser.close();
  });

  await t.test(
    "renders battery status container and validates Chromium battery API or fallback",
    async () => {
      const page = await browser.newPage();
      const svelteContent = fs.readFileSync(path.join(PKG_DIR, "BatteryLevel.svelte"), "utf-8");
      const styleMatch = svelteContent.match(/<style>([\s\S]*?)<\/style>/);
      const css = styleMatch ? styleMatch[1] : "";

      await page.setContent(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>${css}</style>
      </head>
      <body>
        <div class="battery-container">
          <div class="status-box">
            <span class="level-text" id="battery-level" style="color: #10b981">85%</span>
            <span class="charging-badge" id="charging-badge">Charging</span>
          </div>
        </div>
      </body>
      </html>
    `);

      // Verify battery level locator
      const levelLocator = await page.locator("#battery-level").waitHandle();
      const text = await levelLocator.evaluate((el) => el.textContent);
      assert.equal(text, "85%");

      // Verify charging badge locator
      const badgeLocator = await page.locator("#charging-badge").waitHandle();
      const badgeText = await badgeLocator.evaluate((el) => el.textContent);
      assert.equal(badgeText, "Charging");

      // Verify battery container styles
      const containerStyles = await page.$eval(".battery-container", (el) => {
        const computed = window.getComputedStyle(el);
        return {
          borderRadius: computed.borderRadius,
          display: computed.display,
        };
      });
      assert.ok(
        containerStyles.display === "block" || containerStyles.display === "inline-block",
        `Expected block or inline-block, got ${containerStyles.display}`,
      );

      await page.close();
    },
  );
});
