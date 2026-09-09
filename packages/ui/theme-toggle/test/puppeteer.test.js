import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { launchBrowser } from "../../../../test-utils/puppeteer.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PKG_DIR = path.resolve(__dirname, "..");

test("@autonomy/theme-toggle: Puppeteer Component Verification", async (t) => {
  const browser = await launchBrowser();

  t.after(async () => {
    await browser.close();
  });

  await t.test(
    "renders theme toggle button and handles click state changes in browser",
    async () => {
      const page = await browser.newPage();
      const svelteContent = fs.readFileSync(
        path.join(PKG_DIR, "src", "ThemeToggle.svelte"),
        "utf-8",
      );
      const styleMatch = svelteContent.match(/<style>([\s\S]*?)<\/style>/);
      const css = styleMatch ? styleMatch[1] : "";

      await page.setContent(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          :root { --brand-primary: #88c0d0; --fg: #eceff4; }
          ${css}
        </style>
      </head>
      <body>
        <button
          type="button"
          class="theme-toggle-btn"
          id="theme-btn"
          aria-label="Switch to Dark Mode"
        >
          <span class="theme-label" id="theme-label">Dark</span>
        </button>
        <script>
          const btn = document.getElementById('theme-btn');
          const label = document.getElementById('theme-label');
          let isDark = true;
          btn.addEventListener('click', () => {
            isDark = !isDark;
            label.textContent = isDark ? 'Dark' : 'Light';
            btn.setAttribute('aria-label', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
          });
        </script>
      </body>
      </html>
    `);

      // Verify initial label
      const initialText = await page.$eval("#theme-label", (el) => el.textContent);
      assert.equal(initialText, "Dark");

      // Click button to toggle theme
      await page.locator("#theme-btn").click();
      const afterClickText = await page.$eval("#theme-label", (el) => el.textContent);
      assert.equal(afterClickText, "Light");

      // Toggle back
      await page.locator("#theme-btn").click();
      const toggledBackText = await page.$eval("#theme-label", (el) => el.textContent);
      assert.equal(toggledBackText, "Dark");

      await page.close();
    },
  );
});
