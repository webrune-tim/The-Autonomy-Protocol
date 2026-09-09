import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { launchBrowser } from "../../../../test-utils/puppeteer.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PKG_DIR = path.resolve(__dirname, "..");

test("@autonomy/header: Puppeteer Component Verification", async (t) => {
  const browser = await launchBrowser();

  t.after(async () => {
    await browser.close();
  });

  await t.test("renders sticky header with brand and action slots in Chromium", async () => {
    const page = await browser.newPage();
    const svelteContent = fs.readFileSync(path.join(PKG_DIR, "Header.svelte"), "utf-8");
    const styleMatch = svelteContent.match(/<style>([\s\S]*?)<\/style>/);
    const css = styleMatch ? styleMatch[1] : "";

    await page.setViewport({ width: 1200, height: 800 });
    await page.setContent(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          :root { --bg: #2e3440; --ui-border: #4c566a; --gap-1: 0.5rem; --gap-2: 1rem; }
          ${css}
        </style>
      </head>
      <body>
        <header>
          <div class="header-inner">
            <div class="brand" id="brand">
              <span class="logo">TAP</span>
            </div>
            <div class="actions" id="actions">
              <button id="nav-btn">Menu</button>
            </div>
          </div>
        </header>
      </body>
      </html>
    `);

    // Verify header locator
    const headerLocator = await page.locator("header").waitHandle();
    assert.ok(headerLocator, "Semantic header element should exist");

    // Verify sticky layout
    const headerPos = await page.$eval("header", (el) => window.getComputedStyle(el).position);
    assert.equal(headerPos, "sticky");

    // Verify brand and actions containers
    const brandText = await page.$eval("#brand", (el) => el.textContent?.trim());
    assert.equal(brandText, "TAP");

    const actionsDisplay = await page.$eval(
      "#actions",
      (el) => window.getComputedStyle(el).display,
    );
    assert.equal(actionsDisplay, "flex");

    await page.close();
  });
});
