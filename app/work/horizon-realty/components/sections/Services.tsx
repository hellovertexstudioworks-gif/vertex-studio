// TASK: Replace the ENTIRE contents of your current Services.tsx with this file.
// LOCATION: app/work/horizon-realty/components/sections/Services.tsx

"use client";

import {
  ArrowRight,
  Compass,
  Home,
  Tag,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";

const services = [
  {
    number: "01",
    title: "Buying",
    description:
      "Find the right property with confidence. From the first search to the final signature, we guide you through every step.",
    icon: Home,
    label: "Find your place",
  },
  {
    number: "02",
    title: "Selling",
    description:
      "Position your property for the market with thoughtful presentation, strategic guidance, and a clear selling process.",
    icon: Tag,
    label: "Move with confidence",
  },
  {
    number: "03",
    title: "Property Advisory",
    description:
      "Make informed property decisions with practical insight into opportunities, neighborhoods, value, and long-term potential.",
    icon: Compass,
    label: "Make informed decisions",
  },
  {
    number: "04",
    title: "Investment",
    description:
      "Build a stronger property portfolio through carefully considered opportunities and guidance focused on lasting value.",
    icon: TrendingUp,
    label: "Build lasting value",
  },
];

function handleServiceInquiry(serviceTitle: string) {
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent("horizon-service-inquiry", {
      detail: { service: serviceTitle },
    }),
  );

  window.location.hash = "contact";
}

