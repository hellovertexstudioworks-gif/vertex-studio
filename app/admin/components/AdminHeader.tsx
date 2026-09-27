"use client";

import {
  Bell,
  ChevronDown,
  Command,
  Menu,
  Search,
  Sparkles,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const names: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/leads": "Leads",
  "/admin/appointments": "Appointments",
  "/admin/analytics": "Analytics",
  "/admin/messages": "Messages",
  "/admin/settings": "Settings",
  "/admin/clients": "Clients",
  "/admin/projects": "Projects",
  "/admin/tasks": "Tasks",
  "/admin/prospects": "Prospects",
  "/admin/outreach": "Outreach",
  "/admin/deals": "Deals",
  "/admin/proposals": "Proposals",
  "/admin/invoices": "Invoices",
  "/admin/payments": "Payments",
  "/admin/contracts": "Contracts",
  "/admin/websites": "Websites",
  "/admin/team": "Team",
  "/admin/admin-team": "Admin Team",
};

export default function AdminHeader() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const page =
    names[pathname] ||
    Object.entries(names).find(
      ([path]) =>
        path !== "/admin" && pathname.startsWith(`${path}/`)
    )?.[1] ||
    "Vertex Admin";

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();
        setSearchOpen((current) => !current);
      }

      if (event.key === "Escape") {
        setSearchOpen(false);
        setNotificationsOpen(false);
        setProfileOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const openSidebar = () => {
    window.dispatchEvent(new Event("vertex-admin-open-sidebar"));
  };

  return (
    <header
      className="sticky top-0 z-30 text-[var(--vertex-text)] backdrop-blur-xl transition-colors duration-300"
      style={{
        backgroundColor: "var(--vertex-header)",
        borderBottom: "1px solid var(--vertex-border)",
      }}
    >
      <div className="flex min-h-[72px] items-center gap-3 px-4 sm:px-6 lg:px-8">
        {/* Mobile sidebar button */}
        <button
          onClick={openSidebar}
          className="rounded-xl border p-2.5 text-white/55 transition hover:bg-white/[0.07] hover:text-white lg:hidden"
          style={{
            borderColor: "var(--vertex-border)",
            backgroundColor: "var(--vertex-surface-2)",
          }}
          aria-label="Open sidebar"
        >
          <Menu size={18} />
        </button>

        {/* Page title */}
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--vertex-muted)]">
            Vertex Studio
          </p>

          <h1 className="mt-0.5 truncate text-base font-semibold sm:text-lg">
            {page}
          </h1>
        </div>

        {/* Desktop controls */}
        <div className="hidden items-center gap-2 md:flex">
          {/* Search */}
          <button
            onClick={() => {
              setSearchOpen((current) => !current);
              setNotificationsOpen(false);
              setProfileOpen(false);
            }}
            className="flex h-10 items-center gap-2 rounded-xl border px-3 text-xs text-white/35 transition hover:bg-white/[0.06] hover:text-white/70"
            style={{
              borderColor: "var(--vertex-border)",
              backgroundColor: "var(--vertex-surface-2)",
            }}
            aria-label="Open search"
          >
            <Search size={15} />

            <span>Search</span>

            <span
              className="ml-2 hidden items-center gap-1 rounded-md border px-1.5 py-0.5 text-[9px] lg:flex"
              style={{ borderColor: "var(--vertex-border)" }}
            >
              <Command size={9} />
              K
            </span>
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => {
                setNotificationsOpen((current) => !current);
                setSearchOpen(false);
                setProfileOpen(false);
              }}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl border text-white/45 transition hover:bg-white/[0.06] hover:text-white"
              style={{
                borderColor: "var(--vertex-border)",
                backgroundColor: "var(--vertex-surface-2)",
              }}
              aria-label="Notifications"
            >
              <Bell size={17} />

              <span
                className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                style={{
                  backgroundColor: "var(--vertex-accent)",
                }}
              />
            </button>

            {notificationsOpen && (
              <div
                className="absolute right-0 top-12 w-[300px] overflow-hidden rounded-2xl border shadow-2xl"
                style={{
                  backgroundColor: "var(--vertex-surface)",
                  borderColor: "var(--vertex-border)",
                }}
              >
                <div
                  className="border-b px-4 py-3"
                  style={{ borderColor: "var(--vertex-border)" }}
                >
                  <p className="text-sm font-semibold">
                    Notifications
                  </p>

                  <p className="mt-0.5 text-[10px] text-[var(--vertex-muted)]">
                    Your latest workspace activity
                  </p>
                </div>

                <div className="px-4 py-5 text-center">
                  <div
                    className="mx-auto flex h-10 w-10 items-center justify-center rounded-full"
                    style={{
                      backgroundColor: "var(--vertex-accent-soft)",
                    }}
                  >
                    <Bell
                      size={17}
                      style={{ color: "var(--vertex-accent)" }}
                    />
                  </div>

                  <p className="mt-3 text-xs font-medium text-white/70">
                    No new notifications
                  </p>

                  <p className="mt-1 text-[10px] text-[var(--vertex-muted)]">
                    Notifications will appear here as your workspace
                    grows.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative ml-1">
            <button
              onClick={() => {
                setProfileOpen((current) => !current);
                setSearchOpen(false);
                setNotificationsOpen(false);
              }}
              className="flex items-center gap-2.5 rounded-xl border px-2.5 py-2 transition hover:bg-white/[0.06]"
              style={{
                borderColor: "var(--vertex-border)",
                backgroundColor: "var(--vertex-surface-2)",
              }}
              aria-label="Open profile menu"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-xs font-bold">
                C
              </div>

              <div className="hidden text-left xl:block">
                <p className="text-xs font-semibold">Cyril Loon</p>

                <p className="text-[9px] text-[var(--vertex-muted)]">
                  Owner
                </p>
              </div>

              <ChevronDown
                size={14}
                className={`text-white/30 transition-transform ${
                  profileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {profileOpen && (
              <div
                className="absolute right-0 top-12 w-[210px] overflow-hidden rounded-2xl border p-2 shadow-2xl"
                style={{
                  backgroundColor: "var(--vertex-surface)",
                  borderColor: "var(--vertex-border)",
                }}
              >
                <div
                  className="rounded-xl px-3 py-2.5"
                  style={{
                    backgroundColor: "var(--vertex-surface-2)",
                  }}
                >
                  <p className="text-xs font-semibold">
                    Cyril Loon
                  </p>

                  <p className="mt-0.5 text-[10px] text-[var(--vertex-muted)]">
                    Owner · Vertex Studio
                  </p>
                </div>

                <div
                  className="my-2 h-px"
                  style={{
                    backgroundColor: "var(--vertex-border)",
                  }}
                />

                <button
                  onClick={() => setProfileOpen(false)}
                  className="w-full rounded-xl px-3 py-2 text-left text-xs text-white/55 transition hover:bg-white/[0.05] hover:text-white"
                >
                  Account settings
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile notification */}
        <button
          onClick={() =>
            setNotificationsOpen((current) => !current)
          }
          className="relative flex h-10 w-10 items-center justify-center rounded-xl border text-white/45 transition hover:bg-white/[0.06] hover:text-white md:hidden"
          style={{
            borderColor: "var(--vertex-border)",
            backgroundColor: "var(--vertex-surface-2)",
          }}
          aria-label="Notifications"
        >
          <Bell size={17} />

          <span
            className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full"
            style={{
              backgroundColor: "var(--vertex-accent)",
            }}
          />
        </button>

        {/* Search dropdown */}
        {searchOpen && (
          <div
            className="absolute left-4 right-4 top-[66px] rounded-2xl border p-3 shadow-2xl md:left-auto md:right-6 md:w-[360px]"
            style={{
              backgroundColor: "var(--vertex-surface)",
              borderColor: "var(--vertex-border)",
            }}
          >
            <div
              className="flex items-center gap-2 rounded-xl border px-3"
              style={{
                borderColor: "var(--vertex-border)",
                backgroundColor: "var(--vertex-surface-2)",
              }}
            >
              <Search
                size={16}
                className="text-[var(--vertex-muted)]"
              />

              <input
                autoFocus
                type="search"
                placeholder="Search Vertex..."
                className="h-11 w-full bg-transparent text-sm text-white outline-none placeholder:text-white/25"
              />
            </div>

            <div className="mt-2 flex items-center gap-2 px-2 py-1.5 text-[10px] text-[var(--vertex-muted)]">
              <Sparkles
                size={12}
                style={{ color: "var(--vertex-accent)" }}
              />

              Global search will connect to CRM data later.
            </div>
          </div>
        )}
      </div>
    </header>
  );
}