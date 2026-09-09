import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import postcss from "postcss";
import cssnano from "cssnano";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const STYLE_DIR = path.resolve(__dirname, "..");

test("@autonomy/style: PostCSS & cssnano Minification Pipeline", async (t) => {
  await t.test("minifies CSS input and strips comments and superfluous whitespace", async () => {
    const rawCss = `
      /* Header comment to strip */
      :root {
        --brand-primary: #818cf8;
        --ui-gap: 1.5rem;
      }

      .card {
        display: flex;
        flex-direction: column;
        padding: var(--ui-gap);
        color: var(--brand-primary);
      }
    `;

    const result = await postcss([cssnano({ preset: "default" })]).process(rawCss, {
      from: undefined,
    });

    assert.ok(result.css.length > 0, "Minified CSS should not be empty");
    assert.ok(result.css.length < rawCss.length, "Minified CSS must be smaller than raw CSS");
    assert.ok(
      !result.css.includes("Header comment to strip"),
      "Comments should be removed by cssnano",
    );
    assert.ok(
      result.css.includes("--brand-primary:#818cf8"),
      "CSS custom properties should be preserved",
    );
  });

  await t.test("successfully processes design system tokens.css with cssnano", async () => {
    const tokensCss = fs.readFileSync(path.join(STYLE_DIR, "tokens.css"), "utf-8");
    const result = await postcss([cssnano({ preset: "default" })]).process(tokensCss, {
      from: path.join(STYLE_DIR, "tokens.css"),
    });

    assert.ok(result.css.length > 0, "Processed tokens CSS should not be empty");
    assert.ok(
      result.css.length < tokensCss.length,
      `Tokens CSS should be minified (raw: ${tokensCss.length}, min: ${result.css.length})`,
    );
    assert.ok(
      result.css.includes("--brand-primary"),
      "Tokens custom properties should be preserved",
    );
  });
});
