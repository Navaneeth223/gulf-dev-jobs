"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => {
        void signOut({ callbackUrl: "/" });
      }}
      className="rounded-md px-3 py-2 text-sm font-medium text-ink/80 hover:bg-ink/5 hover:text-ink"
    >
      Sign out
    </button>
  );
}
