// TASK: Replace the ENTIRE contents of your current Horizon Realty FeaturedProperties.tsx with this file.
// LOCATION: app/work/horizon-realty/components/sections/FeaturedProperties.tsx
//
// Upgrade:
// - Premium scroll-reveal animations
// - Staggered property-card entrances
// - Refined image hover interactions
// - Interactive favorite buttons
// - Property inquiry CTAs
// - Better mobile spacing
// - Keeps the existing Horizon Realty content and visual direction

"use client";

import Image from "next/image";
import { ArrowRight, Heart, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

const properties = [
  {
    number: "01",
    name: "The Glass House",
    location: "Miami, Florida",
    type: "Modern Residence",
    price: "$1,250,000",
    image: "/images/realestate/property-01.jpg",
  },
  {
    number: "02",
    name: "Hillside Estate",
    location: "Austin, Texas",
    type: "Private Estate",
    price: "$1,850,000",
    image: "/images/realestate/property-02.jpg",
  },
  {
    number: "03",
    name: "The Coastal Villa",
    location: "Malibu, California",
    type: "Luxury Villa",
    price: "$2,400,000",
    image: "/images/realestate/property-03.jpg",
  },
];

export default function FeaturedProperties() {
  const [visible, setVisible] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const section = document.getElementById("properties");

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

  const toggleFavorite = (propertyName: string) => {
    setFavorites((current) =>
      current.includes(propertyName)
        ? current.filter((item) => item !== propertyName)
        : [...current, propertyName],
    );
  };

  return (
    <section
      id="properties"
      className="relative overflow-hidden bg-[#F2F3EF] py-24 sm:py-32 lg:py-36"
    >
      {/* =====================================================
          DECORATIVE BACKGROUND
          The animated map system is intentionally desktop/tablet only.
          Phones keep the section clean for a better small-screen experience.
      ===================================================== */}

      {/* =====================================================
          ANIMATED LOCATION / MAP ORBIT
      ===================================================== */}

      <div className="pointer-events-none absolute -right-48 top-16 hidden h-[34rem] w-[34rem] sm:block">
        {/* Main map field */}
        <div
          className={`absolute inset-0 rounded-full border border-[#1F5C5B]/10 transition-all duration-[1600ms] ${
            visible ? "scale-100 opacity-100" : "scale-90 opacity-0"
          }`}
        />

        {/* Map contour rings */}
        <div
          className={`absolute inset-5 rounded-full border border-dashed border-[#1F5C5B]/10 transition-all duration-[1800ms] ${
            visible
              ? "scale-100 opacity-100 [animation:spin_28s_linear_infinite]"
              : "scale-90 opacity-0"
          }`}
        />

        <div className="absolute inset-20 rounded-full border border-[#1F5C5B]/[0.06]" />

        {/* Architectural route lines */}
        <svg
          viewBox="0 0 500 500"
          className={`absolute inset-0 h-full w-full transition-all duration-[1800ms] ${
            visible ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        >
          <path
            d="M55 330 C105 260 135 315 190 245 S285 135 355 175 S425 270 455 205"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-[#1F5C5B]/10"
            strokeDasharray="6 9"
          />

          <path
            d="M90 120 C155 165 175 105 235 145 S330 265 405 320"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-[#1F5C5B]/[0.07]"
          />

          <path
            d="M120 405 C170 350 225 370 270 315 S345 225 410 250"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-[#1F5C5B]/[0.07]"
            strokeDasharray="3 8"
          />

          {/* Route nodes */}
          <circle cx="55" cy="330" r="3" className="fill-[#1F5C5B]/20" />
          <circle cx="190" cy="245" r="3" className="fill-[#1F5C5B]/20" />
          <circle cx="355" cy="175" r="3" className="fill-[#1F5C5B]/20" />
          <circle cx="455" cy="205" r="3" className="fill-[#1F5C5B]/20" />
        </svg>

        {/* Moving location marker */}
        <svg
          viewBox="0 0 500 500"
          className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        >
          {/* Primary moving location dot */}
          <circle
            r="6"
            fill="#1F5C5B"
            opacity="0.95"
            className="drop-shadow-[0_0_5px_rgba(31,92,91,0.25)]"
          >
            <animateMotion
              dur="10s"
              repeatCount="indefinite"
              path="M55 330 C105 260 135 315 190 245 S285 135 355 175 S425 270 455 205"
            />
          </circle>

          <circle r="12" fill="none" stroke="#1F5C5B" strokeOpacity="0.18">
            <animateMotion
              dur="10s"
              repeatCount="indefinite"
              path="M55 330 C105 260 135 315 190 245 S285 135 355 175 S425 270 455 205"
            />
          </circle>

          {/* Smaller moving map dots */}
          <circle r="2.8" fill="#1F5C5B" opacity="0.55">
            <animateMotion
              dur="7s"
              begin="-2.2s"
              repeatCount="indefinite"
              path="M90 120 C155 165 175 105 235 145 S330 265 405 320"
            />
          </circle>

          <circle r="2.2" fill="#1F5C5B" opacity="0.38">
            <animateMotion
              dur="9s"
              begin="-5s"
              repeatCount="indefinite"
              path="M120 405 C170 350 225 370 270 315 S345 225 410 250"
            />
          </circle>

          <circle r="1.8" fill="#1F5C5B" opacity="0.32">
            <animateMotion
              dur="11s"
              begin="-7s"
              repeatCount="indefinite"
              path="M55 330 C105 260 135 315 190 245 S285 135 355 175 S425 270 455 205"
            />
          </circle>

          <circle r="2.5" fill="#1F5C5B" opacity="0.42">
            <animateMotion
              dur="8s"
              begin="-3.5s"
              repeatCount="indefinite"
              path="M90 120 C155 165 175 105 235 145 S330 265 405 320"
            />
          </circle>

          {/* Extra micro location dots */}
          <circle r="1.6" fill="#1F5C5B" opacity="0.34">
            <animateMotion
              dur="6.5s"
              begin="-1.5s"
              repeatCount="indefinite"
              path="M55 330 C105 260 135 315 190 245 S285 135 355 175 S425 270 455 205"
            />
          </circle>

          <circle r="1.5" fill="#1F5C5B" opacity="0.3">
            <animateMotion
              dur="8.5s"
              begin="-4.4s"
              repeatCount="indefinite"
              path="M120 405 C170 350 225 370 270 315 S345 225 410 250"
            />
          </circle>

          <circle r="1.7" fill="#1F5C5B" opacity="0.36">
            <animateMotion
              dur="7.5s"
              begin="-5.8s"
              repeatCount="indefinite"
              path="M90 120 C155 165 175 105 235 145 S330 265 405 320"
            />
          </circle>

          <circle r="1.4" fill="#1F5C5B" opacity="0.28">
            <animateMotion
              dur="12s"
              begin="-8s"
              repeatCount="indefinite"
              path="M55 330 C105 260 135 315 190 245 S285 135 355 175 S425 270 455 205"
            />
          </circle>

          <circle r="1.8" fill="#1F5C5B" opacity="0.3">
            <animateMotion
              dur="10s"
              begin="-6.2s"
              repeatCount="indefinite"
              path="M120 405 C170 350 225 370 270 315 S345 225 410 250"
            />
          </circle>
        </svg>

        {/* Location pin labels */}
        <div
          className={`absolute left-[17%] top-[59%] rounded-full border border-[#1F5C5B]/10 bg-white/75 px-2.5 py-1 text-[7px] font-bold uppercase tracking-[0.16em] text-[#1F5C5B] shadow-sm backdrop-blur-sm transition-all delay-500 duration-1000 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
        >
          Miami
        </div>

        <div
          className={`absolute left-[67%] top-[29%] rounded-full border border-[#1F5C5B]/10 bg-white/75 px-2.5 py-1 text-[7px] font-bold uppercase tracking-[0.16em] text-[#1F5C5B] shadow-sm backdrop-blur-sm transition-all delay-700 duration-1000 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
        >
          Austin
        </div>

        <div
          className={`absolute right-[10%] top-[54%] rounded-full border border-[#1F5C5B]/10 bg-white/75 px-2.5 py-1 text-[7px] font-bold uppercase tracking-[0.16em] text-[#1F5C5B] shadow-sm backdrop-blur-sm transition-all delay-1000 duration-1000 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
        >
          Tampa
        </div>

        <div
          className={`absolute left-[34%] top-[17%] rounded-full border border-[#1F5C5B]/10 bg-white/75 px-2.5 py-1 text-[7px] font-bold uppercase tracking-[0.16em] text-[#1F5C5B] shadow-sm backdrop-blur-sm transition-all delay-[1200ms] duration-1000 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
        >
          Los Angeles
        </div>

        {/* Center coordinate */}
        <div
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center transition-all delay-300 duration-1000 ${
            visible ? "scale-100 opacity-100" : "scale-90 opacity-0"
          }`}
        >
          <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full border border-[#1F5C5B]/15 bg-white/70 text-[#1F5C5B] shadow-sm backdrop-blur-sm">
            <MapPin size={15} strokeWidth={1.7} />
          </div>

          <p className="mt-2 text-[6px] font-bold uppercase tracking-[0.22em] text-[#111719]/35">
            Find Your Place
          </p>
        </div>

        {/* Small location signal */}
        <div
          className={`absolute left-[24%] top-[26%] h-1.5 w-1.5 rounded-full bg-[#1F5C5B]/40 transition-all duration-700 ${
            visible ? "scale-100 opacity-100" : "scale-0 opacity-0"
          }`}
        />
      </div>

      {/* =====================================================
          LOWER-LEFT ANIMATED LOCATION / MAP ORBIT
      ===================================================== */}

      <div
        className={`pointer-events-none absolute -left-44 bottom-[-7rem] hidden h-[25rem] w-[25rem] transition-all duration-[1800ms] sm:block ${
          visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        {/* Main contour rings */}
        <div className="absolute inset-0 rounded-full border border-[#1F5C5B]/10" />
        <div className="absolute inset-7 rounded-full border border-dashed border-[#1F5C5B]/10" />
        <div className="absolute inset-16 rounded-full border border-[#1F5C5B]/[0.06]" />
        <div className="absolute inset-24 rounded-full border border-[#111719]/[0.045]" />

        {/* Lower-left map routes + moving location dots */}
        <svg
          viewBox="0 0 500 500"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          {/* Route 01 */}
          <path
            d="M18 350 C75 300 115 335 165 285 S260 205 325 235 S425 315 480 260"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-[#1F5C5B]/10"
            strokeDasharray="6 10"
          />

          {/* Route 02 */}
          <path
            d="M40 150 C105 195 135 145 205 180 S310 285 390 335 S450 350 485 325"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-[#1F5C5B]/[0.07]"
          />

          {/* Route 03 */}
          <path
            d="M85 455 C135 400 185 415 225 360 S305 250 375 210 S440 180 485 195"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-[#1F5C5B]/[0.06]"
            strokeDasharray="3 9"
          />

          {/* Route nodes */}
          <circle cx="18" cy="350" r="3" className="fill-[#1F5C5B]/20" />
          <circle cx="165" cy="285" r="3" className="fill-[#1F5C5B]/20" />
          <circle cx="325" cy="235" r="3" className="fill-[#1F5C5B]/20" />
          <circle cx="40" cy="150" r="2.5" className="fill-[#1F5C5B]/15" />
          <circle cx="390" cy="335" r="2.5" className="fill-[#1F5C5B]/15" />

          {/* Primary location dot */}
          <circle
            r="6"
            fill="#1F5C5B"
            opacity="0.92"
            className="drop-shadow-[0_0_5px_rgba(31,92,91,0.25)]"
          >
            <animateMotion
              dur="10s"
              repeatCount="indefinite"
              path="M18 350 C75 300 115 335 165 285 S260 205 325 235 S425 315 480 260"
            />
          </circle>

          <circle r="12" fill="none" stroke="#1F5C5B" strokeOpacity="0.18">
            <animateMotion
              dur="10s"
              repeatCount="indefinite"
              path="M18 350 C75 300 115 335 165 285 S260 205 325 235 S425 315 480 260"
            />
          </circle>

          {/* Small route dots */}
          <circle r="3" fill="#1F5C5B" opacity="0.55">
            <animateMotion
              dur="6.5s"
              begin="-1.8s"
              repeatCount="indefinite"
              path="M40 150 C105 195 135 145 205 180 S310 285 390 335 S450 350 485 325"
            />
          </circle>

          <circle r="2.5" fill="#1F5C5B" opacity="0.42">
            <animateMotion
              dur="8s"
              begin="-4.5s"
              repeatCount="indefinite"
              path="M85 455 C135 400 185 415 225 360 S305 250 375 210 S440 180 485 195"
            />
          </circle>

          <circle r="2" fill="#1F5C5B" opacity="0.36">
            <animateMotion
              dur="7.5s"
              begin="-3.2s"
              repeatCount="indefinite"
              path="M18 350 C75 300 115 335 165 285 S260 205 325 235 S425 315 480 260"
            />
          </circle>

          <circle r="1.8" fill="#1F5C5B" opacity="0.3">
            <animateMotion
              dur="11s"
              begin="-7s"
              repeatCount="indefinite"
              path="M40 150 C105 195 135 145 205 180 S310 285 390 335 S450 350 485 325"
            />
          </circle>

          <circle r="2.2" fill="#1F5C5B" opacity="0.34">
            <animateMotion
              dur="9s"
              begin="-5.5s"
              repeatCount="indefinite"
              path="M85 455 C135 400 185 415 225 360 S305 250 375 210 S440 180 485 195"
            />
          </circle>

          {/* Tiny signal dots */}
          <circle cx="118" cy="110" r="2" className="fill-[#1F5C5B]/30" />
          <circle cx="410" cy="115" r="2" className="fill-[#1F5C5B]/25" />
          <circle cx="430" cy="405" r="2" className="fill-[#1F5C5B]/25" />
        </svg>

        {/* Center location marker */}
        <div className="absolute left-[52%] top-[51%] -translate-x-1/2 -translate-y-1/2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#1F5C5B]/15 bg-white/70 text-[#1F5C5B] shadow-sm backdrop-blur-sm">
            <MapPin size={14} strokeWidth={1.7} />
          </div>

          <p className="mt-2 whitespace-nowrap text-[6px] font-bold uppercase tracking-[0.2em] text-[#111719]/30">
            Explore Locations
          </p>
        </div>

        {/* Small floating location labels */}
        <div className="absolute left-[15%] top-[59%] rounded-full border border-[#1F5C5B]/10 bg-white/75 px-2.5 py-1 text-[7px] font-bold uppercase tracking-[0.16em] text-[#1F5C5B] shadow-sm backdrop-blur-sm">
          Miami
        </div>

        <div className="absolute right-[10%] top-[40%] rounded-full border border-[#1F5C5B]/10 bg-white/75 px-2.5 py-1 text-[7px] font-bold uppercase tracking-[0.16em] text-[#1F5C5B] shadow-sm backdrop-blur-sm">
          Austin
        </div>
      </div>

      <div className="pointer-events-none absolute -left-40 bottom-0 hidden h-80 w-80 rounded-full border border-[#111719]/[0.06] sm:block" />

      <div className="pointer-events-none absolute right-0 top-1/2 hidden h-px w-32 bg-gradient-to-l from-[#1F5C5B]/20 to-transparent sm:block" />

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="grid gap-10 lg:grid-cols-[1fr_0.7fr] lg:items-end">
          {/* LEFT */}

          <div
            className={`transition-all duration-1000 ${
              visible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <div className="mb-7 flex items-center gap-4">
              <span className="h-px w-10 bg-[#1F5C5B]" />

              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#1F5C5B]">
                Featured Properties
              </p>
            </div>

            <h2 className="font-serif text-5xl leading-[0.92] tracking-[-0.045em] text-[#111719] sm:text-6xl lg:text-7xl">
              Spaces worth
              <br />
              <span className="italic text-[#1F5C5B]">
                coming home to.
              </span>
            </h2>
          </div>

          {/* RIGHT */}

          <div
            className={`max-w-md transition-all delay-150 duration-1000 lg:ml-auto ${
              visible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <p className="text-sm leading-7 text-[#111719]/60 sm:text-base sm:leading-8">
              Explore a curated collection of exceptional residences,
              selected for their architecture, location, character, and
              lasting value.
            </p>

            <a
              href="#contact"
              className="group mt-7 inline-flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#111719]"
            >
              <span className="border-b border-[#111719]/25 pb-2 transition-colors duration-300 group-hover:border-[#1F5C5B] group-hover:text-[#1F5C5B]">
                Explore All Properties
              </span>

              <ArrowRight
                size={16}
                strokeWidth={1.8}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>

        {/* =================================================
            PROPERTY GRID
        ================================================= */}

        <div className="mt-14 grid gap-5 sm:mt-16 lg:grid-cols-12">
          {/* =================================================
              PROPERTY 01
          ================================================= */}

          <article
            className={`group lg:col-span-7 transition-all duration-1000 ${
              visible
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0"
            }`}
          >
            <PropertyImageCard
              property={properties[0]}
              featured
              favorite={favorites.includes(properties[0].name)}
              onFavorite={() => toggleFavorite(properties[0].name)}
              onInquiry={() => handlePropertyInquiry(properties[0].name)}
            />
          </article>

          {/* =================================================
              PROPERTY 02
          ================================================= */}

          <article
            className={`group lg:col-span-5 transition-all delay-150 duration-1000 ${
              visible
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0"
            }`}
          >
            <PropertyImageCard
              property={properties[1]}
              tall
              favorite={favorites.includes(properties[1].name)}
              onFavorite={() => toggleFavorite(properties[1].name)}
              onInquiry={() => handlePropertyInquiry(properties[1].name)}
            />
          </article>

          {/* =================================================
              PROPERTY 03
          ================================================= */}

          <article
            className={`group lg:col-span-5 transition-all delay-300 duration-1000 ${
              visible
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0"
            }`}
          >
            <PropertyImageCard
              property={properties[2]}
              favorite={favorites.includes(properties[2].name)}
              onFavorite={() => toggleFavorite(properties[2].name)}
              onInquiry={() => handlePropertyInquiry(properties[2].name)}
            />
          </article>

          {/* =================================================
              STATEMENT PANEL
          ================================================= */}

          <div
            className={`group/statement relative flex flex-col justify-between border-t border-[#111719]/10 pt-8 transition-all delay-500 duration-1000 lg:col-span-7 lg:border-t-0 lg:pt-0 ${
              visible
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0"
            }`}
          >
            <div className="absolute left-0 top-0 h-px w-0 bg-[#1F5C5B] transition-all duration-700 group-hover/statement:w-20 lg:top-0" />
            <div>
              <span className="font-serif text-5xl italic text-[#1F5C5B]/25">
                03
              </span>

              <p className="mt-6 max-w-xl font-serif text-3xl leading-tight tracking-[-0.02em] text-[#111719] sm:text-4xl">
                A better property search starts with
                <span className="italic text-[#1F5C5B]">
                  {" "}the right guidance.
                </span>
              </p>

              <p className="mt-6 max-w-lg text-sm leading-7 text-[#111719]/55">
                From the first viewing to the final signature, Horizon Realty
                brings thoughtful service and local expertise to every step of
                the journey.
              </p>
            </div>

            {/* Bottom Detail */}

            <div className="mt-10 flex items-center justify-between border-t border-[#111719]/10 pt-6">
              <div>
                <p className="text-[8px] font-bold uppercase tracking-[0.22em] text-[#111719]/40">
                  Horizon Realty
                </p>

                <p className="mt-2 font-serif text-lg italic text-[#111719]">
                  Your next chapter.
                </p>
              </div>

              <a
                href="#contact"
                className="group flex h-12 w-12 items-center justify-center rounded-full border border-[#1F5C5B]/30 text-[#1F5C5B] transition-all duration-300 hover:-translate-y-1 hover:bg-[#1F5C5B] hover:text-[#F2F3EF]"
                aria-label="Contact Horizon Realty"
              >
                <ArrowRight
                  size={18}
                  strokeWidth={1.8}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </a>
            </div>
          </div>
        </div>

        {/* =================================================
            FAVORITE STATUS
        ================================================= */}

        <div
          className={`mt-8 flex min-h-5 items-center justify-end gap-2 text-[8px] font-bold uppercase tracking-[0.18em] text-[#111719]/35 transition-opacity duration-500 ${
            favorites.length > 0 ? "opacity-100" : "opacity-0"
          }`}
        >
          <Heart size={12} className="fill-[#1F5C5B] text-[#1F5C5B]" />
          {favorites.length} saved{" "}
          {favorites.length === 1 ? "property" : "properties"}
        </div>
      </div>
    </section>
  );
}

function handlePropertyInquiry(propertyName: string) {
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent("horizon-property-inquiry", {
      detail: { propertyName },
    }),
  );

  window.location.hash = "contact";
}

function PropertyImageCard({
  property,
  featured = false,
  tall = false,
  favorite,
  onFavorite,
  onInquiry,
}: {
  property: (typeof properties)[number];
  featured?: boolean;
  tall?: boolean;
  favorite: boolean;
  onFavorite: () => void;
  onInquiry: () => void;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-[#111719] ${
        featured
          ? "aspect-[16/11]"
          : tall
            ? "aspect-[4/5]"
            : "aspect-[4/3]"
      }`}
    >
      <Image
        src={property.image}
        alt={property.name}
        fill
        sizes={
          featured
            ? "(max-width: 1024px) 100vw, 58vw"
            : "(max-width: 1024px) 100vw, 42vw"
        }
        className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.07] group-hover:-translate-y-1"
        priority={featured}
      />

      {/* Cinematic overlay */}

      <div className="absolute inset-0 bg-gradient-to-t from-[#071011]/90 via-[#071011]/10 to-transparent transition-opacity duration-700 group-hover:from-[#071011]/95" />

      <div className="absolute inset-0 bg-[#1F5C5B]/0 transition-colors duration-700 group-hover:bg-[#1F5C5B]/[0.06]" />

      {/* Moving highlight sweep */}
      <div className="pointer-events-none absolute -left-1/2 top-0 h-full w-1/3 -skew-x-12 bg-white/[0.08] opacity-0 transition-all duration-1000 group-hover:left-[125%] group-hover:opacity-100" />

      {/* Number */}

      <div className="absolute left-5 top-5 sm:left-6 sm:top-6">
        <span className="font-serif text-3xl italic text-white/70 transition-colors duration-300 group-hover:text-[#7BC1BB]">
          {property.number}
        </span>
      </div>

      {/* Property Type */}

      <div className="absolute right-5 top-5 sm:right-6 sm:top-6">
        <span className="border border-white/20 bg-[#111719]/30 px-3 py-2 text-[7px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md transition-all duration-500 group-hover:-translate-y-1 group-hover:border-[#7BC1BB]/50 sm:px-4">
          {property.type}
        </span>
      </div>

      {/* Favorite */}

      <button
        type="button"
        onClick={onFavorite}
        aria-label={
          favorite
            ? `Remove ${property.name} from saved properties`
            : `Save ${property.name}`
        }
        aria-pressed={favorite}
        className={`absolute right-5 top-16 flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 sm:right-6 ${
          favorite
            ? "border-[#7BC1BB] bg-[#7BC1BB] text-[#111719]"
            : "border-white/20 bg-[#111719]/30 text-white hover:border-[#7BC1BB] hover:text-[#7BC1BB]"
        }`}
      >
        <Heart
          size={15}
          strokeWidth={1.8}
          className={favorite ? "fill-current" : ""}
        />
      </button>

      {/* Property info */}

      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
        <div className="flex items-center gap-2">
          <MapPin size={12} className="text-[#7BC1BB]" strokeWidth={1.8} />

          <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-white/55">
            {property.location}
          </p>
        </div>

        <div className="mt-2 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <h3 className="font-serif text-3xl text-white sm:text-4xl">
            {property.name}
          </h3>

          <p className="whitespace-nowrap font-serif text-xl text-[#7BC1BB] sm:text-2xl">
            {property.price}
          </p>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onInquiry}
            className="group/inquiry inline-flex min-h-10 items-center gap-2 border-b border-white/25 pb-1 text-[8px] font-bold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:border-[#7BC1BB] hover:text-[#7BC1BB]"
          >
            View Property

            <ArrowRight
              size={14}
              strokeWidth={1.8}
              className="transition-transform duration-300 group-hover/inquiry:translate-x-1"
            />
          </button>

          <span className="hidden text-[7px] font-semibold uppercase tracking-[0.16em] text-white/35 sm:block">
            Schedule a viewing
          </span>
        </div>
      </div>
    </div>
  );
}
