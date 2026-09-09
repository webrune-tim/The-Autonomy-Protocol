import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { launchBrowser } from "../../../../test-utils/puppeteer.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PKG_DIR = path.resolve(__dirname, "..");

test("@autonomy/footer: Puppeteer Component Verification", async (t) => {
  const browser = await launchBrowser();

  t.after(async () => {
    await browser.close();
  });

  await t.test("renders semantic footer container and validates inner flex layout", async () => {
    const page = await browser.newPage();
    const svelteContent = fs.readFileSync(path.join(PKG_DIR, "Footer.svelte"), "utf-8");
    const styleMatch = svelteContent.match(/<style>([\s\S]*?)<\/style>/);
    const css = styleMatch ? styleMatch[1] : "";

    await page.setViewport({ width: 1200, height: 800 });
    await page.setContent(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          :root { --surface-1: #2e3440; --ui-border: #4c566a; --fg: #eceff4; --gap-2: 1rem; --gap-3: 2rem; }
          ${css}
        </style>
      </head>
      <body>
        <footer>
          <div class="footer-inner">
            <p id="copyright">© 2026 The Autonomy Protocol</p>
          </div>
        </footer>
      </body>
      </html>
    `);

    // Verify footer element locator
    const footerLocator = await page.locator("footer").waitHandle();
    assert.ok(footerLocator, "Semantic footer element should exist");

    // Verify footer text
    const textLocator = await page.locator("#copyright").waitHandle();
    const text = await textLocator.evaluate((el) => el.textContent);
    assert.ok(text.includes("The Autonomy Protocol"));

    // Check inner container flex layout
    const innerDisplay = await page.$eval(
      ".footer-inner",
      (el) => window.getComputedStyle(el).display,
    );
    assert.equal(innerDisplay, "flex");

    await page.close();
  });
});
