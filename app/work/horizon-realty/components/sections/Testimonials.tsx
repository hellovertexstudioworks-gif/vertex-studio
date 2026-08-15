const testimonials = [
  {
    quote:
      "Horizon made the entire process feel effortless. From our first viewing to closing day, every detail was handled with genuine care.",
    name: "Olivia Bennett",
    role: "Home Buyer",
    location: "Miami, Florida",
  },
  {
    quote:
      "They understood exactly how to position our property and brought the right buyers to the table. We couldn't have asked for a better experience.",
    name: "James Anderson",
    role: "Property Seller",
    location: "Austin, Texas",
  },
  {
    quote:
      "The team gave us clarity when we needed it most. Their market knowledge helped us make an investment decision we feel confident about.",
    name: "Ethan Williams",
    role: "Property Investor",
    location: "Los Angeles, California",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-[#F2F3EF] py-28 sm:py-36"
    >
      {/* =====================================================
          DECORATIVE BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full border border-[#1F5C5B]/10" />

      <div className="pointer-events-none absolute -right-32 bottom-10 h-72 w-72 rounded-full border border-[#111719]/[0.05]" />

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">

          {/* LEFT */}

          <div>

            <div className="mb-7 flex items-center gap-4">

              <span className="h-px w-10 bg-[#1F5C5B]" />

              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#1F5C5B]">
                Client Stories
              </p>

            </div>

            <h2 className="font-serif text-5xl leading-[0.92] tracking-[-0.045em] text-[#111719] sm:text-6xl lg:text-7xl">

              Good moves

              <br />

              <span className="italic text-[#1F5C5B]">
                start with trust.
              </span>

            </h2>

          </div>

          {/* RIGHT */}

          <div className="max-w-lg lg:ml-auto lg:pb-2">

            <p className="text-sm leading-7 text-[#111719]/60 sm:text-base sm:leading-8">
              The best measure of our work is how our clients feel when
              they finally receive the keys.
            </p>

          </div>

        </div>

        {/* =================================================
            FEATURED QUOTE
        ================================================= */}

        <div className="mt-16 border-y border-[#111719]/10 py-12 sm:py-16">

          <div className="grid gap-10 lg:grid-cols-[120px_1fr_220px] lg:items-center">

            {/* QUOTE MARK */}

            <div className="font-serif text-8xl leading-none text-[#1F5C5B]/20">
              “
            </div>

            {/* QUOTE */}

            <div>

              <p className="max-w-4xl font-serif text-3xl leading-tight tracking-[-0.025em] text-[#111719] sm:text-4xl lg:text-5xl">
                {testimonials[0].quote}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">

                <span className="h-px w-8 bg-[#1F5C5B]" />

                <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#111719]">
                  {testimonials[0].name}
                </p>

                <span className="text-[9px] uppercase tracking-[0.18em] text-[#111719]/35">
                  {testimonials[0].role}
                </span>

              </div>

            </div>

            {/* LOCATION */}

            <div className="border-l border-[#111719]/10 pl-6 lg:text-right">

              <p className="text-[8px] font-bold uppercase tracking-[0.22em] text-[#111719]/35">
                Client Location
              </p>

              <p className="mt-2 font-serif text-lg italic text-[#1F5C5B]">
                {testimonials[0].location}
              </p>

            </div>

          </div>

        </div>

        {/* =================================================
            TESTIMONIAL CARDS
        ================================================= */}

        <div className="mt-8 grid gap-5 md:grid-cols-2">

          {testimonials.slice(1).map((testimonial, index) => (
            <article
              key={testimonial.name}
              className="group border border-[#111719]/10 bg-[#E9EDEA] p-7 transition-all duration-300 hover:border-[#1F5C5B]/30 hover:bg-[#E3E9E7] sm:p-9"
            >

              {/* NUMBER */}

              <div className="flex items-start justify-between">

                <span className="font-serif text-3xl italic text-[#1F5C5B]/40">
                  0{index + 2}
                </span>

                <span className="text-2xl text-[#1F5C5B]/30">
                  “
                </span>

              </div>

              {/* QUOTE */}

              <p className="mt-8 font-serif text-2xl leading-snug text-[#111719]">
                {testimonial.quote}
              </p>

              {/* CLIENT */}

              <div className="mt-10 flex items-end justify-between gap-5 border-t border-[#111719]/10 pt-5">

                <div>

                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#111719]">
                    {testimonial.name}
                  </p>

                  <p className="mt-2 text-[8px] uppercase tracking-[0.18em] text-[#111719]/40">
                    {testimonial.role}
                  </p>

                </div>

                <p className="text-right text-[8px] font-semibold uppercase tracking-[0.18em] text-[#1F5C5B]">
                  {testimonial.location}
                </p>

              </div>

            </article>
          ))}

        </div>

        {/* =================================================
            BOTTOM STATEMENT
        ================================================= */}

        <div className="mt-14 flex flex-col justify-between gap-8 border-t border-[#111719]/10 pt-8 sm:flex-row sm:items-center">

          <div className="flex items-center gap-5">

            <span className="font-serif text-4xl italic text-[#1F5C5B]/40">
              4.9
            </span>

            <div>

              <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-[#111719]/40">
                Client Satisfaction
              </p>

              <p className="mt-2 font-serif text-lg italic text-[#111719]/70">
                Relationships beyond the transaction.
              </p>

            </div>

          </div>

          <a
            href="#contact"
            className="group inline-flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#111719] transition-colors duration-300 hover:text-[#1F5C5B]"
          >

            <span className="border-b border-[#111719]/25 pb-2 transition-colors duration-300 group-hover:border-[#1F5C5B]">
              Start Your Journey
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