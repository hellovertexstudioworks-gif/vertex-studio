const footerLinks = {
  explore: [
    { label: "Properties", href: "#properties" },
    { label: "About Horizon", href: "#about" },
    { label: "Our Services", href: "#services" },
    { label: "Our Agents", href: "#agents" },
  ],
  connect: [
    { label: "Instagram", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "Facebook", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#071011] text-[#F2F3EF]">

      {/* =====================================================
          DECORATIVE BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full border border-[#4FA7A1]/10" />

      <div className="pointer-events-none absolute -left-52 bottom-10 h-[28rem] w-[28rem] rounded-full border border-white/[0.03]" />

      {/* =====================================================
          MAIN FOOTER
      ===================================================== */}

      <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10 lg:py-24">

        {/* =================================================
            TOP
        ================================================= */}

        <div className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">

          {/* BRAND */}

          <div className="max-w-sm">

            <a
              href="#home"
              className="font-serif text-3xl tracking-[-0.04em]"
            >
              Horizon
              <span className="ml-1 italic text-[#4FA7A1]">
                Realty.
              </span>
            </a>

            <p className="mt-6 text-sm leading-7 text-white/45">
              Exceptional properties, thoughtful guidance, and a better way
              to find the place you'll call home.
            </p>

            <a
              href="#contact"
              className="group mt-8 inline-flex items-center gap-4 text-[9px] font-bold uppercase tracking-[0.22em] text-[#F2F3EF] transition-colors duration-300 hover:text-[#4FA7A1]"
            >
              <span className="border-b border-white/20 pb-2 transition-colors duration-300 group-hover:border-[#4FA7A1]">
                Start A Conversation
              </span>

              <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>

          </div>

          {/* EXPLORE */}

          <div>

            <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-[#4FA7A1]">
              Explore
            </p>

            <nav className="mt-6 flex flex-col gap-4">

              {footerLinks.explore.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="w-fit text-sm text-white/50 transition-colors duration-300 hover:text-[#F2F3EF]"
                >
                  {link.label}
                </a>
              ))}

            </nav>

          </div>

          {/* CONNECT */}

          <div>

            <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-[#4FA7A1]">
              Connect
            </p>

            <nav className="mt-6 flex flex-col gap-4">

              {footerLinks.connect.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="w-fit text-sm text-white/50 transition-colors duration-300 hover:text-[#F2F3EF]"
                >
                  {link.label}
                </a>
              ))}

            </nav>

          </div>

          {/* CONTACT */}

          <div>

            <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-[#4FA7A1]">
              Contact
            </p>

            <div className="mt-6 space-y-4">

              <a
                href="mailto:hello@horizonrealty.com"
                className="block text-sm text-white/50 transition-colors duration-300 hover:text-[#F2F3EF]"
              >
                hello@horizonrealty.com
              </a>

              <a
                href="tel:+13055550186"
                className="block text-sm text-white/50 transition-colors duration-300 hover:text-[#F2F3EF]"
              >
                +1 (305) 555-0186
              </a>

              <p className="text-sm leading-6 text-white/50">
                1200 Brickell Avenue
                <br />
                Miami, Florida 33131
              </p>

            </div>

          </div>

        </div>

        {/* =================================================
            LARGE BRAND STATEMENT
        ================================================= */}

        <div className="mt-20 border-y border-white/10 py-10 sm:mt-24 sm:py-12">

          <p className="max-w-4xl font-serif text-3xl leading-tight tracking-[-0.025em] text-white/80 sm:text-4xl lg:text-5xl">
            Find somewhere
            <span className="italic text-[#4FA7A1]">
              {" "}worth coming home to.
            </span>
          </p>

        </div>

        {/* =================================================
            BOTTOM BAR
        ================================================= */}

        <div className="flex flex-col justify-between gap-5 pt-8 text-[8px] font-semibold uppercase tracking-[0.2em] text-white/30 sm:flex-row sm:items-center">

          <p>
            © 2026 Horizon Realty. All rights reserved.
          </p>

          <div className="flex gap-6">

            <a
              href="#"
              className="transition-colors hover:text-white/70"
            >
              Privacy
            </a>

            <a
              href="#"
              className="transition-colors hover:text-white/70"
            >
              Terms
            </a>

          </div>

        </div>

      </div>
    </footer>
  );
}