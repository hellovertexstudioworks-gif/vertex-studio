"use client";

import {
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

type AppointmentFiltersProps = {
  search: string;
  setSearch: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
  doctor: string;
  setDoctor: (value: string) => void;
};

export default function AppointmentFilters({
  search,
  setSearch,
  status,
  setStatus,
  doctor,
  setDoctor,
}: AppointmentFiltersProps) {
  const hasFilters =
    search !== "" || status !== "All" || doctor !== "All";

  const clearFilters = () => {
    setSearch("");
    setStatus("All");
    setDoctor("All");
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
        {/* Search */}
        <div className="relative min-w-0 flex-1">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search patient, doctor, or service..."
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-10 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-50"
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center text-slate-400 transition hover:text-slate-700"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Filter Label */}
        <div className="hidden items-center gap-2 xl:flex">
          <SlidersHorizontal
            size={16}
            className="text-slate-400"
          />

          <span className="text-xs font-bold text-slate-500">
            Filters
          </span>
        </div>

        {/* Status */}
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-600 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-50"
        >
          <option value="All">All Status</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Pending">Pending</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Waitlist">Waitlist</option>
        </select>

        {/* Doctor */}
        <select
          value={doctor}
          onChange={(event) => setDoctor(event.target.value)}
          className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-600 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-50"
        >
          <option value="All">All Doctors</option>

          <option value="Dr. Emily Carter">
            Dr. Emily Carter
          </option>

          <option value="Dr. Michael Anderson">
            Dr. Michael Anderson
          </option>

          <option value="Dr. Sophia Williams">
            Dr. Sophia Williams
          </option>

          <option value="Dr. Daniel Brooks">
            Dr. Daniel Brooks
          </option>

          <option value="Dr. Olivia Bennett">
            Dr. Olivia Bennett
          </option>

          <option value="Dr. James Mitchell">
            Dr. James Mitchell
          </option>
        </select>

        {/* Clear */}
        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-xs font-bold text-slate-500 transition hover:border-red-100 hover:bg-red-50 hover:text-red-600"
          >
            <X size={15} />
            Clear
          </button>
        )}
      </div>

      {/* Active Filters */}
      {hasFilters && (
        <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3">
          <span className="text-[11px] font-semibold text-slate-400">
            Active:
          </span>

          {search && (
            <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold text-blue-600">
              Search: {search}
            </span>
          )}

          {status !== "All" && (
            <span className="rounded-full bg-amber-50 px-3 py-1 text-[11px] font-bold text-amber-600">
              {status}
            </span>
          )}

          {doctor !== "All" && (
            <span className="rounded-full bg-purple-50 px-3 py-1 text-[11px] font-bold text-purple-600">
              {doctor}
            </span>
          )}
        </div>
      )}
    </div>
  );
}