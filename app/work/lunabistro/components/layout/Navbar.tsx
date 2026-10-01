// TASK: Replace app/work/lunabistro/components/layout/Navbar.tsx with this file.

"use client";

import { useEffect, useState } from "react";

const navItems = [
  { label: "Our Story", href: "#story" },
  { label: "Menu", href: "#menu" },
  { label: "Experience", href: "#experience" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navItems
        .map((item) => document.querySelector(item.href))
        .filter(Boolean);

      let currentSection = "";

      sections.forEach((section) => {
        if (!section) return;

        const rect = section.getBoundingClientRect();

        if (rect.top <= 150 && rect.bottom >= 150) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      {/* =====================================================
          MAIN NAVBAR
      ===================================================== */}

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
          scrolled
            ? "border-b border-white/[0.08] bg-[#0B0A08]/95 backdrop-blur-xl"
            : "border-b border-white/[0.07] bg-[#0B0A08]/75 backdrop-blur-md"
        }`}
      >
        <div
          className={`mx-auto flex max-w-[1440px] items-center justify-between px-7 transition-all duration-700 sm:px-10 lg:px-14 xl:px-16 ${
            scrolled ? "h-[78px]" : "h-[96px]"
          }`}
        >
          {/* =================================================
              LOGO / WORDMARK
          ================================================= */}

          <a
            href="#top"
            onClick={closeMenu}
            aria-label="Luna Bistro home"
            className="group flex items-center gap-4"
          >
            {/* LUNA MARK */}

            <span
              aria-hidden="true"
              className={`relative flex shrink-0 items-center justify-center rounded-full border border-[#C9A15A]/70 transition-all duration-700 ${
                scrolled ? "h-9 w-9" : "h-11 w-11"
              } group-hover:rotate-12 group-hover:border-[#E0BF7A]`}
            >
              <span
                className={`relative overflow-hidden rounded-full transition-all duration-700 ${
                  scrolled ? "h-[18px] w-[18px]" : "h-[22px] w-[22px]"
                }`}
              >
                <span className="absolute inset-0 rounded-full bg-[#E0BF7A]" />

                <span className="absolute -right-2 -top-1 h-6 w-6 rounded-full bg-[#0B0A08]" />
              </span>
            </span>

            {/* WORDMARK */}

            <span className="flex flex-col leading-none">
              <span
                className={`font-serif tracking-[0.015em] text-[#F4EFE6] transition-all duration-700 group-hover:text-[#E0BF7A] ${
                  scrolled
                    ? "text-[20px]"
                    : "text-[23px]"
                }`}
              >
                LUNA
              </span>

              <span
                className={`mt-1 font-sans font-semibold uppercase tracking-[0.34em] text-white/45 transition-all duration-700 ${
                  scrolled
                    ? "text-[7px]"
                    : "text-[8px]"
                }`}
              >
                Bistro
              </span>
            </span>
          </a>

          {/* =================================================
              DESKTOP NAVIGATION
          ================================================= */}

          <nav
            aria-label="Main navigation"
            className="hidden items-center md:flex"
          >
            <div
              className={`flex items-center transition-all duration-700 ${
                scrolled
                  ? "gap-8 lg:gap-9"
                  : "gap-9 lg:gap-11"
              }`}
            >
              {navItems.map((item) => {
                const sectionId = item.href.replace("#", "");
                const isActive = activeSection === sectionId;

                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`group relative py-3 font-sans font-semibold uppercase tracking-[0.16em] transition-all duration-500 ${
                      scrolled
                        ? "text-[10px]"
                        : "text-[11px]"
                    } ${
                      isActive
                        ? "text-[#E0BF7A]"
                        : "text-white/55 hover:text-[#F4EFE6]"
                    }`}
                  >
                    {item.label}

                    <span
                      className={`absolute -bottom-0.5 left-0 h-px bg-[#E0BF7A] transition-all duration-500 ${
                        isActive
                          ? "w-full opacity-100"
                          : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                      }`}
                    />
                  </a>
                );
              })}
            </div>
          </nav>

          {/* =================================================
              DESKTOP RESERVATION BUTTON
          ================================================= */}

          <a
            href="#reservation"
            className={`group hidden items-center justify-center gap-3 border border-[#C9A15A]/75 font-sans font-bold uppercase tracking-[0.2em] text-[#E0BF7A] transition-all duration-700 hover:border-[#E0BF7A] hover:bg-[#E0BF7A] hover:text-[#0B0A08] md:inline-flex ${
              scrolled
                ? "h-11 px-6 text-[9px]"
                : "h-12 px-7 text-[10px]"
            }`}
          >
            <span>Reserve a Table</span>

            <span className="text-sm transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>

          {/* =================================================
              MOBILE MENU BUTTON
          ================================================= */}

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className={`relative z-[70] flex h-11 w-11 items-center justify-center border transition-all duration-500 md:hidden ${
              menuOpen
                ? "border-[#E0BF7A] text-[#E0BF7A]"
                : "border-white/20 text-[#E0BF7A] hover:border-[#C9A15A]"
            }`}
          >
            <span className="relative flex h-5 w-5 flex-col justify-center">
              <span
                className={`absolute left-0 h-px w-full bg-current transition-all duration-500 ${
                  menuOpen
                    ? "top-1/2 rotate-45"
                    : "top-0"
                }`}
              />

              <span
                className={`absolute left-0 top-1/2 h-px w-full bg-current transition-all duration-300 ${
                  menuOpen
                    ? "scale-x-0 opacity-0"
                    : "scale-x-100 opacity-100"
                }`}
              />

              <span
                className={`absolute left-0 h-px w-full bg-current transition-all duration-500 ${
                  menuOpen
                    ? "top-1/2 -rotate-45"
                    : "bottom-0"
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      {/* =====================================================
          MOBILE NAVIGATION
      ===================================================== */}

      <div
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-40 flex flex-col bg-[#0B0A08] transition-all duration-700 md:hidden ${
          menuOpen
            ? "pointer-events-auto visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        }`}
      >
        {/* TOP SPACE */}

        <div className="h-24 shrink-0 border-b border-white/[0.07]" />

        {/* MOBILE CONTENT */}

        <div className="flex flex-1 flex-col overflow-y-auto px-7 py-9 sm:px-9">
          {/* EYEBROW */}

          <div className="mb-10 flex items-center gap-4">
            <span className="h-px w-10 bg-[#C9A15A]" />

            <p className="text-[9px] font-bold uppercase tracking-[0.32em] text-[#E0BF7A]">
              Discover Luna
            </p>
          </div>

          {/* NAVIGATION */}

          <nav
            aria-label="Mobile navigation"
            className="flex flex-col"
          >
            {navItems.map((item, index) => {
              const sectionId = item.href.replace("#", "");
              const isActive = activeSection === sectionId;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className={`group flex items-center border-b border-white/[0.08] py-6 transition-all duration-500 ${
                    menuOpen
                      ? "translate-y-0 opacity-100"
                      : "translate-y-5 opacity-0"
                  }`}
                  style={{
                    transitionDelay: menuOpen
                      ? `${100 + index * 65}ms`
                      : "0ms",
                  }}
                >
                  <span className="mr-6 text-[10px] font-medium tracking-[0.22em] text-white/20 transition-colors duration-300 group-hover:text-[#E0BF7A]">
                    0{index + 1}
                  </span>

                  <span
                    className={`font-serif text-[2rem] tracking-[-0.025em] transition-colors duration-300 ${
                      isActive
                        ? "text-[#E0BF7A]"
                        : "text-[#F4EFE6] group-hover:text-[#E0BF7A]"
                    }`}
                  >
                    {item.label}
                  </span>

                  <span className="ml-auto text-xl text-white/20 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#E0BF7A]">
                    →
                  </span>
                </a>
              );
            })}
          </nav>

          {/* MOBILE CTA */}

          <div
            className={`mt-auto pt-9 transition-all duration-700 ${
              menuOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0"
            }`}
            style={{
              transitionDelay: menuOpen ? "450ms" : "0ms",
            }}
          >
            <a
              href="#reservation"
              onClick={closeMenu}
              className="group flex h-16 w-full items-center justify-center gap-4 bg-[#E0BF7A] text-[10px] font-bold uppercase tracking-[0.22em] text-[#171410] transition-colors duration-300 hover:bg-[#C9A15A]"
            >
              <span>Reserve a Table</span>

              <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>

          {/* MOBILE FOOT NOTE */}

          <div className="mt-7 flex items-center justify-between">
            <p className="text-[8px] font-medium uppercase tracking-[0.24em] text-white/20">
              Contemporary Dining
            </p>

            <p className="text-[8px] font-medium uppercase tracking-[0.24em] text-white/20">
              Seasonal Cuisine
            </p>
          </div>
        </div>
      </div>
    </>
  );
}