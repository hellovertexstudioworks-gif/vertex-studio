export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#111719] py-28 sm:py-36"
    >
      {/* =====================================================
          DECORATIVE BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full border border-[#4FA7A1]/10" />

      <div className="pointer-events-none absolute -left-32 bottom-20 h-72 w-72 rounded-full border border-white/[0.04]" />

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-24 lg:px-10">

        {/* =================================================
            IMAGE
        ================================================= */}

        <div className="relative">

          <div className="relative aspect-[4/5] overflow-hidden bg-[#1A2223]">

            <img
              src="/images/realestate/about-realestate.jpg"
              alt="Modern luxury home interior"
              className="h-full w-full object-cover transition-transform duration-1000 hover:scale-105"
            />

            {/* IMAGE OVERLAY */}

            <div className="absolute inset-0 bg-gradient-to-t from-[#071011]/60 via-transparent to-transparent" />

          </div>

          {/* =================================================
              EXPERIENCE BADGE
          ================================================= */}

          <div className="absolute -bottom-6 right-5 bg-[#1F5C5B] px-7 py-6 sm:right-7">

            <p className="font-serif text-5xl leading-none text-[#F2F3EF]">
              10
            </p>

            <p className="mt-2 text-[8px] font-bold uppercase tracking-[0.22em] text-[#B8D8D5]">
              Years of Experience
            </p>

          </div>

          {/* CORNER DETAIL */}

          <div className="absolute left-5 top-5 h-12 w-12 border-l border-t border-[#4FA7A1]/50 sm:left-7 sm:top-7" />

        </div>

        {/* =================================================
            CONTENT
        ================================================= */}

        <div className="max-w-xl">

          {/* EYEBROW */}

          <div className="mb-7 flex items-center gap-4">

            <span className="h-px w-10 bg-[#4FA7A1]" />

            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#4FA7A1]">
              About Horizon
            </p>

          </div>

          {/* HEADING */}

          <h2 className="font-serif text-5xl leading-[0.94] tracking-[-0.045em] text-[#F2F3EF] sm:text-6xl lg:text-7xl">

            More than a property.

            <br />

            <span className="italic text-[#4FA7A1]">
              A place to belong.
            </span>

          </h2>

          {/* DIVIDER */}

          <div className="my-8 h-px w-full bg-white/10" />

          {/* STORY */}

          <div className="space-y-5 text-sm leading-7 text-white/60 sm:text-base sm:leading-8">

            <p>
              Horizon Realty was built around a simple belief: finding a
              home should feel personal, thoughtful, and worth remembering.
            </p>

            <p>
              We connect people with exceptional properties while providing
              the clarity, expertise, and attention needed to make every
              move with confidence.
            </p>

          </div>

          {/* =================================================
              VALUES
          ================================================= */}

          <div className="mt-10 grid gap-6 border-t border-white/10 pt-7 sm:grid-cols-2">

            {/* VALUE 01 */}

            <div>

              <p className="font-serif text-3xl italic text-[#4FA7A1]/70">
                01
              </p>

              <h3 className="mt-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#F2F3EF]">
                Local Expertise
              </h3>

              <p className="mt-2 text-xs leading-6 text-white/45">
                Insightful guidance grounded in the markets and communities
                we know best.
              </p>

            </div>

            {/* VALUE 02 */}

            <div>

              <p className="font-serif text-3xl italic text-[#4FA7A1]/70">
                02
              </p>

              <h3 className="mt-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#F2F3EF]">
                Curated Properties
              </h3>

              <p className="mt-2 text-xs leading-6 text-white/45">
                A selective approach focused on quality, character, and
                long-term value.
              </p>

            </div>

          </div>

          {/* =================================================
              CTA
          ================================================= */}

          <div className="mt-9">

            <a
              href="#services"
              className="group inline-flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#F2F3EF] transition-colors duration-300 hover:text-[#4FA7A1]"
            >

              <span className="border-b border-white/20 pb-2 transition-colors duration-300 group-hover:border-[#4FA7A1]">
                Discover Horizon
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