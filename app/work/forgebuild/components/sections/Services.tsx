"use client";

import {
  Building2,
  Home,
  Hammer,
  ClipboardCheck,
  Ruler,
  ArrowUpRight,
} from "lucide-react";

const services = [
  {
    number: "01",
    title: "General Contracting",
    description:
      "Complete construction management from planning and coordination through final completion.",
    icon: Building2,
    variant: "dark",
  },
  {
    number: "02",
    title: "Commercial Construction",
    description:
      "Professional commercial spaces designed and built around your business goals.",
    icon: Building2,
    variant: "light",
  },
  {
    number: "03",
    title: "Residential Construction",
    description:
      "Quality homes built with careful planning, craftsmanship, and attention to every detail.",
    icon: Home,
    variant: "light",
  },
  {
    number: "04",
    title: "Renovation & Remodeling",
    description:
      "Transform existing spaces with practical renovations and modern design solutions.",
    icon: Hammer,
    variant: "light",
  },
  {
    number: "05",
    title: "Project Management",
    description:
      "Reliable project coordination that keeps schedules, budgets, teams, and quality on track.",
    icon: ClipboardCheck,
    variant: "orange",
  },
  {
    number: "06",
    title: "Design-Build",
    description:
      "A streamlined approach combining design and construction under one experienced team.",
    icon: Ruler,
    variant: "dark",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="bg-white py-24 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">

          {/* LEFT */}

          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-orange-500" />

              <span className="text-xs font-black uppercase tracking-[0.22em] text-orange-500">
                What We Do
              </span>
            </div>

            <h2 className="max-w-3xl text-5xl font-black uppercase leading-[0.88] tracking-[-0.045em] text-[#050817] sm:text-6xl lg:text-7xl">
              Built Around
              <br />
              Your
              <br />
              <span className="text-orange-500">
                Vision.
              </span>
            </h2>
          </div>

          {/* RIGHT */}

          <p className="max-w-xl text-base leading-8 text-[#456080] sm:text-lg lg:justify-self-end lg:pb-2">
            From new construction to complex renovations,
            ForgeBuild provides dependable construction
            solutions with a focus on quality, safety,
            and lasting results.
          </p>
        </div>

        {/* =====================================================
            SERVICES GRID
        ===================================================== */}

        <div className="mt-16 grid border-l border-t border-[#dce3ea] sm:grid-cols-2 lg:grid-cols-3">

          {services.map((service) => {
            const Icon = service.icon;

            const isDark = service.variant === "dark";
            const isOrange = service.variant === "orange";

            return (
              <article
                key={service.number}
                className={`
                  group
                  relative
                  flex
                  min-h-[390px]
                  flex-col
                  overflow-hidden
                  border-b
                  border-r
                  transition-all
                  duration-500
                  ${
                    isDark
                      ? "bg-[#151819] text-white"
                      : isOrange
                      ? "bg-orange-500 text-[#050817]"
                      : "bg-white text-[#050817]"
                  }
                `}
              >

                {/* =================================================
                    TOP ACCENT
                ================================================= */}

                <div
                  className={`
                    absolute
                    left-0
                    top-0
                    h-[3px]
                    w-0
                    transition-all
                    duration-500
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

                {/* =================================================
                    CARD CONTENT
                ================================================= */}

                <div className="flex h-full flex-col p-7 sm:p-8 lg:p-9">

                  {/* =================================================
                      TOP ROW
                  ================================================= */}

                  <div className="flex items-start justify-between">

                    {/* NUMBER */}

                    <div>
                      <span
                        className={`
                          text-xs
                          font-black
                          tracking-[0.18em]
                          ${
                            isDark
                              ? "text-orange-500"
                              : "text-orange-500"
                          }
                        `}
                      >
                        {service.number}
                      </span>

                      {/* Small Accent Line */}

                      <div
                        className={`
                          mt-2
                          h-[2px]
                          w-6
                          ${
                            isOrange
                              ? "bg-[#050817]"
                              : "bg-orange-500"
                          }
                        `}
                      />
                    </div>

                    {/* ICON */}

                    <div
                      className={`
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        transition-all
                        duration-300
                        ${
                          isDark
                            ? "border border-white/15 bg-white/[0.03] group-hover:border-orange-500 group-hover:bg-orange-500"
                            : isOrange
                            ? "bg-[#050817] group-hover:bg-white"
                            : "border border-[#dce3ea] bg-[#f5f7f8] group-hover:border-orange-500 group-hover:bg-orange-500"
                        }
                      `}
                    >
                      <Icon
                        size={23}
                        strokeWidth={1.8}
                        className={`
                          transition-colors
                          duration-300
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

                  {/* =================================================
                      MAIN CONTENT
                  ================================================= */}

                  <div className="mt-auto">

                    {/* TITLE */}

                    <h3
                      className={`
                        max-w-[310px]
                        text-2xl
                        font-black
                        uppercase
                        leading-[0.95]
                        tracking-[-0.025em]
                        sm:text-[27px]
                        ${
                          isDark
                            ? "text-white"
                            : "text-[#050817]"
                        }
                      `}
                    >
                      {service.title}
                    </h3>

                    {/* DESCRIPTION */}

                    <p
                      className={`
                        mt-5
                        max-w-[335px]
                        text-sm
                        leading-7
                        ${
                          isDark
                            ? "text-white/60"
                            : isOrange
                            ? "text-[#050817]/75"
                            : "text-[#456080]"
                        }
                      `}
                    >
                      {service.description}
                    </p>

                    {/* =================================================
                        BOTTOM
                    ================================================= */}

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
                            : "border-[#dce3ea]"
                        }
                      `}
                    >

                      {/* BRAND */}

                      <span
                        className={`
                          text-[11px]
                          font-black
                          uppercase
                          tracking-[0.18em]
                          ${
                            isDark
                              ? "text-orange-500"
                              : isOrange
                              ? "text-[#050817]"
                              : "text-[#91a2b5]"
                          }
                        `}
                      >
                        ForgeBuild
                      </span>

                      {/* ARROW */}

                      <div
                        className={`
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center
                          border
                          transition-all
                          duration-300
                          ${
                            isDark
                              ? "border-white/20 text-white group-hover:border-orange-500 group-hover:bg-orange-500"
                              : isOrange
                              ? "border-black/20 text-[#050817] group-hover:bg-[#050817] group-hover:text-white"
                              : "border-[#dce3ea] text-[#050817] group-hover:border-orange-500 group-hover:bg-orange-500 group-hover:text-white"
                          }
                        `}
                      >
                        <ArrowUpRight
                          size={18}
                          strokeWidth={2}
                          className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* =====================================================
            BOTTOM BAR
        ===================================================== */}

        <div className="flex flex-col gap-5 border-b border-[#dce3ea] py-7 sm:flex-row sm:items-center sm:justify-between">

          {/* LEFT */}

          <div className="flex items-center gap-3">
            <span className="h-2 w-2 bg-orange-500" />

            <p className="text-sm font-bold text-[#050817]">
              Every project. One standard: quality.
            </p>
          </div>

          {/* RIGHT */}

          <a
            href="#contact"
            className="group inline-flex items-center gap-2 text-sm font-black uppercase tracking-wide text-[#050817] transition-colors duration-300 hover:text-orange-500"
          >
            Discuss Your Project

            <ArrowUpRight
              size={17}
              className="text-orange-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </a>
        </div>

      </div>
    </section>
  );
}