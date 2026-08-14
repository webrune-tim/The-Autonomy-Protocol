import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { sveltekitCookies } from "better-auth/svelte-kit";
import { admin, createAccessControl } from "better-auth/plugins";

import {
  TEACHER_ORIGIN,
  ORIGIN,
  BETTER_AUTH_SECRET,
  TEACHER_GOOGLE_CLIENT_ID,
  TEACHER_GOOGLE_CLIENT_SECRET,
} from "$app/env/private";

import { getRequestEvent } from "$app/server";
import { dev } from "$app/env";
import { db } from "#lib/server/db/index.js";
import * as schema from "#lib/server/db/schema.js";

const adminStatements = {
  user: [
    "create",
    "list",
    "set-role",
    "ban",
    "impersonate",
    "delete",
    "set-password",
    "get",
    "update",
  ],
  session: ["list", "revoke", "delete"],
} as const;

const ac = createAccessControl(adminStatements);
const adminRole = ac.newRole(adminStatements);
const userRole = ac.newRole({ user: [], session: [] });
const studentRole = ac.newRole({ user: [], session: [] });

const baseURL =
  TEACHER_ORIGIN ||
  ORIGIN ||
  (dev ? "http://localhost:8080" : "https://the-autonomy-protocol.vercel.app");

const cleanBaseURL = baseURL.replace(/\/$/, "");

export const auth = betterAuth({
  baseURL: cleanBaseURL,
  secret: BETTER_AUTH_SECRET,
  trustedOrigins: [
    TEACHER_ORIGIN,
    "https://the-autonomy-protocol.vercel.app",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:8080",
    "http://127.0.0.1:8080",
  ].filter(Boolean) as string[],
  database: drizzleAdapter(db, { provider: "sqlite", schema }),
  socialProviders:
    TEACHER_GOOGLE_CLIENT_ID && TEACHER_GOOGLE_CLIENT_SECRET
      ? {
          google: {
            clientId: TEACHER_GOOGLE_CLIENT_ID,
            clientSecret: TEACHER_GOOGLE_CLIENT_SECRET,
          },
        }
      : {},
  user: {
    additionalFields: {
      theme: {
        type: "string",
        required: false,
      },
    },
  },
  plugins: [
    admin({
      adminRoles: ["admin", "superadmin"],
      roles: {
        admin: adminRole,
        superadmin: adminRole,
        user: userRole,
        student: studentRole,
      },
    }),
    sveltekitCookies(getRequestEvent), // make sure this is the last plugin in the array
  ],
});
