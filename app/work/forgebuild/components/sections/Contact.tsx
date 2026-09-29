// ============================================================
// FORGEBUILD — CONTACT / PROJECT ESTIMATE
// TASK: Replace the ENTIRE contents of your current Contact.tsx
// with this file.
//
// DESIGN:
// Premium construction contact section with restrained reveal
// animation, orange accents, dark information panel, polished
// project-estimate form, and responsive mobile layout.
//
// NOTE:
// The current submit behavior remains frontend-only.
// It shows the success state locally. Connect the form to your
// existing lead/API endpoint before production launch.
// ============================================================

"use client";

import type { ReactNode } from "react";

import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`
        transition-all
        duration-700
        ease-[cubic-bezier(0.22,1,0.36,1)]
        ${
          visible
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0"
        }
        ${className}
      `}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const contactDetails = [
  {
    icon: MapPin,
    label: "Office",
    value: "Austin, Texas, USA",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (512) 555-0148",
    href: "tel:+15125550148",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@forgebuild.com",
    href: "mailto:hello@forgebuild.com",
  },
  {
    icon: Clock3,
    label: "Hours",
    value: "Mon - Sat · 8:00 AM - 6:00 PM",
  },
];

const projectTypes = [
  "Commercial Construction",
  "Residential Construction",
  "Renovation & Remodeling",
  "Project Management",
  "Design-Build",
  "Other",
];

