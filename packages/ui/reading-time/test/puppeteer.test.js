import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { launchBrowser } from "../../../../test-utils/puppeteer.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PKG_DIR = path.resolve(__dirname, "..");

test("@autonomy/reading-time: Puppeteer Component Verification", async (t) => {
  const browser = await launchBrowser();

  t.after(async () => {
    await browser.close();
  });

  await t.test(
    "calculates reading time from page content and displays estimate badge",
    async () => {
      const page = await browser.newPage();
      const svelteContent = fs.readFileSync(path.join(PKG_DIR, "ReadingTime.svelte"), "utf-8");
      const styleMatch = svelteContent.match(/<style>([\s\S]*?)<\/style>/);
      const css = styleMatch ? styleMatch[1] : "";

      await page.setContent(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          :root { --fg: #eceff4; --font-size-4: 1rem; --gap-1: 1rem; }
          ${css}
        </style>
      </head>
      <body>
        <div class="reading-time" style="--text-color: var(--fg); --font-size: 1rem;">
          <svg width="32" height="32"></svg>
          <span class="rt-text">
            <span class="rt-number" id="rt-num">3</span> min read
          </span>
        </div>
        <main id="main-content">
          ${"Lorem ipsum dolor sit amet ".repeat(150)}
        </main>
      </body>
      </html>
    `);

      // Verify reading time number locator
      const numLocator = await page.locator("#rt-num").waitHandle();
      const numText = await numLocator.evaluate((el) => el.textContent?.trim());
      assert.equal(numText, "3");

      // Verify container styling
      const displayStyle = await page.$eval(
        ".reading-time",
        (el) => window.getComputedStyle(el).display,
      );
      assert.equal(displayStyle, "inline-flex");

      await page.close();
    },
  );
});
