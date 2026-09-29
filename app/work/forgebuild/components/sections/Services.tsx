"use client";

import type { ReactNode } from "react";

import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Calculator,
  CheckCircle2,
  ClipboardCheck,
  ClipboardList,
  Hammer,
  HardHat,
  Home,
  MessageSquare,
  Ruler,
  Wrench,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";

const services = [
  {
    number: "01",
    category: "CORE CONSTRUCTION",
    title: "General Contracting",
    description:
      "From planning and coordination to final completion, we manage the moving parts of your construction project from start to finish.",
    icon: Building2,
    accent: "dark",
  },
  {
    number: "02",
    category: "COMMERCIAL",
    title: "Commercial Construction",
    description:
      "Professional construction, build-outs, and improvements designed around the needs of your business and property.",
    icon: Building2,
    accent: "light",
  },
  {
    number: "03",
    category: "RESIDENTIAL",
    title: "Residential Construction",
    description:
      "New homes, additions, and residential projects built with careful planning, quality workmanship, and attention to detail.",
    icon: Home,
    accent: "dark",
  },
  {
    number: "04",
    category: "RENOVATION",
    title: "Remodeling & Renovation",
    description:
      "Transform existing spaces with practical renovations, interior improvements, and remodeling built around how you use the space.",
    icon: Hammer,
    accent: "orange",
  },
  {
    number: "05",
    category: "PROJECT DELIVERY",
    title: "Project Management",
    description:
      "Keep schedules, communication, coordination, and project priorities organized so the work continues moving forward.",
    icon: ClipboardCheck,
    accent: "light",
  },
  {
    number: "06",
    category: "INTEGRATED BUILD",
    title: "Design-Build",
    description:
      "Bring design and construction together through one coordinated approach for a more streamlined project experience.",
    icon: Ruler,
    accent: "dark",
  },
];

