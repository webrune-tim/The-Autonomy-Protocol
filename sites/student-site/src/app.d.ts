import type { User, Session } from "better-auth";

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  namespace App {
    interface Locals {
      user?:
        | (User & {
            role?: string | null;
            theme?: string | null;
            [key: string]: any;
          })
        | null;
      session?: Session | null;
      theme?: string | null;
    }

    interface PageData {
      user?:
        | (User & {
            role?: string | null;
            theme?: string | null;
            [key: string]: any;
          })
        | null;
      session?: Session | null;
      theme?: string | null;
    }
  }
}

export {};
