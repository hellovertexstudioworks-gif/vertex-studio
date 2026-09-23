"use client";

import { useMemo, useState } from "react";
import {
  CalendarDays,
  Clock3,
  Plus,
  Users,
  ListFilter,
} from "lucide-react";

import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";

import AppointmentCard, {
  Appointment,
} from "./components/AppointmentCard";

import AppointmentFilters from "./components/AppointmentFilters";

import AppointmentCalendar from "./components/AppointmentCalendar";

const demoAppointments: Appointment[] = [
  {
    id: 1,
    time: "09:00 AM",
    duration: "45 min",
    patient: "Sarah Johnson",
    service: "General Dentistry",
    doctor: "Dr. Emily Carter",
    status: "Confirmed",
  },
  {
    id: 2,
    time: "10:30 AM",
    duration: "60 min",
    patient: "Michael Brown",
    service: "Orthodontic Consultation",
    doctor: "Dr. Michael Anderson",
    status: "Confirmed",
  },
  {
    id: 3,
    time: "11:30 AM",
    duration: "45 min",
    patient: "James Wilson",
    service: "Teeth Whitening",
    doctor: "Dr. Emily Carter",
    status: "Pending",
  },
  {
    id: 4,
    time: "01:00 PM",
    duration: "45 min",
    patient: "Emma Williams",
    service: "Pediatric Dentistry",
    doctor: "Dr. Sophia Williams",
    status: "Confirmed",
  },
  {
    id: 5,
    time: "02:30 PM",
    duration: "90 min",
    patient: "Daniel Smith",
    service: "Dental Implants",
    doctor: "Dr. Daniel Brooks",
    status: "Confirmed",
  },
  {
    id: 6,
    time: "04:00 PM",
    duration: "60 min",
    patient: "Olivia Taylor",
    service: "Root Canal Care",
    doctor: "Dr. Olivia Bennett",
    status: "Pending",
  },
  {
    id: 7,
    time: "05:30 PM",
    duration: "45 min",
    patient: "Noah Davis",
    service: "Restorative Dentistry",
    doctor: "Dr. James Mitchell",
    status: "Waitlist",
  },
  {
    id: 8,
    time: "06:15 PM",
    duration: "30 min",
    patient: "Sophia Miller",
    service: "Dental Consultation",
    doctor: "Dr. Michael Anderson",
    status: "Cancelled",
  },
];

export default function AppointmentsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [doctor, setDoctor] = useState("All");

  const filteredAppointments = useMemo(() => {
    return demoAppointments.filter((appointment) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        appointment.patient.toLowerCase().includes(searchValue) ||
        appointment.doctor.toLowerCase().includes(searchValue) ||
        appointment.service.toLowerCase().includes(searchValue);

      const matchesStatus =
        status === "All" || appointment.status === status;

      const matchesDoctor =
        doctor === "All" || appointment.doctor === doctor;

      return matchesSearch && matchesStatus && matchesDoctor;
    });
  }, [search, status, doctor]);

  const confirmedCount = demoAppointments.filter(
    (appointment) => appointment.status === "Confirmed"
  ).length;

  const pendingCount = demoAppointments.filter(
    (appointment) => appointment.status === "Pending"
  ).length;

  const waitlistCount = demoAppointments.filter(
    (appointment) => appointment.status === "Waitlist"
  ).length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <AdminSidebar />

      <div className="lg:pl-64">
        <AdminHeader />

        <main className="px-5 py-6 sm:px-8 sm:py-8">
          {/* Heading */}
          <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-blue-600">
                Practice Management
              </p>

              <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                Appointments
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Manage today's schedule, patient visits, doctor availability,
                and appointment requests.
              </p>
            </div>

            <button
              type="button"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
            >
              <Plus size={18} />
              New Appointment
            </button>
          </div>

          {/* Stats */}
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <CalendarDays size={19} />
                </div>

                <p className="text-sm font-semibold text-slate-500">
                  Today's Appointments
                </p>
              </div>

              <p className="mt-4 text-3xl font-black text-slate-900">
                {demoAppointments.length}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <Clock3 size={19} />
                </div>

                <p className="text-sm font-semibold text-slate-500">
                  Confirmed
                </p>
              </div>

              <p className="mt-4 text-3xl font-black text-slate-900">
                {confirmedCount}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <ListFilter size={19} />
                </div>

                <p className="text-sm font-semibold text-slate-500">
                  Pending
                </p>
              </div>

              <p className="mt-4 text-3xl font-black text-slate-900">
                {pendingCount}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                  <Users size={19} />
                </div>

                <p className="text-sm font-semibold text-slate-500">
                  Waitlist
                </p>
              </div>

              <p className="mt-4 text-3xl font-black text-slate-900">
                {waitlistCount}
              </p>
            </div>
          </section>

          {/* Calendar */}
          <section className="mt-6">
            <AppointmentCalendar
              appointments={demoAppointments}
            />
          </section>

          {/* Filters */}
          <section className="mt-6">
            <AppointmentFilters
              search={search}
              setSearch={setSearch}
              status={status}
              setStatus={setStatus}
              doctor={doctor}
              setDoctor={setDoctor}
            />
          </section>

          {/* Appointment List */}
          <section className="mt-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black text-slate-900">
                  Appointment Schedule
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  Showing {filteredAppointments.length} of{" "}
                  {demoAppointments.length} appointments
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                  />
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                  <CalendarDays
                    size={30}
                    className="mx-auto text-slate-300"
                  />

                  <h3 className="mt-4 text-sm font-bold text-slate-900">
                    No appointments found
                  </h3>

                  <p className="mt-1 text-xs text-slate-400">
                    Try changing your search or filters.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Demo Notice */}
          <div className="mt-8 rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-700">
            <strong>Portfolio Demo:</strong> All appointment and patient
            information shown here is fictional sample data.
          </div>
        </main>
      </div>
    </div>
  );
}