export default function Services() {
  const [visible, setVisible] = useState(false);
  const [activeService, setActiveService] = useState<string>("01");

  useEffect(() => {
    const section = document.getElementById("services");

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      className="relative w-full max-w-full overflow-hidden bg-[#F2F3EF] pb-12 pt-20 sm:pb-16 sm:pt-28 lg:pb-16 lg:pt-28"
    >
      {/* =====================================================
          DESKTOP ARCHITECTURAL BACKGROUND
      ===================================================== */}

      <div
        className={`pointer-events-none absolute -right-44 top-20 hidden h-[34rem] w-[34rem] transition-all duration-[1800ms] sm:block ${
          visible ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
      >
        <div className="absolute inset-0 rounded-full border border-[#1F5C5B]/10" />
        <div className="absolute inset-7 rounded-full border border-dashed border-[#1F5C5B]/[0.08]" />
        <div className="absolute inset-20 rounded-full border border-[#1F5C5B]/[0.05]" />

        <svg
          viewBox="0 0 500 500"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <path
            d="M40 340 C110 270 150 325 210 250 S320 145 455 205"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="5 10"
            className="text-[#1F5C5B]/10"
          />

          <circle
            r="4"
            fill="#1F5C5B"
            opacity="0.45"
          >
            <animateMotion
              dur="11s"
              repeatCount="indefinite"
              path="M40 340 C110 270 150 325 210 250 S320 145 455 205"
            />
          </circle>

          <circle cx="40" cy="340" r="3" className="fill-[#1F5C5B]/20" />
          <circle cx="210" cy="250" r="3" className="fill-[#1F5C5B]/20" />
          <circle cx="455" cy="205" r="3" className="fill-[#1F5C5B]/20" />
        </svg>
      </div>

      <div className="pointer-events-none absolute -left-40 bottom-[-8rem] hidden h-80 w-80 rounded-full border border-[#111719]/[0.05] sm:block" />

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="grid gap-8 sm:gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div
            className={`transition-all duration-1000 ${
              visible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <div className="mb-5 flex items-center gap-3 sm:mb-7 sm:gap-4">
              <span className="h-px w-7 bg-[#1F5C5B] sm:w-10" />

              <p className="text-[8px] font-bold uppercase tracking-[0.24em] text-[#1F5C5B] sm:text-[10px] sm:tracking-[0.3em]">
                What We Do
              </p>
            </div>

            <h2 className="font-serif text-[3rem] leading-[0.9] tracking-[-0.05em] text-[#111719] sm:text-6xl lg:text-7xl">
              Real estate,
              <br />
              <span className="italic text-[#1F5C5B]">
                thoughtfully handled.
              </span>
            </h2>
          </div>

          <div
            className={`max-w-lg transition-all delay-150 duration-1000 lg:ml-auto lg:pb-2 ${
              visible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <p className="text-[13px] leading-6 text-[#111719]/60 sm:text-base sm:leading-8">
              Whether you're buying your first home, selling a property, or
              building your next investment, Horizon Realty brings clarity
              and thoughtful guidance to every decision.
            </p>

            <div className="mt-6 flex items-center gap-3 text-[7px] font-bold uppercase tracking-[0.2em] text-[#111719]/35 sm:mt-7 sm:text-[8px]">
              <span className="h-px w-8 bg-[#1F5C5B]/40" />
              Four ways we can help
            </div>
          </div>
        </div>

        {/* =================================================
            SERVICES EXPERIENCE
        ================================================= */}

        <div className="relative mt-12 sm:mt-16">
          {/* Full-height green visual field — fills the unused left side */}
          <div className="pointer-events-none absolute inset-y-0 left-[calc((100vw-100%)/-2)] hidden w-[42vw] overflow-hidden bg-[#1F5C5B] lg:block">
            <div className="absolute -right-32 -top-32 h-[34rem] w-[34rem] rounded-full border border-[#B8D8D4]/15" />
            <div className="absolute -right-16 top-10 h-72 w-72 rounded-full border border-dashed border-[#B8D8D4]/10" />
            <div className="absolute bottom-[-12rem] left-[-8rem] h-[30rem] w-[30rem] rounded-full border border-[#B8D8D4]/10" />

            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(242,243,239,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(242,243,239,0.10) 1px, transparent 1px)",
                backgroundSize: "42px 42px",
              }}
            />

            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#123E3D]/40 to-transparent" />
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-stretch">
          {/* =================================================
              ACTIVE SERVICE VISUAL
          ================================================= */}

          <div
            className={`relative hidden min-h-[34rem] overflow-hidden bg-[#1F5C5B] lg:block transition-all duration-1000 ${
              visible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#1F5C5B] via-[#1F5C5B] to-[#123E3D]" />
            {/* Green architectural glow */}

            <div className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full border border-[#8BC7C2]/20" />
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full border border-dashed border-[#8BC7C2]/15" />
            <div className="pointer-events-none absolute -bottom-28 -left-28 h-72 w-72 rounded-full bg-[#8BC7C2]/[0.06] blur-2xl" />

            <div className="pointer-events-none absolute left-[54%] top-0 h-full w-px bg-[#B8D8D4]/[0.07]" />
            <div className="pointer-events-none absolute left-[54%] top-1/2 h-px w-[46%] bg-[#B8D8D4]/[0.07]" />

            {/* Fine architectural grid */}

            <div
              className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(242,243,239,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(242,243,239,0.10) 1px, transparent 1px)",
                backgroundSize: "42px 42px",
              }}
            />

            <div className="relative z-10 flex min-h-[34rem] flex-col p-8 xl:p-12">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-[#B8D8D4]/70">
                    Horizon Services
                  </p>

                  <p className="mt-2 font-serif text-lg italic text-[#F2F3EF]/80">
                    How we help
                  </p>
                </div>

                <span className="font-serif text-4xl italic text-[#F2F3EF]/10">
                  {activeService}
                </span>
              </div>

              {/* =================================================
                  SECOND ANIMATION ENTRY
                  Architectural blueprint / property discovery
              ================================================= */}

              <div className="relative flex min-h-0 flex-1 items-center justify-end py-8 pr-2 xl:pr-6">
                <div
                  className={`relative h-[19rem] w-[19rem] transition-all duration-[1400ms] ${
                    visible
                      ? "translate-x-0 scale-100 opacity-100"
                      : "translate-x-12 scale-90 opacity-0"
                  }`}
                >
                  {/* Blueprint rings */}

                  <div className="absolute inset-0 rounded-full border border-[#B8D8D4]/20" />

                  <div
                    className={`absolute inset-5 rounded-full border border-dashed border-[#B8D8D4]/15 transition-transform duration-[1800ms] ${
                      visible ? "[transform:rotate(360deg)]" : ""
                    }`}
                  />

                  <div className="absolute inset-12 rounded-full border border-[#B8D8D4]/10" />

                  {/* Animated scan sweep */}

                  <div
                    className={`absolute left-1/2 top-0 h-1/2 w-px origin-bottom bg-gradient-to-t from-[#B8D8D4]/40 to-transparent transition-transform duration-[2200ms] ${
                      visible ? "[transform:rotate(360deg)]" : ""
                    }`}
                  />

                  {/* Architectural blueprint */}

                  <svg
                    viewBox="0 0 300 300"
                    className="absolute inset-4 h-[calc(100%-2rem)] w-[calc(100%-2rem)]"
                    aria-hidden="true"
                  >
                    {/* Floor plan */}
                    <path
                      d="M72 86 H178 L225 125 V210 H72 Z"
                      fill="none"
                      stroke="#B8D8D4"
                      strokeOpacity="0.52"
                      strokeWidth="1.2"
                      strokeDasharray="620"
                      strokeDashoffset={visible ? "0" : "620"}
                      className="transition-[stroke-dashoffset] duration-[2200ms] ease-out"
                    />

                    {/* Interior walls */}
                    <path
                      d="M72 142 H145 V86 M145 142 H225 M145 142 V210"
                      fill="none"
                      stroke="#B8D8D4"
                      strokeOpacity="0.30"
                      strokeWidth="1"
                      strokeDasharray="320"
                      strokeDashoffset={visible ? "0" : "320"}
                      className="transition-[stroke-dashoffset] delay-300 duration-[1800ms] ease-out"
                    />

                    {/* Windows / doors */}
                    <path
                      d="M98 86 V98 M112 86 V98 M190 210 V196 M225 156 H213 M72 174 H84"
                      fill="none"
                      stroke="#B8D8D4"
                      strokeOpacity="0.42"
                      strokeWidth="2"
                      strokeDasharray="30"
                      strokeDashoffset={visible ? "0" : "30"}
                      className="transition-[stroke-dashoffset] delay-500 duration-1000 ease-out"
                    />

                    {/* Measurement lines */}
                    <path
                      d="M72 62 H178 M72 68 V56 M178 68 V56"
                      fill="none"
                      stroke="#B8D8D4"
                      strokeOpacity="0.20"
                      strokeWidth="1"
                    />

                    <path
                      d="M52 86 V210 M58 86 H46 M58 210 H46"
                      fill="none"
                      stroke="#B8D8D4"
                      strokeOpacity="0.20"
                      strokeWidth="1"
                    />

                    {/* Blueprint measurement labels */}
                    <text
                      x="125"
                      y="58"
                      textAnchor="middle"
                      fill="#B8D8D4"
                      fillOpacity="0.42"
                      fontSize="7"
                      letterSpacing="2"
                    >
                      24.8M
                    </text>

                    <text
                      x="39"
                      y="152"
                      textAnchor="middle"
                      fill="#B8D8D4"
                      fillOpacity="0.42"
                      fontSize="7"
                      letterSpacing="1.5"
                      transform="rotate(-90 39 152)"
                    >
                      18.2M
                    </text>

                    {/* Animated location point */}
                    <circle
                      cx="145"
                      cy="142"
                      r="5"
                      fill="#B8D8D4"
                      fillOpacity="0.9"
                    >
                      <animate
                        attributeName="r"
                        values="4;7;4"
                        dur="2.4s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="1;0.45;1"
                        dur="2.4s"
                        repeatCount="indefinite"
                      />
                    </circle>

                    {/* Moving route point */}
                    <circle r="3" fill="#B8D8D4">
                      <animateMotion
                        dur="7s"
                        repeatCount="indefinite"
                        path="M42 238 C88 210 90 168 128 151 S194 116 246 75"
                      />
                    </circle>

                    {/* Secondary route point */}
                    <circle r="2" fill="#B8D8D4" opacity="0.55">
                      <animateMotion
                        dur="9s"
                        begin="-3s"
                        repeatCount="indefinite"
                        path="M52 58 C88 98 124 74 154 92 S208 132 250 170"
                      />
                    </circle>
                  </svg>

                  {/* Property marker */}

                  <div
                    className={`absolute bottom-7 left-3 rounded-full border border-[#B8D8D4]/20 bg-[#F2F3EF]/[0.08] px-3 py-2 text-[7px] font-bold uppercase tracking-[0.18em] text-[#B8D8D4] backdrop-blur-sm transition-all delay-[900ms] duration-700 ${
                      visible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-3 opacity-0"
                    }`}
                  >
                    Property 01
                  </div>

                  <div
                    className={`absolute right-0 top-8 rounded-full border border-[#B8D8D4]/20 bg-[#F2F3EF]/[0.08] px-3 py-2 text-[7px] font-bold uppercase tracking-[0.18em] text-[#B8D8D4] backdrop-blur-sm transition-all delay-[1100ms] duration-700 ${
                      visible
                        ? "translate-x-0 opacity-100"
                        : "translate-x-3 opacity-0"
                    }`}
                  >
                    Selected
                  </div>

                  {/* Center discovery marker */}

                  <div
                    className={`absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#B8D8D4]/30 bg-[#F2F3EF]/10 text-[#F2F3EF] shadow-[0_18px_50px_rgba(0,0,0,0.16)] backdrop-blur-sm transition-all delay-500 duration-700 ${
                      visible
                        ? "scale-100 opacity-100"
                        : "scale-75 opacity-0"
                    }`}
                  >
                    {activeService === "01" && (
                      <Home size={23} strokeWidth={1.3} />
                    )}

                    {activeService === "02" && (
                      <Tag size={23} strokeWidth={1.3} />
                    )}

                    {activeService === "03" && (
                      <Compass size={24} strokeWidth={1.2} />
                    )}

                    {activeService === "04" && (
                      <TrendingUp size={24} strokeWidth={1.2} />
                    )}
                  </div>
                </div>
              </div>

              {/* Active service information — intentionally placed in the
                  open left side of the green visual panel. */}

              <div
                key={`info-${activeService}`}
                className="absolute bottom-8 left-8 z-20 w-[58%] max-w-[19rem] animate-in fade-in slide-in-from-left-3 duration-700 xl:bottom-10 xl:left-12"
              >
                <div className="mb-4 h-px w-16 bg-[#B8D8D4]" />

                <div className="flex items-center gap-3">
                  <p className="text-[8px] font-bold uppercase tracking-[0.24em] text-[#B8D8D4]">
                    {services.find((service) => service.number === activeService)?.label}
                  </p>

                  <span className="h-1 w-1 rounded-full bg-[#B8D8D4]/70" />
                </div>

                <h3 className="mt-2 font-serif text-4xl leading-[0.92] tracking-[-0.03em] text-[#F2F3EF] xl:text-5xl">
                  {services.find((service) => service.number === activeService)?.title}
                </h3>

                <p className="mt-4 max-w-[16rem] text-[11px] leading-5 text-[#F2F3EF]/60">
                  {services.find((service) => service.number === activeService)?.description}
                </p>

                <div className="mt-5 flex items-center gap-3">
                  <span className="font-serif text-3xl italic leading-none text-[#F2F3EF]/15">
                    {activeService}
                  </span>

                  <span className="h-px w-10 bg-[#B8D8D4]/35" />

                  <span className="text-[7px] font-bold uppercase tracking-[0.2em] text-[#B8D8D4]/65">
                    Horizon Realty
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              SERVICES LIST
          ================================================= */}

          <div className="border-t border-[#111719]/10">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isActive = activeService === service.number;

              return (
                <article
                  key={service.number}
                  onMouseEnter={() => setActiveService(service.number)}
                  className={`group relative grid gap-5 border-b border-[#111719]/10 py-7 transition-all duration-700 sm:grid-cols-[80px_0.8fr_1.2fr] sm:items-center sm:gap-8 sm:px-5 sm:py-9 lg:grid-cols-[90px_0.8fr_1.2fr] lg:py-10 ${
                    visible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                  style={{
                    transitionDelay: `${180 + index * 100}ms`,
                  }}
                >
                  {/* Animated background wipe */}

                  <div
                    className={`pointer-events-none absolute inset-0 -z-0 bg-[#DCE9E6] transition-transform duration-700 ${
                      isActive
                        ? "translate-x-0"
                        : "-translate-x-full"
                    }`}
                  />

                  {/* NUMBER + ICON */}

                  <div className="relative z-10 flex items-center justify-between sm:block">
                    <span
                      className={`font-serif text-3xl italic transition-all duration-500 sm:text-4xl ${
                        isActive
                          ? "translate-x-1 text-[#1F5C5B]"
                          : "text-[#1F5C5B]/35"
                      }`}
                    >
                      {service.number}
                    </span>

                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-500 sm:mt-5 ${
                        isActive
                          ? "rotate-0 border-[#1F5C5B] bg-[#1F5C5B] text-[#F2F3EF]"
                          : "-rotate-6 border-[#1F5C5B]/15 bg-white/40 text-[#1F5C5B]"
                      }`}
                    >
                      <Icon size={16} strokeWidth={1.6} />
                    </div>
                  </div>

                  {/* TITLE */}

                  <div className="relative z-10">
                    <h3
                      className={`font-serif text-3xl tracking-[-0.025em] transition-transform duration-500 sm:text-4xl ${
                        isActive ? "translate-x-1" : ""
                      }`}
                    >
                      {service.title}
                    </h3>

                    <p
                      className={`mt-2 text-[8px] font-bold uppercase tracking-[0.18em] transition-all duration-500 ${
                        isActive
                          ? "translate-x-1 text-[#1F5C5B] opacity-100"
                          : "text-[#111719]/30 opacity-70"
                      }`}
                    >
                      {service.label}
                    </p>
                  </div>

                  {/* DESCRIPTION + ACTION */}

                  <div className="relative z-10 flex items-end justify-between gap-5">
                    <p className="max-w-lg text-[13px] leading-6 text-[#111719]/55 sm:text-sm sm:leading-7">
                      {service.description}
                    </p>

                    <button
                      type="button"
                      onClick={() => handleServiceInquiry(service.title)}
                      aria-label={`Ask Horizon Realty about ${service.title}`}
                      className={`group/button flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                        isActive
                          ? "border-[#1F5C5B] bg-[#1F5C5B] text-[#F2F3EF] shadow-[0_8px_25px_rgba(31,92,91,0.16)]"
                          : "border-[#1F5C5B]/20 text-[#1F5C5B]"
                      }`}
                    >
                      <ArrowRight
                        size={17}
                        strokeWidth={1.7}
                        className="transition-transform duration-300 group-hover/button:translate-x-1"
                      />
                    </button>
                  </div>

                  {/* Active progress line */}

                  <span
                    className={`absolute bottom-0 left-0 h-px bg-[#1F5C5B] transition-all duration-700 ${
                      isActive ? "w-24" : "w-0"
                    }`}
                  />
                </article>
              );
            })}
          </div>
        </div>
        </div>


        {/* =================================================
            BOTTOM STATEMENT
        ================================================= */}

        <div
          className={`mt-10 flex flex-col justify-between gap-7 border-t border-[#111719]/10 pt-7 transition-all delay-[650ms] duration-1000 sm:mt-14 sm:flex-row sm:items-center sm:pt-8 ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          }`}
        >
          <div className="flex items-center gap-4 sm:gap-5">
            <span className="h-7 w-px bg-[#1F5C5B] sm:h-8" />

            <div>
              <p className="text-[7px] font-bold uppercase tracking-[0.2em] text-[#111719]/40 sm:text-[8px] sm:tracking-[0.25em]">
                The Horizon Approach
              </p>

              <p className="mt-1.5 font-serif text-base italic text-[#111719]/75 sm:mt-2 sm:text-lg">
                Clear advice. Thoughtful decisions.
              </p>
            </div>
          </div>

          <a
            href="#agents"
            className="group inline-flex items-center gap-3 self-start text-[9px] font-bold uppercase tracking-[0.2em] text-[#111719] transition-colors duration-300 hover:text-[#1F5C5B] sm:gap-4 sm:self-auto sm:text-[10px] sm:tracking-[0.22em]"
          >
            <span className="border-b border-[#111719]/25 pb-2 transition-colors duration-300 group-hover:border-[#1F5C5B]">
              Meet Our Team
            </span>

            <ArrowRight
              size={15}
              strokeWidth={1.7}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
