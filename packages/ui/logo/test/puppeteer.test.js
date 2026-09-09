import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { launchBrowser } from "../../../../test-utils/puppeteer.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PKG_DIR = path.resolve(__dirname, "..");

test("@autonomy/logo: Puppeteer Component Verification", async (t) => {
  const browser = await launchBrowser();

  t.after(async () => {
    await browser.close();
  });

  await t.test(
    "renders logo, verifies title, and hides subtitle below 480px breakpoint",
    async () => {
      const page = await browser.newPage();
      const svelteContent = fs.readFileSync(path.join(PKG_DIR, "Logo.svelte"), "utf-8");
      const styleMatch = svelteContent.match(/<style>([\s\S]*?)<\/style>/);
      const css = styleMatch ? styleMatch[1] : "";

      await page.setViewport({ width: 1024, height: 768 });
      await page.setContent(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>${css}</style>
      </head>
      <body>
        <div class="logo">
          <div class="logo-mark"><svg width="28" height="28"></svg></div>
          <div class="logo-text">
            <span class="logo-title">TAP</span>
            <span class="logo-subtitle">The Autonomy Protocol</span>
          </div>
        </div>
      </body>
      </html>
    `);

      // Verify logo title
      const titleLocator = await page.locator(".logo-title").waitHandle();
      const title = await titleLocator.evaluate((el) => el.textContent);
      assert.equal(title, "TAP");

      // Verify subtitle visible on desktop
      const subtitleVisibleDesktop = await page.$eval(
        ".logo-subtitle",
        (el) => window.getComputedStyle(el).display !== "none",
      );
      assert.equal(subtitleVisibleDesktop, true, "Subtitle should be visible on desktop");

      // Switch to mobile viewport (<480px)
      await page.setViewport({ width: 400, height: 700 });
      const subtitleVisibleMobile = await page.$eval(
        ".logo-subtitle",
        (el) => window.getComputedStyle(el).display !== "none",
      );
      assert.equal(
        subtitleVisibleMobile,
        false,
        "Subtitle should be hidden on mobile screens <= 480px",
      );

      await page.close();
    },
  );
});
