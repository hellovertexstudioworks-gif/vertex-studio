// TASK: Replace app/work/lunabistro/components/sections/Contact.tsx with this file.
// Contact redesign: editorial wayfinding + atmospheric restaurant imagery.
// The address, phone, email, and hours remain demo content from the supplied file.

"use client";

const contactImage =
  "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1800&q=85";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#F4EFE6] text-[#171410]"
    >
      {/* =====================================================
          ATMOSPHERIC IMAGE
      ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 hidden h-[720px] w-[42%] bg-cover bg-center lg:block"
        style={{ backgroundImage: `url("${contactImage}")` }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 hidden h-[720px] w-[42%] bg-gradient-to-r from-[#F4EFE6] via-[#F4EFE6]/70 to-transparent lg:block"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(#171410 0.7px, transparent 0.7px)",
          backgroundSize: "7px 7px",
        }}
      />

      {/* =====================================================
          INTRO
      ===================================================== */}

      <div className="relative px-6 pb-14 pt-24 sm:px-10 sm:pb-16 sm:pt-28 lg:px-14 lg:pb-20 lg:pt-36 xl:px-16">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.5fr]">
            <div>
              <div className="mb-7 flex items-center gap-4">
                <span className="h-px w-12 bg-[#9B7637]" />

                <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#9B7637]">
                  Visit Luna
                </p>
              </div>

              <h2 className="max-w-5xl font-serif text-[clamp(3.8rem,7vw,7.5rem)] leading-[0.86] tracking-[-0.06em]">
                Find your way
                <br />
                <span className="italic text-[#34382D]">to Luna.</span>
              </h2>
            </div>

            <div className="max-w-md lg:self-end lg:pb-2">
              <p className="text-sm leading-7 text-[#171410]/55 sm:text-base sm:leading-8">
                A quiet corner of the city for thoughtful food, warm service,
                and evenings worth taking your time over.
              </p>

              <div className="mt-6 flex items-center gap-3">
                <span className="h-px w-8 bg-[#9B7637]/70" />

                <span className="text-[8px] font-bold uppercase tracking-[0.28em] text-[#171410]/30">
                  New York · SoHo
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          WAYFINDING / CONTACT
      ===================================================== */}

      <div className="relative px-6 pb-20 sm:px-10 sm:pb-24 lg:px-14 lg:pb-32 xl:px-16">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid border-y border-[#171410]/10 lg:grid-cols-[1.12fr_0.88fr]">
            {/* =================================================
                LOCATION
            ================================================= */}

            <div className="relative overflow-hidden border-b border-[#171410]/10 py-12 sm:py-14 lg:border-b-0 lg:border-r lg:pr-16 lg:py-16">
              {/* Mobile atmosphere image */}
              <div
                aria-hidden="true"
                className="mb-10 h-56 w-full bg-cover bg-center opacity-90 sm:h-72 lg:hidden"
                style={{ backgroundImage: `url("${contactImage}")` }}
              />

              <div className="flex items-start justify-between gap-8">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#9B7637]">
                    The address
                  </p>

                  <h3 className="mt-5 font-serif text-[clamp(2.5rem,4vw,4.2rem)] leading-[0.95] tracking-[-0.04em]">
                    28 Mercer Street
                    <br />
                    <span className="italic text-[#34382D]">
                      New York, NY 10013
                    </span>
                  </h3>
                </div>

                <span className="hidden text-[8px] font-bold uppercase tracking-[0.2em] text-[#171410]/25 sm:block">
                  01 / Location
                </span>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=28%20Mercer%20Street%2C%20New%20York%2C%20NY%2010013"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-4 bg-[#34382D] px-7 py-4 text-[9px] font-bold uppercase tracking-[0.2em] text-[#F4EFE6] transition-colors duration-300 hover:bg-[#9B7637]"
                >
                  <span>Get Directions</span>

                  <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>

                <a
                  href="#reservation"
                  className="group inline-flex items-center gap-4 border border-[#171410]/15 px-7 py-4 text-[9px] font-bold uppercase tracking-[0.2em] text-[#34382D] transition-colors duration-300 hover:border-[#9B7637] hover:text-[#9B7637]"
                >
                  <span>Reserve a Table</span>

                  <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>

              {/* Editorial route line */}
              <div className="mt-14 flex items-center gap-5">
                <div className="relative h-px flex-1 bg-[#171410]/10">
                  <span className="absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#9B7637]" />
                </div>

                <span className="text-[8px] font-bold uppercase tracking-[0.24em] text-[#171410]/25">
                  Mercer Street
                </span>
              </div>

              {/* Contact details */}
              <div className="mt-12 grid gap-10 sm:grid-cols-2">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#9B7637]">
                    Reservations
                  </p>

                  <a
                    href="tel:+12125550188"
                    className="mt-4 block font-serif text-2xl text-[#171410] transition-colors hover:text-[#9B7637]"
                  >
                    +1 212 555 0188
                  </a>

                  <p className="mt-2 text-xs text-[#171410]/45">
                    Daily from 10:00 AM
                  </p>
                </div>

                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#9B7637]">
                    Email
                  </p>

                  <a
                    href="mailto:hello@lunabistro.com"
                    className="mt-4 block break-all font-serif text-xl text-[#171410] transition-colors hover:text-[#9B7637]"
                  >
                    hello@lunabistro.com
                  </a>

                  <p className="mt-2 text-xs text-[#171410]/45">
                    We would love to hear from you.
                  </p>
                </div>
              </div>
            </div>

            {/* =================================================
                HOURS / EVENING
            ================================================= */}

            <div className="relative overflow-hidden bg-[#34382D] px-6 py-12 text-[#F4EFE6] sm:px-10 sm:py-14 lg:px-14 lg:py-16">
              {/* Large ghost moon */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-[#E0BF7A]/10"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-[#E0BF7A]/[0.035]"
              />

              <div className="relative">
                <div className="flex items-start justify-between gap-8">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#E0BF7A]">
                      Opening Hours
                    </p>

                    <h3 className="mt-6 font-serif text-[clamp(2.8rem,4vw,4.4rem)] leading-[0.9] tracking-[-0.04em]">
                      Join us for
                      <br />
                      <span className="italic text-[#E0BF7A]">dinner.</span>
                    </h3>
                  </div>

                  <span className="hidden text-[8px] font-bold uppercase tracking-[0.2em] text-white/25 sm:block">
                    02 / Hours
                  </span>
                </div>

                <div className="mt-12 space-y-0">
                  <div className="flex items-end justify-between gap-6 border-b border-white/10 py-5">
                    <div>
                      <p className="text-sm text-white/75">
                        Monday — Thursday
                      </p>

                      <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-white/30">
                        Dinner Service
                      </p>
                    </div>

                    <p className="text-sm text-[#E0BF7A]">5:30 — 10:00</p>
                  </div>

                  <div className="flex items-end justify-between gap-6 border-b border-white/10 py-5">
                    <div>
                      <p className="text-sm text-white/75">
                        Friday — Saturday
                      </p>

                      <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-white/30">
                        Dinner Service
                      </p>
                    </div>

                    <p className="text-sm text-[#E0BF7A]">5:30 — 11:00</p>
                  </div>

                  <div className="flex items-end justify-between gap-6 py-5">
                    <div>
                      <p className="text-sm text-white/75">Sunday</p>

                      <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-white/30">
                        Restaurant Closed
                      </p>
                    </div>

                    <p className="text-sm text-white/35">Closed</p>
                  </div>
                </div>

                <div className="my-10 h-px bg-white/10" />

                <p className="max-w-sm text-sm leading-7 text-white/40">
                  For intimate dinners, celebrations, or a simple evening at
                  the table, our team is here to help.
                </p>

                <a
                  href="#reservation"
                  className="group mt-7 inline-flex items-center gap-4 text-[9px] font-bold uppercase tracking-[0.22em] text-[#E0BF7A]"
                >
                  <span className="border-b border-[#E0BF7A]/40 pb-2 transition-colors group-hover:border-white/40 group-hover:text-white">
                    Plan your evening
                  </span>

                  <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* =====================================================
              SOCIAL / FINAL STATEMENT
          ===================================================== */}

          <div className="grid gap-8 border-b border-[#171410]/10 py-9 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#9B7637]">
                Follow Luna
              </p>

              <div className="mt-4 flex flex-wrap gap-x-7 gap-y-3">
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#171410]/60 transition-colors hover:text-[#9B7637]"
                >
                  Instagram
                </a>

                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#171410]/60 transition-colors hover:text-[#9B7637]"
                >
                  Facebook
                </a>
              </div>
            </div>

            <p className="max-w-md font-serif text-xl italic leading-7 text-[#171410]/60 sm:text-right">
              Until we meet at Luna.
            </p>
          </div>

          {/* =====================================================
              FINAL WAYFINDING LINE
          ===================================================== */}

          <div className="flex flex-col justify-between gap-4 pt-7 sm:flex-row sm:items-center">
            <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-[#171410]/25">
              Contemporary Dining · Seasonal Cuisine
            </p>

            <a
              href="#top"
              className="group inline-flex items-center gap-3 text-[8px] font-bold uppercase tracking-[0.22em] text-[#171410]/40 transition-colors hover:text-[#9B7637]"
            >
              <span>Back to top</span>
              <span className="transition-transform group-hover:-translate-y-1">
                ↑
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
