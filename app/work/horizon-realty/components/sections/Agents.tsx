// TASK: Replace the ENTIRE contents of your current Agents.tsx with this file.
// LOCATION: app/work/horizon-realty/components/sections/Agents.tsx

"use client";

import {
  ArrowRight,
  MapPin,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";

const agents = [
  {
    number: "01",
    name: "Alex Morgan",
    role: "Senior Property Advisor",
    description:
      "Guides buyers through the search, negotiation, and final details with a clear, personal approach.",
    location: "Miami · Florida",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=90",
  },
  {
    number: "02",
    name: "Sophia Bennett",
    role: "Luxury Property Specialist",
    description:
      "Connects clients with distinctive homes through thoughtful presentation, market insight, and local expertise.",
    location: "Austin · Texas",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=90",
  },
  {
    number: "03",
    name: "Daniel Carter",
    role: "Investment Advisor",
    description:
      "Helps investors evaluate opportunities with practical guidance focused on value, growth, and long-term potential.",
    location: "Los Angeles · California",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=90",
  },
];

function handleAdvisorContact(agentName: string) {
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent("horizon-agent-inquiry", {
      detail: { agent: agentName },
    }),
  );

  window.location.hash = "contact";
}

export default function Agents() {
  const [visible, setVisible] = useState(false);
  const [activeAgent, setActiveAgent] = useState("01");

  useEffect(() => {
    const section = document.getElementById("agents");

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="agents"
      className="relative w-full max-w-full overflow-hidden bg-[#111719] py-20 sm:py-28 lg:py-32"
    >
      {/* =====================================================
          ARCHITECTURAL / LOCATION BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute -right-12 top-10 z-0 block h-[34rem] w-[34rem] opacity-100 sm:-right-36 sm:top-20 sm:h-[38rem] sm:w-[38rem]">
        <div className="absolute inset-0 rounded-full border border-[#4FA7A1]/10" />
        <div className="absolute inset-8 rounded-full border border-dashed border-[#4FA7A1]/[0.07]" />
        <div className="absolute inset-24 rounded-full border border-[#4FA7A1]/[0.05]" />

        <svg
          viewBox="0 0 500 500"
          className="absolute inset-0 h-full w-full overflow-visible"
          aria-hidden="true"
        >
          {/* =================================================
              LIVING PROPERTY-MAP BACKGROUND
              Motion stays in the open background and away
              from the agent portraits.
          ================================================= */}

          {/* Main upper route */}

          <path
            d="M190 95 C245 135 285 115 330 150 S390 220 465 245"
            fill="none"
            stroke="#4FA7A1"
            strokeOpacity="0.20"
            strokeWidth="1"
            strokeDasharray="4 11"
          />

          {/* Main middle route */}

          <path
            d="M185 300 C245 265 285 300 330 265 S395 210 465 190"
            fill="none"
            stroke="#4FA7A1"
            strokeOpacity="0.18"
            strokeWidth="1"
            strokeDasharray="3 12"
          />

          {/* Lower-right route */}

          <path
            d="M205 420 C265 375 310 405 355 365 S415 315 475 325"
            fill="none"
            stroke="#4FA7A1"
            strokeOpacity="0.16"
            strokeWidth="1"
            strokeDasharray="4 14"
          />

          {/* Inner route */}

          <path
            d="M200 195 C255 165 295 190 325 215 S380 280 455 295"
            fill="none"
            stroke="#4FA7A1"
            strokeOpacity="0.12"
            strokeWidth="0.8"
            strokeDasharray="3 13"
          />

          {/* =================================================
              LOWER-LEFT ROUTES
          ================================================= */}

          <path
            d="M20 395 C65 365 105 385 135 420 S170 465 220 475"
            fill="none"
            stroke="#4FA7A1"
            strokeOpacity="0.13"
            strokeWidth="0.9"
            strokeDasharray="3 12"
          />

          <path
            d="M35 455 C75 425 105 440 125 460 S165 485 205 450"
            fill="none"
            stroke="#8BC7C2"
            strokeOpacity="0.10"
            strokeWidth="0.8"
            strokeDasharray="2 13"
          />

          {/* =================================================
              MOVING DOTS
          ================================================= */}

          <circle r="4.5" fill="#8BC7C2" opacity="0.92">
            <animateMotion
              dur="8s"
              repeatCount="indefinite"
              path="M190 95 C245 135 285 115 330 150 S390 220 465 245"
            />
          </circle>

          <circle r="4" fill="#8BC7C2" opacity="0.84">
            <animateMotion
              dur="11s"
              begin="-3s"
              repeatCount="indefinite"
              path="M185 300 C245 265 285 300 330 265 S395 210 465 190"
            />
          </circle>

          <circle r="3.5" fill="#B8D8D5" opacity="0.82">
            <animateMotion
              dur="13s"
              begin="-6s"
              repeatCount="indefinite"
              path="M205 420 C265 375 310 405 355 365 S415 315 475 325"
            />
          </circle>

          <circle r="3" fill="#8BC7C2" opacity="0.76">
            <animateMotion
              dur="9.5s"
              begin="-5s"
              repeatCount="indefinite"
              path="M200 195 C255 165 295 190 325 215 S380 280 455 295"
            />
          </circle>

          <circle r="2.8" fill="#B8D8D5" opacity="0.72">
            <animateMotion
              dur="15s"
              begin="-8s"
              repeatCount="indefinite"
              path="M210 135 C255 170 300 150 335 180 S405 245 470 270"
            />
          </circle>

          {/* =================================================
              LOWER-LEFT MOVING DOTS
              These give the lower-left corner its own motion.
          ================================================= */}

          <circle r="4" fill="#8BC7C2" opacity="0.82">
            <animateMotion
              dur="10s"
              begin="-2s"
              repeatCount="indefinite"
              path="M20 395 C65 365 105 385 135 420 S170 465 220 475"
            />
          </circle>

          <circle r="3.2" fill="#B8D8D5" opacity="0.70">
            <animateMotion
              dur="12.5s"
              begin="-6s"
              repeatCount="indefinite"
              path="M35 455 C75 425 105 440 125 460 S165 485 205 450"
            />
          </circle>

          <circle r="2.5" fill="#8BC7C2" opacity="0.62">
            <animateMotion
              dur="7.5s"
              begin="-4s"
              repeatCount="indefinite"
              path="M25 430 C55 410 85 420 110 445 S150 475 185 465"
            />
          </circle>

          {/* =================================================
              MOVING BORDER NODES
              Previously stationary — now each one travels
              along a tiny local route near the content edge.
          ================================================= */}

          <circle r="3" fill="#8BC7C2" opacity="0.62">
            <animateMotion
              dur="8.5s"
              repeatCount="indefinite"
              path="M150 115 C170 130 180 115 190 100 C180 85 165 95 150 115"
            />
          </circle>

          <circle r="2.5" fill="#B8D8D5" opacity="0.52">
            <animateMotion
              dur="10s"
              begin="-4s"
              repeatCount="indefinite"
              path="M165 180 C185 195 195 180 205 165 C190 150 175 160 165 180"
            />
          </circle>

          <circle r="3" fill="#8BC7C2" opacity="0.66">
            <animateMotion
              dur="9s"
              begin="-2s"
              repeatCount="indefinite"
              path="M135 305 C155 320 170 305 180 290 C165 275 145 285 135 305"
            />
          </circle>

          <circle r="2.7" fill="#B8D8D5" opacity="0.55">
            <animateMotion
              dur="11s"
              begin="-5s"
              repeatCount="indefinite"
              path="M175 395 C195 410 210 395 218 380 C202 365 185 375 175 395"
            />
          </circle>

          {/* =================================================
              SMALL FIXED NODES — ONLY ALONG FAR BORDER
              These are intentionally static so the map has
              reference points while all main nodes move.
          ================================================= */}

          <circle cx="110" cy="145" r="2" fill="#8BC7C2" opacity="0.28" />
          <circle cx="120" cy="250" r="2.2" fill="#B8D8D5" opacity="0.25" />
          <circle cx="95" cy="350" r="2" fill="#8BC7C2" opacity="0.24" />

          {/* =================================================
              PULSING LOCATION MARKERS
          ================================================= */}

          <circle
            cx="330"
            cy="265"
            r="9"
            fill="none"
            stroke="#8BC7C2"
            strokeOpacity="0.12"
          >
            <animate
              attributeName="r"
              values="7;16;7"
              dur="3.6s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.75;0.04;0.75"
              dur="3.6s"
              repeatCount="indefinite"
            />
          </circle>

          <circle
            cx="330"
            cy="150"
            r="8"
            fill="none"
            stroke="#8BC7C2"
            strokeOpacity="0.10"
          >
            <animate
              attributeName="r"
              values="6;13;6"
              dur="4.2s"
              begin="-1.5s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.65;0.03;0.65"
              dur="4.2s"
              begin="-1.5s"
              repeatCount="indefinite"
            />
          </circle>

          <circle
            cx="135"
            cy="420"
            r="7"
            fill="none"
            stroke="#8BC7C2"
            strokeOpacity="0.10"
          >
            <animate
              attributeName="r"
              values="5;13;5"
              dur="4.8s"
              begin="-2.5s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.60;0.02;0.60"
              dur="4.8s"
              begin="-2.5s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>

      <div className="pointer-events-none absolute -left-40 bottom-0 hidden h-80 w-80 rounded-full border border-white/[0.04] sm:block" />

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end lg:gap-10">
          <div
            className={`transition-all duration-1000 ${
              visible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <div className="mb-6 flex items-center gap-3 sm:mb-7 sm:gap-4">
              <span className="h-px w-8 bg-[#4FA7A1] sm:w-10" />

              <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-[#4FA7A1] sm:text-[10px] sm:tracking-[0.3em]">
                Meet The Team
              </p>
            </div>

            <h2 className="font-serif text-[3rem] leading-[0.9] tracking-[-0.05em] text-[#F2F3EF] sm:text-6xl lg:text-7xl">
              People behind
              <br />
              <span className="italic text-[#4FA7A1]">
                the address.
              </span>
            </h2>
          </div>

          <p
            className={`max-w-md text-[13px] leading-6 text-white/55 transition-all delay-150 duration-1000 sm:text-base sm:leading-8 lg:pb-2 ${
              visible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            Our advisors combine local knowledge, market insight, and
            thoughtful service to help you make confident property decisions.
          </p>
        </div>

        {/* =================================================
            AGENTS GRID
        ================================================= */}

        <div className="mt-12 grid gap-5 sm:mt-16 md:grid-cols-3">
          {agents.map((agent, index) => {
            const isActive = activeAgent === agent.number;

            return (
              <article
                key={agent.number}
                onMouseEnter={() => setActiveAgent(agent.number)}
                className={`group relative transition-all duration-1000 ${
                  isActive ? "-translate-y-1" : ""} ${
                  visible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-12 opacity-0"
                }`}
                style={{
                  transitionDelay: `${180 + index * 140}ms`,
                }}
              >
                {/* IMAGE */}

                <div className="relative aspect-[4/5] overflow-hidden bg-[#1A2223]">
                  {/* Reveal curtain */}

                  <div
                    className={`absolute inset-0 z-20 bg-[#1F5C5B] transition-transform duration-[1300ms] ease-[cubic-bezier(0.77,0,0.175,1)] ${
                      visible ? "translate-y-full" : "translate-y-0"
                    }`}
                  />

                  <img
                    src={agent.image}
                    alt={agent.name}
                    className={`h-full w-full object-cover grayscale-[25%] transition-all duration-[1100ms] ease-out ${
                      visible
                        ? "scale-100 opacity-100"
                        : "scale-[1.10] opacity-0"
                    } group-hover:scale-[1.045] group-hover:grayscale-0`}
                  />

                  {/* Cinematic overlay */}

                  <div className="absolute inset-0 bg-gradient-to-t from-[#071011]/90 via-[#071011]/10 to-transparent" />

                  {/* Teal hover wash */}

                  <div
                    className={`absolute inset-0 bg-[#1F5C5B]/20 transition-opacity duration-700 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  {/* Architectural frame */}

                  <div
                    className={`pointer-events-none absolute inset-4 border border-white/10 transition-all duration-700 sm:inset-5 ${
                      isActive
                        ? "scale-100 opacity-100"
                        : "scale-[0.97] opacity-60"
                    }`}
                  />

                  {/* LOCATION */}

                  <div className="absolute right-5 top-5 z-10 flex items-center gap-2 sm:right-6 sm:top-6">
                    <MapPin
                      size={11}
                      strokeWidth={1.5}
                      className="text-[#8BC7C2]"
                    />

                    <span className="text-[7px] font-bold uppercase tracking-[0.16em] text-white/60">
                      {agent.location}
                    </span>
                  </div>

                  {/* AGENT IMAGE LABEL */}

                  <div
                    className={`absolute bottom-5 left-5 z-10 transition-all duration-600 sm:bottom-6 sm:left-6 ${
                      isActive
                        ? "translate-x-0 opacity-100"
                        : "translate-x-2 opacity-70"
                    }`}
                  >
                    <p className="text-[7px] font-bold uppercase tracking-[0.22em] text-[#8BC7C2]">
                      Horizon Advisor
                    </p>

                    <p className="mt-1 font-serif text-2xl italic text-white sm:text-3xl">
                      {agent.name.split(" ")[0]}.
                    </p>
                  </div>

                  {/* CONTACT BUTTON */}

                  <button
                    type="button"
                    onClick={() => handleAdvisorContact(agent.name)}
                    aria-label={`Contact ${agent.name}`}
                    className={`absolute bottom-5 right-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-500 sm:bottom-6 sm:right-6 ${
                      isActive
                        ? "border-[#8BC7C2] bg-[#8BC7C2] text-[#111719] shadow-[0_10px_30px_rgba(139,199,194,0.18)]"
                        : "border-white/25 bg-[#111719]/30 text-white"
                    }`}
                  >
                    <ArrowRight
                      size={17}
                      strokeWidth={1.7}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </button>

                  {/* Moving scan line */}

                  <span
                    className={`pointer-events-none absolute left-0 top-0 z-10 h-px w-full bg-[#B8D8D5]/60 transition-transform duration-[1400ms] ${
                      visible ? "translate-y-[400px] opacity-0" : "translate-y-0 opacity-100"
                    }`}
                  />

                  {/* Clean portrait treatment */}

                  <div
                    className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#071011]/20 via-transparent to-transparent"
                    aria-hidden="true"
                  />
                </div>

                {/* INFORMATION */}

                <div
                  className={`relative border-b border-white/10 py-5 transition-all duration-500 sm:py-6 ${
                    isActive ? "border-[#4FA7A1]/40" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <h3 className="font-serif text-2xl tracking-[-0.02em] text-[#F2F3EF] transition-transform duration-500 group-hover:translate-x-1 sm:text-[1.65rem]">
                        {agent.name}
                      </h3>

                      <p className="mt-2 text-[8px] font-bold uppercase tracking-[0.2em] text-[#4FA7A1]">
                        {agent.role}
                      </p>
                    </div>

                    <span className="hidden pt-1 text-[8px] font-semibold uppercase tracking-[0.18em] text-white/30 sm:block">
                      {agent.location}
                    </span>
                  </div>

                  <p className="mt-4 max-w-md text-[11px] leading-5 text-white/45 sm:text-xs sm:leading-6">
                    {agent.description}
                  </p>

                  {/* Animated advisor activity route */}

                  <div className="relative mt-4 h-4 max-w-[250px] overflow-hidden">
                    <svg
                      viewBox="0 0 250 16"
                      className="h-full w-full overflow-visible"
                      aria-hidden="true"
                    >
                      <path
                        d="M2 8 C28 8 34 3 58 3 S88 13 112 13 S142 5 166 5 S204 12 248 8"
                        fill="none"
                        stroke="#4FA7A1"
                        strokeOpacity="0.16"
                        strokeWidth="1"
                        strokeDasharray="3 8"
                      />

                      <circle r="2.1" fill="#8BC7C2" opacity="0.8">
                        <animateMotion
                          dur="4.6s"
                          begin={`${index * -1.15}s`}
                          repeatCount="indefinite"
                          path="M2 8 C28 8 34 3 58 3 S88 13 112 13 S142 5 166 5 S204 12 248 8"
                        />
                      </circle>

                      <circle r="1.2" fill="#8BC7C2" opacity="0.35">
                        <animateMotion
                          dur="7.2s"
                          begin={`${index * -1.8 - 1}s`}
                          repeatCount="indefinite"
                          path="M2 8 C28 8 34 3 58 3 S88 13 112 13 S142 5 166 5 S204 12 248 8"
                        />
                      </circle>
                    </svg>
                  </div>

                  <div className="mt-2 flex items-center gap-3">
                    <span
                      className={`h-px transition-all duration-700 ${
                        isActive
                          ? "w-12 bg-[#4FA7A1]"
                          : "w-5 bg-[#4FA7A1]/35"
                      }`}
                    />

                    <span className="text-[7px] font-bold uppercase tracking-[0.2em] text-white/30">
                      {isActive
                        ? `Connect with ${agent.name.split(" ")[0]}`
                        : "Property advisor"}
                    </span>

                    <span
                      className={`ml-auto h-1.5 w-1.5 rounded-full bg-[#4FA7A1] transition-all duration-500 ${
                        isActive ? "scale-100 opacity-100" : "scale-100 opacity-25"
                      }`}
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* =================================================
            BOTTOM STATEMENT
        ================================================= */}

        <div
          className={`mt-10 flex flex-col justify-between gap-7 border-t border-white/10 pt-7 transition-all delay-700 duration-1000 sm:mt-14 sm:flex-row sm:items-center sm:pt-8 ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          }`}
        >
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="relative flex h-12 w-12 items-center justify-center sm:h-14 sm:w-14">
              <span className="absolute inset-0 rounded-full border border-[#4FA7A1]/20" />
              <span className="absolute inset-2 rounded-full border border-dashed border-[#4FA7A1]/15" />

              <span className="font-serif text-xl italic text-[#4FA7A1]">
                10+
              </span>
            </div>

            <div>
              <p className="text-[7px] font-bold uppercase tracking-[0.25em] text-white/35 sm:text-[8px]">
                Years of Experience
              </p>

              <p className="mt-1.5 font-serif text-base italic text-white/70 sm:mt-2 sm:text-lg">
                Experience you can trust.
              </p>
            </div>
          </div>

          <a
            href="#contact"
            className="group inline-flex items-center gap-3 self-start text-[9px] font-bold uppercase tracking-[0.2em] text-[#F2F3EF] transition-colors duration-300 hover:text-[#4FA7A1] sm:gap-4 sm:self-auto sm:text-[10px] sm:tracking-[0.22em]"
          >
            <span className="border-b border-white/20 pb-2 transition-colors duration-300 group-hover:border-[#4FA7A1]">
              Speak With An Advisor
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
        className={`pointer-events-none absolute bottom-0 left-0 h-px bg-[#4FA7A1]/25 transition-all duration-[1600ms] ${
          visible ? "w-full" : "w-0"
        }`}
      />
    </section>
  );
}
