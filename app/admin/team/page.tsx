// FILE: app/admin/team/page.tsx
// PURPOSE: Vertex Studio Works — Workspace / Operational Team
// NOTE: Separate from /admin/admin-team (System Access, Roles & Permissions).

"use client";

import { useEffect, useMemo, useState } from "react";
import {
  UserPlus,
  Search,
  MoreHorizontal,
  Pencil,
  Trash2,
  Users,
  UserCheck,
  FolderKanban,
  Gauge,
  X,
  Check,
  BriefcaseBusiness,
} from "lucide-react";

type Department =
  | "Development"
  | "Design"
  | "Marketing"
  | "Sales"
  | "Operations"
  | "Support";

type Status = "Active" | "Pending" | "Inactive";
type Workload = "Light" | "Balanced" | "Busy" | "Full";

type TeamMember = {
  id: string;
  name: string;
  email: string;
  department: Department;
  position: string;
  status: Status;
  workload: Workload;
  project: string;
  joined: string;
  lastActive: string;
  initials: string;
};


const departments: Department[] = [
  "Development",
  "Design",
  "Marketing",
  "Sales",
  "Operations",
  "Support",
];

const statuses: Status[] = ["Active", "Pending", "Inactive"];
const workloads: Workload[] = ["Light", "Balanced", "Busy", "Full"];

function departmentColor(department: Department) {
  switch (department) {
    case "Development":
      return "border-blue-400/20 bg-blue-400/10 text-blue-300";
    case "Design":
      return "border-violet-400/20 bg-violet-400/10 text-violet-300";
    case "Marketing":
      return "border-cyan-400/20 bg-cyan-400/10 text-cyan-300";
    case "Sales":
      return "border-emerald-400/20 bg-emerald-400/10 text-emerald-300";
    case "Operations":
      return "border-orange-400/20 bg-orange-400/10 text-orange-300";
    default:
      return "border-pink-400/20 bg-pink-400/10 text-pink-300";
  }
}

function statusColor(status: Status) {
  if (status === "Active")
    return "border-emerald-400/20 bg-emerald-400/10 text-emerald-300";
  if (status === "Pending")
    return "border-amber-400/20 bg-amber-400/10 text-amber-300";
  return "border-slate-400/20 bg-slate-400/10 text-slate-300";
}

