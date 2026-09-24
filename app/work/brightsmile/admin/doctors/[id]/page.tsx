"use client";

import { use, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Award,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Mail,
  Phone,
  Stethoscope,
  Users,
  XCircle,
} from "lucide-react";

import AdminHeader from "../../components/AdminHeader";
import AdminSidebar from "../../components/AdminSidebar";

type SlotStatus = "Available" | "Booked" | "Break";

type TimeSlot = {
  time: string;
  status: SlotStatus;
  patient?: string;
  service?: string;
};

type Doctor = {
  id: string;
  name: string;
  specialty: string;
  category: string;
  credentials: string;
  experience: string;
  status: "On Duty" | "Off Duty";
  schedule: string;
  email: string;
  phone: string;
  bio: string;
};

const doctors: Record<string, Doctor> = {
  "1": {
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
    bio: "Demo profile for the BrightSmile portfolio. Dr. Carter focuses on preventive, general, and cosmetic dental care.",
  },

  "2": {
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
    bio: "Demo profile for the BrightSmile portfolio. Dr. Anderson provides orthodontic consultations and restorative treatment planning.",
  },

  "3": {
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
    bio: "Demo profile for the BrightSmile portfolio. Dr. Williams specializes in pediatric and family dental care.",
  },

  "4": {
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
    bio: "Demo profile for the BrightSmile portfolio. Dr. Brooks handles oral surgery consultations and implant treatment planning.",
  },

  "5": {
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
    bio: "Demo profile for the BrightSmile portfolio. Dr. Bennett focuses on endodontic evaluation and root canal care.",
  },

  "6": {
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
    bio: "Demo profile for the BrightSmile portfolio. Dr. Mitchell focuses on restorative and prosthodontic treatment planning.",
  },
};

const week = [
  { short: "MON", date: "21", label: "Monday" },
  { short: "TUE", date: "22", label: "Tuesday" },
  { short: "WED", date: "23", label: "Wednesday" },
  { short: "THU", date: "24", label: "Thursday" },
  { short: "FRI", date: "25", label: "Friday" },
];

