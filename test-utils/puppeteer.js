import puppeteer from "puppeteer";
import { createServer } from "node:http";
import net from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const REPO_ROOT = path.resolve(__dirname, "..");

/**
 * Finds an available TCP port on localhost.
 * @returns {Promise<number>}
 */
export async function getFreePort() {
  return new Promise((resolve, reject) => {
    const srv = net.createServer();
    srv.listen(0, "127.0.0.1", () => {
      const port = srv.address().port;
      srv.close(() => resolve(port));
    });
    srv.on("error", reject);
  });
}

/**
 * Standard Puppeteer browser launcher matching https://pptr.dev/guides/getting-started
 * @param {import('puppeteer').LaunchOptions} [overrides]
 * @returns {Promise<import('puppeteer').Browser>}
 */
export async function launchBrowser(overrides = {}) {
  const defaultArgs = [
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--disable-dev-shm-usage",
    "--disable-gpu",
    "--no-first-run",
    "--no-zygote",
  ];

  return await puppeteer.launch({
    headless: process.env.HEADLESS === "false" ? false : true,
    args: overrides.args ? [...defaultArgs, ...overrides.args] : defaultArgs,
    ...overrides,
  });
}

/**
 * Starts a programmatic dev server for a site (e.g. sites/student-site or sites/teacher-site)
 * @param {string} siteDir - Absolute or relative path to site directory
 * @returns {Promise<{ url: string, close: () => Promise<void> }>}
 */
export async function startSiteServer(siteDir) {
  const { spawn } = await import("node:child_process");
  const http = await import("node:http");
  const resolvedDir = path.isAbsolute(siteDir) ? siteDir : path.resolve(REPO_ROOT, siteDir);
  const port = await getFreePort();

  const proc = spawn("pnpm", ["run", "dev", "--", "--port", String(port)], {
    cwd: resolvedDir,
    stdio: "pipe",
    env: { ...process.env, PORT: String(port) },
    detached: process.platform !== "win32",
  });

  const url = `http://localhost:${port}`;

  // Wait for server to respond with 200 or any HTTP status
  const start = Date.now();
  const timeoutMs = 30000;
  let ready = false;

  while (Date.now() - start < timeoutMs) {
    try {
      await new Promise((res, rej) => {
        const req = http.get(url, (r) => {
          res(r.statusCode);
        });
        req.on("error", rej);
        req.setTimeout(1500, () => req.destroy());
      });
      ready = true;
      break;
    } catch {
      await new Promise((r) => setTimeout(r, 400));
    }
  }

  if (!ready) {
    if (proc.pid) {
      try {
        process.kill(-proc.pid, "SIGKILL");
      } catch {
        proc.kill("SIGKILL");
      }
    }
    throw new Error(`Site dev server failed to start within ${timeoutMs}ms on ${url}`);
  }

  return {
    url,
    close: async () => {
      return new Promise((resolve) => {
        if (!proc || proc.killed) return resolve();
        try {
          if (process.platform !== "win32" && proc.pid) {
            process.kill(-proc.pid, "SIGKILL");
          } else {
            proc.kill("SIGKILL");
          }
        } catch {
          // already stopped
        }
        resolve();
      });
    },
  };
}

/**
 * Creates a lightweight HTML server for testing isolated components or packages.
 * @param {object} options
 * @param {string} [options.title]
 * @param {string} [options.html]
 * @param {string} [options.css]
 * @param {string} [options.script]
 * @returns {Promise<{ url: string, close: () => Promise<void> }>}
 */
export async function startHarnessServer(options = {}) {
  const port = await getFreePort();
  const {
    title = "Puppeteer Component Test",
    html = '<div id="test-root"></div>',
    css = "",
    script = "",
  } = options;

  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    ${css}
  </style>
</head>
<body>
  ${html}
  <script>
    ${script}
  </script>
</body>
</html>`;

  const server = createServer((req, res) => {
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    });
    res.end(fullHtml);
  });

  await new Promise((resolve, reject) => {
    server.listen(port, "127.0.0.1", () => resolve(true));
    server.on("error", reject);
  });

  const url = `http://127.0.0.1:${port}`;

  return {
    url,
    close: async () => {
      await new Promise((resolve) => server.close(resolve));
    },
  };
}
