export default function Story() {
  return (
    <section
      id="story"
      className="relative overflow-hidden bg-[#F4EFE6] py-24 sm:py-28 lg:py-32"
    >
      {/* =====================================================
          DECORATIVE BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute -left-32 top-20 h-64 w-64 rounded-full border border-[#C9A15A]/[0.06]" />

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-16 px-6 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-24 lg:px-10">
        {/* =================================================
            IMAGE
        ================================================= */}

        <div className="relative">
          {/* IMAGE CONTAINER */}

          <div className="relative aspect-[4/5] overflow-hidden bg-[#171410]">
            <img
              src="/images/luna/luna-story.jpg"
              alt="Elegant Luna Bistro dining room"
              className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
            />

            {/* IMAGE OVERLAY */}

            <div className="absolute inset-0 bg-black/10" />

            {/* BOTTOM CINEMATIC GRADIENT */}

            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
          </div>

          {/* =================================================
              IMAGE LABEL
          ================================================= */}

          <div className="absolute bottom-5 left-5 bg-[#0B0A08]/90 px-5 py-4 backdrop-blur-sm sm:bottom-7 sm:left-7">
            <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#C9A15A]">
              Est. 2018
            </p>

            <p className="mt-1 font-serif text-sm text-[#F4EFE6]">
              Luna Bistro
            </p>
          </div>
        </div>

        {/* =================================================
            CONTENT
        ================================================= */}

        <div className="max-w-xl">
          {/* EYEBROW */}

          <div className="mb-7 flex items-center gap-4">
            <span className="h-px w-10 bg-[#C9A15A]" />

            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#9B7637]">
              Our Story
            </p>
          </div>

          {/* HEADING */}

          <h2 className="font-serif text-5xl leading-[0.95] tracking-[-0.04em] text-[#171410] sm:text-6xl lg:text-7xl">
            A table is where
            <br />
            <span className="italic text-[#9B7637]">
              moments begin.
            </span>
          </h2>

          {/* DIVIDER */}

          <div className="my-8 h-px w-full bg-[#171410]/10" />

          {/* STORY COPY */}

          <div className="space-y-5 text-[15px] leading-8 text-[#171410]/65 sm:text-base">
            <p>
              Luna Bistro was created around a simple idea: that exceptional
              food should feel personal, memorable, and worth sharing.
            </p>

            <p>
              From carefully selected ingredients to thoughtful presentation,
              every detail is designed to bring people together around the
              table.
            </p>
          </div>

          {/* =================================================
              PHILOSOPHY / YEARS
          ================================================= */}

          <div className="mt-10 flex items-end justify-between border-t border-[#171410]/10 pt-7">
            <div>
              <p className="font-serif text-xl italic text-[#171410]">
                Crafted with intention.
              </p>

              <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.24em] text-[#171410]/45">
                The Luna Bistro Philosophy
              </p>
            </div>

            <div className="hidden text-right sm:block">
              <p className="font-serif text-4xl text-[#C9A15A]">
                08
              </p>

              <p className="mt-1 text-[8px] font-bold uppercase tracking-[0.2em] text-[#171410]/40">
                Years of Dining
              </p>
            </div>
          </div>

          {/* =================================================
              CTA
          ================================================= */}

          <div className="mt-9">
            <a
              href="#menu"
              className="group inline-flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#171410] transition-colors duration-300 hover:text-[#9B7637]"
            >
              <span className="border-b border-[#171410]/30 pb-2 transition-colors duration-300 group-hover:border-[#9B7637]">
                Explore Our Menu
              </span>

              <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}