const emilySchedule: Record<string, TimeSlot[]> = {
  "21": [
    { time: "09:00 AM", status: "Available" },
    {
      time: "09:45 AM",
      status: "Booked",
      patient: "Demo Patient A",
      service: "General Checkup",
    },
    { time: "10:30 AM", status: "Available" },
    {
      time: "11:15 AM",
      status: "Booked",
      patient: "Demo Patient B",
      service: "Cosmetic Consultation",
    },
    { time: "12:00 PM", status: "Break" },
    { time: "01:00 PM", status: "Available" },
    {
      time: "01:45 PM",
      status: "Booked",
      patient: "Demo Patient C",
      service: "Teeth Whitening",
    },
    { time: "02:30 PM", status: "Available" },
    { time: "03:15 PM", status: "Available" },
    {
      time: "04:00 PM",
      status: "Booked",
      patient: "Demo Patient D",
      service: "Dental Cleaning",
    },
  ],

  "22": [
    { time: "09:00 AM", status: "Available" },
    { time: "09:45 AM", status: "Available" },
    {
      time: "10:30 AM",
      status: "Booked",
      patient: "Demo Patient E",
      service: "General Dentistry",
    },
    { time: "11:15 AM", status: "Available" },
    { time: "12:00 PM", status: "Break" },
    { time: "01:00 PM", status: "Available" },
    { time: "01:45 PM", status: "Available" },
    {
      time: "02:30 PM",
      status: "Booked",
      patient: "Demo Patient F",
      service: "Cosmetic Consultation",
    },
    { time: "03:15 PM", status: "Available" },
    { time: "04:00 PM", status: "Available" },
  ],

  "23": [
    { time: "09:00 AM", status: "Available" },
    {
      time: "09:45 AM",
      status: "Booked",
      patient: "Demo Patient G",
      service: "Dental Cleaning",
    },
    { time: "10:30 AM", status: "Available" },
    { time: "11:15 AM", status: "Available" },
    { time: "12:00 PM", status: "Break" },
    {
      time: "01:00 PM",
      status: "Booked",
      patient: "Demo Patient H",
      service: "General Checkup",
    },
    { time: "01:45 PM", status: "Available" },
    { time: "02:30 PM", status: "Available" },
    {
      time: "03:15 PM",
      status: "Booked",
      patient: "Demo Patient I",
      service: "Whitening Consultation",
    },
    { time: "04:00 PM", status: "Available" },
  ],

  "24": [
    { time: "09:00 AM", status: "Available" },
    { time: "09:45 AM", status: "Available" },
    { time: "10:30 AM", status: "Available" },
    {
      time: "11:15 AM",
      status: "Booked",
      patient: "Demo Patient J",
      service: "General Checkup",
    },
    { time: "12:00 PM", status: "Break" },
    { time: "01:00 PM", status: "Available" },
    { time: "01:45 PM", status: "Available" },
    {
      time: "02:30 PM",
      status: "Booked",
      patient: "Demo Patient K",
      service: "Cosmetic Consultation",
    },
    { time: "03:15 PM", status: "Available" },
    { time: "04:00 PM", status: "Available" },
  ],

  "25": [
    {
      time: "09:00 AM",
      status: "Booked",
      patient: "Demo Patient L",
      service: "Dental Cleaning",
    },
    { time: "09:45 AM", status: "Available" },
    { time: "10:30 AM", status: "Available" },
    { time: "11:15 AM", status: "Available" },
    { time: "12:00 PM", status: "Break" },
    {
      time: "01:00 PM",
      status: "Booked",
      patient: "Demo Patient M",
      service: "General Checkup",
    },
    { time: "01:45 PM", status: "Available" },
    { time: "02:30 PM", status: "Available" },
    { time: "03:15 PM", status: "Available" },
    {
      time: "04:00 PM",
      status: "Booked",
      patient: "Demo Patient N",
      service: "Cosmetic Consultation",
    },
  ],
};

function fallbackSchedule(): Record<string, TimeSlot[]> {
  return Object.fromEntries(
    week.map((day) => [
      day.date,
      [
        { time: "09:00 AM", status: "Available" as const },
        { time: "09:45 AM", status: "Available" as const },
        {
          time: "10:30 AM",
          status: "Booked" as const,
          patient: "Demo Patient",
          service: "Dental Consultation",
        },
        { time: "11:15 AM", status: "Available" as const },
        { time: "12:00 PM", status: "Break" as const },
        { time: "01:00 PM", status: "Available" as const },
        { time: "01:45 PM", status: "Available" as const },
        {
          time: "02:30 PM",
          status: "Booked" as const,
          patient: "Demo Patient",
          service: "General Dentistry",
        },
        { time: "03:15 PM", status: "Available" as const },
        { time: "04:00 PM", status: "Available" as const },
      ],
    ])
  );
}

