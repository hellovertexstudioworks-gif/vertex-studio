export default function Menu() {
  return (
    <section
      id="menu"
      className="relative overflow-hidden bg-[#0B0A08] py-24 sm:py-28 lg:py-36"
    >
      {/* =====================================================
          BACKGROUND DECORATION
      ===================================================== */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full border border-[#C9A15A]/10" />

      <div className="pointer-events-none absolute -right-32 bottom-20 h-72 w-72 rounded-full bg-[#34382D]/20" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">

        {/* =====================================================
            HEADER
        ===================================================== */}
        <div className="grid gap-10 lg:grid-cols-[1fr_0.7fr] lg:items-end">

          <div>
            <div className="mb-7 flex items-center gap-4">
              <span className="h-px w-10 bg-[#C9A15A]" />

              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C9A15A]">
                The Menu
              </p>
            </div>

            <h2 className="font-serif text-5xl leading-[0.95] tracking-[-0.04em] text-[#F4EFE6] sm:text-6xl lg:text-7xl">
              Thoughtfully made.
              <br />

              <span className="italic text-[#E0BF7A]">
                Beautifully served.
              </span>
            </h2>
          </div>

          <div className="lg:pb-2">
            <p className="max-w-md text-sm leading-7 text-white/50 sm:text-base sm:leading-8">
              Seasonal ingredients, refined technique, and dishes created to
              make every visit to Luna Bistro memorable.
            </p>
          </div>

        </div>

        {/* =====================================================
            DIVIDER
        ===================================================== */}
        <div className="my-14 h-px bg-white/10 sm:my-16" />

        {/* =====================================================
            MENU CATEGORIES
        ===================================================== */}
        <div className="mb-12 flex items-center gap-7 overflow-x-auto pb-2">

          <span className="whitespace-nowrap border-b border-[#C9A15A] pb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#C9A15A]">
            Signature
          </span>

          <span className="whitespace-nowrap pb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white/35">
            Starters
          </span>

          <span className="whitespace-nowrap pb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white/35">
            Mains
          </span>

          <span className="whitespace-nowrap pb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white/35">
            Desserts
          </span>

        </div>

        {/* =====================================================
            MENU GRID
        ===================================================== */}
        <div className="grid gap-x-12 gap-y-16 lg:grid-cols-2">

          {/* =================================================
              WILD MUSHROOM RISOTTO
          ================================================= */}
          <article className="group">

            <div className="grid gap-6 sm:grid-cols-[200px_1fr]">

              <div className="relative aspect-[4/3] overflow-hidden bg-[#171410]">

                <img
                  src="https://www.magicmike.pl/images/galerie/24/Risotto-Micha-Sierka.jpg"
                  alt="Wild Mushroom Risotto"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <span className="absolute left-4 top-4 bg-[#0B0A08]/90 px-3 py-2 text-[8px] font-bold uppercase tracking-[0.2em] text-[#E0BF7A] backdrop-blur-sm">
                  Chef's Pick
                </span>

              </div>

              <div className="flex flex-col justify-between">

                <div>

                  <div className="flex items-start justify-between gap-5">

                    <h3 className="font-serif text-2xl leading-tight text-[#F4EFE6] transition-colors duration-300 group-hover:text-[#E0BF7A] sm:text-3xl">
                      Wild Mushroom Risotto
                    </h3>

                    <span className="shrink-0 font-serif text-xl text-[#C9A15A]">
                      $28
                    </span>

                  </div>

                  <p className="mt-4 text-sm leading-6 text-white/40">
                    Creamy Arborio rice, wild mushrooms, parmesan, herbs, and
                    delicate truffle notes.
                  </p>

                </div>

                <p className="mt-6 text-[8px] font-bold uppercase tracking-[0.22em] text-white/25">
                  Vegetarian
                </p>

              </div>

            </div>

          </article>

          {/* =================================================
              CHARRED SALMON
          ================================================= */}
          <article className="group">

            <div className="grid gap-6 sm:grid-cols-[200px_1fr]">

              <div className="relative aspect-[4/3] overflow-hidden bg-[#171410]">

                <img
                  src="https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1000&q=90"
                  alt="Charred Salmon"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

              </div>

              <div className="flex flex-col justify-between">

                <div>

                  <div className="flex items-start justify-between gap-5">

                    <h3 className="font-serif text-2xl leading-tight text-[#F4EFE6] transition-colors duration-300 group-hover:text-[#E0BF7A] sm:text-3xl">
                      Charred Salmon
                    </h3>

                    <span className="shrink-0 font-serif text-xl text-[#C9A15A]">
                      $34
                    </span>

                  </div>

                  <p className="mt-4 text-sm leading-6 text-white/40">
                    Fire-charred salmon, lemon beurre blanc, asparagus, and
                    roasted baby potatoes.
                  </p>

                </div>

                <p className="mt-6 text-[8px] font-bold uppercase tracking-[0.22em] text-white/25">
                  Seafood
                </p>

              </div>

            </div>

          </article>

          {/* =================================================
              HERB-CRUSTED TENDERLOIN
          ================================================= */}
          <article className="group">

            <div className="grid gap-6 sm:grid-cols-[200px_1fr]">

              <div className="relative aspect-[4/3] overflow-hidden bg-[#171410]">

                <img
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=90"
                  alt="Herb-Crusted Tenderloin"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

              </div>

              <div className="flex flex-col justify-between">

                <div>

                  <div className="flex items-start justify-between gap-5">

                    <h3 className="font-serif text-2xl leading-tight text-[#F4EFE6] transition-colors duration-300 group-hover:text-[#E0BF7A] sm:text-3xl">
                      Herb-Crusted Tenderloin
                    </h3>

                    <span className="shrink-0 font-serif text-xl text-[#C9A15A]">
                      $48
                    </span>

                  </div>

                  <p className="mt-4 text-sm leading-6 text-white/40">
                    Tender beef, roasted vegetables, pomme purée, and a rich
                    red wine jus.
                  </p>

                </div>

                <p className="mt-6 text-[8px] font-bold uppercase tracking-[0.22em] text-white/25">
                  Chef's Selection
                </p>

              </div>

            </div>

          </article>

          {/* =================================================
              DARK CHOCOLATE TORTE
          ================================================= */}
          <article className="group">

            <div className="grid gap-6 sm:grid-cols-[200px_1fr]">

              <div className="relative aspect-[4/3] overflow-hidden bg-[#171410]">

                <img
                  src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=90"
                  alt="Dark Chocolate Torte"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

              </div>

              <div className="flex flex-col justify-between">

                <div>

                  <div className="flex items-start justify-between gap-5">

                    <h3 className="font-serif text-2xl leading-tight text-[#F4EFE6] transition-colors duration-300 group-hover:text-[#E0BF7A] sm:text-3xl">
                      Dark Chocolate Torte
                    </h3>

                    <span className="shrink-0 font-serif text-xl text-[#C9A15A]">
                      $16
                    </span>

                  </div>

                  <p className="mt-4 text-sm leading-6 text-white/40">
                    Dark chocolate, vanilla cream, cacao crumble, and seasonal
                    berries.
                  </p>

                </div>

                <p className="mt-6 text-[8px] font-bold uppercase tracking-[0.22em] text-white/25">
                  Dessert
                </p>

              </div>

            </div>

          </article>

        </div>

        {/* =====================================================
            BOTTOM NOTE
        ===================================================== */}
        <div className="mt-16 border-t border-white/10 pt-8">

          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">

            <div>

              <p className="font-serif text-lg italic text-white/70">
                Our menu changes with the seasons.
              </p>

              <p className="mt-2 text-[8px] font-bold uppercase tracking-[0.22em] text-white/25">
                Ingredients subject to availability
              </p>

            </div>

            <a
              href="#reservation"
              className="group inline-flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#E0BF7A] transition-colors duration-300 hover:text-white"
            >
              <span className="border-b border-[#E0BF7A]/40 pb-2 group-hover:border-white/40">
                Reserve Your Table
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