export default function Reservation() {
  return (
    <section
      id="reservation"
      className="relative overflow-hidden bg-[#211812] py-24 text-[#F4EFE6] sm:py-28 lg:py-36"
    >
      {/* =====================================================
          BACKGROUND DECORATION
      ===================================================== */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full border border-[#C9A15A]/10" />

      <div className="pointer-events-none absolute -right-48 bottom-0 h-[32rem] w-[32rem] rounded-full border border-white/[0.04]" />

      <div className="pointer-events-none absolute right-20 top-20 h-24 w-24 rounded-full bg-[#C9A15A]/[0.04]" />

      {/* =====================================================
          CONTENT
      ===================================================== */}
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">

        {/* =====================================================
            HEADER
        ===================================================== */}
        <div className="grid gap-10 lg:grid-cols-[1fr_0.65fr] lg:items-end">

          <div>

            {/* EYEBROW */}
            <div className="mb-7 flex items-center gap-4">
              <span className="h-px w-10 bg-[#E0BF7A]" />

              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#E0BF7A]">
                Reservations
              </p>
            </div>

            {/* HEADING */}
            <h2 className="font-serif text-5xl leading-[0.94] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Your table
              <br />

              <span className="italic text-[#E0BF7A]">
                awaits.
              </span>
            </h2>

          </div>

          <p className="max-w-md text-sm leading-7 text-white/50 sm:text-base sm:leading-8 lg:pb-2">
            Join us for an evening of thoughtful cuisine, warm hospitality,
            and unforgettable moments at Luna Bistro.
          </p>

        </div>

        {/* =====================================================
            RESERVATION AREA
        ===================================================== */}
        <div className="mt-16 grid border-y border-white/10 lg:grid-cols-[1fr_0.38fr]">

          {/* =================================================
              FORM
          ================================================= */}
          <div className="py-10 lg:pr-16 lg:py-14">

            <div className="mb-10">

              <p className="font-serif text-2xl text-[#F4EFE6]">
                Request a reservation
              </p>

              <p className="mt-2 text-sm text-white/35">
                Complete the details below and our team will confirm your
                table.
              </p>

            </div>

            <form className="space-y-8">

              {/* NAME + EMAIL */}
              <div className="grid gap-8 sm:grid-cols-2">

                <div>

                  <label
                    htmlFor="name"
                    className="mb-3 block text-[9px] font-bold uppercase tracking-[0.22em] text-white/45"
                  >
                    Full Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    className="h-12 w-full border-b border-white/15 bg-transparent px-0 text-sm text-white outline-none placeholder:text-white/20 transition-colors focus:border-[#E0BF7A]"
                  />

                </div>

                <div>

                  <label
                    htmlFor="email"
                    className="mb-3 block text-[9px] font-bold uppercase tracking-[0.22em] text-white/45"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className="h-12 w-full border-b border-white/15 bg-transparent px-0 text-sm text-white outline-none placeholder:text-white/20 transition-colors focus:border-[#E0BF7A]"
                  />

                </div>

              </div>

              {/* DATE + TIME */}
              <div className="grid gap-8 sm:grid-cols-2">

                <div>

                  <label
                    htmlFor="date"
                    className="mb-3 block text-[9px] font-bold uppercase tracking-[0.22em] text-white/45"
                  >
                    Date
                  </label>

                  <input
                    id="date"
                    name="date"
                    type="date"
                    className="h-12 w-full border-b border-white/15 bg-transparent px-0 text-sm text-white outline-none transition-colors focus:border-[#E0BF7A]"
                  />

                </div>

                <div>

                  <label
                    htmlFor="time"
                    className="mb-3 block text-[9px] font-bold uppercase tracking-[0.22em] text-white/45"
                  >
                    Preferred Time
                  </label>

                  <select
                    id="time"
                    name="time"
                    defaultValue=""
                    className="h-12 w-full border-b border-white/15 bg-[#211812] px-0 text-sm text-white/70 outline-none transition-colors focus:border-[#E0BF7A]"
                  >
                    <option value="" disabled>
                      Select a time
                    </option>

                    <option value="5:30 PM">5:30 PM</option>
                    <option value="6:00 PM">6:00 PM</option>
                    <option value="6:30 PM">6:30 PM</option>
                    <option value="7:00 PM">7:00 PM</option>
                    <option value="7:30 PM">7:30 PM</option>
                    <option value="8:00 PM">8:00 PM</option>
                    <option value="8:30 PM">8:30 PM</option>
                    <option value="9:00 PM">9:00 PM</option>
                  </select>

                </div>

              </div>

              {/* GUESTS + OCCASION */}
              <div className="grid gap-8 sm:grid-cols-2">

                <div>

                  <label
                    htmlFor="guests"
                    className="mb-3 block text-[9px] font-bold uppercase tracking-[0.22em] text-white/45"
                  >
                    Guests
                  </label>

                  <select
                    id="guests"
                    name="guests"
                    defaultValue=""
                    className="h-12 w-full border-b border-white/15 bg-[#211812] px-0 text-sm text-white/70 outline-none transition-colors focus:border-[#E0BF7A]"
                  >
                    <option value="" disabled>
                      Number of guests
                    </option>

                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5">5 Guests</option>
                    <option value="6">6 Guests</option>
                    <option value="7">7 Guests</option>
                    <option value="8">8 Guests</option>
                  </select>

                </div>

                <div>

                  <label
                    htmlFor="occasion"
                    className="mb-3 block text-[9px] font-bold uppercase tracking-[0.22em] text-white/45"
                  >
                    Occasion
                  </label>

                  <select
                    id="occasion"
                    name="occasion"
                    defaultValue=""
                    className="h-12 w-full border-b border-white/15 bg-[#211812] px-0 text-sm text-white/70 outline-none transition-colors focus:border-[#E0BF7A]"
                  >
                    <option value="" disabled>
                      Select an occasion
                    </option>

                    <option value="Dinner">Dinner</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Celebration">Celebration</option>
                    <option value="Business Dinner">
                      Business Dinner
                    </option>
                  </select>

                </div>

              </div>

              {/* SPECIAL REQUESTS */}
              <div>

                <label
                  htmlFor="message"
                  className="mb-3 block text-[9px] font-bold uppercase tracking-[0.22em] text-white/45"
                >
                  Special Requests
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  placeholder="Tell us anything we should know..."
                  className="w-full resize-none border-b border-white/15 bg-transparent px-0 py-3 text-sm text-white outline-none placeholder:text-white/20 transition-colors focus:border-[#E0BF7A]"
                />

              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                className="group inline-flex h-14 items-center justify-center gap-4 bg-[#E0BF7A] px-8 text-[10px] font-bold uppercase tracking-[0.2em] text-[#171410] transition-all duration-300 hover:bg-[#C9A15A]"
              >
                <span>
                  Request Reservation
                </span>

                <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>

            </form>

          </div>

          {/* =================================================
              RESTAURANT DETAILS
          ================================================= */}
          <aside className="border-t border-white/10 py-10 lg:border-l lg:border-t-0 lg:py-14 lg:pl-12">

            {/* OPENING HOURS */}
            <div>

              <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#E0BF7A]">
                Opening Hours
              </p>

              <div className="mt-6 space-y-4">

                <div className="flex justify-between gap-6 border-b border-white/10 pb-4">
                  <span className="text-sm text-white/45">
                    Monday — Thursday
                  </span>

                  <span className="text-sm text-white/75">
                    5:30 — 10:00
                  </span>
                </div>

                <div className="flex justify-between gap-6 border-b border-white/10 pb-4">
                  <span className="text-sm text-white/45">
                    Friday — Saturday
                  </span>

                  <span className="text-sm text-white/75">
                    5:30 — 11:00
                  </span>
                </div>

                <div className="flex justify-between gap-6">
                  <span className="text-sm text-white/45">
                    Sunday
                  </span>

                  <span className="text-sm text-white/75">
                    Closed
                  </span>
                </div>

              </div>

            </div>

            {/* DIVIDER */}
            <div className="my-12 h-px bg-white/10" />

            {/* LOCATION */}
            <div>

              <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#E0BF7A]">
                Visit Luna
              </p>

              <p className="mt-6 font-serif text-xl leading-relaxed text-white/80">
                28 Mercer Street
                <br />
                New York, NY 10013
              </p>

              <a
                href="#contact"
                className="mt-5 inline-flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.2em] text-[#E0BF7A] transition-colors hover:text-white"
              >
                Get Directions
                <span className="text-sm">
                  →
                </span>
              </a>

            </div>

            {/* DIVIDER */}
            <div className="my-12 h-px bg-white/10" />

            {/* PHONE */}
            <div>

              <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#E0BF7A]">
                Reservations
              </p>

              <a
                href="tel:+12125550188"
                className="mt-5 block font-serif text-2xl text-white/80 transition-colors hover:text-[#E0BF7A]"
              >
                +1 212 555 0188
              </a>

              <p className="mt-3 text-xs leading-6 text-white/30">
                For parties of 9 or more, please contact our team directly.
              </p>

            </div>

          </aside>

        </div>

        {/* =====================================================
            BOTTOM NOTE
        ===================================================== */}
        <div className="mt-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

          <p className="text-[8px] font-medium uppercase tracking-[0.22em] text-white/25">
            Reservations are subject to availability
          </p>

          <p className="font-serif text-sm italic text-white/35">
            We look forward to welcoming you.
          </p>

        </div>

      </div>
    </section>
  );
}