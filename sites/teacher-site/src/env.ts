import { defineEnvVars } from "@sveltejs/kit/env";

// @migration-task Review usage of dynamic environment variables. They fall back to the empty string if not present, which may not be what you want.
export const variables = defineEnvVars({
  TEACHER_ORIGIN: { schema: (input) => input ?? "" },
  ORIGIN: { schema: (input) => input ?? "" },
  BETTER_AUTH_SECRET: { schema: (input) => input ?? "" },
  TEACHER_GOOGLE_CLIENT_ID: { schema: (input) => input ?? "" },
  TEACHER_GOOGLE_CLIENT_SECRET: { schema: (input) => input ?? "" },
  DATABASE_URL: { schema: (input) => input ?? "" },
  DATABASE_AUTH_TOKEN: { schema: (input) => input ?? "" },
});
