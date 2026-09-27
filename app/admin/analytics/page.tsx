// FILE: app/admin/analytics/page.tsx
// PURPOSE: Vertex Studio Works — Business OS Analytics + Client Reports
// NOTE: Preserves the existing analytics dashboard and adds client-specific PDF/Excel reporting.

"use client";

import {
  Activity,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  Download,
  Eye,
  FileSpreadsheet,
  FileText,
  Globe2,
  Loader2,
  RefreshCw,
  TrendingUp,
  Users,
  WalletCards,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";

type RangeKey = "7d" | "30d" | "90d" | "year";
type ReportType = "combined" | "website" | "project" | "billing";
type DownloadFormat = "pdf" | "excel";

type AnalyticsResponse = {
  range: RangeKey;
  rangeStart: string;
  rangeEnd: string;
  overview: {
    totalClients: number;
    activeClients: number;
    totalProjects: number;
    activeProjects: number;
    totalWebsites: number;
    activeWebsites: number;
    liveWebsites: number;
    maintenanceWebsites: number;
    totalLeads: number;
    newLeads: number;
    contactedLeads: number;
    qualifiedLeads: number;
    closedLeads: number;
    leadCloseRate: number;
    rangeLeads: number;
    rangeClosedLeads: number;
    rangeCloseRate: number;
    totalInvoices: number;
    paidInvoices: number;
    overdueInvoices: number;
    invoiceTotal: number;
    paidInvoiceTotal: number;
    outstandingInvoiceTotal: number;
    totalReceived: number;
    rangeReceived: number;
    websiteVisitors: number;
    sessions: number;
    pageViews: number;
  };
  breakdowns: {
    projectStatus: Record<string, number>;
    websiteStatus: Record<string, number>;
    invoiceStatus: Record<string, number>;
    paymentStatus: Record<string, number>;
    topLeadSources: Array<{ source: string; count: number }>;
  };
  series: {
    revenue: Array<{ date: string; value: number }>;
    leads: Array<{ date: string; value: number }>;
    visitors: Array<{ date: string; value: number }>;
  };
  generatedAt: string;
};

type Client = {
  id: string;
  name: string;
  company: string;
  email: string;
  status: string;
  companyType?: string;
};

const ranges: Array<{ key: RangeKey; label: string }> = [
  { key: "7d", label: "Last 7 days" },
  { key: "30d", label: "Last 30 days" },
  { key: "90d", label: "Last 90 days" },
  { key: "year", label: "This year" },
];

const reportTypes: Array<{
  key: ReportType;
  label: string;
  description: string;
}> = [
  {
    key: "combined",
    label: "Combined Client Report",
    description: "Website, projects, billing, payments, and projection.",
  },
  {
    key: "website",
    label: "Website Performance",
    description: "Website activity, pages, and website portfolio.",
  },
  {
    key: "project",
    label: "Project Report",
    description: "Project progress, delivery status, and project value.",
  },
  {
    key: "billing",
    label: "Billing Report",
    description: "Invoices, payments, outstanding balance, and projection.",
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

function formatShortDate(value: string) {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function titleCase(value: string) {
  return value
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function getDownloadFilename(
  contentDisposition: string | null,
  fallback: string
) {
  if (!contentDisposition) return fallback;

  const match =
    contentDisposition.match(/filename\*=UTF-8''([^;]+)/i) ??
    contentDisposition.match(/filename="?([^"]+)"?/i);

  if (!match?.[1]) return fallback;

  try {
    return decodeURIComponent(match[1].trim());
  } catch {
    return match[1].trim();
  }
}

export default function AnalyticsPage() {
  const [range, setRange] = useState<RangeKey>("30d");
  const [data, setData] = useState<AnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [clients, setClients] = useState<Client[]>([]);
  const [clientsLoading, setClientsLoading] = useState(true);
  const [selectedClientId, setSelectedClientId] = useState("");
  const [reportType, setReportType] = useState<ReportType>("combined");
  const [reportDownloading, setReportDownloading] =
    useState<DownloadFormat | null>(null);
  const [reportMessage, setReportMessage] = useState("");

  const loadAnalytics = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/admin/analytics?range=${range}`, {
        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to load analytics.");
      }

      setData(result as AnalyticsResponse);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to load analytics."
      );
    } finally {
      setLoading(false);
    }
  }, [range]);

  const loadClients = useCallback(async () => {
    setClientsLoading(true);

    try {
      const response = await fetch("/api/admin/clients", {
        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to load clients.");
      }

      const nextClients = Array.isArray(result.clients)
        ? (result.clients as Client[])
        : [];

      setClients(nextClients);

      setSelectedClientId((current) => {
        if (current && nextClients.some((client) => client.id === current)) {
          return current;
        }

        return nextClients[0]?.id ?? "";
      });
    } catch (err) {
      setReportMessage(
        err instanceof Error ? err.message : "Unable to load clients."
      );
    } finally {
      setClientsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadAnalytics();
  }, [loadAnalytics]);

  useEffect(() => {
    void loadClients();
  }, [loadClients]);

  const downloadClientReport = useCallback(
    async (format: DownloadFormat) => {
      if (!selectedClientId) {
        setReportMessage("Select a client before generating a report.");
        return;
      }

      setReportDownloading(format);
      setReportMessage("");

      try {
        const query = new URLSearchParams({
          clientId: selectedClientId,
          type: reportType,
          range,
          format,
        });

        const response = await fetch(
          `/api/admin/client-reports?${query.toString()}`,
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          const contentType = response.headers.get("content-type") ?? "";

          if (contentType.includes("application/json")) {
            const result = await response.json();
            throw new Error(
              result.message || "Unable to generate the client report."
            );
          }

          throw new Error("Unable to generate the client report.");
        }

        const blob = await response.blob();
        const selectedClient = clients.find(
          (client) => client.id === selectedClientId
        );

        const fallbackName =
          `vertex-studio-${(selectedClient?.company || selectedClient?.name || "client")
            .replace(/[^a-z0-9]+/gi, "-")
            .replace(/^-+|-+$/g, "")
            .toLowerCase()}-${reportType}.${format === "pdf" ? "pdf" : "xlsx"}`;

        const filename = getDownloadFilename(
          response.headers.get("content-disposition"),
          fallbackName
        );

        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement("a");

        anchor.href = url;
        anchor.download = filename;
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();

        window.URL.revokeObjectURL(url);

        setReportMessage(
          `${format === "pdf" ? "PDF" : "Excel"} report generated successfully.`
        );
      } catch (err) {
        setReportMessage(
          err instanceof Error
            ? err.message
            : "Unable to generate the client report."
        );
      } finally {
        setReportDownloading(null);
      }
    },
    [clients, range, reportType, selectedClientId]
  );

  const maxRevenue = useMemo(
    () =>
      Math.max(
        1,
        ...(data?.series.revenue.map((item) => item.value) ?? [0])
      ),
    [data]
  );

  const maxLeads = useMemo(
    () =>
      Math.max(1, ...(data?.series.leads.map((item) => item.value) ?? [0])),
    [data]
  );

  const maxVisitors = useMemo(
    () =>
      Math.max(
        1,
        ...(data?.series.visitors.map((item) => item.value) ?? [0])
      ),
    [data]
  );

  const latestRevenue = data?.series.revenue.slice(-1)[0]?.value ?? 0;
  const previousRevenue =
    data && data.series.revenue.length > 1
      ? data.series.revenue[data.series.revenue.length - 2]?.value ?? 0
      : 0;

  const revenueDirection =
    latestRevenue === previousRevenue
      ? "flat"
      : latestRevenue > previousRevenue
        ? "up"
        : "down";

  const selectedReport =
    reportTypes.find((item) => item.key === reportType) ?? reportTypes[0];

  return (
    <div className="min-h-full bg-[var(--vertex-bg)] text-[var(--vertex-text)]">
      <div className="mx-auto max-w-[1600px] px-4 py-5 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-[var(--vertex-accent)]">
              <BarChart3 className="h-4 w-4" />
              Business OS
            </div>

            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Analytics
            </h1>

            <p className="mt-1 max-w-2xl text-sm text-[var(--vertex-muted)]">
              A real-time view of Vertex Studio&apos;s clients, projects,
              websites, leads, revenue, and activity.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative">
              <select
                value={range}
                onChange={(event) =>
                  setRange(event.target.value as RangeKey)
                }
                className="h-10 min-w-[155px] appearance-none rounded-xl border border-[var(--vertex-border)] bg-[#0b1020] px-3 pr-9 text-sm text-white outline-none focus:border-[var(--vertex-accent)]"
              >
                {ranges.map((item) => (
                  <option key={item.key} value={item.key}>
                    {item.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--vertex-muted)]" />
            </div>

            <button
              type="button"
              onClick={() => void loadAnalytics()}
              disabled={loading}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[var(--vertex-border)] bg-[var(--vertex-surface)] px-4 text-sm font-medium transition hover:bg-[var(--vertex-surface-2)] disabled:opacity-60"
            >
              <RefreshCw
                className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {/* CLIENT REPORTS */}
        <section className="mb-6 rounded-2xl border border-[var(--vertex-border)] bg-[var(--vertex-surface)] p-5 sm:p-6">
          <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-[var(--vertex-accent)]">
                <FileText className="h-4 w-4" />
                Client Reports
              </div>

              <h2 className="text-lg font-semibold">
                Generate Client Report
              </h2>

              <p className="mt-1 max-w-2xl text-sm text-[var(--vertex-muted)]">
                Create a client-specific PDF or Excel report using the actual
                website, project, invoice, payment, and tracked analytics data.
              </p>
            </div>

            <div className="rounded-xl border border-[var(--vertex-border)] bg-[var(--vertex-surface-2)] px-3 py-2 text-xs text-[var(--vertex-muted)]">
              Financial data = amounts paid to Vertex Studio Works
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1fr_1fr_1.15fr]">
            <div>
              <label className="mb-2 block text-xs font-medium text-[var(--vertex-muted)]">
                Client
              </label>

              <div className="relative">
                <select
                  value={selectedClientId}
                  onChange={(event) => setSelectedClientId(event.target.value)}
                  disabled={clientsLoading || clients.length === 0}
                  className="h-11 w-full appearance-none rounded-xl border border-[var(--vertex-border)] bg-[#0b1020] px-3 pr-9 text-sm text-white outline-none focus:border-[var(--vertex-accent)] disabled:opacity-60"
                >
                  {clients.length === 0 ? (
                    <option value="">
                      {clientsLoading ? "Loading clients..." : "No clients found"}
                    </option>
                  ) : (
                    clients.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.company || client.name}
                        {client.company && client.name
                          ? ` — ${client.name}`
                          : ""}
                      </option>
                    ))
                  )}
                </select>

                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--vertex-muted)]" />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium text-[var(--vertex-muted)]">
                Report Type
              </label>

              <div className="relative">
                <select
                  value={reportType}
                  onChange={(event) =>
                    setReportType(event.target.value as ReportType)
                  }
                  className="h-11 w-full appearance-none rounded-xl border border-[var(--vertex-border)] bg-[#0b1020] px-3 pr-9 text-sm text-white outline-none focus:border-[var(--vertex-accent)]"
                >
                  {reportTypes.map((item) => (
                    <option key={item.key} value={item.key}>
                      {item.label}
                    </option>
                  ))}
                </select>

                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--vertex-muted)]" />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium text-[var(--vertex-muted)]">
                Report Period
              </label>

              <div className="relative">
                <select
                  value={range}
                  onChange={(event) =>
                    setRange(event.target.value as RangeKey)
                  }
                  className="h-11 w-full appearance-none rounded-xl border border-[var(--vertex-border)] bg-[#0b1020] px-3 pr-9 text-sm text-white outline-none focus:border-[var(--vertex-accent)]"
                >
                  {ranges.map((item) => (
                    <option key={item.key} value={item.key}>
                      {item.label}
                    </option>
                  ))}
                </select>

                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--vertex-muted)]" />
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-[var(--vertex-border)] bg-[var(--vertex-surface-2)] p-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[var(--vertex-accent)]" />
                  <span className="text-sm font-medium">
                    {selectedReport.label}
                  </span>
                </div>

                <p className="mt-1 text-xs text-[var(--vertex-muted)]">
                  {selectedReport.description}
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={() => void downloadClientReport("pdf")}
                  disabled={!selectedClientId || reportDownloading !== null}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[var(--vertex-accent)] px-4 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {reportDownloading === "pdf" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Download className="h-4 w-4" />
                  )}
                  Download PDF
                </button>

                <button
                  type="button"
                  onClick={() => void downloadClientReport("excel")}
                  disabled={!selectedClientId || reportDownloading !== null}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[var(--vertex-border)] bg-[var(--vertex-surface)] px-4 text-sm font-semibold transition hover:bg-[var(--vertex-surface)] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {reportDownloading === "excel" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <FileSpreadsheet className="h-4 w-4 text-emerald-400" />
                  )}
                  Download Excel
                </button>
              </div>
            </div>
          </div>

          {reportMessage && (
            <div className="mt-4 rounded-xl border border-[var(--vertex-border)] bg-[var(--vertex-bg)] px-4 py-3 text-sm text-[var(--vertex-muted)]">
              {reportMessage}
            </div>
          )}
        </section>

        {/* TOP STATS */}
        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={<CircleDollarSign className="h-5 w-5" />}
            label="Revenue Received"
            value={
              loading
                ? "—"
                : formatCurrency(data?.overview.rangeReceived ?? 0)
            }
            description={
              ranges.find((item) => item.key === range)?.label ?? ""
            }
          />

          <StatCard
            icon={<Users className="h-5 w-5" />}
            label="Total Leads"
            value={loading ? "—" : formatNumber(data?.overview.totalLeads ?? 0)}
            description={
              loading
                ? "Loading"
                : `${data?.overview.rangeLeads ?? 0} in selected period`
            }
          />

          <StatCard
            icon={<Globe2 className="h-5 w-5" />}
            label="Live Websites"
            value={
              loading ? "—" : formatNumber(data?.overview.liveWebsites ?? 0)
            }
            description={
              loading
                ? "Loading"
                : `${data?.overview.totalWebsites ?? 0} total websites`
            }
          />

          <StatCard
            icon={<TrendingUp className="h-5 w-5" />}
            label="Lead Close Rate"
            value={
              loading ? "—" : `${data?.overview.leadCloseRate ?? 0}%`
            }
            description={
              loading
                ? "Loading"
                : `${data?.overview.closedLeads ?? 0} closed leads`
            }
          />
        </div>

        {/* FINANCE + CRM */}
        <div className="mb-6 grid gap-4 xl:grid-cols-3">
          <MetricPanel
            title="Financial Overview"
            icon={<WalletCards className="h-4 w-4" />}
          >
            <MetricRow
              label="Total invoiced"
              value={formatCurrency(data?.overview.invoiceTotal ?? 0)}
            />
            <MetricRow
              label="Paid invoices"
              value={formatCurrency(data?.overview.paidInvoiceTotal ?? 0)}
            />
            <MetricRow
              label="Outstanding"
              value={formatCurrency(
                data?.overview.outstandingInvoiceTotal ?? 0
              )}
            />
            <MetricRow
              label="Total received"
              value={formatCurrency(data?.overview.totalReceived ?? 0)}
              strong
            />
          </MetricPanel>

          <MetricPanel
            title="Client & Project Health"
            icon={<Activity className="h-4 w-4" />}
          >
            <MetricRow
              label="Active clients"
              value={`${data?.overview.activeClients ?? 0} / ${
                data?.overview.totalClients ?? 0
              }`}
            />
            <MetricRow
              label="Active projects"
              value={`${data?.overview.activeProjects ?? 0} / ${
                data?.overview.totalProjects ?? 0
              }`}
            />
            <MetricRow
              label="Active websites"
              value={`${data?.overview.activeWebsites ?? 0} / ${
                data?.overview.totalWebsites ?? 0
              }`}
            />
            <MetricRow
              label="Maintenance websites"
              value={formatNumber(
                data?.overview.maintenanceWebsites ?? 0
              )}
              strong
            />
          </MetricPanel>

          <MetricPanel
            title="Lead Pipeline"
            icon={<Users className="h-4 w-4" />}
          >
            <MetricRow
              label="New"
              value={formatNumber(data?.overview.newLeads ?? 0)}
            />
            <MetricRow
              label="Contacted"
              value={formatNumber(data?.overview.contactedLeads ?? 0)}
            />
            <MetricRow
              label="Qualified"
              value={formatNumber(data?.overview.qualifiedLeads ?? 0)}
            />
            <MetricRow
              label="Closed"
              value={formatNumber(data?.overview.closedLeads ?? 0)}
              strong
            />
          </MetricPanel>
        </div>

        {/* CHARTS */}
        <div className="mb-6 grid gap-4 xl:grid-cols-2">
          <ChartPanel
            title="Revenue"
            description={`${ranges.find((item) => item.key === range)?.label ?? ""} — paid payments`}
            icon={<CircleDollarSign className="h-4 w-4" />}
            empty={!data?.series.revenue.length}
          >
            <div className="flex h-64 items-end gap-1 overflow-hidden">
              {data?.series.revenue.map((item, index) => {
                const height =
                  item.value === 0
                    ? 3
                    : Math.max(5, (item.value / maxRevenue) * 100);

                const showLabel =
                  data.series.revenue.length <= 14 ||
                  index === 0 ||
                  index === data.series.revenue.length - 1 ||
                  index % Math.ceil(data.series.revenue.length / 7) === 0;

                return (
                  <div
                    key={item.date}
                    className="group relative flex h-full min-w-0 flex-1 flex-col justify-end"
                  >
                    <div
                      className="mx-auto w-full max-w-8 rounded-t-md bg-[var(--vertex-accent)] opacity-80 transition group-hover:opacity-100"
                      style={{ height: `${height}%` }}
                      title={`${formatShortDate(item.date)}: ${formatCurrency(
                        item.value
                      )}`}
                    />

                    {showLabel && (
                      <span className="mt-2 truncate text-center text-[9px] text-[var(--vertex-muted)]">
                        {formatShortDate(item.date)}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-[var(--vertex-border)] pt-3 text-xs text-[var(--vertex-muted)]">
              <span>Latest day: {formatCurrency(latestRevenue)}</span>
              <span>
                {revenueDirection === "up"
                  ? "↑ Higher than previous day"
                  : revenueDirection === "down"
                    ? "↓ Lower than previous day"
                    : "— Same as previous day"}
              </span>
            </div>
          </ChartPanel>

          <ChartPanel
            title="Leads Generated"
            description={`${ranges.find((item) => item.key === range)?.label ?? ""} — new leads`}
            icon={<Users className="h-4 w-4" />}
            empty={!data?.series.leads.length}
          >
            <div className="flex h-64 items-end gap-1 overflow-hidden">
              {data?.series.leads.map((item, index) => {
                const height =
                  item.value === 0
                    ? 3
                    : Math.max(5, (item.value / maxLeads) * 100);

                const showLabel =
                  data.series.leads.length <= 14 ||
                  index === 0 ||
                  index === data.series.leads.length - 1 ||
                  index % Math.ceil(data.series.leads.length / 7) === 0;

                return (
                  <div
                    key={item.date}
                    className="group flex h-full min-w-0 flex-1 flex-col justify-end"
                  >
                    <div
                      className="mx-auto w-full max-w-8 rounded-t-md bg-[var(--vertex-accent-soft)] transition group-hover:bg-[var(--vertex-accent)]"
                      style={{ height: `${height}%` }}
                      title={`${formatShortDate(item.date)}: ${item.value} leads`}
                    />

                    {showLabel && (
                      <span className="mt-2 truncate text-center text-[9px] text-[var(--vertex-muted)]">
                        {formatShortDate(item.date)}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-[var(--vertex-border)] pt-3 text-xs text-[var(--vertex-muted)]">
              <span>{data?.overview.rangeLeads ?? 0} leads in period</span>
              <span>
                {data?.overview.rangeClosedLeads ?? 0} closed in period
              </span>
            </div>
          </ChartPanel>
        </div>

        {/* ACTIVITY + BREAKDOWNS */}
        <div className="mb-6 grid gap-4 xl:grid-cols-[1.4fr_1fr]">
          <ChartPanel
            title="Website Activity"
            description="Unique visitors tracked by day"
            icon={<Eye className="h-4 w-4" />}
            empty={!data?.series.visitors.length}
          >
            <div className="flex h-64 items-end gap-1 overflow-hidden">
              {data?.series.visitors.map((item, index) => {
                const height =
                  item.value === 0
                    ? 3
                    : Math.max(5, (item.value / maxVisitors) * 100);

                const showLabel =
                  data.series.visitors.length <= 14 ||
                  index === 0 ||
                  index === data.series.visitors.length - 1 ||
                  index % Math.ceil(data.series.visitors.length / 7) === 0;

                return (
                  <div
                    key={item.date}
                    className="group flex h-full min-w-0 flex-1 flex-col justify-end"
                  >
                    <div
                      className="mx-auto w-full max-w-8 rounded-t-md bg-[var(--vertex-accent-strong)] opacity-70 transition group-hover:opacity-100"
                      style={{ height: `${height}%` }}
                      title={`${formatShortDate(item.date)}: ${item.value} visitors`}
                    />

                    {showLabel && (
                      <span className="mt-2 truncate text-center text-[9px] text-[var(--vertex-muted)]">
                        {formatShortDate(item.date)}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-3 grid grid-cols-3 gap-3 border-t border-[var(--vertex-border)] pt-3">
              <MiniMetric
                label="Visitors"
                value={formatNumber(data?.overview.websiteVisitors ?? 0)}
              />
              <MiniMetric
                label="Sessions"
                value={formatNumber(data?.overview.sessions ?? 0)}
              />
              <MiniMetric
                label="Page Views"
                value={formatNumber(data?.overview.pageViews ?? 0)}
              />
            </div>
          </ChartPanel>

          <ChartPanel
            title="Top Lead Sources"
            description="Sources for leads in the selected period"
            icon={<TrendingUp className="h-4 w-4" />}
            empty={(data?.breakdowns.topLeadSources.length ?? 0) === 0}
          >
            <div className="space-y-4">
              {(data?.breakdowns.topLeadSources ?? []).map((item, index) => {
                const maximum =
                  data?.breakdowns.topLeadSources[0]?.count || 1;

                return (
                  <div key={item.source}>
                    <div className="mb-1.5 flex items-center justify-between gap-3 text-sm">
                      <span className="truncate">
                        {item.source || "Unknown"}
                      </span>
                      <span className="text-[var(--vertex-muted)]">
                        {item.count}
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-[var(--vertex-surface-2)]">
                      <div
                        className="h-full rounded-full bg-[var(--vertex-accent)]"
                        style={{
                          width: `${Math.max(
                            5,
                            (item.count / maximum) * 100
                          )}%`,
                          opacity: Math.max(0.55, 1 - index * 0.07),
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </ChartPanel>
        </div>

        {/* STATUS BREAKDOWNS */}
        <div className="grid gap-4 lg:grid-cols-3">
          <BreakdownCard
            title="Project Status"
            icon={<FileText className="h-4 w-4" />}
            values={data?.breakdowns.projectStatus ?? {}}
          />

          <BreakdownCard
            title="Website Status"
            icon={<Globe2 className="h-4 w-4" />}
            values={data?.breakdowns.websiteStatus ?? {}}
          />

          <BreakdownCard
            title="Invoice Status"
            icon={<WalletCards className="h-4 w-4" />}
            values={data?.breakdowns.invoiceStatus ?? {}}
          />
        </div>

        <div className="mt-4 flex items-center justify-end gap-2 text-xs text-[var(--vertex-muted)]">
          <Clock3 className="h-3.5 w-3.5" />
          {loading
            ? "Updating analytics..."
            : data?.generatedAt
              ? `Updated ${new Date(data.generatedAt).toLocaleString()}`
              : "Waiting for data"}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  description,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-[var(--vertex-border)] bg-[var(--vertex-surface)] p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-[var(--vertex-muted)]">
          {label}
        </span>
        <span className="text-[var(--vertex-accent)]">{icon}</span>
      </div>

      <div className="mt-2 text-2xl font-semibold tracking-tight">{value}</div>

      <div className="mt-1 text-xs text-[var(--vertex-muted)]">
        {description}
      </div>
    </div>
  );
}

function MetricPanel({
  title,
  icon,
  children,
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-[var(--vertex-border)] bg-[var(--vertex-surface)] p-5">
      <div className="mb-4 flex items-center gap-2">
        <span className="text-[var(--vertex-accent)]">{icon}</span>
        <h2 className="text-sm font-semibold">{title}</h2>
      </div>

      <div className="space-y-1">{children}</div>
    </section>
  );
}

function MetricRow({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between border-b border-[var(--vertex-border)] py-2.5 last:border-b-0">
      <span className="text-sm text-[var(--vertex-muted)]">{label}</span>
      <span className={strong ? "text-sm font-semibold" : "text-sm"}>
        {value}
      </span>
    </div>
  );
}

function ChartPanel({
  title,
  description,
  icon,
  children,
  empty,
}: {
  title: string;
  description: string;
  icon: ReactNode;
  children: ReactNode;
  empty: boolean;
}) {
  return (
    <section className="rounded-2xl border border-[var(--vertex-border)] bg-[var(--vertex-surface)] p-5">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[var(--vertex-accent)]">{icon}</span>
            <h2 className="text-sm font-semibold">{title}</h2>
          </div>
          <p className="mt-1 text-xs text-[var(--vertex-muted)]">
            {description}
          </p>
        </div>

        {empty && (
          <span className="rounded-full border border-[var(--vertex-border)] px-2 py-1 text-[10px] text-[var(--vertex-muted)]">
            No data
          </span>
        )}
      </div>

      {children}
    </section>
  );
}

function MiniMetric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-[var(--vertex-surface-2)] px-3 py-2.5">
      <div className="text-[10px] uppercase tracking-wider text-[var(--vertex-muted)]">
        {label}
      </div>
      <div className="mt-1 text-sm font-semibold">{value}</div>
    </div>
  );
}

function BreakdownCard({
  title,
  icon,
  values,
}: {
  title: string;
  icon: ReactNode;
  values: Record<string, number>;
}) {
  const entries = Object.entries(values).sort((a, b) => b[1] - a[1]);
  const total = entries.reduce((sum, [, value]) => sum + value, 0);

  return (
    <section className="rounded-2xl border border-[var(--vertex-border)] bg-[var(--vertex-surface)] p-5">
      <div className="mb-4 flex items-center gap-2">
        <span className="text-[var(--vertex-accent)]">{icon}</span>
        <h2 className="text-sm font-semibold">{title}</h2>
      </div>

      {entries.length === 0 ? (
        <div className="py-8 text-center text-sm text-[var(--vertex-muted)]">
          No data yet.
        </div>
      ) : (
        <div className="space-y-3">
          {entries.map(([key, value]) => {
            const percentage = total > 0 ? (value / total) * 100 : 0;

            return (
              <div key={key}>
                <div className="mb-1.5 flex items-center justify-between gap-3">
                  <span className="truncate text-sm">{titleCase(key)}</span>
                  <span className="shrink-0 text-xs text-[var(--vertex-muted)]">
                    {value} · {Math.round(percentage)}%
                  </span>
                </div>

                <div className="h-1.5 overflow-hidden rounded-full bg-[var(--vertex-surface-2)]">
                  <div
                    className="h-full rounded-full bg-[var(--vertex-accent)]"
                    style={{ width: `${Math.max(3, percentage)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
