"use client";

import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Mail,
  UserRound,
} from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type BookingForm = {
  name: string;
  email: string;
  business: string;
  service: string;
  appointment_date: string;
  appointment_time: string;
  notes: string;
};

const services = [
  "Website Consultation",
  "Website Design",
  "Website Development",
  "SEO & Digital Growth",
  "Website Care",
  "Other",
];

export default function Booking() {
  const supabase = createClient();

  const [form, setForm] = useState<BookingForm>({
    name: "",
    email: "",
    business: "",
    service: "Website Consultation",
    appointment_date: "",
    appointment_time: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const minimumDate = useMemo(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }, []);

  const formattedDate = useMemo(() => {
    if (!form.appointment_date) return "";

    const [year, month, day] = form.appointment_date
      .split("-")
      .map(Number);

    const date = new Date(year, month - 1, day);

    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  }, [form.appointment_date]);

  const formattedTime = useMemo(() => {
    if (!form.appointment_time) return "";

    const [hours, minutes] = form.appointment_time
      .split(":")
      .map(Number);

    const date = new Date();
    date.setHours(hours, minutes, 0, 0);

    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
    }).format(date);
  }, [form.appointment_time]);

  const updateField = (
    field: keyof BookingForm,
    value: string
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      if (!form.name.trim()) {
        throw new Error("Please enter your name.");
      }

      if (!form.email.trim()) {
        throw new Error("Please enter your email.");
      }

      if (!form.appointment_date) {
        throw new Error("Please select a date.");
      }

      if (!form.appointment_time) {
        throw new Error("Please select a time.");
      }

      const { error: appointmentError } = await supabase
        .from("appointments")
        .insert({
          name: form.name.trim(),
          email: form.email.trim(),
          business: form.business.trim() || null,
          service: form.service,
          appointment_date: form.appointment_date,
          appointment_time: form.appointment_time,
          status: "Scheduled",
          notes: form.notes.trim() || null,
        });

      if (appointmentError) {
        console.error(
          "BOOKING ERROR:",
          appointmentError
        );

        throw new Error(
          appointmentError.message ||
            "We couldn't create your appointment."
        );
      }

      setSuccess(true);

      setForm({
        name: "",
        email: "",
        business: "",
        service: "Website Consultation",
        appointment_date: "",
        appointment_time: "",
        notes: "",
      });
    } catch (bookingError) {
      console.error(
        "BOOKING SUBMISSION ERROR:",
        bookingError
      );

      setError(
        bookingError instanceof Error
          ? bookingError.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="booking"
      className="relative overflow-hidden bg-[#050816] px-6 py-24 sm:px-8 lg:px-10"
    >
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400/70">
            Book a Consultation
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Let&apos;s talk about your project.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/45 sm:text-base">
            Choose a date and time that works for you. We&apos;ll use
            the consultation to understand your goals, requirements,
            and how Vertex Studio can help.
          </p>
        </div>

        {/* Booking Card */}
        <div className="mx-auto mt-12 max-w-4xl rounded-3xl border border-white/10 bg-white/[0.025] p-5 shadow-2xl sm:p-8">

          {/* Success */}
          {success ? (
            <div className="flex min-h-[520px] flex-col items-center justify-center px-6 py-12 text-center">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10">
                <CheckCircle2
                  size={30}
                  className="text-emerald-400"
                />
              </div>

              <h3 className="mt-6 text-2xl font-semibold text-white">
                Consultation requested
              </h3>

              <p className="mt-3 max-w-md text-sm leading-6 text-white/45">
                Your appointment request has been submitted.
                We&apos;ll review the details and get in touch
                with you using the email you provided.
              </p>

              <button
                type="button"
                onClick={() => setSuccess(false)}
                className="mt-8 rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-white/70 transition hover:bg-white/5 hover:text-white"
              >
                Book another consultation
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* Error */}
              {error && (
                <div className="rounded-2xl border border-red-500/20 bg-red-500/5 px-5 py-4">
                  <p className="text-sm font-medium text-red-400">
                    Booking error
                  </p>

                  <p className="mt-1 text-xs leading-5 text-red-400/70">
                    {error}
                  </p>
                </div>
              )}

              {/* Name / Email */}
              <div className="grid gap-5 sm:grid-cols-2">

                <div>
                  <label
                    htmlFor="booking-name"
                    className="mb-2 block text-sm font-medium text-white/70"
                  >
                    Your Name *
                  </label>

                  <div className="relative">
                    <UserRound
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400/60"
                    />

                    <input
                      id="booking-name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(event) =>
                        updateField(
                          "name",
                          event.target.value
                        )
                      }
                      placeholder="John Doe"
                      autoComplete="name"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pl-11 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-cyan-400/40 focus:bg-cyan-400/[0.04] focus:ring-1 focus:ring-cyan-400/20"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="booking-email"
                    className="mb-2 block text-sm font-medium text-white/70"
                  >
                    Email *
                  </label>

                  <div className="relative">
                    <Mail
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400/60"
                    />

                    <input
                      id="booking-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(event) =>
                        updateField(
                          "email",
                          event.target.value
                        )
                      }
                      placeholder="you@example.com"
                      autoComplete="email"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pl-11 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-cyan-400/40 focus:bg-cyan-400/[0.04] focus:ring-1 focus:ring-cyan-400/20"
                    />
                  </div>
                </div>

              </div>

              {/* Business */}
              <div>
                <label
                  htmlFor="booking-business"
                  className="mb-2 block text-sm font-medium text-white/70"
                >
                  Business
                </label>

                <input
                  id="booking-business"
                  type="text"
                  value={form.business}
                  onChange={(event) =>
                    updateField(
                      "business",
                      event.target.value
                    )
                  }
                  placeholder="Your business or company"
                  autoComplete="organization"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-cyan-400/40 focus:bg-cyan-400/[0.04] focus:ring-1 focus:ring-cyan-400/20"
                />
              </div>

              {/* Service */}
              <div>
                <label
                  htmlFor="booking-service"
                  className="mb-2 block text-sm font-medium text-white/70"
                >
                  What can we help with?
                </label>

                <select
                  id="booking-service"
                  value={form.service}
                  onChange={(event) =>
                    updateField(
                      "service",
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/40 focus:bg-cyan-400/[0.04] focus:ring-1 focus:ring-cyan-400/20"
                >
                  {services.map((service) => (
                    <option
                      key={service}
                      value={service}
                      className="bg-[#111]"
                    >
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date / Time */}
              <div className="grid gap-5 sm:grid-cols-2">

                {/* Date */}
                <div>
                  <label
                    htmlFor="booking-date"
                    className="mb-2 flex items-center gap-2 text-sm font-medium text-white/70"
                  >
                    <CalendarDays
                      size={15}
                      className="text-cyan-400"
                    />
                    Preferred Date *
                  </label>

                  <div className="relative">
                    <CalendarDays
                      size={17}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400"
                    />

                    <input
                      id="booking-date"
                      type="date"
                      required
                      min={minimumDate}
                      value={form.appointment_date}
                      onChange={(event) =>
                        updateField(
                          "appointment_date",
                          event.target.value
                        )
                      }
                      style={{
                        colorScheme: "dark",
                        accentColor: "#22d3ee",
                      }}
                      className="w-full cursor-pointer rounded-xl border border-cyan-400/20 bg-cyan-400/[0.035] px-4 py-3 pl-11 text-sm font-medium text-white outline-none transition hover:border-cyan-400/35 hover:bg-cyan-400/[0.055] focus:border-cyan-400/60 focus:bg-cyan-400/[0.07] focus:ring-2 focus:ring-cyan-400/10"
                    />
                  </div>

                  <div className="mt-2 min-h-[18px] pl-1">
                    {formattedDate ? (
                      <p className="text-xs font-medium text-cyan-300/80">
                        📅 {formattedDate}
                      </p>
                    ) : (
                      <p className="text-xs text-white/25">
                        Select your preferred date
                      </p>
                    )}
                  </div>
                </div>

                {/* Time */}
                <div>
                  <label
                    htmlFor="booking-time"
                    className="mb-2 flex items-center gap-2 text-sm font-medium text-white/70"
                  >
                    <Clock3
                      size={15}
                      className="text-cyan-400"
                    />
                    Preferred Time *
                  </label>

                  <div className="relative">
                    <Clock3
                      size={17}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400"
                    />

                    <input
                      id="booking-time"
                      type="time"
                      required
                      value={form.appointment_time}
                      onChange={(event) =>
                        updateField(
                          "appointment_time",
                          event.target.value
                        )
                      }
                      style={{
                        colorScheme: "dark",
                        accentColor: "#22d3ee",
                      }}
                      className="w-full cursor-pointer rounded-xl border border-cyan-400/20 bg-cyan-400/[0.035] px-4 py-3 pl-11 text-sm font-medium text-white outline-none transition hover:border-cyan-400/35 hover:bg-cyan-400/[0.055] focus:border-cyan-400/60 focus:bg-cyan-400/[0.07] focus:ring-2 focus:ring-cyan-400/10"
                    />
                  </div>

                  <div className="mt-2 min-h-[18px] pl-1">
                    {formattedTime ? (
                      <p className="text-xs font-medium text-cyan-300/80">
                        🕐 {formattedTime}
                      </p>
                    ) : (
                      <p className="text-xs text-white/25">
                        Select a time — AM or PM
                      </p>
                    )}
                  </div>
                </div>

              </div>

              {/* Notes */}
              <div>
                <label
                  htmlFor="booking-notes"
                  className="mb-2 block text-sm font-medium text-white/70"
                >
                  Project Details
                </label>

                <textarea
                  id="booking-notes"
                  rows={5}
                  value={form.notes}
                  onChange={(event) =>
                    updateField(
                      "notes",
                      event.target.value
                    )
                  }
                  placeholder="Tell us a little about your project, goals, budget, timeline, or anything you'd like us to know..."
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-white/25 focus:border-cyan-400/40 focus:bg-cyan-400/[0.04] focus:ring-1 focus:ring-cyan-400/20"
                />
              </div>

              {/* Submit */}
              <div className="border-t border-white/10 pt-6">

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <CalendarDays size={17} />

                  {loading
                    ? "Booking consultation..."
                    : "Book Consultation"}
                </button>

                <p className="mt-3 text-center text-xs leading-5 text-white/30">
                  Your request will be added to our scheduling
                  system. We&apos;ll follow up using your email.
                </p>

              </div>

            </form>
          )}

        </div>
      </div>
    </section>
  );
}