import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { launchBrowser } from "../../../../test-utils/puppeteer.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const STYLE_DIR = path.resolve(__dirname, "..");

test("@autonomy/style: Puppeteer CSS Tokens & Style Verification", async (t) => {
  const browser = await launchBrowser();

  t.after(async () => {
    await browser.close();
  });

  await t.test(
    "loads CSS design system tokens and verifies computed variables in Chromium",
    async () => {
      const page = await browser.newPage();
      const tokensCss = fs.readFileSync(path.join(STYLE_DIR, "tokens.css"), "utf-8");
      const indexCss = fs.readFileSync(path.join(STYLE_DIR, "index.css"), "utf-8");

      await page.setContent(`
      <!DOCTYPE html>
      <html>
      <head>
        <style>${tokensCss}</style>
        <style>${indexCss}</style>
      </head>
      <body>
        <div id="test-card" class="test-element">The Autonomy Protocol</div>
      </body>
      </html>
    `);

      // Verify root CSS variables are resolved
      const brandPrimary = await page.evaluate(() => {
        return getComputedStyle(document.documentElement)
          .getPropertyValue("--brand-primary")
          .trim();
      });

      assert.ok(brandPrimary.length > 0, "Root --brand-primary custom property should be defined");

      await page.close();
    },
  );
});
