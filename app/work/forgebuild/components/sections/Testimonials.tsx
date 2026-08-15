import { Quote, Star, ArrowUpRight } from "lucide-react";

const testimonials = [
  {
    quote:
      "ForgeBuild made the entire construction process feel organized and straightforward. Their team communicated clearly from the beginning and delivered exactly what we needed.",
    name: "Michael Anderson",
    role: "Business Owner",
    project: "Riverside Office Complex",
  },
  {
    quote:
      "The quality of the workmanship exceeded our expectations. The team paid attention to every detail and kept us updated throughout the entire project.",
    name: "David Thompson",
    role: "Homeowner",
    project: "Oakwood Residence",
  },
  {
    quote:
      "What stood out most was their professionalism. They stayed focused on quality, safety, and keeping the project moving according to schedule.",
    name: "Robert Martinez",
    role: "Property Developer",
    project: "Harbor View Development",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-[#0d0f10] text-white"
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-200px] top-[-150px] h-[500px] w-[500px] rounded-full bg-orange-500/[0.035] blur-3xl" />

        <div className="absolute bottom-[-200px] left-[-150px] h-[450px] w-[450px] rounded-full bg-white/[0.015] blur-3xl" />
      </div>

      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-end lg:gap-10">

          {/* LEFT */}

          <div>

            {/* Eyebrow */}

            <div className="mb-5 flex items-center gap-3 sm:mb-6">
              <span className="h-px w-9 bg-orange-500 sm:w-10" />

              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-orange-500 sm:text-xs">
                Client Stories
              </span>
            </div>

            {/* Heading */}

            <h2 className="max-w-3xl text-[3.1rem] font-black uppercase leading-[0.88] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl">
              Trusted By
              <br />
              People Who
              <br />

              <span className="text-orange-500">
                Build Big.
              </span>
            </h2>

          </div>

          {/* RIGHT */}

          <div className="lg:justify-self-end">

            <p className="max-w-xl text-[15px] leading-7 text-white/55 sm:text-lg sm:leading-8">
              From homeowners to business owners and
              developers, our clients trust ForgeBuild to
              deliver quality work and dependable service.
            </p>

            <div className="mt-6 flex items-center gap-3 sm:mt-7">
              <span className="h-2 w-2 bg-orange-500" />

              <span className="text-[10px] font-black uppercase tracking-[0.16em] text-white/35 sm:text-xs">
                Built on trust
              </span>
            </div>

          </div>

        </div>

        {/* =====================================================
            TESTIMONIAL GRID
        ===================================================== */}

        <div className="mt-12 grid gap-4 sm:mt-16 sm:gap-5 lg:grid-cols-3">

          {testimonials.map((testimonial, index) => {
            const featured = index === 1;

            return (
              <article
                key={testimonial.name}
                className={`group relative flex min-h-0 flex-col overflow-hidden border p-6 transition-all duration-500 sm:min-h-[480px] sm:p-8 ${
                  featured
                    ? "border-orange-500 bg-orange-500 text-[#050817]"
                    : "border-white/10 bg-[#151819] text-white hover:border-orange-500/50 hover:bg-[#191c1d]"
                }`}
              >

                {/* =================================================
                    TOP
                ================================================= */}

                <div className="flex items-start justify-between">

                  {/* Quote Icon */}

                  <div
                    className={`flex h-11 w-11 items-center justify-center border sm:h-12 sm:w-12 ${
                      featured
                        ? "border-black/15 bg-black/10"
                        : "border-white/10 bg-white/[0.03]"
                    }`}
                  >
                    <Quote
                      size={20}
                      strokeWidth={1.8}
                      className={
                        featured
                          ? "text-[#050817]"
                          : "text-orange-500"
                      }
                      fill="currentColor"
                    />
                  </div>

                  {/* Number */}

                  <span
                    className={`text-5xl font-black leading-none tracking-[-0.06em] sm:text-6xl ${
                      featured
                        ? "text-black/[0.10]"
                        : "text-white/[0.035]"
                    }`}
                  >
                    0{index + 1}
                  </span>

                </div>

                {/* =================================================
                    STARS
                ================================================= */}

                <div className="mt-6 flex gap-1 sm:mt-8">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      size={14}
                      strokeWidth={1.5}
                      className="fill-current text-[#050817] opacity-90"
                    />
                  ))}
                </div>

                {/* =================================================
                    QUOTE
                ================================================= */}

                <blockquote
                  className={`mt-6 text-[15px] leading-7 sm:mt-7 sm:text-lg sm:leading-8 ${
                    featured
                      ? "text-[#050817]/75"
                      : "text-white/65"
                  }`}
                >
                  “{testimonial.quote}”
                </blockquote>

                {/* =================================================
                    CLIENT INFO
                ================================================= */}

                <div
                  className={`mt-8 border-t pt-5 sm:mt-auto sm:pt-6 ${
                    featured
                      ? "border-black/15"
                      : "border-white/10"
                  }`}
                >

                  <p
                    className={`text-sm font-black uppercase tracking-wide ${
                      featured
                        ? "text-[#050817]"
                        : "text-white"
                    }`}
                  >
                    {testimonial.name}
                  </p>

                  <p
                    className={`mt-1 text-[10px] font-bold uppercase tracking-[0.14em] sm:text-xs ${
                      featured
                        ? "text-[#050817]/60"
                        : "text-orange-500"
                    }`}
                  >
                    {testimonial.role}
                  </p>

                  {/* Project + Arrow */}

                  <div className="mt-4 flex items-center justify-between gap-4">

                    <p
                      className={`text-[11px] leading-5 sm:text-xs ${
                        featured
                          ? "text-[#050817]/50"
                          : "text-white/30"
                      }`}
                    >
                      Project: {testimonial.project}
                    </p>

                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center border transition-all duration-300 ${
                        featured
                          ? "border-black/15 text-[#050817] group-hover:bg-[#050817] group-hover:text-white"
                          : "border-white/10 text-white/50 group-hover:border-orange-500 group-hover:bg-orange-500 group-hover:text-white"
                      }`}
                    >
                      <ArrowUpRight
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </div>

                  </div>

                </div>

              </article>
            );
          })}

        </div>

        {/* =====================================================
            TRUST BAR
        ===================================================== */}

        <div className="mt-8 grid gap-6 border-t border-white/10 pt-7 sm:mt-10 sm:pt-8 lg:grid-cols-2 lg:items-center">

          {/* LEFT */}

          <div className="flex items-center gap-4">

            <div className="flex -space-x-2">

              <div className="h-9 w-9 border-2 border-[#0d0f10] bg-slate-600 sm:h-10 sm:w-10" />

              <div className="h-9 w-9 border-2 border-[#0d0f10] bg-slate-500 sm:h-10 sm:w-10" />

              <div className="h-9 w-9 border-2 border-[#0d0f10] bg-orange-500 sm:h-10 sm:w-10" />

            </div>

            <div>

              <p className="text-xs font-bold leading-5 text-white/70 sm:text-sm">
                Trusted by clients across
                <br className="sm:hidden" />
                residential and commercial projects.
              </p>

              <p className="mt-1 text-[10px] text-white/30 sm:text-xs">
                Quality. Trust. Results.
              </p>

            </div>

          </div>

          {/* RIGHT */}

          <div className="lg:justify-self-end">

            <div className="flex items-center gap-3">

              <span className="text-[10px] font-black uppercase tracking-[0.15em] text-white/30 sm:text-xs">
                5.0
              </span>

              <div className="flex gap-1">

                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    size={13}
                    className="fill-orange-500 text-orange-500"
                  />
                ))}

              </div>

              <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/30 sm:text-xs">
                Client Experience
              </span>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}