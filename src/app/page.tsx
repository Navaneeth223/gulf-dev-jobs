import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <section className="border-b border-ink/10 bg-ink text-sand">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:py-24">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-accent">Gulf + remote tech hiring</p>
            <h1 className="mt-3 max-w-xl text-4xl font-semibold tracking-tight sm:text-5xl">
              Hire vetted developers who want Gulf-based or remote-friendly work.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-sand/80">
              Gulf Dev Jobs is a focused board — not another global spray of listings. Employers pay to post or
              feature a role. Candidates use it free.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/register"
                className="rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-ink hover:bg-accent/90"
              >
                Create a free candidate account
              </Link>
              <Link
                href="/register"
                className="rounded-md border border-sand/30 px-4 py-2.5 text-sm font-medium text-sand hover:bg-white/10"
              >
                Post as an employer
              </Link>
            </div>
          </div>
          <aside className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-accent">Built for this market</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-sand/85">
              <li>Roles in the GCC plus remote-friendly tech teams hiring from the region</li>
              <li>Employer-paid inventory so the board stays signal-heavy</li>
              <li>Candidate applications stay free — no resume paywall</li>
            </ul>
          </aside>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight">How it works</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <article className="rounded-xl border border-ink/10 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-teal">1. Choose a role</p>
            <h3 className="mt-2 font-semibold">Employer or candidate</h3>
            <p className="mt-2 text-sm leading-6 text-ink/70">
              One account type per person. Employers represent a company; candidates apply as themselves.
            </p>
          </article>
          <article className="rounded-xl border border-ink/10 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-teal">2. Listings go live when paid</p>
            <h3 className="mt-2 font-semibold">Employers post jobs</h3>
            <p className="mt-2 text-sm leading-6 text-ink/70">
              Draft locally, pay (Razorpay or Lemon Squeezy), then the role is public. First three posts are free
              while we seed the board.
            </p>
          </article>
          <article className="rounded-xl border border-ink/10 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-teal">3. Apply in one step</p>
            <h3 className="mt-2 font-semibold">Candidates stay free</h3>
            <p className="mt-2 text-sm leading-6 text-ink/70">
              Search Gulf / remote roles, apply with a resume and note, and track status from your account.
            </p>
          </article>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">For candidates</h2>
            <p className="mt-3 text-sm leading-7 text-ink/70">
              If you want GCC onsite, hybrid, or remote-friendly product and engineering work, this board is scoped
              for that search — not every intern spam post on the internet.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">For employers</h2>
            <p className="mt-3 text-sm leading-7 text-ink/70">
              You pay for distribution. That keeps noise down and funds the marketplace. Featured listings and
              analytics come after the core loop is live with real users.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-ink/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-ink/60 sm:px-6 sm:flex-row sm:items-center sm:justify-between">
          <p>Gulf Dev Jobs — Phase 1 foundation (auth + landing).</p>
          <p>Job listings ship in the next phase.</p>
        </div>
      </footer>
    </main>
  );
}
