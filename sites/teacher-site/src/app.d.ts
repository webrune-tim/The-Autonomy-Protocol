import type { User, Session } from "better-auth/minimal";

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  namespace App {
    interface Locals {
      user?: User & {
        role: "user" | "student" | "teacher" | "admin" | "superadmin";
        theme?: string;
      };
      session?: Session;
    }

    // interface Error {}
    interface PageData {
      user?: User & {
        role: "user" | "student" | "teacher" | "admin" | "superadmin";
        theme?: string;
      };
      session?: Session;
    }
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
