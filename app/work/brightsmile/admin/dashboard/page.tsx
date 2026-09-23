"use client";

import {
  CalendarDays,
  Users,
  CreditCard,
  Clock3,
  ArrowUpRight,
  MoreHorizontal,
  CheckCircle2,
  CircleAlert,
  UserRound,
  Stethoscope,
} from "lucide-react";

const stats = [
  {
    label: "Total Patients",
    value: "1,284",
    change: "+8.2%",
    description: "vs. last month",
    icon: Users,
  },
  {
    label: "Appointments",
    value: "24",
    change: "+12.5%",
    description: "scheduled today",
    icon: CalendarDays,
  },
  {
    label: "Revenue",
    value: "$12,480",
    change: "+6.4%",
    description: "this month",
    icon: CreditCard,
  },
  {
    label: "Pending",
    value: "6",
    change: "Needs attention",
    description: "appointment requests",
    icon: Clock3,
  },
];

const appointments = [
  {
    time: "09:00 AM",
    patient: "Sarah Johnson",
    treatment: "General Checkup",
    doctor: "Dr. Emily Carter",
    status: "Confirmed",
  },
  {
    time: "10:30 AM",
    patient: "Michael Brown",
    treatment: "Orthodontic Consultation",
    doctor: "Dr. Michael Anderson",
    status: "Confirmed",
  },
  {
    time: "01:00 PM",
    patient: "Emma Wilson",
    treatment: "Pediatric Dentistry",
    doctor: "Dr. Sophia Williams",
    status: "Pending",
  },
  {
    time: "02:30 PM",
    patient: "Daniel Smith",
    treatment: "Dental Implant Consultation",
    doctor: "Dr. Daniel Brooks",
    status: "Confirmed",
  },
  {
    time: "04:00 PM",
    patient: "Olivia Taylor",
    treatment: "Root Canal Care",
    doctor: "Dr. Olivia Bennett",
    status: "Pending",
  },
];

const doctors = [
  {
    name: "Dr. Emily Carter",
    specialty: "Cosmetic & General Dentistry",
    appointments: 6,
    status: "On duty",
  },
  {
    name: "Dr. Michael Anderson",
    specialty: "Orthodontics & Restorative",
    appointments: 5,
    status: "On duty",
  },
  {
    name: "Dr. Sophia Williams",
    specialty: "Pediatric & Family Dentistry",
    appointments: 4,
    status: "On duty",
  },
];

