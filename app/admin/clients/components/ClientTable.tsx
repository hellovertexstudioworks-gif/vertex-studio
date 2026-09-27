"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  ChevronRight,
  Mail,
  MoreHorizontal,
  Phone,
  Wallet,
} from "lucide-react";

export type Client = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: "Active" | "Inactive" | "Pending";
  projects: number;
  outstanding: number;
  lastActivity: string;
  companyType: string;
};

type ClientTableProps = {
  clients: Client[];
};

export default function ClientTable({ clients }: ClientTableProps) {
  if (clients.length === 0) {
    return (
      <div className="w-full rounded-2xl border border-white/8 bg-[#0b1020] px-6 py-16 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10">
          <Building2 className="h-6 w-6 text-cyan-400" />
        </div>

        <h3 className="mt-4 text-base font-semibold text-white">
          No clients found
        </h3>

        <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
          Try changing your search or filters to find the client you're
          looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-white/8 bg-[#0b1020]">
      {/* Desktop table */}
      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full min-w-[1000px]">
          <thead>
            <tr className="border-b border-white/8 bg-white/[0.02]">
              <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                Client
              </th>

              <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                Contact
              </th>

              <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                Status
              </th>

              <th className="px-5 py-4 text-center text-xs font-medium uppercase tracking-wider text-slate-500">
                Projects
              </th>

              <th className="px-5 py-4 text-right text-xs font-medium uppercase tracking-wider text-slate-500">
                Outstanding
              </th>

              <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                Last Activity
              </th>

              <th className="w-12 px-3 py-4" />
            </tr>
          </thead>

          <tbody className="divide-y divide-white/6">
            {clients.map((client) => (
              <tr
                key={client.id}
                className="group transition-colors duration-200 hover:bg-white/[0.025]"
              >
                {/* Client */}
                <td className="px-5 py-4">
                  <Link
                    href={`/admin/clients/${client.id}`}
                    className="flex items-center gap-3"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 text-sm font-semibold text-cyan-300">
                      {getInitials(client.name)}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-white transition group-hover:text-cyan-300">
                        {client.name}
                      </p>

                      <div className="mt-1 flex items-center gap-1.5">
                        <Building2 className="h-3 w-3 text-slate-600" />

                        <span className="truncate text-xs text-slate-500">
                          {client.company}
                        </span>
                      </div>
                    </div>
                  </Link>
                </td>

                {/* Contact */}
                <td className="px-5 py-4">
                  <div className="space-y-1.5">
                    <a
                      href={`mailto:${client.email}`}
                      className="flex items-center gap-2 text-xs text-slate-400 transition hover:text-cyan-300"
                    >
                      <Mail className="h-3.5 w-3.5 text-slate-600" />
                      <span>{client.email}</span>
                    </a>

                    <a
                      href={`tel:${client.phone}`}
                      className="flex items-center gap-2 text-xs text-slate-500 transition hover:text-cyan-300"
                    >
                      <Phone className="h-3.5 w-3.5 text-slate-600" />
                      <span>{client.phone}</span>
                    </a>
                  </div>
                </td>

                {/* Status */}
                <td className="px-5 py-4">
                  <StatusBadge status={client.status} />
                </td>

                {/* Projects */}
                <td className="px-5 py-4 text-center">
                  <span className="inline-flex min-w-8 items-center justify-center rounded-lg bg-blue-400/10 px-2.5 py-1.5 text-xs font-semibold text-blue-300">
                    {client.projects}
                  </span>
                </td>

                {/* Outstanding */}
                <td className="px-5 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Wallet className="h-3.5 w-3.5 text-amber-400/70" />

                    <span
                      className={`text-sm font-medium ${
                        client.outstanding > 0
                          ? "text-amber-300"
                          : "text-emerald-400"
                      }`}
                    >
                      {formatCurrency(client.outstanding)}
                    </span>
                  </div>
                </td>

                {/* Activity */}
                <td className="px-5 py-4">
                  <span className="text-xs text-slate-400">
                    {client.lastActivity}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-3 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/admin/clients/${client.id}`}
                      aria-label={`View ${client.name}`}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-cyan-400/10 hover:text-cyan-300"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>

                    <button
                      type="button"
                      aria-label={`More options for ${client.name}`}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 transition hover:bg-white/5 hover:text-white"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile / tablet cards */}
      <div className="divide-y divide-white/6 lg:hidden">
        {clients.map((client) => (
          <Link
            key={client.id}
            href={`/admin/clients/${client.id}`}
            className="block p-5 transition-colors hover:bg-white/[0.025]"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 text-sm font-semibold text-cyan-300">
                {getInitials(client.name)}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-white">
                      {client.name}
                    </h3>

                    <p className="mt-1 flex items-center gap-1.5 truncate text-xs text-slate-500">
                      <Building2 className="h-3 w-3 shrink-0" />
                      {client.company}
                    </p>
                  </div>

                  <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-slate-600" />
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <StatusBadge status={client.status} />

                  <span className="rounded-lg bg-blue-400/10 px-2.5 py-1 text-xs font-medium text-blue-300">
                    {client.projects}{" "}
                    {client.projects === 1 ? "Project" : "Projects"}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-white/6 bg-[#060914] p-3">
                    <p className="text-[11px] text-slate-600">
                      Outstanding
                    </p>

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

                  <div className="rounded-xl border border-white/6 bg-[#060914] p-3">
                    <p className="text-[11px] text-slate-600">
                      Last Activity
                    </p>

                    <p className="mt-1 truncate text-sm font-medium text-slate-300">
                      {client.lastActivity}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: Client["status"];
}) {
  const styles = {
    Active: "bg-emerald-400/10 text-emerald-400 border-emerald-400/15",
    Inactive: "bg-slate-400/10 text-slate-400 border-slate-400/15",
    Pending: "bg-amber-400/10 text-amber-300 border-amber-400/15",
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