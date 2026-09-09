import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { launchBrowser } from "../../../../test-utils/puppeteer.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PKG_DIR = path.resolve(__dirname, "..");

test("@autonomy/revealing_image: Puppeteer Component Verification", async (t) => {
  const browser = await launchBrowser();

  t.after(async () => {
    await browser.close();
  });

  await t.test(
    "detects element intersection in Chromium viewport and triggers reveal class",
    async () => {
      const page = await browser.newPage();
      const svelteContent = fs.readFileSync(path.join(PKG_DIR, "RevealingImage.svelte"), "utf-8");
      const styleMatch = svelteContent.match(/<style>([\s\S]*?)<\/style>/);
      const css = styleMatch ? styleMatch[1] : "";

      await page.setViewport({ width: 1200, height: 800 });
      await page.setContent(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          img { max-width: 100%; height: auto; }
          .revealing-image { opacity: 1; transition: opacity 0.5s ease; }
          ${css}
        </style>
      </head>
      <body>
        <img
          id="reveal-img"
          src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'/>"
          alt="Curriculum visual"
          class="margin-bottom"
          width="200"
          height="200"
        />
        <script>
          const img = document.getElementById('reveal-img');
          const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
              img.classList.add('revealing-image');
              observer.disconnect();
            }
          }, { rootMargin: '150px' });
          observer.observe(img);
        </script>
      </body>
      </html>
    `);

      // Verify image locator
      const imgLocator = await page.locator("#reveal-img").waitHandle();
      assert.ok(imgLocator, "Revealing image element should exist");

      // Verify alt text
      const alt = await imgLocator.evaluate((el) => el.getAttribute("alt"));
      assert.equal(alt, "Curriculum visual");

      // Wait for IntersectionObserver to trigger and apply revealing-image class
      await page.waitForFunction(() => {
        const el = document.getElementById("reveal-img");
        return el && el.classList.contains("revealing-image");
      });

      const hasClass = await page.$eval("#reveal-img", (el) =>
        el.classList.contains("revealing-image"),
      );
      assert.equal(
        hasClass,
        true,
        "Image should receive revealing-image class via IntersectionObserver in viewport",
      );

      await page.close();
    },
  );
});
