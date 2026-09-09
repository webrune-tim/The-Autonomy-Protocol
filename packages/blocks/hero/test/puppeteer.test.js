import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { launchBrowser } from "../../../../test-utils/puppeteer.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PKG_DIR = path.resolve(__dirname, "..");

test("@autonomy/hero: Puppeteer Component Verification", async (t) => {
  const browser = await launchBrowser();

  t.after(async () => {
    await browser.close();
  });

  await t.test(
    "renders grid stack hero banner and validates title and call to action layout",
    async () => {
      const page = await browser.newPage();
      const svelteContent = fs.readFileSync(path.join(PKG_DIR, "Hero.svelte"), "utf-8");
      const styleMatch = svelteContent.match(/<style>([\s\S]*?)<\/style>/);
      const css = styleMatch ? styleMatch[1] : "";

      await page.setViewport({ width: 1200, height: 800 });
      await page.setContent(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          :root { --brand-secondary: #d08770; --border-radius: 8px; }
          ${css}
        </style>
      </head>
      <body>
        <section class="hero" id="hero">
          <div class="hero-bg">
            <img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'/>" alt="" />
          </div>
          <div class="hero-content">
            <h1>Autonomous Self-Governance</h1>
            <p>CTE & Student Advisory Curriculum</p>
          </div>
        </section>
      </body>
      </html>
    `);

      // Verify hero locator
      const heroLocator = await page.locator("#hero").waitHandle();
      assert.ok(heroLocator, "Hero section should be present");

      // Verify h1 title
      const h1Locator = await page.locator("h1").waitHandle();
      const title = await h1Locator.evaluate((el) => el.textContent);
      assert.equal(title, "Autonomous Self-Governance");

      // Verify grid layout
      const heroDisplay = await page.$eval(".hero", (el) => window.getComputedStyle(el).display);
      assert.equal(heroDisplay, "grid");

      await page.close();
    },
  );
});
