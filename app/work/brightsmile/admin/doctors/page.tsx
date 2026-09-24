"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  Award,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Mail,
  Search,
  Stethoscope,
  Users,
  X,
} from "lucide-react";

type DoctorStatus = "On Duty" | "Off Duty";

type Doctor = {
  id: string;
  name: string;
  specialty: string;
  category: string;
  credentials: string;
  experience: string;
  status: DoctorStatus;
  schedule: string;
  email: string;
  phone: string;
  patientsToday: number;
  nextAvailable: string;
  initials: string;
};

const doctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Emily Carter",
    specialty: "Cosmetic & General Dentistry",
    category: "General Dentistry",
    credentials: "DDS · Cosmetic Dentistry",
    experience: "12+ years",
    status: "On Duty",
    schedule: "09:00 AM – 05:00 PM",
    email: "emily.carter@example-demo.com",
    phone: "(555) 010-1001",
    patientsToday: 8,
    nextAvailable: "10:30 AM",
    initials: "EC",
  },
  {
    id: "2",
    name: "Dr. Michael Anderson",
    specialty: "Orthodontics & Restorative Dentistry",
    category: "Orthodontics",
    credentials: "DDS · Orthodontic Care",
    experience: "10+ years",
    status: "On Duty",
    schedule: "10:00 AM – 06:00 PM",
    email: "michael.anderson@example-demo.com",
    phone: "(555) 010-1002",
    patientsToday: 6,
    nextAvailable: "11:15 AM",
    initials: "MA",
  },
  {
    id: "3",
    name: "Dr. Sophia Williams",
    specialty: "Pediatric & Family Dentistry",
    category: "Pediatric Dentistry",
    credentials: "DDS · Pediatric Dentistry",
    experience: "8+ years",
    status: "On Duty",
    schedule: "01:00 PM – 07:00 PM",
    email: "sophia.williams@example-demo.com",
    phone: "(555) 010-1003",
    patientsToday: 5,
    nextAvailable: "02:30 PM",
    initials: "SW",
  },
  {
    id: "4",
    name: "Dr. Daniel Brooks",
    specialty: "Oral Surgery & Implants",
    category: "Oral Surgery",
    credentials: "DDS · Oral Surgery & Implants",
    experience: "14+ years",
    status: "On Duty",
    schedule: "08:00 AM – 04:00 PM",
    email: "daniel.brooks@example-demo.com",
    phone: "(555) 010-1004",
    patientsToday: 7,
    nextAvailable: "01:45 PM",
    initials: "DB",
  },
  {
    id: "5",
    name: "Dr. Olivia Bennett",
    specialty: "Endodontics & Root Canal Care",
    category: "Endodontics",
    credentials: "DDS · Endodontic Care",
    experience: "9+ years",
    status: "On Duty",
    schedule: "09:30 AM – 05:30 PM",
    email: "olivia.bennett@example-demo.com",
    phone: "(555) 010-1005",
    patientsToday: 6,
    nextAvailable: "03:15 PM",
    initials: "OB",
  },
  {
    id: "6",
    name: "Dr. James Mitchell",
    specialty: "Prosthodontics & Restorative Care",
    category: "Prosthodontics",
    credentials: "DDS · Prosthodontic Care",
    experience: "11+ years",
    status: "Off Duty",
    schedule: "10:00 AM – 06:00 PM",
    email: "james.mitchell@example-demo.com",
    phone: "(555) 010-1006",
    patientsToday: 0,
    nextAvailable: "Tomorrow",
    initials: "JM",
  },
];

const categories = [
  "All Specialties",
  "General Dentistry",
  "Orthodontics",
  "Pediatric Dentistry",
  "Oral Surgery",
  "Endodontics",
  "Prosthodontics",
];

