"use client";

// FILE: app/admin/settings/page.tsx
// PURPOSE: Vertex Admin — Workspace Settings + Role Permission Controls
// NOTE: Role permissions are loaded from and saved to Supabase. Local storage is retained only for workspace UI preferences.

import {
  Bell,
  Check,
  Globe,
  LogOut,
  Mail,
  Save,
  Settings,
  Users,
  Shield,
  FolderKanban,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type SettingsData = {
  businessName: string;
  contactEmail: string;
  website: string;
  timezone: string;
};

type Role = "Owner" | "Admin" | "Manager" | "Staff";

type PermissionKey =
  | "workspace"
  | "team"
  | "projects"
  | "tasks"
  | "leads"
  | "sales"
  | "finance"
  | "analytics"
  | "settings"
  | "adminTeam";

type PermissionDefinition = {
  key: PermissionKey;
  label: string;
  description: string;
};

type RolePermissions = Record<PermissionKey, boolean>;
type PermissionsMap = Record<Role, RolePermissions>;

const permissionDefinitions: PermissionDefinition[] = [
  {
    key: "workspace",
    label: "Workspace Settings",
    description: "Manage workspace information, business details, and general configuration.",
  },
  {
    key: "team",
    label: "Workspace Team",
    description: "Manage operational team members, departments, positions, and workload assignments.",
  },
  {
    key: "projects",
    label: "Projects",
    description: "Create, edit, assign, and manage workspace projects.",
  },
  {
    key: "tasks",
    label: "Tasks",
    description: "Create, assign, update, and manage operational tasks.",
  },
  {
    key: "leads",
    label: "Leads & Clients",
    description: "Manage incoming leads, clients, and related workspace records.",
  },
  {
    key: "sales",
    label: "Sales & Outreach",
    description: "Manage prospects, outreach, deals, and proposals.",
  },
  {
    key: "finance",
    label: "Finance",
    description: "Manage invoices, payments, and contracts.",
  },
  {
    key: "analytics",
    label: "Analytics",
    description: "View business, website, and workspace analytics.",
  },
  {
    key: "settings",
    label: "Settings",
    description: "Access administrative settings and configurable workspace controls.",
  },
  {
    key: "adminTeam",
    label: "Admin Team / System Access",
    description: "Manage system roles, permissions, admin users, and system-level access.",
  },
];

const defaultPermissions: PermissionsMap = {
  Owner: {
    workspace: true, team: true, projects: true, tasks: true, leads: true,
    sales: true, finance: true, analytics: true, settings: true, adminTeam: true,
  },
  Admin: {
    workspace: true, team: true, projects: true, tasks: true, leads: true,
    sales: true, finance: true, analytics: true, settings: true, adminTeam: false,
  },
  Manager: {
    workspace: false, team: true, projects: true, tasks: true, leads: true,
    sales: true, finance: false, analytics: true, settings: true, adminTeam: false,
  },
  Staff: {
    workspace: false, team: false, projects: false, tasks: true, leads: false,
    sales: false, finance: false, analytics: false, settings: false, adminTeam: false,
  },
};

const defaultSettings: SettingsData = {
  businessName: "Vertex Studio",
  contactEmail: "hello.vertexstudioworks@gmail.com",
  website: "https://www.vertexstudioworks.com",
  timezone: "Asia/Manila",
};

export default function SettingsPage() {
  const router = useRouter();
  const supabase = createClient();

  const [settings, setSettings] =
    useState<SettingsData>(defaultSettings);

  const [notifications, setNotifications] = useState(true);
  const [permissions, setPermissions] = useState<PermissionsMap>(defaultPermissions);
  const [selectedRole, setSelectedRole] = useState<Role>("Admin");
  const [saved, setSaved] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [permissionsLoading, setPermissionsLoading] = useState(true);
  const [permissionsSaving, setPermissionsSaving] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem(
        "vertex-studio-settings"
      );

      const savedNotifications = localStorage.getItem(
        "vertex-studio-notifications"
      );

      if (savedSettings) {
        setSettings({
          ...defaultSettings,
          ...JSON.parse(savedSettings),
        });
      }

      if (savedNotifications !== null) {
        setNotifications(savedNotifications === "true");
      }

      // Role permissions are loaded from Supabase below.
    } catch {
      // Keep default settings if stored data cannot be read.
    }

    const loadRolePermissions = async () => {
      setPermissionsLoading(true);
      setPermissionError(null);

      const { data, error } = await supabase
        .from("role_permissions")
        .select("role, permissions")
        .order("role");

      if (error) {
        console.error("Role permissions lookup failed:", error);
        setPermissionError("Could not load role permissions from Supabase.");
        setPermissionsLoading(false);
        return;
      }

      const nextPermissions: PermissionsMap = {
        ...defaultPermissions,
      };

      for (const row of data ?? []) {
        const role = row.role as Role;
        if (!(role in nextPermissions)) continue;

        nextPermissions[role] = {
          ...defaultPermissions[role],
          ...(row.permissions as Partial<RolePermissions>),
        };
      }

      setPermissions(nextPermissions);
      setPermissionsLoading(false);
    };

    void loadRolePermissions();
  }, []);

  const updateField = (
    field: keyof SettingsData,
    value: string
  ) => {
    setSettings((current) => ({
      ...current,
      [field]: value,
    }));

    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem(
      "vertex-studio-settings",
      JSON.stringify(settings)
    );

    localStorage.setItem(
      "vertex-studio-notifications",
      String(notifications)
    );

    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  const handleNotificationsChange = () => {
    setNotifications((current) => !current);
    setSaved(false);
  };

  const handlePermissionChange = (key: PermissionKey) => {
    if (selectedRole === "Owner" || permissionsLoading || permissionsSaving) return;

    setPermissions((current) => ({
      ...current,
      [selectedRole]: {
        ...current[selectedRole],
        [key]: !current[selectedRole][key],
      },
    }));

    setSaved(false);
  };

  const saveRolePermissions = async () => {
    if (selectedRole === "Owner" || permissionsSaving) return;

    setPermissionsSaving(true);
    setPermissionError(null);
    setSaved(false);

    const { error } = await supabase.rpc("update_role_permissions", {
      target_role: selectedRole,
      new_permissions: permissions[selectedRole],
    });

    setPermissionsSaving(false);

    if (error) {
      console.error("Role permissions update failed:", error);
      setPermissionError(error.message || "Could not save role permissions.");
      return;
    }

    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  };

  const resetRolePermissions = () => {
    if (selectedRole === "Owner") return;

    setPermissions((current) => ({
      ...current,
      [selectedRole]: { ...defaultPermissions[selectedRole] },
    }));

    setSaved(false);
  };

  const handleLogout = async () => {
    setLoggingOut(true);

    const { error } = await supabase.auth.signOut();

    if (error) {
      setLoggingOut(false);
      return;
    }

    router.push("/login");
    router.refresh();
  };

  return (
    <main className="min-h-screen w-full bg-[#060914] px-5 py-8 text-white sm:px-8 sm:py-10 xl:px-10">
      <div className="w-full">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/15 via-blue-500/15 to-violet-500/15 ring-1 ring-white/5">
              <Settings
                size={19}
                className="text-cyan-300"
              />
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/35">
                Vertex Studio
              </p>

              <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
                Settings
              </h1>
            </div>
          </div>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-white/40">
            Configure your workspace, business information, and
            admin preferences.
          </p>
        </div>

        <div className="space-y-6">
          {/* Workspace Information */}
          <section className="rounded-2xl border border-white/[0.08] bg-[#0b1020]/80 shadow-[0_18px_60px_rgba(0,0,0,0.12)]">
            <div className="border-b border-white/10 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                  <Globe
                    size={17}
                    className="text-cyan-300"
                  />
                </div>

                <div>
                  <h2 className="font-semibold">
                    Workspace Information
                  </h2>

                  <p className="mt-1 text-xs text-white/35">
                    Basic information used throughout your admin
                    workspace.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-5 p-6 md:grid-cols-2">
              {/* Business Name */}
              <div>
                <label
                  htmlFor="businessName"
                  className="mb-2 block text-sm font-medium text-white/70"
                >
                  Business Name
                </label>

                <input
                  id="businessName"
                  type="text"
                  value={settings.businessName}
                  onChange={(event) =>
                    updateField(
                      "businessName",
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-white/25 focus:bg-white/[0.07]"
                />
              </div>

              {/* Contact Email */}
              <div>
                <label
                  htmlFor="contactEmail"
                  className="mb-2 block text-sm font-medium text-white/70"
                >
                  Contact Email
                </label>

                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25"
                  />

                  <input
                    id="contactEmail"
                    type="email"
                    value={settings.contactEmail}
                    onChange={(event) =>
                      updateField(
                        "contactEmail",
                        event.target.value
                      )
                    }
                    className="w-full rounded-xl border border-white/10 bg-white/[0.035] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-white/25 focus:bg-white/[0.07]"
                  />
                </div>
              </div>

              {/* Website */}
              <div>
                <label
                  htmlFor="website"
                  className="mb-2 block text-sm font-medium text-white/70"
                >
                  Website
                </label>

                <input
                  id="website"
                  type="url"
                  value={settings.website}
                  onChange={(event) =>
                    updateField(
                      "website",
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-white/25 focus:bg-white/[0.07]"
                />
              </div>

              {/* Timezone */}
              <div>
                <label
                  htmlFor="timezone"
                  className="mb-2 block text-sm font-medium text-white/70"
                >
                  Timezone
                </label>

                <select
                  id="timezone"
                  value={settings.timezone}
                  onChange={(event) =>
                    updateField(
                      "timezone",
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm text-white outline-none focus:border-white/25"
                >
                  <option
                    value="Asia/Manila"
                    className="bg-[#111]"
                  >
                    Asia/Manila — Philippines
                  </option>

                  <option
                    value="America/New_York"
                    className="bg-[#111]"
                  >
                    America/New_York — Eastern Time
                  </option>

                  <option
                    value="America/Chicago"
                    className="bg-[#111]"
                  >
                    America/Chicago — Central Time
                  </option>

                  <option
                    value="America/Denver"
                    className="bg-[#111]"
                  >
                    America/Denver — Mountain Time
                  </option>

                  <option
                    value="America/Los_Angeles"
                    className="bg-[#111]"
                  >
                    America/Los_Angeles — Pacific Time
                  </option>

                  <option
                    value="Europe/London"
                    className="bg-[#111]"
                  >
                    Europe/London — United Kingdom
                  </option>

                  <option
                    value="Australia/Sydney"
                    className="bg-[#111]"
                  >
                    Australia/Sydney — Sydney
                  </option>
                </select>
              </div>
            </div>
          </section>

          {/* Notifications */}
          <section className="rounded-2xl border border-white/[0.08] bg-[#0b1020]/80 shadow-[0_18px_60px_rgba(0,0,0,0.12)]">
            <div className="border-b border-white/10 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                  <Bell
                    size={17}
                    className="text-blue-300"
                  />
                </div>

                <div>
                  <h2 className="font-semibold">
                    Notifications
                  </h2>

                  <p className="mt-1 text-xs text-white/35">
                    Control admin notification preferences.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-5 p-6">
              <div>
                <p className="text-sm font-medium">
                  Lead notifications
                </p>

                <p className="mt-1 max-w-xl text-xs leading-5 text-white/35">
                  Receive notifications when new website inquiries
                  and messages are submitted.
                </p>
              </div>

              <button
                type="button"
                onClick={handleNotificationsChange}
                aria-pressed={notifications}
                className={`relative h-7 w-12 shrink-0 rounded-full border transition ${
                  notifications
                    ? "border-white bg-white"
                    : "border-white/10 bg-white/5"
                }`}
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full transition ${
                    notifications
                      ? "left-6 bg-black"
                      : "left-1 bg-white/40"
                  }`}
                />
              </button>
            </div>
          </section>

          {/* Roles & Permissions */}
          <section className="rounded-2xl border border-white/[0.08] bg-[#0b1020]/80 shadow-[0_18px_60px_rgba(0,0,0,0.12)]">
            <div className="border-b border-white/10 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                  <Shield size={17} className="text-violet-300" />
                </div>

                <div>
                  <h2 className="font-semibold">Roles & Permissions</h2>
                  <p className="mt-1 text-xs text-white/35">
                    Control what each workspace role can access and manage.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid gap-4 lg:grid-cols-[220px_1fr]">
                <div className="space-y-2">
                  <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-white/35">
                    Select Role
                  </p>

                  {(["Owner", "Admin", "Manager", "Staff"] as Role[]).map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setSelectedRole(role)}
                      className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition ${
                        selectedRole === role
                          ? "border-cyan-400/30 bg-cyan-400/10 text-white"
                          : "border-white/10 bg-white/[0.02] text-white/55 hover:bg-white/[0.05] hover:text-white"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <Users size={15} className={selectedRole === role ? "text-cyan-300" : "text-white/30"} />
                        <span className="text-sm font-medium">{role}</span>
                      </span>
                      {role === "Owner" && (
                        <span className="text-[10px] text-cyan-300">Full</span>
                      )}
                    </button>
                  ))}

                  <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.02] p-3">
                    <p className="text-xs font-medium text-white/65">
                      Role vs. Workspace Team
                    </p>
                    <p className="mt-1 text-[11px] leading-5 text-white/35">
                      Roles control system access. Department, position, projects, tasks, and workload are managed separately in Workspace Team.
                    </p>
                  </div>
                </div>

                <div>
                  <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <FolderKanban size={16} className="text-cyan-300" />
                        <h3 className="text-sm font-semibold">{selectedRole} Permissions</h3>
                      </div>
                      <p className="mt-1 text-xs text-white/35">
                        {selectedRole === "Owner"
                          ? "Owner has full system access and cannot be restricted in this demo."
                          : `Choose the areas ${selectedRole} can access or manage.`}
                      </p>
                    </div>

                    {selectedRole !== "Owner" && (
                      <button
                        type="button"
                        onClick={resetRolePermissions}
                        className="self-start rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-white/55 transition hover:bg-white/[0.05] hover:text-white"
                      >
                        Reset Role
                      </button>
                    )}
                  </div>

                  <div className="overflow-hidden rounded-xl border border-white/10">
                    {permissionDefinitions.map((permission, index) => {
                      const enabled = permissions[selectedRole][permission.key];
                      const locked = selectedRole === "Owner";

                      return (
                        <div
                          key={permission.key}
                          className={`flex items-center justify-between gap-5 px-4 py-4 ${
                            index !== permissionDefinitions.length - 1 ? "border-b border-white/10" : ""
                          }`}
                        >
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-white/85">
                              {permission.label}
                            </p>
                            <p className="mt-1 text-xs leading-5 text-white/35">
                              {permission.description}
                            </p>
                          </div>

                          <button
                            type="button"
                            disabled={locked}
                            onClick={() => handlePermissionChange(permission.key)}
                            aria-pressed={enabled}
                            aria-label={`${permission.label}: ${enabled ? "enabled" : "disabled"}`}
                            className={`relative h-7 w-12 shrink-0 rounded-full border transition ${
                              enabled
                                ? "border-cyan-300 bg-cyan-300"
                                : "border-white/10 bg-white/5"
                            } ${locked ? "cursor-not-allowed opacity-80" : ""}`}
                          >
                            <span
                              className={`absolute top-1 h-5 w-5 rounded-full transition ${
                                enabled ? "left-6 bg-slate-950" : "left-1 bg-white/35"
                              }`}
                            />
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {permissionError && (
                    <div className="mt-4 rounded-xl border border-red-400/15 bg-red-400/5 px-4 py-3 text-xs leading-5 text-red-300">
                      {permissionError}
                    </div>
                  )}

                  {permissionsLoading && (
                    <div className="mt-4 rounded-xl border border-cyan-400/10 bg-cyan-400/5 px-4 py-3 text-xs text-cyan-200">
                      Loading role permissions from Supabase...
                    </div>
                  )}

                  <div className="mt-4 flex items-start gap-2 rounded-xl border border-amber-400/10 bg-amber-400/5 px-4 py-3">
                    <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-amber-300" />
                    <p className="text-[11px] leading-5 text-white/45">
                      Role permissions are synced with Supabase. Changes are protected by an Owner-only database function, while Workspace Team information remains separate from system permissions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Security */}
          <section className="rounded-2xl border border-white/[0.08] bg-[#0b1020]/80 shadow-[0_18px_60px_rgba(0,0,0,0.12)]">
            <div className="border-b border-white/10 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                  <ShieldCheck
                    size={17}
                    className="text-violet-300"
                  />
                </div>

                <div>
                  <h2 className="font-semibold">
                    Security
                  </h2>

                  <p className="mt-1 text-xs text-white/35">
                    Manage your current admin session.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium">
                  Admin authentication
                </p>

                <p className="mt-1 text-xs text-white/35">
                  Your admin dashboard is protected by Supabase
                  Authentication.
                </p>
              </div>

              <div className="inline-flex items-center gap-2 self-start rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Protected
              </div>
            </div>
          </section>

          {/* Save */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 px-5 py-3 text-sm font-medium text-red-400 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <LogOut size={16} />

              {loggingOut
                ? "Signing out..."
                : "Sign out"}
            </button>

            <button
              type="button"
              onClick={async () => {
                handleSave();
                if (selectedRole !== "Owner") await saveRolePermissions();
              }}
              disabled={permissionsLoading || permissionsSaving}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-blue-500/15 transition hover:brightness-110"
            >
              {saved ? (
                <>
                  <Check size={16} />
                  Saved
                </>
              ) : (
                <>
                  <Save size={16} />
                  Save Changes
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}