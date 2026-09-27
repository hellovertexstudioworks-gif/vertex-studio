// FILE: app/admin/websites/page.tsx
// PURPOSE: Vertex Studio Works — Websites
// NOTE: Complete Websites CRUD page with client/project relationship fallback
// and navigation to the full Website Detail page.
// DO NOT modify app/globals.css.

"use client";

import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  CircleDot,
  Clock3,
  ExternalLink,
  Globe2,
  Loader2,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Server,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

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
};

type Project = {
  id: string;
  name: string;
  clientId?: string;
  client?: Client | null;
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

type FormState = {
  clientId: string;
  projectId: string;
  name: string;
  websiteUrl: string;
  domain: string;
  hostingProvider: string;
  status: WebsiteStatus;
  maintenanceStatus: MaintenanceStatus;
  launchDate: string;
  notes: string;
};

const emptyForm: FormState = {
  clientId: "",
  projectId: "",
  name: "",
  websiteUrl: "",
  domain: "",
  hostingProvider: "",
  status: "Development",
  maintenanceStatus: "Not Enrolled",
  launchDate: "",
  notes: "",
};

const statusOptions: WebsiteStatus[] = [
  "Development",
  "Review",
  "Live",
  "Maintenance",
  "Offline",
];

const maintenanceOptions: MaintenanceStatus[] = [
  "Not Enrolled",
  "Active",
  "Paused",
  "Expired",
];

const hostingOptions = [
  "Vercel",
  "Netlify",
  "Hostinger",
  "GoDaddy",
  "Cloudflare",
  "SiteGround",
  "Other",
];

function formatDate(value?: string | null) {
  if (!value) return "—";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatActivity(value?: string | null) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
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
  if (status === "Offline") return <AlertTriangle className="h-3.5 w-3.5" />;
  if (status === "Maintenance") return <Server className="h-3.5 w-3.5" />;
  if (status === "Review") return <Clock3 className="h-3.5 w-3.5" />;
  return <CircleDot className="h-3.5 w-3.5" />;
}

function normalizeClient(value: unknown): Client | null {
  if (!value || typeof value !== "object") return null;
  const row = value as Record<string, unknown>;

  if (typeof row.id !== "string") return null;

  return {
    id: row.id,
    name: typeof row.name === "string" ? row.name : "",
    company: typeof row.company === "string" ? row.company : "",
    email: typeof row.email === "string" ? row.email : "",
  };
}

function normalizeProject(value: unknown): Project | null {
  if (!value || typeof value !== "object") return null;
  const row = value as Record<string, unknown>;

  if (typeof row.id !== "string") return null;

  return {
    id: row.id,
    name: typeof row.name === "string" ? row.name : "",
    clientId:
      typeof row.clientId === "string"
        ? row.clientId
        : typeof row.client_id === "string"
          ? row.client_id
          : undefined,
    client: normalizeClient(row.client),
  };
}

function normalizeWebsite(
  raw: Record<string, unknown>,
  clients: Client[],
  projects: Project[],
): Website {
  const clientId =
    typeof raw.clientId === "string"
      ? raw.clientId
      : typeof raw.client_id === "string"
        ? raw.client_id
        : "";

  const projectId =
    typeof raw.projectId === "string"
      ? raw.projectId
      : typeof raw.project_id === "string"
        ? raw.project_id
        : null;

  const directClient =
    normalizeClient(raw.client) ||
    normalizeClient(raw.clients);

  const directProject =
    normalizeProject(raw.project) ||
    normalizeProject(raw.projects);

  const fallbackClient =
    directClient || clients.find((client) => client.id === clientId) || null;

  const fallbackProject =
    directProject ||
    projects.find((project) => project.id === projectId) ||
    null;

  return {
    id: String(raw.id ?? ""),
    clientId,
    client: fallbackClient,
    projectId,
    project: fallbackProject,
    name: String(raw.name ?? ""),
    websiteUrl: String(raw.websiteUrl ?? raw.website_url ?? ""),
    domain: String(raw.domain ?? ""),
    hostingProvider: String(
      raw.hostingProvider ?? raw.hosting_provider ?? "",
    ),
    status: (raw.status ?? "Development") as WebsiteStatus,
    maintenanceStatus: (raw.maintenanceStatus ??
      raw.maintenance_status ??
      "Not Enrolled") as MaintenanceStatus,
    launchDate:
      typeof raw.launchDate === "string"
        ? raw.launchDate
        : typeof raw.launch_date === "string"
          ? raw.launch_date
          : null,
    notes: String(raw.notes ?? ""),
    lastActivity: String(
      raw.lastActivity ?? raw.last_activity ?? raw.updatedAt ?? raw.updated_at ?? "",
    ),
    createdAt: String(raw.createdAt ?? raw.created_at ?? ""),
    updatedAt: String(raw.updatedAt ?? raw.updated_at ?? ""),
  };
}

export default function WebsitesPage() {
  const router = useRouter();

  const [websites, setWebsites] = useState<Website[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "All" | WebsiteStatus
  >("All");
  const [maintenanceFilter, setMaintenanceFilter] = useState<
    "All" | MaintenanceStatus
  >("All");

  const [showModal, setShowModal] = useState(false);
  const [editingWebsite, setEditingWebsite] = useState<Website | null>(null);
  const [deletingWebsite, setDeletingWebsite] = useState<Website | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const [form, setForm] = useState<FormState>(emptyForm);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  const loadData = async () => {
    setLoading(true);
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
          websitesData.message ||
            websitesData.error ||
            "Unable to load websites.",
        );
      }

      if (!clientsResponse.ok) {
        throw new Error(
          clientsData.message ||
            clientsData.error ||
            "Unable to load clients.",
        );
      }

      if (!projectsResponse.ok) {
        throw new Error(
          projectsData.message ||
            projectsData.error ||
            "Unable to load projects.",
        );
      }

      const nextClients: Client[] = (clientsData.clients ?? []).map(
        (client: Record<string, unknown>) => ({
          id: String(client.id ?? ""),
          name: String(client.name ?? ""),
          company: String(client.company ?? ""),
          email: String(client.email ?? ""),
        }),
      );

      const nextProjects: Project[] = (projectsData.projects ?? []).map(
        (project: Record<string, unknown>) => ({
          id: String(project.id ?? ""),
          name: String(project.name ?? ""),
          clientId:
            typeof project.clientId === "string"
              ? project.clientId
              : typeof project.client_id === "string"
                ? project.client_id
                : undefined,
          client: normalizeClient(project.client),
        }),
      );

      const nextWebsites: Website[] = (
        websitesData.websites ?? []
      ).map((website: Record<string, unknown>) =>
        normalizeWebsite(website, nextClients, nextProjects),
      );

      setClients(nextClients);
      setProjects(nextProjects);
      setWebsites(nextWebsites);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to load website data.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 3500);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const filteredProjects = useMemo(() => {
    if (!form.clientId) return projects;

    return projects.filter((project) => {
      if (project.clientId) return project.clientId === form.clientId;
      if (project.client?.id) return project.client.id === form.clientId;
      return true;
    });
  }, [form.clientId, projects]);

  const filteredWebsites = useMemo(() => {
    const query = search.trim().toLowerCase();

    return websites.filter((website) => {
      const matchesSearch =
        !query ||
        website.name.toLowerCase().includes(query) ||
        website.domain.toLowerCase().includes(query) ||
        website.websiteUrl.toLowerCase().includes(query) ||
        website.client?.name?.toLowerCase().includes(query) ||
        website.client?.company?.toLowerCase().includes(query) ||
        website.project?.name?.toLowerCase().includes(query) ||
        website.hostingProvider.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || website.status === statusFilter;

      const matchesMaintenance =
        maintenanceFilter === "All" ||
        website.maintenanceStatus === maintenanceFilter;

      return matchesSearch && matchesStatus && matchesMaintenance;
    });
  }, [websites, search, statusFilter, maintenanceFilter]);

  const stats = useMemo(
    () => ({
      total: websites.length,
      live: websites.filter((website) => website.status === "Live").length,
      development: websites.filter(
        (website) => website.status === "Development",
      ).length,
      maintenance: websites.filter(
        (website) => website.maintenanceStatus === "Active",
      ).length,
    }),
    [websites],
  );

  const openCreate = () => {
    setEditingWebsite(null);
    setForm(emptyForm);
    setError("");
    setShowModal(true);
  };

  const openEdit = (website: Website) => {
    setEditingWebsite(website);
    setForm({
      clientId: website.clientId,
      projectId: website.projectId ?? "",
      name: website.name,
      websiteUrl: website.websiteUrl,
      domain: website.domain,
      hostingProvider: website.hostingProvider,
      status: website.status,
      maintenanceStatus: website.maintenanceStatus,
      launchDate: website.launchDate ?? "",
      notes: website.notes,
    });
    setError("");
    setShowModal(true);
    setOpenMenu(null);
  };

  const openWebsiteDetail = (website: Website) => {
    setOpenMenu(null);
    router.push(`/admin/websites/${website.id}`);
  };

  const closeModal = () => {
    if (saving) return;
    setShowModal(false);
    setEditingWebsite(null);
    setForm(emptyForm);
    setError("");
  };

  const handleClientChange = (clientId: string) => {
    setForm((current) => ({
      ...current,
      clientId,
      projectId: "",
    }));
  };

  const handleSave = async () => {
    if (!form.clientId) {
      setError("Please select a client.");
      return;
    }

    if (!form.name.trim()) {
      setError("Website name is required.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const payload = {
        ...(editingWebsite ? { id: editingWebsite.id } : {}),
        clientId: form.clientId,
        projectId: form.projectId || null,
        name: form.name.trim(),
        websiteUrl: form.websiteUrl.trim(),
        domain: form.domain.trim(),
        hostingProvider: form.hostingProvider,
        status: form.status,
        maintenanceStatus: form.maintenanceStatus,
        launchDate: form.launchDate || null,
        notes: form.notes.trim(),
      };

      const response = await fetch("/api/admin/websites", {
        method: editingWebsite ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message || data.error || "Unable to save website.",
        );
      }

      setToast(
        editingWebsite
          ? "Website updated successfully."
          : "Website created successfully.",
      );

      closeModal();
      await loadData();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to save website.",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingWebsite) return;

    setSaving(true);
    setError("");

    try {
      const response = await fetch(
        `/api/admin/websites?id=${encodeURIComponent(deletingWebsite.id)}`,
        {
          method: "DELETE",
        },
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message || data.error || "Unable to delete website.",
        );
      }

      setDeletingWebsite(null);
      setToast("Website deleted successfully.");
      await loadData();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to delete website.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="min-h-full bg-[var(--vertex-bg)] text-[var(--vertex-text)]"
      onClick={() => {
        if (openMenu) setOpenMenu(null);
      }}
    >
      <div className="mx-auto max-w-[1600px] px-4 py-5 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-[var(--vertex-accent)]">
              <Globe2 className="h-4 w-4" />
              Business OS
            </div>

            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Websites
            </h1>

            <p className="mt-1 max-w-2xl text-sm text-[var(--vertex-muted)]">
              Manage client websites, domains, hosting, launch status, and
              ongoing maintenance.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreate}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[var(--vertex-accent)] px-4 text-sm font-semibold text-white shadow-lg transition hover:opacity-90"
          >
            <Plus className="h-4 w-4" />
            Add Website
          </button>
        </div>

        {/* STATS */}
        <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[
            { label: "Total Websites", value: stats.total, icon: Globe2 },
            { label: "Live", value: stats.live, icon: CheckCircle2 },
            {
              label: "In Development",
              value: stats.development,
              icon: CircleDot,
            },
            {
              label: "Maintenance",
              value: stats.maintenance,
              icon: Server,
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
                <div className="mt-2 text-2xl font-semibold">
                  {stat.value}
                </div>
              </div>
            );
          })}
        </div>

        {/* FILTERS */}
        <div className="mb-4 rounded-2xl border border-[var(--vertex-border)] bg-[var(--vertex-surface)] p-3">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
            <div className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--vertex-muted)]" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search websites, clients, domains..."
                className="h-10 w-full rounded-xl border border-[var(--vertex-border)] bg-[var(--vertex-surface-2)] pl-10 pr-4 text-sm outline-none transition placeholder:text-[var(--vertex-muted)] focus:border-[var(--vertex-accent)]"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 sm:flex">
              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(
                    event.target.value as "All" | WebsiteStatus,
                  )
                }
                className={selectClass}
              >
                <option value="All">All Statuses</option>
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>

              <select
                value={maintenanceFilter}
                onChange={(event) =>
                  setMaintenanceFilter(
                    event.target.value as "All" | MaintenanceStatus,
                  )
                }
                className={selectClass}
              >
                <option value="All">All Maintenance</option>
                {maintenanceOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {error && !showModal && (
          <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {/* DESKTOP TABLE */}
        <div className="hidden overflow-visible rounded-2xl border border-[var(--vertex-border)] bg-[var(--vertex-surface)] md:block">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left">
              <thead className="border-b border-[var(--vertex-border)] bg-[var(--vertex-surface-2)]">
                <tr className="text-xs uppercase tracking-wider text-[var(--vertex-muted)]">
                  <th className="px-5 py-4 font-medium">Website</th>
                  <th className="px-4 py-4 font-medium">Client</th>
                  <th className="px-4 py-4 font-medium">Hosting</th>
                  <th className="px-4 py-4 font-medium">Status</th>
                  <th className="px-4 py-4 font-medium">Maintenance</th>
                  <th className="px-4 py-4 font-medium">Launch</th>
                  <th className="px-4 py-4 font-medium">Activity</th>
                  <th className="px-4 py-4 font-medium text-right">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[var(--vertex-border)]">
                {loading ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-5 py-12 text-center text-sm text-[var(--vertex-muted)]"
                    >
                      <Loader2 className="mx-auto mb-2 h-5 w-5 animate-spin" />
                      Loading websites...
                    </td>
                  </tr>
                ) : filteredWebsites.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-5 py-12 text-center text-sm text-[var(--vertex-muted)]"
                    >
                      No websites found.
                    </td>
                  </tr>
                ) : (
                  filteredWebsites.map((website) => (
                    <tr
                      key={website.id}
                      className="transition hover:bg-[var(--vertex-surface-2)]"
                    >
                      <td className="px-5 py-4">
                        <button
                          type="button"
                          onClick={() => openWebsiteDetail(website)}
                          className="text-left"
                        >
                          <div className="font-medium">{website.name}</div>
                          <div className="mt-1 max-w-[260px] truncate text-xs text-[var(--vertex-muted)]">
                            {website.domain ||
                              website.websiteUrl ||
                              "No domain added"}
                          </div>
                        </button>
                      </td>

                      <td className="px-4 py-4">
                        <div className="text-sm">
                          {website.client?.name ||
                            website.client?.company ||
                            "—"}
                        </div>
                        <div className="mt-1 text-xs text-[var(--vertex-muted)]">
                          {website.client?.company &&
                          website.client?.name &&
                          website.client.company !== website.client.name
                            ? website.client.company
                            : website.project?.name || "No project"}
                        </div>
                      </td>

                      <td className="px-4 py-4 text-sm">
                        {website.hostingProvider || "—"}
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${statusClasses(
                            website.status,
                          )}`}
                        >
                          {statusIcon(website.status)}
                          {website.status}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`rounded-full border px-2.5 py-1 text-xs font-medium ${maintenanceClasses(
                            website.maintenanceStatus,
                          )}`}
                        >
                          {website.maintenanceStatus}
                        </span>
                      </td>

                      <td className="px-4 py-4 text-sm text-[var(--vertex-muted)]">
                        {formatDate(website.launchDate)}
                      </td>

                      <td className="px-4 py-4 text-sm text-[var(--vertex-muted)]">
                        {formatActivity(website.lastActivity)}
                      </td>

                      <td className="relative px-4 py-4 text-right">
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            setOpenMenu(
                              openMenu === website.id ? null : website.id,
                            );
                          }}
                          className="rounded-lg p-2 text-[var(--vertex-muted)] transition hover:bg-[var(--vertex-surface-2)] hover:text-white"
                        >
                          <MoreHorizontal className="h-5 w-5" />
                        </button>

                        {openMenu === website.id && (
                          <div
                            onClick={(event) => event.stopPropagation()}
                            className="absolute right-4 top-12 z-30 w-40 rounded-xl border border-[var(--vertex-border)] bg-[#0b1020] p-1 text-left shadow-2xl"
                          >
                            <button
                              type="button"
                              onClick={() => openWebsiteDetail(website)}
                              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-white/5"
                            >
                              <Globe2 className="h-4 w-4" />
                              View Website
                            </button>

                            <button
                              type="button"
                              onClick={() => openEdit(website)}
                              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-white/5"
                            >
                              <Pencil className="h-4 w-4" />
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setDeletingWebsite(website);
                                setOpenMenu(null);
                              }}
                              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-300 hover:bg-red-500/10"
                            >
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* MOBILE CARDS */}
        <div className="space-y-3 md:hidden">
          {loading ? (
            <div className="rounded-2xl border border-[var(--vertex-border)] bg-[var(--vertex-surface)] p-8 text-center text-sm text-[var(--vertex-muted)]">
              <Loader2 className="mx-auto mb-2 h-5 w-5 animate-spin" />
              Loading websites...
            </div>
          ) : filteredWebsites.length === 0 ? (
            <div className="rounded-2xl border border-[var(--vertex-border)] bg-[var(--vertex-surface)] p-8 text-center text-sm text-[var(--vertex-muted)]">
              No websites found.
            </div>
          ) : (
            filteredWebsites.map((website) => (
              <div
                key={website.id}
                className="rounded-2xl border border-[var(--vertex-border)] bg-[var(--vertex-surface)] p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => openWebsiteDetail(website)}
                    className="min-w-0 text-left"
                  >
                    <div className="truncate font-medium">
                      {website.name}
                    </div>
                    <div className="mt-1 truncate text-xs text-[var(--vertex-muted)]">
                      {website.domain ||
                        website.websiteUrl ||
                        "No domain added"}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => openWebsiteDetail(website)}
                    className="rounded-lg p-2 text-[var(--vertex-muted)] hover:bg-[var(--vertex-surface-2)] hover:text-white"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <div className="text-xs text-[var(--vertex-muted)]">
                      Client
                    </div>
                    <div className="mt-1 truncate">
                      {website.client?.name ||
                        website.client?.company ||
                        "—"}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-[var(--vertex-muted)]">
                      Hosting
                    </div>
                    <div className="mt-1">
                      {website.hostingProvider || "—"}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-[var(--vertex-muted)]">
                      Status
                    </div>
                    <div className="mt-1">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-1 text-xs ${statusClasses(
                          website.status,
                        )}`}
                      >
                        {statusIcon(website.status)}
                        {website.status}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-[var(--vertex-muted)]">
                      Maintenance
                    </div>
                    <div className="mt-1">
                      <span
                        className={`inline-flex rounded-full border px-2 py-1 text-xs ${maintenanceClasses(
                          website.maintenanceStatus,
                        )}`}
                      >
                        {website.maintenanceStatus}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex gap-2 border-t border-[var(--vertex-border)] pt-3">
                  <button
                    type="button"
                    onClick={() => openWebsiteDetail(website)}
                    className="flex-1 rounded-lg border border-[var(--vertex-border)] px-3 py-2 text-sm hover:bg-[var(--vertex-surface-2)]"
                  >
                    View Website
                  </button>

                  <button
                    type="button"
                    onClick={() => openEdit(website)}
                    className="rounded-lg border border-[var(--vertex-border)] px-3 py-2 text-sm hover:bg-[var(--vertex-surface-2)]"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeletingWebsite(website)}
                    className="rounded-lg border border-red-500/20 px-3 py-2 text-sm text-red-300 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* CREATE / EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-[var(--vertex-border)] bg-[var(--vertex-surface)] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[var(--vertex-border)] px-5 py-4">
              <div>
                <h2 className="text-lg font-semibold">
                  {editingWebsite ? "Edit Website" : "Add Website"}
                </h2>
                <p className="mt-1 text-xs text-[var(--vertex-muted)]">
                  Connect a website to a real client and optional project.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="rounded-lg p-2 text-[var(--vertex-muted)] hover:bg-[var(--vertex-surface-2)] hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="overflow-y-auto p-5">
              {error && (
                <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  {error}
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Website Name" required>
                  <input
                    value={form.name}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        name: event.target.value,
                      }))
                    }
                    placeholder="e.g. BrightSmile Dental Website"
                    className={inputClass}
                  />
                </Field>

                <Field label="Client" required>
                  <select
                    value={form.clientId}
                    onChange={(event) =>
                      handleClientChange(event.target.value)
                    }
                    className={selectClass}
                  >
                    <option value="">Select client</option>
                    {clients.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.name}
                        {client.company ? ` — ${client.company}` : ""}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Project">
                  <select
                    value={form.projectId}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        projectId: event.target.value,
                      }))
                    }
                    className={selectClass}
                    disabled={!form.clientId}
                  >
                    <option value="">
                      {form.clientId
                        ? "No project"
                        : "Select a client first"}
                    </option>

                    {filteredProjects.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Hosting Provider">
                  <select
                    value={form.hostingProvider}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        hostingProvider: event.target.value,
                      }))
                    }
                    className={selectClass}
                  >
                    <option value="">Select hosting provider</option>
                    {hostingOptions.map((provider) => (
                      <option key={provider} value={provider}>
                        {provider}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Website URL">
                  <input
                    value={form.websiteUrl}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        websiteUrl: event.target.value,
                      }))
                    }
                    placeholder="https://example.com"
                    className={inputClass}
                  />
                </Field>

                <Field label="Domain">
                  <input
                    value={form.domain}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        domain: event.target.value,
                      }))
                    }
                    placeholder="example.com"
                    className={inputClass}
                  />
                </Field>

                <Field label="Website Status">
                  <select
                    value={form.status}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        status: event.target.value as WebsiteStatus,
                      }))
                    }
                    className={selectClass}
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Maintenance Status">
                  <select
                    value={form.maintenanceStatus}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        maintenanceStatus:
                          event.target.value as MaintenanceStatus,
                      }))
                    }
                    className={selectClass}
                  >
                    {maintenanceOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Launch Date">
                  <div className="relative">
                    <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--vertex-muted)]" />
                    <input
                      type="date"
                      value={form.launchDate}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          launchDate: event.target.value,
                        }))
                      }
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </Field>

                <div className="sm:col-span-2">
                  <Field label="Notes">
                    <textarea
                      value={form.notes}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          notes: event.target.value,
                        }))
                      }
                      rows={4}
                      placeholder="Add website notes, hosting details, launch notes, maintenance information..."
                      className={`${inputClass} resize-none py-3`}
                    />
                  </Field>
                </div>
              </div>
            </div>

            <div className="flex flex-col-reverse gap-2 border-t border-[var(--vertex-border)] p-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="rounded-xl border border-[var(--vertex-border)] px-4 py-2.5 text-sm font-medium hover:bg-[var(--vertex-surface-2)] disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--vertex-accent)] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                {editingWebsite ? "Save Changes" : "Create Website"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION */}
      {deletingWebsite && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-[var(--vertex-border)] bg-[var(--vertex-surface)] p-5 shadow-2xl">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10 text-red-300">
              <Trash2 className="h-5 w-5" />
            </div>

            <h2 className="mt-4 text-lg font-semibold">
              Delete Website?
            </h2>

            <p className="mt-2 text-sm leading-6 text-[var(--vertex-muted)]">
              This will permanently remove{" "}
              <span className="font-medium text-white">
                {deletingWebsite.name}
              </span>{" "}
              from the Business OS. This action cannot be undone.
            </p>

            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setDeletingWebsite(null)}
                disabled={saving}
                className="rounded-xl border border-[var(--vertex-border)] px-4 py-2.5 text-sm font-medium hover:bg-[var(--vertex-surface-2)] disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-500 disabled:opacity-60"
              >
                {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                Delete Website
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-[70] flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-[#0b1020] px-4 py-3 text-sm text-white shadow-2xl">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          {toast}
        </div>
      )}
    </div>
  );
}

const inputClass =
  "h-10 w-full rounded-xl border border-[var(--vertex-border)] bg-[var(--vertex-surface-2)] px-3 text-sm text-white outline-none transition placeholder:text-[var(--vertex-muted)] focus:border-[var(--vertex-accent)]";

const selectClass =
  "h-10 w-full rounded-xl border border-[var(--vertex-border)] bg-[#0b1020] px-3 text-sm text-white outline-none transition focus:border-[var(--vertex-accent)] disabled:cursor-not-allowed disabled:opacity-50";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-[var(--vertex-muted)]">
        {label}
        {required && <span className="ml-1 text-red-400">*</span>}
      </span>
      {children}
    </label>
  );
}
