// TASK: Replace app/work/lunabistro/components/sections/Hero.tsx with this file.

"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const lightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const image = imageRef.current;
    const light = lightRef.current;

    if (!hero || !image) return;

    let frame = 0;

    const handleMouseMove = (event: MouseEvent) => {
      if (window.innerWidth < 1024) return;

      const rect = hero.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const percentX = x / rect.width;
      const percentY = y / rect.height;
      const moveX = (percentX - 0.5) * 10;
      const moveY = (percentY - 0.5) * 6;

      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        image.style.transform =
          `translate3d(${moveX}px, ${moveY}px, 0) scale(1.08)`;

        if (light) {
          light.style.left = `${x}px`;
          light.style.top = `${y}px`;
          light.style.opacity = "1";
        }
      });
    };

    const handleMouseLeave = () => {
      cancelAnimationFrame(frame);
      image.style.transform =
        "translate3d(0, 0, 0) scale(1.08)";

      if (light) {
        light.style.opacity = "0";
      }
    };

    hero.addEventListener("mousemove", handleMouseMove);
    hero.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(frame);
      hero.removeEventListener("mousemove", handleMouseMove);
      hero.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!imageRef.current || window.innerWidth < 768) return;

      const scrollY = window.scrollY;

      if (scrollY > window.innerHeight) return;

      imageRef.current.style.transform =
        `translate3d(0, ${scrollY * 0.08}px, 0) scale(1.08)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <section
        ref={heroRef}
        id="top"
        className="luna-hero relative min-h-screen overflow-hidden bg-[#0B0A08]"
      >
        {/* HERO IMAGE */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            ref={imageRef}
            className="luna-hero-image absolute -inset-[2%]"
          >
            <Image
              src="/images/luna/luna-hero.jpg"
              alt="Luna Bistro dining experience"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        </div>

        {/* CINEMATIC IMAGE TREATMENT */}
        <div className="pointer-events-none absolute inset-0 bg-black/30" />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#050403]/95 via-[#050403]/65 to-[#050403]/5" />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-[#0B0A08] via-[#0B0A08]/60 to-transparent" />

        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/65 to-transparent" />

        {/* SUBTLE CURSOR LIGHT */}
        <div
          ref={lightRef}
          aria-hidden="true"
          className="pointer-events-none absolute z-[1] hidden h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-3xl transition-opacity duration-700 lg:block"
          style={{
            background:
              "radial-gradient(circle, rgba(224,191,122,0.12) 0%, rgba(224,191,122,0.04) 28%, transparent 70%)",
          }}
        />

        {/* SMALL ATMOSPHERE DETAIL */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[8%] top-[28%] z-[1] hidden h-px w-24 bg-gradient-to-r from-transparent via-[#E0BF7A]/40 to-transparent lg:block"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[12%] top-[28%] z-[1] hidden h-1 w-1 rounded-full bg-[#E0BF7A]/70 lg:block"
        />

        {/* MAIN CONTENT */}
        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center px-6 pb-40 pt-32 sm:px-8 lg:px-10">
          <div className="max-w-5xl">
            {/* EYEBROW */}
            <div className="hero-reveal hero-reveal-1 mb-7 flex items-center gap-4">
              <span className="h-px w-12 origin-left bg-[#C9A15A]" />

              <p className="text-[9px] font-bold uppercase tracking-[0.32em] text-[#E0BF7A] sm:text-[10px]">
                Fine Dining · Seasonal Cuisine
              </p>
            </div>

            {/* MAIN HEADING */}
            <h1 className="font-serif text-[clamp(3.9rem,8.5vw,8rem)] leading-[0.84] tracking-[-0.06em] text-[#F4EFE6]">
              <span className="hero-title-line hero-title-line-1 block">
                Delicious food.
              </span>

              <span className="hero-title-line hero-title-line-2 block italic text-[#E0BF7A]">
                Great moments.
              </span>
            </h1>

            {/* DESCRIPTION */}
            <p className="hero-reveal hero-reveal-4 mt-8 max-w-xl text-sm leading-7 text-white/70 sm:text-base sm:leading-8 lg:text-lg">
              Thoughtfully crafted cuisine, warm hospitality, and an
              atmosphere designed for unforgettable evenings.
            </p>

            {/* CTA BUTTONS */}
            <div className="hero-reveal hero-reveal-5 mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <a
                href="#reservation"
                className="luna-hero-button group inline-flex h-14 items-center justify-center gap-4 bg-[#E0BF7A] px-8 text-[10px] font-bold uppercase tracking-[0.2em] text-[#171410]"
              >
                <span>Reserve a Table</span>
                <span className="text-base transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </a>

              <a
                href="#menu"
                className="luna-hero-secondary group inline-flex h-14 items-center justify-center gap-4 border border-white/30 bg-black/10 px-8 text-[10px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-sm"
              >
                <span>Explore Our Menu</span>
                <span className="text-base transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* EXTENDED BOTTOM INFORMATION BAR */}
        <div className="absolute inset-x-0 bottom-0 z-20">
          <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16">
            <div className="flex min-h-[108px] items-center justify-between border-t border-white/15 py-7 sm:min-h-[118px] lg:min-h-[126px] lg:py-8">
              {/* LEFT INFORMATION */}
              <div className="flex items-center gap-5 sm:gap-6">
                <span className="h-10 w-px bg-[#C9A15A] sm:h-12" />

                <div>
                  <p className="text-[8px] font-medium uppercase tracking-[0.26em] text-white/45 sm:text-[9px]">
                    Contemporary Dining
                  </p>

                  <p className="mt-2 text-[8px] font-medium uppercase tracking-[0.26em] text-white/25 sm:text-[9px]">
                    Seasonal Cuisine
                  </p>
                </div>
              </div>

              {/* CENTER DETAIL */}
              <div className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
                <div className="flex flex-col items-center gap-3">
                  <span className="h-1 w-1 rounded-full bg-[#E0BF7A]/70" />
                  <span className="h-8 w-px bg-gradient-to-b from-[#E0BF7A]/50 to-transparent" />

                  <span className="text-[7px] font-medium uppercase tracking-[0.35em] text-white/20">
                    Luna Bistro
                  </span>
                </div>
              </div>

              {/* DISCOVER */}
              <a
                href="#story"
                className="group flex items-center gap-4 text-[8px] font-bold uppercase tracking-[0.24em] text-[#E0BF7A] sm:text-[9px]"
              >
                <span>Discover Luna</span>
                <span className="luna-scroll-arrow text-base">
                  ↓
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* CINEMATIC EDGE */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-px bg-gradient-to-r from-transparent via-[#C9A15A]/40 to-transparent"
        />
      </section>

      {/* HERO MOTION */}
      <style jsx>{`
        .luna-hero-image {
          transform: translate3d(0, 0, 0) scale(1.08);
          animation: lunaHeroImage 2.4s cubic-bezier(0.16, 1, 0.3, 1)
            forwards;
          will-change: transform;
        }

        .hero-reveal {
          opacity: 0;
          transform: translateY(24px);
          animation: lunaHeroReveal 1s cubic-bezier(0.16, 1, 0.3, 1)
            forwards;
        }

        .hero-reveal-1 {
          animation-delay: 0.45s;
        }

        .hero-reveal-4 {
          animation-delay: 1.25s;
        }

        .hero-reveal-5 {
          animation-delay: 1.45s;
        }

        .hero-title-line {
          display: block;
          opacity: 0;
          clip-path: inset(100% 0 0 0);
          transform: translateY(12px);
          animation: lunaTitleReveal 1.15s cubic-bezier(0.16, 1, 0.3, 1)
            forwards;
        }

        .hero-title-line-1 {
          animation-delay: 0.7s;
        }

        .hero-title-line-2 {
          animation-delay: 0.95s;
        }

        .luna-hero-button {
          position: relative;
          overflow: hidden;
          transition:
            background-color 400ms ease,
            color 400ms ease,
            transform 400ms ease;
        }

        .luna-hero-button::before {
          content: "";
          position: absolute;
          inset: 0;
          background: #c9a15a;
          transform: translateY(101%);
          transition: transform 500ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .luna-hero-button:hover::before {
          transform: translateY(0);
        }

        .luna-hero-button span {
          position: relative;
          z-index: 1;
        }

        .luna-hero-button:hover {
          transform: translateY(-2px);
        }

        .luna-hero-secondary {
          transition:
            border-color 400ms ease,
            color 400ms ease,
            background-color 400ms ease;
        }

        .luna-hero-secondary:hover {
          border-color: rgba(224, 191, 122, 0.8);
          background-color: rgba(11, 10, 8, 0.35);
          color: #e0bf7a;
        }

        .luna-scroll-arrow {
          animation: lunaScrollArrow 2.2s ease-in-out infinite;
        }

        @keyframes lunaHeroImage {
          0% {
            opacity: 0.55;
            transform: translate3d(0, 0, 0) scale(1.12);
          }

          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1.08);
          }
        }

        @keyframes lunaHeroReveal {
          0% {
            opacity: 0;
            transform: translateY(24px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes lunaTitleReveal {
          0% {
            opacity: 0;
            clip-path: inset(100% 0 0 0);
            transform: translateY(18px);
          }

          100% {
            opacity: 1;
            clip-path: inset(0 0 0 0);
            transform: translateY(0);
          }
        }

        @keyframes lunaScrollArrow {
          0%,
          100% {
            transform: translateY(0);
            opacity: 0.65;
          }

          50% {
            transform: translateY(5px);
            opacity: 1;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .luna-hero-image,
          .hero-reveal,
          .hero-title-line,
          .luna-scroll-arrow {
            animation: none !important;
          }

          .hero-reveal,
          .hero-title-line {
            opacity: 1 !important;
            transform: none !important;
            clip-path: none !important;
          }
        }

        @media (max-width: 767px) {
          .luna-hero-image {
            transform: scale(1.06);
            animation-name: lunaHeroImageMobile;
          }
        }

        @keyframes lunaHeroImageMobile {
          0% {
            opacity: 0.55;
            transform: scale(1.1);
          }

          100% {
            opacity: 1;
            transform: scale(1.06);
          }
        }
      `}</style>
    </>
  );
}
