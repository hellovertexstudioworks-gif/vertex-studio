"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  DollarSign,
  Eye,
  FolderKanban,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  Users,
  X,
} from "lucide-react";

type ProjectStatus =
  | "Planning"
  | "In Progress"
  | "Review"
  | "Active"
  | "On Hold"
  | "Completed";

type Project = {
  id: string;
  name: string;
  client: string;
  clientId: string;
  description: string;
  status: ProjectStatus;
  progress: number;
  value: number;
  startDate: string;
  dueDate: string;
  lastActivity: string;
  category: string;
};

export default function ProjectsPage() {
  const [projects, setProjects] =
    useState<Project[]>([]);

  const [clientOptions, setClientOptions] = useState<
    Array<{ id: string; name: string }>
  >([]);

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("All");
  const [clientFilter, setClientFilter] =
    useState("All");
  const [categoryFilter, setCategoryFilter] =
    useState("All");

  const [showAddModal, setShowAddModal] =
    useState(false);

  const [editingProject, setEditingProject] =
    useState<Project | null>(null);

  const [deletingProject, setDeletingProject] =
    useState<Project | null>(null);

  const [toast, setToast] = useState("");
  const [isRefreshing, setIsRefreshing] =
    useState(false);

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesSearch =
        query === "" ||
        project.name
          .toLowerCase()
          .includes(query) ||
        project.client
          .toLowerCase()
          .includes(query) ||
        project.description
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        statusFilter === "All" ||
        project.status === statusFilter;

      const matchesClient =
        clientFilter === "All" ||
        project.clientId === clientFilter;

      const matchesCategory =
        categoryFilter === "All" ||
        project.category === categoryFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesClient &&
        matchesCategory
      );
    });
  }, [
    projects,
    search,
    statusFilter,
    clientFilter,
    categoryFilter,
  ]);

  const totalProjects = projects.length;

  const activeProjects = projects.filter(
    (project) =>
      project.status === "Active" ||
      project.status === "In Progress" ||
      project.status === "Review"
  ).length;

  const completedProjects = projects.filter(
    (project) => project.status === "Completed"
  ).length;

  const totalProjectValue = projects.reduce(
    (total, project) =>
      total + project.value,
    0
  );

  const averageProgress =
    projects.length > 0
      ? Math.round(
          projects.reduce(
            (total, project) =>
              total + project.progress,
            0
          ) / projects.length
        )
      : 0;

  const showSuccess = (message: string) => {
    setToast(message);

    window.setTimeout(() => {
      setToast("");
    }, 3000);
  };

  const loadProjects = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const [projectsResponse, clientsResponse] = await Promise.all([
        fetch("/api/admin/projects", { cache: "no-store" }),
        fetch("/api/admin/clients", { cache: "no-store" }),
      ]);

      const projectsData = await projectsResponse.json().catch(() => ({}));
      const clientsData = await clientsResponse.json().catch(() => ({}));

      if (!projectsResponse.ok) {
        throw new Error(
          projectsData?.message || "Unable to load projects."
        );
      }

      if (!clientsResponse.ok) {
        throw new Error(
          clientsData?.message || "Unable to load clients."
        );
      }

      setProjects(Array.isArray(projectsData.projects) ? projectsData.projects : []);
      setClientOptions(
        Array.isArray(clientsData.clients)
          ? clientsData.clients.map((client: { id: string; name?: string; company?: string }) => ({
              id: client.id,
              name: client.company || client.name || "Unnamed Client",
            }))
          : []
      );
    } catch (error) {
      console.error("PROJECTS LOAD ERROR:", error);
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to load projects."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadProjects();
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadProjects();
    setIsRefreshing(false);
    showSuccess("Projects refreshed.");
  };

  const handleAddProject = async (project: Project) => {
    try {
      const response = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId: project.clientId,
          name: project.name,
          description: project.description,
          status: project.status,
          progress: project.progress,
          value: project.value,
          startDate: project.startDate || null,
          dueDate: project.dueDate || null,
          category: project.category,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.message || "Unable to create project.");
      }

      setShowAddModal(false);
      await loadProjects();
      showSuccess(`${project.name} was added successfully.`);
    } catch (error) {
      console.error("PROJECT ADD ERROR:", error);
      showSuccess(
        error instanceof Error ? error.message : "Unable to create project."
      );
    }
  };

  const handleEditProject = async (project: Project) => {
    try {
      const response = await fetch("/api/admin/projects", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: project.id,
          clientId: project.clientId,
          name: project.name,
          description: project.description,
          status: project.status,
          progress: project.progress,
          value: project.value,
          startDate: project.startDate || null,
          dueDate: project.dueDate || null,
          category: project.category,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.message || "Unable to update project.");
      }

      setEditingProject(null);
      await loadProjects();
      showSuccess(`${project.name} was updated successfully.`);
    } catch (error) {
      console.error("PROJECT UPDATE ERROR:", error);
      showSuccess(
        error instanceof Error ? error.message : "Unable to update project."
      );
    }
  };

  const handleDeleteProject = async () => {
    if (!deletingProject) return;

    const name = deletingProject.name;

    try {
      const response = await fetch(
        `/api/admin/projects?id=${encodeURIComponent(deletingProject.id)}`,
        { method: "DELETE" }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.message || "Unable to delete project.");
      }

      setDeletingProject(null);
      await loadProjects();
      showSuccess(`${name} was deleted successfully.`);
    } catch (error) {
      console.error("PROJECT DELETE ERROR:", error);
      showSuccess(
        error instanceof Error ? error.message : "Unable to delete project."
      );
    }
  };

  return (
    <>
      <main className="w-full bg-[#060914] px-5 py-8 text-white sm:px-8 sm:py-10 xl:px-10">
        <div className="w-full space-y-6">

          {/* HEADER */}
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-400/10">
                  <FolderKanban className="h-5 w-5 text-blue-400" />
                </div>

                <div>
                  <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                    Projects
                  </h1>

                  <p className="mt-1 text-sm text-slate-500">
                    Track client projects, progress,
                    deadlines, and project value.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleRefresh}
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/8 bg-[#0b1020] px-4 text-sm font-medium text-slate-300 transition hover:border-blue-400/20 hover:text-white"
              >
                <RefreshCw
                  className={`h-4 w-4 ${
                    isRefreshing
                      ? "animate-spin"
                      : ""
                  }`}
                />

                Refresh
              </button>

              <button
                type="button"
                onClick={() =>
                  setShowAddModal(true)
                }
                className="inline-flex h-10 items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-4 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/10 transition hover:brightness-110"
              >
                <Plus className="h-4 w-4" />
                Add Project
              </button>
            </div>
          </div>

          {/* DEMO NOTICE */}
          <div className="flex flex-col gap-3 rounded-2xl border border-blue-400/10 bg-blue-400/[0.04] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div>
              <p className="text-sm font-medium text-blue-200">
                Project workspace
              </p>

              <p className="mt-0.5 text-xs text-slate-500">
                Projects are stored in your Supabase workspace and connected to real clients.
              </p>
            </div>

            <span className="inline-flex w-fit rounded-full border border-emerald-400/15 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300">
              Supabase
            </span>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 gap-4 xl:grid-cols-5">
            <ProjectStat
              label="Total Projects"
              value={totalProjects.toString()}
              icon={
                <FolderKanban className="h-5 w-5" />
              }
              color="text-cyan-400"
              bg="bg-cyan-400/10"
            />

            <ProjectStat
              label="Active"
              value={activeProjects.toString()}
              icon={
                <BriefcaseBusiness className="h-5 w-5" />
              }
              color="text-blue-400"
              bg="bg-blue-400/10"
            />

            <ProjectStat
              label="Completed"
              value={completedProjects.toString()}
              icon={
                <CheckCircle2 className="h-5 w-5" />
              }
              color="text-emerald-400"
              bg="bg-emerald-400/10"
            />

            <ProjectStat
              label="Project Value"
              value={formatCurrency(
                totalProjectValue
              )}
              icon={
                <DollarSign className="h-5 w-5" />
              }
              color="text-amber-400"
              bg="bg-amber-400/10"
            />

            <ProjectStat
              label="Avg. Progress"
              value={`${averageProgress}%`}
              icon={
                <ChevronRight className="h-5 w-5" />
              }
              color="text-violet-400"
              bg="bg-violet-400/10"
            />
          </div>

          {/* FILTERS */}
          <section className="rounded-2xl border border-white/8 bg-[#0b1020] p-4 sm:p-5">
            <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_190px_230px_190px_auto]">

              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />

                <input
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search projects..."
                  className="h-10 w-full rounded-xl border border-white/8 bg-[#060914] pl-10 pr-3 text-sm text-white outline-none placeholder:text-slate-700 transition focus:border-cyan-400/30 focus:ring-2 focus:ring-cyan-400/10"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(
                    event.target.value
                  )
                }
                className="h-10 rounded-xl border border-white/8 bg-[#060914] px-3 text-sm text-slate-300 outline-none focus:border-cyan-400/30"
                style={{ colorScheme: "dark" }}
              >
                <option value="All" style={{ backgroundColor: "#060914", color: "#ffffff" }}>
                  All Statuses
                </option>

                <option value="Planning" style={{ backgroundColor: "#060914", color: "#ffffff" }}>
                  Planning
                </option>

                <option value="In Progress" style={{ backgroundColor: "#060914", color: "#ffffff" }}>
                  In Progress
                </option>

                <option value="Active" style={{ backgroundColor: "#060914", color: "#ffffff" }}>
                  Active
                </option>

                <option value="Review" style={{ backgroundColor: "#060914", color: "#ffffff" }}>
                  Review
                </option>

                <option value="On Hold" style={{ backgroundColor: "#060914", color: "#ffffff" }}>
                  On Hold
                </option>

                <option value="Completed" style={{ backgroundColor: "#060914", color: "#ffffff" }}>
                  Completed
                </option>
              </select>

              <select
                value={clientFilter}
                onChange={(event) =>
                  setClientFilter(
                    event.target.value
                  )
                }
                className="h-10 rounded-xl border border-white/8 bg-[#060914] px-3 text-sm text-slate-300 outline-none focus:border-cyan-400/30"
                style={{ colorScheme: "dark" }}
              >
                <option value="All" style={{ backgroundColor: "#060914", color: "#ffffff" }}>
                  All Clients
                </option>

                {clientOptions.map((client) => (
                  <option
                    key={client.id}
                    value={client.id}
                    style={{ backgroundColor: "#060914", color: "#ffffff" }}
                  >
                    {client.name}
                  </option>
                ))}
              </select>

              <select
                value={categoryFilter}
                onChange={(event) =>
                  setCategoryFilter(
                    event.target.value
                  )
                }
                className="h-10 rounded-xl border border-white/8 bg-[#060914] px-3 text-sm text-slate-300 outline-none focus:border-cyan-400/30"
                style={{ colorScheme: "dark" }}
              >
                <option value="All" style={{ backgroundColor: "#060914", color: "#ffffff" }}>
                  All Categories
                </option>

                <option value="Website" style={{ backgroundColor: "#060914", color: "#ffffff" }}>
                  Website
                </option>

                <option value="Marketing" style={{ backgroundColor: "#060914", color: "#ffffff" }}>
                  Marketing
                </option>

                <option value="Business System" style={{ backgroundColor: "#060914", color: "#ffffff" }}>
                  Business System
                </option>

                <option value="SEO" style={{ backgroundColor: "#060914", color: "#ffffff" }}>
                  SEO
                </option>

                <option value="E-commerce" style={{ backgroundColor: "#060914", color: "#ffffff" }}>
                  E-commerce
                </option>
              </select>

              {(search ||
                statusFilter !== "All" ||
                clientFilter !== "All" ||
                categoryFilter !== "All") && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setStatusFilter("All");
                    setClientFilter("All");
                    setCategoryFilter("All");
                  }}
                  className="h-10 rounded-xl border border-white/8 px-4 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </section>

          {errorMessage && (
            <div className="flex items-center justify-between gap-4 rounded-2xl border border-red-400/15 bg-red-400/[0.04] px-4 py-3">
              <p className="text-sm text-red-300">{errorMessage}</p>
              <button
                type="button"
                onClick={() => void loadProjects()}
                className="shrink-0 rounded-lg border border-red-400/15 px-3 py-1.5 text-xs font-medium text-red-300 transition hover:bg-red-400/10"
              >
                Retry
              </button>
            </div>
          )}

          {/* RESULT COUNT */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-400">
              Showing{" "}
              <span className="font-semibold text-white">
                {filteredProjects.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-white">
                {projects.length}
              </span>{" "}
              projects
            </p>

            <span className="text-xs text-slate-600">
              Project workspace
            </span>
          </div>

          {/* DESKTOP TABLE */}
          <section className="hidden overflow-hidden rounded-2xl border border-white/8 bg-[#0b1020] lg:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1200px]">
                <thead>
                  <tr className="border-b border-white/8 bg-white/[0.015] text-left">
                    <th className="px-5 py-4 text-xs font-medium uppercase tracking-wider text-slate-600">
                      Project
                    </th>

                    <th className="px-5 py-4 text-xs font-medium uppercase tracking-wider text-slate-600">
                      Client
                    </th>

                    <th className="px-5 py-4 text-xs font-medium uppercase tracking-wider text-slate-600">
                      Status
                    </th>

                    <th className="px-5 py-4 text-xs font-medium uppercase tracking-wider text-slate-600">
                      Progress
                    </th>

                    <th className="px-5 py-4 text-xs font-medium uppercase tracking-wider text-slate-600">
                      Value
                    </th>

                    <th className="px-5 py-4 text-xs font-medium uppercase tracking-wider text-slate-600">
                      Deadline
                    </th>

                    <th className="px-5 py-4 text-right text-xs font-medium uppercase tracking-wider text-slate-600">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/6">
                  {!isLoading && filteredProjects.map(
                    (project) => (
                      <ProjectTableRow
                        key={project.id}
                        project={project}
                        onEdit={() =>
                          setEditingProject(
                            project
                          )
                        }
                        onDelete={() =>
                          setDeletingProject(
                            project
                          )
                        }
                      />
                    )
                  )}
                </tbody>
              </table>
            </div>

            {isLoading ? (
              <LoadingProjectState />
            ) : filteredProjects.length === 0 ? (
              <EmptyProjectState />
            ) : null}
          </section>

          {/* MOBILE CARDS */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
            {!isLoading && filteredProjects.map(
              (project) => (
                <ProjectMobileCard
                  key={project.id}
                  project={project}
                  onEdit={() =>
                    setEditingProject(project)
                  }
                  onDelete={() =>
                    setDeletingProject(project)
                  }
                />
              )
            )}

            {isLoading ? (
              <div className="sm:col-span-2">
                <LoadingProjectState />
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="sm:col-span-2">
                <EmptyProjectState />
              </div>
            ) : null}
          </div>

          {/* FOOTER INFO */}
          <div className="flex flex-col gap-4 rounded-2xl border border-white/8 bg-[#0b1020] p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-white">
                Project workflow
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Projects connect clients to tasks,
                invoices, payments, and activity.
              </p>
            </div>

            <Link
              href="/admin/clients"
              className="inline-flex items-center gap-2 text-sm font-medium text-cyan-300 transition hover:text-cyan-200"
            >
              View Clients
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>

      {/* ADD */}
      {showAddModal && (
        <ProjectFormModal
          title="Add Project"
          submitLabel="Add Project"
          clientOptions={clientOptions}
          onClose={() =>
            setShowAddModal(false)
          }
          onSubmit={handleAddProject}
        />
      )}

      {/* EDIT */}
      {editingProject && (
        <ProjectFormModal
          title="Edit Project"
          submitLabel="Save Changes"
          project={editingProject}
          clientOptions={clientOptions}
          onClose={() =>
            setEditingProject(null)
          }
          onSubmit={handleEditProject}
        />
      )}

      {/* DELETE */}
      {deletingProject && (
        <DeleteProjectModal
          project={deletingProject}
          onClose={() =>
            setDeletingProject(null)
          }
          onDelete={handleDeleteProject}
        />
      )}

      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-[100] w-[calc(100%-40px)] max-w-sm rounded-2xl border border-emerald-400/20 bg-[#0b1020] p-4 shadow-2xl shadow-black/40">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10">
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-semibold text-white">
                Success
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {toast}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setToast("")}
              className="ml-auto text-slate-600 transition hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* ========================================================================== */
/* TABLE ROW                                                                  */
/* ========================================================================== */

function ProjectTableRow({
  project,
  onEdit,
  onDelete,
}: {
  project: Project;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <tr className="group transition hover:bg-white/[0.018]">
      <td className="px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-400/10 text-blue-400">
            <FolderKanban className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <Link
              href={`/admin/projects/${project.id}`}
              className="block truncate text-sm font-semibold text-white transition hover:text-cyan-300"
            >
              {project.name}
            </Link>

            <p className="mt-1 max-w-[260px] truncate text-xs text-slate-600">
              {project.description}
            </p>
          </div>
        </div>
      </td>

      <td className="px-5 py-5">
        <Link
          href={`/admin/clients/${project.clientId}`}
          className="text-sm text-slate-300 transition hover:text-cyan-300"
        >
          {project.client}
        </Link>

        <p className="mt-1 text-xs text-slate-600">
          {project.category}
        </p>
      </td>

      <td className="px-5 py-5">
        <ProjectStatusBadge
          status={project.status}
        />
      </td>

      <td className="px-5 py-5">
        <div className="w-40">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Progress
            </span>

            <span className="text-xs font-semibold text-white">
              {project.progress}%
            </span>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-white/6">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
              style={{
                width: `${project.progress}%`,
              }}
            />
          </div>
        </div>
      </td>

      <td className="px-5 py-5">
        <span className="text-sm font-semibold text-amber-300">
          {formatCurrency(project.value)}
        </span>
      </td>

      <td className="px-5 py-5">
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <CalendarDays className="h-3.5 w-3.5" />
          {formatDate(project.dueDate)}
        </div>

        <p className="mt-1 text-[11px] text-slate-700">
          Updated {formatActivity(project.lastActivity)}
        </p>
      </td>

      <td className="px-5 py-5">
        <div className="flex justify-end gap-2">
          <Link
            href={`/admin/projects/${project.id}`}
            title="View Project"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/8 text-slate-500 transition hover:border-cyan-400/20 hover:bg-cyan-400/5 hover:text-cyan-300"
          >
            <Eye className="h-4 w-4" />
          </Link>

          <button
            type="button"
            title="Edit Project"
            onClick={onEdit}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/8 text-slate-500 transition hover:border-blue-400/20 hover:bg-blue-400/5 hover:text-blue-300"
          >
            <Pencil className="h-4 w-4" />
          </button>

          <button
            type="button"
            title="Delete Project"
            onClick={onDelete}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/8 text-slate-500 transition hover:border-red-400/20 hover:bg-red-400/5 hover:text-red-300"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}

/* ========================================================================== */
/* MOBILE CARD                                                                */
/* ========================================================================== */

function ProjectMobileCard({
  project,
  onEdit,
  onDelete,
}: {
  project: Project;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="rounded-2xl border border-white/8 bg-[#0b1020] p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-400/10 text-blue-400">
            <FolderKanban className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <Link
              href={`/admin/projects/${project.id}`}
              className="block truncate text-sm font-semibold text-white hover:text-cyan-300"
            >
              {project.name}
            </Link>

            <p className="mt-1 truncate text-xs text-slate-600">
              {project.client}
            </p>
          </div>
        </div>

        <ProjectStatusBadge
          status={project.status}
        />
      </div>

      <p className="mt-4 text-xs leading-5 text-slate-500">
        {project.description}
      </p>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs text-slate-600">
            Progress
          </span>

          <span className="text-xs font-semibold text-white">
            {project.progress}%
          </span>
        </div>

        <div className="h-1.5 overflow-hidden rounded-full bg-white/6">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
            style={{
              width: `${project.progress}%`,
            }}
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-white/6 bg-[#060914] p-3">
          <p className="text-[11px] text-slate-600">
            Value
          </p>

          <p className="mt-1 text-sm font-semibold text-amber-300">
            {formatCurrency(project.value)}
          </p>
        </div>

        <div className="rounded-xl border border-white/6 bg-[#060914] p-3">
          <p className="text-[11px] text-slate-600">
            Due
          </p>

          <p className="mt-1 text-xs font-medium text-slate-300">
            {formatDate(project.dueDate)}
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2">
        <Link
          href={`/admin/projects/${project.id}`}
          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-white/8 text-xs font-medium text-slate-400 transition hover:border-cyan-400/20 hover:text-cyan-300"
        >
          <Eye className="h-3.5 w-3.5" />
          View
        </Link>

        <button
          type="button"
          onClick={onEdit}
          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-white/8 text-xs font-medium text-slate-400 transition hover:border-blue-400/20 hover:text-blue-300"
        >
          <Pencil className="h-3.5 w-3.5" />
          Edit
        </button>

        <button
          type="button"
          onClick={onDelete}
          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-white/8 text-xs font-medium text-slate-400 transition hover:border-red-400/20 hover:text-red-300"
        >
          <Trash2 className="h-3.5 w-3.5" />
          Delete
        </button>
      </div>
    </div>
  );
}

/* ========================================================================== */
/* PROJECT FORM MODAL                                                         */
/* ========================================================================== */

function ProjectFormModal({
  title,
  submitLabel,
  project,
  clientOptions,
  onClose,
  onSubmit,
}: {
  title: string;
  submitLabel: string;
  project?: Project;
  clientOptions: Array<{ id: string; name: string }>;
  onClose: () => void;
  onSubmit: (project: Project) => void;
}) {
  const [form, setForm] = useState<Project>(
    project ?? {
      id: `project-${Date.now()}`,
      name: "",
      client:
        clientOptions[0]?.name ?? "",
      clientId:
        clientOptions[0]?.id ?? "",
      description: "",
      status: "Planning",
      progress: 0,
      value: 0,
      startDate: "",
      dueDate: "",
      lastActivity: "Today",
      category: "Website",
    }
  );

  const updateField = <K extends keyof Project>(
    field: K,
    value: Project[K]
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleClientChange = (
    clientId: string
  ) => {
    const selected = clientOptions.find(
      (client) => client.id === clientId
    );

    setForm((current) => ({
      ...current,
      clientId,
      client:
        selected?.name ?? current.client,
    }));
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (
      !form.name.trim() ||
      !form.client.trim()
    ) {
      return;
    }

    onSubmit({
      ...form,
      name: form.name.trim(),
      description:
        form.description.trim() ||
        "Project workspace",
      progress: Math.min(
        100,
        Math.max(0, Number(form.progress) || 0)
      ),
      value: Math.max(
        0,
        Number(form.value) || 0
      ),
      lastActivity: "Just now",
    });
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#0b1020] shadow-2xl shadow-black/50">

        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/8 bg-[#0b1020] px-5 py-4 sm:px-6">
          <div>
            <h2 className="text-lg font-semibold text-white">
              {title}
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              {project
                ? "Update project information and progress."
                : "Create a new project in the Supabase workspace."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white/5 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-5 sm:p-6"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            <FormField
              label="Project Name"
              value={form.name}
              onChange={(value) =>
                updateField("name", value)
              }
              placeholder="e.g. New Website"
              required
            />

            <SelectField
              label="Client"
              value={form.clientId}
              onChange={handleClientChange}
              options={clientOptions.map(
                (client) => client.id
              )}
              labels={clientOptions.map(
                (client) => client.name
              )}
            />

            <SelectField
              label="Status"
              value={form.status}
              onChange={(value) =>
                updateField(
                  "status",
                  value as ProjectStatus
                )
              }
              options={[
                "Planning",
                "In Progress",
                "Review",
                "Active",
                "On Hold",
                "Completed",
              ]}
            />

            <SelectField
              label="Category"
              value={form.category}
              onChange={(value) =>
                updateField(
                  "category",
                  value
                )
              }
              options={[
                "Website",
                "Marketing",
                "Business System",
                "SEO",
                "E-commerce",
              ]}
            />

            <FormField
              label="Project Value"
              type="number"
              value={String(form.value)}
              onChange={(value) =>
                updateField(
                  "value",
                  Math.max(
                    0,
                    Number(value) || 0
                  )
                )
              }
              placeholder="0"
            />

            <FormField
              label="Progress"
              type="number"
              value={String(form.progress)}
              onChange={(value) =>
                updateField(
                  "progress",
                  Math.min(
                    100,
                    Math.max(
                      0,
                      Number(value) || 0
                    )
                  )
                )
              }
              placeholder="0"
            />

            <FormField
              label="Start Date"
              type="date"
              value={form.startDate}
              onChange={(value) =>
                updateField(
                  "startDate",
                  value
                )
              }
              placeholder="September 30, 2026"
            />

            <FormField
              label="Due Date"
              type="date"
              value={form.dueDate}
              onChange={(value) =>
                updateField(
                  "dueDate",
                  value
                )
              }
              placeholder="November 30, 2026"
            />
          </div>

          <label className="block">
            <span className="mb-2 block text-xs font-medium text-slate-400">
              Description
            </span>

            <textarea
              value={form.description}
              onChange={(event) =>
                updateField(
                  "description",
                  event.target.value
                )
              }
              rows={4}
              placeholder="Describe the project..."
              className="w-full resize-none rounded-xl border border-white/8 bg-[#060914] px-3 py-3 text-sm text-white outline-none placeholder:text-slate-700 transition focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/10"
            />
          </label>

          <div className="rounded-xl border border-blue-400/10 bg-blue-400/[0.03] p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-amber-400" />

              <p className="text-xs font-medium text-blue-300">
                Project Summary
              </p>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <div>
                <p className="text-[11px] text-slate-600">
                  Value
                </p>

                <p className="mt-1 text-sm font-semibold text-amber-300">
                  {formatCurrency(form.value)}
                </p>
              </div>

              <div>
                <p className="text-[11px] text-slate-600">
                  Progress
                </p>

                <p className="mt-1 text-sm font-semibold text-cyan-300">
                  {form.progress}%
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-white/8 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="h-10 rounded-xl border border-white/8 px-4 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-5 text-sm font-semibold text-slate-950 transition hover:brightness-110"
            >
              <Pencil className="h-4 w-4" />
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ========================================================================== */
/* DELETE MODAL                                                               */
/* ========================================================================== */

function DeleteProjectModal({
  project,
  onClose,
  onDelete,
}: {
  project: Project;
  onClose: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-red-400/15 bg-[#0b1020] p-6 shadow-2xl shadow-black/50">

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-400/10">
          <Trash2 className="h-5 w-5 text-red-400" />
        </div>

        <h2 className="mt-5 text-lg font-semibold text-white">
          Delete project?
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Are you sure you want to delete{" "}
          <span className="font-medium text-slate-300">
            {project.name}
          </span>
          ?
        </p>

        <div className="mt-4 rounded-xl border border-red-400/10 bg-red-400/[0.04] p-3">
          <p className="text-xs leading-5 text-red-300/80">
            This will permanently remove the project record from
            the Supabase database. This action cannot be undone.
          </p>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="h-10 rounded-xl border border-white/8 px-4 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onDelete}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-red-500/90 px-4 text-sm font-semibold text-white transition hover:bg-red-500"
          >
            <Trash2 className="h-4 w-4" />
            Delete Project
          </button>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================== */
/* STAT CARD                                                                  */
/* ========================================================================== */

function ProjectStat({
  label,
  value,
  icon,
  color,
  bg,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  bg: string;
}) {
  return (
    <div className="rounded-2xl border border-white/8 bg-[#0b1020] p-5 transition hover:border-blue-400/10">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${bg}`}
      >
        <span className={color}>
          {icon}
        </span>
      </div>

      <p className="mt-4 text-xs text-slate-600">
        {label}
      </p>

      <p className="mt-1 text-xl font-semibold text-white">
        {value}
      </p>
    </div>
  );
}

/* ========================================================================== */
/* STATUS BADGE                                                               */
/* ========================================================================== */

function ProjectStatusBadge({
  status,
}: {
  status: ProjectStatus;
}) {
  const styles: Record<
    ProjectStatus,
    string
  > = {
    Planning:
      "border-violet-400/15 bg-violet-400/10 text-violet-300",
    "In Progress":
      "border-blue-400/15 bg-blue-400/10 text-blue-300",
    Review:
      "border-cyan-400/15 bg-cyan-400/10 text-cyan-300",
    Active:
      "border-emerald-400/15 bg-emerald-400/10 text-emerald-400",
    "On Hold":
      "border-amber-400/15 bg-amber-400/10 text-amber-300",
    Completed:
      "border-emerald-400/15 bg-emerald-400/10 text-emerald-400",
  };

  const dots: Record<
    ProjectStatus,
    string
  > = {
    Planning: "bg-violet-400",
    "In Progress": "bg-blue-400",
    Review: "bg-cyan-400",
    Active: "bg-emerald-400",
    "On Hold": "bg-amber-400",
    Completed: "bg-emerald-400",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${styles[status]}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${dots[status]}`}
      />

      {status}
    </span>
  );
}

/* ========================================================================== */
/* FORM FIELD                                                                 */
/* ========================================================================== */

function FormField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-medium text-slate-400">
        {label}
      </span>

      <input
        type={type}
        value={value}
        required={required}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        className="h-10 w-full rounded-xl border border-white/8 bg-[#060914] px-3 text-sm text-white outline-none placeholder:text-slate-700 transition focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/10"
      />
    </label>
  );
}

/* ========================================================================== */
/* SELECT FIELD                                                               */
/* ========================================================================== */

function SelectField({
  label,
  value,
  onChange,
  options,
  labels,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  labels?: string[];
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-medium text-slate-400">
        {label}
      </span>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="h-10 w-full rounded-xl border border-white/8 bg-[#060914] px-3 text-sm text-white outline-none transition focus:border-cyan-400/40"
        style={{ colorScheme: "dark" }}
      >
        {options.map((option, index) => (
          <option
            key={option}
            value={option}
            style={{
              backgroundColor: "#060914",
              color: "#ffffff",
            }}
          >
            {labels?.[index] ?? option}
          </option>
        ))}
      </select>
    </label>
  );
}

/* ========================================================================== */
/* EMPTY STATE                                                                */
/* ========================================================================== */

function LoadingProjectState() {
  return (
    <div className="px-6 py-14 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10">
        <RefreshCw className="h-5 w-5 animate-spin text-cyan-400" />
      </div>

      <h3 className="mt-4 text-sm font-semibold text-white">
        Loading projects...
      </h3>

      <p className="mt-2 text-xs text-slate-500">
        Fetching projects and clients from Supabase.
      </p>
    </div>
  );
}

/* ========================================================================== */
/* EMPTY STATE                                                                */
/* ========================================================================== */

function EmptyProjectState() {
  return (
    <div className="px-6 py-14 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-400/10">
        <FolderKanban className="h-5 w-5 text-blue-400" />
      </div>

      <h3 className="mt-4 text-sm font-semibold text-white">
        No matching projects
      </h3>

      <p className="mt-2 text-xs text-slate-500">
        Try changing your search or filters.
      </p>
    </div>
  );
}

/* ========================================================================== */
/* HELPERS                                                                    */
/* ========================================================================== */

function formatCurrency(value: number) {
  return `$${value.toLocaleString("en-US")}`;
}

function formatDate(value: string) {
  if (!value) return "—";

  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatActivity(value: string) {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  const diff = Date.now() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return "yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 14) return "1 week ago";
  return `${Math.floor(days / 7)} weeks ago`;
}