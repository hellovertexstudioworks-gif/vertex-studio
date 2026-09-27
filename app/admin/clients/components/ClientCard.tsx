"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  Mail,
  Phone,
  Wallet,
  FolderKanban,
} from "lucide-react";

export type ClientCardData = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: "Active" | "Inactive" | "Pending";
  projects: number;
  outstanding: number;
  lastActivity: string;
};

type ClientCardProps = {
  client: ClientCardData;
};

export default function ClientCard({ client }: ClientCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/8 bg-[#0b1020] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/20">
      {/* Subtle glow */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan-400/5 blur-3xl transition-all duration-500 group-hover:bg-cyan-400/10" />

      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <Link
            href={`/admin/clients/${client.id}`}
            className="flex min-w-0 items-center gap-3"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 text-sm font-semibold text-cyan-300">
              {getInitials(client.name)}
            </div>

            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold text-white transition group-hover:text-cyan-300">
                {client.name}
              </h3>

              <div className="mt-1 flex items-center gap-1.5">
                <Building2 className="h-3 w-3 shrink-0 text-slate-600" />

                <span className="truncate text-xs text-slate-500">
                  {client.company}
                </span>
              </div>
            </div>
          </Link>

          <Link
            href={`/admin/clients/${client.id}`}
            aria-label={`View ${client.name}`}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-cyan-400/10 hover:text-cyan-300"
          >
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Status */}
        <div className="mt-4">
          <StatusBadge status={client.status} />
        </div>

        {/* Contact */}
        <div className="mt-4 space-y-2 border-t border-white/6 pt-4">
          <a
            href={`mailto:${client.email}`}
            className="flex min-w-0 items-center gap-2 text-xs text-slate-400 transition hover:text-cyan-300"
          >
            <Mail className="h-3.5 w-3.5 shrink-0 text-slate-600" />
            <span className="truncate">{client.email}</span>
          </a>

          <a
            href={`tel:${client.phone}`}
            className="flex items-center gap-2 text-xs text-slate-500 transition hover:text-cyan-300"
          >
            <Phone className="h-3.5 w-3.5 shrink-0 text-slate-600" />
            <span>{client.phone}</span>
          </a>
        </div>

        {/* Stats */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/6 bg-[#060914] p-3">
            <div className="flex items-center gap-1.5">
              <FolderKanban className="h-3.5 w-3.5 text-blue-400" />

              <p className="text-[11px] text-slate-600">
                Projects
              </p>
            </div>

            <p className="mt-1 text-sm font-semibold text-white">
              {client.projects}
            </p>
          </div>

          <div className="rounded-xl border border-white/6 bg-[#060914] p-3">
            <div className="flex items-center gap-1.5">
              <Wallet className="h-3.5 w-3.5 text-amber-400" />

              <p className="text-[11px] text-slate-600">
                Outstanding
              </p>
            </div>

            <p
              className={`mt-1 text-sm font-semibold ${
                client.outstanding > 0
                  ? "text-amber-300"
                  : "text-emerald-400"
              }`}
            >
              {formatCurrency(client.outstanding)}
            </p>
          </div>
        </div>

        {/* Last activity */}
        <div className="mt-4 flex items-center justify-between border-t border-white/6 pt-4">
          <span className="text-[11px] text-slate-600">
            Last activity
          </span>

          <span className="text-xs font-medium text-slate-400">
            {client.lastActivity}
          </span>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: ClientCardData["status"];
}) {
  const styles = {
    Active: "border-emerald-400/15 bg-emerald-400/10 text-emerald-400",
    Inactive: "border-slate-400/15 bg-slate-400/10 text-slate-400",
    Pending: "border-amber-400/15 bg-amber-400/10 text-amber-300",
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
      <span className={`h-1.5 w-1.5 rounded-full ${dots[status]}`} />
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