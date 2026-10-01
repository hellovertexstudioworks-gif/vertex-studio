// TASK: Replace app/work/lunabistro/components/layout/Footer.tsx with this file.
// Final Luna footer: cinematic ending, oversized wordmark, subtle texture, and focused navigation.

"use client";

const textureUrl =
  "https://www.gdtours.com.tw/uploads/photos/shares/TMN062026A/TMN062026A_bg01.jpg";

export default function Footer() {
  return (
    <footer
      id="footer"
      className="relative overflow-hidden bg-[#0B0A08] text-[#F4EFE6]"
    >
      {/* =====================================================
          ATMOSPHERE
      ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.07]"
        style={{ backgroundImage: `url("${textureUrl}")` }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(201,161,90,0.10),transparent_30%),linear-gradient(180deg,rgba(11,10,8,0.72),rgba(11,10,8,0.98)_72%)]"
      />

      {/* Slow moon / light */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-20 h-[420px] w-[420px] rounded-full border border-[#E0BF7A]/[0.07] sm:-right-20 sm:h-[520px] sm:w-[520px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 top-44 h-64 w-64 rounded-full bg-[#C9A15A]/[0.025] blur-[90px]"
      />

      <div className="relative">
        {/* =====================================================
            CINEMATIC ENDING
        ===================================================== */}

        <div className="mx-auto max-w-[1440px] px-6 pb-16 pt-24 sm:px-10 sm:pb-20 sm:pt-28 lg:px-14 lg:pb-24 lg:pt-36 xl:px-16">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.45fr] lg:items-end">
            <div>
              <div className="mb-7 flex items-center gap-4">
                <span className="h-px w-12 bg-[#C9A15A]" />

                <p className="text-[9px] font-bold uppercase tracking-[0.32em] text-[#E0BF7A]">
                  Contemporary Dining
                </p>
              </div>

              <h2 className="max-w-5xl font-serif text-[clamp(4.5rem,10vw,10rem)] leading-[0.76] tracking-[-0.07em]">
                Luna
                <span className="italic text-[#E0BF7A]"> Bistro.</span>
              </h2>

              <p className="mt-8 max-w-md font-serif text-xl italic leading-8 text-white/45 sm:text-2xl">
                Stay a little longer.
              </p>
            </div>

            <div className="lg:pb-2">
              <p className="max-w-sm text-sm leading-7 text-white/40">
                Thoughtful cuisine, warm hospitality, and an evening worth
                remembering.
              </p>

              <a
                href="#reservation"
                className="group mt-7 inline-flex items-center gap-4 border-b border-[#E0BF7A]/40 pb-3 text-[9px] font-bold uppercase tracking-[0.22em] text-[#E0BF7A] transition-colors hover:border-white/40 hover:text-white"
              >
                <span>Reserve Your Table</span>

                <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>

          {/* =====================================================
              GIANT WORDMARK
          ===================================================== */}

          <div className="relative mt-20 overflow-hidden border-y border-white/10 py-8 sm:mt-24 sm:py-10 lg:mt-28">
            <p
              aria-hidden="true"
              className="select-none whitespace-nowrap font-serif text-[clamp(5.5rem,15vw,14rem)] leading-[0.68] tracking-[-0.075em] text-white/[0.025]"
            >
              LUNA
            </p>

            <div className="absolute inset-0 flex items-center justify-between gap-6">
              <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-white/20">
                New York
              </span>

              <span className="h-px flex-1 bg-white/10" />

              <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-white/20">
                Since 2018
              </span>
            </div>
          </div>

          {/* =====================================================
              NAVIGATION / DETAILS
          ===================================================== */}

          <div className="grid gap-12 border-b border-white/10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:py-16">
            {/* EXPLORE */}

            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#E0BF7A]">
                Explore
              </p>

              <nav className="mt-6 flex flex-col gap-4">
                <a
                  href="#top"
                  className="w-fit text-sm text-white/40 transition-colors hover:text-[#E0BF7A]"
                >
                  Home
                </a>

                <a
                  href="#story"
                  className="w-fit text-sm text-white/40 transition-colors hover:text-[#E0BF7A]"
                >
                  Our Story
                </a>

                <a
                  href="#menu"
                  className="w-fit text-sm text-white/40 transition-colors hover:text-[#E0BF7A]"
                >
                  Menu
                </a>

                <a
                  href="#experience"
                  className="w-fit text-sm text-white/40 transition-colors hover:text-[#E0BF7A]"
                >
                  Experience
                </a>

                <a
                  href="#gallery"
                  className="w-fit text-sm text-white/40 transition-colors hover:text-[#E0BF7A]"
                >
                  Gallery
                </a>

                <a
                  href="#contact"
                  className="w-fit text-sm text-white/40 transition-colors hover:text-[#E0BF7A]"
                >
                  Contact
                </a>
              </nav>
            </div>

            {/* VISIT */}

            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#E0BF7A]">
                Visit Luna
              </p>

              <div className="mt-6">
                <p className="font-serif text-lg text-white/75">
                  28 Mercer Street
                </p>

                <p className="mt-1 text-sm text-white/30">
                  New York, NY 10013
                </p>

                <a
                  href="#contact"
                  className="group mt-5 inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-[#E0BF7A]"
                >
                  <span className="border-b border-transparent pb-1 transition-colors group-hover:border-[#E0BF7A]">
                    Get Directions
                  </span>

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </div>

            {/* HOURS */}

            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#E0BF7A]">
                Opening Hours
              </p>

              <div className="mt-6 space-y-5">
                <div>
                  <p className="text-sm text-white/55">
                    Monday — Thursday
                  </p>

                  <p className="mt-1 text-xs text-white/25">
                    5:30 PM — 10:00 PM
                  </p>
                </div>

                <div>
                  <p className="text-sm text-white/55">
                    Friday — Saturday
                  </p>

                  <p className="mt-1 text-xs text-white/25">
                    5:30 PM — 11:00 PM
                  </p>
                </div>

                <div>
                  <p className="text-sm text-white/55">Sunday</p>

                  <p className="mt-1 text-xs text-white/25">Closed</p>
                </div>
              </div>
            </div>

            {/* CONTACT */}

            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#E0BF7A]">
                Contact
              </p>

              <div className="mt-6 space-y-4">
                <a
                  href="tel:+12125550188"
                  className="block font-serif text-lg text-white/70 transition-colors hover:text-[#E0BF7A]"
                >
                  +1 212 555 0188
                </a>

                <a
                  href="mailto:hello@lunabistro.com"
                  className="block break-all text-sm text-white/35 transition-colors hover:text-[#E0BF7A]"
                >
                  hello@lunabistro.com
                </a>
              </div>

              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3">
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/30 transition-colors hover:text-[#E0BF7A]"
                >
                  Instagram
                </a>

                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/30 transition-colors hover:text-[#E0BF7A]"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>

          {/* =====================================================
              BOTTOM BAR
          ===================================================== */}

          <div className="flex flex-col justify-between gap-5 pt-7 sm:flex-row sm:items-center">
            <p className="text-[8px] font-medium uppercase tracking-[0.22em] text-white/20">
              © 2026 Luna Bistro. All rights reserved.
            </p>

            <div className="flex items-center gap-7">
              <a
                href="#reservation"
                className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/25 transition-colors hover:text-[#E0BF7A]"
              >
                Reservations
              </a>

              <a
                href="#top"
                className="group flex items-center gap-2 text-[8px] font-bold uppercase tracking-[0.2em] text-[#E0BF7A]"
              >
                <span>Back to Top</span>

                <span className="transition-transform duration-300 group-hover:-translate-y-1">
                  ↑
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