export default function BrightSmileAdminPage() {
  return (
    <main className="w-full px-5 pt-12 pb-8 sm:px-8 sm:pt-12 sm:pb-8 xl:px-10">
      <div className="w-full">
        <div className="mb-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold text-blue-600">
              BrightSmile Dental
            </p>

            <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Dashboard
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Here's what's happening with the practice today.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
          >
            <CalendarDays size={17} />
            New Appointment
          </button>
        </div>

        <section className="grid w-full gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm min-h-[142px]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon size={20} />
                  </div>

                  <button
                    type="button"
                    className="text-slate-300 transition hover:text-slate-600"
                    aria-label={`More options for ${stat.label}`}
                  >
                    <MoreHorizontal size={19} />
                  </button>
                </div>

                <p className="mt-5 text-sm font-medium text-slate-500">
                  {stat.label}
                </p>

                <div className="mt-1 flex items-end gap-2">
                  <p className="text-2xl font-black tracking-tight text-slate-900">
                    {stat.value}
                  </p>

                  <span
                    className={`mb-1 text-xs font-bold ${
                      stat.label === "Pending"
                        ? "text-amber-600"
                        : "text-emerald-600"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>

                <p className="mt-1 text-xs text-slate-400">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </section>

        <section className="mt-5 grid w-full gap-5 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,1fr)]">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5 sm:px-6">
              <div>
                <h2 className="text-base font-black text-slate-900">
                  Today's Appointments
                </h2>
                <p className="mt-1 text-xs text-slate-400">
                  {appointments.length} appointments scheduled
                </p>
              </div>

              <button
                type="button"
                className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700"
              >
                View calendar
                <ArrowUpRight size={14} />
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {appointments.map((appointment) => (
                <div
                  key={`${appointment.time}-${appointment.patient}`}
                  className="flex flex-col gap-4 px-5 py-4 transition hover:bg-slate-50/70 sm:flex-row sm:items-center sm:px-5"
                >
                  <div className="w-20 shrink-0">
                    <p className="text-sm font-black text-slate-900">
                      {appointment.time}
                    </p>
                  </div>

                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                      <UserRound size={16} />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-slate-900">
                        {appointment.patient}
                      </p>
                      <p className="truncate text-xs text-slate-400">
                        {appointment.treatment}
                      </p>
                    </div>
                  </div>

                  <div className="hidden min-w-[180px] items-center gap-2 md:flex">
                    <Stethoscope
                      size={15}
                      className="shrink-0 text-blue-500"
                    />
                    <p className="truncate text-xs font-semibold text-slate-500">
                      {appointment.doctor}
                    </p>
                  </div>

                  <div className="shrink-0">
                    {appointment.status === "Confirmed" ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-bold text-emerald-600">
                        <CheckCircle2 size={13} />
                        Confirmed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-[11px] font-bold text-amber-600">
                        <CircleAlert size={13} />
                        Pending
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5">
              <div>
                <h2 className="text-base font-black text-slate-900">
                  Doctors
                </h2>
                <p className="mt-1 text-xs text-slate-400">
                  Today's availability
                </p>
              </div>

              <button
                type="button"
                className="text-xs font-bold text-blue-600 hover:text-blue-700"
              >
                View all
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {doctors.map((doctor) => (
                <div
                  key={doctor.name}
                  className="px-5 py-4.5 transition hover:bg-slate-50/70"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-sm font-black text-blue-600">
                      {doctor.name
                        .replace("Dr. ", "")
                        .split(" ")
                        .map((part) => part[0])
                        .join("")
                        .slice(0, 2)}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-slate-900">
                            {doctor.name}
                          </p>
                          <p className="mt-1 text-xs leading-5 text-slate-400">
                            {doctor.specialty}
                          </p>
                        </div>

                        <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-600">
                          {doctor.status}
                        </span>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <p className="text-xs font-semibold text-slate-500">
                          {doctor.appointments} appointments
                        </p>

                        <button
                          type="button"
                          className="text-xs font-bold text-blue-600 hover:text-blue-700"
                        >
                          Schedule
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-5 grid w-full gap-5 lg:grid-cols-3">
          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-blue-500">
              Practice Overview
            </p>

            <h3 className="mt-3 text-xl font-black text-slate-900">
              Your practice is running smoothly.
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Keep an eye on today's appointments, pending requests, and
              outstanding patient balances.
            </p>

            <button
              type="button"
              className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-600"
            >
              Open practice overview
              <ArrowUpRight size={15} />
            </button>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
              Patient Growth
            </p>

            <div className="mt-4 flex items-end justify-between">
              <div>
                <p className="text-3xl font-black text-slate-900">+8.2%</p>
                <p className="mt-1 text-xs text-slate-400">
                  New patients this month
                </p>
              </div>

              <div className="flex h-12 items-end gap-1">
                {[22, 31, 27, 38, 35, 45, 52, 48, 62, 58, 70, 78].map(
                  (height, index) => (
                    <div
                      key={index}
                      className="w-1.5 rounded-full bg-blue-200"
                      style={{ height: `${height / 2}px` }}
                    />
                  ),
                )}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
              Quick Actions
            </p>

            <div className="mt-4 grid grid-cols-2 gap-2.5">
              {[
                "Add Patient",
                "Book Visit",
                "Create Invoice",
                "View Reports",
              ].map((action) => (
                <button
                  key={action}
                  type="button"
                  className="rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-bold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        </section>

        <div className="mt-6 rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-700">
          <strong>Portfolio Demo:</strong> All patients, appointments,
          doctors, revenue figures, and other records shown here are
          fictional sample data for demonstration purposes.
        </div>
      </div>
    </main>
  );
}
