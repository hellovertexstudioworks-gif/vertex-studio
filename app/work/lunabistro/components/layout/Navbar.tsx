"use client";

import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0B0A08]/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-10">

        {/* =====================================================
            LOGO
        ===================================================== */}
        <a
          href="#top"
          onClick={closeMenu}
          className="font-serif text-xl tracking-[-0.02em] text-[#F4EFE6] transition-colors duration-300 hover:text-[#E0BF7A]"
        >
          LUNA BISTRO
        </a>

        {/* =====================================================
            DESKTOP NAVIGATION
        ===================================================== */}
        <nav className="hidden items-center gap-8 md:flex">

          <a
            href="#story"
            className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#A8A198] transition-colors duration-300 hover:text-[#C9A15A]"
          >
            Our Story
          </a>

          <a
            href="#menu"
            className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#A8A198] transition-colors duration-300 hover:text-[#C9A15A]"
          >
            Menu
          </a>

          <a
            href="#experience"
            className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#A8A198] transition-colors duration-300 hover:text-[#C9A15A]"
          >
            Experience
          </a>

          <a
            href="#gallery"
            className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#A8A198] transition-colors duration-300 hover:text-[#C9A15A]"
          >
            Gallery
          </a>

          <a
            href="#contact"
            className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#A8A198] transition-colors duration-300 hover:text-[#C9A15A]"
          >
            Contact
          </a>

        </nav>

        {/* =====================================================
            DESKTOP RESERVATION BUTTON
        ===================================================== */}
        <a
          href="#reservation"
          className="hidden border border-[#C9A15A] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#C9A15A] transition-all duration-300 hover:bg-[#C9A15A] hover:text-[#0B0A08] md:block"
        >
          Reserve a Table
        </a>

        {/* =====================================================
            MOBILE MENU BUTTON
        ===================================================== */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center justify-center border border-white/15 text-[#E0BF7A] transition-colors duration-300 hover:border-[#C9A15A] md:hidden"
        >
          <div className="flex w-4 flex-col gap-1.5">

            <span
              className={`h-px w-full bg-current transition-transform duration-300 ${
                menuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />

            <span
              className={`h-px w-full bg-current transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />

            <span
              className={`h-px w-full bg-current transition-transform duration-300 ${
                menuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />

          </div>
        </button>

      </div>

      {/* =====================================================
          MOBILE NAVIGATION
      ===================================================== */}
      <div
        className={`overflow-hidden border-t border-white/10 bg-[#0B0A08] transition-all duration-300 md:hidden ${
          menuOpen
            ? "max-h-[500px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl flex-col px-6 py-6 sm:px-8">

          <a
            href="#story"
            onClick={closeMenu}
            className="border-b border-white/10 py-4 text-[11px] font-medium uppercase tracking-[0.18em] text-[#A8A198] transition-colors hover:text-[#E0BF7A]"
          >
            Our Story
          </a>

          <a
            href="#menu"
            onClick={closeMenu}
            className="border-b border-white/10 py-4 text-[11px] font-medium uppercase tracking-[0.18em] text-[#A8A198] transition-colors hover:text-[#E0BF7A]"
          >
            Menu
          </a>

          <a
            href="#experience"
            onClick={closeMenu}
            className="border-b border-white/10 py-4 text-[11px] font-medium uppercase tracking-[0.18em] text-[#A8A198] transition-colors hover:text-[#E0BF7A]"
          >
            Experience
          </a>

          <a
            href="#gallery"
            onClick={closeMenu}
            className="border-b border-white/10 py-4 text-[11px] font-medium uppercase tracking-[0.18em] text-[#A8A198] transition-colors hover:text-[#E0BF7A]"
          >
            Gallery
          </a>

          <a
            href="#contact"
            onClick={closeMenu}
            className="border-b border-white/10 py-4 text-[11px] font-medium uppercase tracking-[0.18em] text-[#A8A198] transition-colors hover:text-[#E0BF7A]"
          >
            Contact
          </a>

          {/* MOBILE RESERVATION */}
          <a
            href="#reservation"
            onClick={closeMenu}
            className="mt-6 flex h-12 items-center justify-center bg-[#E0BF7A] text-[10px] font-bold uppercase tracking-[0.2em] text-[#171410] transition-colors duration-300 hover:bg-[#C9A15A]"
          >
            Reserve a Table
          </a>

        </nav>
      </div>
    </header>
  );
}