"use client";

import {
  Bell,
  Check,
  Globe,
  LogOut,
  Mail,
  Save,
  Settings,
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
  const [saved, setSaved] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

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
    } catch {
      // Keep default settings if stored data cannot be read.
    }
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
    <main className="min-h-screen bg-[#070707] px-5 py-8 text-white sm:px-8 lg:px-10">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
              <Settings
                size={19}
                className="text-white/70"
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
          <section className="rounded-2xl border border-white/10 bg-white/[0.025]">
            <div className="border-b border-white/10 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                  <Globe
                    size={17}
                    className="text-white/70"
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
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-white/25 focus:bg-white/[0.07]"
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
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-white/25 focus:bg-white/[0.07]"
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
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-white/25 focus:bg-white/[0.07]"
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
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-white/25"
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
          <section className="rounded-2xl border border-white/10 bg-white/[0.025]">
            <div className="border-b border-white/10 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                  <Bell
                    size={17}
                    className="text-white/70"
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

          {/* Security */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.025]">
            <div className="border-b border-white/10 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                  <ShieldCheck
                    size={17}
                    className="text-white/70"
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
              onClick={handleSave}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
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

          {/* Navigation */}
          <div className="flex flex-wrap items-center gap-5 pb-6 pt-2">
            <a
              href="/admin"
              className="text-sm text-white/40 transition hover:text-white"
            >
              ← Dashboard
            </a>

            <a
              href="/admin/leads"
              className="text-sm text-white/40 transition hover:text-white"
            >
              Leads →
            </a>

            <a
              href="/admin/messages"
              className="text-sm text-white/40 transition hover:text-white"
            >
              Messages →
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}