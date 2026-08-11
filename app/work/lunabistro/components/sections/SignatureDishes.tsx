export default function SignatureDishes() {
  return (
    <section
      id="signature-dishes"
      className="relative overflow-hidden bg-[#F4EFE6] py-24 sm:py-28 lg:py-36"
    >
      {/* =====================================================
          BACKGROUND DECORATION
      ===================================================== */}
      <div className="pointer-events-none absolute -right-32 top-16 h-80 w-80 rounded-full border border-[#34382D]/10" />

      <div className="pointer-events-none absolute -right-20 top-28 h-56 w-56 rounded-full border border-[#C9A15A]/15" />

      <div className="pointer-events-none absolute bottom-20 -left-32 h-72 w-72 rounded-full bg-[#34382D]/[0.025]" />

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
                From The Kitchen
              </p>
            </div>

            {/* HEADING */}
            <h2 className="font-serif text-5xl leading-[0.95] tracking-[-0.04em] text-[#171410] sm:text-6xl lg:text-7xl">
              Signature
              <br />

              <span className="italic text-[#34382D]">
                dishes.
              </span>
            </h2>

          </div>

          {/* INTRO */}
          <p className="max-w-md text-sm leading-7 text-[#171410]/55 sm:text-base sm:leading-8 lg:pb-2">
            A selection of dishes that capture the spirit of Luna Bistro —
            seasonal ingredients, refined technique, and unforgettable flavor.
          </p>

        </div>

        {/* =====================================================
            FEATURED DISH
        ===================================================== */}
        <div className="mt-16 grid overflow-hidden bg-[#171410] lg:grid-cols-[1.15fr_0.85fr]">

          {/* FEATURE IMAGE */}
          <div className="group relative min-h-[420px] overflow-hidden sm:min-h-[520px] lg:min-h-[600px]">

            <img
              src="https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=1800&q=90"
              alt="Truffle Risotto"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />

            {/* IMAGE OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-black/10" />

            {/* NUMBER */}
            <div className="absolute left-6 top-6 sm:left-8 sm:top-8">
              <span className="font-serif text-5xl text-white/75">
                01
              </span>
            </div>

            {/* LABEL */}
            <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8">
              <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#E0BF7A]">
                Chef's Selection
              </p>
            </div>

          </div>

          {/* FEATURED CONTENT */}
          <div className="flex flex-col justify-between bg-[#171410] p-8 sm:p-10 lg:p-14">

            <div>

              <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#C9A15A]">
                Signature No. 01
              </p>

              <h3 className="mt-6 font-serif text-4xl leading-none text-[#F4EFE6] sm:text-5xl">
                Truffle
                <br />

                <span className="italic text-[#E0BF7A]">
                  Risotto
                </span>
              </h3>

              <div className="my-8 h-px w-full bg-white/10" />

              <p className="text-sm leading-7 text-white/50 sm:text-base sm:leading-8">
                Creamy Arborio rice slowly cooked with wild mushrooms,
                parmesan, fresh herbs, and a delicate touch of white truffle.
              </p>

            </div>

            <div className="mt-12">

              <div className="flex items-end justify-between">

                <div>

                  <p className="text-[8px] font-bold uppercase tracking-[0.22em] text-white/30">
                    Chef's Recommendation
                  </p>

                  <p className="mt-2 font-serif text-2xl text-[#F4EFE6]">
                    $28
                  </p>

                </div>

                <span className="font-serif text-6xl italic text-white/[0.06]">
                  01
                </span>

              </div>

              <a
                href="#reservation"
                className="group mt-8 inline-flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#E0BF7A] transition-colors duration-300 hover:text-white"
              >
                <span className="border-b border-[#E0BF7A]/40 pb-2 transition-colors group-hover:border-white/40">
                  Reserve Your Table
                </span>

                <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>

            </div>

          </div>

        </div>

        {/* =====================================================
            SECONDARY DISHES
        ===================================================== */}
        <div className="mt-10 grid gap-10 md:grid-cols-2">

          {/* =================================================
              DISH 02 — SCALLOPS
          ================================================= */}
          <article className="group grid grid-cols-[140px_1fr] gap-6 border-t border-[#171410]/15 pt-6 sm:grid-cols-[190px_1fr]">

            <div className="relative aspect-square overflow-hidden bg-[#171410]">

              <img
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=90"
                alt="Seared Scallops"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

            </div>

            <div className="flex flex-col justify-between">

              <div>

                <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#34382D]">
                  02 · Seafood
                </p>

                <div className="mt-3 flex items-start justify-between gap-4">

                  <h3 className="font-serif text-2xl leading-tight text-[#171410] transition-colors duration-300 group-hover:text-[#9B7637] sm:text-3xl">
                    Seared Scallops
                  </h3>

                  <span className="shrink-0 font-serif text-xl text-[#9B7637]">
                    $36
                  </span>

                </div>

                <p className="mt-3 text-sm leading-6 text-[#171410]/50">
                  Golden seared scallops, cauliflower purée, citrus beurre
                  blanc, and fresh herbs.
                </p>

              </div>

            </div>

          </article>

          {/* =================================================
              DISH 03 — DUCK
          ================================================= */}
          <article className="group grid grid-cols-[140px_1fr] gap-6 border-t border-[#171410]/15 pt-6 sm:grid-cols-[190px_1fr]">

            <div className="relative aspect-square overflow-hidden bg-[#171410]">

              <img
                src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=90"
                alt="Roasted Duck Breast"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

            </div>

            <div className="flex flex-col justify-between">

              <div>

                <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#34382D]">
                  03 · Main Course
                </p>

                <div className="mt-3 flex items-start justify-between gap-4">

                  <h3 className="font-serif text-2xl leading-tight text-[#171410] transition-colors duration-300 group-hover:text-[#9B7637] sm:text-3xl">
                    Roasted Duck Breast
                  </h3>

                  <span className="shrink-0 font-serif text-xl text-[#9B7637]">
                    $44
                  </span>

                </div>

                <p className="mt-3 text-sm leading-6 text-[#171410]/50">
                  Herb-roasted duck, seasonal vegetables, cherry reduction,
                  and pomme purée.
                </p>

              </div>

            </div>

          </article>

        </div>

        {/* =====================================================
            PHILOSOPHY
        ===================================================== */}
        <div className="mt-20 border-t border-[#171410]/10 pt-10 text-center">

          <p className="mx-auto max-w-2xl font-serif text-2xl leading-relaxed text-[#171410] sm:text-3xl">
            Every plate tells a story.
            <br />

            <span className="italic text-[#34382D]">
              Every evening becomes a memory.
            </span>
          </p>

          <div className="mx-auto mt-7 h-px w-10 bg-[#C9A15A]" />

          <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.28em] text-[#171410]/40">
            The Luna Bistro Philosophy
          </p>

        </div>

      </div>
    </section>
  );
}