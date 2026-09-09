import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { launchBrowser } from "../../../../test-utils/puppeteer.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PKG_DIR = path.resolve(__dirname, "..");

test("@autonomy/horizontal-scroll: Puppeteer Component Verification", async (t) => {
  const browser = await launchBrowser();

  t.after(async () => {
    await browser.close();
  });

  await t.test(
    "renders horizontal scroll layout with sticky container and multiple cards",
    async () => {
      const page = await browser.newPage();
      const svelteContent = fs.readFileSync(path.join(PKG_DIR, "HorizontalScroll.svelte"), "utf-8");
      const styleMatch = svelteContent.match(/<style>([\s\S]*?)<\/style>/);
      const css = styleMatch ? styleMatch[1] : "";

      await page.setViewport({ width: 1200, height: 800 });
      await page.setContent(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          :root { --gap-1: 1rem; --gap-2: 2rem; --brand-primary: #88c0d0; }
          ${css}
        </style>
      </head>
      <body>
        <section id="sectionPin" style="--dynamic-height: 180vh;">
          <div class="pin-wrap-sticky">
            <div class="pin-wrap">
              <div class="box trans-blue"><p>Card 1</p></div>
              <div class="box trans-orange"><p>Card 2</p></div>
              <div class="box trans-blue"><p>Card 3</p></div>
            </div>
          </div>
        </section>
      </body>
      </html>
    `);

      // Verify section locator
      const sectionLocator = await page.locator("#sectionPin").waitHandle();
      assert.ok(sectionLocator, "Section pin element should exist");

      // Verify 3 cards are rendered
      const cardCount = await page.$$eval(".box", (els) => els.length);
      assert.equal(cardCount, 3, "Should render 3 scroll cards");

      // Verify sticky positioning on container
      const isSticky = await page.$eval(
        ".pin-wrap-sticky",
        (el) => window.getComputedStyle(el).position,
      );
      assert.equal(isSticky, "sticky", "Container should have sticky position");

      await page.close();
    },
  );
});
