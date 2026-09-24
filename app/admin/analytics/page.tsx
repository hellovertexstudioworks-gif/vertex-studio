"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  Eye,
  Monitor,
  Smartphone,
  Globe,
  RefreshCw,
  Users,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type Visitor = {
  id: string;
  session_id: string;
  page_path: string | null;
  referrer: string | null;
  user_agent: string | null;
  device_type: string | null;
  created_at: string;
};

export default function AnalyticsPage() {
  const supabase = createClient();

  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadVisitors = async () => {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("visitors")
      .select(
        "id, session_id, page_path, referrer, user_agent, device_type, created_at"
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error("ANALYTICS ERROR:", error);
      setError(error.message);
      setVisitors([]);
      setLoading(false);
      return;
    }

    setVisitors(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    loadVisitors();
  }, []);

  const metrics = useMemo(() => {
    const totalViews = visitors.length;

    const uniqueSessions = new Set(
      visitors.map((visitor) => visitor.session_id)
    ).size;

    const pageCounts: Record<string, number> = {};

    visitors.forEach((visitor) => {
      const page = visitor.page_path || "/";

      pageCounts[page] = (pageCounts[page] || 0) + 1;
    });

    const topPages = Object.entries(pageCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const deviceCounts: Record<string, number> = {};

    visitors.forEach((visitor) => {
      const device = visitor.device_type || "Unknown";

      deviceCounts[device] = (deviceCounts[device] || 0) + 1;
    });

    const referrerCounts: Record<string, number> = {};

    visitors.forEach((visitor) => {
      let source = "Direct";

      if (visitor.referrer) {
        try {
          const url = new URL(visitor.referrer);
          source = url.hostname.replace("www.", "");
        } catch {
          source = visitor.referrer;
        }
      }

      referrerCounts[source] = (referrerCounts[source] || 0) + 1;
    });

    const topSources = Object.entries(referrerCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const desktop = deviceCounts["Desktop"] || 0;
    const mobile = deviceCounts["Mobile"] || 0;
    const tablet = deviceCounts["Tablet"] || 0;

    return {
      totalViews,
      uniqueSessions,
      topPages,
      topSources,
      desktop,
      mobile,
      tablet,
    };
  }, [visitors]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        {/* HEADER */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/40">
              <BarChart3 className="h-4 w-4" />
              Vertex Studio
            </div>

            <h1 className="text-3xl font-semibold tracking-tight">
              Analytics
            </h1>

            <p className="mt-2 text-sm text-white/50">
              Monitor website visitors, traffic, and engagement.
            </p>
          </div>

          <button
            onClick={loadVisitors}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-white transition hover:bg-white/[0.07] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw
              className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </button>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-400">
            <p className="font-medium">Unable to load analytics</p>
            <p className="mt-1 text-red-400/70">{error}</p>
          </div>
        )}

        {/* METRICS */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            icon={<Eye className="h-5 w-5" />}
            label="Page Views"
            value={loading ? "—" : metrics.totalViews.toString()}
            description="Total tracked visits"
          />

          <MetricCard
            icon={<Users className="h-5 w-5" />}
            label="Unique Visitors"
            value={loading ? "—" : metrics.uniqueSessions.toString()}
            description="Unique sessions"
          />

          <MetricCard
            icon={<Globe className="h-5 w-5" />}
            label="Top Page"
            value={
              loading
                ? "—"
                : metrics.topPages.length > 0
                  ? metrics.topPages[0][0]
                  : "—"
            }
            description={
              loading
                ? "Loading..."
                : metrics.topPages.length > 0
                  ? `${metrics.topPages[0][1]} view${
                      metrics.topPages[0][1] === 1 ? "" : "s"
                    }`
                  : "No data yet"
            }
          />

          <MetricCard
            icon={<Monitor className="h-5 w-5" />}
            label="Desktop"
            value={loading ? "—" : metrics.desktop.toString()}
            description="Tracked desktop visits"
          />
        </div>

        {/* MAIN GRID */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* TOP PAGES */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.02]">
            <div className="border-b border-white/10 px-6 py-5">
              <h2 className="font-semibold">Top Pages</h2>
              <p className="mt-1 text-sm text-white/40">
                Pages receiving the most traffic.
              </p>
            </div>

            <div className="p-6">
              {loading ? (
                <LoadingState />
              ) : metrics.topPages.length === 0 ? (
                <EmptyState text="No page data yet." />
              ) : (
                <div className="space-y-5">
                  {metrics.topPages.map(([page, count]) => {
                    const percentage =
                      metrics.totalViews > 0
                        ? Math.round((count / metrics.totalViews) * 100)
                        : 0;

                    return (
                      <div key={page}>
                        <div className="mb-2 flex items-center justify-between gap-4">
                          <span className="truncate text-sm text-white/80">
                            {page}
                          </span>

                          <span className="text-sm font-medium text-white">
                            {count}
                          </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-white/5">
                          <div
                            className="h-full rounded-full bg-white transition-all"
                            style={{
                              width: `${Math.max(percentage, 3)}%`,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </section>

          {/* TRAFFIC SOURCES */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.02]">
            <div className="border-b border-white/10 px-6 py-5">
              <h2 className="font-semibold">Traffic Sources</h2>
              <p className="mt-1 text-sm text-white/40">
                Where your visitors are coming from.
              </p>
            </div>

            <div className="p-6">
              {loading ? (
                <LoadingState />
              ) : metrics.topSources.length === 0 ? (
                <EmptyState text="No traffic source data yet." />
              ) : (
                <div className="space-y-4">
                  {metrics.topSources.map(([source, count]) => (
                    <div
                      key={source}
                      className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5">
                          <Globe className="h-4 w-4 text-white/60" />
                        </div>

                        <span className="truncate text-sm text-white/80">
                          {source}
                        </span>
                      </div>

                      <span className="ml-4 text-sm font-medium text-white">
                        {count}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* DEVICE BREAKDOWN */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.02]">
            <div className="border-b border-white/10 px-6 py-5">
              <h2 className="font-semibold">Device Breakdown</h2>
              <p className="mt-1 text-sm text-white/40">
                Visitor devices recorded by your website.
              </p>
            </div>

            <div className="grid gap-4 p-6 sm:grid-cols-3">
              <DeviceCard
                icon={<Monitor className="h-5 w-5" />}
                label="Desktop"
                value={loading ? "—" : metrics.desktop.toString()}
              />

              <DeviceCard
                icon={<Smartphone className="h-5 w-5" />}
                label="Mobile"
                value={loading ? "—" : metrics.mobile.toString()}
              />

              <DeviceCard
                icon={<Smartphone className="h-5 w-5" />}
                label="Tablet"
                value={loading ? "—" : metrics.tablet.toString()}
              />
            </div>
          </section>

          {/* RECENT VISITORS */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.02]">
            <div className="border-b border-white/10 px-6 py-5">
              <h2 className="font-semibold">Recent Visitors</h2>
              <p className="mt-1 text-sm text-white/40">
                Latest visitor activity.
              </p>
            </div>

            <div className="divide-y divide-white/5">
              {loading ? (
                <div className="p-6">
                  <LoadingState />
                </div>
              ) : visitors.length === 0 ? (
                <div className="p-6">
                  <EmptyState text="No visitors recorded yet." />
                </div>
              ) : (
                visitors.slice(0, 6).map((visitor) => (
                  <div
                    key={visitor.id}
                    className="flex items-center justify-between gap-4 px-6 py-4"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5">
                        {visitor.device_type === "Desktop" ? (
                          <Monitor className="h-4 w-4 text-white/60" />
                        ) : (
                          <Smartphone className="h-4 w-4 text-white/60" />
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-white">
                          {visitor.page_path || "/"}
                        </p>

                        <p className="text-xs text-white/40">
                          {visitor.device_type || "Unknown device"}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="text-xs text-white/60">
                        {formatDate(visitor.created_at)}
                      </p>

                      <p className="mt-1 text-xs text-white/30">
                        {formatTime(visitor.created_at)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        {/* FOOTER NAVIGATION */}
        <div className="mt-8 flex flex-wrap items-center gap-5 text-sm">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-white/50 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Dashboard
          </Link>

          <Link
            href="/admin/leads"
            className="text-white/50 transition hover:text-white"
          >
            Leads →
          </Link>

          <Link
            href="/admin/appointments"
            className="text-white/50 transition hover:text-white"
          >
            Appointments →
          </Link>

          <Link
            href="/admin/messages"
            className="text-white/50 transition hover:text-white"
          >
            Messages →
          </Link>
        </div>
      </div>
    </main>
  );
}

/* =========================================================
   METRIC CARD
========================================================= */

function MetricCard({
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

        <span className="text-xs text-white/30">Live</span>
      </div>

      <p className="text-sm text-white/50">{label}</p>

      <p className="mt-1 text-3xl font-semibold tracking-tight text-white">
        {value}
      </p>

      <p className="mt-2 text-xs text-white/30">{description}</p>
    </div>
  );
}

/* =========================================================
   DEVICE CARD
========================================================= */

function DeviceCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
      <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-white/60">
        {icon}
      </div>

      <p className="text-sm text-white/50">{label}</p>

      <p className="mt-1 text-2xl font-semibold">{value}</p>
    </div>
  );
}

/* =========================================================
   LOADING STATE
========================================================= */

function LoadingState() {
  return (
    <div className="flex items-center gap-3 text-sm text-white/40">
      <RefreshCw className="h-4 w-4 animate-spin" />
      Loading analytics...
    </div>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-dashed border-white/10 px-5 py-8 text-center text-sm text-white/30">
      {text}
    </div>
  );
}