export default function DoctorSchedulePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const doctor = doctors[id] ?? doctors["1"];
  const schedule =
    doctor.id === "1" ? emilySchedule : fallbackSchedule();

  const [selectedDate, setSelectedDate] = useState("23");
  const [message, setMessage] = useState("");

  const selectedSlots = schedule[selectedDate] ?? [];

  const availableCount = useMemo(
    () =>
      selectedSlots.filter(
        (slot) => slot.status === "Available"
      ).length,
    [selectedSlots]
  );

  const bookedCount = useMemo(
    () =>
      selectedSlots.filter(
        (slot) => slot.status === "Booked"
      ).length,
    [selectedSlots]
  );

  const handleBook = (slot: TimeSlot) => {
    if (slot.status !== "Available") return;

    setMessage(
      `Demo selection: ${doctor.name} at ${slot.time}. No real appointment was created.`
    );
  };

  const handleWaitlist = () => {
    setMessage(
      `Demo waitlist request for ${doctor.name}. No real patient information was submitted.`
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <AdminSidebar />

      <div className="lg:pl-64">
        <AdminHeader />

        <main className="px-5 py-6 sm:px-8 sm:py-8">
          <Link
            href="/work/brightsmile/admin/doctors"
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-blue-600"
          >
            <ArrowLeft size={16} />
            Back to Doctors
          </Link>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-blue-50 text-blue-600">
                  <Stethoscope size={34} />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className="text-3xl font-black tracking-tight text-slate-900">
                      {doctor.name}
                    </h1>

                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${
                        doctor.status === "On Duty"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {doctor.status === "On Duty" ? (
                        <CheckCircle2 size={14} />
                      ) : (
                        <XCircle size={14} />
                      )}
                      {doctor.status}
                    </span>
                  </div>

                  <p className="mt-2 text-base font-semibold text-blue-600">
                    {doctor.specialty}
                  </p>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                    {doctor.bio}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-4 text-xs font-semibold text-slate-500">
                    <span className="inline-flex items-center gap-2">
                      <Award
                        size={15}
                        className="text-blue-500"
                      />
                      {doctor.credentials}
                    </span>

                    <span className="inline-flex items-center gap-2">
                      <Clock3
                        size={15}
                        className="text-blue-500"
                      />
                      {doctor.experience}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:w-[330px]">
                <a
                  href={`mailto:${doctor.email}`}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                >
                  <Mail size={16} />
                  Email Doctor
                </a>

                <a
                  href={`tel:${doctor.phone}`}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-xs font-bold text-white transition hover:bg-blue-700"
                >
                  <Phone size={16} />
                  Call
                </a>
              </div>
            </div>
          </section>

          <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold text-slate-400">
                Today's Hours
              </p>

              <p className="mt-2 text-xl font-black text-slate-900">
                {doctor.schedule}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold text-slate-400">
                Available Slots
              </p>

              <p className="mt-2 text-3xl font-black text-emerald-600">
                {availableCount}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold text-slate-400">
                Booked Slots
              </p>

              <p className="mt-2 text-3xl font-black text-blue-600">
                {bookedCount}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold text-slate-400">
                Contact
              </p>

              <p className="mt-2 truncate text-sm font-black text-slate-900">
                {doctor.email}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                {doctor.phone}
              </p>
            </div>
          </section>

          <section className="mt-6 rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div>
                <h2 className="text-lg font-black text-slate-900">
                  Weekly Schedule
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  Select a day to view available and booked time slots.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Previous week"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50"
                >
                  <ChevronLeft size={17} />
                </button>

                <span className="px-2 text-xs font-bold text-slate-500">
                  October 2026
                </span>

                <button
                  type="button"
                  aria-label="Next week"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50"
                >
                  <ChevronRight size={17} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-5 border-b border-slate-100">
              {week.map((day) => {
                const active = selectedDate === day.date;

                return (
                  <button
                    key={day.date}
                    type="button"
                    onClick={() => {
                      setSelectedDate(day.date);
                      setMessage("");
                    }}
                    className={`border-r border-slate-100 px-2 py-4 text-center transition last:border-r-0 ${
                      active
                        ? "bg-blue-50 text-blue-600"
                        : "text-slate-500 hover:bg-slate-50"
                    }`}
                  >
                    <p className="text-[10px] font-bold tracking-wider">
                      {day.short}
                    </p>

                    <p className="mt-1 text-lg font-black">
                      {day.date}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="p-5 sm:p-6">
              <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-black text-slate-900">
                    {
                      week.find(
                        (day) => day.date === selectedDate
                      )?.label
                    }
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Click an available slot to simulate a booking selection.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 text-[10px] font-bold">
                  <span className="inline-flex items-center gap-1.5 text-emerald-600">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Available
                  </span>

                  <span className="inline-flex items-center gap-1.5 text-blue-600">
                    <span className="h-2 w-2 rounded-full bg-blue-500" />
                    Booked
                  </span>

                  <span className="inline-flex items-center gap-1.5 text-slate-400">
                    <span className="h-2 w-2 rounded-full bg-slate-300" />
                    Break
                  </span>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {selectedSlots.map((slot) => {
                  const isAvailable = slot.status === "Available";
                  const isBooked = slot.status === "Booked";

                  return (
                    <button
                      key={slot.time}
                      type="button"
                      disabled={!isAvailable}
                      onClick={() => handleBook(slot)}
                      className={`rounded-2xl border p-4 text-left transition ${
                        isAvailable
                          ? "border-emerald-100 bg-emerald-50/60 hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-emerald-50 hover:shadow-sm"
                          : isBooked
                            ? "cursor-default border-blue-100 bg-blue-50/60"
                            : "cursor-default border-slate-100 bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-black text-slate-900">
                          {slot.time}
                        </span>

                        {isAvailable && (
                          <CheckCircle2
                            size={16}
                            className="text-emerald-500"
                          />
                        )}

                        {isBooked && (
                          <CalendarDays
                            size={16}
                            className="text-blue-500"
                          />
                        )}

                        {slot.status === "Break" && (
                          <Clock3
                            size={16}
                            className="text-slate-400"
                          />
                        )}
                      </div>

                      <p
                        className={`mt-2 text-[10px] font-bold uppercase tracking-wider ${
                          isAvailable
                            ? "text-emerald-600"
                            : isBooked
                              ? "text-blue-600"
                              : "text-slate-400"
                        }`}
                      >
                        {slot.status}
                      </p>

                      {slot.patient && (
                        <div className="mt-3 border-t border-blue-100 pt-3">
                          <p className="truncate text-xs font-bold text-slate-700">
                            {slot.patient}
                          </p>

                          <p className="mt-1 truncate text-[10px] text-slate-400">
                            {slot.service}
                          </p>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {message && (
                <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-xs font-semibold leading-5 text-blue-700">
                  {message}
                </div>
              )}
            </div>
          </section>

          <section className="mt-6 grid gap-5 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
                <Users size={21} />
              </div>

              <h2 className="mt-5 text-lg font-black text-slate-900">
                Patient Waitlist
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                If a patient cannot find a suitable time with this doctor,
                the booking flow can place them on a waitlist for the next
                matching opening.
              </p>

              <button
                type="button"
                onClick={handleWaitlist}
                className="mt-5 inline-flex h-10 items-center gap-2 rounded-xl bg-purple-600 px-4 text-xs font-bold text-white transition hover:bg-purple-700"
              >
                Join Demo Waitlist
                <ArrowUpRight size={15} />
              </button>
            </div>

            <div className="rounded-3xl border border-blue-100 bg-blue-50 p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm">
                <CalendarDays size={21} />
              </div>

              <h2 className="mt-5 text-lg font-black text-slate-900">
                Booking Flow Preview
              </h2>

              <div className="mt-4 space-y-3">
                {[
                  "Patient chooses this doctor",
                  "Patient selects a service",
                  "Available time slots are shown",
                  "Patient confirms or joins the waitlist",
                  "Appointment appears in the admin schedule",
                ].map((step, index) => (
                  <div
                    key={step}
                    className="flex items-center gap-3"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-[10px] font-black text-blue-600 shadow-sm">
                      {index + 1}
                    </span>

                    <span className="text-xs font-semibold text-slate-600">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="mt-8 rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-700">
            <strong>Portfolio Demo:</strong> All doctors, patients,
            appointments, contact details, and schedules shown on this page
            are fictional sample data. No real appointment or waitlist request
            is created.
          </div>
        </main>
      </div>
    </div>
  );
}