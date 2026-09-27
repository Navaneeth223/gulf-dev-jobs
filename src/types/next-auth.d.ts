import type { DefaultSession } from "next-auth";
import type { UserRole } from "@/types/roles";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole | null;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role?: UserRole | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: UserRole | null;
  }
}
