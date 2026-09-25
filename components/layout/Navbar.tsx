"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Services", href: "/#services" },
  { name: "Portfolio", href: "/#portfolio" },
  { name: "Resources", href: "/resources" },
  { name: "Pricing", href: "/#pricing" },
  { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  const isBrightSmile = pathname === "/work/brightsmile";

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("/");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (isBrightSmile) {
        setActive("/");
        return;
      }

      // Resources is a separate page, so don't try to
      // detect homepage sections while viewing it.
      if (pathname.startsWith("/resources")) {
        setActive("/resources");
        return;
      }

      const sections =
        document.querySelectorAll<HTMLElement>("section[id]");

      let current = "/";

      sections.forEach((section) => {
        const top = section.offsetTop - 120;
        const bottom = top + section.offsetHeight;

        if (
          window.scrollY >= top &&
          window.scrollY < bottom
        ) {
          current = `/#${section.id}`;
        }
      });

      if (window.scrollY < 150) {
        current = "/";
      }

      setActive(current);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isBrightSmile, pathname]);

  const getNavHref = (href: string) => {
    // Real routes such as /resources and /#section
    // should stay exactly as they are.
    if (href.startsWith("/")) {
      return href;
    }

    if (!isBrightSmile) {
      return href;
    }

    if (href === "#") {
      return "/";
    }

    return `/${href}`;
  };

  const getContactHref = () => {
    if (isBrightSmile) {
      return "/#contact";
    }

    return "/#contact";
  };

  const isNavItemActive = (href: string) => {
    if (href === "/resources") {
      return pathname.startsWith("/resources");
    }

    if (href === "/") {
      return pathname === "/" && active === "/";
    }

    return active === href;
  };

  return (
    <header
      className={`
        fixed
        left-0
        top-0
        z-50
        w-full
        transition-all
        duration-300

        ${
          isBrightSmile
            ? scrolled
              ? "border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-xl"
              : "border-b border-slate-200 bg-white"
            : "border-b border-white/10 bg-[#050816]/95 shadow-lg backdrop-blur-xl"
        }
      `}
    >
      <div
        className="
          mx-auto
          flex
          max-w-7xl
          items-center
          justify-between
          px-6
          py-5
        "
      >
        {/* =====================================================
            LOGO
        ===================================================== */}

        <a
          href={isBrightSmile ? "/" : "/"}
          className="
            group
            flex
            items-center
            gap-3
          "
        >
          <Image
            src="/icon.png"
            alt="Vertex Studio Works Logo"
            width={55}
            height={55}
            className="
              rounded-xl
              transition
              duration-300
              group-hover:scale-105
            "
          />

          <div>
            <h1
              className={`
                text-2xl
                font-bold
                transition
                duration-300
                lg:text-3xl

                ${
                  isBrightSmile
                    ? "text-slate-900 group-hover:text-blue-600"
                    : "text-white group-hover:text-blue-400"
                }
              `}
            >
              Vertex Studio
            </h1>

            <p
              className="
                mt-1
                text-[10px]
                uppercase
                tracking-[0.2em]
                text-blue-400
                lg:text-[11px]
                lg:tracking-[0.25em]
              "
            >
              Websites • Systems • Growth
            </p>
          </div>
        </a>

        {/* =====================================================
            DESKTOP NAVIGATION
        ===================================================== */}

        <nav
          className="
            hidden
            items-center
            gap-5
            lg:flex
            xl:gap-7
          "
          aria-label="Main navigation"
        >
          {navItems.map((item) => {
            const itemActive = isNavItemActive(item.href);

            return (
              <a
                key={item.name}
                href={getNavHref(item.href)}
                className={`
                  relative
                  whitespace-nowrap
                  text-sm
                  font-medium
                  transition
                  duration-300

                  ${
                    itemActive
                      ? "text-blue-500"
                      : isBrightSmile
                        ? "text-slate-700 hover:text-blue-500"
                        : "text-white hover:text-blue-400"
                  }
                `}
              >
                {item.name}

                <span
                  className={`
                    absolute
                    -bottom-2
                    left-0
                    h-[2px]
                    bg-blue-500
                    transition-all
                    duration-300

                    ${
                      itemActive
                        ? "w-full"
                        : "w-0"
                    }
                  `}
                />
              </a>
            );
          })}
        </nav>

        {/* =====================================================
            DESKTOP CTA
        ===================================================== */}

        <div className="hidden lg:block">
          <a
            href={getContactHref()}
            className="
              whitespace-nowrap
              rounded-full
              bg-gradient-to-r
              from-blue-600
              to-cyan-500
              px-6
              py-3
              text-sm
              font-semibold
              text-white
              transition
              duration-300
              hover:-translate-y-1
              hover:shadow-xl
              hover:shadow-blue-500/30
              xl:px-7
              xl:text-base
            "
          >
            Start Your Project
          </a>
        </div>

        {/* =====================================================
            MOBILE / TABLET BUTTON
        ===================================================== */}

        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={
            mobileOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={mobileOpen}
          className={`
            lg:hidden

            ${
              isBrightSmile
                ? "text-slate-900"
                : "text-white"
            }
          `}
        >
          {mobileOpen ? (
            <X size={28} />
          ) : (
            <Menu size={28} />
          )}
        </button>
      </div>

      {/* =====================================================
          MOBILE / TABLET MENU
      ===================================================== */}

      <div
        className={`
          overflow-hidden
          transition-all
          duration-300
          lg:hidden

          ${
            mobileOpen
              ? "max-h-[700px]"
              : "max-h-0"
          }
        `}
      >
        <div
          className={`
            border-t
            backdrop-blur-xl

            ${
              isBrightSmile
                ? "border-slate-200 bg-white"
                : "border-white/10 bg-[#050816]"
            }
          `}
        >
          <div
            className="
              flex
              flex-col
              px-6
              py-6
            "
          >
            {navItems.map((item) => {
              const itemActive = isNavItemActive(item.href);

              return (
                <a
                  key={item.name}
                  href={getNavHref(item.href)}
                  onClick={() => setMobileOpen(false)}
                  className={`
                    border-b
                    py-4
                    text-base
                    transition

                    ${
                      isBrightSmile
                        ? "border-slate-100"
                        : "border-white/5"
                    }

                    ${
                      itemActive
                        ? "text-blue-500"
                        : isBrightSmile
                          ? "text-slate-700 hover:text-blue-500"
                          : "text-white hover:text-blue-400"
                    }
                  `}
                >
                  {item.name}
                </a>
              );
            })}

            <a
              href={getContactHref()}
              onClick={() => setMobileOpen(false)}
              className="
                mt-6
                rounded-full
                bg-gradient-to-r
                from-blue-600
                to-cyan-500
                px-6
                py-3
                text-center
                font-semibold
                text-white
                transition
                hover:shadow-lg
                hover:shadow-blue-500/30
              "
            >
              Start Your Project
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}