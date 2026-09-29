// ============================================================
// FORGEBUILD — WHY CHOOSE US
// TASK: Replace the ENTIRE contents of your current
// WhyChooseUs.tsx file with this file.
//
// ORANGE UPDATE:
// The bottom-right arrow button in "The ForgeBuild Standard"
// is now ORANGE by default with a WHITE arrow.
// ============================================================

"use client";

import type { ReactNode } from "react";

import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Clock3,
  ShieldCheck,
  Users,
  Wrench,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";

const reasons = [
  {
    number: "01",
    icon: ShieldCheck,
    title: "Safety First",
    description:
      "Every project follows strict safety practices to protect our team, our clients, and every person on site.",
  },
  {
    number: "02",
    icon: Award,
    title: "Proven Quality",
    description:
      "We combine experienced craftsmanship with quality materials to deliver work built to last.",
  },
  {
    number: "03",
    icon: Users,
    title: "Experienced Team",
    description:
      "Our skilled professionals bring practical knowledge and attention to detail to every project.",
  },
  {
    number: "04",
    icon: Clock3,
    title: "Reliable Delivery",
    description:
      "Clear planning and project coordination keep your build moving toward completion on schedule.",
  },
  {
    number: "05",
    icon: Wrench,
    title: "Built To Last",
    description:
      "We don't just focus on finishing the job. We focus on creating results that stand the test of time.",
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

export default function WhyChooseUs() {
  return (
    <section
      id="why-us"
      className="relative overflow-hidden bg-[#f2f4f5] text-[#050817]"
    >
      {/* =====================================================
          BACKGROUND DETAILS
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 top-0 h-[520px] w-[520px] rounded-full bg-orange-500/[0.06] blur-3xl" />

        <div className="absolute -left-48 bottom-0 h-[450px] w-[450px] rounded-full bg-orange-400/[0.025] blur-3xl" />

        <div className="absolute right-[12%] top-[18%] h-24 w-24 rounded-full border border-orange-500/[0.08]" />

        <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(5,8,23,1)_1px,transparent_1px),linear-gradient(90deg,rgba(5,8,23,1)_1px,transparent_1px)] [background-size:90px_90px]" />
      </div>

      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <Reveal>
          <div className="grid gap-12 border-b border-slate-300 pb-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <div className="mb-7 flex items-center gap-3">
                <span className="h-[2px] w-10 bg-orange-500" />

                <span className="text-xs font-black uppercase tracking-[0.22em] text-orange-500">
                  Why ForgeBuild
                </span>
              </div>

              <h2 className="max-w-xl text-5xl font-black uppercase leading-[0.88] tracking-[-0.045em] text-[#050817] sm:text-6xl lg:text-7xl">
                Built On
                <br />
                More Than
                <br />
                <span className="text-orange-500">Concrete.</span>
              </h2>
            </div>

            <div className="lg:justify-self-end lg:pb-1">
              <p className="max-w-xl text-base leading-8 text-[#456080] sm:text-lg">
                Great construction starts with trust. We bring
                experience, discipline, communication, and
                craftsmanship to every project we take on.
              </p>

              <div className="mt-7 flex items-center gap-3">
                <span className="h-2 w-2 bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.35)]" />

                <span className="text-xs font-black uppercase tracking-[0.15em] text-slate-400">
                  Our standard
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* =====================================================
            REASONS
        ===================================================== */}

        <div className="mt-14 border-l border-t border-slate-300">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;

            return (
              <Reveal
                key={reason.number}
                delay={index * 80}
              >
                <article
                  className="
                    group
                    relative
                    overflow-hidden
                    border-b
                    border-r
                    border-slate-300
                    bg-white
                    transition-all
                    duration-500
                    hover:-translate-y-[2px]
                    hover:border-orange-500/40
                    hover:shadow-[0_18px_50px_rgba(5,8,23,0.08)]
                  "
                >
                  <div
                    className="
                      absolute
                      inset-0
                      -translate-x-full
                      bg-[#111415]
                      transition-transform
                      duration-700
                      ease-[cubic-bezier(0.22,1,0.36,1)]
                      group-hover:translate-x-0
                    "
                  />

                  <div className="absolute left-0 top-0 h-[3px] w-0 bg-orange-500 shadow-[0_0_14px_rgba(249,115,22,0.3)] transition-all duration-700 group-hover:w-full" />

                  <div className="absolute bottom-0 left-0 top-0 w-[2px] origin-bottom scale-y-0 bg-orange-500 transition-transform duration-500 group-hover:scale-y-100" />

                  <div className="relative z-10 grid sm:grid-cols-[90px_80px_1fr_60px] sm:items-center">
                    <div className="px-6 py-7 sm:px-5 sm:py-9">
                      <span className="text-xs font-black tracking-[0.18em] text-orange-500">
                        {reason.number}
                      </span>
                    </div>

                    <div className="px-6 pb-0 sm:px-0 sm:py-9">
                      <div
                        className="
                          flex
                          h-14
                          w-14
                          items-center
                          justify-center
                          border
                          border-slate-300
                          bg-slate-50
                          transition-all
                          duration-500
                          group-hover:-translate-y-1
                          group-hover:rotate-3
                          group-hover:border-orange-500
                          group-hover:bg-orange-500
                          group-hover:shadow-[0_8px_25px_rgba(249,115,22,0.25)]
                        "
                      >
                        <Icon
                          size={23}
                          strokeWidth={1.8}
                          className="
                            text-[#050817]
                            transition-all
                            duration-500
                            group-hover:scale-110
                            group-hover:text-white
                          "
                        />
                      </div>
                    </div>

                    <div className="px-6 py-7 sm:px-6 sm:py-9">
                      <div className="flex items-center gap-3">
                        <span className="h-1.5 w-1.5 bg-orange-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                        <h3
                          className="
                            text-xl
                            font-black
                            uppercase
                            tracking-tight
                            text-[#050817]
                            transition-colors
                            duration-500
                            group-hover:text-white
                            sm:text-2xl
                          "
                        >
                          {reason.title}
                        </h3>
                      </div>

                      <p
                        className="
                          mt-2
                          max-w-2xl
                          text-sm
                          leading-7
                          text-slate-500
                          transition-colors
                          duration-500
                          group-hover:text-white/55
                          sm:text-base
                        "
                      >
                        {reason.description}
                      </p>
                    </div>

                    <div className="hidden justify-center sm:flex">
                      <div
                        className="
                          flex
                          h-11
                          w-11
                          items-center
                          justify-center
                          border
                          border-slate-300
                          text-slate-400
                          transition-all
                          duration-500
                          group-hover:border-orange-500
                          group-hover:bg-orange-500
                          group-hover:text-white
                          group-hover:shadow-[0_6px_20px_rgba(249,115,22,0.2)]
                        "
                      >
                        <ArrowUpRight
                          size={18}
                          className="
                            transition-transform
                            duration-500
                            group-hover:rotate-45
                          "
                        />
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-6 right-6 flex h-9 w-9 items-center justify-center border border-slate-200 text-slate-400 transition-all duration-500 group-hover:border-orange-500 group-hover:bg-orange-500 group-hover:text-white sm:hidden">
                    <ArrowUpRight
                      size={16}
                      className="transition-transform duration-500 group-hover:rotate-45"
                    />
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* =====================================================
            BOTTOM STATEMENT
        ===================================================== */}

        <Reveal delay={450}>
          <div className="mt-12 border-t border-slate-300 pt-8">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="flex items-center gap-4">
                <div
                  className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    bg-orange-500
                    shadow-[0_8px_25px_rgba(249,115,22,0.18)]
                    transition-transform
                    duration-500
                    hover:rotate-3
                  "
                >
                  <ShieldCheck
                    size={21}
                    strokeWidth={1.8}
                    className="text-white"
                  />
                </div>

                <div>
                  <p className="text-sm font-black uppercase tracking-tight text-[#050817]">
                    One team. One standard.
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Quality from foundation to finish.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-black uppercase tracking-[0.15em] text-slate-400">
                  Quality
                </span>

                <span className="h-px w-8 bg-orange-500 sm:w-12" />

                <span className="text-xs font-black uppercase tracking-[0.15em] text-[#050817]">
                  Trust
                </span>

                <span className="h-px w-8 bg-orange-500 sm:w-12" />

                <span className="text-xs font-black uppercase tracking-[0.15em] text-[#050817]">
                  Results
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* =====================================================
            FINAL STATEMENT
        ===================================================== */}

        <Reveal delay={550}>
          <div className="relative mt-20 grid gap-8 border-t border-slate-300 pt-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="absolute left-0 top-0 h-[3px] w-20 bg-orange-500" />

            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-500">
                The ForgeBuild Standard
              </p>

              <h3 className="mt-4 max-w-3xl text-3xl font-black uppercase leading-[0.95] tracking-[-0.035em] text-[#050817] sm:text-4xl lg:text-5xl">
                Built carefully.
                <br />
                Managed clearly.
                <br />
                <span className="text-orange-500">
                  Delivered properly.
                </span>
              </h3>
            </div>

            <div className="lg:justify-self-end">
              {/* =================================================
                  ORANGE CTA ARROW
                  This is the part changed for the requested
                  orange accent in the screenshot.
              ================================================= */}

              <div
                className="
                  group
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  border
                  border-orange-500
                  bg-orange-500
                  shadow-[0_10px_30px_rgba(249,115,22,0.22)]
                  transition-all
                  duration-500
                  hover:border-[#050817]
                  hover:bg-[#050817]
                  hover:shadow-[0_10px_30px_rgba(5,8,23,0.16)]
                "
              >
                <ArrowRight
                  size={22}
                  className="
                    text-white
                    transition-all
                    duration-500
                    group-hover:translate-x-1
                  "
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
