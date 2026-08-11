export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-[#0B0A08]"
    >
      {/* =====================================================
          HERO BACKGROUND
      ===================================================== */}

      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/luna/luna-hero.jpg')",
        }}
      />

      {/* =====================================================
          CINEMATIC OVERLAYS
      ===================================================== */}

      {/* Overall darkening */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Strong left gradient for typography */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#050403]/95 via-[#050403]/70 to-[#050403]/10" />

      {/* Bottom cinematic fade */}
      <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-[#0B0A08]/90 via-[#0B0A08]/30 to-transparent" />

      {/* Top cinematic fade */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/70 to-transparent" />

      {/* =====================================================
          DECORATIVE DETAIL
      ===================================================== */}

      <div className="pointer-events-none absolute -left-40 top-40 h-80 w-80 rounded-full border border-[#C9A15A]/10" />

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center px-6 pb-32 pt-32 sm:px-8 lg:px-10">
        <div className="max-w-4xl">
          {/* =================================================
              EYEBROW
          ================================================= */}

          <div className="mb-7 flex items-center gap-4">
            <span className="h-px w-12 bg-[#C9A15A]" />

            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#E0BF7A]">
              Fine Dining · Since 2018
            </p>
          </div>

          {/* =================================================
              MAIN HEADING
          ================================================= */}

          <h1 className="font-serif text-[clamp(4rem,8vw,7.5rem)] leading-[0.86] tracking-[-0.055em] text-[#F4EFE6]">
            Delicious food.
            <br />

            <span className="italic text-[#E0BF7A]">
              Great moments.
            </span>
          </h1>

          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <p className="mt-8 max-w-xl text-sm leading-7 text-white/70 sm:text-base sm:leading-8 lg:text-lg">
            Thoughtfully crafted cuisine, warm hospitality, and an atmosphere
            designed for unforgettable evenings.
          </p>

          {/* =================================================
              BUTTONS
          ================================================= */}

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            {/* PRIMARY CTA */}

            <a
              href="#reservation"
              className="group inline-flex h-14 items-center justify-center bg-[#E0BF7A] px-8 text-[10px] font-bold uppercase tracking-[0.2em] text-[#171410] transition-all duration-300 hover:bg-[#C9A15A]"
            >
              <span>Reserve a Table</span>

              <span className="ml-4 text-base transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>

            {/* SECONDARY CTA */}

            <a
              href="#menu"
              className="group inline-flex h-14 items-center justify-center border border-white/35 bg-black/10 px-8 text-[10px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-sm transition-all duration-300 hover:border-[#E0BF7A] hover:text-[#E0BF7A]"
            >
              <span>Explore Our Menu</span>

              <span className="ml-4 text-base transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM INFORMATION BAR
      ===================================================== */}

      <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/15">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 sm:px-8 lg:px-10">
          {/* LEFT INFORMATION */}

          <div className="flex items-center gap-4">
            <span className="h-8 w-px bg-[#C9A15A]" />

            <p className="text-[9px] font-medium uppercase tracking-[0.24em] text-white/60">
              Contemporary Dining · Seasonal Cuisine
            </p>
          </div>

          {/* RIGHT LINK */}

          <a
            href="#story"
            className="group hidden items-center gap-3 text-[9px] font-bold uppercase tracking-[0.22em] text-[#E0BF7A] transition-colors duration-300 hover:text-white sm:flex"
          >
            <span>Discover Luna</span>

            <span className="text-base transition-transform duration-300 group-hover:translate-y-1">
              ↓
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}