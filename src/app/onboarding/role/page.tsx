import type { Metadata } from "next";
import { RoleOnboardingForm } from "@/components/RoleOnboardingForm";

export const metadata: Metadata = {
  title: "Choose your role",
};

export default function RoleOnboardingPage() {
  return (
    <main className="mx-auto max-w-lg px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight">One more step</h1>
      <p className="mt-2 text-sm leading-6 text-ink/70">
        Google accounts need a role before you can post jobs or apply. This cannot be changed later in the MVP.
      </p>
      <div className="mt-8 rounded-xl border border-ink/10 bg-white p-6 shadow-sm">
        <RoleOnboardingForm />
      </div>
    </main>
  );
}
