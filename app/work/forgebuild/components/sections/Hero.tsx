import Link from "next/link";
import {
  ArrowRight,
  Building2,
  HardHat,
  ShieldCheck,
} from "lucide-react";

const stats = [
  {
    icon: Building2,
    value: "20+",
    label: "Years Experience",
  },
  {
    icon: HardHat,
    value: "180+",
    label: "Projects Completed",
  },
  {
    icon: ShieldCheck,
    value: "98%",
    label: "Client Satisfaction",
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

      {/* Main dark overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Left readability gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#0b0d0e] via-[#0b0d0e]/60 to-transparent" />

      {/* =========================================================
          HERO CONTENT
      ========================================================= */}

      <div className="relative mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-7xl items-center px-6 py-24 lg:px-8">
        <div className="w-full max-w-3xl">

          {/* Eyebrow */}

          <div className="mb-7 inline-flex items-center gap-3 border border-orange-500/40 bg-black/30 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-orange-400 backdrop-blur-md">
            <span className="h-2 w-2 bg-orange-500" />

            Trusted Construction Partner
          </div>

          {/* Heading */}

          <h1 className="max-w-4xl text-6xl font-black uppercase leading-[0.9] tracking-[-0.04em] text-white sm:text-7xl lg:text-8xl">
            Building
            <br />
            What
            <br />
            <span className="text-orange-500">
              Matters.
            </span>
          </h1>

          {/* Description */}

          <p className="mt-8 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
            Quality construction. Reliable execution.
            <br className="hidden sm:block" />
            Built for the future.
          </p>

          {/* Buttons */}

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link
              href="#contact"
              className="group inline-flex items-center justify-center gap-3 bg-orange-500 px-7 py-4 text-sm font-black uppercase tracking-wide text-white shadow-[0_15px_40px_rgba(249,115,22,0.25)] transition-all duration-300 hover:-translate-y-1 hover:bg-orange-600"
            >
              Request a Quote

              <ArrowRight
                size={19}
                strokeWidth={2.5}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="#projects"
              className="inline-flex items-center justify-center border border-white/40 bg-white/5 px-7 py-4 text-sm font-black uppercase tracking-wide text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
            >
              View Our Projects
            </Link>
          </div>
        </div>
      </div>

      {/* =========================================================
          STATS BAR
      ========================================================= */}

      <div className="relative mx-auto -mt-10 w-full max-w-6xl px-6 pb-12 lg:px-8">
        <div className="grid overflow-hidden border border-white/10 bg-[#101314]/95 backdrop-blur-xl sm:grid-cols-3">

          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className={`flex items-center gap-5 px-7 py-7 sm:px-8 ${
                  index !== stats.length - 1
                    ? "border-b border-white/10 sm:border-b-0 sm:border-r"
                    : ""
                }`}
              >
                {/* Icon */}

                <div className="flex h-14 w-14 shrink-0 items-center justify-center border border-orange-500/30 bg-orange-500/10">
                  <Icon
                    size={26}
                    strokeWidth={1.8}
                    className="text-orange-500"
                  />
                </div>

                {/* Number + Label */}

                <div>
                  <div className="text-3xl font-black tracking-tight text-white">
                    {stat.value}
                  </div>

                  <div className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
                    {stat.label}
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