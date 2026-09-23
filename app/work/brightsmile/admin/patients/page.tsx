"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  FileText,
  Filter,
  Search,
  Stethoscope,
  UserRound,
  Users,
  X,
} from "lucide-react";

import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";

type PatientStatus = "Active" | "Inactive";

type Patient = {
  id: string;
  name: string;
  age: number;
  gender: "Female" | "Male";
  phone: string;
  email: string;
  doctor: string;
  lastAppointment: string;
  nextAppointment: string;
  treatment: string;
  balance: number;
  status: PatientStatus;
};

const patients: Patient[] = [
  {
    id: "P-1001",
    name: "Sarah Johnson",
    age: 29,
    gender: "Female",
    phone: "(555) 010-2001",
    email: "sarah.johnson@example-demo.com",
    doctor: "Dr. Emily Carter",
    lastAppointment: "Oct 14, 2026",
    nextAppointment: "Oct 28, 2026",
    treatment: "General Checkup",
    balance: 0,
    status: "Active",
  },
  {
    id: "P-1002",
    name: "Michael Brown",
    age: 42,
    gender: "Male",
    phone: "(555) 010-2002",
    email: "michael.brown@example-demo.com",
    doctor: "Dr. Daniel Brooks",
    lastAppointment: "Oct 12, 2026",
    nextAppointment: "Nov 03, 2026",
    treatment: "Dental Implants",
    balance: 850,
    status: "Active",
  },
  {
    id: "P-1003",
    name: "Emma Williams",
    age: 17,
    gender: "Female",
    phone: "(555) 010-2003",
    email: "emma.williams@example-demo.com",
    doctor: "Dr. Sophia Williams",
    lastAppointment: "Oct 18, 2026",
    nextAppointment: "Oct 30, 2026",
    treatment: "Pediatric Dentistry",
    balance: 120,
    status: "Active",
  },
  {
    id: "P-1004",
    name: "James Wilson",
    age: 36,
    gender: "Male",
    phone: "(555) 010-2004",
    email: "james.wilson@example-demo.com",
    doctor: "Dr. Michael Anderson",
    lastAppointment: "Oct 09, 2026",
    nextAppointment: "Nov 05, 2026",
    treatment: "Orthodontic Consultation",
    balance: 420,
    status: "Active",
  },
  {
    id: "P-1005",
    name: "Olivia Taylor",
    age: 31,
    gender: "Female",
    phone: "(555) 010-2005",
    email: "olivia.taylor@example-demo.com",
    doctor: "Dr. Olivia Bennett",
    lastAppointment: "Oct 16, 2026",
    nextAppointment: "Oct 27, 2026",
    treatment: "Root Canal Care",
    balance: 275,
    status: "Active",
  },
  {
    id: "P-1006",
    name: "Daniel Smith",
    age: 54,
    gender: "Male",
    phone: "(555) 010-2006",
    email: "daniel.smith@example-demo.com",
    doctor: "Dr. James Mitchell",
    lastAppointment: "Sep 29, 2026",
    nextAppointment: "Nov 10, 2026",
    treatment: "Restorative Care",
    balance: 0,
    status: "Active",
  },
  {
    id: "P-1007",
    name: "Sophia Miller",
    age: 25,
    gender: "Female",
    phone: "(555) 010-2007",
    email: "sophia.miller@example-demo.com",
    doctor: "Dr. Emily Carter",
    lastAppointment: "Oct 03, 2026",
    nextAppointment: "—",
    treatment: "Teeth Whitening",
    balance: 95,
    status: "Active",
  },
  {
    id: "P-1008",
    name: "Noah Davis",
    age: 39,
    gender: "Male",
    phone: "(555) 010-2008",
    email: "noah.davis@example-demo.com",
    doctor: "Dr. Daniel Brooks",
    lastAppointment: "Aug 21, 2026",
    nextAppointment: "—",
    treatment: "Implant Consultation",
    balance: 0,
    status: "Inactive",
  },
  {
    id: "P-1009",
    name: "Ava Martinez",
    age: 33,
    gender: "Female",
    phone: "(555) 010-2009",
    email: "ava.martinez@example-demo.com",
    doctor: "Dr. Olivia Bennett",
    lastAppointment: "Oct 19, 2026",
    nextAppointment: "Nov 02, 2026",
    treatment: "Endodontic Evaluation",
    balance: 180,
    status: "Active",
  },
  {
    id: "P-1010",
    name: "Lucas Anderson",
    age: 14,
    gender: "Male",
    phone: "(555) 010-2010",
    email: "lucas.anderson@example-demo.com",
    doctor: "Dr. Sophia Williams",
    lastAppointment: "Oct 11, 2026",
    nextAppointment: "Oct 25, 2026",
    treatment: "Family Dentistry",
    balance: 60,
    status: "Active",
  },
];

