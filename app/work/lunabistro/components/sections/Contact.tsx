export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#F4EFE6] py-24 text-[#171410] sm:py-28 lg:py-36"
    >
      {/* =====================================================
          BACKGROUND DECORATION
      ===================================================== */}

      <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full border border-[#C9A15A]/15" />

      <div className="pointer-events-none absolute right-20 top-20 h-24 w-24 rounded-full bg-[#34382D]/[0.025]" />

      <div className="pointer-events-none absolute -left-40 top-1/2 h-80 w-80 rounded-full border border-[#34382D]/[0.06]" />

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="grid gap-10 lg:grid-cols-[1fr_0.7fr] lg:items-end">

          <div>

            {/* EYEBROW */}

            <div className="mb-7 flex items-center gap-4">

              <span className="h-px w-10 bg-[#C9A15A]" />

              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#34382D]">
                Visit Luna
              </p>

            </div>

            {/* HEADING */}

            <h2 className="font-serif text-5xl leading-[0.94] tracking-[-0.04em] sm:text-6xl lg:text-7xl">

              Come find
              <br />

              <span className="italic text-[#34382D]">
                your moment.
              </span>

            </h2>

          </div>

          <p className="max-w-md text-sm leading-7 text-[#171410]/55 sm:text-base sm:leading-8 lg:pb-2">
            Step inside Luna Bistro for thoughtful cuisine, intimate
            surroundings, and evenings designed to be remembered.
          </p>

        </div>

        {/* =====================================================
            MAIN CONTACT GRID
        ===================================================== */}

        <div className="mt-16 grid border-y border-[#171410]/10 lg:grid-cols-[1fr_0.75fr]">

          {/* =================================================
              LOCATION / CONTACT DETAILS
          ================================================= */}

          <div className="py-12 lg:pr-16 lg:py-14">

            {/* ADDRESS */}

            <div className="border-b border-[#171410]/10 pb-10">

              <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#9B7637]">
                Address
              </p>

              <h3 className="mt-5 font-serif text-3xl leading-tight sm:text-4xl">

                28 Mercer Street
                <br />

                <span className="italic text-[#34382D]">
                  New York, NY 10013
                </span>

              </h3>

              <a
                href="https://www.google.com/maps/search/?api=1&query=28%20Mercer%20Street%2C%20New%20York%2C%20NY%2010013"
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-6 inline-flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.22em] text-[#34382D] transition-colors duration-300 hover:text-[#9B7637]"
              >

                <span className="border-b border-[#34382D]/30 pb-2 group-hover:border-[#9B7637]">
                  Get Directions
                </span>

                <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>

              </a>

            </div>

            {/* CONTACT DETAILS */}

            <div className="grid gap-10 py-10 sm:grid-cols-2">

              {/* PHONE */}

              <div>

                <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#9B7637]">
                  Reservations
                </p>

                <a
                  href="tel:+12125550188"
                  className="mt-4 block font-serif text-2xl text-[#171410] transition-colors hover:text-[#9B7637]"
                >
                  +1 212 555 0188
                </a>

                <p className="mt-2 text-xs text-[#171410]/45">
                  Daily from 10:00 AM
                </p>

              </div>

              {/* EMAIL */}

              <div>

                <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#9B7637]">
                  Email
                </p>

                <a
                  href="mailto:hello@lunabistro.com"
                  className="mt-4 block break-all font-serif text-xl text-[#171410] transition-colors hover:text-[#9B7637]"
                >
                  hello@lunabistro.com
                </a>

                <p className="mt-2 text-xs text-[#171410]/45">
                  We would love to hear from you.
                </p>

              </div>

            </div>

            {/* SOCIAL */}

            <div className="border-t border-[#171410]/10 pt-8">

              <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#9B7637]">
                Follow Luna
              </p>

              <div className="mt-5 flex gap-6">

                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#171410]/60 transition-colors hover:text-[#9B7637]"
                >
                  Instagram
                </a>

                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#171410]/60 transition-colors hover:text-[#9B7637]"
                >
                  Facebook
                </a>

              </div>

            </div>

          </div>

          {/* =================================================
              HOURS CARD
          ================================================= */}

          <div className="border-t border-[#171410]/10 bg-[#34382D] p-8 text-[#F4EFE6] sm:p-10 lg:border-l lg:border-t-0 lg:p-14">

            <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#E0BF7A]">
              Opening Hours
            </p>

            <h3 className="mt-6 font-serif text-3xl leading-tight sm:text-4xl">

              Join us for
              <br />

              <span className="italic text-[#E0BF7A]">
                dinner.
              </span>

            </h3>

            <div className="mt-10 space-y-5">

              {/* MONDAY - THURSDAY */}

              <div className="flex items-center justify-between gap-6 border-b border-white/10 pb-5">

                <div>

                  <p className="text-sm text-white/75">
                    Monday — Thursday
                  </p>

                  <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-white/30">
                    Dinner Service
                  </p>

                </div>

                <p className="text-sm text-[#E0BF7A]">
                  5:30 — 10:00
                </p>

              </div>

              {/* FRIDAY - SATURDAY */}

              <div className="flex items-center justify-between gap-6 border-b border-white/10 pb-5">

                <div>

                  <p className="text-sm text-white/75">
                    Friday — Saturday
                  </p>

                  <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-white/30">
                    Dinner Service
                  </p>

                </div>

                <p className="text-sm text-[#E0BF7A]">
                  5:30 — 11:00
                </p>

              </div>

              {/* SUNDAY */}

              <div className="flex items-center justify-between gap-6">

                <div>

                  <p className="text-sm text-white/75">
                    Sunday
                  </p>

                  <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-white/30">
                    Restaurant Closed
                  </p>

                </div>

                <p className="text-sm text-white/35">
                  Closed
                </p>

              </div>

            </div>

            {/* DIVIDER */}

            <div className="my-10 h-px bg-white/10" />

            {/* RESERVATION CTA */}

            <p className="text-sm leading-7 text-white/40">
              Planning a special evening? Our team would be delighted to help
              make it memorable.
            </p>

            <a
              href="#reservation"
              className="group mt-7 inline-flex items-center gap-4 bg-[#E0BF7A] px-7 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#171410] transition-all duration-300 hover:bg-[#C9A15A]"
            >

              <span>
                Reserve a Table
              </span>

              <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>

            </a>

          </div>

        </div>

        {/* =====================================================
            BOTTOM STATEMENT
        ===================================================== */}

        <div className="mt-12 flex flex-col justify-between gap-5 border-t border-[#171410]/10 pt-8 sm:flex-row sm:items-center">

          <p className="font-serif text-xl italic text-[#171410]/70">
            Until we meet at Luna.
          </p>

          <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-[#171410]/30">
            Contemporary Dining · Seasonal Cuisine
          </p>

        </div>

      </div>

    </section>
  );
}