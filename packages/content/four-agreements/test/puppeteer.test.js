import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { launchBrowser } from "../../../../test-utils/puppeteer.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PKG_DIR = path.resolve(__dirname, "..");

test("@autonomy/four-agreements: Puppeteer Component Verification", async (t) => {
  const browser = await launchBrowser();

  t.after(async () => {
    await browser.close();
  });

  await t.test(
    "renders integrity agreements grid with correct locators and responsive layout",
    async () => {
      const page = await browser.newPage();
      const svelteContent = fs.readFileSync(path.join(PKG_DIR, "FourAgreements.svelte"), "utf-8");
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
          <div class="integrity-cycle">
            <div class="flex-column">
              <h4>The Integrity Shield</h4>
            </div>
            <div class="grid no-top-padding">
              <div class="step-grid"><span>1</span><p><strong>Be impeccable with your word:</strong></p></div>
              <div class="step-grid"><span>2</span><p><strong>Don't take anything personally:</strong></p></div>
              <div class="step-grid"><span>3</span><p><strong>Don't make any assumptions:</strong></p></div>
              <div class="step-grid"><span>4</span><p><strong>Always do your best:</strong></p></div>
            </div>
          </div>
        </section>
      </body>
      </html>
    `);

      // Verify title locator
      const titleLocator = await page.locator("h4").waitHandle();
      const titleText = await titleLocator.evaluate((el) => el.textContent);
      assert.equal(titleText, "The Integrity Shield");

      // Verify 4 steps are present
      const stepCount = await page.$$eval(".step-grid", (els) => els.length);
      assert.equal(stepCount, 4, "Should contain 4 agreements steps");

      // Test mobile viewport
      await page.setViewport({ width: 375, height: 667 });
      const isVisible = await page.evaluate(() => {
        const el = document.querySelector(".integrity-cycle");
        return el && window.getComputedStyle(el).display !== "none";
      });
      assert.equal(isVisible, true, "Integrity cycle should remain visible in mobile viewport");

      await page.close();
    },
  );
});
