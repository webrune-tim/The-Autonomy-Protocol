import { createAuthClient } from "better-auth/svelte";

const baseURL = typeof window !== "undefined" ? window.location.origin : "http://localhost:5173";
if (typeof window !== "undefined") {
  console.log(`[Student Auth Client] Initialized with baseURL: ${baseURL}`);
}

export const authClient = createAuthClient({
  baseURL,
});
