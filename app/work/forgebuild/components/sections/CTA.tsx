import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Phone,
  HardHat,
  CheckCircle2,
} from "lucide-react";

const points = [
  "New construction",
  "Renovation & remodeling",
  "Commercial development",
];

export default function CTA() {
  return (
    <section
      id="cta"
      className="relative overflow-hidden bg-orange-500"
    >
      {/* =====================================================
          DECORATIVE BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0">
        {/* Large circle */}
        <div className="absolute -right-48 -top-48 h-[620px] w-[620px] rounded-full border-[90px] border-black/[0.055] sm:-right-40 sm:-top-40 sm:h-[650px] sm:w-[650px] sm:border-[100px]" />

        {/* Small circle */}
        <div className="absolute -bottom-40 -left-40 h-[360px] w-[360px] rounded-full bg-black/[0.045] sm:-bottom-32 sm:-left-32 sm:h-[400px] sm:w-[400px]" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">

        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-14">

          {/* =================================================
              LEFT
          ================================================= */}

          <div>

            {/* Eyebrow */}

            <div className="mb-6 flex items-center gap-3 sm:mb-7">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-black text-orange-500">
                <HardHat
                  size={20}
                  strokeWidth={2}
                />
              </div>

              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black/70 sm:text-xs">
                Start Your Project
              </span>

            </div>

            {/* Heading */}

            <h2 className="max-w-4xl text-[3.15rem] font-black uppercase leading-[0.86] tracking-[-0.055em] text-black sm:text-6xl lg:text-8xl">
              Ready To Build
              <br />
              Something
              <br />

              <span className="text-white">
                Great?
              </span>
            </h2>

            {/* Description */}

            <p className="mt-7 max-w-xl text-[15px] font-medium leading-7 text-black/70 sm:mt-8 sm:text-lg sm:leading-8">
              Tell us about your project and our team
              will help turn your vision into a plan
              built for success.
            </p>

            {/* =================================================
                PROJECT TYPES
            ================================================= */}

            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">

              {points.map((point) => (
                <div
                  key={point}
                  className="flex items-center gap-2"
                >
                  <CheckCircle2
                    size={16}
                    strokeWidth={2.2}
                    className="shrink-0 text-black"
                  />

                  <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-black/65 sm:text-xs">
                    {point}
                  </span>
                </div>
              ))}

            </div>

            {/* =================================================
                BUTTONS
            ================================================= */}

            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4">

              <Link
                href="#contact"
                className="group flex w-full items-center justify-center gap-3 bg-black px-6 py-4 text-xs font-black uppercase tracking-wide text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#171a1b] sm:w-auto sm:px-7 sm:text-sm"
              >
                Request a Quote

                <ArrowRight
                  size={18}
                  strokeWidth={2.5}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <a
                href="tel:+639001234567"
                className="group flex w-full items-center justify-center gap-3 border-2 border-black/25 px-6 py-4 text-xs font-black uppercase tracking-wide text-black transition-all duration-300 hover:border-black hover:bg-black/5 sm:w-auto sm:px-7 sm:text-sm"
              >
                <Phone
                  size={17}
                  strokeWidth={2}
                />

                Call Our Team

                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>

            </div>

          </div>

          {/* =================================================
              RIGHT PANEL
          ================================================= */}

          <div className="relative">

            <div className="relative overflow-hidden bg-[#0d0f10] p-6 text-white sm:p-10 lg:p-11">

              {/* Orange accent */}

              <div className="absolute left-0 top-0 h-1 w-full bg-orange-500" />

              {/* Decorative number */}

              <div className="pointer-events-none absolute -right-3 -top-5 text-[120px] font-black leading-none tracking-[-0.08em] text-white/[0.035] sm:text-[150px]">
                01
              </div>

              {/* Content */}

              <div className="relative">

                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500 sm:text-xs">
                  Let's Talk
                </p>

                <h3 className="mt-5 max-w-md text-[2rem] font-black uppercase leading-[0.95] tracking-[-0.035em] sm:mt-6 sm:text-4xl">
                  Your Next Project
                  <br />
                  Starts Here.
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
                    className="shrink-0 text-orange-500 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-black"
                  />

                </Link>

              </div>
            </div>

            {/* Floating Label */}

            <div className="absolute -bottom-4 -left-4 hidden bg-black px-5 py-3 sm:block">
              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-white">
                Built For What's Next
              </span>
            </div>

          </div>

        </div>

        {/* =====================================================
            BOTTOM LINE
        ===================================================== */}

        <div className="mt-12 flex flex-col gap-4 border-t border-black/15 pt-6 sm:mt-16 sm:flex-row sm:items-center sm:justify-between sm:pt-7">

          <p className="text-[10px] font-black uppercase tracking-[0.15em] text-black/50 sm:text-xs">
            Quality. Trust. Results.
          </p>

          <div className="flex items-center gap-3">

            <span className="h-2 w-2 shrink-0 bg-black" />

            <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-black/60 sm:text-xs sm:tracking-[0.12em]">
              Let's build something that lasts.
            </span>

          </div>

        </div>

      </div>
    </section>
  );
}