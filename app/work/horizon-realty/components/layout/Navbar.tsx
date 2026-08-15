"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Properties", href: "#properties" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Agents", href: "#agents" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="flex h-24 items-center justify-between border-b border-white/10">
          {/* Logo */}
          <a
            href="#"
            className="font-serif text-2xl tracking-[-0.04em] text-[#F2F3EF]"
          >
            Horizon
            <span className="ml-1 italic text-[#4FA7A1]">Realty.</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/65 transition-colors duration-300 hover:text-[#4FA7A1]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <a
            href="#contact"
            className="hidden h-11 items-center border border-[#4FA7A1]/60 px-6 text-[9px] font-bold uppercase tracking-[0.2em] text-[#F2F3EF] transition-all duration-300 hover:bg-[#4FA7A1] hover:text-[#111719] lg:flex"
          >
            Find Your Home
          </a>

          {/* Mobile Button */}
          <button
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-11 w-11 items-center justify-center border border-white/15 text-[#F2F3EF] lg:hidden"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-b border-white/10 bg-[#111719]/95 backdrop-blur-xl lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-6 py-6 sm:px-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="border-b border-white/10 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/75 transition-colors hover:text-[#4FA7A1]"
              >
                {item.label}
              </a>
            ))}

            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="mt-5 flex h-12 items-center justify-center bg-[#4FA7A1] text-[10px] font-bold uppercase tracking-[0.2em] text-[#111719]"
            >
              Find Your Home
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}