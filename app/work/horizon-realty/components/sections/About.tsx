// TASK: Replace the ENTIRE contents of your current About.tsx with this file.
// LOCATION: app/work/horizon-realty/components/sections/About.tsx

"use client";

import {
  ArrowRight,
  Building2,
  Compass,
  MapPin,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";

const values = [
  {
    number: "01",
    title: "Local Expertise",
    description:
      "Insightful guidance grounded in the markets and communities we know best.",
    icon: MapPin,
  },
  {
    number: "02",
    title: "Curated Properties",
    description:
      "A selective approach focused on quality, character, and long-term value.",
    icon: Sparkles,
  },
];

export default function About() {
  const [visible, setVisible] = useState(false);
  const [activeValue, setActiveValue] = useState("01");
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const section = document.getElementById("about");

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      className="relative w-full max-w-full overflow-hidden bg-[#111719] py-20 sm:py-28 lg:py-32"
    >
      {/* =====================================================
          ARCHITECTURAL BACKGROUND
      ===================================================== */}

      <div
        className={`pointer-events-none absolute -right-48 top-16 hidden h-[38rem] w-[38rem] transition-all duration-[1800ms] sm:block ${
          visible ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
      >
        <div className="absolute inset-0 rounded-full border border-[#4FA7A1]/10" />
        <div className="absolute inset-8 rounded-full border border-dashed border-[#4FA7A1]/[0.08]" />
        <div className="absolute inset-24 rounded-full border border-[#4FA7A1]/[0.05]" />

        <div className="absolute inset-16 rounded-full border border-dashed border-[#4FA7A1]/[0.045] [animation:spin_32s_linear_infinite]" />

        <div className="absolute left-[18%] top-[30%] h-1.5 w-1.5 rounded-full bg-[#8BC7C2]/35 [animation:ping_3.5s_ease-in-out_infinite]" />

        <div className="absolute right-[20%] top-[62%] h-1 w-1 rounded-full bg-[#8BC7C2]/30 [animation:ping_4.5s_ease-in-out_infinite]" />

        <svg
          viewBox="0 0 500 500"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          {/* Main route */}

          <path
            d="M35 335 C95 270 135 320 195 260 S315 145 465 205"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="5 10"
            className="text-[#4FA7A1]/15"
          />

          {/* Secondary route */}

          <path
            d="M30 115 C95 165 130 105 190 145 S305 270 475 300"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeDasharray="3 12"
            className="text-[#4FA7A1]/10"
          />

          {/* Third route */}

          <path
            d="M80 450 C150 395 180 430 245 380 S355 325 475 370"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeDasharray="4 14"
            className="text-[#4FA7A1]/08"
          />

          {/* Main moving location dot */}

          <circle r="4.5" fill="#8BC7C2" opacity="0.75">
            <animateMotion
              dur="9s"
              repeatCount="indefinite"
              path="M35 335 C95 270 135 320 195 260 S315 145 465 205"
            />
          </circle>

          {/* Second moving dot */}

          <circle r="3.5" fill="#8BC7C2" opacity="0.52">
            <animateMotion
              dur="13s"
              begin="-4s"
              repeatCount="indefinite"
              path="M30 115 C95 165 130 105 190 145 S305 270 475 300"
            />
          </circle>

          {/* Third moving dot */}

          <circle r="3" fill="#8BC7C2" opacity="0.42">
            <animateMotion
              dur="15s"
              begin="-7s"
              repeatCount="indefinite"
              path="M80 450 C150 395 180 430 245 380 S355 325 475 370"
            />
          </circle>

          {/* Fixed location nodes */}

          <circle cx="35" cy="335" r="3.5" className="fill-[#8BC7C2]/35" />
          <circle cx="195" cy="260" r="3.5" className="fill-[#8BC7C2]/30" />
          <circle cx="465" cy="205" r="3.5" className="fill-[#8BC7C2]/30" />

          <circle cx="95" cy="165" r="2.5" className="fill-[#8BC7C2]/25" />
          <circle cx="190" cy="145" r="3" className="fill-[#8BC7C2]/28" />
          <circle cx="305" cy="270" r="2.5" className="fill-[#8BC7C2]/22" />

          <circle cx="150" cy="395" r="2.5" className="fill-[#8BC7C2]/22" />
          <circle cx="245" cy="380" r="3" className="fill-[#8BC7C2]/28" />
          <circle cx="355" cy="325" r="2.5" className="fill-[#8BC7C2]/22" />

          {/* Pulsing location markers */}

          <circle cx="195" cy="260" r="10" fill="none" stroke="#8BC7C2" strokeOpacity="0.10">
            <animate
              attributeName="r"
              values="7;14;7"
              dur="3.2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.7;0.05;0.7"
              dur="3.2s"
              repeatCount="indefinite"
            />
          </circle>

          <circle cx="355" cy="325" r="8" fill="none" stroke="#8BC7C2" strokeOpacity="0.08">
            <animate
              attributeName="r"
              values="6;12;6"
              dur="4s"
              begin="-1.5s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.6;0.03;0.6"
              dur="4s"
              begin="-1.5s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>

      <div className="pointer-events-none absolute -left-40 bottom-[-9rem] hidden h-80 w-80 rounded-full border border-white/[0.045] sm:block" />

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20 lg:px-10">
        {/* =================================================
            IMAGE / STORY VISUAL
        ================================================= */}

        <div
          className={`relative transition-all duration-[1100ms] ${
            visible
              ? "translate-x-0 opacity-100"
              : "-translate-x-10 opacity-0"
          }`}
        >
          <div
            className={`group relative aspect-[4/5] overflow-hidden bg-[#1A2223] transition-all duration-[1200ms] ${
              visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            {/* Image reveal layer */}

            <div
              className={`absolute inset-0 z-20 bg-[#1F5C5B] transition-transform duration-[1300ms] ease-[cubic-bezier(0.77,0,0.175,1)] ${
                imageLoaded && visible ? "translate-y-full" : "translate-y-0"
              }`}
            />

            <img
              src="/images/realestate/about-realestate.jpg"
              alt="Modern luxury home interior"
              onLoad={() => setImageLoaded(true)}
              className={`h-full w-full object-cover transition-all duration-[1800ms] ease-out ${
                imageLoaded && visible
                  ? "scale-100 opacity-100"
                  : "scale-[1.12] opacity-0"
              } group-hover:scale-[1.045]`}
            />

            {/* Cinematic overlay */}

            <div className="absolute inset-0 bg-gradient-to-t from-[#071011]/80 via-[#071011]/10 to-transparent" />

            <div className="absolute inset-0 bg-[#1F5C5B]/[0.04] transition-opacity duration-700 group-hover:bg-[#1F5C5B]/[0.11]" />

            {/* Animated vertical scan */}

            <div
              className={`pointer-events-none absolute left-0 top-0 z-10 h-full w-px bg-[#B8D8D5]/50 transition-all duration-[1800ms] ${
                visible ? "translate-x-[38vw] opacity-0" : "translate-x-0 opacity-100"
              }`}
            />

            {/* Moving light sweep on hover */}

            <div className="pointer-events-none absolute -left-1/3 top-0 z-10 h-full w-1/4 -skew-x-12 bg-white/[0.10] opacity-0 transition-all duration-[1200ms] group-hover:left-[125%] group-hover:opacity-100" />

            {/* Architectural frame */}

            <div
              className={`pointer-events-none absolute inset-5 z-10 border border-white/10 transition-all duration-1000 sm:inset-7 ${
                visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
              }`}
            />

            {/* Image metadata */}

            <div
              className={`absolute left-5 top-5 z-20 flex items-center gap-3 transition-all delay-500 duration-700 sm:left-7 sm:top-7 ${
                visible ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
              }`}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#8BC7C2]/25 bg-[#071011]/25 text-[#8BC7C2] backdrop-blur-sm transition-transform duration-500 group-hover:rotate-6">
                <Building2 size={14} strokeWidth={1.5} />
              </span>

              <p className="text-[7px] font-bold uppercase tracking-[0.2em] text-white/65">
                Horizon Collection
              </p>
            </div>

            {/* Bottom image label */}

            <div
              className={`absolute bottom-5 left-5 right-5 z-20 flex items-end justify-between transition-all delay-700 duration-800 sm:bottom-7 sm:left-7 sm:right-7 ${
                visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
              }`}
            >
              <div>
                <p className="text-[7px] font-bold uppercase tracking-[0.22em] text-[#8BC7C2]">
                  Thoughtfully selected
                </p>

                <p className="mt-1 font-serif text-2xl italic text-white transition-transform duration-500 group-hover:translate-x-1 sm:text-3xl">
                  Places with character.
                </p>
              </div>

              <span className="font-serif text-4xl italic text-white/15 transition-transform duration-700 group-hover:-translate-y-1 group-hover:text-white/25 sm:text-5xl">
                01
              </span>
            </div>

            {/* Tiny animated location pulse */}

            <span
              className={`absolute bottom-8 right-8 z-20 h-2.5 w-2.5 rounded-full bg-[#8BC7C2] shadow-[0_0_0_7px_rgba(139,199,194,0.10)] transition-all delay-[1000ms] duration-700 ${
                visible ? "scale-100 opacity-100" : "scale-0 opacity-0"
              }`}
            >
              <span className="absolute inset-0 animate-ping rounded-full bg-[#8BC7C2]/50" />
            </span>
          </div>

          {/* =================================================
              EXPERIENCE BADGE
          ================================================= */}

          <div
            className={`absolute -bottom-5 right-4 z-30 bg-[#1F5C5B] px-6 py-5 shadow-[0_20px_50px_rgba(0,0,0,0.22)] transition-all delay-300 duration-1000 sm:right-7 sm:px-7 sm:py-6 ${
              visible
                ? "translate-y-0 scale-100 opacity-100"
                : "translate-y-6 scale-90 opacity-0"
            }`}
          >
            <div className="flex items-end gap-3">
              <p className="font-serif text-5xl leading-none text-[#F2F3EF]">
                10
              </p>

              <span className="mb-1 h-8 w-px bg-[#B8D8D5]/30" />

              <div>
                <p className="text-[8px] font-bold uppercase tracking-[0.22em] text-[#B8D8D5]">
                  Years
                </p>

                <p className="mt-1 text-[7px] uppercase tracking-[0.16em] text-[#F2F3EF]/55">
                  Of Experience
                </p>
              </div>
            </div>
          </div>

          {/* Corner detail */}

          <div
            className={`absolute left-5 top-5 h-12 w-12 border-l border-t border-[#4FA7A1]/50 transition-all delay-500 duration-700 sm:left-7 sm:top-7 ${
              visible ? "scale-100 opacity-100" : "scale-75 opacity-0"
            }`}
          />

          {/* Vertical coordinate label */}

          <div className="absolute -left-7 bottom-16 hidden -rotate-90 text-[7px] font-bold uppercase tracking-[0.28em] text-white/25 lg:block">
            EST. 2016 · HORIZON REALTY
          </div>

          <div
            className={`absolute -bottom-5 left-5 z-20 hidden h-px bg-[#4FA7A1]/60 transition-all delay-[900ms] duration-1000 sm:block lg:left-7 ${
              visible ? "w-24 opacity-100" : "w-0 opacity-0"
            }`}
          />
        </div>

        {/* =================================================
            CONTENT
        ================================================= */}

        <div
          className={`max-w-xl transition-all delay-150 duration-[1100ms] ${
            visible
              ? "translate-x-0 opacity-100"
              : "translate-x-10 opacity-0"
          }`}
        >
          {/* Eyebrow */}

          <div className="mb-6 flex items-center gap-3 sm:mb-7 sm:gap-4">
            <span className="h-px w-8 bg-[#4FA7A1] sm:w-10" />

            <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-[#4FA7A1] sm:text-[10px] sm:tracking-[0.3em]">
              About Horizon
            </p>
          </div>

          {/* Heading */}

          <h2 className="font-serif text-[3rem] leading-[0.91] tracking-[-0.05em] text-[#F2F3EF] sm:text-6xl lg:text-7xl">
            More than a property.
            <br />
            <span className="italic text-[#4FA7A1]">
              A place to belong.
            </span>
          </h2>

          {/* Divider */}

          <div className="my-7 h-px w-full bg-white/10 sm:my-8" />

          {/* Story */}

          <div className="space-y-4 text-[13px] leading-6 text-white/60 sm:space-y-5 sm:text-base sm:leading-8">
            <p>
              Horizon Realty was built around a simple belief: finding a
              home should feel personal, thoughtful, and worth remembering.
            </p>

            <p>
              We connect people with exceptional properties while providing
              the clarity, expertise, and attention needed to make every
              move with confidence.
            </p>
          </div>

          {/* =================================================
              VALUES
          ================================================= */}

          <div className="mt-9 grid gap-0 border-t border-white/10 sm:mt-10 sm:grid-cols-2">
            {values.map((value, index) => {
              const Icon = value.icon;
              const isActive = activeValue === value.number;

              return (
                <button
                  key={value.number}
                  type="button"
                  onMouseEnter={() => setActiveValue(value.number)}
                  onFocus={() => setActiveValue(value.number)}
                  className={`group relative border-b border-white/10 py-6 text-left transition-all duration-500 sm:py-7 ${
                    index === 0 ? "sm:border-r sm:pr-7" : "sm:pl-7"
                  } ${
                    isActive ? "bg-white/[0.025]" : "bg-transparent"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p
                        className={`font-serif text-3xl italic transition-colors duration-300 ${
                          isActive
                            ? "text-[#4FA7A1]"
                            : "text-[#4FA7A1]/45"
                        }`}
                      >
                        {value.number}
                      </p>

                      <h3 className="mt-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#F2F3EF]">
                        {value.title}
                      </h3>
                    </div>

                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-500 ${
                        isActive
                          ? "rotate-0 border-[#4FA7A1]/50 bg-[#1F5C5B] text-[#B8D8D5]"
                          : "-rotate-6 border-white/10 text-[#4FA7A1]/60"
                      }`}
                    >
                      <Icon size={14} strokeWidth={1.5} />
                    </span>
                  </div>

                  <p className="mt-2 max-w-xs text-xs leading-6 text-white/45">
                    {value.description}
                  </p>

                  <span
                    className={`absolute bottom-0 left-0 h-px bg-[#4FA7A1] transition-all duration-500 ${
                      isActive ? "w-16" : "w-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* CTA */}

          <div className="mt-8 flex flex-col gap-5 sm:mt-9 sm:flex-row sm:items-center sm:justify-between">
            <a
              href="#services"
              className="group inline-flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.2em] text-[#F2F3EF] transition-colors duration-300 hover:text-[#4FA7A1] sm:gap-4 sm:text-[10px] sm:tracking-[0.22em]"
            >
              <span className="border-b border-white/20 pb-2 transition-colors duration-300 group-hover:border-[#4FA7A1]">
                Discover Horizon
              </span>

              <ArrowRight
                size={15}
                strokeWidth={1.7}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>

            <div className="flex items-center gap-2 text-[7px] font-bold uppercase tracking-[0.2em] text-white/25">
              <Compass size={12} strokeWidth={1.4} />
              Thoughtful from search to signature
            </div>
          </div>
        </div>
      </div>

      {/* Bottom architectural line */}

      <div
        className={`pointer-events-none absolute bottom-0 left-0 h-px bg-[#4FA7A1]/20 transition-all duration-[1600ms] ${
          visible ? "w-full" : "w-0"
        }`}
      />
    </section>
  );
}
