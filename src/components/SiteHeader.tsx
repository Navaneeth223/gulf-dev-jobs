import Link from "next/link";
import { getServerSession } from "next-auth";
import { SignOutButton } from "@/components/SignOutButton";
import { authOptions } from "@/lib/auth";

export async function SiteHeader() {
  const session = await getServerSession(authOptions);

  return (
    <header className="border-b border-ink/10 bg-sand/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="font-semibold tracking-tight text-ink">
          Gulf Dev Jobs
        </Link>
        <nav className="flex items-center gap-1 text-sm" aria-label="Primary">
          <Link
            href="/#how-it-works"
            className="rounded-md px-3 py-2 text-ink/80 hover:bg-ink/5 hover:text-ink"
          >
            How it works
          </Link>
          <Link
            href="/jobs"
            className="rounded-md px-3 py-2 text-ink/80 hover:bg-ink/5 hover:text-ink"
          >
            Jobs
          </Link>
          {session ? (
            <>
              <Link
                href="/account"
                className="rounded-md px-3 py-2 text-ink/80 hover:bg-ink/5 hover:text-ink"
              >
                Account
              </Link>
              <SignOutButton />
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-md px-3 py-2 text-ink/80 hover:bg-ink/5 hover:text-ink"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="rounded-md bg-teal px-3 py-2 font-medium text-white hover:bg-teal/90"
              >
                Join free
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
