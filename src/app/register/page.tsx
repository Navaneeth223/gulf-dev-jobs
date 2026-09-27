import type { Metadata } from "next";
import { AuthForm } from "@/components/AuthForm";
import { isGoogleAuthEnabled } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Create account",
};

export default function RegisterPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-md">
        <h1 className="text-2xl font-semibold tracking-tight">Join Gulf Dev Jobs</h1>
        <p className="mt-2 text-sm text-ink/70">
          Candidates apply free. Employers pay only when a listing goes live.
        </p>
      </div>
      <div className="mt-8">
        <AuthForm mode="register" googleEnabled={isGoogleAuthEnabled()} callbackUrl="/account" />
      </div>
    </main>
  );
}
