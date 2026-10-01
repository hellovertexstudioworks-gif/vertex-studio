// TASK: Replace app/work/lunabistro/components/sections/Reservation.tsx with this file.
// Reservation redesign inspired by current dark editorial restaurant booking patterns.
// Online visual: Unsplash restaurant interior used as a temporary portfolio/demo image.

"use client";

import { FormEvent, useState } from "react";

const reservationImage =
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=85";

export default function Reservation() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="reservation"
      className="relative overflow-hidden bg-[#211812] text-[#F4EFE6]"
    >
      {/* =====================================================
          AMBIENT BACKGROUND
      ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `url("${reservationImage}")`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_35%,rgba(224,191,122,0.12),transparent_28%),linear-gradient(90deg,rgba(33,24,18,0.96)_0%,rgba(33,24,18,0.98)_55%,rgba(33,24,18,1)_100%)]"
      />

      {/* =====================================================
          INTRO
      ===================================================== */}

      <div className="relative px-6 pb-14 pt-24 sm:px-10 sm:pb-16 sm:pt-28 lg:px-14 lg:pb-20 lg:pt-36 xl:px-16">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.42fr] lg:items-end">
            <div>
              <div className="mb-7 flex items-center gap-4">
                <span className="h-px w-12 bg-[#E0BF7A]" />

                <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#E0BF7A]">
                  Reservations
                </p>
              </div>

              <h2 className="max-w-4xl font-serif text-[clamp(3.8rem,7vw,7.5rem)] leading-[0.86] tracking-[-0.06em]">
                Your table
                <br />
                <span className="italic text-[#E0BF7A]">awaits.</span>
              </h2>
            </div>

            <div className="max-w-md lg:pb-2">
              <p className="text-sm leading-7 text-white/50 sm:text-base sm:leading-8">
                An evening at Luna begins long before the first course. Tell us
                when you&apos;d like to join us, and we&apos;ll take care of the
                rest.
              </p>

              <div className="mt-6 flex items-center gap-3">
                <span className="h-px w-8 bg-[#C9A15A]/70" />

                <span className="text-[8px] font-bold uppercase tracking-[0.28em] text-white/25">
                  Request your evening
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          RESERVATION EXPERIENCE
      ===================================================== */}

      <div className="relative px-6 pb-20 sm:px-10 sm:pb-24 lg:px-14 lg:pb-32 xl:px-16">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid overflow-hidden border-y border-white/10 lg:grid-cols-[0.72fr_1.28fr]">
            {/* =================================================
                IMAGE / ATMOSPHERE
            ================================================= */}

            <div className="relative min-h-[430px] overflow-hidden border-b border-white/10 lg:min-h-[760px] lg:border-b-0 lg:border-r">
              <div
                className="absolute inset-0 scale-[1.03] bg-cover bg-center transition-transform duration-[1400ms] ease-out hover:scale-105"
                style={{ backgroundImage: `url("${reservationImage}")` }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#171410]/95 via-[#171410]/25 to-[#171410]/10" />

              <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9 lg:p-10">
                <div className="flex items-end justify-between gap-6">
                  <div>
                    <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-[#E0BF7A]">
                      The evening
                    </p>

                    <p className="mt-4 max-w-sm font-serif text-3xl leading-[1] text-[#F4EFE6] sm:text-4xl">
                      Good food deserves
                      <br />
                      <span className="italic text-[#E0BF7A]">
                        good company.
                      </span>
                    </p>
                  </div>

                  <span className="hidden h-12 w-px bg-white/20 sm:block" />
                </div>

                <div className="mt-7 flex items-center gap-4 border-t border-white/15 pt-5">
                  <span className="text-[8px] font-bold uppercase tracking-[0.22em] text-white/35">
                    New York · Since 2018
                  </span>

                  <span className="h-px flex-1 bg-white/10" />
                </div>
              </div>
            </div>

            {/* =================================================
                FORM
            ================================================= */}

            <div className="bg-[#171410]/35 px-6 py-10 sm:px-9 sm:py-12 lg:px-14 lg:py-14 xl:px-16">
              <div className="mb-10 flex items-end justify-between gap-6">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#E0BF7A]">
                    Request a reservation
                  </p>

                  <h3 className="mt-3 font-serif text-3xl tracking-[-0.03em] sm:text-4xl">
                    Tell us about your visit.
                  </h3>
                </div>

                <span className="hidden text-[9px] font-bold uppercase tracking-[0.2em] text-white/20 sm:block">
                  01 / 02
                </span>
              </div>

              {submitted ? (
                <div className="flex min-h-[520px] flex-col justify-center border-y border-white/10 py-12">
                  <span className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#E0BF7A]">
                    Request received
                  </span>

                  <h4 className="mt-5 max-w-xl font-serif text-5xl leading-[0.95] tracking-[-0.04em] sm:text-6xl">
                    We&apos;ll be in touch
                    <br />
                    <span className="italic text-[#E0BF7A]">shortly.</span>
                  </h4>

                  <p className="mt-7 max-w-md text-sm leading-7 text-white/45">
                    Your reservation request has been noted. This demo
                    confirmation is ready to be connected to a real booking
                    provider such as OpenTable, Resy, or your restaurant&apos;s
                    reservation system.
                  </p>

                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-9 w-fit border-b border-[#E0BF7A]/50 pb-2 text-[9px] font-bold uppercase tracking-[0.22em] text-[#E0BF7A] transition-colors hover:text-white hover:border-white/40"
                  >
                    Make another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* NAME + EMAIL */}

                  <div className="grid gap-8 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-3 block text-[9px] font-bold uppercase tracking-[0.22em] text-white/40"
                      >
                        Full Name
                      </label>

                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Your name"
                        className="h-12 w-full border-b border-white/15 bg-transparent px-0 text-sm text-white outline-none placeholder:text-white/20 transition-colors focus:border-[#E0BF7A]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="mb-3 block text-[9px] font-bold uppercase tracking-[0.22em] text-white/40"
                      >
                        Email Address
                      </label>

                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        className="h-12 w-full border-b border-white/15 bg-transparent px-0 text-sm text-white outline-none placeholder:text-white/20 transition-colors focus:border-[#E0BF7A]"
                      />
                    </div>
                  </div>

                  {/* DATE + TIME */}

                  <div className="grid gap-8 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="date"
                        className="mb-3 block text-[9px] font-bold uppercase tracking-[0.22em] text-white/40"
                      >
                        Date
                      </label>

                      <input
                        id="date"
                        name="date"
                        type="date"
                        required
                        className="h-12 w-full border-b border-white/15 bg-transparent px-0 text-sm text-white outline-none transition-colors focus:border-[#E0BF7A]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="time"
                        className="mb-3 block text-[9px] font-bold uppercase tracking-[0.22em] text-white/40"
                      >
                        Preferred Time
                      </label>

                      <select
                        id="time"
                        name="time"
                        defaultValue=""
                        required
                        className="h-12 w-full border-b border-white/15 bg-[#171410] px-0 text-sm text-white/70 outline-none transition-colors focus:border-[#E0BF7A]"
                      >
                        <option value="" disabled>
                          Select a time
                        </option>
                        <option value="5:30 PM">5:30 PM</option>
                        <option value="6:00 PM">6:00 PM</option>
                        <option value="6:30 PM">6:30 PM</option>
                        <option value="7:00 PM">7:00 PM</option>
                        <option value="7:30 PM">7:30 PM</option>
                        <option value="8:00 PM">8:00 PM</option>
                        <option value="8:30 PM">8:30 PM</option>
                        <option value="9:00 PM">9:00 PM</option>
                      </select>
                    </div>
                  </div>

                  {/* GUESTS + OCCASION */}

                  <div className="grid gap-8 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="guests"
                        className="mb-3 block text-[9px] font-bold uppercase tracking-[0.22em] text-white/40"
                      >
                        Guests
                      </label>

                      <select
                        id="guests"
                        name="guests"
                        defaultValue=""
                        required
                        className="h-12 w-full border-b border-white/15 bg-[#171410] px-0 text-sm text-white/70 outline-none transition-colors focus:border-[#E0BF7A]"
                      >
                        <option value="" disabled>
                          Number of guests
                        </option>
                        <option value="1">1 Guest</option>
                        <option value="2">2 Guests</option>
                        <option value="3">3 Guests</option>
                        <option value="4">4 Guests</option>
                        <option value="5">5 Guests</option>
                        <option value="6">6 Guests</option>
                        <option value="7">7 Guests</option>
                        <option value="8">8 Guests</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="occasion"
                        className="mb-3 block text-[9px] font-bold uppercase tracking-[0.22em] text-white/40"
                      >
                        Occasion
                      </label>

                      <select
                        id="occasion"
                        name="occasion"
                        defaultValue=""
                        className="h-12 w-full border-b border-white/15 bg-[#171410] px-0 text-sm text-white/70 outline-none transition-colors focus:border-[#E0BF7A]"
                      >
                        <option value="" disabled>
                          Select an occasion
                        </option>
                        <option value="Dinner">Dinner</option>
                        <option value="Birthday">Birthday</option>
                        <option value="Anniversary">Anniversary</option>
                        <option value="Celebration">Celebration</option>
                        <option value="Business Dinner">
                          Business Dinner
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* SPECIAL REQUESTS */}

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-3 block text-[9px] font-bold uppercase tracking-[0.22em] text-white/40"
                    >
                      Special Requests
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      placeholder="Dietary notes, seating preferences, or anything we should know..."
                      className="w-full resize-none border-b border-white/15 bg-transparent px-0 py-3 text-sm text-white outline-none placeholder:text-white/20 transition-colors focus:border-[#E0BF7A]"
                    />
                  </div>

                  {/* SUBMIT */}

                  <div className="flex flex-col gap-5 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
                    <p className="max-w-xs text-[8px] leading-5 text-white/25">
                      Reservations are subject to availability. Parties of 9+
                      should contact our team directly.
                    </p>

                    <button
                      type="submit"
                      className="group inline-flex h-14 items-center justify-center gap-5 bg-[#E0BF7A] px-8 text-[10px] font-bold uppercase tracking-[0.2em] text-[#171410] transition-all duration-300 hover:bg-[#C9A15A]"
                    >
                      <span>Request Reservation</span>

                      <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* =====================================================
              RESTAURANT DETAILS
          ===================================================== */}

          <div className="grid border-b border-white/10 sm:grid-cols-3">
            <div className="border-b border-white/10 py-7 sm:border-b-0 sm:border-r sm:pr-8">
              <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-[#E0BF7A]">
                Opening Hours
              </p>

              <p className="mt-3 text-sm leading-6 text-white/50">
                Mon — Thu · 5:30 — 10:00
                <br />
                Fri — Sat · 5:30 — 11:00
              </p>
            </div>

            <div className="border-b border-white/10 py-7 sm:border-b-0 sm:border-r sm:px-8">
              <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-[#E0BF7A]">
                Visit Luna
              </p>

              <p className="mt-3 font-serif text-lg leading-6 text-white/75">
                28 Mercer Street
                <br />
                New York, NY 10013
              </p>
            </div>

            <div className="py-7 sm:pl-8">
              <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-[#E0BF7A]">
                Reservations
              </p>

              <a
                href="tel:+12125550188"
                className="mt-3 block font-serif text-xl text-white/75 transition-colors hover:text-[#E0BF7A]"
              >
                +1 212 555 0188
              </a>
            </div>
          </div>

          {/* =====================================================
              CLOSING LINE
          ===================================================== */}

          <div className="flex flex-col justify-between gap-4 pt-7 sm:flex-row sm:items-center">
            <p className="text-[8px] font-medium uppercase tracking-[0.22em] text-white/20">
              A table is waiting when you are.
            </p>

            <p className="font-serif text-sm italic text-white/35">
              We look forward to welcoming you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
