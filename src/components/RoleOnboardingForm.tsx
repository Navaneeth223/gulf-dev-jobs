"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState, type FormEvent } from "react";

export function RoleOnboardingForm() {
  const router = useRouter();
  const { update } = useSession();
  const [role, setRole] = useState<"employer" | "candidate">("candidate");
  const [companyName, setCompanyName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);
    try {
      const response = await fetch("/api/account/role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role,
          companyName: role === "employer" ? companyName : undefined,
        }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(data.error ?? "Could not save your role.");
        return;
      }
      await update();
      router.push("/account");
      router.refresh();
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <fieldset>
        <legend className="text-sm font-medium text-ink">Choose how you will use Gulf Dev Jobs</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <label
            className={`flex cursor-pointer items-start gap-2 rounded-md border bg-white p-4 ${
              role === "candidate" ? "border-teal ring-2 ring-teal" : "border-ink/15"
            }`}
          >
            <input
              type="radio"
              name="role"
              value="candidate"
              checked={role === "candidate"}
              onChange={() => setRole("candidate")}
              className="mt-1"
            />
            <span>
              <span className="block font-medium">Candidate</span>
              <span className="text-sm text-ink/65">Browse Gulf + remote roles and apply free.</span>
            </span>
          </label>
          <label
            className={`flex cursor-pointer items-start gap-2 rounded-md border bg-white p-4 ${
              role === "employer" ? "border-teal ring-2 ring-teal" : "border-ink/15"
            }`}
          >
            <input
              type="radio"
              name="role"
              value="employer"
              checked={role === "employer"}
              onChange={() => setRole("employer")}
              className="mt-1"
            />
            <span>
              <span className="block font-medium">Employer</span>
              <span className="text-sm text-ink/65">Post paid listings for vetted developers.</span>
            </span>
          </label>
        </div>
      </fieldset>

      {role === "employer" ? (
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-ink">
            Company name
          </label>
          <input
            id="companyName"
            name="companyName"
            required
            value={companyName}
            onChange={(event) => setCompanyName(event.target.value)}
            className="mt-1 w-full rounded-md border border-ink/15 bg-white px-3 py-2 text-ink shadow-sm outline-none ring-teal focus:ring-2"
          />
        </div>
      ) : null}

      {error ? (
        <p role="alert" className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-md bg-teal px-4 py-2.5 text-sm font-medium text-white hover:bg-teal/90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Saving…" : "Continue"}
      </button>
    </form>
  );
}
