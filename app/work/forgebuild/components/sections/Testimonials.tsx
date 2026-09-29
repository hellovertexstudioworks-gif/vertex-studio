// ============================================================
// FORGEBUILD — TESTIMONIALS
// TASK: Replace the ENTIRE contents of your current
// Testimonials.tsx file with this file.
//
// NOTE:
// The testimonial names/quotes in this demo should be replaced
// with verified client testimonials before the site goes live.
// ============================================================

"use client";

import type { ReactNode } from "react";

import {
  ArrowUpRight,
  Quote,
  Star,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    quote:
      "ForgeBuild made the entire construction process feel organized and straightforward. Their team communicated clearly from the beginning and delivered exactly what we needed.",
    name: "Michael Anderson",
    role: "Business Owner",
    project: "Riverside Office Complex",
  },
  {
    quote:
      "The quality of the workmanship exceeded our expectations. The team paid attention to every detail and kept us updated throughout the entire project.",
    name: "David Thompson",
    role: "Homeowner",
    project: "Oakwood Residence",
  },
  {
    quote:
      "What stood out most was their professionalism. They stayed focused on quality, safety, and keeping the project moving according to schedule.",
    name: "Robert Martinez",
    role: "Property Developer",
    project: "Harbor View Development",
  },
];

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
        threshold: 0.12,
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
        ease-out
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

