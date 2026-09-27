"use client";

import {
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FolderKanban,
  Mail,
  MapPin,
  Phone,
  Receipt,
  User,
  Wallet,
} from "lucide-react";

export type ClientDetailsData = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: "Active" | "Inactive" | "Pending";
  companyType: string;
  projects: number;
  outstanding: number;
  lastActivity: string;
  joinedDate: string;
  location: string;
  website?: string;
};

type ClientDetailsProps = {
  client: ClientDetailsData;
};

export default function ClientDetails({
  client,
}: ClientDetailsProps) {
  return (
    <div className="w-full space-y-5">
      {/* Client overview */}
      <section className="overflow-hidden rounded-2xl border border-white/8 bg-[#0b1020]">
        <div className="relative p-5 sm:p-6">
          <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-400/5 blur-3xl" />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 text-lg font-semibold text-cyan-300">
                {getInitials(client.name)}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl font-semibold text-white">
                    {client.name}
                  </h2>

                  <StatusBadge status={client.status} />
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Building2 className="h-4 w-4 text-slate-600" />
                    {client.company}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-slate-600" />
                    {client.location}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <p className="text-xs text-slate-600">
                Client since
              </p>

              <p className="mt-1 text-sm font-medium text-slate-300">
                {client.joinedDate}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key information */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Contact */}
        <InfoSection
          title="Contact Information"
          icon={<User className="h-4 w-4" />}
        >
          <InfoRow
            icon={<Mail className="h-4 w-4" />}
            label="Email"
            value={client.email}
            href={`mailto:${client.email}`}
          />

          <InfoRow
            icon={<Phone className="h-4 w-4" />}
            label="Phone"
            value={client.phone}
            href={`tel:${client.phone}`}
          />

          <InfoRow
            icon={<MapPin className="h-4 w-4" />}
            label="Location"
            value={client.location}
          />
        </InfoSection>

        {/* Company */}
        <InfoSection
          title="Company"
          icon={<Building2 className="h-4 w-4" />}
        >
          <InfoRow
            icon={<Building2 className="h-4 w-4" />}
            label="Company"
            value={client.company}
          />

          <InfoRow
            icon={<FolderKanban className="h-4 w-4" />}
            label="Business Type"
            value={client.companyType}
          />

          {client.website && (
            <InfoRow
              icon={<MapPin className="h-4 w-4" />}
              label="Website"
              value={client.website}
            />
          )}
        </InfoSection>

        {/* Financial */}
        <InfoSection
          title="Financial Overview"
          icon={<Wallet className="h-4 w-4" />}
        >
          <InfoRow
            icon={<FolderKanban className="h-4 w-4" />}
            label="Active Projects"
            value={String(client.projects)}
          />

          <InfoRow
            icon={<Wallet className="h-4 w-4" />}
            label="Outstanding"
            value={formatCurrency(client.outstanding)}
            valueClassName={
              client.outstanding > 0
                ? "text-amber-300"
                : "text-emerald-400"
            }
          />

          <InfoRow
            icon={<Clock3 className="h-4 w-4" />}
            label="Last Activity"
            value={client.lastActivity}
          />
        </InfoSection>
      </div>

      {/* Client activity summary */}
      <section className="rounded-2xl border border-white/8 bg-[#0b1020]">
        <div className="border-b border-white/8 px-5 py-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-400/10">
              <CalendarDays className="h-4 w-4 text-violet-400" />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white">
                Client Activity
              </h3>

              <p className="text-xs text-slate-600">
                Recent activity associated with this client
              </p>
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <div className="space-y-5">
            <ActivityItem
              icon={<CheckCircle2 className="h-4 w-4" />}
              iconClass="bg-emerald-400/10 text-emerald-400"
              title="Client account active"
              description="Client profile is currently active."
              date={client.lastActivity}
            />

            <ActivityItem
              icon={<FolderKanban className="h-4 w-4" />}
              iconClass="bg-blue-400/10 text-blue-400"
              title={`${client.projects} active ${
                client.projects === 1 ? "project" : "projects"
              }`}
              description="Projects are currently associated with this client."
              date="Current"
            />

            <ActivityItem
              icon={<Receipt className="h-4 w-4" />}
              iconClass="bg-amber-400/10 text-amber-400"
              title={
                client.outstanding > 0
                  ? "Outstanding invoice balance"
                  : "No outstanding balance"
              }
              description={
                client.outstanding > 0
                  ? `${formatCurrency(
                      client.outstanding
                    )} remains outstanding.`
                  : "All current invoices are settled."
              }
              date="Current"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function InfoSection({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-white/8 bg-[#0b1020]">
      <div className="flex items-center gap-2 border-b border-white/8 px-5 py-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400">
          {icon}
        </div>

        <h3 className="text-sm font-semibold text-white">
          {title}
        </h3>
      </div>

      <div className="divide-y divide-white/6 px-5">
        {children}
      </div>
    </section>
  );
}

function InfoRow({
  icon,
  label,
  value,
  href,
  valueClassName = "text-slate-300",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  valueClassName?: string;
}) {
  const content = (
    <div className="flex items-start gap-3 py-4">
      <div className="mt-0.5 shrink-0 text-slate-600">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-wide text-slate-600">
          {label}
        </p>

        <p
          className={`mt-1 truncate text-sm font-medium transition ${
            href
              ? "hover:text-cyan-300"
              : ""
          } ${valueClassName}`}
        >
          {value}
        </p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        className="block transition"
      >
        {content}
      </a>
    );
  }

  return content;
}

function ActivityItem({
  icon,
  iconClass,
  title,
  description,
  date,
}: {
  icon: React.ReactNode;
  iconClass: string;
  title: string;
  description: string;
  date: string;
}) {
  return (
    <div className="flex gap-3">
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${iconClass}`}
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-medium text-slate-200">
            {title}
          </p>

          <span className="text-[11px] text-slate-600">
            {date}
          </span>
        </div>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: ClientDetailsData["status"];
}) {
  const styles = {
    Active:
      "border-emerald-400/15 bg-emerald-400/10 text-emerald-400",
    Inactive:
      "border-slate-400/15 bg-slate-400/10 text-slate-400",
    Pending:
      "border-amber-400/15 bg-amber-400/10 text-amber-300",
  };

  const dots = {
    Active: "bg-emerald-400",
    Inactive: "bg-slate-500",
    Pending: "bg-amber-400",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${styles[status]}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${dots[status]}`}
      />

      {status}
    </span>
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function formatCurrency(value: number) {
  return `₱${value.toLocaleString("en-PH")}`;
}