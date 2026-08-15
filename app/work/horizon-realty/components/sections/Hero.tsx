export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-[#111719]"
    >
      {/* =====================================================
          BACKGROUND IMAGE
      ===================================================== */}

      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/realestate/horizon-hero.jpg')",
        }}
      />

      {/* =====================================================
          CINEMATIC OVERLAYS
      ===================================================== */}

      {/* Overall dark overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Center overlay for typography */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#071011]/65 via-[#071011]/30 to-[#071011]/80" />

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-[#071011] via-[#071011]/55 to-transparent" />

      {/* =====================================================
          DECORATIVE CIRCLES
      ===================================================== */}

      <div className="pointer-events-none absolute -left-32 top-1/3 h-72 w-72 rounded-full border border-[#4FA7A1]/10" />

      <div className="pointer-events-none absolute -right-40 top-1/4 h-96 w-96 rounded-full border border-white/[0.06]" />

      {/* =====================================================
          HERO CONTENT
      ===================================================== */}

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-6 pb-32 pt-32 text-center sm:px-8 lg:px-10">

        <div className="max-w-5xl">

          {/* EYEBROW */}

          <div className="mb-8 flex items-center justify-center gap-4">

            <span className="h-px w-10 bg-[#4FA7A1]" />

            <p className="text-[9px] font-bold uppercase tracking-[0.32em] text-[#8BC7C2] sm:text-[10px]">
              Horizon Realty · Est. 2016
            </p>

            <span className="h-px w-10 bg-[#4FA7A1]" />

          </div>

          {/* MAIN HEADING */}

          <h1 className="font-serif text-[clamp(3.8rem,8vw,8rem)] leading-[0.84] tracking-[-0.055em] text-[#F2F3EF]">

            Find a place

            <br />

            <span className="italic text-[#7CC3BD]">
              worth coming
            </span>

            <br />

            <span className="italic text-[#7CC3BD]">
              home to.
            </span>

          </h1>

          {/* DESCRIPTION */}

          <p className="mx-auto mt-9 max-w-2xl text-sm leading-7 text-white/65 sm:text-base sm:leading-8">
            Exceptional properties, thoughtful service, and a better way to
            discover the place you'll call home.
          </p>

          {/* =================================================
              SEARCH PANEL
          ================================================= */}

          <div className="mx-auto mt-10 max-w-4xl border border-white/10 bg-[#F2F3EF] p-2 shadow-2xl sm:p-2.5">

            <div className="grid md:grid-cols-[1fr_1fr_1fr_auto]">

              {/* LOCATION */}

              <div className="flex items-center gap-4 border-b border-[#111719]/10 px-5 py-4 text-left md:border-b-0 md:border-r">

                <span className="text-[#1F5C5B]">
                  ⌖
                </span>

                <div>

                  <p className="text-[7px] font-bold uppercase tracking-[0.2em] text-[#111719]/40">
                    Location
                  </p>

                  <p className="mt-1 text-sm text-[#111719]">
                    Any Location
                  </p>

                </div>

              </div>

              {/* PROPERTY TYPE */}

              <div className="flex items-center gap-4 border-b border-[#111719]/10 px-5 py-4 text-left md:border-b-0 md:border-r">

                <span className="text-[#1F5C5B]">
                  ◇
                </span>

                <div>

                  <p className="text-[7px] font-bold uppercase tracking-[0.2em] text-[#111719]/40">
                    Property Type
                  </p>

                  <p className="mt-1 text-sm text-[#111719]">
                    Any Property
                  </p>

                </div>

              </div>

              {/* PRICE */}

              <div className="flex items-center gap-4 px-5 py-4 text-left">

                <span className="text-[#1F5C5B]">
                  $
                </span>

                <div>

                  <p className="text-[7px] font-bold uppercase tracking-[0.2em] text-[#111719]/40">
                    Price Range
                  </p>

                  <p className="mt-1 text-sm text-[#111719]">
                    Any Price
                  </p>

                </div>

              </div>

              {/* SEARCH BUTTON */}

              <button
                type="button"
                className="group flex h-14 items-center justify-center gap-4 bg-[#1F5C5B] px-8 text-[9px] font-bold uppercase tracking-[0.2em] text-[#F2F3EF] transition-colors duration-300 hover:bg-[#28706E]"
              >
                <span>
                  Search
                </span>

                <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>

              </button>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          BOTTOM INFORMATION BAR
      ===================================================== */}

      <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/10">

        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 sm:px-8 lg:px-10">

          {/* LEFT */}

          <div className="flex items-center gap-4">

            <span className="h-8 w-px bg-[#4FA7A1]" />

            <p className="text-[8px] font-medium uppercase tracking-[0.24em] text-white/45 sm:text-[9px]">
              Curated Properties · Thoughtful Service
            </p>

          </div>

          {/* RIGHT */}

          <a
            href="#properties"
            className="group hidden items-center gap-3 text-[9px] font-bold uppercase tracking-[0.22em] text-[#8BC7C2] transition-colors duration-300 hover:text-white sm:flex"
          >
            <span>
              Explore Properties
            </span>

            <span className="text-base transition-transform duration-300 group-hover:translate-y-1">
              ↓
            </span>
          </a>

        </div>

      </div>
    </section>
  );
}