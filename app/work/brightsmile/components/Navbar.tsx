"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

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
    label: "Doctors",
    href: "#doctors",
  },
  {
    label: "Gallery",
    href: "#gallery",
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
    <header
      className="
        sticky
        top-0
        z-50
        border-b
        border-slate-200/70
        bg-white/85
        backdrop-blur-xl
      "
    >
      <div
        className="
          mx-auto
          flex
          h-20
          max-w-7xl
          items-center
          justify-between
          px-6
        "
      >
        {/* =====================================================
            LOGO
        ===================================================== */}

        <Link
          href="#home"
          onClick={closeMenu}
          className="
            text-2xl
            font-black
            tracking-tight
            text-blue-600
          "
        >
          BrightSmile
        </Link>

        {/* =====================================================
            DESKTOP NAVIGATION
        ===================================================== */}

        <nav
          className="
            hidden
            items-center
            gap-8
            md:flex
          "
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="
                text-sm
                font-semibold
                text-slate-600
                transition-colors
                duration-200
                hover:text-blue-600
              "
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* =====================================================
            DESKTOP CTA
        ===================================================== */}

        <Link
          href="#contact"
          className="
            hidden
            rounded-full
            bg-blue-600
            px-5
            py-3
            text-sm
            font-bold
            text-white
            shadow-lg
            shadow-blue-600/20
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:bg-blue-700
            md:inline-flex
          "
        >
          Book Appointment
        </Link>

        {/* =====================================================
            MOBILE MENU BUTTON
        ===================================================== */}

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={
            isOpen
              ? "Close menu"
              : "Open menu"
          }
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            border
            border-slate-200
            bg-white
            text-slate-900
            transition-colors
            hover:bg-slate-50
            md:hidden
          "
        >
          {isOpen ? (
            <X size={22} />
          ) : (
            <Menu size={22} />
          )}
        </button>
      </div>

      {/* =====================================================
          MOBILE NAVIGATION
      ===================================================== */}

      {isOpen && (
        <div
          className="
            border-t
            border-slate-200/70
            bg-white
            md:hidden
          "
        >
          <nav
            className="
              mx-auto
              flex
              max-w-7xl
              flex-col
              px-6
              py-5
            "
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="
                  border-b
                  border-slate-100
                  py-4
                  text-base
                  font-semibold
                  text-slate-700
                  transition-colors
                  hover:text-blue-600
                "
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="#contact"
              onClick={closeMenu}
              className="
                mt-5
                inline-flex
                items-center
                justify-center
                rounded-full
                bg-blue-600
                px-5
                py-3.5
                font-bold
                text-white
                transition-colors
                hover:bg-blue-700
              "
            >
              Book Appointment
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}