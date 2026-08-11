export default function Gallery() {
  return (
    <section
      id="gallery"
      className="relative overflow-hidden bg-[#F4EFE6] py-24 sm:py-28 lg:py-32"
    >
      {/* =====================================================
          BACKGROUND DECORATION
      ===================================================== */}

      <div className="pointer-events-none absolute -left-40 bottom-20 h-80 w-80 rounded-full border border-[#34382D]/10" />

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            {/* EYEBROW */}

            <div className="mb-7 flex items-center gap-4">
              <span className="h-px w-10 bg-[#C9A15A]" />

              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#34382D]">
                A Glimpse Inside
              </p>
            </div>

            {/* HEADING */}

            <h2 className="font-serif text-5xl leading-[0.94] tracking-[-0.04em] text-[#171410] sm:text-6xl lg:text-7xl">
              Moments at
              <br />

              <span className="italic text-[#34382D]">
                Luna.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-[#171410]/55 sm:text-base sm:leading-8 lg:pb-2">
            From intimate dinners to unforgettable celebrations, discover the
            atmosphere, details, and moments that make Luna Bistro unique.
          </p>
        </div>

        {/* =====================================================
            GALLERY GRID
        ===================================================== */}

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
          {/* =================================================
              IMAGE 01 — DINING ROOM
          ================================================= */}

          <div className="group relative overflow-hidden sm:row-span-2 lg:col-span-7">
            <div className="relative min-h-[420px] h-full overflow-hidden sm:min-h-[620px]">
              <img
                src="/images/luna/luna-gallery-01.jpg"
                alt="Luna Bistro dining room"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

              {/* IMAGE LABEL */}

              <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8">
                <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/80">
                  The Dining Room
                </p>

                <p className="mt-2 font-serif text-xl italic text-[#E0BF7A]">
                  Where evenings begin.
                </p>
              </div>

              {/* CORNER DETAIL */}

              <div className="absolute left-5 top-5 h-10 w-10 border-l border-t border-[#E0BF7A]/50 sm:left-7 sm:top-7" />
            </div>
          </div>

          {/* =================================================
              IMAGE 02 — TABLE SETTING
          ================================================= */}

          <div className="group relative overflow-hidden lg:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src="/images/luna/luna-gallery-02.jpg"
                alt="Elegant fine dining table setting"
                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/0" />

              {/* NUMBER */}

              <div className="absolute right-5 top-5">
                <span className="font-serif text-4xl italic text-white/70">
                  02
                </span>
              </div>
            </div>
          </div>

          {/* =================================================
              IMAGE 03 — LUNA DETAIL
          ================================================= */}

          <div className="group relative overflow-hidden lg:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src="/images/luna/luna-gallery-03.jpg"
                alt="Luna Bistro interior detail"
                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/0" />

              {/* NUMBER */}

              <div className="absolute right-5 top-5">
                <span className="font-serif text-4xl italic text-white/70">
                  03
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            BOTTOM FEATURE ROW
        ===================================================== */}

        <div className="mt-12 flex flex-col justify-between gap-8 border-t border-[#171410]/10 pt-8 sm:flex-row sm:items-center">
          <div className="flex items-center gap-5">
            <span className="font-serif text-4xl italic text-[#C9A15A]/60">
              04
            </span>

            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#171410]/45">
                The Luna Collection
              </p>

              <p className="mt-2 font-serif text-lg italic text-[#171410]/75">
                Every detail matters.
              </p>
            </div>
          </div>

          <a
            href="#reservation"
            className="group inline-flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#34382D] transition-colors duration-300 hover:text-[#9B7637]"
          >
            <span className="border-b border-[#34382D]/30 pb-2 group-hover:border-[#9B7637]">
              Experience Luna
            </span>

            <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}