const process = [
  {
    title: "Consultation",
    description: "Tell us what you're planning.",
    icon: MessageSquare,
  },
  {
    title: "Estimate",
    description: "Review the project scope and budget.",
    icon: Calculator,
  },
  {
    title: "Planning",
    description: "Coordinate the work and timeline.",
    icon: ClipboardList,
  },
  {
    title: "Construction",
    description: "Execute the project with care.",
    icon: HardHat,
  },
  {
    title: "Completion",
    description: "Final walkthrough and closeout.",
    icon: CheckCircle2,
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

export default function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#f2f4f5]"
    >
      {/* =====================================================
          LIGHT BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-[400px] w-[400px] rounded-full bg-orange-500/[0.035] blur-3xl" />

        <div className="absolute right-[-160px] top-[40%] h-[450px] w-[450px] rounded-full bg-slate-400/[0.08] blur-3xl" />

        <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(5,8,23,1)_1px,transparent_1px),linear-gradient(90deg,rgba(5,8,23,1)_1px,transparent_1px)] [background-size:90px_90px]" />
      </div>

      {/* =====================================================
          SERVICES CONTENT
      ===================================================== */}

      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <Reveal>
          <div className="grid gap-10 border-b border-slate-300 pb-14 lg:grid-cols-[1fr_0.8fr] lg:items-end">

            <div>

              <div className="mb-7 flex items-center gap-3">
                <span className="h-px w-10 bg-orange-500" />

                <span className="text-xs font-black uppercase tracking-[0.22em] text-orange-500">
                  Construction Services
                </span>
              </div>

              <h2 className="max-w-4xl text-5xl font-black uppercase leading-[0.88] tracking-[-0.045em] text-[#050817] sm:text-6xl lg:text-7xl">
                Built For
                <br />
                The Work
                <br />
                <span className="text-orange-500">
                  Ahead.
                </span>
              </h2>

            </div>

            <div className="lg:justify-self-end lg:pb-1">

              <p className="max-w-xl text-base leading-8 text-[#456080] sm:text-lg">
                From new construction and commercial projects to
                renovations and remodels, ForgeBuild provides practical
                construction solutions with a focus on quality, safety,
                communication, and dependable project delivery.
              </p>

              <div className="mt-7 flex items-center gap-3">

                <span className="h-2 w-2 bg-orange-500" />

                <span className="text-xs font-black uppercase tracking-[0.16em] text-[#050817]">
                  Residential & Commercial
                </span>

              </div>

            </div>

          </div>
        </Reveal>

        {/* =====================================================
            SERVICES GRID
        ===================================================== */}

        <div className="mt-14 grid border-l border-t border-slate-300 sm:grid-cols-2 lg:grid-cols-3">

          {services.map((service, index) => {
            const Icon = service.icon;

            const isDark = service.accent === "dark";
            const isOrange = service.accent === "orange";

            return (
              <Reveal
                key={service.number}
                delay={index * 80}
                className="h-full"
              >

                <article
                  className={`
                    group
                    relative
                    flex
                    min-h-[410px]
                    h-full
                    overflow-hidden
                    border-b
                    border-r
                    transition-all
                    duration-500
                    hover:-translate-y-1
                    hover:shadow-2xl
                    ${
                      isDark
                        ? "bg-[#171a1b] text-white"
                        : isOrange
                          ? "bg-orange-500 text-[#050817]"
                          : "bg-white text-[#050817]"
                    }
                  `}
                >

                  {/* TOP ANIMATED LINE */}

                  <div
                    className={`
                      absolute
                      left-0
                      top-0
                      h-[3px]
                      w-0
                      transition-all
                      duration-700
                      group-hover:w-full
                      ${
                        isDark
                          ? "bg-orange-500"
                          : isOrange
                            ? "bg-[#050817]"
                            : "bg-orange-500"
                      }
                    `}
                  />

                  {/* CARD GLOW */}

                  <div
                    className={`
                      pointer-events-none
                      absolute
                      -right-16
                      -top-16
                      h-40
                      w-40
                      rounded-full
                      blur-3xl
                      opacity-0
                      transition-opacity
                      duration-700
                      group-hover:opacity-25
                      ${
                        isDark
                          ? "bg-orange-500"
                          : isOrange
                            ? "bg-white"
                            : "bg-orange-500"
                      }
                    `}
                  />

                  <div className="relative flex h-full w-full flex-col p-7 sm:p-8 lg:p-9">

                    {/* TOP */}

                    <div className="flex items-start justify-between">

                      <div>

                        <span
                          className={`
                            text-xs
                            font-black
                            tracking-[0.2em]
                            ${
                              isDark
                                ? "text-orange-500"
                                : isOrange
                                  ? "text-[#050817]/70"
                                  : "text-orange-500"
                            }
                          `}
                        >
                          {service.number}
                        </span>

                        <p
                          className={`
                            mt-2
                            text-[9px]
                            font-black
                            uppercase
                            tracking-[0.16em]
                            ${
                              isDark
                                ? "text-white/35"
                                : isOrange
                                  ? "text-[#050817]/55"
                                  : "text-slate-400"
                            }
                          `}
                        >
                          {service.category}
                        </p>

                      </div>

                      {/* SERVICE ICON */}

                      <div
                        className={`
                          flex
                          h-14
                          w-14
                          shrink-0
                          items-center
                          justify-center
                          border
                          transition-all
                          duration-500
                          group-hover:-translate-y-1
                          group-hover:rotate-3
                          ${
                            isDark
                              ? "border-white/15 bg-white/[0.03] group-hover:border-orange-500 group-hover:bg-orange-500"
                              : isOrange
                                ? "border-black/20 bg-[#050817] group-hover:bg-white"
                                : "border-slate-200 bg-slate-50 group-hover:border-orange-500 group-hover:bg-orange-500"
                          }
                        `}
                      >

                        <Icon
                          size={23}
                          strokeWidth={1.8}
                          className={`
                            transition-colors
                            duration-500
                            ${
                              isDark
                                ? "text-white group-hover:text-white"
                                : isOrange
                                  ? "text-white group-hover:text-[#050817]"
                                  : "text-[#050817] group-hover:text-white"
                            }
                          `}
                        />

                      </div>

                    </div>

                    {/* MAIN */}

                    <div className="mt-auto pt-14">

                      <h3
                        className={`
                          max-w-[320px]
                          text-2xl
                          font-black
                          uppercase
                          leading-[0.95]
                          tracking-[-0.025em]
                          transition-transform
                          duration-500
                          group-hover:translate-x-1
                          sm:text-[28px]
                          ${
                            isDark
                              ? "text-white"
                              : "text-[#050817]"
                          }
                        `}
                      >
                        {service.title}
                      </h3>

                      <p
                        className={`
                          mt-5
                          max-w-[340px]
                          text-sm
                          leading-7
                          ${
                            isDark
                              ? "text-white/55"
                              : isOrange
                                ? "text-[#050817]/75"
                                : "text-[#456080]"
                          }
                        `}
                      >
                        {service.description}
                      </p>

                    </div>

                    {/* FOOTER */}

                    <div
                      className={`
                        mt-7
                        flex
                        items-center
                        justify-between
                        border-t
                        pt-5
                        ${
                          isDark
                            ? "border-white/10"
                            : isOrange
                              ? "border-black/15"
                              : "border-slate-200"
                        }
                      `}
                    >

                      <span
                        className={`
                          text-[10px]
                          font-black
                          uppercase
                          tracking-[0.18em]
                          ${
                            isDark
                              ? "text-orange-500"
                              : isOrange
                                ? "text-[#050817]"
                                : "text-slate-400"
                          }
                        `}
                      >
                        ForgeBuild
                      </span>

                      <div
                        className={`
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center
                          border
                          transition-all
                          duration-500
                          group-hover:translate-x-1
                          ${
                            isDark
                              ? "border-white/20 text-white group-hover:border-orange-500 group-hover:bg-orange-500"
                              : isOrange
                                ? "border-black/20 text-[#050817] group-hover:bg-[#050817] group-hover:text-white"
                                : "border-slate-200 text-[#050817] group-hover:border-orange-500 group-hover:bg-orange-500 group-hover:text-white"
                          }
                        `}
                      >

                        <ArrowUpRight
                          size={18}
                          strokeWidth={2}
                          className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                        />

                      </div>

                    </div>

                  </div>

                </article>

              </Reveal>
            );
          })}

        </div>

      </div>

      {/* =====================================================
          FULL WIDTH BLACK LOWER AREA
      ===================================================== */}

      <div className="relative bg-[#101314]">

        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-28">

          {/* =====================================================
              HOW IT WORKS
          ===================================================== */}

          <Reveal>

            <div className="relative overflow-hidden border border-white/10 bg-[#171a1b]">

              {/* ORANGE SIDE ACCENT */}

              <div className="absolute left-0 top-0 h-full w-[3px] bg-orange-500" />

              {/* ORANGE AMBIENT GLOW */}

              <div className="pointer-events-none absolute right-[-120px] top-[-140px] h-[380px] w-[380px] rounded-full bg-orange-500/[0.055] blur-3xl" />

              {/* SUBTLE GRID */}

              <div className="pointer-events-none absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] [background-size:80px_80px]" />

              <div className="relative p-8 sm:p-10 lg:p-12">

                {/* HEADER */}

                <div className="grid gap-10 lg:grid-cols-[1fr_0.65fr] lg:items-end">

                  <div>

                    <div className="mb-5 flex items-center gap-3">

                      <span className="h-px w-8 bg-orange-500" />

                      <span className="text-xs font-black uppercase tracking-[0.2em] text-orange-500">
                        How It Works
                      </span>

                    </div>

                    <h3 className="max-w-4xl text-4xl font-black uppercase leading-[0.9] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                      From First
                      <br />
                      Conversation
                      <br />
                      To{" "}
                      <span className="text-orange-500">
                        Final Walkthrough.
                      </span>
                    </h3>

                  </div>

                  <p className="max-w-md text-sm leading-7 text-white/50 lg:justify-self-end">
                    A straightforward process designed to keep your project
                    organized, communicated, and moving forward from the
                    first conversation to completion.
                  </p>

                </div>

                {/* =================================================
                    PROCESS
                ================================================= */}

                <div className="group/process relative mt-14">

                  {/* DESKTOP CONNECTING LINE */}

                  <div className="pointer-events-none absolute left-[8%] right-[8%] top-[31px] hidden h-px bg-white/10 lg:block">

                    <div className="h-full w-0 bg-orange-500 transition-all duration-[1600ms] ease-out group-hover/process:w-full" />

                  </div>

                  <div className="grid border-l border-t border-white/10 sm:grid-cols-2 lg:grid-cols-5">

                    {process.map((step, index) => {
                      const Icon = step.icon;

                      return (
                        <div
                          key={step.title}
                          className="
                            group
                            relative
                            min-h-[245px]
                            overflow-hidden
                            border-b
                            border-r
                            border-white/10
                            p-6
                            transition-all
                            duration-500
                            hover:bg-white/[0.035]
                            sm:p-7
                          "
                        >

                          {/* TOP HOVER LINE */}

                          <div className="absolute left-0 top-0 h-[2px] w-0 bg-orange-500 transition-all duration-500 group-hover:w-full" />

                          {/* ICON */}

                          <div
                            className="
                              relative
                              z-10
                              flex
                              h-16
                              w-16
                              items-center
                              justify-center
                              border
                              border-white/10
                              bg-[#171a1b]
                              text-orange-500
                              transition-all
                              duration-500
                              group-hover:-translate-y-1
                              group-hover:rotate-3
                              group-hover:border-orange-500
                              group-hover:bg-orange-500
                              group-hover:text-white
                            "
                          >

                            <Icon
                              size={23}
                              strokeWidth={1.7}
                              className="transition-transform duration-500 group-hover:scale-110"
                            />

                          </div>

                          {/* CONTENT */}

                          <div className="mt-9">

                            <div className="flex items-center gap-2">

                              <span className="h-1.5 w-1.5 bg-orange-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                              <h4 className="text-sm font-black uppercase tracking-tight text-white">
                                {step.title}
                              </h4>

                            </div>

                            <p className="mt-3 max-w-[190px] text-xs leading-6 text-white/40 transition-colors duration-300 group-hover:text-white/65">
                              {step.description}
                            </p>

                          </div>

                          {/* BOTTOM PROGRESS */}

                          <div className="absolute bottom-0 left-6 right-6 h-px bg-white/5">

                            <div className="h-full w-0 bg-orange-500 transition-all duration-700 group-hover:w-full" />

                          </div>

                          {/* SMALL STEP MARKER */}

                          <span className="absolute bottom-5 right-6 text-[9px] font-black tracking-[0.2em] text-white/10 transition-colors duration-300 group-hover:text-orange-500/60">
                            0{index + 1}
                          </span>

                        </div>
                      );
                    })}

                  </div>

                </div>

              </div>

            </div>

          </Reveal>

          {/* =====================================================
              PROJECT CTA
          ===================================================== */}

          <Reveal delay={120} className="mt-7">

            <div className="group relative overflow-hidden border border-white/10 bg-[#171a1b]">

              {/* ORANGE LEFT ACCENT */}

              <div className="absolute left-0 top-0 h-full w-[3px] bg-orange-500" />

              {/* AMBIENT GLOW */}

              <div className="pointer-events-none absolute -right-24 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-orange-500/[0.05] blur-3xl transition-all duration-700 group-hover:bg-orange-500/[0.12]" />

              <div className="relative flex flex-col gap-8 p-7 sm:p-9 lg:flex-row lg:items-center lg:justify-between lg:p-10">

                {/* LEFT */}

                <div className="flex items-start gap-5">

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center bg-orange-500 text-white transition-all duration-500 group-hover:scale-105 group-hover:rotate-3">

                    <Wrench
                      size={21}
                      strokeWidth={1.8}
                    />

                  </div>

                  <div>

                    <div className="mb-2 flex items-center gap-2">

                      <span className="h-px w-6 bg-orange-500" />

                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500">
                        Start a Conversation
                      </span>

                    </div>

                    <h4 className="text-xl font-black uppercase tracking-[-0.02em] text-white sm:text-2xl">
                      Have a project in mind?
                    </h4>

                    <p className="mt-2 max-w-xl text-sm leading-6 text-white/45">
                      Tell us what you're planning and let's talk through
                      the right next step for your project.
                    </p>

                  </div>

                </div>

                {/* BUTTON */}

                <a
                  href="#contact"
                  className="
                    group/button
                    relative
                    inline-flex
                    shrink-0
                    items-center
                    justify-center
                    gap-4
                    overflow-hidden
                    bg-orange-500
                    px-7
                    py-4
                    text-sm
                    font-black
                    uppercase
                    tracking-wide
                    text-[#050817]
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:bg-white
                    hover:shadow-[0_12px_35px_rgba(255,106,0,0.18)]
                  "
                >

                  <span className="relative z-10">
                    Request a Project Estimate
                  </span>

                  <ArrowRight
                    size={18}
                    strokeWidth={2.5}
                    className="
                      relative
                      z-10
                      transition-transform
                      duration-300
                      group-hover/button:translate-x-1
                    "
                  />

                </a>

              </div>

            </div>

          </Reveal>

        </div>

      </div>

    </section>
  );
}