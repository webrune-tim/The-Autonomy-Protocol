// sites/teacher-site/src/app.d.ts
import type { User as BetterAuthUser } from "better-auth";

declare global {
  namespace App {
    interface Locals {
      user?: BetterAuthUser & {
        role: "user" | "student" | "teacher" | "admin" | "superadmin";
      };
    }
    interface PageData {
      user?: BetterAuthUser & {
        role: "user" | "student" | "teacher" | "admin" | "superadmin";
      };
    }
  }
}
// src/app.d.ts
import type { Session, User } from "better-auth";

declare global {
  namespace App {
    interface Locals {
      session: Session | null;
      user:
        | (User & {
            role?: "user" | "student" | "teacher" | "admin" | "superadmin" | string;
            theme?: string | null;
            [key: string]: any;
          })
        | null;
      auth?: any;
    }
    interface PageData {
      session: Session | null;
      user:
        | (User & {
            role?: "user" | "student" | "teacher" | "admin" | "superadmin" | string;
            theme?: string | null;
            [key: string]: any;
          })
        | null;
    }
  }
}

export {};
