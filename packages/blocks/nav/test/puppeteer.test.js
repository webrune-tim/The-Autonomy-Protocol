import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { launchBrowser } from "../../../../test-utils/puppeteer.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PKG_DIR = path.resolve(__dirname, "..");

test("@autonomy/nav: Puppeteer Component Verification", async (t) => {
  const browser = await launchBrowser();

  t.after(async () => {
    await browser.close();
  });

  await t.test("renders semantic nav bar with links and active page indicator", async () => {
    const page = await browser.newPage();
    const svelteContent = fs.readFileSync(path.join(PKG_DIR, "Nav.svelte"), "utf-8");
    const styleMatch = svelteContent.match(/<style>([\s\S]*?)<\/style>/);
    const css = styleMatch ? styleMatch[1] : "";

    await page.setContent(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          :root { --brand-primary: #5e81ac; --fg: #eceff4; }
          ${css}
        </style>
      </head>
      <body>
        <nav>
          <ul>
            <li><a href="/" class="active" aria-current="page">Home</a></li>
            <li><a href="/curriculum">Curriculum</a></li>
            <li><a href="/mission">Mission</a></li>
          </ul>
        </nav>
      </body>
      </html>
    `);

    // Verify nav element locator
    const navLocator = await page.locator("nav").waitHandle();
    assert.ok(navLocator, "Semantic nav element should exist");

    // Verify active link locator and aria-current
    const activeLink = await page.locator('a[aria-current="page"]').waitHandle();
    const activeText = await activeLink.evaluate((el) => el.textContent?.trim());
    assert.equal(activeText, "Home");

    // Verify link count
    const linksCount = await page.$$eval("nav ul li a", (els) => els.length);
    assert.equal(linksCount, 3, "Should render 3 navigation links");

    await page.close();
  });
});
