import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
  HardHat,
} from "lucide-react";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Why Us", href: "#why-us" },
  { label: "Contact", href: "#contact" },
];

const services = [
  "General Contracting",
  "Commercial Construction",
  "Residential Construction",
  "Renovation & Remodeling",
  "Project Management",
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#080a0b] text-white">

      {/* =====================================================
          DECORATIVE BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0">

        {/* Large background word */}

        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-[18vw] font-black uppercase leading-none tracking-[-0.08em] text-white/[0.018]">
          FORGEBUILD
        </div>

        {/* Orange glow */}

        <div className="absolute -right-40 top-20 h-[400px] w-[400px] rounded-full bg-orange-500/[0.025] blur-3xl" />
      </div>

      {/* =====================================================
          MAIN FOOTER
      ===================================================== */}

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        {/* =====================================================
            TOP BRAND STATEMENT
        ===================================================== */}

        <div className="border-b border-white/10 py-16 lg:py-20">

          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">

            {/* Brand */}

            <div>

              <div className="mb-6 flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center bg-orange-500">
                  <HardHat
                    size={21}
                    strokeWidth={2}
                    className="text-black"
                  />
                </div>

                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-500">
                    Construction
                  </p>

                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-white/30">
                    Built With Purpose
                  </p>
                </div>

              </div>

              <h2 className="max-w-4xl text-4xl font-black uppercase leading-[0.9] tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">
                Building What
                <br />
                <span className="text-orange-500">
                  Matters.
                </span>
              </h2>

            </div>

            {/* CTA */}

            <Link
              href="#contact"
              className="group inline-flex items-center justify-center gap-3 bg-orange-500 px-6 py-4 text-sm font-black uppercase tracking-wide text-black transition-all duration-300 hover:-translate-y-1 hover:bg-orange-400"
            >
              Start Your Project

              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>

          </div>

        </div>

        {/* =====================================================
            FOOTER COLUMNS
        ===================================================== */}

        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:py-20">

          {/* =================================================
              BRAND
          ================================================= */}

          <div>

            <Link
              href="#home"
              className="inline-block"
            >
              <div className="text-2xl font-black tracking-[-0.03em]">
                FORGEBUILD
              </div>

              <div className="mt-1 text-[10px] font-bold tracking-[0.3em] text-orange-500">
                CONSTRUCTION
              </div>
            </Link>

            <p className="mt-7 max-w-sm text-sm leading-7 text-white/40">
              Building with purpose, precision, and
              integrity. Quality construction for homes,
              businesses, and developments.
            </p>

            <Link
              href="#contact"
              className="group mt-7 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.12em] text-white transition-colors hover:text-orange-500"
            >
              Start Your Project

              <ArrowUpRight
                size={16}
                className="text-orange-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>

          </div>

          {/* =================================================
              QUICK LINKS
          ================================================= */}

          <div>

            <h3 className="text-xs font-black uppercase tracking-[0.18em] text-orange-500">
              Explore
            </h3>

            <ul className="mt-7 space-y-4">

              {quickLinks.map((item) => (
                <li key={item.href}>

                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-sm text-white/45 transition-colors duration-300 hover:text-white"
                  >
                    <span className="h-px w-0 bg-orange-500 transition-all duration-300 group-hover:w-3" />

                    {item.label}
                  </Link>

                </li>
              ))}

            </ul>

          </div>

          {/* =================================================
              SERVICES
          ================================================= */}

          <div>

            <h3 className="text-xs font-black uppercase tracking-[0.18em] text-orange-500">
              Services
            </h3>

            <ul className="mt-7 space-y-4">

              {services.map((service) => (
                <li
                  key={service}
                  className="text-sm leading-6 text-white/45"
                >
                  {service}
                </li>
              ))}

            </ul>

          </div>

          {/* =================================================
              CONTACT
          ================================================= */}

          <div>

            <h3 className="text-xs font-black uppercase tracking-[0.18em] text-orange-500">
              Contact
            </h3>

            <div className="mt-7 space-y-6">

              {/* Location */}

              <div className="flex gap-3">

                <MapPin
                  size={18}
                  strokeWidth={1.8}
                  className="mt-0.5 shrink-0 text-orange-500"
                />

                <span className="text-sm leading-6 text-white/45">
                  Davao City,
                  <br />
                  Philippines
                </span>

              </div>

              {/* Phone */}

              <a
                href="tel:+639001234567"
                className="group flex items-center gap-3"
              >

                <Phone
                  size={18}
                  strokeWidth={1.8}
                  className="shrink-0 text-orange-500"
                />

                <span className="text-sm text-white/45 transition-colors group-hover:text-white">
                  +63 900 123 4567
                </span>

              </a>

              {/* Email */}

              <a
                href="mailto:hello@forgebuild.com"
                className="group flex items-center gap-3"
              >

                <Mail
                  size={18}
                  strokeWidth={1.8}
                  className="shrink-0 text-orange-500"
                />

                <span className="text-sm text-white/45 transition-colors group-hover:text-white">
                  hello@forgebuild.com
                </span>

              </a>

            </div>

          </div>

        </div>

        {/* =====================================================
            BOTTOM BAR
        ===================================================== */}

        <div className="flex flex-col gap-5 border-t border-white/10 py-7 sm:flex-row sm:items-center sm:justify-between">

          {/* Copyright */}

          <p className="text-xs text-white/25">
            © 2026 ForgeBuild Construction. All rights
            reserved.
          </p>

          {/* Center */}

          <div className="flex items-center gap-3">

            <span className="h-2 w-2 bg-orange-500" />

            <span className="text-[10px] font-black uppercase tracking-[0.16em] text-white/30">
              Quality
            </span>

            <span className="text-white/15">
              /
            </span>

            <span className="text-[10px] font-black uppercase tracking-[0.16em] text-white/30">
              Trust
            </span>

            <span className="text-white/15">
              /
            </span>

            <span className="text-[10px] font-black uppercase tracking-[0.16em] text-white/30">
              Results
            </span>

          </div>

          {/* Right */}

          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/20">
            Built With Purpose.
          </p>

        </div>

      </div>
    </footer>
  );
}