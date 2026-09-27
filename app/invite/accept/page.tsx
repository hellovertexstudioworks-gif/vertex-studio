// app/invite/accept/page.tsx

"use client";

import { FormEvent, Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type InviteState = "loading" | "ready" | "success" | "error";

function InviteAcceptContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const [state, setState] = useState<InviteState>("loading");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function establishInviteSession() {
      try {
        setState("loading");
        setError("");

        const tokenHash = searchParams.get("token_hash");
        const type = searchParams.get("type");
        const code = searchParams.get("code");

        /*
         * Supabase invitation links normally arrive with token_hash + type.
         * We also support PKCE-style links that arrive with a code.
         */
        if (tokenHash && (type === "invite" || type === "signup")) {
          const { error: verifyError } = await supabase.auth.verifyOtp({
            token_hash: tokenHash,
            type: type as "invite" | "signup",
          });

          if (verifyError) {
            throw new Error(
              verifyError.message || "This invitation link is invalid or expired."
            );
          }
        } else if (code) {
          const { error: exchangeError } =
            await supabase.auth.exchangeCodeForSession(code);

          if (exchangeError) {
            throw new Error(
              exchangeError.message || "This invitation link is invalid or expired."
            );
          }
        }

        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          throw new Error(
            "We could not verify this invitation. Please open the invitation link again from your email."
          );
        }

        if (cancelled) return;

        setEmail(user.email ?? "");

        const metadataName =
          typeof user.user_metadata?.full_name === "string"
            ? user.user_metadata.full_name
            : typeof user.user_metadata?.name === "string"
              ? user.user_metadata.name
              : "";

        if (metadataName) {
          setFullName(metadataName);
        }

        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("full_name, status")
          .eq("id", user.id)
          .maybeSingle();

        if (profileError) {
          throw new Error("Unable to load your invitation profile.");
        }

        if (profile?.status === "Active") {
          setState("success");
          return;
        }

        if (profile?.full_name) {
          setFullName(profile.full_name);
        }

        setState("ready");
      } catch (err) {
        if (cancelled) return;

        console.error("Invitation acceptance failed:", err);

        setError(
          err instanceof Error
            ? err.message
            : "This invitation could not be verified."
        );
        setState("error");
      }
    }

    void establishInviteSession();

    return () => {
      cancelled = true;
    };
  }, [searchParams, supabase]);

  async function completeSetup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submitting) return;

    if (password.length < 8) {
      setError("Your password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Your passwords do not match.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error(
          "Your invitation session has expired. Please open the invitation email again."
        );
      }

      const { error: passwordError } = await supabase.auth.updateUser({
        password,
        data: {
          full_name: fullName.trim(),
        },
      });

      if (passwordError) {
        throw new Error(
          passwordError.message || "Unable to set your password."
        );
      }

      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          full_name: fullName.trim(),
          status: "Active",
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (profileError) {
        throw new Error(
          "Your password was created, but your profile could not be activated. Please contact the workspace owner."
        );
      }

      setState("success");

      window.setTimeout(() => {
        router.replace("/admin");
        router.refresh();
      }, 1200);
    } catch (err) {
      console.error("Account setup failed:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to complete your account setup."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (state === "loading") {
    return (
      <InviteShell>
        <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
            <Loader2 className="h-7 w-7 animate-spin text-cyan-400" />
          </div>

          <h1 className="text-xl font-semibold text-white">
            Verifying your invitation
          </h1>

          <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">
            Please wait while we securely verify your invitation link.
          </p>
        </div>
      </InviteShell>
    );
  }

  if (state === "error") {
    return (
      <InviteShell>
        <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-red-400/20 bg-red-400/10">
            <ShieldCheck className="h-7 w-7 text-red-400" />
          </div>

          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-400">
            Vertex Studio Works
          </p>

          <h1 className="text-2xl font-semibold text-white">
            Invitation could not be verified
          </h1>

          <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
            {error}
          </p>

          <button
            type="button"
            onClick={() => router.replace("/login")}
            className="mt-7 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Go to Login
          </button>
        </div>
      </InviteShell>
    );
  }

  if (state === "success") {
    return (
      <InviteShell>
        <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10">
            <CheckCircle2 className="h-8 w-8 text-emerald-400" />
          </div>

          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-400">
            Vertex Studio Works
          </p>

          <h1 className="text-2xl font-semibold text-white">
            Account setup complete
          </h1>

          <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
            Your workspace account is now active. Redirecting you to the
            Vertex Admin dashboard...
          </p>

          <div className="mt-7 flex items-center gap-2 text-sm text-slate-500">
            <Loader2 className="h-4 w-4 animate-spin" />
            Opening Admin
          </div>
        </div>
      </InviteShell>
    );
  }

  return (
    <InviteShell>
      <div className="mb-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-400">
          Vertex Studio Works
        </p>

        <h1 className="text-3xl font-semibold tracking-tight text-white">
          Accept Your Invitation
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-400">
          Complete your account setup to access the Vertex Studio workspace.
        </p>
      </div>

      <div className="mb-7 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10">
            <UserRound className="h-5 w-5 text-cyan-400" />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Invited account
            </p>

            <p className="mt-1 truncate text-sm font-medium text-white">
              {email}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={completeSetup} className="space-y-5">
        <Field
          label="Full Name"
          value={fullName}
          onChange={setFullName}
          placeholder="e.g. Alex Morgan"
          icon={<UserRound className="h-4 w-4" />}
          disabled={submitting}
        />

        <PasswordField
          label="Create Password"
          value={password}
          onChange={setPassword}
          placeholder="At least 8 characters"
          visible={showPassword}
          onToggle={() => setShowPassword((current) => !current)}
          disabled={submitting}
        />

        <PasswordField
          label="Confirm Password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          placeholder="Re-enter your password"
          visible={showConfirmPassword}
          onToggle={() =>
            setShowConfirmPassword((current) => !current)
          }
          disabled={submitting}
        />

        {error ? (
          <div className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm leading-5 text-red-300">
            {error}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={
            submitting ||
            !fullName.trim() ||
            !password ||
            !confirmPassword
          }
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Completing Setup...
            </>
          ) : (
            <>
              <ShieldCheck className="h-4 w-4" />
              Complete Account Setup
            </>
          )}
        </button>
      </form>

      <div className="mt-7 flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
        <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />

        <p className="text-xs leading-5 text-slate-500">
          Your invitation is tied to this email address. Keep your password
          private and do not share your account credentials.
        </p>
      </div>
    </InviteShell>
  );
}

function InviteShell({ children }: { children: React.ReactNode }) {
  return (
    <main
      className="min-h-screen px-5 py-10 text-white"
      style={{
        background:
          "radial-gradient(circle at top, rgba(14, 165, 233, 0.10), transparent 35%), #050816",
      }}
    >
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-xl items-center justify-center">
        <section className="w-full rounded-3xl border border-white/10 bg-[#0a0d18]/95 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-9">
          {children}
        </section>
      </div>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  icon,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  icon: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-200">
        {label}
      </span>

      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
          {icon}
        </span>

        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/10 disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>
    </label>
  );
}

function PasswordField({
  label,
  value,
  onChange,
  placeholder,
  visible,
  onToggle,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  visible: boolean;
  onToggle: () => void;
  disabled?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-200">
        {label}
      </span>

      <div className="relative">
        <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

        <input
          type={visible ? "text" : "password"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] pl-10 pr-11 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/10 disabled:cursor-not-allowed disabled:opacity-60"
        />

        <button
          type="button"
          onClick={onToggle}
          disabled={disabled}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white/5 hover:text-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {visible ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
    </label>
  );
}


export default function InviteAcceptPage() {
  return (
    <Suspense
      fallback={
        <InviteShell>
          <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
              <Loader2 className="h-7 w-7 animate-spin text-cyan-400" />
            </div>

            <h1 className="text-xl font-semibold text-white">
              Loading invitation
            </h1>

            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">
              Please wait while we prepare your invitation.
            </p>
          </div>
        </InviteShell>
      }
    >
      <InviteAcceptContent />
    </Suspense>
  );
}
