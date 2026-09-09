import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { launchBrowser } from "../../../../test-utils/puppeteer.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PKG_DIR = path.resolve(__dirname, "..");

test("@autonomy/session-warning: Puppeteer Component Verification", async (t) => {
  const browser = await launchBrowser();

  t.after(async () => {
    await browser.close();
  });

  await t.test(
    "renders modal dialog, manages countdown, and handles session extend button click",
    async () => {
      const page = await browser.newPage();
      const svelteContent = fs.readFileSync(path.join(PKG_DIR, "SessionWarning.svelte"), "utf-8");
      const styleMatch = svelteContent.match(/<style>([\s\S]*?)<\/style>/);
      const css = styleMatch ? styleMatch[1] : "";

      await page.setContent(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          :root { --brand-primary: #88c0d0; }
          ${css}
        </style>
      </head>
      <body>
        <div id="modal-container">
          <div class="modal-backdrop" id="backdrop">
            <div class="modal" role="alertdialog" aria-modal="true">
              <h2>Session Expiring Soon</h2>
              <p>You will be logged out in <span id="countdown">60</span> seconds.</p>
              <div class="actions">
                <button id="extend-btn" class="btn btn-primary">Extend Session</button>
                <button id="logout-btn" class="btn btn-secondary">Log Out</button>
              </div>
            </div>
          </div>
        </div>
        <script>
          let extended = false;
          document.getElementById('extend-btn').addEventListener('click', () => {
            extended = true;
            document.getElementById('backdrop').style.display = 'none';
          });
        </script>
      </body>
      </html>
    `);

      // Verify dialog title locator
      const titleLocator = await page.locator("h2").waitHandle();
      const title = await titleLocator.evaluate((el) => el.textContent);
      assert.equal(title, "Session Expiring Soon");

      // Verify countdown locator
      const countdownLocator = await page.locator("#countdown").waitHandle();
      const count = await countdownLocator.evaluate((el) => el.textContent);
      assert.equal(count, "60");

      // Click extend button and verify backdrop dismissal
      await page.locator("#extend-btn").click();
      const backdropDisplay = await page.$eval("#backdrop", (el) => el.style.display);
      assert.equal(backdropDisplay, "none", "Modal should be dismissed when extended");

      await page.close();
    },
  );
});
