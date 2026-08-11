export default function Experience() {
  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-[#171410] py-24 text-[#F4EFE6] sm:py-28 lg:py-36"
    >
      {/* =====================================================
          BACKGROUND DETAILS
      ===================================================== */}
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[30rem] w-[30rem] rounded-full border border-white/5" />

      <div className="pointer-events-none absolute right-20 top-20 h-32 w-32 rounded-full bg-[#C9A15A]/[0.035]" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">

        {/* =====================================================
            HEADER
        ===================================================== */}
        <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-end">

          <div>
            {/* EYEBROW */}
            <div className="mb-7 flex items-center gap-4">
              <span className="h-px w-10 bg-[#E0BF7A]" />

              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#E0BF7A]">
                The Experience
              </p>
            </div>

            {/* HEADING */}
            <h2 className="font-serif text-5xl leading-[0.94] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              More than
              <br />

              <span className="italic text-[#E0BF7A]">
                a meal.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-white/55 sm:text-base sm:leading-8 lg:pb-2">
            From the first welcome to the final course, every detail at Luna
            Bistro is thoughtfully considered to create an evening worth
            remembering.
          </p>

        </div>

        {/* =====================================================
            FEATURE IMAGE
        ===================================================== */}
        <div className="group relative mt-16 overflow-hidden">

          <div className="relative min-h-[430px] overflow-hidden sm:min-h-[520px] lg:min-h-[600px]">

            <img
              src="/images/hero/luna-hero.jpg"
              alt="Luna Bistro dining experience"
              className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-[1200ms] group-hover:scale-105"
            />

            {/* IMAGE OVERLAY */}
            <div className="absolute inset-0 bg-black/35" />

            <div className="absolute inset-0 bg-gradient-to-t from-[#171410]/90 via-black/20 to-black/10" />

            {/* =================================================
                CENTER MESSAGE
            ================================================= */}
            <div className="absolute inset-0 flex items-center justify-center px-6 text-center">

              <div className="max-w-3xl">

                <p className="text-[9px] font-bold uppercase tracking-[0.35em] text-[#E0BF7A]">
                  An Evening At Luna
                </p>

                <h3 className="mt-5 font-serif text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
                  Come for the food.
                  <br />

                  <span className="italic text-[#E0BF7A]">
                    Stay for the moment.
                  </span>
                </h3>

              </div>

            </div>

            {/* CORNER FRAME */}
            <div className="absolute left-5 top-5 h-12 w-12 border-l border-t border-[#E0BF7A]/60 sm:left-8 sm:top-8" />

            <div className="absolute bottom-5 right-5 h-12 w-12 border-b border-r border-[#E0BF7A]/60 sm:bottom-8 sm:right-8" />

            {/* IMAGE LABEL */}
            <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8">

              <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-white/60">
                Luna Bistro · Since 2018
              </p>

            </div>

          </div>
        </div>

        {/* =====================================================
            EXPERIENCE DETAILS
        ===================================================== */}
        <div className="mt-10 grid border-y border-white/10 md:grid-cols-3">

          {/* 01 */}
          <div className="border-b border-white/10 px-2 py-9 md:border-b-0 md:border-r md:px-8 md:py-10">

            <span className="font-serif text-4xl italic text-[#E0BF7A]/50">
              01
            </span>

            <h3 className="mt-5 font-serif text-2xl">
              Thoughtful Cuisine
            </h3>

            <p className="mt-4 text-sm leading-7 text-white/45">
              Seasonal ingredients, carefully selected and transformed into
              dishes that balance simplicity with refinement.
            </p>

          </div>

          {/* 02 */}
          <div className="border-b border-white/10 px-2 py-9 md:border-b-0 md:border-r md:px-8 md:py-10">

            <span className="font-serif text-4xl italic text-[#E0BF7A]/50">
              02
            </span>

            <h3 className="mt-5 font-serif text-2xl">
              Warm Hospitality
            </h3>

            <p className="mt-4 text-sm leading-7 text-white/45">
              Genuine service, attentive without being intrusive, creating a
              dining experience that feels personal from start to finish.
            </p>

          </div>

          {/* 03 */}
          <div className="px-2 py-9 md:px-8 md:py-10">

            <span className="font-serif text-4xl italic text-[#E0BF7A]/50">
              03
            </span>

            <h3 className="mt-5 font-serif text-2xl">
              Lasting Moments
            </h3>

            <p className="mt-4 text-sm leading-7 text-white/45">
              An atmosphere made for conversations, celebrations, quiet
              dinners, and the moments you'll want to remember.
            </p>

          </div>

        </div>

        {/* =====================================================
            BOTTOM CTA
        ===================================================== */}
        <div className="mt-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">

          <div>

            <p className="font-serif text-xl italic text-white/80">
              Your table is waiting.
            </p>

            <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.22em] text-white/30">
              Experience Luna Bistro
            </p>

          </div>

          <a
            href="#reservation"
            className="group inline-flex items-center gap-4 bg-[#E0BF7A] px-7 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#171410] transition-all duration-300 hover:bg-[#C9A15A]"
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
    </section>
  );
}