export default function DoctorsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Specialties");
  const [status, setStatus] = useState<"All" | DoctorStatus>("All");

  const filteredDoctors = useMemo(() => {
    const query = search.trim().toLowerCase();

    return doctors.filter((doctor) => {
      const matchesSearch =
        !query ||
        doctor.name.toLowerCase().includes(query) ||
        doctor.specialty.toLowerCase().includes(query) ||
        doctor.category.toLowerCase().includes(query) ||
        doctor.credentials.toLowerCase().includes(query);

      const matchesCategory =
        category === "All Specialties" || doctor.category === category;

      const matchesStatus =
        status === "All" || doctor.status === status;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [search, category, status]);

  const onDuty = doctors.filter(
    (doctor) => doctor.status === "On Duty",
  ).length;

  const totalPatientsToday = doctors.reduce(
    (total, doctor) => total + doctor.patientsToday,
    0,
  );

  const specialties = new Set(doctors.map((doctor) => doctor.category)).size;

  const hasFilters =
    search !== "" ||
    category !== "All Specialties" ||
    status !== "All";

  const clearFilters = () => {
    setSearch("");
    setCategory("All Specialties");
    setStatus("All");
  };

  return (
    <main className="w-full px-5 pt-12 pb-8 sm:px-8 sm:pt-12 sm:pb-8 xl:px-10">
      <div className="w-full">
        {/* Header */}
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-blue-600">
              <Stethoscope size={13} />
              Doctor Management
            </div>

            <h1 className="text-3xl font-black tracking-tight text-slate-900">
              Doctors
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Manage the BrightSmile dental team, specialties, schedules,
              availability, and doctor profiles from one place.
            </p>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-xs font-semibold leading-5 text-blue-700">
            Portfolio demo · Fictional doctor data
          </div>
        </div>

        {/* Stats */}
        <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Users size={19} />
            </div>

            <p className="mt-4 text-xs font-semibold text-slate-400">
              Total Doctors
            </p>

            <p className="mt-1 text-3xl font-black text-slate-900">
              {doctors.length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Activity size={19} />
            </div>

            <p className="mt-4 text-xs font-semibold text-slate-400">
              On Duty Today
            </p>

            <p className="mt-1 text-3xl font-black text-slate-900">
              {onDuty}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <CalendarDays size={19} />
            </div>

            <p className="mt-4 text-xs font-semibold text-slate-400">
              Patients Today
            </p>

            <p className="mt-1 text-3xl font-black text-slate-900">
              {totalPatientsToday}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Award size={19} />
            </div>

            <p className="mt-4 text-xs font-semibold text-slate-400">
              Specialties
            </p>

            <p className="mt-1 text-3xl font-black text-slate-900">
              {specialties}
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
            <div className="relative min-w-0 flex-1">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search doctor name, specialty, or credentials..."
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

            <div className="relative">
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 pr-10 text-sm font-semibold text-slate-600 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-50 xl:w-52"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={15}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>

            <div className="relative">
              <select
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value as "All" | DoctorStatus)
                }
                className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 pr-10 text-sm font-semibold text-slate-600 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-50 xl:w-40"
              >
                <option value="All">All Status</option>
                <option value="On Duty">On Duty</option>
                <option value="Off Duty">Off Duty</option>
              </select>

              <ChevronDown
                size={15}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>

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

          {hasFilters && (
            <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3">
              <span className="text-[11px] font-semibold text-slate-400">
                Active filters:
              </span>

              {search && (
                <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold text-blue-600">
                  Search: {search}
                </span>
              )}

              {category !== "All Specialties" && (
                <span className="rounded-full bg-purple-50 px-3 py-1 text-[11px] font-bold text-purple-600">
                  {category}
                </span>
              )}

              {status !== "All" && (
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-600">
                  {status}
                </span>
              )}
            </div>
          )}
        </section>

        {/* Doctor Directory */}
        <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-2 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-base font-black text-slate-900">
                Doctor Directory
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Showing {filteredDoctors.length} of {doctors.length} demo
                doctors
              </p>
            </div>

            <div className="inline-flex items-center gap-2 text-[10px] font-bold text-slate-400">
              <CheckCircle2 size={14} />
              Sample records only
            </div>
          </div>

          <div className="grid gap-5 p-5 lg:grid-cols-2 xl:grid-cols-3">
            {filteredDoctors.map((doctor) => (
              <article
                key={doctor.id}
                className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-sm font-black text-blue-600">
                      {doctor.initials}
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-black text-slate-900">
                        {doctor.name}
                      </h3>

                      <p className="mt-1 truncate text-[11px] font-semibold text-blue-600">
                        {doctor.specialty}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${
                      doctor.status === "On Duty"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        doctor.status === "On Duty"
                          ? "bg-emerald-500"
                          : "bg-slate-400"
                      }`}
                    />
                    {doctor.status}
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-[10px] font-semibold text-slate-400">
                      Credentials
                    </p>

                    <p className="mt-1 text-xs font-bold text-slate-700">
                      {doctor.credentials}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-[10px] font-semibold text-slate-400">
                      Experience
                    </p>

                    <p className="mt-1 text-xs font-bold text-slate-700">
                      {doctor.experience}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-400">
                      <Clock3 size={12} />
                      Schedule
                    </p>

                    <p className="mt-1 text-xs font-bold text-slate-700">
                      {doctor.schedule}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-400">
                      <Users size={12} />
                      Patients Today
                    </p>

                    <p className="mt-1 text-xs font-bold text-slate-700">
                      {doctor.patientsToday}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between rounded-xl border border-blue-100 bg-blue-50 px-3 py-2.5">
                  <span className="text-[10px] font-semibold text-slate-500">
                    Next available
                  </span>

                  <span className="text-xs font-black text-blue-600">
                    {doctor.nextAvailable}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <a
                    href={`mailto:${doctor.email}`}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-[11px] font-bold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                  >
                    <Mail size={14} />
                    Email
                  </a>

                  <Link
                    href={`/work/brightsmile/admin/doctors/${doctor.id}`}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-blue-600 px-3 text-[11px] font-bold text-white transition hover:bg-blue-700"
                  >
                    View Profile
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {filteredDoctors.length === 0 && (
            <div className="px-5 py-16 text-center">
              <Search size={30} className="mx-auto text-slate-300" />

              <p className="mt-4 text-sm font-black text-slate-700">
                No doctors found
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Try changing your search or filters.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-4 inline-flex h-9 items-center gap-2 rounded-lg bg-blue-600 px-4 text-xs font-bold text-white transition hover:bg-blue-700"
              >
                Clear Filters
              </button>
            </div>
          )}
        </section>

        {/* Bottom Feature Cards */}
        <section className="mt-6 grid gap-5 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Stethoscope size={19} />
            </div>

            <h3 className="mt-4 text-sm font-black text-slate-900">
              Doctor Profiles
            </h3>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Each doctor has a dedicated profile with credentials,
              specialties, contact information, and schedule details.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <CalendarDays size={19} />
            </div>

            <h3 className="mt-4 text-sm font-black text-slate-900">
              Schedule Management
            </h3>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              View each doctor's weekly schedule and see available, booked,
              and break time slots from their profile.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Activity size={19} />
            </div>

            <h3 className="mt-4 text-sm font-black text-slate-900">
              Availability
            </h3>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Quickly identify which doctors are on duty and when the next
              appointment slot is available.
            </p>
          </div>
        </section>

        {/* Demo Notice */}
        <div className="mt-8 rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-700">
          <strong>Portfolio Demo:</strong> All doctor names, contact details,
          schedules, patient counts, and availability shown here are fictional
          sample data. This dashboard is a portfolio demonstration and does
          not contain real medical information or create real appointments.
        </div>
      </div>
    </main>
  );
}