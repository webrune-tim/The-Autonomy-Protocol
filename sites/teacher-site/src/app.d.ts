import type { Session, User } from "better-auth";

declare global {
  namespace App {
    interface Locals {
      session?: Session | null;
      user?:
        | (User & {
            role?: string | null;
            theme?: string | null;
            [key: string]: any;
          })
        | null;
      theme?: string | null;
    }
    interface PageData {
      session?: Session | null;
      user?:
        | (User & {
            role?: string | null;
            theme?: string | null;
            [key: string]: any;
          })
        | null;
      theme?: string | null;
    }
  }
}

export {};
