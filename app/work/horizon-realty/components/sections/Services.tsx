const services = [
  {
    number: "01",
    title: "Buying",
    description:
      "Find the right property with confidence. From the first search to the final signature, we guide you through every step.",
  },
  {
    number: "02",
    title: "Selling",
    description:
      "Position your property for the market with thoughtful presentation, strategic guidance, and a clear selling process.",
  },
  {
    number: "03",
    title: "Property Advisory",
    description:
      "Make informed property decisions with practical insight into opportunities, neighborhoods, value, and long-term potential.",
  },
  {
    number: "04",
    title: "Investment",
    description:
      "Build a stronger property portfolio through carefully considered opportunities and guidance focused on lasting value.",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#F2F3EF] py-28 sm:py-36"
    >
      {/* =====================================================
          DECORATIVE BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute -right-40 top-16 h-80 w-80 rounded-full border border-[#1F5C5B]/10" />

      <div className="pointer-events-none absolute -left-52 bottom-0 h-[28rem] w-[28rem] rounded-full border border-[#111719]/[0.05]" />

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
                What We Do
              </p>

            </div>

            <h2 className="font-serif text-5xl leading-[0.92] tracking-[-0.045em] text-[#111719] sm:text-6xl lg:text-7xl">

              Real estate,

              <br />

              <span className="italic text-[#1F5C5B]">
                thoughtfully handled.
              </span>

            </h2>

          </div>

          {/* RIGHT */}

          <div className="max-w-lg lg:ml-auto lg:pb-2">

            <p className="text-sm leading-7 text-[#111719]/60 sm:text-base sm:leading-8">
              Whether you're buying your first home, selling a property, or
              building your next investment, Horizon Realty brings clarity
              and thoughtful guidance to every decision.
            </p>

          </div>

        </div>

        {/* =================================================
            SERVICES LIST
        ================================================= */}

        <div className="mt-16 border-t border-[#111719]/10">

          {services.map((service) => (
            <article
              key={service.number}
              className="group grid gap-6 border-b border-[#111719]/10 py-8 transition-colors duration-300 hover:bg-[#E8ECE9] sm:grid-cols-[90px_0.8fr_1.2fr] sm:items-center sm:gap-10 sm:px-6 lg:grid-cols-[110px_0.8fr_1.2fr] lg:py-10"
            >

              {/* NUMBER */}

              <div>

                <span className="font-serif text-4xl italic text-[#1F5C5B]/35 transition-colors duration-300 group-hover:text-[#1F5C5B]">
                  {service.number}
                </span>

              </div>

              {/* TITLE */}

              <div>

                <h3 className="font-serif text-3xl tracking-[-0.02em] text-[#111719] sm:text-4xl">
                  {service.title}
                </h3>

              </div>

              {/* DESCRIPTION + ARROW */}

              <div className="flex items-center justify-between gap-8">

                <p className="max-w-lg text-sm leading-7 text-[#111719]/55">
                  {service.description}
                </p>

                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#1F5C5B]/20 text-[#1F5C5B] transition-all duration-300 group-hover:border-[#1F5C5B] group-hover:bg-[#1F5C5B] group-hover:text-[#F2F3EF]">

                  <span className="text-lg transition-transform duration-300 group-hover:translate-x-0.5">
                    →
                  </span>

                </span>

              </div>

            </article>
          ))}

        </div>

        {/* =================================================
            BOTTOM STATEMENT
        ================================================= */}

        <div className="mt-14 flex flex-col justify-between gap-8 border-t border-[#111719]/10 pt-8 sm:flex-row sm:items-center">

          <div className="flex items-center gap-5">

            <span className="h-8 w-px bg-[#1F5C5B]" />

            <div>

              <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-[#111719]/40">
                The Horizon Approach
              </p>

              <p className="mt-2 font-serif text-lg italic text-[#111719]/75">
                Clear advice. Thoughtful decisions.
              </p>

            </div>

          </div>

          <a
            href="#agents"
            className="group inline-flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#111719] transition-colors duration-300 hover:text-[#1F5C5B]"
          >

            <span className="border-b border-[#111719]/25 pb-2 transition-colors duration-300 group-hover:border-[#1F5C5B]">
              Meet Our Team
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