import type { Metadata } from "next";
import { Types } from "mongoose";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { Employer } from "@/models/Employer";

export const metadata: Metadata = {
  title: "Account",
};

export default async function AccountPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/login");
  }
  if (!session.user.role) {
    redirect("/onboarding/role");
  }

  let companyName: string | undefined;
  if (session.user.role === "employer") {
    await connectDB();
    const employer = await Employer.findOne({
      userId: new Types.ObjectId(session.user.id),
    }).lean();
    companyName = employer?.companyName;
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight">Account</h1>
      <p className="mt-2 text-sm text-ink/70">You are signed in. Dashboards and listings land in Phase 2.</p>
      <dl className="mt-8 divide-y divide-ink/10 rounded-xl border border-ink/10 bg-white">
        <div className="grid gap-1 px-5 py-4 sm:grid-cols-3 sm:gap-4">
          <dt className="text-sm font-medium text-ink/60">Name</dt>
          <dd className="text-sm sm:col-span-2">{session.user.name}</dd>
        </div>
        <div className="grid gap-1 px-5 py-4 sm:grid-cols-3 sm:gap-4">
          <dt className="text-sm font-medium text-ink/60">Email</dt>
          <dd className="text-sm sm:col-span-2">{session.user.email}</dd>
        </div>
        <div className="grid gap-1 px-5 py-4 sm:grid-cols-3 sm:gap-4">
          <dt className="text-sm font-medium text-ink/60">Role</dt>
          <dd className="text-sm capitalize sm:col-span-2">{session.user.role}</dd>
        </div>
        {companyName ? (
          <div className="grid gap-1 px-5 py-4 sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-ink/60">Company</dt>
            <dd className="text-sm sm:col-span-2">{companyName}</dd>
          </div>
        ) : null}
      </dl>
    </main>
  );
}