function Stars({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          size={14}
          strokeWidth={1.5}
          className={
            dark
              ? "fill-[#050817] text-[#050817]"
              : "fill-orange-500 text-orange-500"
          }
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-[#0d0f10] text-white"
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-44 -top-40 h-[600px] w-[600px] rounded-full bg-orange-500/[0.055] blur-3xl" />

        <div className="absolute -bottom-52 -left-40 h-[520px] w-[520px] rounded-full bg-white/[0.018] blur-3xl" />

        <div className="absolute right-[8%] top-[22%] h-28 w-28 rounded-full border border-orange-500/[0.08]" />

        <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] [background-size:90px_90px]" />
      </div>

      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <Reveal>
          <div className="grid gap-10 border-b border-white/10 pb-12 lg:grid-cols-[1fr_0.9fr] lg:items-end lg:gap-14 lg:pb-14">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <span className="h-[2px] w-10 bg-orange-500" />

                <span className="text-xs font-black uppercase tracking-[0.22em] text-orange-500">
                  Client Stories
                </span>
              </div>

              <h2 className="max-w-3xl text-[3.1rem] font-black uppercase leading-[0.88] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl">
                Trusted By
                <br />
                People Who
                <br />
                <span className="text-orange-500">Build Big.</span>
              </h2>
            </div>

            <div className="lg:justify-self-end">
              <p className="max-w-xl text-[15px] leading-7 text-white/55 sm:text-lg sm:leading-8">
                From homeowners to business owners and developers,
                ForgeBuild is built around clear communication,
                dependable workmanship, and results that last.
              </p>

              <div className="mt-7 flex items-center gap-3">
                <span className="h-2 w-2 bg-orange-500 shadow-[0_0_14px_rgba(249,115,22,0.35)]" />

                <span className="text-[10px] font-black uppercase tracking-[0.16em] text-white/35 sm:text-xs">
                  Built on trust
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* =====================================================
            TESTIMONIAL GRID
        ===================================================== */}

        <div className="mt-12 grid gap-4 sm:mt-16 sm:gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => {
            const featured = index === 1;

            return (
              <Reveal
                key={testimonial.name}
                delay={index * 100}
              >
                <article
                  className={`group relative flex h-full min-h-[500px] flex-col overflow-hidden border p-6 transition-all duration-500 sm:p-8 ${
                    featured
                      ? "border-orange-500 bg-orange-500 text-[#050817] shadow-[0_18px_60px_rgba(249,115,22,0.10)]"
                      : "border-white/10 bg-[#151819] text-white hover:-translate-y-1 hover:border-orange-500/50 hover:bg-[#191c1d] hover:shadow-[0_18px_50px_rgba(0,0,0,0.25)]"
                  }`}
                >
                  {/* ORANGE TOP ACCENT */}

                  {!featured && (
                    <div className="absolute left-0 right-0 top-0 h-[3px] origin-left scale-x-0 bg-orange-500 transition-transform duration-500 group-hover:scale-x-100" />
                  )}

                  {/* TOP */}

                  <div className="flex items-start justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center border ${
                        featured
                          ? "border-black/15 bg-black/10"
                          : "border-white/10 bg-white/[0.03]"
                      }`}
                    >
                      <Quote
                        size={20}
                        strokeWidth={1.8}
                        className={
                          featured
                            ? "text-[#050817]"
                            : "text-orange-500"
                        }
                        fill="currentColor"
                      />
                    </div>

                    <span
                      className={`text-5xl font-black leading-none tracking-[-0.06em] sm:text-6xl ${
                        featured
                          ? "text-black/[0.10]"
                          : "text-white/[0.035]"
                      }`}
                    >
                      0{index + 1}
                    </span>
                  </div>

                  {/* STARS */}

                  <div className="mt-7">
                    <Stars dark={featured} />
                  </div>

                  {/* QUOTE */}

                  <blockquote
                    className={`mt-6 text-[15px] leading-7 sm:mt-7 sm:text-lg sm:leading-8 ${
                      featured
                        ? "text-[#050817]/75"
                        : "text-white/65"
                    }`}
                  >
                    “{testimonial.quote}”
                  </blockquote>

                  {/* CLIENT INFO */}

                  <div
                    className={`mt-8 border-t pt-5 sm:mt-auto sm:pt-6 ${
                      featured
                        ? "border-black/15"
                        : "border-white/10"
                    }`}
                  >
                    <p
                      className={`text-sm font-black uppercase tracking-wide ${
                        featured
                          ? "text-[#050817]"
                          : "text-white"
                      }`}
                    >
                      {testimonial.name}
                    </p>

                    <p
                      className={`mt-1 text-[10px] font-bold uppercase tracking-[0.14em] sm:text-xs ${
                        featured
                          ? "text-[#050817]/60"
                          : "text-orange-500"
                      }`}
                    >
                      {testimonial.role}
                    </p>

                    <div className="mt-4 flex items-center justify-between gap-4">
                      <p
                        className={`text-[11px] leading-5 sm:text-xs ${
                          featured
                            ? "text-[#050817]/50"
                            : "text-white/30"
                        }`}
                      >
                        Project: {testimonial.project}
                      </p>

                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center border transition-all duration-300 ${
                          featured
                            ? "border-black/15 text-[#050817] group-hover:bg-[#050817] group-hover:text-white"
                            : "border-white/10 text-white/50 group-hover:border-orange-500 group-hover:bg-orange-500 group-hover:text-white"
                        }`}
                      >
                        <ArrowUpRight
                          size={16}
                          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* =====================================================
            TRUST BAR
        ===================================================== */}

        <Reveal delay={350}>
          <div className="mt-10 grid gap-6 border-t border-white/10 pt-8 lg:grid-cols-2 lg:items-center">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                <div className="h-10 w-10 border-2 border-[#0d0f10] bg-slate-600" />
                <div className="h-10 w-10 border-2 border-[#0d0f10] bg-slate-500" />
                <div className="h-10 w-10 border-2 border-[#0d0f10] bg-orange-500" />
              </div>

              <div>
                <p className="text-xs font-bold leading-5 text-white/70 sm:text-sm">
                  Built for residential and
                  <br className="sm:hidden" />
                  commercial projects.
                </p>

                <p className="mt-1 text-[10px] text-white/30 sm:text-xs">
                  Quality. Trust. Results.
                </p>
              </div>
            </div>

            <div className="lg:justify-self-end">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black uppercase tracking-[0.15em] text-white/30 sm:text-xs">
                  Client Experience
                </span>

                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      size={13}
                      className="fill-orange-500 text-orange-500"
                    />
                  ))}
                </div>

                <span className="h-px w-8 bg-orange-500/60" />
              </div>
            </div>
          </div>
        </Reveal>

        {/* =====================================================
            FINAL STATEMENT
        ===================================================== */}

        <Reveal delay={450}>
          <div className="relative mt-16 border-t border-white/10 pt-9">
            <div className="absolute left-0 top-0 h-[3px] w-20 bg-orange-500" />

            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500 sm:text-xs">
                  What matters most
                </p>

                <h3 className="mt-3 max-w-3xl text-2xl font-black uppercase leading-[0.95] tracking-[-0.035em] text-white sm:text-3xl lg:text-4xl">
                  Clear communication.
                  <br />
                  Quality workmanship.
                  <br />
                  <span className="text-orange-500">
                    No surprises.
                  </span>
                </h3>
              </div>

              <div className="hidden h-14 w-14 items-center justify-center border border-orange-500 bg-orange-500 text-white shadow-[0_10px_30px_rgba(249,115,22,0.18)] sm:flex">
                <ArrowUpRight size={20} />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
