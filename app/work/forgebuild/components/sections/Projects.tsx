"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Calculator,
  Home,
  Hammer,
  MapPin,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const projects = [
  {
    title: "Riverside Office Complex",
    category: "Commercial Construction",
    location: "Dallas, Texas",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=85",
    size: "featured",
  },
  {
    title: "Oakwood Residence",
    category: "Residential Construction",
    location: "Austin, Texas",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
    size: "standard",
  },
  {
    title: "Harbor View Development",
    category: "Commercial Development",
    location: "Tampa, Florida",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=85",
    size: "standard",
  },
  {
    title: "Westfield Renovation",
    category: "Renovation & Remodeling",
    location: "Phoenix, Arizona",
    image:
      "https://images.unsplash.com/photo-1504615755583-2916b52192a3?auto=format&fit=crop&w=1800&q=85",
    size: "wide",
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
        ease-out
        ${
          visible
            ? "translate-y-0 opacity-100"
            : "translate-y-10 opacity-0"
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

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-[#0b0d0e] text-white"
    >
      {/* =====================================================
          BACKGROUND DETAILS
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* TOP DIVIDER */}

        <div className="absolute left-0 top-0 h-px w-full bg-white/10" />

        {/* ORANGE AMBIENT GLOW */}

        <div className="absolute -right-48 top-32 h-[550px] w-[550px] rounded-full bg-orange-500/[0.045] blur-3xl" />

        <div className="absolute -left-48 bottom-32 h-[450px] w-[450px] rounded-full bg-orange-500/[0.025] blur-3xl" />

        {/* SUBTLE GRID */}

        <div className="absolute inset-0 opacity-[0.018] [background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] [background-size:90px_90px]" />

      </div>

      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <Reveal>

          <div className="grid gap-10 border-b border-white/10 pb-14 lg:grid-cols-[1fr_0.72fr] lg:items-end">

            {/* LEFT */}

            <div>

              <div className="mb-7 flex items-center gap-3">

                <span className="h-px w-10 bg-orange-500" />

                <span className="text-xs font-black uppercase tracking-[0.22em] text-orange-500">
                  Selected Work
                </span>

              </div>

              <h2 className="max-w-4xl text-5xl font-black uppercase leading-[0.88] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl">

                Projects That
                <br />

                <span className="text-orange-500">
                  Speak For Us.
                </span>

              </h2>

            </div>

            {/* RIGHT */}

            <div className="lg:justify-self-end">

              <p className="max-w-lg text-base leading-8 text-white/55 sm:text-lg">
                From commercial developments to custom residences,
                every ForgeBuild project is built around quality,
                precision, and lasting value.
              </p>

              <div className="mt-7 flex items-center gap-3">

                <div className="h-2 w-2 bg-orange-500" />

                <span className="text-xs font-bold uppercase tracking-[0.16em] text-white/40">
                  Built with purpose
                </span>

              </div>

            </div>

          </div>

        </Reveal>

        {/* =====================================================
            PROJECT GRID
        ===================================================== */}

        <div className="mt-16 grid gap-4 lg:grid-cols-12">

          {/* ===================================================
              FEATURED PROJECT
          =================================================== */}

          <Reveal
            delay={100}
            className="lg:col-span-7"
          >

            <Link
              href="#contact"
              className="
                group
                relative
                block
                min-h-[570px]
                overflow-hidden
                border
                border-white/10
                bg-black
                transition-all
                duration-700
                hover:border-orange-500/50
              "
            >

              {/* IMAGE */}

              <Image
                src={projects[0].image}
                alt={projects[0].title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="
                  object-cover
                  transition-transform
                  duration-[1200ms]
                  ease-out
                  group-hover:scale-[1.07]
                "
              />

              {/* DARK OVERLAY */}

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10 transition-opacity duration-700 group-hover:from-black/90" />

              {/* ORANGE TINT */}

              <div className="absolute inset-0 bg-orange-500/0 transition-all duration-700 group-hover:bg-orange-500/[0.045]" />

              {/* TOP ACCENT */}

              <div className="absolute left-0 top-0 h-[3px] w-full bg-orange-500" />

              {/* PROJECT LABEL */}

              <div className="absolute left-7 top-7 flex items-center gap-3 sm:left-9 sm:top-9">

                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500">
                  Featured Project
                </span>

                <span className="h-px w-10 bg-white/30 transition-all duration-500 group-hover:w-16 group-hover:bg-orange-500" />

              </div>

              {/* ARROW */}

              <div
                className="
                  absolute
                  right-7
                  top-7
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  border
                  border-white/25
                  bg-black/20
                  text-white
                  backdrop-blur-md
                  transition-all
                  duration-500
                  group-hover:border-orange-500
                  group-hover:bg-orange-500
                  group-hover:text-white
                  sm:right-9
                  sm:top-9
                "
              >

                <ArrowUpRight
                  size={21}
                  className="transition-transform duration-500 group-hover:rotate-45"
                />

              </div>

              {/* CONTENT */}

              <div className="absolute inset-x-0 bottom-0 p-7 sm:p-10">

                {/* CATEGORY */}

                <div className="mb-4 flex items-center gap-3">

                  <span className="h-2 w-2 bg-orange-500" />

                  <span className="text-xs font-black uppercase tracking-[0.16em] text-orange-400">
                    {projects[0].category}
                  </span>

                </div>

                {/* TITLE */}

                <h3 className="max-w-2xl text-3xl font-black uppercase leading-[0.95] tracking-[-0.025em] text-white transition-transform duration-500 group-hover:translate-x-1 sm:text-4xl lg:text-5xl">
                  {projects[0].title}
                </h3>

                {/* LOCATION */}

                <div className="mt-7 flex items-center gap-2 border-t border-white/15 pt-5">

                  <MapPin
                    size={15}
                    className="text-orange-500"
                  />

                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
                    {projects[0].location}
                  </span>

                </div>

              </div>

              {/* BOTTOM LINE */}

              <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-orange-500 transition-all duration-700 group-hover:w-full" />

            </Link>

          </Reveal>

          {/* ===================================================
              PROJECT 02
          =================================================== */}

          <Reveal
            delay={180}
            className="lg:col-span-5"
          >

            <Link
              href="#contact"
              className="
                group
                relative
                block
                min-h-[360px]
                overflow-hidden
                border
                border-white/10
                bg-[#151819]
                transition-all
                duration-500
                hover:border-orange-500/50
              "
            >

              <Image
                src={projects[1].image}
                alt={projects[1].title}
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="
                  object-cover
                  opacity-70
                  transition-all
                  duration-[1000ms]
                  ease-out
                  group-hover:scale-[1.07]
                  group-hover:opacity-90
                "
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10 transition-all duration-700 group-hover:via-black/40" />

              {/* CATEGORY MARKER */}

              <div className="absolute left-6 top-6 flex items-center gap-3">

                <span className="h-2 w-2 bg-orange-500 transition-transform duration-500 group-hover:scale-150" />

                <span className="text-[10px] font-black uppercase tracking-[0.16em] text-white/55">
                  {projects[1].category}
                </span>

              </div>

              {/* ARROW */}

              <div
                className="
                  absolute
                  right-6
                  top-6
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  border
                  border-white/20
                  bg-black/30
                  text-white
                  backdrop-blur-md
                  transition-all
                  duration-500
                  group-hover:border-orange-500
                  group-hover:bg-orange-500
                "
              >

                <ArrowUpRight
                  size={19}
                  className="transition-transform duration-500 group-hover:rotate-45"
                />

              </div>

              {/* CONTENT */}

              <div className="absolute inset-x-0 bottom-0 p-7">

                <h3 className="max-w-md text-2xl font-black uppercase leading-tight text-white transition-transform duration-500 group-hover:translate-x-1 sm:text-3xl">
                  {projects[1].title}
                </h3>

                <div className="mt-4 flex items-center gap-2 text-xs font-medium text-white/50">

                  <MapPin
                    size={14}
                    className="text-orange-500"
                  />

                  {projects[1].location}

                </div>

              </div>

              {/* BOTTOM HOVER LINE */}

              <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-orange-500 transition-all duration-700 group-hover:w-full" />

            </Link>

          </Reveal>

          {/* ===================================================
              PROJECT 03
          =================================================== */}

          <Reveal
            delay={260}
            className="lg:col-span-5"
          >

            <Link
              href="#contact"
              className="
                group
                relative
                block
                min-h-[360px]
                overflow-hidden
                border
                border-white/10
                bg-[#151819]
                transition-all
                duration-500
                hover:border-orange-500/50
              "
            >

              <Image
                src={projects[2].image}
                alt={projects[2].title}
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="
                  object-cover
                  opacity-70
                  transition-all
                  duration-[1000ms]
                  ease-out
                  group-hover:scale-[1.07]
                  group-hover:opacity-90
                "
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10 transition-all duration-700 group-hover:via-black/40" />

              {/* CATEGORY */}

              <div className="absolute left-6 top-6 flex items-center gap-3">

                <span className="h-2 w-2 bg-orange-500 transition-transform duration-500 group-hover:scale-150" />

                <span className="text-[10px] font-black uppercase tracking-[0.16em] text-white/55">
                  {projects[2].category}
                </span>

              </div>

              {/* ARROW */}

              <div
                className="
                  absolute
                  right-6
                  top-6
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  border
                  border-white/20
                  bg-black/30
                  text-white
                  backdrop-blur-md
                  transition-all
                  duration-500
                  group-hover:border-orange-500
                  group-hover:bg-orange-500
                "
              >

                <ArrowUpRight
                  size={19}
                  className="transition-transform duration-500 group-hover:rotate-45"
                />

              </div>

              {/* CONTENT */}

              <div className="absolute inset-x-0 bottom-0 p-7">

                <h3 className="max-w-md text-2xl font-black uppercase leading-tight text-white transition-transform duration-500 group-hover:translate-x-1 sm:text-3xl">
                  {projects[2].title}
                </h3>

                <div className="mt-4 flex items-center gap-2 text-xs font-medium text-white/50">

                  <MapPin
                    size={14}
                    className="text-orange-500"
                  />

                  {projects[2].location}

                </div>

              </div>

              {/* BOTTOM LINE */}

              <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-orange-500 transition-all duration-700 group-hover:w-full" />

            </Link>

          </Reveal>

          {/* ===================================================
              PROJECT 04 — WIDE
          =================================================== */}

          <Reveal
            delay={340}
            className="lg:col-span-7"
          >

            <Link
              href="#contact"
              className="
                group
                relative
                block
                min-h-[430px]
                overflow-hidden
                border
                border-white/10
                bg-black
                transition-all
                duration-500
                hover:border-orange-500/50
              "
            >

              <Image
                src={projects[3].image}
                alt={projects[3].title}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="
                  object-cover
                  transition-transform
                  duration-[1200ms]
                  ease-out
                  group-hover:scale-[1.07]
                "
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/5 transition-all duration-700 group-hover:via-black/35" />

              {/* CATEGORY */}

              <div className="absolute left-7 top-7 flex items-center gap-3">

                <span className="h-2 w-2 bg-orange-500" />

                <span className="text-xs font-black uppercase tracking-[0.16em] text-orange-400">
                  {projects[3].category}
                </span>

              </div>

              {/* ARROW */}

              <div
                className="
                  absolute
                  right-7
                  top-7
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  border
                  border-white/20
                  bg-black/30
                  text-white
                  backdrop-blur-md
                  transition-all
                  duration-500
                  group-hover:border-orange-500
                  group-hover:bg-orange-500
                "
              >

                <ArrowUpRight
                  size={19}
                  className="transition-transform duration-500 group-hover:rotate-45"
                />

              </div>

              {/* CONTENT */}

              <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">

                <h3 className="text-3xl font-black uppercase leading-none tracking-tight text-white transition-transform duration-500 group-hover:translate-x-1 sm:text-4xl">
                  {projects[3].title}
                </h3>

                <div className="mt-5 flex items-center gap-2 text-xs font-medium text-white/50">

                  <MapPin
                    size={14}
                    className="text-orange-500"
                  />

                  {projects[3].location}

                </div>

              </div>

              {/* ORANGE BOTTOM LINE */}

              <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-orange-500 transition-all duration-700 group-hover:w-full" />

            </Link>

          </Reveal>

        </div>

        {/* =====================================================
            BOTTOM PROJECT BAR
        ===================================================== */}

        <Reveal delay={420}>

          <div className="mt-12 flex flex-col gap-6 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">

            {/* LEFT */}

            <div className="flex items-center gap-3">

              <span className="h-2 w-2 bg-orange-500" />

              <p className="text-xs font-bold uppercase tracking-[0.12em] text-white/45">
                Every project. One standard: quality.
              </p>

            </div>

            {/* RIGHT */}

            <Link
              href="#contact"
              className="
                group
                inline-flex
                items-center
                gap-3
                text-xs
                font-black
                uppercase
                tracking-[0.12em]
                text-white
                transition-colors
                duration-300
                hover:text-orange-500
              "
            >

              Discuss Your Project

              <ArrowRight
                size={17}
                className="
                  text-orange-500
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />

            </Link>

          </div>

        </Reveal>

      </div>
    </section>
  );
}