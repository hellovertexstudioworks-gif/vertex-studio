// FILE: app/admin/admin-team/page.tsx
// PURPOSE: Vertex Studio Works — Admin Team / System Access
// NOTE: Separate from /admin/team (Workspace / Operational Team). Role permissions are read from Settings.

"use client";

import { useEffect, useMemo, useState } from "react";
import { useVertexTheme, type VertexTheme } from "./../components/VertexThemeProvider";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();
import {
  UserPlus,
  Search,
  MoreHorizontal,
  Pencil,
  Trash2,
  ShieldCheck,
  Users,
  UserCheck,
  Clock3,
  Palette,
  X,
  Check,
} from "lucide-react";

type Role = "Owner" | "Admin" | "Manager" | "Staff";
type Status = "Active" | "Pending" | "Inactive";

type PermissionKey =
  | "workspaceTeam"
  | "projects"
  | "tasks"
  | "leadsClients"
  | "salesOutreach"
  | "finance"
  | "analytics"
  | "settings"
  | "adminTeam";

type RolePermissions = Record<Role, Record<PermissionKey, boolean>>;

const DEFAULT_ROLE_PERMISSIONS: RolePermissions = {
  Owner: {
    workspaceTeam: true,
    projects: true,
    tasks: true,
    leadsClients: true,
    salesOutreach: true,
    finance: true,
    analytics: true,
    settings: true,
    adminTeam: true,
  },
  Admin: {
    workspaceTeam: true,
    projects: true,
    tasks: true,
    leadsClients: true,
    salesOutreach: true,
    finance: true,
    analytics: true,
    settings: true,
    adminTeam: false,
  },
  Manager: {
    workspaceTeam: true,
    projects: true,
    tasks: true,
    leadsClients: true,
    salesOutreach: true,
    finance: false,
    analytics: true,
    settings: true,
    adminTeam: false,
  },
  Staff: {
    workspaceTeam: true,
    projects: true,
    tasks: true,
    leadsClients: false,
    salesOutreach: false,
    finance: false,
    analytics: false,
    settings: false,
    adminTeam: false,
  },
};

const PERMISSION_LABELS: Array<{ key: PermissionKey; label: string; description: string }> = [
  { key: "workspaceTeam", label: "Workspace Team", description: "View and manage operational team members." },
  { key: "projects", label: "Projects", description: "Access project workspace and assignments." },
  { key: "tasks", label: "Tasks", description: "Access and manage operational tasks." },
  { key: "leadsClients", label: "Leads & Clients", description: "Access lead and client records." },
  { key: "salesOutreach", label: "Sales & Outreach", description: "Access prospects, outreach, deals and proposals." },
  { key: "finance", label: "Finance", description: "Access invoices, payments and contracts." },
  { key: "analytics", label: "Analytics", description: "View business and performance analytics." },
  { key: "settings", label: "Settings", description: "Access configurable workspace settings." },
  { key: "adminTeam", label: "Admin Team", description: "Manage system users, roles and system access." },
];

function mapSupabasePermissions(
  row: { role: Role; permissions: Record<string, boolean> }
): Record<PermissionKey, boolean> {
  const permissions = row.permissions ?? {};

  return {
    workspaceTeam: Boolean(permissions.workspace || permissions.team),
    projects: Boolean(permissions.projects),
    tasks: Boolean(permissions.tasks),
    leadsClients: Boolean(permissions.leads),
    salesOutreach: Boolean(permissions.sales),
    finance: Boolean(permissions.finance),
    analytics: Boolean(permissions.analytics),
    settings: Boolean(permissions.settings),
    adminTeam: Boolean(permissions.adminTeam),
  };
}

type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: Status;
  theme: string;
  joined: string;
  lastActive: string;
  initials: string;
};

const themeOptions = [
  { name: "Blue", className: "bg-blue-500", ring: "ring-blue-400" },
  { name: "Purple", className: "bg-violet-500", ring: "ring-violet-400" },
  { name: "Red", className: "bg-red-500", ring: "ring-red-400" },
  { name: "Green", className: "bg-emerald-500", ring: "ring-emerald-400" },
  { name: "Orange", className: "bg-orange-500", ring: "ring-orange-400" },
  { name: "Cyan", className: "bg-cyan-500", ring: "ring-cyan-400" },
  { name: "Light", className: "bg-white border border-slate-300", ring: "ring-slate-300" },
  { name: "Dark", className: "bg-slate-800", ring: "ring-slate-500" },
];

