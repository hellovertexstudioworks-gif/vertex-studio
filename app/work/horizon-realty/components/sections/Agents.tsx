const agents = [
  {
    number: "01",
    name: "Alex Morgan",
    role: "Senior Property Advisor",
    location: "Miami · Florida",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=90",
  },
  {
    number: "02",
    name: "Sophia Bennett",
    role: "Luxury Property Specialist",
    location: "Austin · Texas",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=90",
  },
  {
    number: "03",
    name: "Daniel Carter",
    role: "Investment Advisor",
    location: "Los Angeles · California",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=90",
  },
];

export default function Agents() {
  return (
    <section
      id="agents"
      className="relative overflow-hidden bg-[#111719] py-28 sm:py-36"
    >
      {/* =====================================================
          DECORATIVE BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute -right-40 bottom-20 h-96 w-96 rounded-full border border-[#4FA7A1]/10" />

      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full border border-white/[0.04]" />

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">

          <div>

            {/* EYEBROW */}

            <div className="mb-7 flex items-center gap-4">

              <span className="h-px w-10 bg-[#4FA7A1]" />

              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#4FA7A1]">
                Meet The Team
              </p>

            </div>

            {/* HEADING */}

            <h2 className="font-serif text-5xl leading-[0.92] tracking-[-0.045em] text-[#F2F3EF] sm:text-6xl lg:text-7xl">

              People behind

              <br />

              <span className="italic text-[#4FA7A1]">
                the address.
              </span>

            </h2>

          </div>

          {/* DESCRIPTION */}

          <p className="max-w-md text-sm leading-7 text-white/55 sm:text-base sm:leading-8 lg:pb-2">
            Our advisors combine local knowledge, market insight, and
            thoughtful service to help you make confident property decisions.
          </p>

        </div>

        {/* =================================================
            AGENTS GRID
        ================================================= */}

        <div className="mt-16 grid gap-6 md:grid-cols-3">

          {agents.map((agent) => (
            <article
              key={agent.number}
              className="group"
            >

              {/* IMAGE */}

              <div className="relative aspect-[4/5] overflow-hidden bg-[#1A2223]">

                <img
                  src={agent.image}
                  alt={agent.name}
                  className="h-full w-full object-cover grayscale-[20%] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />

                {/* OVERLAY */}

                <div className="absolute inset-0 bg-gradient-to-t from-[#071011]/80 via-transparent to-transparent" />

                {/* NUMBER */}

                <div className="absolute left-5 top-5">

                  <span className="font-serif text-3xl italic text-white/60">
                    {agent.number}
                  </span>

                </div>

                {/* CONTACT BUTTON */}

                <a
                  href="#contact"
                  aria-label={`Contact ${agent.name}`}
                  className="absolute bottom-5 right-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-[#111719]/30 text-white backdrop-blur-md transition-all duration-300 hover:border-[#4FA7A1] hover:bg-[#4FA7A1] hover:text-[#111719]"
                >
                  <span className="text-lg">
                    →
                  </span>
                </a>

              </div>

              {/* INFORMATION */}

              <div className="border-b border-white/10 py-6">

                <div className="flex items-start justify-between gap-5">

                  <div>

                    <h3 className="font-serif text-2xl text-[#F2F3EF]">
                      {agent.name}
                    </h3>

                    <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.2em] text-[#4FA7A1]">
                      {agent.role}
                    </p>

                  </div>

                  <span className="pt-1 text-[8px] font-semibold uppercase tracking-[0.18em] text-white/35">
                    {agent.location}
                  </span>

                </div>

              </div>

            </article>
          ))}

        </div>

        {/* =================================================
            BOTTOM STATEMENT
        ================================================= */}

        <div className="mt-14 flex flex-col justify-between gap-8 border-t border-white/10 pt-8 sm:flex-row sm:items-center">

          <div className="flex items-center gap-5">

            <span className="font-serif text-4xl italic text-[#4FA7A1]/50">
              10+
            </span>

            <div>

              <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-white/35">
                Years of Experience
              </p>

              <p className="mt-2 font-serif text-lg italic text-white/70">
                Experience you can trust.
              </p>

            </div>

          </div>

          <a
            href="#contact"
            className="group inline-flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#F2F3EF] transition-colors duration-300 hover:text-[#4FA7A1]"
          >

            <span className="border-b border-white/20 pb-2 transition-colors duration-300 group-hover:border-[#4FA7A1]">
              Speak With An Advisor
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