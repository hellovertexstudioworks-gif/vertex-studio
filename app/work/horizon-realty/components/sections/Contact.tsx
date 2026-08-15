    export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#111719] py-28 sm:py-36"
    >
      {/* =====================================================
          DECORATIVE BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute -right-40 top-10 h-[30rem] w-[30rem] rounded-full border border-[#4FA7A1]/10" />

      <div className="pointer-events-none absolute -left-52 bottom-0 h-[34rem] w-[34rem] rounded-full border border-white/[0.04]" />

      <div className="pointer-events-none absolute right-20 top-1/2 h-2 w-2 rounded-full bg-[#4FA7A1]/60" />

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">

        {/* =================================================
            INTRO
        ================================================= */}

        <div className="max-w-4xl">

          {/* EYEBROW */}

          <div className="mb-7 flex items-center gap-4">

            <span className="h-px w-10 bg-[#4FA7A1]" />

            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#4FA7A1]">
              Start A Conversation
            </p>

          </div>

          {/* HEADING */}

          <h2 className="font-serif text-5xl leading-[0.92] tracking-[-0.045em] text-[#F2F3EF] sm:text-6xl lg:text-8xl">

            Ready to find

            <br />

            <span className="italic text-[#4FA7A1]">
              your next place?
            </span>

          </h2>

          {/* DESCRIPTION */}

          <p className="mt-8 max-w-2xl text-sm leading-7 text-white/55 sm:text-base sm:leading-8">
            Tell us what you're looking for and one of our property advisors
            will help you take the next step with confidence.
          </p>

        </div>

        {/* =================================================
            CONTACT GRID
        ================================================= */}

        <div className="mt-16 grid gap-12 border-t border-white/10 pt-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">

          {/* =================================================
              CONTACT DETAILS
          ================================================= */}

          <div>

            <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/35">
              Horizon Realty
            </p>

            <div className="mt-7 space-y-7">

              {/* EMAIL */}

              <div>

                <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#4FA7A1]">
                  Email
                </p>

                <a
                  href="mailto:hello@horizonrealty.com"
                  className="mt-2 block font-serif text-xl text-[#F2F3EF] transition-colors hover:text-[#4FA7A1]"
                >
                  hello@horizonrealty.com
                </a>

              </div>

              {/* PHONE */}

              <div>

                <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#4FA7A1]">
                  Phone
                </p>

                <a
                  href="tel:+13055550186"
                  className="mt-2 block font-serif text-xl text-[#F2F3EF] transition-colors hover:text-[#4FA7A1]"
                >
                  +1 (305) 555-0186
                </a>

              </div>

              {/* OFFICE */}

              <div>

                <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#4FA7A1]">
                  Office
                </p>

                <p className="mt-2 max-w-xs font-serif text-xl leading-relaxed text-[#F2F3EF]">
                  1200 Brickell Avenue
                  <br />
                  Miami, Florida 33131
                </p>

              </div>

            </div>

            {/* SMALL STATEMENT */}

            <div className="mt-12 border-t border-white/10 pt-7">

              <p className="font-serif text-2xl italic text-white/65">
                Let's find somewhere
                <br />
                worth coming home to.
              </p>

            </div>

          </div>

          {/* =================================================
              FORM
          ================================================= */}

          <div className="border border-white/10 bg-[#172022] p-6 sm:p-8 lg:p-10">

            <div className="mb-8">

              <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#4FA7A1]">
                Property Inquiry
              </p>

              <h3 className="mt-3 font-serif text-3xl text-[#F2F3EF]">
                Tell us what you're looking for.
              </h3>

            </div>

            <form className="space-y-6">

              {/* NAME + EMAIL */}

              <div className="grid gap-6 sm:grid-cols-2">

                <div>

                  <label
                    htmlFor="name"
                    className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/40"
                  >
                    Full Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    className="mt-3 h-12 w-full border-b border-white/15 bg-transparent px-0 text-sm text-[#F2F3EF] outline-none placeholder:text-white/25 focus:border-[#4FA7A1]"
                  />

                </div>

                <div>

                  <label
                    htmlFor="email"
                    className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/40"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className="mt-3 h-12 w-full border-b border-white/15 bg-transparent px-0 text-sm text-[#F2F3EF] outline-none placeholder:text-white/25 focus:border-[#4FA7A1]"
                  />

                </div>

              </div>

              {/* PHONE + INTEREST */}

              <div className="grid gap-6 sm:grid-cols-2">

                <div>

                  <label
                    htmlFor="phone"
                    className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/40"
                  >
                    Phone
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 (000) 000-0000"
                    className="mt-3 h-12 w-full border-b border-white/15 bg-transparent px-0 text-sm text-[#F2F3EF] outline-none placeholder:text-white/25 focus:border-[#4FA7A1]"
                  />

                </div>

                <div>

                  <label
                    htmlFor="interest"
                    className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/40"
                  >
                    I'm Interested In
                  </label>

                  <select
                    id="interest"
                    name="interest"
                    defaultValue=""
                    className="mt-3 h-12 w-full border-b border-white/15 bg-transparent px-0 text-sm text-[#F2F3EF] outline-none focus:border-[#4FA7A1]"
                  >
                    <option value="" disabled className="bg-[#172022]">
                      Select an option
                    </option>

                    <option value="buying" className="bg-[#172022]">
                      Buying a Property
                    </option>

                    <option value="selling" className="bg-[#172022]">
                      Selling a Property
                    </option>

                    <option value="investment" className="bg-[#172022]">
                      Property Investment
                    </option>

                    <option value="advisory" className="bg-[#172022]">
                      Property Advisory
                    </option>
                  </select>

                </div>

              </div>

              {/* MESSAGE */}

              <div>

                <label
                  htmlFor="message"
                  className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/40"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Tell us a little about what you're looking for..."
                  className="mt-3 w-full resize-none border-b border-white/15 bg-transparent px-0 py-3 text-sm leading-7 text-[#F2F3EF] outline-none placeholder:text-white/25 focus:border-[#4FA7A1]"
                />

              </div>

              {/* SUBMIT */}

              <button
                type="submit"
                className="group mt-3 flex h-14 w-full items-center justify-center gap-4 bg-[#4FA7A1] text-[9px] font-bold uppercase tracking-[0.22em] text-[#111719] transition-all duration-300 hover:bg-[#72BDB8]"
              >
                <span>Send Inquiry</span>

                <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>

            </form>

          </div>

        </div>

      </div>
    </section>
  );
}