function themeColor(theme: string) {
  return (
    themeOptions.find((item) => item.name === theme) ?? {
      name: theme,
      className: "bg-blue-500",
      ring: "ring-blue-400",
    }
  );
}

function roleColor(role: Role) {
  if (role === "Owner") return "border-violet-400/20 bg-violet-400/10 text-violet-300";
  if (role === "Admin") return "border-blue-400/20 bg-blue-400/10 text-blue-300";
  if (role === "Manager") return "border-cyan-400/20 bg-cyan-400/10 text-cyan-300";
  return "border-emerald-400/20 bg-emerald-400/10 text-emerald-300";
}

function statusColor(status: Status) {
  if (status === "Active") return "border-emerald-400/20 bg-emerald-400/10 text-emerald-300";
  if (status === "Pending") return "border-amber-400/20 bg-amber-400/10 text-amber-300";
  return "border-slate-400/20 bg-slate-400/10 text-slate-300";
}

export default function AdminTeamPage() {
  const { theme: currentTheme, setTheme } = useVertexTheme();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loadingMembers, setLoadingMembers] = useState(true);
  const [dataError, setDataError] = useState("");
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"All" | Role>("All");
  const [statusFilter, setStatusFilter] = useState<"All" | Status>("All");
  const [themeFilter, setThemeFilter] = useState("All");
  const [modal, setModal] = useState<"invite" | "edit" | "delete" | null>(null);
  const [selected, setSelected] = useState<TeamMember | null>(null);
  const [toast, setToast] = useState("");
  const [inviteSending, setInviteSending] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Staff" as Role,
    theme: "Blue",
  });

  const filteredMembers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return members.filter((member) => {
      const matchesSearch =
        !query ||
        member.name.toLowerCase().includes(query) ||
        member.email.toLowerCase().includes(query);

      const matchesRole = roleFilter === "All" || member.role === roleFilter;
      const matchesStatus =
        statusFilter === "All" || member.status === statusFilter;
      const matchesTheme =
        themeFilter === "All" || member.theme === themeFilter;

      return matchesSearch && matchesRole && matchesStatus && matchesTheme;
    });
  }, [members, search, roleFilter, statusFilter, themeFilter]);

  const currentUserTheme = currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1);
  const [rolePermissions, setRolePermissions] = useState<RolePermissions>(DEFAULT_ROLE_PERMISSIONS);

  useEffect(() => {
    let cancelled = false;

    async function loadRolePermissionsFromSupabase() {
      const { data, error } = await supabase
        .from("role_permissions")
        .select("role, permissions");

      if (cancelled) return;

      if (error) {
        console.error("Admin Team role permissions lookup failed:", error);
        setRolePermissions(DEFAULT_ROLE_PERMISSIONS);
        return;
      }

      const nextPermissions: RolePermissions = {
        ...DEFAULT_ROLE_PERMISSIONS,
      };

      for (const row of data ?? []) {
        const role = row.role as Role;

        if (role in nextPermissions) {
          nextPermissions[role] = mapSupabasePermissions({
            role,
            permissions: (row.permissions ?? {}) as Record<string, boolean>,
          });
        }
      }

      setRolePermissions(nextPermissions);
    }

    void loadRolePermissionsFromSupabase();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadMembers() {
      setLoadingMembers(true);
      setDataError("");

      try {
        const response = await fetch("/api/admin/team", {
          method: "GET",
          cache: "no-store",
        });

        const result = await response.json().catch(() => null);

        if (!response.ok || !result?.ok) {
          throw new Error(result?.error || "Unable to load admin users.");
        }

        if (!cancelled) {
          setMembers(result.members ?? []);
        }
      } catch (error) {
        console.error("Admin Team member lookup failed:", error);

        if (!cancelled) {
          setDataError(
            error instanceof Error
              ? error.message
              : "Unable to load admin users."
          );
        }
      } finally {
        if (!cancelled) {
          setLoadingMembers(false);
        }
      }
    }

    void loadMembers();

    return () => {
      cancelled = true;
    };
  }, []);

  const stats = {
    total: members.length,
    active: members.filter((member) => member.status === "Active").length,
    pending: members.filter((member) => member.status === "Pending").length,
    managers: members.filter((member) => member.role === "Manager").length,
  };

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  }

  function openInvite() {
    setForm({
      name: "",
      email: "",
      role: "Staff",
      theme: "Blue",
    });
    setModal("invite");
  }

  function openEdit(member: TeamMember) {
    setSelected(member);
    setForm({
      name: member.name,
      email: member.email,
      role: member.role,
      theme: member.theme,
    });
    setModal("edit");
  }

  function openDelete(member: TeamMember) {
    setSelected(member);
    setModal("delete");
  }

  async function inviteMember() {
    if (!form.name.trim() || !form.email.trim() || inviteSending) return;

    setInviteSending(true);

    try {
      const response = await fetch("/api/admin/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          role: form.role,
          theme: form.theme,
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.ok) {
        throw new Error(result?.error || "Unable to send the invitation.");
      }

      setModal(null);
      showToast("Invitation sent successfully");

      const refresh = await fetch("/api/admin/team", {
        method: "GET",
        cache: "no-store",
      });

      const refreshed = await refresh.json().catch(() => null);

      if (refresh.ok && refreshed?.ok) {
        setMembers(refreshed.members ?? []);
      }
    } catch (error) {
      console.error("Admin invitation failed:", error);
      showToast(
        error instanceof Error
          ? error.message
          : "Unable to send the invitation."
      );
    } finally {
      setInviteSending(false);
    }
  }

  async function saveEdit() {
    if (!selected || !form.name.trim() || !form.email.trim()) return;

    try {
      const response = await fetch("/api/admin/team", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selected.id,
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          role: form.role,
          theme: form.theme,
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.ok) {
        throw new Error(result?.error || "Unable to update this admin user.");
      }

      setMembers((current) =>
        current.map((member) =>
          member.id === selected.id ? result.member : member
        )
      );

      if (
        selected.email === "hello.vertexstudioworks@gmail.com" ||
        selected.id === result.member.id
      ) {
        if (result.member.email === "hello.vertexstudioworks@gmail.com") {
          setTheme(result.member.theme.toLowerCase() as VertexTheme);
        }
      }

      setModal(null);
      showToast("Team member updated");
    } catch (error) {
      console.error("Admin Team update failed:", error);
      showToast(
        error instanceof Error
          ? error.message
          : "Unable to update this admin user."
      );
    }
  }

  async function deleteMember() {
    if (!selected) return;

    try {
      const response = await fetch(
        `/api/admin/team?id=${encodeURIComponent(selected.id)}`,
        { method: "DELETE" }
      );

      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.ok) {
        throw new Error(result?.error || "Unable to remove this admin user.");
      }

      setMembers((current) =>
        current.filter((member) => member.id !== selected.id)
      );
      setModal(null);
      showToast(`${selected.name} was removed from the team`);
      setSelected(null);
    } catch (error) {
      console.error("Admin Team removal failed:", error);
      showToast(
        error instanceof Error
          ? error.message
          : "Unable to remove this admin user."
      );
    }
  }

  return (
    <main className="min-h-screen w-full px-5 py-8 text-[var(--vertex-text)] transition-colors duration-300 sm:px-8 sm:py-10 xl:px-10" style={{ backgroundColor: "var(--vertex-bg)" }}>
      <div className="w-full">
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-cyan-400">
              <Users className="h-4 w-4" />
              SYSTEM
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Team</h1>
            <p className="mt-2 text-sm text-slate-400">
              Manage system access, roles, permissions, and personal admin themes.
            </p>
          </div>

          <button
            onClick={openInvite}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/10 transition hover:brightness-110"
          >
            <UserPlus className="h-4 w-4" />
            Invite Member
          </button>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Total Members"
            value={stats.total}
            icon={<Users className="h-5 w-5" />}
            iconClass="bg-cyan-500/10 text-cyan-400"
          />
          <StatCard
            label="Active"
            value={stats.active}
            icon={<UserCheck className="h-5 w-5" />}
            iconClass="bg-emerald-500/10 text-emerald-400"
          />
          <StatCard
            label="Pending Invitations"
            value={stats.pending}
            icon={<Clock3 className="h-5 w-5" />}
            iconClass="bg-amber-500/10 text-amber-400"
          />
          <StatCard
            label="Managers"
            value={stats.managers}
            icon={<ShieldCheck className="h-5 w-5" />}
            iconClass="bg-violet-500/10 text-violet-400"
          />
        </div>

        {dataError && (
          <div className="mb-5 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">
            {dataError}
          </div>
        )}

        {loadingMembers ? (
          <section className="rounded-2xl border p-10 text-center" style={{ backgroundColor: "var(--vertex-surface)", borderColor: "var(--vertex-border)" }}>
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-cyan-400/20 border-t-cyan-400" />
            <p className="mt-4 text-sm text-slate-400">Loading admin users...</p>
          </section>
        ) : (
        <section className="rounded-2xl border shadow-xl shadow-black/10 transition-colors duration-300" style={{ backgroundColor: "var(--vertex-surface)", borderColor: "var(--vertex-border)" }}>
          <div className="border-b border-white/10 p-5 sm:p-6">
            <div className="flex flex-col gap-4">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search team members..."
                  className="h-11 w-full rounded-xl border border-white/10  pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/40"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <FilterSelect
                  value={roleFilter}
                  onChange={(value) => setRoleFilter(value as "All" | Role)}
                  options={["All", "Owner", "Admin", "Manager", "Staff"]}
                />
                <FilterSelect
                  value={statusFilter}
                  onChange={(value) => setStatusFilter(value as "All" | Status)}
                  options={["All", "Active", "Pending", "Inactive"]}
                />
                <FilterSelect
                  value={themeFilter}
                  onChange={setThemeFilter}
                  options={["All", ...themeOptions.map((theme) => theme.name)]}
                  icon={<Palette className="h-3.5 w-3.5" />}
                />
              </div>
            </div>
          </div>

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-6 py-4 font-medium">Member</th>
                  <th className="px-6 py-4 font-medium">Role</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Theme</th>
                  <th className="px-6 py-4 font-medium">Last Active</th>
                  <th className="px-6 py-4 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member) => {
                  const displayTheme = member.email === "hello.vertexstudioworks@gmail.com" ? currentUserTheme : member.theme;
                  const color = themeColor(displayTheme);

                  return (
                    <tr
                      key={member.id}
                      className="border-b border-white/5 transition hover:bg-white/[0.02]"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 text-xs font-bold text-white ring-1 ring-white/10">
                            {member.initials}
                          </div>
                          <div>
                            <p className="font-semibold text-white">
                              {member.name}
                            </p>
                            <p className="mt-0.5 text-xs text-slate-500">
                              {member.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${roleColor(
                            member.role
                          )}`}
                        >
                          {member.role}
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
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <span
                            className={`h-4 w-4 rounded-full ${color.className} ring-2 ${color.ring} ring-offset-2 ring-offset-transparent`}
                          />
                          <span className="text-sm text-slate-300">
                            {displayTheme}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm text-slate-400">
                        {member.lastActive}
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => openEdit(member)}
                            className="rounded-lg border border-white/10 bg-white/[0.03] p-2 text-slate-400 transition hover:border-cyan-400/20 hover:bg-cyan-400/10 hover:text-cyan-300"
                            title="Edit member"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          {member.role !== "Owner" && (
                            <button
                              onClick={() => openDelete(member)}
                              className="rounded-lg border border-white/10 bg-white/[0.03] p-2 text-slate-400 transition hover:border-red-400/20 hover:bg-red-400/10 hover:text-red-300"
                              title="Remove member"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {filteredMembers.length === 0 && (
              <EmptyState />
            )}
          </div>

          <div className="space-y-3 p-4 md:hidden">
            {filteredMembers.map((member) => {
              const displayTheme = member.email === "hello.vertexstudioworks@gmail.com" ? currentUserTheme : member.theme;
                  const color = themeColor(displayTheme);

              return (
                <div
                  key={member.id}
                  className="rounded-xl border border-white/10  p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 text-xs font-bold ring-1 ring-white/10">
                        {member.initials}
                      </div>
                      <div>
                        <p className="font-semibold">{member.name}</p>
                        <p className="text-xs text-[var(--vertex-muted)]">{member.email}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => openEdit(member)}
                      className="rounded-lg p-2 text-slate-500 hover:bg-white/5 hover:text-white"
                    >
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span
                      className={`rounded-full border px-2.5 py-1 text-xs ${roleColor(
                        member.role
                      )}`}
                    >
                      {member.role}
                    </span>
                    <span
                      className={`rounded-full border px-2.5 py-1 text-xs ${statusColor(
                        member.status
                      )}`}
                    >
                      {member.status}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <span
                        className={`h-3.5 w-3.5 rounded-full ${color.className}`}
                      />
                      {member.theme}
                    </div>
                    <span className="text-xs text-[var(--vertex-muted)]">
                      {member.lastActive}
                    </span>
                  </div>
                </div>
              );
            })}

            {filteredMembers.length === 0 && <EmptyState />}
          </div>
        </section>
        )}
      </div>

      {modal === "invite" && (
        <MemberModal
          title="Invite Admin User"
          description="Send an invitation and set their starting system role and personal admin theme."
          submitLabel="Send Invitation"
          form={form}
          setForm={setForm}
          onClose={() => setModal(null)}
          onSubmit={inviteMember}
          rolePermissions={rolePermissions}
          inviteSending={inviteSending}
        />
      )}

      {modal === "edit" && selected && (
        <MemberModal
          title="Edit Admin User"
          description="Update this user's system role and personal admin theme."
          submitLabel="Save Changes"
          form={form}
          setForm={setForm}
          onClose={() => setModal(null)}
          onSubmit={saveEdit}
          editing
          rolePermissions={rolePermissions}
        />
      )}

      {modal === "delete" && selected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-white/10  p-6 shadow-2xl">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
              <Trash2 className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold">Remove admin user?</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              This will remove{" "}
              <span className="font-medium text-white">{selected.name}</span>{" "}
              from Vertex system access. Their authentication account and
              system profile will be removed.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setModal(null)}
                className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/5"
              >
                Cancel
              </button>
              <button
                onClick={deleteMember}
                className="rounded-xl bg-red-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-400"
              >
                Remove Admin User
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 right-6 z-[110] flex items-center gap-3 rounded-xl border border-emerald-400/20 px-4 py-3 text-sm font-medium text-emerald-300 shadow-2xl" style={{ backgroundColor: "var(--vertex-surface)" }}>
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
  iconClass,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  iconClass: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10  p-5 shadow-xl shadow-black/10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400">{label}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight">{value}</p>
        </div>
        <div className={`rounded-xl p-3 ${iconClass}`}>{icon}</div>
      </div>
    </div>
  );
}

function FilterSelect({
  value,
  onChange,
  options,
  icon,
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  icon?: React.ReactNode;
}) {
  return (
    <div className="relative">
      {icon && (
        <span className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-slate-500">
          {icon}
        </span>
      )}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`h-10 appearance-none rounded-xl border border-white/10  pr-9 text-sm text-slate-300 outline-none transition focus:border-cyan-400/40 ${
          icon ? "pl-9" : "pl-3"
        }`}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
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
  rolePermissions,
  inviteSending = false,
}: {
  title: string;
  description: string;
  submitLabel: string;
  form: {
    name: string;
    email: string;
    role: Role;
    theme: string;
  };
  setForm: React.Dispatch<
    React.SetStateAction<{
      name: string;
      email: string;
      role: Role;
      theme: string;
    }>
  >;
  onClose: () => void;
  onSubmit: () => void;
  editing?: boolean;
  rolePermissions: RolePermissions;
  inviteSending?: boolean;
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border shadow-2xl" style={{ backgroundColor: "var(--vertex-surface)", borderColor: "var(--vertex-border)", color: "var(--vertex-text)" }}>
        <div className="flex items-start justify-between border-b p-6" style={{ borderColor: "var(--vertex-border)" }}>
          <div>
            <h2 className="text-xl font-bold">{title}</h2>
            <p className="mt-1 text-sm text-slate-400">{description}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-white/5 hover:text-white"
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
                placeholder="alex@example.com"
                className={inputClass}
              />
            </Field>
          </div>

          <Field label="Role">
            <select
              value={form.role}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  role: event.target.value as Role,
                }))
              }
              className={inputClass}
              style={{ colorScheme: "dark", backgroundColor: "var(--vertex-surface-2)", color: "var(--vertex-text)" }}
            >
              <option value="Admin" style={{ backgroundColor: "#0b1020", color: "#ffffff" }}>Admin</option>
              <option value="Manager" style={{ backgroundColor: "#0b1020", color: "#ffffff" }}>Manager</option>
              <option value="Staff" style={{ backgroundColor: "#0b1020", color: "#ffffff" }}>Staff</option>
              {editing && <option value="Owner" style={{ backgroundColor: "#0b1020", color: "#ffffff" }}>Owner</option>}
            </select>
          </Field>

          <div className="rounded-2xl border p-4" style={{ borderColor: "var(--vertex-border)", backgroundColor: "var(--vertex-surface-2)" }}>
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold">Role Permissions</p>
                <p className="mt-1 text-xs text-slate-500">
                  These permissions come from Settings → Roles & Permissions.
                  Change them there to update the role.
                </p>
              </div>
              <ShieldCheck className="h-4 w-4 shrink-0" style={{ color: "var(--vertex-accent)" }} />
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              {PERMISSION_LABELS.map((permission) => {
                const enabled =
                  form.role === "Owner"
                    ? true
                    : Boolean(rolePermissions[form.role]?.[permission.key]);

                return (
                  <div
                    key={permission.key}
                    className="flex items-start gap-3 rounded-xl border p-3"
                    style={{
                      borderColor: "var(--vertex-border)",
                      backgroundColor: enabled
                        ? "color-mix(in srgb, var(--vertex-accent-soft) 55%, var(--vertex-surface-2))"
                        : "var(--vertex-surface-2)",
                    }}
                  >
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                        enabled ? "bg-emerald-500/15 text-emerald-300" : "bg-white/5 text-slate-600"
                      }`}
                    >
                      {enabled ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                    </span>
                    <div className="min-w-0">
                      <p className={`text-xs font-medium ${enabled ? "text-[var(--vertex-text)]" : "text-[var(--vertex-muted)]"}`}>
                        {permission.label}
                      </p>
                      <p className="mt-0.5 text-[10px] leading-4 text-[var(--vertex-muted)]">
                        {permission.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {form.role === "Owner" && (
              <p className="mt-3 text-[11px] text-violet-300/80">
                Owner has full system access and cannot have permissions reduced here.
              </p>
            )}
          </div>

          <div>
            <div className="mb-3 flex items-center gap-2">
              <Palette className="h-4 w-4 text-cyan-400" />
              <div>
                <p className="text-sm font-medium text-[var(--vertex-text)]">
                  Personal Admin Theme
                </p>
                <p className="text-xs text-[var(--vertex-muted)]">
                  This only affects this user's interface.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3 sm:grid-cols-8">
              {themeOptions.map((theme) => {
                const active = form.theme === theme.name;

                return (
                  <button
                    key={theme.name}
                    type="button"
                    onClick={() =>
                      setForm((current) => ({
                        ...current,
                        theme: theme.name,
                      }))
                    }
                    className="group flex flex-col items-center gap-2"
                    title={theme.name}
                  >
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        theme.className
                      } ${
                        active
                          ? `ring-2 ${theme.ring} ring-offset-2 ring-offset-transparent`
                          : "ring-1 ring-white/10"
                      }`}
                    >
                      {active && (
                        <Check
                          className={`h-4 w-4 ${
                            theme.name === "Light" ? "text-slate-700" : "text-white"
                          }`}
                        />
                      )}
                    </span>
                    <span className="text-[11px] text-[var(--vertex-muted)] group-hover:text-[var(--vertex-text)]">
                      {theme.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t p-6" style={{ borderColor: "var(--vertex-border)" }}>
          <button
            onClick={onClose}
            className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/5"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            disabled={
              !form.name.trim() ||
              !form.email.trim() ||
              (submitLabel === "Send Invitation" && inviteSending)
            }
            className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitLabel === "Send Invitation" && inviteSending
              ? "Sending..."
              : submitLabel}
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
      <span className="mb-2 block text-sm font-medium text-slate-300">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "h-11 w-full rounded-xl border border-white/10  px-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/40";

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-slate-500">
        <Users className="h-5 w-5" />
      </div>
      <p className="font-semibold text-white">No team members found</p>
      <p className="mt-1 text-sm text-slate-500">
        Try changing your search or filters.
      </p>
    </div>
  );
}
