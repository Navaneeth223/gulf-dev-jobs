import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Jobs",
};

export default function JobsPlaceholderPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight">Jobs</h1>
      <p className="mt-3 text-sm leading-7 text-ink/70">
        Public search, filters, and job detail pages are Phase 2. Auth and the landing page are live so we can attach
        listings to real employer accounts next.
      </p>
      <Link href="/" className="mt-6 inline-block text-sm font-medium text-teal underline-offset-2 hover:underline">
        Back to the homepage
      </Link>
    </main>
  );
}
