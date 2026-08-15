"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";

const navItems = [
  {
    label: "Home",
    href: "#home",
  },
  {
    label: "About",
    href: "#about",
  },
  {
    label: "Services",
    href: "#services",
  },
  {
    label: "Projects",
    href: "#projects",
  },
  {
    label: "Why Us",
    href: "#why-us",
  },
  {
    label: "Contact",
    href: "#contact",
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#080a0b]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* =====================================================
            LOGO
        ===================================================== */}

        <Link
          href="#home"
          onClick={closeMenu}
          className="group flex items-center gap-3"
        >
          {/* Logo Mark */}

          <div className="flex h-10 w-10 items-center justify-center border-2 border-orange-500 transition-transform duration-300 group-hover:rotate-90">
            <div className="relative h-6 w-6">
              <span className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-orange-500" />

              <span className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-orange-500" />

              <span className="absolute inset-1.5 border border-orange-500" />
            </div>
          </div>

          {/* Brand */}

          <div className="leading-none">
            <div className="text-lg font-black tracking-tight text-white sm:text-xl">
              FORGEBUILD
            </div>

            <div className="mt-1 text-[9px] font-bold tracking-[0.28em] text-orange-500">
              CONSTRUCTION
            </div>
          </div>
        </Link>

        {/* =====================================================
            DESKTOP NAVIGATION
        ===================================================== */}

        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative text-xs font-bold uppercase tracking-[0.12em] text-white/60 transition-colors duration-300 hover:text-white"
            >
              {item.label}

              <span className="absolute -bottom-2 left-0 h-px w-0 bg-orange-500 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* =====================================================
            DESKTOP CTA
        ===================================================== */}

        <Link
          href="#contact"
          className="group hidden items-center gap-2 bg-orange-500 px-5 py-3 text-xs font-black uppercase tracking-wide text-white transition-all duration-300 hover:bg-orange-600 lg:inline-flex"
        >
          Start a Project

          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>

        {/* =====================================================
            MOBILE BUTTON
        ===================================================== */}

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="flex h-11 w-11 items-center justify-center border border-white/15 bg-white/5 text-white transition-colors hover:border-orange-500 hover:text-orange-500 lg:hidden"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* =====================================================
          MOBILE NAVIGATION
      ===================================================== */}

      {isOpen && (
        <div className="border-t border-white/10 bg-[#080a0b] lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-6 py-5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="border-b border-white/10 py-4 text-sm font-bold uppercase tracking-[0.12em] text-white/70 transition-colors hover:text-orange-500"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="#contact"
              onClick={closeMenu}
              className="mt-5 inline-flex items-center justify-center gap-2 bg-orange-500 px-5 py-4 text-sm font-black uppercase tracking-wide text-white transition-colors hover:bg-orange-600"
            >
              Start a Project

              <ArrowRight size={17} />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}