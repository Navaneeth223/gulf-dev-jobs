import type { Metadata } from "next";
import { AuthForm } from "@/components/AuthForm";
import { isGoogleAuthEnabled } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Sign in",
};

interface LoginPageProps {
  searchParams: {
    callbackUrl?: string;
  };
}

export default function LoginPage({ searchParams }: LoginPageProps) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-md">
        <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
        <p className="mt-2 text-sm text-ink/70">Use the email you registered with, or Google if it is configured.</p>
      </div>
      <div className="mt-8">
        <AuthForm
          mode="login"
          googleEnabled={isGoogleAuthEnabled()}
          callbackUrl={searchParams.callbackUrl ?? "/account"}
        />
      </div>
    </main>
  );
}
