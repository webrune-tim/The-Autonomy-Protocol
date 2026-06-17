import { createAuthClient } from "better-auth/svelte";

const baseURL = typeof window !== "undefined" ? window.location.origin : "http://localhost:8080";
if (typeof window !== "undefined") {
  console.log(`[Teacher Auth Client] Initialized with baseURL: ${baseURL}`);
}

export const authClient = createAuthClient({
  baseURL,
});
