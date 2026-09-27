"use client";

import {
  Users,
  UserCheck,
  UserPlus,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

type ClientStatsProps = {
  totalClients?: number;
  activeClients?: number;
  newClients?: number;
  outstandingBalance?: number;
};

export default function ClientStats({
  totalClients = 24,
  activeClients = 21,
  newClients = 4,
  outstandingBalance = 48500,
}: ClientStatsProps) {
  const stats = [
    {
      label: "Total Clients",
      value: totalClients.toLocaleString(),
      change: "+12.5%",
      changeLabel: "vs last month",
      icon: Users,
      iconColor: "text-cyan-400",
      iconBg: "bg-cyan-400/10",
      trend: "up",
    },
    {
      label: "Active Clients",
      value: activeClients.toLocaleString(),
      change: "+8.3%",
      changeLabel: "vs last month",
      icon: UserCheck,
      iconColor: "text-emerald-400",
      iconBg: "bg-emerald-400/10",
      trend: "up",
    },
    {
      label: "New This Month",
      value: newClients.toLocaleString(),
      change: "+4",
      changeLabel: "new clients",
      icon: UserPlus,
      iconColor: "text-violet-400",
      iconBg: "bg-violet-400/10",
      trend: "up",
    },
    {
      label: "Outstanding Balance",
      value: `₱${outstandingBalance.toLocaleString()}`,
      change: "-6.4%",
      changeLabel: "vs last month",
      icon: Wallet,
      iconColor: "text-amber-400",
      iconBg: "bg-amber-400/10",
      trend: "down",
    },
  ];

  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        const isPositive = stat.trend === "up";

        return (
          <div
            key={stat.label}
            className="group relative overflow-hidden rounded-2xl border border-white/8 bg-[#0b1020] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/20 hover:bg-[#0d1325]"
          >
            {/* Soft background glow */}
            <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-cyan-400/5 blur-2xl transition-all duration-500 group-hover:bg-cyan-400/10" />

            <div className="relative">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-400">
                    {stat.label}
                  </p>

                  <p className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                    {stat.value}
                  </p>
                </div>

                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${stat.iconBg}`}
                >
                  <Icon className={`h-5 w-5 ${stat.iconColor}`} />
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2 text-xs">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-1 font-medium ${
                    isPositive
                      ? "bg-emerald-400/10 text-emerald-400"
                      : "bg-cyan-400/10 text-cyan-400"
                  }`}
                >
                  {isPositive ? (
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  ) : (
                    <ArrowDownRight className="h-3.5 w-3.5" />
                  )}

                  {stat.change}
                </span>

                <span className="text-slate-500">
                  {stat.changeLabel}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}