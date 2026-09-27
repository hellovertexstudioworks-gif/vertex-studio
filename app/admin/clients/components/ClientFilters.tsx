"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";

type ClientFiltersProps = {
  search: string;
  setSearch: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
  company: string;
  setCompany: (value: string) => void;
};

export default function ClientFilters({
  search,
  setSearch,
  status,
  setStatus,
  company,
  setCompany,
}: ClientFiltersProps) {
  const hasFilters =
    search.trim() !== "" ||
    status !== "All" ||
    company !== "All";

  const clearFilters = () => {
    setSearch("");
    setStatus("All");
    setCompany("All");
  };

  return (
    <div className="w-full rounded-2xl border border-white/8 bg-[#0b1020] p-4">
      <div className="flex flex-col gap-4">
        {/* Filter heading */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/10">
              <SlidersHorizontal className="h-4 w-4 text-cyan-400" />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-white">
                Client Directory
              </h2>

              <p className="text-xs text-slate-500">
                Search and filter your clients
              </p>
            </div>
          </div>

          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-1.5 self-start rounded-lg px-3 py-2 text-xs font-medium text-slate-400 transition hover:bg-white/5 hover:text-white sm:self-auto"
            >
              <X className="h-3.5 w-3.5" />
              Clear filters
            </button>
          )}
        </div>

        {/* Search + filters */}
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_180px_180px]">
          {/* Search */}
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search clients, companies, or email..."
              className="h-11 w-full rounded-xl border border-white/8 bg-[#060914] pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/10"
            />
          </div>

          {/* Status */}
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="h-11 w-full rounded-xl border border-white/8 bg-[#060914] px-3 text-sm text-slate-300 outline-none transition focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/10"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Pending">Pending</option>
          </select>

          {/* Company */}
          <select
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            className="h-11 w-full rounded-xl border border-white/8 bg-[#060914] px-3 text-sm text-slate-300 outline-none transition focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/10"
          >
            <option value="All">All Companies</option>
            <option value="Startup">Startup</option>
            <option value="Small Business">Small Business</option>
            <option value="Agency">Agency</option>
            <option value="Professional Services">
              Professional Services
            </option>
            <option value="E-commerce">E-commerce</option>
          </select>
        </div>
      </div>
    </div>
  );
}