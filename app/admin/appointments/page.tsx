"use client";

import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock,
  Mail,
  Plus,
  Search,
  UserRound,
  X,
  XCircle,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type AppointmentStatus =
  | "Scheduled"
  | "Confirmed"
  | "Completed"
  | "Cancelled";

type Appointment = {
  id: string;
  lead_id: string | null;
  name: string;
  email: string;
  business: string | null;
  service: string;
  appointment_date: string;
  appointment_time: string;
  status: AppointmentStatus;
  notes: string | null;
  created_at: string;
};

const statusStyles: Record<AppointmentStatus, string> = {
  Scheduled: "border-white/10 bg-white/5 text-white/60",
  Confirmed: "border-blue-500/20 bg-blue-500/5 text-blue-400",
  Completed: "border-emerald-500/20 bg-emerald-500/5 text-emerald-400",
  Cancelled: "border-red-500/20 bg-red-500/5 text-red-400",
};

export default function AppointmentsPage() {
  const supabase = createClient();

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    business: "",
    service: "Website Consultation",
    appointment_date: "",
    appointment_time: "",
    status: "Scheduled" as AppointmentStatus,
    notes: "",
  });

  const loadAppointments = async () => {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("appointment_date", {
        ascending: true,
      })
      .order("appointment_time", {
        ascending: true,
      });

    if (error) {
      console.error("APPOINTMENTS LOAD ERROR:", error);
      setError(error.message);
      setLoading(false);
      return;
    }

    setAppointments((data ?? []) as Appointment[]);
    setLoading(false);
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const filteredAppointments = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) {
      return appointments;
    }

    return appointments.filter((appointment) => {
      return (
        appointment.name.toLowerCase().includes(query) ||
        appointment.email.toLowerCase().includes(query) ||
        (appointment.business ?? "").toLowerCase().includes(query) ||
        appointment.service.toLowerCase().includes(query)
      );
    });
  }, [appointments, search]);

  const scheduledCount = appointments.filter(
    (appointment) => appointment.status === "Scheduled"
  ).length;

  const confirmedCount = appointments.filter(
    (appointment) => appointment.status === "Confirmed"
  ).length;

  const completedCount = appointments.filter(
    (appointment) => appointment.status === "Completed"
  ).length;

  const cancelledCount = appointments.filter(
    (appointment) => appointment.status === "Cancelled"
  ).length;

  const formatDate = (date: string) => {
    return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);

    const date = new Date();

    date.setHours(hours, minutes, 0, 0);

    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const updateStatus = async (
    id: string,
    status: AppointmentStatus
  ) => {
    setError("");

    const { error } = await supabase
      .from("appointments")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      console.error("APPOINTMENT STATUS ERROR:", error);
      setError(error.message);
      return;
    }

    setAppointments((current) =>
      current.map((appointment) =>
        appointment.id === id
          ? {
              ...appointment,
              status,
            }
          : appointment
      )
    );
  };

  const openDetails = (appointment: Appointment) => {
    setError("");
    setSelectedAppointment(appointment);
  };

  const closeDetails = () => {
    setSelectedAppointment(null);
  };

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      business: "",
      service: "Website Consultation",
      appointment_date: "",
      appointment_time: "",
      status: "Scheduled",
      notes: "",
    });
  };

  const openModal = () => {
    setError("");
    setShowModal(true);
  };

  const closeModal = () => {
    if (saving) return;

    setShowModal(false);
    resetForm();
  };

  const handleCreateAppointment = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setSaving(true);
    setError("");

    const {
      name,
      email,
      business,
      service,
      appointment_date,
      appointment_time,
      status,
      notes,
    } = form;

    const { data, error } = await supabase
      .from("appointments")
      .insert({
        name: name.trim(),
        email: email.trim(),
        business: business.trim() || null,
        service,
        appointment_date,
        appointment_time,
        status,
        notes: notes.trim() || null,
      })
      .select("*")
      .single();

    if (error) {
      console.error("CREATE APPOINTMENT ERROR:", error);
      setError(error.message);
      setSaving(false);
      return;
    }

    if (data) {
      setAppointments((current) =>
        [...current, data as Appointment].sort((a, b) => {
          const dateA = `${a.appointment_date} ${a.appointment_time}`;
          const dateB = `${b.appointment_date} ${b.appointment_time}`;

          return dateA.localeCompare(dateB);
        })
      );
    }

    setSaving(false);
    setShowModal(false);
    resetForm();
  };

  return (
    <main className="min-h-screen bg-[#070707] px-5 py-8 text-white sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                <CalendarDays
                  size={19}
                  className="text-white/70"
                />
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/35">
                  Vertex Studio
                </p>

                <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Appointments
                </h1>
              </div>
            </div>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/40">
              Manage consultations, meetings, and upcoming client
              appointments.
            </p>
          </div>

          <button
            type="button"
            onClick={openModal}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
          >
            <Plus size={17} />
            Add Appointment
          </button>
        </div>

        {/* Error */}
        {error && !showModal && (
          <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/5 px-5 py-4">
            <p className="text-sm font-medium text-red-400">
              Appointment error
            </p>

            <p className="mt-1 text-xs text-red-400/60">
              {error}
            </p>
          </div>
        )}

        {/* Summary */}
        <section className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-white/40">
                Scheduled
              </p>

              <Clock
                size={17}
                className="text-white/30"
              />
            </div>

            <p className="mt-3 text-3xl font-semibold">
              {loading ? "..." : scheduledCount}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-white/40">
                Confirmed
              </p>

              <CheckCircle2
                size={17}
                className="text-blue-400/60"
              />
            </div>

            <p className="mt-3 text-3xl font-semibold">
              {loading ? "..." : confirmedCount}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-white/40">
                Completed
              </p>

              <CheckCircle2
                size={17}
                className="text-emerald-400/60"
              />
            </div>

            <p className="mt-3 text-3xl font-semibold">
              {loading ? "..." : completedCount}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-white/40">
                Cancelled
              </p>

              <XCircle
                size={17}
                className="text-red-400/60"
              />
            </div>

            <p className="mt-3 text-3xl font-semibold">
              {loading ? "..." : cancelledCount}
            </p>
          </div>

        </section>

        {/* Appointment Table */}
        <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025]">

          {/* Toolbar */}
          <div className="flex flex-col gap-4 border-b border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between">

            <div className="relative w-full max-w-md">
              <Search
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
              />

              <input
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search appointments..."
                className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-white/20"
              />
            </div>

            <span className="text-xs text-emerald-400/70">
              ● Database Connected
            </span>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="flex min-h-[360px] items-center justify-center">
              <p className="text-sm text-white/30">
                Loading appointments...
              </p>
            </div>
          ) : filteredAppointments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px]">

                <thead>
                  <tr className="border-b border-white/10 text-left text-xs text-white/30">

                    <th className="px-6 py-4 font-medium">
                      Client
                    </th>

                    <th className="px-6 py-4 font-medium">
                      Business
                    </th>

                    <th className="px-6 py-4 font-medium">
                      Service
                    </th>

                    <th className="px-6 py-4 font-medium">
                      Date
                    </th>

                    <th className="px-6 py-4 font-medium">
                      Time
                    </th>

                    <th className="px-6 py-4 font-medium">
                      Status
                    </th>

                  </tr>
                </thead>

                <tbody>
                  {filteredAppointments.map(
                    (appointment) => (
                      <tr
                        key={appointment.id}
                        className="cursor-pointer border-b border-white/5 last:border-0 transition hover:bg-white/[0.02]"
                        onClick={() => openDetails(appointment)}
                      >

                        {/* Client */}
                        <td className="px-6 py-5">
                          <div>
                            <p className="text-sm font-medium">
                              {appointment.name}
                            </p>

                            <div className="mt-1 flex items-center gap-1.5 text-xs text-white/35">
                              <Mail size={13} />
                              {appointment.email}
                            </div>
                          </div>
                        </td>

                        {/* Business */}
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2">
                            <UserRound
                              size={14}
                              className="text-white/25"
                            />

                            <span className="text-sm text-white/50">
                              {appointment.business || "—"}
                            </span>
                          </div>
                        </td>

                        {/* Service */}
                        <td className="px-6 py-5 text-sm text-white/50">
                          {appointment.service}
                        </td>

                        {/* Date */}
                        <td className="px-6 py-5 text-sm text-white/50">
                          {formatDate(
                            appointment.appointment_date
                          )}
                        </td>

                        {/* Time */}
                        <td className="px-6 py-5 text-sm text-white/50">
                          {formatTime(
                            appointment.appointment_time
                          )}
                        </td>

                        {/* Status */}
                        <td className="px-6 py-5">
                          <select
                            value={appointment.status}
                            onClick={(event) => event.stopPropagation()}
                            onChange={(event) =>
                              updateStatus(
                                appointment.id,
                                event.target
                                  .value as AppointmentStatus
                              )
                            }
                            className={`rounded-full border px-3 py-1.5 text-xs outline-none ${
                              statusStyles[
                                appointment.status
                              ]
                            }`}
                          >
                            <option
                              value="Scheduled"
                              className="bg-[#111]"
                            >
                              Scheduled
                            </option>

                            <option
                              value="Confirmed"
                              className="bg-[#111]"
                            >
                              Confirmed
                            </option>

                            <option
                              value="Completed"
                              className="bg-[#111]"
                            >
                              Completed
                            </option>

                            <option
                              value="Cancelled"
                              className="bg-[#111]"
                            >
                              Cancelled
                            </option>
                          </select>
                        </td>

                      </tr>
                    )
                  )}
                </tbody>

              </table>
            </div>
          ) : (
            /* Empty State */
            <div className="flex min-h-[360px] flex-col items-center justify-center px-6 text-center">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
                <CalendarDays
                  size={26}
                  className="text-white/25"
                />
              </div>

              <h2 className="mt-6 text-lg font-semibold">
                No appointments yet
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-white/35">
                Appointments will appear here once clients
                schedule consultations or meetings with
                Vertex Studio.
              </p>

              <button
                type="button"
                onClick={openModal}
                className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-white/60 transition hover:bg-white/5 hover:text-white"
              >
                <Plus size={16} />
                Add your first appointment
              </button>

            </div>
          )}

        </section>

        {/* Back */}
        <div className="mt-8 flex flex-wrap items-center gap-5">

          <a
            href="/admin"
            className="inline-flex items-center gap-2 text-sm text-white/40 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Dashboard
          </a>

          <a
            href="/admin/leads"
            className="text-sm text-white/40 transition hover:text-white"
          >
            Leads →
          </a>

          <a
            href="/admin/analytics"
            className="text-sm text-white/40 transition hover:text-white"
          >
            Analytics →
          </a>

        </div>

      </div>

      {/* Appointment Details Modal */}
      {selectedAppointment && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-8 backdrop-blur-sm"
          onMouseDown={closeDetails}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#101010] shadow-2xl"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/30">
                  Appointment Details
                </p>

                <h2 className="mt-1 text-xl font-semibold">
                  {selectedAppointment.name}
                </h2>

                <div className="mt-1 flex items-center gap-1.5 text-sm text-white/40">
                  <Mail size={14} />
                  {selectedAppointment.email}
                </div>
              </div>

              <button
                type="button"
                onClick={closeDetails}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white/50 transition hover:bg-white/5 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-5 p-6">
              <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                <p className="text-xs uppercase tracking-[0.15em] text-white/30">
                  Appointment Status
                </p>

                <p className="mt-1 text-xs text-white/35">
                  Update the current stage of this appointment.
                </p>

                <select
                  value={selectedAppointment.status}
                  onChange={async (event) => {
                    const status = event.target.value as AppointmentStatus;
                    await updateStatus(selectedAppointment.id, status);
                    setSelectedAppointment((current) =>
                      current ? { ...current, status } : current
                    );
                  }}
                  className={`mt-4 rounded-full border px-4 py-2 text-sm outline-none ${statusStyles[selectedAppointment.status]}`}
                >
                  <option value="Scheduled" className="bg-[#111]">
                    Scheduled
                  </option>
                  <option value="Confirmed" className="bg-[#111]">
                    Confirmed
                  </option>
                  <option value="Completed" className="bg-[#111]">
                    Completed
                  </option>
                  <option value="Cancelled" className="bg-[#111]">
                    Cancelled
                  </option>
                </select>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                  <p className="text-xs uppercase tracking-[0.15em] text-white/30">
                    Client
                  </p>
                  <p className="mt-3 text-sm font-medium">
                    {selectedAppointment.name}
                  </p>
                  <p className="mt-1 text-sm text-white/40">
                    {selectedAppointment.email}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                  <p className="text-xs uppercase tracking-[0.15em] text-white/30">
                    Business
                  </p>
                  <p className="mt-3 text-sm font-medium">
                    {selectedAppointment.business || "—"}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                  <p className="text-xs uppercase tracking-[0.15em] text-white/30">
                    Service
                  </p>
                  <p className="mt-3 text-sm font-medium">
                    {selectedAppointment.service}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                  <p className="text-xs uppercase tracking-[0.15em] text-white/30">
                    Date & Time
                  </p>
                  <p className="mt-3 text-sm font-medium">
                    {formatDate(selectedAppointment.appointment_date)}
                  </p>
                  <p className="mt-1 text-sm text-white/40">
                    {formatTime(selectedAppointment.appointment_time)}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                <p className="text-xs uppercase tracking-[0.15em] text-white/30">
                  Notes
                </p>
                <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-white/60">
                  {selectedAppointment.notes || "No notes added."}
                </p>
              </div>

              <div className="flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row">
                <a
                  href={`mailto:${selectedAppointment.email}?subject=${encodeURIComponent(`Vertex Studio Appointment - ${selectedAppointment.service}`)}`}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
                >
                  <Mail size={17} />
                  Email Client
                </a>

                <button
                  type="button"
                  onClick={closeDetails}
                  className="flex-1 rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-white/60 transition hover:bg-white/5 hover:text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Appointment Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-8 backdrop-blur-sm">

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#101010] shadow-2xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">

              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/30">
                  Vertex Studio
                </p>

                <h2 className="mt-1 text-xl font-semibold">
                  Add Appointment
                </h2>

                <p className="mt-1 text-sm text-white/40">
                  Create a new consultation or client meeting.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white/50 transition hover:bg-white/5 hover:text-white disabled:opacity-40"
              >
                <X size={18} />
              </button>

            </div>

            {/* Form */}
            <form
              onSubmit={handleCreateAppointment}
              className="space-y-5 p-6"
            >

              {/* Error inside modal */}
              {error && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3">
                  <p className="text-sm text-red-400">
                    {error}
                  </p>
                </div>
              )}

              {/* Client */}
              <div className="grid gap-5 sm:grid-cols-2">

                <div>
                  <label
                    htmlFor="appointment-name"
                    className="mb-2 block text-sm font-medium text-white/70"
                  >
                    Client Name
                  </label>

                  <input
                    id="appointment-name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        name: event.target.value,
                      })
                    }
                    placeholder="John Doe"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-white/30"
                  />
                </div>

                <div>
                  <label
                    htmlFor="appointment-email"
                    className="mb-2 block text-sm font-medium text-white/70"
                  >
                    Email
                  </label>

                  <input
                    id="appointment-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        email: event.target.value,
                      })
                    }
                    placeholder="client@example.com"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-white/30"
                  />
                </div>

              </div>

              {/* Business */}
              <div>
                <label
                  htmlFor="appointment-business"
                  className="mb-2 block text-sm font-medium text-white/70"
                >
                  Business
                </label>

                <input
                  id="appointment-business"
                  type="text"
                  value={form.business}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      business: event.target.value,
                    })
                  }
                  placeholder="Business or company name"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-white/30"
                />
              </div>

              {/* Service */}
              <div>
                <label
                  htmlFor="appointment-service"
                  className="mb-2 block text-sm font-medium text-white/70"
                >
                  Service
                </label>

                <select
                  id="appointment-service"
                  value={form.service}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      service: event.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-white/30"
                >
                  <option
                    value="Website Consultation"
                    className="bg-[#111]"
                  >
                    Website Consultation
                  </option>

                  <option
                    value="Website Design"
                    className="bg-[#111]"
                  >
                    Website Design
                  </option>

                  <option
                    value="Website Development"
                    className="bg-[#111]"
                  >
                    Website Development
                  </option>

                  <option
                    value="SEO & Digital Growth"
                    className="bg-[#111]"
                  >
                    SEO & Digital Growth
                  </option>

                  <option
                    value="Website Care"
                    className="bg-[#111]"
                  >
                    Website Care
                  </option>

                  <option
                    value="Other"
                    className="bg-[#111]"
                  >
                    Other
                  </option>
                </select>
              </div>

              {/* Date / Time */}
              <div className="grid gap-5 sm:grid-cols-2">

                <div>
                  <label
                    htmlFor="appointment-date"
                    className="mb-2 block text-sm font-medium text-white/70"
                  >
                    Date
                  </label>

                  <input
                    id="appointment-date"
                    type="date"
                    required
                    value={form.appointment_date}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        appointment_date:
                          event.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-white/30"
                  />
                </div>

                <div>
                  <label
                    htmlFor="appointment-time"
                    className="mb-2 block text-sm font-medium text-white/70"
                  >
                    Time
                  </label>

                  <input
                    id="appointment-time"
                    type="time"
                    required
                    value={form.appointment_time}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        appointment_time:
                          event.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-white/30"
                  />
                </div>

              </div>

              {/* Status */}
              <div>
                <label
                  htmlFor="appointment-status"
                  className="mb-2 block text-sm font-medium text-white/70"
                >
                  Status
                </label>

                <select
                  id="appointment-status"
                  value={form.status}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      status:
                        event.target.value as AppointmentStatus,
                    })
                  }
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-white/30"
                >
                  <option
                    value="Scheduled"
                    className="bg-[#111]"
                  >
                    Scheduled
                  </option>

                  <option
                    value="Confirmed"
                    className="bg-[#111]"
                  >
                    Confirmed
                  </option>

                  <option
                    value="Completed"
                    className="bg-[#111]"
                  >
                    Completed
                  </option>

                  <option
                    value="Cancelled"
                    className="bg-[#111]"
                  >
                    Cancelled
                  </option>
                </select>
              </div>

              {/* Notes */}
              <div>
                <label
                  htmlFor="appointment-notes"
                  className="mb-2 block text-sm font-medium text-white/70"
                >
                  Notes
                </label>

                <textarea
                  id="appointment-notes"
                  rows={4}
                  value={form.notes}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      notes: event.target.value,
                    })
                  }
                  placeholder="Add any notes about this appointment..."
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-white/30"
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-col-reverse gap-3 border-t border-white/10 pt-5 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-white/60 transition hover:bg-white/5 hover:text-white disabled:opacity-40"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Plus size={17} />

                  {saving
                    ? "Creating..."
                    : "Create Appointment"}
                </button>

              </div>

            </form>

          </div>
        </div>
      )}

    </main>
  );
}