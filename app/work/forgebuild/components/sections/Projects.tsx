import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";

const projects = [
  {
    title: "Riverside Office Complex",
    category: "Commercial Construction",
    location: "Davao City",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=85",
  },
  {
    title: "Oakwood Residence",
    category: "Residential Construction",
    location: "Davao City",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Harbor View Development",
    category: "Commercial Development",
    location: "Davao City",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Westfield Renovation",
    category: "Renovation & Remodeling",
    location: "Davao City",
    image:
      "https://images.unsplash.com/photo-1504615755583-2916b52192a3?auto=format&fit=crop&w=1800&q=85",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-[#0b0d0e] text-white"
    >
      {/* =====================================================
          BACKGROUND DETAILS
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-px w-full bg-white/10" />

        <div className="absolute -right-40 top-40 h-[500px] w-[500px] rounded-full bg-orange-500/[0.04] blur-3xl" />

        <div className="absolute -left-40 bottom-20 h-[400px] w-[400px] rounded-full bg-orange-500/[0.03] blur-3xl" />
      </div>

      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="grid gap-10 lg:grid-cols-[1fr_0.75fr] lg:items-end">

          {/* Left */}

          <div>
            {/* Eyebrow */}

            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-orange-500" />

              <span className="text-xs font-black uppercase tracking-[0.2em] text-orange-500">
                Selected Work
              </span>
            </div>

            {/* Heading */}

            <h2 className="max-w-3xl text-5xl font-black uppercase leading-[0.88] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl">
              Projects That
              <br />
              <span className="text-orange-500">
                Speak For Us.
              </span>
            </h2>
          </div>

          {/* Right */}

          <div className="lg:justify-self-end">
            <p className="max-w-lg text-base leading-8 text-white/55 sm:text-lg">
              From commercial developments to custom
              residences, every ForgeBuild project is
              built around quality, precision, and
              lasting value.
            </p>

            <div className="mt-7 flex items-center gap-3">
              <div className="h-2 w-2 bg-orange-500" />

              <span className="text-xs font-bold uppercase tracking-[0.16em] text-white/40">
                Built with purpose
              </span>
            </div>
          </div>
        </div>

        {/* =====================================================
            PROJECT GRID
        ===================================================== */}

        <div className="mt-16 grid gap-px bg-white/10 lg:grid-cols-12">

          {/* ===================================================
              PROJECT 01 — FEATURED
          =================================================== */}

          <Link
            href="#contact"
            className="group relative min-h-[560px] overflow-hidden bg-black lg:col-span-7"
          >
            {/* Image */}

            <Image
              src={projects[0].image}
              alt={projects[0].title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            />

            {/* Dark overlay */}

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/5" />

            {/* Hover orange glow */}

            <div className="absolute inset-0 bg-orange-500/0 transition-all duration-700 group-hover:bg-orange-500/[0.04]" />

            {/* Top orange line */}

            <div className="absolute left-0 top-0 h-1 w-full bg-orange-500" />

            {/* Number */}

            <div className="absolute left-7 top-7 flex items-center gap-3">
              <span className="text-xs font-black tracking-[0.15em] text-orange-500">
                01
              </span>

              <span className="h-px w-8 bg-white/30" />

              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/45">
                Featured Project
              </span>
            </div>

            {/* Arrow */}

            <div className="absolute right-7 top-7 flex h-12 w-12 items-center justify-center border border-white/25 bg-black/20 text-white backdrop-blur-md transition-all duration-300 group-hover:border-orange-500 group-hover:bg-orange-500">
              <ArrowUpRight
                size={21}
                className="transition-transform duration-300 group-hover:rotate-45"
              />
            </div>

            {/* Content */}

            <div className="absolute inset-x-0 bottom-0 p-7 sm:p-10">

              {/* Category */}

              <div className="mb-4 flex items-center gap-3">
                <span className="h-2 w-2 bg-orange-500" />

                <span className="text-xs font-black uppercase tracking-[0.16em] text-orange-400">
                  {projects[0].category}
                </span>
              </div>

              {/* Title */}

              <h3 className="max-w-2xl text-3xl font-black uppercase leading-[0.95] tracking-[-0.025em] text-white sm:text-4xl lg:text-5xl">
                {projects[0].title}
              </h3>

              {/* Location */}

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
          </Link>

          {/* ===================================================
              PROJECT 02
          =================================================== */}

          <Link
            href="#contact"
            className="group relative min-h-[360px] overflow-hidden bg-[#151819] lg:col-span-5"
          >
            <Image
              src={projects[1].image}
              alt={projects[1].title}
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover opacity-75 transition-all duration-700 group-hover:scale-105 group-hover:opacity-90"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />

            {/* Number */}

            <div className="absolute right-6 top-6 text-7xl font-black leading-none text-white/[0.07]">
              02
            </div>

            {/* Arrow */}

            <div className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center border border-white/20 bg-black/30 text-white backdrop-blur-md transition-all duration-300 group-hover:border-orange-500 group-hover:bg-orange-500">
              <ArrowUpRight
                size={19}
                className="transition-transform duration-300 group-hover:rotate-45"
              />
            </div>

            {/* Content */}

            <div className="absolute inset-x-0 bottom-0 p-7">

              <div className="mb-3 flex items-center gap-3">
                <span className="h-2 w-2 bg-orange-500" />

                <span className="text-[10px] font-black uppercase tracking-[0.16em] text-orange-400">
                  {projects[1].category}
                </span>
              </div>

              <h3 className="max-w-md text-2xl font-black uppercase leading-tight text-white sm:text-3xl">
                {projects[1].title}
              </h3>

              <div className="mt-4 flex items-center gap-2 text-xs font-medium text-white/50">
                <MapPin size={14} className="text-orange-500" />

                {projects[1].location}
              </div>
            </div>
          </Link>

          {/* ===================================================
              PROJECT 03
          =================================================== */}

          <Link
            href="#contact"
            className="group relative min-h-[360px] overflow-hidden bg-[#151819] lg:col-span-5"
          >
            <Image
              src={projects[2].image}
              alt={projects[2].title}
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover opacity-75 transition-all duration-700 group-hover:scale-105 group-hover:opacity-90"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />

            {/* Number */}

            <div className="absolute right-6 top-6 text-7xl font-black leading-none text-white/[0.07]">
              03
            </div>

            {/* Arrow */}

            <div className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center border border-white/20 bg-black/30 text-white backdrop-blur-md transition-all duration-300 group-hover:border-orange-500 group-hover:bg-orange-500">
              <ArrowUpRight
                size={19}
                className="transition-transform duration-300 group-hover:rotate-45"
              />
            </div>

            {/* Content */}

            <div className="absolute inset-x-0 bottom-0 p-7">

              <div className="mb-3 flex items-center gap-3">
                <span className="h-2 w-2 bg-orange-500" />

                <span className="text-[10px] font-black uppercase tracking-[0.16em] text-orange-400">
                  {projects[2].category}
                </span>
              </div>

              <h3 className="max-w-md text-2xl font-black uppercase leading-tight text-white sm:text-3xl">
                {projects[2].title}
              </h3>

              <div className="mt-4 flex items-center gap-2 text-xs font-medium text-white/50">
                <MapPin size={14} className="text-orange-500" />

                {projects[2].location}
              </div>
            </div>
          </Link>

          {/* ===================================================
              PROJECT 04 — WIDE
          =================================================== */}

          <Link
            href="#contact"
            className="group relative min-h-[430px] overflow-hidden bg-black lg:col-span-7"
          >
            <Image
              src={projects[3].image}
              alt={projects[3].title}
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/5" />

            {/* Number */}

            <div className="absolute left-7 top-7 text-7xl font-black leading-none text-white/[0.07]">
              04
            </div>

            {/* Orange line */}

            <div className="absolute bottom-0 left-0 h-1 w-0 bg-orange-500 transition-all duration-500 group-hover:w-full" />

            {/* Arrow */}

            <div className="absolute right-7 top-7 flex h-11 w-11 items-center justify-center border border-white/20 bg-black/30 text-white backdrop-blur-md transition-all duration-300 group-hover:border-orange-500 group-hover:bg-orange-500">
              <ArrowUpRight
                size={19}
                className="transition-transform duration-300 group-hover:rotate-45"
              />
            </div>

            {/* Content */}

            <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">

              <div className="mb-3 flex items-center gap-3">
                <span className="h-2 w-2 bg-orange-500" />

                <span className="text-xs font-black uppercase tracking-[0.16em] text-orange-400">
                  {projects[3].category}
                </span>
              </div>

              <h3 className="text-3xl font-black uppercase leading-none tracking-tight text-white sm:text-4xl">
                {projects[3].title}
              </h3>

              <div className="mt-5 flex items-center gap-2 text-xs font-medium text-white/50">
                <MapPin size={14} className="text-orange-500" />

                {projects[3].location}
              </div>
            </div>
          </Link>
        </div>

        {/* =====================================================
            BOTTOM PROJECT BAR
        ===================================================== */}

        <div className="mt-10 flex flex-col gap-6 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">

          {/* Left */}

          <div className="flex items-center gap-3">
            <span className="h-2 w-2 bg-orange-500" />

            <p className="text-xs font-bold uppercase tracking-[0.12em] text-white/45">
              Every project. One standard: quality.
            </p>
          </div>

          {/* Right */}

          <Link
            href="#contact"
            className="group inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.12em] text-white transition-colors hover:text-orange-500"
          >
            Discuss Your Project

            <ArrowUpRight
              size={17}
              className="text-orange-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}