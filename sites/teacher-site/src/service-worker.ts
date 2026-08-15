/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

import { self } from "$app/service-worker";
import { immutable, assets, prerendered } from "$app/manifest";
import { version } from "$app/env";
import { asset } from "$app/paths";

// Unique cache namespaces partitioned by deployment version
const CACHE_VERSION = `autonomy-educator-v${version}`;
const STATIC_CACHE_NAME = `static-${CACHE_VERSION}`;
const FONT_CACHE_NAME = `fonts-${CACHE_VERSION}`;
const RUNTIME_CACHE_NAME = `runtime-${CACHE_VERSION}`;

// Helper to sanitize paths into absolute URLs and exclude unresolved dynamic route parameters
const sanitizePath = (path: string): string | null => {
  if (!path || path.includes("[") || path.includes("]")) {
    return null;
  }
  return path.startsWith("/") ? path : `/${path}`;
};

// Assets to precache during install
const PRECACHE_ASSETS = Array.from(
  new Set(
    [
      ...immutable.map((item) => sanitizePath(item.path)),
      ...assets.map((item) => {
        try {
          return sanitizePath(asset(item.path));
        } catch {
          return sanitizePath(item.path);
        }
      }),
      ...prerendered.map((item) => sanitizePath(item.path)),
    ].filter((url): url is string => Boolean(url)),
  ),
);

/**
 * INSTALL EVENT: Precache static application shell and immediately skip waiting
 */
self.addEventListener("install", (event) => {
  void self.skipWaiting();
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then((cache) => {
      return Promise.allSettled(
        PRECACHE_ASSETS.map(async (assetUrl) => {
          try {
            const response = await fetch(assetUrl, { cache: "no-cache" });
            if (response.ok) {
              await cache.put(assetUrl, response);
            }
          } catch {
            // Non-fatal if an individual asset fails to precache
          }
        }),
      );
    }),
  );
});

/**
 * ACTIVATE EVENT: Purge legacy caches and claim active clients immediately
 */
self.addEventListener("activate", (event) => {
  event.waitUntil(
    Promise.all([
      self.clients.claim().catch(() => {}),
      caches.keys().then((keys) =>
        Promise.all(
          keys
            .filter(
              (key) =>
                key.startsWith("static-autonomy-educator-") ||
                key.startsWith("fonts-autonomy-educator-") ||
                key.startsWith("runtime-autonomy-educator-"),
            )
            .filter((key) => !key.endsWith(CACHE_VERSION))
            .map((key) => caches.delete(key)),
        ),
      ),
    ]),
  );
});

/**
 * MESSAGE EVENT: Support manual skip-waiting triggers
 */
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    void self.skipWaiting();
  }
});

/**
 * FETCH EVENT: Strategy-based request interception
 */
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Bypass non-GET requests, non-HTTP schemas, and Vite/HMR development endpoints
  if (
    request.method !== "GET" ||
    !url.protocol.startsWith("http") ||
    url.pathname.startsWith("/@") ||
    url.pathname.startsWith("/__") ||
    url.searchParams.has("import") ||
    url.searchParams.has("t")
  ) {
    return;
  }

  // 1. Google Fonts Cache Strategy (Stale-While-Revalidate)
  if (url.origin === "https://fonts.googleapis.com" || url.origin === "https://fonts.gstatic.com") {
    event.respondWith(handleStaleWhileRevalidate(request, FONT_CACHE_NAME));
    return;
  }

  // 2. Static Immutable & Manifest Assets Strategy (Cache-First)
  if (PRECACHE_ASSETS.includes(url.pathname) || url.pathname.includes("/_app/immutable/")) {
    event.respondWith(handleCacheFirst(request, STATIC_CACHE_NAME));
    return;
  }

  // 3. Navigation & SvelteKit Data Payloads Strategy (Network-First with Cache Fallback)
  if (request.mode === "navigate" || url.pathname.endsWith("__data.json")) {
    event.respondWith(handleNetworkFirstWithFallback(request, RUNTIME_CACHE_NAME));
    return;
  }

  // Default: standard fetch with cache fallback
  event.respondWith(
    fetch(request).catch(() => caches.match(request).then((res) => res || Response.error())),
  );
});

/**
 * Cache-First Strategy
 */
async function handleCacheFirst(request: Request, cacheName: string): Promise<Response> {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  if (cachedResponse) return cachedResponse;

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone()).catch(() => {});
    }
    return networkResponse;
  } catch {
    return cachedResponse || Response.error();
  }
}

/**
 * Stale-While-Revalidate Strategy
 */
async function handleStaleWhileRevalidate(request: Request, cacheName: string): Promise<Response> {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);

  const fetchPromise = fetch(request)
    .then((networkResponse) => {
      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone()).catch(() => {});
      }
      return networkResponse;
    })
    .catch(() => cachedResponse || Response.error());

  return cachedResponse || fetchPromise;
}

/**
 * Network-First Strategy with Cache Fallback
 */
async function handleNetworkFirstWithFallback(
  request: Request,
  cacheName: string,
): Promise<Response> {
  const cache = await caches.open(cacheName);

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone()).catch(() => {});
    }
    return networkResponse;
  } catch {
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    if (request.mode === "navigate") {
      const offlineShell = await cache.match("/");
      if (offlineShell) return offlineShell;
    }

    return Response.error();
  }
}
