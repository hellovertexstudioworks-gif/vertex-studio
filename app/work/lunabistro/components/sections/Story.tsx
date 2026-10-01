// TASK: Replace app/work/lunabistro/components/sections/Story.tsx with this file.

"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Story() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;

    if (!section || !image) return;

    const handleScroll = () => {
      if (window.innerWidth < 768) return;

      const rect = section.getBoundingClientRect();
      const progress =
        (window.innerHeight - rect.top) /
        (window.innerHeight + rect.height);

      const clamped = Math.max(0, Math.min(1, progress));
      const translateY = (clamped - 0.5) * 26;

      image.style.transform =
        `translate3d(0, ${translateY}px, 0) scale(1.06)`;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="story"
      className="luna-story relative overflow-hidden bg-[#F4EFE6] py-28 sm:py-32 lg:py-40"
    >
      {/* EDITORIAL BACKGROUND DETAILS */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-px w-[42%] bg-[#171410]/10"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[7%] top-[16%] hidden h-px w-20 bg-[#C9A15A]/60 lg:block"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[12%] right-[8%] hidden h-px w-24 bg-[#171410]/10 lg:block"
      />

      {/* MAIN CONTENT */}

      <div className="relative mx-auto grid w-full max-w-[1440px] items-center gap-16 px-6 sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:px-14 xl:px-16">
        {/* IMAGE COLUMN */}

        <div className="story-image-wrap relative">
          <div className="relative aspect-[4/5] overflow-hidden bg-[#171410] sm:aspect-[5/6] lg:aspect-[4/5]">
            <div
              ref={imageRef}
              className="story-image absolute -inset-[3%]"
            >
              <Image
                src="/images/luna/luna-story.jpg"
                alt="Elegant Luna Bistro dining room"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-center"
              />
            </div>

            <div className="pointer-events-none absolute inset-0 bg-black/[0.06]" />

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />

            <div className="absolute left-5 top-5 flex items-center gap-3 sm:left-7 sm:top-7">
              <span className="h-px w-8 bg-white/50" />

              <span className="text-[8px] font-bold uppercase tracking-[0.28em] text-white/65">
                01 / Story
              </span>
            </div>

            <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-7">
              <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-[#E0BF7A]">
                Luna Bistro
              </p>

              <p className="mt-2 font-serif text-xl text-[#F4EFE6] sm:text-2xl">
                Around the table.
              </p>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-4 -right-4 -z-0 h-24 w-24 border-b border-r border-[#C9A15A]/50 sm:-bottom-5 sm:-right-5 sm:h-28 sm:w-28"
          />

          <div className="relative z-10 mt-5 flex items-center justify-between">
            <p className="text-[8px] font-semibold uppercase tracking-[0.26em] text-[#171410]/35">
              Food · People · Place
            </p>

            <span className="h-px w-16 bg-[#171410]/15 sm:w-24" />
          </div>
        </div>

        {/* CONTENT COLUMN */}

        <div className="relative max-w-2xl overflow-visible lg:pl-4 xl:pl-8">
          <div className="story-reveal story-reveal-1 mb-7 flex items-center gap-4">
            <span className="story-line h-px w-12 origin-left bg-[#C9A15A]" />

            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#9B7637]">
              Our Story
            </p>
          </div>

          <h2 className="max-w-full overflow-visible font-serif text-[clamp(3.15rem,5.2vw,5.6rem)] leading-[1.08] tracking-[-0.05em] text-[#171410]">
            <span className="story-title-line block overflow-visible pb-[0.08em]">
              A table is where
            </span>

            <span className="story-title-line story-title-line-2 block whitespace-nowrap overflow-visible pb-[0.08em] italic text-[#9B7637]">
              moments begin.
            </span>
          </h2>

          <div className="story-reveal story-reveal-2 my-9 flex items-center gap-4">
            <span className="h-px flex-1 bg-[#171410]/10" />
            <span className="h-1 w-1 rounded-full bg-[#C9A15A]" />
            <span className="h-px w-16 bg-[#171410]/10" />
          </div>

          <div className="space-y-6 text-[15px] leading-8 text-[#171410]/65 sm:text-base sm:leading-8">
            <p className="story-reveal story-reveal-3">
              Luna Bistro was created around a simple idea: that exceptional
              food should feel personal, memorable, and worth sharing.
            </p>

            <p className="story-reveal story-reveal-4">
              From carefully selected ingredients to thoughtful presentation,
              every detail is designed to bring people together around the
              table.
            </p>
          </div>

          {/* PHILOSOPHY */}

          <div className="story-reveal story-reveal-5 mt-12 border-t border-[#171410]/10 pt-7 sm:mt-14">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-serif text-2xl italic leading-tight text-[#171410] sm:text-3xl">
                  Crafted with intention.
                </p>

                <p className="mt-3 text-[8px] font-bold uppercase tracking-[0.26em] text-[#171410]/40">
                  The Luna Bistro Philosophy
                </p>
              </div>

              <div className="hidden h-12 w-px bg-[#C9A15A]/50 sm:block" />
            </div>
          </div>

          {/* CTA */}

          <div className="story-reveal story-reveal-6 mt-10">
            <a
              href="#menu"
              className="group inline-flex items-center gap-5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#171410]"
            >
              <span className="relative pb-2">
                <span className="absolute inset-x-0 bottom-0 h-px origin-left bg-[#171410]/30 transition-transform duration-500 group-hover:scale-x-0" />

                <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-[#9B7637] transition-transform duration-500 group-hover:scale-x-100" />

                Explore Our Menu
              </span>

              <span className="text-base transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* SECTION TRANSITION */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 hidden h-12 w-px -translate-x-1/2 bg-gradient-to-b from-[#C9A15A]/30 to-transparent lg:block"
      />

      {/* STORY MOTION */}

      <style jsx>{`
        .story-image {
          transform: translate3d(0, 0, 0) scale(1.06);
          will-change: transform;
          animation: storyImageReveal 1.4s
            cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .story-image-wrap {
          opacity: 0;
          transform: translateY(28px);
          animation: storyImageWrapReveal 1.1s
            cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards;
        }

        .story-reveal {
          opacity: 0;
          transform: translateY(20px);
          animation: storyReveal 0.9s
            cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .story-reveal-1 { animation-delay: 0.3s; }
        .story-reveal-2 { animation-delay: 0.55s; }
        .story-reveal-3 { animation-delay: 0.7s; }
        .story-reveal-4 { animation-delay: 0.82s; }
        .story-reveal-5 { animation-delay: 1s; }
        .story-reveal-6 { animation-delay: 1.15s; }

        .story-title-line {
          display: block;
          overflow: visible;
          opacity: 0;
          clip-path: inset(0 0 100% 0);
          transform: translateY(16px);
          animation: storyTitleReveal 1.05s
            cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .story-title-line-2 {
          animation-delay: 0.16s;
        }

        .story-line {
          animation: storyLineReveal 1s
            cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
          transform: scaleX(0);
        }

        @keyframes storyImageReveal {
          0% {
            opacity: 0.7;
            transform: translate3d(0, 12px, 0) scale(1.12);
          }

          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1.06);
          }
        }

        @keyframes storyImageWrapReveal {
          0% {
            opacity: 0;
            transform: translateY(28px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes storyReveal {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes storyTitleReveal {
          0% {
            opacity: 0;
            clip-path: inset(0 0 100% 0);
            transform: translateY(16px);
          }

          100% {
            opacity: 1;
            clip-path: inset(0 0 0 0);
            transform: translateY(0);
          }
        }

        @keyframes storyLineReveal {
          0% {
            transform: scaleX(0);
          }

          100% {
            transform: scaleX(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .story-image,
          .story-image-wrap,
          .story-reveal,
          .story-title-line,
          .story-line {
            animation: none !important;
          }

          .story-image,
          .story-image-wrap,
          .story-reveal,
          .story-title-line {
            opacity: 1 !important;
            transform: none !important;
            clip-path: none !important;
          }

          .story-line {
            transform: scaleX(1) !important;
          }
        }

        @media (max-width: 767px) {
          .story-image {
            transform: scale(1.04);
          }
        }
      `}</style>
    </section>
  );
}
