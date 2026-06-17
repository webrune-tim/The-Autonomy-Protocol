import { createAuthClient } from "better-auth/svelte";

const baseURL = typeof window !== "undefined" ? window.location.origin : "http://localhost:8080";

export const authClient = createAuthClient({
  baseURL,
});
