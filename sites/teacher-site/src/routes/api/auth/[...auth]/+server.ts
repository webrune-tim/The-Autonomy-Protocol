import { auth } from "#lib/server/auth.js";
import type { RequestHandler } from "./$types";

export const fallback: RequestHandler = (event) => {
  return auth.handler(event.request);
};
