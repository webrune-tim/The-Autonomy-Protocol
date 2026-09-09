import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { launchBrowser } from "../../../../test-utils/puppeteer.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PKG_DIR = path.resolve(__dirname, "..");

test("@autonomy/pill: Puppeteer Component Verification", async (t) => {
  const browser = await launchBrowser();

  t.after(async () => {
    await browser.close();
  });

  await t.test(
    "renders pill badge with inline-flex display and rounded pill geometry",
    async () => {
      const page = await browser.newPage();
      const svelteContent = fs.readFileSync(path.join(PKG_DIR, "Pill.svelte"), "utf-8");
      const styleMatch = svelteContent.match(/<style>([\s\S]*?)<\/style>/);
      const css = styleMatch ? styleMatch[1] : "";

      await page.setContent(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          :root { --brand-primary: #5e81ac; }
          ${css}
        </style>
      </head>
      <body>
        <div class="pill" id="test-pill">Module 01</div>
      </body>
      </html>
    `);

      const locator = await page.locator("#test-pill").waitHandle();
      const text = await locator.evaluate((el) => el.textContent?.trim());
      assert.equal(text, "Module 01");

      const styles = await page.$eval("#test-pill", (el) => {
        const computed = window.getComputedStyle(el);
        return {
          display: computed.display,
          borderRadius: computed.borderRadius,
          textTransform: computed.textTransform,
        };
      });

      assert.equal(styles.display, "inline-flex");
      assert.equal(styles.textTransform, "uppercase");
      assert.ok(styles.borderRadius.includes("9999px") || parseInt(styles.borderRadius) > 50);

      await page.close();
    },
  );
});
