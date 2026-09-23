"use client";

import { useMemo, useState } from "react";
import {
  Award,
  CalendarDays,
  Clock3,
  Search,
  Stethoscope,
  UserRound,
  CheckCircle2,
  XCircle,
  ArrowUpRight,
} from "lucide-react";

import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";

type DoctorStatus = "On Duty" | "Off Duty";

type Doctor = {
  id: number;
  name: string;
  specialty: string;
  category: string;
  experience: string;
  schedule: string;
  status: DoctorStatus;
  credentials: string;
  appointmentsToday: number;
};

const doctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Emily Carter",
    specialty: "Cosmetic & General Dentistry",
    category: "General Dentistry",
    experience: "12+ years",
    schedule: "09:00 AM – 05:00 PM",
    status: "On Duty",
    credentials: "DDS · Cosmetic Dentistry",
    appointmentsToday: 8,
  },
  {
    id: 2,
    name: "Dr. Michael Anderson",
    specialty: "Orthodontics & Restorative Dentistry",
    category: "Orthodontics",
    experience: "10+ years",
    schedule: "10:00 AM – 06:00 PM",
    status: "On Duty",
    credentials: "DDS · Orthodontic Care",
    appointmentsToday: 7,
  },
  {
    id: 3,
    name: "Dr. Sophia Williams",
    specialty: "Pediatric & Family Dentistry",
    category: "Pediatric Dentistry",
    experience: "8+ years",
    schedule: "01:00 PM – 07:00 PM",
    status: "On Duty",
    credentials: "DDS · Pediatric Dentistry",
    appointmentsToday: 6,
  },
  {
    id: 4,
    name: "Dr. Daniel Brooks",
    specialty: "Oral Surgery & Implants",
    category: "Oral Surgery",
    experience: "14+ years",
    schedule: "08:00 AM – 04:00 PM",
    status: "On Duty",
    credentials: "DDS · Oral Surgery & Implants",
    appointmentsToday: 5,
  },
  {
    id: 5,
    name: "Dr. Olivia Bennett",
    specialty: "Endodontics & Root Canal Care",
    category: "Endodontics",
    experience: "9+ years",
    schedule: "09:30 AM – 05:30 PM",
    status: "On Duty",
    credentials: "DDS · Endodontic Care",
    appointmentsToday: 6,
  },
  {
    id: 6,
    name: "Dr. James Mitchell",
    specialty: "Prosthodontics & Restorative Care",
    category: "Prosthodontics",
    experience: "11+ years",
    schedule: "10:00 AM – 06:00 PM",
    status: "Off Duty",
    credentials: "DDS · Prosthodontic Care",
    appointmentsToday: 0,
  },
];