const budgetOptions = [
  "Under $250K",
  "$250K - $500K",
  "$500K - $1M",
  "$1M - $5M",
  "$5M+",
  "Not sure yet",
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#f3f4f2] text-[#050817]"
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Orange ambient glow */}

        <div className="absolute -right-48 top-0 h-[520px] w-[520px] rounded-full bg-orange-500/[0.055] blur-3xl" />

        <div className="absolute -bottom-48 -left-40 h-[420px] w-[420px] rounded-full bg-orange-500/[0.025] blur-3xl" />

        {/* Technical grid */}

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(#050817 1px, transparent 1px), linear-gradient(90deg, #050817 1px, transparent 1px)",
            backgroundSize: "90px 90px",
          }}
        />

        {/* Technical corners */}

        <div className="absolute right-[7%] top-[15%] h-20 w-px bg-orange-500/20" />
        <div className="absolute right-[7%] top-[15%] h-px w-20 bg-orange-500/20" />

        <div className="absolute bottom-[12%] left-[7%] h-20 w-px bg-orange-500/10" />
        <div className="absolute bottom-[12%] left-[7%] h-px w-20 bg-orange-500/10" />
      </div>

      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        {/* =================================================
            HEADER
        ================================================= */}

        <Reveal>
          <div className="grid gap-10 border-b border-slate-300 pb-12 lg:grid-cols-[1fr_0.8fr] lg:items-end lg:gap-16 lg:pb-14">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <span className="h-[2px] w-10 bg-orange-500" />

                <span className="text-[10px] font-black uppercase tracking-[0.22em] text-orange-500 sm:text-xs">
                  Contact Us
                </span>
              </div>

              <h2 className="max-w-3xl text-[3.2rem] font-black uppercase leading-[0.87] tracking-[-0.045em] text-[#050817] sm:text-6xl lg:text-7xl">
                Let's Build
                <br />
                Something
                <br />
                <span className="text-orange-500">
                  Together.
                </span>
              </h2>
            </div>

            <div className="lg:justify-self-end lg:pb-1">
              <p className="max-w-xl text-[15px] leading-7 text-[#456080] sm:text-lg sm:leading-8">
                Have a construction project in mind? Send us
                the details and our team will get back to you
                to discuss your project.
              </p>

              <div className="mt-6 flex items-center gap-3">
                <span className="h-2 w-2 bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.3)]" />

                <span className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400 sm:text-xs">
                  Start a conversation
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* =================================================
            MAIN GRID
        ================================================= */}

        <div className="mt-12 grid gap-6 lg:mt-14 lg:grid-cols-[0.76fr_1.24fr] lg:gap-7">
          {/* =================================================
              CONTACT INFORMATION
          ================================================= */}

          <Reveal>
            <aside className="relative h-full overflow-hidden bg-[#101314] p-7 text-white shadow-[0_20px_55px_rgba(5,8,23,0.10)] sm:p-9 lg:p-10">
              {/* Orange top accent */}

              <div className="absolute left-0 right-0 top-0 h-1 bg-orange-500" />

              {/* Decorative number */}

              <div className="pointer-events-none absolute -right-2 -top-4 text-[100px] font-black leading-none tracking-[-0.08em] text-white/[0.025] sm:text-[130px]">
                02
              </div>

              <div className="relative">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500 sm:text-xs">
                  Get In Touch
                </p>

                <h3 className="mt-5 text-3xl font-black uppercase leading-[0.95] tracking-[-0.025em] sm:text-4xl">
                  Talk To
                  <br />
                  Our Team
                </h3>

                <p className="mt-5 max-w-sm text-sm leading-7 text-white/45">
                  We're available to discuss new construction,
                  renovations, commercial developments, and
                  other project requirements.
                </p>

                {/* Details */}

                <div className="mt-9 space-y-6 border-t border-white/10 pt-7">
                  {contactDetails.map((detail) => {
                    const Icon = detail.icon;

                    const content = (
                      <>
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-orange-500/25 bg-orange-500/[0.08] transition-all duration-300 group-hover:border-orange-500 group-hover:bg-orange-500">
                          <Icon
                            size={18}
                            strokeWidth={1.8}
                            className="text-orange-500 transition-colors duration-300 group-hover:text-white"
                          />
                        </div>

                        <div className="min-w-0">
                          <p className="text-[9px] font-black uppercase tracking-[0.16em] text-white/25 sm:text-[10px]">
                            {detail.label}
                          </p>

                          <p className="mt-1 break-words text-sm font-semibold text-white/75 transition-colors duration-300 group-hover:text-white">
                            {detail.value}
                          </p>
                        </div>
                      </>
                    );

                    if (detail.href) {
                      return (
                        <a
                          key={detail.label}
                          href={detail.href}
                          className="group flex gap-4"
                        >
                          {content}
                        </a>
                      );
                    }

                    return (
                      <div
                        key={detail.label}
                        className="group flex gap-4"
                      >
                        {content}
                      </div>
                    );
                  })}
                </div>

                {/* Small bottom statement */}

                <div className="mt-10 border-t border-white/10 pt-7">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.17em] text-white/25">
                        Response
                      </p>

                      <p className="mt-2 text-sm font-black text-white">
                        Within 1 Business Day
                      </p>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center border border-orange-500/30 bg-orange-500/10">
                      <ArrowUpRight
                        size={18}
                        className="text-orange-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </Reveal>

          {/* =================================================
              FORM
          ================================================= */}

          <Reveal delay={120}>
            <div className="relative overflow-hidden bg-white p-6 shadow-[0_20px_55px_rgba(5,8,23,0.06)] sm:p-9 lg:p-10">
              {/* Orange accent */}

              <div className="absolute left-0 top-0 h-1 w-24 bg-orange-500" />

              {/* Decorative corner */}

              <div className="absolute right-0 top-0 h-24 w-24 border-b border-l border-orange-500/10" />

              {submitted ? (
                /* =================================================
                   SUCCESS STATE
                ================================================= */

                <div className="relative flex min-h-[560px] flex-col items-center justify-center px-4 text-center">
                  <div className="relative flex h-20 w-20 items-center justify-center bg-orange-500/10">
                    <div className="absolute inset-0 animate-ping bg-orange-500/10" />

                    <div className="relative flex h-14 w-14 items-center justify-center bg-orange-500">
                      <CheckCircle2
                        size={30}
                        strokeWidth={2}
                        className="text-white"
                      />
                    </div>
                  </div>

                  <p className="mt-7 text-[10px] font-black uppercase tracking-[0.2em] text-orange-500 sm:text-xs">
                    Project Request Sent
                  </p>

                  <h3 className="mt-3 text-3xl font-black uppercase tracking-[-0.025em] text-[#050817] sm:text-4xl">
                    Request Received
                  </h3>

                  <p className="mt-4 max-w-md text-sm leading-7 text-slate-500 sm:text-base">
                    Thank you for reaching out. Our team will
                    review your project details and contact you
                    shortly.
                  </p>

                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="group mt-8 inline-flex items-center gap-3 border border-slate-200 px-5 py-3 text-[10px] font-black uppercase tracking-[0.12em] text-[#050817] transition-all duration-300 hover:border-orange-500 hover:bg-orange-500 hover:text-white"
                  >
                    Send Another Request

                    <ArrowRight
                      size={15}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </button>
                </div>
              ) : (
                /* =================================================
                   FORM
                ================================================= */

                <form onSubmit={handleSubmit}>
                  <div className="relative">
                    <div className="mb-8 flex items-end justify-between gap-5 border-b border-slate-200 pb-6">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500 sm:text-xs">
                          Project Estimate
                        </p>

                        <h3 className="mt-3 text-2xl font-black uppercase tracking-[-0.025em] text-[#050817] sm:text-3xl">
                          Tell Us About
                          <br className="sm:hidden" />
                          Your Project
                        </h3>
                      </div>

                      <div className="hidden h-11 w-11 shrink-0 items-center justify-center border border-orange-500/30 bg-orange-500/[0.06] sm:flex">
                        <Send
                          size={17}
                          className="text-orange-500"
                        />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
                      {/* Full Name */}

                      <div>
                        <label
                          htmlFor="name"
                          className="text-[10px] font-black uppercase tracking-[0.13em] text-slate-700"
                        >
                          Full Name
                        </label>

                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          placeholder="Your name"
                          className="mt-2.5 w-full border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-[#050817] outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:shadow-[0_0_0_3px_rgba(249,115,22,0.08)]"
                        />
                      </div>

                      {/* Email */}

                      <div>
                        <label
                          htmlFor="email"
                          className="text-[10px] font-black uppercase tracking-[0.13em] text-slate-700"
                        >
                          Email
                        </label>

                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="you@example.com"
                          className="mt-2.5 w-full border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-[#050817] outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:shadow-[0_0_0_3px_rgba(249,115,22,0.08)]"
                        />
                      </div>

                      {/* Phone */}

                      <div>
                        <label
                          htmlFor="phone"
                          className="text-[10px] font-black uppercase tracking-[0.13em] text-slate-700"
                        >
                          Phone
                        </label>

                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+63"
                          className="mt-2.5 w-full border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-[#050817] outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:shadow-[0_0_0_3px_rgba(249,115,22,0.08)]"
                        />
                      </div>

                      {/* Project Type */}

                      <div>
                        <label
                          htmlFor="project"
                          className="text-[10px] font-black uppercase tracking-[0.13em] text-slate-700"
                        >
                          Project Type
                        </label>

                        <select
                          id="project"
                          name="project"
                          required
                          defaultValue=""
                          className="mt-2.5 w-full border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-[#050817] outline-none transition-all duration-300 focus:border-orange-500 focus:bg-white focus:shadow-[0_0_0_3px_rgba(249,115,22,0.08)]"
                        >
                          <option value="" disabled>
                            Select project type
                          </option>

                          {projectTypes.map((type) => (
                            <option key={type}>{type}</option>
                          ))}
                        </select>
                      </div>

                      {/* Location */}

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="location"
                          className="text-[10px] font-black uppercase tracking-[0.13em] text-slate-700"
                        >
                          Project Location
                        </label>

                        <input
                          id="location"
                          name="location"
                          type="text"
                          placeholder="City / Province"
                          className="mt-2.5 w-full border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-[#050817] outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:shadow-[0_0_0_3px_rgba(249,115,22,0.08)]"
                        />
                      </div>

                      {/* Budget */}

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="budget"
                          className="text-[10px] font-black uppercase tracking-[0.13em] text-slate-700"
                        >
                          Estimated Budget
                        </label>

                        <select
                          id="budget"
                          name="budget"
                          defaultValue=""
                          className="mt-2.5 w-full border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-[#050817] outline-none transition-all duration-300 focus:border-orange-500 focus:bg-white focus:shadow-[0_0_0_3px_rgba(249,115,22,0.08)]"
                        >
                          <option value="" disabled>
                            Select estimated budget
                          </option>

                          {budgetOptions.map((budget) => (
                            <option key={budget}>{budget}</option>
                          ))}
                        </select>
                      </div>

                      {/* Message */}

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="message"
                          className="text-[10px] font-black uppercase tracking-[0.13em] text-slate-700"
                        >
                          Tell Us About Your Project
                        </label>

                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={5}
                          placeholder="Tell us about your project, timeline, and requirements..."
                          className="mt-2.5 w-full resize-none border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-[#050817] outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:shadow-[0_0_0_3px_rgba(249,115,22,0.08)]"
                        />
                      </div>
                    </div>

                    {/* Submit */}

                    <div className="mt-7 flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
                      <p className="max-w-sm text-[10px] leading-5 text-slate-400">
                        Share as much detail as you can so our team
                        can better understand your project.
                      </p>

                      <button
                        type="submit"
                        className="group inline-flex w-full items-center justify-center gap-3 bg-orange-500 px-7 py-4 text-xs font-black uppercase tracking-wide text-white shadow-[0_10px_25px_rgba(249,115,22,0.16)] transition-all duration-300 hover:-translate-y-1 hover:bg-orange-600 hover:shadow-[0_15px_35px_rgba(249,115,22,0.22)] sm:w-auto"
                      >
                        Send Project Request

                        <ArrowRight
                          size={17}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>

        {/* =================================================
            BOTTOM STATEMENT
        ================================================= */}

        <Reveal delay={300}>
          <div className="mt-10 flex flex-col gap-4 border-t border-slate-300 pt-7 sm:mt-12 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 bg-orange-500" />

              <span className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 sm:text-xs">
                Quality. Trust. Results.
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-500 sm:text-xs">
                From first conversation to final handoff.
              </span>

              <span className="hidden h-px w-10 bg-orange-500 sm:block" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
