"use client";

import { useState } from "react";
import Container from "../ui/Container";

const navItems = [
  { label: "ABOUT", href: "#about" },
  { label: "PROGRAMS", href: "#programs" },
  { label: "PROCESS", href: "#process" },
  { label: "RESULTS", href: "#results" },
  { label: "TESTIMONIALS", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "CONTACT", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="relative z-50 bg-[#111110]">
      {/* Main Navbar */}

      <Container>
        <div className="flex min-h-[76px] items-center justify-between py-3 sm:min-h-[88px] sm:py-4 lg:h-[96px] lg:py-0">
          {/* LOGO */}

          <a
            href="#home"
            onClick={closeMenu}
            className="group flex shrink-0 flex-col leading-none"
          >
            <span className="text-[27px] font-semibold tracking-[-0.045em] text-white transition-colors duration-300 group-hover:text-[#d7bd91] sm:text-[34px] lg:text-[38px]">
              ELEVATE
            </span>

            <span className="mt-1.5 flex items-center gap-2 text-[8px] font-medium uppercase tracking-[0.42em] text-[#d7bd91] sm:text-[10px]">
              <span className="h-px w-5 bg-[#d7bd91] sm:w-6" />

              COACHING

              <span className="h-px w-5 bg-[#d7bd91] sm:w-6" />
            </span>
          </a>

          {/* DESKTOP NAV */}

          <nav className="hidden items-center gap-6 xl:flex 2xl:gap-7">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative py-2 text-[9px] font-medium tracking-[0.16em] text-white/65 transition-colors duration-300 hover:text-white"
              >
                {item.label}

                <span className="absolute bottom-0 left-0 h-px w-0 bg-[#d7bd91] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* DESKTOP CTA */}

          <a
            href="#contact"
            className="hidden shrink-0 items-center justify-center bg-[#d7bd91] px-7 py-4 text-[9px] font-bold uppercase tracking-[0.18em] text-[#111110] transition-all duration-300 hover:bg-[#ead6b2] xl:inline-flex"
          >
            BOOK A SESSION
          </a>

          {/* MOBILE MENU BUTTON */}

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="flex h-11 w-11 items-center justify-center border border-white/20 text-white transition-colors duration-300 hover:border-[#d7bd91] hover:text-[#d7bd91] xl:hidden"
          >
            <span className="flex w-5 flex-col gap-1.5">
              <span
                className={`block h-px w-full bg-current transition-transform duration-300 ${
                  menuOpen ? "translate-y-[4px] rotate-45" : ""
                }`}
              />

              <span
                className={`block h-px w-full bg-current transition-opacity duration-300 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />

              <span
                className={`block h-px w-full bg-current transition-transform duration-300 ${
                  menuOpen ? "-translate-y-[4px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </Container>

      {/* MOBILE MENU */}

      <div
        className={`overflow-hidden border-t border-white/10 bg-[#111110] transition-all duration-300 xl:hidden ${
          menuOpen
            ? "max-h-[700px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <Container>
          <nav className="py-5 sm:py-6">
            <div className="flex flex-col">
              {navItems.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="group flex items-center border-b border-white/10 py-5 text-xs font-semibold tracking-[0.2em] text-white/80 transition-colors duration-300 hover:text-white"
                >
                  {/* Number */}

                  <span className="mr-5 w-5 shrink-0 text-[9px] font-semibold tracking-[0.18em] text-[#d7bd91]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Label */}

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    {item.label}
                  </span>
                </a>
              ))}
            </div>

            {/* Mobile CTA */}

            <a
              href="#contact"
              onClick={closeMenu}
              className="mt-6 flex w-full items-center justify-center bg-[#d7bd91] px-6 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-[#111110] transition-colors duration-300 hover:bg-[#ead6b2]"
            >
              BOOK A SESSION
            </a>
          </nav>
        </Container>
      </div>
    </header>
  );
}