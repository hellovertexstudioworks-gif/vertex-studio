// FILE: app/admin/websites/[id]/page.tsx
// PURPOSE: Vertex Studio Works — Website Detail
// Real database data only. No demo/fictional website data.
// NOTE: This page does not modify app/globals.css.

"use client";

import {
  Activity,
  ArrowLeft,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  Clock3,
  Code2,
  CreditCard,
  ExternalLink,
  FileText,
  Globe2,
  Loader2,
  Pencil,
  RefreshCw,
  Server,
  ShieldCheck,
  UserRound,
  Users,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type WebsiteStatus =
  | "Development"
  | "Review"
  | "Live"
  | "Maintenance"
  | "Offline";

type MaintenanceStatus =
  | "Not Enrolled"
  | "Active"
  | "Paused"
  | "Expired";

type Client = {
  id: string;
  name: string;
  company: string;
  email?: string;
  phone?: string;
};

type Project = {
  id: string;
  name: string;
  description?: string;
  status?: string;
  progress?: number;
  value?: number;
  startDate?: string | null;
  dueDate?: string | null;
  category?: string;
};

type Website = {
  id: string;
  clientId: string;
  client: Client | null;
  projectId: string | null;
  project: Project | null;
  name: string;
  websiteUrl: string;
  domain: string;
  hostingProvider: string;
  status: WebsiteStatus;
  maintenanceStatus: MaintenanceStatus;
  launchDate: string | null;
  notes: string;
  lastActivity: string;
  createdAt: string;
  updatedAt: string;
};

type AnalyticsEvent = {
  id?: string;
  event_type?: string | null;
  page_path?: string | null;
  session_id?: string | null;
  visitor_id?: string | null;
  source?: string | null;
  created_at?: string | null;
};

type Invoice = {
  id: string;
  invoiceNumber: string;
  status: string;
  issueDate: string;
  dueDate: string;
  total: number;
};

type Payment = {
  id: string;
  paymentReference: string;
  amount: number;
  paymentDate: string;
  paymentMethod: string;
  status: string;
};

type Tab =
  | "Overview"
  | "Analytics"
  | "Project"
  | "Billing"
  | "Files"
  | "Activity";

const tabs: Array<{ id: Tab; label: string; icon: typeof Globe2 }> = [
  { id: "Overview", label: "Overview", icon: Globe2 },
  { id: "Analytics", label: "Analytics", icon: BarChart3 },
  { id: "Project", label: "Project", icon: Code2 },
  { id: "Billing", label: "Billing", icon: CreditCard },
  { id: "Files", label: "Files", icon: FileText },
  { id: "Activity", label: "Activity", icon: Activity },
];

function formatDate(value?: string | null) {
  if (!value) return "—";
  const date = new Date(
    value.includes("T") ? value : `${value}T00:00:00`
  );
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatDateTime(value?: string | null) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(Number.isFinite(value) ? value : 0);
}

function statusClasses(status: WebsiteStatus) {
  switch (status) {
    case "Live":
      return "border-emerald-500/20 bg-emerald-500/10 text-emerald-300";
    case "Review":
      return "border-amber-500/20 bg-amber-500/10 text-amber-300";
    case "Maintenance":
      return "border-blue-500/20 bg-blue-500/10 text-blue-300";
    case "Offline":
      return "border-red-500/20 bg-red-500/10 text-red-300";
    default:
      return "border-violet-500/20 bg-violet-500/10 text-violet-300";
  }
}

function maintenanceClasses(status: MaintenanceStatus) {
  switch (status) {
    case "Active":
      return "border-emerald-500/20 bg-emerald-500/10 text-emerald-300";
    case "Paused":
      return "border-amber-500/20 bg-amber-500/10 text-amber-300";
    case "Expired":
      return "border-red-500/20 bg-red-500/10 text-red-300";
    default:
      return "border-slate-500/20 bg-slate-500/10 text-slate-300";
  }
}

function statusIcon(status: WebsiteStatus) {
  if (status === "Live") return <CheckCircle2 className="h-3.5 w-3.5" />;
  if (status === "Offline") return <XCircle className="h-3.5 w-3.5" />;
  if (status === "Maintenance") return <Server className="h-3.5 w-3.5" />;
  if (status === "Review") return <Clock3 className="h-3.5 w-3.5" />;
  return <CircleDot className="h-3.5 w-3.5" />;
}

function normalizeWebsite(raw: any): Website {
  const client = raw.client
    ? {
        id: String(raw.client.id ?? ""),
        name: String(raw.client.name ?? ""),
        company: String(raw.client.company ?? ""),
        email: raw.client.email ?? undefined,
        phone: raw.client.phone ?? undefined,
      }
    : null;

  const project = raw.project
    ? {
        id: String(raw.project.id ?? ""),
        name: String(raw.project.name ?? ""),
        description: raw.project.description ?? "",
        status: raw.project.status ?? "",
        progress: Number(raw.project.progress ?? 0),
        value: Number(raw.project.value ?? 0),
        startDate: raw.project.startDate ?? raw.project.start_date ?? null,
        dueDate: raw.project.dueDate ?? raw.project.due_date ?? null,
        category: raw.project.category ?? "",
      }
    : null;

  return {
    id: String(raw.id),
    clientId: String(raw.clientId ?? raw.client_id ?? client?.id ?? ""),
    client,
    projectId: raw.projectId ?? raw.project_id ?? project?.id ?? null,
    project,
    name: String(raw.name ?? "Untitled Website"),
    websiteUrl: String(raw.websiteUrl ?? raw.website_url ?? ""),
    domain: String(raw.domain ?? ""),
    hostingProvider: String(
      raw.hostingProvider ?? raw.hosting_provider ?? ""
    ),
    status: raw.status ?? "Development",
    maintenanceStatus:
      raw.maintenanceStatus ?? raw.maintenance_status ?? "Not Enrolled",
    launchDate: raw.launchDate ?? raw.launch_date ?? null,
    notes: String(raw.notes ?? ""),
    lastActivity:
      raw.lastActivity ?? raw.last_activity ?? raw.updatedAt ?? raw.updated_at ?? "",
    createdAt: raw.createdAt ?? raw.created_at ?? "",
    updatedAt: raw.updatedAt ?? raw.updated_at ?? "",
  };
}

function normalizeInvoice(raw: any): Invoice {
  return {
    id: String(raw.id),
    invoiceNumber: String(
      raw.invoiceNumber ?? raw.invoice_number ?? "Invoice"
    ),
    status: String(raw.status ?? "Draft"),
    issueDate: String(raw.issueDate ?? raw.issue_date ?? ""),
    dueDate: String(raw.dueDate ?? raw.due_date ?? ""),
    total: Number(raw.total ?? 0),
  };
}

function normalizePayment(raw: any): Payment {
  return {
    id: String(raw.id),
    paymentReference: String(
      raw.paymentReference ?? raw.payment_reference ?? "Payment"
    ),
    amount: Number(raw.amount ?? 0),
    paymentDate: String(raw.paymentDate ?? raw.payment_date ?? ""),
    paymentMethod: String(
      raw.paymentMethod ?? raw.payment_method ?? "Other"
    ),
    status: String(raw.status ?? "Paid"),
  };
}

export default function WebsiteDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const websiteId = String(params?.id ?? "");

  const [website, setWebsite] = useState<Website | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>("Overview");

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const loadWebsite = useCallback(async (refresh = false) => {
    if (!websiteId) return;

    if (refresh) setRefreshing(true);
    else setLoading(true);

    setError("");

    try {
      const [websitesResponse, clientsResponse, projectsResponse] =
        await Promise.all([
          fetch("/api/admin/websites", { cache: "no-store" }),
          fetch("/api/admin/clients", { cache: "no-store" }),
          fetch("/api/admin/projects", { cache: "no-store" }),
        ]);

      const websitesData = await websitesResponse.json().catch(() => ({}));
      const clientsData = await clientsResponse.json().catch(() => ({}));
      const projectsData = await projectsResponse.json().catch(() => ({}));

      if (!websitesResponse.ok) {
        throw new Error(
          websitesData.message || "Unable to load website."
        );
      }

      if (!clientsResponse.ok) {
        throw new Error(
          clientsData.message || "Unable to load client data."
        );
      }

      if (!projectsResponse.ok) {
        throw new Error(
          projectsData.message || "Unable to load project data."
        );
      }

      const rawWebsites = Array.isArray(websitesData.websites)
        ? websitesData.websites
        : [];

      const normalizedClients = Array.isArray(clientsData.clients)
        ? clientsData.clients.map((client: any) => ({
            id: String(client.id),
            name: String(client.name ?? ""),
            company: String(client.company ?? ""),
            email: client.email,
            phone: client.phone,
          }))
        : [];

      const normalizedProjects = Array.isArray(projectsData.projects)
        ? projectsData.projects.map((project: any) => ({
            id: String(project.id),
            name: String(project.name ?? ""),
            description: project.description ?? "",
            status: project.status ?? "",
            progress: Number(project.progress ?? 0),
            value: Number(project.value ?? 0),
            startDate: project.startDate ?? project.start_date ?? null,
            dueDate: project.dueDate ?? project.due_date ?? null,
            category: project.category ?? "",
            clientId: project.clientId ?? project.client_id ?? "",
          }))
        : [];

      const raw = rawWebsites.find(
        (item: any) => String(item.id) === websiteId
      );

      if (!raw) {
        throw new Error("Website not found.");
      }

      const normalized = normalizeWebsite(raw);

      if (!normalized.client && normalized.clientId) {
        normalized.client =
          normalizedClients.find((client: Client) => client.id === normalized.clientId) ??
          null;
      }

      if (!normalized.project && normalized.projectId) {
        normalized.project =
          normalizedProjects.find(
            (project: Project) => project.id === normalized.projectId
          ) ?? null;
      }

      setWebsite(normalized);

      const clientId = normalized.clientId;

      const [invoicesResponse, paymentsResponse] = await Promise.all([
        fetch("/api/admin/invoices", { cache: "no-store" }),
        fetch("/api/admin/payments", { cache: "no-store" }),
      ]);

      const invoicesData = await invoicesResponse.json().catch(() => ({}));
      const paymentsData = await paymentsResponse.json().catch(() => ({}));

      if (invoicesResponse.ok) {
        const allInvoices = Array.isArray(invoicesData.invoices)
          ? invoicesData.invoices.map(normalizeInvoice)
          : [];

        setInvoices(
          allInvoices.filter((invoice: any) => {
            const rawInvoice =
              invoicesData.invoices.find(
                (item: any) => String(item.id) === invoice.id
              ) ?? {};
            const rawClientId = String(
              rawInvoice.clientId ?? rawInvoice.client_id ?? ""
            );
            const rawProjectId = String(
              rawInvoice.projectId ?? rawInvoice.project_id ?? ""
            );

            return (
              rawClientId === clientId ||
              (!!normalized.projectId && rawProjectId === normalized.projectId)
            );
          })
        );
      } else {
        setInvoices([]);
      }

      if (paymentsResponse.ok) {
        const allPayments = Array.isArray(paymentsData.payments)
          ? paymentsData.payments.map(normalizePayment)
          : [];

        const websiteInvoiceIds = new Set(
          (Array.isArray(invoicesData.invoices)
            ? invoicesData.invoices
            : []
          )
            .filter((item: any) => {
              const rawClientId = String(
                item.clientId ?? item.client_id ?? ""
              );
              const rawProjectId = String(
                item.projectId ?? item.project_id ?? ""
              );
              return (
                rawClientId === clientId ||
                (!!normalized.projectId &&
                  rawProjectId === normalized.projectId)
              );
            })
            .map((item: any) => String(item.id))
        );

        setPayments(
          allPayments.filter((payment: any) => {
            const rawPayment =
              paymentsData.payments.find(
                (item: any) => String(item.id) === payment.id
              ) ?? {};
            const invoiceId = String(
              rawPayment.invoiceId ?? rawPayment.invoice_id ?? ""
            );
            return websiteInvoiceIds.has(invoiceId);
          })
        );
      } else {
        setPayments([]);
      }

      const supabase = createClient();

      const { data: eventRows, error: eventError } = await supabase
        .from("analytics_events")
        .select(
          "id,event_type,page_path,session_id,visitor_id,source,created_at"
        )
        .eq("website_id", websiteId)
        .order("created_at", { ascending: false })
        .limit(1000);

      if (eventError) {
        setEvents([]);
      } else {
        setEvents((eventRows ?? []) as AnalyticsEvent[]);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to load website."
      );
      setWebsite(null);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [websiteId]);

  useEffect(() => {
    void loadWebsite();
  }, [loadWebsite]);

  const analytics = useMemo(() => {
    const visitors = new Set(
      events
        .map((event) => event.visitor_id)
        .filter(Boolean)
    ).size;

    const sessions = new Set(
      events
        .map((event) => event.session_id)
        .filter(Boolean)
    ).size;

    const pageViewEvents = events.filter(
      (event) =>
        event.event_type === "page_view" ||
        event.event_type === "pageview" ||
        event.event_type === "page-view"
    );

    const pageViews = pageViewEvents.length;

    const pageCounts = new Map<string, number>();
    for (const event of pageViewEvents) {
      const page = event.page_path || "/";
      pageCounts.set(page, (pageCounts.get(page) ?? 0) + 1);
    }

    const topPages = [...pageCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);

    const sourceCounts = new Map<string, number>();
    for (const event of events) {
      const source = event.source?.trim() || "Direct";
      sourceCounts.set(source, (sourceCounts.get(source) ?? 0) + 1);
    }

    const eventCounts = new Map<string, number>();
    for (const event of events) {
      const type = event.event_type?.trim() || "unknown";
      eventCounts.set(type, (eventCounts.get(type) ?? 0) + 1);
    }

    return {
      visitors,
      sessions,
      pageViews,
      trackedEvents: events.length,
      averagePagesPerSession:
        sessions > 0 ? Number((pageViews / sessions).toFixed(2)) : 0,
      topPages,
      sourceCounts: [...sourceCounts.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8),
      eventCounts: [...eventCounts.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8),
      recent: events.slice(0, 12),
    };
  }, [events]);

  const billing = useMemo(() => {
    const totalInvoiced = invoices.reduce(
      (sum, invoice) => sum + invoice.total,
      0
    );

    const paid = payments
      .filter((payment) => payment.status === "Paid")
      .reduce((sum, payment) => sum + payment.amount, 0);

    return {
      totalInvoiced,
      paid,
      outstanding: Math.max(totalInvoiced - paid, 0),
    };
  }, [invoices, payments]);

  const projectProgress = Number(website?.project?.progress ?? 0);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[var(--vertex-bg)] text-[var(--vertex-text)]">
        <div className="flex items-center gap-3 text-sm text-[var(--vertex-muted)]">
          <Loader2 className="h-5 w-5 animate-spin text-[var(--vertex-accent)]" />
          Loading website...
        </div>
      </div>
    );
  }

  if (!website) {
    return (
      <div className="min-h-[70vh] bg-[var(--vertex-bg)] px-4 py-10 text-[var(--vertex-text)] sm:px-6">
        <div className="mx-auto max-w-3xl rounded-2xl border border-[var(--vertex-border)] bg-[var(--vertex-surface)] p-8 text-center">
          <XCircle className="mx-auto h-10 w-10 text-red-400" />
          <h1 className="mt-4 text-xl font-semibold">Website not found</h1>
          <p className="mt-2 text-sm text-[var(--vertex-muted)]">
            {error || "The requested website could not be loaded."}
          </p>
          <button
            type="button"
            onClick={() => router.push("/admin/websites")}
            className="mt-6 inline-flex h-10 items-center gap-2 rounded-xl bg-[var(--vertex-accent)] px-4 text-sm font-semibold text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Websites
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[var(--vertex-bg)] text-[var(--vertex-text)]">
      <div className="mx-auto max-w-[1600px] px-4 py-5 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-center gap-2 text-sm text-[var(--vertex-muted)]">
          <Link
            href="/admin/websites"
            className="inline-flex items-center gap-1.5 transition hover:text-[var(--vertex-text)]"
          >
            <ArrowLeft className="h-4 w-4" />
            Websites
          </Link>
          <ChevronRight className="h-4 w-4 opacity-50" />
          <span className="truncate">{website.name}</span>
        </div>

        <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-[var(--vertex-accent)]">
              <Globe2 className="h-4 w-4" />
              Website Detail
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                {website.name}
              </h1>

              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${statusClasses(
                  website.status
                )}`}
              >
                {statusIcon(website.status)}
                {website.status}
              </span>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[var(--vertex-muted)]">
              {website.domain ? (
                <span className="inline-flex items-center gap-1.5">
                  <Globe2 className="h-4 w-4" />
                  {website.domain}
                </span>
              ) : null}

              {website.hostingProvider ? (
                <span className="inline-flex items-center gap-1.5">
                  <Server className="h-4 w-4" />
                  {website.hostingProvider}
                </span>
              ) : null}

              {website.client ? (
                <span className="inline-flex items-center gap-1.5">
                  <UserRound className="h-4 w-4" />
                  {website.client.company || website.client.name}
                </span>
              ) : null}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => void loadWebsite(true)}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[var(--vertex-border)] bg-[var(--vertex-surface)] px-3.5 text-sm font-medium transition hover:bg-[var(--vertex-surface-2)]"
            >
              <RefreshCw
                className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
              />
              Refresh
            </button>

            {website.websiteUrl ? (
              <a
                href={website.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[var(--vertex-border)] bg-[var(--vertex-surface)] px-3.5 text-sm font-medium transition hover:bg-[var(--vertex-surface-2)]"
              >
                <ExternalLink className="h-4 w-4" />
                Open Website
              </a>
            ) : null}

            <Link
              href={`/admin/websites?edit=${encodeURIComponent(website.id)}`}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[var(--vertex-accent)] px-4 text-sm font-semibold text-white shadow-lg transition hover:opacity-90"
            >
              <Pencil className="h-4 w-4" />
              Edit Website
            </Link>
          </div>
        </div>

        {error ? (
          <div className="mb-5 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        ) : null}

        <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[
            {
              label: "Visitors",
              value: analytics.visitors,
              icon: Users,
            },
            {
              label: "Sessions",
              value: analytics.sessions,
              icon: Activity,
            },
            {
              label: "Page Views",
              value: analytics.pageViews,
              icon: BarChart3,
            },
            {
              label: "Project Progress",
              value: website.project ? `${projectProgress}%` : "—",
              icon: Code2,
            },
          ].map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-2xl border border-[var(--vertex-border)] bg-[var(--vertex-surface)] p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-[var(--vertex-muted)]">
                    {stat.label}
                  </span>
                  <Icon className="h-4 w-4 text-[var(--vertex-accent)]" />
                </div>
                <div className="mt-2 text-2xl font-semibold tracking-tight">
                  {stat.value}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mb-6 overflow-x-auto rounded-2xl border border-[var(--vertex-border)] bg-[var(--vertex-surface)]">
          <div className="flex min-w-max">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition ${
                    active
                      ? "border-[var(--vertex-accent)] text-[var(--vertex-text)]"
                      : "border-transparent text-[var(--vertex-muted)] hover:text-[var(--vertex-text)]"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {activeTab === "Overview" ? (
          <div className="grid gap-5 lg:grid-cols-[1.4fr_0.8fr]">
            <section className="rounded-2xl border border-[var(--vertex-border)] bg-[var(--vertex-surface)]">
              <div className="border-b border-[var(--vertex-border)] px-5 py-4">
                <h2 className="font-semibold">Website Information</h2>
                <p className="mt-1 text-sm text-[var(--vertex-muted)]">
                  Core website, hosting, launch, and maintenance details.
                </p>
              </div>

              <div className="grid gap-5 p-5 sm:grid-cols-2">
                <Info label="Website Name" value={website.name} />
                <Info label="Domain" value={website.domain || "Not set"} />
                <Info
                  label="Website URL"
                  value={website.websiteUrl || "Not set"}
                  href={website.websiteUrl || undefined}
                />
                <Info
                  label="Hosting Provider"
                  value={website.hostingProvider || "Not set"}
                />
                <Info label="Status" value={website.status} />
                <Info
                  label="Maintenance"
                  value={website.maintenanceStatus}
                  badgeClass={maintenanceClasses(website.maintenanceStatus)}
                />
                <Info
                  label="Launch Date"
                  value={formatDate(website.launchDate)}
                />
                <Info
                  label="Last Activity"
                  value={formatDateTime(website.lastActivity)}
                />
              </div>
            </section>

            <div className="space-y-5">
              <section className="rounded-2xl border border-[var(--vertex-border)] bg-[var(--vertex-surface)]">
                <div className="border-b border-[var(--vertex-border)] px-5 py-4">
                  <h2 className="font-semibold">Client</h2>
                </div>

                <div className="p-5">
                  {website.client ? (
                    <>
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--vertex-accent-soft)] text-sm font-semibold text-[var(--vertex-accent)]">
                          {website.client.name
                            .split(" ")
                            .map((part) => part[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                        </div>

                        <div className="min-w-0">
                          <div className="font-semibold">
                            {website.client.name}
                          </div>
                          <div className="truncate text-sm text-[var(--vertex-muted)]">
                            {website.client.company}
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 space-y-3 text-sm">
                        {website.client.email ? (
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-[var(--vertex-muted)]">
                              Email
                            </span>
                            <span className="truncate">
                              {website.client.email}
                            </span>
                          </div>
                        ) : null}

                        {website.client.phone ? (
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-[var(--vertex-muted)]">
                              Phone
                            </span>
                            <span>{website.client.phone}</span>
                          </div>
                        ) : null}
                      </div>
                    </>
                  ) : (
                    <EmptyState text="No client relationship found." />
                  )}
                </div>
              </section>

              <section className="rounded-2xl border border-[var(--vertex-border)] bg-[var(--vertex-surface)]">
                <div className="border-b border-[var(--vertex-border)] px-5 py-4">
                  <h2 className="font-semibold">Notes</h2>
                </div>

                <div className="p-5">
                  <p className="whitespace-pre-wrap text-sm leading-6 text-[var(--vertex-muted)]">
                    {website.notes || "No website notes have been added."}
                  </p>
                </div>
              </section>
            </div>
          </div>
        ) : null}

        {activeTab === "Analytics" ? (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
              <Metric label="Visitors" value={analytics.visitors} />
              <Metric label="Sessions" value={analytics.sessions} />
              <Metric label="Page Views" value={analytics.pageViews} />
              <Metric
                label="Pages / Session"
                value={analytics.averagePagesPerSession}
              />
              <Metric label="Tracked Events" value={analytics.trackedEvents} />
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              <AnalyticsList
                title="Top Pages"
                items={analytics.topPages.map(([page, count]) => [
                  page,
                  count,
                ])}
              />

              <AnalyticsList
                title="Traffic Sources"
                items={analytics.sourceCounts.map(([source, count]) => [
                  source,
                  count,
                ])}
              />
            </div>

            <section className="rounded-2xl border border-[var(--vertex-border)] bg-[var(--vertex-surface)]">
              <div className="border-b border-[var(--vertex-border)] px-5 py-4">
                <h2 className="font-semibold">Event Types</h2>
                <p className="mt-1 text-sm text-[var(--vertex-muted)]">
                  Events currently recorded for this website.
                </p>
              </div>

              <div className="grid gap-3 p-5 sm:grid-cols-2 lg:grid-cols-4">
                {analytics.eventCounts.length ? (
                  analytics.eventCounts.map(([type, count]) => (
                    <div
                      key={type}
                      className="rounded-xl border border-[var(--vertex-border)] bg-[var(--vertex-surface-2)] p-4"
                    >
                      <div className="truncate text-sm text-[var(--vertex-muted)]">
                        {type}
                      </div>
                      <div className="mt-1 text-xl font-semibold">{count}</div>
                    </div>
                  ))
                ) : (
                  <div className="sm:col-span-2 lg:col-span-4">
                    <EmptyState text="No analytics events recorded yet." />
                  </div>
                )}
              </div>
            </section>

            <section className="rounded-2xl border border-[var(--vertex-border)] bg-[var(--vertex-surface)]">
              <div className="border-b border-[var(--vertex-border)] px-5 py-4">
                <h2 className="font-semibold">Recent Analytics Activity</h2>
              </div>

              <div className="divide-y divide-[var(--vertex-border)]">
                {analytics.recent.length ? (
                  analytics.recent.map((event, index) => (
                    <div
                      key={event.id ?? `${event.created_at}-${index}`}
                      className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0">
                        <div className="font-medium">
                          {event.event_type || "Event"}
                        </div>
                        <div className="mt-1 truncate text-sm text-[var(--vertex-muted)]">
                          {event.page_path || "No page path"}
                        </div>
                      </div>

                      <div className="shrink-0 text-xs text-[var(--vertex-muted)]">
                        {formatDateTime(event.created_at)}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-5">
                    <EmptyState text="No analytics activity recorded yet." />
                  </div>
                )}
              </div>
            </section>
          </div>
        ) : null}

        {activeTab === "Project" ? (
          <div className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
            <section className="rounded-2xl border border-[var(--vertex-border)] bg-[var(--vertex-surface)]">
              <div className="border-b border-[var(--vertex-border)] px-5 py-4">
                <h2 className="font-semibold">Linked Project</h2>
                <p className="mt-1 text-sm text-[var(--vertex-muted)]">
                  The project connected to this website record.
                </p>
              </div>

              <div className="p-5">
                {website.project ? (
                  <>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="text-xl font-semibold">
                          {website.project.name}
                        </div>
                        <div className="mt-1 text-sm text-[var(--vertex-muted)]">
                          {website.project.category || "Project"}
                        </div>
                      </div>

                      <span className="rounded-full border border-[var(--vertex-border)] bg-[var(--vertex-surface-2)] px-2.5 py-1 text-xs">
                        {website.project.status || "No status"}
                      </span>
                    </div>

                    <div className="mt-6">
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-[var(--vertex-muted)]">
                          Progress
                        </span>
                        <span className="font-medium">
                          {projectProgress}%
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-[var(--vertex-surface-2)]">
                        <div
                          className="h-full rounded-full bg-[var(--vertex-accent)] transition-all"
                          style={{
                            width: `${Math.min(
                              100,
                              Math.max(0, projectProgress)
                            )}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div className="mt-6 grid gap-4 sm:grid-cols-3">
                      <Info
                        label="Project Value"
                        value={money(Number(website.project.value ?? 0))}
                      />
                      <Info
                        label="Start Date"
                        value={formatDate(website.project.startDate)}
                      />
                      <Info
                        label="Due Date"
                        value={formatDate(website.project.dueDate)}
                      />
                    </div>

                    {website.project.description ? (
                      <div className="mt-6 rounded-xl border border-[var(--vertex-border)] bg-[var(--vertex-surface-2)] p-4">
                        <div className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--vertex-muted)]">
                          Description
                        </div>
                        <p className="whitespace-pre-wrap text-sm leading-6 text-[var(--vertex-muted)]">
                          {website.project.description}
                        </p>
                      </div>
                    ) : null}

                    <Link
                      href={`/admin/projects/${website.project.id}`}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[var(--vertex-accent)] hover:underline"
                    >
                      Open Project
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </>
                ) : (
                  <EmptyState text="No project is linked to this website." />
                )}
              </div>
            </section>

            <section className="rounded-2xl border border-[var(--vertex-border)] bg-[var(--vertex-surface)]">
              <div className="border-b border-[var(--vertex-border)] px-5 py-4">
                <h2 className="font-semibold">Website Lifecycle</h2>
              </div>

              <div className="space-y-5 p-5">
                <TimelineItem
                  icon={CheckCircle2}
                  title="Website Record Created"
                  value={formatDateTime(website.createdAt)}
                />
                <TimelineItem
                  icon={Pencil}
                  title="Last Updated"
                  value={formatDateTime(website.updatedAt)}
                />
                <TimelineItem
                  icon={CalendarDays}
                  title="Launch Date"
                  value={formatDate(website.launchDate)}
                />
                <TimelineItem
                  icon={ShieldCheck}
                  title="Maintenance"
                  value={website.maintenanceStatus}
                />
              </div>
            </section>
          </div>
        ) : null}

        {activeTab === "Billing" ? (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
              <Metric label="Total Invoiced" value={money(billing.totalInvoiced)} />
              <Metric label="Paid" value={money(billing.paid)} />
              <Metric label="Outstanding" value={money(billing.outstanding)} />
            </div>

            <section className="rounded-2xl border border-[var(--vertex-border)] bg-[var(--vertex-surface)]">
              <div className="border-b border-[var(--vertex-border)] px-5 py-4">
                <h2 className="font-semibold">Invoices</h2>
                <p className="mt-1 text-sm text-[var(--vertex-muted)]">
                  Client billing associated with the website's client or linked project.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] text-left text-sm">
                  <thead className="border-b border-[var(--vertex-border)] text-xs uppercase tracking-wide text-[var(--vertex-muted)]">
                    <tr>
                      <th className="px-5 py-3">Invoice</th>
                      <th className="px-5 py-3">Status</th>
                      <th className="px-5 py-3">Issue Date</th>
                      <th className="px-5 py-3">Due Date</th>
                      <th className="px-5 py-3 text-right">Total</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-[var(--vertex-border)]">
                    {invoices.length ? (
                      invoices.map((invoice) => (
                        <tr key={invoice.id}>
                          <td className="px-5 py-4 font-medium">
                            {invoice.invoiceNumber}
                          </td>
                          <td className="px-5 py-4">
                            <span className="rounded-full border border-[var(--vertex-border)] bg-[var(--vertex-surface-2)] px-2.5 py-1 text-xs">
                              {invoice.status}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-[var(--vertex-muted)]">
                            {formatDate(invoice.issueDate)}
                          </td>
                          <td className="px-5 py-4 text-[var(--vertex-muted)]">
                            {formatDate(invoice.dueDate)}
                          </td>
                          <td className="px-5 py-4 text-right font-semibold">
                            {money(invoice.total)}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-5 py-8">
                          <EmptyState text="No invoices found for this website's client or project." />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="rounded-2xl border border-[var(--vertex-border)] bg-[var(--vertex-surface)]">
              <div className="border-b border-[var(--vertex-border)] px-5 py-4">
                <h2 className="font-semibold">Payment History</h2>
              </div>

              <div className="divide-y divide-[var(--vertex-border)]">
                {payments.length ? (
                  payments.map((payment) => (
                    <div
                      key={payment.id}
                      className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <div className="font-medium">
                          {payment.paymentReference}
                        </div>
                        <div className="mt-1 text-sm text-[var(--vertex-muted)]">
                          {payment.paymentMethod} · {formatDate(payment.paymentDate)}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-semibold">
                          {money(payment.amount)}
                        </div>
                        <div className="mt-1 text-xs text-[var(--vertex-muted)]">
                          {payment.status}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-5">
                    <EmptyState text="No payments found for this website's billing records." />
                  </div>
                )}
              </div>
            </section>
          </div>
        ) : null}

        {activeTab === "Files" ? (
          <section className="rounded-2xl border border-[var(--vertex-border)] bg-[var(--vertex-surface)]">
            <div className="border-b border-[var(--vertex-border)] px-5 py-4">
              <h2 className="font-semibold">Website Files</h2>
              <p className="mt-1 text-sm text-[var(--vertex-muted)]">
                Files are not connected to this website record yet.
              </p>
            </div>

            <div className="p-8 text-center">
              <FileText className="mx-auto h-10 w-10 text-[var(--vertex-accent)]" />
              <h3 className="mt-4 font-semibold">Storage integration pending</h3>
              <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-[var(--vertex-muted)]">
                This tab is intentionally not using fake file data. When
                Supabase Storage is connected to Websites, this area can show
                website assets, documents, exports, and client files.
              </p>
            </div>
          </section>
        ) : null}

        {activeTab === "Activity" ? (
          <section className="rounded-2xl border border-[var(--vertex-border)] bg-[var(--vertex-surface)]">
            <div className="border-b border-[var(--vertex-border)] px-5 py-4">
              <h2 className="font-semibold">Website Activity</h2>
              <p className="mt-1 text-sm text-[var(--vertex-muted)]">
                Database timestamps and real analytics events associated with
                this website.
              </p>
            </div>

            <div className="divide-y divide-[var(--vertex-border)]">
              <TimelineItem
                icon={CheckCircle2}
                title="Website record created"
                value={formatDateTime(website.createdAt)}
              />
              <TimelineItem
                icon={Pencil}
                title="Website record last updated"
                value={formatDateTime(website.updatedAt)}
              />
              <TimelineItem
                icon={Activity}
                title="Last website activity"
                value={formatDateTime(website.lastActivity)}
              />

              {analytics.recent.map((event, index) => (
                <TimelineItem
                  key={event.id ?? `${event.created_at}-${index}`}
                  icon={BarChart3}
                  title={`Analytics: ${event.event_type || "event"}`}
                  value={`${event.page_path || "No page"} · ${formatDateTime(
                    event.created_at
                  )}`}
                />
              ))}
            </div>
          </section>
        ) : null}

        <div className="mt-6 flex items-center gap-2 text-xs text-[var(--vertex-muted)]">
          <ShieldCheck className="h-3.5 w-3.5" />
          Website detail data is loaded from the Vertex Studio Works database.
        </div>
      </div>
    </div>
  );
}

function Info({
  label,
  value,
  href,
  badgeClass,
}: {
  label: string;
  value: string;
  href?: string;
  badgeClass?: string;
}) {
  return (
    <div className="min-w-0">
      <div className="mb-1 text-xs font-medium uppercase tracking-[0.12em] text-[var(--vertex-muted)]">
        {label}
      </div>

      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="truncate text-sm font-medium text-[var(--vertex-accent)] hover:underline"
        >
          {value}
        </a>
      ) : badgeClass ? (
        <span
          className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${badgeClass}`}
        >
          {value}
        </span>
      ) : (
        <div className="break-words text-sm font-medium">{value}</div>
      )}
    </div>
  );
}

function Metric({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-2xl border border-[var(--vertex-border)] bg-[var(--vertex-surface)] p-4">
      <div className="text-xs font-medium text-[var(--vertex-muted)]">
        {label}
      </div>
      <div className="mt-2 text-2xl font-semibold tracking-tight">{value}</div>
    </div>
  );
}

function AnalyticsList({
  title,
  items,
}: {
  title: string;
  items: Array<[string, number]>;
}) {
  return (
    <section className="rounded-2xl border border-[var(--vertex-border)] bg-[var(--vertex-surface)]">
      <div className="border-b border-[var(--vertex-border)] px-5 py-4">
        <h2 className="font-semibold">{title}</h2>
      </div>

      <div className="divide-y divide-[var(--vertex-border)]">
        {items.length ? (
          items.map(([label, count]) => (
            <div
              key={label}
              className="flex items-center justify-between gap-4 px-5 py-4"
            >
              <span className="truncate text-sm">{label}</span>
              <span className="shrink-0 text-sm font-semibold">{count}</span>
            </div>
          ))
        ) : (
          <div className="p-5">
            <EmptyState text="No data recorded yet." />
          </div>
        )}
      </div>
    </section>
  );
}

function TimelineItem({
  icon: Icon,
  title,
  value,
}: {
  icon: typeof Activity;
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 px-5 py-4">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--vertex-accent-soft)] text-[var(--vertex-accent)]">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <div className="text-sm font-medium">{title}</div>
        <div className="mt-1 text-xs text-[var(--vertex-muted)]">{value}</div>
      </div>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="text-sm text-[var(--vertex-muted)]">{text}</div>
  );
}
