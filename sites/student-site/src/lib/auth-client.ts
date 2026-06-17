import { createAuthClient } from "better-auth/svelte";

const baseURL = typeof window !== "undefined" ? window.location.origin : "http://localhost:5173";

export const authClient = createAuthClient({
  baseURL,
});
