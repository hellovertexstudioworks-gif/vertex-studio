// TASK: Replace app/work/lunabistro/components/sections/SignatureDishes.tsx with this file.

"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type SignatureDish = {
  number: string;
  name: string;
  category: string;
  price: string;
  description: string;
  image: string;
  alt: string;
};

const dishes: SignatureDish[] = [
  {
    number: "01",
    name: "Truffle Risotto",
    category: "Chef's Selection",
    price: "$28",
    description:
      "Creamy Arborio rice slowly cooked with wild mushrooms, parmesan, fresh herbs, and a delicate touch of white truffle.",
    image:
      "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=1800&q=90",
    alt: "Truffle risotto",
  },
  {
    number: "02",
    name: "Seared Scallops",
    category: "Seafood",
    price: "$36",
    description:
      "Golden seared scallops, cauliflower purée, citrus beurre blanc, and fresh herbs.",
    image:
      "https://images.unsplash.com/photo-1622814708165-5e22e41b51e7?auto=format&fit=crop&w=1800&q=90",
    alt: "Seared scallops",
  },
  {
    number: "03",
    name: "Roasted Duck Breast",
    category: "Main Course",
    price: "$44",
    description:
      "Herb-roasted duck, seasonal vegetables, cherry reduction, and pomme purée.",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1800&q=90",
    alt: "Roasted duck breast",
  },
];

