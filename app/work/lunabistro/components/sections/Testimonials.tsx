export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-[#171410] py-24 text-[#F4EFE6] sm:py-28 lg:py-36"
    >
      {/* =====================================================
          BACKGROUND DECORATION
      ===================================================== */}
      <div className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full border border-white/[0.04]" />

      <div className="pointer-events-none absolute right-20 top-24 h-32 w-32 rounded-full bg-[#34382D]/20" />

      <div className="pointer-events-none absolute -left-32 top-1/2 h-64 w-64 rounded-full border border-[#C9A15A]/[0.06]" />

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

              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#E0BF7A]">
                Guest Notes
              </p>

            </div>

            {/* HEADING */}
            <h2 className="font-serif text-5xl leading-[0.94] tracking-[-0.04em] sm:text-6xl lg:text-7xl">

              What our guests
              <br />

              <span className="italic text-[#E0BF7A]">
                remember.
              </span>

            </h2>

          </div>

          <p className="max-w-md text-sm leading-7 text-white/45 sm:text-base sm:leading-8 lg:pb-2">
            The best part of Luna Bistro is the feeling guests take with them
            long after the final course.
          </p>

        </div>

        {/* =====================================================
            FEATURED TESTIMONIAL
        ===================================================== */}
        <div className="relative mt-16 border-y border-white/10 py-14 sm:py-16 lg:py-20">

          {/* LEFT QUOTE MARK */}
          <div className="absolute left-0 top-8 font-serif text-8xl leading-none text-[#C9A15A]/15 sm:text-9xl">
            “
          </div>

          <div className="relative mx-auto max-w-5xl text-center">

            {/* QUOTE */}
            <blockquote className="font-serif text-3xl leading-[1.25] tracking-[-0.02em] text-[#F4EFE6] sm:text-4xl lg:text-5xl">

              “From the atmosphere to the final course, everything felt
              incredibly thoughtful. Luna Bistro turned an ordinary evening
              into something we genuinely wanted to remember.”

            </blockquote>

            {/* DIVIDER */}
            <div className="mx-auto mt-10 h-px w-10 bg-[#C9A15A]" />

            {/* GUEST */}
            <div className="mt-6">

              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#E0BF7A]">
                Sophia & James
              </p>

              <p className="mt-2 text-[9px] uppercase tracking-[0.2em] text-white/30">
                Anniversary Dinner · New York
              </p>

            </div>

          </div>

          {/* RIGHT QUOTE MARK */}
          <div className="absolute bottom-0 right-0 rotate-180 font-serif text-8xl leading-none text-[#C9A15A]/15 sm:text-9xl">
            “
          </div>

        </div>

        {/* =====================================================
            TESTIMONIAL CARDS
        ===================================================== */}
        <div className="grid md:grid-cols-3">

          {/* =================================================
              TESTIMONIAL 01
          ================================================= */}
          <article className="border-b border-white/10 px-0 py-9 md:border-b-0 md:border-r md:px-8 md:py-10 md:first:pl-0">

            <div className="flex items-center gap-2">

              <span className="h-px w-6 bg-[#C9A15A]" />

              <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-[#E0BF7A]">
                01
              </p>

            </div>

            <p className="mt-6 text-sm leading-7 text-white/50">
              “Beautiful atmosphere, excellent service, and every dish felt
              carefully considered. A wonderful place for a special evening.”
            </p>

            <div className="mt-7">

              <p className="font-serif text-lg text-[#F4EFE6]">
                Olivia R.
              </p>

              <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-white/25">
                Dinner Guest
              </p>

            </div>

          </article>

          {/* =================================================
              TESTIMONIAL 02
          ================================================= */}
          <article className="border-b border-white/10 px-0 py-9 md:border-b-0 md:border-r md:px-8 md:py-10">

            <div className="flex items-center gap-2">

              <span className="h-px w-6 bg-[#C9A15A]" />

              <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-[#E0BF7A]">
                02
              </p>

            </div>

            <p className="mt-6 text-sm leading-7 text-white/50">
              “Luna has that rare balance between sophisticated and welcoming.
              We never felt rushed, and the food was exceptional.”
            </p>

            <div className="mt-7">

              <p className="font-serif text-lg text-[#F4EFE6]">
                Daniel M.
              </p>

              <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-white/25">
                Returning Guest
              </p>

            </div>

          </article>

          {/* =================================================
              TESTIMONIAL 03
          ================================================= */}
          <article className="px-0 py-9 md:px-8 md:py-10 md:last:pr-0">

            <div className="flex items-center gap-2">

              <span className="h-px w-6 bg-[#C9A15A]" />

              <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-[#E0BF7A]">
                03
              </p>

            </div>

            <p className="mt-6 text-sm leading-7 text-white/50">
              “The kind of restaurant you immediately want to recommend to
              someone. Elegant without ever feeling pretentious.”
            </p>

            <div className="mt-7">

              <p className="font-serif text-lg text-[#F4EFE6]">
                Emma L.
              </p>

              <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-white/25">
                Weekend Guest
              </p>

            </div>

          </article>

        </div>

        {/* =====================================================
            BOTTOM CTA
        ===================================================== */}
        <div className="mt-14 flex flex-col justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center">

          <div>

            <p className="font-serif text-xl italic text-white/75">
              Come create your own Luna moment.
            </p>

            <p className="mt-2 text-[8px] font-bold uppercase tracking-[0.24em] text-white/25">
              Your evening starts here
            </p>

          </div>

          <a
            href="#reservation"
            className="group inline-flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#E0BF7A] transition-colors duration-300 hover:text-white"
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
    </section>
  );
}