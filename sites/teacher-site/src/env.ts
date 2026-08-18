import { defineEnvVars } from "@sveltejs/kit/env";

export const variables = defineEnvVars({
  TEACHER_ORIGIN: { schema: (input) => input ?? "" },
  ORIGIN: { schema: (input) => input ?? "" },
  BETTER_AUTH_SECRET: { schema: (input) => input ?? "" },
  TEACHER_GOOGLE_CLIENT_ID: { schema: (input) => input ?? "" },
  TEACHER_GOOGLE_CLIENT_SECRET: { schema: (input) => input ?? "" },
  DATABASE_URL: { schema: (input) => input ?? "" },
  DATABASE_AUTH_TOKEN: { schema: (input) => input ?? "" },
});