export default function SignatureDishes() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cinematicRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const cinematic = cinematicRef.current;
    if (!cinematic) return;

    let ticking = false;

    const updateDish = () => {
      if (ticking) return;

      ticking = true;

      window.requestAnimationFrame(() => {
        const rect = cinematic.getBoundingClientRect();
        const scrollRange = Math.max(
          cinematic.offsetHeight - window.innerHeight,
          1
        );

        const progress = Math.max(
          0,
          Math.min(1, -rect.top / scrollRange)
        );

        /*
         * The mobile experience uses the exact same scroll-driven story
         * as desktop. Each dish owns a clear portion of the cinematic
         * scroll, so swiping down/up naturally moves through the dishes.
         */
        const nextIndex = Math.min(
          dishes.length - 1,
          Math.round(progress * (dishes.length - 1))
        );

        setActiveIndex((current) =>
          current === nextIndex ? current : nextIndex
        );

        ticking = false;
      });
    };

    updateDish();

    window.addEventListener("scroll", updateDish, {
      passive: true,
    });

    window.addEventListener("resize", updateDish);

    return () => {
      window.removeEventListener("scroll", updateDish);
      window.removeEventListener("resize", updateDish);
    };
  }, []);

  const activeDish = dishes[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="signature-dishes"
      className="relative bg-[#F4EFE6]"
    >
      {/* =====================================================
          INTRO
      ===================================================== */}

      <div className="relative overflow-hidden px-6 py-20 sm:px-10 sm:py-24 lg:px-14 lg:py-28 xl:px-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 h-px w-[36%] bg-[#171410]/10"
        />

        <div className="mx-auto w-full max-w-[1440px]">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.55fr] lg:items-end">
            <div>
              <div className="signature-reveal mb-6 flex items-center gap-4">
                <span className="signature-line h-px w-14 origin-left bg-[#C9A15A]" />

                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#34382D]">
                  From The Kitchen
                </p>
              </div>

              <h2 className="signature-title max-w-5xl font-serif text-[clamp(3.7rem,7vw,7.4rem)] leading-[0.86] tracking-[-0.06em] text-[#171410]">
                <span className="block">Signature</span>
                <span className="block italic text-[#34382D]">
                  dishes.
                </span>
              </h2>
            </div>

            <div className="signature-reveal lg:pb-2">
              <p className="max-w-md text-sm leading-7 text-[#171410]/55 sm:text-base sm:leading-8">
                A closer look at the dishes that capture the spirit of Luna
                Bistro — seasonal ingredients, refined technique, and unforgettable
                flavor.
              </p>

              <div className="mt-8 border-t border-[#171410]/10 pt-5">
                <div className="grid grid-cols-3 gap-4">
                  {dishes.map((dish, index) => (
                    <button
                      key={dish.number}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      aria-label={`View ${dish.name}`}
                      aria-pressed={activeIndex === index}
                      className="group text-left"
                    >
                      <div className="relative aspect-[1.35/1] overflow-hidden bg-[#171410]/5">
                        <Image
                          src={dish.image}
                          alt={dish.alt}
                          fill
                          sizes="(min-width: 1024px) 160px, 30vw"
                          className="object-cover transition duration-700 ease-out group-hover:scale-105"
                        />

                        <div
                          className={`absolute inset-0 transition-colors duration-500 ${
                            activeIndex === index
                              ? "bg-[#171410]/10"
                              : "bg-[#171410]/25 group-hover:bg-[#171410]/10"
                          }`}
                        />

                        <span
                          className={`absolute left-3 top-3 font-serif text-sm transition-colors duration-500 ${
                            activeIndex === index
                              ? "text-[#E0BF7A]"
                              : "text-white/75"
                          }`}
                        >
                          {dish.number}
                        </span>
                      </div>

                      <div className="mt-3 flex items-start justify-between gap-2">
                        <div>
                          <p
                            className={`font-serif text-sm leading-tight transition-colors duration-500 sm:text-base ${
                              activeIndex === index
                                ? "text-[#171410]"
                                : "text-[#171410]/65 group-hover:text-[#171410]"
                            }`}
                          >
                            {dish.name}
                          </p>
                          <p className="mt-1 text-[8px] font-bold uppercase tracking-[0.18em] text-[#171410]/35">
                            {dish.category}
                          </p>
                        </div>

                        <span className="pt-0.5 font-serif text-xs text-[#171410]/45">
                          {dish.price}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="mt-12 hidden items-center gap-4 lg:flex"
          >
            <span className="h-px flex-1 bg-[#171410]/10" />
            <span className="text-[8px] font-bold uppercase tracking-[0.28em] text-[#171410]/30">
              The Signature Collection
            </span>
            <span className="h-px w-24 bg-[#171410]/10" />
          </div>
        </div>
      </div>

      {/* =====================================================
          CINEMATIC DISH STORY
      ===================================================== */}

      <div
        ref={cinematicRef}
        className="relative min-h-[250vh] bg-[#171410]"
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* IMAGE LAYER */}

          <div className="absolute inset-0">
            {dishes.map((dish, index) => (
              <div
                key={dish.number}
                className={`absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  index === activeIndex
                    ? "opacity-100"
                    : "pointer-events-none opacity-0"
                }`}
              >
                <Image
                  src={dish.image}
                  alt={dish.alt}
                  fill
                  sizes="100vw"
                  className={`object-cover transition-transform duration-[1800ms] ease-out ${
                    index === activeIndex
                      ? "scale-100"
                      : "scale-[1.06]"
                  }`}
                />
              </div>
            ))}

            <div className="absolute inset-0 bg-black/30" />

            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-black/10" />

            <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-[#171410] via-[#171410]/55 to-transparent" />
          </div>

          {/* TOP INDEX */}

          <div className="absolute left-6 right-6 top-6 z-20 sm:left-10 sm:right-10 lg:left-14 lg:right-14 xl:left-16 xl:right-16">
            <div className="mx-auto flex max-w-[1440px] items-center justify-between border-t border-white/15 pt-5">
              <div className="flex items-center gap-4">
                <span className="h-px w-10 bg-[#C9A15A]" />

                <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-white/55">
                  Signature Collection
                </p>
              </div>

              <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/35">
                03 Dishes
              </p>
            </div>
          </div>

          {/* MAIN CONTENT */}

          <div className="absolute inset-x-0 bottom-0 z-20 px-6 pb-10 sm:px-10 sm:pb-12 lg:px-14 lg:pb-14 xl:px-16">
            <div className="mx-auto grid max-w-[1440px] items-end gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
              {/* PROGRESS */}

              <div className="hidden lg:block">
                <div className="flex items-end gap-5">
                  {dishes.map((dish, index) => (
                    <button
                      key={dish.number}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      aria-label={`View ${dish.name}`}
                      aria-pressed={activeIndex === index}
                      className="group flex items-end gap-3 text-left"
                    >
                      <span
                        className={`font-serif text-3xl transition-colors duration-500 ${
                          activeIndex === index
                            ? "text-[#E0BF7A]"
                            : "text-white/25 group-hover:text-white/55"
                        }`}
                      >
                        {dish.number}
                      </span>

                      <span
                        className={`mb-1 h-px transition-all duration-500 ${
                          activeIndex === index
                            ? "w-12 bg-[#C9A15A]"
                            : "w-5 bg-white/20 group-hover:w-8"
                        }`}
                      />
                    </button>
                  ))}
                </div>

                <p className="mt-5 max-w-xs text-[8px] font-bold uppercase tracking-[0.25em] text-white/30">
                  Scroll to move through the collection
                </p>
              </div>

              {/* DISH INFORMATION */}

              <div className="max-w-4xl">
                <div className="mb-4 flex items-center gap-4">
                  <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#E0BF7A]">
                    {activeDish.category}
                  </span>

                  <span className="h-px w-10 bg-[#C9A15A]/70" />
                </div>

                <div className="overflow-hidden">
                  <p
                    key={`${activeDish.number}-number`}
                    className="dish-change font-serif text-5xl leading-none text-white/20 sm:text-6xl"
                  >
                    {activeDish.number}
                  </p>
                </div>

                <div className="overflow-hidden">
                  <h3
                    key={`${activeDish.number}-name`}
                    className="dish-change mt-1 max-w-4xl font-serif text-[clamp(3rem,7vw,7rem)] leading-[0.86] tracking-[-0.055em] text-[#F4EFE6]"
                  >
                    {activeDish.name}
                  </h3>
                </div>

                <div className="mt-7 grid max-w-3xl gap-7 sm:grid-cols-[1fr_auto] sm:items-end">
                  <p
                    key={`${activeDish.number}-description`}
                    className="dish-change max-w-2xl text-sm leading-7 text-white/60 sm:text-base sm:leading-8"
                  >
                    {activeDish.description}
                  </p>

                  <p
                    key={`${activeDish.number}-price`}
                    className="dish-change font-serif text-3xl text-[#E0BF7A]"
                  >
                    {activeDish.price}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* MOBILE SCROLL HINT */}

          <div className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 lg:hidden">
            <p className="whitespace-nowrap text-[8px] font-bold uppercase tracking-[0.25em] text-white/35">
              Swipe to move through the collection
            </p>
          </div>

          {/* SIDE PROGRESS */}

          <div className="absolute right-5 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex">
            {dishes.map((dish, index) => (
              <span
                key={dish.number}
                className={`h-10 w-px transition-all duration-700 ${
                  index === activeIndex
                    ? "bg-[#E0BF7A]"
                    : "bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* =====================================================
          MOBILE DISH SELECTOR
      ===================================================== */}

      <div className="bg-[#171410] px-6 pb-12 sm:px-10 md:hidden">
        <div className="border-t border-white/10 pt-6">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-white/30">
              Swipe to explore
            </p>

            <div className="flex items-center gap-1.5">
              {dishes.map((dish, index) => (
                <span
                  key={`mobile-progress-${dish.number}`}
                  className={`h-px transition-all duration-500 ${
                    activeIndex === index
                      ? "w-8 bg-[#E0BF7A]"
                      : "w-3 bg-white/20"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {dishes.map((dish, index) => (
              <button
                key={dish.number}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`shrink-0 rounded-full border px-5 py-3 text-[9px] font-bold uppercase tracking-[0.2em] transition-colors ${
                  activeIndex === index
                    ? "border-[#C9A15A] bg-[#C9A15A] text-[#171410]"
                    : "border-white/15 text-white/45"
                }`}
              >
                {dish.number} · {dish.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* =====================================================
          PHILOSOPHY
      ===================================================== */}

      <div className="relative overflow-hidden bg-[#F4EFE6] px-6 py-20 sm:px-10 sm:py-24 lg:px-14 lg:py-28 xl:px-16">
        <div className="mx-auto max-w-[1440px] border-t border-[#171410]/10 pt-8 lg:pt-10">
          <div className="grid gap-12 lg:grid-cols-[0.32fr_1fr_0.32fr] lg:items-center">
            {/* EDITORIAL INDEX */}
            <div className="hidden lg:block">
              <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#171410]/35">
                04 / Philosophy
              </p>

              <div className="mt-6 flex items-center gap-3">
                <span className="h-px w-10 bg-[#C9A15A]" />
                <span className="text-[8px] font-bold uppercase tracking-[0.24em] text-[#171410]/35">
                  Luna Bistro
                </span>
              </div>
            </div>

            {/* MAIN STATEMENT */}
            <div className="relative text-center">
              <span
                aria-hidden="true"
                className="absolute -left-2 -top-8 font-serif text-[7rem] leading-none text-[#171410]/[0.035] sm:-top-12 sm:text-[10rem]"
              >
                “
              </span>

              <p className="relative mx-auto max-w-4xl font-serif text-[clamp(2.35rem,4.8vw,5.2rem)] leading-[0.98] tracking-[-0.045em] text-[#171410]">
                Every plate tells a story.
                <br />
                <span className="italic text-[#34382D]">
                  Every evening becomes a memory.
                </span>
              </p>

              <div className="mx-auto mt-8 flex items-center justify-center gap-4">
                <span className="h-px w-10 bg-[#171410]/15" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#C9A15A]" />
                <span className="h-px w-10 bg-[#171410]/15" />
              </div>

              <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.28em] text-[#171410]/40">
                The Luna Bistro Philosophy
              </p>
            </div>

            {/* PHILOSOPHY DETAILS */}
            <div className="border-t border-[#171410]/10 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <div className="space-y-5">
                <div>
                  <p className="text-[8px] font-bold uppercase tracking-[0.24em] text-[#C9A15A]">
                    01
                  </p>
                  <p className="mt-1 font-serif text-base text-[#171410]">
                    Seasonal
                  </p>
                </div>

                <div>
                  <p className="text-[8px] font-bold uppercase tracking-[0.24em] text-[#C9A15A]">
                    02
                  </p>
                  <p className="mt-1 font-serif text-base text-[#171410]">
                    Thoughtful
                  </p>
                </div>

                <div>
                  <p className="text-[8px] font-bold uppercase tracking-[0.24em] text-[#C9A15A]">
                    03
                  </p>
                  <p className="mt-1 font-serif text-base text-[#171410]">
                    Memorable
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex items-center justify-between border-t border-[#171410]/10 pt-5">
            <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-[#171410]/25">
              From the kitchen
            </span>

            <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-[#171410]/25">
              04
            </span>
          </div>
        </div>
      </div>

      {/* =====================================================
          MOTION
      ===================================================== */}

      <style jsx>{`
        .signature-reveal {
          opacity: 0;
          transform: translateY(22px);
          animation: signatureReveal 0.9s
            cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .signature-title {
          opacity: 0;
          transform: translateY(28px);
          animation: signatureTitle 1.05s
            cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards;
        }

        .signature-line {
          transform: scaleX(0);
          animation: signatureLine 0.9s
            cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
        }

        .dish-change {
          animation: dishChange 700ms
            cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes signatureReveal {
          0% {
            opacity: 0;
            transform: translateY(22px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes signatureTitle {
          0% {
            opacity: 0;
            transform: translateY(28px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes signatureLine {
          0% {
            transform: scaleX(0);
          }

          100% {
            transform: scaleX(1);
          }
        }

        @keyframes dishChange {
          0% {
            opacity: 0;
            transform: translateY(28px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .signature-reveal,
          .signature-title,
          .signature-line,
          .dish-change {
            animation: none !important;
          }

          .signature-reveal,
          .signature-title,
          .dish-change {
            opacity: 1 !important;
            transform: none !important;
          }

          .signature-line {
            transform: scaleX(1) !important;
          }
        }
      `}</style>
    </section>
  );
}
