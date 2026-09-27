"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

interface AuthFormProps {
  mode: "login" | "register";
  googleEnabled: boolean;
  callbackUrl?: string;
}

export function AuthForm({ mode, googleEnabled, callbackUrl = "/account" }: AuthFormProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"employer" | "candidate">("candidate");
  const [companyName, setCompanyName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);

    try {
      if (mode === "register") {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            password,
            role,
            companyName: role === "employer" ? companyName : undefined,
          }),
        });
        const data = (await response.json()) as { error?: string };
        if (!response.ok) {
          setError(data.error ?? "Could not create the account.");
          return;
        }
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl,
      });

      if (result?.error) {
        setError(
          mode === "login"
            ? "Email or password is incorrect."
            : "Account created, but sign-in failed. Try signing in.",
        );
        return;
      }

      router.push(callbackUrl);
      router.refresh();
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        {mode === "register" ? (
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-ink">
              Full name
            </label>
            <input
              id="name"
              name="name"
              autoComplete="name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-1 w-full rounded-md border border-ink/15 bg-white px-3 py-2 text-ink shadow-sm outline-none ring-teal focus:ring-2"
            />
          </div>
        ) : null}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-ink">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-1 w-full rounded-md border border-ink/15 bg-white px-3 py-2 text-ink shadow-sm outline-none ring-teal focus:ring-2"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-ink">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            required
            minLength={mode === "register" ? 8 : undefined}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-1 w-full rounded-md border border-ink/15 bg-white px-3 py-2 text-ink shadow-sm outline-none ring-teal focus:ring-2"
          />
          {mode === "register" ? (
            <p className="mt-1 text-xs text-ink/60">At least 8 characters.</p>
          ) : null}
        </div>

        {mode === "register" ? (
          <fieldset>
            <legend className="text-sm font-medium text-ink">I am a</legend>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <label
                className={`flex cursor-pointer items-start gap-2 rounded-md border bg-white p-3 ${
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
                  <span className="block text-sm font-medium">Candidate</span>
                  <span className="block text-xs text-ink/60">Free to apply</span>
                </span>
              </label>
              <label
                className={`flex cursor-pointer items-start gap-2 rounded-md border bg-white p-3 ${
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
                  <span className="block text-sm font-medium">Employer</span>
                  <span className="block text-xs text-ink/60">Pay to post jobs</span>
                </span>
              </label>
            </div>
          </fieldset>
        ) : null}

        {mode === "register" && role === "employer" ? (
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-ink">
              Company name
            </label>
            <input
              id="companyName"
              name="companyName"
              autoComplete="organization"
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
          {pending ? "Please wait…" : mode === "login" ? "Sign in" : "Create account"}
        </button>
      </form>

      {googleEnabled ? (
        <div className="mt-4">
          <p className="mb-3 text-center text-xs uppercase tracking-wide text-ink/50">or</p>
          <button
            type="button"
            onClick={() => {
              void signIn("google", { callbackUrl });
            }}
            className="w-full rounded-md border border-ink/15 bg-white px-4 py-2.5 text-sm font-medium text-ink hover:bg-ink/5"
          >
            Continue with Google
          </button>
        </div>
      ) : null}

      <p className="mt-6 text-center text-sm text-ink/70">
        {mode === "login" ? (
          <>
            No account?{" "}
            <Link href="/register" className="font-medium text-teal underline-offset-2 hover:underline">
              Join free
            </Link>
          </>
        ) : (
          <>
            Already registered?{" "}
            <Link href="/login" className="font-medium text-teal underline-offset-2 hover:underline">
              Sign in
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
