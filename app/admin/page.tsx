"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  MessageSquare,
  CalendarDays,
  BarChart3,
  Settings,
  ArrowRight,
  LogOut,
  RefreshCw,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Lead = {
  id: string;
  name: string | null;
  email: string | null;
  business: string | null;
  status: string | null;
  created_at: string;
};

type Appointment = {
  id: string;
  status: string | null;
  appointment_date: string | null;
  appointment_time: string | null;
  created_at: string;
};

export default function AdminDashboard() {
  const router = useRouter();
  const supabase = createClient();

  const [leads, setLeads] = useState<Lead[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [error, setError] = useState("");

  const loadDashboard = async () => {
    setLoading(true);
    setError("");

    const [leadsResult, appointmentsResult] = await Promise.all([
      supabase
        .from("leads")
        .select("id, name, email, business, status, created_at")
        .order("created_at", { ascending: false }),

      supabase
        .from("appointments")
        .select(
          "id, status, appointment_date, appointment_time, created_at"
        )
        .order("created_at", { ascending: false }),
    ]);

    if (leadsResult.error) {
      console.error("LEADS DASHBOARD ERROR:", leadsResult.error);
      setError(leadsResult.error.message);
    }

    if (appointmentsResult.error) {
      console.error(
        "APPOINTMENTS DASHBOARD ERROR:",
        appointmentsResult.error
      );

      if (!error) {
        setError(appointmentsResult.error.message);
      }
    }

    setLeads(leadsResult.data ?? []);
    setAppointments(appointmentsResult.data ?? []);

    setLoading(false);
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const totalLeads = leads.length;

  const newLeads = leads.filter(
    (lead) => (lead.status || "New").toLowerCase() === "new"
  ).length;

  const closedLeads = leads.filter(
    (lead) => (lead.status || "").toLowerCase() === "closed"
  ).length;

  const conversionRate =
    totalLeads > 0
      ? Math.round((closedLeads / totalLeads) * 100)
      : 0;

  const upcomingAppointments = appointments.filter((appointment) => {
    const status = (appointment.status || "").toLowerCase();

    return status === "scheduled" || status === "confirmed";
  }).length;

  const recentLeads = leads.slice(0, 5);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleLogout = async () => {
    setLoggingOut(true);

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("LOGOUT ERROR:", error);
      setLoggingOut(false);
      return;
    }

    router.push("/login");
    router.refresh();
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside className="fixed left-0 top-0 hidden h-screen w-[250px] border-r border-white/10 bg-black md:block">
        {/* BRAND */}

        <div className="border-b border-white/10 px-6 py-6">
          <Link href="/admin" className="block">
            <h1 className="text-lg font-semibold tracking-tight">
              Vertex Studio
            </h1>

            <p className="mt-1 text-xs text-white/40">
              Admin Portal
            </p>
          </Link>
        </div>

        {/* NAVIGATION */}

        <nav className="space-y-1 px-3 py-5">
          <SidebarLink
            href="/admin"
            icon={<BarChart3 className="h-4 w-4" />}
            label="Overview"
            active
          />

          <SidebarLink
            href="/admin/leads"
            icon={<Users className="h-4 w-4" />}
            label="Leads"
          />

          <SidebarLink
            href="/admin/analytics"
            icon={<BarChart3 className="h-4 w-4" />}
            label="Analytics"
          />

          <SidebarLink
            href="/admin/appointments"
            icon={<CalendarDays className="h-4 w-4" />}
            label="Appointments"
          />

          <SidebarLink
            href="/admin/messages"
            icon={<MessageSquare className="h-4 w-4" />}
            label="Messages"
          />

          <SidebarLink
            href="/admin/settings"
            icon={<Settings className="h-4 w-4" />}
            label="Settings"
          />
        </nav>

        {/* ADMIN PROFILE */}

        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 p-4">
          <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-medium">
                A
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-medium">
                  Admin
                </p>

                <p className="truncate text-xs text-white/40">
                  Vertex Studio
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              disabled={loggingOut}
              title="Sign out"
              className="rounded-lg p-2 text-white/40 transition hover:bg-white/5 hover:text-white disabled:opacity-50"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="md:ml-[250px]">
        {/* HEADER */}

        <header className="flex items-center justify-between border-b border-white/10 px-6 py-5 lg:px-10">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/30">
              Dashboard
            </p>

            <h2 className="mt-1 text-2xl font-semibold tracking-tight">
              Overview
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadDashboard}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-white/70 transition hover:bg-white/[0.07] hover:text-white disabled:opacity-50"
            >
              <RefreshCw
                className={`h-4 w-4 ${
                  loading ? "animate-spin" : ""
                }`}
              />

              Refresh
            </button>

            <Link
              href="/"
              target="_blank"
              className="hidden rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-white/70 transition hover:bg-white/5 hover:text-white sm:block"
            >
              View Website
            </Link>
          </div>
        </header>

        <div className="px-6 py-10 lg:px-10">
          {/* WELCOME */}

          <div className="mb-8">
            <p className="text-sm text-white/40">
              Welcome back.
            </p>

            <h3 className="mt-2 text-3xl font-semibold tracking-tight">
              Here's your business overview.
            </h3>
          </div>

          {/* ERROR */}

          {error && (
            <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4">
              <p className="text-sm font-medium text-red-400">
                Unable to load some dashboard data.
              </p>

              <p className="mt-1 text-xs text-red-400/70">
                {error}
              </p>
            </div>
          )}

          {/* =====================================================
              STAT CARDS
          ===================================================== */}

          <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              icon={<Users className="h-5 w-5" />}
              label="Total Leads"
              value={loading ? "—" : totalLeads.toString()}
              description="All website inquiries"
            />

            <StatCard
              icon={<MessageSquare className="h-5 w-5" />}
              label="New Leads"
              value={loading ? "—" : newLeads.toString()}
              description="Needs follow-up"
            />

            <StatCard
              icon={<CalendarDays className="h-5 w-5" />}
              label="Appointments"
              value={
                loading
                  ? "—"
                  : upcomingAppointments.toString()
              }
              description="Scheduled or confirmed"
            />

            <StatCard
              icon={<BarChart3 className="h-5 w-5" />}
              label="Conversion Rate"
              value={loading ? "—" : `${conversionRate}%`}
              description="Closed leads"
            />
          </div>

          {/* =====================================================
              CONTENT GRID
          ===================================================== */}

          <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
            {/* RECENT LEADS */}

            <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
                <div>
                  <h4 className="font-semibold">
                    Recent Leads
                  </h4>

                  <p className="mt-1 text-sm text-white/40">
                    Your latest website inquiries.
                  </p>
                </div>

                <Link
                  href="/admin/leads"
                  className="inline-flex items-center gap-1 text-sm text-white/50 transition hover:text-white"
                >
                  View all
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {loading ? (
                <div className="flex items-center justify-center px-6 py-16 text-sm text-white/40">
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Loading leads...
                </div>
              ) : recentLeads.length === 0 ? (
                <div className="px-6 py-16 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white/5">
                    <Users className="h-5 w-5 text-white/40" />
                  </div>

                  <h5 className="mt-4 text-sm font-medium">
                    No leads yet
                  </h5>

                  <p className="mt-1 text-sm text-white/40">
                    Website inquiries will appear here.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-white/5">
                  {recentLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className="grid grid-cols-[1fr_auto_auto] items-center gap-5 px-6 py-5"
                    >
                      {/* LEAD */}

                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-white">
                          {lead.name || "Unnamed Lead"}
                        </p>

                        <p className="mt-1 truncate text-xs text-white/40">
                          {lead.email || "No email"}
                        </p>

                        {lead.business && (
                          <p className="mt-1 truncate text-xs text-white/30">
                            {lead.business}
                          </p>
                        )}
                      </div>

                      {/* STATUS */}

                      <StatusBadge
                        status={lead.status || "New"}
                      />

                      {/* DATE */}

                      <div className="hidden text-right sm:block">
                        <p className="text-xs text-white/50">
                          {formatDate(lead.created_at)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* QUICK ACTIONS */}

            <section className="rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="border-b border-white/10 px-6 py-5">
                <h4 className="font-semibold">
                  Quick Actions
                </h4>

                <p className="mt-1 text-sm text-white/40">
                  Manage your business from one place.
                </p>
              </div>

              <div className="p-3">
                <QuickAction
                  href="/admin/leads"
                  icon={<Users className="h-5 w-5" />}
                  title="Manage Leads"
                  description="View and organize prospects."
                />

                <QuickAction
                  href="/admin/analytics"
                  icon={<BarChart3 className="h-5 w-5" />}
                  title="View Analytics"
                  description="Monitor website performance."
                />

                <QuickAction
                  href="/admin/appointments"
                  icon={<CalendarDays className="h-5 w-5" />}
                  title="Appointments"
                  description="Manage upcoming bookings."
                />

                <QuickAction
                  href="/admin/messages"
                  icon={<MessageSquare className="h-5 w-5" />}
                  title="Messages"
                  description="Manage website inquiries."
                />

                <QuickAction
                  href="/admin/settings"
                  icon={<Settings className="h-5 w-5" />}
                  title="Settings"
                  description="Configure your workspace."
                />
              </div>
            </section>
          </div>

          {/* =====================================================
              SYSTEM STATUS
          ===================================================== */}

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium">
                  System Status
                </p>

                <p className="mt-1 text-xs text-white/40">
                  Vertex Studio CRM services and database.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Database Connected
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   SIDEBAR LINK
========================================================= */

function SidebarLink({
  href,
  icon,
  label,
  active = false,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
        active
          ? "bg-white text-black"
          : "text-white/50 hover:bg-white/5 hover:text-white"
      }`}
    >
      {icon}

      <span>{label}</span>

      {active && (
        <ArrowRight className="ml-auto h-4 w-4" />
      )}
    </Link>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  icon,
  label,
  value,
  description,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
      <div className="mb-5 flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white/70">
          {icon}
        </div>

        <span className="text-xs text-white/30">
          Overview
        </span>
      </div>

      <p className="text-sm text-white/50">
        {label}
      </p>

      <p className="mt-1 text-3xl font-semibold tracking-tight">
        {value}
      </p>

      <p className="mt-2 text-xs text-white/30">
        {description}
      </p>
    </div>
  );
}

/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const normalized = status.toLowerCase();

  let className =
    "border-white/10 bg-white/5 text-white/60";

  if (normalized === "new") {
    className =
      "border-blue-500/20 bg-blue-500/10 text-blue-400";
  }

  if (normalized === "contacted") {
    className =
      "border-yellow-500/20 bg-yellow-500/10 text-yellow-400";
  }

  if (normalized === "qualified") {
    className =
      "border-purple-500/20 bg-purple-500/10 text-purple-400";
  }

  if (normalized === "closed") {
    className =
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-400";
  }

  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs ${className}`}
    >
      {status}
    </span>
  );
}

/* =========================================================
   QUICK ACTION
========================================================= */

function QuickAction({
  href,
  icon,
  title,
  description,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-4 rounded-xl px-4 py-4 transition hover:bg-white/[0.04]"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white/70">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-white">
          {title}
        </p>

        <p className="mt-1 text-xs text-white/40">
          {description}
        </p>
      </div>

      <ArrowRight className="h-4 w-4 text-white/20 transition group-hover:translate-x-1 group-hover:text-white/60" />
    </Link>
  );
}