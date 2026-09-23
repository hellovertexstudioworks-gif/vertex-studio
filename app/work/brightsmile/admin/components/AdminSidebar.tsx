"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  BarChart3,
  CalendarDays,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Settings,
  Stethoscope,
  Users,
  Wrench,
  X,
} from "lucide-react";

type AdminSidebarProps = {
  mobileOpen?: boolean;
  onClose?: () => void;
};

const navigation = [
  {
    label: "Dashboard",
    href: "/work/brightsmile/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Appointments",
    href: "/work/brightsmile/admin/appointments",
    icon: CalendarDays,
  },
  {
    label: "Patients",
    href: "/work/brightsmile/admin/patients",
    icon: Users,
  },
  {
    label: "Doctors",
    href: "/work/brightsmile/admin/doctors",
    icon: Stethoscope,
  },
  {
    label: "Billing",
    href: "/work/brightsmile/admin/billing",
    icon: CreditCard,
  },
  {
    label: "Analytics",
    href: "/work/brightsmile/admin/analytics",
    icon: BarChart3,
  },
  {
    label: "Services",
    href: "/work/brightsmile/admin/services",
    icon: Wrench,
  },
  {
    label: "Settings",
    href: "/work/brightsmile/admin/settings",
    icon: Settings,
  },
];

export default function AdminSidebar({
  mobileOpen = false,
  onClose,
}: AdminSidebarProps) {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/work/brightsmile/admin/dashboard") {
      return pathname === href;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-800 bg-slate-950 text-white transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand */}
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-5">
          <Link
            href="/work/brightsmile/admin/dashboard"
            onClick={onClose}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/20">
              <Stethoscope className="h-5 w-5" />
            </div>

            <div>
              <p className="text-sm font-black tracking-tight">
                BrightSmile
              </p>
              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-400">
                Admin Portal
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Practice */}
        <div className="px-4 pt-5">
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                <Activity className="h-4 w-4" />
              </div>

              <div className="min-w-0">
                <p className="truncate text-xs font-bold text-white">
                  BrightSmile Dental
                </p>
                <div className="mt-1 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span className="text-[10px] font-medium text-slate-400">
                    Practice online
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-5">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
            Workspace
          </p>

          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
                    active
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/10"
                      : "text-slate-400 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  <Icon
                    className={`h-[18px] w-[18px] shrink-0 ${
                      active
                        ? "text-white"
                        : "text-slate-500 group-hover:text-slate-300"
                    }`}
                  />

                  <span className="flex-1">{item.label}</span>

                  {active && (
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom */}
        <div className="border-t border-white/10 p-4">
          <div className="mb-3 rounded-xl bg-white/[0.04] p-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
              Demo Environment
            </p>

            <div className="mt-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-medium text-slate-300">
                Safe preview mode
              </span>
            </div>
          </div>

          <Link
            href="/work/brightsmile"
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-400 transition hover:bg-white/[0.06] hover:text-white"
          >
            <LogOut className="h-[18px] w-[18px]" />
            <span>Back to Website</span>
          </Link>
        </div>
      </aside>
    </>
  );
}