export default function DoctorsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [specialty, setSpecialty] = useState("All");

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        doctor.name.toLowerCase().includes(searchValue) ||
        doctor.specialty.toLowerCase().includes(searchValue) ||
        doctor.category.toLowerCase().includes(searchValue);

      const matchesStatus =
        status === "All" || doctor.status === status;

      const matchesSpecialty =
        specialty === "All" || doctor.category === specialty;

      return matchesSearch && matchesStatus && matchesSpecialty;
    });
  }, [search, status, specialty]);

  const onDutyCount = doctors.filter(
    (doctor) => doctor.status === "On Duty"
  ).length;

  const offDutyCount = doctors.filter(
    (doctor) => doctor.status === "Off Duty"
  ).length;

  const totalAppointments = doctors.reduce(
    (total, doctor) => total + doctor.appointmentsToday,
    0
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <AdminSidebar />

      <div className="lg:pl-64">
        <AdminHeader />

        <main className="px-5 py-6 sm:px-8 sm:py-8">
          {/* Page Heading */}
          <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-blue-600">
                Practice Management
              </p>

              <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                Doctors
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Manage your dental team, specialties, working hours,
                availability, and daily appointment schedules.
              </p>
            </div>

            <button
              type="button"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
            >
              <UserRound size={18} />
              Add Doctor
            </button>
          </div>

          {/* Stats */}
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {/* Total Doctors */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Stethoscope size={19} />
                </div>

                <p className="text-sm font-semibold text-slate-500">
                  Total Doctors
                </p>
              </div>

              <p className="mt-4 text-3xl font-black text-slate-900">
                {doctors.length}
              </p>
            </div>

            {/* On Duty */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <CheckCircle2 size={19} />
                </div>

                <p className="text-sm font-semibold text-slate-500">
                  On Duty
                </p>
              </div>

              <p className="mt-4 text-3xl font-black text-slate-900">
                {onDutyCount}
              </p>
            </div>

            {/* Off Duty */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                  <XCircle size={19} />
                </div>

                <p className="text-sm font-semibold text-slate-500">
                  Off Duty
                </p>
              </div>

              <p className="mt-4 text-3xl font-black text-slate-900">
                {offDutyCount}
              </p>
            </div>

            {/* Appointments */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                  <CalendarDays size={19} />
                </div>

                <p className="text-sm font-semibold text-slate-500">
                  Today's Visits
                </p>
              </div>

              <p className="mt-4 text-3xl font-black text-slate-900">
                {totalAppointments}
              </p>
            </div>
          </section>

          {/* Filters */}
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
              {/* Search */}
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search doctor or specialty..."
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-50"
                />
              </div>

              {/* Status */}
              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-600 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-50"
              >
                <option value="All">All Status</option>
                <option value="On Duty">On Duty</option>
                <option value="Off Duty">Off Duty</option>
              </select>

              {/* Specialty */}
              <select
                value={specialty}
                onChange={(event) => setSpecialty(event.target.value)}
                className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-600 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-50"
              >
                <option value="All">All Specialties</option>
                <option value="General Dentistry">
                  General Dentistry
                </option>
                <option value="Orthodontics">
                  Orthodontics
                </option>
                <option value="Pediatric Dentistry">
                  Pediatric Dentistry
                </option>
                <option value="Oral Surgery">
                  Oral Surgery
                </option>
                <option value="Endodontics">
                  Endodontics
                </option>
                <option value="Prosthodontics">
                  Prosthodontics
                </option>
              </select>
            </div>
          </section>

          {/* Doctor Grid */}
          <section className="mt-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black text-slate-900">
                  Dental Team
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  Showing {filteredDoctors.length} of {doctors.length} doctors
                </p>
              </div>
            </div>

            {filteredDoctors.length > 0 ? (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {filteredDoctors.map((doctor) => (
                  <article
                    key={doctor.id}
                    className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-lg"
                  >
                    {/* Top */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                          <Stethoscope size={22} />
                        </div>

                        <div>
                          <p className="text-sm font-black text-slate-900">
                            {doctor.name}
                          </p>

                          <p className="mt-1 text-[11px] text-slate-400">
                            {doctor.experience} experience
                          </p>
                        </div>
                      </div>

                      {/* Status */}
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[10px] font-bold ${
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

                    {/* Specialty */}
                    <div className="mt-6">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Specialty
                      </p>

                      <h3 className="mt-1 text-base font-black leading-6 text-slate-900">
                        {doctor.specialty}
                      </h3>
                    </div>

                    {/* Credentials */}
                    <div className="mt-5 flex items-center gap-2">
                      <Award
                        size={16}
                        className="text-blue-500"
                      />

                      <span className="text-xs font-semibold text-slate-500">
                        {doctor.credentials}
                      </span>
                    </div>

                    {/* Schedule */}
                    <div className="mt-5 rounded-xl bg-slate-50 p-4">
                      <div className="flex items-center gap-2">
                        <Clock3
                          size={16}
                          className="text-blue-500"
                        />

                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Today's Schedule
                        </span>
                      </div>

                      <p className="mt-2 text-sm font-black text-slate-800">
                        {doctor.schedule}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-5">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Today's Appointments
                        </p>

                        <p className="mt-1 text-lg font-black text-slate-900">
                          {doctor.appointmentsToday}
                        </p>
                      </div>

                      <button
                        type="button"
                        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                      >
                        View Schedule
                        <ArrowUpRight size={14} />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                <Stethoscope
                  size={30}
                  className="mx-auto text-slate-300"
                />

                <h3 className="mt-4 text-sm font-bold text-slate-900">
                  No doctors found
                </h3>

                <p className="mt-1 text-xs text-slate-400">
                  Try changing your search or filters.
                </p>
              </div>
            )}
          </section>

          {/* Demo Notice */}
          <div className="mt-8 rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-700">
            <strong>Portfolio Demo:</strong> Doctor schedules and appointment
            counts shown here are fictional sample data.
          </div>
        </main>
      </div>
    </div>
  );
}