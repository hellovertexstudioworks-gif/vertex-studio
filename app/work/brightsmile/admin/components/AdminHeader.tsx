"use client";

import { useState } from "react";
import {
  Bell,
  ChevronDown,
  Menu,
  Search,
  UserRound,
} from "lucide-react";

export default function AdminHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  function toggleMobileMenu() {
    setMobileOpen((value) => !value);
  }

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="flex h-20 items-center justify-between gap-4 px-4 sm:px-6 lg:pl-72 lg:pr-8">
          {/* Left */}
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 lg:hidden"
              aria-label="Open navigation"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="hidden items-center gap-2 text-sm text-slate-400 sm:flex">
              <span>BrightSmile Dental</span>
              <span>/</span>
              <span className="font-semibold text-slate-700">
                Administration
              </span>
            </div>

            <div className="sm:hidden">
              <p className="text-sm font-black text-slate-900">
                BrightSmile
              </p>
              <p className="text-[10px] text-slate-400">Admin Portal</p>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative hidden md:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                type="search"
                placeholder="Search..."
                className="h-10 w-56 rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:bg-white"
              />
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setNotificationsOpen((value) => !value);
                  setProfileOpen(false);
                }}
                className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
                aria-label="Notifications"
              >
                <Bell className="h-[18px] w-[18px]" />

                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white" />
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 top-12 w-80 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
                  <div className="border-b border-slate-100 px-4 py-4">
                    <p className="text-sm font-bold text-slate-900">
                      Notifications
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Recent practice activity
                    </p>
                  </div>

                  <div className="divide-y divide-slate-100">
                    <div className="px-4 py-4">
                      <p className="text-xs font-bold text-slate-800">
                        New appointment request
                      </p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        Emma Wilson requested a pediatric dentistry visit.
                      </p>
                      <p className="mt-2 text-[10px] font-medium text-slate-400">
                        12 minutes ago
                      </p>
                    </div>

                    <div className="px-4 py-4">
                      <p className="text-xs font-bold text-slate-800">
                        Payment received
                      </p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        A demo invoice payment was recorded.
                      </p>
                      <p className="mt-2 text-[10px] font-medium text-slate-400">
                        34 minutes ago
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 px-4 py-3">
                    <button
                      type="button"
                      className="text-xs font-bold text-blue-600 hover:text-blue-700"
                    >
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setProfileOpen((value) => !value);
                  setNotificationsOpen(false);
                }}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 py-1.5 transition hover:bg-slate-50 sm:px-3"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white">
                  <UserRound className="h-4 w-4" />
                </div>

                <div className="hidden text-left sm:block">
                  <p className="text-xs font-bold text-slate-900">
                    Admin User
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Practice Manager
                  </p>
                </div>

                <ChevronDown className="hidden h-4 w-4 text-slate-400 sm:block" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-12 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                  <div className="border-b border-slate-100 px-3 py-3">
                    <p className="text-sm font-bold text-slate-900">
                      Admin User
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Practice Manager
                    </p>
                  </div>

                  <a
                    href="/work/brightsmile/admin/settings"
                    className="mt-1 block rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    Account settings
                  </a>

                  <a
                    href="/work/brightsmile"
                    className="block rounded-lg px-3 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    Back to website
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile navigation */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-slate-950/40"
          />

          <div className="relative h-full w-64">
            <MobileNavigation onClose={() => setMobileOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}

function MobileNavigation({ onClose }: { onClose: () => void }) {
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "";

  const navigation = [
    ["Dashboard", "/work/brightsmile/admin/dashboard"],
    ["Appointments", "/work/brightsmile/admin/appointments"],
    ["Patients", "/work/brightsmile/admin/patients"],
    ["Doctors", "/work/brightsmile/admin/doctors"],
    ["Billing", "/work/brightsmile/admin/billing"],
    ["Analytics", "/work/brightsmile/admin/analytics"],
    ["Services", "/work/brightsmile/admin/services"],
    ["Settings", "/work/brightsmile/admin/settings"],
  ];

  return (
    <aside className="flex h-full w-64 flex-col bg-slate-950 text-white shadow-2xl">
      <div className="flex h-20 items-center justify-between border-b border-white/10 px-5">
        <div>
          <p className="text-sm font-black">BrightSmile</p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-slate-500">
            Admin Portal
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white"
        >
          ×
        </button>
      </div>

      <nav className="flex-1 px-3 py-5">
        <div className="space-y-1">
          {navigation.map(([label, href]) => {
            const active =
              pathname === href ||
              (href !== "/work/brightsmile/admin/dashboard" &&
                pathname.startsWith(`${href}/`));

            return (
              <a
                key={href}
                href={href}
                onClick={onClose}
                className={`block rounded-xl px-3 py-3 text-sm font-semibold transition ${
                  active
                    ? "bg-blue-600 text-white"
                    : "text-slate-400 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                {label}
              </a>
            );
          })}
        </div>
      </nav>

      <div className="border-t border-white/10 p-4">
        <a
          href="/work/brightsmile"
          className="block rounded-xl px-3 py-3 text-sm font-semibold text-slate-400 hover:bg-white/[0.06] hover:text-white"
        >
          Back to Website
        </a>
      </div>
    </aside>
  );
}