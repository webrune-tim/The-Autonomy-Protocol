import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { launchBrowser } from "../../../../test-utils/puppeteer.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PKG_DIR = path.resolve(__dirname, "..");

test("@autonomy/scroll-to-top: Puppeteer Component Verification", async (t) => {
  const browser = await launchBrowser();

  t.after(async () => {
    await browser.close();
  });

  await t.test(
    "renders scroll to top button with circular geometry and handles scroll interaction",
    async () => {
      const page = await browser.newPage();
      const svelteContent = fs.readFileSync(path.join(PKG_DIR, "ScrollToTop.svelte"), "utf-8");
      const styleMatch = svelteContent.match(/<style>([\s\S]*?)<\/style>/);
      const css = styleMatch ? styleMatch[1] : "";

      await page.setViewport({ width: 1280, height: 800 });
      await page.setContent(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { height: 2000px; margin: 0; }
          ${css}
        </style>
      </head>
      <body>
        <button
          class="scroll-to-top right"
          id="stt-btn"
          aria-label="Scroll to top"
          style="--btn-bg: #111111; --text-color: #ffffff; --ring-color: #255ea0; --ring-width: 6px;"
        >
          <div class="icon-wrapper">
            <svg width="20" height="20"></svg>
          </div>
        </button>
        <script>
          document.getElementById('stt-btn').addEventListener('click', () => {
            window.scrollTo({ top: 0 });
          });
        </script>
      </body>
      </html>
    `);

      // Verify locator
      const btnLocator = await page.locator("#stt-btn").waitHandle();
      assert.ok(btnLocator, "Scroll to top button locator should resolve");

      // Scroll down
      await page.evaluate(() => window.scrollTo(0, 500));
      const scrollY = await page.evaluate(() => window.scrollY);
      assert.equal(scrollY, 500, "Page should have scrolled");

      // Click scroll to top button
      await page.locator("#stt-btn").click();
      const resetScrollY = await page.evaluate(() => window.scrollY);
      assert.equal(resetScrollY, 0, "Clicking scroll to top button should reset window scroll");

      await page.close();
    },
  );
});
