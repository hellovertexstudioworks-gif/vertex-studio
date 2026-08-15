const properties = [
  {
    number: "01",
    name: "The Glass House",
    location: "Miami, Florida",
    type: "Modern Residence",
    price: "$1,250,000",
    image: "/images/realestate/property-01.jpg",
  },
  {
    number: "02",
    name: "Hillside Estate",
    location: "Austin, Texas",
    type: "Private Estate",
    price: "$1,850,000",
    image: "/images/realestate/property-02.jpg",
  },
  {
    number: "03",
    name: "The Coastal Villa",
    location: "Malibu, California",
    type: "Luxury Villa",
    price: "$2,400,000",
    image: "/images/realestate/property-03.jpg",
  },
];

export default function FeaturedProperties() {
  return (
    <section
      id="properties"
      className="relative overflow-hidden bg-[#F2F3EF] py-28 sm:py-36"
    >
      {/* =====================================================
          DECORATIVE BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute -right-48 top-24 h-[34rem] w-[34rem] rounded-full border border-[#1F5C5B]/10" />

      <div className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full border border-[#111719]/[0.06]" />

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="grid gap-10 lg:grid-cols-[1fr_0.7fr] lg:items-end">

          {/* LEFT */}

          <div>
            <div className="mb-7 flex items-center gap-4">
              <span className="h-px w-10 bg-[#1F5C5B]" />

              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#1F5C5B]">
                Featured Properties
              </p>
            </div>

            <h2 className="font-serif text-5xl leading-[0.92] tracking-[-0.045em] text-[#111719] sm:text-6xl lg:text-7xl">
              Spaces worth
              <br />
              <span className="italic text-[#1F5C5B]">
                coming home to.
              </span>
            </h2>
          </div>

          {/* RIGHT */}

          <div className="max-w-md lg:ml-auto">
            <p className="text-sm leading-7 text-[#111719]/60 sm:text-base sm:leading-8">
              Explore a curated collection of exceptional residences,
              selected for their architecture, location, character, and
              lasting value.
            </p>

            <a
              href="#contact"
              className="group mt-7 inline-flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#111719]"
            >
              <span className="border-b border-[#111719]/25 pb-2 transition-colors duration-300 group-hover:border-[#1F5C5B] group-hover:text-[#1F5C5B]">
                Explore All Properties
              </span>

              <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>

        </div>

        {/* =====================================================
            PROPERTY GRID
        ===================================================== */}

        <div className="mt-16 grid gap-5 lg:grid-cols-12">

          {/* =================================================
              PROPERTY 01 — LARGE
          ================================================= */}

          <article className="group lg:col-span-7">
            <div className="relative aspect-[16/11] overflow-hidden bg-[#111719]">

              <img
                src={properties[0].image}
                alt={properties[0].name}
                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#071011]/85 via-[#071011]/10 to-transparent" />

              {/* NUMBER */}

              <div className="absolute left-6 top-6">
                <span className="font-serif text-3xl italic text-white/70">
                  {properties[0].number}
                </span>
              </div>

              {/* PROPERTY TYPE */}

              <div className="absolute right-6 top-6">
                <span className="border border-white/20 bg-[#111719]/30 px-4 py-2 text-[8px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md">
                  {properties[0].type}
                </span>
              </div>

              {/* PROPERTY INFO */}

              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">

                <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white/55">
                  {properties[0].location}
                </p>

                <div className="mt-2 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

                  <h3 className="font-serif text-3xl text-white sm:text-4xl">
                    {properties[0].name}
                  </h3>

                  <p className="font-serif text-2xl text-[#7BC1BB]">
                    {properties[0].price}
                  </p>

                </div>

              </div>

            </div>
          </article>

          {/* =================================================
              PROPERTY 02
          ================================================= */}

          <article className="group lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden bg-[#111719]">

              <img
                src={properties[1].image}
                alt={properties[1].name}
                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#071011]/85 via-transparent to-transparent" />

              {/* NUMBER */}

              <div className="absolute left-6 top-6">
                <span className="font-serif text-3xl italic text-white/70">
                  {properties[1].number}
                </span>
              </div>

              {/* PROPERTY INFO */}

              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">

                <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white/55">
                  {properties[1].location}
                </p>

                <h3 className="mt-2 font-serif text-3xl text-white">
                  {properties[1].name}
                </h3>

                <div className="mt-5 flex items-center justify-between border-t border-white/20 pt-4">

                  <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/55">
                    {properties[1].type}
                  </span>

                  <span className="font-serif text-xl text-[#7BC1BB]">
                    {properties[1].price}
                  </span>

                </div>

              </div>

            </div>
          </article>

          {/* =================================================
              PROPERTY 03
          ================================================= */}

          <article className="group lg:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#111719]">

              <img
                src={properties[2].image}
                alt={properties[2].name}
                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#071011]/85 via-transparent to-transparent" />

              {/* NUMBER */}

              <div className="absolute left-6 top-6">
                <span className="font-serif text-3xl italic text-white/70">
                  {properties[2].number}
                </span>
              </div>

              {/* PROPERTY INFO */}

              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">

                <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white/55">
                  {properties[2].location}
                </p>

                <div className="mt-2 flex items-end justify-between gap-4">

                  <h3 className="font-serif text-3xl text-white">
                    {properties[2].name}
                  </h3>

                  <p className="whitespace-nowrap font-serif text-xl text-[#7BC1BB]">
                    {properties[2].price}
                  </p>

                </div>

              </div>

            </div>
          </article>

          {/* =================================================
              STATEMENT PANEL
          ================================================= */}

          <div className="flex flex-col justify-between border-t border-[#111719]/10 pt-8 lg:col-span-7 lg:border-t-0 lg:pt-0">

            <div>

              <span className="font-serif text-5xl italic text-[#1F5C5B]/25">
                03
              </span>

              <p className="mt-6 max-w-xl font-serif text-3xl leading-tight tracking-[-0.02em] text-[#111719] sm:text-4xl">
                A better property search starts with
                <span className="italic text-[#1F5C5B]">
                  {" "}the right guidance.
                </span>
              </p>

              <p className="mt-6 max-w-lg text-sm leading-7 text-[#111719]/55">
                From the first viewing to the final signature, Horizon
                Realty brings thoughtful service and local expertise to
                every step of the journey.
              </p>

            </div>

            {/* BOTTOM DETAIL */}

            <div className="mt-10 flex items-center justify-between border-t border-[#111719]/10 pt-6">

              <div>

                <p className="text-[8px] font-bold uppercase tracking-[0.22em] text-[#111719]/40">
                  Horizon Realty
                </p>

                <p className="mt-2 font-serif text-lg italic text-[#111719]">
                  Your next chapter.
                </p>

              </div>

              <a
                href="#contact"
                className="group flex h-12 w-12 items-center justify-center rounded-full border border-[#1F5C5B]/30 text-[#1F5C5B] transition-all duration-300 hover:bg-[#1F5C5B] hover:text-[#F2F3EF]"
                aria-label="Contact Horizon Realty"
              >
                <span className="text-lg transition-transform duration-300 group-hover:translate-x-0.5">
                  →
                </span>
              </a>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}