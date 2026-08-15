import { dev } from "$app/env";

if ("serviceWorker" in navigator) {
  if (dev) {
    // In local development, unregister lingering service workers to avoid HMR interference
    void navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const registration of registrations) {
        void registration.unregister();
      }
    });
  } else {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/service-worker.js", { type: "module" })
        .then((registration) => {
          registration.addEventListener("updatefound", () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener("statechange", () => {
                if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                  newWorker.postMessage({ type: "SKIP_WAITING" });
                  console.info("[Autonomy Protocol: Educator Portal] Updated version activated.");
                }
              });
            }
          });
        })
        .catch((error) => {
          console.error(
            "[Autonomy Protocol: Educator Portal] Service Worker registration failed:",
            error,
          );
        });
    });
  }
}
