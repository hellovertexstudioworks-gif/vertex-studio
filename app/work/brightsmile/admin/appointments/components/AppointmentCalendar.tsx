"use client";

import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import type { Appointment } from "./AppointmentCard";

type AppointmentCalendarProps = {
  appointments: Appointment[];
};

const days = [
  { day: "MON", date: "21" },
  { day: "TUE", date: "22" },
  { day: "WED", date: "23" },
  { day: "THU", date: "24" },
  { day: "FRI", date: "25" },
  { day: "SAT", date: "26" },
];

export default function AppointmentCalendar({
  appointments,
}: AppointmentCalendarProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Calendar Header */}
      <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-black text-slate-900">
            October 2026
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Weekly appointment overview
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous week"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
          >
            <ChevronLeft size={17} />
          </button>

          <button
            type="button"
            aria-label="Next week"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
          >
            <ChevronRight size={17} />
          </button>

          <button
            type="button"
            className="ml-1 inline-flex h-9 items-center gap-2 rounded-lg bg-blue-600 px-3 text-xs font-bold text-white shadow-sm transition hover:bg-blue-700"
          >
            <CalendarDays size={15} />
            Today
          </button>
        </div>
      </div>

      {/* Days */}
      <div className="grid grid-cols-6 border-b border-slate-100">
        {days.map((day, index) => {
          const active = index === 2;

          return (
            <div
              key={day.date}
              className={`border-r border-slate-100 px-2 py-4 text-center last:border-r-0 ${
                active ? "bg-blue-50" : ""
              }`}
            >
              <p
                className={`text-[10px] font-bold tracking-wider ${
                  active ? "text-blue-500" : "text-slate-400"
                }`}
              >
                {day.day}
              </p>

              <p
                className={`mt-1 text-lg font-black ${
                  active ? "text-blue-600" : "text-slate-700"
                }`}
              >
                {day.date}
              </p>
            </div>
          );
        })}
      </div>

      {/* Schedule */}
      <div className="divide-y divide-slate-100">
        {appointments.slice(0, 4).map((appointment) => (
          <div
            key={appointment.id}
            className="flex items-center gap-4 px-5 py-4 transition hover:bg-slate-50/70"
          >
            {/* Time */}
            <div className="w-20 shrink-0">
              <p className="text-xs font-black text-slate-900">
                {appointment.time}
              </p>

              <p className="mt-1 text-[10px] text-slate-400">
                {appointment.duration}
              </p>
            </div>

            {/* Accent */}
            <div className="h-10 w-1 shrink-0 rounded-full bg-blue-500" />

            {/* Patient */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-slate-900">
                {appointment.patient}
              </p>

              <p className="mt-1 truncate text-xs text-slate-400">
                {appointment.service}
              </p>
            </div>

            {/* Doctor */}
            <div className="hidden min-w-0 sm:block sm:w-48">
              <p className="truncate text-xs font-semibold text-slate-500">
                {appointment.doctor}
              </p>

              <p className="mt-1 text-[10px] text-slate-400">
                Assigned doctor
              </p>
            </div>

            {/* Status */}
            <span
              className={`hidden rounded-full px-2.5 py-1 text-[10px] font-bold sm:inline-flex ${
                appointment.status === "Confirmed"
                  ? "bg-emerald-50 text-emerald-600"
                  : appointment.status === "Pending"
                    ? "bg-amber-50 text-amber-600"
                    : appointment.status === "Cancelled"
                      ? "bg-red-50 text-red-600"
                      : "bg-purple-50 text-purple-600"
              }`}
            >
              {appointment.status}
            </span>
          </div>
        ))}

        {appointments.length === 0 && (
          <div className="px-5 py-12 text-center">
            <CalendarDays
              size={28}
              className="mx-auto text-slate-300"
            />

            <p className="mt-3 text-sm font-bold text-slate-700">
              No appointments scheduled
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Your appointment schedule will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}