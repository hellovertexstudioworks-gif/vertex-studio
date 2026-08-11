export default function Footer() {
  return (
    <footer
      id="footer"
      className="relative overflow-hidden bg-[#0B0A08] text-[#F4EFE6]"
    >
      {/* =====================================================
          BACKGROUND DETAILS
      ===================================================== */}

      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full border border-[#C9A15A]/10" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full border border-white/[0.04]" />

      <div className="pointer-events-none absolute right-24 top-24 h-20 w-20 rounded-full bg-[#C9A15A]/[0.035]" />

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">

        {/* =====================================================
            BRAND / CTA
        ===================================================== */}

        <div className="flex flex-col justify-between gap-10 border-b border-white/10 pb-14 lg:flex-row lg:items-end">

          {/* BRAND */}

          <div>

            {/* EYEBROW */}

            <div className="flex items-center gap-4">

              <span className="h-px w-10 bg-[#C9A15A]" />

              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#E0BF7A]">
                Contemporary Dining
              </p>

            </div>

            {/* LOGO */}

            <h2 className="mt-6 font-serif text-5xl leading-none tracking-[-0.04em] sm:text-6xl">
              Luna

              <span className="italic text-[#E0BF7A]">
                Bistro.
              </span>
            </h2>

            {/* DESCRIPTION */}

            <p className="mt-5 max-w-md text-sm leading-7 text-white/40">
              Thoughtful cuisine, warm hospitality, and an evening worth
              remembering.
            </p>

          </div>

          {/* CTA */}

          <a
            href="#reservation"
            className="group inline-flex h-14 items-center justify-center gap-4 bg-[#E0BF7A] px-8 text-[10px] font-bold uppercase tracking-[0.2em] text-[#171410] transition-all duration-300 hover:bg-[#C9A15A]"
          >
            <span>
              Reserve a Table
            </span>

            <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>

        </div>

        {/* =====================================================
            FOOTER GRID
        ===================================================== */}

        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-4">

          {/* =================================================
              EXPLORE
          ================================================= */}

          <div>

            <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#E0BF7A]">
              Explore
            </p>

            <nav className="mt-6 flex flex-col gap-4">

              <a
                href="#top"
                className="w-fit text-sm text-white/45 transition-colors hover:text-[#E0BF7A]"
              >
                Home
              </a>

              <a
                href="#story"
                className="w-fit text-sm text-white/45 transition-colors hover:text-[#E0BF7A]"
              >
                Our Story
              </a>

              <a
                href="#menu"
                className="w-fit text-sm text-white/45 transition-colors hover:text-[#E0BF7A]"
              >
                Menu
              </a>

              <a
                href="#experience"
                className="w-fit text-sm text-white/45 transition-colors hover:text-[#E0BF7A]"
              >
                Experience
              </a>

              <a
                href="#gallery"
                className="w-fit text-sm text-white/45 transition-colors hover:text-[#E0BF7A]"
              >
                Gallery
              </a>

              <a
                href="#contact"
                className="w-fit text-sm text-white/45 transition-colors hover:text-[#E0BF7A]"
              >
                Contact
              </a>

            </nav>

          </div>

          {/* =================================================
              VISIT
          ================================================= */}

          <div>

            <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#E0BF7A]">
              Visit Luna
            </p>

            <div className="mt-6">

              <p className="font-serif text-lg text-white/75">
                28 Mercer Street
              </p>

              <p className="mt-1 text-sm text-white/35">
                New York, NY 10013
              </p>

              <a
                href="#contact"
                className="mt-5 inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-[#E0BF7A] transition-colors hover:text-white"
              >
                <span>
                  Get Directions
                </span>

                <span>
                  →
                </span>
              </a>

            </div>

          </div>

          {/* =================================================
              OPENING HOURS
          ================================================= */}

          <div>

            <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#E0BF7A]">
              Opening Hours
            </p>

            <div className="mt-6 space-y-5">

              {/* MONDAY - THURSDAY */}

              <div>

                <p className="text-sm text-white/55">
                  Monday — Thursday
                </p>

                <p className="mt-1 text-xs text-white/30">
                  5:30 PM — 10:00 PM
                </p>

              </div>

              {/* FRIDAY - SATURDAY */}

              <div>

                <p className="text-sm text-white/55">
                  Friday — Saturday
                </p>

                <p className="mt-1 text-xs text-white/30">
                  5:30 PM — 11:00 PM
                </p>

              </div>

              {/* SUNDAY */}

              <div>

                <p className="text-sm text-white/55">
                  Sunday
                </p>

                <p className="mt-1 text-xs text-white/30">
                  Closed
                </p>

              </div>

            </div>

          </div>

          {/* =================================================
              CONTACT
          ================================================= */}

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
                className="block break-all text-sm text-white/40 transition-colors hover:text-[#E0BF7A]"
              >
                hello@lunabistro.com
              </a>

            </div>

            {/* SOCIAL */}

            <div className="mt-7 flex gap-5">

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/35 transition-colors hover:text-[#E0BF7A]"
              >
                Instagram
              </a>

              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/35 transition-colors hover:text-[#E0BF7A]"
              >
                Facebook
              </a>

            </div>

          </div>

        </div>

        {/* =====================================================
            FINAL DIVIDER
        ===================================================== */}

        <div className="h-px bg-white/10" />

        {/* =====================================================
            BOTTOM BAR
        ===================================================== */}

        <div className="flex flex-col justify-between gap-5 pt-7 sm:flex-row sm:items-center">

          {/* COPYRIGHT */}

          <p className="text-[8px] font-medium uppercase tracking-[0.22em] text-white/25">
            © 2026 Luna Bistro. All rights reserved.
          </p>

          {/* BACK TO TOP */}

          <div className="flex items-center">

            <a
              href="#top"
              className="group flex items-center gap-2 text-[8px] font-bold uppercase tracking-[0.2em] text-[#E0BF7A]"
            >
              <span>
                Back to Top
              </span>

              <span className="transition-transform duration-300 group-hover:-translate-y-1">
                ↑
              </span>
            </a>

          </div>

        </div>

      </div>

    </footer>
  );
}