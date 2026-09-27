// FILE: app/admin/components/AdminSidebar.tsx
// PURPOSE: Vertex Admin — Supabase Role-Based Navigation Visibility
// NOTE: The authenticated role is supplied by the server-side AdminLayout.
// Role permissions are loaded from public.role_permissions in Supabase.

"use client";

import {
  BarChart3,
  BriefcaseBusiness,
  ChevronRight,
  ClipboardCheck,
  FileSignature,
  FolderKanban,
  Gauge,
  Globe2,
  Handshake,
  LayoutDashboard,
  Mail,
  MessageSquare,
  ReceiptText,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  WalletCards,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type NavItem = {
  label: string;
  href?: string;
  icon: typeof LayoutDashboard;
  color: string;
  soon?: boolean;
};

const sections: {
  label: string;
  items: NavItem[];
}[] = [
  {
    label: "WORKSPACE",
    items: [
      {
        label: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
        color: "text-cyan-400",
      },
      {
        label: "Leads",
        href: "/admin/leads",
        icon: Target,
        color: "text-blue-400",
      },
      {
        label: "Clients",
        href: "/admin/clients",
        icon: Users,
        color: "text-violet-400",
      },
      {
        label: "Projects",
        href: "/admin/projects",
        icon: FolderKanban,
        color: "text-purple-400",
      },
      {
        label: "Tasks",
        href: "/admin/tasks",
        icon: ClipboardCheck,
        color: "text-amber-400",
      },
    ],
  },
  {
    label: "SALES",
    items: [
      {
        label: "Prospects",
        icon: Search,
        color: "text-sky-400",
        soon: true,
      },
      {
        label: "Outreach",
        icon: Mail,
        color: "text-pink-400",
        soon: true,
      },
      {
        label: "Deals",
        icon: Handshake,
        color: "text-emerald-400",
        soon: true,
      },
      {
        label: "Proposals",
        icon: Sparkles,
        color: "text-fuchsia-400",
        soon: true,
      },
    ],
  },
  {
    label: "FINANCE",
    items: [
      {
        label: "Invoices",
        href: "/admin/invoices",
        icon: ReceiptText,
        color: "text-orange-400",
      },
      {
        label: "Payments",
        href: "/admin/payments",
        icon: WalletCards,
        color: "text-emerald-400",
      },
      {
        label: "Contracts",
        href: "/admin/contracts",
        icon: FileSignature,
        color: "text-indigo-400",
      },
    ],
  },
  {
    label: "BUSINESS",
    items: [
      {
        label: "Websites",
        href: "/admin/websites",
        icon: Globe2,
        color: "text-cyan-400",
      },
      {
        label: "Analytics",
        href: "/admin/analytics",
        icon: BarChart3,
        color: "text-violet-400",
      },
      {
        label: "Messages",
        href: "/admin/messages",
        icon: MessageSquare,
        color: "text-rose-400",
      },
      {
        label: "Appointments",
        href: "/admin/appointments",
        icon: ClipboardCheck,
        color: "text-amber-400",
      },
    ],
  },
  {
    label: "SYSTEM",
    items: [
      {
        label: "Admin Team",
        href: "/admin/admin-team",
        icon: ShieldCheck,
        color: "text-violet-400",
      },
      {
        label: "Team",
        href: "/admin/team",
        icon: BriefcaseBusiness,
        color: "text-blue-400",
      },
      {
        label: "Settings",
        href: "/admin/settings",
        icon: Settings,
        color: "text-slate-300",
      },
    ],
  },
];

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

type RolePermissions = Record<PermissionKey, boolean>;
type PermissionsMap = Record<Role, RolePermissions>;

const fallbackPermissions: PermissionsMap = {
  Owner: {
    workspace: true,
    team: true,
    projects: true,
    tasks: true,
    leads: true,
    sales: true,
    finance: true,
    analytics: true,
    settings: true,
    adminTeam: true,
  },
  Admin: {
    workspace: true,
    team: true,
    projects: true,
    tasks: true,
    leads: true,
    sales: true,
    finance: true,
    analytics: true,
    settings: true,
    adminTeam: false,
  },
  Manager: {
    workspace: false,
    team: true,
    projects: true,
    tasks: true,
    leads: true,
    sales: true,
    finance: false,
    analytics: true,
    settings: true,
    adminTeam: false,
  },
  Staff: {
    workspace: false,
    team: false,
    projects: false,
    tasks: true,
    leads: false,
    sales: false,
    finance: false,
    analytics: false,
    settings: false,
    adminTeam: false,
  },
};

export default function AdminSidebar({ userRole }: { userRole: Role }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [permissions, setPermissions] = useState<RolePermissions>(
    fallbackPermissions[userRole]
  );

  const supabase = createClient();

  const loadPermissions = async () => {
    try {
      const { data, error } = await supabase
        .from("role_permissions")
        .select("permissions")
        .eq("role", userRole)
        .maybeSingle();

      if (error || !data?.permissions) {
        setPermissions(fallbackPermissions[userRole]);
        return;
      }

      setPermissions({
        ...fallbackPermissions[userRole],
        ...(data.permissions as Partial<RolePermissions>),
      });
    } catch {
      setPermissions(fallbackPermissions[userRole]);
    }
  };

  useEffect(() => {
    void loadPermissions();

    const handlePermissionsUpdated = () => {
      void loadPermissions();
    };

    window.addEventListener(
      "vertex-admin-permissions-updated",
      handlePermissionsUpdated
    );
    window.addEventListener("focus", handlePermissionsUpdated);

    return () => {
      window.removeEventListener(
        "vertex-admin-permissions-updated",
        handlePermissionsUpdated
      );
      window.removeEventListener("focus", handlePermissionsUpdated);
    };
  }, [userRole]);

  const canSeeAdminTeam = permissions.adminTeam;
  const canSeeSettings = permissions.settings;

  useEffect(() => {
    const open = () => setMobileOpen(true);

    window.addEventListener("vertex-admin-open-sidebar", open);

    return () => {
      window.removeEventListener("vertex-admin-open-sidebar", open);
    };
  }, []);

  const active = (href?: string) => {
    if (!href) return false;

    return href === "/admin"
      ? pathname === "/admin"
      : pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      {mobileOpen && (
        <button
          aria-label="Close navigation"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[276px] flex-col border-r text-[var(--vertex-text)] shadow-2xl transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          backgroundColor: "var(--vertex-sidebar)",
          borderColor: "var(--vertex-border)",
        }}
      >
        <div className="flex h-full min-h-0 flex-col">
          {/* BRAND */}
          <div
            className="flex h-[68px] shrink-0 items-center justify-between border-b px-5"
            style={{ borderColor: "var(--vertex-border)" }}
          >
            <Link
              href="/admin"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 text-base font-black shadow-lg shadow-blue-500/20">
                V
              </div>

              <div>
                <p className="text-[14px] font-semibold">Vertex Studio</p>
                <p className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.18em] text-[var(--vertex-muted)]">
                  Business OS
                </p>
              </div>
            </Link>

            <button
              onClick={() => setMobileOpen(false)}
              className="rounded-lg p-2 text-white/45 transition hover:bg-white/5 hover:text-white lg:hidden"
              aria-label="Close navigation"
            >
              <X size={18} />
            </button>
          </div>

          {/* WORKSPACE CARD */}
          <div
            className="shrink-0 border-b px-4 py-2.5"
            style={{ borderColor: "var(--vertex-border)" }}
          >
            <div
              className="rounded-xl border px-3 py-2"
              style={{
                borderColor: "var(--vertex-accent-soft)",
                background:
                  "linear-gradient(90deg, var(--vertex-accent-soft), transparent, var(--vertex-accent-soft))",
              }}
            >
              <div className="flex items-center gap-2">
                <Gauge
                  size={14}
                  style={{ color: "var(--vertex-accent)" }}
                />

                <div className="min-w-0">
                  <p className="text-[11px] font-semibold">
                    Vertex Workspace
                  </p>

                  <p className="truncate text-[9px] text-[var(--vertex-muted)]">
                    Your business control center
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* NAVIGATION */}
          <nav
            className="vertex-admin-sidebar-scroll min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-3 py-3"
            aria-label="Vertex Admin navigation"
          >
            <div className="space-y-3 pb-3">
              {sections.map((section) => {
                const visibleItems = section.items.filter((item) => {
                  if (item.label === "Admin Team") {
                    return canSeeAdminTeam;
                  }

                  if (item.label === "Settings") {
                    return canSeeSettings;
                  }

                  if (item.label === "Team") {
                    return permissions.team;
                  }

                  if (item.label === "Projects") {
                    return permissions.projects;
                  }

                  if (item.label === "Tasks") {
                    return permissions.tasks;
                  }

                  if (item.label === "Leads" || item.label === "Clients") {
                    return permissions.leads;
                  }

                  if (
                    item.label === "Prospects" ||
                    item.label === "Outreach" ||
                    item.label === "Deals" ||
                    item.label === "Proposals"
                  ) {
                    return permissions.sales;
                  }

                  if (
                    item.label === "Invoices" ||
                    item.label === "Payments" ||
                    item.label === "Contracts"
                  ) {
                    return permissions.finance;
                  }

                  if (item.label === "Analytics") {
                    return permissions.analytics;
                  }

                  // Dashboard, Websites, Messages, and Appointments remain
                  // visible until dedicated permission keys are added.
                  return true;
                });

                if (visibleItems.length === 0) return null;

                return (
                <section key={section.label}>
                  <p className="px-3 pb-1.5 text-[8px] font-semibold tracking-[0.2em] text-[var(--vertex-muted)]">
                    {section.label}
                  </p>

                  <div className="space-y-0.5">
                    {visibleItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = active(item.href);

                      if (item.soon) {
                        return (
                          <div
                            key={item.label}
                            className="flex cursor-default items-center gap-2.5 rounded-lg px-3 py-2 text-[12px] font-medium"
                            style={{ color: "var(--vertex-muted)" }}
                            title={`${item.label} is coming soon`}
                          >
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg">
                              <Icon
                                size={15}
                                className="text-white/25"
                              />
                            </span>

                            <span className="truncate">{item.label}</span>

                            <span className="ml-auto rounded-full border border-white/8 bg-white/[0.035] px-1.5 py-0.5 text-[7px] font-semibold uppercase tracking-wide text-white/25">
                              Soon
                            </span>
                          </div>
                        );
                      }

                      return (
                        <Link
                          key={item.label}
                          href={item.href!}
                          onClick={() => setMobileOpen(false)}
                          className={`group relative flex items-center gap-2.5 rounded-lg px-3 py-2 text-[12px] font-medium transition-all duration-200 ${
                            isActive
                              ? "text-white shadow-sm"
                              : "text-white/48 hover:bg-white/[0.045] hover:text-white/85"
                          }`}
                          style={
                            isActive
                              ? {
                                  backgroundColor:
                                    "var(--vertex-accent-soft)",
                                }
                              : undefined
                          }
                        >
                          {isActive && (
                            <span
                              className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full"
                              style={{
                                backgroundColor: "var(--vertex-accent)",
                              }}
                            />
                          )}

                          <span
                            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors ${
                              isActive
                                ? "bg-white/[0.08]"
                                : "group-hover:bg-white/[0.05]"
                            }`}
                          >
                            <Icon
                              size={15}
                              className={
                                isActive ? item.color : "text-white/40"
                              }
                            />
                          </span>

                          <span className="truncate">{item.label}</span>

                          {isActive && (
                            <ChevronRight
                              size={13}
                              className="ml-auto text-white/35"
                            />
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </section>
                );
              })}
            </div>
          </nav>

          {/* PROFILE */}
          <div
            className="shrink-0 border-t p-3"
            style={{
              borderColor: "var(--vertex-border)",
              backgroundColor: "var(--vertex-sidebar)",
            }}
          >
            <div
              className="flex items-center gap-3 rounded-xl border px-3 py-2"
              style={{
                borderColor: "var(--vertex-border)",
                backgroundColor: "var(--vertex-surface-2)",
              }}
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-xs font-bold">
                C
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] font-semibold">
                  Cyril Loon
                </p>

                <p className="text-[9px] text-[var(--vertex-muted)]">
                  {userRole}
                </p>
              </div>

              <ShieldCheck
                size={14}
                className="text-emerald-400/80"
              />
            </div>
          </div>
        </div>
      </aside>

      <style jsx>{`
        .vertex-admin-sidebar-scroll {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .vertex-admin-sidebar-scroll::-webkit-scrollbar {
          width: 0;
          height: 0;
          display: none;
        }
      `}</style>
    </>
  );
}
