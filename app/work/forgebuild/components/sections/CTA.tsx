// ============================================================
// FORGEBUILD — CTA SECTION
// TASK: Replace the ENTIRE contents of your current CTA.tsx
// with this file.
//
// DESIGN:
// Premium construction CTA with restrained motion, orange
// accents, reveal animation, animated grid, and polished CTAs.
// ============================================================

"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  HardHat,
  Phone,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";

const points = [
  "New construction",
  "Renovation & remodeling",
  "Commercial development",
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

export default function CTA() {
  return (
    <section
      id="cta"
      className="relative overflow-hidden bg-orange-500 text-[#050817]"
    >
      {/* =====================================================
          DECORATIVE BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Large technical ring */}

        <div className="absolute -right-56 -top-56 h-[680px] w-[680px] rounded-full border-[90px] border-black/[0.055] sm:-right-48 sm:-top-48 sm:h-[760px] sm:w-[760px]" />

        <div className="absolute -bottom-48 -left-48 h-[440px] w-[440px] rounded-full border-[55px] border-white/[0.06]" />

        {/* Soft depth */}

        <div className="absolute right-[28%] top-[35%] h-64 w-64 rounded-full bg-white/[0.045] blur-3xl" />

        {/* Technical grid */}

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />

        {/* Small technical marks */}

        <div className="absolute left-[7%] top-[18%] h-20 w-px bg-black/10" />
        <div className="absolute left-[7%] top-[18%] h-px w-20 bg-black/10" />

        <div className="absolute bottom-[18%] right-[7%] h-20 w-px bg-black/10" />
        <div className="absolute bottom-[18%] right-[7%] h-px w-20 bg-black/10" />
      </div>

      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:items-center lg:gap-16">
          {/* =================================================
              LEFT CONTENT
          ================================================= */}

          <Reveal>
            <div>
              {/* Eyebrow */}

              <div className="mb-7 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#050817] shadow-[0_8px_25px_rgba(5,8,23,0.14)]">
                  <HardHat
                    size={20}
                    strokeWidth={2}
                    className="text-orange-500"
                  />
                </div>

                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black/65 sm:text-xs">
                  Start Your Project
                </span>
              </div>

              {/* Heading */}

              <h2 className="max-w-5xl text-[3.2rem] font-black uppercase leading-[0.84] tracking-[-0.055em] text-[#050817] sm:text-6xl lg:text-8xl">
                Ready To Build
                <br />
                Something
                <br />
                <span className="relative inline-block text-white">
                  Great?
                  <span className="absolute -bottom-2 left-0 h-[3px] w-16 bg-[#050817] sm:-bottom-3 sm:w-24" />
                </span>
              </h2>

              {/* Description */}

              <p className="mt-8 max-w-xl text-[15px] font-medium leading-7 text-black/70 sm:mt-9 sm:text-lg sm:leading-8">
                Tell us about your project and our team will help
                turn your vision into a clear plan built for
                quality, performance, and long-term value.
              </p>

              {/* Project Types */}

              <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-3">
                {points.map((point) => (
                  <div
                    key={point}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle2
                      size={16}
                      strokeWidth={2.2}
                      className="shrink-0 text-[#050817]"
                    />

                    <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-black/65 sm:text-xs">
                      {point}
                    </span>
                  </div>
                ))}
              </div>

              {/* Buttons */}

              <div className="mt-9 flex flex-col gap-3 sm:mt-11 sm:flex-row sm:gap-4">
                <Link
                  href="#contact"
                  className="group relative flex w-full items-center justify-center gap-3 overflow-hidden bg-[#050817] px-7 py-4 text-xs font-black uppercase tracking-wide text-white shadow-[0_12px_35px_rgba(5,8,23,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(5,8,23,0.24)] sm:w-auto sm:text-sm"
                >
                  <span className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-500 group-hover:translate-x-0" />

                  <span className="relative">
                    Request a Quote
                  </span>

                  <ArrowRight
                    size={18}
                    strokeWidth={2.5}
                    className="relative transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <a
                  href="tel:+639001234567"
                  className="group flex w-full items-center justify-center gap-3 border-2 border-black/25 px-7 py-4 text-xs font-black uppercase tracking-wide text-black transition-all duration-300 hover:-translate-y-1 hover:border-black hover:bg-black/5 sm:w-auto sm:text-sm"
                >
                  <Phone
                    size={17}
                    strokeWidth={2}
                  />

                  <span>Call Our Team</span>

                  <ArrowUpRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </a>
              </div>
            </div>
          </Reveal>

          {/* =================================================
              RIGHT PANEL
          ================================================= */}

          <Reveal delay={160}>
            <div className="relative">
              {/* Floating number */}

              <div className="pointer-events-none absolute -right-3 -top-8 z-20 text-[100px] font-black leading-none tracking-[-0.08em] text-black/[0.07] sm:-right-5 sm:-top-10 sm:text-[145px]">
                01
              </div>

              {/* Main panel */}

              <div className="relative overflow-hidden border border-white/10 bg-[#0d0f10] p-6 text-white shadow-[0_30px_80px_rgba(5,8,23,0.18)] sm:p-9 lg:p-11">
                {/* Orange accent */}

                <div className="absolute left-0 right-0 top-0 h-1 bg-orange-500" />

                {/* Decorative corner */}

                <div className="absolute right-0 top-0 h-24 w-24 border-b border-l border-orange-500/20" />

                <div className="relative">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500 sm:text-xs">
                    Let's Talk
                  </p>

                  <h3 className="mt-5 max-w-md text-[2rem] font-black uppercase leading-[0.95] tracking-[-0.035em] sm:mt-6 sm:text-4xl">
                    Your Next Project
                    <br />
                    <span className="text-orange-500">
                      Starts Here.
                    </span>
                  </h3>

                  <p className="mt-5 max-w-md text-sm leading-7 text-white/50 sm:mt-6 sm:text-base">
                    Whether you're planning a new build,
                    renovation, or commercial development,
                    we're ready to hear what you're working on.
                  </p>

                  {/* Divider */}

                  <div className="my-7 h-px bg-white/10 sm:my-8" />

                  {/* Response / Availability */}

                  <div className="grid gap-6 sm:grid-cols-2 sm:gap-7">
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.18em] text-white/30 sm:text-[10px]">
                        Response Time
                      </p>

                      <p className="mt-2 text-sm font-black text-white sm:text-base">
                        Within 1 Business Day
                      </p>
                    </div>

                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.18em] text-white/30 sm:text-[10px]">
                        Availability
                      </p>

                      <p className="mt-2 text-sm font-black text-white sm:text-base">
                        Residential & Commercial
                      </p>
                    </div>
                  </div>

                  {/* Panel CTA */}

                  <Link
                    href="#contact"
                    className="group mt-8 flex items-center justify-between border border-white/10 bg-white/[0.03] px-4 py-4 transition-all duration-300 hover:border-orange-500 hover:bg-orange-500 sm:mt-9 sm:px-5"
                  >
                    <span className="max-w-[220px] text-[10px] font-black uppercase leading-4 tracking-[0.14em] sm:max-w-none sm:text-xs">
                      Tell Us About Your Project
                    </span>

                    <ArrowUpRight
                      size={18}
                      className="shrink-0 text-orange-500 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#050817]"
                    />
                  </Link>
                </div>
              </div>

              {/* Floating label */}

              <div className="absolute -bottom-4 -left-4 hidden bg-[#050817] px-5 py-3 shadow-[0_10px_25px_rgba(5,8,23,0.16)] sm:block">
                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-white">
                  Built For What's Next
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* =====================================================
            BOTTOM LINE
        ===================================================== */}

        <Reveal delay={300}>
          <div className="mt-14 flex flex-col gap-4 border-t border-black/15 pt-7 sm:mt-16 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-black/50 sm:text-xs">
              Quality. Trust. Results.
            </p>

            <div className="flex items-center gap-3">
              <span className="h-2 w-2 shrink-0 bg-[#050817]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-black/60 sm:text-xs sm:tracking-[0.12em]">
                Let's build something that lasts.
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}