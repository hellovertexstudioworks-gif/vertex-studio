// TASK: Replace app/work/lunabistro/components/sections/Experience.tsx with this file.

"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const moments = [
  {
    label: "Arrive",
    title: "Thoughtful Cuisine",
    description:
      "Seasonal ingredients, carefully selected and transformed into dishes that balance simplicity with refinement.",
  },
  {
    label: "Dine",
    title: "Warm Hospitality",
    description:
      "Genuine service, attentive without being intrusive, creating a dining experience that feels personal from start to finish.",
  },
  {
    label: "Linger",
    title: "Lasting Moments",
    description:
      "An atmosphere made for conversations, celebrations, quiet dinners, and the moments you'll want to remember.",
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const [activeMoment, setActiveMoment] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;

    if (!section || !image) return;

    const updateExperience = () => {
      if (window.innerWidth < 768) return;

      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight;

      const progress = Math.max(
        0,
        Math.min(1, (viewport - rect.top) / (viewport + rect.height * 0.55))
      );

      const translateY = (progress - 0.5) * 28;
      const scale = 1.08 - progress * 0.03;

      image.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;

      const nextMoment = Math.min(
        moments.length - 1,
        Math.floor(progress * moments.length)
      );

      setActiveMoment(nextMoment);
    };

    updateExperience();

    window.addEventListener("scroll", updateExperience, { passive: true });
    window.addEventListener("resize", updateExperience);

    return () => {
      window.removeEventListener("scroll", updateExperience);
      window.removeEventListener("resize", updateExperience);
    };
  }, []);

  const active = moments[activeMoment];

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative overflow-hidden bg-[#171410] text-[#F4EFE6]"
    >
      {/* =====================================================
          EDITORIAL HEADER
      ===================================================== */}

      <div className="relative px-6 pb-16 pt-24 sm:px-10 sm:pb-20 sm:pt-28 lg:px-14 lg:pb-24 lg:pt-36 xl:px-16">
        <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[1fr_0.55fr] lg:items-end">
          <div>
            <div className="experience-reveal mb-7 flex items-center gap-4">
              <span className="experience-line h-px w-14 origin-left bg-[#E0BF7A]" />

              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#E0BF7A]">
                The Experience
              </p>
            </div>

            <h2 className="experience-title max-w-5xl font-serif text-[clamp(3.8rem,7vw,7.4rem)] leading-[0.86] tracking-[-0.06em]">
              More than
              <br />
              <span className="italic text-[#E0BF7A]">a meal.</span>
            </h2>
          </div>

          <p className="experience-reveal max-w-md text-sm leading-7 text-white/50 sm:text-base sm:leading-8 lg:pb-2">
            From the first welcome to the final course, every detail at Luna
            Bistro is thoughtfully considered to create an evening worth
            remembering.
          </p>
        </div>
      </div>

      {/* =====================================================
          ATMOSPHERE IMAGE + ACTIVE MOMENT
      ===================================================== */}

      <div className="relative px-6 sm:px-10 lg:px-14 xl:px-16">
        <div className="mx-auto max-w-[1440px]">
          <div className="relative min-h-[620px] overflow-hidden bg-[#0B0A08] sm:min-h-[680px] lg:min-h-[760px]">
            {/* IMAGE */}
            <div
              ref={imageRef}
              className="experience-image absolute -inset-[4%]"
            >
              <Image
                src="/images/luna/luna-hero.jpg"
                alt="Atmospheric Luna Bistro dining experience"
                fill
                sizes="100vw"
                className="object-cover object-center"
                priority={false}
              />
            </div>

            <div className="absolute inset-0 bg-black/35" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#171410]/85 via-[#171410]/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#171410]/90 via-transparent to-black/15" />

            {/* TOP LABEL */}
            <div className="absolute left-6 right-6 top-6 flex items-center justify-between sm:left-8 sm:right-8 sm:top-8 lg:left-10 lg:right-10">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#E0BF7A]" />

                <p className="text-[8px] font-bold uppercase tracking-[0.28em] text-white/65">
                  An Evening At Luna
                </p>
              </div>

              <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-white/35">
                The Evening
              </p>
            </div>

            {/* ACTIVE STORY */}
            <div className="absolute inset-x-6 bottom-10 sm:inset-x-8 sm:bottom-12 lg:inset-x-10 lg:bottom-14">
              <div className="grid items-end gap-10 lg:grid-cols-[0.55fr_1fr] lg:gap-16">
                {/* MOMENT NAVIGATION */}
                <div className="hidden lg:block">
                  <div className="border-t border-white/15 pt-5">
                    <div className="space-y-5">
                      {moments.map((moment, index) => (
                        <button
                          key={moment.label}
                          type="button"
                          onClick={() => setActiveMoment(index)}
                          className="group flex w-full items-center gap-4 text-left"
                          aria-label={`View ${moment.label}`}
                          aria-pressed={activeMoment === index}
                        >
                          <span
                            className={`h-px transition-all duration-500 ${
                              activeMoment === index
                                ? "w-16 bg-[#E0BF7A]"
                                : "w-8 bg-white/20 group-hover:w-12"
                            }`}
                          />

                          <span
                            className={`text-[9px] font-bold uppercase tracking-[0.25em] transition-colors duration-500 ${
                              activeMoment === index
                                ? "text-white"
                                : "text-white/35 group-hover:text-white/60"
                            }`}
                          >
                            {moment.label}
                          </span>
                        </button>
                      ))}
                    </div>

                    <p className="mt-8 max-w-xs text-[8px] font-bold uppercase tracking-[0.22em] text-white/25">
                      An evening unfolds slowly.
                    </p>
                  </div>
                </div>

                {/* MESSAGE */}
                <div className="max-w-4xl">
                  <div className="mb-5 flex items-center gap-4">
                    <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#E0BF7A]">
                      {active.label}
                    </span>

                    <span className="h-px w-10 bg-[#E0BF7A]/60" />
                  </div>

                  <div className="overflow-hidden">
                    <h3
                      key={`${active.label}-title`}
                      className="moment-change font-serif text-[clamp(2.9rem,6vw,6.6rem)] leading-[0.88] tracking-[-0.055em] text-[#F4EFE6]"
                    >
                      {active.title}
                    </h3>
                  </div>

                  <div className="mt-7 max-w-2xl">
                    <p
                      key={`${active.label}-description`}
                      className="moment-change text-sm leading-7 text-white/60 sm:text-base sm:leading-8"
                    >
                      {active.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CORNER DETAILS */}
            <div className="absolute left-5 top-5 h-10 w-10 border-l border-t border-[#E0BF7A]/45 sm:left-7 sm:top-7 sm:h-12 sm:w-12" />
            <div className="absolute bottom-5 right-5 h-10 w-10 border-b border-r border-[#E0BF7A]/45 sm:bottom-7 sm:right-7 sm:h-12 sm:w-12" />
          </div>

          {/* MOBILE MOMENT SELECTOR */}
          <div className="border-b border-white/10 py-6 lg:hidden">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {moments.map((moment, index) => (
                <button
                  key={moment.label}
                  type="button"
                  onClick={() => setActiveMoment(index)}
                  className={`shrink-0 rounded-full border px-5 py-3 text-[9px] font-bold uppercase tracking-[0.2em] transition-colors ${
                    activeMoment === index
                      ? "border-[#E0BF7A] bg-[#E0BF7A] text-[#171410]"
                      : "border-white/15 text-white/45"
                  }`}
                >
                  {moment.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          EDITORIAL DETAILS
      ===================================================== */}

      <div className="px-6 pb-24 pt-12 sm:px-10 sm:pb-28 sm:pt-14 lg:px-14 lg:pb-36 lg:pt-16 xl:px-16">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid border-y border-white/10 md:grid-cols-3">
            {moments.map((moment, index) => (
              <button
                key={moment.label}
                type="button"
                onClick={() => setActiveMoment(index)}
                className={`group border-b border-white/10 px-1 py-8 text-left transition-colors duration-500 last:border-b-0 md:border-b-0 md:border-r md:px-8 md:py-10 md:last:border-r-0 ${
                  activeMoment === index ? "bg-white/[0.025]" : ""
                }`}
              >
                <div className="flex items-center justify-end">
                  <span
                    className={`h-px transition-all duration-500 ${
                      activeMoment === index
                        ? "w-14 bg-[#E0BF7A]"
                        : "w-8 bg-white/15 group-hover:w-12"
                    }`}
                  />
                </div>

                <p className="mt-5 text-[8px] font-bold uppercase tracking-[0.25em] text-white/30">
                  {moment.label}
                </p>

                <h3 className="mt-2 font-serif text-2xl text-white">
                  {moment.title}
                </h3>

                <p className="mt-4 max-w-sm text-sm leading-7 text-white/40">
                  {moment.description}
                </p>
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 flex flex-col items-start justify-between gap-7 sm:flex-row sm:items-center">
            <div>
              <p className="font-serif text-2xl italic text-white/85">
                Your table is waiting.
              </p>

              <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.22em] text-white/30">
                Experience Luna Bistro
              </p>
            </div>

            <a
              href="#reservation"
              className="group inline-flex items-center gap-5 border border-[#E0BF7A]/70 px-7 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#E0BF7A] transition-all duration-300 hover:bg-[#E0BF7A] hover:text-[#171410]"
            >
              <span>Reserve a Table</span>

              <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* =====================================================
          MOTION
      ===================================================== */}

      <style jsx>{`
        .experience-image {
          transform: translate3d(0, 0, 0) scale(1.08);
          will-change: transform;
          animation: experienceImageReveal 1.5s
            cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .experience-reveal {
          opacity: 0;
          transform: translateY(22px);
          animation: experienceReveal 0.9s
            cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .experience-title {
          opacity: 0;
          transform: translateY(26px);
          animation: experienceTitle 1.05s
            cubic-bezier(0.16, 1, 0.3, 1) 0.08s forwards;
        }

        .experience-line {
          transform: scaleX(0);
          animation: experienceLine 0.9s
            cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards;
        }

        .moment-change {
          animation: momentChange 650ms
            cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes experienceImageReveal {
          0% {
            opacity: 0.55;
            transform: translate3d(0, 22px, 0) scale(1.13);
          }

          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1.08);
          }
        }

        @keyframes experienceReveal {
          0% {
            opacity: 0;
            transform: translateY(22px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes experienceTitle {
          0% {
            opacity: 0;
            transform: translateY(26px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes experienceLine {
          0% {
            transform: scaleX(0);
          }

          100% {
            transform: scaleX(1);
          }
        }

        @keyframes momentChange {
          0% {
            opacity: 0;
            transform: translateY(26px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .experience-image,
          .experience-reveal,
          .experience-title,
          .experience-line,
          .moment-change {
            animation: none !important;
          }

          .experience-image,
          .experience-reveal,
          .experience-title,
          .moment-change {
            opacity: 1 !important;
            transform: none !important;
          }

          .experience-line {
            transform: scaleX(1) !important;
          }
        }

        @media (max-width: 767px) {
          .experience-image {
            transform: scale(1.04);
          }
        }
      `}</style>
    </section>
  );
}
