"use client";

import { useState } from "react";
import {
  Bell,
  Building2,
  Check,
  ChevronRight,
  Clock3,
  Globe2,
  KeyRound,
  Mail,
  MapPin,
  Save,
  ShieldCheck,
  Stethoscope,
  ToggleLeft,
  ToggleRight,
  UserCog,
} from "lucide-react";

type SettingsSection =
  | "clinic"
  | "general"
  | "notifications"
  | "security"
  | "integrations";

function Toggle({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="shrink-0"
      aria-label={enabled ? "Disable setting" : "Enable setting"}
    >
      {enabled ? (
        <ToggleRight className="h-8 w-8 text-slate-900" />
      ) : (
        <ToggleLeft className="h-8 w-8 text-slate-400" />
      )}
    </button>
  );
}

function SettingRow({
  title,
  description,
  enabled,
  onChange,
}: {
  title: string;
  description: string;
  enabled: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-5 border-b border-slate-100 py-4 last:border-0">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-slate-800">{title}</p>
        <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>
      </div>
      <Toggle enabled={enabled} onChange={onChange} />
    </div>
  );
}

export default function SettingsPage() {
  const [activeSection, setActiveSection] =
    useState<SettingsSection>("clinic");

  const [clinicName, setClinicName] = useState("BrightSmile Dental");
  const [email, setEmail] = useState("hello@brightsmile.example");
  const [phone, setPhone] = useState("+1 (555) 014-2088");
  const [address, setAddress] = useState("125 Smile Avenue, Boston, MA 02110");
  const [timezone, setTimezone] = useState("Eastern Time (UTC-05:00)");
  const [currency, setCurrency] = useState("USD — US Dollar");

  const [appointmentReminders, setAppointmentReminders] = useState(true);
  const [newPatientAlerts, setNewPatientAlerts] = useState(true);
  const [paymentAlerts, setPaymentAlerts] = useState(true);
  const [dailySummary, setDailySummary] = useState(false);
  const [marketingNotifications, setMarketingNotifications] = useState(false);

  const [twoFactor, setTwoFactor] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState(true);
  const [loginAlerts, setLoginAlerts] = useState(true);

  const [onlineBooking, setOnlineBooking] = useState(true);
  const [emailIntegration, setEmailIntegration] = useState(true);
  const [calendarIntegration, setCalendarIntegration] = useState(false);

  const [saved, setSaved] = useState(false);

  function saveSettings() {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  }

  const navigation = [
    {
      id: "clinic" as const,
      label: "Clinic profile",
      description: "Practice information",
      icon: Building2,
    },
    {
      id: "general" as const,
      label: "General",
      description: "System preferences",
      icon: UserCog,
    },
    {
      id: "notifications" as const,
      label: "Notifications",
      description: "Alerts and reminders",
      icon: Bell,
    },
    {
      id: "security" as const,
      label: "Security",
      description: "Access and protection",
      icon: ShieldCheck,
    },
    {
      id: "integrations" as const,
      label: "Integrations",
      description: "Connected services",
      icon: Globe2,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {/* Demo notice */}
        <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 rounded-lg bg-amber-100 p-2 text-amber-700">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-amber-900">
                Portfolio demo settings
              </p>
              <p className="mt-0.5 text-xs leading-5 text-amber-800">
                These controls demonstrate how a private BrightSmile business
                platform could be configured. Nothing is connected to a live
                clinic.
              </p>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              <UserCog className="h-4 w-4" />
              Administration
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Settings
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Manage clinic information, preferences, notifications, security,
              and connected services.
            </p>
          </div>

          <button
            type="button"
            onClick={saveSettings}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
            {saved ? "Saved" : "Save changes"}
          </button>
        </div>

        {/* Layout */}
        <div className="grid gap-6 lg:grid-cols-[250px_minmax(0,1fr)]">
          {/* Sidebar */}
          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveSection(item.id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${
                    active
                      ? "bg-slate-950 text-white"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <div
                    className={`rounded-lg p-2 ${
                      active ? "bg-white/10" : "bg-slate-100"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">{item.label}</p>
                    <p
                      className={`mt-0.5 text-[11px] ${
                        active ? "text-slate-300" : "text-slate-400"
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>
                  {active ? <ChevronRight className="h-4 w-4" /> : null}
                </button>
              );
            })}

            <div className="mt-2 border-t border-slate-100 px-3 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Demo environment
              </p>
              <div className="mt-2 flex items-center gap-2 text-xs font-medium text-emerald-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Safe preview mode
              </div>
            </div>
          </aside>

          {/* Content */}
          <section className="min-w-0">
            {activeSection === "clinic" ? (
              <div className="space-y-6">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                  <div className="mb-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                      Clinic profile
                    </p>
                    <h2 className="mt-1 text-xl font-bold text-slate-950">
                      Practice information
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      The information staff and patients may see across the
                      business platform.
                    </p>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-sm font-semibold text-slate-700">
                        Clinic name
                      </span>
                      <div className="relative">
                        <Building2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                          value={clinicName}
                          onChange={(event) => setClinicName(event.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-800 outline-none transition focus:border-slate-400"
                        />
                      </div>
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-sm font-semibold text-slate-700">
                        Contact email
                      </span>
                      <div className="relative">
                        <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-800 outline-none transition focus:border-slate-400"
                        />
                      </div>
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-sm font-semibold text-slate-700">
                        Phone
                      </span>
                      <input
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-400"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-sm font-semibold text-slate-700">
                        Address
                      </span>
                      <div className="relative">
                        <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                          value={address}
                          onChange={(event) => setAddress(event.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-800 outline-none transition focus:border-slate-400"
                        />
                      </div>
                    </label>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="rounded-xl bg-slate-100 p-2.5 text-slate-700">
                      <Stethoscope className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="font-bold text-slate-950">
                        Practice snapshot
                      </h2>
                      <p className="mt-1 text-xs text-slate-500">
                        Demo information used throughout the admin platform.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-xl bg-slate-50 p-4">
                      <p className="text-xs text-slate-400">Doctors</p>
                      <p className="mt-1 text-xl font-bold text-slate-950">6</p>
                    </div>
                    <div className="rounded-xl bg-slate-50 p-4">
                      <p className="text-xs text-slate-400">Services</p>
                      <p className="mt-1 text-xl font-bold text-slate-950">10</p>
                    </div>
                    <div className="rounded-xl bg-slate-50 p-4">
                      <p className="text-xs text-slate-400">Patients</p>
                      <p className="mt-1 text-xl font-bold text-slate-950">
                        1,284
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {activeSection === "general" ? (
              <div className="space-y-6">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                  <div className="mb-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                      General preferences
                    </p>
                    <h2 className="mt-1 text-xl font-bold text-slate-950">
                      Regional settings
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Configure how dates, times, and money are displayed.
                    </p>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-sm font-semibold text-slate-700">
                        Time zone
                      </span>
                      <select
                        value={timezone}
                        onChange={(event) => setTimezone(event.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none focus:border-slate-400"
                      >
                        <option>Eastern Time (UTC-05:00)</option>
                        <option>Central Time (UTC-06:00)</option>
                        <option>Mountain Time (UTC-07:00)</option>
                        <option>Pacific Time (UTC-08:00)</option>
                      </select>
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-sm font-semibold text-slate-700">
                        Currency
                      </span>
                      <select
                        value={currency}
                        onChange={(event) => setCurrency(event.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none focus:border-slate-400"
                      >
                        <option>USD — US Dollar</option>
                        <option>CAD — Canadian Dollar</option>
                        <option>GBP — British Pound</option>
                        <option>EUR — Euro</option>
                      </select>
                    </label>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="rounded-xl bg-slate-100 p-2.5 text-slate-700">
                      <Clock3 className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="font-bold text-slate-950">
                        Business hours
                      </h2>
                      <p className="mt-1 text-xs text-slate-500">
                        Demo schedule used by the appointment system.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    {[
                      ["Monday", "8:00 AM", "5:00 PM"],
                      ["Tuesday", "8:00 AM", "5:00 PM"],
                      ["Wednesday", "8:00 AM", "5:00 PM"],
                      ["Thursday", "8:00 AM", "6:00 PM"],
                      ["Friday", "8:00 AM", "5:00 PM"],
                      ["Saturday", "9:00 AM", "2:00 PM"],
                      ["Sunday", "Closed", "Closed"],
                    ].map(([day, start, end]) => (
                      <div
                        key={day}
                        className="flex items-center justify-between gap-4 border-b border-slate-100 py-3 last:border-0"
                      >
                        <span className="text-sm font-semibold text-slate-700">
                          {day}
                        </span>
                        <span className="text-sm text-slate-500">
                          {start} — {end}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}

            {activeSection === "notifications" ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="mb-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Notifications
                  </p>
                  <h2 className="mt-1 text-xl font-bold text-slate-950">
                    Alerts & reminders
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Choose which business events should notify staff.
                  </p>
                </div>

                <div>
                  <SettingRow
                    title="Appointment reminders"
                    description="Send reminder notifications before scheduled patient appointments."
                    enabled={appointmentReminders}
                    onChange={() => setAppointmentReminders((value) => !value)}
                  />
                  <SettingRow
                    title="New patient alerts"
                    description="Notify the team when a new patient is added."
                    enabled={newPatientAlerts}
                    onChange={() => setNewPatientAlerts((value) => !value)}
                  />
                  <SettingRow
                    title="Payment alerts"
                    description="Notify staff when an invoice payment is recorded."
                    enabled={paymentAlerts}
                    onChange={() => setPaymentAlerts((value) => !value)}
                  />
                  <SettingRow
                    title="Daily summary"
                    description="Send a daily summary of appointments, patients, and collections."
                    enabled={dailySummary}
                    onChange={() => setDailySummary((value) => !value)}
                  />
                  <SettingRow
                    title="Marketing notifications"
                    description="Receive updates about campaigns and promotional activity."
                    enabled={marketingNotifications}
                    onChange={() => setMarketingNotifications((value) => !value)}
                  />
                </div>

                <div className="mt-6 rounded-xl bg-slate-50 p-4">
                  <div className="flex gap-3">
                    <Bell className="mt-0.5 h-5 w-5 text-slate-500" />
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        Notification channels
                      </p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        A production version could connect these preferences to
                        email, SMS, push notifications, or internal staff alerts.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {activeSection === "security" ? (
              <div className="space-y-6">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                  <div className="mb-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                      Security
                    </p>
                    <h2 className="mt-1 text-xl font-bold text-slate-950">
                      Access & protection
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Demo controls for protecting the private business platform.
                    </p>
                  </div>

                  <SettingRow
                    title="Two-factor authentication"
                    description="Require an additional verification step when staff sign in."
                    enabled={twoFactor}
                    onChange={() => setTwoFactor((value) => !value)}
                  />
                  <SettingRow
                    title="Automatic session timeout"
                    description="Sign users out after a period of inactivity."
                    enabled={sessionTimeout}
                    onChange={() => setSessionTimeout((value) => !value)}
                  />
                  <SettingRow
                    title="Login alerts"
                    description="Notify administrators when a new login occurs."
                    enabled={loginAlerts}
                    onChange={() => setLoginAlerts((value) => !value)}
                  />
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-xl bg-slate-100 p-3 text-slate-700">
                      <KeyRound className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="font-bold text-slate-950">
                        Staff access
                      </h2>
                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        A production system would use authenticated staff
                        accounts, role-based permissions, audit logs, secure
                        sessions, and protected patient records.
                      </p>
                      <button
                        type="button"
                        className="mt-4 inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        <UserCog className="h-3.5 w-3.5" />
                        Manage demo roles
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {activeSection === "integrations" ? (
              <div className="space-y-6">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                  <div className="mb-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                      Integrations
                    </p>
                    <h2 className="mt-1 text-xl font-bold text-slate-950">
                      Connected services
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Demonstration of services that could connect the website
                      and private business platform.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-100 p-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-slate-100 p-2 text-slate-700">
                          <CalendarDaysIcon />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800">
                            Online booking
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            Connect public appointment requests to the admin system.
                          </p>
                        </div>
                      </div>
                      <Toggle
                        enabled={onlineBooking}
                        onChange={() => setOnlineBooking((value) => !value)}
                      />
                    </div>

                    <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-100 p-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-slate-100 p-2 text-slate-700">
                          <Mail className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800">
                            Email
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            Send appointment and billing communications.
                          </p>
                        </div>
                      </div>
                      <Toggle
                        enabled={emailIntegration}
                        onChange={() => setEmailIntegration((value) => !value)}
                      />
                    </div>

                    <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-100 p-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-slate-100 p-2 text-slate-700">
                          <Globe2 className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800">
                            Calendar synchronization
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            Sync provider schedules with an external calendar.
                          </p>
                        </div>
                      </div>
                      <Toggle
                        enabled={calendarIntegration}
                        onChange={() => setCalendarIntegration((value) => !value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-xl bg-slate-100 p-3 text-slate-700">
                      <Globe2 className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="font-bold text-slate-950">
                        Future platform connections
                      </h2>
                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        The BrightSmile concept can eventually connect payments,
                        CRM tools, analytics, messaging, forms, calendars, and
                        other business services through secure APIs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </section>
        </div>
      </div>
    </main>
  );
}

function CalendarDaysIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <rect x="3" y="4.5" width="18" height="16" rx="2" />
      <path d="M8 2.5v4M16 2.5v4M3 9h18M8 13h3M13 13h3M8 17h3" />
    </svg>
  );
}
