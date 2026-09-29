// TASK: Replace the ENTIRE contents of your current Footer.tsx with this file.
// LOCATION: app/work/horizon-realty/components/layout/Footer.tsx
//
// Upgrade:
// - More visible premium motion
// - Animated orbital/radar background
// - Moving location dots along SVG routes
// - Pulsing location markers
// - Staggered content reveal
// - Animated brand accent
// - Animated link underlines/arrows
// - Moving CTA line
// - Back-to-top interaction
// - Mobile-friendly motion
//
// NOTE: All animation is decorative and keeps the footer usable without JavaScript
// animation dependencies.

"use client";

import {
  ArrowRight,
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

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

const contactItems = [
  {
    label: "Email",
    value: "hello@horizonrealty.com",
    href: "mailto:hello@horizonrealty.com",
    icon: Mail,
  },
  {
    label: "Phone",
    value: "+1 (305) 555-0186",
    href: "tel:+13055550186",
    icon: Phone,
  },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = footerRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-[#071011] text-[#F2F3EF]"
    >
      {/* =====================================================
          CINEMATIC ANIMATED BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Technical grid */}

        <div
          className={`absolute inset-0 transition-opacity duration-[1800ms] ${
            visible ? "opacity-[0.06]" : "opacity-0"
          }`}
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(139,199,194,0.45) 1px, transparent 1px), linear-gradient(to bottom, rgba(139,199,194,0.45) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />

        {/* Large slow-moving orbital field */}

        <div
          className={`absolute -right-64 -top-48 h-[42rem] w-[42rem] rounded-full border border-[#4FA7A1]/10 transition-all duration-[2200ms] ease-out ${
            visible
              ? "translate-x-0 rotate-0 scale-100 opacity-100"
              : "translate-x-24 rotate-12 scale-90 opacity-0"
          }`}
        />

        <div
          className={`absolute -right-44 -top-28 h-[35rem] w-[35rem] rounded-full border border-dashed border-[#4FA7A1]/[0.08] transition-all delay-150 duration-[2600ms] ease-out ${
            visible
              ? "translate-x-0 rotate-0 scale-100 opacity-100"
              : "translate-x-16 -rotate-12 scale-90 opacity-0"
          }`}
        />

        <div
          className={`absolute -right-24 top-[-2rem] h-[28rem] w-[28rem] rounded-full border border-[#4FA7A1]/[0.055] transition-all delay-300 duration-[3000ms] ease-out ${
            visible
              ? "translate-x-0 rotate-0 opacity-100"
              : "translate-x-10 rotate-6 opacity-0"
          }`}
        />

        {/* Lower-left orbital field */}

        <div
          className={`absolute -left-64 -bottom-56 h-[38rem] w-[38rem] rounded-full border border-white/[0.035] transition-all duration-[2600ms] ease-out ${
            visible
              ? "translate-x-0 scale-100 opacity-100"
              : "-translate-x-20 scale-90 opacity-0"
          }`}
        />

        <div
          className={`absolute -left-44 -bottom-36 h-[29rem] w-[29rem] rounded-full border border-dashed border-[#4FA7A1]/[0.045] transition-all delay-200 duration-[2800ms] ease-out ${
            visible
              ? "translate-x-0 opacity-100"
              : "-translate-x-10 opacity-0"
          }`}
        />

        {/* =================================================
            SVG LOCATION MAP MOTION
        ================================================= */}

        <svg
          viewBox="0 0 1200 760"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          {/* Route 1 */}

          <path
            d="M-120 590 C120 470 200 610 390 480 S650 270 820 350 S1080 500 1320 280"
            fill="none"
            stroke="#4FA7A1"
            strokeOpacity="0.12"
            strokeWidth="1"
            strokeDasharray="4 15"
          />

          {/* Route 2 */}

          <path
            d="M-80 210 C130 320 270 150 450 180 S710 250 880 130 S1090 100 1320 190"
            fill="none"
            stroke="#8BC7C2"
            strokeOpacity="0.08"
            strokeWidth="1"
            strokeDasharray="3 17"
          />

          {/* Route 3 */}

          <path
            d="M40 770 C220 650 300 520 500 560 S760 680 930 540 S1110 420 1320 490"
            fill="none"
            stroke="#4FA7A1"
            strokeOpacity="0.075"
            strokeWidth="1"
            strokeDasharray="4 18"
          />

          {/* Moving dots */}

          <circle r="4.5" fill="#8BC7C2" opacity="0.9">
            <animateMotion
              dur="8s"
              repeatCount="indefinite"
              path="M-120 590 C120 470 200 610 390 480 S650 270 820 350 S1080 500 1320 280"
            />
          </circle>

          <circle r="2.7" fill="#4FA7A1" opacity="0.75">
            <animateMotion
              dur="11s"
              begin="-4s"
              repeatCount="indefinite"
              path="M-120 590 C120 470 200 610 390 480 S650 270 820 350 S1080 500 1320 280"
            />
          </circle>

          <circle r="3.2" fill="#8BC7C2" opacity="0.72">
            <animateMotion
              dur="10s"
              begin="-2s"
              repeatCount="indefinite"
              path="M-80 210 C130 320 270 150 450 180 S710 250 880 130 S1090 100 1320 190"
            />
          </circle>

          <circle r="2.6" fill="#4FA7A1" opacity="0.65">
            <animateMotion
              dur="13s"
              begin="-7s"
              repeatCount="indefinite"
              path="M-80 210 C130 320 270 150 450 180 S710 250 880 130 S1090 100 1320 190"
            />
          </circle>

          <circle r="3.6" fill="#72BDB7" opacity="0.65">
            <animateMotion
              dur="12s"
              begin="-6s"
              repeatCount="indefinite"
              path="M40 770 C220 650 300 520 500 560 S760 680 930 540 S1110 420 1320 490"
            />
          </circle>

          {/* Pulse markers */}

          <g>
            <circle cx="860" cy="350" r="4" fill="#8BC7C2" />

            <circle
              cx="860"
              cy="350"
              r="12"
              fill="none"
              stroke="#4FA7A1"
              strokeOpacity="0.28"
            >
              <animate
                attributeName="r"
                values="10;25;10"
                dur="3.8s"
                repeatCount="indefinite"
              />

              <animate
                attributeName="stroke-opacity"
                values="0.1;0.34;0.1"
                dur="3.8s"
                repeatCount="indefinite"
              />
            </circle>
          </g>

          <g>
            <circle cx="560" cy="520" r="3.5" fill="#4FA7A1" />

            <circle
              cx="560"
              cy="520"
              r="11"
              fill="none"
              stroke="#4FA7A1"
              strokeOpacity="0.18"
            >
              <animate
                attributeName="r"
                values="8;20;8"
                dur="4.4s"
                repeatCount="indefinite"
              />
            </circle>
          </g>

          <g>
            <circle cx="1030" cy="570" r="3" fill="#8BC7C2" />

            <circle
              cx="1030"
              cy="570"
              r="10"
              fill="none"
              stroke="#8BC7C2"
              strokeOpacity="0.14"
            >
              <animate
                attributeName="r"
                values="7;18;7"
                dur="4.8s"
                repeatCount="indefinite"
              />
            </circle>
          </g>
        </svg>

        {/* Ambient glow points */}

        <div
          className={`absolute right-[19%] top-[20%] h-28 w-28 rounded-full bg-[#1F5C5B]/10 blur-3xl transition-all duration-[1800ms] ${
            visible ? "scale-125 opacity-100" : "scale-50 opacity-0"
          }`}
        />

        <div
          className={`absolute left-[18%] bottom-[15%] h-40 w-40 rounded-full bg-[#4FA7A1]/[0.045] blur-3xl transition-all delay-300 duration-[2200ms] ${
            visible ? "scale-100 opacity-100" : "scale-50 opacity-0"
          }`}
        />

        {/* Rotating accent ring */}

        <div
          className={`absolute right-[9%] top-[31%] h-16 w-16 rounded-full border border-[#4FA7A1]/10 transition-all duration-[1800ms] ${
            visible ? "rotate-[360deg] opacity-100" : "rotate-0 opacity-0"
          }`}
        >
          <span className="absolute -right-1 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#8BC7C2]" />
        </div>
      </div>

      {/* =====================================================
          MAIN FOOTER
      ===================================================== */}

      <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        {/* =================================================
            TOP GRID
        ================================================= */}

        <div
          className={`grid gap-14 transition-all duration-1000 lg:grid-cols-[1.25fr_0.75fr_0.75fr_0.95fr] ${
            visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* BRAND */}

          <div className="max-w-sm">
            <a
              href="#home"
              className="group inline-flex items-center font-serif text-3xl tracking-[-0.04em]"
            >
              <span className="relative">
                Horizon

                <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#4FA7A1] transition-all duration-500 group-hover:w-full" />
              </span>

              <span className="ml-1 italic text-[#4FA7A1] transition-transform duration-500 group-hover:translate-x-1">
                Realty.
              </span>
            </a>

            <p className="mt-6 max-w-sm text-sm leading-7 text-white/45">
              Exceptional properties, thoughtful guidance, and a better way
              to find the place you&apos;ll call home.
            </p>

            <a
              href="#contact"
              className="group mt-8 inline-flex items-center gap-4 text-[9px] font-bold uppercase tracking-[0.22em] text-[#F2F3EF] transition-colors duration-300 hover:text-[#8BC7C2]"
            >
              <span className="relative pb-2">
                Start A Conversation

                <span className="absolute bottom-0 left-0 h-px w-8 bg-[#4FA7A1] transition-all duration-500 group-hover:w-full" />
              </span>

              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 transition-all duration-300 group-hover:translate-x-1 group-hover:border-[#4FA7A1]/50 group-hover:bg-[#4FA7A1]/10">
                <ArrowRight size={13} strokeWidth={1.7} />
              </span>
            </a>
          </div>

          {/* EXPLORE */}

          <div>
            <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-[#4FA7A1]">
              Explore
            </p>

            <nav className="mt-6 flex flex-col gap-4">
              {footerLinks.explore.map((link, index) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`group flex w-fit items-center gap-2 text-sm text-white/50 transition-all duration-500 hover:translate-x-1 hover:text-[#F2F3EF] ${
                    visible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-3 opacity-0"
                  }`}
                  style={{
                    transitionDelay: `${250 + index * 80}ms`,
                  }}
                >
                  <span>{link.label}</span>

                  <ArrowUpRight
                    size={12}
                    strokeWidth={1.6}
                    className="translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0 group-hover:opacity-70"
                  />
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
              {footerLinks.connect.map((link, index) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`group flex w-fit items-center gap-2 text-sm text-white/50 transition-all duration-500 hover:translate-x-1 hover:text-[#F2F3EF] ${
                    visible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-3 opacity-0"
                  }`}
                  style={{
                    transitionDelay: `${350 + index * 90}ms`,
                  }}
                >
                  <span>{link.label}</span>

                  <ArrowUpRight
                    size={12}
                    strokeWidth={1.6}
                    className="translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0 group-hover:opacity-70"
                  />
                </a>
              ))}
            </nav>
          </div>

          {/* CONTACT */}

          <div>
            <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-[#4FA7A1]">
              Contact
            </p>

            <div className="mt-6 space-y-5">
              {contactItems.map((item, index) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`group flex items-start gap-3 transition-all duration-700 ${
                      visible
                        ? "translate-x-0 opacity-100"
                        : "translate-x-5 opacity-0"
                    }`}
                    style={{
                      transitionDelay: `${350 + index * 130}ms`,
                    }}
                  >
                    <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.025] text-[#4FA7A1] transition-all duration-500 group-hover:-translate-y-1 group-hover:border-[#4FA7A1]/50 group-hover:bg-[#4FA7A1]/10 group-hover:shadow-[0_8px_24px_rgba(79,167,161,0.12)]">
                      <Icon size={14} strokeWidth={1.7} />

                      <span className="absolute inset-[-4px] rounded-full border border-[#4FA7A1]/0 transition-all duration-500 group-hover:border-[#4FA7A1]/15" />
                    </span>

                    <span>
                      <span className="block text-[7px] font-bold uppercase tracking-[0.2em] text-white/25">
                        {item.label}
                      </span>

                      <span className="mt-1 block text-sm text-white/50 transition-colors duration-300 group-hover:text-white/80">
                        {item.value}
                      </span>
                    </span>
                  </a>
                );
              })}

              <div className="group flex items-start gap-3">
                <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.025] text-[#4FA7A1] transition-all duration-500 group-hover:border-[#4FA7A1]/40 group-hover:bg-[#4FA7A1]/10">
                  <MapPin size={14} strokeWidth={1.7} />

                  <span className="absolute inset-[-4px] rounded-full border border-[#4FA7A1]/0 transition-all duration-500 group-hover:border-[#4FA7A1]/10" />
                </span>

                <div>
                  <p className="text-[7px] font-bold uppercase tracking-[0.2em] text-white/25">
                    Office
                  </p>

                  <p className="mt-1 text-sm leading-6 text-white/50 transition-colors duration-300 group-hover:text-white/75">
                    1200 Brickell Avenue
                    <br />
                    Miami, Florida 33131
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================
            LARGE BRAND STATEMENT
        ================================================= */}

        <div
          className={`relative mt-20 overflow-hidden border-y border-white/10 py-10 transition-all delay-150 duration-1000 sm:mt-24 sm:py-12 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {/* Animated accent line */}

          <div
            className={`absolute left-0 top-0 h-px bg-[#4FA7A1] transition-all duration-[1400ms] ${
              visible ? "w-24" : "w-0"
            }`}
          />

          <div className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-4 text-[8px] font-bold uppercase tracking-[0.28em] text-[#4FA7A1]">
                Horizon Realty
              </p>

              <p className="max-w-4xl font-serif text-3xl leading-tight tracking-[-0.025em] text-white/80 sm:text-4xl lg:text-5xl">
                Find somewhere
                <span className="italic text-[#4FA7A1]">
                  {" "}
                  worth coming home to.
                </span>
              </p>
            </div>

            <a
              href="#home"
              className="group flex shrink-0 items-center gap-3 text-[8px] font-bold uppercase tracking-[0.2em] text-white/40 transition-colors duration-300 hover:text-[#8BC7C2]"
            >
              <span>Back To Top</span>

              <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition-all duration-500 group-hover:-translate-y-1 group-hover:border-[#4FA7A1]/50 group-hover:bg-[#4FA7A1]/10">
                <span className="transition-transform duration-500 group-hover:-translate-y-0.5">
                  ↑
                </span>

                <span className="absolute inset-[-5px] rounded-full border border-[#4FA7A1]/0 transition-all duration-500 group-hover:border-[#4FA7A1]/15" />
              </span>
            </a>
          </div>
        </div>

        {/* =================================================
            BOTTOM BAR
        ================================================= */}

        <div
          className={`flex flex-col justify-between gap-5 pt-8 text-[8px] font-semibold uppercase tracking-[0.2em] text-white/30 transition-all delay-300 duration-1000 sm:flex-row sm:items-center ${
            visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
        >
          <div className="flex flex-wrap items-center gap-4">
            <p>© 2026 Horizon Realty. All rights reserved.</p>

            <span className="hidden h-3 w-px bg-white/10 sm:block" />

            <span className="text-[#4FA7A1]/70">
              Your next chapter.
            </span>
          </div>

          <div className="flex gap-6">
            <a
              href="#contact"
              className="relative transition-colors hover:text-white/70"
            >
              Privacy
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#4FA7A1] transition-all duration-300 hover:w-full" />
            </a>

            <a
              href="#contact"
              className="relative transition-colors hover:text-white/70"
            >
              Terms
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#4FA7A1] transition-all duration-300 hover:w-full" />
            </a>
          </div>
        </div>
      </div>

      {/* =====================================================
          FINAL ANIMATED EDGE
      ===================================================== */}

      <div className="absolute bottom-0 left-0 h-px w-full overflow-hidden bg-white/[0.05]">
        <div
          className={`h-full bg-gradient-to-r from-transparent via-[#4FA7A1] to-transparent transition-all duration-[1800ms] ${
            visible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
          }`}
        />
      </div>
    </footer>
  );
}
