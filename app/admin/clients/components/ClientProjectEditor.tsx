"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Edit3,
  FolderKanban,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";

export type ClientProject = {
  id: string;
  name: string;
  description: string;
  status:
    | "Planning"
    | "In Progress"
    | "Active"
    | "Review"
    | "Completed"
    | "On Hold";
  date: string;
};

type ClientProjectEditorProps = {
  projects: ClientProject[];
  onChange?: (projects: ClientProject[]) => void;
};

const statusOptions: ClientProject["status"][] = [
  "Planning",
  "In Progress",
  "Active",
  "Review",
  "Completed",
  "On Hold",
];

export default function ClientProjectEditor({
  projects: initialProjects,
  onChange,
}: ClientProjectEditorProps) {
  const [projects, setProjects] =
    useState<ClientProject[]>(initialProjects);

  const [editingProject, setEditingProject] =
    useState<ClientProject | null>(null);

  const [isAdding, setIsAdding] = useState(false);

  const [deleteProject, setDeleteProject] =
    useState<ClientProject | null>(null);

  const [toast, setToast] = useState<string | null>(null);

  const updateProjects = (updated: ClientProject[]) => {
    setProjects(updated);
    onChange?.(updated);
  };

  const showToast = (message: string) => {
    setToast(message);

    window.setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const handleSaveProject = (project: ClientProject) => {
    const exists = projects.some(
      (item) => item.id === project.id
    );

    const updated = exists
      ? projects.map((item) =>
          item.id === project.id ? project : item
        )
      : [...projects, project];

    updateProjects(updated);

    setEditingProject(null);
    setIsAdding(false);

    showToast(
      exists
        ? "Project updated successfully."
        : "Project added successfully."
    );
  };

  const handleDeleteProject = () => {
    if (!deleteProject) return;

    const updated = projects.filter(
      (project) => project.id !== deleteProject.id
    );

    updateProjects(updated);

    setDeleteProject(null);

    showToast("Project deleted successfully.");
  };

  const handleAddProject = () => {
    setIsAdding(true);

    setEditingProject({
      id: `project-${Date.now()}`,
      name: "",
      description: "",
      status: "Planning",
      date: "Just now",
    });
  };

  return (
    <>
      <section className="rounded-2xl border border-white/8 bg-[#0b1020]">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-white/8 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-400/10">
              <FolderKanban className="h-4 w-4 text-blue-400" />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-white">
                Projects
              </h2>

              <p className="mt-0.5 text-xs text-slate-600">
                Projects associated with this client
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddProject}
            className="inline-flex h-9 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-3.5 text-xs font-semibold text-slate-950 transition hover:brightness-110"
          >
            <Plus className="h-4 w-4" />
            Add Project
          </button>
        </div>

        {/* Projects */}
        {projects.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-400/10">
              <FolderKanban className="h-5 w-5 text-blue-400" />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-white">
              No projects yet
            </h3>

            <p className="mt-2 text-xs text-slate-500">
              Add the first project for this client.
            </p>

            <button
              type="button"
              onClick={handleAddProject}
              className="mt-5 inline-flex items-center gap-2 rounded-xl border border-cyan-400/15 bg-cyan-400/10 px-4 py-2 text-xs font-medium text-cyan-300 transition hover:bg-cyan-400/15"
            >
              <Plus className="h-4 w-4" />
              Add Project
            </button>
          </div>
        ) : (
          <div className="divide-y divide-white/6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group flex flex-col gap-4 p-5 transition hover:bg-white/[0.015] sm:p-6 lg:flex-row lg:items-center lg:justify-between"
              >
                {/* Project information */}
                <div className="flex min-w-0 items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-400/10">
                    <FolderKanban className="h-5 w-5 text-blue-400" />
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-white">
                      {project.name}
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Status + actions */}
                <div className="flex flex-wrap items-center gap-3 lg:justify-end">
                  <StatusBadge status={project.status} />

                  <span className="text-xs text-slate-600">
                    {project.date}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() =>
                        setEditingProject(project)
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-cyan-400/10 hover:text-cyan-300"
                      aria-label={`Edit ${project.name}`}
                      title="Edit project"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setDeleteProject(project)
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-red-400/10 hover:text-red-300"
                      aria-label={`Delete ${project.name}`}
                      title="Delete project"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Edit / Add Modal */}
      {editingProject && (
        <ProjectModal
          project={editingProject}
          isNew={isAdding}
          onClose={() => {
            setEditingProject(null);
            setIsAdding(false);
          }}
          onSave={handleSaveProject}
        />
      )}

      {/* Delete Modal */}
      {deleteProject && (
        <DeleteProjectModal
          project={deleteProject}
          onClose={() => setDeleteProject(null)}
          onDelete={handleDeleteProject}
        />
      )}

      {/* Toast */}
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
              onClick={() => setToast(null)}
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

function ProjectModal({
  project,
  isNew,
  onClose,
  onSave,
}: {
  project: ClientProject;
  isNew: boolean;
  onClose: () => void;
  onSave: (project: ClientProject) => void;
}) {
  const [form, setForm] =
    useState<ClientProject>(project);

  const updateField = <K extends keyof ClientProject>(
    field: K,
    value: ClientProject[K]
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!form.name.trim()) {
      return;
    }

    onSave({
      ...form,
      name: form.name.trim(),
      description: form.description.trim(),
      date: form.date.trim() || "Just now",
    });
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-white/10 bg-[#0b1020] shadow-2xl shadow-black/50">
        {/* Modal header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/8 bg-[#0b1020] px-5 py-4 sm:px-6">
          <div>
            <h2 className="text-lg font-semibold text-white">
              {isNew ? "Add Project" : "Edit Project"}
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              {isNew
                ? "Create a new project for this client."
                : "Update the project information."}
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

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-5 sm:p-6"
        >
          {/* Name */}
          <div>
            <label className="mb-2 block text-xs font-medium text-slate-400">
              Project Name
            </label>

            <input
              type="text"
              value={form.name}
              onChange={(event) =>
                updateField("name", event.target.value)
              }
              placeholder="e.g. Business Website"
              autoFocus
              className="h-11 w-full rounded-xl border border-white/8 bg-[#060914] px-3 text-sm text-white outline-none placeholder:text-slate-700 transition focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/10"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-xs font-medium text-slate-400">
              Description
            </label>

            <textarea
              value={form.description}
              onChange={(event) =>
                updateField(
                  "description",
                  event.target.value
                )
              }
              placeholder="Describe the project..."
              rows={4}
              className="w-full resize-none rounded-xl border border-white/8 bg-[#060914] px-3 py-3 text-sm text-white outline-none placeholder:text-slate-700 transition focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/10"
            />
          </div>

          {/* Status */}
          <div>
            <label className="mb-2 block text-xs font-medium text-slate-400">
              Status
            </label>

            <select
              value={form.status}
              onChange={(event) =>
                updateField(
                  "status",
                  event.target.value as ClientProject["status"]
                )
              }
              className="h-11 w-full rounded-xl border border-white/8 bg-[#060914] px-3 text-sm text-white outline-none transition focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/10"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Last activity */}
          <div>
            <label className="mb-2 block text-xs font-medium text-slate-400">
              Last Activity
            </label>

            <input
              type="text"
              value={form.date}
              onChange={(event) =>
                updateField("date", event.target.value)
              }
              placeholder="e.g. Updated today"
              className="h-11 w-full rounded-xl border border-white/8 bg-[#060914] px-3 text-sm text-white outline-none placeholder:text-slate-700 transition focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/10"
            />
          </div>

          {/* Footer */}
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
              disabled={!form.name.trim()}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-5 text-sm font-semibold text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Save className="h-4 w-4" />
              {isNew ? "Create Project" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DeleteProjectModal({
  project,
  onClose,
  onDelete,
}: {
  project: ClientProject;
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
            This is currently demo data. When the Projects
            database is connected, this action will remove the
            project record permanently.
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

function StatusBadge({
  status,
}: {
  status: ClientProject["status"];
}) {
  const styles = {
    Planning:
      "border-violet-400/15 bg-violet-400/10 text-violet-300",
    "In Progress":
      "border-blue-400/15 bg-blue-400/10 text-blue-300",
    Active:
      "border-emerald-400/15 bg-emerald-400/10 text-emerald-400",
    Review:
      "border-cyan-400/15 bg-cyan-400/10 text-cyan-300",
    Completed:
      "border-emerald-400/15 bg-emerald-400/10 text-emerald-400",
    "On Hold":
      "border-amber-400/15 bg-amber-400/10 text-amber-300",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}