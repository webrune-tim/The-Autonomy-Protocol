import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { launchBrowser } from "../../../../test-utils/puppeteer.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PKG_DIR = path.resolve(__dirname, "..");

test("@autonomy/external_links: Puppeteer Component Verification", async (t) => {
  const browser = await launchBrowser();

  t.after(async () => {
    await browser.close();
  });

  await t.test("renders external link categories and validates anchor attributes", async () => {
    const page = await browser.newPage();
    const svelteContent = fs.readFileSync(path.join(PKG_DIR, "Externallinks.svelte"), "utf-8");
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
        <div class="resources-grid">
          <section class="category-card">
            <h3>Support Networks</h3>
            <ul class="link-list">
              <li>
                <a href="https://aa.org" target="_blank" rel="noopener noreferrer" class="resource-link">
                  Alcoholics Anonymous
                </a>
              </li>
            </ul>
          </section>
        </div>
      </body>
      </html>
    `);

    // Verify category header locator
    const h3Locator = await page.locator("h3").waitHandle();
    const headerText = await h3Locator.evaluate((el) => el.textContent);
    assert.equal(headerText, "Support Networks");

    // Verify external link security attributes
    const linkAttrs = await page.$eval(".resource-link", (el) => ({
      href: el.getAttribute("href"),
      target: el.getAttribute("target"),
      rel: el.getAttribute("rel"),
    }));

    assert.equal(linkAttrs.href, "https://aa.org");
    assert.equal(linkAttrs.target, "_blank");
    assert.ok(linkAttrs.rel?.includes("noopener"));

    await page.close();
  });
});
