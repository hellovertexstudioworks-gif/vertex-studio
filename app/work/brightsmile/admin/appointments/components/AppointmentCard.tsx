"use client";

import {
  Clock3,
  Stethoscope,
  UserRound,
  MoreHorizontal,
} from "lucide-react";

export type Appointment = {
  id: number;
  time: string;
  duration: string;
  patient: string;
  service: string;
  doctor: string;
  status: "Confirmed" | "Pending" | "Cancelled" | "Waitlist";
};

type AppointmentCardProps = {
  appointment: Appointment;
};

export default function AppointmentCard({
  appointment,
}: AppointmentCardProps) {
  const statusStyles = {
    Confirmed: "bg-emerald-50 text-emerald-600",
    Pending: "bg-amber-50 text-amber-600",
    Cancelled: "bg-red-50 text-red-600",
    Waitlist: "bg-purple-50 text-purple-600",
  };

  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-100 hover:shadow-md">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
        <div className="flex shrink-0 items-center gap-3 lg:w-32">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Clock3 size={19} />
          </div>

          <div>
            <p className="text-sm font-black text-slate-900">
              {appointment.time}
            </p>

            <p className="mt-0.5 text-[11px] text-slate-400">
              {appointment.duration}
            </p>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500">
            <UserRound size={17} />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-slate-900">
              {appointment.patient}
            </p>

            <p className="mt-0.5 truncate text-xs text-slate-400">
              {appointment.service}
            </p>
          </div>
        </div>

        <div className="flex min-w-0 items-center gap-2 lg:w-56">
          <Stethoscope size={17} className="shrink-0 text-blue-500" />

          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Doctor
            </p>

            <p className="truncate text-xs font-semibold text-slate-600">
              {appointment.doctor}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 lg:w-36 lg:justify-end">
          <span
            className={`rounded-full px-3 py-1.5 text-[11px] font-bold ${statusStyles[appointment.status]}`}
          >
            {appointment.status}
          </span>

          <button
            type="button"
            aria-label="Appointment options"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-300 transition hover:bg-slate-50 hover:text-slate-600"
          >
            <MoreHorizontal size={18} />
          </button>
        </div>
      </div>
    </article>
  );
}