function workloadColor(workload: Workload) {
  if (workload === "Light")
    return "border-slate-400/20 bg-slate-400/10 text-slate-300";
  if (workload === "Balanced")
    return "border-cyan-400/20 bg-cyan-400/10 text-cyan-300";
  if (workload === "Busy")
    return "border-amber-400/20 bg-amber-400/10 text-amber-300";
  return "border-red-400/20 bg-red-400/10 text-red-300";
}

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState<
    "All" | Department
  >("All");
  const [statusFilter, setStatusFilter] = useState<"All" | Status>("All");
  const [workloadFilter, setWorkloadFilter] = useState<"All" | Workload>(
    "All"
  );

  const [modal, setModal] = useState<
    "invite" | "edit" | "delete" | null
  >(null);
  const [selected, setSelected] = useState<TeamMember | null>(null);
  const [toast, setToast] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "Development" as Department,
    position: "",
    workload: "Balanced" as Workload,
    project: "Unassigned",
  });

  function formatDate(value: string) {
    if (!value) return "—";

    return new Date(value).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  function formatLastActive(value: string) {
    if (!value) return "—";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return value;

    const diffMs = Date.now() - date.getTime();
    const diffMinutes = Math.floor(diffMs / 60000);

    if (diffMinutes < 1) return "Now";
    if (diffMinutes < 60) return `${diffMinutes} min ago`;

    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours} hr ago`;

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays} days ago`;

    return formatDate(value);
  }

  async function loadMembers() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/workspace-team", {
        method: "GET",
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to load Workspace Team.");
      }

      const nextMembers: TeamMember[] = (data.members ?? []).map(
        (member: {
          id: string;
          name: string;
          email: string;
          department: Department;
          position: string;
          status: Status;
          workload: Workload;
          project: string;
          joined: string;
          lastActive: string;
        }) => ({
          ...member,
          initials: getInitials(member.name),
          joined: formatDate(member.joined),
          lastActive:
            member.status === "Pending"
              ? "Invitation pending"
              : formatLastActive(member.lastActive),
        })
      );

      setMembers(nextMembers);
    } catch (loadError) {
      console.error("WORKSPACE TEAM LOAD ERROR:", loadError);
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Unable to load Workspace Team."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMembers();
  }, []);

  const filteredMembers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return members.filter((member) => {
      const matchesSearch =
        !query ||
        member.name.toLowerCase().includes(query) ||
        member.email.toLowerCase().includes(query) ||
        member.position.toLowerCase().includes(query) ||
        member.project.toLowerCase().includes(query);

      const matchesDepartment =
        departmentFilter === "All" ||
        member.department === departmentFilter;

      const matchesStatus =
        statusFilter === "All" || member.status === statusFilter;

      const matchesWorkload =
        workloadFilter === "All" || member.workload === workloadFilter;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesStatus &&
        matchesWorkload
      );
    });
  }, [members, search, departmentFilter, statusFilter, workloadFilter]);

  const stats = {
    total: members.length,
    active: members.filter((member) => member.status === "Active").length,
    assigned: members.filter(
      (member) => member.project !== "Unassigned"
    ).length,
    available: members.filter(
      (member) =>
        member.status === "Active" &&
        (member.workload === "Light" || member.workload === "Balanced")
    ).length,
  };

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  }

  function openInvite() {
    setForm({
      name: "",
      email: "",
      department: "Development",
      position: "",
      workload: "Balanced",
      project: "Unassigned",
    });
    setModal("invite");
  }

  function openEdit(member: TeamMember) {
    setSelected(member);
    setForm({
      name: member.name,
      email: member.email,
      department: member.department,
      position: member.position,
      workload: member.workload,
      project: member.project,
    });
    setModal("edit");
  }

  function openDelete(member: TeamMember) {
    setSelected(member);
    setModal("delete");
  }

  function getInitials(name: string) {
    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("");
  }

  async function inviteMember() {
    if (!form.name.trim() || !form.email.trim() || !form.position.trim()) {
      return;
    }

    setSaving(true);
    setError("");

    try {
      const response = await fetch("/api/admin/workspace-team", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to add workspace member.");
      }

      setModal(null);
      showToast("Workspace member added successfully");
      await loadMembers();
    } catch (submitError) {
      console.error("WORKSPACE TEAM ADD ERROR:", submitError);
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to add workspace member."
      );
    } finally {
      setSaving(false);
    }
  }

  async function saveEdit() {
    if (
      !selected ||
      !form.name.trim() ||
      !form.email.trim() ||
      !form.position.trim()
    ) {
      return;
    }

    setSaving(true);
    setError("");

    try {
      const response = await fetch("/api/admin/workspace-team", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: selected.id,
          ...form,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to update workspace member.");
      }

      setModal(null);
      setSelected(null);
      showToast("Workspace member updated");
      await loadMembers();
    } catch (submitError) {
      console.error("WORKSPACE TEAM UPDATE ERROR:", submitError);
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to update workspace member."
      );
    } finally {
      setSaving(false);
    }
  }

  async function deleteMember() {
    if (!selected) return;

    setSaving(true);
    setError("");

    try {
      const response = await fetch("/api/admin/workspace-team", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: selected.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to remove workspace member.");
      }

      const removedName = selected.name;
      setModal(null);
      setSelected(null);
      showToast(`${removedName} was removed from the workspace team`);
      await loadMembers();
    } catch (deleteError) {
      console.error("WORKSPACE TEAM DELETE ERROR:", deleteError);
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Unable to remove workspace member."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <main
      className="min-h-screen w-full px-5 py-8 sm:px-8 sm:py-10 xl:px-10"
      style={{
        backgroundColor: "var(--vertex-bg)",
        color: "var(--vertex-text)",
      }}
    >
      <div className="w-full">
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div
              className="mb-2 flex items-center gap-2 text-sm font-medium"
              style={{ color: "var(--vertex-accent)" }}
            >
              <Users className="h-4 w-4" />
              WORKSPACE
            </div>

            <h1 className="text-3xl font-bold tracking-tight">
              Workspace Team
            </h1>

            <p
              className="mt-2 text-sm"
              style={{ color: "var(--vertex-muted)" }}
            >
              Manage your people, departments, positions, workload, and
              operational assignments.
            </p>
          </div>

          <button
            onClick={openInvite}
            className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:brightness-110"
            style={{
              background:
                "linear-gradient(90deg, var(--vertex-accent), var(--vertex-accent-strong))",
            }}
          >
            <UserPlus className="h-4 w-4" />
            Add Team Member
          </button>
        </div>

        {error && (
          <div
            className="mb-6 rounded-2xl border px-5 py-4"
            style={{
              backgroundColor: "rgba(239, 68, 68, 0.08)",
              borderColor: "rgba(248, 113, 113, 0.2)",
            }}
          >
            <p className="text-sm font-medium text-red-300">
              Unable to complete the Workspace Team request.
            </p>
            <p className="mt-1 text-xs text-red-300/70">{error}</p>
          </div>
        )}

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Total Team"
            value={stats.total}
            icon={<Users className="h-5 w-5" />}
          />
          <StatCard
            label="Active Now"
            value={stats.active}
            icon={<UserCheck className="h-5 w-5" />}
          />
          <StatCard
            label="Projects Assigned"
            value={stats.assigned}
            icon={<FolderKanban className="h-5 w-5" />}
          />
          <StatCard
            label="Available Capacity"
            value={stats.available}
            icon={<Gauge className="h-5 w-5" />}
          />
        </div>

        <section
          className="overflow-hidden rounded-2xl border shadow-xl shadow-black/10"
          style={{
            backgroundColor: "var(--vertex-surface)",
            borderColor: "var(--vertex-border)",
          }}
        >
          <div
            className="border-b p-5 sm:p-6"
            style={{ borderColor: "var(--vertex-border)" }}
          >
            <div className="flex flex-col gap-4">
              <div className="relative">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
                  style={{ color: "var(--vertex-muted)" }}
                />

                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search team members, positions, or projects..."
                  className="h-11 w-full rounded-xl border pl-10 pr-4 text-sm outline-none transition"
                  style={{
                    backgroundColor: "var(--vertex-surface-2)",
                    borderColor: "var(--vertex-border)",
                    color: "var(--vertex-text)",
                  }}
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <FilterSelect
                  value={departmentFilter}
                  onChange={(value) =>
                    setDepartmentFilter(value as "All" | Department)
                  }
                  options={["All", ...departments]}
                />

                <FilterSelect
                  value={statusFilter}
                  onChange={(value) =>
                    setStatusFilter(value as "All" | Status)
                  }
                  options={["All", ...statuses]}
                />

                <FilterSelect
                  value={workloadFilter}
                  onChange={(value) =>
                    setWorkloadFilter(value as "All" | Workload)
                  }
                  options={["All", ...workloads]}
                />
              </div>
            </div>
          </div>

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[1100px]">
              <thead>
                <tr
                  className="border-b text-left text-xs uppercase tracking-wider"
                  style={{
                    borderColor: "var(--vertex-border)",
                    color: "var(--vertex-muted)",
                  }}
                >
                  <th className="px-6 py-4 font-medium">Team Member</th>
                  <th className="px-6 py-4 font-medium">Department</th>
                  <th className="px-6 py-4 font-medium">Position</th>
                  <th className="px-6 py-4 font-medium">Project</th>
                  <th className="px-6 py-4 font-medium">Workload</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Last Active</th>
                  <th className="px-6 py-4 text-right font-medium">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-16 text-center">
                      <div
                        className="text-sm"
                        style={{ color: "var(--vertex-muted)" }}
                      >
                        Loading Workspace Team...
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredMembers.map((member) => (
                  <tr
                    key={member.id}
                    className="border-b transition hover:bg-white/[0.02]"
                    style={{ borderColor: "var(--vertex-border)" }}
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 text-xs font-bold text-white ring-1 ring-white/10"
                        >
                          {member.initials}
                        </div>

                        <div>
                          <p className="font-semibold">{member.name}</p>
                          <p
                            className="mt-0.5 text-xs"
                            style={{ color: "var(--vertex-muted)" }}
                          >
                            {member.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${departmentColor(
                          member.department
                        )}`}
                      >
                        {member.department}
                      </span>
                    </td>

                    <td
                      className="px-6 py-5 text-sm"
                      style={{ color: "var(--vertex-text)" }}
                    >
                      {member.position}
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-sm">
                        <BriefcaseBusiness
                          className="h-4 w-4"
                          style={{ color: "var(--vertex-accent)" }}
                        />
                        {member.project}
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${workloadColor(
                          member.workload
                        )}`}
                      >
                        {member.workload}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${statusColor(
                          member.status
                        )}`}
                      >
                        {member.status}
                      </span>
                    </td>

                    <td
                      className="px-6 py-5 text-sm"
                      style={{ color: "var(--vertex-muted)" }}
                    >
                      {member.lastActive}
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex justify-end gap-2">
                        <ActionButton
                          title="Edit workspace member"
                          onClick={() => openEdit(member)}
                        >
                          <Pencil className="h-4 w-4" />
                        </ActionButton>

                        <ActionButton
                          title="Remove workspace member"
                          onClick={() => openDelete(member)}
                          danger
                        >
                          <Trash2 className="h-4 w-4" />
                        </ActionButton>
                      </div>
                    </td>
                  </tr>
                  ))
                )}
              </tbody>
            </table>

            {filteredMembers.length === 0 && <EmptyState />}
          </div>

          <div className="space-y-3 p-4 md:hidden">
            {loading ? (
              <div
                className="px-4 py-12 text-center text-sm"
                style={{ color: "var(--vertex-muted)" }}
              >
                Loading Workspace Team...
              </div>
            ) : (
              filteredMembers.map((member) => (
              <div
                key={member.id}
                className="rounded-xl border p-4"
                style={{
                  backgroundColor: "var(--vertex-surface-2)",
                  borderColor: "var(--vertex-border)",
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 text-xs font-bold text-white ring-1 ring-white/10">
                      {member.initials}
                    </div>

                    <div>
                      <p className="font-semibold">{member.name}</p>
                      <p
                        className="text-xs"
                        style={{ color: "var(--vertex-muted)" }}
                      >
                        {member.email}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => openEdit(member)}
                    className="rounded-lg p-2 transition hover:bg-white/5"
                    style={{ color: "var(--vertex-muted)" }}
                    title="Edit workspace member"
                  >
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-4">
                  <p
                    className="text-sm font-medium"
                    style={{ color: "var(--vertex-text)" }}
                  >
                    {member.position}
                  </p>
                  <p
                    className="mt-1 text-xs"
                    style={{ color: "var(--vertex-muted)" }}
                  >
                    {member.project}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span
                    className={`rounded-full border px-2.5 py-1 text-xs ${departmentColor(
                      member.department
                    )}`}
                  >
                    {member.department}
                  </span>

                  <span
                    className={`rounded-full border px-2.5 py-1 text-xs ${workloadColor(
                      member.workload
                    )}`}
                  >
                    {member.workload}
                  </span>

                  <span
                    className={`rounded-full border px-2.5 py-1 text-xs ${statusColor(
                      member.status
                    )}`}
                  >
                    {member.status}
                  </span>
                </div>

                <div
                  className="mt-4 flex items-center justify-between border-t pt-3"
                  style={{ borderColor: "var(--vertex-border)" }}
                >
                  <span
                    className="text-xs"
                    style={{ color: "var(--vertex-muted)" }}
                  >
                    Last active: {member.lastActive}
                  </span>

                  <button
                    onClick={() => openDelete(member)}
                    className="rounded-lg p-2 text-red-400 transition hover:bg-red-400/10"
                    title="Remove workspace member"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              ))
            )}

            {!loading && filteredMembers.length === 0 && <EmptyState />}
          </div>
        </section>
      </div>

      {modal === "invite" && (
        <MemberModal
          title="Add Workspace Team Member"
          description="Add an existing Vertex user to the operational workspace team. New users are invited through Admin Team first."
          submitLabel="Add to Workspace"
          form={form}
          setForm={setForm}
          onClose={() => setModal(null)}
          onSubmit={inviteMember}
        />
      )}

      {modal === "edit" && selected && (
        <MemberModal
          title="Edit Workspace Member"
          description="Update this member's workspace role, workload, and assignment."
          submitLabel="Save Changes"
          form={form}
          setForm={setForm}
          onClose={() => setModal(null)}
          onSubmit={saveEdit}
          editing
        />
      )}

      {modal === "delete" && selected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div
            className="w-full max-w-md rounded-2xl border p-6 shadow-2xl"
            style={{
              backgroundColor: "var(--vertex-surface)",
              borderColor: "var(--vertex-border)",
            }}
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
              <Trash2 className="h-5 w-5" />
            </div>

            <h2 className="text-xl font-bold">
              Remove workspace member?
            </h2>

            <p
              className="mt-2 text-sm leading-6"
              style={{ color: "var(--vertex-muted)" }}
            >
              This will remove{" "}
              <span className="font-medium">{selected.name}</span>{" "}
              from the Vertex workspace team. Their system access is a
              separate concern managed through Admin Team.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setModal(null)}
                className="rounded-xl border px-4 py-2.5 text-sm font-medium transition hover:bg-white/5"
                style={{
                  borderColor: "var(--vertex-border)",
                  color: "var(--vertex-muted)",
                }}
              >
                Cancel
              </button>

              <button
                onClick={deleteMember}
                disabled={saving}
                className="rounded-xl bg-red-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-400"
              >
                Remove Member
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div
          className="fixed bottom-6 right-6 z-[110] flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium shadow-2xl"
          style={{
            backgroundColor: "var(--vertex-surface)",
            borderColor: "rgba(52, 211, 153, 0.2)",
            color: "#6ee7b7",
          }}
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/10">
            <Check className="h-3.5 w-3.5" />
          </span>
          {toast}
        </div>
      )}
    </main>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div
      className="rounded-2xl border p-5 shadow-xl shadow-black/10"
      style={{
        backgroundColor: "var(--vertex-surface)",
        borderColor: "var(--vertex-border)",
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p
            className="text-sm"
            style={{ color: "var(--vertex-muted)" }}
          >
            {label}
          </p>
          <p className="mt-2 text-3xl font-bold tracking-tight">
            {value}
          </p>
        </div>

        <div
          className="rounded-xl p-3"
          style={{
            backgroundColor: "var(--vertex-accent-soft)",
            color: "var(--vertex-accent)",
          }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

function FilterSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="h-10 min-w-[130px] appearance-none rounded-xl border px-3 text-sm outline-none transition"
      style={{
        backgroundColor: "var(--vertex-surface-2)",
        borderColor: "var(--vertex-border)",
        color: "var(--vertex-text)",
        colorScheme: "dark",
      }}
    >
      {options.map((option) => (
        <option
          key={option}
          value={option}
          style={{
            backgroundColor: "var(--vertex-surface)",
            color: "var(--vertex-text)",
          }}
        >
          {option}
        </option>
      ))}
    </select>
  );
}

function ActionButton({
  children,
  title,
  onClick,
  danger = false,
}: {
  children: React.ReactNode;
  title: string;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg border p-2 transition ${
        danger
          ? "hover:border-red-400/20 hover:bg-red-400/10 hover:text-red-300"
          : "hover:border-cyan-400/20 hover:bg-cyan-400/10 hover:text-cyan-300"
      }`}
      style={{
        borderColor: "var(--vertex-border)",
        color: "var(--vertex-muted)",
      }}
      title={title}
    >
      {children}
    </button>
  );
}

function MemberModal({
  title,
  description,
  submitLabel,
  form,
  setForm,
  onClose,
  onSubmit,
  editing = false,
  submitting = false,
}: {
  title: string;
  description: string;
  submitLabel: string;
  form: {
    name: string;
    email: string;
    department: Department;
    position: string;
    workload: Workload;
    project: string;
  };
  setForm: React.Dispatch<
    React.SetStateAction<{
      name: string;
      email: string;
      department: Department;
      position: string;
      workload: Workload;
      project: string;
    }>
  >;
  onClose: () => void;
  onSubmit: () => void;
  editing?: boolean;
  submitting?: boolean;
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div
        className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border shadow-2xl"
        style={{
          backgroundColor: "var(--vertex-surface)",
          borderColor: "var(--vertex-border)",
        }}
      >
        <div
          className="flex items-start justify-between border-b p-6"
          style={{ borderColor: "var(--vertex-border)" }}
        >
          <div>
            <h2 className="text-xl font-bold">{title}</h2>
            <p
              className="mt-1 text-sm"
              style={{ color: "var(--vertex-muted)" }}
            >
              {description}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-white/5"
            style={{ color: "var(--vertex-muted)" }}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-5 p-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Full Name">
              <input
                value={form.name}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    name: event.target.value,
                  }))
                }
                placeholder="e.g. Alex Morgan"
                className={inputClass}
              />
            </Field>

            <Field label="Email Address">
              <input
                type="email"
                value={form.email}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    email: event.target.value,
                  }))
                }
                placeholder="existing-user@example.com"
                className={inputClass}
              />
            </Field>
          </div>

          <Field label="Department">
            <select
              value={form.department}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  department: event.target.value as Department,
                }))
              }
              className={inputClass}
              style={{
                backgroundColor: "var(--vertex-surface-2)",
                borderColor: "var(--vertex-border)",
                color: "var(--vertex-text)",
                colorScheme: "dark",
              }}
            >
              {departments.map((department) => (
                <option
                  key={department}
                  value={department}
                  style={{
                    backgroundColor: "var(--vertex-surface)",
                    color: "var(--vertex-text)",
                  }}
                >
                  {department}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Position">
            <input
              value={form.position}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  position: event.target.value,
                }))
              }
              placeholder="e.g. Front-End Developer"
              className={inputClass}
            />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Workload">
              <select
                value={form.workload}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    workload: event.target.value as Workload,
                  }))
                }
                className={inputClass}
                style={{
                  backgroundColor: "var(--vertex-surface-2)",
                  borderColor: "var(--vertex-border)",
                  color: "var(--vertex-text)",
                  colorScheme: "dark",
                }}
              >
                {workloads.map((workload) => (
                  <option
                    key={workload}
                    value={workload}
                    style={{
                      backgroundColor: "var(--vertex-surface)",
                      color: "var(--vertex-text)",
                    }}
                  >
                    {workload}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Current Project">
              <input
                value={form.project}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    project: event.target.value,
                  }))
                }
                placeholder="e.g. BrightSmile Dental"
                className={inputClass}
              />
            </Field>
          </div>

          {editing && (
            <div
              className="rounded-xl border p-4 text-sm"
              style={{
                borderColor: "var(--vertex-border)",
                backgroundColor: "var(--vertex-surface-2)",
                color: "var(--vertex-muted)",
              }}
            >
              <p className="font-medium" style={{ color: "var(--vertex-text)" }}>
                Workspace profile
              </p>
              <p className="mt-1">
                Department, position, project, and workload belong to the
                workspace team. System access and permissions are managed
                separately in Admin Team.
              </p>
            </div>
          )}
        </div>

        <div
          className="flex justify-end gap-3 border-t p-6"
          style={{ borderColor: "var(--vertex-border)" }}
        >
          <button
            onClick={onClose}
            className="rounded-xl border px-4 py-2.5 text-sm font-medium transition hover:bg-white/5"
            style={{
              borderColor: "var(--vertex-border)",
              color: "var(--vertex-muted)",
            }}
          >
            Cancel
          </button>

          <button
            onClick={onSubmit}
            disabled={
              !form.name.trim() ||
              !form.email.trim() ||
              !form.position.trim() || submitting
            }
            className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
            style={{
              background:
                "linear-gradient(90deg, var(--vertex-accent), var(--vertex-accent-strong))",
            }}
          >
            {submitting ? "Saving..." : submitLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span
        className="mb-2 block text-sm font-medium"
        style={{ color: "var(--vertex-text)" }}
      >
        {label}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "h-11 w-full rounded-xl border px-3 text-sm outline-none transition placeholder:text-slate-600";

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div
        className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
        style={{
          backgroundColor: "var(--vertex-accent-soft)",
          color: "var(--vertex-muted)",
        }}
      >
        <Users className="h-5 w-5" />
      </div>

      <p className="font-semibold">No workspace members found</p>

      <p
        className="mt-1 text-sm"
        style={{ color: "var(--vertex-muted)" }}
      >
        Try changing your search or filters.
      </p>
    </div>
  );
}
