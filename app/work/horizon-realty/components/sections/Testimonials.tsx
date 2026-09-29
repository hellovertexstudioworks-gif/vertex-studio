// TASK: Replace the ENTIRE contents of your current Testimonials.tsx with this file.
// LOCATION: app/work/horizon-realty/components/sections/Testimonials.tsx
//
// Design direction: recreate the airy location/radar-map movement from the
// reference image using lightweight SVG motion. No external image is required.

"use client";

import { ArrowRight, MapPin, Quote } from "lucide-react";
import { useEffect, useState } from "react";

const testimonials = [
  {
    quote:
      "Horizon made the entire process feel effortless. From our first viewing to closing day, every detail was handled with genuine care.",
    name: "Olivia Bennett",
    role: "Home Buyer",
    location: "Miami, Florida",
  },
  {
    quote:
      "They understood exactly how to position our property and brought the right buyers to the table. We couldn't have asked for a better experience.",
    name: "James Anderson",
    role: "Property Seller",
    location: "Austin, Texas",
  },
  {
    quote:
      "The team gave us clarity when we needed it most. Their market knowledge helped us make an investment decision we feel confident about.",
    name: "Ethan Williams",
    role: "Property Investor",
    location: "Los Angeles, California",
  },
];

export default function Testimonials() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = document.getElementById("testimonials");

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
      id="testimonials"
      className="relative w-full max-w-full overflow-hidden bg-[#F2F3EF] py-20 sm:py-28 lg:py-32"
    >
      {/* =====================================================
          LIVING LOCATION / RADAR BACKGROUND
          Inspired by the supplied reference image.
      ===================================================== */}

      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        {/* Large radar rings */}

        <div className="absolute -left-56 top-4 h-[38rem] w-[38rem] rounded-full border border-[#1F5C5B]/10 sm:-left-48 sm:h-[48rem] sm:w-[48rem]" />

        <div className="absolute -left-44 top-16 h-[34rem] w-[34rem] rounded-full border border-dashed border-[#1F5C5B]/[0.07] sm:-left-36 sm:h-[43rem] sm:w-[43rem]" />

        <div className="absolute -left-28 top-32 h-[29rem] w-[29rem] rounded-full border border-[#1F5C5B]/[0.055] sm:-left-20 sm:h-[37rem] sm:w-[37rem]" />

        {/* SVG network field */}

        <svg
          viewBox="0 0 1200 850"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          {/* Main orbital routes */}

          <path
            d="M-80 560 C100 390 220 475 390 365 S690 170 920 300 S1120 470 1280 360"
            fill="none"
            stroke="#4FA7A1"
            strokeOpacity="0.14"
            strokeWidth="1.2"
            strokeDasharray="5 13"
          />

          <path
            d="M-120 735 C80 585 210 625 350 690 S650 790 820 650 S1070 510 1320 650"
            fill="none"
            stroke="#1F5C5B"
            strokeOpacity="0.09"
            strokeWidth="1"
            strokeDasharray="4 15"
          />

          <path
            d="M40 170 C230 250 290 155 430 120 S700 110 850 185 S1090 125 1260 60"
            fill="none"
            stroke="#4FA7A1"
            strokeOpacity="0.09"
            strokeWidth="1"
            strokeDasharray="3 14"
          />

          <path
            d="M110 820 C220 700 300 520 475 510 S730 600 900 530 S1070 370 1240 420"
            fill="none"
            stroke="#1F5C5B"
            strokeOpacity="0.08"
            strokeWidth="1"
            strokeDasharray="5 17"
          />

          {/* Fast moving nodes */}

          <circle r="5" fill="#4FA7A1" opacity="0.85">
            <animateMotion
              dur="8s"
              repeatCount="indefinite"
              path="M-80 560 C100 390 220 475 390 365 S690 170 920 300 S1120 470 1280 360"
            />
          </circle>

          <circle r="3.5" fill="#1F5C5B" opacity="0.75">
            <animateMotion
              dur="11s"
              begin="-3s"
              repeatCount="indefinite"
              path="M-80 560 C100 390 220 475 390 365 S690 170 920 300 S1120 470 1280 360"
            />
          </circle>

          <circle r="4" fill="#72BDB7" opacity="0.8">
            <animateMotion
              dur="10s"
              begin="-5s"
              repeatCount="indefinite"
              path="M-120 735 C80 585 210 625 350 690 S650 790 820 650 S1070 510 1320 650"
            />
          </circle>

          <circle r="3.5" fill="#4FA7A1" opacity="0.7">
            <animateMotion
              dur="13s"
              begin="-7s"
              repeatCount="indefinite"
              path="M40 170 C230 250 290 155 430 120 S700 110 850 185 S1090 125 1260 60"
            />
          </circle>

          <circle r="4" fill="#1F5C5B" opacity="0.72">
            <animateMotion
              dur="12s"
              begin="-2s"
              repeatCount="indefinite"
              path="M110 820 C220 700 300 520 475 510 S730 600 900 530 S1070 370 1240 420"
            />
          </circle>

          {/* Stationary location nodes */}

          <g>
            <circle cx="260" cy="475" r="5" fill="#1F5C5B" opacity="0.65" />
            <circle
              cx="260"
              cy="475"
              r="17"
              fill="none"
              stroke="#4FA7A1"
              strokeOpacity="0.18"
            >
              <animate
                attributeName="r"
                values="12;20;12"
                dur="3.6s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-opacity"
                values="0.12;0.28;0.12"
                dur="3.6s"
                repeatCount="indefinite"
              />
            </circle>
          </g>

          <g>
            <circle cx="820" cy="650" r="4" fill="#4FA7A1" opacity="0.65" />
            <circle
              cx="820"
              cy="650"
              r="13"
              fill="none"
              stroke="#1F5C5B"
              strokeOpacity="0.15"
            >
              <animate
                attributeName="r"
                values="9;17;9"
                dur="4.2s"
                repeatCount="indefinite"
              />
            </circle>
          </g>

          <g>
            <circle cx="925" cy="300" r="4" fill="#4FA7A1" opacity="0.6" />
            <circle
              cx="925"
              cy="300"
              r="11"
              fill="none"
              stroke="#4FA7A1"
              strokeOpacity="0.12"
            >
              <animate
                attributeName="r"
                values="8;15;8"
                dur="3.1s"
                repeatCount="indefinite"
              />
            </circle>
          </g>

          {/* Tiny ambient nodes */}

          <circle cx="160" cy="625" r="2.5" fill="#4FA7A1" opacity="0.55">
            <animate
              attributeName="opacity"
              values="0.25;0.75;0.25"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>

          <circle cx="480" cy="230" r="2.5" fill="#1F5C5B" opacity="0.45">
            <animate
              attributeName="opacity"
              values="0.2;0.7;0.2"
              dur="4.5s"
              repeatCount="indefinite"
            />
          </circle>

          <circle cx="1050" cy="575" r="2.5" fill="#4FA7A1" opacity="0.5">
            <animate
              attributeName="opacity"
              values="0.2;0.7;0.2"
              dur="3.8s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>

        {/* Soft moving glows */}

        <span className="absolute left-[18%] top-[40%] h-2 w-2 rounded-full bg-[#4FA7A1]/40 blur-[1px] animate-pulse" />

        <span className="absolute left-[48%] top-[25%] h-1.5 w-1.5 rounded-full bg-[#1F5C5B]/35 animate-pulse" />

        <span className="absolute left-[69%] top-[72%] h-2 w-2 rounded-full bg-[#4FA7A1]/35 animate-pulse" />
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-10">
          <div
            className={`transition-all duration-1000 ${
              visible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <div className="mb-6 flex items-center gap-3 sm:mb-7 sm:gap-4">
              <span className="h-px w-8 bg-[#1F5C5B] sm:w-10" />

              <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-[#1F5C5B] sm:text-[10px] sm:tracking-[0.3em]">
                Client Stories
              </p>
            </div>

            <h2 className="font-serif text-[3rem] leading-[0.9] tracking-[-0.05em] text-[#111719] sm:text-6xl lg:text-7xl">
              Good moves
              <br />
              <span className="italic text-[#1F5C5B]">
                start with trust.
              </span>
            </h2>
          </div>

          <p
            className={`max-w-lg text-[13px] leading-6 text-[#111719]/60 transition-all delay-150 duration-1000 sm:text-base sm:leading-8 lg:ml-auto lg:pb-2 ${
              visible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            The best measure of our work is how our clients feel when they
            finally receive the keys.
          </p>
        </div>

        {/* =================================================
            FEATURED QUOTE
        ================================================= */}

        <div
          className={`relative mt-12 overflow-hidden border-y border-[#111719]/10 py-10 transition-all delay-200 duration-1000 sm:mt-16 sm:py-14 lg:py-16 ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          <div className="absolute left-0 top-0 h-px w-full overflow-hidden bg-[#111719]/[0.04]">
            <span
              className="block h-full bg-[#1F5C5B] transition-all duration-[1200ms]"
              style={{ width: visible ? "42%" : "0%" }}
            />
          </div>

          <div className="grid gap-8 lg:grid-cols-[110px_1fr_210px] lg:items-center lg:gap-10">
            {/* QUOTE MARK */}

            <div className="relative hidden lg:block">
              <Quote
                size={76}
                strokeWidth={0.7}
                className="text-[#1F5C5B]/20"
              />

              <span className="absolute left-3 top-2 h-2 w-2 rounded-full bg-[#4FA7A1]">
                <span className="absolute inset-0 animate-ping rounded-full bg-[#4FA7A1]/30" />
              </span>
            </div>

            {/* QUOTE */}

            <div className="relative min-h-[230px] sm:min-h-[190px]">
              {testimonials.map((testimonial, index) => {
                const isActive = active === index;

                return (
                  <div
                    key={testimonial.name}
                    className={`absolute inset-0 transition-all duration-700 ${
                      isActive
                        ? "translate-y-0 opacity-100"
                        : index < active
                          ? "-translate-y-5 opacity-0"
                          : "translate-y-5 opacity-0"
                    }`}
                    aria-hidden={!isActive}
                  >
                    <p className="max-w-4xl font-serif text-2xl leading-tight tracking-[-0.025em] text-[#111719] sm:text-4xl lg:text-5xl">
                      {testimonial.quote}
                    </p>

                    <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-4">
                      <span className="h-px w-7 bg-[#1F5C5B] sm:w-8" />

                      <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#111719] sm:text-[9px] sm:tracking-[0.22em]">
                        {testimonial.name}
                      </p>

                      <span className="text-[8px] uppercase tracking-[0.15em] text-[#111719]/35 sm:text-[9px] sm:tracking-[0.18em]">
                        {testimonial.role}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* LOCATION + CONTROLS */}

            <div className="flex items-center justify-between border-t border-[#111719]/10 pt-5 lg:block lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0 lg:text-right">
              <div>
                <div className="flex items-center gap-2 lg:justify-end">
                  <MapPin
                    size={12}
                    strokeWidth={1.5}
                    className="text-[#1F5C5B]"
                  />

                  <p className="text-[7px] font-bold uppercase tracking-[0.2em] text-[#111719]/35">
                    Client Location
                  </p>
                </div>

                <p className="mt-2 font-serif text-base italic text-[#1F5C5B] sm:text-lg">
                  {testimonials[active].location}
                </p>
              </div>

              <div className="mt-0 flex items-center gap-2 lg:mt-7 lg:justify-end">
                {testimonials.map((testimonial, index) => (
                  <button
                    key={testimonial.name}
                    type="button"
                    onClick={() => setActive(index)}
                    aria-label={`Show testimonial from ${testimonial.name}`}
                    aria-pressed={active === index}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      active === index
                        ? "w-7 bg-[#1F5C5B]"
                        : "w-2 bg-[#1F5C5B]/20 hover:bg-[#1F5C5B]/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* =================================================
            TESTIMONIAL CARDS
        ================================================= */}

        <div className="mt-7 grid gap-5 md:grid-cols-2">
          {testimonials.slice(1).map((testimonial, index) => {
            const cardIndex = index + 1;
            const isActive = active === cardIndex;

            return (
              <button
                key={testimonial.name}
                type="button"
                onClick={() => setActive(cardIndex)}
                onMouseEnter={() => setActive(cardIndex)}
                className={`group relative overflow-hidden border p-6 text-left transition-all duration-700 sm:p-9 ${
                  isActive
                    ? "border-[#1F5C5B]/30 bg-[#E3E9E7]"
                    : "border-[#111719]/10 bg-[#E9EDEA]"
                } ${
                  visible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{
                  transitionDelay: `${350 + index * 140}ms`,
                }}
              >
                <span
                  className={`absolute left-0 top-0 h-px bg-[#1F5C5B] transition-all duration-700 ${
                    isActive ? "w-full" : "w-0"
                  }`}
                />

                <span
                  className={`pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#1F5C5B]/[0.05] transition-transform duration-1000 ${
                    isActive ? "scale-[2.4]" : "scale-100"
                  }`}
                />

                <div className="relative flex items-start justify-between">
                  <span
                    className={`font-serif text-3xl italic transition-colors duration-500 ${
                      isActive
                        ? "text-[#1F5C5B]"
                        : "text-[#1F5C5B]/40"
                    }`}
                  >
                    0{cardIndex + 1}
                  </span>

                  <Quote
                    size={28}
                    strokeWidth={0.8}
                    className={`transition-all duration-500 ${
                      isActive
                        ? "translate-y-0 rotate-0 text-[#1F5C5B]/45"
                        : "-translate-y-1 rotate-6 text-[#1F5C5B]/25"
                    }`}
                  />
                </div>

                <p className="relative mt-7 font-serif text-xl leading-snug text-[#111719] transition-transform duration-500 group-hover:translate-x-1 sm:mt-8 sm:text-2xl">
                  {testimonial.quote}
                </p>

                <div className="relative mt-8 flex items-end justify-between gap-5 border-t border-[#111719]/10 pt-5 sm:mt-10">
                  <div>
                    <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#111719] sm:text-[9px]">
                      {testimonial.name}
                    </p>

                    <p className="mt-2 text-[7px] uppercase tracking-[0.16em] text-[#111719]/40 sm:text-[8px] sm:tracking-[0.18em]">
                      {testimonial.role}
                    </p>
                  </div>

                  <p className="text-right text-[7px] font-semibold uppercase tracking-[0.16em] text-[#1F5C5B] sm:text-[8px] sm:tracking-[0.18em]">
                    {testimonial.location}
                  </p>
                </div>

                <div className="relative mt-5 flex items-center gap-3">
                  <span
                    className={`h-px bg-[#1F5C5B] transition-all duration-500 ${
                      isActive ? "w-10" : "w-5"
                    }`}
                  />

                  <span className="text-[7px] font-bold uppercase tracking-[0.2em] text-[#111719]/35">
                    Read client story
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* =================================================
            BOTTOM STATEMENT
        ================================================= */}

        <div
          className={`mt-10 flex flex-col justify-between gap-7 border-t border-[#111719]/10 pt-7 transition-all delay-700 duration-1000 sm:mt-14 sm:flex-row sm:items-center sm:pt-8 ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          }`}
        >
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="relative flex h-12 w-12 items-center justify-center sm:h-14 sm:w-14">
              <span className="absolute inset-0 rounded-full border border-[#1F5C5B]/15" />
              <span className="absolute inset-2 rounded-full border border-dashed border-[#1F5C5B]/10" />

              <span className="font-serif text-xl italic text-[#1F5C5B]">
                4.9
              </span>
            </div>

            <div>
              <p className="text-[7px] font-bold uppercase tracking-[0.25em] text-[#111719]/40 sm:text-[8px]">
                Client Satisfaction
              </p>

              <p className="mt-1.5 font-serif text-base italic text-[#111719]/70 sm:mt-2 sm:text-lg">
                Relationships beyond the transaction.
              </p>
            </div>
          </div>

          <a
            href="#contact"
            className="group inline-flex items-center gap-3 self-start text-[9px] font-bold uppercase tracking-[0.2em] text-[#111719] transition-colors duration-300 hover:text-[#1F5C5B] sm:gap-4 sm:self-auto sm:text-[10px] sm:tracking-[0.22em]"
          >
            <span className="border-b border-[#111719]/25 pb-2 transition-colors duration-300 group-hover:border-[#1F5C5B]">
              Start Your Journey
            </span>

            <ArrowRight
              size={15}
              strokeWidth={1.7}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>

      {/* Bottom architectural line */}

      <div
        className={`pointer-events-none absolute bottom-0 left-0 h-px bg-[#1F5C5B]/20 transition-all duration-[1600ms] ${
          visible ? "w-full" : "w-0"
        }`}
      />
    </section>
  );
}
