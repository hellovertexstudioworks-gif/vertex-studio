"use client";

import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock3,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="bg-[#f3f3f1] py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="max-w-3xl">

          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-orange-500" />

            <span className="text-xs font-black uppercase tracking-[0.2em] text-orange-500">
              Contact Us
            </span>
          </div>

          <h2 className="text-4xl font-black uppercase leading-[0.95] tracking-[-0.03em] text-slate-950 sm:text-5xl lg:text-6xl">
            Let's Build
            <br />
            Something
            <br />

            <span className="text-orange-500">
              Together.
            </span>
          </h2>

          <p className="mt-7 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Have a construction project in mind? Send us
            the details and our team will get back to you
            to discuss your project.
          </p>

        </div>

        {/* =====================================================
            MAIN GRID
        ===================================================== */}

        <div className="mt-16 grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">

          {/* =================================================
              CONTACT INFORMATION
          ================================================= */}

          <div className="bg-[#101314] p-8 text-white sm:p-10">

            <p className="text-xs font-black uppercase tracking-[0.18em] text-orange-500">
              Get In Touch
            </p>

            <h3 className="mt-5 text-2xl font-black uppercase">
              Talk To Our Team
            </h3>

            <p className="mt-4 text-sm leading-7 text-white/50">
              We're available to discuss new construction,
              renovations, commercial developments, and
              other project requirements.
            </p>

            <div className="mt-10 space-y-7">

              {/* Office */}

              <div className="flex gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-orange-500/30 bg-orange-500/10">
                  <MapPin
                    size={19}
                    className="text-orange-500"
                  />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-white/35">
                    Office
                  </p>

                  <p className="mt-1 text-sm font-semibold text-white/80">
                    Davao City, Philippines
                  </p>
                </div>

              </div>

              {/* Phone */}

              <div className="flex gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-orange-500/30 bg-orange-500/10">
                  <Phone
                    size={19}
                    className="text-orange-500"
                  />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-white/35">
                    Phone
                  </p>

                  <a
                    href="tel:+639001234567"
                    className="mt-1 block text-sm font-semibold text-white/80 transition-colors hover:text-orange-500"
                  >
                    +63 900 123 4567
                  </a>
                </div>

              </div>

              {/* Email */}

              <div className="flex gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-orange-500/30 bg-orange-500/10">
                  <Mail
                    size={19}
                    className="text-orange-500"
                  />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-white/35">
                    Email
                  </p>

                  <a
                    href="mailto:hello@forgebuild.com"
                    className="mt-1 block text-sm font-semibold text-white/80 transition-colors hover:text-orange-500"
                  >
                    hello@forgebuild.com
                  </a>
                </div>

              </div>

              {/* Hours */}

              <div className="flex gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-orange-500/30 bg-orange-500/10">
                  <Clock3
                    size={19}
                    className="text-orange-500"
                  />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-white/35">
                    Hours
                  </p>

                  <p className="mt-1 text-sm font-semibold text-white/80">
                    Mon - Sat · 8:00 AM - 6:00 PM
                  </p>
                </div>

              </div>

            </div>
          </div>

          {/* =================================================
              FORM
          ================================================= */}

          <div className="bg-white p-8 shadow-sm sm:p-10">

            {submitted ? (

              /* =================================================
                 SUCCESS STATE
              ================================================= */

              <div className="flex min-h-[500px] flex-col items-center justify-center text-center">

                <div className="flex h-16 w-16 items-center justify-center bg-orange-500/10">
                  <CheckCircle2
                    size={34}
                    className="text-orange-500"
                  />
                </div>

                <h3 className="mt-6 text-3xl font-black uppercase text-slate-950">
                  Request Received
                </h3>

                <p className="mt-4 max-w-md text-sm leading-7 text-slate-500">
                  Thank you for reaching out. Our team will
                  review your project details and contact you
                  shortly.
                </p>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-7 text-sm font-black uppercase tracking-wide text-orange-500 transition-colors hover:text-orange-600"
                >
                  Send Another Request
                </button>

              </div>

            ) : (

              /* =================================================
                 FORM
              ================================================= */

              <form onSubmit={handleSubmit}>

                <div className="grid gap-6 sm:grid-cols-2">

                  {/* Full Name */}

                  <div>
                    <label
                      htmlFor="name"
                      className="text-xs font-black uppercase tracking-[0.12em] text-slate-700"
                    >
                      Full Name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your name"
                      className="mt-3 w-full border border-slate-200 bg-slate-50 px-4 py-4 text-sm outline-none transition-colors focus:border-orange-500 focus:bg-white"
                    />
                  </div>

                  {/* Email */}

                  <div>
                    <label
                      htmlFor="email"
                      className="text-xs font-black uppercase tracking-[0.12em] text-slate-700"
                    >
                      Email
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="mt-3 w-full border border-slate-200 bg-slate-50 px-4 py-4 text-sm outline-none transition-colors focus:border-orange-500 focus:bg-white"
                    />
                  </div>

                  {/* Phone */}

                  <div>
                    <label
                      htmlFor="phone"
                      className="text-xs font-black uppercase tracking-[0.12em] text-slate-700"
                    >
                      Phone
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+63"
                      className="mt-3 w-full border border-slate-200 bg-slate-50 px-4 py-4 text-sm outline-none transition-colors focus:border-orange-500 focus:bg-white"
                    />
                  </div>

                  {/* Project Type */}

                  <div>
                    <label
                      htmlFor="project"
                      className="text-xs font-black uppercase tracking-[0.12em] text-slate-700"
                    >
                      Project Type
                    </label>

                    <select
                      id="project"
                      name="project"
                      required
                      defaultValue=""
                      className="mt-3 w-full border border-slate-200 bg-slate-50 px-4 py-4 text-sm outline-none transition-colors focus:border-orange-500 focus:bg-white"
                    >
                      <option value="" disabled>
                        Select project type
                      </option>

                      <option>
                        Commercial Construction
                      </option>

                      <option>
                        Residential Construction
                      </option>

                      <option>
                        Renovation & Remodeling
                      </option>

                      <option>
                        Project Management
                      </option>

                      <option>
                        Design-Build
                      </option>

                      <option>
                        Other
                      </option>
                    </select>
                  </div>

                  {/* Location */}

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="location"
                      className="text-xs font-black uppercase tracking-[0.12em] text-slate-700"
                    >
                      Project Location
                    </label>

                    <input
                      id="location"
                      name="location"
                      type="text"
                      placeholder="City / Province"
                      className="mt-3 w-full border border-slate-200 bg-slate-50 px-4 py-4 text-sm outline-none transition-colors focus:border-orange-500 focus:bg-white"
                    />
                  </div>

                  {/* Budget */}

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="budget"
                      className="text-xs font-black uppercase tracking-[0.12em] text-slate-700"
                    >
                      Estimated Budget
                    </label>

                    <select
                      id="budget"
                      name="budget"
                      defaultValue=""
                      className="mt-3 w-full border border-slate-200 bg-slate-50 px-4 py-4 text-sm outline-none transition-colors focus:border-orange-500 focus:bg-white"
                    >
                      <option value="" disabled>
                        Select estimated budget
                      </option>

                      <option>Under ₱1M</option>
                      <option>₱1M - ₱5M</option>
                      <option>₱5M - ₱10M</option>
                      <option>₱10M - ₱25M</option>
                      <option>₱25M+</option>
                      <option>Not sure yet</option>
                    </select>
                  </div>

                  {/* Message */}

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="message"
                      className="text-xs font-black uppercase tracking-[0.12em] text-slate-700"
                    >
                      Tell Us About Your Project
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      placeholder="Tell us about your project, timeline, and requirements..."
                      className="mt-3 w-full resize-none border border-slate-200 bg-slate-50 px-4 py-4 text-sm outline-none transition-colors focus:border-orange-500 focus:bg-white"
                    />
                  </div>

                </div>

                {/* Submit */}

                <button
                  type="submit"
                  className="group mt-8 inline-flex w-full items-center justify-center gap-3 bg-orange-500 px-7 py-4 text-sm font-black uppercase tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-600 sm:w-auto"
                >
                  Send Project Request

                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>

              </form>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}