import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  HardHat,
  ShieldCheck,
} from "lucide-react";

const trustItems = [
  {
    icon: ShieldCheck,
    label: "Quality Craftsmanship",
    description: "Built around your project",
  },
  {
    icon: HardHat,
    label: "Residential & Commercial",
    description: "Flexible solutions for any scale",
  },
  {
    icon: Building2,
    label: "Project-Focused Service",
    description: "Clear communication. On-time results.",
  },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#0b0d0e]"
    >
      {/* =========================================================
          BACKGROUND IMAGE
      ========================================================= */}

      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2200&q=85')",
        }}
      />

      {/* Overall image protection */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Balanced left-to-right readability gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/10" />

      {/* Subtle bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0b0d0e]/90 via-[#0b0d0e]/40 to-transparent" />

      {/* =========================================================
          HERO CONTENT
      ========================================================= */}

      <div className="relative mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-7xl items-center px-6 py-28 lg:px-8">
        <div className="w-full max-w-4xl">

          {/* Eyebrow */}

          <div className="mb-7 inline-flex items-center gap-3 border border-orange-500/50 bg-black/30 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-orange-400 backdrop-blur-md">
            <span className="h-2 w-2 bg-orange-500" />

            Construction & Remodeling
          </div>

          {/* Heading */}

          <h1 className="max-w-5xl text-5xl font-black uppercase leading-[0.9] tracking-[-0.045em] text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.45)] sm:text-7xl lg:text-[6.5rem]">
            Built for
            <br />
            the way
            <br />
            <span className="text-orange-500">
              you build.
            </span>
          </h1>

          {/* Description */}

          <p className="mt-8 max-w-2xl text-base leading-7 text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] sm:text-lg sm:leading-8">
            From new construction and commercial projects to
            renovations and remodeling, ForgeBuild delivers
            quality workmanship, clear communication, and
            dependable project execution from start to finish.
          </p>

          {/* Project Types */}

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-semibold text-white/85">
            <span className="inline-flex items-center gap-2">
              <CheckCircle2
                size={17}
                strokeWidth={2}
                className="text-orange-500"
              />
              Residential
            </span>

            <span className="inline-flex items-center gap-2">
              <CheckCircle2
                size={17}
                strokeWidth={2}
                className="text-orange-500"
              />
              Commercial
            </span>

            <span className="inline-flex items-center gap-2">
              <CheckCircle2
                size={17}
                strokeWidth={2}
                className="text-orange-500"
              />
              Renovation
            </span>
          </div>

          {/* Buttons */}

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link
              href="#contact"
              className="group inline-flex items-center justify-center gap-3 bg-orange-500 px-7 py-4 text-sm font-black uppercase tracking-wide text-white shadow-[0_15px_40px_rgba(249,115,22,0.25)] transition-all duration-300 hover:-translate-y-1 hover:bg-orange-600"
            >
              Get a Free Estimate

              <ArrowRight
                size={19}
                strokeWidth={2.5}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="#projects"
              className="inline-flex items-center justify-center border border-white/50 bg-black/20 px-7 py-4 text-sm font-black uppercase tracking-wide text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
            >
              Explore Our Work
            </Link>
          </div>

          {/* Trust microcopy */}

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium uppercase tracking-[0.12em] text-white/65">
            <span>Quality-focused</span>

            <span className="hidden h-1 w-1 bg-white/40 sm:block" />

            <span>Project-driven</span>

            <span className="hidden h-1 w-1 bg-white/40 sm:block" />

            <span>Client-focused</span>
          </div>
        </div>
      </div>

      {/* =========================================================
          TRUST BAR
      ========================================================= */}

      <div className="relative mx-auto -mt-10 w-full max-w-6xl px-6 pb-12 lg:px-8">
        <div className="grid overflow-hidden border border-white/15 bg-[#101314]/90 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:grid-cols-3">

          {trustItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className={`flex items-center gap-4 px-7 py-6 sm:px-8 ${
                  index !== trustItems.length - 1
                    ? "border-b border-white/10 sm:border-b-0 sm:border-r"
                    : ""
                }`}
              >
                {/* Icon */}

                <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-orange-500/40 bg-orange-500/10">
                  <Icon
                    size={23}
                    strokeWidth={1.8}
                    className="text-orange-500"
                  />
                </div>

                {/* Text */}

                <div>
                  <div className="text-sm font-bold uppercase tracking-[0.08em] text-white">
                    {item.label}
                  </div>

                  <div className="mt-1 text-xs text-white/50">
                    {item.description}
                  </div>
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}