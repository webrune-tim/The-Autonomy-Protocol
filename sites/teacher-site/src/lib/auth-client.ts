import { createAuthClient } from "better-auth/svelte";
import { env } from "$env/dynamic/public";

export const authClient = createAuthClient({
  baseURL:
    env.PUBLIC_ORIGIN ||
    (typeof window !== "undefined" ? window.location.origin : "http://localhost:5173"),
});