const doctors = [
  "All Doctors",
  "Dr. Emily Carter",
  "Dr. Michael Anderson",
  "Dr. Sophia Williams",
  "Dr. Daniel Brooks",
  "Dr. Olivia Bennett",
  "Dr. James Mitchell",
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function PatientsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"All" | PatientStatus>("All");
  const [doctor, setDoctor] = useState("All Doctors");

  const filteredPatients = useMemo(() => {
    const query = search.trim().toLowerCase();

    return patients.filter((patient) => {
      const matchesSearch =
        !query ||
        patient.name.toLowerCase().includes(query) ||
        patient.id.toLowerCase().includes(query) ||
        patient.email.toLowerCase().includes(query) ||
        patient.treatment.toLowerCase().includes(query);

      const matchesStatus =
        status === "All" || patient.status === status;

      const matchesDoctor =
        doctor === "All Doctors" || patient.doctor === doctor;

      return matchesSearch && matchesStatus && matchesDoctor;
    });
  }, [search, status, doctor]);

  const activePatients = patients.filter(
    (patient) => patient.status === "Active",
  ).length;

  const upcomingAppointments = patients.filter(
    (patient) => patient.nextAppointment !== "—",
  ).length;

  const outstandingBalance = patients.reduce(
    (total, patient) => total + patient.balance,
    0,
  );

  const clearFilters = () => {
    setSearch("");
    setStatus("All");
    setDoctor("All Doctors");
  };

  const hasFilters =
    search !== "" || status !== "All" || doctor !== "All Doctors";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <AdminSidebar />

      <div className="lg:pl-64">
        <AdminHeader />

        <main className="px-5 py-6 sm:px-8 sm:py-8">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-blue-600">
                <Users size={13} />
                Patient Management
              </div>

              <h1 className="text-3xl font-black tracking-tight text-slate-900">
                Patients
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Manage patient records, appointments, assigned doctors, and
                account balances from one place.
              </p>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-xs font-semibold leading-5 text-blue-700">
              Portfolio demo · Fictional patient data
            </div>
          </div>

          <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Users size={19} />
                </div>
                <span className="text-[10px] font-bold text-emerald-500">
                  +8.4%
                </span>
              </div>
              <p className="mt-4 text-xs font-semibold text-slate-400">
                Total Patients
              </p>
              <p className="mt-1 text-3xl font-black text-slate-900">
                {patients.length}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Activity size={19} />
              </div>
              <p className="mt-4 text-xs font-semibold text-slate-400">
                Active Patients
              </p>
              <p className="mt-1 text-3xl font-black text-slate-900">
                {activePatients}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <CalendarDays size={19} />
              </div>
              <p className="mt-4 text-xs font-semibold text-slate-400">
                Upcoming Appointments
              </p>
              <p className="mt-1 text-3xl font-black text-slate-900">
                {upcomingAppointments}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <CircleDollarSign size={19} />
              </div>
              <p className="mt-4 text-xs font-semibold text-slate-400">
                Outstanding Balance
              </p>
              <p className="mt-1 text-3xl font-black text-slate-900">
                {formatCurrency(outstandingBalance)}
              </p>
            </div>
          </section>

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
                  placeholder="Search patient name, ID, email, or treatment..."
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

              <div className="hidden items-center gap-2 xl:flex">
                <Filter size={16} className="text-slate-400" />
                <span className="text-xs font-bold text-slate-500">
                  Filters
                </span>
              </div>

              <div className="relative">
                <select
                  value={status}
                  onChange={(event) =>
                    setStatus(event.target.value as "All" | PatientStatus)
                  }
                  className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 pr-10 text-sm font-semibold text-slate-600 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-50 xl:w-40"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>

              <div className="relative">
                <select
                  value={doctor}
                  onChange={(event) => setDoctor(event.target.value)}
                  className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 pr-10 text-sm font-semibold text-slate-600 outline-none transition focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-50 xl:w-52"
                >
                  {doctors.map((item) => (
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

                {status !== "All" && (
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-600">
                    {status}
                  </span>
                )}

                {doctor !== "All Doctors" && (
                  <span className="rounded-full bg-purple-50 px-3 py-1 text-[11px] font-bold text-purple-600">
                    {doctor}
                  </span>
                )}
              </div>
            )}
          </section>

          <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-2 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-base font-black text-slate-900">
                  Patient Directory
                </h2>
                <p className="mt-1 text-xs text-slate-400">
                  Showing {filteredPatients.length} of {patients.length} demo
                  patient records
                </p>
              </div>

              <div className="inline-flex items-center gap-2 text-[10px] font-bold text-slate-400">
                <FileText size={14} />
                Sample records only
              </div>
            </div>

            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full min-w-[1050px]">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/70">
                    <th className="px-5 py-3 text-left text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Patient
                    </th>
                    <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Doctor
                    </th>
                    <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Treatment
                    </th>
                    <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Last Visit
                    </th>
                    <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Next Visit
                    </th>
                    <th className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Balance
                    </th>
                    <th className="px-5 py-3 text-left text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredPatients.map((patient) => (
                    <tr
                      key={patient.id}
                      className="group transition hover:bg-slate-50/70"
                    >
                      <td className="px-5 py-4">
                        <Link
                          href={`/work/brightsmile/admin/patients/${patient.id}`}
                          className="flex items-center gap-3"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-sm font-black text-blue-600">
                            {patient.name
                              .split(" ")
                              .map((part) => part[0])
                              .join("")
                              .slice(0, 2)}
                          </div>

                          <div className="min-w-0">
                            <p className="flex items-center gap-1 text-sm font-black text-slate-900 group-hover:text-blue-600">
                              {patient.name}
                              <ArrowUpRight
                                size={13}
                                className="opacity-0 transition group-hover:opacity-100"
                              />
                            </p>
                            <p className="mt-1 text-[10px] font-semibold text-slate-400">
                              {patient.id} · {patient.age} years ·{" "}
                              {patient.gender}
                            </p>
                          </div>
                        </Link>
                      </td>

                      <td className="px-4 py-4">
                        <p className="text-xs font-bold text-slate-700">
                          {patient.doctor}
                        </p>
                        <p className="mt-1 text-[10px] text-slate-400">
                          Assigned doctor
                        </p>
                      </td>

                      <td className="px-4 py-4">
                        <p className="text-xs font-semibold text-slate-600">
                          {patient.treatment}
                        </p>
                      </td>

                      <td className="px-4 py-4">
                        <p className="text-xs font-semibold text-slate-600">
                          {patient.lastAppointment}
                        </p>
                      </td>

                      <td className="px-4 py-4">
                        <p
                          className={`text-xs font-semibold ${
                            patient.nextAppointment === "—"
                              ? "text-slate-400"
                              : "text-blue-600"
                          }`}
                        >
                          {patient.nextAppointment}
                        </p>
                      </td>

                      <td className="px-4 py-4">
                        <p
                          className={`text-xs font-black ${
                            patient.balance > 0
                              ? "text-amber-600"
                              : "text-emerald-600"
                          }`}
                        >
                          {patient.balance > 0
                            ? formatCurrency(patient.balance)
                            : "Paid"}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${
                            patient.status === "Active"
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              patient.status === "Active"
                                ? "bg-emerald-500"
                                : "bg-slate-400"
                            }`}
                          />
                          {patient.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="divide-y divide-slate-100 lg:hidden">
              {filteredPatients.map((patient) => (
                <Link
                  key={patient.id}
                  href={`/work/brightsmile/admin/patients/${patient.id}`}
                  className="block p-5 transition hover:bg-slate-50"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xs font-black text-blue-600">
                        {patient.name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")
                          .slice(0, 2)}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-black text-slate-900">
                          {patient.name}
                        </p>
                        <p className="mt-1 text-[10px] font-semibold text-slate-400">
                          {patient.id} · {patient.age} years
                        </p>
                      </div>
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${
                        patient.status === "Active"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {patient.status}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-[10px] font-semibold text-slate-400">
                        Doctor
                      </p>
                      <p className="mt-1 truncate text-xs font-bold text-slate-700">
                        {patient.doctor}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] font-semibold text-slate-400">
                        Treatment
                      </p>
                      <p className="mt-1 truncate text-xs font-bold text-slate-700">
                        {patient.treatment}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] font-semibold text-slate-400">
                        Next Visit
                      </p>
                      <p className="mt-1 text-xs font-bold text-blue-600">
                        {patient.nextAppointment}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] font-semibold text-slate-400">
                        Balance
                      </p>
                      <p
                        className={`mt-1 text-xs font-black ${
                          patient.balance > 0
                            ? "text-amber-600"
                            : "text-emerald-600"
                        }`}
                      >
                        {patient.balance > 0
                          ? formatCurrency(patient.balance)
                          : "Paid"}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filteredPatients.length === 0 && (
              <div className="px-5 py-16 text-center">
                <Search size={30} className="mx-auto text-slate-300" />
                <p className="mt-4 text-sm font-black text-slate-700">
                  No patients found
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

          <section className="mt-6 grid gap-5 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <UserRound size={19} />
              </div>
              <h3 className="mt-4 text-sm font-black text-slate-900">
                Patient Profiles
              </h3>
              <p className="mt-2 text-xs leading-5 text-slate-500">
                Each patient can have a dedicated profile with appointments,
                treatment history, notes, and account information.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <Stethoscope size={19} />
              </div>
              <h3 className="mt-4 text-sm font-black text-slate-900">
                Doctor Assignment
              </h3>
              <p className="mt-2 text-xs leading-5 text-slate-500">
                Connect patients with doctors so the clinic team can see
                schedules, upcoming visits, and assigned care.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <CircleDollarSign size={19} />
              </div>
              <h3 className="mt-4 text-sm font-black text-slate-900">
                Billing Connection
              </h3>
              <p className="mt-2 text-xs leading-5 text-slate-500">
                Patient records can connect to invoices, payments, balances,
                and billing history in the clinic dashboard.
              </p>
            </div>
          </section>

          <div className="mt-8 rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-700">
            <strong>Portfolio Demo:</strong> All patient names, contact
            details, appointment dates, doctors, treatments, and balances
            shown here are fictional sample data. This dashboard is a
            portfolio demonstration and does not contain real patient
            information or create real medical records.
          </div>
        </main>
      </div>
    </div>
  );
}
